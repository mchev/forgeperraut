// Service Worker pour Métallerie Forge Perraut
const CACHE_NAME = 'forge-perraut-v1.0.0';
const STATIC_CACHE = 'forge-perraut-static-v1.0.0';
const DYNAMIC_CACHE = 'forge-perraut-dynamic-v1.0.0';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/manifest.json',
  '/images/metallerieforgeperraut.svg',
  '/assets/images/instagram.svg',
  '/assets/images/rusted_texture.jpg'
];

// Ressources à mettre en cache dynamiquement
const DYNAMIC_ASSETS = [
  '/images/',
  '/assets/'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation en cours...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Cache statique ouvert');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Cache statique rempli');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erreur lors de l\'installation:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation en cours...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Suppression de l\'ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activé');
        return self.clients.claim();
      })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes de navigation (pour permettre le fallback offline)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }
  
  // Stratégie Cache First pour les ressources statiques
  if (STATIC_ASSETS.includes(url.pathname) || 
      url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/images/')) {
    
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then((response) => {
              // Vérifier que la réponse est valide
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Mettre en cache la réponse
              const responseToCache = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
              
              return response;
            });
        })
        .catch(() => {
          // Fallback pour les images
          if (request.destination === 'image') {
            return caches.match('/images/metallerieforgeperraut.svg');
          }
        })
    );
    return;
  }
  
  // Stratégie Network First pour les autres ressources
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Mettre en cache les réponses réussies
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Fallback vers le cache
        return caches.match(request);
      })
  );
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Gestion des notifications push (pour futures fonctionnalités)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/pwa-icon-192.png',
      badge: '/images/pwa-icon-72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Voir le site',
          icon: '/images/pwa-icon-72.png'
        },
        {
          action: 'close',
          title: 'Fermer',
          icon: '/images/pwa-icon-72.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
