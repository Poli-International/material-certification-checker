/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - MATERIAL MIXER MODULE
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

  const MATERIAL_PROFILES = {
    'astm_f136': {
      id: 'astm_f136',
      name: 'ASTM F136 Ti-6Al-4V ELI',
      galvanic_emf: -0.15, // V vs SCE in 0.9% NaCl
      elements: ['Titanium (Ti 89%)', 'Aluminum (Al 6%)', 'Vanadium (V 4%)', 'Iron (Fe < 0.25%)', 'Oxygen (O < 0.13%)'],
      biocompatibilityTier: 3,
      isPolymer: false
    },
    'astm_f138': {
      id: 'astm_f138',
      name: 'ASTM F138 316LVM Stainless Steel',
      galvanic_emf: -0.05,
      elements: ['Iron (Fe 62%)', 'Chromium (Cr 18%)', 'Nickel (Ni 14%)', 'Molybdenum (Mo 2.8%)', 'Manganese (Mn 1.8%)'],
      biocompatibilityTier: 3,
      isPolymer: false
    },
    'niobium': {
      id: 'niobium',
      name: 'ASTM F2229 Niobium (Unalloyed)',
      galvanic_emf: -0.18,
      elements: ['Niobium (Nb 99.8%)', 'Tantalum (Ta < 0.1%)'],
      biocompatibilityTier: 3,
      isPolymer: false
    },
    'gold_solid': {
      id: 'gold_solid',
      name: 'Solid 14K / 18K Gold',
      galvanic_emf: +0.20,
      elements: ['Gold (Au 58.5-75%)', 'Copper (Cu)', 'Silver (Ag)', 'Zinc (Zn)'],
      biocompatibilityTier: 2,
      isPolymer: false
    },
    'bioflex_polymer': {
      id: 'bioflex_polymer',
      name: 'BioFlex® Medical Polymer',
      galvanic_emf: null, // Non-conductive polymer
      elements: ['Medical Polypropylene Copolymer (USP Class VI)'],
      biocompatibilityTier: 3,
      isPolymer: true
    },
    'borosilicate_glass': {
      id: 'borosilicate_glass',
      name: 'Borosilicate Glass 3.3',
      galvanic_emf: null, // Non-conductive inert silicate
      elements: ['Silica (SiO2 81%)', 'Boron Trioxide (B2O3 13%)', 'Sodium Oxide (Na2O 4%)'],
      biocompatibilityTier: 3,
      isPolymer: false
    },
    'commercial_316l': {
      id: 'commercial_316l',
      name: 'Commercial 316L (Non-Implant)',
      galvanic_emf: -0.10,
      elements: ['Iron (Fe 65%)', 'Chromium (Cr 17%)', 'Nickel (Ni 12%)', 'Molybdenum (Mo 2%)'],
      biocompatibilityTier: 1,
      isPolymer: false
    }
  };

  class MaterialMixer {
    constructor() {
      this.profiles = MATERIAL_PROFILES;
    }

    getProfile(id) {
      return this.profiles[id] || null;
    }

    evaluateCompatibility(idA, idB) {
      const matA = this.getProfile(idA);
      const matB = this.getProfile(idB);

      if (!matA || !matB) return null;

      // Galvanic analysis
      let galvanicRisk = 'low';
      let deltaEmf = 0;

      if (matA.galvanic_emf !== null && matB.galvanic_emf !== null) {
        deltaEmf = Math.abs(matA.galvanic_emf - matB.galvanic_emf);
        if (deltaEmf > 0.35) galvanicRisk = 'high';
        else if (deltaEmf > 0.15) galvanicRisk = 'medium';
      }

      // Elemental count
      const combinedElements = Array.from(new Set([...matA.elements, ...matB.elements]));

      // Biocompatibility tier
      const minTier = Math.min(matA.biocompatibilityTier, matB.biocompatibilityTier);

      let statusKey = 'safe_pairing';
      if (galvanicRisk === 'high' || minTier === 1) {
        statusKey = 'unsafe_pairing';
      } else if (galvanicRisk === 'medium' || minTier === 2) {
        statusKey = 'caution_pairing';
      }

      return {
        matA,
        matB,
        deltaEmf,
        galvanicRisk,
        elementCount: combinedElements.length,
        combinedElements,
        minTier,
        statusKey,
        statusText: tr(`mixer.${statusKey}`)
      };
    }

    render(containerId, initialMatA = 'astm_f136', initialMatB = 'astm_f138') {
      const container = document.getElementById(containerId);
      if (!container) return;

      const evalResult = this.evaluateCompatibility(initialMatA, initialMatB);

      const keys = Object.keys(this.profiles);

      container.innerHTML = `
        <div class="material-mixer__wrapper">
          <div class="material-mixer__header">
            <h3 class="material-mixer__title">${escapeHTML(tr('mixer.title'))}</h3>
            <p class="material-mixer__subtitle">${escapeHTML(tr('mixer.subtitle'))}</p>
          </div>

          <div class="material-mixer__selectors">
            <div class="cert-decoder__input-group">
              <label class="cert-decoder__label" for="mixer-mat-a">${escapeHTML(tr('mixer.select_primary'))}</label>
              <select id="mixer-mat-a" class="cert-decoder__compare-select">
                ${keys.map(k => `
                  <option value="${k}" ${k === initialMatA ? 'selected' : ''}>${escapeHTML(this.profiles[k].name)}</option>
                `).join('')}
              </select>
            </div>
            <div class="cert-decoder__input-group">
              <label class="cert-decoder__label" for="mixer-mat-b">${escapeHTML(tr('mixer.select_secondary'))}</label>
              <select id="mixer-mat-b" class="cert-decoder__compare-select">
                ${keys.map(k => `
                  <option value="${k}" ${k === initialMatB ? 'selected' : ''}>${escapeHTML(this.profiles[k].name)}</option>
                `).join('')}
              </select>
            </div>
          </div>

          ${evalResult ? `
            <div class="material-mixer__results">
              <div class="material-mixer__status-card status-${evalResult.statusKey}">
                <h4>${escapeHTML(evalResult.statusText)}</h4>
                <p><strong>${escapeHTML(tr('mixer.galvanic_risk'))}:</strong> ${escapeHTML(evalResult.galvanicRisk.toUpperCase())} (&Delta;E: ${evalResult.deltaEmf.toFixed(2)} V)</p>
                <p><strong>${escapeHTML(tr('mixer.biocompatibility_score'))}:</strong> Tier ${evalResult.minTier} / 3</p>
              </div>

              <div class="material-mixer__elements">
                <h5>${escapeHTML(tr('mixer.elemental_analysis', { count: evalResult.elementCount }))}</h5>
                <ul class="material-mixer__element-list">
                  ${evalResult.combinedElements.map(el => `<li>${escapeHTML(el)}</li>`).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      // Event listeners for select changes
      const selA = container.querySelector('#mixer-mat-a');
      const selB = container.querySelector('#mixer-mat-b');
      if (selA && selB) {
        const update = () => this.render(containerId, selA.value, selB.value);
        selA.addEventListener('change', update);
        selB.addEventListener('change', update);
      }
    }
  }

  window.MaterialMixer = new MaterialMixer();
})();
