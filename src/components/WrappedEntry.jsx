import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Sparkles, AlertCircle, Loader2, Eye, EyeOff, Lock, ExternalLink } from 'lucide-react';

export function WrappedEntry({ onSubmit, loading, loadingStatus, error }) {
  const [jwt, setJwt] = useState('');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jwt.trim()) {
      onSubmit(jwt.trim());
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_60%)]" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="inline-flex p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 mb-6"
          >
            <Sparkles size={32} className="text-cyan-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-white mb-2"
          >
            Your 2025 Wrapped
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400"
          >
            Enter your read-only API key to see your personal stats
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-green-400 text-sm flex items-center justify-center gap-1.5 mt-2"
          >
            <Lock size={12} />
            100% secure - We can only view your stats
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Key size={20} />
            </div>
            <input
              type={showToken ? 'text' : 'password'}
              value={jwt}
              onChange={(e) => setJwt(e.target.value)}
              placeholder="Paste your API key here..."
              className="w-full px-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono text-sm"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showToken ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={!jwt.trim() || loading}
            className="w-full py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {loadingStatus || 'Loading your stats...'}
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate My Wrapped
              </>
            )}
          </button>
        </motion.form>

        {/* How to get API key */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-left"
        >
          <div className="text-xs text-gray-500 space-y-1.5">
            <p className="text-gray-300 font-medium mb-2">How to get your API key:</p>
            <p>1. Go to <a href="https://app.paradex.trade" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">app.paradex.trade</a></p>
            <p>2. Click on your profile (top right)</p>
            <p>3. Go to <span className="text-white">Settings</span></p>
            <p>4. Open <span className="text-white">Key Management</span> tab</p>
            <p>5. Create a <span className="text-cyan-400">Read-only</span> key and paste it here</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
