import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Sparkles, Layers, Cpu } from 'lucide-react';

interface DossierProps {
  onOpenContact: () => void;
}

export const ArchitecturalDossierExport: React.FC<DossierProps> = ({ onOpenContact }) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownloadJSON = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dossierData = {
        company: "Nexora Enterprise Intelligence Dossier",
        timestamp: new Date().toISOString(),
        version: "4.8.2-enterprise",
        securityCompliance: ["SOC2 Type II", "ISO 27001", "HIPAA Ready", "GDPR Zero-Retention"],
        architectureTopology: {
          ingress: "Anycast Global Load Balancer + WAF",
          apiGateway: "Envoy mTLS v1.3 Mesh",
          orchestration: "LangGraph Durable Agent Execution",
          aiInference: "vLLM Private GPU Clusters (NVIDIA H100)",
          vectorDatabase: "Qdrant HNSW Partitioned Vector Store",
          relationalDB: "PostgreSQL High-Availability Multi-Region"
        },
        estimatedRoi: {
          annualCostReduction: "$1,450,000",
          developerVelocityGain: "3.4x",
          latencyReduction: "68%"
        }
      };

      const blob = new Blob([JSON.stringify(dossierData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Nexora-Architecture-Dossier-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 800);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <section id="dossier-export" className="py-24 bg-[#090D16] border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0B101D] to-[#070B14] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Architecture Report</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Automated Architectural Dossier & PDF Export
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Generate an executive-ready architectural dossier summarizing your custom system topology, projected ROI calculations, security compliance audits, and multi-region latency specs.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
                <span className="flex items-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> SOC2 Type II Certified
                </span>
                <span>•</span>
                <span className="flex items-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> ISO 27001
                </span>
                <span>•</span>
                <span className="flex items-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> HIPAA Ready
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleDownloadJSON}
                disabled={isExporting}
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating Dossier...' : 'Download JSON Dossier'}</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="w-full px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Print / Export Executive PDF</span>
              </button>

              {downloadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center space-x-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Dossier downloaded successfully!</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
