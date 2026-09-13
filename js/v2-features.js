/**
 * ═══════════════════════════════════════════════════════════════
 * MATERIAL CERTIFICATION CHECKER V2 - CORE FEATURES
 * Poli International - Studio Compliance Toolkit
 * ═══════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // UTILITY HELPERS
  // ═══════════════════════════════════════════════════════════

  function safeT(key, fallback) {
    if (typeof window.t === 'function') {
      const translated = window.t(key);
      if (translated && translated !== key) return translated;
    }
    return fallback || key;
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

  function copyToClipboard(text, buttonEl, successMsg) {
    const originalText = buttonEl ? buttonEl.innerHTML : '';
    const finalize = () => {
      if (buttonEl) {
        buttonEl.innerHTML = `✓ ${escapeHTML(successMsg || 'Copied!')}`;
        buttonEl.classList.add('btn--copied');
        setTimeout(() => {
          buttonEl.innerHTML = originalText;
          buttonEl.classList.remove('btn--copied');
        }, 2200);
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(finalize).catch(() => {
        fallbackCopy(text);
        finalize();
      });
    } else {
      fallbackCopy(text);
      finalize();
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      console.warn('Fallback copy failed', e);
    }
    document.body.removeChild(textArea);
  }

  function downloadTextFile(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ═══════════════════════════════════════════════════════════
  // 1. FEATURE ONE: THE CERTIFICATE READER ENGINE
  // ═══════════════════════════════════════════════════════════

  function analyzePhrasing(text) {
    const clean = (text || '').trim();
    const lower = clean.toLowerCase();

    // Detections
    const standardsFound = [];
    const alloysFound = [];
    const traceabilityFound = [];
    const marketingFound = [];

    // Standards
    if (/astm\s*f\s*136/i.test(lower)) standardsFound.push({ code: 'ASTM F136', name: 'Wrought Ti-6Al-4V ELI for Surgical Implants', surgical: true });
    if (/astm\s*f\s*138/i.test(lower)) standardsFound.push({ code: 'ASTM F138', name: 'Wrought 316LVM Stainless Steel for Surgical Implants', surgical: true });
    if (/astm\s*f\s*67/i.test(lower)) standardsFound.push({ code: 'ASTM F67', name: 'Unalloyed Titanium for Surgical Implants (Grades 1-4)', surgical: true });
    if (/astm\s*f\s*2229/i.test(lower)) standardsFound.push({ code: 'ASTM F2229', name: 'Wrought Unalloyed Niobium for Surgical Implants', surgical: true });
    if (/astm\s*f\s*1295/i.test(lower)) standardsFound.push({ code: 'ASTM F1295', name: 'Wrought Ti-6Al-7Nb for Surgical Implants', surgical: true });
    if (/iso\s*5832-1/i.test(lower)) standardsFound.push({ code: 'ISO 5832-1', name: 'Stainless Steel for Surgical Implants (316LVM equivalent)', surgical: true });
    if (/iso\s*5832-3/i.test(lower)) standardsFound.push({ code: 'ISO 5832-3', name: 'Wrought Ti-6Al-4V (surgical implant specification, not ELI - check the oxygen limit)', surgical: true });
    if (/iso\s*10993/i.test(lower)) standardsFound.push({ code: 'ISO 10993', name: 'Biological Evaluation of Medical Devices (Biocompatibility)', surgical: true });
    if (/usp\s*class\s*vi/i.test(lower)) standardsFound.push({ code: 'USP Class VI', name: 'United States Pharmacopeia Class VI Medical Polymer Test', surgical: true });
    if (/en\s*1811/i.test(lower)) standardsFound.push({ code: 'EN 1811', name: 'Reference Method for Nickel Release', surgical: true });

    // Alloys / Grades
    if (/ti-?6al-?4v\s*eli|grade\s*23\b/i.test(lower)) alloysFound.push('Ti-6Al-4V ELI (Titanium Grade 23 - Extra Low Interstitial)');
    else if (/grade\s*5\b|ti-?6al-?4v(?!.*eli)/i.test(lower)) alloysFound.push('Ti-6Al-4V (Grade 5 - standard oxygen limit, not ELI)');
    else if (/\bg23\b/i.test(lower)) alloysFound.push('G23 (Informal shorthand - verify whether true ELI or Grade 5)');

    if (/316lvm/i.test(lower)) alloysFound.push('316LVM (Low Vacuum Melted Surgical Stainless Steel)');
    else if (/316l\b/i.test(lower)) alloysFound.push('316L (Commercial Marine/Food Stainless Steel - Not Vacuum Remelted)');

    if (/bioflex/i.test(lower)) alloysFound.push('BioFlex® Medical Polymer (PP-R)');
    if (/bioplast/i.test(lower)) alloysFound.push('Bioplast (Medical Biopolymer)');
    if (/ptfe|teflon/i.test(lower)) alloysFound.push('PTFE (Polytetrafluoroethylene)');
    if (/niobium/i.test(lower)) alloysFound.push('Niobium (Pure Element 41)');
    if (/borosilicate|pyrex/i.test(lower)) alloysFound.push('Borosilicate Glass 3.3');
    if (/acrylic|pmma/i.test(lower)) alloysFound.push('Acrylic (Polymethyl Methacrylate - PMMA)');
    if (/14k\s*gold|18k\s*gold/i.test(lower)) alloysFound.push('Solid Gold (14K/18K)');

    // Traceability
    if (/heat\s*(?:no|number|#)|melt\s*(?:no|number|#)/i.test(lower)) traceabilityFound.push('Heat / Melt Lot Number cited');
    if (/mill\s*(?:cert|test|report)|mtr\b|en\s*10204\s*3\.1/i.test(lower)) traceabilityFound.push('Mill Test Report (MTR) referenced');
    if (/batch\s*(?:no|number|#)|lot\s*(?:no|number|#)/i.test(lower)) traceabilityFound.push('Production Batch / Lot Number cited');

    // Marketing claims
    if (/implant\s*grade/i.test(lower)) marketingFound.push('Implant Grade (Unregulated marketing phrase)');
    if (/surgical\s*(?:steel|grade)/i.test(lower)) marketingFound.push('Surgical Steel / Surgical Grade (Marketing phrase)');
    if (/hypoallergenic/i.test(lower)) marketingFound.push('Hypoallergenic (Unsubstantiated marketing claim)');
    if (/medical\s*grade/i.test(lower)) marketingFound.push('Medical Grade (Generic marketing claim)');
    if (/nickel[\s-]free/i.test(lower)) marketingFound.push('Nickel-Free (Composition claim)');
    if (/autoclave\s*safe|100%\s*sterilizable/i.test(lower)) marketingFound.push('Autoclave Safe (Thermal claim)');
    if (/pure\s*titanium|solid\s*titanium/i.test(lower)) marketingFound.push('Pure Titanium (Ambiguous grade claim)');

    // Compute Evidence Tier
    let tier = 0;
    let tierTitle = '';
    let tierBadgeClass = '';

    const hasSurgicalStandard = standardsFound.some(s => s.surgical);
    const hasHeatNumber = traceabilityFound.some(t => t.includes('Heat') || t.includes('Mill'));

    if (hasSurgicalStandard && hasHeatNumber) {
      tier = 3;
      tierTitle = 'LEVEL 3: FULLY DOCUMENTED & TRACEABLE STANDARD';
      tierBadgeClass = 'cert-reader__badge--level3';
    } else if (hasSurgicalStandard || standardsFound.length > 0) {
      tier = 2;
      tierTitle = 'LEVEL 2: STANDARD CITED WITHOUT MELT TRACEABILITY';
      tierBadgeClass = 'cert-reader__badge--level2';
    } else if (alloysFound.length > 0 && !alloysFound.some(a => a.includes('Acrylic'))) {
      tier = 1;
      tierTitle = 'LEVEL 1: AMBIGUOUS SPECIFICATION / CATALOG SHORTHAND';
      tierBadgeClass = 'cert-reader__badge--level1';
    } else {
      tier = 0;
      tierTitle = 'LEVEL 0: UNVERIFIED MARKETING CLAIM (ZERO TECHNICAL PROOF)';
      tierBadgeClass = 'cert-reader__badge--level0';
    }

    // Determine What This Phrasing ESTABLISHES
    const establishes = [];
    if (standardsFound.length > 0) {
      establishes.push(`Formally asserts compliance with published technical standards: ${standardsFound.map(s => s.code).join(', ')}.`);
    }
    if (alloysFound.length > 0) {
      establishes.push(`Specifies a target material alloy/formulation: ${alloysFound.join(', ')}.`);
    }
    if (traceabilityFound.length > 0) {
      establishes.push(`Provides traceability markers: ${traceabilityFound.join(', ')}.`);
    }
    if (establishes.length === 0) {
      establishes.push('NONE. The text consists entirely of promotional descriptors and establishes zero technical, chemical, or biological facts.');
    }

    // Determine What This Phrasing DOES NOT ESTABLISH (The Critical Gap)
    const criticalGaps = [];
    if (!hasHeatNumber) {
      criticalGaps.push('Melt Lot Traceability: No heat number linking this individual piece to a specific melting batch or mill chemical analysis.');
    }
    if (!hasSurgicalStandard) {
      criticalGaps.push('Implant Specification: Terms like "implant grade" or "surgical steel" have zero legal or metallurgical weight without ASTM/ISO standard citation.');
    }
    if (lower.includes('titanium') && !lower.includes('f136') && !lower.includes('eli')) {
      criticalGaps.push('ELI Oxygen Verification: Titanium Grade 5 (0.20% oxygen) is often sold as generic "titanium". Only ASTM F136 guarantees the Extra Low Interstitial (ELI) oxygen ceiling (≤ 0.13%).');
    }
    if (lower.includes('316l') && !lower.includes('316lvm') && !lower.includes('f138')) {
      criticalGaps.push('Vacuum Arc Remelting (VAR): Commercial 316L is melted in open air and has higher carbon/sulfur and non-metallic inclusions than vacuum-melted ASTM F138 316LVM.');
    }
    if (marketingFound.includes('Hypoallergenic') && !standardsFound.some(s => s.code === 'ASTM F136' || s.code === 'ASTM F2229')) {
      criticalGaps.push('Allergen Chemical Proof: "Hypoallergenic" does not disclose nickel content, plating thickness, or substrate base metals.');
    }
    if (!lower.includes('mtr') && !lower.includes('mill cert') && !lower.includes('test report')) {
      criticalGaps.push('Documentary Physical Proof: A distributor claim or invoice label is not a Mill Test Report (MTR). True verification requires the melt mill laboratory sheet.');
    }

    // Required Documentary Proof
    let requiredProof = '';
    if (lower.includes('titanium')) {
      requiredProof = 'Original Mill Test Report (MTR) per EN 10204 3.1 showing ASTM F136 (Ti-6Al-4V ELI), Oxygen ≤ 0.13%, Iron ≤ 0.25%, and matching Heat Number stamped on packet.';
    } else if (lower.includes('steel')) {
      requiredProof = 'Mill Test Report citing ASTM F138 (Grade 2 Bar/Wire), 316LVM vacuum remelted, Carbon ≤ 0.030%, Sulfur ≤ 0.010%, with lot heat number.';
    } else if (lower.includes('bioflex') || lower.includes('polymer') || lower.includes('plastic')) {
      requiredProof = 'USP Class VI biological reactivity testing certificate + ISO 10993-5 cytotoxicity report for medical-grade PP-R resin.';
    } else if (lower.includes('niobium')) {
      requiredProof = 'Mill Test Certificate showing ASTM F2229 unalloyed niobium (≥ 99.85% Nb) with low interstitials.';
    } else {
      requiredProof = 'Official raw material Mill Test Report (MTR) from melting mill with chemical analysis, mechanical testing, and heat lot identifier.';
    }

    return {
      rawText: clean,
      tier,
      tierTitle,
      tierBadgeClass,
      standardsFound,
      alloysFound,
      traceabilityFound,
      marketingFound,
      establishes,
      criticalGaps,
      requiredProof
    };
  }

  function renderTruthGapDiagramSVG(tier) {
    // Generate inline SVG showing the 4 evidence tiers and pointing to the current one
    const levels = [
      { num: '0', title: safeT('cert_reader.diagram_level_0_title', 'Marketing Claim'), sub: safeT('cert_reader.diagram_level_0_sub', 'No standards, no heat #'), x: 20 },
      { num: '1', title: safeT('cert_reader.diagram_level_1_title', 'Catalog Shorthand'), sub: safeT('cert_reader.diagram_level_1_sub', 'Generic grade name'), x: 210 },
      { num: '2', title: safeT('cert_reader.diagram_level_2_title', 'Standard Cited'), sub: safeT('cert_reader.diagram_level_2_sub', 'ASTM/ISO, missing heat #'), x: 400 },
      { num: '3', title: safeT('cert_reader.diagram_level_3_title', 'Certified MTR'), sub: safeT('cert_reader.diagram_level_3_sub', 'ASTM + Heat # + Chemistry'), x: 590 }
    ];

    const currentX = levels[tier].x + 75;
    const pointerText = safeT('cert_reader.tier_analyzed_pointer', 'ANALYZED PHRASING TIER');

    return `
      <svg class="cert-reader__gap-svg" viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Evidence Hierarchy Spectrum Diagram">
        <defs>
          <linearGradient id="gapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--color-unsafe)" />
            <stop offset="33%" stop-color="var(--color-conditional)" />
            <stop offset="66%" stop-color="var(--color-accent-yellow)" />
            <stop offset="100%" stop-color="var(--color-safe)" />
          </linearGradient>
        </defs>

        <!-- Base track -->
        <rect x="20" y="70" width="720" height="8" rx="4" fill="url(#gapGrad)" opacity="0.3" />

        ${levels.map((lvl, idx) => {
          const isActive = idx === tier;
          const fillCol = isActive ? 'var(--color-accent-bg)' : 'var(--color-background-card)';
          const textCol = isActive ? 'var(--color-text-on-accent)' : 'var(--color-text-primary)';
          const strokeCol = isActive ? 'var(--color-accent-bg)' : 'var(--color-border)';
          const strokeWidth = isActive ? '3' : '1.5';
          return `
            <g transform="translate(${lvl.x}, 20)">
              <rect x="0" y="0" width="150" height="75" rx="8" fill="${fillCol}" stroke="${strokeCol}" stroke-width="${strokeWidth}" />
              <text x="75" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${textCol}">[LEVEL ${lvl.num}]</text>
              <text x="75" y="44" text-anchor="middle" font-size="12" font-weight="600" fill="${textCol}">${escapeHTML(lvl.title)}</text>
              <text x="75" y="62" text-anchor="middle" font-size="10" fill="${textCol}" opacity="0.8">${escapeHTML(lvl.sub)}</text>
            </g>
          `;
        }).join('')}

        <!-- Active Pointer -->
        <g transform="translate(${currentX}, 115)">
          <polygon points="0,0 -8,12 8,12" fill="var(--color-accent-bg)" />
          <rect x="-85" y="12" width="170" height="26" rx="4" fill="var(--color-accent-bg)" />
          <text x="0" y="29" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--color-text-on-accent)">${escapeHTML(pointerText)}</text>
        </g>
      </svg>
    `;
  }

  function renderReaderResults(analysis, container) {
    if (!container) return;

    const tierClassMap = {
      0: 'cert-reader__result--tier0',
      1: 'cert-reader__result--tier1',
      2: 'cert-reader__result--tier2',
      3: 'cert-reader__result--tier3'
    };

    const copyBtnText = safeT('cert_reader.btn_copy_analysis', '📋 Copy Analysis');
    const saveRecText = safeT('cert_reader.btn_save_record', '📁 Save to Studio Record');
    const diagramTitle = safeT('cert_reader.evidence_hierarchy_title', 'The Evidence Hierarchy: Marketing Phrase vs. Mill Certificate');
    const parsedTermTitle = safeT('cert_reader.parsed_terminology_title', '🏷️ Parsed Terminology in Phrasing');
    const establishesTitle = safeT('cert_reader.what_establishes_title', 'What This Phrasing Actually Establishes');
    const gapsTitle = safeT('cert_reader.what_gaps_title', 'What This Phrasing Does NOT Establish (The Critical Gap)');
    const docTitle = safeT('cert_reader.substantiating_doc_title', 'What Document Substantiates This Claim:');
    const docNote = safeT('cert_reader.substantiating_doc_note', 'Remember: A real Mill Test Report (MTR) comes from the raw metal melt mill, lists exact chemical element percentages, mechanical tensile/yield figures, and specifies the exact Heat Lot Number corresponding to the jewelry packaging.');
    const needVerifyText = safeT('cert_reader.need_verify_cta', 'Need to verify this with your supplier?');
    const genQuestionsText = safeT('cert_reader.btn_generate_questions', '✉️ Generate Supplier Question Sheet for this Claim →');
    const toastCopied = safeT('cert_reader.toast_analysis_copied', 'Analysis Copied!');

    const tagStandard = safeT('cert_reader.tag_standard', '[STANDARD]');
    const tagAlloy = safeT('cert_reader.tag_alloy', '[ALLOY]');
    const tagTrace = safeT('cert_reader.tag_trace', '[TRACE]');
    const tagMarket = safeT('cert_reader.tag_market', '[MARKETING]');
    const tagEstablished = safeT('cert_reader.tag_established', '[ESTABLISHED]');
    const tagCriticalGap = safeT('cert_reader.tag_critical_gap', '[CRITICAL GAP]');

    container.style.display = 'block';
    container.innerHTML = `
      <div class="cert-reader__card ${tierClassMap[analysis.tier] || ''}">
        <div class="cert-reader__header">
          <div class="cert-reader__tier-badge ${analysis.tierBadgeClass}">
            <span class="cert-reader__tier-icon" aria-hidden="true">${analysis.tier === 3 ? '✓' : analysis.tier === 0 ? '⚠️' : 'ℹ️'}</span>
            <span class="cert-reader__tier-text">${escapeHTML(analysis.tierTitle)}</span>
          </div>
          <div class="cert-reader__actions-top no-print">
            <button type="button" class="btn btn--secondary btn--small" id="reader-copy-btn">
              ${escapeHTML(copyBtnText)}
            </button>
            <button type="button" class="btn btn--secondary btn--small" id="reader-to-record-btn">
              ${escapeHTML(saveRecText)}
            </button>
          </div>
        </div>

        <!-- Evidence Spectrum SVG -->
        <div class="cert-reader__diagram-wrap">
          <h4 class="cert-reader__diagram-title">${escapeHTML(diagramTitle)}</h4>
          ${renderTruthGapDiagramSVG(analysis.tier)}
        </div>

        <!-- Detected Phrasing Breakdown -->
        <div class="cert-reader__breakdown-grid">
          <div class="cert-reader__breakdown-box">
            <h5 class="cert-reader__box-title">${escapeHTML(parsedTermTitle)}</h5>
            <div class="cert-reader__tags">
              ${analysis.standardsFound.map(s => `<span class="cert-tag cert-tag--standard">${escapeHTML(tagStandard)} ${escapeHTML(s.code)}</span>`).join('')}
              ${analysis.alloysFound.map(a => `<span class="cert-tag cert-tag--alloy">${escapeHTML(tagAlloy)} ${escapeHTML(a)}</span>`).join('')}
              ${analysis.traceabilityFound.map(t => `<span class="cert-tag cert-tag--trace">${escapeHTML(tagTrace)} ${escapeHTML(t)}</span>`).join('')}
              ${analysis.marketingFound.map(m => `<span class="cert-tag cert-tag--market">${escapeHTML(tagMarket)} ${escapeHTML(m)}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- The Truth Gap Comparison -->
        <div class="cert-reader__gap-columns">
          <div class="cert-reader__col cert-reader__col--establishes">
            <h4 class="cert-reader__col-title">
              <span class="cert-reader__col-icon" aria-hidden="true">✓</span>
              ${escapeHTML(establishesTitle)}
            </h4>
            <ul class="cert-reader__list">
              ${analysis.establishes.map(item => `<li><strong>${escapeHTML(tagEstablished)}</strong> ${escapeHTML(item)}</li>`).join('')}
            </ul>
          </div>

          <div class="cert-reader__col cert-reader__col--gaps">
            <h4 class="cert-reader__col-title">
              <span class="cert-reader__col-icon" aria-hidden="true">⚠️</span>
              ${escapeHTML(gapsTitle)}
            </h4>
            <ul class="cert-reader__list">
              ${analysis.criticalGaps.map(gap => `<li><strong>${escapeHTML(tagCriticalGap)}</strong> ${escapeHTML(gap)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Required Document Proof -->
        <div class="cert-reader__proof-box">
          <div class="cert-reader__proof-header">
            <span class="cert-reader__proof-icon" aria-hidden="true">📜</span>
            <strong class="cert-reader__proof-title">${escapeHTML(docTitle)}</strong>
          </div>
          <p class="cert-reader__proof-text">${escapeHTML(analysis.requiredProof)}</p>
          <p class="cert-reader__proof-note">
            <em>${escapeHTML(docNote)}</em>
          </p>
        </div>

        <!-- Quick Jump to Supplier Questions -->
        <div class="cert-reader__footer-cta no-print">
          <span>${escapeHTML(needVerifyText)}</span>
          <button type="button" class="btn btn--primary btn--small" id="reader-generate-questions-btn">
            ${escapeHTML(genQuestionsText)}
          </button>
        </div>
      </div>
    `;

    // Wire action buttons
    const copyBtn = document.getElementById('reader-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textSummary = `
MATERIAL CERTIFICATION CHECKER - PHRASING ANALYSIS
Date: ${new Date().toISOString().split('T')[0]}
Analyzed Phrasing: "${analysis.rawText}"
Evidence Tier: ${analysis.tierTitle}

WHAT THIS PHRASING ESTABLISHES:
${analysis.establishes.map(e => '- ' + e).join('\n')}

WHAT THIS PHRASING DOES NOT ESTABLISH (THE GAP):
${analysis.criticalGaps.map(g => '- ' + g).join('\n')}

REQUIRED DOCUMENTARY PROOF:
${analysis.requiredProof}
        `.trim();
        copyToClipboard(textSummary, copyBtn, toastCopied);
      });
    }

    const toRecordBtn = document.getElementById('reader-to-record-btn');
    if (toRecordBtn) {
      toRecordBtn.addEventListener('click', () => {
        createStudioRecordFromAnalysis(analysis);
        const recordSec = document.getElementById('studio-record');
        if (recordSec) recordSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const genQuestionsBtn = document.getElementById('reader-generate-questions-btn');
    if (genQuestionsBtn) {
      genQuestionsBtn.addEventListener('click', () => {
        // Pre-select appropriate material
        const lower = analysis.rawText.toLowerCase();
        let matSelectVal = 'astm_f136';
        if (lower.includes('steel')) matSelectVal = 'astm_f138';
        else if (lower.includes('bioflex') || lower.includes('polymer')) matSelectVal = 'bioflex_polymer';
        else if (lower.includes('niobium')) matSelectVal = 'niobium';
        else if (lower.includes('glass')) matSelectVal = 'borosilicate_glass';
        else if (lower.includes('gold')) matSelectVal = 'gold_solid';

        const matDropdown = document.getElementById('supplier-mat-select');
        if (matDropdown) {
          matDropdown.value = matSelectVal;
          matDropdown.dispatchEvent(new Event('change'));
        }

        const questionsSec = document.getElementById('supplier-questions');
        if (questionsSec) questionsSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function initCertificateReader() {
    const inputArea = document.getElementById('product-claim');
    const verifyBtn = document.getElementById('verify-button');
    const resultsContainer = document.getElementById('verify-results');
    const presetsContainer = document.getElementById('cert-reader-presets');

    if (!inputArea || !verifyBtn || !resultsContainer) return;

    // Populate Presets if container exists
    if (presetsContainer && window.CERT_READER_PRESETS) {
      presetsContainer.innerHTML = window.CERT_READER_PRESETS.map(p => `
        <button type="button" class="cert-reader__preset-btn" data-preset-id="${escapeHTML(p.id)}">
          <span class="preset-tag">[${escapeHTML(p.tag)}]</span>
          <span class="preset-name">${escapeHTML(p.name)}</span>
        </button>
      `).join('');

      presetsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.cert-reader__preset-btn');
        if (!btn) return;
        const pId = btn.getAttribute('data-preset-id');
        const preset = window.CERT_READER_PRESETS.find(x => x.id === pId);
        if (preset) {
          inputArea.value = preset.text;
          const analysis = analyzePhrasing(preset.text);
          renderReaderResults(analysis, resultsContainer);
        }
      });
    }

    // Handle Verify Click
    const handleCheck = () => {
      const text = inputArea.value.trim();
      if (!text) {
        inputArea.focus();
        return;
      }
      const analysis = analyzePhrasing(text);
      renderReaderResults(analysis, resultsContainer);
    };

    verifyBtn.addEventListener('click', handleCheck);
    inputArea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleCheck();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 2. FEATURE TWO: SUPPLIER QUESTION SHEET
  // ═══════════════════════════════════════════════════════════

  function generateQuestionSheetText(matKey, useKey, studioName, supplierName, itemRef) {
    const config = window.SUPPLIER_QUESTIONS_CONFIG;
    if (!config) return '';

    const mat = config.materials[matKey] || config.materials.astm_f136;
    const use = config.uses[useKey] || config.uses.initial_piercing;
    const dateStr = new Date().toISOString().split('T')[0];

    const localizedMatName = safeT(`supplier_questions.mat_${matKey}_name`, mat.name);
    const localizedUseName = safeT(`supplier_questions.use_${useKey}_name`, use.name);
    const defaultSupplier = safeT('supplier_questions.default_supplier', 'Jewelry Supplier / Manufacturer');
    const defaultStudio = safeT('supplier_questions.default_studio', 'Professional Body Art Studio');
    const defaultItem = safeT('supplier_questions.default_item', 'Body Jewelry Inquiry');
    const tissueContext = safeT(`supplier_questions.use_${useKey}_context`, use.tissue_context);

    const lines = [];
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push(safeT('supplier_questions.txt_title', 'FORMAL SUPPLIER TECHNICAL SPECIFICATION INQUIRY'));
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push(`${safeT('supplier_questions.field_date', 'Date:')} ${dateStr}`);
    lines.push(`${safeT('supplier_questions.txt_to', 'To:')} ${supplierName || defaultSupplier}`);
    lines.push(`${safeT('supplier_questions.txt_from', 'From:')} ${studioName || defaultStudio}`);
    lines.push(`${safeT('supplier_questions.field_item', 'Reference / Item / PO:')} ${itemRef || defaultItem}`);
    lines.push(`${safeT('supplier_questions.field_material', 'Material Evaluated:')} ${localizedMatName} (${mat.standard_code})`);
    lines.push(`${safeT('supplier_questions.txt_app', 'Intended Application:')} ${localizedUseName}`);
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(safeT('supplier_questions.txt_rationale', 'TISSUE BOUNDARY & CLINICAL RATIONALE:'));
    lines.push(tissueContext);
    lines.push('');
    lines.push(safeT('supplier_questions.txt_mandatory', 'MANDATORY STUDIO PURCHASE CRITERIA:'));
    use.critical_requirements.forEach((cr, idx) => {
      const localizedCr = safeT(`supplier_questions.use_${useKey}_req_${idx}`, cr);
      lines.push(`  [✓] ${localizedCr}`);
    });
    lines.push('');
    lines.push(safeT('supplier_questions.txt_questions_heading', 'TECHNICAL QUESTIONS REQUIRED FOR PURCHASE APPROVAL:'));
    lines.push(safeT('supplier_questions.txt_questions_intro', 'Please provide written documentation confirming the following specifications:'));
    lines.push('');

    mat.questions.forEach((qObj, idx) => {
      const qNum = safeT('supplier_questions.question_num', `Question ${idx + 1}`).replace('{num}', idx + 1);
      const qText = safeT(`supplier_questions.q_${matKey}_${idx}_q`, qObj.q);
      const satText = safeT(`supplier_questions.q_${matKey}_${idx}_sat`, qObj.satisfactory);
      const unsatText = safeT(`supplier_questions.q_${matKey}_${idx}_unsat`, qObj.unsatisfactory);

      lines.push(`${idx + 1}. ${qNum}:`);
      lines.push(`   ${qText}`);
      lines.push(`   [${safeT('supplier_questions.label_satisfactory', 'SATISFACTORY ANSWER')}]:`);
      lines.push(`   ${satText}`);
      lines.push(`   [${safeT('supplier_questions.label_unsatisfactory', 'UNSATISFACTORY / RED FLAG')}]:`);
      lines.push(`   ${unsatText}`);
      lines.push('');
    });

    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(safeT('supplier_questions.txt_closing', 'Thank you for your assistance in maintaining client safety and material compliance.'));
    lines.push(`${safeT('supplier_questions.txt_auth_rep', 'Authorized Studio Representative')}: _______________________ ${safeT('supplier_questions.field_date', 'Date:')} ${dateStr}`);
    lines.push('═══════════════════════════════════════════════════════════════');

    return lines.join('\n');
  }

  function renderQuestionSheetDOM() {
    const container = document.getElementById('supplier-questions-output');
    const matSelect = document.getElementById('supplier-mat-select');
    const useSelect = document.getElementById('supplier-use-select');
    const studioInput = document.getElementById('supplier-studio-input');
    const supplierInput = document.getElementById('supplier-supplier-input');
    const itemInput = document.getElementById('supplier-item-input');

    if (!container || !matSelect || !useSelect) return;

    const matKey = matSelect.value || 'astm_f136';
    const useKey = useSelect.value || 'initial_piercing';
    const studioName = studioInput ? studioInput.value.trim() : '';
    const supplierName = supplierInput ? supplierInput.value.trim() : '';
    const itemRef = itemInput ? itemInput.value.trim() : '';

    const config = window.SUPPLIER_QUESTIONS_CONFIG;
    if (!config) return;

    const mat = config.materials[matKey] || config.materials.astm_f136;
    const use = config.uses[useKey] || config.uses.initial_piercing;
    const dateStr = new Date().toISOString().split('T')[0];

    const badgeText = safeT('supplier_questions.sheet_badge', '[STUDIO COMPLIANCE INQUIRY]');
    const sheetTitle = safeT('supplier_questions.sheet_title', 'Technical Material Verification Sheet');
    const sheetSubtitle = safeT('supplier_questions.sheet_subtitle', 'Ready to send directly to your supplier before ordering. Printable.');
    const btnCopy = safeT('supplier_questions.btn_copy', '📋 Copy for Email');
    const btnPrint = safeT('supplier_questions.btn_print', '🖨️ Print Sheet');
    const btnDownload = safeT('supplier_questions.btn_download', '💾 Download (.txt)');
    const fieldDate = safeT('supplier_questions.field_date', 'Date:');
    const fieldStudio = safeT('supplier_questions.field_studio', 'Studio:');
    const defaultStudio = safeT('supplier_questions.default_studio', 'Professional Body Studio');
    const fieldSupplier = safeT('supplier_questions.field_supplier', 'Supplier:');
    const defaultSupplier = safeT('supplier_questions.default_supplier', 'Jewelry Supplier / Manufacturer');
    const fieldItem = safeT('supplier_questions.field_item', 'Item / PO Ref:');
    const defaultItem = safeT('supplier_questions.default_item', 'Body Jewelry Inquiry');
    const fieldMaterial = safeT('supplier_questions.field_material', 'Evaluated Material:');
    const fieldUse = safeT('supplier_questions.field_use', 'Intended Use:');
    const secTissueTitle = safeT('supplier_questions.sec_tissue_title', '📍 Tissue Boundary & Clinical Application Context');
    const secCriteriaTitle = safeT('supplier_questions.sec_criteria_title', 'Mandatory Studio Receiving Criteria:');
    const secQuestionsTitle = safeT('supplier_questions.sec_questions_title', '❓ Exact Technical Questions to Send Supplier');
    const labelSatisfactory = safeT('supplier_questions.label_satisfactory', '[SATISFACTORY ANSWER]:');
    const labelUnsatisfactory = safeT('supplier_questions.label_unsatisfactory', '[UNSATISFACTORY / RED FLAG]:');
    const sigReviewer = safeT('supplier_questions.sig_reviewer', 'Authorized Studio Reviewer: ___________________________________');
    const sigStatus = safeT('supplier_questions.sig_status', 'Date & Status: ___________________________ [ ] Approved  [ ] Quarantine');
    const toastCopied = safeT('supplier_questions.toast_copied', 'Question Sheet Copied!');

    const localizedMatName = safeT(`supplier_questions.mat_${matKey}_name`, mat.name);
    const localizedUseName = safeT(`supplier_questions.use_${useKey}_name`, use.name);
    const tissueContext = safeT(`supplier_questions.use_${useKey}_context`, use.tissue_context);

    container.innerHTML = `
      <div class="question-sheet__card">
        <div class="question-sheet__header">
          <div class="question-sheet__brand">
            <span class="question-sheet__badge">${escapeHTML(badgeText)}</span>
            <h3 class="question-sheet__title">${escapeHTML(sheetTitle)}</h3>
            <p class="question-sheet__subtitle">${escapeHTML(sheetSubtitle)}</p>
          </div>
          <div class="question-sheet__controls no-print">
            <button type="button" class="btn btn--primary btn--small" id="qs-copy-btn">${escapeHTML(btnCopy)}</button>
            <button type="button" class="btn btn--secondary btn--small" id="qs-print-btn">${escapeHTML(btnPrint)}</button>
            <button type="button" class="btn btn--secondary btn--small" id="qs-download-btn">${escapeHTML(btnDownload)}</button>
          </div>
        </div>

        <!-- Meta table -->
        <div class="question-sheet__meta-grid">
          <div class="question-sheet__meta-item">
            <strong>${escapeHTML(fieldDate)}</strong> <span>${dateStr}</span>
          </div>
          <div class="question-sheet__meta-item">
            <strong>${escapeHTML(fieldStudio)}</strong> <span>${escapeHTML(studioName || defaultStudio)}</span>
          </div>
          <div class="question-sheet__meta-item">
            <strong>${escapeHTML(fieldSupplier)}</strong> <span>${escapeHTML(supplierName || defaultSupplier)}</span>
          </div>
          <div class="question-sheet__meta-item">
            <strong>${escapeHTML(fieldItem)}</strong> <span>${escapeHTML(itemRef || defaultItem)}</span>
          </div>
          <div class="question-sheet__meta-item">
            <strong>${escapeHTML(fieldMaterial)}</strong> <span class="highlight-yellow">${escapeHTML(localizedMatName)}</span>
          </div>
          <div class="question-sheet__meta-item">
            <strong>${escapeHTML(fieldUse)}</strong> <span class="highlight-yellow">${escapeHTML(localizedUseName)}</span>
          </div>
        </div>

        <!-- Clinical Context -->
        <div class="question-sheet__section">
          <h4 class="question-sheet__sec-title">${escapeHTML(secTissueTitle)}</h4>
          <p class="question-sheet__sec-text">${escapeHTML(tissueContext)}</p>
          <div class="question-sheet__req-box">
            <strong>${escapeHTML(secCriteriaTitle)}</strong>
            <ul>
              ${use.critical_requirements.map((cr, idx) => {
                const localizedCr = safeT(`supplier_questions.use_${useKey}_req_${idx}`, cr);
                return `<li><span class="check-icon">[✓]</span> ${escapeHTML(localizedCr)}</li>`;
              }).join('')}
            </ul>
          </div>
        </div>

        <!-- Numbered Questions -->
        <div class="question-sheet__section">
          <h4 class="question-sheet__sec-title">${escapeHTML(secQuestionsTitle)}</h4>
          <div class="question-sheet__q-list">
            ${mat.questions.map((qObj, idx) => {
              const qNum = safeT('supplier_questions.question_num', `Question ${idx + 1}`).replace('{num}', idx + 1);
              const qText = safeT(`supplier_questions.q_${matKey}_${idx}_q`, qObj.q);
              const satText = safeT(`supplier_questions.q_${matKey}_${idx}_sat`, qObj.satisfactory);
              const unsatText = safeT(`supplier_questions.q_${matKey}_${idx}_unsat`, qObj.unsatisfactory);
              return `
                <div class="question-sheet__q-item">
                  <div class="question-sheet__q-number">${escapeHTML(qNum)}</div>
                  <p class="question-sheet__q-text">"${escapeHTML(qText)}"</p>
                  <div class="question-sheet__answers-grid">
                    <div class="question-sheet__ans question-sheet__ans--sat">
                      <strong class="ans-label">${escapeHTML(labelSatisfactory)}</strong>
                      <p>${escapeHTML(satText)}</p>
                    </div>
                    <div class="question-sheet__ans question-sheet__ans--unsat">
                      <strong class="ans-label">${escapeHTML(labelUnsatisfactory)}</strong>
                      <p>${escapeHTML(unsatText)}</p>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Signature signoff block for printed document -->
        <div class="question-sheet__signature-block">
          <div class="sig-line">
            <span>${escapeHTML(sigReviewer)}</span>
          </div>
          <div class="sig-line">
            <span>${escapeHTML(sigStatus)}</span>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const rawText = generateQuestionSheetText(matKey, useKey, studioName, supplierName, itemRef);

    const copyBtn = document.getElementById('qs-copy-btn');
    if (copyBtn) copyBtn.addEventListener('click', () => copyToClipboard(rawText, copyBtn, toastCopied));

    const printBtn = document.getElementById('qs-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        document.body.classList.add('print-focus-question-sheet');
        window.print();
        setTimeout(() => document.body.classList.remove('print-focus-question-sheet'), 1000);
      });
    }

    const downloadBtn = document.getElementById('qs-download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', () => {
      downloadTextFile(`supplier-inquiry-${matKey}-${dateStr}.txt`, rawText);
    });
  }

  function initSupplierQuestions() {
    const matSelect = document.getElementById('supplier-mat-select');
    const useSelect = document.getElementById('supplier-use-select');
    const studioInput = document.getElementById('supplier-studio-input');
    const supplierInput = document.getElementById('supplier-supplier-input');
    const itemInput = document.getElementById('supplier-item-input');

    if (!matSelect || !useSelect) return;

    matSelect.addEventListener('change', renderQuestionSheetDOM);
    useSelect.addEventListener('change', renderQuestionSheetDOM);
    if (studioInput) studioInput.addEventListener('input', renderQuestionSheetDOM);
    if (supplierInput) supplierInput.addEventListener('input', renderQuestionSheetDOM);
    if (itemInput) itemInput.addEventListener('input', renderQuestionSheetDOM);

    // Initial render
    renderQuestionSheetDOM();
  }

  // ═══════════════════════════════════════════════════════════
  // 3. FEATURE THREE: CLAIM-TO-EVIDENCE MATRIX
  // ═══════════════════════════════════════════════════════════

  let currentClaimCat = 'All';
  let currentClaimSearch = '';

  function renderClaimMatrixDOM(activeCategory = 'All', filterText = '') {
    currentClaimCat = activeCategory;
    currentClaimSearch = filterText;
    const container = document.getElementById('claim-matrix-table-container');
    if (!container || !window.CLAIM_MATRIX_DATA) return;

    let items = window.CLAIM_MATRIX_DATA;

    if (activeCategory && activeCategory !== 'All') {
      items = items.filter(i => i.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (filterText) {
      const q = filterText.toLowerCase();
      items = items.filter(i => {
        const c = safeT(`claim_matrix.item_${i.id}_claim`, i.claim).toLowerCase();
        const d = safeT(`claim_matrix.item_${i.id}_doc`, i.required_document).toLowerCase();
        const p = safeT(`claim_matrix.item_${i.id}_proves`, i.what_it_proves).toLowerCase();
        const a = safeT(`claim_matrix.item_${i.id}_absence`, i.what_absence_means).toLowerCase();
        return c.includes(q) || d.includes(q) || p.includes(q) || a.includes(q) || i.claim.toLowerCase().includes(q);
      });
    }

    const emptyMsg = safeT('claim_matrix.empty_msg', 'No claims match your search filter. Try clearing your search keyword.');
    const thClaim = safeT('claim_matrix.th_claim', 'Common Product Claim');
    const thDoc = safeT('claim_matrix.th_doc', 'Required Substantiating Document');
    const thProves = safeT('claim_matrix.th_proves', 'What That Document Proves');
    const thAbsence = safeT('claim_matrix.th_absence', 'What Absence Means');
    const thAction = safeT('claim_matrix.th_action', 'Verification Action');
    const badgeDocMandatory = safeT('claim_matrix.badge_doc_mandatory', '[DOCUMENT MANDATORY]');
    const badgeEvidenceAbsent = safeT('claim_matrix.badge_evidence_absent', '[EVIDENCE ABSENT]');
    const btnTestPhrasing = safeT('claim_matrix.btn_test_phrasing', 'Test Phrasing');

    if (items.length === 0) {
      container.innerHTML = `
        <div class="claim-matrix__empty">
          <p>${escapeHTML(emptyMsg)}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="claim-matrix__table-wrap">
        <table class="claim-matrix__table">
          <thead>
            <tr>
              <th scope="col" style="width: 18%;">${escapeHTML(thClaim)}</th>
              <th scope="col" style="width: 22%;">${escapeHTML(thDoc)}</th>
              <th scope="col" style="width: 26%;">${escapeHTML(thProves)}</th>
              <th scope="col" style="width: 24%;">${escapeHTML(thAbsence)}</th>
              <th scope="col" style="width: 10%;">${escapeHTML(thAction)}</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => {
              const localizedClaim = safeT(`claim_matrix.item_${item.id}_claim`, item.claim);
              const localizedDoc = safeT(`claim_matrix.item_${item.id}_doc`, item.required_document);
              const localizedProves = safeT(`claim_matrix.item_${item.id}_proves`, item.what_it_proves);
              const localizedAbsence = safeT(`claim_matrix.item_${item.id}_absence`, item.what_absence_means);
              const localizedCat = safeT(`claim_matrix.cat_${item.category.toLowerCase()}`, item.category);

              return `
              <tr class="claim-matrix__row">
                <td class="claim-matrix__cell-claim" data-label="${escapeHTML(thClaim)}">
                  <span class="claim-matrix__cat-badge">[${escapeHTML(localizedCat)}]</span>
                  <strong>"${escapeHTML(localizedClaim)}"</strong>
                </td>
                <td class="claim-matrix__cell-doc" data-label="${escapeHTML(thDoc)}">
                  <div class="doc-badge">${escapeHTML(badgeDocMandatory)}</div>
                  <span>${escapeHTML(localizedDoc)}</span>
                </td>
                <td class="claim-matrix__cell-proves" data-label="${escapeHTML(thProves)}">
                  <p>${escapeHTML(localizedProves)}</p>
                </td>
                <td class="claim-matrix__cell-absence" data-label="${escapeHTML(thAbsence)}">
                  <div class="absence-warning">${escapeHTML(badgeEvidenceAbsent)}</div>
                  <p>${escapeHTML(localizedAbsence)}</p>
                </td>
                <td class="claim-matrix__cell-action" data-label="${escapeHTML(thAction)}">
                  <button type="button" class="btn btn--secondary btn--small claim-verify-jump-btn" data-claim="${escapeHTML(item.claim)}">
                    ${escapeHTML(btnTestPhrasing)}
                  </button>
                </td>
              </tr>
            `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Hook jump buttons to Certificate Reader
    container.querySelectorAll('.claim-verify-jump-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const claimTxt = btn.getAttribute('data-claim');
        const inputArea = document.getElementById('product-claim');
        if (inputArea) {
          inputArea.value = claimTxt;
          const verifyBtn = document.getElementById('verify-button');
          if (verifyBtn) verifyBtn.click();
          const readerSec = document.getElementById('compliance');
          if (readerSec) readerSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function initClaimMatrix() {
    const searchInput = document.getElementById('claim-matrix-search');
    const filterPills = document.querySelectorAll('.claim-matrix__filter-pill');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentClaimSearch = searchInput.value.trim();
        renderClaimMatrixDOM(currentClaimCat, currentClaimSearch);
      });
    }

    if (filterPills) {
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          currentClaimCat = pill.getAttribute('data-category') || 'All';
          renderClaimMatrixDOM(currentClaimCat, currentClaimSearch);
        });
      });
    }

    renderClaimMatrixDOM('All', '');
  }

  // ═══════════════════════════════════════════════════════════
  // 4. FEATURE FOUR: CERTIFIED SIDE-BY-SIDE COMPARISON
  // Compares what is CERTIFIED, not what is preferred.
  // Same standard, same test, different result. Zero rankings.
  // ═══════════════════════════════════════════════════════════

  function renderCertifiedComparison(matKeys) {
    const resultsDiv = document.getElementById('compare-results');
    if (!resultsDiv || !window.CERTIFIED_COMPARISON_DATA) return;

    const data = window.CERTIFIED_COMPARISON_DATA;
    const selected = matKeys.map(k => ({ key: k, d: data[k] })).filter(item => Boolean(item.d));

    const noticeMinTwo = safeT('cert_compare.notice_min_two', 'Please select at least 2 materials to compare their certified technical specifications.');

    if (selected.length < 2) {
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = `
        <div class="cert-decoder__compare-notice">
          <p>${escapeHTML(noticeMinTwo)}</p>
        </div>
      `;
      return;
    }

    const rows = [
      { label: safeT('cert_compare.row_governing_standard', 'Governing Implant Standard'), prop: 'governing_standard', icon: '📜' },
      { label: safeT('cert_compare.row_certified_composition', 'Certified Chemical Specification'), prop: 'certified_composition', icon: '🔬' },
      { label: safeT('cert_compare.row_melting_process', 'Melting & Processing Method'), prop: 'melting_process', icon: '⚙️' },
      { label: safeT('cert_compare.row_biocompatibility_standard', 'Biocompatibility Test Certified'), prop: 'biocompatibility_standard', icon: '🧪' },
      { label: safeT('cert_compare.row_autoclave_thermal_limit', 'Steam Autoclave Thermal Tolerance'), prop: 'autoclave_thermal_limit', icon: '⚡' },
      { label: safeT('cert_compare.row_traceability_unit', 'Required Traceability Unit'), prop: 'traceability_unit', icon: '🏷️' },
      { label: safeT('cert_compare.row_surface_finish_spec', 'Surface Finish Specification'), prop: 'surface_finish_spec', icon: '✨' },
      { label: safeT('cert_compare.row_tissue_boundary', 'Validated Tissue Boundary Contact'), prop: 'tissue_boundary', icon: '🩹' }
    ];

    const badgeText = safeT('cert_compare.badge', '[CERTIFIED STANDARDS COMPARISON]');
    const titleText = safeT('cert_compare.title', 'Side-by-Side Certified Specifications');
    const subtitleText = safeT('cert_compare.subtitle', 'Compares certified technical parameters under identical test standards. No subjective rankings or best/worst labels.');
    const btnPrint = safeT('cert_compare.btn_print', '🖨️ Print Comparison');
    const thParam = safeT('cert_compare.th_parameter', 'Technical Standard Parameter');
    const tagSpec = safeT('cert_compare.tag_specification', '[SPECIFICATION]');
    const footerNote = safeT('cert_compare.footer_note', 'Methodology Note: Specifications cited reflect current published revisions of ASTM F136, ASTM F138, ASTM F2229, ISO 10993, and USP Class VI. In body art studios, receiving protocols require independent verification of the manufacturer\'s Mill Test Report (MTR) matching the packaging heat number.');

    resultsDiv.style.display = 'block';
    resultsDiv.classList.remove('fade-in-result');
    void resultsDiv.offsetWidth;
    resultsDiv.classList.add('fade-in-result');

    resultsDiv.innerHTML = `
      <div class="cert-comparison__wrapper">
        <div class="cert-comparison__header-banner">
          <div>
            <span class="cert-tag cert-tag--standard">${escapeHTML(badgeText)}</span>
            <h3 class="cert-comparison__title">${escapeHTML(titleText)}</h3>
            <p class="cert-comparison__subtitle">${escapeHTML(subtitleText)}</p>
          </div>
          <div class="cert-comparison__banner-actions no-print">
            <button type="button" class="btn btn--secondary btn--small" id="comp-print-btn">${escapeHTML(btnPrint)}</button>
          </div>
        </div>

        <div class="cert-comparison__table-responsive">
          <table class="cert-comparison__table">
            <thead>
              <tr>
                <th scope="col" style="width: 25%;">${escapeHTML(thParam)}</th>
                ${selected.map(item => `
                  <th scope="col" style="width: ${Math.floor(75 / selected.length)}%;">
                    <div class="comp-col-header">
                      <strong>${escapeHTML(item.d.name)}</strong>
                      <span class="comp-col-tag">${escapeHTML(tagSpec)}</span>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <th scope="row" class="comp-row-label">
                    <span class="comp-row-icon" aria-hidden="true">${row.icon}</span>
                    <span>${escapeHTML(row.label)}</span>
                  </th>
                  ${selected.map(item => `
                    <td class="comp-row-data">
                      ${escapeHTML(item.d[row.prop])}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="cert-comparison__footer-note">
          <p>
            ${escapeHTML(footerNote)}
          </p>
        </div>
      </div>
    `;

    const printBtn = document.getElementById('comp-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        document.body.classList.add('print-focus-comparison');
        window.print();
        setTimeout(() => document.body.classList.remove('print-focus-comparison'), 1000);
      });
    }

    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function initCertifiedComparison() {
    const compareBtn = document.getElementById('compare-button');
    const sel1 = document.getElementById('compare-1');
    const sel2 = document.getElementById('compare-2');
    const sel3 = document.getElementById('compare-3');

    if (!compareBtn || !sel1 || !sel2) return;

    // Enhance click listener
    compareBtn.addEventListener('click', () => {
      const keys = [sel1.value, sel2.value, sel3 ? sel3.value : ''].filter(Boolean);
      if (keys.length >= 2) {
        renderCertifiedComparison(keys);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 5. FEATURE FIVE: DATED STUDIO COMPLIANCE RECORD
  // Everything stays in browser. No account, no upload, no network.
  // ═══════════════════════════════════════════════════════════

  const STORAGE_KEY_RECORDS = 'cert_checker_studio_records_v2';

  function getSavedStudioRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStudioRecords(records) {
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  function generateRecordId() {
    const d = new Date();
    const datePart = d.toISOString().split('T')[0].replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `REC-${datePart}-${rand}`;
  }

  function createStudioRecordFromAnalysis(analysis) {
    const record = {
      id: generateRecordId(),
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString(),
      studioName: 'Professional Body Art Studio',
      assessorName: 'Quality Lead / Piercer',
      supplierName: 'Jewelry Supplier / Manufacturer',
      poRef: 'Shipment Lot Verification',
      evaluatedClaim: analysis.rawText,
      tierTitle: analysis.tierTitle,
      tier: analysis.tier,
      establishes: analysis.establishes,
      criticalGaps: analysis.criticalGaps,
      requiredProof: analysis.requiredProof,
      decision: analysis.tier === 3 ? 'Approved for Initial Piercing (Traceable MTR)' : 'Quarantined / Missing Verification Documents',
      checklist: {
        mtrProvided: analysis.tier === 3,
        heatNumberMatched: analysis.tier === 3,
        eliOxygenVerified: analysis.tier === 3,
        internalThreading: true,
        mirrorPolishVerified: true
      },
      notes: `Evaluated via Material Certification Checker V2. Evidence Tier: ${analysis.tierTitle}`
    };

    const current = getSavedStudioRecords();
    current.unshift(record);
    saveStudioRecords(current);
    renderStudioRecordsList();
    displayRecordDetail(record);
  }

  function renderStudioRecordsList() {
    if (window.StudioVault && typeof window.StudioVault.renderList === 'function') {
      window.StudioVault.renderList('studio-records-list', 'studio-records-count', displayRecordDetail);
      return;
    }

    const listContainer = document.getElementById('studio-records-list');
    const countBadge = document.getElementById('studio-records-count');
    if (!listContainer) return;

    const records = getSavedStudioRecords();
    const countTr = typeof window.t === 'function' 
      ? (records.length === 1 ? window.t('studio_vault.records_count_single', { count: records.length }) : window.t('studio_vault.records_count', { count: records.length }))
      : `${records.length} record${records.length === 1 ? '' : 's'}`;
    if (countBadge) countBadge.textContent = countTr;

    if (records.length === 0) {
      const emptyMsg = typeof window.t === 'function' ? window.t('studio_vault.empty_vault') : 'No saved studio compliance records yet.';
      listContainer.innerHTML = `
        <div class="studio-record__empty">
          <p>${escapeHTML(emptyMsg)}</p>
        </div>
      `;
      return;
    }

    const viewTxt = typeof window.t === 'function' ? window.t('studio_vault.view_record') : 'View Record';
    const delTxt = typeof window.t === 'function' ? window.t('studio_vault.delete_record') : 'Delete record';

    listContainer.innerHTML = records.map(rec => `
      <div class="studio-record__item" data-record-id="${escapeHTML(rec.id)}">
        <div class="studio-record__item-header">
          <span class="studio-record__item-id">${escapeHTML(rec.id)}</span>
          <span class="studio-record__item-date">${escapeHTML(rec.date)}</span>
        </div>
        <div class="studio-record__item-body">
          <strong class="studio-record__item-claim">"${escapeHTML(rec.evaluatedClaim.slice(0, 70))}${rec.evaluatedClaim.length > 70 ? '...' : ''}"</strong>
          <span class="studio-record__item-tier">[${escapeHTML(rec.tierTitle ? rec.tierTitle.split(':')[0] : '')}]</span>
        </div>
        <div class="studio-record__item-actions no-print">
          <button type="button" class="btn btn--secondary btn--small view-rec-btn" data-id="${escapeHTML(rec.id)}">${escapeHTML(viewTxt)}</button>
          <button type="button" class="btn btn--secondary btn--small delete-rec-btn" data-id="${escapeHTML(rec.id)}" title="${escapeHTML(delTxt)}">🗑️</button>
        </div>
      </div>
    `).join('');

    // Wire view/delete
    listContainer.querySelectorAll('.view-rec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const rec = getSavedStudioRecords().find(r => r.id === id);
        if (rec) displayRecordDetail(rec);
      });
    });

    listContainer.querySelectorAll('.delete-rec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const updated = getSavedStudioRecords().filter(r => r.id !== id);
        saveStudioRecords(updated);
        renderStudioRecordsList();
        const detailContainer = document.getElementById('studio-record-detail');
        if (detailContainer) detailContainer.innerHTML = '';
      });
    });
  }

  function displayRecordDetail(record) {
    const detailContainer = document.getElementById('studio-record-detail');
    if (!detailContainer) return;

    const badgeText = safeT('studio_record.badge', '[OFFICIAL STUDIO COMPLIANCE RECORD]');
    const sheetTitle = safeT('studio_record.sheet_title', 'Material Lot Verification Certificate');
    const recIdLabel = safeT('studio_record.record_id_label', 'Record ID:');
    const dateLabel = safeT('studio_record.date_label', 'Date:');
    const btnPrint = safeT('studio_record.btn_print', '🖨️ Print for Supplier File');
    const btnCopy = safeT('studio_record.btn_copy', '📋 Copy Summary');
    const btnDownload = safeT('studio_record.btn_download', '💾 Download (.txt)');
    const fieldStudio = safeT('studio_record.field_studio', 'Studio Name:');
    const fieldInspector = safeT('studio_record.field_inspector', 'Inspector / Piercer:');
    const fieldSupplier = safeT('studio_record.field_supplier', 'Supplier / Manufacturer:');
    const fieldLot = safeT('studio_record.field_lot', 'PO / Batch / Lot #:');
    const headingClaim = safeT('studio_record.heading_claim_evaluated', 'Claim / Label Phrasing Evaluated:');
    const headingStatus = safeT('studio_record.heading_evidence_status', 'Evidence Status:');
    const headingChecklist = safeT('studio_record.heading_checklist', 'Studio Receiving Inspection Checklist:');
    const chkMtr = safeT('studio_record.chk_mtr', 'Mill Test Report (MTR) provided by supplier');
    const chkHeat = safeT('studio_record.chk_heat', 'Heat / Melt Lot Number matches packaging label');
    const chkChem = safeT('studio_record.chk_chem', 'Chemical analysis verified (O ≤ 0.13% for Ti, C ≤ 0.030% for Steel)');
    const chkThreading = safeT('studio_record.chk_threading', 'Internal threading or threadless construction (no external threads)');
    const chkPolish = safeT('studio_record.chk_polish', 'Surface polish inspected (mirror finish, no tooling ridges)');
    const headingDecision = safeT('studio_record.heading_decision', 'Final Studio Receiving Decision:');
    const decInitial = safeT('studio_record.dec_initial', '[APPROVED FOR INITIAL PIERCING] Documented raw material (ASTM F136 / F138) with verified MTR & Heat #.');
    const decHealed = safeT('studio_record.dec_healed', '[APPROVED FOR HEALED WEAR ONLY] Secondary wear on intact epithelium only.');
    const decQuarantine = safeT('studio_record.dec_quarantine', '[QUARANTINE / ON HOLD] Missing MTR or heat number; held until supplier provides proof.');
    const decRejected = safeT('studio_record.dec_rejected', '[REJECTED / RETURN TO VENDOR] Unsubstantiated claims, commercial scrap, or wrong alloy.');
    const confirmText = safeT('studio_record.confirm_text', 'I confirm this material lot has been evaluated against applicable ASTM/ISO implant standards:');
    const sigInspector = safeT('studio_record.sig_inspector', 'Inspector Signature: _________________________________________');
    const sigDate = safeT('studio_record.sig_date', 'Date of Inspection: __________________');
    const fileFolder = safeT('studio_record.file_folder', 'Studio Physical File Folder: [ ] Material Certs 2026');
    const toastCopied = safeT('studio_record.toast_copied', 'Record Summary Copied!');

    detailContainer.style.display = 'block';
    detailContainer.innerHTML = `
      <div class="studio-record__sheet" id="printable-studio-record">
        <div class="studio-record__sheet-header">
          <div>
            <span class="cert-tag cert-tag--standard">${escapeHTML(badgeText)}</span>
            <h3 class="studio-record__sheet-title">${escapeHTML(sheetTitle)}</h3>
            <p class="studio-record__sheet-id">${escapeHTML(recIdLabel)} <strong>${escapeHTML(record.id)}</strong> | ${escapeHTML(dateLabel)} <strong>${escapeHTML(record.date)} ${escapeHTML(record.timestamp || '')}</strong></p>
          </div>
          <div class="studio-record__sheet-actions no-print">
            <button type="button" class="btn btn--primary btn--small" id="print-record-btn">${escapeHTML(btnPrint)}</button>
            <button type="button" class="btn btn--secondary btn--small" id="copy-record-btn">${escapeHTML(btnCopy)}</button>
            <button type="button" class="btn btn--secondary btn--small" id="download-record-btn">${escapeHTML(btnDownload)}</button>
          </div>
        </div>

        <div class="studio-record__grid">
          <div class="studio-record__field">
            <label>${escapeHTML(fieldStudio)}</label>
            <input type="text" class="studio-record__inline-input" id="rec-studio" value="${escapeHTML(record.studioName)}" />
          </div>
          <div class="studio-record__field">
            <label>${escapeHTML(fieldInspector)}</label>
            <input type="text" class="studio-record__inline-input" id="rec-assessor" value="${escapeHTML(record.assessorName)}" />
          </div>
          <div class="studio-record__field">
            <label>${escapeHTML(fieldSupplier)}</label>
            <input type="text" class="studio-record__inline-input" id="rec-supplier" value="${escapeHTML(record.supplierName)}" />
          </div>
          <div class="studio-record__field">
            <label>${escapeHTML(fieldLot)}</label>
            <input type="text" class="studio-record__inline-input" id="rec-po" value="${escapeHTML(record.poRef)}" />
          </div>
        </div>

        <div class="studio-record__box">
          <h4 class="studio-record__box-title">${escapeHTML(headingClaim)}</h4>
          <blockquote class="studio-record__quote">"${escapeHTML(record.evaluatedClaim)}"</blockquote>
          <div class="studio-record__verdict-badge">
            <strong>${escapeHTML(headingStatus)}</strong> <span>${escapeHTML(record.tierTitle)}</span>
          </div>
        </div>

        <div class="studio-record__checklist">
          <h4 class="studio-record__box-title">${escapeHTML(headingChecklist)}</h4>
          <div class="studio-record__checklist-grid">
            <label class="studio-record__check-item">
              <input type="checkbox" ${record.checklist && record.checklist.mtrProvided ? 'checked' : ''} />
              <span>${escapeHTML(chkMtr)}</span>
            </label>
            <label class="studio-record__check-item">
              <input type="checkbox" ${record.checklist && record.checklist.heatNumberMatched ? 'checked' : ''} />
              <span>${escapeHTML(chkHeat)}</span>
            </label>
            <label class="studio-record__check-item">
              <input type="checkbox" ${record.checklist && record.checklist.eliOxygenVerified ? 'checked' : ''} />
              <span>${escapeHTML(chkChem)}</span>
            </label>
            <label class="studio-record__check-item">
              <input type="checkbox" ${record.checklist && record.checklist.internalThreading ? 'checked' : ''} />
              <span>${escapeHTML(chkThreading)}</span>
            </label>
            <label class="studio-record__check-item">
              <input type="checkbox" ${record.checklist && record.checklist.mirrorPolishVerified ? 'checked' : ''} />
              <span>${escapeHTML(chkPolish)}</span>
            </label>
          </div>
        </div>

        <div class="studio-record__disposition">
          <h4 class="studio-record__box-title">${escapeHTML(headingDecision)}</h4>
          <div class="studio-record__decision-radios">
            <label class="studio-record__radio">
              <input type="radio" name="rec-decision-${record.id}" value="Approved Initial" ${record.decision.includes('Approved for Initial') ? 'checked' : ''} />
              <span>${escapeHTML(decInitial)}</span>
            </label>
            <label class="studio-record__radio">
              <input type="radio" name="rec-decision-${record.id}" value="Approved Healed" ${record.decision.includes('Healed') ? 'checked' : ''} />
              <span>${escapeHTML(decHealed)}</span>
            </label>
            <label class="studio-record__radio">
              <input type="radio" name="rec-decision-${record.id}" value="Quarantine" ${record.decision.includes('Quarantine') ? 'checked' : ''} />
              <span>${escapeHTML(decQuarantine)}</span>
            </label>
            <label class="studio-record__radio">
              <input type="radio" name="rec-decision-${record.id}" value="Rejected" ${record.decision.includes('Rejected') ? 'checked' : ''} />
              <span>${escapeHTML(decRejected)}</span>
            </label>
          </div>
        </div>

        <div class="studio-record__signoff">
          <div class="signoff-col">
            <p>${escapeHTML(confirmText)}</p>
            <div class="sig-space">
              <span>${escapeHTML(sigInspector)}</span>
            </div>
          </div>
          <div class="signoff-col">
            <div class="sig-space">
              <span>${escapeHTML(sigDate)}</span>
            </div>
            <div class="sig-space">
              <span>${escapeHTML(fileFolder)}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const printBtn = document.getElementById('print-record-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        document.body.classList.add('print-focus-studio-record');
        window.print();
        setTimeout(() => document.body.classList.remove('print-focus-studio-record'), 1000);
      });
    }

    const copyBtn = document.getElementById('copy-record-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textRec = `
STUDIO MATERIAL COMPLIANCE RECORD
Record ID: ${record.id}
Date: ${record.date} ${record.timestamp || ''}
Studio: ${document.getElementById('rec-studio')?.value || record.studioName}
Inspector: ${document.getElementById('rec-assessor')?.value || record.assessorName}
Supplier: ${document.getElementById('rec-supplier')?.value || record.supplierName}
PO / Lot Ref: ${document.getElementById('rec-po')?.value || record.poRef}
Evaluated Phrasing: "${record.evaluatedClaim}"
Evidence Tier: ${record.tierTitle}
Required Document: ${record.requiredProof}
Decision: ${record.decision}
        `.trim();
        copyToClipboard(textRec, copyBtn, toastCopied);
      });
    }

    const dlBtn = document.getElementById('download-record-btn');
    if (dlBtn) {
      dlBtn.addEventListener('click', () => {
        const textRec = `
═══════════════════════════════════════════════════════════════
STUDIO COMPLIANCE RECORD: ${record.id}
═══════════════════════════════════════════════════════════════
Date: ${record.date} ${record.timestamp || ''}
Studio Name: ${document.getElementById('rec-studio')?.value || record.studioName}
Inspector / Piercer: ${document.getElementById('rec-assessor')?.value || record.assessorName}
Supplier: ${document.getElementById('rec-supplier')?.value || record.supplierName}
Item / PO / Lot Number: ${document.getElementById('rec-po')?.value || record.poRef}

EVALUATED SUPPLIER PHRASING:
"${record.evaluatedClaim}"

EVIDENCE TIER ASSESSMENT:
${record.tierTitle}

WHAT THIS PHRASING ESTABLISHES:
${(record.establishes || []).map(e => '- ' + e).join('\n')}

WHAT THIS PHRASING DOES NOT ESTABLISH (CRITICAL GAP):
${(record.criticalGaps || []).map(g => '- ' + g).join('\n')}

REQUIRED DOCUMENTARY PROOF:
${record.requiredProof}

FINAL STUDIO RECEIVING DECISION:
${record.decision}

INSPECTION SIGNOFF:
Inspector: ___________________________ Date: ${record.date}
═══════════════════════════════════════════════════════════════
        `.trim();
        downloadTextFile(`${record.id}.txt`, textRec);
      });
    }

    detailContainer.scrollIntoView({ behavior: 'smooth' });
  }

  function initStudioRecords() {
    const createNewBtn = document.getElementById('create-manual-record-btn');
    const clearAllBtn = document.getElementById('clear-records-btn');

    if (createNewBtn) {
      createNewBtn.addEventListener('click', () => {
        const manualClaim = prompt('Enter the supplier phrasing or material description to inspect:', 'ASTM F136 Titanium Barbell Lot #48291');
        if (manualClaim) {
          const analysis = analyzePhrasing(manualClaim);
          createStudioRecordFromAnalysis(analysis);
        }
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('Clear all local studio compliance records from this browser? This cannot be undone.')) {
          saveStudioRecords([]);
          renderStudioRecordsList();
          const detail = document.getElementById('studio-record-detail');
          if (detail) detail.innerHTML = '';
        }
      });
    }

    // Initial render
    renderStudioRecordsList();
  }

  // ═══════════════════════════════════════════════════════════
  // 6. GLOBAL INITIALIZATION
  // ═══════════════════════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    initCertificateReader();
    initSupplierQuestions();
    initClaimMatrix();
    initCertifiedComparison();
    initStudioRecords();
  });

  // Re-render dynamic components when language changes
  window.addEventListener('languageChanged', () => {
    renderQuestionSheetDOM();
    renderClaimMatrixDOM(currentClaimCat, currentClaimSearch);
  });

  // Expose global methods for integration
  window.V2Features = {
    analyzePhrasing,
    renderReaderResults,
    createStudioRecordFromAnalysis,
    renderCertifiedComparison,
    renderQuestionSheetDOM,
    renderClaimMatrixDOM
  };

  window.analyzePhrasing = analyzePhrasing;
  window.renderReaderResults = renderReaderResults;
  window.renderCertifiedComparison = renderCertifiedComparison;
  window.createStudioRecordFromAnalysis = createStudioRecordFromAnalysis;
  window.initCertificateReader = initCertificateReader;
  window.renderClaimMatrixDOM = renderClaimMatrixDOM;

})();
