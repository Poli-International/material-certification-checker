# Biocompatibility Material Checker - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Data Schemas](#data-schemas)
4. [Calculation and Logic Algorithms](#calculation-and-logic-algorithms)
5. [API Reference](#api-reference)
6. [Integration Guide](#integration-guide)
7. [Customization](#customization)
8. [Performance](#performance)
9. [Browser Compatibility](#browser-compatibility)
10. [Security](#security)
11. [Version History](#version-history)
12. [Support and Contact](#support-and-contact)

---

## Architecture Overview

### Technology Stack

The Biocompatibility Material Checker is a fully static, dependency-free web tool built with:

- **HTML5** for document structure (`index.html`, `documentation.html`, `embed.html`)
- **CSS3** for theming and layout (`css/style.css` plus inline `<style>` blocks in the documentation and embed pages)
- **Vanilla JavaScript (ES6+)** for all logic, with no frameworks, bundlers, or external runtime libraries
- **No backend**: all computation, data lookup, and rendering happen client-side in the browser
- **No external API calls**: the tool does not fetch remote data at runtime

### Runtime Model

The tool runs as a single-page application with three tab views (`Tool`, `Documentation`, `Embed Code`) declared in the `tool-tabs` navigation. All interactive logic is loaded from local `js/` modules. When embedded inside an iframe, the tool:

- Detects the iframe context via `window.self !== window.top`
- Applies a theme passed from the parent via `postMessage` events of type `poli-theme`
- Posts its own height back to the parent (`{ height }`) so the parent can auto-resize the iframe

### Component and Logic Breakdown

| Module | File | Responsibility |
|---|---|---|
| Certification database | `js/certification-data.js` | ASTM, ISO, and EN standard records; product claim verification rules; search keyword index |
| Standards library | `js/library.js` | Filterable catalog of standards rendered into a card grid |
| Material mixer | `js/mixer.js` | Galvanic and biocompatibility evaluation of two paired materials |
| Reference studio | `js/reference-studio.js` | Sterilization and handling reference per material |
| Common UI | `js/common.js` | Theme toggle, iframe auto-resize, embed modal, email form simulation |
| i18n | `js/i18n.js` and `js/i18n/*.js` | Translation resolution for EN, FR, IT, DE, ES, PT, NL |
| Material data | `js/material-data.js` | Material safety data consumed by the safety checker |
| Decoder | `js/decoder.js` | Search, safety checker, and session history logic |

---

## File Structure

```
/
├── index.html                  Main tool page (three tabs: Tool, Documentation, Embed Code)
├── documentation.html          Standalone documentation page
├── embed.html                  Embed code generator with live preview
├── css/
│   └── style.css               Shared stylesheet
├── images/
│   └── Poli-International-Co.webp
└── js/
    ├── certification-data.js   Certification database and claim verification rules
    ├── common.js               Theme, iframe resize, embed modal, email form
    ├── library.js              Standards library module
    ├── mixer.js                Material mixer module
    ├── reference-studio.js     Reference studio module
    ├── material-data.js        Material safety data
    ├── decoder.js              Search, safety checker, session history
    └── i18n/
        ├── fr.js
        ├── it.js
        ├── de.js
        ├── es.js
        ├── pt.js
        └── nl.js
```

---

## Data Schemas

### `rawCertificationDatabase`

An object keyed by internal ID (for example `ASTM_F136`, `ISO_5832-3`, `EN_1811`, `REACH`). Each entry has the following fields:

| Field | Type | Example |
|---|---|---|
| `code` | string | `"ASTM F136"` |
| `full_name` | string | `"Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI ..."` |
| `organization` | string | `"ASTM International"` |
| `year_current` | string | `"2021"` |
| `material_type` | string | `"Titanium Grade 23 (Ti-6Al-4V ELI)"` |
| `key_requirements` | object | `{ titanium: "Balance", aluminum: "5.50-6.50%", oxygen_max: "0.13%" }` |
| `body_piercing_use` | string | `"Excellent - Recommended for ALL piercings including initial"` |
| `biocompatibility` | string | `"Excellent - ISO 10993 compliant"` |
| `sterilization` | string | `"Autoclave safe (up to 134°C)"` |
| `related_standards` | string[] | `["ISO 5832-3", "ISO 5832-11"]` |
| `common_uses` | string[] | `["Initial piercings", "Body jewelry", "Surgical implants"]` |
| `important_notes` | string | Free-text note |
| `verification_method` | string | `"Mill certification required showing ASTM F136 compliance"` |
| `safety_rating` | string | `"safe"` or `"conditional"` |
| `category` | string | `"astm"`, `"iso"`, or `"eu"` |

### `rawProductClaimVerification`

An object keyed by claim ID (`implant_grade_titanium`, `surgical_steel`, `hypoallergenic`, `medical_grade`). Each entry has:

| Field | Type | Example |
|---|---|---|
| `claim` | string | `"Implant Grade Titanium"` |
| `required_certs` | string[] | `["ASTM F136"]` |
| `not_acceptable` | string[] | `["ASTM B348 (industrial bar)", "Commercial Grade Ti"]` |
| `red_flags` | string[] | `["No mill certification provided", "Grade 5 marketed as \"implant grade\""]` |
| `verification_steps` | string[] | `["Request mill certification showing ASTM F136", "Verify Grade 23 ..."]` |

### `searchKeywords`

An object mapping certification ID to an array of lowercase fuzzy-match tokens. Example:

```js
'ASTM_F136': ['f136', 'astm f136', 'titanium grade 23', 'ti6al4v eli', 'implant titanium', 'grade 23']
```

### `STANDARDS_CATALOG` (in `js/library.js`)

An array of standard entries. Each entry has:

| Field | Type | Example |
|---|---|---|
| `id` | string | `"astm-f136"` |
| `code` | string | `"ASTM F136"` |
| `title` | string | `"Wrought Titanium-6Aluminum-4Vanadium ELI for Surgical Implant Applications"` |
| `category` | string | `"metals"`, `"polymers"`, `"biological"`, `"chemical"` |
| `organization` | string | `"ASTM International"` |
| `scope` | string | Free-text scope description |
| `biocompatibility` | string | Free-text biocompatibility note |

### `MATERIAL_PROFILES` (in `js/mixer.js`)

An object keyed by material ID (`astm_f136`, `astm_f138`, `niobium`, `gold_solid`, `bioflex_polymer`, `borosilicate_glass`, `commercial_316l`). Each profile has:

| Field | Type | Example |
|---|---|---|
| `id` | string | `"astm_f136"` |
| `name` | string | `"ASTM F136 Ti-6Al-4V ELI"` |
| `galvanic_emf` | number or `null` | `-0.15` (V vs SCE in 0.9% NaCl); `null` for non-conductive materials |
| `elements` | string[] | `["Titanium (Ti 89%)", "Aluminum (Al 6%)", ...]` |
| `biocompatibilityTier` | number | `1`, `2`, or `3` |
| `isPolymer` | boolean | `false` |

### `REFERENCE_PROFILES` (in `js/reference-studio.js`)

An array of sterilization reference entries. Each entry has:

| Field | Type | Example |
|---|---|---|
| `id` | string | `"astm_f136"` |
| `name` | string | `"ASTM F136 Ti-6Al-4V ELI Titanium"` |
| `autoclave` | string | `"121°C - 134°C (Steam cycle validated - excellent stability)"` |
| `ultrasonic` | string | `"Suitable with enzymatic neutral detergent bath"` |
| `dryHeat` | string | `"Compatible up to 250°C"` |
| `chemicalDisinfection` | string | `"Compatible with standard glutaraldehyde and peracetic acid"` |
| `handlingNote` | string | Free-text handling note |

---

## Calculation and Logic Algorithms

### 1. Translation Resolution Proxy (`createCertProxy`, `createClaimProxy`)

Defined in `js/certification-data.js`. For each translatable field, a JavaScript getter is installed on the object. When the field is read:

1. If a global `t()` function exists, build the key `certs.<id>.<field>` (or `product_claims.<id>.<field>`).
2. Call `t(key)`.
3. If the returned value differs from the key, return the translation.
4. Otherwise, return the static English value from the source object.

The translatable field lists are:

- `TRANSLATABLE_CERT_FIELDS`: `code`, `full_name`, `organization`, `material_type`, `body_piercing_use`, `biocompatibility`, `sterilization`, `important_notes`, `verification_method`, `common_uses`
- `TRANSLATABLE_CLAIM_FIELDS`: `claim`, `red_flags`, `verification_steps`

### 2. Material Compatibility Evaluation (`MaterialMixer.evaluateCompatibility`)

Defined in `js/mixer.js`. Given two material IDs `idA` and `idB`:

1. **Lookup**: resolve both profiles via `getProfile(id)`. If either is missing, return `null`.
2. **Galvanic risk**: if both profiles have a non-null `galvanic_emf`, compute `deltaEmf = Math.abs(matA.galvanic_emf - matB.galvanic_emf)`.
   - `deltaEmf > 0.35` → `galvanicRisk = 'high'`
   - `deltaEmf > 0.15` → `galvanicRisk = 'medium'`
   - otherwise → `'low'`
3. **Elemental count**: build `combinedElements` as a `Set` union of both `elements` arrays, then take `.length`.
4. **Biocompatibility tier**: `minTier = Math.min(matA.biocompatibilityTier, matB.biocompatibilityTier)`.
5. **Status classification**:
   - `unsafe_pairing` if `galvanicRisk === 'high'` or `minTier === 1`
   - `caution_pairing` if `galvanicRisk === 'medium'` or `minTier === 2`
   - otherwise `safe_pairing`
6. **Return object**: `{ matA, matB, deltaEmf, galvanicRisk, elementCount, combinedElements, minTier, statusKey, statusText }`.

### 3. Standards Library Filter (`StandardsLibrary.filter`)

Defined in `js/library.js`. Given a `category` and a `query`:

1. Start with the full `STANDARDS_CATALOG`.
2. If `category` is set and not `'all'`, keep only entries whose `category` matches.
3. If `query` is non-empty, lowercase it and keep entries where `code`, `title`, `scope`, or `organization` contains the query string.
4. Return the filtered array.

### 4. Count Label (`StandardsLibrary.getCountText`)

If a query is present, return `library.standards_count_filtered` with `{ count, query }`. Otherwise return `library.standards_count` with `{ count }`.

### 5. Iframe Auto-Resize (`sendHeight` in `js/common.js`)

1. Compute `height = document.body.scrollHeight + 50`.
2. Post `{ height }` to `window.parent`.
3. Re-run on `resize`, on `click` (100 ms debounce), on `change` (100 ms debounce), and on any DOM mutation via `MutationObserver` watching `document.body` with `{ childList: true, subtree: true }`.

### 6. Theme Resolution (`setTheme` in `js/common.js`)

1. If `theme === 'light'`, add `light-mode`, remove `dark-mode`, set the toggle icon to `☀️`.
2. Otherwise add `dark-mode`, remove `light-mode`, set the icon to `◐`.
3. Persist the choice to `localStorage` under the key `theme` unless `save` is `false`.
4. Initial theme is read from `localStorage.getItem('theme')` with a fallback of `'dark'`.
5. A `message` listener also applies `event.data.theme` when present.

### 7. Embed Code Generation (`js/common.js`)

On load, if an element with ID `embedCode` exists, its `value` is set to:

```html
<iframe src="<cleanUrl>" width="100%" height="800" frameborder="0" style="border:1px solid var(--color-border); border-radius:12px;"></iframe>
```

where `cleanUrl` is `window.location.href` with any query string and hash stripped.

---

## API Reference

### Global Objects (attached to `window`)

#### `window.certificationDatabase`

Object keyed by certification ID. Values are proxy-wrapped entries with the fields listed in [Data Schemas](#data-schemas). Read-only access is expected; the underlying static data is also exposed as `window.rawCertificationDatabase`.

#### `window.productClaimVerification`

Object keyed by claim ID. Values are proxy-wrapped entries. Static data also exposed as `window.rawProductClaimVerification`.

#### `window.searchKeywords`

Object mapping certification ID to an array of fuzzy-match tokens.

#### `window.StandardsLibrary`

Instance of the `StandardsLibrary` class.

| Method | Parameters | Returns | Behavior |
|---|---|---|---|
| `getAll()` | none | `Array` | Returns the full `STANDARDS_CATALOG`. |
| `filter(category, query)` | `category: string`, `query: string` | `Array` | Returns filtered standards. |
| `getCountText(filteredCount, totalCount, query)` | numbers and string | `string` | Returns a localized count label. |
| `render(containerId)` | `containerId: string` | `void` | Renders the library UI into the element with that ID and wires search and category handlers. |

#### `window.MaterialMixer`

Instance of the `MaterialMixer` class.

| Method | Parameters | Returns | Behavior |
|---|---|---|---|
| `getProfile(id)` | `id: string` | `Object` or `null` | Returns the material profile. |
| `evaluateCompatibility(idA, idB)` | two material IDs | `Object` or `null` | Returns the compatibility evaluation described above. |
| `render(containerId, initialMatA, initialMatB)` | container ID and two material IDs (defaults `'astm_f136'`, `'astm_f138'`) | `void` | Renders the mixer UI and wires `change` handlers on both selects. |

#### `window.ReferenceStudio`

Instance of the `ReferenceStudio` class.

| Method | Parameters | Returns | Behavior |
|---|---|---|---|
| `getAll()` | none | `Array` | Returns all reference profiles. |
| `getProfile(id)` | `id: string` | `Object` | Returns the matching profile or the first profile as fallback. |
| `render(containerId)` | `containerId: string` | `void` | Renders the reference card and wires the material select. |

### DOM Event Handlers (in `js/common.js`)

| Element ID | Event | Behavior |
|---|---|---|
| `darkModeToggle` | `click` | Toggles between light and dark theme and persists the choice. |
| `embedBtn` or `embed-button` | `click` | Shows the embed modal (`embedModal` or `embed-modal`) and locks body scroll. |
| `modalClose` or `.modal-close` | `click` | Hides the embed modal and restores body scroll. |
| `copyEmbedCode` | `click` | Selects the `embedCode` textarea and copies its value to the clipboard. |
| `.email-form` | `submit` | Prevents default, shows a subscribed confirmation for 3 seconds, clears the input. |

### Message Events

| Source | Payload | Behavior |
|---|---|---|
| Parent window | `{ type: 'poli-theme', light: boolean }` | Applies the requested theme inside the iframe (handled in `index.html`). |
| Parent window | `{ theme: 'light' \| 'dark' }` | Applies the requested theme (handled in `js/common.js`). |
| Tool to parent | `{ height: number }` | Reports the current document height for iframe auto-resize. |

---

## Integration Guide

### Standalone Embedding

The tool is a static HTML/CSS/JS bundle. To embed it, use an iframe pointing at the live URL:

```html
<iframe
  src="https://poliinternational.com/tools/material-certification-checker/"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 1px solid #333; border-radius: 8px;"
  title="Material Certification Checker by Poli International">
</iframe>
```

### Embed Options Provided by `embed.html`

The embed page offers two preset sizes:

| Option | Width | Height | Notes |
|---|---|---|---|
| Standard | 100% | 800 px | Recommended; full feature set. |
| Compact | 100% | 600 px | For sidebars or resource blocks. |

Each option includes a copy button that writes the iframe snippet to the clipboard via `navigator.clipboard.writeText`, with a 2-second "Copied!" confirmation.

### Theme Integration

When the tool is loaded inside an iframe, the parent can push a theme by posting a message:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
// or
iframe.contentWindow.postMessage({ theme: 'light' }, '*');
```

The tool also posts its own height back to the parent so the parent can resize the iframe dynamically.

### Dependencies

The tool has no external runtime dependencies. All scripts are served from the same origin under `js/`. No API keys, no CDN, and no third-party trackers are required.

---

## Customization

### Theming

Light and dark themes are controlled by the `light-mode` and `dark-mode` classes on `<body>`. The default theme is dark. The choice is persisted in `localStorage` under the key `theme`. A parent frame can override the theme at runtime via `postMessage`.

### Localization

All user-facing strings are resolved through a global `t(key, params)` function. Translation files live in `js/i18n/` for French, Italian, German, Spanish, Portuguese, and Dutch. Adding a new language requires:

1. Creating a new file in `js/i18n/` following the existing key structure.
2. Registering the language in the `languageSelect` dropdown in `index.html`.
3. Loading the new file via a `<script>` tag.

### Data Extension

- To add a new certification, add an entry to `rawCertificationDatabase` in `js/certification-data.js` and a matching token list in `searchKeywords`.
- To add a new claim rule, add an entry to `rawProductClaimVerification`.
- To add a new material to the mixer, add a profile to `MATERIAL_PROFILES` in `js/mixer.js`.
- To add a new sterilization reference, add an entry to `REFERENCE_PROFILES` in `js/reference-studio.js`.

---

## Performance

- **No network requests at runtime**: all data is bundled in JavaScript files loaded once.
- **No build step**: files are served as-is.
- **Debounced resize messaging**: `sendHeight` is debounced by 100 ms on `click` and `change` events to avoid excessive `postMessage` traffic.
- **MutationObserver on `document.body`**: watches for child list and subtree changes to keep the parent iframe height in sync. On pages with heavy DOM churn this can fire frequently; the 50 px buffer in `sendHeight` avoids layout thrash from sub-pixel differences.
- **Rendering is synchronous string concatenation**: `StandardsLibrary.render`, `MaterialMixer.render`, and `ReferenceStudio.render` build HTML strings and assign them to `innerHTML`. This is fast for the small catalog sizes in this tool.

---

## Browser Compatibility

The tool relies on the following platform features:

- ES6 syntax (arrow functions, template literals, `const`/`let`, classes, `Object.entries`, `Object.assign`, `Set`, `Array.from`, `Math.min`, `Math.abs`)
- `Object.defineProperty` for translation proxies
- `MutationObserver`
- `window.postMessage`
- `localStorage`
- `navigator.clipboard.writeText` (with a `document.execCommand('copy')` fallback in the embed modal handler)
- CSS custom properties (`var(--...)`) used in the embed page and shared stylesheet

These features are supported by all current versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.

---

## Security

### Input Handling

- **Search input** (`#cert-search`, `#claim-matrix-search`, and the standards library search) is read as a plain string and used for case-insensitive `includes` matching. It is never evaluated or injected into the DOM as HTML.
- **Supplier phrasing textarea** (`#product-claim`) is analyzed as text.
- **Studio, supplier, and item inputs** in the Supplier Question Sheet are read as strings and rendered into the generated question sheet.

### XSS Mitigation

All dynamic HTML rendered by the module classes (`StandardsLibrary`, `MaterialMixer`, `ReferenceStudio`) passes through an `escapeHTML` helper that replaces `&`, `<`, `>`, `"`, and `'` with their HTML entities before insertion into template strings. This applies to:

- Standard codes, titles, scopes, organizations, and biocompatibility notes
- Material profile names and element strings
- Reference profile names, sterilization values, and handling notes
- Translation strings resolved via `tr()`

### Iframe Isolation

- The tool detects iframe embedding via `window.self !== window.top` and applies theme handling only in that context.
- `postMessage` listeners accept theme payloads but do not execute code from the message.
- No `eval`, `Function` constructor, or dynamic script injection is used.

### Data Storage

Only the theme preference is written to `localStorage` (key `theme` in the main tool, key `embed-theme` in the embed page). No personal data, queries, or session history is persisted to storage; recent checks are held in memory only.

---

## Version History

### 1.0.0

- Initial release of the Biocompatibility Material Checker.
- Certification database covering ASTM F136, ASTM F138, ASTM F1295, ASTM F2229, ASTM F1586, ISO 5832-1, ISO 5832-3, ISO 5832-11, ISO 10993, ISO 13485, EN 1441, EN 1811, and REACH.
- Product claim verification rules for implant grade titanium, surgical steel, hypoallergenic, and medical grade claims.
- Standards library with category and text filtering.
- Material mixer with galvanic and biocompatibility tier evaluation.
- Reference studio with sterilization and handling guidance per material.
- Seven-language interface (EN, FR, IT, DE, ES, PT, NL).
- Embeddable via iframe with auto-resize and theme propagation.

---

## Support and Contact

For technical support, integration assistance, or questions about the Biocompatibility Material Checker:

**Email:** support@poliinternational.com

**Documentation:** https://poliinternational.com/tools/material-certification-checker/documentation.html

**Live tool:** https://poliinternational.com/tools/material-certification-checker/

Technical standards referenced by this tool are published by ASTM International, the International Organization for Standardization (ISO), the European Committee for Standardization (CEN), and the European Chemicals Agency (ECHA).
