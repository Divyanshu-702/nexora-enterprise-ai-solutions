import React, { useState, useEffect } from 'react';
import { Globe, Server, Activity, ShieldCheck, Zap, RefreshCw, CheckCircle, Wifi, ArrowRightLeft, AlertTriangle } from 'lucide-react';

interface RegionNode {
  id: string;
  name: string;
  provider: 'AWS' | 'GCP' | 'Azure';
  location: string;
  ping: number;
  status: 'Healthy' | 'Degraded' | 'Optimizing' | 'Rerouting';
  load: number;
  throughput: string;
}

export const GlobalLatencyMap: React.FC = () => {
  const [redundancyMode, setRedundancyMode] = useState<'active-active' | 'failover'>('active-active');
  const [isSimulatingSpike, setIsSimulatingSpike] = useState<boolean>(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const [regions, setRegions] = useState<RegionNode[]>([
    { id: 'us-east', name: 'US East (N. Virginia)', provider: 'AWS', location: 'North America', ping: 14, status: 'Healthy', load: 42, throughput: '38.4 Gbps' },
    { id: 'us-west', name: 'US West (Oregon)', provider: 'AWS', location: 'North America', ping: 28, status: 'Healthy', load: 31, throughput: '24.1 Gbps' },
    { id: 'eu-west', name: 'Europe (Frankfurt)', provider: 'GCP', location: 'Europe', ping: 35, status: 'Healthy', load: 56, throughput: '45.2 Gbps' },
    { id: 'ap-southeast', name: 'Asia Pacific (Singapore)', provider: 'Azure', location: 'Asia', ping: 62, status: 'Healthy', load: 64, throughput: '52.0 Gbps' },
    { id: 'ap-northeast', name: 'Asia Northeast (Tokyo)', provider: 'AWS', location: 'Asia', ping: 54, status: 'Healthy', load: 48, throughput: '31.8 Gbps' },
    { id: 'sa-east', name: 'South America (São Paulo)', provider: 'GCP', location: 'South America', ping: 88, status: 'Healthy', load: 22, throughput: '14.5 Gbps' }
  ]);

  // Live ping fluctuation & hover spike simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRegions((prev) =>
        prev.map((reg) => {
          const isHoveredSpike = hoveredNodeId === reg.id;
          const delta = Math.floor(Math.random() * 7) - 3;
          const basePing = isHoveredSpike ? 145 : (isSimulatingSpike && reg.id === 'eu-west' ? 120 : reg.ping);
          const newPing = Math.max(8, basePing + delta);
          
          let status: RegionNode['status'] = 'Healthy';
          if (newPing > 100) {
            status = 'Degraded';
          } else if (hoveredNodeId && hoveredNodeId !== reg.id && redundancyMode === 'active-active') {
            status = 'Rerouting';
          }

          return {
            ...reg,
            ping: newPing,
            status,
            load: isHoveredSpike ? 98 : Math.min(95, Math.max(15, reg.load + (Math.floor(Math.random() * 5) - 2)))
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [isSimulatingSpike, hoveredNodeId, redundancyMode]);

  return (
    <section id="latency-map" className="py-24 bg-[#070B14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Global Edge Mesh & Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Multi-Region Latency & Geo-Routing Mesh
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-time telemetry across enterprise edge nodes in AWS, GCP, and Azure. Hover over any node below to simulate a network outage and observe automated Anycast traffic rerouting in real time.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 shadow-xl mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Redundancy Architecture</div>
              <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setRedundancyMode('active-active')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    redundancyMode === 'active-active'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Active-Active Multi-Region Mesh
                </button>
                <button
                  onClick={() => setRedundancyMode('failover')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    redundancyMode === 'failover'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Active-Passive Failover
                </button>
              </div>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-slate-800 mx-2" />

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Network Stress Simulation</div>
              <button
                onClick={() => setIsSimulatingSpike(!isSimulatingSpike)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center space-x-2 ${
                  isSimulatingSpike
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{isSimulatingSpike ? 'Simulating EU Congestion...' : 'Trigger Global Spike Test'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300">Anycast DNS: <strong className="text-white">99.999% SLA</strong></span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-cyan-400">
              {hoveredNodeId ? '⚠️ Rerouting Active' : 'Packet Loss: 0.0%'}
            </div>
          </div>
        </div>

        {/* Hover guidance banner */}
        <div className="mb-6 px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center space-x-2">
          <ArrowRightLeft className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Interactive Tip: Hover over any card below to simulate a sudden latency outage and watch Anycast mesh reroute traffic instantly.</span>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((reg) => {
            const isHovered = hoveredNodeId === reg.id;
            const isDegraded = reg.status === 'Degraded' || isHovered;
            const isRerouting = reg.status === 'Rerouting';

            return (
              <div
                key={reg.id}
                onMouseEnter={() => setHoveredNodeId(reg.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`p-6 rounded-2xl bg-[#0F172A]/90 border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isHovered ? 'border-rose-500 shadow-xl shadow-rose-950/40 bg-slate-900' :
                  isDegraded ? 'border-rose-500/50 shadow-lg shadow-rose-950/30' :
                  isRerouting ? 'border-cyan-500/60 bg-cyan-950/10' :
                  'border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-cyan-400">
                      {reg.provider}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{reg.location}</span>
                  </div>

                  <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isHovered || isDegraded ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    isRerouting ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isHovered || isDegraded ? 'bg-rose-400 animate-ping' : isRerouting ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
                    <span>{isHovered ? 'Outage Simulated' : reg.status}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-3 flex items-center justify-between">
                  <span>{reg.name}</span>
                  {isHovered && <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />}
                </h3>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono">
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase">Latency</div>
                    <div className={`text-sm font-bold mt-0.5 ${isHovered || reg.ping > 100 ? 'text-rose-400' : 'text-cyan-300'}`}>
                      {reg.ping} ms
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase">CPU Load</div>
                    <div className="text-sm font-bold text-white mt-0.5">{isHovered ? '99%' : `${reg.load}%`}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase">Throughput</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      {isRerouting ? '+45.0 Gbps (Rerouted)' : reg.throughput}
                    </div>
                  </div>
                </div>

                {isRerouting && (
                  <div className="mt-3 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300 flex items-center space-x-1">
                    <ArrowRightLeft className="w-3 h-3 animate-spin text-cyan-400 flex-shrink-0" />
                    <span>Anycast mesh automatically absorbing redirected requests</span>
                  </div>
                )}

                {isHovered && (
                  <div className="mt-3 p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono text-rose-300 flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                    <span>Simulated node failure. Traffic instantly rerouted to healthy peers.</span>
                  </div>
                )}

                {/* Animated ping wave bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${isHovered || reg.ping > 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-cyan-400'}`}
                    style={{ width: `${Math.min(100, (reg.ping / 150) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
