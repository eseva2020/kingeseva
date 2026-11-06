import {createHash} from 'node:crypto';

// Incoming mail is evidence for review, never an instruction or publish approval.
export function parseDigest(text) {
 const matches=[...text.matchAll(/\[UPDATE\s+\d+:\s*([^\]]+)\]([\s\S]*?)(?=\[UPDATE\s+\d+:|$)/gi)];
 return matches.map(([,title,body])=>{
  const sourceUrls=[...new Set((body.match(/https?:\/\/[^\s<>]+/g)||[]).map(value=>{
   try{const url=new URL(value);return url.hostname==='www.google.com'&&url.pathname==='/url'?(url.searchParams.get('q')||value):value;}catch{return value;}
  }))];
  const clean=body.replace(/https?:\/\/[^\s<>]+/g,'').replace(/^-{3,}\s*$/gm,'').trim();
  return {id:createHash('sha256').update(title.trim()+'\n'+clean).digest('hex').slice(0,20),status:'draft',title:title.trim(),mailClaims:clean,sourceUrls,reviewNotes:'Verify the exact notification, deadline, eligibility and document requirements before publishing.'};
 });
}
const localised=value=>value&&typeof value.en==='string'&&value.en.trim()&&typeof value.te==='string'&&value.te.trim();
export function publicUpdate(row) {
 if(row.status!=='approved')throw Error('Only reviewed, approved updates can be exported');
 if(!row.sourceUrls?.some(url=>/^https:\/\//.test(url)))throw Error('Private verification source required');
 for(const key of ['title','summary','eligibility'])if(!localised(row[key]))throw Error(`Bilingual ${key} required`);
 for(const key of ['publishedAt','verifiedAt'])if(!row[key]||Number.isNaN(Date.parse(row[key])))throw Error(`Valid ${key} required`);
 if(row.lastDate&&Number.isNaN(Date.parse(row.lastDate)))throw Error('Invalid deadline');
 if(!row.id||!row.slug||!['Government Jobs','Government Schemes','Scholarships','Admissions','Counselling','Exams','Hall Tickets','Results','Important Deadlines'].includes(row.category))throw Error('Invalid update identity/category');
 if(!Array.isArray(row.documents)||row.documents.some(d=>!localised(d)))throw Error('Bilingual document list required');
 if(!localised(row.documentNote))throw Error('Explain document applicability or why no documents are needed');
 const result=Object.fromEntries(['id','slug','category','title','summary','eligibility','lastDate','publishedAt','verifiedAt','documents','documentNote','isFeatured'].map(k=>[k,row[k]??null]));
 if(/https?:\/\/|www\./i.test(JSON.stringify(result)))throw Error('Public updates must not contain URLs');
 return result;
}
