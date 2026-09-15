// Retire legacy cache-first workers. Private business data is never cached offline.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('ionbau-'))await caches.delete(key);await self.clients.claim();await self.registration.unregister();})()));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request)));
