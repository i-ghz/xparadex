import React from 'react';
import { Download } from 'lucide-react';

const ASSETS = [
    { name: 'Paradex Logo', url: '/assets/logo.png' },
    { name: 'Character 1', url: '/assets/character1.png' },
    { name: 'Character 2', url: '/assets/character2.png' },
    { name: 'Character 3', url: '/assets/character3.png' },
    { name: 'Character 4', url: '/assets/character4.png' },
    { name: 'Character 5', url: '/assets/character5.png' },
    { name: 'Character 6', url: '/assets/character6.png' },
    { name: 'Character 7', url: '/assets/character7.png' },
];

export function MediaKit() {
    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8 py-12">
            <h2 className="text-3xl font-bold text-white">Media Kit</h2>
            <p className="text-gray-400 text-center max-w-lg">
                Download official Paradex assets and characters to create your own memes and content.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {ASSETS.map((asset, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center gap-4 hover:bg-white/10 transition-colors group">
                        <div className="h-32 w-full flex items-center justify-center bg-black/20 rounded-lg p-4">
                            <img src={asset.url} alt={asset.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="text-white font-medium">{asset.name}</span>
                        <a
                            href={asset.url}
                            download
                            className="w-full py-2 bg-paradex-primary/20 text-paradex-accent rounded-lg flex items-center justify-center gap-2 hover:bg-paradex-primary/30 transition-colors"
                        >
                            <Download size={16} />
                            Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
