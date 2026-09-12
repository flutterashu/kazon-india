import fs from 'fs';
import path from 'path';
import { PRODUCTS } from '../src/data/products';
import { CATEGORIES, SITE_URL } from '../src/utils/seo';

export function buildSitemapXml(): string {
  const currentDate = new Date().toISOString().split('T')[0];

  interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: string;
  }

  const urls: SitemapUrl[] = [
    // 1. Core Landing
    {
      loc: `${SITE_URL}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0',
    },
    // 2. Main Product Catalog
    {
      loc: `${SITE_URL}/products`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
    },
  ];

  // 3. Category Pages (Higher priority)
  CATEGORIES.forEach((cat) => {
    urls.push({
      loc: `${SITE_URL}/category/${cat.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });

  // 4. Individual Product Pages (Higher priority)
  PRODUCTS.forEach((prod) => {
    urls.push({
      loc: `${SITE_URL}/products/${prod.id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.80',
    });
  });

  // 5. Technical, Regulatory & Engineering Pages
  urls.push(
    {
      loc: `${SITE_URL}/materials`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      loc: `${SITE_URL}/manufacturing`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      loc: `${SITE_URL}/regulatory`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      loc: `${SITE_URL}/anatomy`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.70',
    },
    {
      loc: `${SITE_URL}/request-quote`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.70',
    },
    {
      loc: `${SITE_URL}/ask-engineer`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.70',
    },
    // 6. About & Contact Pages (Lower priority vs product/category)
    {
      loc: `${SITE_URL}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.60',
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.60',
    }
  );

  const xmlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>`;
}

// Generate to public/sitemap.xml
const sitemap = buildSitemapXml();
const publicPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemap, 'utf-8');
console.log(`Successfully generated sitemap.xml to ${publicPath}`);
