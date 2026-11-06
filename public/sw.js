const CACHE='king-shell-dev';
const PRECACHE=/* PRECACHE */[];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('king-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const request=event.request;const url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||url.search)return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;}).catch(async()=>await caches.match(request)||await caches.match('/offline.html')));return;}
 if(url.pathname==='/business.json'||url.pathname==='/updates.json'){event.respondWith(fetch(request).catch(()=>caches.match(request)));return;}
 if(url.pathname.startsWith('/assets/')||url.pathname==='/manifest.webmanifest'){event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));}
});
