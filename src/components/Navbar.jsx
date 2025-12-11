import React, { useState } from 'react';
import { Menu, X, Grid, ChevronDown, ExternalLink, Zap, Home, Calculator, BarChart2, Coins, Globe, Map, Handshake } from 'lucide-react';

export function Navbar({ activeTab, onTabChange }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <Home size={32} /> },
        { id: 'calculator', label: 'XP Calculator', icon: <Calculator size={32} /> },
        { id: 'analytics', label: 'Market Analytics', icon: <BarChart2 size={32} /> },
        { id: 'tokenomics', label: 'Tokenomics', icon: <Coins size={32} /> },
        { id: 'ecosystem', label: 'Ecosystem', icon: <Globe size={32} /> },
        { id: 'roadmap', label: 'Roadmap', icon: <Map size={32} /> },
        { id: 'otc', label: 'Paradex OTC', icon: <Handshake size={32} /> },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 h-20 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-full">

                        {/* Left: Logo */}
                        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('dashboard')}>
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#22d3ee]/50 transition-colors">
                                <img src="/assets/logo.png" alt="Paradex" className="h-8 w-auto" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-[#22d3ee] transition-colors">XP PARADEX</span>
                                <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Maximalist Hub</span>
                            </div>
                        </div>

                        {/* Center: Collapsible Menu Toggle */}
                        <div className="hidden md:flex justify-center flex-1">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`
                                    flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300
                                    ${isMenuOpen
                                        ? 'bg-[#22d3ee]/10 border-[#22d3ee] text-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                                    }
                                `}
                            >
                                <Grid size={18} />
                                <span className="font-bold text-sm">Apps</span>
                                <ChevronDown size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://ghz.capital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden md:flex items-center gap-2 text-gray-400 hover:text-[#22d3ee] text-sm font-bold transition-colors"
                            >
                                <span>ghz.capital</span>
                                <ExternalLink size={12} />
                            </a>
                            <a
                                href="https://app.paradex.trade/r/ghzcrypto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22d3ee] text-black text-sm font-bold rounded-full hover:bg-[#22d3ee]/90 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                            >
                                <Zap size={16} fill="currentColor" />
                                <span className="hidden sm:inline">Start Farming</span>
                                <span className="sm:hidden">Farm</span>
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 text-gray-400 hover:text-white"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Collapsible Menu Overlay */}
            <div
                className={`
                    fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden
                    ${isMenuOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
                `}
            >
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    onTabChange(tab.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`
                                    flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-300 group
                                    ${activeTab === tab.id
                                        ? 'bg-[#22d3ee]/10 border-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                    }
                                `}
                            >
                                <div className="text-[#22d3ee] group-hover:scale-110 transition-transform duration-300">{tab.icon}</div>
                                <span className={`font-bold ${activeTab === tab.id ? 'text-[#22d3ee]' : 'text-gray-300 group-hover:text-white'}`}>
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Only Extra Links */}
                    <div className="md:hidden mt-8 pt-8 border-t border-white/10 flex justify-center">
                        <a
                            href="https://ghz.capital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-[#22d3ee] font-bold"
                        >
                            <span>Visit ghz.capital</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
