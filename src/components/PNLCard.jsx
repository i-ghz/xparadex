import React, { useRef, useState } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { Download, Share2, Copy, Check } from 'lucide-react';

const CHARACTERS = [
    '/assets/character1.png',
    '/assets/character2.png',
    '/assets/character3.png',
    '/assets/character4.png',
    '/assets/character5.png',
    '/assets/character6.png',
    '/assets/character7.png',
];

export function PNLCard({ xp, estimatedValue, selectedCharacter, onCharacterSelect }) {
    const cardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleDownload = async () => {
        if (cardRef.current === null) {
            return;
        }
        setIsGenerating(true);
        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = 'paradex-airdrop-pnl.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async () => {
        if (cardRef.current === null) {
            return;
        }
        setIsGenerating(true);
        try {
            const blob = await toBlob(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            if (blob) {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy image', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShare = () => {
        const text = `I'm estimating my Paradex Airdrop! 🪂\n\nXP: ${xp}\nEst. Value: $${estimatedValue}\n\nCheck yours at: xparadex.xyz @paradex \n\nParadexio`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            {/* Character Selection */}
            <div className="flex gap-4 overflow-x-auto pb-4 w-full justify-center">
                {CHARACTERS.map((char, index) => (
                    <button
                        key={index}
                        onClick={() => onCharacterSelect(char)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all w-20 h-20 md:w-24 md:h-24 flex-shrink-0 ${selectedCharacter === char ? 'border-paradex-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'border-white/10 hover:border-white/30'
                            }`}
                    >
                        <img src={char} alt={`Character ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* The Card */}
            <div className="relative group">
                <div
                    ref={cardRef}
                    className="w-[600px] h-[337px] bg-[#120f29] relative overflow-hidden flex flex-col shadow-2xl rounded-xl"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #2d1b4e 0%, #120f29 100%)' }}
                >
                    {/* Background Graph (Simplified SVG) */}
                    <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-20" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path d="M0 50 L0 40 Q 20 45 40 30 T 80 10 L 100 0 L 100 50 Z" fill="#8b5cf6" />
                    </svg>

                    {/* Logo Top Left */}
                    <div className="absolute top-6 left-6">
                        <img src="/assets/logo.png" alt="Paradex" className="h-8 w-auto" />
                    </div>

                    {/* URL Top Right */}
                    <div className="absolute top-6 right-6">
                        <span className="text-white/50 font-mono text-sm tracking-widest">xparadex.xyz</span>
                    </div>

                    {/* Content Middle */}
                    <div className="flex-1 flex flex-col items-center justify-center z-10 mt-8">
                        <span className="text-gray-400 text-lg font-medium uppercase tracking-wider">Estimated Airdrop</span>
                        <span className="text-6xl font-black text-white drop-shadow-lg mt-2">
                            ${estimatedValue}
                        </span>
                        <div className="mt-4 px-4 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                            <span className="text-paradex-accent font-bold">{xp} XP</span>
                        </div>
                    </div>

                    {/* Dollar Bill Left */}
                    <div className="absolute bottom-4 left-4 w-1/4 h-auto transform -rotate-12 opacity-90 pointer-events-none z-0">
                        <img src="/assets/dollar_bill.png" alt="Dollar Bill" className="w-full h-auto object-contain drop-shadow-xl" />
                    </div>

                    {/* Character Right */}
                    <div className="absolute bottom-0 right-0 w-1/3 h-full flex items-end justify-end pointer-events-none z-10">
                        <img src={selectedCharacter} alt="Character" className="h-[90%] object-contain object-bottom drop-shadow-2xl" />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={handleCopy}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 border border-white/10"
                >
                    {isCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                    {isCopied ? 'Copied!' : 'Copy Image'}
                </button>
                <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    <Download size={20} />
                    {isGenerating ? 'Generating...' : 'Download'}
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white font-bold rounded-full hover:bg-[#1a91da] transition-colors"
                >
                    <Share2 size={20} />
                    Share
                </button>
            </div>
        </div>
    );
}
