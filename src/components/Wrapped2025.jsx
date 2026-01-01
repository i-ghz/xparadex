import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Users, Activity, Zap, DollarSign, Heart, Shield, Rocket, ArrowRight, User, Globe, Key, Eye, EyeOff, Lock, ExternalLink, AlertCircle, Loader2, Trophy, Clock, BarChart2, Star, Coins, Copy, Check, ArrowUp, ArrowDown } from 'lucide-react';
import { useParadexAccount } from '../hooks/useParadexAccount';
import html2canvas from 'html2canvas';

// Format large numbers
function formatNumber(num, decimals = 0) {
  const absNum = Math.abs(num);
  if (absNum >= 1e9) return (absNum / 1e9).toFixed(2) + 'B';
  if (absNum >= 1e6) return (absNum / 1e6).toFixed(2) + 'M';
  if (absNum >= 1e3) return (absNum / 1e3).toFixed(1) + 'K';
  return absNum.toFixed(decimals);
}

// Format currency - handles all sizes properly
function formatCurrency(num) {
  const absNum = Math.abs(num);
  if (absNum >= 1e9) return '$' + (absNum / 1e9).toFixed(2) + 'B';
  if (absNum >= 1e6) return '$' + (absNum / 1e6).toFixed(2) + 'M';
  if (absNum >= 1e3) return '$' + (absNum / 1e3).toFixed(1) + 'K';
  if (absNum >= 1) return '$' + absNum.toFixed(2);
  return '$' + absNum.toFixed(2);
}

const PARADEX_SLIDES = [
  {
    id: 'hero',
    type: 'hero',
    title: 'PARADEX',
    subtitle: '2025 WRAPPED',
    description: 'The year of the maximalist.',
  },
  {
    id: 'sorry',
    type: 'apology',
    label: 'WE MESSED UP. WE\'RE SORRY.',
    items: [
      { before: '$14.8M', after: '$651M', multiplier: '30x', label: 'Open Interest' },
      { before: '$2.1M', after: '$46.2M', multiplier: '22x', label: 'Daily Volume' },
      { before: '$24.9M', after: '$162M', multiplier: '6.5x', label: 'TVL' },
      { before: '2,400', after: '14,400', multiplier: '6x', label: 'Daily Users' },
    ],
    footer: 'sorry for making everyone else look useless',
  },
  {
    id: 'volume',
    type: 'bigstat',
    label: 'CUMULATIVE VOLUME',
    value: 137000000000,
    prefix: '$',
    suffix: 'B',
    displayValue: '137',
    description: 'Total trading volume in 2025',
    icon: TrendingUp,
  },
  {
    id: 'oi',
    type: 'growth',
    label: 'OPEN INTEREST',
    from: '$14.8M',
    to: '$651M',
    toValue: 651,
    multiplier: '30x',
    peak: '$1.5B',
    peakLabel: 'Peak OI',
    icon: Activity,
  },
  {
    id: 'tvl',
    type: 'growth',
    label: 'TOTAL VALUE LOCKED',
    from: '$24.9M',
    to: '$162M',
    toValue: 162,
    multiplier: '6.5x',
    icon: Shield,
  },
  {
    id: 'revenue',
    type: 'bigstat',
    label: 'REVENUE EARNED',
    value: 14200000,
    prefix: '$',
    suffix: 'M',
    displayValue: '14.2',
    description: 'Protocol revenue in 2025',
    icon: DollarSign,
    miniStats: [
      { value: '$1.8M', label: 'Best Month (October)' },
      { value: '50+', label: 'Major Features' },
    ],
  },
  {
    id: 'gigavault',
    type: 'vault',
    label: 'GIGAVAULT',
    from: '$5M',
    to: '$99M',
    pnl: '$7M',
    pnlValue: 7,
    description: 'Multi-strategy vault evolution',
    features: [
      'Enabled market making',
      'Deepened platform liquidity',
      'Increased returns for depositors',
    ],
    icon: Rocket,
  },
  {
    id: 'community',
    type: 'bigstat',
    label: 'XP HOLDERS',
    value: 48000,
    prefix: '',
    suffix: 'K',
    displayValue: '48',
    description: 'Future $DIME token holders',
    icon: Users,
  },
  {
    id: 'features',
    type: 'timeline',
    label: 'MAJOR RELEASES',
    icon: Sparkles,
    items: [
      { month: 'JAN', name: 'Multi Strategy Vaults', icon: '🏦' },
      { month: 'MAR', name: 'Perpetual Options', icon: '📊', badge: 'FIRST IN CRYPTO' },
      { month: 'APR', name: 'iOS App', icon: '📱' },
      { month: 'JUN', name: 'Retail Price Improvement', icon: '💎' },
      { month: 'SEP', name: 'Zero Fee Perps', icon: '🔥' },
      { month: 'OCT', name: 'Cairo Native', icon: '⚡', badge: '2x TPS' },
    ],
  },
  {
    id: 'paradex-finale',
    type: 'paradex-finale',
    title: 'Thank You',
    description: 'For being part of the Paradex journey in 2025',
    icon: Heart,
  },
];

// Personal slides structure (used after JWT auth)
const PERSONAL_SLIDE_TYPES = [
  'personal-welcome',
  'personal-volume',
  'personal-trades',
  'personal-pnl',
  'personal-funding',
  'personal-xp',
  'personal-besttrade',
  'personal-stats',
  'personal-finale',
];

// Pre-computed mascot positions with autonomous movement
const MASCOT_CONFIG = [
  { src: '/assets/character1.png', x: 3, y: 8, size: 90, floatY: 40, floatDuration: 8, rotateDeg: 8, delay: 0 },
  { src: '/assets/character2.png', x: 88, y: 12, size: 75, floatY: 35, floatDuration: 10, rotateDeg: 6, delay: 1 },
  { src: '/assets/character3.png', x: 8, y: 72, size: 100, floatY: 45, floatDuration: 9, rotateDeg: 10, delay: 2 },
  { src: '/assets/character4.png', x: 92, y: 68, size: 65, floatY: 30, floatDuration: 7, rotateDeg: 5, delay: 0.5 },
  { src: '/assets/character5.png', x: 45, y: 3, size: 55, floatY: 25, floatDuration: 11, rotateDeg: 7, delay: 1.5 },
  { src: '/assets/character6.png', x: 75, y: 85, size: 70, floatY: 38, floatDuration: 8.5, rotateDeg: 9, delay: 2.5 },
];

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

// Single Mascot with autonomous movement
function FloatingMascot({ config }) {
  return (
    <motion.img
      src={config.src}
      alt=""
      className="absolute opacity-[0.12] select-none"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        width: config.size,
        filter: 'blur(0.5px)',
      }}
      animate={{
        y: [0, -config.floatY, 0, config.floatY * 0.5, 0],
        x: [0, 15, 0, -15, 0],
        rotate: [-config.rotateDeg, config.rotateDeg, -config.rotateDeg],
        scale: [1, 1.05, 1, 0.98, 1],
      }}
      transition={{
        duration: config.floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: config.delay,
      }}
    />
  );
}

// Floating Mascots Container
function FloatingMascots() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {MASCOT_CONFIG.map((config, i) => (
        <FloatingMascot key={i} config={config} />
      ))}
    </div>
  );
}

// Animated Counter Hook
function useCountUp(end, duration = 2000, startOnMount = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!startOnMount || started) return;
    setStarted(true);

    const startTime = Date.now();
    const endValue = parseFloat(end);

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
  }, [end, duration, startOnMount, started]);

  return count;
}

// Animated Number Display
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const count = useCountUp(value, 2500);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

// Mini Bar Chart Animation
function MiniChart({ delay = 0 }) {
  const bars = [0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.75, 0.9, 0.85, 1];

  return (
    <div className="flex items-end gap-1 h-16 mt-4">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-2 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${height * 100}%` }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
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

// Card Component
function Card({ children, className = '' }) {
  return (
    <div className={`p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-cyan-500/10 shadow-[0_0_60px_-15px_rgba(34,211,238,0.15)] ${className}`}>
      {children}
    </div>
  );
}

// --- SLIDE COMPONENTS --- //

function HeroSlide({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center text-center z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-cyan-400/30 blur-[100px] scale-150" />
        <motion.img
          src="/assets/logo.png"
          alt="Paradex"
          className="relative w-32 h-32 rounded-xl"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4"
      >
        {slide.title}
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-widest uppercase mb-4"
      >
        {slide.subtitle}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 font-mono text-sm"
      >
        {slide.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="mt-12 text-gray-600 text-sm"
      >
        tap anywhere to continue →
      </motion.div>
    </div>
  );
}

function ApologySlide({ slide }) {
  return (
    <div className="max-w-4xl w-full z-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-10"
      >
        <span className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold rounded-full">
          {slide.label}
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {slide.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <Card className="py-8 hover:border-cyan-500/30 transition-all">
              <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-4">
                {item.label}
              </div>

              {/* Before → After */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-lg text-gray-500 line-through">{item.before}</span>
                <ArrowRight size={16} className="text-cyan-400" />
                <span className="text-2xl font-bold text-white">{item.after}</span>
              </div>

              {/* Multiplier */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full"
              >
                <span className="text-2xl font-black text-cyan-400">{item.multiplier}</span>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-gray-600 italic mt-8 font-mono text-sm"
      >
        {slide.footer}
      </motion.p>
    </div>
  );
}

function BigStatSlide({ slide }) {
  const Icon = slide.icon;

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-16 overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20"
        >
          <Icon size={24} className="text-cyan-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
        >
          {slide.label}
        </motion.h3>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2"
        >
          <AnimatedNumber
            value={parseFloat(slide.displayValue)}
            prefix={slide.prefix}
            suffix={slide.suffix}
            decimals={slide.displayValue.includes('.') ? 1 : 0}
          />
        </motion.div>

        <MiniChart delay={0.5} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 font-medium max-w-sm mt-4"
        >
          {slide.description}
        </motion.p>

        {slide.miniStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-8 mt-10 w-full border-t border-cyan-500/10 pt-8"
          >
            {slide.miniStats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </Card>
    </div>
  );
}

function GrowthSlide({ slide }) {
  const Icon = slide.icon;
  const animatedValue = useCountUp(slide.toValue, 2000);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8 text-cyan-400 font-mono text-xs uppercase tracking-widest"
        >
          <Icon size={14} />
          {slide.label}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="text-center">
            <div className="text-xl font-bold text-gray-500">{slide.from}</div>
            <div className="text-[10px] text-gray-600 uppercase mt-1">Jan 2025</div>
          </div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={24} className="text-cyan-400" />
          </motion.div>

          <div className="text-center">
            <div className="text-4xl font-black text-cyan-400">
              ${animatedValue.toFixed(0)}M
            </div>
            <div className="text-[10px] text-gray-500 uppercase mt-1">Dec 2025</div>
          </div>
        </motion.div>

        {/* Animated growth bar */}
        <div className="w-full max-w-xs mb-8">
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
              initial={{ width: '3%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 0.3 }}
          className="text-7xl md:text-8xl font-black text-white tracking-tighter mb-2"
        >
          {slide.multiplier}
        </motion.div>
        <div className="text-sm text-gray-500 uppercase tracking-widest mb-6">Growth</div>

        {slide.peak && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-4 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-xs font-mono"
          >
            <span className="text-gray-400">{slide.peakLabel}: </span>
            <span className="text-cyan-400 font-bold">{slide.peak}</span>
          </motion.div>
        )}
      </Card>
    </div>
  );
}

function VaultSlide({ slide }) {
  const Icon = slide.icon;
  const animatedPnl = useCountUp(slide.pnlValue, 2000);

  return (
    <div className="max-w-3xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8 text-cyan-400 font-mono text-xs uppercase tracking-widest"
        >
          <Icon size={14} />
          {slide.label}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-8 w-full mb-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">{slide.from}</div>
            <div className="text-[10px] text-gray-600 uppercase mt-1">Start</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-cyan-400">{slide.to}</div>
            <div className="text-[10px] text-gray-500 uppercase mt-1">Now</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl font-black text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              +${animatedPnl.toFixed(0)}M
            </motion.div>
            <div className="text-[10px] text-gray-500 uppercase mt-1">PnL Generated</div>
          </div>
        </motion.div>

        {/* Animated vault growth bar */}
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>$5M</span>
            <span>$99M</span>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-cyan-400 rounded-full flex items-center justify-end pr-2"
              initial={{ width: '5%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            >
              <motion.span
                className="text-[10px] font-bold text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                +{slide.pnl} PnL
              </motion.span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-3 border-t border-cyan-500/10 pt-8"
        >
          {slide.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center justify-center gap-3 text-gray-300"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </div>
  );
}

function TimelineSlide({ slide }) {
  const Icon = slide.icon;

  return (
    <div className="max-w-2xl w-full z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mb-8"
      >
        <span className="px-4 py-2 border border-cyan-500/20 bg-cyan-500/5 rounded-full text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <Icon size={12} />
          {slide.label}
        </span>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <motion.div
          className="absolute left-[52px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1 }}
        />

        <div className="grid gap-3">
          {slide.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.12 }}
            >
              <Card className="!p-4 flex items-center gap-4 hover:border-cyan-500/30 transition-all ml-4">
                <div className="font-mono text-xs font-bold text-cyan-400 w-10">{item.month}</div>
                <motion.div
                  className="text-xl"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <div className="font-bold text-white flex-1">{item.name}</div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20 font-mono">
                    {item.badge}
                  </span>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParadexFinaleSlide({ slide, onGetPersonalStats, loading, loadingStatus, error }) {
  const [jwt, setJwt] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [showJwtInput, setShowJwtInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (jwt.trim() && onGetPersonalStats) {
      onGetPersonalStats(jwt.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center z-10 max-w-xl w-full px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6 relative"
      >
        <motion.div
          className="absolute inset-0 bg-cyan-400/30 blur-[80px] scale-150"
          animate={{ scale: [1.5, 1.8, 1.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.img
          src="/assets/logo.png"
          alt="Paradex"
          className="relative w-20 h-20 rounded-xl shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter"
      >
        {slide.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-400 mb-6"
      >
        {slide.description}
      </motion.p>

      {/* Get Personal Stats Section */}
      {!showJwtInput ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-4"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setShowJwtInput(true); }}
            className="w-full py-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 text-yellow-400 font-bold rounded-xl hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all flex items-center justify-center gap-3"
          >
            <User size={20} />
            Get Your Personal Wrapped
            <ArrowRight size={18} />
          </button>

          <a
            href="https://app.paradex.trade/r/ghzcrypto"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            <Zap size={20} fill="black" />
            Trade on Paradex
          </a>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Key size={20} />
              </div>
              <input
                type={showToken ? 'text' : 'password'}
                value={jwt}
                onChange={(e) => setJwt(e.target.value)}
                placeholder="Paste your API key here..."
                className="w-full px-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono text-sm"
                disabled={loading}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowToken(!showToken); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showToken ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={!jwt.trim() || loading}
              onClick={(e) => e.stopPropagation()}
              className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(234,179,8,0.3)]"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  {loadingStatus || 'Loading...'}
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate My Wrapped
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 text-left">
            <div className="flex items-start gap-2 text-xs text-gray-400 mb-3">
              <Lock size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-green-400 font-medium">100% secure - Read-only access only. We can only view your stats, nothing else.</span>
            </div>
            <div className="text-xs text-gray-500 space-y-1.5">
              <p className="text-gray-300 font-medium mb-2">How to get your API key:</p>
              <p>1. Go to <a href="https://app.paradex.trade" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-cyan-400 hover:underline">app.paradex.trade</a></p>
              <p>2. Click on your profile (top right)</p>
              <p>3. Go to <span className="text-white">Settings</span></p>
              <p>4. Open <span className="text-white">Key Management</span> tab</p>
              <p>5. Create a <span className="text-cyan-400">Read-only</span> key and paste it here</p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setShowJwtInput(false); }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Back
          </button>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-gray-600 font-mono text-sm"
      >
        See you in 2026
      </motion.p>
    </div>
  );
}

// Personal Slides Components

function PersonalWelcomeSlide({ data }) {
  return (
    <div className="flex flex-col items-center justify-center text-center z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-yellow-400/30 blur-[100px] scale-150" />
        <motion.div
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-5xl font-black text-black"
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
        Now, {data.username}!
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl font-bold text-yellow-400 tracking-widest uppercase mb-4"
      >
        YOUR PERSONAL STATS
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

function PersonalVolumeSlide({ data }) {
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
          Your Trading Volume
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

function PersonalTradesSlide({ data }) {
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

function PersonalPnLSlide({ data }) {
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
            isPositive ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'
          }`}
        >
          {isPositive ? <ArrowUp size={24} className="text-green-400" /> : <ArrowDown size={24} className="text-red-400" />}
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
          className={`text-5xl md:text-7xl font-black tracking-tighter mb-4 ${isPositive ? 'text-green-400' : 'text-red-400'}`}
        >
          {isPositive ? '+' : '-'}${formatNumber(animatedPnl, 2)}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400"
        >
          {isPositive ? "Congrats! You're in the green!" : "Keep learning, every trader has tough years!"}
        </motion.p>
      </Card>
    </div>
  );
}

function PersonalFundingSlide({ data }) {
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
            <div className="text-3xl font-black text-green-400">+${formatNumber(earned, 2)}</div>
            <div className="text-xs text-gray-500 uppercase mt-1">Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-red-400">-${formatNumber(paid, 2)}</div>
            <div className="text-xs text-gray-500 uppercase mt-1">Paid</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div className={`text-5xl md:text-6xl font-black tracking-tighter ${net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {net >= 0 ? '+' : '-'}${formatNumber(animatedNet, 2)}
          </div>
          <div className="text-sm text-gray-500 font-normal uppercase mt-2">Net Funding</div>
        </motion.div>
      </Card>
    </div>
  );
}

function PersonalXPSlide({ data }) {
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
                    const seasonLabels = { preseason: 'Pre', season1: 'S1', season2: 'S2' };
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-6 max-w-sm"
          >
            XP data not available via API. Check your balance on Paradex!
          </motion.p>
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

function PersonalBestTradeSlide({ data }) {
  const trade = data.bestTrade;
  if (!trade) return null;

  const pnl = parseFloat(trade.realized_pnl || 0);
  const isPositive = pnl >= 0;
  const tradeSize = parseFloat(trade.size || 0) * parseFloat(trade.price || 0);

  return (
    <div className="max-w-2xl w-full z-10">
      <Card className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`mb-6 p-4 rounded-full border ${isPositive ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20'}`}
        >
          <Trophy size={24} className={isPositive ? 'text-yellow-400' : 'text-red-400'} />
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
          className={`text-4xl md:text-5xl font-black mb-4 ${isPositive ? 'text-green-400' : 'text-red-400'}`}
        >
          {isPositive ? '+' : '-'}{formatCurrency(pnl)}
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
            <div className="font-bold text-white">{formatCurrency(tradeSize)}</div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}

function PersonalStatsSlide({ data }) {
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 bg-white/5 rounded-xl">
            <Clock size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">{data.tradingDays}</div>
            <div className="text-xs text-gray-500 uppercase">Trading Days</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-white/5 rounded-xl">
            <Activity size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">${formatNumber(data.avgTradeSize, 0)}</div>
            <div className="text-xs text-gray-500 uppercase">Avg Trade</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 bg-white/5 rounded-xl">
            <Zap size={20} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">{data.mostActiveHour}:00</div>
            <div className="text-xs text-gray-500 uppercase">Peak Hour</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-4 bg-white/5 rounded-xl">
            <DollarSign size={20} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">${formatNumber(data.totalFeeSavings || 0, 0)}</div>
            <div className="text-xs text-gray-500 uppercase">Fee Savings</div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

function PersonalFinaleSlide({ data }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const copyCardToClipboard = async () => {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Convert canvas to blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      // Try clipboard API first (Chrome, modern browsers)
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          setIsGenerating(false);
          return;
        } catch (clipboardError) {
          console.log('Clipboard API failed, falling back to download');
        }
      }

      // Fallback: download the image
      const link = document.createElement('a');
      link.download = `paradex-wrapped-2025-${data.username}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareOnX = () => {
    const text = `My 2025 Paradex Wrapped 🎁\n\n📊 Volume: ${formatCurrency(data.totalVolume)}\n📈 Trades: ${data.totalTrades.toLocaleString()}\n💰 PnL: ${data.totalPnl >= 0 ? '+' : ''}${formatCurrency(data.totalPnl)}\n⭐ XP: ${formatNumber(data.totalXP, 0)}\n\nCheck yours at xpparadex.com!\n\n#Paradex #ParadexWrapped`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center z-10 max-w-xl w-full px-4">
      {/* Share Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[360px] h-[360px] bg-gradient-to-br from-[#0a1628] via-[#0d1829] to-black rounded-2xl border border-cyan-500/20 p-6 flex flex-col relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-[60px]" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Paradex" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold text-sm">PARADEX</span>
          </div>
          <div className="text-cyan-400 text-xs font-bold">2025 WRAPPED</div>
        </div>

        <div className="mt-4 relative z-10">
          <div className="text-gray-400 text-xs uppercase tracking-wider">Trader</div>
          <div className="text-white font-black text-2xl">{data.username}</div>
        </div>

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

        <div className="mt-3 flex items-center justify-center gap-2 bg-yellow-500/10 rounded-lg py-2 px-4 border border-yellow-500/20 relative z-10">
          <Coins size={16} className="text-yellow-400" />
          <span className="text-yellow-400 font-black">{formatNumber(data.totalXP, 0)} XP</span>
        </div>

        <img src="/assets/character1.png" alt="Dave" className="absolute bottom-2 right-2 w-16 h-16 opacity-80 z-10" />

        <div className="mt-3 text-center text-gray-600 text-[10px] relative z-10">xpparadex.com</div>
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
          disabled={isGenerating}
          className="px-5 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} />
          )}
          {isGenerating ? 'Generating...' : copied ? 'Copied!' : 'Copy Image'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); shareOnX(); }}
          className="px-5 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <span className="font-black text-lg">𝕏</span>
          Share on X
        </button>
      </motion.div>

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

function SlideContent({ slide, personalData, onGetPersonalStats, loading, loadingStatus, error }) {
  switch (slide.type) {
    case 'hero': return <HeroSlide slide={slide} />;
    case 'apology': return <ApologySlide slide={slide} />;
    case 'bigstat': return <BigStatSlide slide={slide} />;
    case 'growth': return <GrowthSlide slide={slide} />;
    case 'vault': return <VaultSlide slide={slide} />;
    case 'timeline': return <TimelineSlide slide={slide} />;
    case 'paradex-finale': return <ParadexFinaleSlide slide={slide} onGetPersonalStats={onGetPersonalStats} loading={loading} loadingStatus={loadingStatus} error={error} />;
    // Personal slides
    case 'personal-welcome': return <PersonalWelcomeSlide data={personalData} />;
    case 'personal-volume': return <PersonalVolumeSlide data={personalData} />;
    case 'personal-trades': return <PersonalTradesSlide data={personalData} />;
    case 'personal-pnl': return <PersonalPnLSlide data={personalData} />;
    case 'personal-funding': return <PersonalFundingSlide data={personalData} />;
    case 'personal-xp': return <PersonalXPSlide data={personalData} />;
    case 'personal-besttrade': return <PersonalBestTradeSlide data={personalData} />;
    case 'personal-stats': return <PersonalStatsSlide data={personalData} />;
    case 'personal-finale': return <PersonalFinaleSlide data={personalData} />;
    default: return <HeroSlide slide={slide} />;
  }
}

// Main Wrapped2025 Component - Unified Flow
export function Wrapped2025() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [personalData, setPersonalData] = useState(null);
  const { fetchAccountData, loading, loadingStatus, error } = useParadexAccount();

  // Build the slides array dynamically
  const slides = useMemo(() => {
    const allSlides = [...PARADEX_SLIDES];

    // Add personal slides if we have personal data
    if (personalData) {
      PERSONAL_SLIDE_TYPES.forEach(type => {
        allSlides.push({ id: type, type });
      });
    }

    return allSlides;
  }, [personalData]);

  const totalSlides = slides.length;

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) setCurrentSlide(index);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  }, [currentSlide]);

  const handleGetPersonalStats = async (jwt) => {
    try {
      const data = await fetchAccountData(jwt);
      setPersonalData(data);
      // Move to next slide (personal welcome) after data is loaded
      setTimeout(() => {
        setCurrentSlide(PARADEX_SLIDES.length); // First personal slide
      }, 100);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];

  return (
    <div
      className="w-full min-h-[calc(100vh-200px)] relative overflow-hidden flex flex-col items-center justify-center select-none rounded-3xl"
      onClick={(e) => {
        if (!e.target.closest('button') && !e.target.closest('a') && !e.target.closest('input')) nextSlide();
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-black to-black" />
      <BackgroundGrid />
      <FloatingMascots />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full flex items-center justify-center p-4 relative z-20"
        >
          <SlideContent
            slide={slide}
            personalData={personalData}
            onGetPersonalStats={handleGetPersonalStats}
            loading={loading}
            loadingStatus={loadingStatus}
            error={error}
          />
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
    </div>
  );
}
