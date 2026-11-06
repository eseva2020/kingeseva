import {createServer} from 'vite';
import {renderToString} from 'react-dom/server';
import {createElement} from 'react';
import fs from 'node:fs/promises';
import path from 'node:path';
const business=JSON.parse(await fs.readFile('public/business.json','utf8'));
const updates=JSON.parse(await fs.readFile('public/updates.json','utf8'));
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
const {App}=await server.ssrLoadModule('/src/App.tsx');
const {services,siteRoutes}=await server.ssrLoadModule('/src/data.ts');
const template=await fs.readFile('dist/index.html','utf8');
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let origin='';if(business.siteUrl){const url=new URL(business.siteUrl);if(url.protocol!=='https:')throw Error('Production siteUrl must use https');origin=url.origin;}
const names={'/services':'All Services','/updates':'Latest Opportunities & Updates','/jobs':'Jobs & Applications','/about':'About KING','/contact':'Contact KING','/apply':'Apply Online','/privacy':'Privacy Policy','/terms':'Terms & Conditions','/disclaimer':'Disclaimer','/style-tile':'Brand Style Tile'};
for(const route of [...siteRoutes,'/404']){
 const service=services.find(s=>route===`/services/${s.slug}`);
 const title=service?`${service.name.en} Assistance in Ghanpur | KING e-Seva Services`:route==='/'?'KING e-Seva Services | Digital Services. Made Simple.':`${names[route]||'Page not found'} | KING e-Seva Services`;
 const desc=service?`${service.summary.en} KING e-Seva Services, Ghanpur (Station), Jangaon District, Telangana.`:'Government, business, tax, jobs, education and online application assistance in Ghanpur (Station), Telangana. Digital services with human support.';
 const noindex=!origin||route==='/style-tile'||route==='/404';
 const schema={'@context':'https://schema.org','@type':service?'Service':'Organization',name:service?`${service.name.en} Assistance`:'KING e-Seva Services',description:desc,...(origin?{url:origin+route}:{}),...(service?{provider:{'@type':'Organization',name:business.name}}:{address:{'@type':'PostalAddress',addressLocality:'Ghanpur (Station)',addressRegion:'Telangana',addressCountry:'IN'}})};
 const metadata=`<meta name="robots" content="${noindex?'noindex,nofollow':'index,follow'}"/>${origin?`<link rel="canonical" href="${origin}${route}"/>`:''}<meta property="og:type" content="website"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(desc)}"/><meta property="og:image" content="${origin}/assets/og-cover.png"/>${origin?`<meta property="og:url" content="${origin}${route}"/>`:''}<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(title)}"/><meta name="twitter:description" content="${escape(desc)}"/><meta name="twitter:image" content="${origin}/assets/og-cover.png"/><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`;
 const markup=renderToString(createElement(App,{path:route,initialBusiness:business,initialUpdates:updates}));
 const initialData=JSON.stringify({initialBusiness:business,initialUpdates:updates}).replace(/</g,'\\u003c');
 const html=template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/<meta name="description"[^>]*\/>/,`<meta name="description" content="${escape(desc)}"/>`).replace('</head>',`${metadata}</head>`).replace('<div id="root"></div>',`<div id="root">${markup}</div><script type="application/json" id="initial-site-data">${initialData}</script>`);
 const target=route==='/'?'dist/index.html':route==='/404'?'dist/404.html':`dist${route}/index.html`;await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,html);
}
await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin?siteRoutes.filter(r=>r!=='/style-tile').map(r=>`<url><loc>${origin}${r}</loc></url>`).join(''):''}</urlset>`);
await fs.writeFile('dist/robots.txt',origin?`User-agent: *\nAllow: /\nDisallow: /style-tile\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n# Local draft: set siteUrl in public/business.json and rebuild before launch.\n');
const assetFiles=(await fs.readdir('dist/assets',{withFileTypes:true})).filter(f=>f.isFile()&&!f.name.includes('original')&&!f.name.endsWith('.map')).map(f=>f.name);
const precache=['/','/services','/contact','/apply','/offline.html','/business.json','/updates.json','/manifest.webmanifest',...assetFiles.map(f=>'/assets/'+f),'/assets/story-phone/poster.webp','/assets/story-phone/mobile.webp'];
const worker=await fs.readFile('public/sw.js','utf8');await fs.writeFile('dist/sw.js',worker.replace('/* PRECACHE */[]',JSON.stringify(precache)).replace('king-shell-dev',`king-shell-${Date.now()}`));
await fs.writeFile('docs/build-report.json',JSON.stringify({routes:siteRoutes.length,staticHTML:true,canonicalOrigin:origin||null,indexing:origin?'enabled':'disabled until final domain configured',generatedAt:new Date().toISOString()},null,2));
await server.close();console.log(`Prerendered ${siteRoutes.length} routes and a 404. ${origin?'Canonical URLs enabled.':'Local preview stays noindex until siteUrl is configured.'}`);
