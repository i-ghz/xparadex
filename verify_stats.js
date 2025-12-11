
async function verifyStats() {
    try {
        const response = await fetch('https://api.prod.paradex.trade/v1/markets/summary?market=ALL');
        const data = await response.json();

        if (!data || !data.results) {
            console.log('No results found');
            return;
        }

        const allMarkets = data.results.length;
        const perps = data.results.filter(market => market.symbol.endsWith('-PERP'));

        console.log(`Total Markets: ${allMarkets}`);
        console.log(`Perpetual Markets: ${perps.length}`);

        let totalOI = 0;
        let totalVolume = 0;

        perps.forEach(market => {
            const oi = parseFloat(market.open_interest || '0');
            const markPrice = parseFloat(market.mark_price || '0');
            totalOI += oi * markPrice;

            const volume = parseFloat(market.volume_24h || '0');
            totalVolume += volume;
        });

        console.log(`Total OI (USD): ${totalOI.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
        console.log(`Total Volume (USD): ${totalVolume.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

verifyStats();
