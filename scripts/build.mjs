import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
await mkdir('dist', { recursive: true });
await cp('public', 'dist', {
  recursive: true,
  filter: path => !['public/a', 'public/images/nuevas/xlink17demo.zip'].some(p => resolve(p) === resolve(path))
});
console.log('Static website built in dist/');
