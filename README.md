# FTX Tax Solutions

Faithful static mirror of https://ftxtaxsolutions.com/, including nine public pages, the original styles, JavaScript, images, navigation and galleries.

Live website: https://ftxtaxsolutions-ch4.pages.dev/

Repository: https://github.com/jimmycorliss-dotcom/ftxtaxsolutions

Cloudflare Pages is connected to this repository. Every push to `main` automatically validates, builds, and publishes production. Other branches receive preview deployments.

## Local preview

Run `python -m http.server 4173 --directory public` and open http://localhost:4173/.

## Validate and build

Run `node scripts/check.mjs`, then `node scripts/build.mjs`. No dependencies are required. The output is `dist/`.

## Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages, use `main` as the production branch, set the build command to `node scripts/check.mjs && node scripts/build.mjs`, and set the output directory to `dist`. Enable automatic production deployments; each push to main then publishes a new version. Other branches can generate previews.

Crosslink and home download buttons serve Crosslink-demo.exe (451,178,864 bytes). ProSeries buttons serve EvalInstaller-Intuit.exe (28,526,056 bytes). Both installers are hosted as separate GitHub release assets to stay within the Cloudflare Pages asset limit. Download metadata and SHA-256 hashes are tracked in installer-crosslink.json and installer.json.

The demo form page and its server proxy have been removed. Legacy /download-demo/ and Crosslink ZIP URLs redirect directly to the Crosslink installer. Legacy ProSeries ZIP URLs redirect to the Intuit installer.

Original content, branding, and asset rights remain with their respective owners.
