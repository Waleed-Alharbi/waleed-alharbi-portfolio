import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaJava, FaMicrochip } from 'react-icons/fa';
import {
  SiAnaconda,
  SiC,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiLinux,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPostman,
  SiPython,
  SiPytorch,
  SiRaspberrypi,
  SiReact,
  SiScikitlearn,
  SiSqlite,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { content } from '../i18n/content';
import { useSite } from '../context/SiteContext';
import { Reveal } from '../components/Reveal';
import { SectionDecor } from '../components/SectionDecor';

type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

type SkillCategory = {
  key: 'languages' | 'ai' | 'webMobile' | 'tools';
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    key: 'languages',
    skills: [
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'Java', icon: FaJava, color: '#e76f00' },
      { name: 'C', icon: SiC, color: '#5c6bc0' },
      { name: 'C++', icon: SiCplusplus, color: '#00599c' },
      { name: 'Dart', icon: SiDart, color: '#0175c2' },
      { name: 'JavaScript', icon: SiJavascript, color: '#9d8200' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Assembly', icon: FaMicrochip, color: '#7a6544' },
    ],
  },
  {
    key: 'ai',
    skills: [
      { name: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
      { name: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00' },
      { name: 'OpenCV', icon: SiOpencv, color: '#5c3ee8' },
      { name: 'scikit-learn', icon: SiScikitlearn, color: '#f7931e' },
      { name: 'NumPy', icon: SiNumpy, color: '#4d77cf' },
      { name: 'Pandas', icon: SiPandas, color: '#5f4690' },
      { name: 'Jupyter', icon: SiJupyter, color: '#f37626' },
      { name: 'Anaconda', icon: SiAnaconda, color: '#2b9d49' },
    ],
  },
  {
    key: 'webMobile',
    skills: [
      { name: 'React', icon: SiReact, color: '#087ea4' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569b' },
      { name: 'Django', icon: SiDjango, color: '#176b4b' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, color: '#1572b6' },
      { name: 'SQLite', icon: SiSqlite, color: '#0f80aa' },
      { name: 'Firebase', icon: SiFirebase, color: '#d88700' },
    ],
  },
  {
    key: 'tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#6e7781' },
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'Linux', icon: SiLinux, color: '#111827' },
      { name: 'Raspberry Pi', icon: SiRaspberrypi, color: '#c51a4a' },
      { name: 'VS Code', icon: VscCode, color: '#007acc' },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
      { name: 'Figma', icon: SiFigma, color: '#a259ff' },
    ],
  },
];

function SkillLane({ label, skills, reverse = false, speed }: { label: string; skills: Skill[]; reverse?: boolean; speed: 'fast' | 'medium' | 'slow' }) {
  const seamlessGroup = [...skills, ...skills];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={`skill-category skill-speed-${speed}${isPaused ? ' is-paused' : ''}`}>
      <div className="skill-category-label"><span>{label}</span><i aria-hidden="true" /></div>
      <div className={`marquee-row ${reverse ? 'reverse' : ''}`} aria-label={label}>
        <div className="marquee-track" lang="en" dir="ltr">
          {[0, 1].map((groupIndex) => (
            <div
              className="marquee-group"
              role={groupIndex === 0 ? 'list' : 'presentation'}
              aria-hidden={groupIndex === 1 || undefined}
              key={groupIndex}
            >
              {seamlessGroup.map((skill, index) => {
                const Icon = skill.icon;
                const duplicate = groupIndex === 1 || index >= skills.length;
                return (
                  <span
                    className="skill-chip"
                    role={duplicate ? undefined : 'listitem'}
                    aria-hidden={duplicate || undefined}
                    onPointerEnter={() => setIsPaused(true)}
                    onPointerLeave={() => setIsPaused(false)}
                    key={`${groupIndex}-${skill.name}-${index}`}
                  >
                    <Icon
                      className="skill-icon"
                      data-skill-icon={skill.name}
                      aria-hidden="true"
                      focusable="false"
                      style={{ color: skill.color }}
                    />
                    <b>{skill.name}</b>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
        <div className="marquee-stage" aria-label={language === 'en' ? 'Technical skills by category' : 'المهارات التقنية حسب التصنيف'}>
          {skillCategories.map((category, index) => (
            <SkillLane
              key={category.key}
              label={t.categories[category.key]}
              skills={category.skills}
              reverse={index % 2 === 1}
              speed={index === 0 ? 'fast' : index === 3 ? 'slow' : 'medium'}
            />
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.24}><div className="skill-foot section-shell" lang="en" dir="ltr"><span>BUILD / TEST / LEARN / REFINE</span><span>2026</span></div></Reveal>
    </section>
  );
}
