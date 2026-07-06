# Biocompatibility Material Checker - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support and Contact](#support-and-contact)

## Architecture Overview

### Technology Stack

- **HTML5** - Semantic markup with ARIA labels
- **CSS3** - Custom properties, flexbox, grid, responsive design
- **Vanilla JavaScript (ES6+)** - No frameworks, no dependencies
- **JSON-LD** - Structured data for SEO (FAQPage, WebApplication schemas)

### File Structure

```
material-certification-checker/
├── index.html                 # Main application entry point
├── documentation.html         # Standalone documentation page
├── embed.html                 # Embed instructions page
├── css/
│   ├── style.css              # Core application styles
│   └── poli-standard.css      # Standard Poli theme styles
└── js/
    ├── certification-data.js  # Certification database (ASTM, ISO, EN)
    ├── material-data.js       # Material properties database
    ├── decoder.js             # Main application logic
    ├── feedback.js            # User feedback handling
    └── common.js              # Shared utilities (theme, embed, resize)
```

### Component Breakdown

The application consists of six interactive sections:

1. **Quick Certification Lookup** - Search by certification code (ASTM F138, ISO 5832-1)
2. **Material Safety Checker** - Form-based material evaluation with healing stage and sensitivity
3. **Compliance Verification Tool** - Product claim verification against known standards
4. **Material Comparison Tool** - Side-by-side comparison of 2-3 materials
5. **Certification Quick Reference** - Expandable guide with clickable reference items
6. **Educational Resources** - Static information cards about certifications

### Tab System

The tool uses a three-tab interface:

- **Tool** (`data-tab="tool"`) - Main interactive application
- **Documentation** (`data-tab="docs"`) - Embedded documentation.html in iframe
- **Embed Code** (`data-tab="embed"`) - Copy-paste iframe embed code

## Data Schemas

### Certification Database (`certificationDatabase`)

Defined in `certification-data.js`. Contains 12 certification entries with the following structure:

```javascript
{
  code: 'ASTM F136',
  full_name: 'Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI...',
  organization: 'ASTM International',
  year_current: '2021',
  material_type: 'Titanium Grade 23 (Ti-6Al-4V ELI)',
  key_requirements: {
    titanium: 'Balance',
    aluminum: '5.50-6.50%',
    vanadium: '3.50-4.50%',
    iron_max: '0.25%',
    oxygen_max: '0.13%',
    carbon_max: '0.08%',
    nitrogen_max: '0.05%',
    hydrogen_max: '0.012%'
  },
  body_piercing_use: 'Excellent - Recommended for ALL piercings including initial',
  biocompatibility: 'Excellent - ISO 10993 compliant',
  sterilization: 'Autoclave safe (up to 134°C)',
  related_standards: ['ISO 5832-3', 'ISO 5832-11'],
  common_uses: ['Initial piercings', 'Body jewelry', 'Surgical implants', 'Medical devices'],
  important_notes: 'This is the GOLD STANDARD for body piercing...',
  verification_method: 'Mill certification required showing ASTM F136 compliance',
  safety_rating: 'safe',  // 'safe' | 'conditional' | 'unsafe'
  category: 'astm'        // 'astm' | 'iso' | 'eu' | 'app'
}
```

**Available certifications by category:**

| Category | Certifications |
|----------|---------------|
| ASTM | F136, F138, F1295, F2229, F1586 |
| ISO | 5832-1, 5832-3, 5832-11, 10993, 13485 |
| EU | EN 1441, REACH Compliance |

### Product Claim Verification (`productClaimVerification`)

```javascript
{
  claim: 'Implant Grade Titanium',
  required_certs: ['ASTM F136'],
  not_acceptable: ['ISO 5832-3 (Grade 5)', 'ASTM F1472', 'Commercial Grade Ti'],
  red_flags: [
    'No mill certification provided',
    'Grade 5 marketed as "implant grade"',
    'Suspiciously low price',
    'Generic "titanium" without grade specification'
  ],
  verification_steps: [
    'Request mill certification showing ASTM F136',
    'Verify Grade 23 (Ti-6Al-4V ELI), not Grade 5',
    'Check oxygen content: must be ≤0.13% (not 0.20%)',
    'Confirm "ELI" (Extra Low Interstitial) designation'
  ]
}
```

**Available claims:** `implant_grade_titanium`, `surgical_steel`, `hypoallergenic`, `medical_grade`

### Search Keywords (`searchKeywords`)

Maps certification keys to searchable keyword arrays for fuzzy matching:

```javascript
{
  'ASTM_F136': ['f136', 'astm f136', 'titanium grade 23', 'ti6al4v eli', 'implant titanium', 'grade 23'],
  'ASTM_F138': ['f138', 'astm f138', '316lvm', 'surgical steel', 'implant steel'],
  // ... 12 entries total
}
```

### Material Database (`materialDatabase`)

Defined in `material-data.js`. Contains 14 material entries:

```javascript
{
  name: 'Titanium Grade 23 (Ti-6Al-4V ELI)',
  type: 'metal',
  safety_rating: 'safe',
  biocompatibility: 'Excellent',
  nickel_free: true,
  autoclave_safe: true,
  allergy_risk: 'very_low',
  required_certs: ['ASTM F136', 'ISO 5832-3'],
  healing_stage: ['initial', 'healed'],
  suitable_for: ['All piercings', 'Initial piercings', 'Sensitive skin', 'Nickel allergies'],
  not_suitable_for: [],
  pros: ['Highest biocompatibility', 'Nickel-free', 'Lightweight', 'Strong'],
  cons: ['Higher cost', 'Limited color options (anodized only)'],
  red_flags: ['Grade 5 marketed as "implant grade"', 'No mill certification'],
  cost_rating: 'moderate_to_high'
}
```

**Available materials by group:**

| Group | Materials |
|-------|-----------|
| Metals | Titanium Grade 23, Titanium Grade 5, Surgical Steel 316LVM, Surgical Steel 316L, Niobium, 14K Gold, 18K Gold |
| Medical Polymers | BioFlex, Bioplast, PTFE |
| Other | Glass (Borosilicate), Stone (Natural), Wood/Organic, Acrylic/Plastic |

## Calculation / Logic Algorithms

### Certification Search (`handleSearch`)

Located in `decoder.js`. Algorithm:

1. Read input value from `#cert-search`, trim whitespace, convert to uppercase
2. Validate input is not empty (show alert if empty)
3. Call `findCertification(query)`:
   - Iterate through `certificationDatabase` entries
   - Check direct match: `cert.code.toUpperCase() === query`
   - If no direct match, iterate through `searchKeywords`:
     - Check if any keyword includes the query OR query includes the keyword
   - Return first match or `null`
4. If certification found: call `displayCertificationResult(cert, container)`
5. If not found: call `displaySearchError(query, container)`
6. Scroll results into view with smooth behavior

### Material Safety Check (`handleMaterialCheck`)

1. Prevent default form submission
2. Read values: `materialType`, `location`, `healing`, `sensitivity`
3. Validate material type is selected (show alert if empty)
4. Look up material in `materialDatabase[materialType]`
5. Call `displayMaterialResult(material, healing, sensitivity, location)`
6. Inside display function:
   - Call `checkCompatibility(material, healing, sensitivity)`:
     - If `healing === 'initial'` and material does not include `'initial'` in `healing_stage`: add warning
     - If `sensitivity === 'sensitive'` and allergy risk is not `'very_low'` or `'low'`: add warning
     - If material contains nickel and sensitivity is sensitive: add warning
   - Generate safety badge using `getSafetyBadgeHTML(rating)`
   - Generate safety meter using `getSafetyMeterHTML(rating)`:
     - `safe` = 100% width, green
     - `conditional` = 60% width, yellow
     - `unsafe` = 30% width, red
   - Render full result card with all material properties

### Compliance Verification (`handleVerification`)

1. Read input from `#product-claim`, trim, convert to lowercase
2. Validate input is not empty
3. Search `productClaimVerification` object:
   - Check if claim includes the key (with underscores replaced by spaces)
   - Check if data claim includes the input
   - Check if input includes data claim
4. If match found: call `displayVerificationResult(data, container)`
5. If no match: call `displayGenericVerification(claim, container)` with general tips

### Material Comparison (`handleComparison`)

1. Read values from three select dropdowns (`#compare-1`, `#compare-2`, `#compare-3`)
2. Validate at least two materials selected
3. Filter out empty selections, map to material data objects
4. Call `displayComparison(materials)`:
   - Set results container to `display: grid`
   - Generate comparison cards for each material showing:
     - Name, safety badge, nickel-free status, autoclave safety
     - Initial piercing suitability, cost rating, required certifications

### Reference Chart Toggle (`toggleReferenceChart`)

1. Toggle `#reference-content` display between `none` and `block`
2. Update toggle icon (▲/▼) and text (Hide Guide/Show Guide)

### Reference List Population (`populateReferenceLists`)

1. Map list IDs to certification categories:
   - `astm-list` → `astm`
   - `iso-list` → `iso`
   - `eu-list` → `eu`
   - `app-list` → `app`
2. For each list, filter `certificationDatabase` by category
3. Generate clickable items with certification code and material type
4. Click handler (`handleRefClick`): sets search input value and triggers search

## API Reference

### Public Functions

All functions are defined in `decoder.js` and exposed globally where needed.

#### `initDecoder()`
Initializes all tool components on DOMContentLoaded.

#### `initSearch()`
Binds click and keypress events to search button and input field.

#### `handleSearch()`
- **Params:** None (reads from `#cert-search`)
- **Behavior:** Triggers certification lookup and displays results
- **Side effects:** Shows/hides `#search-results`, scrolls to results

#### `findCertification(query)`
- **Params:** `query` (string) - certification code to search
- **Returns:** Certification object or `null`
- **Logic:** Direct match then fuzzy keyword match

#### `displayCertificationResult(cert, container)`
- **Params:** `cert` (object), `container` (DOM element)
- **Behavior:** Renders full certification details card

#### `displaySearchError(query, container)`
- **Params:** `query` (string), `container` (DOM element)
- **Behavior:** Shows error message with suggested codes

#### `initMaterialChecker()`
Binds submit event to material form.

#### `handleMaterialCheck(e)`
- **Params:** `e` (Event)
- **Behavior:** Validates form, looks up material, displays results

#### `displayMaterialResult(material, healing, sensitivity, location)`
- **Params:** `material` (object), `healing` (string), `sensitivity` (string), `location` (string)
- **Behavior:** Renders complete material safety report

#### `checkCompatibility(material, healing, sensitivity)`
- **Params:** `material` (object), `healing` (string), `sensitivity` (string)
- **Returns:** `{ warnings: string[] }`
- **Logic:** Evaluates material suitability based on healing stage and sensitivity

#### `initComplianceVerification()`
Binds click and keypress events to verification inputs.

#### `handleVerification()`
- **Params:** None (reads from `#product-claim`)
- **Behavior:** Searches product claims and displays verification results

#### `initComparison()`
Binds click event to compare button.

#### `populateComparisonDropdowns()`
Populates three select elements with material options from `materialDatabase`.

#### `handleComparison()`
- **Params:** None (reads from three select elements)
- **Behavior:** Validates selections, displays comparison grid

#### `displayComparison(materials)`
- **Params:** `materials` (array of material objects)
- **Behavior:** Renders side-by-side comparison cards

#### `initReferenceChart()`
Binds click event to reference toggle button.

#### `toggleReferenceChart()`
Toggles visibility of reference content.

#### `populateReferenceLists()`
Populates four category lists with certification items.

#### `handleRefClick(code)`
- **Params:** `code` (string) - certification code
- **Behavior:** Sets search input, scrolls to search, triggers search after 500ms delay

#### `getSafetyBadgeHTML(rating)`
- **Params:** `rating` (string) - `'safe'`, `'conditional'`, or `'unsafe'`
- **Returns:** HTML string for safety badge

#### `getSafetyMeterHTML(rating)`
- **Params:** `rating` (string)
- **Returns:** HTML string for safety meter bar

#### `formatAllergyRisk(risk)`
- **Params:** `risk` (string)
- **Returns:** Formatted allergy risk string with emoji

#### `formatCost(rating)`
- **Params:** `rating` (string)
- **Returns:** Dollar sign representation ($ to $$$$$$)

### Common Functions (common.js)

#### `sendHeight()`
Sends iframe height to parent window via `postMessage`.

#### Theme Functions
- `setTheme(theme, save)` - Applies dark/light mode
- `toggleDarkMode()` - Toggles between themes

#### Embed Functions
- `initEmbedModal()` - Initializes modal for embed code
- `closeModal()` - Closes embed modal
- `copyEmbedCode()` - Copies embed code to clipboard

## Integration Guide

### Standalone Embedding

The tool is dependency-free static HTML/CSS/JS. Embed via iframe:

```html
<iframe
  src="https://poliinternational.com/tools/material-certification-checker/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 1px solid #ddd; border-radius: 8px;"
  title="Material Certification Checker by Poli International">
</iframe>
```

### Embed Options

| Version | Height | Use Case |
|---------|--------|----------|
| Standard | 800px | Recommended for most layouts |
| Large | 1000px | Dedicated tool pages |
| Compact | 600px | Space-constrained layouts |

### Theme Integration

The tool supports parent-to-child theme communication via `postMessage`:

```javascript
// Parent window sends theme
document.querySelector('iframe').contentWindow.postMessage({
  type: 'poli-theme',
  light: true  // or false for dark mode
}, '*');
```

### Auto-Resize

The tool automatically sends its height to the parent iframe via `postMessage({ height: number }, '*')` on load, resize, and content changes.

## Customization

### Styling Overrides

The tool uses CSS custom properties (defined in `poli-standard.css`). Override by targeting the iframe's content:

```css
--color-medical-blue: #3B82F6;
--color-danger-red: #DC3545;
--color-caution-yellow: #FFB800;
--color-background-elevated: #1a1a1a;
--color-text-primary: #ffffff;
--color-text-secondary: #cccccc;
```

### Embed Code Customization

Modify the iframe `style` attribute for custom borders, shadows, and border-radius:

```html
<iframe
  src="https://poliinternational.com/tools/material-certification-checker/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: 2px solid #B76E79; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

## Performance

- **Zero external dependencies** - No frameworks, no CDN resources
- **Total payload:** ~50KB (HTML + CSS + JS combined)
- **No API calls** - All data is client-side in JavaScript objects
- **No images** - Uses Unicode emoji for icons
- **Lazy rendering** - Results sections hidden until triggered
- **MutationObserver** - Efficient height tracking for iframe resizing

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

**Requirements:**
- JavaScript enabled
- HTML5 support
- ES6+ (arrow functions, template literals, `const`/`let`)

## Security

### Input Handling

- **No server-side processing** - All logic runs client-side
- **No data transmission** - No form data is sent to any server
- **No cookies** - Only uses `localStorage` for theme preference
- **No external API calls** - Zero network requests

### XSS Prevention

- User input is only used for DOM text content (not `innerHTML`)
- Search queries are validated and trimmed
- No `eval()` or dynamic script execution
- All dynamic content uses `textContent` or template literals with trusted data

### Iframe Security

- Tool sets `X-Frame-Options` equivalent via `noindex, nofollow` meta tag
- Parent-child communication uses `postMessage` with origin validation
- No cross-origin data sharing

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-02-07 | Initial release with certification database, material checker, compliance verification, comparison tool, and reference guide |

## Support and Contact

For technical support, integration assistance, or custom development:

- **Email:** support@poliinternational.com
- **Website:** https://poliinternational.com
- **Documentation:** https://poliinternational.com/tools/material-certification-checker/documentation.html
- **GitHub:** https://github.com/poli-international/material-certification

---

*Documentation generated from source code version 1.0.0*
