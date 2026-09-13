/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - STANDARDS LIBRARY MODULE
Poli International
═══════════════════════════════════════════════════════════════
*/

(function() {
  'use strict';

  function tr(key, params) {
    if (typeof window !== 'undefined') {
      if (typeof window.t === 'function') return window.t(key, params);
      if (window.i18n && typeof window.i18n.t === 'function') return window.i18n.t(key, params);
    }
    return key;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const STANDARDS_CATALOG = [
    {
      id: 'astm-f136',
      code: 'ASTM F136',
      title: 'Wrought Titanium-6Aluminum-4Vanadium ELI for Surgical Implant Applications',
      category: 'metals',
      organization: 'ASTM International',
      scope: 'Standard specification for Ti-6Al-4V ELI (Extra Low Interstitial) medical alloy bar, wire, and sheet for surgical implants.',
      biocompatibility: 'ISO 10993 compliant, non-cytotoxic, Grade 23 medical titanium'
    },
    {
      id: 'astm-f138',
      code: 'ASTM F138',
      title: 'Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants',
      category: 'metals',
      organization: 'ASTM International',
      scope: 'Vacuum induction melted and consumable electrode remelted (VIM/VAR) 316LVM surgical implant stainless steel.',
      biocompatibility: 'Surgical implant standard, requires controlled nickel migration'
    },
    {
      id: 'astm-f2229',
      code: 'ASTM F2229',
      title: 'Wrought, Nitrogen Strengthened 23Manganese-21Chromium-1Molybdenum Low-Nickel Stainless Steel Alloy Bar and Wire',
      category: 'metals',
      organization: 'ASTM International',
      scope: 'Implant-grade nickel-free austenitic stainless steel for surgical devices and sensitive tissue contacts.',
      biocompatibility: 'Hypoallergenic biocompatible implant alloy'
    },
    {
      id: 'iso-5832-1',
      code: 'ISO 5832-1',
      title: 'Implants for surgery - Metallic materials - Part 1: Wrought stainless steel',
      category: 'metals',
      organization: 'ISO',
      scope: 'International standard for composition and mechanical properties of surgical stainless steel for body implants.',
      biocompatibility: 'International clinical surgical implant conformity'
    },
    {
      id: 'iso-5832-3',
      code: 'ISO 5832-3',
      title: 'Implants for surgery - Metallic materials - Part 3: Wrought titanium 6-aluminium 4-vanadium alloy',
      category: 'metals',
      organization: 'ISO',
      scope: 'International implant grade specification for Ti-6Al-4V titanium alloy.',
      biocompatibility: 'Global surgical implant standard for osseous and soft tissue'
    },
    {
      id: 'iso-10993-5',
      code: 'ISO 10993-5',
      title: 'Biological evaluation of medical devices - Part 5: Tests for in vitro cytotoxicity',
      category: 'biological',
      organization: 'ISO',
      scope: 'Quantitative and qualitative in vitro test methods assessing toxic cellular responses to medical devices and jewelry materials.',
      biocompatibility: 'Primary gateway for cell viability and membrane integrity testing'
    },
    {
      id: 'iso-10993-10',
      code: 'ISO 10993-10',
      title: 'Biological evaluation of medical devices - Part 10: Tests for skin sensitization',
      category: 'biological',
      organization: 'ISO',
      scope: 'Evaluation of the potential of medical devices and material extracts to cause delayed contact hypersensitivity.',
      biocompatibility: 'Dermal sensitization assay protocol'
    },
    {
      id: 'usp-class-vi',
      code: 'USP Class VI',
      title: 'United States Pharmacopeia Biological Reactivity Tests (In Vivo)',
      category: 'polymers',
      organization: 'USP',
      scope: 'Stringent in vivo biocompatibility standard for medical polymers including systemic injection, intracutaneous reactivity, and implantation.',
      biocompatibility: 'Gold standard medical grade certification for BioFlex and implant fluoropolymers'
    },
    {
      id: 'en-1811',
      code: 'EN 1811:2011+A1:2015',
      title: 'Reference test method for release of nickel from all post assemblies inserted into pierced parts of the human body',
      category: 'chemical',
      organization: 'CEN / European Union',
      scope: 'Official reference method for measuring migration of nickel in synthetic sweat under EU REACH Regulation Entry 27.',
      biocompatibility: 'Legal threshold limit 0.2 µg/cm²/week for initial piercings, 0.5 µg/cm²/week for skin contact'
    }
  ];

  class StandardsLibrary {
    constructor() {
      this.standards = STANDARDS_CATALOG;
      this.currentCategory = 'all';
      this.searchQuery = '';
    }

    getAll() {
      return this.standards;
    }

    filter(category, query) {
      let results = this.standards;
      if (category && category !== 'all') {
        results = results.filter(item => item.category === category);
      }
      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        results = results.filter(item =>
          item.code.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.scope.toLowerCase().includes(q) ||
          item.organization.toLowerCase().includes(q)
        );
      }
      return results;
    }

    getCountText(filteredCount, totalCount, query) {
      if (query && query.trim()) {
        return tr('library.standards_count_filtered', { count: filteredCount, query: query.trim() });
      }
      return tr('library.standards_count', { count: totalCount });
    }

    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const filtered = this.filter(this.currentCategory, this.searchQuery);
      const countLabel = this.getCountText(filtered.length, this.standards.length, this.searchQuery);

      container.innerHTML = `
        <div class="standards-library__wrapper">
          <div class="standards-library__header">
            <h3 class="standards-library__title">${escapeHTML(tr('library.title'))}</h3>
            <p class="standards-library__subtitle">${escapeHTML(tr('library.subtitle'))}</p>
            <div class="standards-library__count-badge cert-tag cert-tag--standard">${escapeHTML(countLabel)}</div>
          </div>

          <div class="standards-library__toolbar">
            <input type="search" class="cert-decoder__text-input standards-library__search"
              placeholder="${escapeHTML(tr('library.search_placeholder'))}"
              value="${escapeHTML(this.searchQuery)}"
              aria-label="${escapeHTML(tr('library.search_placeholder'))}" />
            <div class="standards-library__categories">
              <button type="button" class="btn btn--secondary btn--small ${this.currentCategory === 'all' ? 'active' : ''}" data-cat="all">
                ${escapeHTML(tr('library.category_all'))}
              </button>
              <button type="button" class="btn btn--secondary btn--small ${this.currentCategory === 'metals' ? 'active' : ''}" data-cat="metals">
                ${escapeHTML(tr('library.category_metals'))}
              </button>
              <button type="button" class="btn btn--secondary btn--small ${this.currentCategory === 'polymers' ? 'active' : ''}" data-cat="polymers">
                ${escapeHTML(tr('library.category_polymers'))}
              </button>
              <button type="button" class="btn btn--secondary btn--small ${this.currentCategory === 'biological' ? 'active' : ''}" data-cat="biological">
                ${escapeHTML(tr('library.category_biological'))}
              </button>
              <button type="button" class="btn btn--secondary btn--small ${this.currentCategory === 'chemical' ? 'active' : ''}" data-cat="chemical">
                ${escapeHTML(tr('library.category_chemical'))}
              </button>
            </div>
          </div>

          <div class="standards-library__grid">
            ${filtered.length === 0 ? `
              <div class="standards-library__empty">
                <p>${escapeHTML(tr('library.no_results'))}</p>
              </div>
            ` : filtered.map(std => `
              <div class="standards-library__card" data-standard-id="${escapeHTML(std.id)}">
                <div class="standards-library__card-header">
                  <strong class="standards-library__code">${escapeHTML(std.code)}</strong>
                  <span class="cert-tag cert-tag--trace">[${escapeHTML(std.organization)}]</span>
                </div>
                <h4 class="standards-library__card-title">${escapeHTML(std.title)}</h4>
                <p class="standards-library__card-scope">${escapeHTML(std.scope)}</p>
                <div class="standards-library__card-bio">
                  <span class="bio-icon">🧪</span>
                  <span>${escapeHTML(std.biocompatibility)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      // Wire search and category handlers
      const searchInput = container.querySelector('.standards-library__search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value;
          this.render(containerId);
        });
      }

      container.querySelectorAll('.standards-library__categories button').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentCategory = btn.getAttribute('data-cat') || 'all';
          this.render(containerId);
        });
      });
    }
  }

  window.StandardsLibrary = new StandardsLibrary();
})();
