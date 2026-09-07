import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import portrait900 from '../assets/personal/portrait-900.webp';
import portrait1254 from '../assets/personal/portrait-1254.webp';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { profile } from '../data/profile';
import { useDataSaver } from '../hooks/useDataSaver';

export function Hero() {
  const { language } = useSite();
  const t = content[language].hero;
  const section = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const saveData = useDataSaver();
  const heroIsVisible = useInView(section, { amount: 0.05 });
  const shouldLoadVideo = !reduceMotion && !saveData;
  const [activeRole, setActiveRole] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const portraitX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.45 });
  const portraitY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.45 });
  const ease = [0.16, 1, 0.3, 1] as const;
  const roles = language === 'ar'
    ? ['خريج تقنية معلومات', 'Developer', 'Problem Solver', 'App Builder', 'Data & AI Explorer', 'Cybersecurity Learner']
    : ['Information Technology Graduate', 'Developer', 'Problem Solver', 'App Builder', 'Data & AI Explorer', 'Cybersecurity Learner'];

  useEffect(() => {
    setActiveRole(0);
    if (reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % roles.length);
    }, 2300);
    return () => window.clearInterval(interval);
  }, [language, reduceMotion, roles.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return undefined;

    if (heroIsVisible) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
    return undefined;
  }, [heroIsVisible, shouldLoadVideo]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(x * 18);
    pointerY.set(y * 18);
  };

  const resetPointerParallax = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="hero" id="top" ref={section} onPointerMove={handlePointerMove} onPointerLeave={resetPointerParallax}>
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay={shouldLoadVideo}
        muted
        loop
        playsInline
        preload={shouldLoadVideo ? 'metadata' : 'none'}
        poster="/images/hero-poster.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        {shouldLoadVideo && <source src="/videos/hero-space.mp4" type="video/mp4" />}
      </video>
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <motion.div className="hero-image-frame" initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.35, delay: 0.15, ease }}>
        <motion.div className="hero-portrait-parallax" style={reduceMotion ? undefined : { x: portraitX, y: portraitY }}>
          <picture>
            <source srcSet={`${portrait900} 900w, ${portrait1254} 1254w`} sizes="(max-width: 640px) 76vw, (max-width: 980px) 58vw, 46vw" type="image/webp" />
            <motion.img src={portrait1254} alt={t.portraitAlt} decoding="async" style={reduceMotion ? undefined : { y: imageY, scale: imageScale }} />
          </picture>
        </motion.div>
        <div className="portrait-coordinate" aria-hidden="true">26.2041° N<br />43.9932° E</div>
      </motion.div>

      <div className="hero-rail" aria-hidden="true"><span>PORTFOLIO / 2026</span><i /></div>

      <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.28, ease }}>
        <motion.p className="hero-role" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease }}>{t.eyebrow}</motion.p>
        <motion.h1 className="hero-title" style={reduceMotion ? undefined : { y: titleY }}>
          <motion.span initial={reduceMotion ? false : { y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.45, ease }}>{t.first}</motion.span>
          <motion.span className="hero-title-last" initial={reduceMotion ? false : { y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.62, ease }}>{t.last}<em>.</em></motion.span>
        </motion.h1>

        <div className="hero-role-cycle" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${language}-${activeRole}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
            >
              {roles[activeRole]}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="hero-intro">{t.intro}</p>
        <div className="availability"><i /><span>{t.available}</span></div>
        <div className="hero-actions">
          <a className="link-arrow primary-link" href="#work">{t.work}<span aria-hidden="true">↓</span></a>
          <a className="link-arrow" href={`mailto:${profile.email}`}>{t.contact}<span aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</span></a>
        </div>
      </motion.div>

      <motion.a className="scroll-cue" href="#about" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}><span>{t.scroll}</span><i aria-hidden="true" /></motion.a>
    </section>
  );
}
