import fs from 'node:fs/promises';
import {parseDigest} from './update-pipeline.mjs';
const file=process.argv[2];
if(!file)throw Error('Usage: node scripts/import-digest.mjs <mail-text-file>');
const drafts=parseDigest(await fs.readFile(file,'utf8'));
if(!drafts.length)throw Error('No supported UPDATE sections found; nothing imported');
await fs.mkdir('private/updates',{recursive:true});
let added=0;
for(const row of drafts){try{await fs.writeFile(`private/updates/${row.id}.json`,JSON.stringify(row,null,2),{encoding:'utf8',flag:'wx'});added++;}catch(e){if(e.code!=='EEXIST')throw e;}}
console.log(`${drafts.length} sections found; ${added} new private drafts. No website publication.`);
