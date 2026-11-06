# Production notes — 12 September 2026

Current visual preference (reconfirmed 19 September): keep the original Friday hero with the large KING emblem and floating labelled cards. Generated smartphone stills/video must remain disabled. The reference Mac stays only in the Human Support/About section. Keep the reduced 250vh desktop hero and all expanded service/document content. A build regression check now verifies the original hero and Mac section together; media preparation no longer changes the active design configuration.

## Service expansion — 19 September

The operator's full supplied list is integrated into 12 categories. Duplicate money-transfer wording is merged. Five additional services come from the document lists: SADAREM/UDID, PMEGP, RRB applications, TSPSC/TGPSC OTR and bank-job applications. Keeping prior routes yields 99 service pages (110 routes plus 404). All have bilingual document guidance, service-specific enquiry links and searchable names. The 11 operator-supplied checklists preserve their item counts and conditional wording; remaining checklists are labelled general preparation suggestions, not universal official requirements.

NFDP is identified as National Fisheries Digital Platform using its official beneficiary portal: https://nfdp.dof.gov.in/nfdp_benificary/ . General Aadhaar preparation references UIDAI's accepted-document guidance at https://www.uidai.gov.in/en/921-faqs/aadhaar-online . General bank-account preparation follows the ID/address and PAN/Form 60 outline in RBI's handbook at https://website.rbi.org.in/documents/d/rbi/handbookg27022025d0f3f53f5d3c4310a6bb2f8ac2175d3a . Other general lists are service-oriented preparation suggestions; no claim of official verification is made for the operator's lists. Provider approvals, availability and terms are not guaranteed.

Catalogue verification checks 99 unique service routes, all bilingual checklists, all supplied checklist counts, conditional items, category references and each document/enquiry anchor. Historical route counts below describe the earlier build.

19 September update: the Human Support section now uses the user's supplied Mac photograph, including keyboard and mouse. Its screen is a separate perspective-matched HTML layer showing the real homepage screenshot and a small browser bar. The source photograph remains unmodified in public/assets/mac-reference.png. Layout is in src/MacDisplay.tsx and src/desktop.css.

## Latest revision: restored Friday 20:11 design

At the user's request, generated artwork is now disabled in business.json and the retained original HTML/CSS/SVG hero is active again. Desktop hero height is 250vh, reducing active pinned scroll travel from 200vh to 150vh (25%). Mobile remains unpinned. Phone and tagline revisions remain as on Friday. The generated-media notes below describe the archived alternative, not the active design.

Royal navy and gold, original KING lion emblem, Manrope with Georgia accents and Noto Sans Telugu. Smartphone artwork is accepted; the monitor alternative remains preserved. Contact: +91 8501810250. The previous Telugu tagline is removed from website content. Historical briefs remain unchanged.

## Story and assets

The 3.1-second skippable introduction traces a ring and reveals the original emblem. Native desktop scrolling scrubs the smartphone video while the logo travels to the navbar and the headline changes to “Many services. One connection.” Six independent HTML service links remain below the artwork, deliberately separate from moving generated tiles. Normal sections follow 200vh of active scroll travel.

The user supplied desktop-story.mp4: 10 seconds, H.264, 1920×1080, 24fps, with AAC audio. The website uses no audio. Representative frames throughout the clip were inspected: smartphone opening, circle departure, moving tiles and final network. No visible watermark was found in inspected frames. The generated tile count changes during the transition; six semantic category links remain independent. One continuous clip avoids inter-clip seams. The first extracted frame is the desktop poster, preventing a mismatched handoff.

Frames crop the right-hand 1152×1080 region (x=768), then scale proportionally to 864×810. There are 180 WebP frames at 18fps. Sequence and posters total approximately 4.99 MB. Mobile retains the upper 1536×1400 of the supplied 1536×2752 portrait, removing unused lower space, and scales to 768px wide. Originals remain untouched in public/assets/generated.

The original logo is preserved byte-for-byte at public/assets/king-lion-original.png; docs/logo-provenance.json records its hash. The proportional WebP, icons and OG image use this artwork. Its overlay stays separate from generated media.

## Performance and fallback

Mobile widths up to 700px, reduced motion and data saving retain a poster. Resizing cancels the loader as appropriate. Canvas caching is bounded to 16 decoded frames and 3 concurrent requests. Failures get at most two attempts; successful loads reset the counter. Evicted bitmaps are released and can be requested again when scrolling backward. Lazy animation starts only after the matching pre-rendered page hydrates.

PWA precaching includes the shell and posters, excluding video and frames. Generated subdirectories are excluded from the automatic asset-file list. All precache entries resolve to real files or route indexes.

## Content and provenance

37 routes plus a 404 are pre-rendered, including 26 service pages. Business details, bilingual UI and updates are separately editable. Updates await verified content. No unsupported fees, eligibility, reviews, affiliation or domain are invented. Apply Online prepares a WhatsApp enquiry for the visitor to review and send. This frontend collects no documents, OTPs, passwords, payments or uploads.

Earlier Higgsfield image/video requests returned subscription requirements without job results. The user subsequently supplied external assets and authorized integration. External model/prompt metadata was not supplied with these files.

## Validation and handover

Build and nine automated checks passed: routes/assets, logo integrity, PWA/offline logic, contact/update formats, every frame's dimensions, repeated reverse traversal after eviction, bitmap cleanup and real precache paths. Browser inspection covers desktop opening/middle/final scenes, responsive artwork and bilingual layout. No messages were sent.

The source clip, accepted stills, monitor backup, optimized frames, editable content, style tile and built site are packaged. Normal builds need no video utility. Re-extract with FFmpeg using `-vf "fps=18,crop=1152:1080:768:0,scale=864:810" -c:v libwebp -quality 76 -start_number 0 -an` into public/assets/story-phone/frame-%04d.webp, then run node scripts/prepare-user-media.mjs.

No final public domain is supplied: output remains noindex with an empty sitemap. Public deployment, physical-device PWA installation, production Lighthouse measurements and real WhatsApp delivery are not performed.
