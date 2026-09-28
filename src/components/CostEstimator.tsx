import React, { useState } from 'react';
import { Calculator, DollarSign, Cloud, Server, Database, Network, Cpu, Shield, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

interface CostEstimatorProps {
  onDiscussCost?: (costSummary: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onDiscussCost }) => {
  const [users, setUsers] = useState<number>(5000);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(100000);
  const [tokensPerRequest, setTokensPerRequest] = useState<number>(1200);
  const [dataVolumeGB, setDataVolumeGB] = useState<number>(500);
  const [modelType, setModelType] = useState<'lightweight' | 'balanced' | 'frontier'>('balanced');
  const [cloudProvider, setCloudProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');

  // Transparent calculation model
  // Model token costs per 1k tokens:
  // lightweight: ~$0.0003 per 1k
  // balanced: ~$0.0015 per 1k
  // frontier: ~$0.006 per 1k
  const tokenRateMap = {
    lightweight: 0.0003,
    balanced: 0.0015,
    frontier: 0.006
  };

  const monthlyRequests = requestsPerDay * 30;
  const monthlyTotalTokens = monthlyRequests * tokensPerRequest;
  const monthlyModelCost = Math.round((monthlyTotalTokens / 1000) * tokenRateMap[modelType]);

  // Compute Cost: baseline K8s cluster node pools required to sustain throughput
  // Requests/second peak factor ~2x:
  const peakRps = Math.max(5, Math.round((requestsPerDay / 86400) * 2));
  // Node pods needed: ~15 rps per node
  const nodesNeeded = Math.max(2, Math.ceil(peakRps / 20));
  const nodeCostPerMonth = cloudProvider === 'gcp' ? 140 : cloudProvider === 'aws' ? 150 : 155;
  const computeCost = nodesNeeded * nodeCostPerMonth;

  // Storage Cost: Vector DB + Lakehouse + Logs
  // $0.25/GB for managed vector DB + persistent storage
  const storageCost = Math.round(dataVolumeGB * 0.28);

  // Networking: Egress bandwidth ~$0.08/GB
  // Egress ~2KB per request payload + internal telemetry
  const egressGB = Math.round((monthlyRequests * 2.5) / (1024 * 1024));
  const networkCost = Math.max(35, Math.round(egressGB * 0.085));

  const totalMonthlyCost = monthlyModelCost + computeCost + storageCost + networkCost;
  const rangeLow = Math.round(totalMonthlyCost * 0.85);
  const rangeHigh = Math.round(totalMonthlyCost * 1.25);

  return (
    <section id="cost-estimator" className="py-24 bg-[#090D16] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Infrastructure Engineering Model</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Infrastructure Cost Estimator
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Model anticipated monthly compute, storage, networking, and token inference expenditures with transparent architectural formulas.
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Workload Parameters</span>
            </h3>

            {/* Cloud Provider & Model Tier Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                  Target Cloud Provider
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['aws', 'gcp', 'azure'] as const).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setCloudProvider(prov)}
                      className={`py-2 px-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer border ${
                        cloudProvider === prov
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                  Model Inference Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'lightweight', label: 'Fast (8B)' },
                    { id: 'balanced', label: 'Mid (70B)' },
                    { id: 'frontier', label: 'Frontier' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModelType(m.id as any)}
                      className={`py-2 px-1 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer border ${
                        modelType === m.id
                          ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider 1: Requests per Day */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="cost-requests-per-day" className="text-xs font-mono uppercase text-slate-400">Requests / Day</label>
                <span className="text-sm font-bold font-mono text-cyan-400">
                  {requestsPerDay.toLocaleString()} <span className="text-xs text-slate-500">req/day</span>
                </span>
              </div>
              <input
                id="cost-requests-per-day"
                type="range"
                min={5000}
                max={2000000}
                step={5000}
                value={requestsPerDay}
                onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>5k req/day</span>
                <span>1M req/day</span>
                <span>2M+ req/day</span>
              </div>
            </div>

            {/* Slider 2: Average Tokens per Request */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="cost-tokens-per-request" className="text-xs font-mono uppercase text-slate-400">Avg Tokens / Request</label>
                <span className="text-sm font-bold font-mono text-indigo-400">
                  {tokensPerRequest.toLocaleString()} <span className="text-xs text-slate-500">tokens</span>
                </span>
              </div>
              <input
                id="cost-tokens-per-request"
                type="range"
                min={200}
                max={4000}
                step={100}
                value={tokensPerRequest}
                onChange={(e) => setTokensPerRequest(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>200 (Short queries)</span>
                <span>2,000 (RAG contexts)</span>
                <span>4,000 (Deep synthesis)</span>
              </div>
            </div>

            {/* Slider 3: Vector & Lakehouse Data Volume */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="cost-data-volume" className="text-xs font-mono uppercase text-slate-400">Vector Store & Data Volume</label>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {dataVolumeGB.toLocaleString()} <span className="text-xs text-slate-500">GB</span>
                </span>
              </div>
              <input
                id="cost-data-volume"
                type="range"
                min={20}
                max={10000}
                step={50}
                value={dataVolumeGB}
                onChange={(e) => setDataVolumeGB(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>20 GB</span>
                <span>5,000 GB</span>
                <span>10,000 GB</span>
              </div>
            </div>

            {/* Slider 4: Active Concurrency Users */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="cost-active-users" className="text-xs font-mono uppercase text-slate-400">Estimated Active Users</label>
                <span className="text-sm font-bold font-mono text-purple-400">
                  {users.toLocaleString()} <span className="text-xs text-slate-500">users</span>
                </span>
              </div>
              <input
                id="cost-active-users"
                type="range"
                min={100}
                max={50000}
                step={500}
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-400 focus:outline-none"
              />
            </div>

          </div>

          {/* Outputs Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Total Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#121B32] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Estimated Monthly Run Rate
                </span>
                <span className="text-xs text-slate-400 font-mono uppercase">
                  {cloudProvider}
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 font-mono tracking-tight mt-3">
                ${totalMonthlyCost.toLocaleString()}
              </div>

              <div className="text-xs text-slate-400 font-mono mt-1">
                Estimated Range: <span className="text-slate-200">${rangeLow.toLocaleString()} – ${rangeHigh.toLocaleString()}</span> / mo
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3 mt-6 pt-6 border-t border-slate-800">
                
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Model & Token Inference</span>
                  </span>
                  <span className="text-indigo-400 font-bold">${monthlyModelCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span>K8s Compute Nodes ({nodesNeeded} nodes)</span>
                  </span>
                  <span className="text-cyan-400 font-bold">${computeCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Vector DB & Storage ({dataVolumeGB} GB)</span>
                  </span>
                  <span className="text-emerald-400 font-bold">${storageCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center space-x-1.5">
                    <Network className="w-3.5 h-3.5 text-purple-400" />
                    <span>Cross-AZ Egress & Networking</span>
                  </span>
                  <span className="text-purple-400 font-bold">${networkCost.toLocaleString()}</span>
                </div>

              </div>
            </div>

            {/* Mandatory Disclaimer Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans space-y-3">
              <div className="font-bold text-slate-300 flex items-center space-x-1.5 mb-1">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Transparent Architectural Notice</span>
              </div>
              <p>
                Estimates are illustrative and depend on workload, provider pricing, model choice, region, and architecture.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const summary = `INFRASTRUCTURE COST MODEL: Provider: ${cloudProvider.toUpperCase()}, Workload: ${requestsPerDay.toLocaleString()} req/day, ${tokensPerRequest} tokens/req, ${dataVolumeGB} GB Vector Storage, ${users.toLocaleString()} users. Estimated Monthly Run Rate: $${totalMonthlyCost.toLocaleString()}/mo.`;
                    if (onDiscussCost) {
                      onDiscussCost(summary);
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <span>Discuss Infrastructure Sizing in Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
