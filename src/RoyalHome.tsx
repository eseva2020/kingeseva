import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Crown, Search, ShieldCheck, FileText, GraduationCap, Landmark, BriefcaseBusiness, Globe2 } from 'lucide-react';
import { categories, services } from './data';
import type { Lang } from './types';

export function RoyalHome({lang, portalUrl}:{lang:Lang;portalUrl?:string}) {
  const [query,setQuery]=useState('');
  const t=(en:string,te:string)=>lang==='te'?te:en;
  const matches=services.filter(s=>`${s.name.en} ${s.name.te} ${s.aliases||''}`.toLowerCase().includes(query.trim().toLowerCase()));
  const register=portalUrl ? `${portalUrl}${portalUrl.includes('?')?'&':'?'}intent=register` : '/apply';
  const symbols=[Landmark,BriefcaseBusiness,FileText,GraduationCap,Globe2];
  return <div className="royal-home">
    <section className="royal-hero" aria-labelledby="royal-title">
      <div className="royal-copy">
        <p className="royal-kicker"><span/> {t('YOUR DIGITAL SERVICES KINGDOM','మీ Digital Services ప్రపంచం')}</p>
        <h1 id="royal-title">{t('Everyday services.','రోజువారీ సేవలు.')}<br/><em>{t('Royally simplified.','ఇప్పుడు మరింత సులభం.')}</em></h1>
        <p className="royal-lead">{t('Less confusion. More possibility.','సందేహాలు తగ్గించుకోండి. అవకాశాలను అందుకోండి.')}<br/>{t('Documents, applications and your next opportunity — find your way forward with KING.','Documents, applications, కొత్త అవకాశాలు — KINGతో మీ తదుపరి అడుగు వేయండి.')}</p>
        <div className="royal-actions"><a className="btn btn-gold" href="#services">{t('Explore services','సేవలు చూడండి')}<ArrowRight size={18}/></a><a className="btn btn-secondary" href={register}>{t('Register / Login','రిజిస్టర్ / లాగిన్')}<ArrowUpRight size={18}/></a></div>
        <div className="royal-assurance"><ShieldCheck size={17}/><span>{t('Personal guidance. One connected account.','వ్యక్తిగత మార్గదర్శనం. ఒకే accountలో వివరాలు.')}</span></div>
      </div>
      <div className="royal-art" aria-label={t('KING e-Seva — connected digital services','KING e-Seva — అనుసంధానమైన డిజిటల్ సేవలు')}>
        <div className="royal-orbit orbit-one" aria-hidden="true"/><div className="royal-orbit orbit-two" aria-hidden="true"/>
        <span className="royal-art-label">EST. FOR YOUR EVERYDAY</span>
        <img className="royal-lion" src="/assets/king-lion.webp" width="480" height="450" alt="KING lion emblem" fetchPriority="high"/>
        <a className="royal-float royal-float-one" href="/services"><Landmark size={20}/><span>{t('Your essentials','మీ అవసరాలు')}<small>{t('Documents & services','Documents & సేవలు')}</small></span><ArrowUpRight size={16}/></a>
        <a className="royal-float royal-float-two" href="/jobs"><GraduationCap size={20}/><span>{t('Your next chapter','మీ తదుపరి అడుగు')}<small>{t('Jobs & opportunities','Jobs & అవకాశాలు')}</small></span><ArrowUpRight size={16}/></a>
        <div className="royal-art-caption"><Crown size={15}/> ONE KING. MANY POSSIBILITIES.</div>
      </div>
      <div className="royal-footnote"><span>01 / {t('DISCOVER','తెలుసుకోండి')}</span><p>{t('A little guidance changes everything.','సరైన మార్గదర్శనంతో ముందుకు సాగండి.')}</p><a href="#services" aria-label={t('Browse services','సేవలు చూడండి')}><ArrowRight size={20}/></a></div>
    </section>
    <section id="services" className="royal-services" aria-labelledby="royal-services-title">
      <div className="royal-section-heading"><div><p className="royal-kicker">02 / {t('FIND YOUR WAY','మీకు కావాల్సిన సేవ')}</p><h2 id="royal-services-title">{t('What can we help','మీకు ఏ సహాయం')}<br/><em>{t('you with today?','కావాలి?')}</em></h2></div><p>{t('Start with what you need. We’ll help you understand the documents and next steps.','మీకు కావాల్సిన సేవ ఎంచుకోండి. Documents, తదుపరి steps తెలుసుకోవడంలో సహాయం చేస్తాం.')}</p></div>
      <label className="royal-search"><Search size={21}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Search PAN, passport, scholarships…','PAN, passport, scholarships వెతకండి…')} aria-label={t('Search services','సేవలను వెతకండి')}/>{query&&<button onClick={()=>setQuery('')}>{t('Clear','తొలగించండి')}</button>}</label>
      {query.trim()?<div className="royal-results" aria-live="polite"><p>{matches.length} {t('services found','సేవలు దొరికాయి')}</p>{matches.map(s=><a key={s.slug} href={`/services/${s.slug}`}>{s.name[lang]}<ArrowUpRight size={18}/></a>)}{!matches.length&&<a href="/contact">{t('Not sure? Contact KING for guidance.','KINGని సంప్రదించి వివరాలు తెలుసుకోండి.')}<ArrowRight size={18}/></a>}</div>:<div className="royal-category-grid">{categories.map((c,i)=>{const Icon=symbols[i%symbols.length];return <a className="royal-category" href={`/services#category-${i}`} key={c.name.en}><div><Icon size={25} strokeWidth={1.4}/><span>{String(i+1).padStart(2,'0')}</span></div><h3>{c.name[lang]}</h3><p>{c.desc[lang]}</p><span className="royal-category-link">{t('Explore services','సేవలు చూడండి')}<ArrowUpRight size={17}/></span></a>})}</div>}
    </section>
  </div>;
}
