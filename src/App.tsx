import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { IntroOverlay } from './components/IntroOverlay';
import { SiteMetadata } from './components/SiteMetadata';
import { HomePage } from './pages/HomePage';

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage').then(({ CaseStudyPage }) => ({ default: CaseStudyPage })));

export default function App() {
  return (
    <>
      <SiteMetadata />
      <IntroOverlay />
      <Header />
      <Suspense fallback={<main id="main" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}
