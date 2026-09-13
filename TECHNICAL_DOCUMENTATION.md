# Material Certification Decoder: Technical Architecture Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File System Organization](#file-system-organization)
3. [Component Architecture](#component-architecture)
4. [Data Schemas and Structures](#data-schemas-and-structures)
5. [Clinical Algorithms and Evaluation Logic](#clinical-algorithms-and-evaluation-logic)
6. [Internationalization (I18N) Engine](#internationalization-i18n-engine)
7. [Accessibility, Responsive Design, and Print Engine](#accessibility-responsive-design-and-print-engine)
8. [Storage and Vault Subsystem](#storage-and-vault-subsystem)
9. [Verification and Audit Suite](#verification-and-audit-suite)

---

## Architecture Overview

The **Material Certification Decoder** is built as a zero-dependency, high-performance static client application. It requires no backend server, no database installation, and no third-party CDNs. All logic executes client-side with 100% data privacy and offline operational readiness.

### Core Technologies
- **HTML5**: Semantic markup with ARIA landmarks, roles, and live regions.
- **CSS3**: Strict custom property design tokens, responsive CSS grid, flexbox, and print stylesheets.
- **Vanilla JavaScript (ES6+)**: Modular IIFE patterns exposing isolated namespaces on `window`.
- **LocalStorage API**: Zero-tracker client vault for studio compliance records.

---

## File System Organization

```
material-certification-checker/
├── index.html                     # Primary application entry point
├── documentation.html             # Documentation reader and standards glossary
├── embed.html                     # Embed generator and iframe demo
├── css/
│   └── style.css                  # Unified design tokens, responsive styles, print CSS
├── images/
│   └── Poli-International-Co.webp # Local brand asset
├── js/
│   ├── i18n.js                    # Central I18N loader and English base dictionary
│   ├── i18n/                      # Localized language dictionaries
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
│   ├── decoder.js                 # Legacy search and glossary controllers
│   └── common.js                  # Theme toggle, modal handlers, iframe messaging
└── docs/                          # Multilingual documentation (7 languages)
    ├── en/
    ├── fr/
    ├── de/
    ├── it/
    ├── es/
    ├── pt/
    └── nl/
```

---

## Component Architecture

### 1. Certificate Reader (`js/v2-features.js`)
Parses free-text supplier claims, invoices, and mill test certificates:
- **Heuristic Pattern Matching**: Detects ASTM, ISO, USP, EN designations, heat numbers, chemical symbols, and common commercial buzzwords.
- **Biocompatibility Classification**:
  - `tier-compliant`: Valid surgical implant certification (ASTM F136, ASTM F138, BioFlex USP Class VI, ISO 5832-3).
  - `tier-caution`: Generic or non-implant grades (Commercial 316L, G23 without ASTM F136, acrylics).
  - `tier-unverified`: Unsubstantiated marketing phrases ("hypoallergenic", "surgical steel", "metal alloy").
- **Quick Preset Selector**: Six interactive test phrasing presets for instant clinical demonstrations.

### 2. Supplier Question Sheet Generator (`js/v2-features.js`)
Synthesizes target materials and clinical applications into structured questionnaires:
- Generates 4 to 6 specific technical questions demanding tangible documentation (chemical composition limits, melt processing, testing lab accreditations).
- Lists required responses vs critical red flags.
- Produces clean print-ready and exportable documents.

### 3. Claim-to-Evidence Matrix (`js/v2-features.js`)
Tabulated encyclopedia mapping 12 commercial claims to documentary proofs:
- Categories: Metals, Polymers, General.
- Real-time search and filter pills.
- Dynamic modal view for deep-dive audits.

### 4. Certified Material Comparison Tool (`js/v2-features.js`)
Multi-material side-by-side comparator:
- Evaluates 2 or 3 materials across standard specifications, elemental tolerances, nickel release, autoclave parameters, and clinical recommendation.
- Warns when comparing incompatible classes (e.g., metals vs polymers).

### 5. Studio Compliance Records Vault (`js/studio-vault.js`)
Audit-compliant receiving inspection records system:
- Generates unique record IDs with timestamps and evaluated claims.
- Stores records securely in browser `localStorage`.
- Supports viewing, deleting, clearing, printing, and JSON export.

---

## Internationalization (I18N) Engine

- **Architecture**: `window.i18n` with global shorthand `window.t(key, params)` and `window.applyI18n()`.
- **Languages**: 7 official locales (`en`, `fr`, `de`, `it`, `es`, `pt`, `nl`).
- **Dynamic Parameter Interpolation**: Handles dynamic counters such as `{count}` and `{query}`.
- **Full Key Parity**: 100% verified key count parity across all 7 locale dictionaries via `audit_i18n.cjs`.

---

## Accessibility, Responsive Design, and Print Engine

- **Contrast Standard**: All colors adhere to WCAG 2.1 AA contrast requirements (>= 4.5:1 for normal text) across both Light and Dark themes.
- **Smallest Font Size**: Strictly capped at 11px (0.6875rem) for micro-badges and 14-16px for body text.
- **Mobile Fluidity**: Zero horizontal scroll down to 360px viewport width.
- **Touch Targets**: Minimum 44px height and width for interactive buttons and select menus.
- **Print Optimization**: Dedicated `@media print` rules strip backgrounds, navigation bars, and modals, ensuring a single clean page output.

---

## Verification and Audit Suite

Automated verification tools in the root directory guarantee zero regressions:
- `audit_i18n.cjs`: Confirms 100% translation key parity, token equivalence, and zero spaced em-dashes.
- `verify_all_constraints.cjs`: Enforces file size limits (<512 KiB), zero external CDN hosts, zero external images, and brand compliance rules.
