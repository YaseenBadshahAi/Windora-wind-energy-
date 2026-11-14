import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const FAQS = [
  {
    question: 'Why combine wind turbines and solar arrays on the same site?',
    answer:
      'Solar irradiation peaks between late morning and mid-afternoon, while valley and ridge winds reliably accelerate through dusk and overnight. Co-locating both lets a single substation tie-in deliver steady 24-hour generation.',
  },
  {
    question: 'How much land or roof footprint does a Windora system need?',
    answer:
      'Wind towers occupy less than 2% of surrounding agricultural or grazing acreage, allowing farming to continue right up to the foundation pad. Commercial solar can be mounted over existing parking or freight canopies.',
  },
  {
    question: 'What happens during multi-day calm or overcast weather?',
    answer:
      'Hybrid sites pair LFP battery reserve banks with grid-forming inverters and regional wind diversity to bridge low-generation windows seamlessly without interrupting facility loads.',
  },
  {
    question: 'How long are the structural and output warranties?',
    answer:
      'Windora turbines, bifacial solar modules, and collector infrastructure carry a 30-year structural design life and linear performance guarantee backed by continuous SCADA diagnostics.',
  },
  {
    question: 'Does Windora handle utility interconnection and permitting?',
    answer:
      'Yes. Our engineering team manages LiDAR wind campaigns, environmental reviews, municipal zoning, and utility interconnection filings end to end.',
  },
];

export function EngagementFaqSection() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <section
      id="faq"
      className="section-shell relative overflow-hidden border-t border-white/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-8 h-80 w-80 rounded-full bg-[#d8ee8e]/[0.07] blur-[120px]"
      />

      <div className="relative z-10 grid w-full gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[12.5px] font-medium text-[#d8ee8e]">
            FAQ
          </p>
          <h2 className="mt-2.5 text-[24px] font-medium leading-[1.16] tracking-[-0.02em] text-white text-balance md:text-[32px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 max-w-[40ch] text-[14px] leading-[1.6] text-[#dfe5ee]/65">
            Answered common technical &amp; deployment questions. Still unsure?{' '}
            <a
              href="#contact"
              className="text-[#dfe5ee]/85 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
            >
              Feel free to contact our engineers.
            </a>
          </p>
        </div>

        <div className="divide-y divide-white/12 border-t border-b border-white/12 lg:col-span-8 lg:border-t-0">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="py-4 first:lg:pt-0 md:py-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2ee9f]"
                >
                  <span className="text-[15px] font-medium tracking-[-0.01em] text-white md:text-[16px]">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#dfe5ee]/75">
                    {isOpen ? (
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2.5 max-w-[72ch] pr-8 text-[13.5px] leading-[1.65] text-[#dfe5ee]/65 md:text-[14px]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
