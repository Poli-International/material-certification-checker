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

  // Initialize embed modal
  initEmbedModal();

  // Initialize email capture
  initEmailCapture();

  // Populate comparison dropdowns
  populateComparisonDropdowns();

  // Populate reference lists
  populateReferenceLists();
}

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

function handleSearch() {
  const searchInput = document.getElementById('cert-search');
  const resultsDiv = document.getElementById('search-results');

  if (!searchInput || !resultsDiv) return;

  const query = searchInput.value.trim().toUpperCase();

  if (!query) {
    alert('Please enter a certification code (e.g., ASTM F138, ISO 5832-1)');
    return;
  }

  // Search for certification
  const cert = findCertification(query);

  if (cert) {
    displayCertificationResult(cert, resultsDiv);
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

  const safetyBadge = getSafetyBadgeHTML(cert.safety_rating);

  container.innerHTML = `
    <div class="cert-decoder__result-card">
      <div class="cert-decoder__cert-badge">
        <div class="cert-decoder__cert-code">${cert.code}</div>
        <div class="cert-decoder__cert-org">${cert.organization}</div>
        ${safetyBadge}
      </div>

      <div class="cert-decoder__details-grid">
        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Full Name</h3>
          <p class="cert-decoder__detail-text">${cert.full_name}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Material Type</h3>
          <p class="cert-decoder__detail-text">${cert.material_type}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Body Piercing Use</h3>
          <p class="cert-decoder__detail-text">${cert.body_piercing_use}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Biocompatibility</h3>
          <p class="cert-decoder__detail-text">${cert.biocompatibility}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Sterilization</h3>
          <p class="cert-decoder__detail-text">${cert.sterilization}</p>
        </div>

        ${cert.common_uses ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">Common Uses</h3>
          <ul class="cert-decoder__detail-list">
            ${cert.common_uses.map(use => `<li>${use}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${cert.important_notes ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">Important Notes</h3>
          <p class="cert-decoder__detail-text">${cert.important_notes}</p>
        </div>
        ` : ''}

        ${cert.verification_method ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">How to Verify</h3>
          <p class="cert-decoder__detail-text">${cert.verification_method}</p>
        </div>
        ` : ''}

        ${cert.related_standards && cert.related_standards.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">Related Standards</h3>
          <p class="cert-decoder__detail-text">${cert.related_standards.join(', ')}</p>
        </div>
        ` : ''}
      </div>
    </div>
  `;
}

function displaySearchError(query, container) {
  container.style.display = 'block';
  container.innerHTML = `
    <div style="padding: 2rem; background: rgba(220, 53, 69, 0.1); border: 2px solid var(--color-danger-red); border-radius: 8px; text-align: center;">
      <p style="color: var(--color-danger-red); font-weight: bold; margin-bottom: 0.5rem;">❌ Certification Not Found</p>
      <p style="color: var(--color-text-secondary); font-size: 0.875rem;">
        No certification found for "${query}". Try codes like:<br>
        <strong>ASTM F136, ASTM F138, ISO 5832-1, ISO 10993, EN 1441, REACH</strong>
      </p>
    </div>
  `;
}

function getSafetyBadgeHTML(rating) {
  const badges = {
    safe: '<div class="cert-decoder__safety-badge cert-decoder__safety-badge--safe">✅ SAFE</div>',
    conditional: '<div class="cert-decoder__safety-badge cert-decoder__safety-badge--conditional">⚠️ CONDITIONAL</div>',
    unsafe: '<div class="cert-decoder__safety-badge cert-decoder__safety-badge--unsafe">❌ UNSAFE</div>'
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
  e.preventDefault();

  const materialType = document.getElementById('material-type').value;
  const location = document.getElementById('piercing-location').value;
  const healing = document.querySelector('input[name="healing"]:checked').value;
  const sensitivity = document.querySelector('input[name="sensitivity"]:checked').value;

  if (!materialType) {
    alert('Please select a material type.');
    return;
  }

  const material = materialDatabase[materialType];

  if (material) {
    displayMaterialResult(material, healing, sensitivity, location);
  }
}

function displayMaterialResult(material, healing, sensitivity, location) {
  const resultsDiv = document.getElementById('material-results');
  if (!resultsDiv) return;

  resultsDiv.style.display = 'block';

  // Check compatibility
  const compatible = checkCompatibility(material, healing, sensitivity);

  const safetyBadge = getSafetyBadgeHTML(material.safety_rating);

  resultsDiv.innerHTML = `
    <div class="cert-decoder__result-card">
      <div class="cert-decoder__cert-badge">
        <h3 style="font-size: 1.5rem; color: var(--color-medical-blue); margin-bottom: 0.5rem;">${material.name}</h3>
        ${safetyBadge}
        <div style="margin-top: 1rem;">
          ${getSafetyMeterHTML(material.safety_rating)}
        </div>
      </div>

      <div class="cert-decoder__details-grid">
        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Biocompatibility</h3>
          <p class="cert-decoder__detail-text">${material.biocompatibility}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Nickel-Free</h3>
          <p class="cert-decoder__detail-text">${material.nickel_free ? '✅ Yes' : '❌ Contains Nickel'}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Autoclave Safe</h3>
          <p class="cert-decoder__detail-text">${material.autoclave_safe ? '✅ Yes' : '❌ No'}</p>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Allergy Risk</h3>
          <p class="cert-decoder__detail-text">${formatAllergyRisk(material.allergy_risk)}</p>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">Required Certifications</h3>
          <p class="cert-decoder__detail-text">${material.required_certs.join(', ')}</p>
        </div>

        ${compatible.warnings.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <div class="cert-decoder__red-flags">
            <h3 class="cert-decoder__red-flag-title">⚠️ Warnings for Your Selection</h3>
            <ul class="cert-decoder__red-flag-list">
              ${compatible.warnings.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
        </div>
        ` : ''}

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">Suitable For</h3>
          <ul class="cert-decoder__detail-list">
            ${material.suitable_for.map(use => `<li>${use}</li>`).join('')}
          </ul>
        </div>

        ${material.not_suitable_for.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">NOT Suitable For</h3>
          <ul class="cert-decoder__detail-list">
            ${material.not_suitable_for.map(use => `<li style="color: var(--color-danger-red);">${use}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Pros</h3>
          <ul class="cert-decoder__detail-list">
            ${material.pros.slice(0, 3).map(pro => `<li>${pro}</li>`).join('')}
          </ul>
        </div>

        <div class="cert-decoder__detail-box">
          <h3 class="cert-decoder__detail-title">Cons</h3>
          <ul class="cert-decoder__detail-list">
            ${material.cons.slice(0, 3).map(con => `<li>${con}</li>`).join('')}
          </ul>
        </div>

        ${material.red_flags && material.red_flags.length > 0 ? `
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <div class="cert-decoder__red-flags">
            <h3 class="cert-decoder__red-flag-title">🚩 Red Flags to Watch For</h3>
            <ul class="cert-decoder__red-flag-list">
              ${material.red_flags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function checkCompatibility(material, healing, sensitivity) {
  const warnings = [];

  if (healing === 'initial' && !material.healing_stage.includes('initial')) {
    warnings.push('This material is NOT recommended for initial/fresh piercings.');
  }

  if (sensitivity === 'sensitive' && material.allergy_risk !== 'very_low' && material.allergy_risk !== 'low') {
    warnings.push('This material may not be suitable for sensitive skin.');
  }

  if (!material.nickel_free && sensitivity === 'sensitive') {
    warnings.push('This material contains nickel, which can cause allergic reactions in sensitive individuals.');
  }

  return { warnings };
}

function formatAllergyRisk(risk) {
  const map = {
    'very_low': '✅ Very Low',
    'low': '✅ Low',
    'low_to_moderate': '⚠️ Low to Moderate',
    'moderate': '⚠️ Moderate',
    'moderate_to_high': '❌ Moderate to High',
    'high': '❌ High',
    'low_if_nickel_free': '✅ Low (if nickel-free)'
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

  const claim = claimInput.value.trim().toLowerCase();

  if (!claim) {
    alert('Please enter a product claim to verify.');
    return;
  }

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

  container.innerHTML = `
    <div style="padding: 1.5rem; background: var(--color-background-elevated); border: 2px solid var(--color-border); border-radius: 12px;">
      <h3 style="font-size: 1.5rem; color: var(--color-medical-blue); margin-bottom: 1rem;">
        Verifying: "${data.claim}"
      </h3>

      <div class="cert-decoder__details-grid">
        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">✅ Required Certifications</h3>
          <p class="cert-decoder__detail-text">${data.required_certs.join(', ')}</p>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">❌ NOT Acceptable</h3>
          <ul class="cert-decoder__detail-list">
            ${data.not_acceptable.map(item => `<li style="color: var(--color-danger-red);">${item}</li>`).join('')}
          </ul>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <div class="cert-decoder__red-flags">
            <h3 class="cert-decoder__red-flag-title">🚩 Red Flags</h3>
            <ul class="cert-decoder__red-flag-list">
              ${data.red_flags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="cert-decoder__detail-box" style="grid-column: 1 / -1;">
          <h3 class="cert-decoder__detail-title">✓ Verification Steps</h3>
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

  container.innerHTML = `
    <div style="padding: 2rem; background: rgba(255, 184, 0, 0.1); border: 2px solid var(--color-caution-yellow); border-radius: 12px;">
      <h3 style="color: var(--color-caution-yellow); margin-bottom: 1rem;">⚠️ Generic Verification Tips</h3>
      <p style="color: var(--color-text-primary); font-size: 0.875rem; line-height: 1.7;">
        We don't have specific verification data for "${claim}", but here are general tips:<br><br>
        <strong>1. Request Documentation:</strong> Always ask for mill certifications or test reports.<br>
        <strong>2. Verify Specific Standards:</strong> Generic terms like "surgical grade" or "medical grade" are meaningless without ASTM or ISO numbers.<br>
        <strong>3. Check Material Composition:</strong> Ask for exact alloy composition and compare to known standards.<br>
        <strong>4. Watch for Red Flags:</strong> Suspiciously low prices, no documentation, vague claims, or evasive suppliers.<br>
        <strong>5. When in Doubt:</strong> Stick to verified ASTM F136 titanium or ASTM F138 steel.
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
}

function populateComparisonDropdowns() {
  const selects = [
    document.getElementById('compare-1'),
    document.getElementById('compare-2'),
    document.getElementById('compare-3')
  ];

  selects.forEach(select => {
    if (select) {
      Object.entries(materialDatabase).forEach(([key, material]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = material.name;
        select.appendChild(option);
      });
    }
  });
}

function handleComparison() {
  const mat1 = document.getElementById('compare-1').value;
  const mat2 = document.getElementById('compare-2').value;
  const mat3 = document.getElementById('compare-3').value;

  if (!mat1 || !mat2) {
    alert('Please select at least two materials to compare.');
    return;
  }

  const materials = [mat1, mat2, mat3].filter(m => m).map(key => ({ key, ...materialDatabase[key] }));

  displayComparison(materials);
}

function displayComparison(materials) {
  const resultsDiv = document.getElementById('compare-results');
  if (!resultsDiv) return;

  resultsDiv.style.display = 'grid';

  resultsDiv.innerHTML = materials.map(mat => `
    <div class="cert-decoder__compare-card">
      <h3 style="font-size: 1.125rem; font-weight: bold; color: var(--color-medical-blue); margin-bottom: 1rem; text-align: center;">
        ${mat.name}
      </h3>

      ${getSafetyBadgeHTML(mat.safety_rating)}

      <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--color-text-secondary);">
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-medical-blue);">Nickel-Free:</strong><br>
          ${mat.nickel_free ? '✅ Yes' : '❌ Contains Nickel'}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-medical-blue);">Autoclave:</strong><br>
          ${mat.autoclave_safe ? '✅ Safe' : '❌ Not Safe'}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-medical-blue);">Initial Piercing:</strong><br>
          ${mat.healing_stage.includes('initial') ? '✅ Yes' : '❌ No'}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-medical-blue);">Cost:</strong><br>
          ${formatCost(mat.cost_rating)}
        </p>
        <p style="margin-bottom: 0.5rem;">
          <strong style="color: var(--color-medical-blue);">Required Certs:</strong><br>
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
    text.textContent = 'Hide Guide';
  } else {
    content.style.display = 'none';
    icon.textContent = '▼';
    text.textContent = 'Show Guide';
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
    alert('Failed to copy code. Please select and copy manually.');
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
  submitButton.textContent = 'Subscribing...';

  // TODO: INTEGRATE WITH EMAIL SERVICE
  // Replace with Mailchimp/ConvertKit API call
  setTimeout(() => {
    showEmailMessage(successMsg, errorMsg);
    emailInput.value = '';
    submitButton.disabled = false;
    submitButton.textContent = location === 'footer' ? 'Notify Me' : 'Subscribe';

    console.log('Email captured:', email, 'from:', location, 'tool: material-certification');
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
