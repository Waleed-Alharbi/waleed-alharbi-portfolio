import { useEffect } from 'react';

type SEOProps = {
  title?: string;
  description?: string;
};

const defaultTitle = 'Waleed Alharbi — Information Technology Portfolio';
const defaultDescription = 'The bilingual portfolio of Waleed Alharbi, an Information Technology graduate building practical software, data and AI, cybersecurity, IT operations, and infrastructure solutions.';

export function SEO({ title = defaultTitle, description = defaultDescription }: SEOProps) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [description, title]);

  return null;
}
