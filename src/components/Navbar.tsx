import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  mode: 'morning' | 'night';
  onOpenQuote: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#top' },
  { label: 'Systems', href: '#how-it-works' },
  { label: 'Projects', href: '#work' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ mode, onOpenQuote }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className={scrolled ? 'bar is-scrolled' : 'bar'}>
        <a href="#top" className="logo" aria-label="Windora home">
          <motion.svg
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            animate={{ rotate: mode === 'night' ? 0 : 45 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <circle cx="19" cy="19" r="8.5" fill="currentColor" />
            <path
              d="M19 3.5V7.5M19 30.5V34.5M3.5 19H7.5M30.5 19H34.5M8.04 8.04L10.87 10.87M27.13 27.13L29.96 29.96M29.96 8.04L27.13 10.87M10.87 27.13L8.04 29.96"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </motion.svg>
          <span>windora</span>
        </a>

        <div className="bar-right">
          <nav className="nav-pill" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button type="button" className="cta" onClick={onOpenQuote}>
            Get a quote
          </button>

          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

