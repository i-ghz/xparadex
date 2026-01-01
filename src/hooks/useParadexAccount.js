import { useState, useCallback } from 'react';

const API_BASE = 'https://api.prod.paradex.trade/v1';

// Only log in development
const isDev = import.meta.env.DEV;
const log = (...args) => isDev && console.log(...args);
const logWarn = (...args) => isDev && console.warn(...args);
const logError = (...args) => isDev && console.error(...args);

// Start of 2025 in milliseconds
const START_2025 = new Date('2025-01-01T00:00:00Z').getTime();
const END_2025 = new Date('2025-12-31T23:59:59Z').getTime();

export function useParadexAccount() {
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchWithAuth = useCallback(async (endpoint, jwt) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }, []);

  // Fetch ALL pages using cursor-based pagination
  const fetchAllPages = useCallback(async (endpoint, jwt, onProgress) => {
    let allResults = [];
    let cursor = null;
    let pageCount = 0;
    const maxPages = 200; // Safety limit increased

    while (pageCount < maxPages) {
      const separator = endpoint.includes('?') ? '&' : '?';
      const url = cursor
        ? `${endpoint}${separator}cursor=${cursor}`
        : endpoint;

      log(`Fetching page ${pageCount + 1}:`, url);
      const response = await fetchWithAuth(url, jwt);

      const results = response.results || [];
      allResults = [...allResults, ...results];

      // Check for next cursor - Paradex uses 'next' not 'next_cursor'
      cursor = response.next || response.next_cursor || null;
      pageCount++;

      if (onProgress) {
        onProgress(allResults.length);
      }

      log(`Page ${pageCount}: got ${results.length} results, next: ${cursor ? 'yes' : 'no'}`);

      // Stop if no more pages
      if (!cursor || results.length === 0) break;

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 50));
    }

    return allResults;
  }, [fetchWithAuth]);

  // Discover all markets (including from user's fills for delisted ones)
  const discoverMarkets = useCallback(async (jwt, fills) => {
    const markets = new Set();

    try {
      // 1. Fetch public markets (no auth needed)
      log('📊 Fetching public markets...');
      const marketsResponse = await fetch(`${API_BASE}/markets`);
      if (marketsResponse.ok) {
        const marketsData = await marketsResponse.json();
        marketsData.results
          .filter(m => m.market_type === 'PERP')
          .forEach(m => markets.add(m.symbol));
        log(`✅ Found ${markets.size} public PERP markets`);
      }

      // 2. Add markets from user's fills (catches delisted markets)
      if (fills && fills.length > 0) {
        const initialSize = markets.size;
        fills.forEach(fill => {
          const market = fill.market;
          // Exclude options (they have -C- or -P-)
          if (market && !market.includes('-C-') && !market.includes('-P-')) {
            markets.add(market);
          }
        });
        log(`✅ Found ${markets.size - initialSize} additional markets from fills`);
      }

      return Array.from(markets);
    } catch (error) {
      logError('Error discovering markets:', error);
      return Array.from(markets);
    }
  }, []);

  // Fetch funding payments for a specific market
  const fetchFundingForMarket = useCallback(async (market, jwt) => {
    let allPayments = [];
    let cursor = null;
    let hasMore = true;
    let pageCount = 0;

    try {
      while (hasMore && pageCount < 50) {
        const params = new URLSearchParams({
          market,
          page_size: '500',
          start_at: START_2025.toString(),
          end_at: END_2025.toString()
        });
        if (cursor) params.append('cursor', cursor);

        const response = await fetch(`${API_BASE}/funding/payments?${params}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`
          }
        });

        if (!response.ok) {
          logWarn(`⚠️ Funding for ${market} failed: ${response.status}`);
          break;
        }

        const data = await response.json();
        pageCount++;

        allPayments = [...allPayments, ...data.results];
        cursor = data.next;
        hasMore = !!data.next;

        // Rate limiting
        await new Promise(r => setTimeout(r, 100));
      }

      return allPayments;
    } catch (error) {
      logError(`Error fetching funding for ${market}:`, error);
      return [];
    }
  }, []);

  // Fetch ALL funding payments from ALL markets
  const fetchAllFunding = useCallback(async (jwt, fills, onProgress) => {
    const markets = await discoverMarkets(jwt, fills);
    log(`📋 Total markets to scan for funding: ${markets.length}`);

    let allPayments = [];
    let processed = 0;

    for (const market of markets) {
      const payments = await fetchFundingForMarket(market, jwt);

      if (payments.length > 0) {
        log(`💰 ${market}: ${payments.length} funding payments`);
        allPayments = [...allPayments, ...payments];
      }

      processed++;
      if (onProgress) {
        onProgress(processed, markets.length, allPayments.length);
      }
    }

    log(`🎉 Total funding payments: ${allPayments.length}`);
    return allPayments;
  }, [discoverMarkets, fetchFundingForMarket]);

  const fetchAccountData = useCallback(async (jwt) => {
    setLoading(true);
    setError(null);
    setLoadingStatus('Connecting...');

    try {
      // Fetch core account data
      setLoadingStatus('Fetching account info...');
      const [accountData, profileData] = await Promise.all([
        fetchWithAuth('/account', jwt),
        fetchWithAuth('/account/profile', jwt).catch(() => ({})),
      ]);

      log('Account data:', accountData);
      log('Profile data:', profileData);

      // Fetch ALL fills for 2025
      setLoadingStatus('Fetching trades...');
      const fills = await fetchAllPages(
        `/fills?start_at=${START_2025}&page_size=500`,
        jwt,
        (count) => setLoadingStatus(`Fetching trades... ${count} found`)
      );
      log('Total fills fetched:', fills.length);

      // Filter fills for 2025
      const fills2025 = fills.filter(fill => {
        const timestamp = fill.created_at;
        return timestamp >= START_2025 && timestamp <= END_2025;
      });
      log('Fills in 2025:', fills2025.length);

      // Log sample fill structure
      if (fills2025.length > 0) {
        log('Sample fill:', JSON.stringify(fills2025[0], null, 2));
      }

      // Fetch ALL funding payments from ALL markets
      setLoadingStatus('Fetching funding history...');
      const fundingPayments = await fetchAllFunding(
        jwt,
        fills2025,
        (processed, total, payments) => setLoadingStatus(`Fetching funding... ${processed}/${total} markets (${payments} payments)`)
      );
      log('Total funding payments:', fundingPayments.length);

      // Fetch XP balance from all seasons
      let xpData = { totalXP: 0, seasons: {} };
      try {
        setLoadingStatus('Fetching XP...');
        const seasons = ['preseason', 'season1', 'season2'];

        for (const season of seasons) {
          try {
            const seasonData = await fetchWithAuth(`/xp/account-balance?season=${season}`, jwt);
            log(`XP data for ${season}:`, seasonData);

            const earnedXP = seasonData.earned_xp || 0;
            xpData.seasons[season] = earnedXP;
            xpData.totalXP += earnedXP;
          } catch (e) {
            log(`XP for ${season} not available:`, e.message);
          }
        }

        log('Total XP data:', xpData);
      } catch (e) {
        log('XP endpoints not available:', e.message);
      }

      // Fetch referral rewards
      let referralData = { totalReferralRewards: 0, referees: [] };
      try {
        setLoadingStatus('Fetching referral rewards...');
        const referralSummary = await fetchWithAuth('/referrals/summary', jwt);
        log('Referral summary:', referralSummary);

        if (referralSummary.results && referralSummary.results.length > 0) {
          referralData.referees = referralSummary.results;
          referralData.totalReferralRewards = referralSummary.results.reduce((sum, ref) => {
            return sum + parseFloat(ref.referral_rewards || 0);
          }, 0);
          log('Total referral rewards:', referralData.totalReferralRewards);
        }
      } catch (e) {
        log('Referral data not available:', e.message);
      }

      // Process data with funding payments
      setLoadingStatus('Processing data...');
      const processedData = processAccountData({
        accountData,
        profileData,
        fills2025,
        fundingPayments,
        xpData,
        referralData,
      });

      log('Processed data:', processedData);

      setData(processedData);
      setLoadingStatus('');
      return processedData;
    } catch (err) {
      logError('Fetch error:', err);
      setError(err.message);
      setLoadingStatus('');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, fetchAllPages, fetchAllFunding]);

  return { fetchAccountData, loading, loadingStatus, error, data };
}

function processAccountData({
  accountData,
  profileData,
  fills2025,
  fundingPayments = [],
  xpData = null,
  referralData = null,
}) {
  // Extract username
  const username = profileData?.username || 'Trader';

  // Account creation
  const createdAtStr = accountData?.created_at || profileData?.created_at;
  const accountCreatedAt = createdAtStr ? new Date(createdAtStr) : null;
  const isOG = accountCreatedAt && accountCreatedAt < new Date('2025-01-01');

  // Calculate stats from fills
  let totalVolume = 0;
  let totalPnl = 0;
  let totalFees = 0;

  const tradesByMarket = {};
  const monthlyVolume = {};
  const hourCounts = {};
  const tradingDaysSet = new Set();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let bestTrade = null;
  let worstTrade = null;

  fills2025.forEach(fill => {
    const size = parseFloat(fill.size || 0);
    const price = parseFloat(fill.price || 0);
    const underlyingPrice = parseFloat(fill.underlying_price || 0);
    const market = fill.market || 'Unknown';

    // For options (markets with -C or -P), use underlying_price for notional volume
    // Options have underlying_price field which represents the actual asset price
    const isOption = market.includes('-C') || market.includes('-P');
    const volume = isOption && underlyingPrice > 0
      ? size * underlyingPrice  // Options: notional value
      : size * price;           // Perps: size * price

    const pnl = parseFloat(fill.realized_pnl || 0);
    const fee = parseFloat(fill.fee || 0);
    const date = new Date(fill.created_at);

    // Volume
    totalVolume += volume;

    // PnL
    totalPnl += pnl;

    // Fees
    totalFees += Math.abs(fee);

    // By market
    if (!tradesByMarket[market]) {
      tradesByMarket[market] = { count: 0, volume: 0, pnl: 0, funding: 0 };
    }
    tradesByMarket[market].count++;
    tradesByMarket[market].volume += volume;
    tradesByMarket[market].pnl += pnl;

    // Monthly volume
    const month = months[date.getMonth()];
    monthlyVolume[month] = (monthlyVolume[month] || 0) + volume;

    // Hour counts
    const hour = date.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;

    // Trading days
    tradingDaysSet.add(date.toDateString());

    // Best/worst trade
    if (!bestTrade || pnl > parseFloat(bestTrade.realized_pnl || 0)) {
      bestTrade = fill;
    }
    if (!worstTrade || pnl < parseFloat(worstTrade.realized_pnl || 0)) {
      worstTrade = fill;
    }
  });

  // Calculate funding from funding payments (not from fills!)
  let totalFundingEarned = 0;
  let totalFundingPaid = 0;
  const fundingByMarket = {};

  fundingPayments.forEach(payment => {
    const amount = parseFloat(payment.payment || 0);
    const market = payment.market || 'Unknown';

    if (amount > 0) {
      totalFundingEarned += amount;
    } else if (amount < 0) {
      totalFundingPaid += Math.abs(amount);
    }

    // Track funding by market
    if (!fundingByMarket[market]) {
      fundingByMarket[market] = 0;
    }
    fundingByMarket[market] += amount;

    // Also update tradesByMarket funding
    if (tradesByMarket[market]) {
      tradesByMarket[market].funding += amount;
    }
  });

  // Sort markets by volume
  const topMarkets = Object.entries(tradesByMarket)
    .sort((a, b) => b[1].volume - a[1].volume)
    .slice(0, 5)
    .map(([market, stats]) => ({ market, ...stats }));

  // Most active hour
  const mostActiveHour = Object.entries(hourCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 12;

  // Totals
  const totalTrades = fills2025.length;
  const tradingDays = tradingDaysSet.size;
  const avgTradeSize = totalTrades > 0 ? totalVolume / totalTrades : 0;

  // Fee savings (negative fees = rebates)
  const totalFeeSavings = fills2025.reduce((sum, fill) => {
    const fee = parseFloat(fill.fee || 0);
    return fee < 0 ? sum + Math.abs(fee) : sum;
  }, 0);

  // Extract XP if available
  let totalXP = 0;
  let xpBySeason = {};
  if (xpData) {
    totalXP = xpData.totalXP || 0;
    xpBySeason = xpData.seasons || {};
  }

  // Extract referral rewards
  const totalReferralRewards = referralData?.totalReferralRewards || 0;
  const referees = referralData?.referees || [];

  log('Stats calculated:');
  log('- Volume:', totalVolume);
  log('- PnL (trades):', totalPnl);
  log('- Referral rewards:', totalReferralRewards);
  log('- Total PnL (with referrals):', totalPnl + totalReferralRewards);
  log('- Funding earned:', totalFundingEarned);
  log('- Funding paid:', totalFundingPaid);
  log('- Net funding:', totalFundingEarned - totalFundingPaid);
  log('- Fees:', totalFees);
  log('- Fee savings:', totalFeeSavings);
  log('- Total funding payments:', fundingPayments.length);
  log('- XP:', totalXP);
  log('- Referees count:', referees.length);

  return {
    username,
    fullAddress: accountData?.account || username,
    twitter: profileData?.twitter?.username,
    twitterImage: profileData?.twitter?.image_url,
    referralCode: profileData?.referral_code,
    referredBy: profileData?.referred_by,
    accountCreatedAt,
    isOG,

    totalVolume,
    totalTrades,
    tradingDays,
    avgTradeSize,
    topMarkets,
    tradesByMarket,
    monthlyVolume,

    totalPnl: totalPnl + totalReferralRewards, // Include referral rewards in total PnL
    tradingPnl: totalPnl, // PnL from trades only
    totalReferralRewards,
    refereesCount: referees.length,

    totalFundingEarned,
    totalFundingPaid,
    netFunding: totalFundingEarned - totalFundingPaid,
    fundingByMarket,
    fundingPaymentsCount: fundingPayments.length,

    totalXP,
    xpBySeason,

    totalFeeSavings,
    totalFees,

    bestTrade,
    worstTrade,
    mostActiveHour: parseInt(mostActiveHour),

    fills: fills2025,
    fundingPayments,
  };
}
