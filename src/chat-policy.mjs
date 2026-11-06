export function requestedChatLanguage(question){
 if(/\b(?:in english|english\s+(?:please|lo|లో|language)|(?:reply|answer|explain|speak)\s+(?:in\s+)?english)\b/i.test(question))return 'en';
 if(/\b(?:in telugu|telugu\s+(?:please|lo)|(?:reply|answer|explain|speak)\s+(?:in\s+)?telugu)\b|తెలుగులో\s*(?:చెప్ప|మాట్లాడ|వివరించ)|తెలుగు\s*లో/i.test(question))return 'te';
 return null;
}
// UI hint only. The backend also asks the model to interpret the complete message/context.
export function detectChatLanguage(question,explicit=null,recent=null){
 const switchTo=requestedChatLanguage(question);if(switchTo)return switchTo;
 if(explicit)return explicit;
 if(/[\u0C00-\u0C7F]/.test(question))return 'te';
 const words=question.toLowerCase().match(/[a-z]+/g)||[];
 const roman=words.filter(w=>/^(ela|kavali|kaavali|cheyali|cheyyali|cheppandi|cheppu|unnayi|unnaya|eppudu|garu|enti|emiti|naa|naaku|naku|avuthundi|avutundi|chesukovali|ivvandi|ledu|enni|rojulu)$/.test(w)).length;
 if(roman)return 'te';
 if(/\b(?:how|what|when|where|why|can|could|would|is|are|do|does|please|tell|explain)\b/i.test(question))return 'en';
 return recent||'en';
}
export function containsSensitiveChatData(text){return /\b(otp|password|pin)\s*[:=]\s*\S+|\b\d{12}\b|\b[A-Z]{5}\d{4}[A-Z]\b/i.test(text);}
export function formatChatText(text){return text.replace(/^\s*#{1,6}\s+/gm,'').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/^\s*[-*]\s+/gm,'• ').replace(/\*([^*\n]+)\*/g,'$1');}
