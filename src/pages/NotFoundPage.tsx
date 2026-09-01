import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useSite } from '../components/SiteContext';

export function NotFoundPage() {
  const { t } = useSite();
  return (
    <main id="main-content" className="not-found">
      <SEO title="404 — Waleed Alharbi" description={t.notFound.body} />
      <span>404</span><h1>{t.notFound.title}</h1><p>{t.notFound.body}</p><Link className="primary-link" to="/">{t.notFound.back}</Link>
    </main>
  );
}
