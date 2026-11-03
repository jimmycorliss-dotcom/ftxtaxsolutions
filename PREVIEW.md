# Modern FTX design preview

This redesign is isolated on the `modern-ftx-preview` branch. Cloudflare publishes it as a branch preview. Production remains on `main` and must not be replaced without the owner's explicit instruction.

The homepage introduces FTX services, support, and reseller opportunities before presenting software options. Installer downloads are on the individual product pages. The online software page links to the owner-provided demo request portal.

All preview pages use `noindex,nofollow` and display a design preview notice. Before an approved production release, review the copy, contact details, business hours, product features, and bank relationships with the owner, then remove the preview notice and search indexing restriction.

Checks: `node scripts/check.mjs`, `node --check public/assets/modern.js`, `node scripts/build.mjs`.
