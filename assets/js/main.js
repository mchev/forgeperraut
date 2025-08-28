// JavaScript pour Métallerie Forge Perraut

// Données de la galerie
const galleryData = [
  { id: 1, src: 'images/small00116.jpg', full: 'images/full00116.jpg', category: 'mobilier', alt: 'Mobilier métallique sur mesure' },
  { id: 2, src: 'images/small00115.jpg', full: 'images/full00115.jpg', category: 'mobilier', alt: 'Création mobilier unique' },
  { id: 3, src: 'images/small00114.jpg', full: 'images/full00114.jpg', category: 'garde-corps', alt: 'Garde-corps élégant' },
  { id: 4, src: 'images/small00113.jpg', full: 'images/full00113.jpg', category: 'escalier', alt: 'Escalier métallique design' },
  { id: 5, src: 'images/small00112.jpg', full: 'images/full00112.jpg', category: 'garde-corps', alt: 'Garde-corps contemporain' },
  { id: 6, src: 'images/small00111.jpg', full: 'images/full00111.jpg', category: 'garde-corps', alt: 'Garde-corps traditionnel' },
  { id: 7, src: 'images/small00110.jpg', full: 'images/full00110.jpg', category: 'escalier', alt: 'Escalier hélicoïdal' },
  { id: 8, src: 'images/small00109.jpg', full: 'images/full00109.jpg', category: 'escalier', alt: 'Escalier droit métallique' },
  { id: 9, src: 'images/small00108.jpg', full: 'images/full00108.jpg', category: 'escalier', alt: 'Escalier avec rampe' },
  { id: 10, src: 'images/small00107.jpg', full: 'images/full00107.jpg', category: 'escalier rampe', alt: 'Escalier et rampe combinés' },
  { id: 11, src: 'images/small00106.jpg', full: 'images/full00106.jpg', category: 'mobilier', alt: 'Mobilier de jardin' },
  { id: 12, src: 'images/small00105.jpg', full: 'images/full00105.jpg', category: 'mobilier', alt: 'Table et chaises métalliques' },
  { id: 13, src: 'images/small00104.jpg', full: 'images/full00104.jpg', category: 'mobilier', alt: 'Mobilier d\'extérieur' },
  { id: 14, src: 'images/small00103.jpg', full: 'images/full00103.jpg', category: 'mobilier', alt: 'Chaise longue métallique' },
  { id: 15, src: 'images/small00102.jpg', full: 'images/full00102.jpg', category: 'mobilier', alt: 'Mobilier de terrasse' },
  { id: 16, src: 'images/small00101.jpg', full: 'images/full00101.jpg', category: 'mobilier', alt: 'Mobilier urbain' },
  { id: 17, src: 'images/small00100.jpg', full: 'images/full00100.jpg', category: 'rampe', alt: 'Rampe d\'accès' },
  { id: 18, src: 'images/small00099.jpg', full: 'images/full00099.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 19, src: 'images/small00098.jpg', full: 'images/full00098.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 20, src: 'images/small00097.jpg', full: 'images/full00097.jpg', category: 'garde-corps', alt: 'Garde-corps moderne' },
  { id: 21, src: 'images/small00096.jpg', full: 'images/full00096.jpg', category: 'rampe', alt: 'Rampe d\'escalier' },
  { id: 22, src: 'images/small00095.jpg', full: 'images/full00095.jpg', category: 'rampe', alt: 'Rampe extérieure' },
  { id: 23, src: 'images/small00094.jpg', full: 'images/full00094.jpg', category: 'rampe', alt: 'Rampe d\'accès handicapé' },
  { id: 24, src: 'images/small00093.jpg', full: 'images/full00093.jpg', category: 'rampe', alt: 'Rampe de sécurité' },
  { id: 25, src: 'images/small00092.jpg', full: 'images/full00092.jpg', category: 'escalier', alt: 'Escalier extérieur' },
  { id: 26, src: 'images/small00091.jpg', full: 'images/full00091.jpg', category: 'escalier', alt: 'Escalier de jardin' },
  { id: 27, src: 'images/small00090.jpg', full: 'images/full00090.jpg', category: 'porte', alt: 'Porte métallique' },
  { id: 28, src: 'images/small00089.jpg', full: 'images/full00089.jpg', category: 'portail', alt: 'Portail d\'entrée' },
  { id: 29, src: 'images/small00088.jpg', full: 'images/full00088.jpg', category: 'portail', alt: 'Portail automatique' },
  { id: 30, src: 'images/small00087.jpg', full: 'images/full00087.jpg', category: 'porte', alt: 'Porte de garage' },
  { id: 31, src: 'images/small00086.jpg', full: 'images/full00086.jpg', category: 'porte', alt: 'Porte coulissante' },
  { id: 32, src: 'images/small00085.jpg', full: 'images/full00085.jpg', category: 'porte', alt: 'Porte pivotante' },
  { id: 33, src: 'images/small00084.jpg', full: 'images/full00084.jpg', category: 'porte', alt: 'Porte battante' },
  { id: 34, src: 'images/small00083.jpg', full: 'images/full00083.jpg', category: 'porte', alt: 'Porte d\'entrée' },
  { id: 35, src: 'images/small00082.jpg', full: 'images/full00082.jpg', category: 'porte', alt: 'Porte de service' },
  { id: 36, src: 'images/small00081.jpg', full: 'images/full00081.jpg', category: 'garde-corps', alt: 'Garde-corps de pont' },
  { id: 37, src: 'images/small00080.jpg', full: 'images/full00080.jpg', category: 'garde-corps', alt: 'Garde-corps de passerelle' },
  { id: 38, src: 'images/small00079.jpg', full: 'images/full00079.jpg', category: 'garde-corps escalier terrasse', alt: 'Garde-corps combiné' },
  { id: 39, src: 'images/small00078.jpg', full: 'images/full00078.jpg', category: 'escalier terrasse', alt: 'Escalier et terrasse' },
  { id: 40, src: 'images/small00077.jpg', full: 'images/full00077.jpg', category: 'porte', alt: 'Porte de cave' },
  { id: 41, src: 'images/small00076.jpg', full: 'images/full00076.jpg', category: 'rampe', alt: 'Rampe de chargement' },
  { id: 42, src: 'images/small00073.jpg', full: 'images/full00073.jpg', category: 'mobilier', alt: 'Mobilier de bureau' },
  { id: 43, src: 'images/small00072.jpg', full: 'images/full00072.jpg', category: 'mobilier', alt: 'Mobilier industriel' },
  { id: 44, src: 'images/small00071.jpg', full: 'images/full00071.jpg', category: 'mobilier', alt: 'Mobilier de restaurant' },
  { id: 45, src: 'images/small00070.jpg', full: 'images/full00070.jpg', category: 'mobilier', alt: 'Mobilier de salon' },
  { id: 46, src: 'images/small00069.jpg', full: 'images/full00069.jpg', category: 'rampe', alt: 'Rampe de secours' },
  { id: 47, src: 'images/small00068.jpg', full: 'images/full00068.jpg', category: 'rampe', alt: 'Rampe de maintenance' },
  { id: 48, src: 'images/small00067.jpg', full: 'images/full00067.jpg', category: 'rampe', alt: 'Rampe de service' },
  { id: 49, src: 'images/small00066.jpg', full: 'images/full00066.jpg', category: 'rampe', alt: 'Rampe de chargement' },
  { id: 50, src: 'images/small00065.jpg', full: 'images/full00065.jpg', category: 'mobilier', alt: 'Mobilier de jardin' },
  { id: 51, src: 'images/small00064.jpg', full: 'images/full00064.jpg', category: 'mobilier', alt: 'Mobilier de terrasse' },
  { id: 52, src: 'images/small00063.jpg', full: 'images/full00063.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 53, src: 'images/small00062.jpg', full: 'images/full00062.jpg', category: 'terrasse', alt: 'Terrasse métallique' },
  { id: 54, src: 'images/small00061.jpg', full: 'images/full00061.jpg', category: 'terrasse', alt: 'Terrasse surélevée' },
  { id: 55, src: 'images/small00060.jpg', full: 'images/full00060.jpg', category: 'terrasse escalier', alt: 'Terrasse avec escalier' },
  { id: 56, src: 'images/small00059.jpg', full: 'images/full00059.jpg', category: 'terrasse escalier', alt: 'Terrasse et escalier' },
  { id: 57, src: 'images/small00058.jpg', full: 'images/full00058.jpg', category: 'porte', alt: 'Porte de jardin' },
  { id: 58, src: 'images/small00057.jpg', full: 'images/full00057.jpg', category: 'porte', alt: 'Porte de clôture' },
  { id: 59, src: 'images/small00056.jpg', full: 'images/full00056.jpg', category: 'terrasse', alt: 'Terrasse bois et métal' },
  { id: 60, src: 'images/small00055.jpg', full: 'images/full00055.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 61, src: 'images/small00054.jpg', full: 'images/full00054.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 62, src: 'images/small00053.jpg', full: 'images/full00053.jpg', category: 'garde-corps', alt: 'Garde-corps moderne' },
  { id: 63, src: 'images/small00052.jpg', full: 'images/full00052.jpg', category: 'garde-corps', alt: 'Garde-corps traditionnel' },
  { id: 64, src: 'images/small00051.jpg', full: 'images/full00051.jpg', category: 'garde-corps', alt: 'Garde-corps de pont' },
  { id: 65, src: 'images/small00050.jpg', full: 'images/full00050.jpg', category: 'garde-corps', alt: 'Garde-corps de passerelle' },
  { id: 66, src: 'images/small00049.jpg', full: 'images/full00049.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 67, src: 'images/small00048.jpg', full: 'images/full00048.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 68, src: 'images/small00047.jpg', full: 'images/full00047.jpg', category: '', alt: 'Réalisation métallique' },
  { id: 69, src: 'images/small00046.jpg', full: 'images/full00046.jpg', category: 'terrasse', alt: 'Terrasse métallique' },
  { id: 70, src: 'images/small00045.jpg', full: 'images/full00045.jpg', category: 'terrasse', alt: 'Terrasse surélevée' },
  { id: 71, src: 'images/small00044.jpg', full: 'images/full00044.jpg', category: 'terrasse', alt: 'Terrasse de jardin' },
  { id: 72, src: 'images/small00043.jpg', full: 'images/full00043.jpg', category: 'terrasse', alt: 'Terrasse contemporaine' },
  { id: 73, src: 'images/small00042.jpg', full: 'images/full00042.jpg', category: 'terrasse', alt: 'Terrasse moderne' },
  { id: 74, src: 'images/small00041.jpg', full: 'images/full00041.jpg', category: 'rampe', alt: 'Rampe d\'accès' },
  { id: 75, src: 'images/small00040.jpg', full: 'images/full00040.jpg', category: 'terrasse', alt: 'Terrasse avec garde-corps' },
  { id: 76, src: 'images/small00039.jpg', full: 'images/full00039.jpg', category: 'escalier', alt: 'Escalier extérieur' },
  { id: 77, src: 'images/small00038.jpg', full: 'images/full00038.jpg', category: 'escalier', alt: 'Escalier de jardin' },
  { id: 78, src: 'images/small00037.jpg', full: 'images/full00037.jpg', category: 'terrasse', alt: 'Terrasse bois et métal' },
  { id: 79, src: 'images/small00036.jpg', full: 'images/full00036.jpg', category: 'terrasse', alt: 'Terrasse surélevée' },
  { id: 80, src: 'images/small00035.jpg', full: 'images/full00035.jpg', category: 'escalier', alt: 'Escalier hélicoïdal' },
  { id: 81, src: 'images/small00034.jpg', full: 'images/full00034.jpg', category: 'escalier', alt: 'Escalier droit' },
  { id: 82, src: 'images/small00033.jpg', full: 'images/full00033.jpg', category: 'escalier rampe', alt: 'Escalier avec rampe' },
  { id: 83, src: 'images/small00032.jpg', full: 'images/full00032.jpg', category: 'escalier rampe', alt: 'Escalier et rampe' },
  { id: 84, src: 'images/small00031.jpg', full: 'images/full00031.jpg', category: 'garde-corps', alt: 'Garde-corps de pont' },
  { id: 85, src: 'images/small00030.jpg', full: 'images/full00030.jpg', category: 'garde-corps', alt: 'Garde-corps de passerelle' },
  { id: 86, src: 'images/small00029.jpg', full: 'images/full00029.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 87, src: 'images/small00028.jpg', full: 'images/full00028.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 88, src: 'images/small00027.jpg', full: 'images/full00027.jpg', category: 'garde-corps', alt: 'Garde-corps moderne' },
  { id: 89, src: 'images/small00026.jpg', full: 'images/full00026.jpg', category: 'portail', alt: 'Portail d\'entrée' },
  { id: 90, src: 'images/small00025.jpg', full: 'images/full00025.jpg', category: 'portail', alt: 'Portail automatique' },
  { id: 91, src: 'images/small00024.jpg', full: 'images/full00024.jpg', category: 'portail', alt: 'Portail de garage' },
  { id: 92, src: 'images/small00023.jpg', full: 'images/full00023.jpg', category: 'mobilier', alt: 'Mobilier de jardin' },
  { id: 93, src: 'images/small00022.jpg', full: 'images/full00022.jpg', category: 'escalier', alt: 'Escalier extérieur' },
  { id: 94, src: 'images/small00021.jpg', full: 'images/full00021.jpg', category: 'escalier', alt: 'Escalier de jardin' },
  { id: 95, src: 'images/small00020.jpg', full: 'images/full00020.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 96, src: 'images/small00019.jpg', full: 'images/full00019.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 97, src: 'images/small00018.jpg', full: 'images/full00018.jpg', category: 'garde-corps', alt: 'Garde-corps moderne' },
  { id: 98, src: 'images/small00017.jpg', full: 'images/full00017.jpg', category: 'garde-corps', alt: 'Garde-corps traditionnel' },
  { id: 99, src: 'images/small00016.jpg', full: 'images/full00016.jpg', category: 'pergola', alt: 'Pergola métallique' },
  { id: 100, src: 'images/small00015.jpg', full: 'images/full00015.jpg', category: 'pergola', alt: 'Pergola de jardin' },
  { id: 101, src: 'images/small00014.jpg', full: 'images/full00014.jpg', category: 'mobilier', alt: 'Mobilier de terrasse' },
  { id: 102, src: 'images/small00013.jpg', full: 'images/full00013.jpg', category: 'mobilier', alt: 'Mobilier d\'extérieur' },
  { id: 103, src: 'images/small00012.jpg', full: 'images/full00012.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 104, src: 'images/small00011.jpg', full: 'images/full00011.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 105, src: 'images/small00010.jpg', full: 'images/full00010.jpg', category: 'garde-corps', alt: 'Garde-corps moderne' },
  { id: 106, src: 'images/small00009.jpg', full: 'images/full00009.jpg', category: 'porte', alt: 'Porte de jardin' },
  { id: 107, src: 'images/small00008.jpg', full: 'images/full00008.jpg', category: 'porte', alt: 'Porte de clôture' },
  { id: 108, src: 'images/small00007.jpg', full: 'images/full00007.jpg', category: 'mobilier', alt: 'Mobilier de jardin' },
  { id: 109, src: 'images/small00006.jpg', full: 'images/full00006.jpg', category: 'garde-corps', alt: 'Garde-corps de terrasse' },
  { id: 110, src: 'images/small00005.jpg', full: 'images/full00005.jpg', category: 'garde-corps', alt: 'Garde-corps de balcon' },
  { id: 111, src: 'images/small00004.jpg', full: 'images/full00004.jpg', category: 'mobilier', alt: 'Mobilier de terrasse' },
  { id: 112, src: 'images/small00003.jpg', full: 'images/full00003.jpg', category: 'mobilier', alt: 'Mobilier d\'extérieur' },
  { id: 113, src: 'images/small00002.jpg', full: 'images/full00002.jpg', category: 'mobilier', alt: 'Mobilier de jardin' },
  { id: 114, src: 'images/small00001.jpg', full: 'images/full00001.jpg', category: 'rampe', alt: 'Rampe d\'accès' }
];

// Gestionnaire de galerie
class GalleryManager {
  constructor() {
    this.currentFilter = 'all';
    this.currentIndex = 0;
    this.filteredItems = [...galleryData];
    this.currentPage = 0;
    this.itemsPerPage = this.isMobile() ? 6 : 12; // Adapté pour mobile
    this.init();
  }

  // Détection mobile améliorée
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768 || 
           ('ontouchstart' in window);
  }

  init() {
    this.renderGallery();
    this.bindEvents();
    this.updateCurrentYear();
    
    // Adapter la taille de la galerie lors du redimensionnement
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    // Mettre à jour le nombre d'éléments par page lors du redimensionnement
    const newItemsPerPage = this.isMobile() ? 6 : 12;
    if (newItemsPerPage !== this.itemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.currentPage = 0; // Retour à la première page
      this.renderGallery();
    }
  }

  renderGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

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
    this.generateGalleryStructuredData();
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
    if (this.isMobile()) {
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
      if (this.isMobile() && swipeHint) {
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
    if (this.isMobile()) {
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

  updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }



  // Générer les données structurées pour la galerie
  generateGalleryStructuredData() {
    const galleryItems = this.filteredItems.map(item => ({
      "@type": "ImageObject",
      "name": `${this.getCategoryLabel(item.category)} sur mesure`,
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
    this.animatedElements = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupLoadAnimations();
    this.setupHoverEffects();
    this.setupProgressBar();
  }

  setupScrollAnimations() {
    // Créer l'Intersection Observer pour les animations au scroll
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Ajouter un délai pour les éléments enfants
          const children = entry.target.querySelectorAll('.animate-on-scroll');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observer tous les éléments avec la classe animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
      this.observer.observe(element);
    });

    // Observer les éléments de la galerie pour des animations spéciales
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      
      const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            itemObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      itemObserver.observe(item);
    });
  }

  setupLoadAnimations() {
    // Animation du logo
    const logo = document.querySelector('.logo img');
    if (logo) {
      logo.style.opacity = '0';
      setTimeout(() => {
        logo.style.opacity = '1';
      }, 100);
    }

    // Animation du header
    const headerElements = [
      '.header__title',
      '.header__subtitle', 
      '.header__description'
    ];

    headerElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '0';
        setTimeout(() => {
          element.style.opacity = '1';
        }, 200 + (index * 200));
      }
    });

    // Animation de la navigation
    const navItems = document.querySelectorAll('.nav__menu li');
    navItems.forEach((item, index) => {
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.opacity = '1';
      }, 1000 + (index * 100));
    });

    // Animation des sections
    const sections = document.querySelectorAll('.section-header');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      setTimeout(() => {
        section.style.opacity = '1';
      }, 1500 + (index * 300));
    });

    // Animation des boutons CTA
    const ctaButtons = document.querySelectorAll('.cta__actions .btn');
    ctaButtons.forEach((btn, index) => {
      btn.style.opacity = '0';
      setTimeout(() => {
        btn.style.opacity = '1';
      }, 2000 + (index * 200));
    });

    // Animation du lien Instagram
    const instagramLink = document.querySelector('.cta__instagram');
    if (instagramLink) {
      instagramLink.style.opacity = '0';
      setTimeout(() => {
        instagramLink.style.opacity = '1';
      }, 2500);
    }

    // Animation des éléments de contact
    const contactItems = document.querySelectorAll('.contact__item');
    contactItems.forEach((item, index) => {
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.opacity = '1';
      }, 3000 + (index * 200));
    });

    // Animation de la carte
    const map = document.querySelector('.contact__map');
    if (map) {
      map.style.opacity = '0';
      setTimeout(() => {
        map.style.opacity = '1';
      }, 4000);
    }

    // Animation du footer
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.style.opacity = '0';
      setTimeout(() => {
        footer.style.opacity = '1';
      }, 4500);
    }
  }

  setupHoverEffects() {
    // Effets de hover pour les éléments interactifs
    const interactiveElements = document.querySelectorAll('.btn, .nav__filter, .gallery-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
      });
    });
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

  // Méthode pour animer un élément spécifique
  animateElement(element, animationClass) {
    element.classList.add(animationClass);
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, 800);
  }

  // Méthode pour réinitialiser les animations
  resetAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      element.classList.remove('animate-in');
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

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
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
document.addEventListener('DOMContentLoaded', () => {
  new GalleryManager();
  new PerformanceManager();
  new AccessibilityManager();
  new AnimationManager();
  new InfoBubbleManager();

  document.body.classList.add('loaded');
});

// Gestionnaire d'erreurs silencieux pour la production


