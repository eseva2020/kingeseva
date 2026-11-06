// Paste into your own Google Apps Script project. No paid API key required.
// Import-only: private drafts in your Google Drive, never direct publication.
const KING_SENDER = 'eseva4u2020@gmail.com';
const KING_SUBJECT = 'Daily State & Central Government Jobs, Schemes & Compliance Digest';

function importKingDigest() {
 const lock=LockService.getScriptLock();
 if(!lock.tryLock(1000))return;
 try {
  const props=PropertiesService.getScriptProperties();
  let folderId=props.getProperty('KING_DRAFT_FOLDER_ID');
  if(!folderId){folderId=DriveApp.createFolder('KING private update drafts').getId();props.setProperty('KING_DRAFT_FOLDER_ID',folderId);}
  const folder=DriveApp.getFolderById(folderId);
  const query='from:'+KING_SENDER+' subject:"'+KING_SUBJECT+'" newer_than:7d -in:spam -in:trash';
  for(let offset=0;;offset+=50){
   const threads=GmailApp.search(query,offset,50);if(!threads.length)break;
   threads.forEach(thread=>thread.getMessages().forEach(message=>{
    const from=message.getFrom();const address=(from.match(/<([^>]+)>/)||[null,from])[1].trim().toLowerCase();
    if(address!==KING_SENDER||message.getSubject().indexOf(KING_SUBJECT)===-1)return;
    const filename='mail-'+message.getId()+'.json';if(folder.getFilesByName(filename).hasNext())return;
    const text=message.getPlainBody();
    const blocks=[...text.matchAll(/\[UPDATE\s+\d+:\s*([^\]]+)\]([\s\S]*?)(?=\[UPDATE\s+\d+:|$)/gi)];
    if(!blocks.length){console.warn('Unsupported digest format; manual review required.');return;}
    const drafts=blocks.map((match,index)=>({id:message.getId()+'-'+index,status:'draft',title:match[1].trim(),mailClaims:match[2].trim(),receivedAt:message.getDate().toISOString()}));
    folder.createFile(filename,JSON.stringify(drafts,null,2),MimeType.PLAIN_TEXT);
   }));
  }
 } finally {lock.releaseLock();}
}

// Run only after inspecting a successful manual import in your private Drive.
function enableDailyKingImport() {
 if(!ScriptApp.getProjectTriggers().some(t=>t.getHandlerFunction()==='importKingDigest'))
  ScriptApp.newTrigger('importKingDigest').timeBased().everyDays(1).atHour(9).inTimezone('Asia/Kolkata').create();
}
function disableDailyKingImport() {
 ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='importKingDigest').forEach(t=>ScriptApp.deleteTrigger(t));
}
