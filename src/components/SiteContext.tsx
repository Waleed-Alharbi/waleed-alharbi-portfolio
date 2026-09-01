import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Language, type Translation } from '../i18n/translations';

type Theme = 'light' | 'dark';

type SiteContextValue = {
  language: Language;
  theme: Theme;
  t: Translation;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const initialLanguage = (): Language => document.documentElement.lang === 'ar' ? 'ar' : 'en';
const initialTheme = (): Theme => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export function SiteProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    const skipLink = document.querySelector<HTMLElement>('.skip-link');
    if (skipLink) skipLink.textContent = translations[language].skip;
    localStorage.setItem('wa-language', language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111311' : '#f2f0ea');
    localStorage.setItem('wa-theme', theme);
  }, [theme]);

  const value = useMemo<SiteContextValue>(() => ({
    language,
    theme,
    t: translations[language],
    toggleLanguage: () => setLanguage((current) => current === 'en' ? 'ar' : 'en'),
    toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
  }), [language, theme]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used inside SiteProvider');
  return context;
}
