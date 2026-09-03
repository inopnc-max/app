const CACHE='inopnc-shell-v1'; const STATIC=['/','/offline'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url); if(url.pathname.startsWith('/auth')||url.pathname.startsWith('/api')||event.request.method!=='GET'||url.search) return; event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||caches.match('/offline'))));});
