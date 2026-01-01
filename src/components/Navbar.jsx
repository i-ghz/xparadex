import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Grid, ChevronDown, ExternalLink, Zap, Home, Calculator, BarChart2, Coins, Globe, Map, Handshake, Gift, Sparkles } from 'lucide-react';

export function Navbar({ activeTab, onTabChange }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <Home size={24} />, description: 'Overview & stats' },
        { id: 'wrapped', label: '2025 Wrapped', icon: <Gift size={24} />, description: 'Your year in review', badge: 'NEW' },
        { id: 'calculator', label: 'XP Calculator', icon: <Calculator size={24} />, description: 'Estimate airdrop' },
        { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={24} />, description: 'Market data' },
        { id: 'tokenomics', label: 'Tokenomics', icon: <Coins size={24} />, description: 'Token distribution' },
        { id: 'ecosystem', label: 'Ecosystem', icon: <Globe size={24} />, description: 'Tools & team' },
        { id: 'roadmap', label: 'Roadmap', icon: <Map size={24} />, description: 'What\'s next' },
        { id: 'otc', label: 'Paradex OTC', icon: <Handshake size={24} />, description: 'Trade XP' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Left: Logo */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
                            onClick={() => onTabChange('dashboard')}
                        >
                            <div className="relative p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
                                <img src="/assets/logo.png" alt="Paradex" className="h-8 w-auto" />
                                <motion.div
                                    className="absolute -top-1 -right-1"
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Sparkles size={12} className="text-yellow-400" />
                                </motion.div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">
                                    XP PARADEX
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">
                                    Maximalist Hub
                                </span>
                            </div>
                        </motion.div>

                        {/* Center: App Switcher */}
                        <div className="hidden md:flex justify-center flex-1">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300
                                    ${isMenuOpen
                                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                                    }
                                `}
                            >
                                <Grid size={16} />
                                <span className="font-semibold text-sm">Apps</span>
                                <motion.div
                                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={14} />
                                </motion.div>
                            </motion.button>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://ghz.capital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden lg:flex items-center gap-1.5 text-gray-500 hover:text-cyan-400 text-sm font-medium transition-colors"
                            >
                                <span>ghz.capital</span>
                                <ExternalLink size={10} />
                            </a>

                            <motion.a
                                href="https://app.paradex.trade/r/ghzcrypto"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-sm font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Zap size={14} fill="currentColor" className="relative" />
                                <span className="relative hidden sm:inline">Start Farming</span>
                                <span className="relative sm:hidden">Farm</span>
                            </motion.a>

                            {/* Mobile Menu Toggle */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <AnimatePresence mode="wait">
                                    {isMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <X size={24} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <Menu size={24} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* App Switcher Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-20 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10"
                        >
                            <div className="max-w-7xl mx-auto px-4 py-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {tabs.map((tab, index) => (
                                        <motion.button
                                            key={tab.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => {
                                                onTabChange(tab.id);
                                                setIsMenuOpen(false);
                                            }}
                                            className={`
                                                relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border transition-all duration-300 group
                                                ${activeTab === tab.id
                                                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                                                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                                                }
                                            `}
                                        >
                                            {tab.badge && (
                                                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-full">
                                                    {tab.badge}
                                                </span>
                                            )}
                                            <div className={`transition-all duration-300 ${activeTab === tab.id ? 'text-cyan-400 scale-110' : 'text-gray-400 group-hover:text-white group-hover:scale-110'}`}>
                                                {tab.icon}
                                            </div>
                                            <div className="text-center">
                                                <span className={`font-bold text-sm block ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-300 group-hover:text-white'}`}>
                                                    {tab.label}
                                                </span>
                                                <span className="text-[10px] text-gray-500 hidden md:block">
                                                    {tab.description}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Mobile Extra Links */}
                                <div className="md:hidden mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                                    <a
                                        href="https://fundingview.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src="/assets/fundingview.png" alt="FundingView" className="w-8 h-8 rounded-lg" />
                                            <div>
                                                <span className="font-bold text-white text-sm">FundingView</span>
                                                <span className="text-xs text-gray-400 block">Passive XP farming</span>
                                            </div>
                                        </div>
                                        <ExternalLink size={14} className="text-cyan-400" />
                                    </a>
                                    <a
                                        href="https://ghz.capital"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-cyan-400 font-medium text-sm transition-colors"
                                    >
                                        <span>Visit ghz.capital</span>
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
