import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext';

const INTRO_KEY = 'waleed-intro-seen';
const ease = [0.22, 1, 0.36, 1] as const;

function introShouldShow() {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) !== 'skip';
  } catch {
    return true;
  }
}

export function IntroOverlay() {
  const { language, theme } = useSite();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(introShouldShow);
  const copy = language === 'ar'
    ? { eyebrow: 'ملف أعمال وليد الحربي', first: 'مرحبًا بك', second: 'في معرض أعمالي.' }
    : { eyebrow: 'WALEED ALHARBI / PORTFOLIO', first: 'WELCOME', second: 'TO MY PORTFOLIO.' };

  useEffect(() => {
    if (!visible) return;

    try {
      window.sessionStorage.setItem(INTRO_KEY, 'skip');
    } catch {
      // Session storage can be unavailable in hardened browsers.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 350 : 1900);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion, visible]);

  const dismiss = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={dismiss}>
      {visible && (
        <motion.div
          className={`portfolio-intro portfolio-intro-${theme}`}
          data-theme={theme}
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { y: '-100%', transition: { duration: 0.78, ease } }}
        >
          <motion.div
            className="portfolio-intro-orbit"
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0.72, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: reduceMotion ? 0 : 12 }}
            transition={{ duration: 1.7, ease }}
          />
          <div className="portfolio-intro-content" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <motion.span
              className="portfolio-intro-mark"
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
            >
              WA
            </motion.span>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease }}
            >
              {copy.eyebrow}
            </motion.p>
            <h1 className="portfolio-intro-title">
              <span className="portfolio-intro-line">
                <motion.span initial={reduceMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.86, delay: 0.38, ease }}>{copy.first}</motion.span>
              </span>
              <span className="portfolio-intro-line portfolio-intro-line-accent">
                <motion.span initial={reduceMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.54, ease }}>{copy.second}</motion.span>
              </span>
            </h1>
            <motion.i
              className="portfolio-intro-rule"
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.82, ease }}
            />
          </div>
          <div className="portfolio-intro-progress" aria-hidden="true">
            <motion.i
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.65, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
