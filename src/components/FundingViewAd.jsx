import React, { useState } from 'react';
import { ExternalLink, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FundingViewAd() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-xs md:max-w-sm"
            >
                <div className="relative group">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-2 -right-2 z-20 bg-white/10 hover:bg-white/20 text-white p-1 rounded-full backdrop-blur-md border border-white/10 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Close ad"
                    >
                        <X size={14} />
                    </button>

                    <a
                        href="https://fundingview.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative overflow-hidden rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(255,100,100,0.3)] transition-all duration-300"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="p-4 flex gap-4 items-center">
                            {/* Image */}
                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 relative">
                                <img
                                    src="/assets/fundingview.png"
                                    alt="Funding View"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                                        RECOMMENDED
                                    </span>
                                </div>
                                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-red-400 transition-colors">
                                    Funding View
                                </h3>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    Track funding rates & farm passive XP for Paradex.
                                </p>
                            </div>

                            <div className="text-gray-500 group-hover:text-white transition-colors">
                                <ExternalLink size={20} />
                            </div>
                        </div>
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
