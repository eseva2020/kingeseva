import fs from 'node:fs/promises';
import {publicUpdate} from './update-pipeline.mjs';
const files=await fs.readdir('private/updates');
const rows=[];
for(const file of files.filter(f=>f.endsWith('.json'))){const row=JSON.parse(await fs.readFile(`private/updates/${file}`,'utf8'));if(row.status==='approved')rows.push(publicUpdate(row));}
if(new Set(rows.map(r=>r.id)).size!==rows.length)throw Error('Duplicate update IDs');
rows.sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
await fs.writeFile('public/updates.json.tmp',JSON.stringify(rows,null,2));
await fs.rename('public/updates.json.tmp','public/updates.json');
console.log(`Exported ${rows.length} reviewed updates without source links. Rebuild/redeploy to publish.`);
