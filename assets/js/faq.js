/**
 * FAQ Manager - Gestion dynamique de la FAQ
 * Charge les questions depuis le fichier JSON et gère l'interactivité
 */

class FAQManager {
    constructor() {
        this.faqData = null;
        this.currentSearch = '';
        this.init();
    }

    async init() {
        try {
            await this.loadFAQData();
            this.setupEventListeners();
            this.renderFAQ();
        } catch (error) {
            console.error('Erreur lors du chargement de la FAQ:', error);
            this.showError();
        }
    }

    async loadFAQData() {
        const response = await fetch('faq.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.faqData = await response.json();
    }

    setupEventListeners() {
        // Barre de recherche
        const searchInput = document.getElementById('faq-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Bouton de recherche
        const searchButton = document.querySelector('.faq__search-button');
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                this.handleSearch(searchInput.value);
            });
        }
    }



    handleSearch(searchTerm) {
        this.currentSearch = searchTerm.toLowerCase().trim();
        this.renderFAQ();
    }

    getFilteredQuestions() {
        if (!this.faqData) return [];

        let questions = this.faqData.faq.questions;

        // Filtrage par recherche uniquement
        if (this.currentSearch) {
            questions = questions.filter(q => 
                q.question.toLowerCase().includes(this.currentSearch) ||
                q.answer.toLowerCase().includes(this.currentSearch) ||
                q.keywords.some(keyword => keyword.toLowerCase().includes(this.currentSearch))
            );
        }

        return questions;
    }

    renderFAQ() {
        const faqList = document.getElementById('faq-list');
        const faqEmpty = document.getElementById('faq-empty');
        
        if (!faqList) return;

        const filteredQuestions = this.getFilteredQuestions();

        if (filteredQuestions.length === 0) {
            faqList.innerHTML = '';
            if (faqEmpty) {
                faqEmpty.hidden = false;
            }
            return;
        }

        if (faqEmpty) {
            faqEmpty.hidden = true;
        }

        // Générer le HTML pour chaque question
        const faqHTML = filteredQuestions.map(question => this.generateQuestionHTML(question)).join('');
        faqList.innerHTML = faqHTML;

        // Ajouter les event listeners pour l'ouverture/fermeture
        this.setupQuestionEventListeners();
    }

    generateQuestionHTML(question) {
        // Génération du HTML avec balisage Schema.org complet pour le SEO
        return `
            <div class="faq__item" data-question-id="${question.id}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <button class="faq__question" aria-expanded="false" aria-controls="answer-${question.id}">
                    <span itemprop="name">${question.question}</span>
                    <svg class="faq__question-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <div class="faq__answer" id="answer-${question.id}" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <div class="faq__answer-content" itemprop="text">
                        ${question.answer}
                    </div>
                </div>
            </div>
        `;
    }

    setupQuestionEventListeners() {
        const questionButtons = document.querySelectorAll('.faq__question');
        
        questionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.toggleQuestion(e.target);
            });
        });
    }

    toggleQuestion(button) {
        const faqItem = button.closest('.faq__item');
        const answer = faqItem.querySelector('.faq__answer');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Fermer toutes les autres questions
        document.querySelectorAll('.faq__item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const otherButton = item.querySelector('.faq__question');
                const otherAnswer = item.querySelector('.faq__answer');
                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0';
            }
        });

        // Basculer l'état de la question actuelle
        if (isExpanded) {
            faqItem.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0';
        } else {
            faqItem.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }

    showError() {
        const faqList = document.getElementById('faq-list');
        if (faqList) {
            faqList.innerHTML = `
                <div class="faq__error">
                    <p>Désolé, une erreur est survenue lors du chargement de la FAQ.</p>
                    <p>Veuillez rafraîchir la page ou nous contacter directement.</p>
                </div>
            `;
        }
    }

    // Méthode publique pour ajouter une nouvelle question (pour les mises à jour)
    addQuestion(questionData) {
        if (this.faqData && this.faqData.faq.questions) {
            this.faqData.faq.questions.push(questionData);
            this.renderFAQ();
        }
    }

    // Méthode publique pour mettre à jour une question existante
    updateQuestion(questionId, updatedData) {
        if (this.faqData && this.faqData.faq.questions) {
            const questionIndex = this.faqData.faq.questions.findIndex(q => q.id === questionId);
            if (questionIndex !== -1) {
                this.faqData.faq.questions[questionIndex] = { ...this.faqData.faq.questions[questionIndex], ...updatedData };
                this.renderFAQ();
            }
        }
    }
}

// Initialisation de la FAQ quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new FAQManager();
});

// Export pour utilisation dans d'autres modules si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQManager;
}
