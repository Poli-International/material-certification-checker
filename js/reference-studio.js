/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - REFERENCE STUDIO MODULE
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

  const REFERENCE_PROFILES = [
    {
      id: 'astm_f136',
      name: 'ASTM F136 Ti-6Al-4V ELI Titanium',
      autoclave: '121°C - 134°C (Steam cycle validated - excellent stability)',
      ultrasonic: 'Suitable with enzymatic neutral detergent bath',
      dryHeat: 'Compatible up to 250°C',
      chemicalDisinfection: 'Compatible with standard glutaraldehyde and peracetic acid',
      handlingNote: 'Must be handled with non-marring anodized or plastic-tipped forceps to avoid surface notch defects.'
    },
    {
      id: 'astm_f138',
      name: 'ASTM F138 316LVM Surgical Stainless Steel',
      autoclave: '121°C - 134°C (Standard vacuum steam cycle)',
      ultrasonic: 'Suitable with neutral enzymatic wash',
      dryHeat: 'Compatible up to 200°C',
      chemicalDisinfection: 'Compatible with hospital-grade disinfectant solutions',
      handlingNote: 'Ensure thorough drying post-cleaning to maintain chromium-oxide passivated surface film.'
    },
    {
      id: 'bioflex',
      name: 'BioFlex® Medical Polymer (PP-R)',
      autoclave: '121°C - 134°C (Steam autoclave compatible, zero degradation)',
      ultrasonic: 'Suitable with low-temperature enzymatic bath',
      dryHeat: 'Not recommended for dry heat or dry glass bead sterilizers',
      chemicalDisinfection: 'High-level disinfectant safe (IPA and chlorhexidine compatible)',
      handlingNote: 'Inspect for mechanical threading burrs or sharp cuts before autoclaving. Pliable in body temperature.'
    },
    {
      id: 'niobium',
      name: 'ASTM F2229 Niobium (Unalloyed)',
      autoclave: '121°C - 134°C (Steam autoclave safe)',
      ultrasonic: 'Suitable with enzymatic wash',
      dryHeat: 'Compatible up to 200°C',
      chemicalDisinfection: 'High chemical resistance to all studio sterilants',
      handlingNote: 'Soft ductile metal, avoid excessive pliers torque to preserve electrolytic anodic color.'
    },
    {
      id: 'borosilicate',
      name: 'Borosilicate Glass 3.3',
      autoclave: '121°C - 134°C (Thermal shock resistant up to 160°C gradient)',
      ultrasonic: 'Suitable, ensure pieces do not vibrate against metal mesh',
      dryHeat: 'Compatible up to 300°C',
      chemicalDisinfection: 'Complete chemical inertness',
      handlingNote: 'Inspect under magnification for microscopic edge chips or fissures before clinical insertion.'
    }
  ];

  class ReferenceStudio {
    constructor() {
      this.profiles = REFERENCE_PROFILES;
      this.selectedId = 'astm_f136';
    }

    getAll() {
      return this.profiles;
    }

    getProfile(id) {
      return this.profiles.find(p => p.id === id) || this.profiles[0];
    }

    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const profile = this.getProfile(this.selectedId);
      const countText = tr('reference_studio.entries_count', { count: this.profiles.length });

      container.innerHTML = `
        <div class="reference-studio__wrapper">
          <div class="reference-studio__header">
            <h3 class="reference-studio__title">${escapeHTML(tr('reference_studio.title'))}</h3>
            <p class="reference-studio__subtitle">${escapeHTML(tr('reference_studio.subtitle'))}</p>
            <span class="cert-tag cert-tag--standard">${escapeHTML(countText)}</span>
          </div>

          <div class="reference-studio__select-bar">
            <label for="reference-studio-select" class="cert-decoder__label">
              ${escapeHTML(tr('reference_studio.select_material'))}
            </label>
            <select id="reference-studio-select" class="cert-decoder__compare-select">
              ${this.profiles.map(p => `
                <option value="${p.id}" ${p.id === this.selectedId ? 'selected' : ''}>
                  ${escapeHTML(p.name)}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="reference-studio__card">
            <h4>${escapeHTML(profile.name)}</h4>
            <div class="reference-studio__matrix-grid">
              <div class="matrix-item">
                <span class="matrix-label">${escapeHTML(tr('reference_studio.autoclave_tolerance'))}</span>
                <span class="matrix-val">⚡ ${escapeHTML(profile.autoclave)}</span>
              </div>
              <div class="matrix-item">
                <span class="matrix-label">${escapeHTML(tr('reference_studio.ultrasonic_clean'))}</span>
                <span class="matrix-val">🫧 ${escapeHTML(profile.ultrasonic)}</span>
              </div>
              <div class="matrix-item">
                <span class="matrix-label">${escapeHTML(tr('reference_studio.dry_heat'))}</span>
                <span class="matrix-val">🔥 ${escapeHTML(profile.dryHeat)}</span>
              </div>
              <div class="matrix-item">
                <span class="matrix-label">${escapeHTML(tr('reference_studio.chemical_disinfection'))}</span>
                <span class="matrix-val">🧴 ${escapeHTML(profile.chemicalDisinfection)}</span>
              </div>
            </div>

            <div class="reference-studio__handling-note">
              <strong>${escapeHTML(tr('reference_studio.studio_handling_note'))}:</strong>
              <p>${escapeHTML(profile.handlingNote)}</p>
            </div>
          </div>
        </div>
      `;

      const select = container.querySelector('#reference-studio-select');
      if (select) {
        select.addEventListener('change', (e) => {
          this.selectedId = e.target.value;
          this.render(containerId);
        });
      }
    }
  }

  window.ReferenceStudio = new ReferenceStudio();
})();
