import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Server, Cpu, Zap, Wifi, CheckCircle2, RefreshCw, BarChart2 } from 'lucide-react';

interface MetricPoint {
  timestamp: string;
  latency: number;
  throughput: number;
}

export const SystemReliabilityStatus: React.FC = () => {
  const [history, setHistory] = useState<MetricPoint[]>([
    { timestamp: '10:00', latency: 14, throughput: 12400 },
    { timestamp: '10:05', latency: 13, throughput: 12800 },
    { timestamp: '10:10', latency: 15, throughput: 13100 },
    { timestamp: '10:15', latency: 12, throughput: 12950 },
    { timestamp: '10:20', latency: 14, throughput: 13400 },
    { timestamp: '10:25', latency: 13, throughput: 13800 },
    { timestamp: '10:30', latency: 11, throughput: 14200 },
  ]);

  const [currentLatency, setCurrentLatency] = useState<number>(12);
  const [currentThroughput, setCurrentThroughput] = useState<number>(14250);
  const [activeIncidentCount, setActiveIncidentCount] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // Live streaming ticker effect
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const newLatency = Math.max(8, Math.min(25, 12 + Math.floor(Math.random() * 7) - 3));
      const newThroughput = Math.max(12000, Math.min(16000, 14200 + Math.floor(Math.random() * 400) - 200));
      
      setCurrentLatency(newLatency);
      setCurrentThroughput(newThroughput);

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setHistory((prev) => {
        const next = [...prev.slice(1), { timestamp: timeStr, latency: newLatency, throughput: newThroughput }];
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <section id="system-reliability" className="py-24 bg-[#070B14] border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Real-Time Reliability Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Infrastructure Health & Streaming Telemetry
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Live monitoring of Nexora’s global GPU clusters, vLLM inference nodes, Qdrant vector databases, and zero-trust SPIFFE/SPIRE identity meshes.
          </p>
        </div>

        {/* Top Status Banner */}
        <div className="p-6 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center space-x-2">
                <span>All Enterprise Systems Operational</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Uptime (Last 90 Days): <strong className="text-emerald-400">99.999%</strong> • Active Incidents: <span className="text-cyan-400">{activeIncidentCount}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer flex items-center space-x-2 ${
                isStreaming
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isStreaming ? 'animate-spin' : ''}`} />
              <span>{isStreaming ? 'Live Stream Active' : 'Stream Paused'}</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Avg API Latency</span>
              <Wifi className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{currentLatency} <span className="text-sm font-normal text-slate-400">ms</span></div>
            <div className="text-[11px] text-emerald-400 font-mono">↓ 3.2% vs global avg</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Token Throughput</span>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{currentThroughput.toLocaleString()} <span className="text-sm font-normal text-slate-400">req/s</span></div>
            <div className="text-[11px] text-emerald-400 font-mono">↑ 99.4% capacity headroom</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>GPU Cluster Health</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">99.98%</div>
            <div className="text-[11px] text-emerald-400 font-mono">128 / 128 H100 Nodes Online</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Zero-Trust Mesh</span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">Secure</div>
            <div className="text-[11px] text-cyan-400 font-mono">SPIFFE/SPIRE mTLS Enforced</div>
          </div>

        </div>

        {/* Streaming Latency & Throughput Visualization */}
        <div className="p-8 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
              <span>Real-Time Latency Stream (Last 35 Minutes)</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Updating every 3s
            </span>
          </div>

          {/* Visual bar graph representation */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800">
            {history.map((pt, idx) => {
              const heightPercent = Math.min(100, Math.max(20, (pt.latency / 30) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-mono text-cyan-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                    {pt.timestamp}: {pt.latency}ms | {pt.throughput} req/s
                  </div>

                  <div 
                    className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 via-indigo-500 to-cyan-400 transition-all duration-500 group-hover:brightness-125"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <div className="text-[10px] font-mono text-slate-400 mt-2">{pt.timestamp}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
            <span>Baseline Target: &lt;20ms</span>
            <span className="text-emerald-400 font-semibold">Status: Optimal Edge Routing</span>
            <span>Max Peak Observed: 18ms</span>
          </div>
        </div>

      </div>
    </section>
  );
};
