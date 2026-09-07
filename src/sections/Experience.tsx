import university from '../assets/personal/qassim-university.jpg';
import qassimUniversityLogoDark from '../assets/personal/qassim-university-logo-dark.webp';
import qassimUniversityLogoLight from '../assets/personal/qassim-university-logo-light.webp';
import smartMethods from '../assets/personal/smart-methods-training.webp';
import smartMethodsLogoDark from '../assets/personal/smart-methods-logo-dark.webp';
import smartMethodsLogoLight from '../assets/personal/smart-methods-logo-light.webp';
import hackathonFirstPlace from '../assets/personal/hackathon-first-place.jpg';
import hackathonFirstPlace720 from '../assets/personal/hackathon-first-place-720.webp';
import hackathonFirstPlace1080 from '../assets/personal/hackathon-first-place-1080.webp';
import graduationProject from '../assets/personal/solar-energy-project-cover.webp';
import { useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { LuExpand, LuInfo, LuSunMedium, LuX } from 'react-icons/lu';
import { Reveal } from '../components/Reveal';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { profile } from '../data/profile';
import { SectionDecor } from '../components/SectionDecor';

type TimelineItem = {
  number: string;
  period: string;
  dateTime: string;
  organization: string;
  title: string;
  note: string;
  mark: string;
  markImage?: {
    light: string;
    dark: string;
  };
  image?: string;
  srcSet?: string;
  alt?: string;
  symbolLabel?: string;
  expandable?: boolean;
  mediaFit?: 'cover' | 'contain';
  githubUrl?: string;
  showDetails?: boolean;
  id?: string;
};

export function Experience() {
  const { language, theme } = useSite();
  const t = content[language].experience;
  const work = content[language].work;
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement>(null);
  const projectDialogRef = useRef<HTMLDialogElement>(null);
  const projectDialogTriggerRef = useRef<HTMLButtonElement>(null);
  const timeline: TimelineItem[] = [
    {
      number: '01',
      period: t.universityPeriod,
      dateTime: '2021',
      organization: t.university,
      title: t.degree,
      note: t.universityNote,
      mark: 'QU',
      markImage: {
        light: qassimUniversityLogoLight,
        dark: qassimUniversityLogoDark,
      },
      image: university,
      alt: t.universityAlt,
    },
    {
      number: '02',
      period: t.dates,
      dateTime: '2025-06',
      organization: t.smart,
      title: t.training,
      note: t.smartNote,
      mark: 'SM',
      markImage: {
        light: smartMethodsLogoLight,
        dark: smartMethodsLogoDark,
      },
      image: smartMethods,
      alt: t.smartAlt,
    },
    {
      number: '03',
      period: t.graduationPeriod,
      dateTime: '2025',
      organization: t.graduation,
      title: t.solar,
      note: t.graduationNote,
      mark: '</>',
      image: graduationProject,
      alt: t.projectBannerAlt,
      mediaFit: 'contain',
      githubUrl: 'https://github.com/Waleed-Alharbi/solar-energy-forecasting-system.git',
      showDetails: true,
    },
    {
      number: '04',
      period: t.hackathonPeriod,
      dateTime: '2026',
      organization: t.hackathon,
      title: `${t.place} · ${t.wahaj}`,
      note: t.hackathonNote,
      mark: '01',
      image: hackathonFirstPlace,
      srcSet: `${hackathonFirstPlace720} 720w, ${hackathonFirstPlace1080} 1080w`,
      alt: t.hackathonAlt,
      expandable: true,
      id: 'hackathon',
    },
    {
      number: '05',
      period: t.personalProjectsPeriod,
      dateTime: '2026',
      organization: t.personalProjectsOrganization,
      title: t.personalProjects,
      note: t.personalProjectsNote,
      mark: '</>',
      symbolLabel: t.personalProjects,
      githubUrl: profile.github,
    },
  ];

  return (
    <section className="experience section-shell" id="experience">
      <SectionDecor variant="experience" />
      <Reveal><div className="section-index"><span>{t.index}</span><i /></div></Reveal>
      <div className="experience-intro">
        <Reveal delay={0.06}><h2><span>{t.headingA}</span><em>{t.headingB}</em></h2></Reveal>
        <Reveal delay={0.12}><p>{t.intro}</p></Reveal>
      </div>

      <ol className="journey-list">
        {timeline.map((item, index) => (
          <li className="journey-item" key={item.number}>
            <Reveal delay={index * 0.06}>
              <article className="journey-row" id={item.id}>
                <div className="journey-timeline-meta">
                  <span className="journey-marker" aria-hidden="true" />
                  <time dateTime={item.dateTime}>{item.period}</time>
                </div>

                <div className={`journey-card${item.showDetails ? ' journey-card-project' : ''}`}>
                  <span
                    className={`journey-card-mark${item.markImage ? ' journey-card-mark-logo' : ''}`}
                    aria-hidden={item.markImage ? undefined : true}
                    lang="en"
                    dir="ltr"
                  >
                    {item.markImage ? (
                      <img
                        src={theme === 'dark' ? item.markImage.dark : item.markImage.light}
                        alt={language === 'ar' ? `شعار ${item.organization}` : `${item.organization} logo`}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : item.mark}
                  </span>
                  <div className="journey-card-copy">
                    <p className="journey-organization">{item.organization}</p>
                    <h3 className="journey-title">{item.title}</h3>
                    <p className="journey-note">{item.note}</p>
                    {item.githubUrl && (
                      <div className="journey-project-actions project-actions">
                        <a
                          className="project-action project-github-link"
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${work.github}: ${item.title}`}
                        >
                          <FaGithub aria-hidden="true" focusable="false" />
                          <span>{work.github}</span>
                        </a>
                        {item.showDetails && (
                          <button
                            className="project-action project-details-button"
                            type="button"
                            ref={projectDialogTriggerRef}
                            aria-haspopup="dialog"
                            aria-controls="graduation-project-dialog"
                            aria-label={`${work.details}: ${item.title}`}
                            onClick={() => projectDialogRef.current?.showModal()}
                          >
                            <LuInfo aria-hidden="true" focusable="false" />
                            <span>{work.details}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {item.image ? (
                    <figure className={`journey-card-media${item.expandable ? ' journey-card-media-expandable' : ''}${item.mediaFit === 'contain' ? ' journey-card-media-contain' : ''}${item.showDetails ? ' journey-card-media-project' : ''}`}>
                      {item.expandable ? (
                        <button
                          className="journey-media-button"
                          type="button"
                          ref={lightboxTriggerRef}
                          aria-label={t.enlargeHackathon}
                          onClick={() => lightboxRef.current?.showModal()}
                        >
                          <picture>
                            <source srcSet={item.srcSet} sizes="(max-width: 640px) 100vw, 250px" type="image/webp" />
                            <img src={item.image} alt={item.alt ?? ''} loading="lazy" decoding="async" />
                          </picture>
                          <span className="journey-media-expand-icon" aria-hidden="true"><LuExpand focusable="false" /></span>
                        </button>
                      ) : (
                        <img src={item.image} alt={item.alt ?? ''} loading="lazy" decoding="async" />
                      )}
                    </figure>
                  ) : (
                    <div className="journey-card-media journey-card-symbol" role="img" aria-label={item.symbolLabel}>
                      <span aria-hidden="true" lang="en" dir="ltr">{'</>'}</span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <dialog
        className="award-lightbox"
        ref={lightboxRef}
        aria-label={t.hackathonAlt}
        onClick={(event) => {
          if (event.target === event.currentTarget) lightboxRef.current?.close();
        }}
        onClose={() => lightboxTriggerRef.current?.focus()}
      >
        <div className="award-lightbox-panel">
          <button className="award-lightbox-close" type="button" aria-label={t.closeImage} onClick={() => lightboxRef.current?.close()}>
            <LuX aria-hidden="true" focusable="false" />
          </button>
          <picture>
            <source srcSet={`${hackathonFirstPlace720} 720w, ${hackathonFirstPlace1080} 1080w`} sizes="min(92vw, 1080px)" type="image/webp" />
            <img src={hackathonFirstPlace} alt={t.hackathonAlt} decoding="async" />
          </picture>
        </div>
      </dialog>

      <dialog
        className="project-dialog journey-project-dialog"
        id="graduation-project-dialog"
        ref={projectDialogRef}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        lang={language}
        aria-labelledby="graduation-project-dialog-title"
        aria-describedby="graduation-project-dialog-summary"
        onClick={(event) => {
          if (event.target === event.currentTarget) projectDialogRef.current?.close();
        }}
        onClose={() => projectDialogTriggerRef.current?.focus()}
      >
        <div className="project-dialog-panel">
          <header className="project-dialog-header">
            <div className="project-dialog-icon" aria-hidden="true"><LuSunMedium focusable="false" /><span>GP</span></div>
            <div className="project-dialog-heading">
              <p className="project-dialog-eyebrow">{t.graduationCategory}</p>
              <h3 className="project-dialog-title" id="graduation-project-dialog-title">{t.solar}</h3>
            </div>
            <button className="project-dialog-close" type="button" aria-label={work.close} onClick={() => projectDialogRef.current?.close()}>
              <LuX aria-hidden="true" focusable="false" />
            </button>
          </header>
          <div className="project-dialog-summary" id="graduation-project-dialog-summary">
            <span>{work.summaryLabel}</span>
            <p>{t.graduationOverview}</p>
          </div>
          <ul
            className="project-dialog-stack"
            lang="en"
            dir="ltr"
            aria-label={language === 'ar' ? 'التقنيات المستخدمة' : 'Technology stack'}
          >
            {['Python', 'TensorFlow', 'LSTM', 'GRU', 'CNN-LSTM'].map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="project-dialog-actions">
            <a className="project-dialog-link project-dialog-github" href="https://github.com/Waleed-Alharbi/solar-energy-forecasting-system.git" target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" focusable="false" /><span>{work.github}</span>
            </a>
          </div>
        </div>
      </dialog>
    </section>
  );
}
