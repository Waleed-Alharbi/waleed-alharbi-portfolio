import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { SiteProvider } from './components/SiteContext';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const target = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <RouteEffects />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
