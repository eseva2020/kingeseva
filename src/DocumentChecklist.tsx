import { useRef, useState } from 'react';
import { FileText, ChevronDown, ExternalLink, ClipboardList } from 'lucide-react';
import type { Lang, Service } from './types';
import { guideFor, sources, reviewedOn } from './document-guide';

export function DocumentChecklist({service,lang}:{service:Service;lang:Lang}) {
 const [showSources,setShowSources]=useState(false);
 const te=lang==='te';
 const guide=guideFor(service);
 const panels=useRef<HTMLDivElement>(null);
 const labels={one:te?'ఏదైనా ఒకటి':'Any one',all:te?'వర్తించేవన్నీ':'All applicable items',conditional:te?'వర్తిస్తే మాత్రమే':'If applicable',prepare:te?'సిద్ధం చేసుకోండి':'Prepare'};
 return <article id="documents" className="document-checklist">
  <span className="checklist-source">{guide.status==='official'?(te?'అధికారిక మార్గదర్శకాల ఆధారంగా':'Based on official guidance'):guide.status==='variable'?(te?'దరఖాస్తు రకాన్ని బట్టి అవసరాలు':'Requirements by application type'):(te?'ఈ సేవ కోసం సన్నాహాలు':'Service-specific preparation')}</span>
  <h2>{te?'ఏ పత్రాలు తీసుకురావాలి?':'Which documents should I bring?'}</h2>
  <p>{guide.scope[lang]}</p>
  <p>{te?'కింద ప్రతి విభాగాన్ని తెరిచి పత్రాల వివరాలు చూడండి. “ఏదైనా ఒకటి” అంటే ఆ జాబితాలోని అన్ని పత్రాలు అవసరం లేదు.':'Open each section for document choices and conditions. “Any one” means you do not need every document in that list.'}</p>
  {guide.note&&<p className="guide-callout">{guide.note[lang]}</p>}
  <div className="guide-toolbar"><span>{te?'పరిశీలించిన తేదీ: ':'Reviewed: '}<time dateTime={reviewedOn}>21 Sep 2026</time></span><div>
   <button type="button" onClick={()=>panels.current?.querySelectorAll('details').forEach(d=>d.open=true)}>{te?'అన్నీ తెరవండి':'Expand all'}</button>
   <button type="button" onClick={()=>panels.current?.querySelectorAll('details').forEach(d=>d.open=false)}>{te?'అన్నీ మూయండి':'Collapse all'}</button>
  </div></div>
  <div className="guide-groups" ref={panels}>{guide.groups.map((g,i)=><details className="guide-group" key={`${service.slug}-${i}`}>
   <summary><FileText size={20}/><span>{g.title[lang]}</span><small className={`guide-rule rule-${g.rule}`}>{labels[g.rule]}</small><ChevronDown className="guide-chevron" size={20}/></summary>
   <div className="guide-body"><ul>{g.items.map((item,j)=><li key={j}>{item[lang]}</li>)}</ul>{g.note&&<p className="guide-callout">{g.note[lang]}</p>}</div>
  </details>)}</div>
  <p className="document-note">{te?'పత్రాల్లో పేరు, పుట్టిన తేదీ, చిరునామా సరిపోలాలి. స్పష్టమైన పూర్తి కాపీలు సిద్ధంగా ఉంచండి; అసలు పత్రం కోరిన చోట తీసుకెళ్లండి. అప్‌లోడ్ ఫైల్ రకం, సైజు సంబంధిత ఫారమ్‌లో ఉన్నట్లే ఉండాలి.':'Check that names, dates of birth and addresses match. Prepare clear, complete copies and carry originals where requested. Follow the selected form’s file type and size limits.'}</p>
  {service.checklistSupplied&&<details className="guide-group king-preparation"><summary><ClipboardList size={20}/><span>{te?'కింగ్ అందించిన అదనపు సన్నాహక జాబితా':'KING’s additional preparation list'}</span><ChevronDown className="guide-chevron" size={20}/></summary><div className="guide-body"><p>{te?'ఇది అందరికీ తప్పనిసరి పత్రాల జాబితా కాదు. పై అధికారిక నియమాలు, మీ దరఖాస్తు పరిస్థితుల ప్రకారం వర్తించే పత్రాలు మాత్రమే సిద్ధం చేసుకోండి.':'This is not a universal mandatory-document list. Official rules above take precedence; prepare only the items that apply to your application.'}</p><ul>{service.documents.map((d,i)=><li key={i}>{d[lang]}</li>)}</ul></div></details>}
  <p className="document-note">{te?'తాజా అవసరాల కోసం KING e-Sevaను సంప్రదించండి.':'Contact KING e-Seva for current requirements.'}</p>
  <p className="document-note">{te?'ఇక్కడ పత్రాల అప్‌లోడ్ అవసరం లేదు. OTP, PIN, CVV, పాస్‌వర్డ్‌ను ఇతరులతో పంచుకోవద్దు; అధికారిక పోర్టల్‌లో మీరే నమోదు చేయండి.':'No document upload is needed here. Enter OTPs, PINs and passwords yourself on the official service; do not share them.'}</p>
  <a className="text-link" href={`/apply?service=${service.slug}`}><ClipboardList size={18}/>{te?'ఈ సేవ కోసం అభ్యర్థన పంపండి':'Request this service'}</a>
 </article>;
}
