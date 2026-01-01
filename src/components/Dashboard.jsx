import React from 'react';
import { motion } from 'framer-motion';
import { ParadexStats } from './ParadexStats';
import { Zap, TrendingUp, Sparkles, ArrowRight, ExternalLink, Gift, Calculator, BarChart3 } from 'lucide-react';

const FloatingOrb = ({ delay, size, position, color }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${size} ${position}`}
        style={{ background: color }}
        animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
        }}
        transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

const FeatureCard = ({ icon: Icon, title, description, onClick, gradient, badge }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative group text-left w-full"
    >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
        <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 h-full">
            {badge && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-full">
                    {badge}
                </span>
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            <div className="flex items-center gap-1 mt-4 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </motion.button>
);

export function Dashboard({ onNavigate }) {
    return (
        <div className="w-full flex flex-col items-center gap-16 relative">
            {/* Floating Background Orbs */}
            <FloatingOrb delay={0} size="w-96 h-96" position="-top-48 -left-48" color="#22d3ee" />
            <FloatingOrb delay={2} size="w-64 h-64" position="top-32 -right-32" color="#3b82f6" />
            <FloatingOrb delay={4} size="w-48 h-48" position="bottom-0 left-1/4" color="#8b5cf6" />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-8 max-w-4xl mx-auto relative z-10"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-gray-300">The #1 Unofficial Paradex Hub</span>
                </motion.div>

                {/* Main Title */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                    >
                        MAXIMIZE YOUR
                        <br />
                        <span className="relative">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                                XP GAINS
                            </span>
                            <motion.span
                                className="absolute -right-8 -top-2"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-6 h-6 text-yellow-400" />
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto"
                    >
                        Track markets, calculate your airdrop, and stay ahead of the curve.
                        <span className="text-cyan-400 font-medium"> Join 10,000+ Paradex maximalists.</span>
                    </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 pt-4"
                >
                    <motion.a
                        href="https://app.paradex.trade/r/ghzcrypto"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                            <Zap size={20} fill="currentColor" />
                            Start Farming XP
                            <ExternalLink size={16} />
                        </span>
                    </motion.a>

                    <motion.button
                        onClick={() => onNavigate('wrapped')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 backdrop-blur-md flex items-center gap-2"
                    >
                        <Gift size={20} className="text-cyan-400" />
                        2025 Wrapped
                        <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full">NEW</span>
                    </motion.button>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap justify-center items-center gap-8 pt-4 text-sm text-gray-500"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-black flex items-center justify-center text-xs font-bold text-white">
                                    {['G', 'F', 'N', 'W'][i-1]}
                                </div>
                            ))}
                        </div>
                        <span>Built by traders</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <a
                        href="https://ghz.capital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                    >
                        <span>Powered by</span>
                        <span className="font-bold text-white">ghz.capital</span>
                        <ExternalLink size={12} />
                    </a>
                </motion.div>
            </motion.div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Feature Cards */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-full"
            >
                <div className="flex items-center justify-between mb-8 px-4">
                    <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Calculator}
                        title="XP Calculator"
                        description="Estimate your potential airdrop value across different FDV scenarios."
                        onClick={() => onNavigate('calculator')}
                        gradient="from-cyan-500 to-blue-500"
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="Market Analytics"
                        description="Real-time market data, open interest, and volume analytics."
                        onClick={() => onNavigate('analytics')}
                        gradient="from-purple-500 to-pink-500"
                    />
                    <FeatureCard
                        icon={Gift}
                        title="2025 Wrapped"
                        description="See your complete trading year in review with shareable stats."
                        onClick={() => onNavigate('wrapped')}
                        gradient="from-orange-500 to-red-500"
                        badge="HOT"
                    />
                </div>
            </motion.div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* FundingView Promotion */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="w-full"
            >
                <a
                    href="https://fundingview.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/30 transition-colors" />

                    <div className="relative p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                            <img src="/assets/fundingview.png" alt="FundingView" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <span className="px-2 py-1 text-xs font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/20">
                                    PASSIVE XP
                                </span>
                                <span className="px-2 py-1 text-xs font-bold bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/20">
                                    RECOMMENDED
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                Earn XP While You Sleep
                            </h3>
                            <p className="text-gray-400 max-w-lg">
                                FundingView automates delta-neutral strategies on Paradex. Farm XP passively with minimized risk.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                            <TrendingUp size={20} className="text-cyan-400" />
                            <span className="font-bold text-white">Try Free</span>
                            <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </a>
            </motion.div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Market Pulse */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="w-full"
            >
                <div className="flex items-center justify-between mb-8 px-4">
                    <h3 className="text-2xl font-bold text-white">Market Pulse</h3>
                    <button
                        onClick={() => onNavigate('analytics')}
                        className="text-cyan-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                        View All
                        <ArrowRight size={16} />
                    </button>
                </div>
                <ParadexStats />
            </motion.div>
        </div>
    );
}
