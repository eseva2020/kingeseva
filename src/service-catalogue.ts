import type { Localized } from './types';
const L = (en:string,te:string):Localized=>({en,te});
// Stable first six category indexes preserve existing homepage and footer links.
export const extraCategories = [
 {name:L('Land & Property','భూమి & ఆస్తి సేవలు'),short:L('Land & Property','భూమి & ఆస్తి'),desc:L('Land records, property applications and local payments.','భూ రికార్డులు, ఆస్తి దరఖాస్తులు, స్థానిక చెల్లింపులు.'),icon:'landmark'},
 {name:L('Government Schemes','ప్రభుత్వ పథకాలు'),short:L('Schemes','పథకాలు'),desc:L('Application and update assistance for welfare schemes.','సంక్షేమ పథకాల దరఖాస్తులు, అప్‌డేట్‌లకు సహాయం.'),icon:'landmark'},
 {name:L('Banking & Payments','బ్యాంకింగ్ & చెల్లింపులు'),short:L('Banking','బ్యాంకింగ్'),desc:L('Everyday account, transfer and bill-payment assistance.','ఖాతా, నగదు బదిలీ, బిల్లుల చెల్లింపులకు సహాయం.'),icon:'chart'},
 {name:L('Loans & Insurance','రుణాలు & బీమా'),short:L('Loans & Insurance','రుణాలు & బీమా'),desc:L('Prepare your enquiry, documents and provider application.','మీ విచారణ, పత్రాలు, సంస్థ దరఖాస్తు సిద్ధం చేసుకోండి.'),icon:'briefcase'},
 {name:L('Travel & Temple Bookings','ప్రయాణం & ఆలయ బుకింగ్‌లు'),short:L('Travel & Darshan','ప్రయాణం & దర్శనం'),desc:L('Tickets, bus passes, darshan and room-booking assistance.','టికెట్లు, బస్ పాస్‌లు, దర్శనం, గదుల బుకింగ్‌కు సహాయం.'),icon:'globe'},
 {name:L('Printing Services','ప్రింటింగ్ సేవలు'),short:L('Printing','ప్రింటింగ్'),desc:L('Visiting cards and PVC cards, prepared with care.','విజిటింగ్ కార్డులు, పీవీసీ కార్డుల ప్రింటింగ్.'),icon:'file'},
];
// slug | category | English | Telugu | checklist profile
const catalogue = `
aadhaar-assistance|0|Aadhaar Address Update|ఆధార్ చిరునామా అప్‌డేట్|aadhaar
voter-id|0|Voter ID Card Application|ఓటరు కార్డు దరఖాస్తు|identity
voter-id-corrections|0|Voter ID Corrections|ఓటరు కార్డు సవరణలు|identity
passport|0|Passport Application|పాస్‌పోర్ట్ దరఖాస్తు|passport
passport-renewal|0|Passport Renewal|పాస్‌పోర్ట్ రెన్యూవల్|passport
pf-claim|2|PF Claim|పీఎఫ్ క్లెయిమ్|pf
pf-e-kyc|2|PF e-KYC|పీఎఫ్ ఈ-కేవైసీ|pf
pf-e-nomination|2|PF e-Nomination|పీఎఫ్ ఈ-నామినేషన్|pf
pan-card|0|PAN Card Application|పాన్ కార్డు దరఖాస్తు|identity
pan-card-update|0|PAN Card Update|పాన్ కార్డు అప్‌డేట్|identity
pan-number-recovery|0|PAN Number Recovery|పాన్ నంబర్ రికవరీ|identity
government-jobs|3|Government Job Applications|ప్రభుత్వ ఉద్యోగ దరఖాస్తులు|jobs
trade-licence|1|Trade License|ట్రేడ్ లైసెన్స్|trade
labour-licence|1|Labour License|లేబర్ లైసెన్స్|labour
food-license|1|Food License|ఫుడ్ లైసెన్స్|food
udyam|1|UDYAM Application|ఉద్యమ్ దరఖాస్తు|business
gst-registration|1|GST Registration|జీఎస్టీ నమోదు|gst
gst-return-filing|2|GST Return Filing|జీఎస్టీ రిటర్న్ దాఖలు|gstReturn
itr-filing|2|Income Tax Filing|ఆదాయపు పన్ను దాఖలు|tax
building-permission|6|Building Permission|భవన నిర్మాణ అనుమతి|building
house-tax-payment|6|House Tax Payment|ఇంటి పన్ను చెల్లింపు|property
mutation|6|Mutation|మ్యుటేషన్|property
ration-card-application|0|Ration Card Application|రేషన్ కార్డు దరఖాస్తు|identity
ration-card-name-addition|0|Ration Card Name Addition|రేషన్ కార్డులో పేరు చేర్పు|identity
loan-emi-payment|8|Loan EMI Payment|లోన్ ఈఎంఐ చెల్లింపు|payment
lic-premium-payment|8|LIC Premium Payment|ఎల్‌ఐసీ ప్రీమియం చెల్లింపు|payment
scholarship-renewal|4|Scholarship Renewal|స్కాలర్‌షిప్ రెన్యూవల్|scholarship
national-scholarship|4|National Scholarship|జాతీయ స్కాలర్‌షిప్|scholarship
pragati-scholarship|4|Pragati Scholarship|ప్రగతి స్కాలర్‌షిప్|scholarship
scholarships|4|All Government & Private Scholarship Applications|ప్రభుత్వ & ప్రైవేట్ స్కాలర్‌షిప్ దరఖాస్తులు|scholarship
bus-pass|10|Bus Pass – New & Renewal|బస్ పాస్ — కొత్తది & రెన్యూవల్|busPass
flight-ticket-booking|10|Flight Ticket Booking|విమాన టికెట్ బుకింగ్|travel
train-ticket-booking|10|Train Ticket Booking|రైలు టికెట్ బుకింగ్|travel
bus-ticket-booking|10|Bus Ticket Booking|బస్సు టికెట్ బుకింగ్|travel
tirumala-booking|10|Tirumala Tirupati Darshan & Room Booking|తిరుమల తిరుపతి దర్శనం & గది బుకింగ్|temple
vemulawada-booking|10|Vemulawada Darshan & Room Booking|వేములవాడ దర్శనం & గది బుకింగ్|temple
shirdi-booking|10|Shirdi Darshan & Room Booking|షిర్డీ దర్శనం & గది బుకింగ్|temple
basara-booking|10|Basara Darshan & Room Booking|బాసర దర్శనం & గది బుకింగ్|temple
vijayawada-booking|10|Vijayawada Darshan & Room Booking|విజయవాడ దర్శనం & గది బుకింగ్|temple
srisailam-booking|10|Srisailam Darshan & Room Booking|శ్రీశైలం దర్శనం & గది బుకింగ్|temple
1b|6|1B|1బీ|property
pahani|6|Pahani|పహాణి|property
patta-passbook-reprint|6|Patta Passbook Reprint|పట్టాదారు పాస్‌బుక్ రీప్రింట్|property
registration-slot-booking|6|Registration Slot Booking – Sale & Gift|రిజిస్ట్రేషన్ స్లాట్ బుకింగ్ — అమ్మకం & గిఫ్ట్|property
passbook-data-correction|6|Passbook Data Correction|పాస్‌బుక్ వివరాల సవరణ|property
missing-survey-number|6|Missing Survey Number|మిస్సింగ్ సర్వే నంబర్|property
ds-pending-application|6|DS Pending Application|డీఎస్ పెండింగ్ దరఖాస్తు|property
extent-correction|6|Extent Correction|భూ విస్తీర్ణం సవరణ|property
survey-number-block-unblock|6|Survey Number Block / Unblock|సర్వే నంబర్ బ్లాక్ / అన్‌బ్లాక్|property
pm-kisan|7|PM-KISAN|పీఎం కిసాన్|scheme
pm-kisan-e-kyc|7|PM-KISAN e-KYC|పీఎం కిసాన్ ఈ-కేవైసీ|scheme
pm-kisan-update|7|PM-KISAN Update|పీఎం కిసాన్ అప్‌డేట్|scheme
pm-kisan-new-application|7|PM-KISAN New Application|పీఎం కిసాన్ కొత్త దరఖాస్తు|scheme
pm-vishwakarma|7|PM Vishwakarma|పీఎం విశ్వకర్మ|scheme
kalyana-lakshmi|7|Kalyana Lakshmi|కల్యాణ లక్ష్మి|scheme
shaadi-mubarak|7|Shaadi Mubarak|షాదీ ముబారక్|scheme
ayushman-bharat|7|Ayushman Bharat|ఆయుష్మాన్ భారత్|scheme
e-shram|7|e-Shram Application|ఈ-శ్రమ్ దరఖాస్తు|scheme
life-certificate|0|Life Certificate|లైఫ్ సర్టిఫికెట్|pension
bank-money-withdrawal|8|Money Withdrawal from All Banks|అన్ని బ్యాంకుల నగదు విత్‌డ్రాయల్|banking
money-transfer|8|Money Transfer to Any Bank Account|ఏ బ్యాంకు ఖాతాకైనా నగదు బదిలీ|banking
phonepe-services|8|PhonePe Services|ఫోన్‌పే సేవలు|banking
google-pay-services|8|Google Pay Services|గూగుల్ పే సేవలు|banking
credit-card-cash-withdrawal|8|Money Withdrawal Using Credit Card|క్రెడిట్ కార్డుతో నగదు విత్‌డ్రాయల్|banking
bank-account-opening|8|Bank Account Opening|బ్యాంకు ఖాతా ప్రారంభం|account
bank-money-deposit|8|Money Deposit in All Banks|అన్ని బ్యాంకుల్లో నగదు డిపాజిట్|banking
credit-card-bill-payment|8|Credit Card Bill Payment|క్రెడిట్ కార్డు బిల్లు చెల్లింపు|payment
credit-card-application|9|Credit Card Application|క్రెడిట్ కార్డు దరఖాస్తు|loan
housing-loan|9|Housing Loan|గృహ రుణం|loan
personal-loan|9|Personal Loan|వ్యక్తిగత రుణం|loan
life-insurance|9|Life Insurance|జీవిత బీమా|insurance
health-insurance|9|Health Insurance|ఆరోగ్య బీమా|insurance
vehicle-insurance|9|Vehicle Insurance|వాహన బీమా|insurance
visiting-card-printing|11|Visiting Card Printing|విజిటింగ్ కార్డు ప్రింటింగ్|printing
pvc-card-printing|11|PVC Card Printing|పీవీసీ కార్డు ప్రింటింగ్|printing
driving-licence|0|Driving License Services|డ్రైవింగ్ లైసెన్స్ సేవలు|identity
bike-loan|9|Bike Loan|బైక్ లోన్|loan
car-loan|9|Car Loan|కార్ లోన్|loan
tractor-loan|9|Tractor Loan|ట్రాక్టర్ లోన్|loan
motor-vehicle-loan|9|Motor Vehicle Loan|మోటార్ వాహన రుణం|loan
nfdp|7|NFDP|ఎన్‌ఎఫ్‌డీపీ|scheme
sadarem-udid|0|SADAREM / UDID|సదరం / యూడీఐడీ|udid
pmegp-loan|9|PMEGP Loan|పీఎంఈజీపీ రుణం|pmegp
rrb-jobs|3|RRB Job Applications|ఆర్ఆర్‌బీ ఉద్యోగ దరఖాస్తులు|rrb
tspsc-otr|3|TSPSC / TGPSC OTR|టీఎస్‌పీఎస్‌సీ / టీజీపీఎస్‌సీ ఓటీఆర్|otr
bank-jobs|3|Bank Job Applications|బ్యాంకు ఉద్యోగ దరఖాస్తులు|bankJobs
`;
export const catalogueEntries = catalogue.trim().split('\n').map(line=>{const [slug,category,en,te,checklist]=line.split('|');return {slug,category:Number(category),name:L(en,te),checklist};});
export const legacyProfiles:Record<string,string>={'epf-services':'pf','insurance':'insurance','tax-assistance':'tax','rta-services':'identity','hall-tickets':'jobs','results':'jobs','exams':'jobs','recruitment-updates':'jobs','admissions':'education','counselling':'education','entrance-applications':'education','government-schemes':'scheme'};
