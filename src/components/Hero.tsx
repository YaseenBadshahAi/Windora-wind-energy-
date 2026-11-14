import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_MEDIA } from '../config/heroMedia';
import { Navbar } from './Navbar';

export type TimeMode = 'morning' | 'night';

interface HeroProps {
  mode: TimeMode;
  onModeChange: (mode: TimeMode) => void;
  onOpenQuote: () => void;
}

const SKY_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({
  mode,
  onModeChange,
  onOpenQuote,
}: HeroProps) {
  const hasBackground = Boolean(
    HERO_MEDIA.morningVideo || HERO_MEDIA.nightVideo,
  );
  const isNight = mode === 'night';

  const [frontMode, setFrontMode] = useState<TimeMode>(mode);
  const [outgoingMode, setOutgoingMode] = useState<TimeMode | null>(null);
  const [isPulling, setIsPulling] = useState(false);

  const frontModeRef = useRef<TimeMode>(mode);
  const pullTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (pullTimerRef.current !== null) {
      window.clearTimeout(pullTimerRef.current);
      pullTimerRef.current = null;
    }
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    const previous = frontModeRef.current;
    if (previous === mode) {
      setIsPulling(false);
      setOutgoingMode(null);
      return;
    }

    setOutgoingMode(previous);
    setIsPulling(true);

    pullTimerRef.current = window.setTimeout(() => {
      frontModeRef.current = mode;
      setFrontMode(mode);
      setIsPulling(false);
      pullTimerRef.current = null;

      settleTimerRef.current = window.setTimeout(() => {
        setOutgoingMode(null);
        settleTimerRef.current = null;
      }, 550);
    }, 300);

    return () => {
      if (pullTimerRef.current !== null) {
        window.clearTimeout(pullTimerRef.current);
      }
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, [mode]);

  const getLayerClass = (layerTime: TimeMode) => {
    if (isPulling) {
      if (layerTime === outgoingMode) return 'hero-layer is-pulling-out';
      if (layerTime === mode) return 'hero-layer is-waiting-back';
      return 'hero-layer is-hidden';
    }
    if (layerTime === frontMode) return 'hero-layer is-front';
    return 'hero-layer is-hidden';
  };

  return (
    <section
      id="top"
      className="hero"
      data-has-images={hasBackground ? 'true' : 'false'}
      aria-label="Wind energy overview"
    >
      {hasBackground && (
        <>
          {HERO_MEDIA.morningVideo && (
            <div className={getLayerClass('morning')} aria-hidden="true">
              <video
                className="hero-video"
                src={HERO_MEDIA.morningVideo}
                poster={HERO_MEDIA.morningPoster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
          )}

          {HERO_MEDIA.nightVideo && (
            <div className={getLayerClass('night')} aria-hidden="true">
              <video
                className="hero-video"
                src={HERO_MEDIA.nightVideo}
                poster={HERO_MEDIA.nightPoster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
          )}

          <div className="blur-overlay blur-overlay-top" aria-hidden="true" />
          <div className="blur-overlay blur-overlay-bottom" aria-hidden="true" />
        </>
      )}

      <Navbar
        mode={mode}
        onOpenQuote={onOpenQuote}
      />

      <div className="hero-headline-wrap">
        <h1>
          Clean wind power
          <br />
          <span className="muted">for the next</span> 30 years.
        </h1>
      </div>

      <div className="dock">
        <motion.button
          type="button"
          role="switch"
          aria-checked={isNight}
          aria-label={
            isNight
              ? 'Night mode active, switch to day mode'
              : 'Day mode active, switch to night mode'
          }
          className="glass-switch"
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          onClick={() => onModeChange(isNight ? 'morning' : 'night')}
        >
          <span className="glass-track" aria-hidden="true" />

          <span className="glass-switch-labels" aria-hidden="true">
            <motion.span
              className="glass-label glass-label-left"
              animate={{
                opacity: isNight ? 1 : 0,
                x: isNight ? 0 : -6,
              }}
              transition={{ duration: 0.3, ease: SKY_EASE }}
            >
              Night
            </motion.span>
            <motion.span
              className="glass-label glass-label-right"
              animate={{
                opacity: isNight ? 0 : 1,
                x: isNight ? 6 : 0,
              }}
              transition={{ duration: 0.3, ease: SKY_EASE }}
            >
              Day
            </motion.span>
          </span>

          <motion.span
            className="glass-thumb"
            animate={{
              x: isNight ? 64 : 0,
              y: '-50%',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 26,
              mass: 0.9,
            }}
            aria-hidden="true"
          >
            <motion.svg
              className="glass-icon glass-icon-sun"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                opacity: isNight ? 0 : 1,
                scale: isNight ? 0.65 : 1,
                rotate: isNight ? 35 : 0,
              }}
              transition={{ duration: 0.35, ease: SKY_EASE }}
            >
              <circle cx="12" cy="12" r="4.2" fill="currentColor" />
              <path
                d="M12 2.5V5M12 19V21.5M2.5 12H5M19 12H21.5M5.28 5.28L7.05 7.05M16.95 16.95L18.72 18.72M18.72 5.28L16.95 7.05M7.05 16.95L5.28 18.72"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
            <motion.svg
              className="glass-icon glass-icon-moon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                opacity: isNight ? 1 : 0,
                scale: isNight ? 1 : 0.65,
                rotate: isNight ? 0 : -35,
              }}
              transition={{ duration: 0.35, ease: SKY_EASE }}
            >
              <path
                d="M20.35 14.35A8.5 8.5 0 0 1 9.65 3.65a8.5 8.5 0 1 0 10.7 10.7Z"
                fill="currentColor"
              />
            </motion.svg>
          </motion.span>
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            className="cap"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: SKY_EASE }}
          >
            {mode === 'morning' ? (
              <>
                Daytime valley winds drive high-yield rotors,
                <br />
                feeding local grids and charging reserve banks.
              </>
            ) : (
              <>
                Steady nocturnal gusts keep turbines turning
                <br />
                and communities powered long after sundown.
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
