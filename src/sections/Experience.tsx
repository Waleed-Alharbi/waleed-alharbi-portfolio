import university from '../assets/personal/qassim-university.jpg';
import smartMethods from '../assets/personal/smart-methods.jpg';
import hackathon from '../assets/personal/hackathon-award.png';
import hackathon850 from '../assets/personal/hackathon-award-850.webp';
import hackathon1150 from '../assets/personal/hackathon-award-1150.webp';
import { Reveal } from '../components/Reveal';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { SectionDecor } from '../components/SectionDecor';

type TimelineItem = {
  number: string;
  period: string;
  dateTime: string;
  organization: string;
  title: string;
  note: string;
  mark: string;
  image?: string;
  srcSet?: string;
  alt?: string;
  symbolLabel?: string;
  id?: string;
};

export function Experience() {
  const { language } = useSite();
  const t = content[language].experience;
  const timeline: TimelineItem[] = [
    {
      number: '01',
      period: t.universityPeriod,
      dateTime: '2021',
      organization: t.university,
      title: t.degree,
      note: t.universityNote,
      mark: 'QU',
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
      image: smartMethods,
      alt: t.smartAlt,
    },
    {
      number: '03',
      period: t.hackathonPeriod,
      dateTime: '2026',
      organization: t.hackathon,
      title: `${t.place} · ${t.wahaj}`,
      note: t.hackathonNote,
      mark: '01',
      image: hackathon,
      srcSet: `${hackathon850} 850w, ${hackathon1150} 1150w`,
      alt: t.hackathonAlt,
      id: 'hackathon',
    },
    {
      number: '04',
      period: t.graduationPeriod,
      dateTime: '2025',
      organization: t.graduation,
      title: t.solar,
      note: t.graduationNote,
      mark: '</>',
      symbolLabel: t.projectIconAlt,
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

                <div className="journey-card">
                  <span className="journey-card-mark" aria-hidden="true" lang="en" dir="ltr">{item.mark}</span>
                  <div className="journey-card-copy">
                    <p className="journey-organization">{item.organization}</p>
                    <h3 className="journey-title">{item.title}</h3>
                    <p className="journey-note">{item.note}</p>
                  </div>

                  {item.image ? (
                    <figure className="journey-card-media">
                      {item.srcSet ? (
                        <picture>
                          <source srcSet={item.srcSet} sizes="(max-width: 640px) 100vw, 250px" type="image/webp" />
                          <img src={item.image} alt={item.alt ?? ''} loading="lazy" decoding="async" />
                        </picture>
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
    </section>
  );
}
