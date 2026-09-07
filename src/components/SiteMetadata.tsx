import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { projectBySlug } from '../data/projects';

const SITE_URL = 'https://waleedalharbi.me';

const homeCopy = {
  en: {
    title: 'Waleed Alharbi | Information Technology Portfolio',
    description: 'Information Technology graduate building practical solutions across software, data, AI, cybersecurity, cloud and IT operations.',
  },
  ar: {
    title: 'وليد الحربي | معرض أعمال تقنية المعلومات',
    description: 'خريج تقنية معلومات يبني حلولًا عملية في البرمجيات والبيانات والذكاء الاصطناعي والأمن السيبراني والسحابة وعمليات تقنية المعلومات.',
  },
} as const;

function updateMeta(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function SiteMetadata() {
  const { language, theme } = useSite();
  const location = useLocation();

  useEffect(() => {
    const slug = location.pathname.match(/^\/work\/([^/]+)$/)?.[1];
    const project = projectBySlug(slug);
    const home = homeCopy[language];
    const title = project ? `${project.title[language]} | Waleed Alharbi` : home.title;
    const description = project ? project.summary[language] : home.description;
    const canonicalUrl = new URL(location.pathname, SITE_URL).toString();
    const socialImage = new URL('/social-preview.jpg', SITE_URL).toString();

    document.title = title;
    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[name="theme-color"]', 'name', 'theme-color', theme === 'dark' ? '#070b0f' : '#b7bdbc');
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', project ? 'article' : 'website');
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', socialImage);
    updateMeta('meta[property="og:locale"]', 'property', 'og:locale', language === 'ar' ? 'ar_SA' : 'en_US');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [language, location.pathname, theme]);

  return null;
}
