/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - CERTIFICATION DATABASE
Poli International
Version: 1.0
═══════════════════════════════════════════════════════════════
*/

/**
 * Complete certification database
 * Contains ASTM, ISO, and EN standards
 */

const rawCertificationDatabase = {
  // ═══════════════════════════════════════════════════════════
  // ASTM STANDARDS (American Society for Testing and Materials)
  // ═══════════════════════════════════════════════════════════
  'ASTM_F136': {
    code: 'ASTM F136',
    full_name: 'Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications',
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
    important_notes: 'This is the GOLD STANDARD for body piercing. Hypoallergenic, nickel-free, and suitable for all piercing types.',
    verification_method: 'Mill certification required showing ASTM F136 compliance',
    safety_rating: 'safe',
    category: 'astm'
  },

  'ASTM_F138': {
    code: 'ASTM F138',
    full_name: 'Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants',
    organization: 'ASTM International',
    year_current: '2021',
    material_type: 'Surgical Stainless Steel 316LVM',
    key_requirements: {
      carbon_max: '0.030%',
      chromium: '17.00-19.00%',
      nickel: '13.00-15.00%',
      molybdenum: '2.25-3.00%',
      manganese_max: '2.00%',
      silicon_max: '0.75%',
      phosphorus_max: '0.025%',
      sulfur_max: '0.010%'
    },
    body_piercing_use: 'Good for healed piercings, acceptable for initial with caution',
    biocompatibility: 'Good - Contains nickel (potential allergen)',
    sterilization: 'Autoclave safe',
    related_standards: ['ISO 5832-1', 'EN ISO 5832-1'],
    common_uses: ['Body jewelry', 'Surgical implants', 'Medical instruments'],
    important_notes: 'Contains 13-15% nickel - potential allergen for sensitive individuals. "LVM" means Low Vacuum Melting (higher purity). NOT the same as regular 316L steel.',
    verification_method: 'Mill certification must specify ASTM F138 (not just "surgical steel")',
    safety_rating: 'conditional',
    category: 'astm'
  },

  'ASTM_F1295': {
    code: 'ASTM F1295',
    full_name: 'Standard Specification for Wrought Titanium-6Aluminum-7Niobium Alloy for Surgical Implant Applications',
    organization: 'ASTM International',
    year_current: '2016',
    material_type: 'Titanium Alloy (Ti-6Al-7Nb)',
    key_requirements: {
      titanium: 'Balance',
      aluminum: '5.50-6.50%',
      niobium: '6.50-7.50%',
      tantalum_max: '0.50%',
      iron_max: '0.25%',
      oxygen_max: '0.20%'
    },
    body_piercing_use: 'Good - Less common than F136 but acceptable',
    biocompatibility: 'Excellent - Vanadium-free alternative',
    sterilization: 'Autoclave safe',
    related_standards: ['ISO 5832-11'],
    common_uses: ['Surgical implants', 'Body jewelry (rare)', 'Medical devices'],
    important_notes: 'Alternative to Ti-6Al-4V for those concerned about vanadium. Rarely used in body jewelry due to cost.',
    verification_method: 'Mill certification required',
    safety_rating: 'safe',
    category: 'astm'
  },

  'ASTM_F2229': {
    code: 'ASTM F2229',
    full_name: 'Standard Specification for Wrought, Unalloyed Niobium for Surgical Implant Applications',
    organization: 'ASTM International',
    year_current: '2018',
    material_type: 'Niobium Grade 1 (unalloyed)',
    key_requirements: {
      niobium_tantalum_min: '99.8%',
      tantalum_max: '700 ppm',
      oxygen_max: '250 ppm',
      carbon_max: '100 ppm',
      nitrogen_max: '100 ppm',
      hydrogen_max: '15 ppm',
      iron_max: '100 ppm'
    },
    body_piercing_use: 'Excellent - Great for sensitive skin',
    biocompatibility: 'Excellent - Hypoallergenic',
    sterilization: 'Autoclave safe',
    related_standards: ['ASTM F1586 (wrought niobium)', 'ISO 5832-14'],
    common_uses: ['Body jewelry', 'Ear weights', 'Stretching jewelry'],
    important_notes: 'Pure niobium - naturally hypoallergenic and nickel-free. Can be anodized to various colors. Softer than titanium.',
    verification_method: 'Mill certification required',
    safety_rating: 'safe',
    category: 'astm'
  },

  'ASTM_F1586': {
    code: 'ASTM F1586',
    full_name: 'Standard Specification for Wrought Niobium Alloy for Surgical Implant Applications',
    organization: 'ASTM International',
    year_current: '2014',
    material_type: 'Niobium Alloy (Nb-1Zr)',
    key_requirements: {
      niobium: 'Balance',
      zirconium: '0.8-1.2%',
      oxygen_max: '250 ppm',
      carbon_max: '100 ppm'
    },
    body_piercing_use: 'Good - Slightly stronger than pure niobium',
    biocompatibility: 'Excellent',
    sterilization: 'Autoclave safe',
    related_standards: ['ASTM F2229', 'ISO 5832-14'],
    common_uses: ['Body jewelry', 'Surgical implants'],
    important_notes: 'Niobium-zirconium alloy - stronger than pure niobium while maintaining biocompatibility.',
    verification_method: 'Mill certification required',
    safety_rating: 'safe',
    category: 'astm'
  },

  // ═══════════════════════════════════════════════════════════
  // ISO STANDARDS (International Organization for Standardization)
  // ═══════════════════════════════════════════════════════════
  'ISO_5832-1': {
    code: 'ISO 5832-1',
    full_name: 'Implants for surgery - Metallic materials - Part 1: Wrought stainless steel',
    organization: 'International Organization for Standardization',
    year_current: '2016',
    material_type: 'Surgical Stainless Steel (similar to 316LVM)',
    key_requirements: {
      carbon_max: '0.030%',
      chromium: '17.0-19.0%',
      nickel: '13.0-15.0%',
      molybdenum: '2.25-3.0%'
    },
    body_piercing_use: 'Good for healed piercings',
    biocompatibility: 'Good - Contains nickel',
    sterilization: 'Autoclave safe',
    related_standards: ['ASTM F138', 'EN ISO 5832-1'],
    common_uses: ['Surgical implants', 'Body jewelry'],
    important_notes: 'International equivalent of ASTM F138. Contains nickel.',
    verification_method: 'Mill certification or ISO compliance documentation',
    safety_rating: 'conditional',
    category: 'iso'
  },

  'ISO_5832-3': {
    code: 'ISO 5832-3',
    full_name: 'Implants for surgery - Metallic materials - Part 3: Wrought titanium 6-aluminum 4-vanadium alloy',
    organization: 'International Organization for Standardization',
    year_current: '2016',
    material_type: 'Titanium Grade 5 (Ti-6Al-4V)',
    key_requirements: {
      aluminum: '5.5-6.75%',
      vanadium: '3.5-4.5%',
      iron_max: '0.30%',
      oxygen_max: '0.20%'
    },
    body_piercing_use: 'Surgical implant specification for Ti-6Al-4V. Most piercing guidance names ASTM F136 (ELI), which has a lower oxygen limit.',
    biocompatibility: 'Specified for surgical implants',
    sterilization: 'Autoclave safe',
    related_standards: ['ASTM F1472 (Grade 5)', 'ASTM F136 (ELI version)'],
    common_uses: ['Orthopaedic and dental implants'],
    important_notes: 'Grade 5 (ISO 5832-3, ASTM F1472) is not the same specification as Grade 23 (ASTM F136, ELI): its oxygen limit is 0.20% against 0.13%. Both are implant specifications. The common problem is Grade 5 or industrial titanium sold as "implant grade" with no certificate at all, so ask which specification the mill certificate names.',
    verification_method: 'Check the certificate names a specification and a heat number. If you require ASTM F136, an ISO 5832-3 certificate does not show it.',
    safety_rating: 'conditional',
    category: 'iso'
  },

  'ISO_5832-11': {
    code: 'ISO 5832-11',
    full_name: 'Implants for surgery - Metallic materials - Part 11: Wrought titanium 6-aluminum 7-niobium alloy',
    organization: 'International Organization for Standardization',
    year_current: '2014',
    material_type: 'Titanium Alloy (Ti-6Al-7Nb)',
    key_requirements: {
      aluminum: '5.5-6.5%',
      niobium: '6.5-7.5%',
      tantalum_max: '0.50%'
    },
    body_piercing_use: 'Acceptable but uncommon',
    biocompatibility: 'Excellent - Vanadium-free',
    sterilization: 'Autoclave safe',
    related_standards: ['ASTM F1295'],
    common_uses: ['Surgical implants'],
    important_notes: 'Alternative to Ti-6Al-4V without vanadium. Rarely used in body jewelry.',
    verification_method: 'Mill certification',
    safety_rating: 'safe',
    category: 'iso'
  },

  'ISO_10993': {
    code: 'ISO 10993 series',
    full_name: 'Biological evaluation of medical devices',
    organization: 'International Organization for Standardization',
    year_current: '2018 (various parts)',
    material_type: 'Testing standard (applies to all materials)',
    key_requirements: {
      part_1: 'Evaluation and testing within a risk management process',
      part_5: 'Tests for in vitro cytotoxicity',
      part_10: 'Tests for irritation and skin sensitization',
      part_11: 'Tests for systemic toxicity'
    },
    body_piercing_use: 'Not a material - Testing methodology',
    biocompatibility: 'Defines biocompatibility testing protocols',
    sterilization: 'N/A - Testing standard',
    related_standards: ['ISO 13485', 'FDA 510(k) requirements'],
    common_uses: ['Biocompatibility testing', 'Medical device approval', 'Quality assurance'],
    important_notes: 'This is a TESTING standard, not a material certification. Materials that pass ISO 10993 testing are considered biocompatible. Look for "ISO 10993 compliant" or "ISO 10993 tested" on documentation.',
    verification_method: 'Test reports showing ISO 10993 compliance',
    safety_rating: 'safe',
    category: 'iso'
  },

  'ISO_13485': {
    code: 'ISO 13485',
    full_name: 'Medical devices - Quality management systems',
    organization: 'International Organization for Standardization',
    year_current: '2016',
    material_type: 'Quality management standard',
    key_requirements: {
      focus: 'Quality management system for medical device manufacturers',
      scope: 'Design, production, installation, servicing'
    },
    body_piercing_use: 'Not a material - Manufacturing quality standard',
    biocompatibility: 'N/A - Quality system standard',
    sterilization: 'N/A',
    related_standards: ['ISO 9001', 'ISO 10993', 'FDA QSR'],
    common_uses: ['Manufacturer certification', 'Quality assurance', 'Regulatory compliance'],
    important_notes: 'ISO 13485 certification means the MANUFACTURER has a quality management system - it does NOT certify the material itself. Good to see, but not a substitute for material certifications like ASTM F136.',
    verification_method: 'Manufacturer ISO 13485 certificate',
    safety_rating: 'safe',
    category: 'iso'
  },

  // ═══════════════════════════════════════════════════════════
  // EUROPEAN STANDARDS (EN)
  // ═══════════════════════════════════════════════════════════
  'EN_1441': {
    code: 'EN 1441',
    full_name: 'Nickel release from post assemblies which are inserted into pierced ears and other pierced parts of the human body',
    organization: 'European Committee for Standardization',
    year_current: '2016',
    material_type: 'Nickel release regulation (applies to all materials)',
    key_requirements: {
      nickel_release_limit: '0.2 μg/cm²/week for posts',
      nickel_release_coatings: '0.5 μg/cm²/week for coated items',
      testing_method: 'EN 1811 (dimethylglyoxime test)'
    },
    body_piercing_use: 'Regulatory requirement in EU',
    biocompatibility: 'Limits nickel exposure to reduce allergic reactions',
    sterilization: 'N/A - Regulatory standard',
    related_standards: ['REACH Regulation', 'EN 1811', 'EU Nickel Directive'],
    common_uses: ['EU compliance', 'Consumer protection', 'Product testing'],
    important_notes: 'MANDATORY in European Union. Products must meet nickel release limits. Even "surgical steel" containing nickel must pass this test for EU sale.',
    verification_method: 'Test reports showing EN 1441 compliance, EN 1811 test results',
    safety_rating: 'safe',
    category: 'eu'
  },

  'REACH': {
    code: 'REACH Compliance',
    full_name: 'Registration, Evaluation, Authorisation and Restriction of Chemicals',
    organization: 'European Chemicals Agency',
    year_current: '2006 (ongoing updates)',
    material_type: 'Chemical safety regulation',
    key_requirements: {
      scope: 'Restricts hazardous substances in products',
      nickel_restriction: 'Limits nickel release in jewelry',
      cadmium_ban: 'Prohibits cadmium in jewelry',
      lead_restriction: 'Limits lead content'
    },
    body_piercing_use: 'Mandatory compliance for EU market',
    biocompatibility: 'Ensures materials are free of hazardous chemicals',
    sterilization: 'N/A',
    related_standards: ['EN 1441', 'RoHS Directive'],
    common_uses: ['EU regulatory compliance', 'Product safety'],
    important_notes: 'REACH compliance is mandatory for selling body jewelry in the EU. Ensures no toxic chemicals, restricted substances, or excessive heavy metals.',
    verification_method: 'REACH compliance certificate, SVHC (Substance of Very High Concern) declaration',
    safety_rating: 'safe',
    category: 'eu'
  },

};


/**
 * Common product claims and their required certifications
 */
const rawProductClaimVerification = {
  'implant_grade_titanium': {
    claim: 'Implant Grade Titanium',
    required_certs: ['ASTM F136'],
    not_acceptable: ['ASTM B348 (industrial bar)', 'Commercial Grade Ti', 'A certificate naming no specification or heat number'],
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
  },

  'surgical_steel': {
    claim: 'Surgical Steel',
    required_certs: ['ASTM F138'],
    not_acceptable: ['316L (non-implant grade)', '304 stainless', 'Generic stainless steel'],
    red_flags: [
      '"Surgical steel" without ASTM certification',
      'No mention of 316LVM specifically',
      'Generic "stainless steel" claims',
      'Very low prices'
    ],
    verification_steps: [
      'Request mill certification showing ASTM F138',
      'Verify 316LVM (not just 316L)',
      'Check carbon content: must be ≤0.030%',
      'Confirm low nickel release for EU compliance'
    ]
  },

  'hypoallergenic': {
    claim: 'Hypoallergenic',
    required_certs: ['Material-dependent', 'Nickel-free certification', 'Biocompatibility testing'],
    not_acceptable: ['Nickel-containing materials without testing', 'Acrylic', 'Plated materials'],
    red_flags: [
      'No supporting certification',
      'Contains nickel (check composition)',
      'Plated or coated (coating can wear off)',
      'Acrylic marketed as "hypoallergenic"'
    ],
    verification_steps: [
      'Verify material is nickel-free (titanium, niobium, etc.)',
      'Request biocompatibility test results',
      'Check for EN 1441 compliance if nickel present',
      'Avoid plated materials regardless of claims'
    ]
  },

  'medical_grade': {
    claim: 'Medical Grade',
    required_certs: ['ASTM F136', 'ASTM F138', 'ISO 10993', 'ISO 13485'],
    not_acceptable: ['Commercial grade materials', 'Generic "medical grade" without specification'],
    red_flags: [
      'No specific standard cited',
      'Vague "medical grade" without documentation',
      'Cannot provide mill certification',
      'Supplier evasive about certifications'
    ],
    verification_steps: [
      'Ask: "Medical grade according to which standard?"',
      'Request specific ASTM or ISO certification',
      'Verify biocompatibility testing',
      'Check manufacturer certifications'
    ]
  }
};

/**
 * Search keywords for fuzzy matching
 */
const searchKeywords = {
  'ASTM_F136': ['f136', 'astm f136', 'titanium grade 23', 'ti6al4v eli', 'implant titanium', 'grade 23'],
  'ASTM_F138': ['f138', 'astm f138', '316lvm', 'surgical steel', 'implant steel'],
  'ASTM_F1295': ['f1295', 'astm f1295', 'ti6al7nb', 'titanium niobium'],
  'ASTM_F2229': ['f2229', 'astm f2229', 'niobium', 'niobium grade 1'],
  'ASTM_F1586': ['f1586', 'astm f1586', 'niobium alloy', 'nb1zr'],
  'ISO_5832-1': ['iso 5832-1', 'iso 5832', 'iso steel'],
  'ISO_5832-3': ['iso 5832-3', 'grade 5', 'ti6al4v', 'titanium grade 5'],
  'ISO_5832-11': ['iso 5832-11', 'ti6al7nb iso'],
  'ISO_10993': ['iso 10993', 'biocompatibility', 'biological evaluation'],
  'ISO_13485': ['iso 13485', 'quality management', 'medical device qms'],
  'EN_1441': ['en 1441', 'en1441', 'nickel release', 'nickel regulation'],
  'REACH': ['reach', 'reach compliance', 'eu chemicals']
};

// ═══════════════════════════════════════════════════════════
// TRANSLATION RESOLUTION PROXIES
// ═══════════════════════════════════════════════════════════
const TRANSLATABLE_CERT_FIELDS = [
  'code', 'full_name', 'organization', 'material_type', 'body_piercing_use',
  'biocompatibility', 'sterilization', 'important_notes', 'verification_method', 'common_uses'
];

function createCertProxy(id, staticEntry) {
  const entry = Object.assign({}, staticEntry);
  TRANSLATABLE_CERT_FIELDS.forEach(field => {
    Object.defineProperty(entry, field, {
      get() {
        if (typeof t === 'function') {
          const key = 'certs.' + id + '.' + field;
          const translated = t(key);
          if (translated && translated !== key) {
            return translated;
          }
        }
        return staticEntry[field];
      },
      enumerable: true,
      configurable: true
    });
  });
  return entry;
}

const certificationDatabase = {};
for (const [key, data] of Object.entries(rawCertificationDatabase)) {
  certificationDatabase[key] = createCertProxy(key, data);
}

const TRANSLATABLE_CLAIM_FIELDS = ['claim', 'red_flags', 'verification_steps'];

function createClaimProxy(id, staticEntry) {
  const entry = Object.assign({}, staticEntry);
  TRANSLATABLE_CLAIM_FIELDS.forEach(field => {
    Object.defineProperty(entry, field, {
      get() {
        if (typeof t === 'function') {
          const key = 'product_claims.' + id + '.' + field;
          const translated = t(key);
          if (translated && translated !== key) {
            return translated;
          }
        }
        return staticEntry[field];
      },
      enumerable: true,
      configurable: true
    });
  });
  return entry;
}

const productClaimVerification = {};
for (const [key, data] of Object.entries(rawProductClaimVerification)) {
  productClaimVerification[key] = createClaimProxy(key, data);
}

if (typeof window !== 'undefined') {
  window.certificationDatabase = certificationDatabase;
  window.rawCertificationDatabase = rawCertificationDatabase;
  window.productClaimVerification = productClaimVerification;
  window.rawProductClaimVerification = rawProductClaimVerification;
  window.searchKeywords = searchKeywords;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    certificationDatabase,
    rawCertificationDatabase,
    productClaimVerification,
    rawProductClaimVerification,
    searchKeywords
  };
}

