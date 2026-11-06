import type { Service, Localized } from './types';
import { extraCategories, catalogueEntries, legacyProfiles } from './service-catalogue';
import { checklistFor } from './document-checklists';
export const L = (en: string, te: string): Localized => ({ en, te });
export const categories = [
    { name: L('Government Services', 'ప్రభుత్వ సేవలు'), short: L('Government', 'ప్రభుత్వం'), desc: L('Everyday essentials, thoughtfully assisted.', 'అవసరమైన పౌర సేవలకు సులభమైన సహాయం.'), icon: 'landmark' },
    { name: L('Business Registrations', 'వ్యాపార నమోదులు'), short: L('Business', 'వ్యాపారం'), desc: L('Give your next ambition a clear beginning.', 'మీ వ్యాపార ప్రయాణానికి సరైన ప్రారంభం.'), icon: 'briefcase' },
    { name: L('Tax & Finance', 'పన్నులు & ఆర్థిక సేవలు'), short: L('Tax & Finance', 'పన్నులు & ఆర్థికం'), desc: L('Make sense of forms, filings and next steps.', 'ఫారమ్‌లు, దాఖలు ప్రక్రియపై స్పష్టమైన మార్గదర్శనం.'), icon: 'chart' },
    { name: L('Jobs & Applications', 'ఉద్యోగాలు & దరఖాస్తులు'), short: L('Jobs', 'ఉద్యోగాలు'), desc: L('Take the next step towards your opportunity.', 'మీ తదుపరి అవకాశానికి ముందడుగు వేయండి.'), icon: 'file' },
    { name: L('Education', 'విద్య'), short: L('Education', 'విద్య'), desc: L('A little guidance for a brighter tomorrow.', 'ఉజ్వల భవిష్యత్తుకు అవసరమైన మార్గదర్శనం.'), icon: 'graduation' },
    { name: L('Other Online Services', 'ఇతర ఆన్‌లైన్ సేవలు'), short: L('Online Services', 'ఆన్‌లైన్ సేవలు'), desc: L('One place for the digital things that matter.', 'మీకు అవసరమైన ఆన్‌లైన్ సేవలు ఒకే చోట.'), icon: 'globe' },
];
categories.push(...extraCategories);
const rows: [
    string,
    number,
    string,
    string,
    string,
    string,
    string,
    string
][] = [
    ['pan-card', 0, 'PAN Card', 'పాన్ కార్డు', 'Assistance with understanding PAN application and correction steps.', 'పాన్ దరఖాస్తు, సవరణ ప్రక్రియను అర్థం చేసుకోవడంలో సహాయం.', 'https://www.incometax.gov.in/', 'Income Tax Department'],
    ['passport', 0, 'Passport', 'పాస్‌పోర్ట్', 'Guidance through the passport application journey and official portal.', 'పాస్‌పోర్ట్ దరఖాస్తు ప్రక్రియ, అధికారిక పోర్టల్ వినియోగంలో మార్గదర్శనం.', 'https://www.passportindia.gov.in/', 'Passport Seva'],
    ['voter-id', 0, 'Voter ID', 'ఓటరు గుర్తింపు కార్డు', 'Assistance navigating voter services and application forms.', 'ఓటరు సేవలు, దరఖాస్తు ఫారమ్‌ల వినియోగంలో సహాయం.', 'https://voters.eci.gov.in/', 'Election Commission of India'],
    ['aadhaar-assistance', 0, 'Aadhaar-related Assistance', 'ఆధార్ సంబంధిత సహాయం', 'Help finding official Aadhaar information and the appropriate authorised channel.', 'అధికారిక ఆధార్ సమాచారం, తగిన అధీకృత సేవా కేంద్రాన్ని కనుగొనడంలో సహాయం.', 'https://uidai.gov.in/', 'UIDAI'],
    ['driving-licence', 0, 'Driving Licence', 'డ్రైవింగ్ లైసెన్స్', 'Guidance navigating official driving licence application services.', 'అధికారిక డ్రైవింగ్ లైసెన్స్ దరఖాస్తు సేవలపై మార్గదర్శనం.', 'https://parivahan.gov.in/', 'Parivahan'],
    ['rta-services', 0, 'RTA Services', 'రవాణా శాఖ సేవలు', 'Assistance finding the right transport service and application route.', 'సరైన రవాణా సేవ, దరఖాస్తు మార్గాన్ని కనుగొనడంలో సహాయం.', 'https://www.transport.telangana.gov.in/', 'Telangana Transport'],
    ['gst-registration', 1, 'GST Registration', 'జీఎస్టీ నమోదు', 'Understand the GST registration workflow and prepare for the official application.', 'జీఎస్టీ నమోదు ప్రక్రియను తెలుసుకొని అధికారిక దరఖాస్తుకు సిద్ధం కావడానికి సహాయం.', 'https://www.gst.gov.in/', 'GST Portal'],
    ['food-license', 1, 'Food Licence', 'ఆహార వ్యాపార లైసెన్స్', 'Guidance on the official food business registration and licensing portal.', 'ఆహార వ్యాపార నమోదు, లైసెన్సింగ్ అధికారిక పోర్టల్‌పై మార్గదర్శనం.', 'https://foscos.fssai.gov.in/', 'FSSAI FoSCoS'],
    ['labour-licence', 1, 'Labour Licence', 'కార్మిక లైసెన్స్', 'Help identifying the appropriate labour registration application.', 'తగిన కార్మిక నమోదు దరఖాస్తును గుర్తించడంలో సహాయం.', 'https://labour.telangana.gov.in/', 'Telangana Labour Department'],
    ['trade-licence', 1, 'Trade Licence', 'వాణిజ్య లైసెన్స్', 'Assistance identifying the relevant local authority and application process.', 'సంబంధిత స్థానిక సంస్థ, దరఖాస్తు ప్రక్రియను గుర్తించడంలో సహాయం.', 'https://www.telangana.gov.in/', 'Telangana Government'],
    ['udyam', 1, 'Udyam Registration', 'ఉద్యమ్ నమోదు', 'Guidance using the official enterprise registration portal.', 'అధికారిక సంస్థల నమోదు పోర్టల్ వినియోగంలో మార్గదర్శనం.', 'https://udyamregistration.gov.in/', 'Udyam Registration'],
    ['itr-filing', 2, 'ITR Filing', 'ఆదాయపు పన్ను రిటర్న్ దాఖలు', 'Help organising your filing enquiry and navigating the official income tax portal.', 'పన్ను రిటర్న్ విచారణను సిద్ధం చేయడం, అధికారిక ఆదాయపు పన్ను పోర్టల్ వినియోగంలో సహాయం.', 'https://www.incometax.gov.in/', 'Income Tax Department'],
    ['epf-services', 2, 'EPF Services', 'ఈపీఎఫ్ సేవలు', 'Assistance understanding the official member-service channels.', 'అధికారిక సభ్య సేవా మార్గాలను అర్థం చేసుకోవడంలో సహాయం.', 'https://www.epfindia.gov.in/', 'EPFO'],
    ['insurance', 2, 'Insurance Assistance', 'బీమా సహాయం', 'Help finding relevant information and the appropriate provider contact.', 'సంబంధిత సమాచారం, తగిన బీమా సంస్థ సంప్రదింపులు కనుగొనడంలో సహాయం.', 'https://irdai.gov.in/', 'IRDAI'],
    ['tax-assistance', 2, 'Tax-related Assistance', 'పన్ను సంబంధిత సహాయం', 'Guidance with online tax-service enquiries and document organisation.', 'ఆన్‌లైన్ పన్ను సేవల విచారణ, పత్రాల క్రమబద్ధీకరణలో మార్గదర్శనం.', 'https://www.incometax.gov.in/', 'Income Tax Department'],
    ['government-jobs', 3, 'Government Job Applications', 'ప్రభుత్వ ఉద్యోగ దరఖాస్తులు', 'Application assistance based on the recruiting authority’s published notification.', 'నియామక సంస్థ ప్రచురించిన నోటిఫికేషన్ ఆధారంగా దరఖాస్తు సహాయం.', 'https://www.tgpsc.gov.in/', 'Telangana Public Service Commission'],
    ['hall-tickets', 3, 'Hall Tickets', 'హాల్ టికెట్లు', 'Help locating the official hall-ticket download page for your examination.', 'మీ పరీక్షకు సంబంధించిన అధికారిక హాల్ టికెట్ పేజీని కనుగొనడంలో సహాయం.', 'https://www.tgpsc.gov.in/', 'Telangana Public Service Commission'],
    ['results', 3, 'Results', 'ఫలితాలు', 'Assistance finding results from the relevant official examination authority.', 'సంబంధిత అధికారిక పరీక్షా సంస్థ ఫలితాలను కనుగొనడంలో సహాయం.', 'https://www.tgpsc.gov.in/', 'Telangana Public Service Commission'],
    ['exams', 3, 'Exam Applications', 'పరీక్ష దరఖాస్తులు', 'Support navigating an examination’s official application instructions.', 'పరీక్ష అధికారిక దరఖాస్తు సూచనలపై సహాయం.', 'https://www.tgpsc.gov.in/', 'Telangana Public Service Commission'],
    ['recruitment-updates', 3, 'Recruitment Updates', 'నియామక సమాచారం', 'Help locating published recruitment notices from official sources.', 'అధికారిక వనరుల నియామక ప్రకటనలు కనుగొనడంలో సహాయం.', 'https://www.tgpsc.gov.in/', 'Telangana Public Service Commission'],
    ['admissions', 4, 'Admissions', 'ప్రవేశాలు', 'Guidance navigating institution-specific admission application steps.', 'విద్యా సంస్థ ప్రవేశ దరఖాస్తు దశలపై మార్గదర్శనం.', 'https://tgche.ac.in/', 'Telangana Council of Higher Education'],
    ['scholarships', 4, 'Scholarships', 'ఉపకార వేతనాలు', 'Assistance finding official scholarship information and application instructions.', 'అధికారిక ఉపకార వేతన సమాచారం, దరఖాస్తు సూచనలపై సహాయం.', 'https://scholarships.gov.in/', 'National Scholarship Portal'],
    ['counselling', 4, 'Counselling', 'కౌన్సెలింగ్', 'Guidance locating official counselling schedules and instructions.', 'అధికారిక కౌన్సెలింగ్ షెడ్యూల్‌లు, సూచనలు కనుగొనడంలో మార్గదర్శనం.', 'https://tgche.ac.in/', 'Telangana Council of Higher Education'],
    ['entrance-applications', 4, 'Entrance Applications', 'ప్రవేశ పరీక్ష దరఖాస్తులు', 'Help understanding an entrance examination’s application workflow.', 'ప్రవేశ పరీక్ష దరఖాస్తు ప్రక్రియను అర్థం చేసుకోవడంలో సహాయం.', 'https://tgche.ac.in/', 'Telangana Council of Higher Education'],
    ['government-schemes', 5, 'Government Schemes', 'ప్రభుత్వ పథకాలు', 'Help finding official scheme information relevant to your enquiry.', 'మీ విచారణకు సంబంధించిన అధికారిక పథకాల సమాచారం కనుగొనడంలో సహాయం.', 'https://www.myscheme.gov.in/', 'myScheme'],
    ['online-applications', 5, 'Online Applications', 'ఆన్‌లైన్ దరఖాస్తులు', 'Practical guidance for citizen-service forms and online applications.', 'పౌర సేవా ఫారమ్‌లు, ఆన్‌లైన్ దరఖాస్తులకు మార్గదర్శనం.', 'https://www.telangana.gov.in/', 'Telangana Government'],
];
const original = new Map(rows.map(([slug, category, en, te, summaryEn, summaryTe, source, sourceLabel]) => [slug,{slug,category,name:L(en,te),summary:L(summaryEn,summaryTe),source,sourceLabel}]));
const selected = new Map(catalogueEntries.map(entry=>[entry.slug,entry]));
const ordered = [...catalogueEntries.map(e=>e.slug),...rows.map(r=>r[0]).filter(slug=>!selected.has(slug))];
export const services: Service[] = ordered.map(slug=>{
 const entry=selected.get(slug), old=original.get(slug);
 const name=entry?.name || old!.name;
 const category=entry?.category ?? (slug==='government-schemes'?7:slug==='insurance'?9:old!.category);
 const profile=entry?.checklist || legacyProfiles[slug] || 'general';
 const checklist=checklistFor(profile);
 let summary=old?.summary || L('Application and service assistance. Check the preparation list and contact KING to confirm the next step.','దరఖాస్తు, సేవా ప్రక్రియలో సహాయం. పత్రాల జాబితా చూసి తదుపరి దశ కోసం కింగ్‌ను సంప్రదించండి.');
 if(category===8) summary=L('Transaction assistance subject to your bank or provider supporting the service. Confirm the channel, limits and charges before proceeding.','మీ బ్యాంకు లేదా సంస్థ అందించే సేవలకు అనుగుణంగా లావాదేవీ సహాయం. ముందుగా విధానం, పరిమితులు, ఛార్జీలు నిర్ధారించుకోండి.');
 if(profile==='loan'||profile==='pmegp') summary=L('Help preparing a lender enquiry and application documents. Approval, interest, charges and terms are decided by the lender.','రుణ విచారణ, దరఖాస్తు పత్రాల తయారీలో సహాయం. ఆమోదం, వడ్డీ, ఛార్జీలు, నిబంధనలు రుణ సంస్థ నిర్ణయిస్తుంది.');
 if(profile==='insurance') summary=L('Help preparing an insurance enquiry. Cover, premium, exclusions and acceptance depend on the selected insurer and policy.','బీమా విచారణ సిద్ధం చేయడంలో సహాయం. కవరేజ్, ప్రీమియం, మినహాయింపులు, ఆమోదం ఎంచుకున్న సంస్థ, పాలసీపై ఆధారపడతాయి.');
 if(profile==='temple'||profile==='travel') summary=L('Booking assistance for your preferred dates. Availability, booking windows and charges are set by the relevant operator or temple.','మీకు కావాల్సిన తేదీలకు బుకింగ్ సహాయం. లభ్యత, బుకింగ్ కాలం, ఛార్జీలను సంబంధిత సంస్థ లేదా ఆలయం నిర్ణయిస్తుంది.');
 if(slug==='credit-card-cash-withdrawal') summary=L('Enquiries about issuer-permitted cash-advance options only. Your card issuer determines availability, cash limits, interest and fees.','కార్డు జారీ సంస్థ అనుమతించే క్యాష్ అడ్వాన్స్ మార్గాలపై విచారణకు సహాయం. లభ్యత, నగదు పరిమితి, వడ్డీ, ఛార్జీలను ఆ సంస్థ నిర్ణయిస్తుంది.');
 if(slug==='nfdp') summary=L('Assistance with National Fisheries Digital Platform registration and related enquiries.','నేషనల్ ఫిషరీస్ డిజిటల్ ప్లాట్‌ఫారమ్ నమోదు, సంబంధిత విచారణల్లో సహాయం.');
 return {slug,category,name,summary,audience:L('People seeking assistance with this service. The relevant authority or provider confirms eligibility and service availability.','ఈ సేవలో సహాయం కోరే వారికి. అర్హత, సేవ లభ్యతను సంబంధిత సంస్థ నిర్ధారిస్తుంది.'),source:slug==='nfdp'?'https://nfdp.dof.gov.in/nfdp_benificary/':old?.source || '',sourceLabel:slug==='nfdp'?'National Fisheries Digital Platform':old?.sourceLabel || '',documents:checklist.documents,checklistSupplied:checklist.supplied,aliases:slug==='money-transfer'?'Money Transfer transfer to any bank':slug==='food-license'?'FSSAI licence':slug==='tspsc-otr'?'TSPSC TGPSC OTR':slug==='sadarem-udid'?'SADERAM SADAREM UDID':slug==='nfdp'?'National Fisheries Digital Platform':slug==='itr-filing'?'ITR income tax return':''};
});
export const updateCategories = [L('All updates', 'అన్ని సమాచారం'), L('Government Jobs', 'ప్రభుత్వ ఉద్యోగాలు'), L('Government Schemes', 'ప్రభుత్వ పథకాలు'), L('Scholarships', 'ఉపకార వేతనాలు'), L('Admissions', 'ప్రవేశాలు'), L('Counselling', 'కౌన్సెలింగ్'), L('Exams', 'పరీక్షలు'), L('Hall Tickets', 'హాల్ టికెట్లు'), L('Results', 'ఫలితాలు'), L('Important Deadlines', 'ముఖ్యమైన గడువులు')];
export const siteRoutes = ['/', '/services', ...services.map(s => `/services/${s.slug}`), '/updates', '/jobs', '/about', '/contact', '/apply', '/privacy', '/terms', '/disclaimer', '/style-tile'];
