# KING e-Seva Services — Complete Website Details

**Document date:** 7 October 2026  
**Project location:** `E:\ChatGPT Astra\king-e-seva`  
**Local preview:** http://127.0.0.1:5173/  
**Status:** Local website ready; public hosting and Gmail connection pending.

ఈ document website owner, developer, hosting team కోసం ప్రస్తుత implementation ఆధారంగా తయారు చేయబడింది. పాత briefs/production notesలో ఉన్న historical వివరాల కంటే ఈ status summary ప్రస్తుత స్థితిని వివరిస్తుంది. ఇది కొత్తగా అన్ని ప్రభుత్వ document rules ధృవీకరించిన report కాదు.

## 1. Website ఉద్దేశ్యం

KING e-Seva Services అందించే ప్రభుత్వ, వ్యాపార, పన్నులు, ఉద్యోగాలు, విద్య, బ్యాంకింగ్, ప్రయాణం వంటి సేవలను customers సులభంగా కనుగొని, అవసరమైన పత్రాలు తెలుసుకొని, KINGని WhatsApp లేదా call ద్వారా సంప్రదించడానికి website ఉపయోగపడుతుంది.

ఇది assistance/enquiry website. Government application submission portal, online bank, payment gateway లేదా document-upload portal కాదు. Websiteలో service ఉండటం వల్ల approval, loan sanction, booking availability లేదా ప్రభుత్వ అనుబంధం హామీ కాదు.

## 2. Business configuration

| Detail | Current value |
| --- | --- |
| Business name | KING e-Seva Services |
| Call number | +91 8501810250 |
| WhatsApp | 918501810250 |
| Location | Ghanpur (Station), Jangaon District, Telangana |
| Languages | English, Telugu |
| Business email | ఇంకా configure చేయలేదు |
| Opening hours | ఇంకా configure చేయలేదు |
| Privacy contact | ఇంకా configure చేయలేదు |
| Public domain / siteUrl | ఇంకా configure చేయలేదు |

Daily digest sender `eseva4u2020@gmail.com` అనేది import filter. అది business contact emailగా websiteలో configure చేయలేదు.

## 3. Design & branding

- Royal navy background, champagne gold accents, warm white text, cyan highlights.
- Brand palette: Midnight `#081725`, Royal navy `#10273D`, Champagne gold `#D8BB7D`, Warm white `#F4F1E9`, Active cyan `#43D8D5`.
- English font: Manrope; display accents: Georgia italic; Telugu: Noto Sans Telugu.
- Original KING lion logo preserved. Header logo పెద్దదిగా, KING boldగా, I పైన చిన్న crown అమర్చబడింది.
- User-approved original hero: lion emblem, CSS phone, floating service cards, network lines. Generated video/visual alternative ప్రస్తుతం disabled.
- Desktop hero height 250vh; active pinned scroll travel పాత designతో పోలిస్తే తగ్గించబడింది. Mobile hero unpinned.
- About / Human Support sectionలో supplied Mac reference image, keyboard/mouse ఉన్నాయి. Screenలో website homepage screenshot perspective-matched layerగా కనిపిస్తుంది; అది live interactive browser కాదు.
- Removed Telugu tagline తిరిగి చేర్చలేదు.
- Readability కోసం body text సాధారణంగా 16px, navigation 14px, buttons 15px; responsive typography styles ఉన్నాయి.
- WhatsApp actionsకు WhatsApp logo; ఇతర actionsకు సంబంధిత icons ఉన్నాయి.
- English/Telugu language choice browser localStorageలో నిల్వ ఉంటుంది.

## 4. Pages & navigation

| Route | Purpose |
| --- | --- |
| `/` | Homepage: cinematic hero, services, process, updates, about, assistance CTA |
| `/services` | Searchable service directory with 12 category filters |
| `/services/<slug>` | Individual service explanation, audience, document guidance, enquiry |
| `/updates` | Category filters, Current updates, Past deadlines |
| `/jobs` | Jobs-focused updates view |
| `/about` | Business introduction and Mac visual |
| `/contact` | WhatsApp, phone and location |
| `/apply` | Service selection and enquiry preparation |
| `/apply?service=<slug>` | Selected service enquiry |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/disclaimer` | Service and information disclaimer |
| `/style-tile` | Brand colours, type and components reference |
| Unknown route | 404 page |

Build report: **110 routes plus 404**, including **99 service pages**. Homepageలో compact service sections; పూర్తి catalogue directoryలో ఉంటుంది. Mobile quick actions, floating WhatsApp action, shared header/footer ఉన్నాయి.

## 5. Customer enquiry flow

1. Customer service search/category ద్వారా సరైన page ఎంచుకుంటారు.
2. Document groups తెరిచి requirements, alternatives, conditions చదువుతారు.
3. Apply / assistance action ద్వారా service-specific enquiry సిద్ధం చేస్తారు.
4. Configured WhatsApp numberకు message open అవుతుంది.
5. Customer message review చేసి స్వయంగా send చేస్తారు; website automaticగా message పంపదు.

Call link device phone applicationను తెరుస్తుంది. Backend application record, application tracking, CRM, payment confirmation, customer account ప్రస్తుతం లేవు. Identity documents, OTP, PIN, CVV, password లేదా payments ఈ frontendలో collect చేయదు.

## 6. Documents guidance

99 servicesకు explicit bilingual guides ఉన్నాయి. Identity proof, address proof, date-of-birth proof వంటి applicable groupsలో accepted alternatives, selection conditions ఇచ్చారు.

- Expandable dropdown/details groups; Expand all / Collapse all controls.
- **Any one:** listed documents అన్నీ కాదు, ఒక accepted option.
- **All applicable items:** వర్తించే items సిద్ధం చేయాలి.
- **If applicable:** సంబంధిత పరిస్థితి ఉన్నవారికే.
- **Prepare:** ముందస్తు సన్నాహక సూచనలు.
- Official guidance, application-dependent requirements, preparation suggestions వేరు labelsతో చూపిస్తాయి.
- KING supplied 11 detailed checklist templates conditional wordingతో preserve చేశారు: Food, Trade, Labour, GST, SADAREM/UDID, PMEGP, RRB, Scholarship, Building Permission, TSPSC/TGPSC OTR, Bank Jobs.
- Service-page official reference links defaultగా hidden. “Show official source links” checkbox tick చేస్తే కనిపిస్తాయి. ఇది UI hiding మాత్రమే; ఈ references public codeలో ఉంటాయి.
- Document guidance recorded review date: **21 September 2026**. ఈ documentation తయారీ తేదీ కొత్త rules verification తేదీ కాదు.

Broad job, loan, insurance, property, scholarship, scheme servicesకు selected notification/provider/application form ఆధారంగా అదనపు పత్రాలు ఉండవచ్చు. Current official form అవసరాలు precedence కలిగి ఉంటాయి. అన్ని customersకి universal exhaustive checklist అని claim చేయదు.

## 7. Updates system — current status

Frontend feed: `public/updates.json`. Content English/Teluguలో ఉంటుంది. Update card title, summary, category, eligibility, deadline, documents, document note, KING assistance చూపిస్తుంది.

**7 October 2026 నాటికి feedలో 3 approved notices ఉన్నాయి; అన్నింటి deadlines ముగిశాయి.** అందువల్ల Current updatesలో కనిపించవు; `/updates` → Past deadlinesలో కనిపిస్తాయి.

| Approved notice | Recorded deadline (IST) |
| --- | --- |
| SSC JE & Scientific Assistant 2026 | 22 September 2026, 11:00 PM |
| Hyderabad Basthi Dawakhana MO objections | 22 September 2026, 5:00 PM |
| Jangaon Ophthalmic Assistant | 25 September 2026, 5:00 PM |

ఇవి పాత notices reference మాత్రమే; applications ప్రస్తుతం open అని అర్థం కాదు. Original digestలో మిగతా 5 notices verification pending draftsగా ఉన్నాయి. Unverified అంటే false అని కాదు; publish చేయడానికి సరిపడే verification పూర్తి కాలేదు.

Customer update cards/feedలో official source URLs, application links, raw mail metadata export చేయరు. Source evidence private review filesలో మాత్రమే ఉంటుంది. ఇది service document source-checkbox featureకు వేరు policy.

## 8. Gmail daily updates integration

**Prepared, not connected.** Gmail authorization, daily trigger, cloud runner, hosting publish connection activate కాలేదు.

Configured sender: `eseva4u2020@gmail.com`  
Subject: `Daily State & Central Government Jobs, Schemes & Compliance Digest`

### API key లేకుండా సిద్ధం చేసిన option

`scripts/gmail-apps-script.gs` Google Apps Scriptలో ఉపయోగించడానికి సిద్ధంగా ఉంది. Owner Google accountలో run చేసి Google permissions authorize చేయాలి.

- `importKingDigest`: matched mails నుంచి private Drive draft JSON files తయారు చేస్తుంది.
- `enableDailyKingImport`: sample check తర్వాత daily morning trigger ఏర్పాటు చేయడానికి function.
- `disableDailyKingImport`: trigger తొలగించడానికి function.
- Password/API key scriptలో అవసరం లేదు; Gmail/Drive consent అవసరం.
- GmailApp broad Gmail permission కోరుతుంది; code sender/subject matched mail చదవడానికి రూపొందించబడింది.
- Email send చేయదు; attachments import/execute చేయదు.
- Drive draft files website feed కాదు; review/transformation/publish step ఇంకా అవసరం.

### Backend OAuth option

`scripts/sync-gmail.mjs` Gmail read-only OAuth option. Required environment variables:

- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`
- `GMAIL_UPDATE_SENDER`

Secrets server secret storeలో మాత్రమే ఉంచాలి; frontend, public folder, ZIP, chatలో పెట్టకూడదు. Previous seven days matched messages చదివి drafts save చేస్తుంది. Longer outage తర్వాత missed messages manually import చేయాలి లేదా query window మార్చాలి.

### Intended workflow

Mail → sender/subject filter → private draft → official verification → bilingual content/documents → approved status → public JSON export → build → deploy.

Sender match లేదా emailలో official link ఉండటం verification కాదు. Fully unattended verification/publishing ప్రస్తుతం implement చేయలేదు. Authenticated admin review dashboard కూడా లేదు.

## 9. Manual updates maintenance

Project directoryలో commands:

```powershell
node scripts/import-digest.mjs "C:\path\daily-mail.txt"
# Review private draft files and approve verified records.
node scripts/publish-updates.mjs
npm run build
npm test
```

Parser plain-text `[UPDATE n: title]` sections support చేస్తుంది. Identical sections duplicateగా overwrite కావు; changed sections కొత్త drafts కావచ్చు. HTML-only/unsupported mail format manual review అవసరం.

Approved recordకు bilingual title, summary, eligibility, documents/document note, valid dates/category, verification date, private HTTPS sources అవసరం. Export allowlisted public fields మాత్రమే రాస్తుంది; public stringsలో URLs reject చేస్తుంది. Export all approved private recordsతో feed replace చేస్తుంది. Existing approved records preserve చేయకుండా కొత్త datasetతో run చేయకూడదు.

`lastDate` ISO timestamp with timezone లేదా null. Date-only deadlines IST end-of-dayగా evaluate అవుతాయి. Past/current display browser clockపై ఆధారపడుతుంది. New build/deploymentతో published changes customersకు అందుతాయి.

## 10. Technology

| Component | Current project |
| --- | --- |
| UI | React 19 |
| Language | TypeScript 5.9 |
| Build / local server | Vite 6 |
| Icons | Lucide React + custom WhatsApp SVG |
| Rendering | Static prerender + client interactivity |
| Styling | CSS, responsive layouts, reduced-motion handling |
| Image tooling | Sharp |
| Data | TypeScript content + JSON files |
| Testing | Node test runner |
| Backend/database | Not configured; static frontend does not require one |
| PWA | Manifest, icons, service worker, offline support |

PWA support is implemented; production HTTPS, physical-device installation and offline behavior must be checked on the final host. No production Lighthouse result is claimed.

## 11. Important project files

| File/folder | What to edit / purpose |
| --- | --- |
| `public/business.json` | Contact, address, final domain, media configuration |
| `src/content/ui-copy.json` | English/Telugu interface text |
| `src/data.ts` | Core services, categories, route definitions |
| `src/service-catalogue.ts` | Expanded names, slugs, categories, legacy mappings |
| `src/document-guide.ts` | Per-service document groups, evidence references, review date |
| `src/document-checklists.ts` | KING supplied/additional preparation templates |
| `src/DocumentChecklist.tsx` | Document dropdowns and source checkbox |
| `src/App.tsx` | Page structures, navigation, updates, enquiry flow |
| `src/styles.css`, `readability.css`, `catalogue.css` | General design, readability, directory |
| `src/document-guide.css` | Document guidance styles |
| `src/MacDisplay.tsx`, `desktop.css` | Mac section and perspective screen |
| `src/FrameSequence.tsx`, `media.css` | Retained optional media sequence implementation |
| `public/assets/king-lion-original.png` | Preserved original logo |
| `public/assets/mac-reference.png` | Supplied Mac reference |
| `public/assets/website-home-screen.webp` | Screenshot displayed inside Mac |
| `public/updates.json` | Public approved update content |
| `private/updates/` | Private mail drafts, review evidence, approvals |
| `scripts/update-pipeline.mjs` | Parser and public-data projection |
| `scripts/import-digest.mjs` | Local mail import |
| `scripts/publish-updates.mjs` | Approved data export |
| `scripts/sync-gmail.mjs` | Optional OAuth reader |
| `scripts/gmail-apps-script.gs` | Optional Apps Script importer |
| `scripts/prerender.mjs` | Static pages and SEO output |
| `scripts/*.test.mjs` | Automated checks |
| `docs/gmail-updates.md` | Gmail setup and workflow details |
| `docs/document-guides.md` | Guidance scope and maintenance |
| `docs/production-notes.md` | Design history; includes outdated historical counts |
| `docs/build-report.json` | Last generated route/indexing report |
| `dist/` | Built deployment output; do not edit directly |

Generated media files remain as optional backups. Active `generatedMedia.poster`, `mobilePoster`, `manifest` are empty. Keep them empty to preserve the approved original hero. Replacing the homepage design does not automatically regenerate the screenshot inside the Mac.

## 12. Local development & preview

Node.js 22 or newer, npm and project files are needed.

```powershell
cd "E:\ChatGPT Astra\king-e-seva"
npm ci
npm run dev
```

Production-like preview:

```powershell
npm run build
npm test
npm run preview -- --port 5173
```

Open http://127.0.0.1:5173/. Current preview serves `dist`, so source edits need a fresh build to appear. Localhost works on this PC; it is not a public website address. If port 5173 is occupied, reuse the known preview process or choose another port. After a PC restart the preview server may need restarting. If old content persists after rebuilding, hard refresh and check service-worker cache in browser developer tools.

## 13. Public hosting requirements

1. Hosting account supporting static HTML and HTTPS.
2. Optional custom domain; a hosting-provided subdomain can be used initially.
3. Final HTTPS origin in `public/business.json` → `siteUrl`, with no path.
4. Verify business contact, location, policies and current service content.
5. Run build/tests, then deploy **dist only**.
6. Configure route directory `index.html` serving, real 404 responses and revalidation-friendly `sw.js` caching.
7. Verify page refreshes on nested routes, contact actions, mobile/Telugu layout, document panels, updates and PWA on the live host.

Never deploy the whole project root, `private`, credentials or raw mail. Generated backup media under public may be copied to dist even when not active; review unused assets before launch if size matters.

A final domain is not configured, so the current generated site remains noindex and canonical origin is unset. Rebuilding with final siteUrl enables appropriate canonical/sitemap output. Style tile and 404 remain non-indexed by design. Search-engine visibility is not guaranteed merely by deployment.

Gmail automation additionally needs authorized Google access and an always-on/cloud execution plus deployment path. A desktop-only job stops when the PC is off. Hosting selection and any fees are not finalized.

## 14. Validation & known limitations

- Last recorded successful build: 28 September 2026; 110 routes plus 404.
- Last recorded automated run: 18 tests passed. This document request does not represent a new test run.
- Checks cover catalogue uniqueness, bilingual document coverage, rendered document controls, route/assets, original logo preservation, active hero regression, PWA logic and update export isolation.
- Local homepage HTTP 200 verified on 7 October 2026.
- Latest full interactive browser verification was not completed because browser tooling failed; HTTP availability is not a visual QA result.
- Public deployment, real-device install and end-to-end Gmail publication are pending.
- No online payment, uploaded-document storage, login, CRM, authenticated admin dashboard or application-status backend.
- No guarantee of approvals, customer message delivery, current vacancies or booking availability.
- Existing README and production notes include historical statements such as an empty feed; use the current feed and this dated document for present status.

## 15. Owner maintenance checklist

- Update business settings when address, number, hours or domain changes.
- Review document guides when official requirements change; change review date only after evidence review.
- Verify notification dates, eligibility and documents before approving an update.
- Keep private review sources separate from public customer content.
- Build/test after content or code changes; back up source and private drafts separately.
- Deploy dist, verify live pages and monitor stale information.
- Keep dependencies and hosting access maintained; store secrets outside source/public files.

## 16. Deliverables

- Editable project: `E:\ChatGPT Astra\king-e-seva`
- Production build: `E:\ChatGPT Astra\king-e-seva\dist`
- Existing delivery ZIP: `E:\ChatGPT Astra\KING-e-Seva-website.zip` (28 September snapshot; this new document is separate until ZIP is rebuilt).
- This complete report: `E:\ChatGPT Astra\king-e-seva\docs\KING-e-Seva-Complete-Details.md`

## 17. Complete service catalogue

క్రింది catalogue current source నుంచి తీసుకోబడింది. ప్రతి serviceకు English/Telugu పేరు, detail route, document guidance ఉన్నాయి. పాత routes preserve చేయడం మరియు document-list services చేర్చడం వల్ల మొత్తం 99 ఉన్నాయి; duplicate money-transfer wording ఒక serviceగా merge అయింది.


### 1. Government Services — ప్రభుత్వ సేవలు (14)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Aadhaar Address Update | ఆధార్ చిరునామా అప్‌డేట్ | /services/aadhaar-assistance |
| Voter ID Card Application | ఓటరు కార్డు దరఖాస్తు | /services/voter-id |
| Voter ID Corrections | ఓటరు కార్డు సవరణలు | /services/voter-id-corrections |
| Passport Application | పాస్‌పోర్ట్ దరఖాస్తు | /services/passport |
| Passport Renewal | పాస్‌పోర్ట్ రెన్యూవల్ | /services/passport-renewal |
| PAN Card Application | పాన్ కార్డు దరఖాస్తు | /services/pan-card |
| PAN Card Update | పాన్ కార్డు అప్‌డేట్ | /services/pan-card-update |
| PAN Number Recovery | పాన్ నంబర్ రికవరీ | /services/pan-number-recovery |
| Ration Card Application | రేషన్ కార్డు దరఖాస్తు | /services/ration-card-application |
| Ration Card Name Addition | రేషన్ కార్డులో పేరు చేర్పు | /services/ration-card-name-addition |
| Life Certificate | లైఫ్ సర్టిఫికెట్ | /services/life-certificate |
| Driving License Services | డ్రైవింగ్ లైసెన్స్ సేవలు | /services/driving-licence |
| SADAREM / UDID | సదరం / యూడీఐడీ | /services/sadarem-udid |
| RTA Services | రవాణా శాఖ సేవలు | /services/rta-services |

### 2. Business Registrations — వ్యాపార నమోదులు (5)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Trade License | ట్రేడ్ లైసెన్స్ | /services/trade-licence |
| Labour License | లేబర్ లైసెన్స్ | /services/labour-licence |
| Food License | ఫుడ్ లైసెన్స్ | /services/food-license |
| UDYAM Application | ఉద్యమ్ దరఖాస్తు | /services/udyam |
| GST Registration | జీఎస్టీ నమోదు | /services/gst-registration |

### 3. Tax & Finance — పన్నులు & ఆర్థిక సేవలు (7)

| Service | తెలుగు | Route |
| --- | --- | --- |
| PF Claim | పీఎఫ్ క్లెయిమ్ | /services/pf-claim |
| PF e-KYC | పీఎఫ్ ఈ-కేవైసీ | /services/pf-e-kyc |
| PF e-Nomination | పీఎఫ్ ఈ-నామినేషన్ | /services/pf-e-nomination |
| GST Return Filing | జీఎస్టీ రిటర్న్ దాఖలు | /services/gst-return-filing |
| Income Tax Filing | ఆదాయపు పన్ను దాఖలు | /services/itr-filing |
| EPF Services | ఈపీఎఫ్ సేవలు | /services/epf-services |
| Tax-related Assistance | పన్ను సంబంధిత సహాయం | /services/tax-assistance |

### 4. Jobs & Applications — ఉద్యోగాలు & దరఖాస్తులు (8)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Government Job Applications | ప్రభుత్వ ఉద్యోగ దరఖాస్తులు | /services/government-jobs |
| RRB Job Applications | ఆర్ఆర్‌బీ ఉద్యోగ దరఖాస్తులు | /services/rrb-jobs |
| TSPSC / TGPSC OTR | టీఎస్‌పీఎస్‌సీ / టీజీపీఎస్‌సీ ఓటీఆర్ | /services/tspsc-otr |
| Bank Job Applications | బ్యాంకు ఉద్యోగ దరఖాస్తులు | /services/bank-jobs |
| Hall Tickets | హాల్ టికెట్లు | /services/hall-tickets |
| Results | ఫలితాలు | /services/results |
| Exam Applications | పరీక్ష దరఖాస్తులు | /services/exams |
| Recruitment Updates | నియామక సమాచారం | /services/recruitment-updates |

### 5. Education — విద్య (7)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Scholarship Renewal | స్కాలర్‌షిప్ రెన్యూవల్ | /services/scholarship-renewal |
| National Scholarship | జాతీయ స్కాలర్‌షిప్ | /services/national-scholarship |
| Pragati Scholarship | ప్రగతి స్కాలర్‌షిప్ | /services/pragati-scholarship |
| All Government & Private Scholarship Applications | ప్రభుత్వ & ప్రైవేట్ స్కాలర్‌షిప్ దరఖాస్తులు | /services/scholarships |
| Admissions | ప్రవేశాలు | /services/admissions |
| Counselling | కౌన్సెలింగ్ | /services/counselling |
| Entrance Applications | ప్రవేశ పరీక్ష దరఖాస్తులు | /services/entrance-applications |

### 6. Other Online Services — ఇతర ఆన్‌లైన్ సేవలు (1)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Online Applications | ఆన్‌లైన్ దరఖాస్తులు | /services/online-applications |

### 7. Land & Property — భూమి & ఆస్తి సేవలు (12)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Building Permission | భవన నిర్మాణ అనుమతి | /services/building-permission |
| House Tax Payment | ఇంటి పన్ను చెల్లింపు | /services/house-tax-payment |
| Mutation | మ్యుటేషన్ | /services/mutation |
| 1B | 1బీ | /services/1b |
| Pahani | పహాణి | /services/pahani |
| Patta Passbook Reprint | పట్టాదారు పాస్‌బుక్ రీప్రింట్ | /services/patta-passbook-reprint |
| Registration Slot Booking – Sale & Gift | రిజిస్ట్రేషన్ స్లాట్ బుకింగ్ — అమ్మకం & గిఫ్ట్ | /services/registration-slot-booking |
| Passbook Data Correction | పాస్‌బుక్ వివరాల సవరణ | /services/passbook-data-correction |
| Missing Survey Number | మిస్సింగ్ సర్వే నంబర్ | /services/missing-survey-number |
| DS Pending Application | డీఎస్ పెండింగ్ దరఖాస్తు | /services/ds-pending-application |
| Extent Correction | భూ విస్తీర్ణం సవరణ | /services/extent-correction |
| Survey Number Block / Unblock | సర్వే నంబర్ బ్లాక్ / అన్‌బ్లాక్ | /services/survey-number-block-unblock |

### 8. Government Schemes — ప్రభుత్వ పథకాలు (11)

| Service | తెలుగు | Route |
| --- | --- | --- |
| PM-KISAN | పీఎం కిసాన్ | /services/pm-kisan |
| PM-KISAN e-KYC | పీఎం కిసాన్ ఈ-కేవైసీ | /services/pm-kisan-e-kyc |
| PM-KISAN Update | పీఎం కిసాన్ అప్‌డేట్ | /services/pm-kisan-update |
| PM-KISAN New Application | పీఎం కిసాన్ కొత్త దరఖాస్తు | /services/pm-kisan-new-application |
| PM Vishwakarma | పీఎం విశ్వకర్మ | /services/pm-vishwakarma |
| Kalyana Lakshmi | కల్యాణ లక్ష్మి | /services/kalyana-lakshmi |
| Shaadi Mubarak | షాదీ ముబారక్ | /services/shaadi-mubarak |
| Ayushman Bharat | ఆయుష్మాన్ భారత్ | /services/ayushman-bharat |
| e-Shram Application | ఈ-శ్రమ్ దరఖాస్తు | /services/e-shram |
| NFDP | ఎన్‌ఎఫ్‌డీపీ | /services/nfdp |
| Government Schemes | ప్రభుత్వ పథకాలు | /services/government-schemes |

### 9. Banking & Payments — బ్యాంకింగ్ & చెల్లింపులు (10)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Loan EMI Payment | లోన్ ఈఎంఐ చెల్లింపు | /services/loan-emi-payment |
| LIC Premium Payment | ఎల్‌ఐసీ ప్రీమియం చెల్లింపు | /services/lic-premium-payment |
| Money Withdrawal from All Banks | అన్ని బ్యాంకుల నగదు విత్‌డ్రాయల్ | /services/bank-money-withdrawal |
| Money Transfer to Any Bank Account | ఏ బ్యాంకు ఖాతాకైనా నగదు బదిలీ | /services/money-transfer |
| PhonePe Services | ఫోన్‌పే సేవలు | /services/phonepe-services |
| Google Pay Services | గూగుల్ పే సేవలు | /services/google-pay-services |
| Money Withdrawal Using Credit Card | క్రెడిట్ కార్డుతో నగదు విత్‌డ్రాయల్ | /services/credit-card-cash-withdrawal |
| Bank Account Opening | బ్యాంకు ఖాతా ప్రారంభం | /services/bank-account-opening |
| Money Deposit in All Banks | అన్ని బ్యాంకుల్లో నగదు డిపాజిట్ | /services/bank-money-deposit |
| Credit Card Bill Payment | క్రెడిట్ కార్డు బిల్లు చెల్లింపు | /services/credit-card-bill-payment |

### 10. Loans & Insurance — రుణాలు & బీమా (12)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Credit Card Application | క్రెడిట్ కార్డు దరఖాస్తు | /services/credit-card-application |
| Housing Loan | గృహ రుణం | /services/housing-loan |
| Personal Loan | వ్యక్తిగత రుణం | /services/personal-loan |
| Life Insurance | జీవిత బీమా | /services/life-insurance |
| Health Insurance | ఆరోగ్య బీమా | /services/health-insurance |
| Vehicle Insurance | వాహన బీమా | /services/vehicle-insurance |
| Bike Loan | బైక్ లోన్ | /services/bike-loan |
| Car Loan | కార్ లోన్ | /services/car-loan |
| Tractor Loan | ట్రాక్టర్ లోన్ | /services/tractor-loan |
| Motor Vehicle Loan | మోటార్ వాహన రుణం | /services/motor-vehicle-loan |
| PMEGP Loan | పీఎంఈజీపీ రుణం | /services/pmegp-loan |
| Insurance Assistance | బీమా సహాయం | /services/insurance |

### 11. Travel & Temple Bookings — ప్రయాణం & ఆలయ బుకింగ్‌లు (10)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Bus Pass – New & Renewal | బస్ పాస్ — కొత్తది & రెన్యూవల్ | /services/bus-pass |
| Flight Ticket Booking | విమాన టికెట్ బుకింగ్ | /services/flight-ticket-booking |
| Train Ticket Booking | రైలు టికెట్ బుకింగ్ | /services/train-ticket-booking |
| Bus Ticket Booking | బస్సు టికెట్ బుకింగ్ | /services/bus-ticket-booking |
| Tirumala Tirupati Darshan & Room Booking | తిరుమల తిరుపతి దర్శనం & గది బుకింగ్ | /services/tirumala-booking |
| Vemulawada Darshan & Room Booking | వేములవాడ దర్శనం & గది బుకింగ్ | /services/vemulawada-booking |
| Shirdi Darshan & Room Booking | షిర్డీ దర్శనం & గది బుకింగ్ | /services/shirdi-booking |
| Basara Darshan & Room Booking | బాసర దర్శనం & గది బుకింగ్ | /services/basara-booking |
| Vijayawada Darshan & Room Booking | విజయవాడ దర్శనం & గది బుకింగ్ | /services/vijayawada-booking |
| Srisailam Darshan & Room Booking | శ్రీశైలం దర్శనం & గది బుకింగ్ | /services/srisailam-booking |

### 12. Printing Services — ప్రింటింగ్ సేవలు (2)

| Service | తెలుగు | Route |
| --- | --- | --- |
| Visiting Card Printing | విజిటింగ్ కార్డు ప్రింటింగ్ | /services/visiting-card-printing |
| PVC Card Printing | పీవీసీ కార్డు ప్రింటింగ్ | /services/pvc-card-printing |
