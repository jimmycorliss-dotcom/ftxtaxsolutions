import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
await mkdir('dist', { recursive: true });
// Remove only files produced by earlier builds so retired downloads cannot linger.
for (const entry of await readdir('dist')) {
  const target = resolve('dist', entry);
  if (dirname(target) !== resolve('dist')) throw new Error('Invalid build path');
  await rm(target, { recursive: true, force: true });
}
await cp('public', 'dist', {
  recursive: true,
  filter: path => !['public/a', 'public/images/nuevas/xlink17demo.zip'].some(p => resolve(p) === resolve(path))
});
console.log('Static website built in dist/');
