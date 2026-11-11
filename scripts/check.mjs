import { readFile, stat } from 'node:fs/promises';
const pages = ['', 'banks/', 'contact-us/', 'reseller/', 'software/crosslink/', 'software/proseries/', 'software/online/', 'software/crosslink-video-gallery/', 'software/proseries-video-gallery/', 'support/'];
const hostedDownloads = new Set(['/downloads/Crosslink-demo.exe', '/downloads/EvalInstaller-Intuit.exe']);
let count = 0;
for (const page of pages) {
  const text = await readFile(`public/${page}index.html`, 'utf8');
  if (!text.includes('<base href="/"')) throw new Error(`Invalid base: ${page}`);
  for (const match of text.matchAll(/(?:src|href)=["'](\/[^"'#?]*)["']/g)) {
    const path = match[1];
    if (hostedDownloads.has(path) || path.startsWith('//') || path === '/index.php') continue;
    const target = `public${path}${path.endsWith('/') ? 'index.html' : ''}`;
    await stat(target).catch(() => { throw new Error(`Missing asset in ${page}: ${path}`); });
    count++;
  }
}
console.log(`Validated ${pages.length} pages and ${count} local references.`);
