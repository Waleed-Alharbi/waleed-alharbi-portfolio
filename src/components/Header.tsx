import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSite } from './SiteContext';

const navKeys = ['home', 'about', 'experience', 'work', 'skills', 'contact'] as const;

export function Header() {
  const { t, language, theme, toggleLanguage, toggleTheme } = useSite();
  const [open, setOpen] = useState(() => new URLSearchParams(window.location.search).get('menu') === 'open');
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const firstRoute = useRef(true);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('menu') === 'open') return;
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Waleed Alharbi home">
          <span className="brand-mark">WA</span>
          <span className="brand-text">Waleed Alharbi</span>
        </Link>
        <nav className="desktop-nav" aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}>
          {navKeys.map((key) => (
            <button key={key} type="button" onClick={() => goTo(key)}>{t.nav[key]}</button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="text-control" type="button" onClick={toggleLanguage} aria-label={t.controls.language}>
            {language === 'en' ? 'ع' : 'EN'}
          </button>
          <button className="icon-control" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.controls.themeLight : t.controls.themeDark}>
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <button className="menu-control" type="button" onClick={() => setOpen(true)} aria-label={t.controls.menu} aria-expanded={open}>
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="mobile-menu" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
            <motion.div className="mobile-menu-inner" initial={reduceMotion ? false : { y: -24 }} animate={{ y: 0 }} exit={reduceMotion ? { y: 0 } : { y: -24 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: reduceMotion ? 0 : 0.45 }}>
              <div className="mobile-menu-top">
                <span>WA / 2026</span>
                <button className="icon-control" type="button" onClick={() => setOpen(false)} aria-label={t.controls.close}><X aria-hidden="true" /></button>
              </div>
              <nav aria-label={language === 'ar' ? 'التنقل عبر الجوال' : 'Mobile navigation'}>
                {navKeys.map((key, index) => (
                  <button key={key} type="button" onClick={() => goTo(key)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>{t.nav[key]}
                  </button>
                ))}
              </nav>
              <div className="mobile-menu-bottom">
                <a href="https://github.com/Waleed-Alharbi" target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
                <div>
                  <button type="button" onClick={toggleLanguage}>{language === 'en' ? 'العربية' : 'English'}</button>
                  <button type="button" onClick={toggleTheme}>{theme === 'dark' ? t.controls.themeLight : t.controls.themeDark}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
