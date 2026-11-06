import sharp from 'sharp';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const source='public/assets/king-lion-original.png';
const metadata=await sharp(source).metadata();
await sharp(source).resize({width:640,withoutEnlargement:true}).webp({quality:90}).toFile('public/assets/king-lion.webp');
for(const size of [192,512]) await sharp(source).resize(size,size,{fit:'contain',background:'#081725'}).png().toFile(`public/assets/icon-${size}.png`);
// The original remains untouched. These are only proportional export derivatives.
const logo=await sharp(source).resize(390,390,{fit:'contain',background:'#081725'}).png().toBuffer();
const text=Buffer.from(`<svg width="1200" height="630"><rect width="1200" height="630" fill="#081725"/><path d="M750 20C1200 160 850 460 1200 610" stroke="#d8bb7d" stroke-opacity=".22" fill="none"/><text x="75" y="160" font-family="Georgia" font-size="25" letter-spacing="4" fill="#d8bb7d">KING e-Seva Services</text><text x="75" y="285" font-family="Arial" font-size="61" fill="#f4f1e9">Digital Services.</text><text x="75" y="363" font-family="Georgia" font-style="italic" font-size="68" fill="#d8bb7d">Made Simple.</text><text x="75" y="470" font-family="Arial" font-size="19" fill="#9ba8b6">Ghanpur (Station) · Telangana</text></svg>`);
await sharp(text).composite([{input:logo,left:760,top:130}]).png().toFile('public/assets/og-cover.png');
await fs.writeFile('docs/logo-provenance.json',JSON.stringify({original:'public/assets/king-lion-original.png',source:'F:/King Online Services/King Lion Logo.png',sha256:crypto.createHash('sha256').update(await fs.readFile(source)).digest('hex'),dimensions:{width:metadata.width,height:metadata.height},modifications:'Original untouched. Proportional WebP and contained PWA/OG derivatives only. No redraw, recolour or deformation.'},null,2));
console.log('Logo and social preview derivatives exported. Original preserved.',metadata.width,metadata.height);
