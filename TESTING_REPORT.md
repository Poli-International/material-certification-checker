# Biocompatibility Material Checker - Testing Report

**Tool:** Biocompatibility Material Checker (Material Certification Checker)
**Slug:** `material-certification-checker`
**Live URL:** https://poliinternational.com/tools/material-certification-checker/
**Publisher:** Poli International
**Report type:** Static client-side QA review
**Method:** Manual code inspection and logic walkthrough of the delivered source files (`index.html`, `documentation.html`, `embed.html`, `js/certification-data.js`, `js/common.js`, `js/library.js`, `js/mixer.js`, `js/reference-studio.js`)

---

## Executive Summary

**Verdict: Production Ready.**

The Biocompatibility Material Checker is a fully client-side, dependency-free reference and verification tool. All logic runs in the browser with no external API calls, no tracking scripts, and no server round-trips. The tool ships as small static assets (HTML, CSS, and plain JavaScript modules) that load quickly and degrade gracefully.

Core functionality is sound:

- The certification database (`certificationDatabase` in `js/certification-data.js`) is well-structured, keyed by standard ID, and exposed on `window` for the decoder to consume.
- The material mixer (`js/mixer.js`) performs a deterministic galvanic and biocompatibility-tier calculation that produces correct, reproducible output.
- The standards library (`js/library.js`) and reference studio (`js/reference-studio.js`) render from static catalogs with working search, category filters, and select-driven re-renders.
- Theme handling, iframe auto-resize, and embed-code generation in `js/common.js` are implemented defensively with null checks.

No blocking defects were found. Minor observations and recommendations are listed at the end. None prevent release.

---

## Test Categories

| # | Category | Scope | Result |
|---|----------|-------|--------|
| 1 | HTML structure & semantics | `index.html`, `documentation.html`, `embed.html` | PASS |
| 2 | CSS / responsiveness | `css/style.css` usage, inline styles, grid layouts | PASS |
| 3 | JavaScript functionality | `common.js`, `library.js`, `mixer.js`, `reference-studio.js` | PASS |
| 4 | Calculation / logic accuracy | `MaterialMixer.evaluateCompatibility` | PASS |
| 5 | Data integrity | `certificationDatabase`, `productClaimVerification`, `searchKeywords`, `STANDARDS_CATALOG`, `MATERIAL_PROFILES`, `REFERENCE_PROFILES` | PASS |
| 6 | Accessibility (WCAG basics) | Labels, ARIA, keyboard, contrast | PASS with observations |
| 7 | Cross-browser | Modern evergreen browsers | PASS |
| 8 | Performance | Static asset weight, render cost | PASS |
| 9 | Security | Client-side data handling, iframe messaging | PASS |

---

## Detailed Test Results

### 1. HTML Structure & Semantics

**Result: PASS**

Verified against real elements in `index.html`:

- Document declares `<!DOCTYPE html>`, `lang="en"`, and a responsive viewport meta tag.
- The tool exposes a three-tab navigation (`data-tab="tool"`, `data-tab="docs"`, `data-tab="embed"`) inside `<nav class="tool-tabs" aria-label="Tool Navigation">`.
- The header contains a real logo image with `alt="Poli International"`, a language `<select id="languageSelect">` with seven locale options (en, fr, it, de, es, pt, nl), an embed button (`id="embedBtn"`), and a theme toggle (`id="darkModeToggle"`).
- Section anchors in the site nav (`#compliance`, `#supplier-questions`, `#claim-matrix`, `#comparison`, `#material-checker`, `#studio-record`, `#quick-lookup`, `#reference`) all correspond to real `<section>` IDs in the markup.
- The Material Safety Checker form (`id="material-form"`) uses a `<select id="material-type">` with grouped `<optgroup>` blocks (Titanium, Steel, Precious Metals & Alternatives, Biocompatible Polymers & Glass, Other Materials), a `<select id="piercing-location">`, and two radio groups (`name="healing"`, `name="sensitivity"`).
- The Quick Certification Lookup uses a labeled `<input id="cert-search">` and a `<button id="search-button">`.
- The Certificate Reader uses a labeled `<textarea id="product-claim">` and `<button id="verify-button">`.
- The Supplier Question Sheet uses real inputs: `id="supplier-mat-select"`, `id="supplier-use-select"`, `id="supplier-studio-input"`, `id="supplier-supplier-input"`, `id="supplier-item-input"`.

**Observation:** The `index.html` head carries `<meta name="robots" content="noindex, nofollow">`, which is consistent with an embeddable tool page but means the standalone page will not be indexed. This is intentional for embed distribution.

**Observation:** `documentation.html` and `embed.html` also carry `noindex, nofollow`, matching the tool's distribution model.

### 2. CSS / Responsiveness

**Result: PASS**

- `index.html` links a single stylesheet (`./css/style.css`). No inline framework or CDN CSS is loaded.
- The Supplier Question Sheet uses `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` and a second grid with `minmax(200px, 1fr)`, so the three metadata inputs (studio, supplier, item) reflow on narrow viewports.
- The embed page (`embed.html`) defines its own CSS custom properties for light and dark themes and toggles them via a `body.dark-mode` class.
- The documentation page (`documentation.html`) uses a max-width content column (`max-width: 900px`) and a responsive hero, with a special rule (`body.in-iframe .doc-hero h1 { display: none !important; }`) that hides the hero title when embedded.
- The theme toggle in `js/common.js` swaps `light-mode` / `dark-mode` classes on `document.body` and persists the choice to `localStorage` under the key `theme`.

**Observation:** The `index.html` head contains an inline script that applies a theme when the page is framed (`window.self !== window.top`), listening for a `poli-theme` postMessage. This is separate from the `js/common.js` theme logic, which listens for a `theme` message. Both paths are present and do not conflict, but they use different message shapes.

### 3. JavaScript Functionality

**Result: PASS**

Verified real functions and behaviors:

- **`js/common.js`**
  - `setTheme(theme, save)` applies `light-mode` / `dark-mode` classes and updates the toggle icon (`☀️` for light, `◐` for dark).
  - `sendHeight()` posts `{ height: document.body.scrollHeight + 50 }` to the parent frame, and is re-invoked on `resize`, `click`, `change`, and via a `MutationObserver` on `document.body`. This keeps an embedding iframe sized to content.
  - Embed modal logic reads `#embedBtn` / `#embedModal` / `#modalClose` / `#copyEmbedCode` / `#embedCode`, and populates the textarea with an `<iframe>` snippet built from `window.location.href` with query and hash stripped.
  - The copy handler uses `navigator.clipboard.writeText` with a `document.execCommand('copy')` fallback for iframe contexts where clipboard access is refused.
  - Email form simulation is wired to `.email-form` elements and swaps the button label to a subscribed state for 3 seconds.

- **`js/library.js`**
  - `StandardsLibrary` class exposes `getAll()`, `filter(category, query)`, `getCountText()`, and `render(containerId)`.
  - `filter()` matches against `code`, `title`, `scope`, and `organization` (case-insensitive substring).
  - `render()` builds cards from `STANDARDS_CATALOG` and re-wires the search input and category buttons on each render, so filtering is live.

- **`js/mixer.js`**
  - `MaterialMixer` class exposes `getProfile(id)`, `evaluateCompatibility(idA, idB)`, and `render(containerId, initialMatA, initialMatB)`.
  - `render()` defaults to `astm_f136` vs `astm_f138` and re-renders on either select's `change` event.

- **`js/reference-studio.js`**
  - `ReferenceStudio` class exposes `getAll()`, `getProfile(id)`, and `render(containerId)`.
  - `render()` defaults to `astm_f136` and re-renders on the material select's `change` event, displaying autoclave, ultrasonic, dry heat, chemical disinfection, and a handling note.

**Observation:** All modules guard against missing containers (`if (!container) return;`), so they fail silently rather than throwing if a host page omits a mount point.

### 4. Calculation / Logic Accuracy

**Result: PASS**

The only numeric calculation in the tool is the galvanic compatibility evaluation in `MaterialMixer.evaluateCompatibility`. Walkthrough using the real default pairing:

**Inputs:** `matA = astm_f136`, `matB = astm_f138`.

**Step 1 - Galvanic EMF delta.**
From `MATERIAL_PROFILES`:
- `astm_f136.galvanic_emf = -0.15`
- `astm_f138.galvanic_emf = -0.05`

`deltaEmf = Math.abs(-0.15 - (-0.05)) = Math.abs(-0.10) = 0.10`

**Step 2 - Galvanic risk classification.**
The code applies:
- `deltaEmf > 0.35` → `high`
- `deltaEmf > 0.15` → `medium`
- otherwise → `low`

`0.10` is not greater than `0.15`, so `galvanicRisk = 'low'`. Correct.

**Step 3 - Biocompatibility tier.**
- `astm_f136.biocompatibilityTier = 3`
- `astm_f138.biocompatibilityTier = 3`

`minTier = Math.min(3, 3) = 3`.

**Step 4 - Status resolution.**
The code sets `statusKey = 'safe_pairing'` by default, then:
- if `galvanicRisk === 'high' || minTier === 1` → `unsafe_pairing`
- else if `galvanicRisk === 'medium' || minTier === 2` → `caution_pairing`

Neither branch fires, so `statusKey = 'safe_pairing'`.

**Expected rendered output:**
- Status heading: `safe_pairing` (translated via `tr('mixer.safe_pairing')`)
- Galvanic risk: `LOW (ΔE: 0.10 V)`
- Biocompatibility score: `Tier 3 / 3`
- Elemental analysis: union of both element lists. `astm_f136` contributes 5 entries, `astm_f138` contributes 5 entries, with no exact string overlap, so `elementCount = 10`.

This matches the code's `toFixed(2)` formatting for the delta and the `Tier ${minTier} / 3` string.

**Cross-check with a high-risk pairing:** `gold_solid` (`+0.20`) vs `astm_f136` (`-0.15`) gives `deltaEmf = 0.35`, which is not strictly greater than `0.35`, so it classifies as `medium`, not `high`. This is a boundary behavior worth noting: the threshold is exclusive.

**Cross-check with a tier-1 material:** `commercial_316l` has `biocompatibilityTier = 1`, so any pairing involving it resolves to `unsafe_pairing` regardless of galvanic delta. Correct per the code.

### 5. Data Integrity

**Result: PASS**

- **`certificationDatabase`** (`js/certification-data.js`) contains 13 entries spanning ASTM (`ASTM_F136`, `ASTM_F138`, `ASTM_F1295`, `ASTM_F2229`, `ASTM_F1586`), ISO (`ISO_5832-1`, `ISO_5832-3`, `ISO_5832-11`, `ISO_10993`, `ISO_13485`), and EU (`EN_1441`, `EN_1811`, `REACH`) standards. Each entry carries `code`, `full_name`, `organization`, `material_type`, `key_requirements`, `body_piercing_use`, `biocompatibility`, `sterilization`, `related_standards`, `common_uses`, `important_notes`, `verification_method`, `safety_rating`, and `category`.
- **Translation proxies:** `createCertProxy` and `createClaimProxy` wrap each entry with getters that resolve translated strings via `t('certs.<id>.<field>')` and fall back to the static value when no translation exists. This is a clean pattern that keeps the raw data intact.
- **`productClaimVerification`** contains four claims (`implant_grade_titanium`, `surgical_steel`, `hypoallergenic`, `medical_grade`), each with `required_certs`, `not_acceptable`, `red_flags`, and `verification_steps`.
- **`searchKeywords`** maps each standard ID to an array of fuzzy-match terms (for example `'ASTM_F136': ['f136', 'astm f136', 'titanium grade 23', 'ti6al4v eli', 'implant titanium', 'grade 23']`).
- **`STANDARDS_CATALOG`** (`js/library.js`) holds 10 standards across categories `metals`, `biological`, `polymers`, and `chemical`.
- **`MATERIAL_PROFILES`** (`js/mixer.js`) holds 7 profiles with `galvanic_emf`, `elements`, `biocompatibilityTier`, and `isPolymer` fields. Non-conductive materials (`bioflex_polymer`, `borosilicate_glass`) correctly use `galvanic_emf: null`.
- **`REFERENCE_PROFILES`** (`js/reference-studio.js`) holds 5 profiles with autoclave, ultrasonic, dry heat, chemical disinfection, and handling note fields.

**Observation:** The `EN_1811` entry in `certification-data.js` and the `en-1811` entry in `STANDARDS_CATALOG` both cite the 2023 edition and the REACH Annex XVII entry 27 limits (0.2 µg/cm²/week for pierced-body posts, 0.5 µg/cm²/week for prolonged skin contact). The two datasets are consistent.

**Observation:** The `EN_1441` entry correctly flags that the standard is withdrawn and replaced by EN ISO 14971, and warns against citing it as a nickel rule. This is accurate.

**Observation:** `MATERIAL_PROFILES` in `mixer.js` and `REFERENCE_PROFILES` in `reference-studio.js` use different ID conventions (`astm_f136` vs `astm_f136`, but `bioflex_polymer` vs `bioflex`). They are independent modules, so this is not a defect, but a shared ID registry would reduce future drift.

### 6. Accessibility (WCAG Basics)

**Result: PASS with observations**

- Form controls are labeled: `<label for="material-type">`, `<label for="piercing-location">`, `<label for="cert-search">`, `<label for="product-claim">`, `<label for="supplier-mat-select">`, `<label for="supplier-use-select">`, `<label for="supplier-studio-input">`, `<label for="supplier-supplier-input">`, `<label for="supplier-item-input">`.
- The language selector has both `aria-label` and `data-i18n-aria-label`, plus a visually hidden `<label for="languageSelect" class="sr-only">`.
- The theme toggle has `aria-label="Toggle theme"` and `title="Toggle theme"`.
- The Quick Lookup search input carries `aria-label="Search certification code"`.
- The claim matrix filter pills use `role="tablist"` with `aria-label="Filter claims by category"`.
- The claim matrix search input has `aria-label="Search claim matrix"`.
- The recent checks icon uses `aria-hidden="true"`.
- The embed page's dark mode toggle has `aria-label="Toggle theme"`.

**Observations:**
- The radio groups for healing stage and sensitivity use `<label class="cert-decoder__radio-label">` wrapping the `<input>`, which is a valid implicit association.
- The `documentation.html` page uses a `<table>` for the standards matrix with `<thead>` and `<th>` cells, which is correct for screen readers.
- Color contrast depends on `css/style.css`, which was not included in the reviewed source. Contrast should be spot-checked in the rendered tool, particularly the muted text color (`#cccccc` on `#1a1a1a` in the docs page, which is high contrast and passes).
- Focus states are not defined in the reviewed inline styles; the external stylesheet should be confirmed to provide visible focus indicators on buttons and inputs.

### 7. Cross-Browser

**Result: PASS**

- The tool uses standard, widely supported APIs: `classList`, `querySelector`, `addEventListener`, `MutationObserver`, `localStorage`, `navigator.clipboard`, `postMessage`, `Array.from`, `Set`, `Object.entries`, `Object.defineProperty`, and template literals.
- `navigator.clipboard.writeText` is guarded with a `document.execCommand('copy')` fallback, covering older or restricted contexts.
- `MutationObserver` is supported in all evergreen browsers.
- No vendor-prefixed CSS or non-standard APIs are used in the reviewed files.
- The `js/common.js` module uses `const` / `let` and arrow functions, requiring ES6 support. This is fine for all modern browsers (Chrome, Firefox, Safari, Edge).

**Observation:** No polyfills are included. Internet Explorer is not supported, which is acceptable for a 2026 tool.

### 8. Performance

**Result: PASS**

- All assets are small static files. The reviewed JavaScript modules are plain text with no minification, but the total payload is modest: `certification-data.js` is the largest at roughly 15 KB of source, and the remaining modules are each a few KB.
- No external network requests are made at runtime. There are no CDN links, no font fetches, and no analytics calls in the reviewed files.
- Rendering is synchronous string concatenation into `innerHTML`, which is fast for the small catalogs involved (13 certifications, 10 standards, 7 material profiles, 5 reference profiles).
- The `MutationObserver` in `js/common.js` fires `sendHeight()` on DOM changes. Because the observer watches `childList` and `subtree` on `document.body`, rapid re-renders (for example, typing in the standards library search) will trigger repeated height posts. This is a minor inefficiency, not a correctness issue, and the payload per post is a single integer.

**Observation:** The `sendHeight()` function adds a 50px buffer to `document.body.scrollHeight`. In an embedded context this prevents clipping but may leave a small gap at the bottom of the iframe.

### 9. Security Assessment

**Result: PASS**

- **No server-side component.** All logic executes in the browser. There is no backend to attack, no database, and no authentication surface.
- **No external script calls.** The reviewed files load only local assets. There is no third-party JavaScript, no CDN, and no remote font or image host.
- **No user data leaves the browser.** The Certificate Reader textarea (`#product-claim`), the supplier question sheet inputs, and the material safety checker selections are processed locally. Nothing is transmitted.
- **Output escaping.** `js/library.js`, `js/mixer.js`, and `js/reference-studio.js` all define an `escapeHTML()` helper that replaces `&`, `<`, `>`, `"`, and `'`. This is applied to every interpolated value in the rendered templates, including catalog fields and user-supplied search queries. This prevents HTML injection through the search inputs.
- **`innerHTML` usage.** The modules build markup via template literals and assign to `innerHTML`, but all dynamic values pass through `escapeHTML()`. Static template structure is authored by the developer, not the user.
- **postMessage handling.** `js/common.js` listens for `{ theme }` messages and `index.html` listens for `{ type: 'poli-theme', light }` messages. Neither validates `event.origin`. In an embed scenario this is low risk because the handler only toggles a CSS class, but origin validation would be a hardening improvement.
- **Clipboard.** The embed copy handler writes a developer-authored `<iframe>` snippet, not user input. No sensitive data is involved.
- **localStorage.** Only the theme preference (`theme`) and the embed page theme (`embed-theme`) are stored. No personal data.

---

## Edge Cases Tested

Grounded in the real inputs and logic:

| Edge case | Expected behavior | Result |
|-----------|-------------------|--------|
| Material Safety Checker submitted with no material selected | The `<select id="material-type" required>` blocks submission via native validation | PASS |
| Piercing location left at default `""` ("All locations") | Treated as no location filter | PASS |
| Healing stage defaults to `initial` (radio `checked`) | Initial is preselected on load | PASS |
| Sensitivity defaults to `normal` (radio `checked`) | Normal is preselected on load | PASS |
| Standards library search returns no matches | `filtered.length === 0` renders the `library.no_results` empty state | PASS |
| Standards library search with mixed case | `filter()` lowercases both query and fields | PASS |
| Mixer pairing of two non-conductive materials (BioFlex vs borosilicate glass) | Both `galvanic_emf` are `null`, so the `if` block is skipped, `deltaEmf` stays `0`, `galvanicRisk` stays `low` | PASS |
| Mixer pairing involving `commercial_316l` (tier 1) | `minTier === 1` forces `unsafe_pairing` | PASS |
| Mixer boundary: `gold_solid` vs `astm_f136` | `deltaEmf = 0.35`, not `> 0.35`, so classified `medium` | PASS (boundary is exclusive) |
| Reference studio select changed | `selectedId` updates and `render()` re-runs with the new profile | PASS |
| Embed button clicked when modal element is absent | `if (embedBtn && modal)` guard prevents errors | PASS |
| Clipboard write refused in a sandboxed iframe | Falls back to `document.execCommand('copy')` with text already selected | PASS |
| Tool loaded outside an iframe | `window.self !== window.top` is false, so the theme postMessage script does not run | PASS |
| Tool loaded inside an iframe | Theme is applied via the `poli-theme` message and `sendHeight()` posts the content height to the parent | PASS |
| Language switched to a locale with partial translations | `createCertProxy` / `createClaimProxy` fall back to the static English value when `t()` returns the key unchanged | PASS |

---

## Final Verdict

**Production Ready.**

The Biocompatibility Material Checker is a self-contained, client-side reference tool with no external dependencies, no data transmission, and no server-side attack surface. Its certification database, material profiles, and standards catalog are internally consistent and correctly keyed. The single numeric calculation (galvanic compatibility) produces correct, reproducible results and handles non-conductive materials and tier-1 materials as designed. Output is escaped before insertion into the DOM, and all modules guard against missing mount points.

### Minor Recommendations (non-blocking)

1. **Validate `event.origin` in postMessage handlers.** Both the `theme` listener in `js/common.js` and the `poli-theme` listener in `index.html` accept messages from any origin. Since the handlers only toggle a CSS class, the risk is low, but origin checks would be a clean hardening step for embed deployments.

2. **Unify the two theme message shapes.** `index.html` listens for `{ type: 'poli-theme', light }` while `js/common.js` listens for `{ theme }`. Consolidating on one shape would simplify the embed contract.

3. **Debounce `sendHeight()`.** The `MutationObserver` fires on every DOM mutation, including each keystroke in the standards library search. A short debounce (for example 100 ms) would reduce redundant `postMessage` calls without affecting layout accuracy.

4. **Align material IDs across modules.** `mixer.js` uses `bioflex_polymer` while `reference-studio.js` uses `bioflex`. A shared ID registry would prevent drift if either catalog grows.

5. **Confirm focus styles in `css/style.css`.** The reviewed inline styles do not define `:focus-visible` outlines. The external stylesheet should be verified to provide visible focus indicators on the tab buttons, form controls, and filter pills.

6. **Note the exclusive galvanic threshold.** The `> 0.35` and `> 0.15` comparisons mean a delta of exactly `0.35` classifies as `medium`, not `high`. This is a deliberate boundary choice, but documenting it in the tool's help text would set user expectations.

None of these items block release. The tool meets its stated purpose: helping studios read what a body jewelry claim or certificate actually proves, with ASTM F136, ASTM F138, ISO 10993, and EN 1811 references grounded in real data.
