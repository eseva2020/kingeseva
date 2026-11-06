import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import sharp from 'sharp';

test('Every animation frame decodes with manifest dimensions',async()=>{
  const dir='dist/assets/story-phone';
  const m=JSON.parse(await fs.readFile(`${dir}/manifest.json`,'utf8'));
  for(let i=0;i<m.count;i++){
    const file=path.join(dir,m.pattern.replace('{index}',String(i).padStart(4,'0')));
    const image=await sharp(file).metadata();
    assert.equal(image.width,m.width);assert.equal(image.height,m.height);
  }
});

test('Animation can revisit evicted frames repeatedly and releases decoded images',async()=>{
  const m=JSON.parse(await fs.readFile('public/assets/story-phone/manifest.json','utf8'));
  const effects=[],listeners={},rafs=[];let progress=0,live=0,maxLive=0,requests=0,maxRequests=0;
  const section={clientHeight:3000,getBoundingClientRect:()=>({top:-progress*2000})};
  const canvas={dataset:{},getContext:()=>({clearRect(){},drawImage(){}}),closest:()=>section};
  const source=ts.transpileModule(await fs.readFile('src/FrameSequence.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
  const context={exports:{},require:n=>n==='react'?{useRef:()=>({current:canvas}),useState:()=>[true,()=>{}],useEffect:f=>effects.push(f)}:{jsx:()=>null},navigator:{},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),AbortController,URL,location:{href:'https://king.test/'},innerHeight:1000,
    requestAnimationFrame:f=>(rafs.push(f),rafs.length),cancelAnimationFrame(){},addEventListener:(n,f)=>listeners[n]=f,removeEventListener:n=>delete listeners[n],
    fetch:async url=>{if(url.endsWith('manifest.json'))return {json:async()=>m};requests++;maxRequests=Math.max(maxRequests,requests);return {ok:true,blob:async()=>{requests--;return {};}};},
    createImageBitmap:async()=>{live++;maxLive=Math.max(live,maxLive);return {close(){live--;}};}};
  vm.runInNewContext(source,context);
  context.exports.FrameSequence({manifestUrl:'/assets/story-phone/manifest.json',poster:''});
  const cleanup=effects.map(f=>f());
  const flush=async()=>{for(let i=0;i<40;i++)await new Promise(resolve=>setImmediate(resolve));};
  await flush();
  for(const p of [1,0,.5,1,0,.5,1,0]){progress=p;listeners.scroll();while(rafs.length)rafs.shift()();await flush();assert.equal(Number(canvas.dataset.frame),Math.round(p*179));}
  assert.ok(maxRequests<=3);assert.ok(maxLive<=17); // One incoming bitmap precedes eviction.
  cleanup.forEach(f=>f?.());assert.equal(live,0);
});

test('PWA precache contains real files and excludes source video and frame sequence',async()=>{
  const listeners={};let urls=[];
  const context={self:{addEventListener:(n,f)=>listeners[n]=f,skipWaiting:async()=>{}},caches:{open:async()=>({addAll:async list=>{urls=list;}})}};
  vm.runInNewContext(await fs.readFile('dist/sw.js','utf8'),context);
  let done;listeners.install({waitUntil:p=>done=p});await done;
  for(const url of urls){const file='dist'+url;const stat=await fs.stat(file);if(stat.isDirectory())await fs.access(path.join(file,'index.html'));assert.ok(!/\.mp4$|frame-\d/.test(url));}
});

test('Approved original hero remains active alongside the requested Mac section',async()=>{
  const config=JSON.parse(await fs.readFile('public/business.json','utf8'));
  const media=config.generatedMedia;
  assert.equal(media.poster,'');
  assert.equal(media.mobilePoster,'');
  assert.equal(media.manifest,'');
  const home=await fs.readFile('dist/index.html','utf8');
  assert.ok(home.includes('class="network"'));
  assert.ok(!home.includes('generated-rig'));
  assert.ok(home.includes('mac-reference-scene'));
  assert.ok(!JSON.stringify(media).includes('desktop-story.mp4'));
});
