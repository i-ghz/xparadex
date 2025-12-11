import { useState, useEffect } from 'react';

export function useParadexStats() {
    const [stats, setStats] = useState({
        futuresCount: 0,
        optionsCount: 0,
        totalOI: 0,
        totalVolume: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('https://api.prod.paradex.trade/v1/markets/summary?market=ALL');
                if (!response.ok) {
                    throw new Error('Failed to fetch market summary');
                }
                const data = await response.json();

                let futuresCount = 0;
                let optionsCount = 0;
                let totalOI = 0;
                let totalVolume = 0;

                if (data && data.results) {
                    // Use all markets (Perps + Options)
                    const markets = data.results;

                    markets.forEach(market => {
                        // Count Futures vs Options
                        if (market.symbol.endsWith('-PERP')) {
                            futuresCount++;
                        } else {
                            optionsCount++;
                        }

                        // Calculate Open Interest in USD: OI (contracts) * Underlying Price (Notional Value)
                        // For Options, this gives Notional OI. For Perps, Underlying ~ Mark Price.
                        const oi = parseFloat(market.open_interest || '0');
                        const price = parseFloat(market.underlying_price || market.mark_price || '0');
                        totalOI += oi * price;

                        // Calculate Volume in USD
                        const volume = parseFloat(market.volume_24h || '0');
                        totalVolume += volume;
                    });
                }

                setStats({
                    futuresCount,
                    optionsCount,
                    totalOI,
                    totalVolume
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching Paradex stats:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchStats();

        // Refresh every minute
        const intervalId = setInterval(fetchStats, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return { stats, loading, error };
}
