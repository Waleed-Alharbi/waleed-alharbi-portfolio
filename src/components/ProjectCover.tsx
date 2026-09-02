import { motion, useReducedMotion } from 'framer-motion';
import type { PortfolioProject } from '../data/projects';
import { useSite } from '../context/SiteContext';

export function ProjectCover({ project }: { project: PortfolioProject }) {
  const { language } = useSite();
  const reduceMotion = useReducedMotion();
  const images = project.images;
  const windowMotion = reduceMotion ? undefined : { y: -10, rotate: 0 };

  if (project.theme === 'helpdesk') {
    return (
      <div className="project-cover helpdesk-cover">
        <div className="cover-grid" aria-hidden="true" />
        <span className="cover-label cover-label-a">SERVICE / DESK</span><span className="cover-label cover-label-b">OPS—01</span>
        <motion.figure className="ui-window ui-window-main" whileHover={windowMotion} transition={{ duration: .4 }}>
          <WindowBar label="OPERATIONS OVERVIEW" /><img src={images[0].src} alt={images[0].alt[language]} loading="lazy" />
        </motion.figure>
        <motion.figure className="ui-window ui-window-secondary" whileHover={windowMotion} transition={{ duration: .4 }}>
          <WindowBar label="TICKET QUEUE" /><img src={images[1].src} alt={images[1].alt[language]} loading="lazy" />
        </motion.figure>
        <div className="cover-stamp"><strong>IT</strong><span>OPERATIONS<br />SYSTEM</span></div>
      </div>
    );
  }

  if (project.theme === 'soc') {
    return (
      <div className="project-cover soc-cover">
        <div className="soc-scan" aria-hidden="true" /><span className="soc-number" aria-hidden="true">02</span>
        <div className="soc-status"><i /> SIMULATED ENVIRONMENT <span>124 EVENTS / 34 ALERTS</span></div>
        <motion.figure className="soc-screen soc-screen-main" whileHover={windowMotion}><img src={images[0].src} alt={images[0].alt[language]} loading="lazy" /></motion.figure>
        <motion.figure className="soc-screen soc-screen-network" whileHover={windowMotion}><img src={images[1].src} alt={images[1].alt[language]} loading="lazy" /></motion.figure>
        <div className="soc-caption">TRIAGE → INVESTIGATE → RESPOND</div>
      </div>
    );
  }

  if (project.theme === 'waqttech') {
    return (
      <div className="project-cover waqt-cover">
        <div className="waqt-sun" aria-hidden="true" /><div className="waqt-word" aria-hidden="true">وقتك</div>
        <span className="waqt-label">SAUDI / ARABIC-FIRST / PRODUCT</span>
        <motion.figure className="waqt-screen waqt-screen-main" whileHover={windowMotion}><img src={images[0].src} alt={images[0].alt[language]} loading="lazy" /></motion.figure>
        <motion.figure className="waqt-screen waqt-screen-phone" whileHover={reduceMotion ? undefined : { y: -12, rotate: -1 }}><img src={images[2].src} alt={images[2].alt[language]} loading="lazy" /></motion.figure>
        <div className="waqt-tagline">خدمتك التقنية، في وقتك.</div>
      </div>
    );
  }

  if (project.theme === 'basira') {
    return (
      <div className="project-cover basira-cover">
        <span className="basira-word" aria-hidden="true">DATA</span><span className="basira-axis">RAW → PROFILE → CLEAN → MODEL</span>
        <div className="basira-bars" aria-hidden="true">{[38, 67, 49, 82, 58, 92, 72].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
        <motion.figure className="basira-screen basira-screen-main" whileHover={windowMotion}><img src={images[0].src} alt={images[0].alt[language]} loading="lazy" /></motion.figure>
        <motion.figure className="basira-screen basira-screen-model" whileHover={windowMotion}><img src={images[2].src} alt={images[2].alt[language]} loading="lazy" /></motion.figure>
        <div className="basira-mark">بصيرة<span>04</span></div>
      </div>
    );
  }

  return (
    <div className="project-cover bunya-cover">
      <div className="bunya-grid" aria-hidden="true" /><span className="bunya-coord">SYS / 05<br />14N — 15L</span>
      <span className="bunya-word" aria-hidden="true">BUNYA</span>
      <svg className="bunya-route" viewBox="0 0 1000 600" aria-hidden="true"><path d="M40 480 C180 480 160 120 330 120 S520 420 670 330 820 140 960 170" /><circle cx="40" cy="480" r="8" /><circle cx="330" cy="120" r="8" /><circle cx="670" cy="330" r="8" /><circle cx="960" cy="170" r="8" /></svg>
      <motion.figure className="bunya-screen bunya-screen-main" whileHover={windowMotion}><img src={images[0].src} alt={images[0].alt[language]} loading="lazy" /></motion.figure>
      <motion.figure className="bunya-screen bunya-screen-trace" whileHover={windowMotion}><img src={images[2].src} alt={images[2].alt[language]} loading="lazy" /></motion.figure>
      <div className="bunya-key">NETWORK · COMPUTE · APPLICATION · DATA · SUPPORT</div>
    </div>
  );
}

function WindowBar({ label }: { label: string }) {
  return <div className="window-bar"><i /><i /><i /><span>{label}</span></div>;
}
