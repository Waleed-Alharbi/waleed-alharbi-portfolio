import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowUpRight, Github, MapPin } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { TechnicalMark } from '../components/TechnicalMark';
import { useSite } from '../components/SiteContext';
import { projects } from '../data/projects';
import { profile, skillGroups } from '../data/profile';

function SectionHeading({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <Reveal className="section-heading">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}

function ProjectFeature({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { language, t } = useSite();
  const reduceMotion = useReducedMotion();
  const isArabic = language === 'ar';

  return (
    <Reveal
      as="article"
      className={`project-feature project-feature--${index + 1}`}
      style={{ '--project-accent': project.accent } as React.CSSProperties}
    >
      <div className="project-copy">
        <div className="project-meta">
          <span className="project-number">{project.number}</span>
          <span>{project.category[language]}</span>
        </div>
        <h3>{project.title[language]}</h3>
        <p>{project.homeSummary[language]}</p>
        <div className="stack-line" aria-label={language === 'ar' ? 'التقنيات المستخدمة' : 'Technology stack'}>
          {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="project-links">
          <Link className="text-link" to={`/work/${project.slug}`}>
            {t.work.caseStudy} {isArabic ? <ArrowUpRight className="rtl-arrow" aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
          </Link>
          <a className="text-link text-link--quiet" href={project.github} target="_blank" rel="noreferrer">
            {t.work.github} <Github aria-hidden="true" />
          </a>
        </div>
      </div>
      <Link className="project-visual" to={`/work/${project.slug}`} aria-label={`${t.work.caseStudy}: ${project.title[language]}`}>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.015 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <img src={project.images[0].src} alt={project.images[0].alt[language]} loading={index > 0 ? 'lazy' : 'eager'} />
          <span className="image-index">WA / {project.number}</span>
        </motion.div>
      </Link>
    </Reveal>
  );
}

export function HomePage() {
  const { t, language } = useSite();
  const location = useLocation();
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const heroY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 90]);
  const isArabic = language === 'ar';
  const captureMode = new URLSearchParams(location.search).get('capture');
  const captureWork = captureMode === 'work';

  return (
    <main id="main-content" className={captureWork ? 'capture-work' : captureMode === 'full' ? 'capture-full' : undefined}>
      <SEO
        title={language === 'ar' ? 'وليد الحربي — ملف أعمال تقنية المعلومات' : undefined}
        description={language === 'ar' ? 'ملف أعمال وليد الحربي، خريج تقنية معلومات يبني حلولًا عملية في البرمجيات والبيانات والذكاء الاصطناعي والأمن والعمليات والبنية التحتية.' : undefined}
      />
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <motion.div className="hero-copy" style={{ y: heroY }}>
          <motion.p className="hero-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="status-dot" />{t.hero.eyebrow}
          </motion.p>
          <h1>
            <motion.span initial={reduceMotion ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{t.hero.firstName}</motion.span>
            <motion.span initial={reduceMotion ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>{t.hero.lastName}</motion.span>
          </h1>
          <motion.div className="hero-summary" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.42 }}>
            <p className="hero-role">{t.hero.role}</p>
            <p>{t.hero.support}</p>
          </motion.div>
          <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.62 }}>
            <a className="primary-link" href="#work">{t.hero.work} {isArabic ? <ArrowDownLeft aria-hidden="true" /> : <ArrowDownRight aria-hidden="true" />}</a>
            <a className="text-link" href="#about">{t.hero.about}</a>
            <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Waleed Alharbi on GitHub"><Github aria-hidden="true" /></a>
          </motion.div>
        </motion.div>
        <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .28, ease: [0.22, 1, 0.36, 1] }}>
          <TechnicalMark />
        </motion.div>
        <a className="scroll-cue" href="#about"><span>{t.hero.scroll}</span><ArrowDown aria-hidden="true" /></a>
      </section>

      <section className="profile-strip" aria-label={language === 'ar' ? 'ملخص الملف الشخصي' : 'Profile summary'}>
        <div className="page-shell">
          {t.profile.map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</div>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="page-shell">
          <SectionHeading label={t.about.label} title={t.about.title} />
          <div className="about-layout">
            <Reveal className="about-lead"><p>{t.about.lead}</p></Reveal>
            <Reveal className="about-body" delay={.08}>
              <p>{t.about.body}</p>
              <p className="about-note"><span />{t.about.note}</p>
            </Reveal>
          </div>
          <Reveal className="discipline-map">
            {['Software Engineering', 'Data & AI', 'Cybersecurity', 'IT Operations', 'Systems & Cloud'].map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="page-shell">
          <SectionHeading label={t.experience.label} title={t.experience.title} />
          <div className="experience-layout">
            <Reveal className="education-block">
              <p className="block-kicker">{t.experience.education}</p>
              <div className="education-year">IT</div>
              <h3>{t.experience.university}</h3>
              <p>{t.experience.degree}</p>
              <div className="gpa-line"><span>{t.experience.gpa}</span><strong>{profile.gpa}</strong></div>
            </Reveal>
            <Reveal className="training-block" delay={.08}>
              <p className="block-kicker">{t.experience.training}</p>
              <h3>{profile.training.organization}</h3>
              <div className="training-facts">
                <strong>{t.experience.hours}</strong>
                <span><MapPin aria-hidden="true" />{t.experience.place}</span>
              </div>
              <div className="training-flow">
                {t.experience.flow.map((step, index) => (
                  <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < t.experience.flow.length - 1 && <i aria-hidden="true" />}</div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="page-shell">
          <SectionHeading label={t.work.label} title={t.work.title} intro={t.work.intro} />
          <div className="project-list">
            {projects.map((project, index) => <ProjectFeature key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section className="achievement-section" id="achievement">
        <div className="page-shell">
          <Reveal className="achievement-top"><p className="section-label">{t.achievement.label}</p><span>{t.achievement.number}</span></Reveal>
          <Reveal className="achievement-display">
            <p>{t.achievement.place}</p>
            <h2>{t.achievement.event}</h2>
            <div><span>{t.achievement.project}</span><p>{t.achievement.text}</p></div>
          </Reveal>
        </div>
      </section>

      <section className="section graduation-section" id="graduation-project">
        <div className="page-shell">
          <SectionHeading label={t.graduation.label} title={t.graduation.title} intro={t.graduation.intro} />
          <Reveal className="research-flow">
            {t.graduation.steps.map((step, index) => (
              <div className="research-step" key={step.kicker}>
                <div className="research-node"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <p>{step.kicker}</p>
                <strong dir={index === 0 || index === 2 || index === 3 ? 'ltr' : undefined}>{step.value}</strong>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="page-shell">
          <SectionHeading label={t.skills.label} title={t.skills.title} intro={t.skills.intro} />
          <div className="skills-table">
            {skillGroups.map((group, groupIndex) => (
              <Reveal className="skill-group" key={group.key} delay={groupIndex * .04}>
                <h3><span>{String(groupIndex + 1).padStart(2, '0')}</span>{t.skills.groups[group.key]}</h3>
                <div>
                  {group.skills.map((skill) => (
                    <article key={skill.name}>
                      <strong dir="ltr">{skill.name}</strong>
                      <p><span>{t.skills.usedIn}</span>{skill.projects.join(' · ')}</p>
                    </article>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="page-shell">
          <Reveal>
            <p className="section-label">{t.contact.label}</p>
            <h2>{t.contact.title}</h2>
            <p className="contact-copy">{t.contact.body}</p>
            <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
              {t.contact.github} <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
          <footer className="contact-meta"><span>{t.contact.location}</span><span>{t.footer}</span><span>© 2026 Waleed Alharbi</span></footer>
        </div>
      </section>
    </main>
  );
}
