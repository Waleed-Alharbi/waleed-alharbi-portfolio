import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { projectBySlug, projects } from '../data/projects';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  const { language } = useSite();
  const t = content[language].caseStudy;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project, language]);

  if (!project) return <Navigate to="/" replace />;
  const current = projects.indexOf(project);
  const next = projects[(current + 1) % projects.length];

  return (
    <main className={`case-study case-${project.theme}`} id="main">
      <section className="case-hero">
        <Link className="case-back" to="/#work">{language === 'ar' ? '→' : '←'} {t.back}</Link>
        <div className="case-meta"><span>{project.number} / 05</span><span>{project.category[language]}</span><span>2026</span></div>
        <h1><motion.span initial={reduceMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, .3, 1] }}>{project.title[language]}</motion.span></h1>
        <div className="case-hero-bottom"><p>{project.summary[language]}</p><a href={project.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" focusable="false" />{t.openGithub}<span aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</span></a></div>
        <span className="case-giant-number" aria-hidden="true">{project.number}</span>
      </section>
      <motion.figure className="case-lead-image" initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.1, delay: .35, ease: [0.16, 1, .3, 1] }}>
        <img src={project.images[0].src} alt={project.images[0].alt[language]} />
      </motion.figure>
      <section className="case-overview case-shell"><span className="case-label">01 / {t.overview}</span><p>{project.overview[language]}</p><aside>{project.signal[language]}</aside></section>
      <section className="case-two-up case-shell">
        <article><span className="case-label">02 / {t.challenge}</span><p>{project.challenge[language]}</p></article>
        <article><span className="case-label">03 / {t.solution}</span><p>{project.solution[language]}</p></article>
      </section>
      <section className="case-gallery case-shell">
        <div className="case-gallery-title"><span className="case-label">04 / {t.interface}</span><strong>UI / 02—03</strong></div>
        {project.images.slice(1).map((image, index) => <motion.figure key={image.src} className={`gallery-image gallery-image-${index + 1}`} initial={reduceMotion ? false : { y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .9 }}><img src={image.src} alt={image.alt[language]} loading="lazy" decoding="async" /><figcaption>0{index + 2} / {project.shortTitle[language]}</figcaption></motion.figure>)}
      </section>
      <section className="case-lists case-shell">
        <article><span className="case-label">05 / {t.built}</span><ol>{project.built[language].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></article>
        <article><span className="case-label">06 / {t.decisions}</span><ol>{project.decisions[language].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></article>
      </section>
      <section className="case-stack case-shell"><span className="case-label">07 / {t.stack}</span><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div><p>{t.portfolioNote}</p></section>
      <Link className="next-project" to={`/work/${next.slug}`}><span>{t.next} / {next.number}</span><strong>{next.shortTitle[language]}</strong><i>{language === 'ar' ? '←' : '→'}</i></Link>
    </main>
  );
}
