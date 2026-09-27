import React from 'react';
import { ArrowRight, Layers, Terminal, Shield, Cpu, Activity, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onBuildClick: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBuildClick, onExploreArchitecture }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-grid-pattern">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Small Top Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-semibold tracking-wider text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-slate-300">
              ENTERPRISE AI • CLOUD • DATA • AUTOMATION
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Engineering the Intelligence Layer for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
              Modern Enterprises.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-300/90 max-w-3xl leading-relaxed font-normal">
            We design AI systems, resilient cloud architectures, intelligent automation platforms, and real-time data infrastructure built for security, scale, and measurable impact.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={onBuildClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-indigo-600/30 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>Build Your Next System</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreArchitecture}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center space-x-2.5 shadow-md cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Explore Architecture</span>
            </button>
          </div>

          {/* Pure CSS/SVG Architecture Data-Flow Visual (NO STOCK PHOTOS) */}
          <div className="w-full mt-12 p-1 rounded-2xl bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-transparent shadow-2xl">
            <div className="bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-800/80 text-left relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-slate-400 font-mono ml-2">nexora-kernel://architecture.mesh</span>
                </div>
                <div className="flex items-center space-x-4 text-slate-400 font-mono text-[11px]">
                  <span className="flex items-center text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                    Distributed Mesh Active
                  </span>
                  <span className="hidden sm:inline">Zero-Trust mTLS v1.3</span>
                </div>
              </div>

              {/* Animated SVG Circuit & Packets */}
              <div className="relative py-8">
                {/* SVG Flow Bus */}
                <div className="relative w-full h-32 hidden md:block">
                  <svg className="w-full h-full" viewBox="0 0 900 120" fill="none">
                    {/* Background circuit lines */}
                    <path
                      d="M 50 60 H 850"
                      stroke="#1E293B"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 120 60 C 200 20, 300 20, 380 60 C 460 100, 560 100, 640 60 H 850"
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                    
                    {/* Animated Data Packets */}
                    <circle cx="150" cy="60" r="4" fill="#06B6D4" className="animate-pulse">
                      <animate attributeName="cx" values="50;850" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="350" cy="60" r="5" fill="#6366F1">
                      <animate attributeName="cx" values="50;850" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="550" cy="60" r="3.5" fill="#10B981">
                      <animate attributeName="cx" values="50;850" dur="5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                {/* Microservice Topology Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase font-bold">Client Edge</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono">Anycast Ingress</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">TLS 1.3 Termination</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center space-x-2 text-indigo-400 mb-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase font-bold">API Gateway</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono">Envoy Proxy</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Rate Limit & WAF</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-purple-500/40 transition-colors">
                    <div className="flex items-center space-x-2 text-purple-400 mb-1">
                      <Cpu className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase font-bold">Orchestrator</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono">LangGraph</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Agent State Machine</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-400/40 transition-colors">
                    <div className="flex items-center space-x-2 text-cyan-300 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase font-bold">Model Engine</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono">vLLM / Triton</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Private GPU Pools</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center space-x-2 text-emerald-400 mb-1">
                      <Database className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase font-bold">Data Layer</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono">Qdrant + Postgres</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Partitioned HNSW</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center space-x-2 text-amber-400 mb-1">
                      <Activity className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase font-bold">Observability</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono">OpenTelemetry</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Span Latency Traces</div>
                  </div>
                </div>
              </div>

              {/* Bottom Illustrative Status Strip */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Illustrative Architecture Topology — Engineered for High Availability</span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  All specifications modelable for customer VPC / private cloud deployment
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
