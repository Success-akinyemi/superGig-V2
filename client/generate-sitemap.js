import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/dashboard', changefreq: 'daily', priority: 0.9 },
  { url: '/login', changefreq: 'daily', priority: 0.7 },
  { url: '/register', changefreq: 'daily', priority: 0.7 },
];

const sitemapStream = new SitemapStream({ hostname: 'https://www.supergig.com.ng' });
const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));

sitemapStream.pipe(writeStream);

routes.forEach(route => sitemapStream.write(route));
sitemapStream.end();

streamToPromise(sitemapStream)
  .then(() => console.log('Sitemap generated successfully.'))
  .catch(console.error);
