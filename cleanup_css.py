#!/usr/bin/env python3
"""
Script de nettoyage du CSS pour Forge Perraut
Supprime les classes non utilisées et les commentaires de debug
"""

import re
import os

def clean_css_file(css_file_path, html_file_path):
    """Nettoie le fichier CSS en supprimant les classes non utilisées"""
    
    # Lire le fichier HTML pour identifier les classes utilisées
    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Extraire toutes les classes utilisées dans le HTML
    class_pattern = r'class="([^"]*)"'
    used_classes = set()
    
    for match in re.finditer(class_pattern, html_content):
        classes = match.group(1).split()
        used_classes.update(classes)
    
    print(f"Classes utilisées dans le HTML: {len(used_classes)}")
    print(f"Classes: {sorted(used_classes)}")
    
    # Lire le fichier CSS
    with open(css_file_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Supprimer les sections about__* non utilisées
    about_sections = [
        r'/\* ===== SECTION À PROPOS ===== \*/\s*\n\s*\.about__content\s*\{[^}]*\}',
        r'/\* ===== SECTION PRINCIPALE ===== \*/\s*\n\s*\.about__main\s*\{[^}]*\}',
        r'/\* ===== CONTENU PRINCIPAL ===== \*/\s*\n\s*\.about__main-content\s*\{[^}]*\}',
        r'/\* ===== INFORMATIONS ATELIER ===== \*/\s*\n\s*\.about__workshop-info,\s*\.about__method\s*\{[^}]*\}',
        r'\.about__subtitle\s*\{[^}]*\}',
        r'\.about__text\s*\{[^}]*\}',
        r'/\* ===== RÉALISATIONS ===== \*/\s*\n\s*\.about__realizations\s*\{[^}]*\}',
        r'\.realizations__grid\s*\{[^}]*\}',
        r'\.realization__item\s*\{[^}]*\}',
        r'\.realization__item:hover\s*\{[^}]*\}',
        r'\.realization__text\s*\{[^}]*\}',
        r'/\* ===== SECTION INSTAGRAM ===== \*/\s*\n\s*\.about__instagram-section\s*\{[^}]*\}',
        r'\.about__instagram\s*\{[^}]*\}',
        r'/\* ===== LIEN INSTAGRAM DANS LES CARTES ===== \*/\s*\n\s*\.info-card__instagram\s*\{[^}]*\}',
        r'\.instagram-link--small\s*\{[^}]*\}',
        r'\.instagram-link--small::before\s*\{[^}]*\}',
        r'\.instagram-link--small:hover\s*\{[^}]*\}',
        r'\.instagram-link--small:hover::before\s*\{[^}]*\}',
        r'\.instagram-logo--small\s*\{[^}]*\}',
        r'\.instagram-text--small\s*\{[^}]*\}',
        r'/\* ===== ACTIONS ===== \*/\s*\n\s*\.about__actions\s*\{[^}]*\}',
        r'/\* ===== SECTION LATÉRALE ===== \*/\s*\n\s*\.about__side\s*\{[^}]*\}',
        r'/\* ===== CARTE ===== \*/\s*\n\s*\.about__map\s*\{[^}]*\}',
        r'/\* ===== INFORMATIONS PRATIQUES ===== \*/\s*\n\s*\.about__practical-info\s*\{[^}]*\}',
        r'\.practical-info__title\s*\{[^}]*\}',
        r'\.practical-info__list\s*\{[^}]*\}',
        r'\.practical-info__item\s*\{[^}]*\}'
    ]
    
    # Supprimer les sections about__* et autres classes non utilisées
    for pattern in about_sections:
        css_content = re.sub(pattern, '', css_content, flags=re.DOTALL)
    
    # Supprimer les commentaires de debug
    debug_comments = [
        r'/\* ===== [^=]* ===== \*/',
        r'/\* Debug: [^*]*\*/',
        r'/\* TODO: [^*]*\*/',
        r'/\* FIXME: [^*]*\*/'
    ]
    
    for pattern in debug_comments:
        css_content = re.sub(pattern, '', css_content)
    
    # Nettoyer les lignes vides multiples
    css_content = re.sub(r'\n\s*\n\s*\n', '\n\n', css_content)
    
    # Supprimer les espaces en début et fin
    css_content = css_content.strip()
    
    # Écrire le fichier nettoyé
    backup_path = css_file_path + '.backup'
    os.rename(css_file_path, backup_path)
    
    with open(css_file_path, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    print(f"CSS nettoyé et sauvegardé dans {backup_path}")
    print(f"Taille originale: {os.path.getsize(backup_path)} bytes")
    print(f"Taille après nettoyage: {os.path.getsize(css_file_path)} bytes")

if __name__ == "__main__":
    css_file = "assets/css/main.css"
    html_file = "index.html"
    
    if os.path.exists(css_file) and os.path.exists(html_file):
        clean_css_file(css_file, html_file)
    else:
        print("Fichiers non trouvés. Vérifiez les chemins.")
