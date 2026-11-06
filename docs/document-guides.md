# Service document guides

Reviewed 21 September 2026. All 99 service routes use explicit bilingual entries in `src/document-guide.ts`; a missing guide fails the build rather than falling back to a generic list.

Each guide contains expandable groups and selection rules, conditional evidence, source links and a scope. The UI distinguishes official guidance, requirements that vary by application, and preparation suggestions. Provider examples are not represented as universal requirements. Broad services (government schemes, job applications, insurance, loans, temple bookings) still require the selected scheme, notification or provider's current form.

Important findings incorporated: PAN Aadhaar birth-proof change from 1 April 2026; passport birth-proof categories before/on-or-after 1 October 2023; paperless Udyam; GST premises evidence by ownership; EPFO nominee bank details not mandatory in the linked guide; UDID Aadhaar-enrolment alternatives. Current forms take precedence over older linked examples and KING's supplied preparation lists.

Some primary sites use JavaScript or block automated reading. Search-indexed official instructions were used where accessible; a portal-only preparation guide does not claim every suggested document was officially verified. Printing lists are local preparation, not government requirements. Loan/property, operator booking, general application and unspecified scheme requirements cannot be made exhaustive without selecting a product/category.

Maintenance: update the applicable guide and source URLs together when official rules change. Change the review date only after reviewing the evidence. Do not convert conditional items into universal requirements, promise approval, or ask customers to upload sensitive documents to this website. Keep the original KING-provided lists clearly marked as additional preparation.

Validation: production prerender covers every route; catalogue tests check bilingual coverage, sources, proof distinctions and rendered disclosures. Browser checks cover open/close, expand/collapse all and Telugu mobile layout.
