import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuFileDown, LuLightbulb, LuMail } from 'react-icons/lu';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { content } from '../i18n/content';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionDecor } from '../components/SectionDecor';
import { useDataSaver } from '../hooks/useDataSaver';

export function Contact() {
  const { language } = useSite();
  const finaleRef = useRef<HTMLDivElement>(null);
  const finaleVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const saveData = useDataSaver();
  const t = content[language].contact;
  const footer = content[language].footer;
  const ideaSubject = encodeURIComponent(language === 'ar' ? 'فكرة مشروع جديدة' : 'New project idea');
  const links = [
    {
      label: 'Email',
      ariaLabel: t.email,
      href: `mailto:${profile.email}`,
      icon: LuMail,
      external: false,
    },
    { label: 'GitHub', ariaLabel: t.github, href: profile.github, icon: FaGithub, external: true },
    { label: 'LinkedIn', ariaLabel: t.linkedin, href: profile.linkedin, icon: FaLinkedinIn, external: true },
    { label: 'CV', ariaLabel: t.cv, href: profile.cv, icon: LuFileDown, external: true },
  ];

  useEffect(() => {
    const container = finaleRef.current;
    const video = finaleVideoRef.current;
    if (!container || !video || reduceMotion || saveData) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [reduceMotion, saveData]);

  return (
    <section className="contact" id="contact">
      <SectionDecor variant="contact" />
      <div className="contact-top section-shell">
        <Reveal><div className="section-index light-index"><span>{t.index}</span><i /></div></Reveal>
        <Reveal delay={0.06}><h2>
          {[t.lineA, t.lineB, t.lineC].map((line, index) => (
            <span key={line} className={index === 2 ? 'contact-serif' : ''}><i>{line}</i></span>
          ))}
        </h2></Reveal>
        <Reveal delay={0.12}>
          <a className="contact-idea" href={`mailto:${profile.email}?subject=${ideaSubject}`}>
            <LuLightbulb aria-hidden="true" focusable="false" />
            <span>{t.idea}</span>
          </a>
        </Reveal>
      </div>
      <div className="contact-links section-shell">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Reveal key={link.label} delay={index * 0.06}>
              <a
                className={`contact-link contact-link-${index + 1}`}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                aria-label={link.ariaLabel}
              >
                <strong lang="en" dir="ltr" style={{ alignSelf: 'center', marginBlock: 0 }}>
                  <Icon className="contact-link-icon" aria-hidden="true" focusable="false" />
                  <span className="contact-link-value">{link.label}</span>
                </strong>
                <i aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</i>
              </a>
            </Reveal>
          );
        })}
      </div>
      <div ref={finaleRef} className="contact-video-finale" aria-hidden="true">
        <video ref={finaleVideoRef} muted loop playsInline preload="none" poster="/images/hero-poster.webp" tabIndex={-1}>
          {!reduceMotion && !saveData && <source src="/videos/hero-space.mp4" type="video/mp4" />}
        </video>
      </div>
      <Reveal>
        <footer className="footer section-shell">
          <span>{footer.rights}</span>
          <span className="footer-availability"><i aria-hidden="true" />{footer.available}</span>
          <a href="#top">{footer.top} ↑</a>
        </footer>
      </Reveal>
    </section>
  );
}
