// Script PWA pour Métallerie Forge Perraut

class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.installButton = null;
    this.isOnline = navigator.onLine;
    
    this.init();
  }
  
  init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.setupOnlineOfflineHandling();
    this.createInstallButton();
    this.setupAppUpdate();
  }
  
  // Enregistrement du Service Worker
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('[PWA] Service Worker enregistré:', registration);
        
        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
      } catch (error) {
        console.error('[PWA] Erreur d\'enregistrement du Service Worker:', error);
      }
    }
  }
  
  // Gestion de l'installation PWA
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });
    
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Application installée');
      this.hideInstallButton();
      this.deferredPrompt = null;
      
      // Afficher un message de confirmation
      this.showNotification('Application installée avec succès !', 'success');
    });
  }
  
  // Gestion des états en ligne/hors ligne
  setupOnlineOfflineHandling() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.hideOfflineIndicator();
      this.showNotification('Connexion rétablie', 'success');
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showOfflineIndicator();
      this.showNotification('Mode hors ligne activé', 'info');
    });
  }
  
  // Création du bouton d'installation
  createInstallButton() {
    // Créer le bouton d'installation
    this.installButton = document.createElement('button');
    this.installButton.className = 'pwa-install-btn';
    this.installButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span>Installer l'app</span>
    `;
    this.installButton.addEventListener('click', () => this.installApp());
    
    // Ajouter le bouton au header
    const header = document.querySelector('.header__content');
    if (header) {
      header.appendChild(this.installButton);
    }
    
    // Cacher le bouton par défaut
    this.hideInstallButton();
  }
  
  // Afficher le bouton d'installation
  showInstallButton() {
    if (this.installButton) {
      this.installButton.style.display = 'flex';
      this.installButton.classList.add('animate-in');
    }
  }
  
  // Cacher le bouton d'installation
  hideInstallButton() {
    if (this.installButton) {
      this.installButton.style.display = 'none';
    }
  }
  
  // Installation de l'application
  async installApp() {
    if (!this.deferredPrompt) {
      return;
    }
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] Utilisateur a accepté l\'installation');
    } else {
      console.log('[PWA] Utilisateur a refusé l\'installation');
    }
    
    this.deferredPrompt = null;
    this.hideInstallButton();
  }
  
  // Gestion des mises à jour
  setupAppUpdate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] Nouveau Service Worker activé');
        this.showNotification('Application mise à jour ! Rechargez la page.', 'info');
      });
    }
  }
  
  // Notification de mise à jour
  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'pwa-update-notification';
    notification.innerHTML = `
      <div class="pwa-update-content">
        <span>Nouvelle version disponible</span>
        <button class="pwa-update-btn" onclick="location.reload()">Mettre à jour</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-suppression après 10 secondes
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 10000);
  }
  
  // Indicateur hors ligne
  showOfflineIndicator() {
    let indicator = document.getElementById('offline-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'offline-indicator';
      indicator.className = 'offline-indicator';
      indicator.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <span>Mode hors ligne</span>
      `;
      document.body.appendChild(indicator);
    }
    indicator.style.display = 'flex';
  }
  
  hideOfflineIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }
  
  // Notifications système
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `pwa-notification pwa-notification--${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="pwa-notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
}

// Initialisation de la PWA
document.addEventListener('DOMContentLoaded', () => {
  new PWAInstaller();
});

// Gestion des raccourcis PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NAVIGATE') {
      window.location.href = event.data.url;
    }
  });
}
