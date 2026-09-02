import { content } from '../i18n/content';
import { useSite } from '../context/SiteContext';
import { Reveal } from '../components/Reveal';
import { SectionDecor } from '../components/SectionDecor';

const rows = [
  ['PYTHON', 'REACT', 'FASTAPI', 'SQL', 'LINUX', 'DOCKER', 'GIT', 'REST APIs'],
  ['SOFTWARE', 'DATA & AI', 'CYBERSECURITY', 'IT OPERATIONS', 'CLOUD', 'INFRASTRUCTURE'],
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const repeated = [...items, ...items];
  return <div className={`marquee-row ${reverse ? 'reverse' : ''}`}><div className="marquee-track" lang="en" dir="ltr">{repeated.map((item, index) => <span key={`${item}-${index}`}>{item}<i aria-hidden="true">✦</i></span>)}</div></div>;
}

export function Skills() {
  const { language } = useSite();
  const t = content[language].skills;
  return (
    <section className="skills" id="skills">
      <SectionDecor variant="skills" />
      <div className="skills-head section-shell">
        <Reveal className="skills-index"><div className="section-index"><span>{t.index}</span><i /></div></Reveal>
        <Reveal className="skills-title" delay={0.06}><h2>{t.heading}</h2></Reveal>
        <Reveal className="skills-note" delay={0.12}><p>{t.note}</p></Reveal>
      </div>
      <Reveal delay={0.18}>
        <div className="marquee-stage" aria-label={language === 'en' ? 'Technical skills' : 'المهارات التقنية'}>
          <MarqueeRow items={rows[0]} />
          <MarqueeRow items={rows[1]} reverse />
        </div>
      </Reveal>
      <Reveal delay={0.24}><div className="skill-foot section-shell" lang="en" dir="ltr"><span>BUILD / TEST / LEARN / REFINE</span><span>2026</span></div></Reveal>
    </section>
  );
}
