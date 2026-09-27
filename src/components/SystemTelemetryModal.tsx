import React, { useState, useEffect } from 'react';
import { Activity, X, Server, Wifi, Zap, AlertTriangle, CheckCircle2, RefreshCw, BarChart2, ShieldCheck, Download, Globe, MapPin } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface TelemetryPoint {
  time: string;
  latency: number;
  usEast: number;
  euCentral: number;
  apacSouth: number;
  throughput: number;
  errorRate: number;
}

interface SystemTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemTelemetryModal: React.FC<SystemTelemetryModalProps> = ({ isOpen, onClose }) => {
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [timeWindow, setTimeWindow] = useState<'1m' | '5m' | '15m'>('5m');
  const [selectedNode, setSelectedNode] = useState<'all' | 'us-east' | 'eu-central' | 'apac-south'>('all');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const [dataPoints, setDataPoints] = useState<TelemetryPoint[]>([
    { time: '10:00:00', latency: 14.2, usEast: 12.1, euCentral: 15.4, apacSouth: 18.2, throughput: 13400, errorRate: 0.0001 },
    { time: '10:00:05', latency: 13.8, usEast: 11.5, euCentral: 14.9, apacSouth: 17.6, throughput: 13850, errorRate: 0.0000 },
    { time: '10:00:10', latency: 15.1, usEast: 13.2, euCentral: 16.1, apacSouth: 19.1, throughput: 13200, errorRate: 0.0002 },
    { time: '10:00:15', latency: 12.9, usEast: 10.8, euCentral: 13.5, apacSouth: 16.4, throughput: 14100, errorRate: 0.0000 },
    { time: '10:00:20', latency: 14.5, usEast: 12.4, euCentral: 15.2, apacSouth: 18.0, throughput: 14350, errorRate: 0.0001 },
    { time: '10:00:25', latency: 13.1, usEast: 11.2, euCentral: 13.8, apacSouth: 16.9, throughput: 14800, errorRate: 0.0000 },
    { time: '10:00:30', latency: 11.9, usEast: 10.1, euCentral: 12.6, apacSouth: 15.2, throughput: 15200, errorRate: 0.0000 },
  ]);

  const [currentMetric, setCurrentMetric] = useState<TelemetryPoint>({
    time: '10:00:30',
    latency: 11.9,
    usEast: 10.1,
    euCentral: 12.6,
    apacSouth: 15.2,
    throughput: 15200,
    errorRate: 0.0000
  });

  // Simulated live streaming ticker
  useEffect(() => {
    if (!isOpen || !isStreaming) return;
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      const usE = Number((10 + Math.random() * 4).toFixed(1));
      const euC = Number((12 + Math.random() * 5).toFixed(1));
      const apacS = Number((15 + Math.random() * 6).toFixed(1));
      const avgLat = Number(((usE + euC + apacS) / 3).toFixed(1));
      const newThr = Math.floor(13000 + Math.random() * 3000);
      const newErr = Number((Math.random() < 0.1 ? 0.0003 : 0.0000).toFixed(4));

      const updatedPoint: TelemetryPoint = {
        time: timeStr,
        latency: avgLat,
        usEast: usE,
        euCentral: euC,
        apacSouth: apacS,
        throughput: newThr,
        errorRate: newErr
      };

      setCurrentMetric(updatedPoint);
      setDataPoints((prev) => [...prev.slice(1), updatedPoint]);
    }, 2000);

    return () => clearInterval(timer);
  }, [isOpen, isStreaming]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExportReport = () => {
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="telemetry-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl bg-[#0F172A] border border-cyan-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 id="telemetry-modal-title" className="text-xl sm:text-2xl font-bold text-white">
                  API Latency Monitor & System Telemetry
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Global Edge Routing • Multi-Region Recharts Latency Stream • vLLM Inference
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Stream Controls, Node Filter & Export */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                isStreaming
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isStreaming ? 'animate-spin' : ''}`} />
              <span>{isStreaming ? 'Live Stream Active (2s)' : 'Stream Paused'}</span>
            </button>

            {/* Geographic Node Filter */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 space-x-1">
              {[
                { id: 'all', label: 'All Regions' },
                { id: 'us-east', label: 'US-East (N. Virginia)' },
                { id: 'eu-central', label: 'EU-Central (Frankfurt)' },
                { id: 'apac-south', label: 'APAC-South (Tokyo)' },
              ].map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    selectedNode === node.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span className="hidden sm:inline">{node.label}</span>
                  <span className="sm:hidden">{node.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportReport}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-300 transition-all cursor-pointer flex items-center space-x-2"
            >
              {exportSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{exportSuccess ? 'Telemetry Log Exported' : 'Export Telemetry JSON'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>US-East Latency</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {currentMetric.usEast} <span className="text-xs font-normal text-slate-400">ms</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>EU-Central Latency</span>
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {currentMetric.euCentral} <span className="text-xs font-normal text-slate-400">ms</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>APAC-South Latency</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {currentMetric.apacSouth} <span className="text-xs font-normal text-slate-400">ms</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Throughput</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {currentMetric.throughput.toLocaleString()} <span className="text-xs font-normal text-slate-400">req/s</span>
            </div>
          </div>
        </div>

        {/* Recharts API Latency Monitor Component */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Real-Time API Latency Monitor (Recharts Streaming View)</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-400">
              SLA Threshold: &lt; 20ms Optimal
            </div>
          </div>

          <div className="h-72 w-full bg-[#070B14] rounded-xl border border-slate-800 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[5, 25]} unit="ms" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#F8FAFC', fontSize: '12px' }}
                />
                {(selectedNode === 'all' || selectedNode === 'us-east') && (
                  <Line type="monotone" dataKey="usEast" name="US-East (N. Virginia)" stroke="#22D3EE" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
                {(selectedNode === 'all' || selectedNode === 'eu-central') && (
                  <Line type="monotone" dataKey="euCentral" name="EU-Central (Frankfurt)" stroke="#818CF8" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
                {(selectedNode === 'all' || selectedNode === 'apac-south') && (
                  <Line type="monotone" dataKey="apacSouth" name="APAC-South (Tokyo)" stroke="#34D399" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-1">
            <span>Edge Mesh Status: 100% Operational</span>
            <span>Zero Unhandled Packet Drops</span>
            <span>Consensus SLA: 99.999%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
