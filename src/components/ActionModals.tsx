import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

export type ModalType = 'quote' | 'customers' | null;

interface ActionModalsProps {
  activeModal: ModalType;
  prefilledScope?: string;
  onClose: () => void;
}

export function ActionModals({
  activeModal,
  prefilledScope = '',
  onClose,
}: ActionModalsProps) {
  const [address, setAddress] = useState(prefilledScope);
  const [monthlyDemand, setMonthlyDemand] = useState('450');
  const [email, setEmail] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState('');

  const [customerEmail, setCustomerEmail] = useState('');
  const [systemId, setSystemId] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [customerError, setCustomerError] = useState('');

  useEffect(() => {
    if (prefilledScope) {
      setAddress(prefilledScope);
    }
  }, [prefilledScope]);

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      setQuoteError('Please enter your site location or coordinates.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setQuoteError('Please enter a valid email address.');
      return;
    }
    setQuoteError('');
    setQuoteSubmitted(true);
  };

  const handleCustomerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = customerEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setCustomerError('Please enter the email associated with your Windora site.');
      return;
    }
    if (systemId.trim().length < 4) {
      setCustomerError('Please enter your 4+ character array ID.');
      return;
    }
    setCustomerError('');
    setCustomerMessage(
      `A secure sign-in link for array ${systemId.trim().toUpperCase()} has been sent to ${trimmedEmail}.`,
    );
  };

  const resetAndClose = () => {
    setQuoteError('');
    setCustomerError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-[460px] rounded-2xl border border-white/15 bg-[#0a0d12] p-6 text-white md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="modal-heading"
              className="text-[24px] font-medium leading-[1.2] tracking-[-0.02em]"
            >
              {activeModal === 'quote'
                ? 'Request a site assessment'
                : 'Customer portal'}
            </h2>
            <p className="mt-1.5 text-[14px] text-[#dfe5ee]/70">
              {activeModal === 'quote'
                ? 'Receive a wind, solar, and LFP storage sizing estimate.'
                : 'Access live daytime solar output and nocturnal turbine telemetry.'}
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2ee9f]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {activeModal === 'quote' ? (
          quoteSubmitted ? (
            <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
              <p className="text-[15px] leading-[1.6] text-[#dfe5ee]">
                Assessment queued for <span className="font-medium text-white">{address}</span>. We have sent your preliminary wind and solar yield summary to{' '}
                <span className="font-medium text-white">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuoteSubmitted(false);
                  setAddress('');
                  setEmail('');
                  resetAndClose();
                }}
                className="h-11 w-full rounded-[10px] bg-white text-[15px] font-medium text-[#0d1117] transition-opacity hover:opacity-88"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="quote-address"
                  className="block text-[13px] font-medium text-[#dfe5ee]/80"
                >
                  Site location &amp; configured system
                </label>
                <input
                  id="quote-address"
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Tehachapi Pass, CA — Wind + Solar Hybrid"
                  className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-black px-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-[#e2ee9f] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="quote-bill"
                  className="block text-[13px] font-medium text-[#dfe5ee]/80"
                >
                  Estimated monthly demand (MWh)
                </label>
                <input
                  id="quote-bill"
                  type="number"
                  min="10"
                  max="50000"
                  value={monthlyDemand}
                  onChange={(event) => setMonthlyDemand(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-black px-3.5 text-[15px] tabular-nums text-white focus:border-[#e2ee9f] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="quote-email"
                  className="block text-[13px] font-medium text-[#dfe5ee]/80"
                >
                  Work email address
                </label>
                <input
                  id="quote-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-black px-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-[#e2ee9f] focus:outline-none"
                />
              </div>

              {quoteError && (
                <p className="text-[13px] text-[#f3b09c]" role="alert">
                  {quoteError}
                </p>
              )}

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-[10px] bg-white text-[15px] font-medium text-[#0d1117] transition-opacity hover:opacity-88"
              >
                Send estimate request
              </button>
            </form>
          )
        ) : customerMessage ? (
          <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
            <p className="text-[15px] leading-[1.6] text-[#dfe5ee]">
              {customerMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setCustomerMessage('');
                resetAndClose();
              }}
              className="h-11 w-full rounded-[10px] bg-white text-[15px] font-medium text-[#0d1117] transition-opacity hover:opacity-88"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomerSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="customer-email"
                className="block text-[13px] font-medium text-[#dfe5ee]/80"
              >
                Account email
              </label>
              <input
                id="customer-email"
                type="email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                placeholder="owner@example.com"
                className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-black px-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-[#e2ee9f] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="customer-system-id"
                className="block text-[13px] font-medium text-[#dfe5ee]/80"
              >
                Site or array ID
              </label>
              <input
                id="customer-system-id"
                type="text"
                value={systemId}
                onChange={(event) => setSystemId(event.target.value)}
                placeholder="WND-4092"
                className="mt-1.5 h-11 w-full rounded-lg border border-white/15 bg-black px-3.5 text-[15px] uppercase tabular-nums text-white placeholder:text-white/35 focus:border-[#e2ee9f] focus:outline-none"
              />
            </div>

            {customerError && (
              <p className="text-[13px] text-[#f3b09c]" role="alert">
                {customerError}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-[10px] bg-white text-[15px] font-medium text-[#0d1117] transition-opacity hover:opacity-88"
            >
              Email sign-in link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
