import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Zap,
  DollarSign,
  Heart,
  Trophy,
  Clock,
  BarChart2,
  Star,
  Coins,
  Sparkles,
  Share2,
  Download,
  ArrowUp,
  ArrowDown,
  Copy,
  Check,
  Twitter,
} from 'lucide-react';
import html2canvas from 'html2canvas';

// Format large numbers
function formatNumber(num, decimals = 0) {
  if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
  return num.toFixed(decimals);
}

// Format currency
function formatCurrency(num) {
  return '$' + formatNumber(Math.abs(num), num >= 1e6 ? 2 : 0);
}

// Animated Counter Hook
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);

    const startTime = Date.now();
    const endValue = parseFloat(end) || 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(endValue * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, started]);

  return count;
}

// Background Grid
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_60%)]" />
    </div>
  );
}

// Card Component
function Card({ children, className = '' }) {
  return (
    <div className={`p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-cyan-500/10 shadow-[0_0_60px_-15px_rgba(34,211,238,0.15)] ${className}`}>
      {children}
    </div>
  );
}

// Progress dots
function ProgressDots({ current, total, onDotClick }) {
  return (
    <div className="flex gap-2 px-4 py-2 bg-black/60 rounded-full backdrop-blur-md border border-cyan-500/10">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`transition-all duration-300 rounded-full ${
            i === current
              ? 'w-8 h-2 bg-cyan-400'
              : 'w-2 h-2 bg-white/20 hover:bg-cyan-400/50'
          }`}
        />
      ))}
    </div>
  );
}

// Mini Bar Chart
function MiniChart({ data, delay = 0 }) {
  const maxValue = Math.max(...Object.values(data), 1);

  return (
    <div className="flex items-end gap-1 h-20 mt-4">
      {Object.entries(data).map(([label, value], i) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <motion.div
            className="w-6 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 100}%` }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.1,
              ease: 'easeOut',
            }}
          />
          <span className="text-[8px] text-gray-500">{label}</span>
        </div>
      ))}
    </div>
  );
}

// SLIDE COMPONENTS

function WelcomeSlide({ data }) {
  return (
    <div className="flex flex-col items-center justify-center text-center z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-cyan-400/30 blur-[100px] scale-150" />
        <motion.div
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-5xl font-black text-black"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {data.username.charAt(0).toUpperCase()}
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4"
      >
        Hey, {data.username}!
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl font-bold text-cyan-400 tracking-widest uppercase mb-4"
      >
        YOUR 2025 WRAPPED
      </motion.div>

      {data.isOG && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-bold flex items-center gap-2"
        >
          <Star size={14} fill="currentColor" />
          OG Member since {data.accountCreatedAt?.getFullYear() || '2024'}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="mt-12 text-gray-600 text-sm"
      >
        tap anywhere to continue
      </motion.div>
    </div>
  );
}

function VolumeSlide({ data }) {
  const animatedValue = useCountUp(data.totalVolume / 1e6, 2500);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20"
        >
          <TrendingUp size={24} className="text-cyan-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
        >
          Total Trading Volume
        </motion.h3>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2"
        >
          ${animatedValue.toFixed(data.totalVolume >= 1e9 ? 2 : 1)}
          <span className="text-cyan-400">{data.totalVolume >= 1e9 ? 'B' : 'M'}</span>
        </motion.div>

        {Object.keys(data.monthlyVolume || {}).length > 0 && (
          <MiniChart data={data.monthlyVolume} delay={0.5} />
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mt-6"
        >
          You've been busy this year!
        </motion.p>
      </Card>
    </div>
  );
}

function TradesSlide({ data }) {
  const animatedTrades = useCountUp(data.totalTrades, 2000);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20"
        >
          <Activity size={24} className="text-cyan-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
        >
          Total Trades
        </motion.h3>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6"
        >
          {Math.round(animatedTrades).toLocaleString()}
        </motion.div>

        {/* Top Markets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full border-t border-cyan-500/10 pt-6 mt-4"
        >
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Top Markets</div>
          <div className="space-y-2">
            {(data.topMarkets || []).slice(0, 3).map((market, i) => (
              <motion.div
                key={market.market}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="font-bold text-white">{market.market}</span>
                </div>
                <span className="text-gray-400 text-sm">{market.count} trades</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Card>
    </div>
  );
}

function PnLSlide({ data }) {
  const pnl = data.totalPnl || 0;
  const isPositive = pnl >= 0;
  const animatedPnl = useCountUp(Math.abs(pnl), 2500);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`mb-6 p-4 rounded-full border ${
            isPositive
              ? 'bg-green-500/10 border-green-500/20'
              : 'bg-red-500/10 border-red-500/20'
          }`}
        >
          {isPositive ? (
            <ArrowUp size={24} className="text-green-400" />
          ) : (
            <ArrowDown size={24} className="text-red-400" />
          )}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
        >
          Total PnL
        </motion.h3>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className={`text-5xl md:text-7xl font-black tracking-tighter mb-4 ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isPositive ? '+' : '-'}${formatNumber(animatedPnl, 2)}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400"
        >
          {isPositive
            ? "Congrats! You're in the green!"
            : "Keep learning, every trader has tough years!"}
        </motion.p>
      </Card>
    </div>
  );
}

function FundingSlide({ data }) {
  const earned = data.totalFundingEarned || 0;
  const paid = data.totalFundingPaid || 0;
  const net = data.netFunding || 0;
  const animatedNet = useCountUp(Math.abs(net), 2000);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20"
        >
          <DollarSign size={24} className="text-cyan-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6"
        >
          Funding Payments
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-8 w-full mb-8"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">
              +${formatNumber(earned, 2)}
            </div>
            <div className="text-xs text-gray-500 uppercase mt-1">Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-red-400">
              -${formatNumber(paid, 2)}
            </div>
            <div className="text-xs text-gray-500 uppercase mt-1">Paid</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div className={`text-5xl md:text-6xl font-black tracking-tighter ${
            net >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {net >= 0 ? '+' : '-'}${formatNumber(animatedNet, 2)}
          </div>
          <div className="text-sm text-gray-500 font-normal uppercase mt-2">Net Funding</div>
        </motion.div>
      </Card>
    </div>
  );
}

function XPSlide({ data }) {
  const hasXP = data.totalXP > 0;
  const animatedXP = useCountUp(data.totalXP, 2500);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20"
        >
          <Coins size={24} className="text-yellow-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
        >
          XP & Rewards
        </motion.h3>

        {hasXP ? (
          <>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="text-5xl md:text-7xl font-black text-yellow-400 tracking-tighter mb-6"
            >
              {formatNumber(animatedXP, 0)}
              <span className="text-2xl ml-2">XP</span>
            </motion.div>

            {/* XP by Season */}
            {Object.keys(data.xpBySeason || {}).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full border-t border-cyan-500/10 pt-6"
              >
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">By Season</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(data.xpBySeason || {}).map(([season, xp], i) => {
                    const seasonLabels = {
                      preseason: 'Pre',
                      season1: 'S1',
                      season2: 'S2',
                    };
                    return (
                      <motion.div
                        key={season}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="p-3 bg-white/5 rounded-lg"
                      >
                        <div className="text-xs text-gray-500">{seasonLabels[season] || season}</div>
                        <div className="text-sm font-bold text-white">{formatNumber(xp, 0)}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="text-4xl md:text-5xl font-black text-yellow-400/60 tracking-tighter mb-4"
            >
              <Sparkles size={48} className="inline-block mb-2" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mb-6 max-w-sm"
            >
              XP data is only visible on the Paradex platform.
              Check your XP balance directly on Paradex!
            </motion.p>

            <motion.a
              href="https://app.paradex.trade"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold rounded-xl hover:bg-yellow-500/20 transition-colors flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Coins size={18} />
              View XP on Paradex
            </motion.a>
          </>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 mt-6 text-sm"
        >
          Ready for $DIME!
        </motion.p>
      </Card>
    </div>
  );
}

function BestTradeSlide({ data }) {
  const trade = data.bestTrade;
  if (!trade) return null;

  const pnl = parseFloat(trade.realized_pnl || 0);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20"
        >
          <Trophy size={24} className="text-yellow-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6"
        >
          Best Trade
        </motion.h3>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-green-400 mb-4"
        >
          +{formatCurrency(pnl)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 w-full max-w-sm"
        >
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <div className="text-xs text-gray-500 uppercase">Market</div>
            <div className="font-bold text-white">{trade.market || 'N/A'}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <div className="text-xs text-gray-500 uppercase">Size</div>
            <div className="font-bold text-white">${formatNumber(parseFloat(trade.size || 0) * parseFloat(trade.price || 0), 2)}</div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}

function StatsSlide({ data }) {
  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20"
        >
          <BarChart2 size={24} className="text-cyan-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8"
        >
          Fun Stats
        </motion.h3>

        <div className="grid grid-cols-2 gap-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-white/5 rounded-xl"
          >
            <Clock size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">{data.tradingDays}</div>
            <div className="text-xs text-gray-500 uppercase">Trading Days</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-white/5 rounded-xl"
          >
            <Activity size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">${formatNumber(data.avgTradeSize, 0)}</div>
            <div className="text-xs text-gray-500 uppercase">Avg Trade</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-white/5 rounded-xl"
          >
            <Zap size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">{data.mostActiveHour}:00</div>
            <div className="text-xs text-gray-500 uppercase">Peak Hour</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-white/5 rounded-xl"
          >
            <DollarSign size={20} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">${formatNumber(data.totalFeeSavings || 0, 0)}</div>
            <div className="text-xs text-gray-500 uppercase">Fee Savings</div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

function FinaleSlide({ data }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const copyCardToClipboard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          // Fallback: download the image
          const link = document.createElement('a');
          link.download = `paradex-wrapped-2025.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      });
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const shareOnX = () => {
    const text = `My 2025 Paradex Wrapped 🎁\n\n📊 Volume: ${formatCurrency(data.totalVolume)}\n📈 Trades: ${data.totalTrades.toLocaleString()}\n💰 PnL: ${data.totalPnl >= 0 ? '+' : ''}${formatCurrency(data.totalPnl)}\n⭐ XP: ${formatNumber(data.totalXP, 0)}\n\nCheck yours at xpparadex.com!\n\n#Paradex #ParadexWrapped`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center z-10 max-w-xl w-full px-4">
      {/* Share Card - Square format */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[360px] h-[360px] bg-gradient-to-br from-[#0a1628] via-[#0d1829] to-black rounded-2xl border border-cyan-500/20 p-6 flex flex-col relative overflow-hidden shadow-2xl"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-[60px]" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Paradex" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold text-sm">PARADEX</span>
          </div>
          <div className="text-cyan-400 text-xs font-bold">2025 WRAPPED</div>
        </div>

        {/* User */}
        <div className="mt-4 relative z-10">
          <div className="text-gray-400 text-xs uppercase tracking-wider">Trader</div>
          <div className="text-white font-black text-2xl">{data.username}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4 flex-1 relative z-10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-gray-500 text-[10px] uppercase">Volume</div>
            <div className="text-cyan-400 font-black text-lg">{formatCurrency(data.totalVolume)}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-gray-500 text-[10px] uppercase">Trades</div>
            <div className="text-white font-black text-lg">{data.totalTrades.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-gray-500 text-[10px] uppercase">PnL</div>
            <div className={`font-black text-lg ${data.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.totalPnl >= 0 ? '+' : ''}{formatCurrency(data.totalPnl)}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-gray-500 text-[10px] uppercase">Net Funding</div>
            <div className={`font-black text-lg ${data.netFunding >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.netFunding >= 0 ? '+' : ''}{formatCurrency(data.netFunding)}
            </div>
          </div>
        </div>

        {/* XP Badge */}
        <div className="mt-3 flex items-center justify-center gap-2 bg-yellow-500/10 rounded-lg py-2 px-4 border border-yellow-500/20 relative z-10">
          <Coins size={16} className="text-yellow-400" />
          <span className="text-yellow-400 font-black">{formatNumber(data.totalXP, 0)} XP</span>
        </div>

        {/* Dave Mascot */}
        <img
          src="/assets/character1.png"
          alt="Dave"
          className="absolute bottom-2 right-2 w-16 h-16 opacity-80 z-10"
        />

        {/* Footer */}
        <div className="mt-3 text-center text-gray-600 text-[10px] relative z-10">
          xpparadex.com
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 mt-6"
      >
        <button
          onClick={(e) => { e.stopPropagation(); copyCardToClipboard(); }}
          className="px-5 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10"
        >
          {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy Image'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); shareOnX(); }}
          className="px-5 py-3 bg-[#1DA1F2] text-white font-bold rounded-xl hover:bg-[#1a8cd8] transition-all flex items-center gap-2"
        >
          <Twitter size={18} />
          Share on X
        </button>
      </motion.div>

      {/* Keep Trading Button */}
      <motion.a
        href="https://app.paradex.trade/r/ghzcrypto"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="mt-4 px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
      >
        <Zap size={18} fill="black" />
        Keep Trading
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-gray-600 font-mono text-sm"
      >
        See you in 2026
      </motion.p>
    </div>
  );
}

function SlideContent({ slideIndex, data }) {
  switch (slideIndex) {
    case 0: return <WelcomeSlide data={data} />;
    case 1: return <VolumeSlide data={data} />;
    case 2: return <TradesSlide data={data} />;
    case 3: return <PnLSlide data={data} />;
    case 4: return <FundingSlide data={data} />;
    case 5: return <XPSlide data={data} />;
    case 6: return <BestTradeSlide data={data} />;
    case 7: return <StatsSlide data={data} />;
    case 8: return <FinaleSlide data={data} />;
    default: return <FinaleSlide data={data} />;
  }
}

export function PersonalWrapped({ data, onBack }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9;

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) setCurrentSlide(index);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onBack?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onBack]);

  return (
    <div
      className="w-full min-h-[calc(100vh-200px)] relative overflow-hidden flex flex-col items-center justify-center select-none rounded-3xl"
      onClick={(e) => {
        if (!e.target.closest('button') && !e.target.closest('a')) nextSlide();
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-black to-black" />
      <BackgroundGrid />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full flex items-center justify-center p-4 relative z-20"
        >
          <SlideContent slideIndex={currentSlide} data={data} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-8 z-30 flex flex-col items-center gap-4">
        <ProgressDots current={currentSlide} total={totalSlides} onDotClick={goToSlide} />

        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            disabled={currentSlide === 0}
            className="p-3 text-white/40 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-white/40 transition-colors rounded-full hover:bg-white/5"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 text-white/40 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-white/40 transition-colors rounded-full hover:bg-white/5"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={(e) => { e.stopPropagation(); onBack?.(); }}
        className="absolute top-4 left-4 z-30 px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
      >
        Back to Menu
      </button>
    </div>
  );
}
