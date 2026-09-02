import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

type SiteContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem('waleed-language') === 'ar' ? 'ar' : 'en',
  );
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('waleed-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    root.dataset.theme = theme;
    const skipLink = document.querySelector<HTMLAnchorElement>('.skip-link');
    if (skipLink) skipLink.textContent = language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content';
    localStorage.setItem('waleed-language', language);
    localStorage.setItem('waleed-theme', theme);
  }, [language, theme]);

  const value = useMemo(
    () => ({
      language,
      theme,
      setLanguage,
      toggleLanguage: () => setLanguage((value) => (value === 'en' ? 'ar' : 'en')),
      toggleTheme: () => setTheme((value) => (value === 'light' ? 'dark' : 'light')),
    }),
    [language, theme],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used inside SiteProvider');
  return context;
}
