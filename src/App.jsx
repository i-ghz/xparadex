import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { motion } from 'framer-motion';
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
import { Wrapped2025 } from './components/Wrapped2025';
import { ExternalLink, Zap, Heart } from 'lucide-react';

const WRAPPED_VISITED_KEY = 'paradex_wrapped_2025_visited';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Auto-launch 2025 Wrapped on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem(WRAPPED_VISITED_KEY);
    if (!hasVisited) {
      setActiveTab('wrapped');
      localStorage.setItem(WRAPPED_VISITED_KEY, 'true');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a1628] via-[#000000] to-[#000000] overflow-x-hidden">

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="w-full flex-1 flex flex-col items-center gap-16 pt-32 pb-20 max-w-7xl mx-auto px-4">
        {activeTab === 'dashboard' && (
          <Dashboard onNavigate={setActiveTab} />
        )}

        {activeTab === 'calculator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">XP Calculator</h2>
            <AirdropEstimator />
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Market Analytics</h2>
            <ParadexStats />
          </motion.div>
        )}

        {activeTab === 'tokenomics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tokenomics />
          </motion.div>
        )}

        {activeTab === 'ecosystem' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Ecosystem />
          </motion.div>
        )}

        {activeTab === 'roadmap' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Roadmap />
          </motion.div>
        )}

        {activeTab === 'otc' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OTC />
          </motion.div>
        )}

        {activeTab === 'wrapped' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Wrapped2025 />
          </motion.div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="w-full border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to maximize your XP?
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Join thousands of traders already farming XP on Paradex. Start earning today.
            </p>
            <motion.a
              href="https://app.paradex.trade/r/ghzcrypto"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <Zap size={20} fill="currentColor" />
              Start Farming Now
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>

          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Tools</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveTab('calculator')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    XP Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('analytics')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Market Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('wrapped')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    2025 Wrapped
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('otc')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    OTC Trading
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveTab('tokenomics')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Tokenomics
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('roadmap')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Roadmap
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('ecosystem')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Ecosystem
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Ecosystem</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://fundingview.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                    FundingView <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a href="https://liquidview.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                    LiquidView <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a href="https://paradex.meme" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                    Paradex Meme <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a href="https://shop.paradex.trade" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                    Paradex Shop <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://ghz.capital" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                    ghz.capital <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a href="https://app.paradex.trade/r/ghzcrypto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                    Trade on Paradex <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/assets/logo.png" alt="Paradex" className="h-6 w-auto opacity-50" />
              <span className="text-gray-500 text-sm">
                Unofficial Tool. Not financial advice.
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Built with</span>
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span>by</span>
              <a
                href="https://ghz.capital"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                ghz.capital
              </a>
            </div>
          </div>
        </div>
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
