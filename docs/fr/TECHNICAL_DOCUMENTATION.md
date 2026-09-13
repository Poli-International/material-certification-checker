# Décodeur de Certification des Matériaux : Architecture Technique (Français)

## Table des Matières

1. [Vue d'Ensemble de l'Architecture](#vue-densemble-de-larchitecture)
2. [Organisation du Système de Fichiers](#organisation-du-système-de-fichiers)
3. [Sous-Systèmes et Composants](#sous-systèmes-et-composants)
   - [Lecteur de Certificats et Analyseur de Texte](#1-lecteur-de-certificats-et-analyseur-de-texte)
   - [Générateur de Questionnaire Technique pour Fournisseurs](#2-générateur-de-questionnaire-technique-pour-fournisseurs)
   - [Matrice Allégations / Justificatifs](#3-matrice-allégations--justificatifs)
   - [Comparateur Cô̂te à Cô̂te de Matériaux Certifiés](#4-comparateur-côte-à-côte-de-matériaux-certifiés)
   - [Registre de Réception et de Conformité du Studio](#5-registre-de-réception-et-de-conformité-du-studio)
   - [Bibliothèque des Normes Réglementaires](#6-bibliothèque-des-normes-réglementaires)
   - [Mélangeur de Compatibilité Galvanique et Chimique](#7-mélangeur-de-compatibilité-galvanique-et-chimique)
   - [Référentiel d'Asepsie et de Stérilisation en Studio](#8-référentiel-dasepsie-et-de-stérilisation-en-studio)
4. [Schémas et Structures de Données](#schémas-et-structures-de-données)
5. [Logique Clinique d'Évaluation de la Biocompatibilité](#logique-clinique-dévaluation-de-la-biocompatibilité)
6. [Moteur d'Internationalisation (I18N)](#moteur-dinternationalisation-i18n)
7. [Accessibilité, Design Réactif et Moteur d'Impression](#accessibilité-design-réactif-et-moteur-dimpression)
8. [Vérification Automatisée et Assurance Qualité](#vérification-automatisée-et-assurance-qualité)

---

## Vue d'Ensemble de l'Architecture

Le **Décodeur de Certification des Matériaux** est conçu comme une application web statique haute performance exécutée exclusivement côté client, sans aucune dépendance logicielle externe. Elle ne nécessite aucun serveur applicatif distant, aucune base de données hébergée et aucun réseau de diffusion de contenu (CDN) tiers. L'ensemble des traitements d'analyse lexicale, des algorithmes d'évaluation clinique et des mécanismes de rendu est exécuté localement dans le navigateur.

### Principes Architecturaux Clés
- **Confidentialité Totale des Données** : Les certificats de contrôle (CCT), devis, factures et fiches de réception restent stockés localement au sein du navigateur via `localStorage`.
- **Zéro Dépendance Externe** : Les polices, feuilles de style, scripts et éléments graphiques sont distribués localement à l'aide de chemins relatifs.
- **Démarrage Instantané et Performances Maximales** : Affichage initial immédiat sans blocage lié au réseau.
- **Fonctionnement Hors-Ligne Intégral** : Utilisation possible dans les studios sans accès internet permanent.

### Technologies Principales
- **HTML5** : Balisage sémantique incluant les repères ARIA, rôles d'accessibilité, zones de statut dynamiques et gestion du focus clavier.
- **CSS3** : Jetons graphiques personnalisés, mises en page réactives basées sur CSS Grid et Flexbox, et règles d'impression dédiées.
- **JavaScript Standard (ES6+)** : Modules IIFE (Immediately Invoked Function Expressions) isolés et rattachés à l'espace de noms global `window`.
- **Stockage Local** : Sérialisation JSON au sein de l'API `localStorage` pour l'historique des réceptions et les audits de traçabilité.

---

## Organisation du Système de Fichiers

```
material-certification-checker/
├── index.html                     # Point d'entrée principal de l'application
├── documentation.html             # Documentation technique et glossaire des normes
├── embed.html                     # Générateur de widget intégrable par iframe
├── css/
│   └── style.css                  # Feuilles de style, jetons graphiques, styles d'impression
├── images/
│   └── Poli-International-Co.webp # Logo de la marque
├── js/
│   ├── i18n.js                    # Gestionnaire central I18N et dictionnaire anglais
│   ├── i18n/                      # Dictionnaires traduits (parité intégrale de clés)
│   │   ├── fr.js                  # Français
│   │   ├── de.js                  # Allemand
│   │   ├── it.js                  # Italien
│   │   ├── es.js                  # Espagnol
│   │   ├── pt.js                  # Portugais
│   │   └── nl.js                  # Néerlandais
│   ├── certification-data.js      # Répertoire des normes réglementaires (ASTM, ISO, USP, EN)
│   ├── material-data.js           # Profils physiques, chimiques et de biocompatibilité
│   ├── v2-data.js                 # Préréglages, questionnaires et matrice d'allégations
│   ├── v2-features.js             # Moteur du lecteur, feuilles de questions, comparateur
│   ├── library.js                 # Moteur d'exploration du catalogue de normes
│   ├── mixer.js                   # Analyseur de corrosion galvanique et d'affinité
│   ├── reference-studio.js        # Référentiel de stérilisation et d'asepsie
│   ├── studio-vault.js            # Coffre-fort local des fiches de contrôle
│   ├── decoder.js                 # Contrôleurs de recherche et du glossaire
│   └── common.js                  # Thème clair/sombre, modales, communication iframe
└── docs/                          # Documentation multilingue en 7 langues
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Sous-Systèmes et Composants

### 1. Lecteur de Certificats et Analyseur de Texte
**Fichier :** `js/v2-features.js`
Analyse le texte brut issu d'étiquettes, de factures commerciales et de certificats matière de fonderie (MTC) :
- **Reconnaissance de Motifs** : Expressions régulières identifiant les codes normatifs (ASTM F136, ASTM F138, ISO 5832-3, USP Classe VI), les désignations de fusion (ELI / Extra Low Interstitial, VAR), les symboles chimiques et les formules commerciales ambiguës.
- **Classification par Niveaux de Biocompatibilité** :
  - `tier-compliant` : Norme d'implant chirurgical reconnue (ex. Titane ASTM F136, Acier ASTM F138, polymère médical biocompatible BioFlex).
  - `tier-caution` : Grades commerciaux ou non destinés à l'implantation (ex. AISI 316L standard sans refusion sous vide, G23 sans référence ASTM F136, acryliques PMMA).
  - `tier-unverified` : Formules purement publicitaires sans documentation vérifiable ("hypoallergénique", "acier chirurgical", "alliage métallique").
- **Sélecteur de Préréglages** : Exemples interactifs démontrant immédiatement l'évaluation de déclarations courantes de fournisseurs.

### 2. Générateur de Questionnaire Technique pour Fournisseurs
**Fichier :** `js/v2-features.js`
Transforme le matériau ciblé et la zone tissulaire prévue en un questionnaire d'audit opposable :
- **Contexte Tissulaire** : Différencie le perçage initial (plaie active nécessitant des matériaux certifiés chimiquement stables et sans relargage toxique) des perçages cicatrisés et du contact buccal.
- **Critères de Réception Impératifs** : Rappelle les exigences minimales en studio incluant la traçabilité de fonderie, l'état de surface (Ra <= 0.05 µm / poli miroir) et les certificats de passivation.
- **Questions Précises** : Génère 4 à 6 questions techniques associées aux réponses satisfaisantes attendues et aux signaux d'alerte critiques.
- **Impression et Export** : Formatage prêt à l'impression avec zones de visa manuel pour le dossier qualité du studio.

### 3. Matrice Allégations / Justificatifs
**Fichier :** `js/v2-features.js` et `js/v2-data.js`
Outil interactif reliant 12 allégations commerciales courantes aux documents de preuve indispensables :
- **Catégories** : Métaux, Polymères et Allégations Générales de qualité.
- **Documents Requis** : Précise la nature exacte du document obligatoire (Certificat de conformité de coulée, analyse spectrométrique, test de cytotoxicité ISO 10993-5, validation USP Classe VI).
- **Conséquences d'une Absence** : Évalue les risques cliniques en cas de défaut de preuve documentaire.
- **Filtrage et Recherche** : Recherche instantanée et filtres par catégorie appliqués sur l'ensemble des termes localisés.

### 4. Comparateur Cô̂te à Cô̂te de Matériaux Certifiés
**Fichier :** `js/v2-features.js`
Module d'analyse comparative permettant d'évaluer simultanément deux ou trois matériaux :
- **Paramètres Comparés** : Limites de composition certifiée, normes de réponse biologique, seuils de libération de nickel (EN 1811), tenue thermique en autoclave, état de surface et recommandation clinique.
- **Alertes Inter-Catégories** : Signale les particularités physiques et cliniques lors de la mise en regard de métaux chirurgicaux et de polymères biocompatibles.

### 5. Registre de Réception et de Conformité du Studio
**Fichier :** `js/studio-vault.js`
Registre local de gestion de la qualité pour les livraisons de bijoux corporels :
- **Données Enregistrées** : Identifiant fournisseur, référence de lot ou de bon de commande, classification matière, statut de conformité et notes de l'opérateur.
- **Stockage** : API `localStorage` du navigateur avec gestion des erreurs et absence de pistage.
- **Fonctionnalités** : Consultation, suppression, impression récapitulative et export/import au format JSON.

### 6. Bibliothèque des Normes Réglementaires
**Fichier :** `js/library.js` et `js/certification-data.js`
Base documentaire consultable détaillant les résumés et exigences clés des normes ASTM International, ISO, USP et normes européennes (EN).

### 7. Mélangeur de Compatibilité Galvanique et Chimique
**Fichier :** `js/mixer.js`
Évalue les risques de corrosion galvanique entre éléments de bijouterie assemblés (tiges, embouts vissables, billes) immergés dans les électrolytes biologiques humains (salive, sueur, sang).

### 8. Référentiel d'Asepsie et de Stérilisation en Studio
**Fichier :** `js/reference-studio.js`
Protocoles cliniques encadrant la stérilisation à la vapeur d'eau saturée (121°C à 134°C), le nettoyage aux ultrasons, les bains désinfectants et les limites thermiques spécifiques à chaque matériau.

---

## Schémas et Structures de Données

### Modèle de Norme Réglementaire (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Spécification normalisée pour le titane-6aluminium-4vanadium ELI forgé pour implants chirurgicaux",
  scope: "Perçage initial, contact tissulaire prolongé, dispositifs médicaux implantables",
  implant_certified: true,
  nickel_content: "< 0,01% (Indétectable)",
  autoclave_compatible: true,
  key_requirements: [
    "Grade ELI (Extra Low Interstitial)",
    "Résistance à la traction >= 860 MPa",
    "Biocompatibilité attestée après passivation ASTM F86"
  ]
}
```

### Modèle de Fiche Matériau (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Titane de grade implantable (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5,5-6,5%, V 3,5-4,5%, Fe <= 0,25%, C <= 0,08%, O <= 0,13%",
  biocompatibility: "Biocompatibilité exceptionnelle, ostéointégration, amagnétique",
  nickel_release: "Nul (< 0,01 ug/cm2/semaine)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Logique Clinique d'Évaluation de la Biocompatibilité

1. **Critères Applicables au Perçage Initial** :
   - Un perçage initial constitue une plaie épithéliale ouverte et active.
   - Les bijoux de pose doivent être biologiquement inertes, chimiquement stables, hautement résistants à la corrosion et compatibles avec les cycles de stérilisation à la vapeur saturée.
   - Les matériaux pleinement conformes regroupent le Titane ASTM F136, l'Acier d'implant ASTM F138, le Titane ISO 5832-3 et le polymère médical BioFlex certifié USP Classe VI.
   - Les aciers commerciaux génériques (316L non documenté) et les alliages de titane industriels (Ti-64 générique ou G23 sans certificat ASTM F136) font l'objet d'un avertissement en raison des impuretés interstitielles potentielles (fer, oxygène).

2. **Limitation de la Libération de Nickel** :
   - Conformément à l'entrée 27 de l'annexe XVII du règlement européen REACH, le taux de libération de nickel doit être inférieur à 0,2 µg/cm²/semaine pour tout élément inséré dans une partie perforée du corps humain en cours d'épithélialisation.
   - Les normes d'implantation médicale (ASTM F138, ISO 5832-1) imposent des procédés de fusion sous vide (VIM-VAR) assurant la rétention du nickel dans le réseau cristallin austénitique.

---

## Moteur d'Internationalisation (I18N)

- **Langues Prises en Charge** : Anglais (`en`), Français (`fr`), Allemand (`de`), Italien (`it`), Espagnol (`es`), Portugais (`pt`) et Néerlandais (`nl`).
- **Architecture Technique** :
  - `window.i18n` : Gestionnaire central initialisé dans `js/i18n.js`.
  - Fichiers locaux autonomes dans `js/i18n/*.js` enregistrant chaque dictionnaire lors du chargement.
  - Liaison dynamique au DOM par attributs `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` et `data-i18n-title`.
  - Réactivité aux changements de langue : L'événement personnalisé `languageChanged` déclenche la régénération immédiate des composants dynamiques (questionnaires, comparateurs, tableaux).
- **Parité Totale** : Le script de contrôle `audit_i18n.cjs` garantit une parité stricte à 100% (951 clés identiques) dans les 7 langues.

---

## Accessibilité, Design Réactif et Moteur d'Impression

- **Accessibilité (WCAG 2.1 AA)** :
  - Rapports de contraste supérieurs à 4,5:1 pour le texte courant dans les modes clair et sombre.
  - Dimensions minimales des cibles tactiles fixées à 44x44px.
  - Navigation complète au clavier avec anneaux de focus visibles.
  - Balisage ARIA rigoureux pour les onglets, fenêtres modales et alertes dynamiques.
- **Conception Réactive** :
  - Utilisation de CSS Grid avec `minmax()` et Flexbox pour un rendu optimal de 360px de largeur d'écran jusqu'aux écrans 4K.
  - Transformation des tableaux de données en cartes empilées sur terminaux mobiles.
- **Impression Maîtrisée** :
  - Règles `@media print` isolant le document de contrôle ou le questionnaire actif.
  - Masquage des éléments de navigation, champs de saisie, boutons et barres d'onglets.
  - Typographie et contrastes noir et blanc optimisés pour l'archivage physique et l'envoi aux fournisseurs.

---

## Vérification Automatisée et Assurance Qualité

Le projet dispose d'une suite complète de scripts de validation :
- `node audit_i18n.cjs` : Vérifie le décompte des clés de traduction, l'interpolation des jetons, l'absence d'omissions et la ponctuation typographique.
- `node verify_all_constraints.cjs` : Contrôle la taille de chaque fichier (< 512 Kio), l'absence totale de liens CDN distants, l'intégrité des images locales et le respect des terminologies cliniques.
- `npm run lint` : Vérification TypeScript sans émission d'erreurs.
- `npm run build` : Validation du processus complet de compilation pour la mise en production.
