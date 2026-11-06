import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createServer} from 'vite';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
const {services,categories}=await server.ssrLoadModule('/src/data.ts');
const {suppliedChecklists}=await server.ssrLoadModule('/src/document-checklists.ts');
const {guideFor,sources}=await server.ssrLoadModule('/src/document-guide.ts');
await server.close();
test('Expanded catalogue has unique routes, valid categories and bilingual checklists',()=>{
 assert.equal(categories.length,12);assert.equal(services.length,99);
 assert.equal(new Set(services.map(s=>s.slug)).size,services.length);
 for(const s of services){assert.ok(categories[s.category],s.slug);assert.ok(s.name.en&&s.name.te);assert.ok(s.documents.length>=3,s.slug);for(const d of s.documents)assert.ok(d.en&&d.te,s.slug);}
 for(const slug of ['pan-number-recovery','gst-return-filing','pf-e-nomination','building-permission','pragati-scholarship','tirumala-booking','survey-number-block-unblock','pm-kisan-e-kyc','credit-card-cash-withdrawal','tractor-loan','pvc-card-printing','nfdp','rrb-jobs','tspsc-otr','bank-jobs','sadarem-udid','pmegp-loan'])assert.ok(services.some(s=>s.slug===slug),slug);
});
test('Supplied checklists preserve every item and conditional qualifications',()=>{
 const counts={food:10,trade:9,labour:10,gst:11,udid:5,pmegp:17,rrb:7,scholarship:13,building:8,otr:13,bankJobs:13};
 for(const [key,count]of Object.entries(counts))assert.equal(suppliedChecklists[key].length,count,key);
 assert.ok(suppliedChecklists.trade.some(d=>d.en.includes('if available')));
 assert.ok(suppliedChecklists.scholarship.some(d=>d.en.includes('Last 7 years')));
 assert.ok(suppliedChecklists.otr.some(d=>d.en.includes('Non-Creamy')));
 assert.ok(suppliedChecklists.bankJobs.some(d=>d.en.includes('Left thumb')));
});
test('Every service exposes bilingual document choices and valid source references',()=>{
 for(const service of services){
  const g=guideFor(service);assert.ok(g.scope.en&&g.scope.te,service.slug);assert.ok(g.groups.length,service.slug);
  for(const group of g.groups){assert.ok(group.title.en&&group.title.te);assert.ok(['all','one','conditional','prepare'].includes(group.rule));assert.ok(group.items.length);for(const item of group.items)assert.ok(item.en&&item.te,service.slug);}
  for(const id of g.sources)assert.equal(new URL(sources[id].url).protocol,'https:',`${service.slug}: ${id}`);
  if(g.status==='official')assert.ok(g.sources.length,service.slug);
 }
});
test('PAN DOB, paperless Udyam and conditional GST guidance remain unambiguous',()=>{
 const get=slug=>guideFor(services.find(s=>s.slug===slug));
 const birth=get('pan-card').groups.find(g=>g.title.en.startsWith('Date-of-birth'));
 assert.ok(birth.note.en.includes('1 April 2026'));assert.ok(!birth.items.some(d=>d.en.includes('Aadhaar')));
 assert.match(JSON.stringify(get('udyam')),/upload/i);
 assert.match(get('gst-registration').note.en,/NOC is not universally required/);
 assert.match(get('pf-e-nomination').note.en,/bank details are not mandatory/);
});
test('Every rendered service has documents and request entry but no public official source links',async()=>{
 for(const s of services){const html=await fs.readFile(`dist/services/${s.slug}/index.html`,'utf8');assert.ok(html.includes('id="documents"'),s.slug);assert.ok(html.includes(`/apply?service=${s.slug}`),s.slug);assert.ok(html.includes('class="guide-group"'),s.slug);assert.ok(html.includes('Expand all'),s.slug);assert.ok(html.includes('intent=request'),s.slug);for(const id of guideFor(s).sources)assert.ok(!html.includes('href="'+sources[id].url.replaceAll('&','&amp;')+'"'),`${s.slug}: ${id}`);}
});
