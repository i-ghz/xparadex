import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, X, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FundingViewAd() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Delay showing the ad for a better UX
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 100, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 100, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-xs md:max-w-sm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative group">
                    {/* Close Button */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setIsVisible(false)}
                                className="absolute -top-2 -right-2 z-20 bg-white/10 hover:bg-red-500/50 text-white p-1.5 rounded-full backdrop-blur-md border border-white/10 transition-colors"
                                aria-label="Close ad"
                            >
                                <X size={12} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Glow Effect */}
                    <motion.div
                        animate={{
                            boxShadow: isHovered
                                ? '0 0 60px rgba(34, 211, 238, 0.4)'
                                : '0 0 30px rgba(34, 211, 238, 0.2)'
                        }}
                        className="absolute inset-0 rounded-2xl"
                    />

                    <a
                        href="https://fundingview.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0d1829] to-[#0a0a0a] backdrop-blur-xl border border-cyan-500/20 shadow-2xl transition-all duration-500 hover:border-cyan-500/50"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-30">
                            <motion.div
                                className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl"
                                animate={{
                                    x: [0, 10, 0],
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/30 rounded-full blur-3xl"
                                animate={{
                                    x: [0, -10, 0],
                                    y: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>

                        <div className="relative p-5">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-500/30 shadow-lg"
                                    >
                                        <img
                                            src="/assets/fundingview.png"
                                            alt="Funding View"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/20 flex items-center gap-1">
                                                <Sparkles size={10} />
                                                PASSIVE XP
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-lg mt-1 group-hover:text-cyan-400 transition-colors">
                                            FundingView
                                        </h3>
                                    </div>
                                </div>
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Earn XP while you sleep. Automated delta-neutral strategies with minimized risk.
                            </p>

                            {/* CTA */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors"
                            >
                                <Zap size={16} className="text-cyan-400" />
                                <span className="font-bold text-white text-sm">Start Farming Free</span>
                                <TrendingUp size={14} className="text-green-400" />
                            </motion.div>
                        </div>
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
