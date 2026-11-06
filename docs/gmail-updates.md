# Gmail digest import — prepared, not connected

The supplied 21 September digest has been split into eight private drafts. Email claims are not verified notices. Source URLs and claims stay in `private/updates`, outside `public`, `src`, `dist` and the delivery ZIP. Do not upload the project root as a static site; deploy `dist` only.

## Local sample import

`node scripts/import-digest.mjs "path/to/mail.txt"`

Repeated identical sections retain the same ID and cannot overwrite existing review decisions. Changed sections become new drafts, allowing deadline extensions to be reviewed. The supported format is plain text `[UPDATE n: title]` blocks. HTML-only and unrecognised messages require manual review. Attachments are not imported or executed.

## Gmail connection required

### No API-key option for this sender

`scripts/gmail-apps-script.gs` is configured for `eseva4u2020@gmail.com` and the subject `Daily State & Central Government Jobs, Schemes & Compliance Digest`. In your own Google Apps Script project, paste this file and run `importKingDigest` once. Review Google's requested Gmail/Drive permissions yourself. No password or API key belongs in the script. It creates private draft JSON files in your Google Drive; do not share that folder publicly. It does not read attachments or send emails. Run `enableDailyKingImport` only after the sample import is correct; it adds one daily morning trigger. `disableDailyKingImport` removes it. This trigger has NOT been installed by this workspace.

GmailApp requires broad Gmail consent even though this code only reads sender/subject-matched mail. The Cloud OAuth alternative below can use read-only Gmail scope. Apps Script draft files retain the mail's source URLs for private review. They are not website-feed records and must be transformed/reviewed before public export. The hosting connection for approved updates is still to be configured once hosting is chosen; this script alone does not publish the website.

### Backend OAuth option

Create a Google Cloud OAuth client with Gmail API enabled. Authorize the mailbox owner with `https://www.googleapis.com/auth/gmail.readonly`, using Google's OAuth consent flow and a configured redirect URI. Store the client ID, client secret and offline refresh token only in the runner's secret store, never the browser or repository. OAuth testing-mode expiry and production consent requirements must be addressed before unattended operation.

Required environment variables: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_UPDATE_SENDER` (one exact sender). Do not paste tokens into chat. Run `node scripts/sync-gmail.mjs`. It reads matching messages from the previous seven days, paginates, checks the From address and saves new drafts. It does not send mail, mark messages read or publish content. Sender matching is a filter, not evidence that claims are true. After outages longer than seven days, import missed messages manually or extend the query intentionally.

A daily job on the chosen hosting backend can run this command once secrets are configured. No scheduler or Gmail authorization has been activated here. A desktop-only task stops when the PC is off. An authenticated review UI and cloud deployment remain separate setup work after the hosting destination is selected.

## Review and export

For each draft verify the actual dated notification, deadline timezone, post-specific qualifications, fees, corrections and supporting documents. Keep sources in `sourceUrls`. Replace `title` with `{en,te}` and fill `summary`, `eligibility`, `documents` (array of `{en,te}`), `documentNote`, `slug`, `category`, `publishedAt`, `verifiedAt`, `lastDate` (ISO or null), `isFeatured`. Use an empty documents array and explain when no documents are required. Identify preparation guidance versus exact mandatory uploads. Only then set `status: "approved"`.

`node scripts/publish-updates.mjs` exports an allowlist of public fields to `public/updates.json`. It rejects URLs in visible content and omits all mail/source metadata. Then run `npm run build` and deploy `dist`. Unapproved drafts do not reach customers. This export replaces the public feed with all currently approved private records; import existing approved records before using it on an established feed. Expired deadlines are filtered out of the current customer cards.

Customer cards show bilingual facts, expandable document guidance and KING assistance, with no outgoing official/application links. Service-document reference checkboxes on service pages are a separate existing feature.

References: https://developers.google.com/workspace/gmail/api/guides/list-messages and https://developers.google.com/identity/protocols/oauth2/web-server
