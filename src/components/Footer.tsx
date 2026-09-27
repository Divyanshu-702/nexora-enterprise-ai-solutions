import React, { useState } from 'react';
import { Shield, Check, ArrowRight, Lock, Terminal, Globe, Layers, AlertCircle, Activity, Sun, Moon } from 'lucide-react';

interface FooterProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ reducedMotion, onToggleReducedMotion, theme, onToggleTheme }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#060910] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#090D16] rounded-xl flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-sm font-mono">
                    NX
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight font-mono">
                  NEXORA.
                </span>
                <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                  Enterprise AI
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Engineering the Intelligence Layer for Modern Enterprises. We design AI systems, resilient cloud architectures, intelligent automation platforms, and real-time data infrastructure built for security, scale, and measurable impact.
            </p>

            {/* Architecture Standards Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400">
                <Shield className="w-3 h-3 mr-1" />
                Zero-Trust Ready
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400">
                <Lock className="w-3 h-3 mr-1" />
                mTLS & eBPF Security
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-indigo-400">
                <Terminal className="w-3 h-3 mr-1" />
                Deterministic RAG
              </span>
            </div>
          </div>

          {/* Nav Column 1: Practices & Platform */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Practices & Platform
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Enterprise AI & LLM Systems
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Cloud Modernization & FinOps
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('architecture')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Architecture Playground
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('platform')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Nexora Intelligence Demo
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('security')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Security Center
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Tools & Resources */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Tools & Scenarios
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollTo('roi-calculator')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Dynamic ROI Estimator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cost-estimator')} className="hover:text-white transition-colors cursor-pointer text-left">
                  AI Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('assessment')} className="hover:text-white transition-colors cursor-pointer text-left">
                  AI Readiness Assessment
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('case-studies')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Illustrative Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('resources')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Engineering Whitepapers
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Newsletter */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              The Enterprise Brief
            </div>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Bi-weekly engineering teardowns of distributed architectures, private LLM serving, and FinOps benchmarks.
            </p>
            {subscribed ? (
              <div className="text-xs text-emerald-400 flex items-center space-x-1.5 font-medium py-2">
                <Check className="w-4 h-4" />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@enterprise.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Responsible Engineering Disclosure Notice */}
        <div className="py-6 border-b border-slate-800/60 text-[11px] text-slate-500 leading-relaxed flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <p>
            <strong>Technical Disclosure & Illustrative Scenarios:</strong> All architecture diagrams, performance figures, payback horizons, and scenario outcomes on this website are illustrative reference models created for engineering evaluation. Nexora designs and implements production systems directly within customer cloud accounts and private infrastructure.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Nexora Enterprise & AI Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-500/20 text-amber-700 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {theme === 'light' ? <Sun className="w-3.5 h-3.5 text-amber-600" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
              <span>Theme: {theme === 'light' ? 'Light Mode' : 'Deep Slate'}</span>
            </button>

            <button
              onClick={onToggleReducedMotion}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
                reducedMotion
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}</span>
            </button>
            <button onClick={() => scrollTo('security')} className="hover:text-slate-400 transition-colors cursor-pointer">
              Security Architecture
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-slate-400 transition-colors cursor-pointer">
              Engineering Ethos
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-slate-400 transition-colors cursor-pointer">
              Contact & Scoping
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
