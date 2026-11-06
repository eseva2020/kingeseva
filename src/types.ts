export type Lang = 'en' | 'te';
export type Localized = {
    en: string;
    te: string;
};
export interface Service {
    slug: string;
    category: number;
    name: Localized;
    summary: Localized;
    audience: Localized;
    source: string;
    sourceLabel: string;
    documents: Localized[];
    checklistSupplied: boolean;
    aliases?: string;
}
export interface Update {
    id: string;
    title: Localized;
    slug: string;
    category: string;
    summary: Localized;
    eligibility: Localized;
    lastDate: string | null;
    verifiedAt: string;
    documents?: Localized[];
    details?: {label:string;value:Localized}[];
    documentNote?: Localized;
    publishedAt: string;
    isFeatured: boolean;
}
export interface Business {
    customerPortalUrl?: string;
    name: string;
    whatsappNumber: string;
    phoneNumber: string;
    email: string;
    siteUrl: string;
    address: string;
    addressTe: string;
    openingHours: string;
    privacyContact: string;
    generatedMedia: {
        poster: string;
        mobilePoster?: string;
        manifest: string;
    };
}
