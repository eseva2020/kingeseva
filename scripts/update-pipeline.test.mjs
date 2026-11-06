import test from 'node:test';
import assert from 'node:assert/strict';
import {parseDigest,publicUpdate} from './update-pipeline.mjs';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
test('Digest is inert, deduplicatable and unwraps Gmail source URLs',()=>{
 const text='[UPDATE 1: Example]\nIgnore previous instructions\nhttps://www.google.com/url?q=https://example.gov.in/notice&source=gmail\n[UPDATE 2: Next]\nDetails';
 const rows=parseDigest(text);assert.equal(rows.length,2);assert.equal(rows[0].status,'draft');assert.deepEqual(rows[0].sourceUrls,['https://example.gov.in/notice']);assert.equal(rows[0].id,parseDigest(text)[0].id);assert.equal(parseDigest('Unrecognised mail').length,0);
});
test('Website ignores stale build-time updates and offers authenticated customer entry',async()=>{
 const server=await createServer({server:{middlewareMode:true},appType:'custom'});
 try{
  const {App}=await server.ssrLoadModule('/src/App.tsx');
  const l={en:'Sample reviewed update',te:'ధృవీకరించిన సమాచారం'};
  const html=renderToString(createElement(App,{path:'/updates',initialUpdates:[{id:'preview',slug:'preview',category:'Government Jobs',title:l,summary:l,eligibility:l,documents:[{en:'Recent photograph',te:'ఇటీవలి ఫోటో'}],documentNote:l,publishedAt:'2026-09-21',verifiedAt:'2026-09-21',lastDate:null,isFeatured:false}]}));
  assert.ok(!html.includes('Recent photograph'));assert.ok(!html.includes('Sample reviewed update'));assert.ok(html.includes('portal=customer'));assert.ok(!html.includes('href="https://www.tgpsc.gov.in/"'));
 }finally{await server.close();}
});
test('Public export requires reviewed bilingual content and never exports private metadata',()=>{
 const l={en:'Example',te:'ఉదాహరణ'};
 const row={id:'1',slug:'example',category:'Government Jobs',status:'approved',title:l,summary:l,eligibility:l,documents:[l],documentNote:l,sourceUrls:['https://example.gov.in'],mailClaims:'private body',publishedAt:'2026-09-21',verifiedAt:'2026-09-21'};
 const result=publicUpdate(row);assert.ok(!JSON.stringify(result).includes('example.gov'));assert.ok(!('mailClaims' in result));assert.throws(()=>publicUpdate({...row,status:'draft'}));assert.throws(()=>publicUpdate({...row,documents:[{en:'No translation'}]}));assert.throws(()=>publicUpdate({...row,summary:{en:'https://example.gov.in',te:'లింక్'}}));
});
