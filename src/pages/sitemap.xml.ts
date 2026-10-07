// Sitemap generated at build time from the blog collection, so articles published by
// agifid-content-watch (weekly) are listed on the next deploy without touching this file.
// Excluded on purpose: thank-you pages (noindex) and /keystatic (admin).
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const SITE = 'https://agifid.be';

// FR/EN pairs that really are translations of each other -> hreflang alternates.
const PAIRS: [string, string][] = [
  ['/', '/index-en.html'],
  ['/actualites.html', '/actualites-en.html'],
];
const SINGLES = ['/a-propos.html'];

const url = (loc: string, lastmod?: string, alt?: [string, string]) => {
  const alternates = alt
    ? [
        `<xhtml:link rel="alternate" hreflang="fr" href="${SITE}${alt[0]}"/>`,
        `<xhtml:link rel="alternate" hreflang="en" href="${SITE}${alt[1]}"/>`,
      ].join('')
    : '';
  return `<url><loc>${SITE}${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${alternates}</url>`;
};

export async function GET() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const posts = (await reader.collections.blog.all())
    .filter((p) => p.entry.published)
    .sort((a, b) => (a.entry.date < b.entry.date ? 1 : -1));
  const latest = posts[0]?.entry.date;

  const entries = [
    ...PAIRS.flatMap((pair) => pair.map((loc) => url(loc, loc.includes('actualites') ? latest : undefined, pair))),
    ...SINGLES.map((loc) => url(loc)),
    ...posts.map((p) => url(`/actualites/${p.slug}.html`, p.entry.date)),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') +
    `\n</urlset>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
