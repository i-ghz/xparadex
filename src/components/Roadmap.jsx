import React from 'react';
import { Rocket, Zap, Layers, Lock, Globe } from 'lucide-react';

const ROADMAP_DATA = [
    {
        category: 'Liquidity',
        icon: <Globe className="w-6 h-6 text-blue-400" />,
        items: [
            'RFQ Trading w/ Paradigm',
            'Midpoint Dark Orders for Whales'
        ]
    },
    {
        category: 'Platform',
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        items: [
            'Fast Isolated Margin Transfers',
            'Fast Isolated Margin Account Value Updates'
        ]
    },
    {
        category: 'Spot & Products',
        icon: <Layers className="w-6 h-6 text-purple-400" />,
        items: [
            'Spot VTFs',
            'Portfolio Margin',
            'Dated Options',
            'Multiple Collateral Types',
            'Auto-Borrow and Lend',
            'XUSD (Delta-Neutral Synthetic Dollar)',
            'Pre-market Perps'
        ]
    },
    {
        category: 'Infra',
        icon: <Rocket className="w-6 h-6 text-red-400" />,
        items: [
            'Reduce P95 order creation end to end latency < 50ms',
            'Interop with Hyperlane',
            'SuperChain Mainnet'
        ]
    },
    {
        category: 'Privacy',
        icon: <Lock className="w-6 h-6 text-green-400" />,
        items: [
            'Full Position Privacy via RPC Masking (L2) + Encrypted DA (L1)',
            'Full Smart Contract-Level Privacy with Cryptographic Guarantees'
        ]
    }
];

export function Roadmap() {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                    2025 & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">BEYOND</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    The future of high-performance decentralized trading.
                </p>
            </div>

            {/* Roadmap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROADMAP_DATA.map((section, index) => (
                    <div
                        key={section.category}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                            <div className="p-2 bg-white/5 rounded-lg">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{section.category}</h3>
                        </div>

                        <ul className="space-y-4">
                            {section.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#22d3ee] flex-shrink-0" />
                                    <span className="text-sm font-medium leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center text-gray-500 text-sm mt-8">
                <p>Roadmap items are subject to change. This is a community-maintained list.</p>
            </div>

        </div>
    );
}
