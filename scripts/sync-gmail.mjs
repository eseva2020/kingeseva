import fs from 'node:fs/promises';
import {parseDigest} from './update-pipeline.mjs';
const required=['GMAIL_CLIENT_ID','GMAIL_CLIENT_SECRET','GMAIL_REFRESH_TOKEN','GMAIL_UPDATE_SENDER'];
for(const key of required)if(!process.env[key])throw Error(`Configure ${key} privately before running Gmail sync`);
const sender=process.env.GMAIL_UPDATE_SENDER;
if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(sender))throw Error('A single exact sender email is required');
const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({client_id:process.env.GMAIL_CLIENT_ID,client_secret:process.env.GMAIL_CLIENT_SECRET,refresh_token:process.env.GMAIL_REFRESH_TOKEN,grant_type:'refresh_token'})});
if(!response.ok)throw Error(`Google authorization failed (${response.status}); reconnect account`);
const {access_token}=await response.json();
async function gmail(path){const r=await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/${path}`,{headers:{Authorization:`Bearer ${access_token}`}});if(!r.ok)throw Error(`Gmail read failed (${r.status})`);return r.json();}
function plain(part){if(part.mimeType==='text/plain'&&part.body?.data)return Buffer.from(part.body.data,'base64url').toString('utf8');return (part.parts||[]).map(plain).join('\n');}
await fs.mkdir('private/updates',{recursive:true});
let pageToken='',added=0,unsupported=0;
do{
 const params=new URLSearchParams({q:`from:${sender} newer_than:7d -in:spam -in:trash`,maxResults:'100'});if(pageToken)params.set('pageToken',pageToken);
 const page=await gmail(`messages?${params}`);
 for(const item of page.messages||[]){
  const message=await gmail(`messages/${encodeURIComponent(item.id)}?format=full`);
  const from=message.payload.headers.find(h=>h.name.toLowerCase()==='from')?.value||'';
  const address=(from.match(/<([^>]+)>/)?.[1]||from).trim().toLowerCase();if(address!==sender.toLowerCase())continue;
  const rows=parseDigest(plain(message.payload));if(!rows.length){unsupported++;continue;}
  for(const row of rows){try{await fs.writeFile(`private/updates/${row.id}.json`,JSON.stringify({...row,receivedAt:new Date(Number(message.internalDate)).toISOString()},null,2),{encoding:'utf8',flag:'wx'});added++;}catch(e){if(e.code!=='EEXIST')throw e;}}
 }
 pageToken=page.nextPageToken||'';
}while(pageToken);
console.log(`${added} new private drafts; ${unsupported} unsupported messages need manual review. Nothing auto-published.`);
