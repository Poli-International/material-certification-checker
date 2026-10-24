/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - MATERIAL DATABASE
Poli International
Version: 1.0
═══════════════════════════════════════════════════════════════
*/

/**
 * Complete material database with safety ratings
 */

const rawMaterialDatabase = {
  // ═══════════════════════════════════════════════════════════
  // TITANIUM
  // ═══════════════════════════════════════════════════════════
  'titanium_grade_23': {
    name: 'Titanium Grade 23 (Ti-6Al-4V ELI)',
    common_names: ['Implant Grade Titanium', 'ASTM F136', 'Grade 23', 'Ti-6Al-4V ELI'],
    required_certs: ['ASTM F136', 'ISO 5832-3 (also on the APP list; not ELI)'],
    body_safe: 'excellent',
    safety_rating: 'safe',
    biocompatibility: 'Excellent - ISO 10993 compliant',
    composition: 'Titanium alloy: Ti-6Al-4V with extra low interstitials',
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'very_low',
    suitable_for: ['initial piercings', 'healed piercings', 'sensitive skin', 'all body areas', 'long-term wear'],
    not_suitable_for: [],
    healing_stage: ['initial', 'healed'],
    color_options: ['natural grey', 'anodized colors (gold, blue, purple, etc.)'],
    cost_rating: 'moderate',
    pros: [
      'Hypoallergenic and nickel-free',
      'Lightweight and comfortable',
      'Strong and durable',
      'Can be anodized for color',
      'Excellent biocompatibility',
      'Industry gold standard'
    ],
    cons: [
      'Cannot be soldered (requires specialized welding)',
      'Limited to certain designs',
      'Slightly higher cost than steel',
      'Anodized colors can fade over time'
    ],
    verification_tips: 'Always request mill certification showing ASTM F136. Verify it says "Grade 23" or "Ti-6Al-4V ELI" - NOT "Grade 5".',
    red_flags: [
      'Unusually cheap "implant grade" titanium',
      'No mill certification provided',
      'Listed as "Grade 5" with no implant specification named (ISO 5832-3 or ASTM F1472)',
      'Generic "titanium" without grade specification',
      'Supplier refuses documentation'
    ],
    maintenance: 'Easy - wash with mild soap and water. Anodized colors are permanent but can fade with friction.',
    sterilization_methods: ['Autoclave', 'Chemical sterilization']
  },

  'titanium_grade_5': {
    name: 'Titanium Grade 5 (Ti-6Al-4V)',
    common_names: ['Grade 5', 'Ti-6Al-4V'],
    required_certs: ['ISO 5832-3', 'ASTM F1472'],
    body_safe: 'acceptable',
    safety_rating: 'conditional',
    biocompatibility: 'Specified for surgical implants; most piercing guidance names its extra-low-interstitial version, ASTM F136 (Grade 23)',
    composition: 'Titanium alloy: Ti-6Al-4V (higher oxygen content than Grade 23)',
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'low',
    suitable_for: ['initial piercings, if the certificate names ISO 5832-3 (on the APP list)', 'healed piercings'],
    not_suitable_for: ['jewellery sold as "implant grade" when you require ASTM F136'],
    healing_stage: ['initial (if certified to ISO 5832-3)', 'healed'],
    color_options: ['natural grey'],
    cost_rating: 'low',
    pros: [
      'Stronger than Grade 23',
      'Less expensive',
      'Nickel-free'
    ],
    cons: [
      'Higher oxygen content (0.20% vs 0.13%)',
      'Often misrepresented as "implant grade"',
      'Not the grade most piercing guidance names (ASTM F136)'
    ],
    verification_tips: 'Ask which specification the mill certificate names. ISO 5832-3 is on the APP list for initial jewelry, as is ASTM F136 (Grade 23, ELI), which has the lower oxygen limit. ASTM F1472 is also a surgical implant specification. ASTM B348 is an industrial bar specification with no implant requirements. "Implant grade" with no named specification proves nothing.',
    red_flags: [
      'Grade 5 marketed as "implant grade"',
      'No implant specification named on the certificate (ASTM B348 is industrial bar)',
      'Very cheap "titanium" jewelry',
      'Misleading marketing language'
    ],
    maintenance: 'Same care as other titanium jewellery: mild soap and water',
    sterilization_methods: ['Autoclave']
  },

  // ═══════════════════════════════════════════════════════════
  // SURGICAL STEEL
  // ═══════════════════════════════════════════════════════════
  'surgical_steel_316lvm': {
    name: 'Surgical Steel 316LVM',
    common_names: ['ASTM F138', '316LVM', 'Implant Grade Steel', 'Surgical Stainless Steel'],
    required_certs: ['ASTM F138', 'ISO 5832-1'],
    body_safe: 'good',
    safety_rating: 'conditional',
    biocompatibility: 'Good - Contains nickel (13-15%)',
    composition: '316L stainless steel with vacuum melting (LVM) for higher purity',
    nickel_free: false,
    autoclave_safe: true,
    allergy_risk: 'moderate',
    suitable_for: ['initial piercings (no nickel allergy; ASTM F138 is on the APP list)', 'healed piercings'],
    not_suitable_for: ['known nickel allergy', 'very sensitive skin'],
    healing_stage: ['healed', 'initial with caution'],
    color_options: ['silver/polished', 'black (PVD coating)'],
    cost_rating: 'low',
    pros: [
      'Affordable',
      'Widely available',
      'Strong and durable',
      'High polish achievable',
      'Can be autoclaved'
    ],
    cons: [
      'Contains 13-15% nickel',
      'Can cause allergic reactions',
      'Heavier than titanium',
      'Not for clients with a nickel allergy',
      'EU restrictions on nickel release'
    ],
    verification_tips: 'Must be ASTM F138 certified. Regular "316L" or generic "surgical steel" is NOT sufficient. Request mill certification showing F138 compliance and "LVM" designation.',
    red_flags: [
      'Just says "surgical steel" without ASTM F138',
      'Listed as "316L" (without LVM)',
      '304 stainless steel (completely wrong)',
      'No certification available',
      'Seller cannot explain difference between 316L and 316LVM'
    ],
    maintenance: 'Clean regularly. Can tarnish slightly. Polish with jewelry cloth.',
    sterilization_methods: ['Autoclave', 'Chemical sterilization']
  },

  'surgical_steel_316l': {
    name: 'Surgical Steel 316L (Non-implant)',
    common_names: ['316L', 'Stainless Steel', 'Surgical Steel'],
    required_certs: [],
    body_safe: 'acceptable',
    safety_rating: 'conditional',
    biocompatibility: 'Fair - Contains nickel, lower purity than 316LVM',
    composition: '316L stainless steel (NOT implant grade)',
    nickel_free: false,
    autoclave_safe: true,
    allergy_risk: 'moderate_to_high',
    suitable_for: ['healed piercings (non-sensitive)', 'fashion jewelry'],
    not_suitable_for: ['initial piercings', 'sensitive skin', 'nickel allergy', 'long-term wear'],
    healing_stage: ['healed only'],
    color_options: ['silver'],
    cost_rating: 'very_low',
    pros: [
      'Very affordable',
      'Widely available'
    ],
    cons: [
      'NOT implant grade',
      'Higher impurities than 316LVM',
      'Higher nickel release',
      'Can cause irritation',
      'Not professionally recommended'
    ],
    verification_tips: 'This is NOT the same as ASTM F138. If seller claims "surgical steel" but cannot provide F138 certification, it is likely this lower grade.',
    red_flags: [
      'Marketed as "surgical steel" without ASTM F138',
      'Very cheap pricing',
      'No certification provided',
      'Seller claims "all surgical steel is the same"'
    ],
    maintenance: 'Clean regularly. Can tarnish and corrode.',
    sterilization_methods: ['Autoclave']
  },

  // ═══════════════════════════════════════════════════════════
  // NIOBIUM
  // ═══════════════════════════════════════════════════════════
  'niobium': {
    name: 'Niobium (Pure or Alloyed)',
    common_names: ['Niobium', 'ASTM B392', 'Niobium Grade 1'],
    required_certs: ['ASTM B392 (niobium bar and wire; no implant-grade specification exists)'],
    body_safe: 'excellent',
    safety_rating: 'safe',
    biocompatibility: 'Excellent - Hypoallergenic',
    composition: 'Pure niobium (99.8%+) or niobium-zirconium alloy',
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'very_low',
    suitable_for: ['initial piercings', 'healed piercings', 'sensitive skin', 'nickel allergies', 'all body areas'],
    not_suitable_for: [],
    healing_stage: ['initial', 'healed'],
    color_options: ['natural grey', 'anodized colors (similar to titanium)'],
    cost_rating: 'moderate_to_high',
    pros: [
      'Hypoallergenic and nickel-free',
      'Softer and more malleable than titanium',
      'Can be anodized to various colors',
      'Excellent for sensitive skin',
      'Naturally tarnish-resistant'
    ],
    cons: [
      'Softer than titanium (can bend)',
      'More expensive than steel',
      'Limited availability',
      'Fewer design options'
    ],
    verification_tips: 'Ask for a mill certificate naming ASTM B392 and the niobium grade. Niobium has no implant-grade specification (APP). A niobium certificate citing ASTM F2229 or F1586 is wrong: those are stainless steel implant specifications.',
    red_flags: [
      'No certification provided',
      'Suspiciously cheap "niobium"',
      'Seller cannot provide ASTM documentation',
      'Mixed with unknown alloys'
    ],
    maintenance: 'Very low maintenance. Wash with mild soap. Anodized colors are permanent.',
    sterilization_methods: ['Autoclave', 'Chemical sterilization']
  },

  // ═══════════════════════════════════════════════════════════
  // GOLD
  // ═══════════════════════════════════════════════════════════
  'gold_14k': {
    name: '14K Gold',
    common_names: ['14 Karat Gold', '14K', '585 Gold'],
    required_certs: ['Nickel-free certification', 'Purity testing'],
    body_safe: 'good',
    safety_rating: 'conditional',
    biocompatibility: 'Good IF nickel-free',
    composition: '58.3% gold + alloys (MUST be nickel-free for body piercing)',
    nickel_free: 'Depends on the alloy. White gold is often alloyed with nickel. Ask for the alloy composition or an assay.',
    autoclave_safe: true,
    allergy_risk: 'low_if_nickel_free',
    suitable_for: ['healed piercings', 'initial piercings (if nickel-free)', 'long-term wear'],
    not_suitable_for: ['nickel-containing gold', 'white gold with nickel'],
    healing_stage: ['initial (if nickel-free)', 'healed'],
    color_options: ['yellow', 'white (nickel-free only)', 'rose/pink'],
    cost_rating: 'high',
    pros: [
      'Luxurious appearance',
      'Does not tarnish',
      'Biocompatible when nickel-free',
      'Long-lasting',
      'Traditional choice'
    ],
    cons: [
      'Expensive',
      'Must verify nickel-free',
      'White gold often contains nickel',
      'Softer than titanium/steel',
      'Can scratch easily'
    ],
    verification_tips: 'CRITICAL: Verify nickel-free certification. White gold commonly contains nickel as whitening agent - avoid unless certified nickel-free. Request alloy composition.',
    red_flags: [
      'White gold without nickel-free certification',
      'Generic "14K gold" without composition details',
      'Seller cannot verify alloy content',
      'Suspiciously low price for "gold"',
      'Plated gold (NOT solid gold)'
    ],
    maintenance: 'Clean with jewelry cleaner. Polish regularly. Avoid harsh chemicals.',
    sterilization_methods: ['Autoclave', 'Chemical sterilization']
  },

  'gold_18k': {
    name: '18K Gold',
    common_names: ['18 Karat Gold', '18K', '750 Gold'],
    required_certs: ['Nickel-free certification', 'Purity testing'],
    body_safe: 'excellent',
    safety_rating: 'conditional',
    biocompatibility: 'Excellent IF nickel-free',
    composition: '75% gold + alloys (MUST be nickel-free)',
    nickel_free: 'Depends on the alloy. White gold is often alloyed with nickel. Ask for the alloy composition or an assay.',
    autoclave_safe: true,
    allergy_risk: 'very_low_if_nickel_free',
    suitable_for: ['initial piercings (if nickel-free)', 'healed piercings', 'sensitive skin', 'long-term wear'],
    not_suitable_for: ['nickel-containing gold'],
    healing_stage: ['initial (if nickel-free)', 'healed'],
    color_options: ['yellow', 'white (nickel-free only)', 'rose/pink'],
    cost_rating: 'very_high',
    pros: [
      'Higher gold content (75%)',
      'Richer yellow color than 14K',
      'Luxurious appearance',
      'Does not tarnish',
      'Hypoallergenic when nickel-free'
    ],
    cons: [
      'Very expensive',
      'Must verify nickel-free',
      'Softer than 14K',
      'Limited design options',
      'Can dent or scratch'
    ],
    verification_tips: 'Same as 14K: verify it is solid (not plated or filled) and nickel- and cadmium-free. The APP accepts 14K and above for initial piercings; gold above 18K is too soft for body jewelry.',
    red_flags: [
      'White gold without nickel-free proof',
      'No hallmark or purity stamp',
      'Seller cannot verify composition',
      'Plated or filled (not solid)'
    ],
    maintenance: 'Clean with jewelry cleaner. Very soft - handle carefully.',
    sterilization_methods: ['Autoclave', 'Chemical sterilization']
  },

  // ═══════════════════════════════════════════════════════════
  // OTHER MATERIALS
  // ═══════════════════════════════════════════════════════════
  // BioFlex® body jewelry (medical-grade PP-R random copolymer)
  // ═══════════════════════════════════════════════════════════
  'bioflex': {
    name: "BioFlex® body jewelry",
    common_names: ["BioFlex® body jewelry", "Flexible body jewelry"],
    required_certs: ["USP Class VI (resin)", "Ph. Eur. 3.2.2", "ISO 10993 biological tests"],
    body_safe: 'excellent',
    safety_rating: 'safe',
    biocompatibility: "Excellent: resin holds USP Class VI and meets Ph. Eur. 3.2.2; certified as passing the ISO 10993 biological tests",
    composition: "Medical-grade PP-R random copolymer with an internal lubricant for low surface friction; made in one piece, with no joints or glued parts, even with a jewel",
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'very_low',
    suitable_for: ["initial piercings", "healed piercings", "oral piercings", "pregnancy retainers", "sensitive skin", "retainers", "MRI and X-ray: no metal, not magnetic (tell the radiology staff)"],
    not_suitable_for: [],
    healing_stage: ['initial', 'healed'],
    color_options: ["clear (high transparency)", "various colors"],
    cost_rating: 'moderate',
    pros: ["Resin holds USP Class VI; meets Ph. Eur. 3.2.2", "Certified as passing the ISO 10993 biological tests", "An FDA Drug Master File exists for the material", "Sterilisable by autoclave, ethylene oxide or chemical sterilisation", "Flexible: follows a growing belly without pulling", "Much gentler on teeth and gums than metal", "Contains no metal and is not magnetic", "Excellent chemical resistance", "Can be cut to size", "High transparency", "Made in one piece, with no joints or glued parts"],
    cons: ["More expensive than generic plastic", "The certificates cover genuine BioFlex® body jewelry only", "Not as rigid as metal jewelry"],
    verification_tips: "Ask for the compliance documents (USP Class VI, Ph. Eur. 3.2.2, ISO 10993 biological tests). The BioFlex® body jewelry Compliance Data Sheets can be downloaded: poliinternational.com/downloads/BioFlex-Compliance-Data-Sheets.pdf",
    red_flags: ["Generic \"flexible jewelry\" without certificates", "Seller cannot provide the compliance documents", "Suspiciously cheap \"BioFlex\" copies", "Labeled \"BioFlex-style\" instead of genuine BioFlex® body jewelry"],
    maintenance: 'Can be autoclaved. Clean with mild soap and water. Replace if damaged or discolored.',
    sterilization_methods: ['Autoclave (steam)', 'Ethylene oxide', 'Chemical sterilization']
  },

  // ═══════════════════════════════════════════════════════════
  // BIOPLAST (PP-R, same source material as BioFlex®, different grade)
  // ═══════════════════════════════════════════════════════════
  'bioplast': {
    name: "Bioplast",
    common_names: ["Bioplast", "Bio-plast", "Flexible body jewelry"],
    required_certs: ["Ph. Eur. 3.2.2", "Manufacturer compliance documents"],
    body_safe: 'excellent',
    safety_rating: 'safe',
    biocompatibility: "Same source material as BioFlex® body jewelry, in a different grade; follows Ph. Eur. 3.2.2",
    composition: "PP-R random copolymer, a different grade from BioFlex® body jewelry (same source material)",
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'very_low',
    suitable_for: ["initial piercings", "healed piercings", "pregnancy retainers", "sensitive skin", "retainers", "MRI and X-ray: no metal, not magnetic (tell the radiology staff)"],
    not_suitable_for: [],
    healing_stage: ['initial', 'healed'],
    color_options: ["translucent", "various colors"],
    cost_rating: 'moderate',
    pros: ["Follows Ph. Eur. 3.2.2", "An FDA Drug Master File exists for the material", "Sterilisable by autoclave, ethylene oxide or chemical sterilisation", "Flexible and comfortable", "Contains no metal and is not magnetic", "Excellent chemical resistance", "Can be cut to size"],
    cons: ["Translucent (not as clear as BioFlex® body jewelry)", "More expensive than generic plastic", "Not as rigid as metal jewelry"],
    verification_tips: "Ask the manufacturer for its compliance documents. Bioplast is a different grade from BioFlex® body jewelry (translucent rather than highly transparent).",
    red_flags: ["Generic \"flexible jewelry\" without certificates", "Seller cannot provide the compliance documents", "Labeled \"Bioplast-style\" instead of genuine Bioplast"],
    maintenance: 'Can be autoclaved. Clean with mild soap and water. Replace if damaged or discolored.',
    sterilization_methods: ['Autoclave (steam)', 'Ethylene oxide', 'Chemical sterilization']
  },

  // ═══════════════════════════════════════════════════════════
  // PTFE (Polytetrafluoroethylene)
  // ═══════════════════════════════════════════════════════════
  'ptfe': {
    name: 'PTFE (Polytetrafluoroethylene)',
    common_names: ['PTFE', 'Teflon', 'Medical-Grade PTFE', 'Flexible Retainer'],
    required_certs: ['Medical-grade PTFE specification', 'Biocompatibility testing (if available)'],
    body_safe: 'excellent',
    safety_rating: 'safe',
    biocompatibility: 'Excellent - Biocompatible and inert, widely used in medical implants',
    composition: 'Polytetrafluoroethylene (PTFE) - inert fluoropolymer',
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'very_low',
    suitable_for: ['initial piercings', 'healed piercings', 'pregnancy', 'medical procedures (MRI, X-ray)', 'sensitive skin', 'retainers', 'non-load bearing applications'],
    not_suitable_for: [],
    healing_stage: ['initial', 'healed'],
    color_options: ['white/translucent', 'colored (dyed)'],
    cost_rating: 'low',
    pros: [
      'Biocompatible and inert',
      'Used in medical implants (for example expanded-PTFE vascular grafts)',
      'Autoclavable',
      'Gamma irradiation sterilizable',
      'Ethylene oxide sterilizable',
      'Extremely flexible',
      'MRI/X-ray safe',
      'Non-magnetic',
      'Chemically resistant',
      'Lightweight',
      'Can be cut to size',
      'Affordable'
    ],
    cons: [
      'Must be medical-grade (not industrial-grade)',
      'Industrial PTFE can harbor bacteria',
      'DuPont disclaims medical use (body jewelry is cosmetic use, widely tolerated)',
      'Not as strong as metal',
      'Can discolor over time'
    ],
    verification_tips: 'MUST be medical-grade PTFE, not industrial-grade. Medical-grade PTFE is biocompatible and safe for body jewelry. Industrial-grade PTFE is NOT suitable. PTFE has been used in medical implants for decades.',
    red_flags: [
      'Industrial-grade PTFE (not medical-grade)',
      'Discolored or degraded PTFE',
      'Extremely cheap "PTFE" without specification',
      'Seller cannot confirm medical-grade status'
    ],
    maintenance: 'Autoclavable. Clean with mild soap and water. Replace if discolored or damaged. Medical-grade PTFE is very stable.',
    sterilization_methods: ['Autoclave', 'Gamma irradiation', 'Ethylene oxide']
  },

  'glass': {
    name: 'Glass (Borosilicate)',
    common_names: ['Pyrex Glass', 'Borosilicate Glass', 'Glass Plugs'],
    required_certs: ['Lead-free certification', 'Borosilicate specification'],
    body_safe: 'excellent',
    safety_rating: 'safe',
    biocompatibility: 'Excellent',
    composition: 'Borosilicate glass (low thermal expansion)',
    nickel_free: true,
    autoclave_safe: true,
    allergy_risk: 'very_low',
    suitable_for: ['initial piercings', 'stretched piercings', 'healed piercings', 'sensitive skin'],
    not_suitable_for: ['high-impact areas', 'active lifestyles (can break)'],
    healing_stage: ['initial', 'healed'],
    color_options: ['clear', 'colored', 'swirled', 'artistic designs'],
    cost_rating: 'moderate',
    pros: [
      'Hypoallergenic',
      'Non-porous and easy to clean',
      'Can be autoclaved',
      'Beautiful aesthetic options',
      'No metal allergies'
    ],
    cons: [
      'Can break if dropped',
      'Heavy (for large sizes)',
      'Limited threading options',
      'Must be lead-free'
    ],
    verification_tips: 'Verify the glass is lead-free: fused quartz, borosilicate or soda-lime (all three are on the APP list). Check for cracks or chips before use.',
    red_flags: [
      'Contains lead (some decorative glass)',
      'Cracked or chipped glass',
      'Glass of unknown type, or with surface paint',
      'Extremely cheap glass (quality concerns)'
    ],
    maintenance: 'Easy to clean. Inspect for damage regularly. Autoclave safe.',
    sterilization_methods: ['Autoclave', 'Chemical sterilization']
  },

  'stone': {
    name: 'Natural Stone',
    common_names: ['Stone Plugs', 'Semi-precious Stone', 'Gemstone'],
    required_certs: [],
    body_safe: 'acceptable',
    safety_rating: 'conditional',
    biocompatibility: 'Varies by stone type',
    composition: 'Natural mineral stone',
    nickel_free: true,
    autoclave_safe: false,
    allergy_risk: 'low_to_moderate',
    suitable_for: ['healed stretched piercings', 'short-term wear'],
    not_suitable_for: ['initial piercings', 'unhealed piercings', 'overnight wear'],
    healing_stage: ['healed only'],
    color_options: ['varies by stone type'],
    cost_rating: 'moderate_to_high',
    pros: [
      'Natural and beautiful',
      'Unique patterns',
      'Comfortable when polished',
      'Wide variety of types'
    ],
    cons: [
      'Porous (can harbor bacteria)',
      'Cannot be autoclaved',
      'Some stones are toxic when worn',
      'Can crack or chip',
      'Not for initial piercings'
    ],
    verification_tips: 'Only for healed piercings. Research specific stone type - some are unsafe (malachite, azurite contain toxins). Must be highly polished.',
    red_flags: [
      'Porous or rough surface',
      'Toxic stone types (malachite, azurite, etc.)',
      'Used in unhealed piercings',
      'Cracked or damaged stone'
    ],
    maintenance: 'Clean with mild soap only. Cannot be sterilized. Replace if damaged.',
    sterilization_methods: ['Surface cleaning only']
  },

  'wood': {
    name: 'Wood / Organic Materials',
    common_names: ['Wood Plugs', 'Organic Jewelry', 'Bamboo', 'Teak'],
    required_certs: [],
    body_safe: 'acceptable',
    safety_rating: 'conditional',
    biocompatibility: 'Varies - some woods are toxic',
    composition: 'Natural wood or organic plant material',
    nickel_free: true,
    autoclave_safe: false,
    allergy_risk: 'low_to_moderate',
    suitable_for: ['healed stretched piercings only', 'short-term wear'],
    not_suitable_for: ['initial piercings', 'unhealed piercings', 'wet environments', 'overnight wear'],
    healing_stage: ['healed only'],
    color_options: ['natural wood tones', 'dyed'],
    cost_rating: 'low_to_moderate',
    pros: [
      'Lightweight',
      'Natural appearance',
      'Comfortable',
      'Affordable'
    ],
    cons: [
      'Very porous (bacteria risk)',
      'Cannot be sterilized',
      'Swells when wet',
      'Some woods are toxic',
      'Short lifespan',
      'Not for initial piercings'
    ],
    verification_tips: 'ONLY for fully healed, stretched piercings. Avoid toxic woods (rosewood, cocobolo, ebony). Must be sealed and polished. Remove when showering.',
    red_flags: [
      'Unsealed or rough wood',
      'Toxic wood species',
      'Used in unhealed piercings',
      'Swollen or damaged wood',
      'Seller recommends for healing'
    ],
    maintenance: 'Oil regularly with jojoba oil. Never wear in water. Replace every few months.',
    sterilization_methods: []
  },

  'acrylic': {
    name: 'Acrylic / Plastic',
    common_names: ['Acrylic', 'Plastic', 'Lucite', 'Resin'],
    required_certs: [],
    body_safe: 'not_recommended',
    safety_rating: 'unsafe',
    biocompatibility: 'Poor - can leach chemicals',
    composition: 'Polymethyl methacrylate (PMMA) or similar plastics',
    nickel_free: true,
    autoclave_safe: false,
    allergy_risk: 'high',
    suitable_for: [],
    not_suitable_for: ['initial piercings', 'healing piercings', 'long-term wear', 'body piercing in general'],
    healing_stage: [],
    color_options: ['all colors available'],
    cost_rating: 'very_low',
    pros: [
      'Very cheap',
      'Lightweight',
      'Colorful options'
    ],
    cons: [
      'NOT SAFE for body piercing',
      'Cannot be sterilized',
      'Porous and harbors bacteria',
      'Can leach toxic chemicals',
      'Causes irritation',
      'NOT professionally recommended'
    ],
    verification_tips: 'DO NOT USE for body piercing. This is fashion jewelry only.',
    red_flags: [
      'Any acrylic marketed for body piercing',
      'Seller claims "safe" or "hypoallergenic"',
      'Used in initial piercings (dangerous)',
      'Marketed to young people as "affordable option"'
    ],
    maintenance: 'N/A - not for body piercing',
    sterilization_methods: []
  }
};

/**
 * Material comparison classification families
 */
const materialCategories = {
  metals: ['titanium_grade_23', 'titanium_grade_5', 'surgical_steel_316lvm', 'surgical_steel_316l', 'niobium', 'gold_14k', 'gold_18k'],
  polymers_glass: ['bioflex', 'bioplast', 'ptfe', 'glass'],
  organics_minerals: ['stone', 'wood', 'acrylic'],
  initial_safe: ['titanium_grade_23', 'surgical_steel_316lvm', 'niobium', 'gold_14k', 'gold_18k', 'glass', 'bioflex', 'bioplast', 'ptfe'],
  healed_only: ['surgical_steel_316l', 'stone', 'wood', 'acrylic'],
  nickel_free: ['titanium_grade_23', 'titanium_grade_5', 'niobium', 'glass', 'stone', 'wood', 'bioflex', 'bioplast', 'ptfe', 'acrylic']
};

const materialClassificationGroups = {
  'metals': {
    id: 'metals',
    nameKey: 'comparison.category_metals',
    defaultName: 'Metallic Materials & Alloys (ASTM / ISO Standards)',
    materials: ['titanium_grade_23', 'titanium_grade_5', 'surgical_steel_316lvm', 'surgical_steel_316l', 'niobium', 'gold_14k', 'gold_18k']
  },
  'polymers_glass': {
    id: 'polymers_glass',
    nameKey: 'comparison.category_polymers_glass',
    defaultName: 'Biocompatible Polymers & Glass',
    materials: ['bioflex', 'bioplast', 'ptfe', 'glass']
  },
  'organics_minerals': {
    id: 'organics_minerals',
    nameKey: 'comparison.category_organics_minerals',
    defaultName: 'Organics, Minerals & Plastics (Healed / Stretched Only)',
    materials: ['stone', 'wood', 'acrylic']
  }
};

function getMaterialCategoryKey(materialKey) {
  if (!materialKey) return null;
  for (const [catKey, group] of Object.entries(materialClassificationGroups)) {
    if (group.materials.includes(materialKey)) {
      return catKey;
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
// TRANSLATION RESOLUTION PROXY
// ═══════════════════════════════════════════════════════════
const TRANSLATABLE_MATERIAL_FIELDS = [
  'name', 'biocompatibility', 'composition', 'verification_tips',
  'maintenance', 'common_names', 'suitable_for', 'not_suitable_for',
  'color_options', 'pros', 'cons', 'red_flags', 'sterilization_methods'
];

function createMaterialProxy(id, staticEntry) {
  const entry = Object.assign({}, staticEntry);
  TRANSLATABLE_MATERIAL_FIELDS.forEach(field => {
    Object.defineProperty(entry, field, {
      get() {
        if (typeof t === 'function') {
          const key = 'materials.' + id + '.' + field;
          const translated = t(key);
          if (translated && translated !== key) {
            // Some locales give a list field (suitable_for, pros...) as one sentence;
            // callers .map() these, so a bare string crashed the material result.
            return Array.isArray(staticEntry[field]) && !Array.isArray(translated) ? [translated] : translated;
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

const materialDatabase = {};
for (const [key, data] of Object.entries(rawMaterialDatabase)) {
  materialDatabase[key] = createMaterialProxy(key, data);
}

if (typeof window !== 'undefined') {
  window.materialDatabase = materialDatabase;
  window.rawMaterialDatabase = rawMaterialDatabase;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    materialDatabase,
    rawMaterialDatabase,
    materialClassificationGroups,
    getMaterialCategoryKey
  };
}

