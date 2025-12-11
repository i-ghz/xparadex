import React from 'react';
import { ExternalLink, Users, Wrench, Heart } from 'lucide-react';

import fiddyImg from '../assets/fiddybps1.png';
import nicImg from '../assets/nicdime.png';
import wardyImg from '../assets/wardy.png';
import fundingViewLogo from '../assets/fundingview.png';
import liquidViewLogo from '../assets/liquidview.png';
import paradexShopLogo from '../assets/paradexshop.png';

const TOOLS = [
    {
        name: 'FundingView',
        description: 'Delta neutral strategy automation & monitoring for Paradex.',
        url: 'https://fundingview.app',
        icon: '📊',
        image: fundingViewLogo,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        name: 'LiquidView',
        description: 'Deep liquidity analysis and market depth visualization.',
        url: 'https://liquidview.app',
        icon: '💧',
        image: liquidViewLogo,
        color: 'from-cyan-500 to-teal-500'
    },
    {
        name: 'Paradex Meme',
        description: 'Create custom memes with Dave the mascot. Unleash the fun!',
        url: 'https://paradex.meme',
        icon: '🎨',
        color: 'from-purple-500 to-pink-500'
    },
    {
        name: 'Paradex Shop',
        description: 'Official community merch. Rep the brand in style.',
        url: 'https://shop.paradex.trade/',
        icon: '👕',
        image: paradexShopLogo,
        color: 'from-orange-500 to-red-500'
    },
    {
        name: 'Paradex Stats',
        description: 'Comprehensive protocol statistics and historical data.',
        url: 'https://www.paradex.trade/stats',
        icon: '📈',
        color: 'from-green-500 to-emerald-500'
    },
    {
        name: 'Perp Options',
        description: 'Advanced toolbox for perpetual options trading.',
        url: 'https://www.perpoptions.xyz/',
        icon: '🛠️',
        color: 'from-indigo-500 to-violet-500'
    }
];

// ... (TEAM array remains unchanged) ...

// ... (Inside Ecosystem component return) ...



const TEAM = [
    {
        name: 'fiddy.dime',
        role: 'CEO',
        avatar: fiddyImg,
        twitter: 'https://x.com/fiddybps1',
        handle: '@fiddybps1'
    },
    {
        name: 'Nic.dime',
        role: 'Head EMEA',
        avatar: nicImg,
        twitter: 'https://x.com/nicolas4vx',
        handle: '@nicolas4vx'
    },
    {
        name: 'WaRdY.dime',
        role: 'Head BD',
        avatar: wardyImg, // Placeholder
        twitter: 'https://x.com/PioGerard',
        handle: '@PioGerard'
    }
];

export function Ecosystem() {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">Ecosystem</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover the tools, projects, and people building the future of Paradex.
                </p>
            </div>

            {/* Community Tools Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 text-2xl font-bold text-white border-b border-white/10 pb-4">
                    <Wrench className="text-[#22d3ee]" />
                    <h3>Community Tools</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOOLS.map((tool) => (
                        <a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.color}`} />

                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">
                                    {tool.image ? (
                                        <img src={tool.image} alt={tool.name} className="w-10 h-10 object-contain" />
                                    ) : (
                                        tool.icon
                                    )}
                                </div>
                                <ExternalLink className="text-white/30 group-hover:text-white transition-colors" size={20} />
                            </div>

                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#22d3ee] transition-colors">
                                {tool.name}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 text-2xl font-bold text-white border-b border-white/10 pb-4">
                    <Users className="text-[#22d3ee]" />
                    <h3>The Team</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {TEAM.map((member, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-4 overflow-hidden border-2 border-white/10 group-hover:border-[#22d3ee] transition-colors relative">
                                {member.avatar ? (
                                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl">👾</div>
                                )}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                            <span className="text-[#22d3ee] text-sm font-medium mb-3">{member.role}</span>

                            {member.twitter && (
                                <a
                                    href={member.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                >
                                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    {member.handle}
                                </a>
                            )}
                        </div>
                    ))}

                    {/* Join Us Card */}
                    <a
                        href="https://www.paradex.trade/careers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-[#22d3ee]/10 to-blue-600/10 border border-[#22d3ee]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#22d3ee]/20 transition-all duration-300 cursor-pointer border-dashed group"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#22d3ee]/20 flex items-center justify-center mb-4 text-[#22d3ee] group-hover:scale-110 transition-transform">
                            <Heart size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-white">Join the Squad</h4>
                        <span className="text-gray-400 text-sm">Build with us</span>
                    </a>
                </div>
            </div>

        </div>
    );
}
