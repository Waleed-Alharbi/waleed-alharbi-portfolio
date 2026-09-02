import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import portrait from '../assets/personal/portrait.png';
import portrait900 from '../assets/personal/portrait-900.webp';
import portrait1254 from '../assets/personal/portrait-1254.webp';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { profile } from '../data/profile';
import { SectionDecor } from '../components/SectionDecor';

export function Hero() {
  const { language } = useSite();
  const t = content[language].hero;
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const portraitX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.45 });
  const portraitY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.45 });
  const ease = [0.16, 1, 0.3, 1] as const;

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
      <SectionDecor variant="hero" />
      <motion.div className="hero-image-frame" initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.35, delay: 0.15, ease }}>
        <motion.div className="hero-portrait-parallax" style={reduceMotion ? undefined : { x: portraitX, y: portraitY }}>
          <picture>
            <source srcSet={`${portrait900} 900w, ${portrait1254} 1254w`} sizes="(max-width: 640px) 76vw, (max-width: 980px) 58vw, 46vw" type="image/webp" />
            <motion.img src={portrait} alt={t.portraitAlt} style={reduceMotion ? undefined : { y: imageY, scale: imageScale }} />
          </picture>
        </motion.div>
        <div className="portrait-coordinate" aria-hidden="true">26.2041° N<br />43.9932° E</div>
      </motion.div>

      <div className="hero-rail" aria-hidden="true"><span>PORTFOLIO / 2026</span><i /></div>
      <motion.p className="hero-role" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.08, ease }}>{t.eyebrow}</motion.p>

      <motion.h1 className="hero-title" style={reduceMotion ? undefined : { y: titleY }}>
        <motion.span initial={reduceMotion ? false : { y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.45, ease }}>{t.first}</motion.span>
        <motion.span className="hero-title-last" initial={reduceMotion ? false : { y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.62, ease }}>{t.last}<em>.</em></motion.span>
      </motion.h1>

      <motion.div className="hero-bottom" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.16, ease }}>
        <div className="availability"><i /><span>{t.available}</span></div>
        <p className="hero-specialty" lang="en" dir="ltr">Developer · Data &amp; AI · IT Operations</p>
        <p className="hero-intro">{t.intro}</p>
        <div className="hero-actions">
          <a className="link-arrow primary-link" href={`mailto:${profile.email}`}>{t.contact}<span aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</span></a>
          <a className="link-arrow" href="#work">{t.work}<span>↓</span></a>
          <a className="link-arrow" href={profile.cv} target="_blank" rel="noreferrer">{t.cv}<span>↓</span></a>
        </div>
      </motion.div>

      <motion.a className="scroll-cue" href="#about" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}><span>{t.scroll}</span><i aria-hidden="true" /></motion.a>
    </section>
  );
}
