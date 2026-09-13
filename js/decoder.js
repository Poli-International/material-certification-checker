/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - MAIN LOGIC
Poli International
Version: 1.0
═══════════════════════════════════════════════════════════════
*/

// ═══════════════════════════════════════════════════════════
// 1. INITIALIZATION
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
  initDecoder();
});

function initDecoder() {
  // Initialize dark mode
  initDarkMode();

  // Initialize search
  initSearch();

  // Initialize material checker
  initMaterialChecker();

  // Initialize compliance verification
  initComplianceVerification();

  // Initialize comparison tool
  initComparison();

  // Initialize reference chart
  initReferenceChart();

  // Initialize recent checks history
  initRecentHistory();

  // Initialize embed modal
  initEmbedModal();

  // Initialize email capture
  initEmailCapture();

  // Initialize interactive glossary overlay
  initGlossaryOverlay();

  // Populate comparison dropdowns
  populateComparisonDropdowns();

  // Populate reference lists
  populateReferenceLists();
}

// ═══════════════════════════════════════════════════════════
// 1.1 TECHNICAL TERMS GLOSSARY & TOOLTIPS
// ═══════════════════════════════════════════════════════════

const TECHNICAL_TERMS_GLOSSARY = {
  'Biocompatibility': 'Ability of a material to reside in contact with living body tissue without causing cytotoxic, toxic, or inflammatory responses (ISO 10993).',
  'Tensile Strength': 'Maximum mechanical stretching stress a material can withstand before necking or catastrophic structural failure.',
  'Autoclave Safe': 'Capable of repeated steam sterilization cycles (121°C–134°C) without material degradation, distortion, or toxic leeching.',
  'Nickel-Free': 'A marketing claim. Literally it means the alloy contains no nickel. It is often used loosely for alloys that pass the EU nickel release limit, which is a different thing. Ask which is meant, and for the document behind it.',
  'ISO 10993': 'International standard suite defining biological evaluation and biocompatibility testing for medical and implantable devices.',
  'ELI': 'Extra Low Interstitial: ultra-pure alloy grade with reduced oxygen, nitrogen, and iron for enhanced ductility and fracture toughness (ASTM F136).',
  'Mill Certification': 'Traceable metallurgical test report from the raw material mill documenting chemical composition and mechanical properties by lot.',
  'Yield Strength': 'The mechanical stress threshold at which a material begins to deform plastically and permanently under load.',
  'Borosilicate Glass': 'Thermal- and chemical-resistant glass formulated with silica and boron trioxide, non-porous and body-safe for healed piercings.'
};

const TECHNICAL_TERMS_CATALOG = [
  {
    id: 'astm-f136',
    term: 'ASTM F136 (Ti-6Al-4V ELI)',
    category: 'astm',
    categoryName: 'ASTM Standard',
    letter: 'A',
    standard: 'ASTM F136',
    definition: 'Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications (UNS R56401).',
    application: 'The international benchmark material for initial body piercings and surgical implants. Fully biocompatible, nickel-free, and autoclave safe.',
    citation: 'ASTM International, ASTM F136-13, West Conshohocken, PA.'
  },
  {
    id: 'astm-f138',
    term: 'ASTM F138 (316LVM Surgical Steel)',
    category: 'astm',
    categoryName: 'ASTM Standard',
    letter: 'A',
    standard: 'ASTM F138',
    definition: 'Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants (UNS S31673).',
    application: 'Implant-grade stainless steel produced via vacuum arc remelting (VAR) to minimize non-metallic inclusions and eliminate gas porosity. Meets nickel release standards for initial piercings.',
    citation: 'ASTM International, ASTM F138-19, West Conshohocken, PA.'
  },
  {
    id: 'astm-f67',
    term: 'ASTM F67 (Unalloyed CP Titanium)',
    category: 'astm',
    categoryName: 'ASTM Standard',
    letter: 'A',
    standard: 'ASTM F67',
    definition: 'Standard Specification for Unalloyed Titanium for Surgical Implant Applications (Commercially Pure Titanium Grades 1, 2, 3, and 4).',
    application: 'Pure unalloyed titanium offering exceptional corrosion resistance and tissue compatibility, suitable for medical implants and sensitive tissue.',
    citation: 'ASTM International, ASTM F67-13, West Conshohocken, PA.'
  },
  {
    id: 'astm-b392',
    term: 'ASTM B392 (Niobium)',
    category: 'astm',
    categoryName: 'ASTM Standard',
    letter: 'A',
    standard: 'ASTM B392',
    definition: 'Standard Specification for Niobium and Niobium Alloy Bar, Rod, and Wire.',
    application: 'Pure elemental niobium (element 41) has zero biological reactivity, is 100% hypoallergenic, and can be anodized without alloy degradation.',
    citation: 'ASTM International, ASTM B392-18, West Conshohocken, PA.'
  },
  {
    id: 'astm-f754',
    term: 'ASTM F754 (Implantable PTFE)',
    category: 'astm',
    categoryName: 'ASTM Standard',
    letter: 'A',
    standard: 'ASTM F754',
    definition: 'Standard Specification for Implantable Polytetrafluoroethylene (PTFE) Polymer Fabricated Forms for Surgical, Medical, and Dental Applications.',
    application: 'Machined synthetic fluoropolymer with high chemical inertness and low coefficient of friction; used for flexible retainers and body piercing.',
    citation: 'ASTM International, ASTM F754-08, West Conshohocken, PA.'
  },
  {
    id: 'astm-f1295',
    term: 'ASTM F1295 (Ti-6Al-7Nb)',
    category: 'astm',
    categoryName: 'ASTM Standard',
    letter: 'A',
    standard: 'ASTM F1295',
    definition: 'Standard Specification for Wrought Titanium-6Aluminum-7Niobium Alloy for Surgical Implant Applications (UNS R56700).',
    application: 'Vanadium-free implant titanium alloy developed for surgical implants, offering high fatigue strength and biocompatibility.',
    citation: 'ASTM International, ASTM F1295-16, West Conshohocken, PA.'
  },
  {
    id: 'autoclave-sterilization',
    term: 'Autoclave Sterilization',
    category: 'protocol',
    categoryName: 'Sterilization & Protocol',
    letter: 'A',
    standard: 'ISO 17665',
    definition: 'Saturated steam sterilization under high pressure (typically 121°C to 134°C) designed to achieve complete microbial eradication and spore inactivation.',
    application: 'Mandatory standard protocol for all jewelry and procedural instruments entering broken skin or fresh piercing tissue.',
    citation: 'ISO 17665-1:2006 Sterilization of health care products - Moist heat.'
  },
  {
    id: 'biocompatibility',
    term: 'Biocompatibility',
    category: 'science',
    categoryName: 'Metallurgy & Science',
    letter: 'B',
    standard: 'ISO 10993-1',
    definition: 'The ability of a material to reside in contact with living body tissue without causing cytotoxic, toxic, mutagenic, or inflammatory host responses.',
    application: 'Fundamental prerequisite for any material used in fresh piercing wounds or prolonged internal tissue contact.',
    citation: 'ISO 10993-1:2018 Biological evaluation of medical devices.'
  },
  {
    id: 'bioflex',
    term: 'BioFlex® body jewelry',
    category: 'polymer',
    categoryName: 'Polymers & Glass',
    letter: 'B',
    standard: 'ISO 10993 / USP Class VI',
    definition: 'Medical-grade PP-R (polypropylene random copolymer) created by Patrick Poli; monolithic injection-moulded biocompatible polymer compliant with ISO 10993 and USP Class VI.',
    application: 'Highly flexible, steam-sterilizable, non-reactive polymer ideal for initial piercings, oral piercings, pregnancy retainers, and medical procedures.',
    citation: 'Poli International, ISO 10993 & USP Class VI Certified Monolithic PP-R.'
  },
  {
    id: 'bioplast',
    term: 'Bioplast',
    category: 'polymer',
    categoryName: 'Polymers & Glass',
    letter: 'B',
    standard: 'ISO 10993',
    definition: 'Medical-grade modified synthetic polymer used for flexible piercing jewelry and retainers.',
    application: 'Flexible retainer material suitable for initial piercings and temporary wear during imaging.',
    citation: 'Bioplast Biocompatibility Testing Suite.'
  },
  {
    id: 'borosilicate-glass',
    term: 'Borosilicate Glass',
    category: 'polymer',
    categoryName: 'Polymers & Glass',
    letter: 'B',
    standard: 'ISO 3585',
    definition: 'Non-porous, chemically inert silica-boron glass with low thermal expansion coefficient.',
    application: 'Scratch-resistant, non-porous, and steam-autoclavable; excellent for stretching and healed body piercings.',
    citation: 'ISO 3585:1998 Borosilicate glass 3.3 - Properties.'
  },
  {
    id: 'cytotoxicity',
    term: 'Cytotoxicity Testing',
    category: 'science',
    categoryName: 'Metallurgy & Science',
    letter: 'C',
    standard: 'ISO 10993-5',
    definition: 'In vitro biological testing assessing cell lysis and metabolic inhibition when mammalian cells are exposed to material extracts.',
    application: 'First-line biological safety screen required for all medical devices and body piercing implants.',
    citation: 'ISO 10993-5:2009 Tests for in vitro cytotoxicity.'
  },
  {
    id: 'eli',
    term: 'ELI (Extra Low Interstitial)',
    category: 'metallurgy',
    categoryName: 'Metallurgy & Science',
    letter: 'E',
    standard: 'ASTM F136',
    definition: 'High-purity metallurgical specification with strictly limited interstitial elements (oxygen ≤0.13%, carbon, nitrogen, hydrogen, iron).',
    application: 'Dramatically improves fracture toughness and ductility in titanium alloys compared to standard industrial Grade 5.',
    citation: 'ASTM F136-13 Section 6 Chemical Composition.'
  },
  {
    id: 'en-1811',
    term: 'EN 1811 (Nickel Release Reference)',
    category: 'eu',
    categoryName: 'European Standard',
    letter: 'E',
    standard: 'EN 1811',
    definition: 'European reference test method for measuring the release of nickel from post assemblies and articles inserted into pierced body parts.',
    application: 'Defines the legal threshold (<0.2 µg/cm²/week for piercings) to prevent allergic contact dermatitis under EU REACH.',
    citation: 'CEN, EN 1811:2011+A1:2015 Nickel release reference test.'
  },
  {
    id: 'reach-annex-xvii',
    term: 'EU REACH Annex XVII (Entry 27)',
    category: 'eu',
    categoryName: 'European Standard',
    letter: 'E',
    standard: 'REACH Entry 27',
    definition: 'European chemical regulation legally restricting nickel release rates to under 0.2 µg/cm²/week for body piercing posts and 0.5 µg/cm²/week for skin contact items.',
    application: 'Binding chemical safety standard in the European Union; compliant materials prevent sensitization.',
    citation: 'Regulation (EC) No 1907/2006 (REACH) Annex XVII.'
  },
  {
    id: 'iso-5832-1',
    term: 'ISO 5832-1 (Wrought Stainless Steel)',
    category: 'iso',
    categoryName: 'ISO Standard',
    letter: 'I',
    standard: 'ISO 5832-1',
    definition: 'International standard for surgical implants - Metallic materials - Part 1: Wrought stainless steel.',
    application: 'International equivalent to ASTM F138 for surgical implant-grade stainless steel.',
    citation: 'ISO 5832-1:2016 Implants for surgery - Metallic materials.'
  },
  {
    id: 'iso-5832-3',
    term: 'ISO 5832-3 (Wrought Ti-6Al-4V)',
    category: 'iso',
    categoryName: 'ISO Standard',
    letter: 'I',
    standard: 'ISO 5832-3',
    definition: 'International standard for surgical implants - Metallic materials - Part 3: Wrought titanium 6-aluminium 4-vanadium alloy.',
    application: 'International specification for implant-grade titanium alloy.',
    citation: 'ISO 5832-3:2016 Implants for surgery - Metallic materials.'
  },
  {
    id: 'iso-10993',
    term: 'ISO 10993 (Biological Evaluation)',
    category: 'iso',
    categoryName: 'ISO Standard',
    letter: 'I',
    standard: 'ISO 10993 Series',
    definition: 'Comprehensive multi-part international standard framework for evaluating the biological safety and biocompatibility of medical devices.',
    application: 'The universal benchmark for evaluating cytotoxicity, sensitization, irritation, and systemic toxicity of implantable body jewelry.',
    citation: 'ISO 10993-1 through 10993-23 Biological evaluation suite.'
  },
  {
    id: 'mill-test-report',
    term: 'Mill Test Report (MTR / Mill Cert)',
    category: 'science',
    categoryName: 'Metallurgy & Science',
    letter: 'M',
    standard: 'ASTM A1040',
    definition: 'Certified quality document issued by raw material mills detailing the chemical composition, heat numbers, tensile and yield strength of material lots.',
    application: 'The only reliable proof that a metal batch conforms to ASTM F136 or ASTM F138.',
    citation: 'ASTM Standards on Metallurgical Quality Documentation.'
  },
  {
    id: 'nickel-allergy',
    term: 'Nickel Allergy & Hypersensitivity',
    category: 'science',
    categoryName: 'Metallurgy & Science',
    letter: 'N',
    standard: 'EN 1811',
    definition: 'Type IV delayed cell-mediated hypersensitivity reaction triggered by nickel ions penetrating epidermal and dermal tissue.',
    application: 'The most common contact allergy in body piercing; prevented by using certified nickel-free materials (titanium, BioFlex®, niobium, glass).',
    citation: 'Clinical Dermatology & Contact Dermatitis Reference.'
  },
  {
    id: 'niobium',
    term: 'Niobium (Nb Element 41)',
    category: 'metallurgy',
    categoryName: 'Metallurgy & Science',
    letter: 'N',
    standard: 'ASTM B392',
    definition: 'Elemental transition metal with high corrosion resistance, zero magnetic susceptibility, and biological inertness.',
    application: 'Excellent alternative to titanium for initial piercings, especially when black or vivid anodized colors are desired without coatings.',
    citation: 'ASTM B392 Standard Specification for Niobium.'
  },
  {
    id: 'passivation',
    term: 'Passivation (Surface Treatment)',
    category: 'metallurgy',
    categoryName: 'Metallurgy & Science',
    letter: 'P',
    standard: 'ASTM F86',
    definition: 'Chemical treatment in nitric or citric acid that selectively removes free surface iron and enhances the protective oxide film.',
    application: 'Crucial post-machining step to maximize corrosion resistance in stainless steels and titanium.',
    citation: 'ASTM F86 Standard Practice for Surface Preparation and Marking of Metallic Surgical Implants.'
  },
  {
    id: 'pp-r-copolymer',
    term: 'PP-R (Polypropylene Random Copolymer)',
    category: 'polymer',
    categoryName: 'Polymers & Glass',
    letter: 'P',
    standard: 'ISO 10993 / USP VI',
    definition: 'Monolithic medical-grade thermoplastic polymer resin engineered for biocompatibility, chemical stability, and autoclave resistance.',
    application: 'The authentic monolithic material formulation of genuine BioFlex® body jewelry.',
    citation: 'Medical Polymer Science Technical Data.'
  },
  {
    id: 'ptfe',
    term: 'PTFE (Polytetrafluoroethylene)',
    category: 'polymer',
    categoryName: 'Polymers & Glass',
    letter: 'P',
    standard: 'ASTM F754',
    definition: 'Synthetic fluoropolymer of tetrafluoroethylene (ASTM F754) characterized by low friction and chemical non-reactivity.',
    application: 'Used for machined flexible body piercing retainers.',
    citation: 'ASTM F754 Standard Specification.'
  },
  {
    id: 'tensile-strength',
    term: 'Tensile Strength (Ultimate)',
    category: 'metallurgy',
    categoryName: 'Metallurgy & Science',
    letter: 'T',
    standard: 'ASTM E8',
    definition: 'The maximum engineering tensile stress an alloy can withstand before necking and structural failure under load.',
    application: 'Key mechanical property on mill certs indicating structural integrity of piercing bars and threads.',
    citation: 'ASTM E8/E8M Standard Test Methods for Tension Testing of Metallic Materials.'
  },
  {
    id: 'usp-class-vi',
    term: 'USP Class VI (Plastics Testing)',
    category: 'science',
    categoryName: 'Metallurgy & Science',
    letter: 'U',
    standard: 'USP <88>',
    definition: 'United States Pharmacopeia testing protocol evaluating plastics and polymers for systemic toxicity, intracutaneous reactivity, and muscle implantation.',
    application: 'The highest medical grade certification for biocompatible polymers including PP-R (BioFlex®).',
    citation: 'USP-NF Chapter <88> Biological Reactivity Tests, In Vivo.'
  },
  {
    id: 'vacuum-arc-remelting',
    term: 'Vacuum Arc Remelting (VAR / LVM)',
    category: 'metallurgy',
    categoryName: 'Metallurgy & Science',
    letter: 'V',
    standard: 'ASTM F138',
    definition: 'Secondary melting process conducted in a vacuum furnace that purges dissolved gases and non-metallic inclusions.',
    application: 'Required process for ASTM F138 (316LVM) to produce ultra-clean implant steel with minimal corrosion pits.',
    citation: 'Vacuum Metallurgy Specifications.'
  },
  {
    id: 'yield-strength',
    term: 'Yield Strength (0.2% Offset)',
    category: 'metallurgy',
    categoryName: 'Metallurgy & Science',
    letter: 'Y',
    standard: 'ASTM E8',
    definition: 'The mechanical stress level at which a metal begins permanent plastic deformation and will no longer rebound to original dimensions.',
    application: 'Ensures jewelry posts and rings maintain shape and resist bending under physiological forces.',
    citation: 'ASTM E8 Tensile Testing Standards.'
  }
];

function renderTermWithTooltip(term, displayText) {
  const definition = TECHNICAL_TERMS_GLOSSARY[term] || t('glossary.' + term);
  const label = displayText || term;
  if (!definition || definition === 'glossary.' + term) return label;
  return `<span class="cert-tooltip-wrap" tabindex="0" aria-label="${label}: ${definition}"><span class="cert-tooltip-term">${label}</span><span class="cert-tooltip-icon">ℹ</span><span class="cert-tooltip-box" role="tooltip"><strong>${term}</strong>${definition}</span></span>`;
}

// ═══════════════════════════════════════════════════════════
// 1.2 SESSION HISTORY (RECENT CHECKS)
// ═══════════════════════════════════════════════════════════

const HISTORY_STORAGE_KEY = 'cert_decoder_history_v1';
const MAX_HISTORY_ITEMS = 5;

function initRecentHistory() {
  renderRecentChecks();

  const clearBtn = document.getElementById('clear-history-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearRecentHistory);
  }
}

function getRecentChecks() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRecentChecks(list) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(list.slice(0, MAX_HISTORY_ITEMS)));
  } catch (e) {
    console.error('Failed to save recent history', e);
  }
}

function addRecentCheck(entry) {
  let list = getRecentChecks();
  list = list.filter(item => item.key !== entry.key);
  list.unshift({
    ...entry,
    id: 'chk_' + Date.now(),
    timestamp: Date.now(),
    timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  saveRecentChecks(list);
  renderRecentChecks();
}

function clearRecentHistory() {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  renderRecentChecks();
}

function renderRecentChecks() {
  const container = document.getElementById('recent-checks-list');
  const countEl = document.getElementById('recent-count');
  if (!container) return;

  const history = getRecentChecks();
  if (countEl) {
    countEl.textContent = t('recent_checks.count_label', { count: history.length });
  }

  if (history.length === 0) {
    container.innerHTML = `<p class="cert-decoder__recent-empty">${t('recent_checks.empty')}</p>`;
    return;
  }

  container.innerHTML = history.map(item => {
    let badgeClass = 'cert-decoder__recent-badge--conditional';
    let badgeText = t('recent_checks.badge_conditional');
    if (item.safetyRating === 'safe' || item.initialPass) {
      badgeClass = 'cert-decoder__recent-badge--pass';
      badgeText = item.initialPass ? t('recent_checks.badge_initial_pass') : t('recent_checks.badge_safe');
    } else if (item.safetyRating === 'unsafe' || item.initialPass === false) {
      badgeClass = 'cert-decoder__recent-badge--fail';
      badgeText = item.initialPass === false ? t('recent_checks.badge_healed_only') : t('recent_checks.badge_unsafe');
    }

    return `
      <div class="cert-decoder__recent-card" data-type="${item.type}" data-key="${item.key}" onclick="reRunRecentCheck('${item.type}', '${item.key}')" role="button" tabindex="0">
        <div class="cert-decoder__recent-card-top">
          <span class="cert-decoder__recent-card-title">${item.title}</span>
          <span class="cert-decoder__recent-card-time">${item.timeFormatted || t('recent_checks.recent_time')}</span>
        </div>
        <div class="cert-decoder__recent-card-bottom">
          <span class="cert-decoder__recent-badge ${badgeClass}">${badgeText}</span>
          <span class="cert-decoder__recent-rerun">${t('recent_checks.rerun')}</span>
        </div>
      </div>
    `;
  }).join('');
}

function reRunRecentCheck(type, key) {
  if (type === 'search') {
    const searchInput = document.getElementById('cert-search');
    if (searchInput) {
      searchInput.value = key;
      handleSearch(false);
    }
  } else if (type === 'material') {
    const matSelect = document.getElementById('material-type');
    if (matSelect) {
      matSelect.value = key;
      const material = materialDatabase[key];
      const healing = document.querySelector('input[name="healing"]:checked')?.value || 'initial';
      const sensitivity = document.querySelector('input[name="sensitivity"]:checked')?.value || 'normal';
      const location = document.getElementById('piercing-location')?.value || 'all';
      if (material) {
        displayMaterialResult(material, healing, sensitivity, location, false);
      }
    }
  }
}
window.reRunRecentCheck = reRunRecentCheck;

// ═══════════════════════════════════════════════════════════
// 2. DARK MODE TOGGLE
// ═══════════════════════════════════════════════════════════

function initDarkMode() {
  const savedMode = localStorage.getItem('cert-decoder-theme');
  if (savedMode === 'light') {
    document.body.classList.add('light-mode');
  }

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    localStorage.setItem('cert-decoder-theme', 'light');
  } else {
    localStorage.setItem('cert-decoder-theme', 'dark');
  }
}

// ═══════════════════════════════════════════════════════════
// 3. CERTIFICATION SEARCH
// ═══════════════════════════════════════════════════════════

function initSearch() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('cert-search');

  if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
}

function handleSearch(trackHistory = true) {
  const searchInput = document.getElementById('cert-search');
  const resultsDiv = document.getElementById('search-results');

  if (!searchInput || !resultsDiv) return;

  const query = searchInput.value.trim().toUpperCase();

  if (!query) {
    alert(t('quick_lookup.alert_empty'));
    return;
  }

  // Search for certification
  const cert = findCertification(query);

  if (cert) {
    displayCertificationResult(cert, resultsDiv);
    if (trackHistory) {
      addRecentCheck({
        type: 'search',
        key: cert.code,
        title: `${cert.code} (${cert.material_type || cert.organization})`,
        safetyRating: cert.safety_rating || 'safe',
        initialPass: cert.safety_rating === 'safe'
      });
    }
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    displaySearchError(query, resultsDiv);
  }
}

function findCertification(query) {
  // Direct match
  for (const [key, cert] of Object.entries(certificationDatabase)) {
    if (cert.code.toUpperCase() === query) {
      return cert;
    }
  }

  // Fuzzy match using keywords
  for (const [key, keywords] of Object.entries(searchKeywords)) {
    for (const keyword of keywords) {
      if (keyword.toUpperCase().includes(query) || query.includes(keyword.toUpperCase())) {
        return certificationDatabase[key];
      }
    }
  }

  return null;
}

function displayCertificationResult(cert, container) {
  container.style.display = 'block';
  // Trigger subtle CSS fade-in animation
  container.classList.remove('fade-in-result');
  void container.offsetWidth; // Trigger reflow
  container.classList.add('fade-in-result');

  const safetyBadge = getSafetyBadgeHTML(cert.safety_rating);

  container.innerHTML = `
    <div class="cert-decoder__action-bar">
      <button type="button" class="cert-decoder__action-btn cert-decoder__action-btn--print" onclick="window.print()" title="${t('safety_checker.print_result_title_search')}">
        <span aria-hidden="true">🖨️</span> ${t('safety_checker.print_result')}
      </button>
    </div>

    <div class="cert-decoder__result-card">
      <div class="cert-decoder__cert-badge">
        <div class="cert-decoder__cert-code">${cert.code}</div>
        <div class="cert-decoder__cert-org">${cert.organization}</div>
        ${safetyBadge}
      </div>

      <div class="cert-decoder__details-grid">
        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.full_name_title')}</h3>
          <p class="cert-decoder__detail-text">${cert.full_name}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.material_type_title')}</h3>
          <p class="cert-decoder__detail-text">${cert.material_type}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.body_piercing_use_title')}</h3>
          <p class="cert-decoder__detail-text">${cert.body_piercing_use}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${renderTermWithTooltip('Biocompatibility')}</h3>
          <p class="cert-decoder__detail-text">${cert.biocompatibility}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${renderTermWithTooltip('Autoclave Safe', 'Sterilization')}</h3>
          <p class="cert-decoder__detail-text">${cert.sterilization}</p>
        </div>

        ${cert.common_uses ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.common_uses_title')}</h3>
          <ul class="cert-decoder__detail-list">
            ${cert.common_uses.map(use => `<li>${use}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${cert.important_notes ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.important_notes_title')}</h3>
          <p class="cert-decoder__detail-text">${cert.important_notes}</p>
        </div>
        ` : ''}

        ${cert.verification_method ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${renderTermWithTooltip('Mill Certification', 'How to Verify')}</h3>
          <p class="cert-decoder__detail-text">${cert.verification_method}</p>
        </div>
        ` : ''}

        ${cert.related_standards && cert.related_standards.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.related_standards_title')}</h3>
          <p class="cert-decoder__detail-text">${cert.related_standards.join(', ')}</p>
        </div>
        ` : ''}
      </div>
    </div>
  `;
}

function displaySearchError(query, container) {
  container.style.display = 'block';
  container.classList.remove('fade-in-result');
  void container.offsetWidth;
  container.classList.add('fade-in-result');

  container.innerHTML = `
    <div class="cert-decoder__error-box">
      <p style="color: var(--color-danger-red); font-weight: bold; margin-bottom: 0.5rem;">${t('quick_lookup.error_title')}</p>
      <p style="color: var(--color-text-secondary); font-size: 0.875rem;">
        ${t('quick_lookup.error_desc', { query })}<br>
        <strong>${t('quick_lookup.error_examples')}</strong>
      </p>
    </div>
  `;
}

function getSafetyBadgeHTML(rating) {
  const badges = {
    safe: `<div class="cert-decoder__safety-badge cert-decoder__safety-badge--safe">${t('safety_checker.badge_safe')}</div>`,
    conditional: `<div class="cert-decoder__safety-badge cert-decoder__safety-badge--conditional">${t('safety_checker.badge_conditional')}</div>`,
    unsafe: `<div class="cert-decoder__safety-badge cert-decoder__safety-badge--unsafe">${t('safety_checker.badge_unsafe')}</div>`
  };
  return badges[rating] || '';
}

// ═══════════════════════════════════════════════════════════
// 4. MATERIAL SAFETY CHECKER
// ═══════════════════════════════════════════════════════════

function initMaterialChecker() {
  const form = document.getElementById('material-form');
  if (form) {
    form.addEventListener('submit', handleMaterialCheck);
  }
}

function handleMaterialCheck(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  const materialType = document.getElementById('material-type').value;
  const location = document.getElementById('piercing-location').value;
  const healing = document.querySelector('input[name="healing"]:checked').value;
  const sensitivity = document.querySelector('input[name="sensitivity"]:checked').value;

  if (!materialType) {
    alert(t('safety_checker.alert_select_material'));
    return;
  }

  const material = materialDatabase[materialType];

  if (material) {
    displayMaterialResult(material, healing, sensitivity, location, true, materialType);
  }
}

function getInitialPiercingStatusHTML(material) {
  const isPass = Boolean(material.healing_stage && material.healing_stage.includes('initial') && material.safety_rating === 'safe');

  if (isPass) {
    return `
      <div class="cert-decoder__piercing-status cert-decoder__piercing-status--pass" role="status">
        <div class="cert-decoder__piercing-status-icon" aria-hidden="true">✅</div>
        <div class="cert-decoder__piercing-status-content">
          <div class="cert-decoder__piercing-status-title">${t('safety_checker.initial_pass_title')}</div>
          <div class="cert-decoder__piercing-status-desc">${t('safety_checker.initial_pass_desc')}</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="cert-decoder__piercing-status cert-decoder__piercing-status--fail" role="status">
      <div class="cert-decoder__piercing-status-icon" aria-hidden="true">⚠️</div>
      <div class="cert-decoder__piercing-status-content">
        <div class="cert-decoder__piercing-status-title">${t('safety_checker.initial_fail_title')}</div>
        <div class="cert-decoder__piercing-status-desc">${t('safety_checker.initial_fail_desc')}</div>
      </div>
    </div>
  `;
}

function displayMaterialResult(material, healing, sensitivity, location, trackHistory = true, materialKey = '') {
  const resultsDiv = document.getElementById('material-results');
  if (!resultsDiv) return;

  resultsDiv.style.display = 'block';
  // Trigger subtle CSS fade-in animation
  resultsDiv.classList.remove('fade-in-result');
  void resultsDiv.offsetWidth; // Reflow
  resultsDiv.classList.add('fade-in-result');

  // Check compatibility
  const compatible = checkCompatibility(material, healing, sensitivity);
  const safetyBadge = getSafetyBadgeHTML(material.safety_rating);
  const piercingStatus = getInitialPiercingStatusHTML(material);
  const isInitialPass = Boolean(material.healing_stage && material.healing_stage.includes('initial') && material.safety_rating === 'safe');

  // Find material key if not provided
  let foundKey = materialKey;
  if (!foundKey) {
    for (const [k, m] of Object.entries(materialDatabase)) {
      if (m.name === material.name) {
        foundKey = k;
        break;
      }
    }
  }

  if (trackHistory && foundKey) {
    addRecentCheck({
      type: 'material',
      key: foundKey,
      title: material.name,
      safetyRating: material.safety_rating,
      initialPass: isInitialPass
    });
  }

  resultsDiv.innerHTML = `
    <div class="cert-decoder__action-bar">
      <button type="button" class="cert-decoder__action-btn cert-decoder__action-btn--print" onclick="window.print()" title="${t('safety_checker.print_result_title_material')}">
        <span aria-hidden="true">🖨️</span> ${t('safety_checker.print_result')}
      </button>
      <button type="button" class="cert-decoder__action-btn cert-decoder__action-btn--pdf" id="export-material-pdf-btn" title="${t('safety_checker.export_pdf_title')}">
        <span aria-hidden="true">📄</span> ${t('safety_checker.export_pdf')}
      </button>
      <button type="button" class="cert-decoder__action-btn" id="copy-material-report-btn" title="${t('safety_checker.copy_report_title')}">
        <span aria-hidden="true">📋</span> <span id="copy-report-text">${t('safety_checker.copy_report')}</span>
      </button>
      <button type="button" class="cert-decoder__action-btn cert-decoder__action-btn--primary" id="export-material-report-btn" title="${t('safety_checker.export_report_title')}">
        <span aria-hidden="true">📥</span> ${t('safety_checker.export_report')}
      </button>
    </div>

    ${piercingStatus}

    <div class="cert-decoder__result-card">
      <div class="cert-decoder__cert-badge">
        <h3 style="font-size: 1.35rem; font-weight: 900; color: var(--color-accent-yellow); margin-bottom: 0.5rem; text-align: center;">${material.name}</h3>
        ${safetyBadge}
        <div style="margin-top: 1rem; width: 100%;">
          ${getSafetyMeterHTML(material.safety_rating)}
        </div>
      </div>

      <div class="cert-decoder__details-grid">
        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${renderTermWithTooltip('Biocompatibility')}</h3>
          <p class="cert-decoder__detail-text">${material.biocompatibility}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${renderTermWithTooltip('Nickel-Free')}</h3>
          <p class="cert-decoder__detail-text">${typeof material.nickel_free === 'string' ? escapeHTML(material.nickel_free) : (material.nickel_free ? t('safety_checker.yes') : t('safety_checker.contains_nickel'))}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${renderTermWithTooltip('Autoclave Safe')}</h3>
          <p class="cert-decoder__detail-text">${material.autoclave_safe ? t('safety_checker.yes') : t('safety_checker.no')}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.allergy_risk_title')}</h3>
          <p class="cert-decoder__detail-text">${formatAllergyRisk(material.allergy_risk)}</p>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.required_certs_title')}</h3>
          <p class="cert-decoder__detail-text">${material.required_certs.join(', ')}</p>
        </div>

        ${compatible.warnings.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <div class="cert-decoder__red-flags">
            <h3 class="cert-decoder__red-flag-title">${t('safety_checker.warnings_title')}</h3>
            <ul class="cert-decoder__red-flag-list">
              ${compatible.warnings.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
        </div>
        ` : ''}

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.suitable_for_title')}</h3>
          <ul class="cert-decoder__detail-list">
            ${material.suitable_for.map(use => `<li>${use}</li>`).join('')}
          </ul>
        </div>

        ${material.not_suitable_for.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.not_suitable_for_title')}</h3>
          <ul class="cert-decoder__detail-list">
            ${material.not_suitable_for.map(use => `<li style="color: var(--color-danger-red);">${use}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.pros_title')}</h3>
          <ul class="cert-decoder__detail-list">
            ${material.pros.slice(0, 3).map(pro => `<li>${pro}</li>`).join('')}
          </ul>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">${t('safety_checker.cons_title')}</h3>
          <ul class="cert-decoder__detail-list">
            ${material.cons.slice(0, 3).map(con => `<li>${con}</li>`).join('')}
          </ul>
        </div>

        ${material.red_flags && material.red_flags.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <div class="cert-decoder__red-flags">
            <h3 class="cert-decoder__red-flag-title">${t('safety_checker.red_flags_title')}</h3>
            <ul class="cert-decoder__red-flag-list">
              ${material.red_flags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach Export / Copy Listeners
  const copyBtn = document.getElementById('copy-material-report-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      copyMaterialReport(material, healing, sensitivity, location, compatible);
    });
  }

  const exportBtn = document.getElementById('export-material-report-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      exportMaterialReport(material, healing, sensitivity, location, compatible);
    });
  }

  const exportPdfBtn = document.getElementById('export-material-pdf-btn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      exportMaterialPDF(material, healing, sensitivity, location, compatible);
    });
  }

  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateMaterialReportText(material, healing, sensitivity, location, compatible) {
  const isInitialPass = Boolean(material.healing_stage && material.healing_stage.includes('initial') && material.safety_rating === 'safe');
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return `================================================================================
${t('report.header_title')}
Generated: ${timestamp}
${t('report.standard_ref')}
================================================================================

${t('report.material')} ${material.name}
${t('report.safety_rating')} ${material.safety_rating.toUpperCase()}
${t('report.initial_status')} ${isInitialPass ? t('report.initial_pass') : t('report.initial_fail')}

--------------------------------------------------------------------------------
${t('report.section_tech')}
${t('report.biocompatibility')} ${material.biocompatibility}
${typeof material.nickel_free === 'string' ? material.nickel_free : (material.nickel_free ? t('report.nickel_free_yes') : t('report.nickel_free_no'))}
${material.autoclave_safe ? t('report.autoclave_yes') : t('report.autoclave_no')}
${t('report.allergy_risk')} ${material.allergy_risk.toUpperCase()}
${t('report.required_standards')} ${material.required_certs.join(', ')}

--------------------------------------------------------------------------------
${t('report.section_selection')}
${t('report.piercing_stage')} ${healing ? healing.toUpperCase() : 'N/A'}
${t('report.skin_sensitivity')} ${sensitivity ? sensitivity.toUpperCase() : 'N/A'}
${t('report.anatomical_placement')} ${location ? location.toUpperCase() : 'ALL'}

--------------------------------------------------------------------------------
${t('report.section_suitability')}
${t('report.suitable_for')}
${material.suitable_for.map(s => '  [+] ' + s).join('\n')}

${material.not_suitable_for.length > 0 ? t('report.not_suitable_for') + '\n' + material.not_suitable_for.map(ns => '  [-] ' + ns).join('\n') : ''}

--------------------------------------------------------------------------------
${t('report.section_warnings')}
${compatible && compatible.warnings.length > 0 ? compatible.warnings.map(w => '  [!] ' + w).join('\n') : t('report.warnings_none')}

${material.red_flags && material.red_flags.length > 0 ? t('report.red_flags_header') + '\n' + material.red_flags.map(rf => '  [!] ' + rf).join('\n') : ''}

--------------------------------------------------------------------------------
${t('report.section_disclaimer')}
${t('report.disclaimer_1')}
${t('report.disclaimer_2')}
${t('report.disclaimer_3')}
================================================================================`;
}

function exportMaterialReport(material, healing, sensitivity, location, compatible) {
  const text = generateMaterialReportText(material, healing, sensitivity, location, compatible);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = material.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  a.href = url;
  a.download = `material_verification_${safeName}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportMaterialPDF(material, healing, sensitivity, location, compatible) {
  generateAndDownloadPDFBlob(material, healing, sensitivity, location, compatible);
  printMaterialPDFReport(material, healing, sensitivity, location, compatible);
}

function generateAndDownloadPDFBlob(material, healing, sensitivity, location, compatible) {
  const isInitialPass = Boolean(material.healing_stage && material.healing_stage.includes('initial') && material.safety_rating === 'safe');
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const escapePdfText = (str) => {
    return String(str || '')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  };

  const lines = [
    { text: 'POLI INTERNATIONAL - MATERIAL CERTIFICATION REPORT', font: 'F2', size: 14, x: 50, y: 780 },
    { text: 'Professional Body Piercing Metallurgy & Biocompatibility Audit', font: 'F1', size: 9, x: 50, y: 766 },
    { text: `Report Timestamp: ${timestamp}`, font: 'F1', size: 8, x: 50, y: 752 },
    { text: '------------------------------------------------------------------------------------------------------------------------', font: 'F1', size: 8, x: 50, y: 742 },
    { text: `VERIFIED MATERIAL: ${material.name}`, font: 'F2', size: 12, x: 50, y: 724 },
    { text: `Safety Classification: ${material.safety_rating.toUpperCase()} | Initial Piercing Suitable: ${isInitialPass ? 'VERIFIED (PASS)' : 'NON-COMPLIANT (FAIL)'}`, font: 'F2', size: 9, x: 50, y: 708 },
    { text: `Biocompatibility Index: ${material.biocompatibility}`, font: 'F1', size: 9, x: 50, y: 692 },
    { text: `Nickel Release Status: ${typeof material.nickel_free === 'string' ? material.nickel_free : (material.nickel_free ? 'Nickel-Free (Compliant with EU REACH Annex XVII / EN 1811)' : 'Contains Nickel (Sensitizing Risk)')}`, font: 'F1', size: 9, x: 50, y: 678 },
    { text: `Autoclave Sterilization: ${material.autoclave_safe ? 'Safe (121C - 134C Saturated Steam)' : 'NOT AUTOCLAVE SAFE'}`, font: 'F1', size: 9, x: 50, y: 664 },
    { text: `Allergy & Cytotoxic Risk: ${material.allergy_risk.toUpperCase()} | Placement: ${location ? location.toUpperCase() : 'ALL'}`, font: 'F1', size: 9, x: 50, y: 650 },
    { text: `Required Reference Standards: ${material.required_certs.join(', ')}`, font: 'F2', size: 9, x: 50, y: 634 },
    { text: '------------------------------------------------------------------------------------------------------------------------', font: 'F1', size: 8, x: 50, y: 620 },
    { text: 'ANATOMICAL SUITABILITY & PRACTICAL APPLICATION:', font: 'F2', size: 10, x: 50, y: 604 }
  ];

  let currentY = 588;
  material.suitable_for.slice(0, 4).forEach(s => {
    lines.push({ text: `  [+] Approved: ${s}`, font: 'F1', size: 8.5, x: 50, y: currentY });
    currentY -= 14;
  });

  if (material.not_suitable_for && material.not_suitable_for.length > 0) {
    currentY -= 4;
    lines.push({ text: 'RESTRICTED / CONTRAINDICATED APPLICATIONS:', font: 'F2', size: 9.5, x: 50, y: currentY });
    currentY -= 14;
    material.not_suitable_for.slice(0, 3).forEach(ns => {
      lines.push({ text: `  [-] Contraindication: ${ns}`, font: 'F1', size: 8.5, x: 50, y: currentY });
      currentY -= 14;
    });
  }

  if (compatible && compatible.warnings.length > 0) {
    currentY -= 4;
    lines.push({ text: 'CLINICAL SAFETY WARNINGS & ADVISORIES:', font: 'F2', size: 9.5, x: 50, y: currentY });
    currentY -= 14;
    compatible.warnings.forEach(w => {
      lines.push({ text: `  [!] Warning: ${w}`, font: 'F1', size: 8.5, x: 50, y: currentY });
      currentY -= 14;
    });
  }

  currentY -= 8;
  lines.push({ text: 'STANDARDS COMPLIANCE & LEGAL DISCLAIMER:', font: 'F2', size: 8.5, x: 50, y: currentY });
  currentY -= 13;
  lines.push({ text: 'All metallurgical analyses reference ASTM F136, ASTM F138, ASTM F67, ASTM B392, ISO 10993, and EN 1811.', font: 'F1', size: 7.5, x: 50, y: currentY });
  currentY -= 11;
  lines.push({ text: 'Verification reports are intended for professional piercers and studio quality control. Not a substitute for batch MTRs.', font: 'F1', size: 7.5, x: 50, y: currentY });
  currentY -= 11;
  lines.push({ text: 'Poli International - Global Body Jewelry Engineering & Standards Publisher', font: 'F2', size: 7.5, x: 50, y: currentY });

  let streamContent = 'q\n';
  lines.forEach(l => {
    streamContent += `BT /${l.font} ${l.size} Tf 1 0 0 1 ${l.x} ${l.y} Tm (${escapePdfText(l.text)}) Tj ET\n`;
  });
  streamContent += 'Q\n';

  const streamLength = streamContent.length;
  const objects = [];

  // 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  // 2: Pages
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  // 3: Page
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n');
  // 4: Font F1 (Helvetica)
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  // 5: Font F2 (Helvetica-Bold)
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');
  // 6: Contents
  objects.push(`6 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`);

  let pdfString = '%PDF-1.4\n';
  const offsets = [];

  objects.forEach((obj, idx) => {
    offsets.push(pdfString.length);
    pdfString += obj;
  });

  const xrefOffset = pdfString.length;
  pdfString += 'xref\n';
  pdfString += `0 ${objects.length + 1}\n`;
  pdfString += '0000000000 65535 f \n';

  offsets.forEach(off => {
    pdfString += String(off).padStart(10, '0') + ' 00000 n \n';
  });

  pdfString += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const blob = new Blob([pdfString], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = material.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  a.href = url;
  a.download = `material_verification_${safeName}_${Date.now()}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function printMaterialPDFReport(material, healing, sensitivity, location, compatible) {
  const isInitialPass = Boolean(material.healing_stage && material.healing_stage.includes('initial') && material.safety_rating === 'safe');
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  const printIframe = document.createElement('iframe');
  printIframe.style.position = 'fixed';
  printIframe.style.top = '-9999px';
  printIframe.style.left = '-9999px';
  printIframe.style.width = '1px';
  printIframe.style.height = '1px';
  printIframe.style.border = 'none';
  document.body.appendChild(printIframe);

  const doc = printIframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${t('report.header_title')} - ${material.name}</title>
      <style>
        @page { size: A4 portrait; margin: 12mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #111827;
          background: #ffffff;
          margin: 0;
          padding: 10px;
          line-height: 1.4;
          font-size: 12px;
        }
        .pdf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #047857;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .pdf-title {
          font-size: 18px;
          font-weight: 800;
          color: #065f46;
          margin: 0;
        }
        .pdf-subtitle {
          font-size: 11px;
          color: #4b5563;
          margin: 3px 0 0 0;
        }
        .pdf-meta {
          text-align: right;
          font-size: 10px;
          color: #6b7280;
        }
        .pdf-badge-hero {
          background: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: 6px;
          padding: 12px 16px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pdf-mat-name {
          font-size: 16px;
          font-weight: bold;
          color: #065f46;
          margin: 0;
        }
        .pdf-status-pill {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          background: ${isInitialPass ? '#059669' : '#dc2626'};
          color: #ffffff;
        }
        .pdf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pdf-box {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          padding: 10px;
          background: #f9fafb;
        }
        .pdf-box-title {
          font-size: 10px;
          font-weight: bold;
          color: #4b5563;
          text-transform: uppercase;
          margin: 0 0 4px 0;
        }
        .pdf-box-value {
          font-size: 12px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
        .pdf-section-heading {
          font-size: 12px;
          font-weight: bold;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 4px;
          margin: 14px 0 8px 0;
        }
        .pdf-section-heading--danger {
          color: #b91c1c;
        }
        .pdf-item--danger {
          color: #b91c1c;
        }
        .pdf-mat-sub {
          font-size: 11px;
          color: #374151;
          margin-top: 2px;
        }
        ul { margin: 4px 0 8px 16px; padding: 0; }
        li { font-size: 11px; margin-bottom: 2px; }
        .pdf-warning-box {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #991b1b;
          border-radius: 4px;
          padding: 8px 12px;
          margin-bottom: 12px;
        }
        .pdf-footer {
          margin-top: 20px;
          border-top: 1px solid #e5e7eb;
          padding-top: 8px;
          font-size: 9px;
          color: #6b7280;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="pdf-header">
        <div>
          <h1 class="pdf-title">POLI INTERNATIONAL</h1>
          <p class="pdf-subtitle">${t('report.header_title')}</p>
        </div>
        <div class="pdf-meta">
          <div><strong>${t('report.generated')}</strong> ${timestamp}</div>
          <div>${t('report.standard_ref')}</div>
        </div>
      </div>

      <div class="pdf-badge-hero">
        <div>
          <h2 class="pdf-mat-name">${material.name}</h2>
          <div class="pdf-mat-sub">
            ${t('report.safety_rating')} <strong>${material.safety_rating.toUpperCase()}</strong>
          </div>
        </div>
        <div class="pdf-status-pill">
          ${isInitialPass ? t('report.initial_pass') : t('report.initial_fail')}
        </div>
      </div>

      <div class="pdf-grid">
        <div class="pdf-box">
          <div class="pdf-box-title">${t('report.biocompatibility')}</div>
          <div class="pdf-box-value">${material.biocompatibility}</div>
        </div>
        <div class="pdf-box">
          <div class="pdf-box-title">${t('report.nickel_status')}</div>
          <div class="pdf-box-value">${typeof material.nickel_free === 'string' ? escapeHTML(material.nickel_free) : (material.nickel_free ? t('report.nickel_free_yes') : t('report.nickel_free_no'))}</div>
        </div>
        <div class="pdf-box">
          <div class="pdf-box-title">${t('report.autoclave_sterilization')}</div>
          <div class="pdf-box-value">${material.autoclave_safe ? t('report.autoclave_yes') : t('report.autoclave_no')}</div>
        </div>
        <div class="pdf-box">
          <div class="pdf-box-title">${t('report.allergy_risk')}</div>
          <div class="pdf-box-value">${material.allergy_risk.toUpperCase()}</div>
        </div>
      </div>

      <div class="pdf-box" style="margin-bottom: 14px;">
        <div class="pdf-box-title">${t('report.required_standards')}</div>
        <div class="pdf-box-value">${material.required_certs.join(', ')}</div>
      </div>

      <div class="pdf-section-heading">${t('report.section_suitability')}</div>
      <ul>
        ${material.suitable_for.map(s => `<li>${t('report.suitable_prefix')} ${s}</li>`).join('')}
      </ul>

      ${material.not_suitable_for && material.not_suitable_for.length > 0 ? `
      <div class="pdf-section-heading pdf-section-heading--danger">${t('report.not_suitable_for')}</div>
      <ul>
        ${material.not_suitable_for.map(ns => `<li class="pdf-item--danger">${t('report.contraindicated_prefix')} ${ns}</li>`).join('')}
      </ul>
      ` : ''}

      ${compatible && compatible.warnings.length > 0 ? `
      <div class="pdf-warning-box">
        <strong>${t('report.section_warnings')}:</strong>
        <ul>
          ${compatible.warnings.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <div class="pdf-footer">
        <div>${t('report.disclaimer_1')} | ${t('report.disclaimer_2')}</div>
        <div>${t('report.division_signature')}</div>
      </div>
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    try {
      printIframe.contentWindow.focus();
      printIframe.contentWindow.print();
    } catch (err) {
      console.warn('Print iframe error:', err);
    }
    setTimeout(() => {
      if (printIframe && printIframe.parentNode) {
        printIframe.parentNode.removeChild(printIframe);
      }
    }, 2000);
  }, 300);
}

function copyMaterialReport(material, healing, sensitivity, location, compatible) {
  const text = generateMaterialReportText(material, healing, sensitivity, location, compatible);
  const copyBtnText = document.getElementById('copy-report-text');

  const done = () => {
    if (copyBtnText) {
      const orig = copyBtnText.textContent;
      copyBtnText.textContent = t('safety_checker.copied');
      setTimeout(() => { copyBtnText.textContent = orig; }, 2500);
    }
  };
  const legacyCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    done();
  };

  // The Clipboard API is often refused inside an iframe; fall back rather than throw.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(legacyCopy);
  } else {
    legacyCopy();
  }
}

function checkCompatibility(material, healing, sensitivity) {
  const warnings = [];

  if (healing === 'initial' && !material.healing_stage.includes('initial')) {
    warnings.push(t('safety_checker.warning_not_initial'));
  }

  if (sensitivity === 'sensitive' && material.allergy_risk !== 'very_low' && material.allergy_risk !== 'low') {
    warnings.push(t('safety_checker.warning_sensitive'));
  }

  if (material.nickel_free !== true && sensitivity === 'sensitive') {
    warnings.push(t('safety_checker.warning_nickel'));
  }

  return { warnings };
}

function formatAllergyRisk(risk) {
  const map = {
    'very_low': t('allergy_levels.very_low'),
    'low': t('allergy_levels.low'),
    'low_to_moderate': t('allergy_levels.low_to_moderate'),
    'moderate': t('allergy_levels.moderate'),
    'moderate_to_high': t('allergy_levels.moderate_to_high'),
    'high': t('allergy_levels.high'),
    'low_if_nickel_free': t('allergy_levels.low_if_nickel_free')
  };
  return map[risk] || risk;
}

function getSafetyMeterHTML(rating) {
  const widths = {
    safe: '100%',
    conditional: '60%',
    unsafe: '30%'
  };
  const classes = {
    safe: 'cert-decoder__safety-meter-fill--safe',
    conditional: 'cert-decoder__safety-meter-fill--conditional',
    unsafe: 'cert-decoder__safety-meter-fill--unsafe'
  };

  return `
    <div class="cert-decoder__safety-meter">
      <div class="cert-decoder__safety-meter-fill ${classes[rating]}" style="width: ${widths[rating]};"></div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// 5. COMPLIANCE VERIFICATION
// ═══════════════════════════════════════════════════════════

function initComplianceVerification() {
  const verifyButton = document.getElementById('verify-button');
  if (verifyButton) {
    verifyButton.addEventListener('click', handleVerification);
  }

  const claimInput = document.getElementById('product-claim');
  if (claimInput) {
    claimInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleVerification();
      }
    });
  }
}

function handleVerification() {
  const claimInput = document.getElementById('product-claim');
  const resultsDiv = document.getElementById('verify-results');

  if (!claimInput || !resultsDiv) return;

  const claimRaw = claimInput.value.trim();

  if (!claimRaw) {
    alert(t('compliance.alert_empty') || 'Please enter phrasing or a claim to analyze');
    return;
  }

  // V2 Certificate Reader Delegation
  if (typeof window.analyzePhrasing === 'function' && typeof window.renderReaderResults === 'function') {
    const analysis = window.analyzePhrasing(claimRaw);
    window.renderReaderResults(analysis, resultsDiv);
    return;
  }

  const claim = claimRaw.toLowerCase();

  // Find matching verification data
  let verificationData = null;
  for (const [key, data] of Object.entries(productClaimVerification)) {
    if (claim.includes(key.replace(/_/g, ' ')) ||
        data.claim.toLowerCase().includes(claim) ||
        claim.includes(data.claim.toLowerCase())) {
      verificationData = data;
      break;
    }
  }

  if (verificationData) {
    displayVerificationResult(verificationData, resultsDiv);
  } else {
    displayGenericVerification(claim, resultsDiv);
  }

  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayVerificationResult(data, container) {
  container.style.display = 'block';
  container.classList.remove('fade-in-result');
  void container.offsetWidth;
  container.classList.add('fade-in-result');

  container.innerHTML = `
    <div style="padding: 1.5rem; background: var(--color-background-elevated); border: 2px solid var(--color-border); border-radius: 12px;">
      <h3 style="font-size: 1.5rem; color: var(--color-accent-yellow); margin-bottom: 1rem; font-weight: 900;">
        ${t('compliance.verifying_title', { claim: data.claim })}
      </h3>

      <div class="cert-decoder__details-grid">
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('compliance.required_certs')}</h3>
          <p class="cert-decoder__detail-text">${data.required_certs.join(', ')}</p>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('compliance.not_acceptable')}</h3>
          <ul class="cert-decoder__detail-list">
            ${data.not_acceptable.map(item => `<li style="color: var(--color-danger-red);">${item}</li>`).join('')}
          </ul>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <div class="cert-decoder__red-flags">
            <h3 class="cert-decoder__red-flag-title">${t('compliance.red_flags')}</h3>
            <ul class="cert-decoder__red-flag-list">
              ${data.red_flags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">${t('compliance.verification_steps')}</h3>
          <ol style="margin: 0; padding-left: 1.5rem; color: var(--color-text-primary); font-size: 0.875rem;">
            ${data.verification_steps.map(step => `<li style="padding: 0.25rem 0;">${step}</li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
  `;
}

function displayGenericVerification(claim, container) {
  container.style.display = 'block';
  container.classList.remove('fade-in-result');
  void container.offsetWidth;
  container.classList.add('fade-in-result');

  container.innerHTML = `
    <div class="cert-decoder__warning-box">
      <h3 style="color: var(--color-caution-yellow); margin-bottom: 1rem;">${t('compliance.generic_title')}</h3>
      <p style="color: var(--color-text-primary); font-size: 0.875rem; line-height: 1.7;">
        ${t('compliance.generic_intro', { claim })}<br><br>
        <strong>${t('compliance.generic_tip_1_title')}</strong> ${t('compliance.generic_tip_1_text')}<br>
        <strong>${t('compliance.generic_tip_2_title')}</strong> ${t('compliance.generic_tip_2_text')}<br>
        <strong>${t('compliance.generic_tip_3_title')}</strong> ${t('compliance.generic_tip_3_text')}<br>
        <strong>${t('compliance.generic_tip_4_title')}</strong> ${t('compliance.generic_tip_4_text')}<br>
        <strong>${t('compliance.generic_tip_5_title')}</strong> ${t('compliance.generic_tip_5_text')}
      </p>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// 6. MATERIAL COMPARISON
// ═══════════════════════════════════════════════════════════

function initComparison() {
  const compareButton = document.getElementById('compare-button');
  if (compareButton) {
    compareButton.addEventListener('click', handleComparison);
  }

  const compare1Select = document.getElementById('compare-1');
  if (compare1Select) {
    compare1Select.addEventListener('change', handleCompare1Change);
  }
}

function populateComparisonDropdowns() {
  const compare1 = document.getElementById('compare-1');
  const compare2 = document.getElementById('compare-2');
  const compare3 = document.getElementById('compare-3');

  if (compare1) {
    // Keep the first empty option
    const firstOpt1 = compare1.firstElementChild;
    compare1.innerHTML = '';
    if (firstOpt1) compare1.appendChild(firstOpt1);

    Object.entries(materialDatabase).forEach(([key, material]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = material.name;
      compare1.appendChild(option);
    });
  }

  // Populate compare-2 and compare-3 with all materials initially
  [compare2, compare3].forEach(select => {
    if (select) {
      const firstOpt = select.firstElementChild;
      select.innerHTML = '';
      if (firstOpt) select.appendChild(firstOpt);

      Object.entries(materialDatabase).forEach(([key, material]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = material.name;
        select.appendChild(option);
      });
    }
  });
}

function handleCompare1Change() {
  const compare1 = document.getElementById('compare-1');
  const compare2 = document.getElementById('compare-2');
  const compare3 = document.getElementById('compare-3');
  const noticeBox = document.getElementById('compare-category-notice');

  if (!compare1) return;
  const selectedKey = compare1.value;

  if (!selectedKey) {
    // Reset all options for compare-2 and compare-3
    [compare2, compare3].forEach(select => {
      if (select) {
        const curVal = select.value;
        const firstOpt = select.firstElementChild;
        select.innerHTML = '';
        if (firstOpt) select.appendChild(firstOpt);

        Object.entries(materialDatabase).forEach(([key, material]) => {
          const option = document.createElement('option');
          option.value = key;
          option.textContent = material.name;
          select.appendChild(option);
        });
        select.value = curVal;
      }
    });

    if (noticeBox) {
      noticeBox.style.display = 'none';
      noticeBox.innerHTML = '';
    }
    return;
  }

  // Determine category
  const categoryKey = typeof getMaterialCategoryKey === 'function' ? getMaterialCategoryKey(selectedKey) : 'metals';
  const group = (typeof materialClassificationGroups !== 'undefined' && materialClassificationGroups[categoryKey])
    ? materialClassificationGroups[categoryKey]
    : { title: 'Compatible Class', materials: Object.keys(materialDatabase) };

  // Filter compare-2 and compare-3
  [compare2, compare3].forEach(select => {
    if (select) {
      const curVal = select.value;
      const firstOpt = select.firstElementChild;
      select.innerHTML = '';
      if (firstOpt) select.appendChild(firstOpt);

      group.materials.forEach(matKey => {
        if (materialDatabase[matKey]) {
          const option = document.createElement('option');
          option.value = matKey;
          option.textContent = materialDatabase[matKey].name;
          select.appendChild(option);
        }
      });

      // Keep selection if it is in the group and not the same as compare-1
      if (group.materials.includes(curVal)) {
        select.value = curVal;
      } else {
        select.value = '';
      }
    }
  });

  // Display notice to inform user
  if (noticeBox) {
    noticeBox.style.display = 'block';
    noticeBox.innerHTML = `
      <div class="compare-notice-badge">
        <span class="compare-notice-icon">🔒</span>
        <span>
          <strong>${t('comparison.category_locked_title') || 'Category Locked:'}</strong>
          ${group.title} - ${t('comparison.category_locked_desc') || 'Selections 2 & 3 are filtered to matching classification materials to prevent invalid cross-category comparisons.'}
        </span>
      </div>
    `;
  }
}

function handleComparison() {
  const mat1 = document.getElementById('compare-1').value;
  const mat2 = document.getElementById('compare-2').value;
  const mat3 = document.getElementById('compare-3').value;

  if (!mat1 || !mat2) {
    alert(t('comparison.alert_select_two') || 'Please select at least two materials to compare.');
    return;
  }

  // V2 Side-by-Side Certified Material Comparison
  if (typeof window.renderCertifiedComparison === 'function') {
    const keys = [mat1, mat2, mat3].filter(Boolean);
    window.renderCertifiedComparison(keys);
    return;
  }

  const materials = [mat1, mat2, mat3].filter(m => m).map(key => ({ key, ...materialDatabase[key] }));

  displayComparison(materials);
}

function displayComparison(materials) {
  const resultsDiv = document.getElementById('compare-results');
  if (!resultsDiv) return;

  resultsDiv.style.display = 'grid';
  resultsDiv.classList.remove('fade-in-result');
  void resultsDiv.offsetWidth;
  resultsDiv.classList.add('fade-in-result');

  resultsDiv.innerHTML = materials.map(mat => `
    <div class="cert-decoder__compare-card">
      <h3 style="font-size: 1.125rem; font-weight: bold; color: var(--color-accent-yellow); margin-bottom: 1rem; text-align: center;">
        ${mat.name}
      </h3>

      ${getSafetyBadgeHTML(mat.safety_rating)}

      <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--color-text-secondary);">
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-accent-yellow);">${renderTermWithTooltip('Nickel-Free')}:</strong><br>
          ${typeof mat.nickel_free === 'string' ? escapeHTML(mat.nickel_free) : (mat.nickel_free ? t('safety_checker.yes') : t('safety_checker.contains_nickel'))}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-accent-yellow);">${renderTermWithTooltip('Autoclave Safe')}:</strong><br>
          ${mat.autoclave_safe ? t('safety_checker.safe_status') : t('safety_checker.not_safe_status')}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-accent-yellow);">${t('comparison.initial_piercing_label')}</strong><br>
          ${mat.healing_stage.includes('initial') ? t('safety_checker.yes') : t('safety_checker.no')}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-accent-yellow);">${t('comparison.cost_label')}</strong><br>
          ${formatCost(mat.cost_rating)}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-accent-yellow);">${t('comparison.required_certs_label')}</strong><br>
          ${mat.required_certs.slice(0, 2).join(', ')}
        </p>
      </div>
    </div>
  `).join('');

  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatCost(rating) {
  const map = {
    'very_low': '$',
    'low': '$$',
    'moderate': '$$$',
    'moderate_to_high': '$$$$',
    'high': '$$$$$',
    'very_high': '$$$$$$'
  };
  return map[rating] || rating;
}

// ═══════════════════════════════════════════════════════════
// 7. REFERENCE CHART
// ═══════════════════════════════════════════════════════════

function initReferenceChart() {
  const toggleButton = document.getElementById('toggle-reference');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleReferenceChart);
  }
}

function toggleReferenceChart() {
  const content = document.getElementById('reference-content');
  const icon = document.getElementById('toggle-icon');
  const text = document.getElementById('toggle-text');

  if (content.style.display === 'none' || content.style.display === '') {
    content.style.display = 'block';
    icon.textContent = '▲';
    text.textContent = t('reference.hide_guide');
  } else {
    content.style.display = 'none';
    icon.textContent = '▼';
    text.textContent = t('reference.show_guide');
  }
}

function populateReferenceLists() {
  const categories = {
    'astm-list': 'astm',
    'iso-list': 'iso',
    'eu-list': 'eu',
    'app-list': 'app'
  };

  Object.entries(categories).forEach(([listId, category]) => {
    const list = document.getElementById(listId);
    if (!list) return;

    const certs = Object.values(certificationDatabase).filter(cert => cert.category === category);

    list.innerHTML = certs.map(cert => `
      <div class="cert-decoder__ref-item" onclick="handleRefClick('${cert.code}')">
        <div style="font-family: var(--font-family-mono); font-weight: bold; color: var(--color-medical-blue); font-size: 0.875rem; margin-bottom: 0.25rem;">
          ${cert.code}
        </div>
        <div style="font-size: 0.75rem; color: var(--color-text-secondary);">
          ${cert.material_type}
        </div>
      </div>
    `).join('');
  });
}

function handleRefClick(code) {
  const searchInput = document.getElementById('cert-search');
  if (searchInput) {
    searchInput.value = code;
  }

  // Scroll to search
  const searchSection = document.querySelector('.cert-decoder__quick-lookup');
  if (searchSection) {
    searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Trigger search
  setTimeout(() => {
    handleSearch();
  }, 500);
}

// Make function globally available
window.handleRefClick = handleRefClick;

// ═══════════════════════════════════════════════════════════
// 8. EMBED MODAL
// ═══════════════════════════════════════════════════════════

function initEmbedModal() {
  const embedButton = document.getElementById('embed-button');
  const modal = document.getElementById('embed-modal');
  const closeButton = document.getElementById('modal-close');
  const overlay = document.getElementById('modal-overlay');
  const copyButton = document.getElementById('copy-embed-code');

  if (embedButton) {
    embedButton.addEventListener('click', () => {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  if (copyButton) {
    copyButton.addEventListener('click', copyEmbedCode);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('embed-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function copyEmbedCode() {
  const embedCode = document.getElementById('embed-code');
  const successMsg = document.getElementById('copy-success');

  if (!embedCode) return;

  const code = embedCode.textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showCopySuccess(successMsg);
    }).catch(() => {
      fallbackCopy(code, successMsg);
    });
  } else {
    fallbackCopy(code, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    showCopySuccess(successMsg);
  } catch (err) {
    alert(t('embed.copy_failed_alert'));
  }

  document.body.removeChild(textarea);
}

function showCopySuccess(successMsg) {
  if (successMsg) {
    successMsg.style.display = 'block';
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 3000);
  }
}

// ═══════════════════════════════════════════════════════════
// 9. EMAIL CAPTURE
// ═══════════════════════════════════════════════════════════

function initEmailCapture() {
  const footerForm = document.getElementById('footer-email-form');
  const modalForm = document.getElementById('modal-email-form');

  if (footerForm) {
    footerForm.addEventListener('submit', handleEmailSubmit);
  }

  if (modalForm) {
    modalForm.addEventListener('submit', handleEmailSubmit);
  }
}

function handleEmailSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const location = form.getAttribute('data-location');
  const emailInput = form.querySelector('.cert-decoder__email-input');
  const submitButton = form.querySelector('.cert-decoder__email-submit');
  const successMsg = form.querySelector('.cert-decoder__email-success');
  const errorMsg = form.querySelector('.cert-decoder__email-error');

  const email = emailInput.value.trim();

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showEmailMessage(errorMsg, successMsg);
    return;
  }

  // Disable button during submission
  submitButton.disabled = true;
  submitButton.textContent = t('email.subscribing');

  // Email capture simulation
  setTimeout(() => {
    showEmailMessage(successMsg, errorMsg);
    emailInput.value = '';
    submitButton.disabled = false;
    submitButton.textContent = location === 'footer' ? t('email.notify_me') : t('email.subscribe');
  }, 1000);
}

function showEmailMessage(showEl, hideEl) {
  if (hideEl) hideEl.style.display = 'none';
  if (showEl) {
    showEl.style.display = 'block';
    setTimeout(() => {
      showEl.style.display = 'none';
    }, 5000);
  }
}

// ═══════════════════════════════════════════════════════════
// 10. INTERACTIVE STANDARDS GLOSSARY OVERLAY (A–Z)
// ═══════════════════════════════════════════════════════════

let glossaryState = {
  searchQuery: '',
  selectedLetter: 'ALL',
  selectedCategory: 'all'
};

function initGlossaryOverlay() {
  // Ensure modal DOM structure exists in document
  createGlossaryModalDOM();

  // Attach triggers
  const triggerIds = ['open-glossary-modal-btn', 'open-glossary-trigger-main', 'doc-open-glossary-btn', 'reference-glossary-link'];
  triggerIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        openGlossaryModal();
      });
    }
  });

  // Global window functions
  window.openGlossaryModal = openGlossaryModal;
  window.closeGlossaryModal = closeGlossaryModal;
}

function createGlossaryModalDOM() {
  if (document.getElementById('standards-glossary-modal')) return;

  const modalEl = document.createElement('div');
  modalEl.id = 'standards-glossary-modal';
  modalEl.className = 'glossary-modal';
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.setAttribute('aria-label', t('glossary.modal_title') || 'Interactive Standards Glossary (A–Z)');
  modalEl.style.display = 'none';

  modalEl.innerHTML = `
    <div class="glossary-modal__backdrop" id="glossary-modal-backdrop"></div>
    <div class="glossary-modal__dialog">
      <div class="glossary-modal__header">
        <div class="glossary-modal__title-wrap">
          <span class="glossary-modal__icon">📖</span>
          <div>
            <h2 class="glossary-modal__title">${t('glossary.modal_title') || 'Interactive Standards Glossary (A–Z)'}</h2>
            <p class="glossary-modal__subtitle">${t('glossary.modal_subtitle') || 'Technical Metallurgy & Biocompatibility Reference (ASTM, ISO, REACH & EN 1811)'}</p>
          </div>
        </div>
        <button type="button" class="glossary-modal__close-btn" id="glossary-modal-close" aria-label="${t('common.close') || 'Close'}">✕</button>
      </div>

      <div class="glossary-modal__controls">
        <div class="glossary-modal__search-bar">
          <span class="glossary-modal__search-icon">🔍</span>
          <input type="search" id="glossary-search-input" class="glossary-modal__search-input" placeholder="${t('glossary.search_placeholder') || 'Search ASTM standards, ISO specs, metallurgy terms...'}" autocomplete="off" />
          <button type="button" id="glossary-search-clear" class="glossary-modal__search-clear" style="display: none;">✕</button>
        </div>

        <div class="glossary-modal__category-tabs" id="glossary-category-tabs">
          <button type="button" class="glossary-tab active" data-category="all">${t('glossary.category_all') || 'All Terms'}</button>
          <button type="button" class="glossary-tab" data-category="astm">${t('glossary.category_astm') || 'ASTM Standards'}</button>
          <button type="button" class="glossary-tab" data-category="iso">${t('glossary.category_iso') || 'ISO Standards'}</button>
          <button type="button" class="glossary-tab" data-category="eu">${t('glossary.category_eu') || 'EU & REACH'}</button>
          <button type="button" class="glossary-tab" data-category="metallurgy">${t('glossary.category_metallurgy') || 'Metallurgy'}</button>
          <button type="button" class="glossary-tab" data-category="polymer">${t('glossary.category_polymer') || 'Polymers & Glass'}</button>
          <button type="button" class="glossary-tab" data-category="science">${t('glossary.category_science') || 'Biocompatibility'}</button>
        </div>

        <div class="glossary-modal__az-bar" id="glossary-az-bar">
          <!-- A-Z letters populated dynamically -->
        </div>
      </div>

      <div class="glossary-modal__body">
        <div class="glossary-modal__count" id="glossary-count-bar"></div>
        <div class="glossary-modal__grid" id="glossary-cards-grid">
          <!-- Glossary Cards -->
        </div>
      </div>

      <div class="glossary-modal__footer">
        <span class="glossary-modal__footnote">${t('glossary.footnote')}</span>
        <button type="button" class="glossary-modal__done-btn" id="glossary-modal-done">${t('common.done') || 'Close'}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  // Bind modal event listeners
  const closeBtn = document.getElementById('glossary-modal-close');
  const doneBtn = document.getElementById('glossary-modal-done');
  const backdrop = document.getElementById('glossary-modal-backdrop');
  const searchInput = document.getElementById('glossary-search-input');
  const searchClear = document.getElementById('glossary-search-clear');
  const categoryTabs = document.getElementById('glossary-category-tabs');

  if (closeBtn) closeBtn.addEventListener('click', closeGlossaryModal);
  if (doneBtn) doneBtn.addEventListener('click', closeGlossaryModal);
  if (backdrop) backdrop.addEventListener('click', closeGlossaryModal);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('standards-glossary-modal');
      if (modal && modal.style.display !== 'none') {
        closeGlossaryModal();
      }
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      glossaryState.searchQuery = e.target.value.trim().toLowerCase();
      if (searchClear) {
        searchClear.style.display = glossaryState.searchQuery ? 'block' : 'none';
      }
      renderGlossaryCards();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', function() {
      if (searchInput) {
        searchInput.value = '';
        glossaryState.searchQuery = '';
        searchClear.style.display = 'none';
        searchInput.focus();
        renderGlossaryCards();
      }
    });
  }

  if (categoryTabs) {
    categoryTabs.addEventListener('click', function(e) {
      const tab = e.target.closest('.glossary-tab');
      if (!tab) return;
      categoryTabs.querySelectorAll('.glossary-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      glossaryState.selectedCategory = tab.getAttribute('data-category') || 'all';
      renderGlossaryCards();
    });
  }

  populateGlossaryAZBar();
}

function populateGlossaryAZBar() {
  const azBar = document.getElementById('glossary-az-bar');
  if (!azBar) return;

  const catalog = typeof TECHNICAL_TERMS_CATALOG !== 'undefined' ? TECHNICAL_TERMS_CATALOG : [];
  const activeLetters = new Set(catalog.map(item => (item.letter || item.term[0] || '').toUpperCase()));

  const alphabet = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  azBar.innerHTML = alphabet.map(letter => {
    const isAll = letter === 'ALL';
    const isAvailable = isAll || activeLetters.has(letter);
    const isSelected = glossaryState.selectedLetter === letter;
    const disabledAttr = !isAvailable ? 'disabled' : '';
    const activeClass = isSelected ? 'active' : '';
    const availableClass = isAvailable ? 'available' : 'unavailable';

    return `<button type="button" class="glossary-az-btn ${activeClass} ${availableClass}" data-letter="${letter}" ${disabledAttr}>${letter}</button>`;
  }).join('');

  azBar.addEventListener('click', function(e) {
    const btn = e.target.closest('.glossary-az-btn');
    if (!btn || btn.disabled) return;
    azBar.querySelectorAll('.glossary-az-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    glossaryState.selectedLetter = btn.getAttribute('data-letter') || 'ALL';
    renderGlossaryCards();
  });
}

function openGlossaryModal() {
  createGlossaryModalDOM();
  const modal = document.getElementById('standards-glossary-modal');
  if (!modal) return;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  renderGlossaryCards();

  const searchInput = document.getElementById('glossary-search-input');
  if (searchInput) {
    setTimeout(() => searchInput.focus(), 150);
  }
}

function closeGlossaryModal() {
  const modal = document.getElementById('standards-glossary-modal');
  if (!modal) return;

  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function renderGlossaryCards() {
  const grid = document.getElementById('glossary-cards-grid');
  const countBar = document.getElementById('glossary-count-bar');
  if (!grid) return;

  const catalog = typeof TECHNICAL_TERMS_CATALOG !== 'undefined' ? TECHNICAL_TERMS_CATALOG : [];
  const { searchQuery, selectedLetter, selectedCategory } = glossaryState;

  const filtered = catalog.filter(item => {
    // Search Query Filter
    if (searchQuery) {
      const matchTerm = item.term.toLowerCase().includes(searchQuery);
      const matchDef = (item.definition || '').toLowerCase().includes(searchQuery);
      const matchApp = (item.application || '').toLowerCase().includes(searchQuery);
      const matchStd = (item.standard || '').toLowerCase().includes(searchQuery);
      const matchCat = (item.categoryName || '').toLowerCase().includes(searchQuery);
      if (!matchTerm && !matchDef && !matchApp && !matchStd && !matchCat) {
        return false;
      }
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      if (item.category !== selectedCategory) return false;
    }

    // Letter Filter
    if (selectedLetter !== 'ALL') {
      const itemLetter = (item.letter || item.term[0] || '').toUpperCase();
      if (itemLetter !== selectedLetter) return false;
    }

    return true;
  });

  // Render count
  if (countBar) {
    countBar.textContent = t('glossary.count_showing', { count: filtered.length, total: catalog.length });
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glossary-empty-state">
        <span style="font-size: 2rem;">🔍</span>
        <h4 style="font-size: 1.1rem; font-weight: bold; margin: 0.5rem 0; color: var(--color-accent-yellow);">${t('glossary.empty_title')}</h4>
        <p style="color: var(--color-text-secondary); font-size: 0.85rem;">${t('glossary.empty_desc')}</p>
      </div>
    `;
    return;
  }

  const glossaryKeyMap = {
    'astm-f136': 'ASTM F136',
    'astm-f138': 'ASTM F138',
    'astm-f67': 'ASTM F67',
    'astm-b392': 'ASTM B392',
    'astm-f754': 'ASTM F754',
    'astm-f1295': 'ASTM F1295',
    'autoclave-sterilization': 'Autoclave Safe',
    'biocompatibility': 'Biocompatibility',
    'bioflex': 'BioFlex® body jewelry',
    'bioplast': 'Bioplast',
    'borosilicate-glass': 'Borosilicate Glass',
    'cytotoxicity': 'Cytotoxicity',
    'eli': 'ELI',
    'en-1811': 'EN 1811',
    'reach-annex-xvii': 'EU REACH Annex XVII',
    'iso-5832-1': 'ISO 5832-1',
    'iso-5832-3': 'ISO 5832-3',
    'iso-10993': 'ISO 10993',
    'mill-test-report': 'Mill Certification',
    'nickel-allergy': 'Nickel-Free',
    'niobium': 'Niobium',
    'passivation': 'Passivation',
    'pp-r-copolymer': 'PP-R Copolymer',
    'ptfe': 'PTFE',
    'tensile-strength': 'Tensile Strength',
    'usp-class-vi': 'USP Class VI',
    'vacuum-arc-remelting': 'Vacuum Arc Remelting (VAR)',
    'yield-strength': 'Yield Strength'
  };

  grid.innerHTML = filtered.map(item => {
    const badgeCategoryClass = `glossary-badge--${item.category}`;
    const gKey = glossaryKeyMap[item.id];
    const transDef = gKey && typeof t === 'function' ? t('glossary.' + gKey) : null;
    const defToRender = (transDef && transDef !== ('glossary.' + gKey)) ? transDef : item.definition;

    return `
      <div class="glossary-card" id="glossary-card-${item.id}">
        <div class="glossary-card__header">
          <h3 class="glossary-card__term">${item.term}</h3>
          <span class="glossary-card__category-badge ${badgeCategoryClass}">${item.categoryName}</span>
        </div>

        <div class="glossary-card__spec">
          <span class="glossary-card__spec-label">${t('glossary.spec_label')}</span>
          <span class="glossary-card__spec-val">${item.standard}</span>
        </div>

        <p class="glossary-card__def">${defToRender}</p>

        <div class="glossary-card__app">
          <strong>${t('glossary.app_label')}</strong> ${item.application}
        </div>

        ${item.citation ? `
        <div class="glossary-card__citation">
          <span class="glossary-card__citation-icon">📌</span> ${item.citation}
        </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// 12. DYNAMIC I18N RE-RENDER LISTENER
// ═══════════════════════════════════════════════════════════

window.addEventListener('languageChanged', function() {
  // Re-populate dynamic UI dropdowns and lists
  populateComparisonDropdowns();
  populateReferenceLists();
  renderRecentChecks();

  const glossaryModal = document.getElementById('glossary-modal');
  if (glossaryModal && glossaryModal.style.display === 'flex') {
    renderGlossaryCards();
  }

  // Re-render active search result if displayed
  const searchInput = document.getElementById('cert-search');
  const searchResultsDiv = document.getElementById('search-results');
  if (searchInput && searchResultsDiv && searchResultsDiv.innerHTML.trim() !== '' && searchInput.value.trim()) {
    handleSearch(false);
  }

  // Re-render active material check result if displayed
  const materialSelect = document.getElementById('material-type');
  const materialResultsDiv = document.getElementById('material-results');
  if (materialSelect && materialResultsDiv && materialResultsDiv.innerHTML.trim() !== '' && materialSelect.value) {
    handleMaterialCheck();
  }

  // Re-render active comparison result if displayed
  const compareResultsDiv = document.getElementById('compare-results');
  if (compareResultsDiv && compareResultsDiv.style.display === 'grid' && compareResultsDiv.innerHTML.trim() !== '') {
    handleComparison();
  }
});

