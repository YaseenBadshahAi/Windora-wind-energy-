import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ScopeEstimatorSectionProps {
  onRequestScope: (scopeSummary: string) => void;
}

type BillingMode = 'ppa' | 'epc';

interface EstimatorTier {
  id: string;
  name: string;
  featured?: boolean;
  ppaRate: string;
  ppaUnitTop: string;
  ppaUnitBottom: string;
  ppaSubtext: string;
  epcRate: string;
  epcUnitTop: string;
  epcUnitBottom: string;
  epcSubtext: string;
  capacityLabel: string;
  annualOutputLabel: string;
  features: string[];
  ctaLabel: string;
}

const TIERS: EstimatorTier[] = [
  {
    id: 'canopy-starter',
    name: 'Canopy Solar',
    ppaRate: '$0',
    ppaUnitTop: '',
    ppaUnitBottom: '',
    ppaSubtext: 'Zero upfront capex · 3.5 MW max',
    epcRate: '$4.2M',
    epcUnitTop: '/turnkey',
    epcUnitBottom: '/per site',
    epcSubtext: '3.5 MW · 6,825 MWh/yr output',
    capacityLabel: '3.5 MW',
    annualOutputLabel: '6,825 MWh/yr',
    features: [
      'Elevated bifacial solar canopy',
      '10-week site build window',
    ],
    ctaLabel: 'Request site estimate',
  },
  {
    id: 'commercial-hybrid',
    name: 'Commercial',
    featured: true,
    ppaRate: '$46',
    ppaUnitTop: '/per MWh',
    ppaUnitBottom: '/per month',
    ppaSubtext: '18 MW · 62,100 MWh/yr est.',
    epcRate: '$18.4M',
    epcUnitTop: '/turnkey',
    epcUnitBottom: '/per site',
    epcSubtext: 'Includes 30% ITC tax credit eligibility',
    capacityLabel: '18 MW',
    annualOutputLabel: '62,100 MWh/yr',
    features: [
      'Co-located wind + bifacial solar',
      '12 MWh liquid-cooled LFP bank',
      'Sub-16ms grid-forming inverters',
      '24/7 SCADA yield optimization',
    ],
    ctaLabel: 'Request site estimate',
  },
  {
    id: 'regional-corridor',
    name: 'Corridor',
    ppaRate: '$39',
    ppaUnitTop: '/per MWh',
    ppaUnitBottom: '/per month',
    ppaSubtext: '48 MW · 187,200 MWh/yr est.',
    epcRate: '$49.5M',
    epcUnitTop: '/turnkey',
    epcUnitBottom: '/per site',
    epcSubtext: 'Shared 115 kV substation tie-in',
    capacityLabel: '48 MW',
    annualOutputLabel: '187,200 MWh/yr',
    features: [
      'Multi-turbine ridgeline array',
      '48 MWh LFP peak reserve hub',
      'Dual-unit LiDAR wind campaign',
      'Dedicated interconnection team',
    ],
    ctaLabel: 'Request site estimate',
  },
  {
    id: 'utility-enterprise',
    name: 'Utility',
    ppaRate: 'Custom',
    ppaUnitTop: '',
    ppaUnitBottom: '',
    ppaSubtext: '100+ MW regional baseload',
    epcRate: 'Custom',
    epcUnitTop: '',
    epcUnitBottom: '',
    epcSubtext: 'Multi-site portfolio deployment',
    capacityLabel: '100+ MW',
    annualOutputLabel: '390,000+ MWh/yr',
    features: [
      '100+ MW hybrid generation',
      'HVDC subsea or overland tie',
      'Custom SCADA dispatch APIs',
      '30-year structural O&M SLA',
    ],
    ctaLabel: 'Request site estimate',
  },
];

export function ScopeEstimatorSection({
  onRequestScope,
}: ScopeEstimatorSectionProps) {
  const [billingMode, setBillingMode] = useState<BillingMode>('ppa');
  const isEpc = billingMode === 'epc';

  const handleSelectTier = (tier: EstimatorTier) => {
    const rate = isEpc ? tier.epcRate : tier.ppaRate;
    const model = isEpc ? 'Turnkey EPC Ownership' : 'Power Purchase (PPA)';
    onRequestScope(
      `${tier.name} Tier (${tier.capacityLabel}) · ${model} · ${rate} · ${tier.annualOutputLabel}`,
    );
  };

  return (
    <section
      id="estimator"
      className="section-shell border-t border-white/10"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#05070a] px-6 py-10 md:px-10 md:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#d8ee8e]/[0.07] blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-1/5 h-80 w-80 rounded-full bg-[#6d8f2a]/[0.09] blur-[120px]"
        />

        <div className="relative z-10">
          {/* Centered Heading + Toggle */}
          <div className="mx-auto max-w-[560px] text-center">
            <p className="text-[12.5px] font-medium text-[#d8ee8e]">
              Output Estimator
            </p>
            <h2 className="mt-2 text-[26px] font-medium leading-[1.14] tracking-[-0.022em] text-white text-balance md:text-[34px]">
              Power Capacity &amp; Plans
            </h2>
            <p className="mt-2.5 text-[14px] leading-[1.6] text-[#dfe5ee]/70">
              Project output and locked clean energy rates for your site load.
            </p>

            <div className="mt-8 inline-flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setBillingMode('ppa')}
                className={`min-h-[40px] cursor-pointer text-[14px] font-medium transition-colors ${
                  !isEpc ? 'text-[#d8ee8e]' : 'text-[#dfe5ee]/65 hover:text-white'
                }`}
              >
                Monthly PPA
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={isEpc}
                aria-label="Toggle between Monthly PPA and Turnkey EPC pricing"
                onClick={() => setBillingMode(isEpc ? 'ppa' : 'epc')}
                className="relative inline-flex h-[32px] w-[58px] shrink-0 cursor-pointer items-center rounded-full bg-[#d8ee8e] p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2ee9f]"
              >
                <motion.span
                  aria-hidden="true"
                  className="h-6 w-6 rounded-full bg-[#0d1117] shadow-sm"
                  animate={{ x: isEpc ? 26 : 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              </button>

              <button
                type="button"
                onClick={() => setBillingMode('epc')}
                className={`min-h-[40px] cursor-pointer text-[14px] font-medium transition-colors ${
                  isEpc ? 'text-[#d8ee8e]' : 'text-[#dfe5ee]/65 hover:text-white'
                }`}
              >
                Turnkey EPC
              </button>
            </div>
          </div>

          {/* 4-Column Comparison Grid */}
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {TIERS.map((tier) => {
              const rate = isEpc ? tier.epcRate : tier.ppaRate;
              const unitTop = isEpc ? tier.epcUnitTop : tier.ppaUnitTop;
              const unitBottom = isEpc ? tier.epcUnitBottom : tier.ppaUnitBottom;
              const subtext = isEpc ? tier.epcSubtext : tier.ppaSubtext;

              return (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[16px] font-medium tracking-[-0.01em] text-white">
                      {tier.name}
                    </h3>

                    <div className="mt-4 flex min-h-[52px] items-center gap-2">
                      <span className="tabular-nums text-[32px] font-semibold leading-none tracking-[-0.03em] text-white xl:text-[36px]">
                        {rate}
                      </span>
                      {(unitTop || unitBottom) && (
                        <span className="flex flex-col text-[11.5px] leading-[1.3] text-[#dfe5ee]/65">
                          <span>{unitTop}</span>
                          <span>{unitBottom}</span>
                        </span>
                      )}
                    </div>

                    <p className="mt-2 min-h-[18px] tabular-nums text-[12.5px] text-[#dfe5ee]/70">
                      {subtext}
                    </p>

                    <ul className="mt-7 space-y-1.5">
                      {tier.features.map((feature, index) => (
                        <li
                          key={feature}
                          className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] leading-[1.35] text-[#dfe5ee]/85 ${
                            index % 2 === 0 ? 'bg-white/[0.06]' : 'bg-transparent'
                          }`}
                        >
                          <Check
                            className="h-3.5 w-3.5 shrink-0 text-[#d8ee8e]"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier)}
                    className={`mt-7 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg px-4 text-[14px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2ee9f] ${
                      tier.featured
                        ? 'bg-[#d8ee8e] text-[#0d1117] hover:bg-[#e2ee9f]'
                        : 'border border-white/10 bg-white/[0.08] text-white hover:bg-white/[0.14]'
                    }`}
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Strip */}
          <div className="mt-8 rounded-lg border border-white/[0.07] bg-white/[0.05] px-4 py-3 text-center text-[13px] text-[#dfe5ee]/70">
            Schedule a Windora site assessment today — Includes LiDAR wind resource check and grid tie-in review at zero upfront cost.
          </div>
        </div>
      </div>
    </section>
  );
}
