# Material Certification Decoder: Technical Architecture (English)

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File System Organization](#file-system-organization)
3. [Component Subsystems](#component-subsystems)
   - [Certificate Reader & Text Analyzer](#1-certificate-reader--text-analyzer)
   - [Supplier Technical Question Sheet Generator](#2-supplier-technical-question-sheet-generator)
   - [Claim-to-Evidence Matrix](#3-claim-to-evidence-matrix)
   - [Certified Material Side-by-Side Comparator](#4-certified-material-side-by-side-comparator)
   - [Studio Receiving Compliance Vault](#5-studio-receiving-compliance-vault)
   - [Regulatory Standards Library](#6-regulatory-standards-library)
   - [Galvanic & Chemical Compatibility Mixer](#7-galvanic--chemical-compatibility-mixer)
   - [Studio Aseptic & Sterilization Reference](#8-studio-aseptic--sterilization-reference)
4. [Data Schemas and Structures](#data-schemas-and-structures)
5. [Clinical Biocompatibility Evaluation Logic](#clinical-biocompatibility-evaluation-logic)
6. [Internationalization (I18N) Subsystem](#internationalization-i18n-subsystem)
7. [Accessibility, Responsive Design, and Print Engine](#accessibility-responsive-design-and-print-engine)
8. [Automated Verification and Quality Assurance](#automated-verification-and-quality-assurance)

---

## Architecture Overview

The **Material Certification Decoder** is engineered as a zero-dependency, high-performance static client-side web application. It requires no backend servers, no cloud database subscriptions, and no external Content Delivery Networks (CDNs). All parsing, clinical evaluation algorithms, storage, and rendering execute entirely inside the client browser.

### Key Architecture Principles
- **Total Data Privacy**: Sensitive supplier invoices, certificates, and studio receiving records remain strictly on the local machine within `localStorage`.
- **Zero Remote Dependencies**: Fonts, stylesheets, scripts, and vector assets load exclusively from relative local paths.
- **High Performance & Instant Boot**: Instantaneous initial paint without synchronous remote blocking requests.
- **Offline Operational Readiness**: Functions seamlessly in studio environments with intermittent or zero internet connectivity.

### Core Stack
- **HTML5**: Semantic markup featuring accessible ARIA landmarks, roles, status regions, and keyboard traps.
- **CSS3**: Strict custom property design tokens, responsive CSS Grid and Flexbox layouts, and specialized print media queries.
- **Vanilla JavaScript (ES6+)**: Modular Immediately Invoked Function Expressions (IIFEs) bound cleanly to the global `window` namespace.
- **Client Storage**: `localStorage` JSON serialization for studio receiving logs and customized audit trails.

---

## File System Organization

```
material-certification-checker/
├── index.html                     # Primary application entry point
├── documentation.html             # Documentation reader and standards glossary
├── embed.html                     # Embed generator and iframe demo
├── css/
│   └── style.css                  # Unified design tokens, responsive layouts, print CSS
├── images/
│   └── Poli-International-Co.webp # Local brand asset
├── js/
│   ├── i18n.js                    # Central I18N loader and English base dictionary
│   ├── i18n/                      # Localized language dictionaries (100% key parity)
│   │   ├── fr.js                  # French
│   │   ├── de.js                  # German
│   │   ├── it.js                  # Italian
│   │   ├── es.js                  # Spanish
│   │   ├── pt.js                  # Portuguese
│   │   └── nl.js                  # Dutch
│   ├── certification-data.js      # ASTM, ISO, USP, and EN regulatory standards
│   ├── material-data.js           # Physical, chemical, and biocompatibility profiles
│   ├── v2-data.js                 # Presets, questions, and claim-to-evidence matrices
│   ├── v2-features.js             # Certificate reader, question sheets, comparisons
│   ├── library.js                 # Standards library query engine
│   ├── mixer.js                   # Galvanic and elemental compatibility evaluator
│   ├── reference-studio.js        # Sterilization, autoclave, and aseptic handling
│   ├── studio-vault.js            # Receiving record persistence and backup
│   ├── decoder.js                 # Search and glossary controllers
│   └── common.js                  # Theme toggle, modal handlers, iframe messaging
└── docs/                          # Multilingual documentation suite (7 languages)
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Component Subsystems

### 1. Certificate Reader & Text Analyzer
**File:** `js/v2-features.js`
Analyzes free-form supplier claims, commercial invoices, and Mill Test Certificates (MTC):
- **Pattern Matching**: Regex heuristics identify regulatory standards (ASTM F136, ASTM F138, ISO 5832-3, USP Class VI), melt designations (ELI / Extra Low Interstitial, VAR), chemical symbols, and ambiguous commercial marketing phrases.
- **Biocompatibility Tier Classification**:
  - `tier-compliant`: Valid surgical implant specification identified (e.g. ASTM F136 Titanium, ASTM F138 Steel, BioFlex biocompatible medical polymer).
  - `tier-caution`: Commercial or non-implant grades (e.g. standard AISI 316L without vacuum arc remelt, G23 without ASTM F136 specification, PMMA acrylics).
  - `tier-unverified`: Unsubstantiated claims lacking standard citations ("hypoallergenic", "surgical steel", "pure metal").
- **Quick Preset Selector**: Interactive presets allowing immediate evaluation of representative supplier statements.

### 2. Supplier Technical Question Sheet Generator
**File:** `js/v2-features.js`
Transforms evaluated materials and intended tissue placements into structured verification questionnaires:
- **Tissue Application Context**: Distinguishes initial piercing (unhealed open wound tissue requiring certified non-toxic non-shedding implant materials) from fully healed piercings and oral contact.
- **Critical Requirements**: Outlines studio receiving standards including ASTM/ISO specification documentation, surface finish thresholds (Ra <= 0.05 µm / mirror polish), and passivation evidence.
- **Technical Questions**: Generates 4 to 6 specific inquiry questions paired with explicit satisfactory responses versus red-flag answers.
- **Export & Print**: Generates printable documentation sheets with physical sign-off fields for studio quality assurance audits.

### 3. Claim-to-Evidence Matrix
**File:** `js/v2-features.js` & `js/v2-data.js`
An interactive compliance reference cross-referencing 12 prevalent commercial marketing claims against mandatory documentary evidence:
- **Categories**: Metals, Polymers, and General Quality claims.
- **Document Requirements**: Specifies whether claims require an independent Mill Test Certificate, chemical spectrographic analysis, cytotoxicity assay (ISO 10993-5), or USP Class VI biocompatibility validation.
- **Absence Risk Analysis**: Clarifies clinical risks when documentary evidence is missing.
- **Instant Search & Filter**: Real-time category filtering and text matching across all localized fields.

### 4. Certified Material Side-by-Side Comparator
**File:** `js/v2-features.js`
A technical tool facilitating direct comparison between two or three candidate materials:
- **Comparative Metrics**: Certified chemical composition limits, biological response standards, nickel release thresholds (EN 1811), autoclave thermal limits, surface finish expectations, and clinical verdict.
- **Cross-Category Alerting**: Highlights clinical and physical differences when contrasting surgical implant metals against biocompatible medical polymers.

### 5. Studio Receiving Compliance Vault
**File:** `js/studio-vault.js`
A dedicated local registry for recording studio jewelry intake inspections:
- **Audit Records**: Captures supplier identity, invoice/batch numbers, material classification, compliance status, and reviewer notes.
- **Storage**: Browser `localStorage` with error recovery and zero tracking.
- **Management**: Record deletion, filtering, print summaries, and JSON backup export/import.

### 6. Regulatory Standards Library
**File:** `js/library.js` & `js/certification-data.js`
Comprehensive searchable catalog containing detailed abstracts for medical and body jewelry standards across ASTM International, ISO, USP, and European Standards (EN).

### 7. Galvanic & Chemical Compatibility Mixer
**File:** `js/mixer.js`
Evaluates multi-component jewelry pairings (e.g. shafts, threaded ends, balls) against galvanic corrosion potentials in human electrolyte fluids (saliva, sweat, blood).

### 8. Studio Aseptic & Sterilization Reference
**File:** `js/reference-studio.js`
Clinical protocols detailing steam autoclave parameters (121°C to 134°C), chemical immersion, ultrasonic cleaning precautions, and material-specific thermal limitations.

---

## Data Schemas and Structures

### Regulatory Standard Object (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI for Surgical Implant Applications",
  scope: "Initial piercing, long-term human tissue contact, medical implants",
  implant_certified: true,
  nickel_content: "< 0.01% (Undetectable)",
  autoclave_compatible: true,
  key_requirements: [
    "ELI (Extra Low Interstitial) grade",
    "Tensile strength >= 860 MPa",
    "Biocompatibility verified per ASTM F86 passivation"
  ]
}
```

### Material Profile Object (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Implant Grade Titanium (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5.5-6.5%, V 3.5-4.5%, Fe <= 0.25%, C <= 0.08%, O <= 0.13%",
  biocompatibility: "Exceptional biocompatibility, osseointegration capability, non-magnetic",
  nickel_release: "Zero (< 0.01 ug/cm2/week)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Clinical Biocompatibility Evaluation Logic

1. **Initial Piercing Criteria**:
   - Initial piercings represent open, active epithelial wounds.
   - Initial jewelry materials must be biologically inert, corrosion resistant, non-toxic, and capable of autoclaving or aseptic preparation without toxic emissions or degradation.
   - Materials meeting criteria include ASTM F136 Titanium, ASTM F138 Implant Steel, ISO 5832-3 Titanium, and medical grade BioFlex (USP Class VI certified).
   - Commercial steels (unspecified 316L) and generic titanium alloys (unspecified Ti-64 or G23 without F136 MTC) carry caution flags due to potential trace impurities and elevated interstitial oxygen/iron levels.

2. **Nickel Release Restrictions**:
   - Compliance with EU REACH Entry 27 of Annex XVII mandates nickel release rates below 0.2 µg/cm²/week for items intended for insertion into pierced parts of the human body during epithelialization.
   - Surgical implant specifications (ASTM F138, ISO 5832-1) enforce vacuum melt practices (VIM-VAR) to bind nickel metallurgically within the austenitic crystal lattice, minimizing ionic leaching.

---

## Internationalization (I18N) Subsystem

- **Locales Supported**: English (`en`), French (`fr`), German (`de`), Italian (`it`), Spanish (`es`), Portuguese (`pt`), and Dutch (`nl`).
- **Architecture**:
  - `window.i18n`: Global manager loaded by `js/i18n.js`.
  - External locale files in `js/i18n/*.js` register language dictionaries on load.
  - DOM data binding via `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label`, and `data-i18n-title`.
  - Event-driven re-rendering: `languageChanged` custom window event triggers immediate re-renders of dynamically generated DOM structures (question sheets, comparisons, claim tables).
- **Parity Guarantees**: `audit_i18n.cjs` validates 100% key parity (951 keys) across all 7 locales with zero missing strings.

---

## Accessibility, Responsive Design, and Print Engine

- **Accessibility (WCAG 2.1 AA)**:
  - Contrast ratios exceed 4.5:1 for body copy across both Dark and Light themes.
  - Minimum touch target dimensions are 44x44px.
  - Full keyboard navigability with visible focus indicators.
  - Semantic ARIA attributes on tab strips, modal dialogues, accordion disclosures, and live alert blocks.
- **Responsive Fluidity**:
  - CSS Grid with `minmax()` and Flexbox patterns ensure flawless responsiveness from 360px smartphones to 4K desktop screens.
  - Tables switch to stacked labeled blocks on mobile screens.
- **Print Optimization**:
  - `@media print` rules isolate the active verification document or questionnaire.
  - Removes navigation headers, search inputs, tabs, and action buttons.
  - Enforces crisp black-and-white contrast for physical filing and supplier mailings.

---

## Automated Verification and Quality Assurance

The project includes an automated test and verification suite:
- `node audit_i18n.cjs`: Audits key counts, token interpolation, missing translations, and typographic punctuation across all languages.
- `node verify_all_constraints.cjs`: Validates file size thresholds (<512 KiB per file), zero external CDN links, zero unvetted image links, and clinical terminology compliance.
- `npm run lint`: Validates TypeScript syntax and type integrity.
- `npm run build`: Validates production compilation bundling.
