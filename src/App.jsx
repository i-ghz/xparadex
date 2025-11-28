import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { XPInput } from './components/XPInput';
import { ValuationGrid } from './components/ValuationGrid';
import { PNLCard } from './components/PNLCard';
import { MediaKit } from './components/MediaKit';
import { Tokenomics } from './components/Tokenomics';
import { SentimentPoll } from './components/SentimentPoll';
import { FundingViewAd } from './components/FundingViewAd';
import { useAirdropCalculator, SEASONS } from './hooks/useAirdropCalculator';
import { SeasonSelector } from './components/SeasonSelector';

function App() {
  const [xp, setXp] = useState('');
  const [currentSeason, setCurrentSeason] = useState('S2');
  const [selectedCharacter, setSelectedCharacter] = useState('/assets/character1.png');

  const calculations = useAirdropCalculator(xp, currentSeason);
  const activeSeason = SEASONS[currentSeason];

  // Default to 1B FDV for the card if not specified, or pick the middle one
  const cardValue = calculations.find(c => c.label === '1B')?.estimatedValue?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0';

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#164e63] via-[#000000] to-[#000000] overflow-x-hidden">
      <header className="mb-12 text-center relative z-10">
        <div className="inline-block mb-6 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <img src="/assets/logo.png" alt="Paradex" className="h-10 w-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 tracking-tight mb-8">
          Airdrop Estimator
        </h1>

        <a
          href="https://app.paradex.trade/r/ghzcrypto"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-paradex-primary text-black font-bold rounded-full hover:bg-paradex-accent transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
        >
          <span>Start Farming Paradex Airdrop</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </header>

      <main className="w-full flex-1 flex flex-col items-center gap-16 pb-20">
        <div className="w-full flex flex-col items-center gap-8">
          <SeasonSelector
            seasons={SEASONS}
            currentSeason={currentSeason}
            onSelect={setCurrentSeason}
          />
          <XPInput
            value={xp}
            onChange={setXp}
            label={activeSeason.inputLabel}
            season={activeSeason}
          />
        </div>

        {xp && parseFloat(xp.replace(/,/g, '')) > 0 && (
          <>
            <ValuationGrid calculations={calculations} />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-bold text-white">Generate Your PNL Card</h2>
              <PNLCard
                xp={xp}
                estimatedValue={cardValue}
                selectedCharacter={selectedCharacter}
                onCharacterSelect={setSelectedCharacter}
                season={activeSeason}
              />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <SentimentPoll />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Tokenomics />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <MediaKit />
          </>
        )}
      </main>

      <footer className="mt-auto py-8 text-center text-gray-600 text-sm">
        <p>Unofficial Tool. Not financial advice.</p>
      </footer>

      <FundingViewAd />
      <Analytics />
    </div>
  );
}

export default App;
