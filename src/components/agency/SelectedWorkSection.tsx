import { useEffect, useState } from 'react';
import {
  BatteryCharging,
  Maximize2,
  Mountain,
  Sun,
  Waves,
  Wind,
  X,
  type LucideIcon,
} from 'lucide-react';
import hybridRidgeImage from '../../assets/images/windora_hybrid_ridge_1794652141064.jpg';
import batterySubstationImage from '../../assets/images/windora_battery_substation_1794652143152.jpg';
import solarMicrogridImage from '../../assets/images/windora_solar_microgrid_1794652143349.jpg';
import offshoreArrayImage from '../../assets/images/windora_offshore_array_1794652917343.jpg';
import alpinePlateauImage from '../../assets/images/windora_alpine_substation_1794652917350.jpg';

export interface ProjectCase {
  id: string;
  site: string;
  subtitle: string;
  category: string;
  year: string;
  headline: string;
  metric: string;
  metricContext: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  iconColorClass: string;
  challenge: string;
  solution: string;
  impact: string[];
}

const PROJECTS: ProjectCase[] = [
  {
    id: 'offshore-array',
    site: 'Cascadia Offshore',
    subtitle: '120 MW deep-water wind corridor · Dawn dispatch',
    category: 'Offshore Wind Array',
    year: '2026',
    headline: 'Deep-water fixed-bottom turbines capturing steady marine winds.',
    metric: '120 MW',
    metricContext: 'Peak marine corridor capacity',
    image: offshoreArrayImage,
    imageAlt:
      'Offshore white wind turbines rising from calm slate coastal water at dawn',
    icon: Waves,
    iconColorClass: 'text-[#1d6f8a]',
    challenge:
      'Coastal load centers needed clean baseload capacity before inland solar ramped up each morning.',
    solution:
      'Installed 20 marine-grade 6 MW turbines tied via subsea HVDC cable directly into the regional coastal substation.',
    impact: [
      '120 MW continuous marine corridor output',
      '64% winter capacity factor during peak coastal storms',
      'Powers 82,000 coastal homes with zero land footprint',
    ],
  },
  {
    id: 'north-coast-storage',
    site: 'North Coast Hub',
    subtitle: '48 MWh LFP reserve · 99.98% feeder stability',
    category: 'Wind + LFP Reserve Substation',
    year: '2026',
    headline: 'Modular battery banks stabilizing coastal wind ramps in milliseconds.',
    metric: '99.98%',
    metricContext: 'Grid-tie availability across 14,000 operating hours',
    image: batterySubstationImage,
    imageAlt:
      'Matte dark grid-scale battery storage enclosures positioned cleanly beside wind turbine towers at dusk',
    icon: BatteryCharging,
    iconColorClass: 'text-[#15803d]',
    challenge:
      'Sudden offshore wind gusts created voltage swings on local distribution feeders, forcing frequent curtailment during peak nights.',
    solution:
      'Deployed 48 MWh of liquid-cooled LFP storage containers tied directly to the turbine collector bus with sub-16ms grid-forming inverters.',
    impact: [
      '99.98% feeder stability across 14,000 continuous operating hours',
      'Zero wind curtailment recorded during peak winter storm fronts',
      '12-minute autonomous black-start capability for coastal substations',
    ],
  },
  {
    id: 'tehachapi-hybrid-ridge',
    site: 'Tehachapi Hybrid Ridge',
    subtitle: '84 MW co-located wind & bifacial solar · 58k homes',
    category: 'Co-Located Wind & Bifacial Solar',
    year: '2026',
    headline: 'Pairing 12 valley turbines with 42 MW of south-facing bifacial solar.',
    metric: '84 MW',
    metricContext: 'Combined peak capacity on a single tie-in',
    image: hybridRidgeImage,
    imageAlt:
      'White wind turbines standing alongside rows of dark bifacial solar panels across a green valley ridge at twilight',
    icon: Wind,
    iconColorClass: 'text-[#4d7c0f]',
    challenge:
      'Existing solar-only capacity dropped sharply after 5:00 PM just as regional grid demand surged into the evening peak.',
    solution:
      'Windora co-located twelve 3.5 MW wind turbines above the solar array, sharing one substation interconnect and shifting peak delivery into the night.',
    impact: [
      '84 MW combined peak output without expanding substation footprint',
      '71% annual capacity factor across combined daytime and nocturnal curves',
      'Powers 58,000 regional households year-round',
    ],
  },
  {
    id: 'salinas-valley-microgrid',
    site: 'Salinas Microgrid',
    subtitle: '3.8 MW solar canopy + wind PPA · 62% cost savings',
    category: 'Solar Canopy + Wind PPA',
    year: '2025',
    headline: 'Elevated anodized solar canopies paired with off-site night wind.',
    metric: '62%',
    metricContext: 'Annual utility cost reduction in year one',
    image: solarMicrogridImage,
    imageAlt:
      'Elevated dark anodized solar canopy array powering a modern agricultural facility with wind turbines turning on distant hills',
    icon: Sun,
    iconColorClass: 'text-[#b45309]',
    challenge:
      'Cold-storage packing lines required continuous refrigeration 24 hours a day while avoiding roof penetrations and shading loading bays.',
    solution:
      'Constructed a 3.8 MW elevated solar canopy over active freight lanes, backed by a Windora night-wind PPA and on-site peak-shaving battery.',
    impact: [
      '62% reduction in annual commercial electricity expenditure',
      '9,400 metric tons of CO₂ avoided across the first 12 months',
      'Zero downtime during two regional summer utility shutoffs',
    ],
  },
  {
    id: 'high-desert-plateau',
    site: 'Mojave Ridge Plateau',
    subtitle: '65 MW single-axis solar trackers · High-elevation tie',
    category: 'High-Altitude Solar + Ridge Wind',
    year: '2025',
    headline: 'Precision single-axis trackers paired with ridgeline wind generation.',
    metric: '65 MW',
    metricContext: 'Peak solar irradiance capture at 4,200 ft elevation',
    image: alpinePlateauImage,
    imageAlt:
      'Dark monocrystalline solar tracker rows on an elevated plateau with mountain ridges and distant wind turbines',
    icon: Mountain,
    iconColorClass: 'text-[#0369a1]',
    challenge:
      'High-altitude winter temperature swings and afternoon dust winds reduced output on conventional fixed-tilt arrays.',
    solution:
      'Engineered automated hail-stow single-axis trackers tied to a ridgeline wind collector for resilient four-season delivery.',
    impact: [
      '65 MW peak output with 19% higher winter yield via tracking',
      'Automated 60-degree wind-stow protection in under 90 seconds',
      'Interconnected directly to existing 115 kV transmission corridor',
    ],
  },
];

export function SelectedWorkSection() {
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [selected, setSelected] = useState<ProjectCase | null>(null);

  const activeProject = PROJECTS[activeIndex];
  const ActiveIcon = activeProject.icon;

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <section
      id="work"
      className="section-shell border-t border-white/10"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-[12.5px] font-medium text-[#d8ee8e]">
            Commissioned Sites
          </p>
          <h2 className="mt-2.5 max-w-[22ch] text-[24px] font-medium leading-[1.16] tracking-[-0.02em] text-white text-balance md:text-[32px]">
            Wind and solar projects powering real grids.
          </h2>
        </div>
        <p className="max-w-[42ch] text-[14px] leading-[1.6] text-[#dfe5ee]/70">
          Select any site strip to expand its installation view, or open full generation specifications.
        </p>
      </div>

      {/* Desktop & Tablet: Horizontal 5-card expanding accordion strip */}
      <div
        className="mt-10 hidden h-[380px] items-stretch gap-3 md:flex lg:h-[430px]"
        role="region"
        aria-label="Commissioned wind and solar project gallery"
      >
        {PROJECTS.map((project, index) => {
          const isActive = index === activeIndex;
          const Icon = project.icon;

          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
              role={isActive ? undefined : 'button'}
              tabIndex={isActive ? undefined : 0}
              aria-label={isActive ? undefined : `View ${project.site}`}
              onKeyDown={(event) => {
                if (!isActive && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className={`group relative overflow-hidden bg-[#0d1117] transition-[flex,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? 'flex-[6.5_1_0%] rounded-[28px]'
                  : 'flex-[0.65_1_0%] min-w-[54px] cursor-pointer rounded-full hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2ee9f]'
              }`}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />

              {isActive ? (
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                      aria-hidden="true"
                    >
                      <Icon className={`h-5 w-5 ${project.iconColorClass}`} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-[18px] font-medium leading-[1.2] tracking-[-0.015em] text-white lg:text-[20px]">
                        {project.site}
                      </h3>
                      <p className="mt-0.5 truncate text-[13px] text-white/80">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelected(project);
                    }}
                    aria-label={`Inspect ${project.site} specifications`}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0d1117] shadow-md transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2ee9f]"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="pointer-events-none absolute inset-x-0 bottom-3.5 flex justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className={`h-4 w-4 ${project.iconColorClass}`} />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Phone (< 768px): Active expanded card + 5 vertical sliver thumbnails */}
      <div className="mt-10 space-y-3 md:hidden">
        <div className="relative h-[340px] w-full overflow-hidden rounded-[24px] bg-[#0d1117]">
          <img
            src={activeProject.image}
            alt={activeProject.imageAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md"
                aria-hidden="true"
              >
                <ActiveIcon
                  className={`h-5 w-5 ${activeProject.iconColorClass}`}
                />
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-[18px] font-medium leading-[1.2] tracking-[-0.015em] text-white">
                  {activeProject.site}
                </h3>
                <p className="mt-0.5 truncate text-[13px] text-white/80">
                  {activeProject.subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelected(activeProject)}
              aria-label={`Inspect ${activeProject.site} specifications`}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0d1117] shadow-md"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {PROJECTS.map((project, index) => {
            const isActive = index === activeIndex;
            const Icon = project.icon;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Select ${project.site}`}
                className={`relative h-[78px] overflow-hidden rounded-full bg-[#0d1117] transition-opacity ${
                  isActive
                    ? 'ring-2 ring-[#d8ee8e] ring-offset-2 ring-offset-black'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={project.image}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="pointer-events-none absolute bottom-1.5 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow">
                  <Icon className={`h-3.5 w-3.5 ${project.iconColorClass}`} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-case-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0d12] p-6 text-white md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#dfe5ee]/60">
                  <span className="font-medium text-[#d8ee8e]">
                    {selected.site}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selected.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{selected.year}</span>
                </div>
                <h3
                  id="project-case-title"
                  className="mt-2 text-[24px] font-medium leading-[1.2] tracking-[-0.02em]"
                >
                  {selected.headline}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#0d1117]">
              <img
                src={selected.image}
                alt={selected.imageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
              <div>
                <h4 className="text-[13px] font-medium text-[#dfe5ee]/60">
                  Site Challenge
                </h4>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-[#dfe5ee]/85">
                  {selected.challenge}
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-medium text-[#dfe5ee]/60">
                  Engineering &amp; Dispatch
                </h4>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-[#dfe5ee]/85">
                  {selected.solution}
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-medium text-[#dfe5ee]/60">
                  Measured Performance
                </h4>
                <ul className="mt-2 space-y-2">
                  {selected.impact.map((line) => (
                    <li
                      key={line}
                      className="text-[15px] leading-[1.5] text-[#d8ee8e]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
