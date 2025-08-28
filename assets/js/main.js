// JavaScript pour Métallerie Forge Perraut

// Configuration de performance pour améliorer le LCP
const PERFORMANCE_CONFIG = {
  // Nombre d'images à charger immédiatement (above-the-fold)
  initialLoadCount: 6,
  // Délai avant de charger le reste des images
  lazyLoadDelay: 100
};

// Utilitaires partagés
const Utils = {
  // Détection mobile améliorée
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768 || 
           ('ontouchstart' in window);
  },

  // Mise à jour de l'année courante
  updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  },

  // Charger les données de la galerie depuis le fichier JSON
  async loadGalleryData() {
    try {
      const response = await fetch('/gallery.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors du chargement des données de la galerie:', error);
      // Retourner un tableau vide en cas d'erreur
      return [];
    }
  },

  // Génération des données structurées pour la galerie
  generateGalleryStructuredData(filteredItems, getCategoryLabel) {
    const galleryItems = filteredItems.map(item => ({
      "@type": "ImageObject",
      "name": `${getCategoryLabel(item.category)} sur mesure`,
      "description": item.alt,
      "contentUrl": item.full,
      "thumbnailUrl": item.src,
      "uploadDate": new Date().toISOString().split('T')[0],
      "creator": {
        "@type": "Organization",
        "name": "Métallerie Forge Perraut"
      }
    }));

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Galerie de réalisations en métallerie et fer forgé",
      "description": "Découvrez nos créations sur mesure en escaliers, garde-corps, rampes, pergolas, terrasses, mobilier, portes et portails métalliques",
      "url": "https://forgeperraut.fr/#gallery",
      "image": galleryItems,
      "publisher": {
        "@type": "Organization",
        "name": "Métallerie Forge Perraut",
        "url": "https://forgeperraut.fr"
      }
    };

    // Ajouter le script JSON-LD à la page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
};

// Données de la galerie - chargées dynamiquement depuis le fichier JSON
let galleryData = [];

// Gestionnaire de galerie
class GalleryManager {
  constructor() {
    this.currentFilter = 'all';
    this.currentIndex = 0;
    this.filteredItems = [];
    this.currentPage = 0;
    this.itemsPerPage = Utils.isMobile() ? 6 : 12; // Adapté pour mobile
    this.isDataLoaded = false;
    this.init();
  }

  async init() {
    // Charger les données de la galerie depuis le fichier JSON
    try {
      galleryData = await Utils.loadGalleryData();
      this.filteredItems = [...galleryData];
      this.isDataLoaded = true;
      
      // Charger d'abord les images above-the-fold pour améliorer le LCP
      this.renderGallery();
      
      // Charger le reste des images progressivement
      setTimeout(() => {
        this.preloadRemainingImages();
      }, PERFORMANCE_CONFIG.lazyLoadDelay);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la galerie:', error);
      // Afficher un message d'erreur à l'utilisateur
      this.showErrorMessage();
    }
    
    this.bindEvents();
    Utils.updateCurrentYear();
    
    // Adapter la taille de la galerie lors du redimensionnement
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  // Précharger les images restantes pour améliorer l'expérience utilisateur
  preloadRemainingImages() {
    const remainingItems = this.filteredItems.slice(PERFORMANCE_CONFIG.initialLoadCount);
    remainingItems.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });
  }

  handleResize() {
    // Mettre à jour le nombre d'éléments par page lors du redimensionnement
    const newItemsPerPage = Utils.isMobile() ? 6 : 12;
    if (newItemsPerPage !== this.itemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.currentPage = 0; // Retour à la première page
      this.renderGallery();
    }
  }

  renderGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    // Vérifier si les données sont chargées
    if (!this.isDataLoaded) {
      gallery.innerHTML = '<div class="gallery-loading">Chargement de la galerie...</div>';
      return;
    }

    // Calculer les éléments à afficher pour la page courante
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToShow = this.filteredItems.slice(startIndex, endIndex);

    // Remplir la galerie avec des éléments ou des placeholders
    let galleryHTML = '';
    
    for (let i = 0; i < this.itemsPerPage; i++) {
      if (i < itemsToShow.length) {
        galleryHTML += this.createGalleryItem(itemsToShow[i]);
      } else {
        // Créer un placeholder vide pour maintenir la grille
        galleryHTML += '<div class="gallery-item gallery-item--placeholder"></div>';
      }
    }

    gallery.innerHTML = galleryHTML;
    
    // Mettre à jour les contrôles de navigation
    this.updateNavigationControls();
    
    // Générer les données structurées pour la galerie
    Utils.generateGalleryStructuredData(this.filteredItems, this.getCategoryLabel.bind(this));
  }

  createGalleryItem(item) {
    const categories = item.category.split(' ').filter(cat => cat);
    const categoryClasses = categories.map(cat => `category-${cat}`).join(' ');
    const categoryLabel = this.getCategoryLabel(item.category);
    
    // Créer un texte alternatif plus descriptif pour le SEO
    const altText = `${categoryLabel} sur mesure - ${item.alt} - Métallerie Forge Perraut Cormatin`;
    
    return `
      <div class="gallery-item ${categoryClasses}" data-category="${item.category}" data-id="${item.id}">
        <img src="${item.src}" alt="${altText}" class="gallery-item__image" loading="lazy" title="${categoryLabel} - ${item.alt}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="gallery-item__overlay" style="display: none;">
          <span class="gallery-item__icon" aria-label="Voir en grand">🔍</span>
        </div>
        <div class="gallery-item__info">
          <span class="gallery-item__category">${categoryLabel}</span>
        </div>
      </div>
    `;
  }

  getCategoryLabel(category) {
    const categoryMap = {
      'escalier': 'Escalier métallique',
      'garde-corps': 'Garde-corps métallique',
      'rampe': 'Rampe d\'escalier',
      'pergola': 'Pergola métallique',
      'terrasse': 'Terrasse métallique',
      'mobilier': 'Mobilier métallique',
      'porte': 'Porte métallique',
      'portail': 'Portail métallique'
    };
    
    // Pour les catégories multiples, prendre la première
    const firstCategory = category.split(' ')[0];
    return categoryMap[firstCategory] || 'Réalisation métallique';
  }

  filterGallery(category) {
    this.currentFilter = category;
    
    if (category === 'all') {
      this.filteredItems = [...galleryData];
    } else {
      this.filteredItems = galleryData.filter(item => 
        item.category.includes(category)
      );
    }

    // Réinitialiser à la première page lors du filtrage
    this.currentPage = 0;
    
    this.renderGallery();
    this.updateEmptyState();
    this.updateFilterButtons(category);

    // Sur mobile : fermer le menu et défiler vers la galerie
    if (Utils.isMobile()) {
      this.closeMobileMenu();
      this.scrollToGallery();
    }
  }

  updateFilterButtons(activeCategory) {
    const buttons = document.querySelectorAll('.nav__filter');
    buttons.forEach(button => {
      const isActive = button.dataset.filter === activeCategory;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive);
    });
  }

  updateEmptyState() {
    const emptyState = document.getElementById('gallery-empty');
    if (!emptyState) return;

    if (this.filteredItems.length === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
    }
  }

  updateNavigationControls() {
    const controls = document.getElementById('gallery-controls');
    const currentPageSpan = document.getElementById('gallery-page-current');
    const totalPagesSpan = document.getElementById('gallery-page-total');
    const totalImagesSpan = document.getElementById('gallery-total-images');
    const pageDots = document.getElementById('gallery-page-dots');
    const swipeHint = document.getElementById('gallery-swipe-hint');

    if (!controls || !currentPageSpan || !totalPagesSpan || !totalImagesSpan || !pageDots) return;

    const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    
    // Afficher/masquer les contrôles selon le nombre de pages
    if (totalPages > 1) {
      controls.hidden = false;
      
      // Afficher l'indicateur de swipe sur mobile
      if (Utils.isMobile() && swipeHint) {
        swipeHint.classList.add('show');
        
        // Masquer l'indicateur après 5 secondes
        setTimeout(() => {
          if (swipeHint) {
            swipeHint.classList.remove('show');
          }
        }, 5000);
      }
    } else {
      controls.hidden = true;
      return;
    }

    // Mettre à jour les informations de page
    currentPageSpan.textContent = this.currentPage + 1;
    totalPagesSpan.textContent = totalPages;
    totalImagesSpan.textContent = this.filteredItems.length;

    // Générer les indicateurs de page
    pageDots.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = `gallery__page-dot ${i === this.currentPage ? 'active' : ''}`;
      dot.setAttribute('data-page', i);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Page ${i + 1} de ${totalPages}`);
      dot.setAttribute('aria-selected', i === this.currentPage ? 'true' : 'false');
      pageDots.appendChild(dot);
    }
  }

  bindEvents() {
    // Filtrage
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__filter')) {
        e.preventDefault();
        const category = e.target.dataset.filter;
        this.filterGallery(category);
      }
    });

    // Lightbox
    document.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-item')) {
        const item = e.target.closest('.gallery-item');
        const id = parseInt(item.dataset.id);
        this.openLightbox(id);
      }
    });

    // Navigation mobile
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.setAttribute('data-visible', !isExpanded);
      });
    }

    // Navigation par indicateurs de page
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('gallery__page-dot')) {
        const page = parseInt(e.target.dataset.page);
        this.goToPage(page);
      }
    });

    // Fermeture du menu mobile en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navigation')) {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        if (navToggle && navMenu) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.setAttribute('data-visible', 'false');
        }
      }
    });

    // Ajouter le swipe pour la pagination sur mobile
    if (Utils.isMobile()) {
      this.bindPaginationSwipe();
    }
  }

  openLightbox(id) {
    const item = galleryData.find(item => item.id === id);
    if (!item) return;

    this.currentIndex = this.filteredItems.findIndex(filteredItem => filteredItem.id === id);
    this.showLightbox(item);
  }

  showLightbox(item) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');

    if (lightboxImage) lightboxImage.src = item.full;
    if (lightboxImage) lightboxImage.alt = item.alt;
    if (lightboxCaption) lightboxCaption.textContent = item.alt;

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';

    // Bind lightbox events
    this.bindLightboxEvents();
  }

  bindLightboxEvents() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav--next');
    const overlay = lightbox.querySelector('.lightbox__overlay');

    // Fermeture
    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', closeLightbox);

    // Navigation
    prevBtn?.addEventListener('click', () => this.navigateLightbox('prev'));
    nextBtn?.addEventListener('click', () => this.navigateLightbox('next'));

    // Clavier
    const handleKeydown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          this.navigateLightbox('prev');
          break;
        case 'ArrowRight':
          this.navigateLightbox('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);

    // Nettoyage des événements
    lightbox.addEventListener('hidden', () => {
      document.removeEventListener('keydown', handleKeydown);
    });
  }

  navigateLightbox(direction) {
    if (this.filteredItems.length <= 1) return;

    if (direction === 'prev') {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.filteredItems.length - 1;
    } else {
      this.currentIndex = this.currentIndex < this.filteredItems.length - 1 ? this.currentIndex + 1 : 0;
    }

    const item = this.filteredItems[this.currentIndex];
    this.showLightbox(item);
  }





  goToPage(page) {
    const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    
    if (page < 0 || page >= totalPages) return;
    
    this.currentPage = page;
    this.renderGallery();
    
    // Faire défiler vers le haut de la galerie
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Méthodes pour le swipe mobile
  bindPaginationSwipe() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    let swipeDirection = '';

    // Démarrer le swipe
    gallery.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = false;
      swipeDirection = '';
    }, { passive: true });

    // Détecter le mouvement du swipe
    gallery.addEventListener('touchmove', (e) => {
      if (!isSwiping) {
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        // Détecter un swipe horizontal ou vertical
        if (deltaX > 10 || deltaY > 10) {
          isSwiping = true;
          swipeDirection = deltaX > deltaY ? 'horizontal' : 'vertical';
        }
      }
    }, { passive: true });

    // Traiter la fin du swipe
    gallery.addEventListener('touchend', (e) => {
      if (!isSwiping || swipeDirection !== 'horizontal') return;

      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
      const minSwipeDistance = 50; // Distance minimale pour déclencher le swipe

      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe vers la droite = page précédente
          this.swipeToPage('prev');
        } else {
          // Swipe vers la gauche = page suivante
          this.swipeToPage('next');
        }
      }

      // Reset
      isSwiping = false;
      swipeDirection = '';
    }, { passive: true });
  }

  swipeToPage(direction) {
    const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    
    if (totalPages <= 1) return; // Pas de pagination nécessaire

    let newPage = this.currentPage;

    if (direction === 'next' && this.currentPage < totalPages - 1) {
      newPage = this.currentPage + 1;
    } else if (direction === 'prev' && this.currentPage > 0) {
      newPage = this.currentPage - 1;
    }

    if (newPage !== this.currentPage) {
      this.goToPage(newPage);
      
      // Feedback visuel du swipe
      this.showSwipeFeedback(direction);
    }
  }

    showSwipeFeedback(direction) {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    // Ajouter une classe temporaire pour l'animation
    const feedbackClass = direction === 'next' ? 'swipe-left' : 'swipe-right';
    gallery.classList.add(feedbackClass);

    // Supprimer la classe après l'animation
    setTimeout(() => {
      gallery.classList.remove(feedbackClass);
    }, 300);
  }

  closeMobileMenu() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('data-visible', 'false');
    }
  }

  scrollToGallery() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      // Attendre un peu que le menu se ferme avant de défiler
      setTimeout(() => {
        // Ajouter une classe temporaire pour l'animation
        gallery.classList.add('filter-applied');
        
        // Défiler vers la galerie
        gallery.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });

        // Retirer la classe après l'animation
        setTimeout(() => {
          gallery.classList.remove('filter-applied');
        }, 1000);
      }, 150);
    }
  }

  showErrorMessage() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.innerHTML = `
        <div class="gallery-error">
          <p>Erreur lors du chargement de la galerie</p>
          <button onclick="location.reload()">Réessayer</button>
        </div>
      `;
    }
  }


}

// Gestionnaire de performance
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupLazyLoading();
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      // Observer les sections
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
    }
  }

  setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Le navigateur supporte le lazy loading natif
      return;
    }

    // Fallback pour les navigateurs plus anciens
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Gestionnaire d'accessibilité
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupAriaLabels();
  }

  setupSkipLinks() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  setupFocusManagement() {
    // Gérer le focus dans le lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.hidden) {
          const focusableElements = lightbox.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    });
  }

  setupAriaLabels() {
    // Ajouter des labels ARIA dynamiques
    const gallery = document.getElementById('gallery');
    if (gallery) {
      const updateAriaLabel = () => {
        const itemCount = gallery.children.length;
        gallery.setAttribute('aria-label', `Galerie de réalisations - ${itemCount} élément${itemCount > 1 ? 's' : ''}`);
      };
      
      updateAriaLabel();
      
      // Observer les changements dans la galerie
      const observer = new MutationObserver(updateAriaLabel);
      observer.observe(gallery, { childList: true });
    }
  }
}

// Gestionnaire d'animations
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupProgressBar();
  }

  setupProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = scrollPercent + '%';
    });
  }

}

// Gestionnaire de la bulle d'information
class InfoBubbleManager {
  constructor() {
    this.bubble = document.getElementById('info-bubble');
    this.toggle = document.getElementById('info-bubble-toggle');
    this.closeBtn = document.getElementById('info-bubble-close');
    this.isVisible = false;
    
    this.init();
  }

  init() {
    if (!this.bubble || !this.toggle || !this.closeBtn) return;

    // Gestionnaire pour ouvrir/fermer la bulle
    this.toggle.addEventListener('click', () => {
      this.toggleBubble();
    });

    // Gestionnaire pour fermer la bulle
    this.closeBtn.addEventListener('click', () => {
      this.hideBubble();
    });

    // Fermer la bulle en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!this.bubble.contains(e.target) && !this.toggle.contains(e.target)) {
        this.hideBubble();
      }
    });

    // Fermer la bulle avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hideBubble();
      }
    });

    // Gestion du swipe sur mobile pour fermer la bulle
    this.setupSwipeGesture();

    // L'infobulle reste fermée par défaut
    // L'utilisateur doit cliquer sur le bouton pour l'ouvrir
  }

  setupSwipeGesture() {
    if (!this.bubble) return;

    let startY = 0;
    let startX = 0;
    let isSwiping = false;

    // Détecter le début du swipe
    this.bubble.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      isSwiping = false;
    }, { passive: true });

    // Détecter le mouvement du swipe
    this.bubble.addEventListener('touchmove', (e) => {
      if (!isSwiping) {
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        
        // Détecter un swipe vertical ou horizontal
        if (deltaY > 10 || deltaX > 10) {
          isSwiping = true;
        }
      }
    }, { passive: true });

    // Détecter la fin du swipe
    this.bubble.addEventListener('touchend', (e) => {
      if (isSwiping) {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const deltaY = endY - startY;
        const deltaX = endX - startX;

        // Fermer la bulle si swipe vers le bas ou vers la droite
        if (deltaY > 50 || deltaX > 50) {
          this.hideBubble();
        }
      }
    }, { passive: true });
  }



  showBubble() {
    if (!this.bubble) return;
    
    // Afficher d'abord l'élément
    this.bubble.style.display = 'block';
    
    // Forcer un reflow pour que l'animation fonctionne
    this.bubble.offsetHeight;
    
    this.bubble.classList.add('show');
    this.isVisible = true;
    
    // Animation d'entrée
    this.bubble.style.transform = 'translateY(0) scale(1)';
    this.bubble.style.opacity = '1';
    this.bubble.style.visibility = 'visible';
  }

  hideBubble() {
    if (!this.bubble) return;
    
    this.bubble.classList.remove('show');
    this.isVisible = false;
    
    // Animation de sortie
    this.bubble.style.transform = 'translateY(20px) scale(0.95)';
    this.bubble.style.opacity = '0';
    this.bubble.style.visibility = 'hidden';
    
    // Masquer complètement après l'animation
    setTimeout(() => {
      if (!this.isVisible) {
        this.bubble.style.display = 'none';
      }
    }, 300);
  }

  toggleBubble() {
    if (this.isVisible) {
      this.hideBubble();
    } else {
      this.showBubble();
    }
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
  // Initialiser la galerie en premier (chargement asynchrone des données)
  const galleryManager = new GalleryManager();
  
  // Initialiser les autres gestionnaires
  new PerformanceManager();
  new AccessibilityManager();
  new AnimationManager();
  new InfoBubbleManager();

  document.body.classList.add('loaded');
});

// Gestionnaire d'erreurs silencieux pour la production


