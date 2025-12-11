import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, BookOpen, History, ShieldCheck, Send, Info } from 'lucide-react';
import { OTC_STATS, TRADE_HISTORY, CHART_DATA } from '../data/otcData';

const REVIEWS_DATA = [
    { user: 'ghz', date: '9 Dec 2025', text: 'I used Paradex OTC for the 3rd time today... The experience is amazing... Everything is transparent, the guys are super super reactive... They don\'t manipulate the spread... Big love to Paradex OTC team 🫡' },
    { user: 'SSS', date: '10 Nov 2025', text: 'Just sold 805 XP. Everything was smooth and fast. Thanks team!' },
    { user: 'MORNINGFROST', date: '10 Nov 2025', text: 'wow.....my first time buying 4200 xp.....so fast and smooth.....recommended!' },
    { user: 'k4nguR', date: '11 Nov 2025', text: 'Everything was fast and clear... admin said that i can send transferable amount... he was kind and polite, i also got my funds like 2minutes after transfering xp, thx @Oxpol06' },
    { user: 'Maw El', date: '13 Nov 2025', text: 'Appreciated for a smooth experience in buying XP thx to @Oxpol06 !' },
    { user: 'Vlad', date: '14 Nov 2025', text: 'Recently sold my 2k+ XP with @Oxpol06. Smooth and easy process – very quick to finalize the deal. Highly recommended!' },
    { user: 'Lio', date: '16 Nov 2025', text: 'I\'m really satisfied with the services Paradex xp otc I was able to find a buyer for my 30,000 xp in 24 hours' },
    { user: 'Hugo0x18 | Block3Labs', date: '18 Nov 2025', text: 'Just bought some XP - Everything went very well, smooth and fast. Thanks a lot @Felixlamenasse , great service and responsive' },
    { user: 'Shadow Minister', date: '18 Nov 2025', text: 'Just bought some XP - Everything went very well, smooth and fast. Thanks a lot @Oxpol06 , great service and responsive' },
    { user: '0xAigri - Thomas', date: '29 Oct 2025', text: 'Just bought some XP, fast and reliable, 2 hours to close the deal, nice job will check for more if needed' },
    { user: 'Sindermann', date: '29 Oct 2025', text: 'Bought ~15k XP through these fine gentlemen today, gud service, quick and proactive' },
    { user: 'Ivan', date: '29 Oct 2025', text: 'Sold some XP today, thanks @Oxpol06 for a secure and swift deal' },
    { user: 'Fred Fred', date: '29 Oct 2025', text: 'Same for me. Sell some XP today, thanks @Oxpol06' },
    { user: 'Justin Bieber', date: '29 Oct 2025', text: 'Bought 2.6K XP - great service and responsive' },
    { user: 'Aleksandr Rybakov', date: '29 Oct 2025', text: 'Just sold some XP. Everything went very well, smooth and fast. Thanks a lot.' },
    { user: 'Damicale', date: '30 Oct 2025', text: 'buy 24,4k points all was fast and good' },
    { user: 'Serhii', date: '30 Oct 2025', text: 'Sold 4,6k XP, very fast, all good' },
];

const ORDERBOOK_BIDS = [
    { price: 0.19, amount: 100000, total: 19000 },
    { price: 0.19, amount: 50000, total: 9500 },
    { price: 0.18, amount: 29100, total: 5238 },
    { price: 0.18, amount: 13820, total: 2487 },
    { price: 0.17, amount: 23700, total: 4029 },
];

const ORDERBOOK_ASKS = [
    { price: 0.23, amount: 10738, total: 2470 },
    { price: 0.23, amount: 96000, total: 22080 },
    { price: 0.23, amount: 2904, total: 668 },
    { price: 0.22, amount: 15000, total: 3300 },
    { price: 0.21, amount: 23700, total: 4977 },
];

const StatBox = ({ label, value, subValue, highlight = false }) => (
    <div className={`bg-white/5 border ${highlight ? 'border-[#22d3ee]/50 bg-[#22d3ee]/5' : 'border-white/10'} rounded-xl p-4 flex flex-col transition-all hover:bg-white/10`}>
        <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${highlight ? 'text-[#22d3ee]' : 'text-white'}`}>{value}</span>
            {subValue && <span className="text-xs text-gray-500">{subValue}</span>}
        </div>
    </div>
);

export function OTC() {
    const [sellAmount, setSellAmount] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tradeHistoryPage, setTradeHistoryPage] = useState(1);
    const reviewsPerPage = 3;
    const tradesPerPage = 10;

    const handleSellClick = () => {
        if (!sellAmount || !sellPrice) return;

        const message = `I want to sell ${sellAmount} XP at $${sellPrice} per XP.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://t.me/Felixlamenasse?text=${encodedMessage}`, '_blank');
    };

    // Pagination Logic for Reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = REVIEWS_DATA.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(REVIEWS_DATA.length / reviewsPerPage);

    // Pagination Logic for Trade History
    // Sort history by date descending (newest first)
    const sortedHistory = [...TRADE_HISTORY].sort((a, b) => {
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/').map(Number);
            return new Date(2000 + year, month - 1, day);
        };
        return parseDate(b.raw_date) - parseDate(a.raw_date);
    });

    const indexOfLastTrade = tradeHistoryPage * tradesPerPage;
    const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
    const currentTrades = sortedHistory.slice(indexOfFirstTrade, indexOfLastTrade);
    const totalTradePages = Math.ceil(sortedHistory.length / tradesPerPage);

    // Calculate Volumes
    const parseCurrency = (str) => Number(str.replace(/[^0-9.-]+/g, ""));

    const totalVolume = TRADE_HISTORY.reduce((acc, trade) => acc + parseCurrency(trade.notional), 0);

    const sevenDayVolume = TRADE_HISTORY.reduce((acc, trade) => {
        const [day, month, year] = trade.raw_date.split('/').map(Number);
        const tradeDate = new Date(2000 + year, month - 1, day);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        if (tradeDate >= sevenDaysAgo) {
            return acc + parseCurrency(trade.notional);
        }
        return acc;
    }, 0);

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    // Smooth Chart Data (Moving Average)
    const smoothData = (data, windowSize = 5) => {
        return data.map((item, index, arr) => {
            const start = Math.max(0, index - Math.floor(windowSize / 2));
            const end = Math.min(arr.length, index + Math.floor(windowSize / 2) + 1);
            const subset = arr.slice(start, end);
            const avgPrice = subset.reduce((sum, current) => sum + current.price, 0) / subset.length;
            return { ...item, price: avgPrice };
        });
    };

    const SMOOTHED_CHART_DATA = smoothData(CHART_DATA, 4); // Window size of 4 for smoothing

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Section */}
            <div className="text-center space-y-4 mb-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    OTC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">MARKET</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    The most liquid and secure marketplace for Paradex XP.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatBox label="Average Price" value={`$${OTC_STATS.avgPrice}`} highlight={true} />
                <StatBox label="Min Price" value={`$${OTC_STATS.minPrice}`} />
                <StatBox label="Max Price" value={`$${OTC_STATS.maxPrice}`} />
                <StatBox label="Total Volume" value={formatCurrency(totalVolume)} />
                <StatBox label="7-Day Volume" value={formatCurrency(sevenDayVolume)} />
            </div>

            {/* Chart & Sell Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 h-[500px] relative group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]" />
                    <div className="flex items-center gap-3 mt-6 mb-2 px-6">
                        <Activity className="w-5 h-5 text-[#22d3ee]" />
                        <h3 className="text-xl font-bold text-white tracking-tight">XP Price Action</h3>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SMOOTHED_CHART_DATA}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                    </linearGradient>
                                    <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="index" hide />
                                <YAxis
                                    orientation="right"
                                    stroke="#444"
                                    tick={{ fill: '#888', fontSize: 12 }}
                                    domain={['dataMin - 0.02', 'dataMax + 0.02']}
                                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-[#0a0a0a] border border-[#22d3ee]/20 p-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-xl">
                                                    <p className="text-gray-400 text-xs mb-1 font-medium">{CHART_DATA[label]?.date}</p>
                                                    <p className="text-[#22d3ee] font-bold text-xl">
                                                        ${Number(payload[0].value).toFixed(4)}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="basis"
                                    dataKey="price"
                                    stroke="#22d3ee"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    filter="url(#glow)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sell XP Form */}
                <div className="bg-gradient-to-b from-[#22d3ee]/5 to-black border border-[#22d3ee]/20 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <DollarSign size={120} className="text-[#22d3ee]" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Sell your XP</h3>
                    <p className="text-gray-400 text-sm mb-8 relative z-10 font-medium">Get instant liquidity for your Paradex points via our trusted OTC desk.</p>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-xs text-[#22d3ee] font-bold uppercase tracking-wider mb-2">XP Amount</label>
                            <div className="relative group">
                                <input
                                    type="number"
                                    value={sellAmount}
                                    onChange={(e) => setSellAmount(e.target.value)}
                                    placeholder="e.g. 10000"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] transition-all font-medium text-lg"
                                />
                                <span className="absolute right-5 top-5 text-gray-500 text-sm font-bold">XP</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-[#22d3ee] font-bold uppercase tracking-wider mb-2">Price per XP</label>
                            <div className="relative group">
                                <input
                                    type="number"
                                    value={sellPrice}
                                    onChange={(e) => setSellPrice(e.target.value)}
                                    placeholder="e.g. 0.18"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee] transition-all font-medium text-lg"
                                />
                                <span className="absolute right-5 top-5 text-gray-500 text-sm font-bold">USDC</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleSellClick}
                                disabled={!sellAmount || !sellPrice}
                                className="w-full bg-[#22d3ee] hover:bg-[#22d3ee]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black text-lg py-5 rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                            >
                                <Send className="w-5 h-5" />
                                CREATE OFFER
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5 font-medium">
                                <Info size={14} />
                                Secure transaction via Telegram
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Orderbook */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-[#22d3ee]" />
                            <h3 className="text-xl font-bold text-white">Orderbook</h3>
                        </div>
                        <div className="bg-[#22d3ee]/10 px-4 py-2 rounded-xl border border-[#22d3ee]/20 flex items-center gap-3">
                            <span className="text-[#22d3ee]/80 text-xs font-bold uppercase tracking-wider">Mid Price</span>
                            <div className="text-[#22d3ee] font-bold text-lg">$0.19</div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Asks */}
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 text-xs text-gray-500 mb-3 px-3 uppercase tracking-wider font-bold">
                                <span>Price</span>
                                <span className="text-right">Notional</span>
                                <span className="text-right">Size (XP)</span>
                            </div>
                            {ORDERBOOK_ASKS.map((ask, i) => (
                                <div key={i} className="grid grid-cols-3 text-sm px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer group transition-all duration-200">
                                    <span className="text-red-400 font-medium">${ask.price}</span>
                                    <span className="text-right text-gray-400 font-medium">${ask.total.toLocaleString()}</span>
                                    <span className="text-right text-white font-medium group-hover:text-[#22d3ee] transition-colors">{ask.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 opacity-50">
                            <div className="h-px bg-white/20 flex-1" />
                            <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Spread</span>
                            <div className="h-px bg-white/20 flex-1" />
                        </div>

                        {/* Bids */}
                        <div className="space-y-2">
                            {ORDERBOOK_BIDS.map((bid, i) => (
                                <div key={i} className="grid grid-cols-3 text-sm px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer group transition-all duration-200">
                                    <span className="text-green-400 font-medium">${bid.price}</span>
                                    <span className="text-right text-gray-400 font-medium">${bid.total.toLocaleString()}</span>
                                    <span className="text-right text-white font-medium group-hover:text-[#22d3ee] transition-colors">{bid.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trade History */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <History className="w-5 h-5 text-[#22d3ee]" />
                            <h3 className="text-xl font-bold text-white">Recent Trades</h3>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTradeHistoryPage(prev => Math.max(prev - 1, 1))}
                                disabled={tradeHistoryPage === 1}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
                            >
                                ←
                            </button>
                            <span className="text-xs text-gray-400 flex items-center font-medium px-2">
                                {tradeHistoryPage}/{totalTradePages}
                            </span>
                            <button
                                onClick={() => setTradeHistoryPage(prev => Math.min(prev + 1, totalTradePages))}
                                disabled={tradeHistoryPage === totalTradePages}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-white/10">
                                <tr>
                                    <th className="py-4 font-bold tracking-wider pl-2">Date</th>
                                    <th className="py-4 text-right font-bold tracking-wider">Size (XP)</th>
                                    <th className="py-4 text-right font-bold tracking-wider">Total ($)</th>
                                    <th className="py-4 text-right font-bold tracking-wider pr-2">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {currentTrades.map((trade, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-4 text-gray-400 font-medium pl-2">{trade.date}</td>
                                        <td className="py-4 text-right text-white font-medium group-hover:text-[#22d3ee] transition-colors">{trade.points}</td>
                                        <td className="py-4 text-right text-gray-400 font-medium">{trade.notional}</td>
                                        <td className="py-4 text-right text-[#22d3ee] font-bold pr-2">{trade.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Rules Section */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-10">
                    <ShieldCheck className="w-7 h-7 text-[#22d3ee]" />
                    <h3 className="text-2xl font-bold text-white">How It Works</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-300">
                    <div className="relative p-8 bg-black/20 rounded-2xl border border-white/5 hover:border-[#22d3ee]/30 transition-colors duration-300">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#22d3ee] text-black font-black text-lg rounded-xl flex items-center justify-center shadow-lg shadow-[#22d3ee]/20">1</div>
                        <h4 className="font-bold text-white text-lg mb-4 mt-2">Initiate Trade</h4>
                        <p className="leading-relaxed text-gray-400 mb-4">
                            XP are transferable. Buyers deposit 100% collateral (USDC) to our secure multisig wallet to start the process.
                        </p>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase mb-2 font-bold tracking-wider">Official Multisig</p>
                            <p className="text-xs text-[#22d3ee] break-all">0x69186B09C165a9C619FC21162c92EB7726Fa41E9</p>
                        </div>
                    </div>

                    <div className="relative p-8 bg-black/20 rounded-2xl border border-white/5 hover:border-[#22d3ee]/30 transition-colors duration-300">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#22d3ee] text-black font-black text-lg rounded-xl flex items-center justify-center shadow-lg shadow-[#22d3ee]/20">2</div>
                        <h4 className="font-bold text-white text-lg mb-4 mt-2">Place Order</h4>
                        <p className="leading-relaxed text-gray-400">
                            Contact <a href="https://t.me/Felixlamenasse" target="_blank" rel="noopener noreferrer" className="text-[#22d3ee] hover:underline font-bold">@Felixlamenasse</a> on Telegram with your bid/ask details. We handle all sizes with no minimums.
                        </p>
                    </div>

                    <div className="relative p-8 bg-black/20 rounded-2xl border border-white/5 hover:border-[#22d3ee]/30 transition-colors duration-300">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#22d3ee] text-black font-black text-lg rounded-xl flex items-center justify-center shadow-lg shadow-[#22d3ee]/20">3</div>
                        <h4 className="font-bold text-white text-lg mb-4 mt-2">Settlement</h4>
                        <p className="leading-relaxed text-gray-400 mb-4">
                            Funds are secured. Seller transfers XP. Funds are released. Simple, fast, and secure escrow service.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                            <span className="px-3 py-1.5 bg-[#22d3ee]/10 text-[#22d3ee] rounded-lg border border-[#22d3ee]/20">2.5% Fee &lt;$50k</span>
                            <span className="px-3 py-1.5 bg-[#22d3ee]/10 text-[#22d3ee] rounded-lg border border-[#22d3ee]/20">1.25% Fee &gt;$50k</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Official Channels Section */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#22d3ee] to-purple-600">
                            <img
                                src="/assets/otc-twitter-logo.png"
                                alt="Paradex OTC"
                                className="w-full h-full rounded-full object-cover border-4 border-black"
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div>
                            <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                ParadexOTC
                                <span className="text-[#22d3ee] text-base font-normal">@OTC_Paradex</span>
                            </h3>
                            <p className="text-gray-400 text-sm mt-1 max-w-2xl">
                                The OTC market to buy and sell Paradex XPs. Also a community hub to share and discuss about Paradex-related topics. Community owned OTC market.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                            <a
                                href="https://x.com/OTC_Paradex"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                Follow on X
                            </a>
                            <a
                                href="https://t.me/OTC_Paradex"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-[#229ED9]/10 text-[#229ED9] border border-[#229ED9]/50 font-bold rounded-full hover:bg-[#229ED9]/20 transition-colors flex items-center gap-2"
                            >
                                <Send size={16} />
                                Join Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-4">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Community Trust</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {currentReviews.map((review, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 relative group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#22d3ee]/5">
                            <div className="absolute top-8 right-8 text-[#22d3ee]/20 group-hover:text-[#22d3ee]/40 transition-colors">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22d3ee] to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#22d3ee]/20">
                                    {review.user.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">{review.user}</h4>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-base leading-relaxed font-medium">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credits */}
            <div className="text-center py-8 border-t border-white/5 mt-8">
                <p className="text-gray-500 text-xs font-medium">
                    Inspiration & Data provided by <a href="https://toomanycooks.app/" target="_blank" rel="noopener noreferrer" className="text-[#22d3ee] hover:underline">TooManyCooks</a>
                </p>
            </div>
        </div>
    );
}
