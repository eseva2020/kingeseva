export function requestedChatLanguage(question:string):'en'|'te'|null;
export function detectChatLanguage(question:string,explicit?:'en'|'te'|null,recent?:'en'|'te'|null):'en'|'te';
export function containsSensitiveChatData(text:string):boolean;
export function formatChatText(text:string):string;
