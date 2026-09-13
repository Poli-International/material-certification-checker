# Body Jewelry Material Certification & Verification Decoder

> **Professional clinical standards reference and verification suite for body jewelry alloys, medical polymers, and biocompatibility certifications (ASTM, ISO, USP, EN).**

[![License](https://img.shields.io/github/license/Poli-International/material-certification-checker)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Poli-International/material-certification-checker)](https://github.com/Poli-International/material-certification-checker/commits/master)
[![GitHub Stars](https://img.shields.io/github/stars/Poli-International/material-certification-checker?style=social)](https://github.com/Poli-International/material-certification-checker/stargazers)

**Live Application:** [https://poliinternational.com/tools/material-certification-checker/](https://poliinternational.com/tools/material-certification-checker/)

---

## 🌍 Multilingual Documentation

This documentation is available in all 7 supported platform languages:

- 🇬🇧 [English (EN)](./docs/en/README.md)
- 🇫🇷 [Français (FR)](./docs/fr/README.md)
- 🇩🇪 [Deutsch (DE)](./docs/de/README.md)
- 🇮🇹 [Italiano (IT)](./docs/it/README.md)
- 🇪🇸 [Español (ES)](./docs/es/README.md)
- 🇵🇹 [Português (PT)](./docs/pt/README.md)
- 🇳🇱 [Nederlands (NL)](./docs/nl/README.md)

Technical Architecture documentation:
- 🇬🇧 [English Technical Docs](./TECHNICAL_DOCUMENTATION.md) | [Docs Folder](./docs/en/TECHNICAL_DOCUMENTATION.md)
- 🇫🇷 [Français Docs Techniques](./docs/fr/TECHNICAL_DOCUMENTATION.md)
- 🇩🇪 [Deutsch Technische Dokumentation](./docs/de/TECHNICAL_DOCUMENTATION.md)
- 🇮🇹 [Italiano Documentazione Tecnica](./docs/it/TECHNICAL_DOCUMENTATION.md)
- 🇪🇸 [Español Documentación Técnica](./docs/es/TECHNICAL_DOCUMENTATION.md)
- 🇵🇹 [Português Documentação Técnica](./docs/pt/TECHNICAL_DOCUMENTATION.md)
- 🇳🇱 [Nederlands Technische Documentatie](./docs/nl/TECHNICAL_DOCUMENTATION.md)

---

## 🎯 Overview

The **Material Certification Decoder** by Poli International is a comprehensive client-side suite engineered for piercing artists, studio owners, quality control inspectors, and health authorities. It translates complex metallurgical mill test reports, regulatory chemical directives (EU REACH Entry 27), and biological testing standards into immediate, actionable clinical evaluations.

Biocompatible materials validated by international implant standards include:
- **ASTM F136 / ISO 5832-3 Titanium (Ti-6Al-4V ELI)**
- **BioFlex® Medical PP-R Random Copolymer (USP Class VI / ISO 10993)**
- **ASTM F138 / ISO 5832-1 Implant Stainless Steel (316LVM)**
- **ASTM F2229 Niobium (Unalloyed)**
- **Borosilicate Glass 3.3 (ISO 3585)**
- **Solid 14K / 18K Biocompatible Gold**

---

## ✨ Core Features

### 1. Certificate Reader & Preset Phrasing Analyzer
- Evaluates supplier quotes, catalogue text, and mill test snippets against known clinical standards.
- 6 one-click test phrasing presets:
  - Valid ASTM F136 Titanium mill certificate snippet
  - Vague commercial "G23 Titanium" marketing claim
  - Valid ASTM F138 316LVM surgical implant stainless steel
  - Generic non-implant "316L Surgical Steel" with nickel alert
  - Authentic BioFlex® medical polymer (USP Class VI)
  - Misleading generic "Acrylic / Plastic Piercing Retainer"
- Produces a 3-tier safety status (Compliant, Caution / Conditional, Unverified / High Risk), parsed standard tags, elemental limits, and red flags.

### 2. Supplier Question Sheet Generator
- Configurable material alloy (7 material profiles) paired with clinical application (Initial piercing, Healed, Sensitive/Allergy, Oral/Mucosal, Surface/Subdermal).
- Outputs exact technical questions to send to manufacturers, acceptable response criteria, and critical red flags.
- Complete studio branding input with print-ready single-page layout.

### 3. Claim-to-Evidence Matrix
- Searchable, filterable matrix covering 12 common market claims across metals, polymers, and general marketing.
- Details the exact substantiating document, what it proves, clinical significance of absence, and how to verify legitimacy.

### 4. Certified Material Comparison Tool
- Side-by-side comparison of 2 to 3 materials across composition, tensile strength, yield strength, density, thermal conductivity, biocompatibility class, sterilization parameters, and regulatory conformity.
- Category mismatch alerts for cross-class comparisons.

### 5. Dated Studio Compliance Records Vault
- Generates receiving inspection audit certificates for supplier files.
- Stored 100% locally in browser storage: zero server tracking, zero accounts, audit-ready PDF/print summaries.

### 6. Interactive Standards Library, Compatibility Mixer & Reference Studio
- Standards catalog (`js/library.js`) with ISO, ASTM, USP, and EU standards.
- Material galvanic and elemental compatibility mixer (`js/mixer.js`).
- Sterilization and handling matrix (`js/reference-studio.js`) covering steam autoclave, ultrasonic bath, dry heat, and chemical disinfection.

### 7. Full Internationalization (7 Languages)
- 100% localization parity across English, French, German, Italian, Spanish, Portuguese, and Dutch.
- Dynamic locale switching preserving UI state and accessibility.

---

## 📱 Fully Responsive Design & Accessibility
- **Mobile, Tablet & Desktop**: Fluid layouts from 360px smartphones to ultra-wide displays.
- **Finger-Friendly Touch Targets**: Minimum 44×44px interactive controls across buttons, tabs, and selects.
- **Strict Color Contrast**: Minimum 4.5:1 WCAG AA contrast ratio across both Light and Dark modes.
- **Zero-Overflow Horizontals**: Responsive card stacks and overflow-protected tables.
- **Print Optimization**: Single-page, ink-saving clean output with navigation stripped out automatically.

---

## 🚀 Quick Start

### Online Usage
Visit [https://poliinternational.com/tools/material-certification-checker/](https://poliinternational.com/tools/material-certification-checker/)

### Local Development
Clone the repository and serve static files using any local web server:
```bash
# Using Node / npx
npx serve .

# Or using Python
python3 -m http.server 3000
```

---

## 📄 License
MIT License. Copyright © 2026 Poli International.
