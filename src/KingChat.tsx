import { useEffect, useRef, useState } from 'react';
import { Crown, X, Send, MoreVertical, ArrowDown } from 'lucide-react';
import type { Lang } from './types';
import { detectChatLanguage, requestedChatLanguage, containsSensitiveChatData, formatChatText } from './chat-policy.mjs';
import { services as catalogueServices } from './data';
import { guideFor } from './document-guide';

type Service = { id: number; service_name: string; slug?: string };
type Message = { id: string; sender: 'user' | 'ai'; text: string; time: string; private?: boolean; service?: Service; context?: string[] };
type Customer = { customer_name: string; mobile: string };
type Step = 'idle' | 'name' | 'mobile' | 'confirm' | 'done';

const consentVersion = 'gemini-chat-v1';
const CONSENT_STORAGE_KEY = 'king-ai-consent-status';

const localServicesList: Service[] = catalogueServices.map((s, idx) => ({
  id: idx + 1,
  service_name: s.name.en,
  slug: s.slug
}));

const makeMessage = (sender: Message['sender'], text: string, extra: Partial<Message> = {}): Message => ({
  id: crypto.randomUUID(),
  sender,
  text,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  ...extra
});

function generateSmartAnswer(question: string, lang: Lang): { answer: string; matchedService: Service | null } {
  const q = question.toLowerCase().trim();
  const te = lang === 'te';

  // 1. Greetings
  if (/^(hi|hello|hey|namaste|namaskaram|నమస్తే|నమస్కారం|హలో|హాయ్)[.!\s]*$/i.test(q)) {
    return {
      answer: te
        ? 'నమస్కారం! నేను KING e-Seva AI అసిస్టెంట్‌ని. ఆధార్, పాన్ కార్డు, పాస్‌పోర్ట్, డ్రైవింగ్ లైసెన్స్, ధరణి/రెవెన్యూ, పీఎఫ్, జాబ్ అప్లికేషన్లు లేదా ఇతర సేవల గురించి ఏ సందేహం ఉన్నా అడగండి.'
        : 'Hello! I am your KING e-Seva AI assistant. Feel free to ask about any government services, document checklists, PAN, Passport, Ration card, Dharani, job applications, or other digital services.',
      matchedService: null
    };
  }

  // 2. Contact / Timing / Address
  if (/timing|time|hours|contact|phone|number|address|location|ఎక్కడ|ఫోన్|సమయం|అడ్రస్|నంబర్/i.test(q)) {
    return {
      answer: te
        ? '🏢 **KING e-Seva Services**\n📍 Ghanpur (Station), Jangaon District, Telangana.\n📞 **ఫోన్ / WhatsApp:** +91 8501810250\n⏰ **పనివేళలు:** సోమవారం నుండి శనివారం ఉదయం 9:00 నుండి రాత్రి 8:00 వరకు.\n\nఏదైనా సేవ కోసం మీరు నేరుగా మా కేంద్రానికి రావచ్చు లేదా WhatsApp ద్వారా సంప్రదించవచ్చు.'
        : '🏢 **KING e-Seva Services**\n📍 Ghanpur (Station), Jangaon District, Telangana.\n📞 **Phone / WhatsApp:** +91 8501810250\n⏰ **Hours:** Monday to Saturday, 9:00 AM – 8:00 PM.\n\nVisit our center in Ghanpur (Station) or connect with us on WhatsApp for any assistance.',
      matchedService: null
    };
  }

  // 3. Service Matching across 99 services
  let matchedCatalogService: typeof catalogueServices[0] | null = null;
  let bestScore = 0;

  for (const s of catalogueServices) {
    let score = 0;
    const sNameEn = s.name.en.toLowerCase();
    const sNameTe = s.name.te.toLowerCase();
    const slugParts = s.slug.split('-');

    for (const part of slugParts) {
      if (part.length > 2 && q.includes(part)) score += 3;
    }
    if (q.includes(sNameEn)) score += 10;
    if (q.includes(sNameTe)) score += 10;

    // Common Telugu / English mappings
    if (/పాన్|pan/i.test(q) && s.slug === 'pan-card') score += 8;
    if (/ఆధార్|aadhaar|aadhar/i.test(q) && s.slug === 'aadhaar-assistance') score += 8;
    if (/పాస్‌పోర్ట్|passport/i.test(q) && s.slug === 'passport') score += 8;
    if (/ఓటర్|ఓటరు|voter/i.test(q) && s.slug === 'voter-id') score += 8;
    if (/రేషన్|రేషను|ration/i.test(q) && s.slug === 'ration-card-application') score += 8;
    if (/డ్రైవింగ్|లైసెన్స్|license|licence|driving/i.test(q) && s.slug === 'driving-licence') score += 8;
    if (/ధరణి|పహాణి|1b|dharani|pahani/i.test(q) && s.slug === 'pahani') score += 8;
    if (/పీఎఫ్|pf|epf/i.test(q) && s.slug === 'pf-claim') score += 8;
    if (/కిసాన్|kisan/i.test(q) && s.slug === 'pm-kisan') score += 8;
    if (/కల్యాణ|షాదీ|kalyana|shaadi/i.test(q) && s.slug === 'kalyana-lakshmi') score += 8;
    if (/ఆయుష్మాన్|ayushman/i.test(q) && s.slug === 'ayushman-bharat') score += 8;
    if (/జీఎస్టీ|gst/i.test(q) && s.slug === 'gst-registration') score += 8;
    if (/ఉద్యమ్|udyam/i.test(q) && s.slug === 'udyam') score += 8;
    if (/జాబ్|ఉద్యోగ|job|tspsc|rrb/i.test(q) && s.slug === 'government-jobs') score += 8;
    if (/స్కాలర్‌షిప్|scholarship/i.test(q) && s.slug === 'scholarships') score += 8;
    if (/తిరుపతి|దర్శనం|tirumala|tirupati/i.test(q) && s.slug === 'tirumala-booking') score += 8;

    if (score > bestScore) {
      bestScore = score;
      matchedCatalogService = s;
    }
  }

  if (matchedCatalogService && bestScore >= 3) {
    const guide = guideFor(matchedCatalogService);
    const sName = te ? matchedCatalogService.name.te : matchedCatalogService.name.en;
    const sSummary = te ? matchedCatalogService.summary.te : matchedCatalogService.summary.en;

    let docsText = '';
    if (guide && guide.groups && guide.groups.length > 0) {
      docsText = guide.groups
        .map(g => {
          const gTitle = te ? g.title.te : g.title.en;
          const gItems = g.items.map(it => `  • ${te ? it.te : it.en}`).join('\n');
          return `📌 **${gTitle}**:\n${gItems}`;
        })
        .join('\n\n');
    }

    const answer = te
      ? `**${sName}** సేవకు సంబంధించిన పూర్తి సమాచారం:\n\n${sSummary}\n\n📋 **అవసరమైన పత్రాలు (Required Documents):**\n${docsText || '• ఆధార్ కార్డు\n• సంబంధిత పత్రాలు'}\n\n💡 **దరఖాస్తు విధానం:**\nఈ సేవ కొరకు క్రింద ఉన్న **"Apply / Request Service"** బటన్ లేదా WhatsApp ద్వారా నేరుగా సంప్రదించండి. మా KING e-Seva బృందం మీ దరఖాస్తును పూర్తి చేస్తుంది.`
      : `Here are the details for **${sName}**:\n\n${sSummary}\n\n📋 **Required Documents:**\n${docsText || '• Aadhaar Card\n• Relevant supporting documents'}\n\n💡 **How to Apply:**\nClick **"Apply / Request Service"** below or contact us on WhatsApp (+91 8501810250) for fast assistance.`;

    const mappedService: Service = {
      id: catalogueServices.indexOf(matchedCatalogService) + 1,
      service_name: matchedCatalogService.name.en,
      slug: matchedCatalogService.slug
    };

    return { answer, matchedService: mappedService };
  }

  // 4. Default general guidance
  return {
    answer: te
      ? 'మీ ప్రశ్నను అర్థం చేసుకున్నాను. KING e-Seva లో మేము ప్రభుత్వ, బ్యాంకింగ్, పన్నులు, జాబ్ అప్లికేషన్లు మరియు ఆన్‌లైన్ సేవలను అందిస్తున్నాము.\n\nమీరు ఏ సేవ గురించి తెలుసుకోవాలనుకుంటున్నారో పేరు చెప్పండి (ఉదా: **పాన్ కార్డు, ఆధార్, పాస్‌పోర్ట్, రేషన్ కార్డు, ధరణి, డ్రైవింగ్ లైసెన్స్, పీఎఫ్, జాబ్ అప్లై**).\n\nలేదా మా హెల్ప్‌లైన్ **+91 8501810250** కి WhatsApp లో మెసేజ్ చేయవచ్చు.'
      : 'I understand your query. KING e-Seva provides 99+ digital and government services.\n\nPlease mention the specific service you need (e.g. **PAN card, Aadhaar, Passport, Ration card, Dharani, Driving Licence, PF, Job Applications**).\n\nYou can also contact our support directly on WhatsApp at **+91 8501810250**.',
    matchedService: null
  };
}

export function KingChat({ lang, portalUrl }: { lang: Lang; portalUrl?: string }) {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [consentReady, setConsentReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [menu, setMenu] = useState(false);
  const [language, setLanguage] = useState<Lang>(lang);
  const [account, setAccount] = useState<Customer | null>(null);
  const [accountBusy, setAccountBusy] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [services, setServices] = useState<Service[]>(localServicesList);
  const [selected, setSelected] = useState<Service | null>(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [context, setContext] = useState<string[]>([]);
  const [reference, setReference] = useState('');
  const [newMessages, setNewMessages] = useState(false);

  const panel = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const controller = useRef<AbortController | null>(null);
  const key = useRef('');
  const nearBottom = useRef(true);
  const forceBottom = useRef(false);
  const preference = useRef<Lang | null>(null);
  const latestService = useRef<Service | null>(null);
  const latestContext = useRef<string[]>([]);

  const t = (en: string, te: string) => (language === 'te' ? te : en);
  const push = (text: string) => setMessages(m => [...m, makeMessage('ai', text, { private: true })]);

  function bottom(smooth = true) {
    const box = log.current;
    if (!box) return;
    nearBottom.current = true;
    setNewMessages(false);
    requestAnimationFrame(() => {
      box.scrollTo({
        top: box.scrollHeight,
        behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'
      });
    });
  }

  useEffect(() => {
    if (open) panel.current?.show();
    else panel.current?.close();
  }, [open]);

  // Privacy & Consent Check (Offline & Static-friendly)
  useEffect(() => {
    if (!open) return;
    let active = true;

    // Check localStorage first
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(CONSENT_STORAGE_KEY) === 'true') {
        setAccepted(true);
        setConsentReady(true);
        return;
      }
    } catch {}

    // Background verify if server is available
    fetch('/api/customer/ai-consent')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (active) {
          if (d?.accepted === true) {
            setAccepted(true);
            try {
              localStorage.setItem(CONSENT_STORAGE_KEY, 'true');
            } catch {}
          }
          setConsentReady(true);
        }
      })
      .catch(() => {
        if (active) {
          setAccepted(false);
          setConsentReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !accepted) return;
    let active = true;
    fetch('/api/customer/session')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (active) setAccount(d?.customer || null);
      })
      .catch(() => {
        if (active) setAccount(null);
      });
    return () => {
      active = false;
    };
  }, [open, accepted]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      if (forceBottom.current || nearBottom.current) {
        bottom();
        forceBottom.current = false;
      } else setNewMessages(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, busy, error, step, reference, open]);

  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    const resize = () => {
      const height = vv?.height || window.innerHeight;
      const keyboard = height < window.innerHeight - 100;
      panel.current?.style.setProperty('--king-viewport-height', `${height}px`);
      panel.current?.style.setProperty('--king-keyboard-bottom', keyboard ? '8px' : '90px');
      panel.current?.style.setProperty('--king-viewport-top', `${vv?.offsetTop || 0}px`);
    };
    resize();
    vv?.addEventListener('resize', resize);
    vv?.addEventListener('scroll', resize);
    window.addEventListener('resize', resize);
    return () => {
      vv?.removeEventListener('resize', resize);
      vv?.removeEventListener('scroll', resize);
      window.removeEventListener('resize', resize);
    };
  }, [open]);

  useEffect(() => {
    const field = composer.current;
    if (field) {
      field.style.height = 'auto';
      field.style.height = Math.min(field.scrollHeight, 100) + 'px';
    }
  }, [input]);

  useEffect(() => () => controller.current?.abort(), []);

  function close() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setMenu(false);
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }

  function openPwaRequest(message: Message) {
    if (portalUrl && !portalUrl.includes('localhost') && ['http:', 'https:'].includes(new URL(portalUrl, window.location.origin).protocol)) {
      const target = new URL(portalUrl, window.location.origin);
      target.searchParams.set('portal', 'customer');
      target.searchParams.set('intent', 'request');
      target.searchParams.set('source', 'king-ai');
      if (message.service) {
        target.searchParams.set('service_id', String(message.service.id));
        target.searchParams.set('service', message.service.service_name);
      }
      window.location.assign(target.toString());
      return;
    }

    if (message.service) {
      const sName = message.service.service_name;
      const text = encodeURIComponent(`Hello KING e-Seva,\nI want to apply for: ${sName}.\nPlease guide me with the application process.`);
      window.open(`https://wa.me/918501810250?text=${text}`, '_blank');
    } else {
      window.location.assign('/apply');
    }
  }

  function clear() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setMessages([]);
    setInput('');
    setError('');
    setStep('idle');
    setSelected(null);
    setName('');
    setMobile('');
    setContext([]);
    setReference('');
    latestService.current = null;
    latestContext.current = [];
    preference.current = null;
    setLanguage('en');
    setMenu(false);
    setNewMessages(false);
    nearBottom.current = true;
  }

  async function accept() {
    setError('');
    setAccountBusy(true);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'true');
    } catch {}
    setAccepted(true);
    setConsentReady(true);
    setAccountBusy(false);

    // Notify backend if available
    fetch('/api/customer/ai-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'accept', version: consentVersion })
    }).catch(() => {});
  }

  async function withdraw() {
    clear();
    setAccepted(false);
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {}
    fetch('/api/customer/ai-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'withdraw' })
    }).catch(() => {});
  }

  async function beginRequest(service: Service, enquiry: string[]) {
    if (busy || accountBusy) return;
    setError('');
    setReference('');
    setSelected(service);
    setContext(enquiry);
    key.current = crypto.randomUUID();
    setInput('');
    setMenu(false);
    forceBottom.current = true;
    setAccountBusy(true);

    try {
      const r = await fetch('/api/customer/chat-catalogue').catch(() => null);
      if (r && r.ok) {
        const d = await r.json().catch(() => null);
        if (d && d.success && Array.isArray(d.services)) {
          setServices(d.services);
        }
      }
      if (account) {
        setName(account.customer_name);
        setMobile(account.mobile);
        setStep('confirm');
        push(t('Your enquiry is ready. Please review the service and details before sending.', 'మీ enquiry సిద్ధంగా ఉంది. Service, వివరాలు చూసి Send Request చేయండి.'));
      } else {
        setName('');
        setMobile('');
        setStep('name');
        push(t('Of course. What name should our KING team use for your enquiry?', 'తప్పకుండా. మీ పేరు చెప్పగలరా?'));
      }
      setTimeout(() => composer.current?.focus({ preventScroll: true }), 0);
    } catch {
      setStep('name');
      push(t('What name should our KING team use for your enquiry?', 'మీ పేరు చెప్పగలరా?'));
    } finally {
      setAccountBusy(false);
    }
  }

  function cancelRequest() {
    setStep('idle');
    setName('');
    setMobile('');
    setReference('');
    setInput('');
    setError('');
    push(t('Request cancelled. You can continue asking questions.', 'Request cancel అయింది. మీ ప్రశ్నలు అడగవచ్చు.'));
  }

  async function submit() {
    if (accountBusy || !selected || reference || step !== 'confirm') return;
    setAccountBusy(true);
    setError('');

    try {
      const r = await fetch('/api/customer/chat-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          mobile,
          service_id: selected.id,
          enquiry_messages: context,
          source: 'WEBSITE_AI_CHAT',
          confirmed: true,
          idempotency_key: key.current,
          website: ''
        })
      });
      const d = await r.json();
      if (!r.ok || !d.success || !d.application?.application_no) throw new Error(d.error || 'Request was not confirmed.');
      setReference(d.application.application_no);
      setStep('done');
      push(
        t(
          `Thank you${name ? ', ' + name : ''}. Your enquiry was sent to KING team. Reference: ${d.application.application_no}. This is an enquiry, not an official application.`,
          `ధన్యవాదాలు${name ? ' ' + name + ' గారు' : ''}. మీ enquiry KING teamకి పంపించాం. Reference: ${d.application.application_no}. ఇది enquiry మాత్రమే; official application కాదు.`
        )
      );
    } catch {
      // Local fallback for static site: Prepare WhatsApp submission
      const localRef = `KING-${Date.now().toString().slice(-6)}`;
      setReference(localRef);
      setStep('done');
      const waText = encodeURIComponent(
        `Hello KING e-Seva Services,\n\nEnquiry Details:\nName: ${name}\nMobile: ${mobile}\nService: ${selected.service_name}\nEnquiry: ${context.join(' · ')}\nReference: ${localRef}`
      );
      push(
        t(
          `Thank you${name ? ', ' + name : ''}! Your enquiry has been prepared (Ref: ${localRef}). Opening WhatsApp to connect with KING team...`,
          `ధన్యవాదాలు${name ? ' ' + name + ' గారు' : ''}! మీ enquiry సిద్ధమైంది (Ref: ${localRef}). మా KING బృందాన్ని సంప్రదించడానికి WhatsApp ఓపెన్ చేస్తున్నాము...`
        )
      );
      window.open(`https://wa.me/918501810250?text=${waText}`, '_blank');
    } finally {
      setAccountBusy(false);
    }
  }

  async function send() {
    const question = input.trim();
    if (!accepted || !question || busy || accountBusy) return;
    setError('');

    if (step === 'name' || step === 'mobile') {
      if (/^(cancel|వద్దు|రద్దు)$/i.test(question)) {
        cancelRequest();
        return;
      }
      if (step === 'name') {
        if (question.length < 2 || question.length > 80 || /[\d<>\r\n]/.test(question) || !/[\p{L}]/u.test(question)) {
          setError(t('Please enter your name only, or Cancel.', 'మీ పేరు మాత్రమే చెప్పండి, లేదా Cancel చేయండి.'));
          return;
        }
        setName(question);
        setMessages(m => [
          ...m,
          makeMessage('user', question, { private: true }),
          makeMessage('ai', t(`Thank you, ${question}. What is your 10-digit mobile number? This goes only to KING for your enquiry.`, `ధన్యవాదాలు ${question} గారు. మీ 10-digit mobile number చెప్పగలరా? ఇది మీ enquiry కోసం KING వద్ద మాత్రమే ఉంటుంది.`), {
            private: true
          })
        ]);
        setStep('mobile');
      } else {
        const digits = question.replace(/[\s()-]/g, '').replace(/^\+91/, '');
        if (!/^[6-9][0-9]{9}$/.test(digits)) {
          setError(t('Please enter a valid 10-digit Indian mobile number.', 'సరైన 10-digit Indian mobile number చెప్పండి.'));
          return;
        }
        setMobile(digits);
        setMessages(m => [
          ...m,
          makeMessage('user', digits, { private: true }),
          makeMessage('ai', t('Please review your enquiry. Nothing is sent until you choose Send Request.', 'మీ enquiry వివరాలు చూడండి. Send Request చేసిన తర్వాతే KING teamకి వెళ్తుంది.'), {
            private: true
          })
        ]);
        setStep('confirm');
      }
      setInput('');
      forceBottom.current = true;
      return;
    }

    if (step === 'confirm') {
      setError(t('Review and send the enquiry, or Cancel to continue chatting.', 'Enquiry చూసి పంపండి, లేదా Cancel చేసి chat కొనసాగించండి.'));
      return;
    }

    if (containsSensitiveChatData(question) || /\b[6-9]\d{9}\b/.test(question)) {
      setError(t('Do not send contact or sensitive details in general chat. Use Request Service for contact details.', 'General chatలో contact లేదా sensitive వివరాలు పంపకండి. Contact వివరాలకు Request Service వాడండి.'));
      return;
    }

    const requested = requestedChatLanguage(question);
    if (requested) preference.current = requested;
    const detected = detectChatLanguage(question, preference.current, language);
    setLanguage(detected);

    if (latestService.current && /^(?:apply|apply cheyali|apply చేయాలి|request|send request|దరఖాస్తు చేయాలి)[.!\s]*$/i.test(question)) {
      setMessages(m => [...m, makeMessage('user', question)]);
      await beginRequest(latestService.current, latestContext.current);
      return;
    }

    const user = makeMessage('user', question);
    setMessages(m => [...m, user]);
    setInput('');
    setBusy(true);
    forceBottom.current = true;

    // Check remote backend or fall back to intelligent built-in engine
    try {
      const abort = new AbortController();
      controller.current = abort;
      const history = messages.filter(m => !m.private).slice(-10).map(({ sender, text }) => ({ sender, text }));

      const response = await fetch('/api/customer/website-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abort.signal,
        body: JSON.stringify({
          prompt: question,
          chatHistory: history,
          language: detected,
          language_mode: 'auto',
          language_preference: preference.current,
          consent: consentVersion
        })
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json().catch(() => null);
        if (data && data.success && typeof data.answer === 'string') {
          if (controller.current === abort) {
            setMessages(m => [...m, makeMessage('ai', data.answer)]);
            if (!preference.current && /[\u0C00-\u0C7F]/.test(data.answer)) setLanguage('te');
          }
          return;
        }
      }

      // Static & Offline Smart Answer Engine
      const { answer, matchedService } = generateSmartAnswer(question, detected);
      const enquiry = matchedService ? (requested ? latestContext.current : [question]) : [];
      latestService.current = matchedService;
      latestContext.current = enquiry;

      if (controller.current === abort) {
        setMessages(m => [...m, makeMessage('ai', answer, { service: matchedService || undefined, context: enquiry })]);
        if (!preference.current && /[\u0C00-\u0C7F]/.test(answer)) setLanguage('te');
      }
    } catch {
      // Local fallback on any abort or network error
      const { answer, matchedService } = generateSmartAnswer(question, detected);
      setMessages(m => [...m, makeMessage('ai', answer, { service: matchedService || undefined })]);
    } finally {
      controller.current = null;
      setBusy(false);
    }
  }

  const activeRequest = step === 'name' || step === 'mobile' || step === 'confirm';

  return (
    <>
      <button ref={launcher} className="king-chat-launch" onClick={() => setOpen(v => !v)} aria-haspopup="dialog" aria-expanded={open} aria-controls="king-chat-panel">
        <Crown size={23} />
        <span>
          <small>Ask</small>
          <strong>KING AI</strong>
        </span>
      </button>

      <dialog
        ref={panel}
        id="king-chat-panel"
        className="king-chat-dialog"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            if (menu) setMenu(false);
            else close();
          }
        }}
        onCancel={e => {
          e.preventDefault();
          close();
        }}
        aria-labelledby="king-chat-title"
      >
        <header>
          <div>
            <Crown size={22} />
            <h2 id="king-chat-title">KING AI</h2>
          </div>
          <div>
            <button onClick={() => setMenu(v => !v)} aria-label="Chat options" aria-expanded={menu}>
              <MoreVertical size={20} />
            </button>
            <button onClick={close} aria-label="Close chat">
              <X size={22} />
            </button>
          </div>
        </header>

        {menu && (
          <nav className="king-chat-menu" aria-label="Chat options">
            <button onClick={clear}>Clear Chat</button>
            <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>
            <a href="/terms" target="_blank" rel="noopener">Terms</a>
            <button disabled={accountBusy} onClick={() => void withdraw()}>Withdraw AI Consent</button>
            <a href="/contact">Contact Support</a>
            {account && <a href={portalUrl || '/apply'}>My Applications / Track</a>}
          </nav>
        )}

        <div
          ref={log}
          className="king-chat-messages"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          onScroll={() => {
            const box = log.current;
            if (box) {
              nearBottom.current = box.scrollHeight - box.scrollTop - box.clientHeight < 72;
              if (nearBottom.current) setNewMessages(false);
            }
          }}
        >
          {!consentReady ? (
            <p role="status">Checking privacy settings…</p>
          ) : !accepted ? (
            <div className="king-chat-consent">
              <p>Your chat messages help us answer your queries about KING e-Seva services. Contact details collected for a request stay with KING. No marketing enrollment.</p>
              <p>Do not share OTPs, passwords, payment or identity numbers.</p>
              <p>
                <a href="/terms" target="_blank" rel="noopener">Terms</a> · <a href="/privacy" target="_blank" rel="noopener">Privacy</a>
              </p>
              <button disabled={accountBusy} onClick={() => void accept()}>
                Agree & continue
              </button>
              <button onClick={close}>Not now</button>
              {error && (
                <p role="alert">
                  {error}
                  <button disabled={accountBusy} onClick={() => void withdraw()}>
                    Retry withdrawal
                  </button>
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="king-chat-welcome">Hello! Ask me about services, documents, jobs or academy courses.</p>
              {messages.map((m, i) => (
                <div key={m.id} className={`king-chat-message ${m.sender}`}>
                  <p>{formatChatText(m.text)}</p>
                  {m.sender === 'ai' && !activeRequest && i === messages.length - 1 && (
                    <div className="king-chat-request-action">
                      <button className="king-chat-pwa-apply" disabled={busy || accountBusy} onClick={() => openPwaRequest(m)}>
                        {t('Apply / Request Service', 'Apply / Request Service')}
                      </button>
                      <small>{t('Connect with KING e-Seva team to start your service request.', 'KING e-Seva బృందంతో నేరుగా మాట్లాడి మీ దరఖాస్తును పూర్తి చేసుకోండి.')}</small>
                      {m.service && (
                        <button disabled={busy || accountBusy} onClick={() => void beginRequest(m.service!, m.context || [m.text])}>
                          Request in chat
                        </button>
                      )}
                    </div>
                  )}
                  <time>{m.time}</time>
                </div>
              ))}
              {busy && (
                <div className="king-chat-message ai king-chat-typing" role="status" aria-label="KING AI is typing">
                  <span />
                  <span />
                  <span />
                  <span className="king-sr-only">KING AI is typing</span>
                </div>
              )}
              {step === 'confirm' && selected && (
                <div className="king-chat-message ai king-chat-summary" aria-label="Enquiry confirmation">
                  <dl>
                    <dt>Name</dt>
                    <dd>{name}</dd>
                    <dt>Mobile</dt>
                    <dd>{mobile}</dd>
                    <dt>Service</dt>
                    <dd>
                      <span className="king-selected-name">{selected.service_name}</span>
                      <select
                        aria-label="Selected service"
                        disabled={accountBusy}
                        value={selected.id}
                        onChange={e => {
                          const s = services.find(s => s.id === Number(e.target.value));
                          if (s) {
                            setSelected(s);
                            key.current = crypto.randomUUID();
                          }
                        }}
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.service_name}
                          </option>
                        ))}
                      </select>
                    </dd>
                    <dt>Enquiry</dt>
                    <dd>{context.join(' · ')}</dd>
                  </dl>
                  <small>Only this enquiry goes to KING team. This is not an official application or payment.</small>
                  <div>
                    <button disabled={accountBusy} onClick={() => void submit()}>
                      Send Request
                    </button>
                    {!account && (
                      <button
                        disabled={accountBusy}
                        onClick={() => {
                          setStep('name');
                          setName('');
                          setMobile('');
                          key.current = crypto.randomUUID();
                          push(t('Please tell me the correct name.', 'సరైన పేరు చెప్పండి.'));
                        }}
                      >
                        Change details
                      </button>
                    )}
                    <button disabled={accountBusy} onClick={cancelRequest}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {(step === 'name' || step === 'mobile') && (
                <button className="king-chat-cancel" onClick={cancelRequest}>
                  Cancel request
                </button>
              )}
              {error && <p className="king-chat-error" role="alert">{error}</p>}
            </>
          )}
        </div>

        {accepted && newMessages && (
          <button className="king-chat-new" onClick={() => bottom()}>
            <ArrowDown size={14} />New messages
          </button>
        )}

        <form
          className="king-chat-composer"
          onSubmit={e => {
            e.preventDefault();
            void send();
          }}
        >
          <textarea
            ref={composer}
            aria-label="Your question"
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={step === 'name' ? 80 : step === 'mobile' ? 20 : 2000}
            rows={1}
            placeholder={step === 'name' ? t('Your name…', 'మీ పేరు…') : step === 'mobile' ? t('Mobile number…', 'Mobile number…') : 'Message KING AI…'}
            inputMode={step === 'mobile' ? 'tel' : 'text'}
            autoComplete="off"
            disabled={!accepted || busy || accountBusy || step === 'confirm'}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <button disabled={!accepted || busy || accountBusy || step === 'confirm' || !input.trim()} aria-label="Send">
            <Send size={20} />
          </button>
        </form>
      </dialog>
    </>
  );
}
