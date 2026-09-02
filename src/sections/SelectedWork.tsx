import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { LuArrowUpRight, LuInfo, LuX } from 'react-icons/lu';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { projects, type PortfolioProject } from '../data/projects';
import { Reveal } from '../components/Reveal';
import { ProjectCover } from '../components/ProjectCover';
import { SectionDecor } from '../components/SectionDecor';

const workUi = {
  en: {
    github: 'GitHub',
    details: 'Details',
    openDetails: 'Open project details',
    close: 'Close project details',
    summary: 'Project summary',
    fullCaseStudy: 'View full case study',
    repository: 'Open GitHub repository',
  },
  ar: {
    github: 'GitHub',
    details: 'التفاصيل',
    openDetails: 'فتح تفاصيل المشروع',
    close: 'إغلاق تفاصيل المشروع',
    summary: 'ملخص المشروع',
    fullCaseStudy: 'عرض صفحة المشروع كاملة',
    repository: 'فتح مستودع GitHub',
  },
} as const;

type ProjectActionProps = {
  project: PortfolioProject;
  compact?: boolean;
  onDetails: (project: PortfolioProject, trigger: HTMLButtonElement) => void;
};

function ProjectActions({ project, compact = false, onDetails }: ProjectActionProps) {
  const { language } = useSite();
  const ui = workUi[language];
  const title = project.title[language];

  return (
    <div className={`project-actions${compact ? ' compact-project-actions' : ''}`}>
      <a
        className="project-action project-github-link"
        href={project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`${ui.repository}: ${title}`}
      >
        <FaGithub aria-hidden="true" focusable="false" />
        <span>{ui.github}</span>
      </a>
      <button
        className="project-action project-details-button"
        type="button"
        aria-haspopup="dialog"
        aria-controls="project-details-dialog"
        aria-label={`${ui.openDetails}: ${title}`}
        onClick={(event) => onDetails(project, event.currentTarget)}
      >
        <LuInfo aria-hidden="true" focusable="false" />
        <span>{ui.details}</span>
      </button>
    </div>
  );
}

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
  onDetails: ProjectActionProps['onDetails'];
};

function FeaturedProject({ project, index, onDetails }: ProjectCardProps) {
  const { language } = useSite();
  const t = content[language].work;
  const projectRef = useRef<HTMLElement>(null);
  const isInView = useInView(projectRef, { amount: 0.28 });
  const reduceMotion = useReducedMotion();
  const stagger = index * 0.08;

  return (
    <article ref={projectRef} className={`featured-project project-feature project-${project.theme} ${isInView && !reduceMotion ? 'is-in-view' : ''}`}>
      <Reveal delay={stagger}><div className="project-topline"><span>{project.number}</span><span>{project.category[language]}</span><span>{t.liveLabel}</span></div></Reveal>
      <div className="project-heading">
        <Reveal delay={stagger + 0.06}><h3>{project.title[language]}</h3></Reveal>
        <Reveal delay={stagger + 0.12}><p>{project.summary[language]}</p></Reveal>
      </div>
      <Reveal className="project-preview-reveal" delay={stagger + 0.18}>
        <div className="project-preview">
          <ProjectCover project={project} />
        </div>
      </Reveal>
      <Reveal className="project-footer" delay={stagger + 0.24}>
        <ul lang="en" dir="ltr">{project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
        <ProjectActions project={project} onDetails={onDetails} />
      </Reveal>
    </article>
  );
}

function CompactProject({ project, index, onDetails }: ProjectCardProps) {
  const { language } = useSite();
  const projectRef = useRef<HTMLElement>(null);
  const isInView = useInView(projectRef, { amount: 0.34 });
  const reduceMotion = useReducedMotion();
  const image = project.images[0];

  return (
    <article ref={projectRef} className={`compact-project project-feature project-${project.theme} ${isInView && !reduceMotion ? 'is-in-view' : ''}`}>
      <Reveal className="compact-project-reveal" delay={index * 0.06}>
        <div className="compact-project-link">
          <span className="compact-project-number" aria-hidden="true">{project.number}</span>
          <figure className="compact-project-image">
            <img src={image.src} alt={image.alt[language]} loading="lazy" decoding="async" />
          </figure>
          <div className="compact-project-copy">
            <div className="compact-project-meta">
              <span>{project.category[language]}</span>
              <span lang="en" dir="ltr">{project.stack[0]}</span>
            </div>
            <h4>{project.title[language]}</h4>
            <p>{project.summary[language]}</p>
          </div>
          <ProjectActions project={project} compact onDetails={onDetails} />
        </div>
      </Reveal>
    </article>
  );
}

type ProjectDetailsDialogProps = {
  project: PortfolioProject | null;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onRequestClose: () => void;
};

function ProjectDetailsDialog({ project, dialogRef, closeButtonRef, onClose, onRequestClose }: ProjectDetailsDialogProps) {
  const { language } = useSite();
  const ui = workUi[language];
  const titleId = project ? `project-dialog-title-${project.slug}` : undefined;
  const summaryId = project ? `project-dialog-summary-${project.slug}` : undefined;

  return (
    <dialog
      className="project-dialog"
      id="project-details-dialog"
      ref={dialogRef}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      lang={language}
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onRequestClose();
      }}
    >
      {project && (
        <div className="project-dialog-panel">
          <header className="project-dialog-header">
            <div className="project-dialog-icon" aria-hidden="true">
              <LuInfo focusable="false" />
              <span lang="en" dir="ltr">{project.number}</span>
            </div>
            <div className="project-dialog-heading">
              <p className="project-dialog-eyebrow">{project.category[language]}</p>
              <h3 className="project-dialog-title" id={titleId}>{project.title[language]}</h3>
            </div>
            <button
              className="project-dialog-close"
              type="button"
              ref={closeButtonRef}
              aria-label={ui.close}
              onClick={onRequestClose}
            >
              <LuX aria-hidden="true" focusable="false" />
            </button>
          </header>

          <div className="project-dialog-summary" id={summaryId}>
            <span>{ui.summary}</span>
            <p>{project.overview[language]}</p>
          </div>

          <ul className="project-dialog-stack" lang="en" dir="ltr" aria-label="Technology stack">
            {project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
          </ul>

          <div className="project-dialog-actions">
            <a
              className="project-dialog-link project-dialog-github"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub aria-hidden="true" focusable="false" />
              <span>{ui.repository}</span>
            </a>
            <Link className="project-dialog-link project-dialog-case" to={`/work/${project.slug}`} onClick={onRequestClose}>
              <span>{ui.fullCaseStudy}</span>
              <LuArrowUpRight aria-hidden="true" focusable="false" />
            </Link>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function SelectedWork() {
  const { language } = useSite();
  const t = content[language].work;
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const featuredProjects = projects.filter((project) => project.slug === 'soc' || project.slug === 'basira');
  const compactProjects = projects.filter((project) => project.slug === 'helpdesk' || project.slug === 'waqttech' || project.slug === 'bunya');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeProject || !dialog || dialog.open) return;

    dialog.showModal();
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  }, [activeProject]);

  const openDetails = (project: PortfolioProject, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveProject(project);
  };

  const requestClose = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
  };

  const handleClose = () => {
    setActiveProject(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section className="selected-work" id="work">
      <SectionDecor variant="work" />
      <div className="work-intro section-shell">
        <Reveal><div className="section-index light-index"><span>{t.index}</span><i /></div></Reveal>
        <Reveal delay={0.06}><h2>{t.heading.split('\n').map((line) => <span key={line}>{line}</span>)}</h2></Reveal>
        <Reveal className="work-intro-note" delay={0.12}><span>05</span><p>{language === 'en' ? 'Selected digital products, presented as systems rather than thumbnails.' : 'منتجات رقمية مختارة، تُعرض كأنظمة متكاملة لا كصور مصغرة.'}</p></Reveal>
      </div>

      <div className="featured-work-grid section-shell">
        {featuredProjects.map((project, index) => <FeaturedProject project={project} index={index} onDetails={openDetails} key={project.slug} />)}
      </div>

      <div className="compact-work section-shell" aria-labelledby="compact-work-title">
        <Reveal className="compact-work-heading" delay={0.06}>
          <span>03—05</span>
          <h3 id="compact-work-title">{language === 'en' ? 'More selected work' : 'أعمال مختارة أخرى'}</h3>
        </Reveal>
        <div className="compact-work-list">
          {compactProjects.map((project, index) => <CompactProject project={project} index={index} onDetails={openDetails} key={project.slug} />)}
        </div>
      </div>

      <ProjectDetailsDialog
        project={activeProject}
        dialogRef={dialogRef}
        closeButtonRef={closeButtonRef}
        onClose={handleClose}
        onRequestClose={requestClose}
      />
    </section>
  );
}
