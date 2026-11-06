import fs from 'node:fs/promises';
import sharp from 'sharp';
const dir = 'public/assets/story-phone';
const frames = (await fs.readdir(dir)).filter(f => /^frame-\d{4}\.webp$/.test(f)).sort();
if (frames.length !== 180) throw Error('Expected 180 frames from the supplied 10-second clip at 18fps');
await fs.copyFile(`${dir}/${frames[0]}`, `${dir}/poster.webp`);
await sharp('public/assets/generated/mobile-hero.png').extract({left:0,top:0,width:1536,height:1400}).resize(768).webp({quality:85}).toFile(`${dir}/mobile.webp`);
await fs.writeFile(`${dir}/manifest.json`, JSON.stringify({count:frames.length,width:864,height:810,pattern:'frame-{index}.webp',poster:'poster.webp',beats:[{start:0,end:1,from:0,to:179}]},null,2));
// Preparing archived media must not replace the user's approved original hero.
console.log('Prepared user media:',frames.length,'frames');
