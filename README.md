# KING e-Seva Services

A local React + TypeScript website with a navy-and-gold scroll story, preserved KING emblem, English/Telugu UI, 12 service categories, 99 service detail pages with document checklists, enquiry preparation, updates, legal pages and PWA support.

## Run

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

For the production preview, including pre-rendered pages and the service worker:

```sh
npm run build
npm test
npm run preview -- --port 5173
```

Open http://127.0.0.1:5173. The style tile is at `/style-tile`.

## Edit the site

| Content | File |
| --- | --- |
| Business phone, WhatsApp, email, domain | `public/business.json` |
| English and Telugu interface copy | `src/content/ui-copy.json` |
| Service descriptions, categories and official references | `src/data.ts` |
| Expanded service names, categories and checklist assignments | `src/service-catalogue.ts` |
| KING-supplied and general bilingual document checklists | `src/document-checklists.ts` |
| Verified opportunities and updates | `public/updates.json` |
| Typography, colours, layout and motion | `src/styles.css` |
| Page structures and interactions | `src/App.tsx` |
| Original supplied logo | `public/assets/king-lion-original.png` |

WhatsApp uses an international number, digits only, including the country code. Call numbers may include a leading `+`. Leave missing contact details empty; never use a made-up number. `siteUrl` must be the final HTTPS origin with no path. It enables canonical URLs and the sitemap when rebuilt. Local drafts stay `noindex` until this value is set.

Editing files does not publish them. Rebuild and deploy the resulting `dist` folder to your chosen static HTTPS host. The host must serve each route’s `index.html`, serve `404.html` with status 404 for unknown paths, and deliver `sw.js` with a revalidation-friendly cache policy. No site has been publicly deployed by this task.

## Updates

The supplied updates feed is intentionally empty. Add only verified entries with both language versions, following the `Update` interface in `src/types.ts`. Category values use the English keys in `updateCategories` in `src/data.ts`. `lastDate` may be `null`; use ISO dates and a direct HTTPS official source. Do not guess eligibility, fees or deadlines. Review existing entries periodically and remove expired or superseded notices.

The frontend currently reads `/updates.json`. Replace that read with your REST/CMS endpoint when ready, preserving the interface and runtime validation. No Supabase or Firebase account is configured or required for this frontend.

## Enquiries and documents

Every service page includes a document checklist. Eleven detailed checklist templates were supplied by KING, including conditional documents; other templates are clearly labelled general preparation suggestions. The service list combines the two money-transfer entries into one. SADAREM/UDID, PMEGP, RRB, OTR and bank-job pages were added from the supplied document lists. Existing routes remain available. The home page keeps six main cards and compact shortcuts for the six additional categories; the full directory has search and all 12 category filters.

Apply Online prepares a service-specific message. With a configured WhatsApp number, the user opens WhatsApp, reviews the message and sends it themselves. No message is sent automatically. Without a configured number, a dialog explains the missing destination and allows copying the enquiry. No identity documents, OTPs, passwords, payments or personal information are collected by this frontend.

Actual document transfer happens only after the business agrees the channel with the customer. There is no upload backend or false submission confirmation. Legal pages describe this limited frontend; the operator must supply the additional policy for any future document collection or processing.

## Media status

Latest revision: the user preferred the Friday 20:11 design. The original HTML/CSS/SVG hero is restored, with 25% less active desktop scrolling. Generated media is disabled in business.json; its files remain as an optional archived alternative. The following describes that alternative.

The user-supplied smartphone video is integrated as a scroll-controlled sequence: 180 optimized WebP frames from the 10-second clip. The original video and stills are preserved in `public/assets/generated`. Mobile, reduced motion and data saving use posters. The KING logo remains a separate original layer. Media references are in `public/business.json`, and media layout is in `src/media.css`. The monitor alternative remains a backup. Earlier Higgsfield requests failed on subscription requirements; the user subsequently supplied these external assets.

See `docs/production-notes.md` for the story, prompts, design decisions, measurements and limitations.

## Before a public launch

WhatsApp and calls are configured as +91 8501810250. Supply the final domain and verify business-specific content. Rebuild, test and deploy over HTTPS. Confirm device installation, offline behavior and production Lighthouse metrics on the final host. The local preview is functional; it is not yet a public service.
