import React, { useState } from 'react';
import { ENGAGEMENT_TIERS } from '../data/nexoraData';
import { EngagementTier } from '../types/nexora';
import { Check, Sparkles, Shield, ArrowRight, Layers, Clock, ShieldCheck } from 'lucide-react';

interface EngagementModelsProps {
  onSelectTier: (tier: EngagementTier) => void;
}

export const EngagementModels: React.FC<EngagementModelsProps> = ({ onSelectTier }) => {
  const [billingPeriod, setBillingPeriod] = useState<'quarterly' | 'annual'>('annual');

  const getTierPricing = (tierId: string) => {
    if (tierId === 'sprint-discovery') {
      return billingPeriod === 'annual'
        ? { price: '$28,000', period: '/ sprint commitment', savings: 'Save $7,000 per cycle' }
        : { price: '$35,000', period: '/ one-time sprint', savings: null };
    }
    if (tierId === 'enterprise-squad') {
      return billingPeriod === 'annual'
        ? { price: '$55,000', period: '/ month (billed annually)', savings: 'Save 20% on monthly pod retainer' }
        : { price: '$68,000', period: '/ month (quarterly cycle)', savings: null };
    }
    return { price: 'Custom Scope', period: 'tailored enterprise contract', savings: null };
  };

  const getTierSla = (tierId: string) => {
    if (tierId === 'sprint-discovery') return '5-Day Initial PoC Milestone Delivery';
    if (tierId === 'enterprise-squad') return '99.99% Architecture Availability & Dedicated Slack';
    return '99.995% SLA & 24/7 Dedicated SRE Squad';
  };

  return (
    <section id="pricing" className="py-24 bg-[#090D16] relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Partnership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engagement Models & Investment
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Collaborative models built for engineering agility, verifiable milestone delivery, and comprehensive technical capability transfer.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 inline-flex items-center space-x-1 shadow-inner">
              <button
                type="button"
                onClick={() => setBillingPeriod('quarterly')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  billingPeriod === 'quarterly'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Quarterly Cycle
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  billingPeriod === 'annual'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Partnership</span>
                <span className="text-[10px] font-mono bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ENGAGEMENT_TIERS.map((tier) => {
            const pricing = getTierPricing(tier.id);
            const sla = getTierSla(tier.id);

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.isPopular
                    ? 'bg-[#0F172A] border-2 border-indigo-500/80 shadow-2xl shadow-indigo-500/20 scale-100 lg:-translate-y-2'
                    : 'bg-[#0F172A]/70 border border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-extrabold text-[10px] tracking-widest uppercase shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST REQUESTED</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1.5">{tier.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 border-y border-slate-800/80 mb-6">
                    <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                      {pricing.price}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {pricing.period}
                    </div>
                    {pricing.savings && (
                      <div className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                        ✓ {pricing.savings}
                      </div>
                    )}
                  </div>

                  {/* SLA Badge */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-6 space-y-1">
                    <div className="flex items-center space-x-1.5 text-cyan-400 font-mono font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>SLA Commitment</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {sla}
                    </p>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-bold mb-3">
                      Included Capabilities
                    </div>
                    <ul className="space-y-2.5">
                      {tier.includedCapabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-6 border-t border-slate-800">
                  <button
                    onClick={() => onSelectTier(tier)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-600/30 hover:scale-[1.02]'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <span>Discuss Scope ({tier.name})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice on Scope & IP */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-2xl mx-auto text-xs text-slate-400 space-y-1">
          <div className="font-semibold text-slate-300">100% Client Intellectual Property & Code Ownership</div>
          <p>Every line of code, Terraform script, and model evaluation harness is committed directly to your internal repositories.</p>
        </div>

      </div>
    </section>
  );
};
