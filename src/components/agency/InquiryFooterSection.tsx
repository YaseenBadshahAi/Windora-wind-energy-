import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUp, X } from 'lucide-react';

interface InquiryFooterSectionProps {
  onOpenQuote: () => void;
  onOpenCustomers: () => void;
}

type PolicyKey = 'terms' | 'privacy' | 'cookies';

const POLICY_COPY: Record<
  PolicyKey,
  { title: string; updated: string; summary: string }
> = {
  terms: {
    title: 'Terms & Conditions',
    updated: 'Effective 2026',
    summary:
      'Preliminary solar and wind resource estimates generated on Windora are non-binding engineering models. Final PPA and Turnkey EPC schedules are confirmed after on-site LiDAR wind measurement, geotechnical review, and utility interconnection approval.',
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Effective 2026',
    summary:
      'Email addresses and parcel details shared through Windora site assessments or newsletter signups are used strictly to deliver clean-energy resource briefs and engineering follow-ups. We never sell or broker partner contact records.',
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'Effective 2026',
    summary:
      'Windora stores only minimal browser state needed to remember your Day/Night preview mode and interactive estimator selections. No third-party ad tracking cookies are placed.',
  },
};

export function InquiryFooterSection({
  onOpenQuote,
  onOpenCustomers,
}: InquiryFooterSectionProps) {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState('');
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  useEffect(() => {
    if (!activePolicy) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePolicy(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePolicy]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmittedEmail(trimmed);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      aria-label="Contact and footer"
      className="section-shell border-t border-white/10"
    >
      <div className="rounded-[28px] border border-white/[0.08] bg-[#0a0b0e] px-6 py-9 md:px-10 md:py-11">
        {/* Top Row: Brand, Navigation, Channels, Policies */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 text-[22px] font-medium tracking-[-0.025em] text-white"
            >
              <svg
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-6 w-6 text-[#d8ee8e]"
              >
                <circle cx="19" cy="19" r="8.5" fill="currentColor" />
                <path
                  d="M19 3.5V7.5M19 30.5V34.5M3.5 19H7.5M30.5 19H34.5M8.04 8.04L10.87 10.87M27.13 27.13L29.96 29.96M29.96 8.04L27.13 10.87M10.87 27.13L8.04 29.96"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
              <span>windora</span>
            </a>
            <p className="mt-2 text-[13.5px] text-[#dfe5ee]/55">
              Clean wind &amp; solar systems built for the grid.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            <nav aria-label="Footer site links" className="flex flex-col gap-3">
              <a
                href="#how-it-works"
                className="text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                Systems
              </a>
              <a
                href="#work"
                className="text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                Projects
              </a>
              <a
                href="#estimator"
                className="text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                Estimator
              </a>
              <a
                href="#faq"
                className="text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                FAQ
              </a>
            </nav>

            <div className="flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={onOpenQuote}
                className="cursor-pointer text-left text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                Site Assessment
              </button>
              <button
                type="button"
                onClick={onOpenCustomers}
                className="cursor-pointer text-left text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                Customer Portal
              </button>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-[14px] text-[#dfe5ee]/85 transition-colors hover:text-white"
              >
                X
              </a>
            </div>

            <div className="col-span-2 flex flex-col items-start gap-3 sm:col-span-1 md:items-end">
              <button
                type="button"
                onClick={() => setActivePolicy('terms')}
                className="cursor-pointer text-left text-[13px] text-[#dfe5ee]/50 transition-colors hover:text-[#dfe5ee]/85 md:text-right"
              >
                Terms &amp; Conditions
              </button>
              <button
                type="button"
                onClick={() => setActivePolicy('privacy')}
                className="cursor-pointer text-left text-[13px] text-[#dfe5ee]/50 transition-colors hover:text-[#dfe5ee]/85 md:text-right"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActivePolicy('cookies')}
                className="cursor-pointer text-left text-[13px] text-[#dfe5ee]/50 transition-colors hover:text-[#dfe5ee]/85 md:text-right"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Back to top pill, Mailbox Form, Email + Copyright */}
        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="order-3 md:order-1 md:col-span-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-3.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-5 pr-1.5 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2ee9f]"
            >
              <span>Back to top</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0d1117]">
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="order-1 md:order-2 md:col-span-4 md:mx-auto md:w-full md:max-w-[340px]">
            <h2 className="text-[19px] font-medium leading-[1.22] tracking-[-0.02em] text-white">
              Windora
              <br />
              in your mailbox
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-5 flex max-w-[340px] items-center rounded-full bg-white p-1.5 pl-5 focus-within:ring-2 focus-within:ring-[#d8ee8e]"
              noValidate
            >
              <label htmlFor="contact-mailbox-email" className="sr-only">
                Work email address
              </label>
              <input
                id="contact-mailbox-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError('');
                }}
                placeholder="name@example.com"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#0d1117] placeholder:text-[#64748b] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe for Windora grid updates"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0d1117] text-white transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1117]"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            {error && (
              <p className="mt-2.5 text-[13px] text-[#f3b09c]" role="alert">
                {error}
              </p>
            )}
            {submittedEmail && !error && (
              <p className="mt-2.5 text-[13px] text-[#d8ee8e]">
                Subscribed <span className="font-medium">{submittedEmail}</span> to quarterly Windora yield &amp; grid briefs.
              </p>
            )}
          </div>

          <div className="order-2 flex flex-col gap-2 md:order-3 md:col-span-4 md:items-end md:text-right">
            <a
              href="mailto:hello@windora.energy"
              className="text-[14px] font-medium text-white transition-opacity hover:opacity-75"
            >
              hello@windora.energy
            </a>
            <div className="text-[13px] leading-[1.5] text-[#dfe5ee]/45">
              <div>Windora</div>
              <div className="tabular-nums">2026 © All rights reserved</div>
            </div>
          </div>
        </div>
      </div>

      {activePolicy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
          onClick={() => setActivePolicy(null)}
        >
          <div
            className="w-full max-w-[480px] rounded-2xl border border-white/15 bg-[#0a0d12] p-6 text-white md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-[#d8ee8e]">
                  {POLICY_COPY[activePolicy].updated}
                </p>
                <h3
                  id="policy-modal-title"
                  className="mt-1.5 text-[22px] font-medium tracking-[-0.02em]"
                >
                  {POLICY_COPY[activePolicy].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label="Close policy notice"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-[15px] leading-[1.65] text-[#dfe5ee]/80">
              {POLICY_COPY[activePolicy].summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
