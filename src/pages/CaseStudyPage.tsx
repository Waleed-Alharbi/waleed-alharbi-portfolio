import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { useSite } from '../components/SiteContext';
import { projectBySlug, projects } from '../data/projects';

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  const { language, t } = useSite();
  if (!project) return <Navigate to="/404" replace />;

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <main id="main-content" className="case-study" style={{ '--project-accent': project.accent } as React.CSSProperties}>
      <SEO title={`${project.title[language]} — Waleed Alharbi`} description={project.homeSummary[language]} />
      <section className="case-hero">
        <div className="page-shell">
          <Link className="back-link" to="/#work"><BackIcon aria-hidden="true" />{t.case.back}</Link>
          <div className="case-hero-grid">
            <Reveal className="case-heading">
              <div className="project-meta"><span>{project.number}</span><span>{t.case.selectedWork}</span></div>
              <p className="case-category">{project.category[language]}</p>
              <h1>{project.title[language]}</h1>
            </Reveal>
            <Reveal className="case-overview" delay={.08}>
              <p className="block-kicker">{t.case.overview}</p>
              <p>{project.overview[language]}</p>
              <a className="text-link" href={project.github} target="_blank" rel="noreferrer">{t.case.repository}<ArrowUpRight aria-hidden="true" /></a>
            </Reveal>
          </div>
          <Reveal className="case-cover">
            <img src={project.images[0].src} alt={project.images[0].alt[language]} />
            <span>WA / CASE {project.number}</span>
          </Reveal>
        </div>
      </section>

      <section className="case-section case-narrative">
        <div className="page-shell two-column-copy">
          <Reveal><p className="block-kicker">{t.case.context}</p><h2>{project.context[language]}</h2></Reveal>
          <Reveal delay={.08}><p className="block-kicker">{t.case.solution}</p><p>{project.solution[language]}</p></Reveal>
        </div>
      </section>

      <section className="case-section case-built">
        <div className="page-shell">
          <Reveal className="case-section-heading"><p className="section-label">{t.case.built}</p><h2>{project.title[language]}</h2></Reveal>
          <div className="built-grid">
            {project.built[language].map((item, index) => (
              <Reveal as="article" key={item} delay={index * .04}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section workflow-section">
        <div className="page-shell">
          <Reveal className="case-section-heading"><p className="section-label">{t.case.workflow}</p><h2>{project.features[language][0]}</h2></Reveal>
          <Reveal className="case-workflow" dir="ltr">
            {project.workflow.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>)}
          </Reveal>
          <div className="feature-stack-grid">
            <Reveal>
              <h3>{t.case.features}</h3>
              <ul>{project.features[language].map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </Reveal>
            <Reveal delay={.08}>
              <h3>{t.case.stack}</h3>
              <div className="case-stack" dir="ltr">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="case-section gallery-section">
        <div className="page-shell">
          <Reveal className="case-section-heading"><p className="section-label">{t.case.gallery}</p><h2>{project.category[language]}</h2></Reveal>
          <div className="case-gallery">
            {project.images.slice(1).map((image, index) => (
              <Reveal as="figure" key={image.src} delay={index * .08}><img src={image.src} alt={image.alt[language]} loading="lazy" /><figcaption>{String(index + 2).padStart(2, '0')} / {image.alt[language]}</figcaption></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section decisions-section">
        <div className="page-shell decisions-grid">
          <Reveal><p className="section-label">{t.case.decisions}</p><h2>{t.case.demonstrates}</h2><p className="demonstrates">{project.demonstrates[language]}</p></Reveal>
          <div>
            {project.decisions[language].map((decision, index) => <Reveal as="article" key={decision} delay={index * .05}><span>{String(index + 1).padStart(2, '0')}</span><p>{decision}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="next-project">
        <Link to={`/work/${nextProject.slug}`}>
          <span>{t.case.next}</span>
          <strong>{nextProject.title[language]}</strong>
          {language === 'ar' ? <ArrowLeft aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </Link>
      </section>
    </main>
  );
}
