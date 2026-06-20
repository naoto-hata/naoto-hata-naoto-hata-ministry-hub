const CACHE='ministry-hub-v14';
self.addEventListener('install',e=>{self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./styles.css','./app.js','./manifest.json']).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)))})
