# 🚀 PWA (Progressive Web App) - Métallerie Forge Perraut

## 📱 Qu'est-ce qu'une PWA ?

Une **Progressive Web App (PWA)** est une application web qui offre une expérience similaire à une application native mobile. Elle peut être installée sur l'écran d'accueil, fonctionne hors ligne et offre des fonctionnalités avancées.

## ✨ Fonctionnalités PWA implémentées

### 🔧 **Service Worker**
- **Mise en cache intelligente** des ressources
- **Fonctionnement hors ligne** avec fallback
- **Gestion des mises à jour** automatique
- **Stratégies de cache** optimisées (Cache First pour les assets statiques, Network First pour le reste)

### 📋 **Manifest Web App**
- **Installation sur l'écran d'accueil**
- **Icônes adaptatives** pour tous les appareils
- **Thème personnalisé** avec couleurs métalliques
- **Raccourcis** vers la galerie et le contact
- **Screenshots** pour l'App Store

### 🎯 **Interface d'installation**
- **Bouton d'installation** élégant dans le header
- **Prompt d'installation** natif du navigateur
- **Confirmation d'installation** avec notification

### 📡 **Gestion hors ligne**
- **Indicateur de statut** en temps réel
- **Notifications** de changement de connectivité
- **Cache intelligent** des ressources essentielles

### 🔔 **Notifications système**
- **Notifications push** (préparées pour le futur)
- **Gestion des permissions** utilisateur
- **Actions de notification** personnalisées

## 🛠️ Fichiers créés/modifiés

### Nouveaux fichiers :
- `manifest.json` - Configuration PWA
- `sw.js` - Service Worker
- `assets/js/pwa.js` - Logique PWA
- `generate-pwa-icons.html` - Générateur d'icônes
- `test-pwa.html` - Page de test PWA
- `PWA-README.md` - Ce fichier

### Fichiers modifiés :
- `index.html` - Ajout des métadonnées PWA
- `assets/css/main.css` - Styles PWA

## 🎨 Icônes PWA requises

Pour que la PWA fonctionne parfaitement, vous devez créer les icônes suivantes dans le dossier `images/` :

```
images/
├── pwa-icon-72.png      (72x72)
├── pwa-icon-96.png      (96x96)
├── pwa-icon-128.png     (128x128)
├── pwa-icon-144.png     (144x144)
├── pwa-icon-152.png     (152x152)
├── pwa-icon-192.png     (192x192)
├── pwa-icon-384.png     (384x384)
└── pwa-icon-512.png     (512x512)
```

### 🎯 Comment générer les icônes :

1. **Ouvrez** `generate-pwa-icons.html` dans votre navigateur
2. **Cliquez** sur "Générer toutes les icônes PWA"
3. **Téléchargez** chaque icône avec le bouton correspondant
4. **Placez** les icônes dans le dossier `images/`

## 🧪 Test de la PWA

### 1. **Test automatique** :
Ouvrez `test-pwa.html` dans votre navigateur pour tester toutes les fonctionnalités PWA.

### 2. **Test manuel** :
- **Chrome DevTools** → Application → Service Workers
- **Chrome DevTools** → Application → Manifest
- **Chrome DevTools** → Application → Cache Storage

### 3. **Test d'installation** :
- **Chrome** : Icône d'installation dans la barre d'adresse
- **Safari** : Bouton "Partager" → "Sur l'écran d'accueil"
- **Firefox** : Icône d'installation dans la barre d'adresse

## 📱 Compatibilité navigateurs

| Navigateur | Service Worker | Manifest | Installation | Notifications |
|------------|----------------|----------|--------------|---------------|
| Chrome 67+ | ✅ | ✅ | ✅ | ✅ |
| Firefox 58+ | ✅ | ✅ | ✅ | ✅ |
| Safari 11.1+ | ✅ | ✅ | ⚠️ | ⚠️ |
| Edge 17+ | ✅ | ✅ | ✅ | ✅ |

## 🚀 Déploiement

### 1. **Serveur HTTPS requis** :
Les PWA nécessitent HTTPS pour fonctionner. Assurez-vous que votre serveur est configuré.

### 2. **Headers recommandés** :
```apache
# .htaccess
<Files "manifest.json">
    Header set Content-Type "application/manifest+json"
</Files>

<Files "sw.js">
    Header set Cache-Control "no-cache"
</Files>
```

### 3. **Vérification** :
- [Lighthouse PWA Audit](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)

## 🔧 Personnalisation

### **Couleurs du thème** :
Modifiez les variables CSS dans `assets/css/main.css` :
```css
:root {
  --color-primary: #2c3e50;    /* Couleur principale */
  --color-accent: #f39c12;     /* Couleur d'accent */
  --color-steel: #4a5568;      /* Couleur métallique */
}
```

### **Nom de l'application** :
Modifiez `manifest.json` :
```json
{
  "name": "Votre Nom",
  "short_name": "Votre Nom Court"
}
```

## 📊 Métriques et Analytics

### **Suivi des installations** :
```javascript
// Dans pwa.js
window.addEventListener('appinstalled', () => {
  // Envoyer à Google Analytics
  gtag('event', 'pwa_install', {
    'event_category': 'engagement',
    'event_label': 'pwa_install'
  });
});
```

### **Suivi des vues hors ligne** :
```javascript
// Dans le Service Worker
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // Compter les vues hors ligne
    analytics.track('offline_page_view');
  }
});
```

## 🐛 Dépannage

### **Service Worker ne se charge pas** :
1. Vérifiez que le fichier `sw.js` est accessible
2. Vérifiez la console du navigateur pour les erreurs
3. Assurez-vous que HTTPS est activé

### **Manifest non reconnu** :
1. Vérifiez que `manifest.json` est accessible
2. Vérifiez la syntaxe JSON
3. Vérifiez les DevTools → Application → Manifest

### **Installation ne fonctionne pas** :
1. Vérifiez que tous les critères PWA sont remplis
2. Testez avec Lighthouse
3. Vérifiez que l'utilisateur n'a pas déjà installé l'app

## 🔮 Fonctionnalités futures

- **Notifications push** avec Firebase
- **Synchronisation en arrière-plan**
- **Partage de contenu** natif
- **Paiements** intégrés
- **Géolocalisation** pour les devis

## 📚 Ressources utiles

- [MDN Web Docs - PWA](https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps)
- [Google Developers - PWA](https://developers.google.com/web/progressive-web-apps)
- [PWA Builder](https://www.pwabuilder.com/)
- [Lighthouse PWA](https://developers.google.com/web/tools/lighthouse)

---

**🎉 Votre site est maintenant une PWA complète !** 

Les utilisateurs peuvent l'installer sur leur mobile et profiter d'une expérience app-like avec fonctionnalités hors ligne.
