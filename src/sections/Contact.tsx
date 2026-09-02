import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuFileText, LuMail } from 'react-icons/lu';
import { content } from '../i18n/content';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { SectionDecor } from '../components/SectionDecor';

export function Contact() {
  const { language } = useSite();
  const t = content[language].contact;
  const footer = content[language].footer;
  const links = [
    {
      label: t.email,
      value: language === 'en' ? 'Send a message' : 'إرسال رسالة',
      href: `mailto:${profile.email}`,
      icon: LuMail,
      external: false,
    },
    { label: t.github, value: '@Waleed-Alharbi', href: profile.github, icon: FaGithub, external: true },
    { label: t.linkedin, value: 'Waleed Alharbi', href: profile.linkedin, icon: FaLinkedinIn, external: true },
    { label: t.cv, value: 'PDF / 2026', href: profile.cv, icon: LuFileText, external: true },
  ];

  return (
    <section className="contact" id="contact">
      <SectionDecor variant="contact" />
      <div className="contact-top section-shell">
        <Reveal><div className="section-index light-index"><span>{t.index}</span><i /></div></Reveal>
        <Reveal delay={0.06}><div className="contact-availability"><i />{t.available}</div></Reveal>
        <Reveal delay={0.12}><h2>
          {[t.lineA, t.lineB, t.lineC].map((line, index) => (
            <span key={line} className={index === 2 ? 'contact-serif' : ''}><i>{line}</i></span>
          ))}
        </h2></Reveal>
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
                aria-label={link.label}
              >
                <span>0{index + 1} / {link.label}</span>
                <strong lang={index === 0 && language === 'ar' ? 'ar' : 'en'}>
                  <Icon className="contact-link-icon" aria-hidden="true" focusable="false" />
                  <span className="contact-link-value">{link.value}</span>
                </strong>
                <i aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</i>
              </a>
            </Reveal>
          );
        })}
      </div>
      <Reveal><footer className="footer section-shell"><span>{footer.rights}</span><a href="#top">{footer.top} ↑</a><span>AL-QASSIM / SAUDI ARABIA</span></footer></Reveal>
    </section>
  );
}
