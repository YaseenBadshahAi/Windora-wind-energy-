import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SystemFilter = 'all' | 'wind' | 'solar' | 'storage';

interface CapabilityItem {
  index: string;
  category: Exclude<SystemFilter, 'all'>;
  categoryLabel: string;
  title: string;
  summary: string;
  specs: string;
  output: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01.',
    category: 'wind',
    categoryLabel: 'Wind',
    title: 'Horizontal-Axis Ridge & Valley Turbines',
    summary:
      'Direct-drive rotors tuned for steady nocturnal valley currents and high-elevation wind corridors with low acoustic profiles and automated pitch feathering.',
    specs: 'Carbon-fiberglass blades · 110m hub height · LiDAR wake optimization',
    output: '4.2 MW – 6.0 MW per unit',
  },
  {
    index: '02.',
    category: 'solar',
    categoryLabel: 'Solar',
    title: 'Bifacial Ground & Canopy Solar Arrays',
    summary:
      'High-efficiency monocrystalline arrays capture direct morning irradiance and reflected ground albedo, peaking cleanly while daytime winds build.',
    specs: 'N-type bifacial cells · Single-axis trackers · Anti-reflective glass',
    output: '22.8% module efficiency',
  },
  {
    index: '03.',
    category: 'storage',
    categoryLabel: 'Storage',
    title: 'Modular LFP Grid-Scale Battery Banks',
    summary:
      'Thermally regulated lithium-iron-phosphate enclosures absorb midday solar surplus and dispatch smoothly through calm evening transitions.',
    specs: 'Liquid-cooled racks · Grid-forming inverters · 6,000+ cycle life',
    output: '< 16 ms dispatch response',
  },
  {
    index: '04.',
    category: 'wind',
    categoryLabel: 'Wind + Solar',
    title: '24-Hour Hybrid Microgrid Dispatch',
    summary:
      'Predictive weather telemetry balances daytime solar harvesting with nighttime wind generation on a single substation interconnect for flat baseload delivery.',
    specs: 'Unified SCADA control · Automated curtailment buffer · Shared tie-in',
    output: '24/7 balanced baseload',
  },
];

const FILTERS: { id: SystemFilter; label: string }[] = [
  { id: 'all', label: 'All systems' },
  { id: 'wind', label: 'Wind' },
  { id: 'solar', label: 'Solar' },
  { id: 'storage', label: 'Storage' },
];

export function CapabilitiesSection() {
  const [filter, setFilter] = useState<SystemFilter>('all');
  const [expandedIndex, setExpandedIndex] = useState<string>('01.');

  const visibleItems =
    filter === 'all'
      ? CAPABILITIES
      : CAPABILITIES.filter((item) => item.category === filter);

  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden border-t border-white/10 bg-[#05080d]"
    >
      <video
        className="systems-video"
        src="/assets/aistudio/Wind_turbine_animation_video_7c0df9fc_a808907d.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="systems-blur-veil" aria-hidden="true" />
      <div className="systems-scrim" aria-hidden="true" />

      <div className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[12.5px] font-medium text-[#d8ee8e]">
              Energy Systems
            </p>
            <h2 className="mt-2.5 text-[24px] font-medium leading-[1.16] tracking-[-0.02em] text-white text-balance md:text-[32px]">
              Wind and solar engineered to cover every hour.
            </h2>
            <p className="mt-3.5 max-w-[44ch] text-[14px] leading-[1.6] text-[#dfe5ee]/85 md:text-[14.5px]">
              Solar peaks at midday while coastal and valley winds accelerate after dusk. Windora co-locates both with LFP storage for steady, predictable power.
            </p>

            <div
              className="mt-8 inline-flex flex-wrap gap-1 rounded-xl border border-white/15 bg-black/55 p-1 backdrop-blur-md"
              role="tablist"
              aria-label="Filter energy systems"
            >
              {FILTERS.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setFilter(tab.id);
                      const firstMatch =
                        tab.id === 'all'
                          ? CAPABILITIES[0]
                          : CAPABILITIES.find((c) => c.category === tab.id);
                      if (firstMatch) setExpandedIndex(firstMatch.index);
                    }}
                    className={`min-h-[40px] whitespace-nowrap rounded-lg px-3.5 text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-[#0d1117]'
                        : 'text-[#dfe5ee]/80 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divide-y divide-white/15 border-t border-white/15 lg:col-span-7 lg:border-t-0">
            {visibleItems.map((item) => {
              const isOpen = expandedIndex === item.index;
              return (
                <div key={item.index} className="py-6 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setExpandedIndex(isOpen ? '' : item.index)
                    }
                    className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2ee9f]"
                  >
                    <div className="grid flex-1 gap-2 md:grid-cols-12 md:items-baseline md:gap-4">
                      <span className="tabular-nums text-[15px] font-medium text-[#d8ee8e] md:col-span-2">
                        {item.index}
                      </span>
                      <div className="md:col-span-10">
                        <h3 className="text-[17px] font-medium tracking-[-0.015em] text-white md:text-[19px]">
                          {item.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-[#dfe5ee]/70">
                          <span>{item.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{item.output}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-[#dfe5ee]/70 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3.5 grid gap-2 md:grid-cols-12 md:gap-4">
                      <div className="hidden md:col-span-2 md:block" />
                      <div className="space-y-2.5 md:col-span-10">
                        <p className="text-[14px] leading-[1.6] text-[#dfe5ee]/85">
                          {item.summary}
                        </p>
                        <p className="text-[12.5px] text-[#d8ee8e]">
                          {item.specs}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
