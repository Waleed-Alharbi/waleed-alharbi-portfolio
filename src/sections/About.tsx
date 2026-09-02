import { FaLinkedinIn } from 'react-icons/fa';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { profile } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionDecor } from '../components/SectionDecor';

export function About() {
  const { language } = useSite();
  const t = content[language].about;
  const facts = [
    { label: t.nameLabel, value: t.name, language: language === 'en' ? 'en' : undefined },
    { label: t.locationLabel, value: t.location },
    { label: t.focusLabel, value: t.focus },
    { label: t.statusLabel, value: t.availability },
  ];

  return (
    <section className="about section-shell" id="about">
      <SectionDecor variant="about" />
      <Reveal><div className="section-index"><span>{t.index}</span><i /></div></Reveal>

      <div className="about-grid">
        <div className="about-copy">
          <Reveal className="about-heading-wrap" delay={0.06}>
            <p className="section-kicker">{t.kicker}</p>
            <h2><span>{t.headingA}</span><em>{t.headingB}</em></h2>
          </Reveal>
          <Reveal delay={0.12}><p className="about-lead">{t.body}</p></Reveal>
          <Reveal delay={0.18}><p className="about-description">{t.detail}</p></Reveal>
        </div>

        <Reveal className="about-profile-card" delay={0.14}>
          <aside aria-label={t.detailsLabel}>
            <dl className="about-facts">
              {facts.map((fact) => (
                <div className="about-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd lang={fact.language}>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="about-card-actions">
              <a className="about-card-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                <span>{t.linkedin}</span><i aria-hidden="true"><FaLinkedinIn focusable="false" /></i>
              </a>
              <a className="about-card-link" href={profile.cv} target="_blank" rel="noreferrer">
                <span>{t.cv}</span><i aria-hidden="true">PDF</i>
              </a>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
