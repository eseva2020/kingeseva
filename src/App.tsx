import { createContext, useContext, useEffect, useRef, useState, lazy, Suspense, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Check, ChevronDown, X, Menu, Landmark, BriefcaseBusiness, ChartNoAxesCombined, FileText, GraduationCap, Globe2, MessageCircle, Phone, MapPin, ShieldCheck, Search, CheckCircle2, Sparkles, Layers3, Headphones, Send, Download, Mail, ExternalLink, WifiOff, Crown, ClipboardList, CircleHelp, Map, HeartHandshake, Wallet, Shield, Plane, Printer } from 'lucide-react';
import { categories, services, updateCategories, L } from './data';
import type { Business, Lang, Service, Update } from './types';
import defaultBusiness from '../public/business.json';
import uiCopy from './content/ui-copy.json';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DocumentChecklist } from './DocumentChecklist';
import { DesktopDisplay } from './MacDisplay';
import { WebsiteBridge } from './WebsiteBridge';
import { NotificationDetails } from './NotificationDetails';
import { KingChat } from './KingChat';
const FrameSequence = lazy(() => import('./FrameSequence').then(m => ({ default: m.FrameSequence })));
const Ctx = createContext<{
    lang: Lang;
    t: (en: string, te: string) => string;
    business: Business;
    assist: (service?: string) => void;
}>({ lang: 'en', t: e => e, business: defaultBusiness, assist: () => { } });
const useSite = () => useContext(Ctx);
const icons = [Landmark, BriefcaseBusiness, ChartNoAxesCombined, FileText, GraduationCap, Globe2];
const categoryIcons = [Landmark, BriefcaseBusiness, ChartNoAxesCombined, BriefcaseBusiness, GraduationCap, Globe2, Map, HeartHandshake, Wallet, Shield, Plane, Printer];
function Logo({ className = '' }: {
    className?: string;
}) { return <img className={`lion-logo ${className}`} src="/assets/king-lion.webp" width="480" height="450" alt="KING e-Seva Services"/>; }
function Wordmark() { return <span className="wordmark"><strong aria-label="KING">K<span className="crowned-letter">I<Crown className="wordmark-crown" aria-hidden="true"/></span>NG</strong><span>e-Seva Services</span></span>; }
function Btn({ children, href, secondary = false, onClick, className = '' }: {
    children: ReactNode;
    href?: string;
    secondary?: boolean;
    onClick?: () => void;
    className?: string;
}) { const cls = `btn ${secondary ? 'btn-secondary' : 'btn-gold'} ${className}`; return href ? <a className={cls} href={href}>{children}</a> : <button className={cls} onClick={onClick}>{children}</button>; }
function Eyebrow({ children }: {
    children: ReactNode;
}) { return <div className="eyebrow"><span />{children}</div>; }
function Header({ lang, setLang }: {
    lang: Lang;
    setLang: (l: Lang) => void;
}) {
    const { t, business } = useSite();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => { const fn = () => setScrolled(window.scrollY > 32); fn(); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
    const links = [['/', t(uiCopy.ui_001.en, uiCopy.ui_001.te)], ['/services', t(uiCopy.ui_002.en, uiCopy.ui_002.te)], ['/updates', t(uiCopy.ui_003.en, uiCopy.ui_003.te)], ['/jobs', t(uiCopy.ui_004.en, uiCopy.ui_004.te)], ['/about', t(uiCopy.ui_005.en, uiCopy.ui_005.te)], ['/contact', t(uiCopy.ui_006.en, uiCopy.ui_006.te)]];
    return <header className={`header ${scrolled ? 'scrolled' : ''}`}><a href="/" className="brand" aria-label={t(uiCopy.ui_007.en, uiCopy.ui_007.te)}><Logo /><Wordmark /></a><nav className={open ? 'nav open' : 'nav'} aria-label={t(uiCopy.ui_008.en, uiCopy.ui_008.te)}>{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav><div className="header-actions"><button className="language" onClick={() => setLang(lang === 'en' ? 'te' : 'en')} aria-label={lang === 'en' ? 'Switch to Telugu' : 'ఆంగ్లంలోకి మార్చండి'}><span className={lang === 'en' ? 'chosen' : ''}>EN</span><span className="language-divider">/</span><span lang="te" className={lang === 'te' ? 'chosen' : ''}>తెలుగు</span></button><Btn href={business.customerPortalUrl ? business.customerPortalUrl + "&intent=register" : "/apply"} className="header-apply">{t("Register", "రిజిస్టర్")}<ArrowUpRight size={16}/></Btn><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t(uiCopy.ui_010.en, uiCopy.ui_010.te)}>{open ? <X /> : <Menu />}</button></div></header>;
}
function Intro() { const [show, setShow] = useState(false); const { t } = useSite(); useEffect(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches)
    return; try {
    if (sessionStorage.getItem('king-intro'))
        return;
    sessionStorage.setItem('king-intro', '1');
}
catch { } setShow(true); const move = setTimeout(() => { const from = document.querySelector<HTMLElement>('.intro-emblem'); const to = document.querySelector<HTMLElement>('.hero-emblem'); if (from && to) {
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    from.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${b.left - a.left}px,${b.top - a.top}px) scale(${b.width / a.width})` }], { duration: 650, easing: 'cubic-bezier(.22,.68,.3,1)', fill: 'forwards' });
} }, 2350); const timer = setTimeout(() => setShow(false), 3100); return () => { clearTimeout(timer); clearTimeout(move); }; }, []); return show ? <div className="intro" aria-label={t(uiCopy.ui_011.en, uiCopy.ui_011.te)}><div className="intro-emblem"><Logo /><div className="intro-crown" aria-hidden="true"><Logo /></div><svg viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="138"/></svg><i className="intro-sweep"/><i className="intro-eye"/></div><div className="intro-name"><Wordmark /></div><button onClick={() => setShow(false)}>{t(uiCopy.ui_012.en, uiCopy.ui_012.te)}<ArrowRight size={14}/></button></div> : null; }
function Network() { return <svg className="network" viewBox="0 0 720 650" fill="none" aria-hidden="true"><defs><linearGradient id="lineGold"><stop stopColor="#B39354" stopOpacity=".12"/><stop offset=".5" stopColor="#E4C989" stopOpacity=".7"/><stop offset="1" stopColor="#B39354" stopOpacity=".12"/></linearGradient></defs><ellipse cx="370" cy="330" rx="260" ry="164" transform="rotate(-23 370 330)"/><ellipse cx="370" cy="330" rx="306" ry="231" transform="rotate(21 370 330)"/><ellipse cx="370" cy="330" rx="232" ry="280" transform="rotate(36 370 330)"/><path d="M130 147C290 147 210 370 370 330S540 149 580 212M119 392C247 392 244 288 370 330S455 545 585 500M325 75C315 270 353 417 370 330S300 481 242 551"/><g className="network-nodes"><circle cx="130" cy="147" r="3"/><circle cx="580" cy="212" r="3"/><circle cx="119" cy="392" r="3"/><circle cx="585" cy="500" r="3"/><circle cx="325" cy="75" r="3"/><circle cx="242" cy="551" r="3"/></g></svg>; }
function Hero() {
    const { t, lang, assist, business } = useSite();
    const stage = useRef<HTMLDivElement>(null);
    const rig = useRef<HTMLDivElement>(null);
    const [skip, setSkip] = useState(false);
    const [mediaReady, setMediaReady] = useState(false);
    useEffect(() => setMediaReady(true), []);
    useEffect(() => {
        const el = stage.current;
        if (!el)
            return;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        let raf = 0;
        const update = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const max = el.offsetHeight - innerHeight;
            const p = reduced.matches || innerWidth <= 700 || max <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / max));
            const q = Math.min(1, Math.max(0, (p - .22) / .58));
            el.style.setProperty('--progress', String(p));
            el.style.setProperty('--transform-progress', String(q));
            el.style.setProperty('--hero-opacity', String(Math.max(0, 1 - q * 3)));
            el.style.setProperty('--caption-opacity', String(Math.max(0, (q - .4) / .6)));
            const copy = el.querySelector<HTMLElement>('.hero-copy');
            if (copy)
                copy.inert = q >= .34;
            el.querySelectorAll<HTMLAnchorElement>('.floating-card').forEach(a => { if (!a.dataset.serviceUrl)
                a.dataset.serviceUrl = a.getAttribute('href') || '/services'; a.href = q > .5 ? a.dataset.categoryUrl! : a.dataset.serviceUrl; });
            const emblem = el.querySelector<HTMLElement>('.hero-emblem');
            const target = document.querySelector<HTMLElement>('.header .lion-logo');
            const visual = el.querySelector<HTMLElement>('.hero-visual');
            if (emblem && target && visual) {
                const v = visual.getBoundingClientRect();
                const end = target.getBoundingClientRect();
                const dx = end.left - (v.left + emblem.offsetLeft);
                // Use the settled fixed-header position even before its scroll state commits.
                const dy = (78 - end.height) / 2 - (v.top + emblem.offsetTop);
                el.style.setProperty('--emblem-x', `${dx * q}px`);
                el.style.setProperty('--emblem-y', `${dy * q}px`);
                el.style.setProperty('--emblem-scale', String(1 - q * (1 - end.width / emblem.offsetWidth)));
            }
            if (q > 0 && rig.current) {
                rig.current.style.setProperty('--rx', '0deg');
                rig.current.style.setProperty('--ry', '0deg');
            }
        };
        const onScroll = () => { if (!raf)
            raf = requestAnimationFrame(update); };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        reduced.addEventListener('change', onScroll);
        update();
        return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); reduced.removeEventListener('change', onScroll); };
    }, []);
    const drift = (e: React.MouseEvent<HTMLDivElement>) => { if (business.generatedMedia.poster || !rig.current || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer:fine)').matches)
        return; const r = e.currentTarget.getBoundingClientRect(); rig.current.style.setProperty('--rx', `${-(e.clientY - r.top - r.height / 2) / r.height * 5}deg`); rig.current.style.setProperty('--ry', `${(e.clientX - r.left - r.width / 2) / r.width * 5}deg`); };
    const items = [L('PAN Card', 'పాన్ కార్డు'), L('GST Registration', 'జీఎస్టీ నమోదు'), L('ITR Filing', 'ఆదాయపు పన్ను'), L('Government Jobs', 'ప్రభుత్వ ఉద్యోగాలు'), L('Scholarships', 'ఉపకార వేతనాలు'), L('Online Services', 'ఆన్‌లైన్ సేవలు')];
    return <section className={`hero-story ${business.generatedMedia.poster ? 'has-media' : ''} ${skip ? 'skip-story' : ''}`} ref={stage} id="home"><div className="hero-sticky"><div className="hero-grid"><div className="hero-copy"><Eyebrow>{t(uiCopy.ui_013.en, uiCopy.ui_013.te)}</Eyebrow><h1>{t(uiCopy.ui_014.en, uiCopy.ui_014.te)}<br />{t(uiCopy.ui_015.en, uiCopy.ui_015.te)} <em>{t(uiCopy.ui_016.en, uiCopy.ui_016.te)}</em></h1><p className="hero-lead">{t(uiCopy.ui_017.en, uiCopy.ui_017.te)}<br />{t(uiCopy.ui_018.en, uiCopy.ui_018.te)}</p><div className="hero-buttons"><Btn href="/apply">{t(uiCopy.ui_009.en, uiCopy.ui_009.te)}<ArrowUpRight size={18}/></Btn><Btn secondary onClick={() => assist()}><WhatsAppIcon size={18}/>{t(uiCopy.ui_019.en, uiCopy.ui_019.te)}</Btn></div><div className="hero-assurances"><span><ShieldCheck size={15}/>{t(uiCopy.ui_020.en, uiCopy.ui_020.te)}</span><i /><span><MapPin size={15}/>{t(uiCopy.ui_021.en, uiCopy.ui_021.te)}</span></div></div><div className="hero-visual" onMouseMove={drift} onMouseLeave={() => { rig.current?.style.setProperty('--rx', '0deg'); rig.current?.style.setProperty('--ry', '0deg'); }}>{business.generatedMedia.poster ? (<div className="visual-rig generated-rig" ref={rig}><div className="media-art"><picture><source media="(max-width:700px)" srcSet={business.generatedMedia.mobilePoster || business.generatedMedia.poster}/><img className="story-poster" src={business.generatedMedia.poster} width="864" height="810" alt="" fetchPriority="high"/></picture>{mediaReady && business.generatedMedia.manifest && <Suspense fallback={null}><FrameSequence manifestUrl={business.generatedMedia.manifest} poster={business.generatedMedia.poster}/></Suspense>}<div className="hero-emblem"><Logo /></div></div><div className="media-services">{items.map((name,i)=>{const Icon=icons[i];return <a key={i} className="floating-card" href={`/services/${['pan-card','gst-registration','itr-filing','government-jobs','scholarships','online-applications'][i]}`} data-category-url={`/services#category-${i}`}><Icon size={16}/><span className="floating-label"><span>{name[lang]}</span><b>{categories[i].short[lang]}</b></span><ArrowUpRight size={12}/></a>})}</div></div>) : (<div className="visual-rig" ref={rig}>{mediaReady && business.generatedMedia.manifest && <Suspense fallback={null}><FrameSequence manifestUrl={business.generatedMedia.manifest} poster={business.generatedMedia.poster}/></Suspense>}<div className="ambient"/><Network /><span className="orbital-caption">{t(uiCopy.ui_022.en, uiCopy.ui_022.te)}</span><div className="device"><div className="device-top"><span /><i /></div><div className="device-screen"><Crown size={20}/><span>KING</span><div className="device-dots">{icons.map((Icon, i) => <div key={i}><Icon size={14}/></div>)}</div></div></div><div className="hero-emblem"><Logo /><span className="emblem-sheen"/></div>{items.map((name, i) => { const Icon = icons[i]; return <a key={i} href={`/services/${["pan-card", "gst-registration", "itr-filing", "government-jobs", "scholarships", "online-applications"][i]}`} data-category-url={`/services#category-${i}`} className={`floating-card float-${i}`}><span className="float-icon"><Icon size={20}/></span><span><span className="floating-label"><span>{name[lang]}</span><b>{categories[i].short[lang]}</b></span><small>{t(uiCopy.ui_023.en, uiCopy.ui_023.te)}</small></span><i /></a>; })}<div className="visual-signature"><span />{t(uiCopy.ui_024.en, uiCopy.ui_024.te)}</div></div>) }</div></div><div className="hero-bottom"><a href="#services"><span className="scroll-icon"/><span>{t(uiCopy.ui_025.en, uiCopy.ui_025.te)}</span><ArrowDown size={14}/></a><span>{t(uiCopy.ui_026.en, uiCopy.ui_026.te)}</span><button onClick={() => { setSkip(true); document.getElementById('services')?.scrollIntoView({ behavior: 'auto' }); }}>{t(uiCopy.ui_027.en, uiCopy.ui_027.te)}</button></div><div className="story-caption" aria-hidden="true"><span>01 — 06</span><h2>{t(uiCopy.ui_028.en, uiCopy.ui_028.te)} <em>{t(uiCopy.ui_029.en, uiCopy.ui_029.te)}</em></h2></div></div></section>;
}
function ServicesSection({ full = false }: {
    full?: boolean;
}) { const { t, lang, assist } = useSite(); const [query, setQuery] = useState(''); const [filter, setFilter] = useState(-1); return <section id="services" className={`services-section section ${full ? 'listing' : ''}`}><div className="section-heading"><div><Eyebrow>{t(uiCopy.ui_030.en, uiCopy.ui_030.te)}</Eyebrow>{full ? <h1>{t(uiCopy.ui_031.en, uiCopy.ui_031.te)} <em>{t(uiCopy.ui_032.en, uiCopy.ui_032.te)}</em></h1> : <h2>{t(uiCopy.ui_033.en, uiCopy.ui_033.te)}<br /><em>{t(uiCopy.ui_034.en, uiCopy.ui_034.te)}</em></h2>}</div><p>{t(uiCopy.ui_035.en, uiCopy.ui_035.te)}</p></div>{full && <><label className="search"><Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t(uiCopy.ui_036.en, uiCopy.ui_036.te)} aria-label={t(uiCopy.ui_037.en, uiCopy.ui_037.te)}/>{query && <button onClick={() => setQuery('')} aria-label={t(uiCopy.ui_038.en, uiCopy.ui_038.te)}><X size={18}/></button>}</label><div className="filters"><button aria-pressed={filter === -1} onClick={() => setFilter(-1)}>{t(uiCopy.ui_039.en, uiCopy.ui_039.te)}</button>{categories.map((c, i) => <button key={i} aria-pressed={filter === i} onClick={() => setFilter(i)}>{c.short[lang]}</button>)}</div></>}<div className="category-grid">{categories.map((c, i) => { const Icon = categoryIcons[i]; const matches = services.filter(s => s.category === i && `${s.name.en} ${s.name.te} ${s.aliases || ""}`.toLowerCase().includes(query.trim().toLowerCase())); if ((!full && i >= 6) || (filter !== -1 && filter !== i) || !matches.length)
    return null; return <article id={`category-${i}`} className="category-card" key={i}><div className="category-top"><div className="category-icon"><Icon strokeWidth={1.3} size={28}/></div><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{c.name[lang]}</h3><p>{c.desc[lang]}</p><div className="service-preview">{matches.slice(0, 3).map(s => <a key={s.slug} href={`/services/${s.slug}`}>{s.name[lang]}</a>)}</div><details open={full || undefined}><summary>{t(uiCopy.ui_040.en, uiCopy.ui_040.te)}<ArrowUpRight size={17}/></summary><ul>{matches.map(s => <li key={s.slug}><a href={`/services/${s.slug}`}>{s.name[lang]}<ArrowRight size={14}/></a></li>)}</ul><button className="text-link" onClick={() => assist(c.name[lang])}><WhatsAppIcon size={15}/>{t(uiCopy.ui_041.en, uiCopy.ui_041.te)}</button></details></article>; })}</div>{full && !services.some(s => (filter === -1 || s.category === filter) && `${s.name.en} ${s.name.te} ${s.aliases || ""}`.toLowerCase().includes(query.trim().toLowerCase())) && <div className="empty"><Search /><h3>{t(uiCopy.ui_042.en, uiCopy.ui_042.te)}</h3><p>{t(uiCopy.ui_043.en, uiCopy.ui_043.te)}</p><Btn onClick={() => assist()}>{t(uiCopy.ui_044.en, uiCopy.ui_044.te)}</Btn></div>}{!full && <div className="extra-service-groups">{categories.slice(6).map((c,i)=><a key={i} href={`/services#category-${i+6}`}>{c.name[lang]}<ArrowUpRight size={14}/></a>)}</div>}{!full && <a className="all-services" href="/services">{t(uiCopy.ui_045.en, uiCopy.ui_045.te)}<ArrowRight size={18}/></a>}</section>; }
function Process() { const { t } = useSite(); const steps = [[ClipboardList, t(uiCopy.ui_046.en, uiCopy.ui_046.te), t(uiCopy.ui_047.en, uiCopy.ui_047.te)], [FileText, t(uiCopy.ui_048.en, uiCopy.ui_048.te), t(uiCopy.ui_049.en, uiCopy.ui_049.te)], [CheckCircle2, t(uiCopy.ui_050.en, uiCopy.ui_050.te), t(uiCopy.ui_051.en, uiCopy.ui_051.te)]] as const; return <section className="process section"><div className="center-heading"><Eyebrow>{t(uiCopy.ui_052.en, uiCopy.ui_052.te)}</Eyebrow><h2>{t(uiCopy.ui_053.en, uiCopy.ui_053.te)} <em>{t(uiCopy.ui_054.en, uiCopy.ui_054.te)}</em></h2></div><div className="steps">{steps.map(([Icon, title, desc], i) => <article key={i}><div className="step-symbol"><Icon size={26} strokeWidth={1.4}/><small>0{i + 1}</small></div><h3>{title}</h3><p>{desc}</p></article>)}</div></section>; }
function Updates({ full = false, jobs = false, updates }: {
    full?: boolean;
    jobs?: boolean;
    updates: Update[];
}) { const { t, lang, assist, business } = useSite(); const [filter, setFilter] = useState(jobs ? 'Government Jobs' : 'All updates'); const [archived,setArchived]=useState(false); const expired=(u:Update)=>!!u.lastDate && Date.parse(u.lastDate.length===10 ? u.lastDate+'T23:59:59+05:30' : u.lastDate)<Date.now(); const visible = updates.filter(u => (filter === 'All updates' || u.category === filter) && expired(u)===archived); const [noticeId,setNoticeId]=useState<string|null>(null); useEffect(()=>{setNoticeId(new URLSearchParams(window.location.search).get("notice"));},[]); if(noticeId){const item=updates.find(u=>u.id===noticeId); return item ? <NotificationDetails item={item} lang={lang} business={business}/> : <section className="section"><h1>{t("Notification details","Notification వివరాలు")}</h1><p>{t("This notification is loading or is no longer available in the current published list.","ఈ Notification load అవుతోంది లేదా ప్రస్తుత published listలో అందుబాటులో లేదు.")}</p><a href="/updates" className="text-link">{t("View current notifications","ప్రస్తుత Notifications చూడండి")}</a></section>;} return <section className={`updates section ${full ? 'updates-page' : ''}`}><div className="section-heading"><div><Eyebrow>{t(uiCopy.ui_055.en, uiCopy.ui_055.te)}</Eyebrow>{full ? <h1>{jobs ? t(uiCopy.ui_056.en, uiCopy.ui_056.te) : t(uiCopy.ui_057.en, uiCopy.ui_057.te)}<br /><em>{jobs ? t(uiCopy.ui_058.en, uiCopy.ui_058.te) : t(uiCopy.ui_059.en, uiCopy.ui_059.te)}</em></h1> : <h2>{t(uiCopy.ui_057.en, uiCopy.ui_057.te)}<br /><em>{t(uiCopy.ui_059.en, uiCopy.ui_059.te)}</em></h2>}</div>{!full ? <a className="text-link" href="/updates">{t(uiCopy.ui_060.en, uiCopy.ui_060.te)}<ArrowUpRight size={17}/></a> : <p>{t(uiCopy.ui_061.en, uiCopy.ui_061.te)}</p>}</div><p className="registration-benefits" style={{marginBottom:24,padding:16,border:"1px solid var(--line)",borderRadius:12}}>{t("More than notifications: register to request services, track your applications and see relevant updates when published in your account.","Notifications మాత్రమే కాదు—register అయితే service requests పెట్టవచ్చు, applications track చేయవచ్చు, మీ accountలో సంబంధిత updates చూడవచ్చు.")} <a className="text-link" href={business.customerPortalUrl ? business.customerPortalUrl+"&intent=register" : "/apply"}>{t("Register / Login","రిజిస్టర్ / లాగిన్")} →</a></p><div className="filters">{(full ? updateCategories : updateCategories.slice(0, 4)).map(c => <button key={c.en} aria-pressed={filter === c.en} onClick={() => setFilter(c.en)}>{c[lang]}</button>)}</div>{full&&<div className="filters" aria-label={t("Update status","అప్‌డేట్ స్థితి")}><button aria-pressed={!archived} onClick={()=>setArchived(false)}>{t("Current updates","ప్రస్తుత సమాచారం")}</button><button aria-pressed={archived} onClick={()=>setArchived(true)}>{t("Past deadlines","గడువు ముగిసిన సమాచారం")}</button></div>}{archived&&<p className="archive-notice">{t("Past notices for reference only. These application windows have ended.","ఇవి పాత నోటీసులు మాత్రమే. ఈ దరఖాస్తుల గడువులు ముగిశాయి.")}</p>}{visible.length ? <div className="update-grid">{visible.slice(0, full ? 100 : 3).map(u => <article className="update-card" key={u.id}><span className="pill">{updateCategories.find(c => c.en === u.category)?.[lang] || t(uiCopy.ui_062.en, uiCopy.ui_062.te)}</span><time dateTime={u.publishedAt}>{(u.publishedAt && !Number.isNaN(Date.parse(u.publishedAt)) ? new Date(u.publishedAt).toLocaleDateString(lang === 'en' ? 'en-IN' : 'te-IN') : t('Date not provided','తేదీ ఇవ్వలేదు'))}</time><h3>{u.title[lang]}</h3>{expired(u)&&<span className="pill">{t("Deadline passed","గడువు ముగిసింది")}</span>}<p>{u.summary[lang]}</p><a className="text-link" href={`/updates?notice=${encodeURIComponent(u.id)}`}>{t("More details","పూర్తి వివరాలు")} <ArrowUpRight size={16}/></a><dl><dt>{t(uiCopy.ui_063.en, uiCopy.ui_063.te)}</dt><dd>{u.eligibility[lang]}</dd>{u.lastDate && <><dt>{t(uiCopy.ui_064.en, uiCopy.ui_064.te)}</dt><dd>{(!Number.isNaN(Date.parse(u.lastDate)) ? new Date(u.lastDate).toLocaleDateString(lang === 'en' ? 'en-IN' : 'te-IN') : t('Date not provided','తేదీ ఇవ్వలేదు'))}</dd></>}</dl><details className="update-documents"><summary><ClipboardList size={17}/>{t('Documents to prepare','సిద్ధం చేసుకోవాల్సిన పత్రాలు')}<ChevronDown size={16}/></summary><ul>{u.documents?.map((d,i)=><li key={i}>{d[lang]}</li>)}</ul>{u.documentNote&&<p>{u.documentNote[lang]}</p>}</details><button className="text-link" onClick={() => assist(u.title[lang])}>{expired(u)?t("Ask about this past notice","ఈ పాత నోటీసు గురించి అడగండి"):t(uiCopy.ui_066.en, uiCopy.ui_066.te)}<ArrowRight size={15}/></button></article>)}</div> : <div className="updates-empty"><div className="empty-icon"><FileText size={28} strokeWidth={1.2}/><span /></div><div><h3>{t("No current notices in this view.","ఈ విభాగంలో ప్రస్తుతం నోటీసులు లేవు.")}</h3><p>{t("Browse the updates page for verified notices and past deadlines.","ధృవీకరించిన సమాచారం, పాత నోటీసుల కోసం అప్‌డేట్స్ పేజీ చూడండి.")}</p><a className="text-link" href="/updates">{t("Browse updates & past deadlines","అప్‌డేట్స్ & పాత నోటీసులు చూడండి")}</a></div><a href="/contact" className="text-link">{t(uiCopy.ui_069.en, uiCopy.ui_069.te)}<ArrowUpRight size={18}/></a></div>}</section>; }
function AboutSection({ full = false }: {
    full?: boolean;
}) { const { t } = useSite(); return <section className={`about section ${full ? 'about-page' : ''}`}><DesktopDisplay label={t('Mac-style desktop displaying the KING e-Seva Services website', 'కింగ్ ఈ-సేవ వెబ్‌సైట్ చూపిస్తున్న మ్యాక్ తరహా కంప్యూటర్')}/><div className="about-copy"><Eyebrow>{t(uiCopy.ui_074.en, uiCopy.ui_074.te)}</Eyebrow>{full ? <h1>{t(uiCopy.ui_014.en, uiCopy.ui_014.te)}<br /><em>{t(uiCopy.ui_075.en, uiCopy.ui_075.te)}</em></h1> : <h2>{t(uiCopy.ui_076.en, uiCopy.ui_076.te)}<br />{t(uiCopy.ui_077.en, uiCopy.ui_077.te)} <em>{t(uiCopy.ui_075.en, uiCopy.ui_075.te)}</em></h2>}<p>{t(uiCopy.ui_078.en, uiCopy.ui_078.te)}</p><div className="trust-points">{[[Headphones, t(uiCopy.ui_079.en, uiCopy.ui_079.te)], [FileText, t(uiCopy.ui_080.en, uiCopy.ui_080.te)], [Layers3, t(uiCopy.ui_081.en, uiCopy.ui_081.te)], [MessageCircle, t(uiCopy.ui_082.en, uiCopy.ui_082.te)]].map(([Icon, text], i) => { const I = Icon as typeof Headphones; return <span key={i}><I size={18}/>{text as string}</span>; })}</div>{!full && <a className="text-link" href="/about">{t(uiCopy.ui_083.en, uiCopy.ui_083.te)}<ArrowUpRight size={17}/></a>}</div></section>; }
function CTA() { const { t, assist } = useSite(); return <section className="cta section"><div className="cta-decoration" aria-hidden="true"/><Eyebrow>{t(uiCopy.ui_084.en, uiCopy.ui_084.te)}</Eyebrow><h2>{t(uiCopy.ui_085.en, uiCopy.ui_085.te)}<br /><em>{t(uiCopy.ui_086.en, uiCopy.ui_086.te)}</em></h2><p>{t(uiCopy.ui_087.en, uiCopy.ui_087.te)}</p><div className="hero-buttons"><Btn onClick={() => assist()}><WhatsAppIcon size={18}/>{t(uiCopy.ui_088.en, uiCopy.ui_088.te)}<ArrowUpRight size={17}/></Btn><a href="/services" className="text-link">{t(uiCopy.ui_089.en, uiCopy.ui_089.te)}<ArrowRight size={17}/></a></div></section>; }
function Footer() { const { t, lang, business, assist } = useSite(); return <><footer className="footer section"><div className="footer-main"><div className="footer-brand"><a className="brand" href="/"><Logo /><Wordmark /></a><p className="footer-location"><MapPin size={16}/>{lang === 'en' ? business.address : business.addressTe}</p></div><div><h3>{t(uiCopy.ui_090.en, uiCopy.ui_090.te)}</h3>{['pan-card', 'passport', 'gst-registration', 'food-license', 'itr-filing'].map(slug => { const s = services.find(x => x.slug === slug)!; return <a key={slug} href={`/services/${slug}`}>{s.name[lang]}</a>; })}</div><div><h3>{t(uiCopy.ui_091.en, uiCopy.ui_091.te)}</h3><a href="/updates">{t(uiCopy.ui_092.en, uiCopy.ui_092.te)}</a><a href="/jobs">{t(uiCopy.ui_093.en, uiCopy.ui_093.te)}</a><a href="/services#category-4">{t(uiCopy.ui_094.en, uiCopy.ui_094.te)}</a><a href="/about">{t(uiCopy.ui_095.en, uiCopy.ui_095.te)}</a><a href="/contact">{t(uiCopy.ui_006.en, uiCopy.ui_006.te)}</a></div><div><h3>{t(uiCopy.ui_096.en, uiCopy.ui_096.te)}</h3><button onClick={() => assist()}><WhatsAppIcon size={16}/>{t(uiCopy.ui_097.en, uiCopy.ui_097.te)}</button><a href="/apply">{t(uiCopy.ui_009.en, uiCopy.ui_009.te)}<ArrowUpRight size={15}/></a><InstallButton /></div></div><div className="footer-disclaimer">{t(uiCopy.ui_098.en, uiCopy.ui_098.te)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} KING e-Seva Services</span><div><a href="/privacy">{t(uiCopy.ui_099.en, uiCopy.ui_099.te)}</a><a href="/terms">{t(uiCopy.ui_100.en, uiCopy.ui_100.te)}</a><a href="/disclaimer">{t(uiCopy.ui_101.en, uiCopy.ui_101.te)}</a></div><span>{t(uiCopy.ui_102.en, uiCopy.ui_102.te)}</span></div></footer><div className="mobile-quick"><a href="/services"><Layers3 />{t(uiCopy.ui_002.en, uiCopy.ui_002.te)}</a><button onClick={() => assist()}><WhatsAppIcon />{t(uiCopy.ui_103.en, uiCopy.ui_103.te)}</button><a href={business.phoneNumber ? `tel:${business.phoneNumber}` : '/contact'}><Phone />{t(uiCopy.ui_104.en, uiCopy.ui_104.te)}</a><a href="/apply"><ArrowUpRight />{t(uiCopy.ui_105.en, uiCopy.ui_105.te)}</a></div><KingChat lang={lang} portalUrl={business.customerPortalUrl}/></>; }
interface InstallEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: string;
    }>;
}
function InstallButton() { const { t } = useSite(); const [prompt, setPrompt] = useState<InstallEvent | null>(null); const [help, setHelp] = useState(false); useEffect(() => { const fn = (e: Event) => { e.preventDefault(); setPrompt(e as InstallEvent); }; window.addEventListener('beforeinstallprompt', fn); return () => window.removeEventListener('beforeinstallprompt', fn); }, []); return <><button onClick={async () => { if (prompt) {
    await prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
}
else
    setHelp(!help); }}><Download size={16}/>{t(uiCopy.ui_107.en, uiCopy.ui_107.te)}</button>{help && <p className="install-help">{t(uiCopy.ui_108.en, uiCopy.ui_108.te)}</p>}</>; }
function ServicePage({ service: s }: {
    service: Service;
}) { const { t, lang, assist } = useSite(); return <><section className="detail-hero section"><a className="breadcrumb" href="/services">{t(uiCopy.ui_002.en, uiCopy.ui_002.te)} / {categories[s.category].name[lang]}</a><Eyebrow>{t(uiCopy.ui_109.en, uiCopy.ui_109.te)}</Eyebrow><h1>{s.name[lang]}<em> {t(uiCopy.ui_110.en, uiCopy.ui_110.te)}</em></h1><p>{s.summary[lang]}</p><div className="hero-buttons"><Btn href={`/apply?service=${s.slug}`}>{t(uiCopy.ui_111.en, uiCopy.ui_111.te)}<ArrowUpRight size={17}/></Btn><Btn secondary onClick={() => assist(s.name[lang])}><WhatsAppIcon size={17}/>{t(uiCopy.ui_112.en, uiCopy.ui_112.te)}</Btn></div></section><section className="detail-body section"><div className="detail-main"><article><h2>{t(uiCopy.ui_113.en, uiCopy.ui_113.te)}</h2><p>{s.audience[lang]}</p></article><DocumentChecklist service={s} lang={lang}/><article><h2>{t(uiCopy.ui_119.en, uiCopy.ui_119.te)}</h2><ol><li>{t(uiCopy.ui_120.en, uiCopy.ui_120.te)}</li><li>{t(uiCopy.ui_121.en, uiCopy.ui_121.te)}</li><li>{t(uiCopy.ui_122.en, uiCopy.ui_122.te)}</li><li>{t(uiCopy.ui_123.en, uiCopy.ui_123.te)}</li></ol></article><article><h2>{t(uiCopy.ui_124.en, uiCopy.ui_124.te)}</h2><p>{t(uiCopy.ui_125.en, uiCopy.ui_125.te)}</p>{s.slug === 'aadhaar-assistance' && <p>{t(uiCopy.ui_126.en, uiCopy.ui_126.te)}</p>}</article><article><h2>{t(uiCopy.ui_127.en, uiCopy.ui_127.te)}</h2>{[[t(uiCopy.ui_128.en, uiCopy.ui_128.te), t(uiCopy.ui_129.en, uiCopy.ui_129.te)], [t(uiCopy.ui_130.en, uiCopy.ui_130.te), t(uiCopy.ui_131.en, uiCopy.ui_131.te)], [t(uiCopy.ui_132.en, uiCopy.ui_132.te), t(uiCopy.ui_133.en, uiCopy.ui_133.te)]].map(([q, a]) => <details className="faq" key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</article></div><aside className="detail-aside"><ShieldCheck size={30}/><h3>{t(uiCopy.ui_134.en, uiCopy.ui_134.te)}</h3><p>{s.source ? t(uiCopy.ui_135.en, uiCopy.ui_135.te) : t("Contact KING to confirm the relevant provider and current requirements.", "సంబంధిత సంస్థ, ప్రస్తుత అవసరాలను నిర్ధారించడానికి కింగ్‌ను సంప్రదించండి.")}</p><hr /><button className="text-link" onClick={() => assist(s.name[lang])}><WhatsAppIcon size={18}/>{t(uiCopy.ui_137.en, uiCopy.ui_137.te)}</button></aside></section></>; }
function ApplyPage() { const { t, lang, business, assist } = useSite(); const [chosen, setChosen] = useState(''); const [ready, setReady] = useState(false); useEffect(() => { const slug = new URLSearchParams(location.search).get('service'); if (slug && services.some(s => s.slug === slug))
    setChosen(slug); }, []); const s = services.find(s => s.slug === chosen); return <section className="apply-page section"><div><Eyebrow>{t(uiCopy.ui_138.en, uiCopy.ui_138.te)}</Eyebrow><h1>{t(uiCopy.ui_139.en, uiCopy.ui_139.te)}<br /><em>{t(uiCopy.ui_140.en, uiCopy.ui_140.te)}</em></h1><p>{t(uiCopy.ui_141.en, uiCopy.ui_141.te)}</p><div className="application-note"><ShieldCheck size={22}/><p>{t(uiCopy.ui_142.en, uiCopy.ui_142.te)}</p></div></div><form className="enquiry-form" onSubmit={e => { e.preventDefault(); if (!business.customerPortalUrl || !s) return; const target = new URL(business.customerPortalUrl); if (!["http:","https:"].includes(target.protocol)) return; target.searchParams.set("portal","customer"); target.searchParams.set("intent","request"); target.searchParams.set("service",s.name.en); window.location.assign(target.href); }}><span className="form-step">01 / 02</span><h2>{t(uiCopy.ui_143.en, uiCopy.ui_143.te)}</h2><label htmlFor="service-choice">{t(uiCopy.ui_144.en, uiCopy.ui_144.te)}</label><select id="service-choice" required value={chosen} onChange={e => { setChosen(e.target.value); setReady(false); }}><option value="">{t(uiCopy.ui_145.en, uiCopy.ui_145.te)}</option>{categories.map((c, i) => <optgroup label={c.name[lang]} key={i}>{services.filter(s => s.category === i).map(s => <option value={s.slug} key={s.slug}>{s.name[lang]}</option>)}</optgroup>)}</select><p>{t(uiCopy.ui_146.en, uiCopy.ui_146.te)}</p>{s && <a className="text-link" href={`/services/${s.slug}#documents`}>{t("View document checklist", "పత్రాల జాబితా చూడండి")}<FileText size={15}/></a>}<button className="btn btn-gold" type="submit">{t(uiCopy.ui_147.en, uiCopy.ui_147.te)}<ArrowRight size={18}/></button>{ready && s && <div className="prepared" role="status"><span className="form-step">02 / 02</span><h3>{t(uiCopy.ui_148.en, uiCopy.ui_148.te)}</h3><p>{messageFor(s.name[lang], lang)}</p><Btn onClick={() => assist(s.name[lang])}><WhatsAppIcon size={17}/>{t(uiCopy.ui_149.en, uiCopy.ui_149.te)}</Btn><small>{business.whatsappNumber ? t(uiCopy.ui_150.en, uiCopy.ui_150.te) : t(uiCopy.ui_151.en, uiCopy.ui_151.te)}</small></div>}</form></section>; }
function Contact() { const { t, lang, business, assist } = useSite(); return <section className="contact-page section"><Eyebrow>{t(uiCopy.ui_152.en, uiCopy.ui_152.te)}</Eyebrow><h1>{t(uiCopy.ui_153.en, uiCopy.ui_153.te)}<br /><em>{t(uiCopy.ui_154.en, uiCopy.ui_154.te)}</em></h1><p className="page-lead">{t(uiCopy.ui_155.en, uiCopy.ui_155.te)}</p><div className="contact-grid"><article><WhatsAppIcon /><h2>{t(uiCopy.ui_156.en, uiCopy.ui_156.te)}</h2><p>{t(uiCopy.ui_157.en, uiCopy.ui_157.te)}</p><Btn onClick={() => assist()}>{t(uiCopy.ui_019.en, uiCopy.ui_019.te)}<ArrowUpRight size={17}/></Btn></article><article><MapPin /><h2>{t(uiCopy.ui_158.en, uiCopy.ui_158.te)}</h2><p>{lang === 'en' ? business.address : business.addressTe}</p><small>{t(uiCopy.ui_159.en, uiCopy.ui_159.te)}</small></article><article><Phone /><h2>{t(uiCopy.ui_160.en, uiCopy.ui_160.te)}</h2>{business.phoneNumber ? <a className="text-link" href={`tel:${business.phoneNumber}`}>{business.phoneNumber}</a> : <p>{t(uiCopy.ui_161.en, uiCopy.ui_161.te)}</p>}{business.email && <a className="text-link" href={`mailto:${business.email}`}><Mail size={16}/>{business.email}</a>}</article></div></section>; }
function Legal({ kind }: {
    kind: string;
}) { const { t } = useSite(); const title = kind === 'privacy' ? t(uiCopy.ui_099.en, uiCopy.ui_099.te) : kind === 'terms' ? t(uiCopy.ui_100.en, uiCopy.ui_100.te) : t(uiCopy.ui_101.en, uiCopy.ui_101.te); const copy = kind === 'privacy' ? [[t(uiCopy.ui_162.en, uiCopy.ui_162.te), t(uiCopy.ui_163.en, uiCopy.ui_163.te)], [t(uiCopy.ui_164.en, uiCopy.ui_164.te), t(uiCopy.ui_165.en, uiCopy.ui_165.te)], [t(uiCopy.ui_166.en, uiCopy.ui_166.te), t(uiCopy.ui_167.en, uiCopy.ui_167.te)], [t(uiCopy.ui_168.en, uiCopy.ui_168.te), t(uiCopy.ui_169.en, uiCopy.ui_169.te)]] : kind === 'terms' ? [[t(uiCopy.ui_170.en, uiCopy.ui_170.te), t(uiCopy.ui_171.en, uiCopy.ui_171.te)], [t(uiCopy.ui_172.en, uiCopy.ui_172.te), t(uiCopy.ui_173.en, uiCopy.ui_173.te)], [t(uiCopy.ui_174.en, uiCopy.ui_174.te), t(uiCopy.ui_175.en, uiCopy.ui_175.te)]] : [[t(uiCopy.ui_176.en, uiCopy.ui_176.te), t(uiCopy.ui_177.en, uiCopy.ui_177.te)], [t(uiCopy.ui_178.en, uiCopy.ui_178.te), t(uiCopy.ui_179.en, uiCopy.ui_179.te)], [t(uiCopy.ui_180.en, uiCopy.ui_180.te), t(uiCopy.ui_181.en, uiCopy.ui_181.te)]]; return <section className="legal-page section"><Eyebrow>{t(uiCopy.ui_182.en, uiCopy.ui_182.te)}</Eyebrow><h1>{title}</h1>{copy.map(([h, p]) => <article key={h}><h2>{h}</h2><p>{p}</p></article>)}<a className="text-link" href="/contact">{t(uiCopy.ui_183.en, uiCopy.ui_183.te)}<ArrowUpRight size={17}/></a></section>; }
function StyleTile() { const { t } = useSite(); return <section className="style-tile section"><Eyebrow>{t(uiCopy.ui_184.en, uiCopy.ui_184.te)}</Eyebrow><h1>{t(uiCopy.ui_185.en, uiCopy.ui_185.te)}<br /><em>{t(uiCopy.ui_186.en, uiCopy.ui_186.te)}</em></h1><div className="tile-brand"><Logo /><Wordmark /></div><div className="swatches">{[['Midnight', '#081725'], ['Royal navy', '#10273D'], ['Champagne gold', '#D8BB7D'], ['Warm white', '#F4F1E9'], ['Active cyan', '#43D8D5']].map(([n, c]) => <div key={n}><span style={{ background: c }}/><b>{n}</b><code>{c}</code></div>)}</div><div className="tile-type"><h2>Manrope / <em>Georgia Italic</em></h2><p>{t(uiCopy.ui_187.en, uiCopy.ui_187.te)}</p><p lang="te">Noto Sans Telugu</p></div><div className="hero-buttons"><Btn href="/apply">{t(uiCopy.ui_009.en, uiCopy.ui_009.te)}<ArrowUpRight size={17}/></Btn><Btn href="/services" secondary>{t(uiCopy.ui_040.en, uiCopy.ui_040.te)}</Btn></div><p>{t(uiCopy.ui_188.en, uiCopy.ui_188.te)}</p></section>; }
export function messageFor(service: string, lang: Lang) { return lang === 'en' ? `Hello KING e-Seva Services,\nI need assistance with ${service}.\nPlease tell me the required documents and process.` : `నమస్కారం కింగ్ ఈ-సేవ సర్వీసెస్,\nనాకు ${service} విషయంలో సహాయం కావాలి.\nఅవసరమైన పత్రాలు, ప్రక్రియ తెలియజేయండి.`; }
function AssistanceDialog({ service, close }: {
    service: string | null;
    close: () => void;
}) { const { t, lang } = useSite(); const ref = useRef<HTMLDialogElement>(null); const [copied, setCopied] = useState(false); useEffect(() => { if (service !== null) {
    setCopied(false);
    ref.current?.showModal();
}
else
    ref.current?.close(); }, [service]); return <dialog ref={ref} className="assistance-dialog" onCancel={close} onClick={e => { if (e.target === e.currentTarget)
    close(); }}><button className="dialog-close" onClick={close} aria-label={t(uiCopy.ui_189.en, uiCopy.ui_189.te)}><X /></button><WhatsAppIcon className="gold" size={30}/><h2>{t(uiCopy.ui_190.en, uiCopy.ui_190.te)}</h2><p>{t(uiCopy.ui_191.en, uiCopy.ui_191.te)}</p><textarea readOnly aria-label={t(uiCopy.ui_192.en, uiCopy.ui_192.te)} value={messageFor(service || t(uiCopy.ui_193.en, uiCopy.ui_193.te), lang)}/><Btn onClick={async () => { try {
    await navigator.clipboard.writeText(messageFor(service || t(uiCopy.ui_193.en, uiCopy.ui_193.te), lang));
    setCopied(true);
}
catch {
    ref.current?.querySelector('textarea')?.select();
} }}>{copied ? <Check size={18}/> : <ClipboardList size={18}/>} {copied ? t(uiCopy.ui_194.en, uiCopy.ui_194.te) : t(uiCopy.ui_195.en, uiCopy.ui_195.te)}</Btn><a className="text-link" href="/contact">{t(uiCopy.ui_196.en, uiCopy.ui_196.te)}<ArrowUpRight size={16}/></a></dialog>; }
export function App({ path = '/', initialBusiness = defaultBusiness, initialUpdates = [] }: {
    path?: string;
    initialBusiness?: Business;
    initialUpdates?: Update[];
}) {
    const [lang, setLanguage] = useState<Lang>('en');
    const [business, setBusiness] = useState<Business>(initialBusiness);
    const [updates, setUpdates] = useState<Update[]>([]);
    const [updatesError, setUpdatesError] = useState(false);
    useEffect(() => {
      let live = true;
      const refresh = async () => { try {
        const response = await fetch('/api/customer/website-updates', {cache:'no-store'});
        if (!response.ok) throw new Error();
        const rows: unknown = await response.json(); if (!Array.isArray(rows)) throw new Error();
        if (live) { setUpdates(rows.filter(u=>u?.title?.en&&u?.title?.te&&u?.summary?.en&&u?.eligibility?.en));setUpdatesError(false); }
      } catch { if(live){setUpdates([]);setUpdatesError(true);} } };
      void refresh(); const timer=setInterval(refresh,60000);
      return()=>{live=false;clearInterval(timer);};
    },[]);
    const [dialog, setDialog] = useState<string | null>(null);
    const [offline, setOffline] = useState(false);
    const t = (en: string, te: string) => lang === 'en' ? en : te;
    useEffect(() => { try {
        const l = localStorage.getItem('king-language');
        if (l === 'te')
            setLanguage(l);
    }
    catch { } fetch('/business.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : Promise.reject()).then(setBusiness).catch(() => { });
    const online = () => setOffline(!navigator.onLine); online(); addEventListener('online', online); addEventListener('offline', online); return () => { removeEventListener('online', online); removeEventListener('offline', online); }; }, []);
    useEffect(() => { document.documentElement.lang = lang; }, [lang]);
    const setLang = (l: Lang) => { setLanguage(l); try {
        localStorage.setItem('king-language', l);
    }
    catch { } };
    const assist = (service = t(uiCopy.ui_193.en, uiCopy.ui_193.te)) => { const number = business.whatsappNumber.replace(/\D/g, ''); if (/^[1-9]\d{7,14}$/.test(number))
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(messageFor(service, lang))}`, '_blank', 'noopener,noreferrer');
    else
        setDialog(service); };
    const normalized = path.replace(/\/$/, '') || '/';
    const service = services.find(s => normalized === `/services/${s.slug}`);
    let page: ReactNode;
    if (normalized === '/')
        page = <><Intro /><Hero /><div className="service-ribbon"><span>{t(uiCopy.ui_197.en, uiCopy.ui_197.te)}</span><i /><span>{t(uiCopy.ui_198.en, uiCopy.ui_198.te)}</span><i /><span>{t(uiCopy.ui_199.en, uiCopy.ui_199.te)}</span><i /><span>{t(uiCopy.ui_200.en, uiCopy.ui_200.te)}</span><i /><span>{t(uiCopy.ui_201.en, uiCopy.ui_201.te)}</span></div><ServicesSection /><Process /><Updates updates={updates}/><AboutSection /><CTA /></>;
    else if (normalized === '/services')
        page = <ServicesSection full/>;
    else if (service)
        page = <ServicePage service={service}/>;
    else if (normalized === '/updates' || normalized === '/jobs')
        page = <Updates full jobs={normalized === '/jobs'} updates={updates}/>;
    else if (normalized === '/about')
        page = <><AboutSection full/><Process /><CTA /></>;
    else if (normalized === '/contact')
        page = <Contact />;
    else if (normalized === '/apply')
        page = <ApplyPage />;
    else if (['/privacy', '/terms', '/disclaimer'].includes(normalized))
        page = <Legal kind={normalized.slice(1)}/>;
    else if (normalized === '/style-tile')
        page = <StyleTile />;
    else
        page = <section className="not-found section"><Eyebrow>404</Eyebrow><h1>{t(uiCopy.ui_202.en, uiCopy.ui_202.te)}<br /><em>{t(uiCopy.ui_203.en, uiCopy.ui_203.te)}</em></h1><Btn href="/services">{t(uiCopy.ui_089.en, uiCopy.ui_089.te)}<ArrowRight size={17}/></Btn></section>;
    return <Ctx.Provider value={{ lang, t, business, assist }}><a className="skip-link" href="#main">{t(uiCopy.ui_204.en, uiCopy.ui_204.te)}</a><Header lang={lang} setLang={setLang}/>{offline && <div className="offline-bar" role="status"><WifiOff size={16}/>{t(uiCopy.ui_205.en, uiCopy.ui_205.te)}</div>}<main id="main" className={normalized === '/' ? 'home-main' : 'inner-main'}>{updatesError && <p role="status">{t("Live updates temporarily unavailable. Please retry shortly.","తాజా సమాచారం ప్రస్తుతం అందడం లేదు. కొద్దిసేపటి తర్వాత ప్రయత్నించండి.")}</p>}{page}</main><WebsiteBridge business={business} service={service} te={lang==='te'}/><Footer /><AssistanceDialog service={dialog} close={() => setDialog(null)}/></Ctx.Provider>;
}
