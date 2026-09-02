import { useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { SelectedWork } from '../sections/SelectedWork';
import { Skills } from '../sections/Skills';
import { Contact } from '../sections/Contact';

export function HomePage() {
  useEffect(() => {
    if (!window.location.hash) return;
    const timer = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <SelectedWork />
      <Skills />
      <Contact />
    </main>
  );
}
