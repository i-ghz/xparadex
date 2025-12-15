import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { FundingViewAd } from './components/FundingViewAd';
import { ParadexStats } from './components/ParadexStats';
import { AirdropEstimator } from './components/AirdropEstimator';
import { Ecosystem } from './components/Ecosystem';
import { Roadmap } from './components/Roadmap';
import { OTC } from './components/OTC';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Tokenomics } from './components/Tokenomics';
import { ExecutionCostWidget } from './components/ExecutionCostWidget';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#164e63] via-[#000000] to-[#000000] overflow-x-hidden">

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="w-full flex-1 flex flex-col items-center gap-16 pt-32 pb-20 max-w-7xl mx-auto px-4">
        {activeTab === 'dashboard' && (
          <Dashboard onNavigate={setActiveTab} />
        )}

        {activeTab === 'calculator' && (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">XP Calculator</h2>
            <AirdropEstimator />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Market Analytics</h2>
            <ParadexStats />
          </div>
        )}

        {activeTab === 'tokenomics' && (
          <Tokenomics />
        )}

        {activeTab === 'ecosystem' && (
          <Ecosystem />
        )}

        {activeTab === 'roadmap' && (
          <Roadmap />
        )}

        {activeTab === 'otc' && (
          <OTC />
        )}
      </main>

      <footer className="mt-auto py-8 text-center text-gray-600 text-sm flex flex-col gap-2">
        <p>Unofficial Tool. Not financial advice.</p>
        <a href="https://ghz.capital" target="_blank" rel="noopener noreferrer" className="hover:text-paradex-primary transition-colors">
          ghz.capital
        </a>
      </footer>

      <FundingViewAd />
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/widget/execution-cost" element={<ExecutionCostWidget />} />
        <Route path="*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
