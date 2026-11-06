import {useState} from 'react';
import type {Update,Lang,Business} from './types';
import {WhatsAppIcon} from './WhatsAppIcon';
export function NotificationDetails({item,lang,business}:{item:Update;lang:Lang;business:Business}){
 const t=(en:string,te:string)=>lang==='te'?te:en;
 const [explanation,setExplanation]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const [aiConsent,setAiConsent]=useState(false);
 async function explain(){if(!aiConsent){setError(t('Please agree to AI processing below first.','ముందుగా AI processingకి అంగీకరించండి.'));return;}setBusy(true);setError('');try{const receipt=await fetch('/api/customer/ai-consent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'accept',version:'gemini-chat-v1'})});if(!receipt.ok)throw new Error();const r=await fetch('/api/customer/website-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consent:'gemini-chat-v1',language:lang,notificationId:item.id,prompt:'Explain this exact notification in clear short paragraphs: '+item.title.en+'. Include who it is for, available posts, eligibility and confirmed dates. Clearly identify missing details. Do not repeat the title or offer unrelated jobs.'})});const data=await r.json();if(!r.ok||!data.answer)throw new Error();setExplanation(data.answer.replace(/\*\*([^*]+)\*\*/g,'$1'));}catch{setError(t('Details could not be checked right now. Please try again.','ప్రస్తుతం వివరాలు చెక్ చేయలేకపోయాం. మళ్లీ ప్రయత్నించండి.'));}finally{setBusy(false);}}
 const date=(value:string|null)=>value&&!Number.isNaN(Date.parse(value))?new Date(value).toLocaleDateString(lang==='te'?'te-IN':'en-IN'):t('Not provided','ఇవ్వలేదు');
 const requestUrl=(()=>{try{const url=new URL(business.customerPortalUrl||'');if(!['http:','https:'].includes(url.protocol))return '/apply';url.searchParams.set('portal','customer');url.searchParams.set('intent','request');url.searchParams.set('division','eseva');if(item.category==='Government Jobs')url.searchParams.set('service','Government Job Online Applications');url.searchParams.set('notification',item.id);url.searchParams.set('notificationTitle',item.title.en);return url.href;}catch{return '/apply';}})();
 const whatsappNumber=business.whatsappNumber.replace(/\D/g,'');
 const whatsappUrl=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello KING e-Seva, I need assistance with: '+item.title[lang]+' (Notification '+item.id+')')}`;
 return <section className="section notification-detail">
  <a className="text-link" href="/updates">← {t('All notifications','అన్ని Notifications')}</a>
  <p className="pill">{item.category}</p><h1>{item.title[lang]}</h1>
  {item.summary[lang].trim()!==item.title[lang].trim()&&<p style={{whiteSpace:'pre-wrap',lineHeight:1.8}}>{item.summary[lang]}</p>}
  <p><label><input type="checkbox" checked={aiConsent} onChange={e=>setAiConsent(e.target.checked)}/>{t(' I agree to send this notification enquiry to Google Gemini for an AI explanation.',' AI వివరణ కోసం ఈ notification enquiry Google Geminiకి పంపేందుకు అంగీకరిస్తున్నాను.')}</label> <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
  <div className="notification-overview"><h2>{t('About this notification','ఈ Notification గురించి')}</h2><p>{t('This notice concerns','ఈ Notificationలో')} {item.title[lang]}. {t('The listed qualification is','పేర్కొన్న Qualification:')} {item.eligibility[lang]}.</p><p className="notification-ai-note">{t('Get an AI explanation using this notice and available official search evidence. This request is sent to Google Gemini.','ఈ Notification, అందుబాటులో ఉన్న official search వివరాలతో AI వివరణ పొందండి. ఈ request Google Geminiకి పంపబడుతుంది.')}</p><button className="btn btn-gold" disabled={busy} onClick={()=>void explain()}>{busy?t('Checking details…','వివరాలు చెక్ చేస్తోంది…'):t('Get AI explanation','AIతో వివరాలు తెలుసుకోండి')}</button>{explanation&&<p style={{whiteSpace:'pre-wrap'}}>{explanation}</p>}{error&&<p role="alert">{error}</p>}</div>
  <dl><dt>{t('Eligibility','అర్హత')}</dt><dd>{item.eligibility[lang]}</dd>
  <dt>{t('Last date','చివరి తేదీ')}</dt><dd>{date(item.lastDate)}</dd>
  <dt>{t('Published','ప్రచురణ తేదీ')}</dt><dd>{date(item.publishedAt)}</dd>
  {item.details?.map((field,i)=><div key={i}><dt>{field.label}</dt><dd style={{whiteSpace:'pre-wrap'}}>{field.value[lang]}</dd></div>)}</dl>
  <h2>{t('Documents to prepare','సిద్ధం చేసుకోవాల్సిన Documents')}</h2><ul>{item.documents?.map((d,i)=><li key={i}>{d[lang]}</li>)}</ul>
  <p>{item.documentNote?.[lang]}</p><p>{t('These are the notification details currently available with KING. Missing details are not confirmed.','KING వద్ద ప్రస్తుతం అందుబాటులో ఉన్న Notification వివరాలు ఇవి. ఇవ్వని వివరాలు ఇంకా confirm కాలేదు.')}</p>
  <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}><a className="btn btn-gold" href={requestUrl}>{t('Request assistance','సహాయం కోరండి')}</a>{whatsappNumber&&<a className="btn btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={19}/>{t('WhatsApp KING assistant','KING assistantకి WhatsApp చేయండి')}</a>}</div>
 </section>;
}
