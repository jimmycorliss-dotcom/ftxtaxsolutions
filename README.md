# FTX Tax Solutions

Faithful static mirror of https://ftxtaxsolutions.com/, including ten public pages, the original styles, JavaScript, images, navigation and galleries.

Live website: https://ftxtaxsolutions-ch4.pages.dev/

Repository: https://github.com/jimmycorliss-dotcom/ftxtaxsolutions

Cloudflare Pages is connected to this repository. Every push to `main` automatically validates, builds, and publishes production. Other branches receive preview deployments.

## Local preview

Run `python -m http.server 4173 --directory public` and open http://localhost:4173/.

## Validate and build

Run `node scripts/check.mjs`, then `node scripts/build.mjs`. No dependencies are required. The output is `dist/`.

## Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages, use `main` as the production branch, set the build command to `node scripts/check.mjs && node scripts/build.mjs`, and set the output directory to `dist`. Enable automatic production deployments; each push to main then publishes a new version. Other branches can generate previews.

The `functions/` folder contains a narrowly scoped proxy for the existing Joomla demo request form. Form submissions are forwarded to the original site's backend; no form data is stored by this copy. End-to-end delivery depends on that backend and has not been tested by submitting personal data.

Download buttons serve the owner-supplied, Intuit-signed evaluation installer through a GitHub release. The executable is 28,526,056 bytes, above the 25 MiB Cloudflare Pages asset limit. Both legacy demo archives have been removed from the current site. Their legacy URLs redirect to the new installer. Embedded videos, Google Fonts, Font Awesome CDN, partner links, and the demo form service remain external dependencies. The original Joomla administration and database are not included.

Original content, branding, and asset rights remain with their respective owners.
