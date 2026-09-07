import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { content } from '../i18n/content';
import { profile } from '../data/profile';

const sectionIds = ['about', 'experience', 'work', 'skills', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

export function Header() {
  const { language, theme, toggleLanguage, toggleTheme } = useSite();
  const t = content[language];
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);
  const keepVisibleUntil = useRef(0);
  const links = sectionIds.map((id) => [id, t.nav[id]] as const);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateHeader = () => {
      const nextScrollY = window.scrollY;
      const delta = nextScrollY - lastScrollY.current;
      const marker = Math.min(window.innerHeight * 0.38, 360);
      const current = sectionIds.find((id) => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds ? bounds.top <= marker && bounds.bottom > marker : false;
      }) ?? null;

      setActiveSection((value) => value === current ? value : current);
      setHidden((value) => {
        if (open || nextScrollY < 120 || performance.now() < keepVisibleUntil.current) return false;
        if (delta > 12) return true;
        if (delta < -8) return false;
        return value;
      });

      lastScrollY.current = nextScrollY;
      scrollFrame.current = null;
    };

    const handleScroll = () => {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, [open]);

  return (
    <header className="site-header">
      <motion.div
        className="header-bar"
        initial={false}
        animate={{ y: hidden && !open ? '-145%' : '0%', opacity: hidden && !open ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="monogram header-home-mark" href="/#top" aria-label={language === 'en' ? 'Waleed Alharbi — home' : 'وليد الحربي — الرئيسية'}>
          <span>W</span><span>A</span>
        </a>

        <nav className="desktop-nav" aria-label={language === 'en' ? 'Primary navigation' : 'التنقل الرئيسي'}>
          <a
            className="nav-monogram"
            href="/#top"
            aria-label={language === 'en' ? 'Waleed Alharbi — home' : 'وليد الحربي — الرئيسية'}
            aria-current={activeSection === null ? 'location' : undefined}
            onClick={() => {
              keepVisibleUntil.current = performance.now() + 900;
              setActiveSection(null);
              setHidden(false);
            }}
          >
            <span>W</span><span>A</span>
          </a>
          <span className="nav-divider" aria-hidden="true" />
          <motion.a
            className="nav-home"
            href="/#top"
            aria-current={activeSection === null ? 'location' : undefined}
            onClick={() => {
              keepVisibleUntil.current = performance.now() + 900;
              setActiveSection(null);
              setHidden(false);
            }}
          >
            {activeSection === null && (
              <motion.span
                className="nav-active-indicator"
                layoutId="desktop-navigation-active"
                transition={reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 470, damping: 38 }}
              />
            )}
            <span className="nav-label">{t.nav.home}</span>
          </motion.a>
          {links.map(([id, label]) => (
            <motion.a
              key={id}
              href={`/#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => {
                keepVisibleUntil.current = performance.now() + 900;
                setActiveSection(id);
                setHidden(false);
              }}
            >
              {activeSection === id && (
                <motion.span
                  className="nav-active-indicator"
                  layoutId="desktop-navigation-active"
                  transition={reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 470, damping: 38 }}
                />
              )}
              <span className="nav-label">{label}</span>
            </motion.a>
          ))}
          <span className="nav-divider" aria-hidden="true" />
          <a className="nav-contact-cta" href="/#contact">
            <span className="nav-cta-label">{t.hero.contact}</span>
            <span className="nav-cta-arrow" aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</span>
          </a>
        </nav>

        <div className="header-actions">
          <div className="header-utilities" role="group" aria-label={language === 'en' ? 'Display preferences' : 'خيارات العرض'}>
            <button className="header-control language-toggle" type="button" onClick={toggleLanguage} aria-label={language === 'en' ? 'عرض الموقع بالعربية' : 'View the site in English'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={language} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>
                  {language === 'ar' ? 'EN' : 'ع'}
                </motion.span>
              </AnimatePresence>
            </button>
            <button className="header-control icon-button" type="button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Use dark theme' : 'Use light theme'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.svg key={theme} viewBox="0 0 24 24" aria-hidden="true" initial={{ opacity: 0, rotate: -24 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 24 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
                  {theme === 'light' ? <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.4 8.4 0 1 0 20.2 15.1Z" /> : <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
                </motion.svg>
              </AnimatePresence>
            </button>
          </div>
          <a className="cv-nav" href={profile.cv} target="_blank" rel="noreferrer">CV <span aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</span></a>
          <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu">
            <span className="menu-label">{open ? t.nav.close : t.nav.menu}</span><span aria-hidden="true">{open ? '×' : '＋'}</span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" className="mobile-nav" aria-label={language === 'en' ? 'Mobile navigation' : 'قائمة التنقل'} initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mobile-nav-index">WA / 2026</div>
            {links.map(([id, label], index) => (
              <a className={activeSection === id ? 'active' : ''} key={id} href={`/#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setOpen(false)}><sup>0{index + 1}</sup>{label}<span aria-hidden="true">{language === 'ar' ? '↖' : '↗'}</span></a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
