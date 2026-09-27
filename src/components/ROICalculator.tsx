import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, ShieldCheck, Download, Check, Sparkles, ArrowRight } from 'lucide-react';

interface ROICalculatorProps {
  onDiscussScope: (reportDetails: string) => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onDiscussScope }) => {
  const [engineers, setEngineers] = useState<number>(65);
  const [monthlySpend, setMonthlySpend] = useState<number>(85000);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Transparent Formulas:
  // Cloud FinOps Optimization: typically 28% to 40% reduction in unutilized resources
  const annualCloudSpend = monthlySpend * 12;
  const projectedCloudSavings = Math.round(annualCloudSpend * 0.34);

  // Engineering Capacity Reclaimed:
  // ~320 hours/year reclaimed per engineer from automated CI/CD, self-healing SRE, and cognitive RAG search
  const reclaimedHours = Math.round(engineers * 320);
  // Average blended enterprise loaded engineering cost of $80/hr
  const engineeringValueSaved = Math.round(reclaimedHours * 80);

  const totalAnnualSavings = projectedCloudSavings + engineeringValueSaved;

  // Payback Horizon:
  // Model breaks even in approximately 2 to 4.5 months based on scale
  const paybackHorizon = Math.max(
    1.9,
    Math.min(4.8, +(3.6 - (monthlySpend / 1000000) * 1.2 - (engineers / 2500) * 0.7).toFixed(1))
  );

  const reportText = `NEXORA ENTERPRISE ROI ILLUSTRATIVE REPORT
==========================================
Engineering Team Size: ${engineers} Engineers
Monthly Cloud Footprint: $${monthlySpend.toLocaleString()} / mo ($${annualCloudSpend.toLocaleString()} / yr)

PROJECTED VALUE MODEL:
• Projected Annual Savings: $${totalAnnualSavings.toLocaleString()}
  - Cloud FinOps Reduction (34% est.): $${projectedCloudSavings.toLocaleString()} / yr
  - Reclaimed Engineering Capacity: $${engineeringValueSaved.toLocaleString()} / yr
• Reclaimed Engineering Capacity: ${reclaimedHours.toLocaleString()} hours / year
• Estimated Payback Horizon: ${paybackHorizon} Months

NOTICE:
This calculation represents an illustrative modeling framework based on distributed systems benchmarks and does not constitute a guaranteed price or performance promise.`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 3000);
  };

  return (
    <section id="roi-calculator" className="py-24 bg-[#0B101D] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Economic Modeling Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Enterprise ROI Calculator
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Quantify the potential economic leverage of cloud FinOps optimization, automated CI/CD pipelines, and intelligent operational tooling.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-8 shadow-xl">
            
            {/* Slider 1: Engineers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="roi-engineering-team-size" className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Engineering Team Size
                </label>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {engineers} <span className="text-xs text-slate-500 font-sans">engineers</span>
                </span>
              </div>
              <input
                id="roi-engineering-team-size"
                type="range"
                min={10}
                max={2500}
                step={5}
                value={engineers}
                onChange={(e) => setEngineers(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                <span>10</span>
                <span>1,000</span>
                <span>2,500+</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[25, 65, 250, 1000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setEngineers(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                      engineers === preset
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {preset} eng
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Cloud Spend */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="roi-monthly-cloud-spend" className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Monthly Cloud Spend
                </label>
                <span className="text-2xl font-bold font-mono text-indigo-400">
                  ${monthlySpend.toLocaleString()} <span className="text-xs text-slate-500 font-sans">/ mo</span>
                </span>
              </div>
              <input
                id="roi-monthly-cloud-spend"
                type="range"
                min={10000}
                max={1000000}
                step={5000}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                <span>$10k/mo</span>
                <span>$500k/mo</span>
                <span>$1M+/mo</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[35000, 85000, 250000, 750000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlySpend(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                      monthlySpend === preset
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    ${preset >= 1000 ? `${preset / 1000}k` : preset}/mo
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Model Explanation */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="font-bold text-slate-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Transparent Model Logic</span>
              </div>
              <p>
                Calculations project a 34% reduction in unutilized cloud resources via automated FinOps, alongside 320 reclaimed hours annually per engineer via cognitive search and CI/CD automation.
              </p>
            </div>

          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Impact Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#121B32] border border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 font-semibold">
                  Projected Annual Enterprise Value
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Illustrative Scenario
                </span>
              </div>

              <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-300 font-mono tracking-tight">
                ${totalAnnualSavings.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-slate-300 mt-2">
                Combined Cloud FinOps & Reclaimed Capacity Projection
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">Cloud FinOps Reduction</div>
                  <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                    ${projectedCloudSavings.toLocaleString()} <span className="text-xs text-slate-500 font-sans">/ yr</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">34% modeled waste elimination</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">Engineering Capacity Value</div>
                  <div className="text-xl font-bold font-mono text-indigo-300 mt-1">
                    ${engineeringValueSaved.toLocaleString()} <span className="text-xs text-slate-500 font-sans">/ yr</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Automated workflows & CI/CD</div>
                </div>
              </div>
            </div>

            {/* Metrics Sub-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">Reclaimed Capacity</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {reclaimedHours.toLocaleString()} <span className="text-xs text-indigo-400 font-sans">hrs/yr</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Reduces manual deployment toil, context switching, and pipeline maintenance.
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">Payback Horizon</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                    {paybackHorizon} <span className="text-xs text-slate-400 font-sans">Months</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Modeled break-even timeline based on architectural maturity and scale.
                  </div>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => onDiscussScope(reportText)}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/25 hover:shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Discuss Scope for Your Organization</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyReport}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Report Copied</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-slate-400" />
                    <span>Generate Example ROI Report</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-center text-slate-500 font-mono">
              Notice: Figures are illustrative projections generated for feasibility estimation. Actual outcomes vary by system constraints and operational baseline.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
