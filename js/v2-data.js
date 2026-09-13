/**
 * ═══════════════════════════════════════════════════════════════
 * MATERIAL CERTIFICATION CHECKER V2 - COMPLIANCE DATA
 * Poli International - Studio Compliance Toolkit
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// 1. CERTIFICATE READER PRESETS & PARSER RULES
// ═══════════════════════════════════════════════════════════════

const CERT_READER_PRESETS = [
  {
    id: 'implant_titanium_claim',
    name: "Marketing Claim: 'Implant Grade Titanium'",
    tag: 'Marketing Phrase',
    tier: 0,
    text: "High polish implant grade titanium body jewelry bar. 100% biocompatible, hypoallergenic, nickel free for fresh piercings."
  },
  {
    id: 'surgical_steel_claim',
    name: "Marketing Claim: '316L Surgical Steel'",
    tag: 'Commercial Steel',
    tier: 0,
    text: "High grade 316L surgical stainless steel barbell. Mirror finish, rust-proof, hypoallergenic for sensitive ears."
  },
  {
    id: 'f136_full_cert',
    name: 'Documented MTR: ASTM F136 + Heat #',
    tag: 'Verified Standard',
    tier: 3,
    text: "Material: ASTM F136 (Ti-6Al-4V ELI)\nHeat Number: HT-84920-A\nMill: Baoji Titanium Industry Co.\nChemical Analysis: Ti Balance, Al 6.12%, V 4.05%, Fe 0.16%, O 0.11%, C 0.02%, N 0.01%, H 0.003%\nTensile: 920 MPa, Yield: 845 MPa, Elongation: 14%\nCondition: Annealed, Centerless ground, Mirror polish Ra < 0.05 um"
  },
  {
    id: 'f138_full_cert',
    name: 'Documented MTR: ASTM F138 (316LVM)',
    tag: 'Verified Standard',
    tier: 3,
    text: "Specification: ASTM F138 (Grade 2 Bar / Wire for Surgical Implants)\nAlloy: 316LVM (Vacuum Arc Remelted)\nHeat No: 67391-B\nCarbon: 0.021% (max 0.030%)\nChromium: 17.8%, Nickel: 14.1%, Molybdenum: 2.74%\nCondition: Annealed passivated, Electro-polished"
  },
  {
    id: 'bioflex_polymer',
    name: 'Polymer Claim: BioFlex® USP Class VI',
    tag: 'Medical Polymer',
    tier: 2,
    text: "BioFlex® body jewelry medical polymer shaft. Tested according to USP Class VI biological reactivity and ISO 10993-5 in vitro cytotoxicity. Steam autoclave safe to 121°C."
  },
  {
    id: 'ambiguous_g23',
    name: "Ambiguous Shorthand: 'Titanium G23'",
    tag: 'Ambiguous Notation',
    tier: 1,
    text: "Material: Titanium G23. High grade piercing jewelry. Suitable for initial piercing. Made in China."
  },
  {
    id: 'grade5_aerospace',
    name: "Not F136: 'Grade 5 Titanium (Ti-6Al-4V)'",
    tag: 'Not ELI',
    tier: 1,
    text: "Grade 5 Titanium (Ti-6Al-4V) piercing ball. ISO 5832-3 compliant. Ultra strong aerospace alloy. High tensile strength."
  },
  {
    id: 'acrylic_plastic',
    name: "Non-Implantable: 'Acrylic Taper'",
    tag: 'Non-Implantable',
    tier: 0,
    text: "Neon acrylic ear gauge taper. High density PMMA plastic, smooth surface, lightweight. Not for initial stretching."
  }
];

// ═══════════════════════════════════════════════════════════════
// 2. SUPPLIER QUESTION TEMPLATES (Organized by Material & Use)
// ═══════════════════════════════════════════════════════════════

const SUPPLIER_QUESTIONS_CONFIG = {
  materials: {
    astm_f136: {
      name: 'Titanium Grade 23 (ASTM F136 / Ti-6Al-4V ELI)',
      standard_code: 'ASTM F136',
      questions: [
        {
          q: 'Can you provide the original Mill Test Report (MTR / Mill Certificate) for the raw bar stock from which this specific production lot was machined?',
          satisfactory: 'Unedited copy of the raw material test report from an accredited melting mill (e.g., Baoji Titanium, Perryman, Carpenter) displaying ASTM F136 compliance and mechanical test values.',
          unsatisfactory: 'A distributor letter of conformity (CoC), a generic RoHS/REACH declaration, a verbal statement, or a refusal claiming the MTR is proprietary.'
        },
        {
          q: 'Does the Mill Test Report explicitly state "ELI" (Extra Low Interstitial) and verify oxygen content ≤ 0.13% and iron ≤ 0.25%?',
          satisfactory: 'Chemical breakdown table listing exact weight percentages with Oxygen (O) strictly ≤ 0.13% and Iron (Fe) ≤ 0.25%.',
          unsatisfactory: 'Listing as "Ti-6Al-4V" without ELI designation, or oxygen content above 0.13% (which indicates Grade 5 under ISO 5832-3 or ASTM F1472, not ELI Grade 23).'
        },
        {
          q: 'What is the unique Heat Number / Melt Lot Number on this material, and how does it correlate with the batch label on our shipment?',
          satisfactory: 'A clear Heat Number (e.g. HT-84920) printed on the packaging or invoice that matches the Heat Number on the attached MTR.',
          unsatisfactory: 'No heat number provided, or an internal SKU number substituted for metallurgical melt lot traceability.'
        },
        {
          q: 'What surface finishing protocol is applied to tissue-contact surfaces, and has the surface roughness been verified to Ra < 0.05 µm (mirror finish)?',
          satisfactory: 'Confirmation of passivated mirror mechanical or electropolish with Ra surface roughness inspection report showing no tooling marks or microscopic pits under magnification.',
          unsatisfactory: '"Standard tumble polish" without roughness verification, visible tool ridges, or matte cast finishes on wearable surfaces.'
        },
        {
          q: 'Are all threaded posts designed with internal threading or threadless press-fit construction (no exposed external male threads on the wearable shaft)?',
          satisfactory: 'Affirmation that no external threads pass through the tissue fistula; all wearable shafts are smooth with internal female tapping or threadless pins.',
          unsatisfactory: 'External threading on the wearable post that lacerates the healing wound canal during insertion.'
        }
      ]
    },
    astm_f138: {
      name: 'Surgical Stainless Steel (ASTM F138 / 316LVM)',
      standard_code: 'ASTM F138',
      questions: [
        {
          q: 'Can you provide the Mill Test Report (MTR) confirming compliance specifically with ASTM F138 (or ISO 5832-1) for surgical implant bar and wire?',
          satisfactory: 'Mill certificate citing ASTM F138 Grade 2. Must state vacuum arc remelting (316LVM) and carbon content ≤ 0.030%.',
          unsatisfactory: 'A certificate citing only commercial ASTM A276 or generic "AISI 316L". Commercial 316L is air-melted and does not meet ASTM F138 surgical implant standards.'
        },
        {
          q: 'Does the chemical analysis confirm carbon content ≤ 0.030% and sulfur content ≤ 0.010%?',
          satisfactory: 'Chemical report showing low carbon (C ≤ 0.030%) to prevent carbide precipitation and ultra-low sulfur (S ≤ 0.010%) to prevent pitting corrosion.',
          unsatisfactory: 'Carbon levels > 0.030% or sulfur levels not tested/exceeding medical thresholds.'
        },
        {
          q: 'Was the steel vacuum melted (Vacuum Induction Melted + Vacuum Arc Remelted - VIM/VAR)?',
          satisfactory: 'Specification of electro-slag remelt (ESR) or vacuum arc remelt (VAR) ensuring low inclusion content and high metallurgical purity.',
          unsatisfactory: 'Standard electric-arc air melt without secondary consumable electrode remelting.'
        },
        {
          q: 'What is the unique Heat Number tying this shipment directly to the mill analysis?',
          satisfactory: 'Heat number marked on parcel and matching the test certificate exactly.',
          unsatisfactory: 'Generic certificate with heat number erased or omitted.'
        }
      ]
    },
    bioflex_polymer: {
      name: 'Medical-Grade Polymer (BioFlex® body jewelry / PP-R)',
      standard_code: 'USP Class VI / ISO 10993',
      questions: [
        {
          q: 'Can you provide biological reactivity test reports certifying the raw polymer meets USP Class VI requirements (70°C and 121°C systemic injection, intracutaneous, and implantation tests)?',
          satisfactory: 'Accredited testing laboratory certificate confirming USP Class VI compliance for the medical polymer formulation (medical-grade PP-R).',
          unsatisfactory: 'Generic "food grade" or "FDA compliant" statement. Food-contact approval does not substantiate parenteral wound contact.'
        },
        {
          q: 'Has the material undergone in vitro cytotoxicity testing per ISO 10993-5 and dermal sensitisation testing per ISO 10993-10?',
          satisfactory: 'Laboratory test summary showing non-cytotoxic score (grade 0/1) and zero dermal sensitization.',
          unsatisfactory: 'No biocompatibility test data; relying solely on marketing names.'
        },
        {
          q: 'Is the material steam autoclave sterilizable, and what is the maximum temperature/cycle duration validated?',
          satisfactory: 'Clear validation for steam autoclave cycles (e.g., 121°C / 250°F for 20 minutes) without thermal degradation or toxic volatile release.',
          unsatisfactory: '"Do not autoclave", or plastics that melt/warp at autoclave temperatures (like commercial acrylic or PVC).'
        },
        {
          q: 'Is the polymer formulated without plasticizers (such as phthalates), bisphenol-A (BPA), and heavy-metal colorants?',
          satisfactory: 'Material safety formulation sheet confirming 100% absence of phthalates, BPA, and toxic stabilizers.',
          unsatisfactory: 'Flexible vinyl/PVC containing migration plasticizers or unverified colored masterbatch.'
        }
      ]
    },
    niobium: {
      name: 'Niobium (ASTM F2229 / 99.9% Pure)',
      standard_code: 'ASTM F2229',
      questions: [
        {
          q: 'Can you provide a Mill Test Report confirming unalloyed niobium compliance with ASTM F2229 (or commercially pure Nb ≥ 99.9%)?',
          satisfactory: 'MTR showing pure niobium assay (minimum 99.85% to 99.9% Nb) with low interstitials (Ta ≤ 0.3%, O ≤ 0.04%).',
          unsatisfactory: 'Plated base metals or alloys with unverified composition.'
        },
        {
          q: 'Is the item solid niobium throughout, free of surface plating, electro-cladding, or base metal cores?',
          satisfactory: 'Verification of 100% solid wrought niobium metal throughout the entire cross-section.',
          unsatisfactory: 'Niobium-plated brass or steel.'
        },
        {
          q: 'If colored, is the color produced exclusively through anodization (controlled surface oxide layer) rather than chemical dyes or lacquers?',
          satisfactory: 'Confirmation that coloring is 100% electrolytic interference oxidation with zero pigments, dyes, or polymers added.',
          unsatisfactory: 'Enamel paint, lacquer coating, or chemical immersion colorants.'
        }
      ]
    },
    borosilicate_glass: {
      name: 'Borosilicate Glass (Pyrex / Simax / Borosilicate 3.3)',
      standard_code: 'ISO 3585 / ASTM E438',
      questions: [
        {
          q: 'Can you verify that the jewelry is manufactured from solid, lead-free borosilicate glass (Borosilicate 3.3 per ISO 3585)?',
          satisfactory: 'Manufacturer statement confirming solid borosilicate glass 3.3 composition, 100% free of lead, arsenic, and cadmium fluxes.',
          unsatisfactory: 'Soft soda-lime craft glass, lead crystal, or glass with surface enamel paint.'
        },
        {
          q: 'Has the finished piece undergone thorough furnace annealing to eliminate internal thermal stress?',
          satisfactory: 'Inspection confirmation under a polariscope showing zero birefringence/stress fractures from the annealing cycle.',
          unsatisfactory: 'Unannealed flame-worked glass susceptible to spontaneous thermal shock cracking.'
        },
        {
          q: 'Is the wearable surface fire-polished to a completely smooth, pore-free finish without micro-abrasions?',
          satisfactory: 'Verification of flawless fire polish on all wearable surfaces.',
          unsatisfactory: 'Cold-ground or unpolished ends.'
        }
      ]
    },
    gold_solid: {
      name: 'Solid 14K / 18K Gold',
      standard_code: 'Alloy Assay / Chemical Analysis',
      questions: [
        {
          q: 'Can you provide an alloy assay breakdown proving the gold is solid 14 Karat (58.3% Au) or 18 Karat (75.0% Au), and 100% free of nickel, cadmium, and lead?',
          satisfactory: 'Assay sheet verifying karat weight with copper, silver, and zinc alloying elements only; nickel content undetectable (< 0.01%).',
          unsatisfactory: 'White gold alloyed with nickel (common in commercial jewelry), rolled gold, gold-filled, or vermeil/plated items.'
        },
        {
          q: 'Is the jewelry solid gold throughout, with zero electroplating, hollow cavities, or base metal cores?',
          satisfactory: 'Confirmation of solid cast or wrought gold construction.',
          unsatisfactory: 'Electroplated over brass or silver, hollow-tube construction with porous seams.'
        },
        {
          q: 'Are solder joints (if any) made exclusively with cadmium-free and nickel-free plumb gold solder?',
          satisfactory: 'Certification that all solder joins are biocompatible plumb solder matching the karat rating.',
          unsatisfactory: 'Low-karat easy solder containing cadmium or nickel fluxes.'
        }
      ]
    },
    commercial_316l: {
      name: 'Commercial 316L / Grade 5 Titanium (Unverified for Initial Piercing)',
      standard_code: 'Commercial Specification',
      questions: [
        {
          q: 'Does this material carry surgical implant certification (ASTM F136 or ASTM F138), or is it commercial industrial grade?',
          satisfactory: 'Full disclosure of whether the material meets implant ASTM standards or is commercial industrial stock.',
          unsatisfactory: 'Misrepresenting commercial 316L or Grade 5 as "implant grade" without ASTM F136/F138 documentation.'
        },
        {
          q: 'If sold for body piercing, does the supplier restrict its recommended use to fully healed fistulas rather than initial piercings?',
          satisfactory: 'Clear guideline acknowledging commercial materials are not recommended by professional standards for initial wound channels.',
          unsatisfactory: 'Recommending commercial-grade metals for fresh open wounds.'
        }
      ]
    }
  },
  uses: {
    initial_piercing: {
      name: 'Initial Piercing (Fresh Wound Canal)',
      tissue_context: 'Parenteral open wound; material sits in direct contact with bleeding tissue, cellular exudate, and developing granulation tissue. High risk of systemic ion absorption and allergic sensitization.',
      critical_requirements: [
        'Mandatory raw material Mill Test Report with Melt Heat Number',
        'Proven biocompatibility (ISO 10993-5 cytotoxicity grade 0)',
        'Validated autoclave sterilization tolerance (134°C steam)',
        'Internal threading or threadless press-fit only',
        'Mirror polish Ra < 0.05 µm with zero tooling ridges'
      ]
    },
    healed_piercing: {
      name: 'Healed Piercing (Intact Epithelial Fistula)',
      tissue_context: 'Fully healed tissue canal lined with stratified squamous epithelium. Barrier function is established, but prolonged skin contact still requires non-toxic, non-irritating materials.',
      critical_requirements: [
        'Corrosion resistance against sweat and sebum',
        'Absence of toxic heavy metals (lead, cadmium)',
        'Safe mechanical finish without sharp edges',
        'Stable inert composition'
      ]
    },
    sensitive_client: {
      name: 'Sensitive Skin / Suspected Nickel Allergy',
      tissue_context: 'Client with known hypersensitivity to nickel, chrome, or generic alloy impurities. Requires strict zero-nickel materials to prevent contact dermatitis.',
      critical_requirements: [
        'Zero nickel content: ASTM F136 Titanium, ASTM F2229 Niobium, or USP Class VI PP-R',
        'Avoid all 316L/316LVM steel (which contains 13-15% bound nickel)',
        'Avoid white gold unless alloyed exclusively with palladium',
        'Verification of clean uncross-contaminated manufacturing tools'
      ]
    },
    oral_mucosal: {
      name: 'Oral / Mucosal Piercing (Tongue, Lip, Cheeks)',
      tissue_context: 'Constant exposure to saliva, fluctuating pH, oral enzymes, and continuous dental contact. Abrasion and erosion risk to tooth enamel.',
      critical_requirements: [
        'High corrosion resistance in moist, warm, acidic oral environment',
        'Biocompatible polymer options (BioFlex®) to reduce dental enamel wear',
        'Zero leaching of plasticizers or monomers into oral cavity',
        'Autoclave sterility prior to initial insertion'
      ]
    },
    subdermal_surface: {
      name: 'Surface Piercing / Subdermal Dermal Anchor',
      tissue_context: 'Permanent subdermal implant where anchor base resides within subcutaneous tissue. Highest mechanical shear stress and cellular adhesion requirement.',
      critical_requirements: [
        'Strict ASTM F136 Ti-6Al-4V ELI titanium only',
        'Full MTR with traceable melt heat lot number mandatory',
        'Perforated anchor base allowing tissue integration',
        'No steel, no plated metals, no unverified polymers'
      ]
    }
  }
};

// ═══════════════════════════════════════════════════════════
// 3. CLAIM-TO-EVIDENCE MATRIX
// ═══════════════════════════════════════════════════════════

const CLAIM_MATRIX_DATA = [
  {
    id: 'implant_grade_titanium',
    claim: 'Implant Grade Titanium',
    category: 'Metals',
    required_document: 'Mill Test Report (MTR / EN 10204 Type 3.1) citing ASTM F136 or ISO 5832-3 ELI',
    what_it_proves: 'Substantiates wrought Ti-6Al-4V ELI (Extra Low Interstitial) alloy with maximum 0.13% oxygen, certified mechanical tensile/yield data, and unique melt heat lot identification.',
    what_absence_means: 'Absence means the term functions purely as unregulated sales copy. The alloy may be Grade 5 (0.20% oxygen limit), scrap remelt, or commercial titanium with high interstitial impurities. No documentary evidence supports biocompatibility.',
    verification_action: 'Request the mill test report. Confirm "ASTM F136", "ELI", oxygen ≤ 0.13%, and heat number matching the shipment lot.'
  },
  {
    id: 'surgical_steel',
    claim: 'Surgical Steel / Surgical Grade',
    category: 'Metals',
    required_document: 'Mill Test Report citing ASTM F138 (or ISO 5832-1) for 316LVM bar/wire',
    what_it_proves: 'Substantiates vacuum-arc remelted 316LVM steel with carbon ≤ 0.030%, ultra-low sulfur ≤ 0.010%, and certified inclusion cleanliness per ASTM E45.',
    what_absence_means: 'Absence means the metal is commercial 316L or 304 architectural stainless steel. Commercial steels are melted in open air, have higher carbon and inclusion contents, and pit under bodily fluids. It is not approved for initial implant tissue canals.',
    verification_action: 'Do not accept generic "316L". Demand an MTR specifying ASTM F138 (316LVM) with vacuum melt notation and carbon ≤ 0.030%.'
  },
  {
    id: 'hypoallergenic',
    claim: 'Hypoallergenic',
    category: 'General',
    required_document: 'Alloy chemical breakdown + Biocompatibility testing report (ISO 10993-10 / EN 1811)',
    what_it_proves: 'Substantiates that known contact allergens (nickel, cobalt, chromium) are either completely absent or immobilized below biological sensitization thresholds.',
    what_absence_means: 'Absence means the word has zero legal, medical, or metallurgical meaning. Any supplier can print "hypoallergenic" on items containing 20% free nickel or toxic base metals without violating commercial labeling laws in most jurisdictions.',
    verification_action: 'Discard the word "hypoallergenic" entirely. Inspect the specific alloy specification and independent laboratory assay.'
  },
  {
    id: 'medical_grade_polymer',
    claim: 'Medical Grade Polymer / BioFlex / Plastic',
    category: 'Polymers',
    required_document: 'USP Class VI biological reactivity certificate + ISO 10993-5 cytotoxicity test',
    what_it_proves: 'Substantiates in vivo biocompatibility at 121°C and in vitro zero-cytotoxicity for medical-grade PP-R resin, with zero phthalate plasticizers or heavy metal pigments.',
    what_absence_means: 'Absence means the plastic is industrial acrylic (PMMA), commercial PTFE, PVC, or cheap craft resin. These degrade under body warmth, leach monomer residues or plasticizers, and cannot survive steam autoclave cycles.',
    verification_action: 'Require documented USP Class VI conformity and ISO 10993-5 cytotoxicity testing. Check steam autoclave validation.'
  },
  {
    id: 'nickel_free',
    claim: 'Nickel-Free',
    category: 'Metals',
    required_document: 'Laboratory spectrometry assay / Chemical composition certified < 0.01% Ni',
    what_it_proves: 'Substantiates that the raw material contains no nickel additions and no detectable nickel contamination across the alloy batch.',
    what_absence_means: 'Absence means the item may be electroplated with a thin barrier coating over a nickel-rich brass or commercial steel core. Once the thin plating scratches, high nickel release causes immediate allergic contact dermatitis.',
    verification_action: 'Confirm the core material is inherently nickel-free (ASTM F136 titanium, niobium, borosilicate glass, or certified nickel-free gold).'
  },
  {
    id: 'autoclave_safe',
    claim: 'Autoclave Safe / 100% Sterilizable',
    category: 'General',
    required_document: 'Thermal cycling test validation (ISO 17665 steam sterilization validation report)',
    what_it_proves: 'Proves the piece survives saturated steam at 121°C–134°C without warping, melting, decomposing, releasing toxic fumes, or degrading polish.',
    what_absence_means: 'Absence means the item may melt inside an autoclave chamber, destroy the autoclave vacuum pump, or coat other jewelry in toxic polymer melt.',
    verification_action: 'Verify manufacturer temperature tolerance: 134°C for titanium/steel/glass; 121°C for BioFlex. Never autoclave acrylic or glued stone gems.'
  },
  {
    id: 'biocompatible_iso10993',
    claim: 'Biocompatible / ISO 10993 Tested',
    category: 'General',
    required_document: 'Accredited lab test report specifically citing ISO 10993-5 and ISO 10993-10',
    what_it_proves: 'Confirms that living cell cultures exposed to the material showed no lysis or cell death (cytotoxicity grade 0), and guinea pig/murine assays showed no sensitization.',
    what_absence_means: 'Absence means "biocompatible" is used colloquially. ISO 10993 comprises over 20 separate parts; citing "ISO 10993" without specifying parts or providing test results proves nothing.',
    verification_action: 'Request the lab report with accredited test date, lab accreditation (ISO 17025), and specific part numbers (10993-5 cytotoxicity, 10993-10 irritation).'
  },
  {
    id: 'astm_certified',
    claim: 'ASTM F136 / ASTM F138 Certified',
    category: 'Metals',
    required_document: 'Raw material Mill Test Report with verifiable mill contact and Heat Number',
    what_it_proves: 'Proves the raw ingot and bar lot complied with all metallurgical, dimensional, and chemical provisions of the American Society for Testing and Materials implant standard.',
    what_absence_means: 'Absence means the supplier copied standard numbers onto marketing sheets from a competitor catalog. Without the mill heat number, the citation is meaningless.',
    verification_action: 'Check the MTR for a real melting mill name, heat number, lab technician signature, and test values within standard limits.'
  },
  {
    id: 'pure_titanium',
    claim: 'Pure Titanium / Solid Titanium',
    category: 'Metals',
    required_document: 'Mill Test Report citing ASTM F67 (Commercially Pure Titanium Grades 1-4)',
    what_it_proves: 'Substantiates unalloyed titanium (98.6%–99.5% pure Ti) per ASTM F67 for surgical applications.',
    what_absence_means: 'Often used misleadingly by suppliers who do not know the difference between unalloyed CP titanium (ASTM F67) and alloyed titanium (ASTM F136 Ti-6Al-4V ELI). Pure titanium is softer and rarely used for threaded posts.',
    verification_action: 'Clarify whether the item is ASTM F67 (unalloyed CP titanium) or ASTM F136 (Ti-6Al-4V ELI). Both are body-safe when certified.'
  }
];

// ═══════════════════════════════════════════════════════════
// 4. SIDE-BY-SIDE CERTIFIED MATERIAL COMPARISON
// Compares what is CERTIFIED, not what is preferred.
// Same standard, same test, different result. Zero rankings.
// ═══════════════════════════════════════════════════════════

const CERTIFIED_COMPARISON_DATA = {
  titanium_grade_23: {
    name: 'Titanium Grade 23 (Ti-6Al-4V ELI)',
    governing_standard: 'ASTM F136 / ISO 5832-3 (ELI Specification)',
    certified_composition: 'Ti (Balance), Al: 5.5–6.5%, V: 3.5–4.5%, Fe ≤ 0.25%, O ≤ 0.13%, C ≤ 0.08%, N ≤ 0.05%, H ≤ 0.012%',
    melting_process: 'Multiple vacuum arc remelted (VAR) or electron beam cold hearth melted',
    biocompatibility_standard: 'Meets ISO 10993 cytotoxicity and sensitization; non-immunogenic',
    autoclave_thermal_limit: 'Validated steam autoclave safe up to 134°C (273°F); no degradation',
    traceability_unit: 'Mill Heat Lot Number on MTR (raw bar melt batch level)',
    surface_finish_spec: 'Mirror polish mechanically or electrochemically polished (Ra < 0.05 µm)',
    tissue_boundary: 'Subdermal tissue canal, initial puncture wound, bone/mucosal contact'
  },
  titanium_grade_5: {
    name: 'Titanium Grade 5 (Ti-6Al-4V - Non-ELI)',
    governing_standard: 'ISO 5832-3 / ASTM F1472 (surgical implant) or ASTM B348 (industrial bar)',
    certified_composition: 'Ti (Balance), Al: 5.5–6.75%, V: 3.5–4.5%, Fe ≤ 0.30% (implant specifications; 0.40% under ASTM B348), O ≤ 0.20% (higher than ELI), C ≤ 0.08%, N ≤ 0.05%',
    melting_process: 'Vacuum arc or plasma melt; implant specifications add chemistry and microstructure requirements',
    biocompatibility_standard: 'Implant specifications exist (ISO 5832-3, ASTM F1472); most piercing guidance names its extra-low-interstitial version, ASTM F136 (Grade 23)',
    autoclave_thermal_limit: 'Steam autoclave safe to 134°C; no thermal degradation',
    traceability_unit: 'Heat lot number, stated on the mill certificate',
    surface_finish_spec: 'Set by the jewellery maker, not by the alloy specification',
    tissue_boundary: 'Surgical implants and orthopaedic hardware under implant specifications; industrial and aerospace parts under ASTM B348'
  },
  surgical_steel_316lvm: {
    name: 'Surgical Stainless Steel 316LVM',
    governing_standard: 'ASTM F138 / ISO 5832-1 (Grade 2 Surgical Implant Bar/Wire)',
    certified_composition: 'Fe (Balance), Cr: 17.0–19.0%, Ni: 13.0–15.0%, Mo: 2.25–3.00%, C ≤ 0.030%, S ≤ 0.010%, P ≤ 0.025%',
    melting_process: 'Vacuum Induction Melted + Vacuum Arc Remelted (VIM-VAR) for high inclusion cleanliness',
    biocompatibility_standard: 'Passes ISO 10993; contains 13–15% metallurgical nickel (potential allergen for nickel-sensitized individuals)',
    autoclave_thermal_limit: 'Validated steam autoclave safe up to 134°C (273°F)',
    traceability_unit: 'Mill Heat Lot Number on MTR (melt batch level)',
    surface_finish_spec: 'Passivated mirror polish (Ra < 0.05 µm) with intact chromium oxide passive film',
    tissue_boundary: 'Surgical implant, healed piercing tissue canal, initial piercing (for non-nickel-sensitized individuals)'
  },
  surgical_steel_316l: {
    name: 'Commercial Stainless Steel 316L',
    governing_standard: 'ASTM A276 / AISI 316L (Commercial Marine/Chemical Specification)',
    certified_composition: 'Fe (Balance), Cr: 16.0–18.0%, Ni: 10.0–14.0%, Mo: 2.00–3.00%, C ≤ 0.030%, S ≤ 0.030% (3x higher sulfur), P ≤ 0.045%',
    melting_process: 'Electric arc furnace air melt without vacuum remelt (higher non-metallic inclusions)',
    biocompatibility_standard: 'Higher micro-inclusion content increases susceptibility to localized pitting corrosion in body fluids',
    autoclave_thermal_limit: 'Steam autoclave safe to 134°C',
    traceability_unit: 'Commercial heat lot number (often omitted on retail components)',
    surface_finish_spec: 'Standard industrial polish or tumble finish',
    tissue_boundary: 'Marine hardware, food equipment, exterior jewelry on intact healed skin'
  },
  bioflex: {
    name: 'BioFlex® Body Jewelry Medical Polymer',
    governing_standard: 'USP Class VI Biological Reactivity / ISO 10993 / Medical Grade PP-R',
    certified_composition: 'High-purity medical-grade polypropylene random copolymer (PP-R); zero phthalates, zero BPA, zero heavy metals',
    melting_process: 'Medical-grade cleanroom extrusion & injection molding',
    biocompatibility_standard: 'Certified USP Class VI in vivo reactivity and ISO 10993-5 in vitro cytotoxicity grade 0',
    autoclave_thermal_limit: 'Validated steam autoclave safe up to 121°C (250°F) for 20 minutes',
    traceability_unit: 'Raw medical resin manufacturer lot certificate & production batch',
    surface_finish_spec: 'Extruded high-gloss hydrophobic low-friction surface finish',
    tissue_boundary: 'Initial wound canal, oral piercings, flexible tissue canals, MRI procedures'
  },
  niobium: {
    name: 'Niobium (ASTM F2229 / Pure Element 41)',
    governing_standard: 'ASTM F2229 (Unalloyed Niobium for Surgical Implants)',
    certified_composition: 'Nb: 99.85–99.9% minimum, Ta ≤ 0.30%, Fe ≤ 0.02%, O ≤ 0.04%, C ≤ 0.01%, N ≤ 0.01%, H ≤ 0.001%',
    melting_process: 'Electron beam melted ingot with multiple cold-hearth passes',
    biocompatibility_standard: 'Passes ISO 10993; highly biocompatible, 100% nickel-free, non-reactive',
    autoclave_thermal_limit: 'Validated steam autoclave safe to 134°C (273°F)',
    traceability_unit: 'Melt heat lot number on MTR',
    surface_finish_spec: 'Mechanically polished and/or electrolytically anodized surface oxide layer',
    tissue_boundary: 'Initial piercing fistula, sensitive tissue, subdermal and healed body piercings'
  },
  glass: {
    name: 'Borosilicate Glass 3.3',
    governing_standard: 'ISO 3585 / ASTM E438 (Type I, Class A Borosilicate)',
    certified_composition: 'SiO2: ~81%, B2O3: ~13%, Na2O/K2O: ~4%, Al2O3: ~2%; 100% lead-free, cadmium-free',
    melting_process: 'Refractory furnace melt, hot flame-worked, kiln annealed',
    biocompatibility_standard: 'Chemically completely inert; zero ion elution in physiological solutions',
    autoclave_thermal_limit: 'Steam autoclave safe up to 134°C (requires gradual cooling to prevent thermal shock)',
    traceability_unit: 'Glass rod manufacturer batch certificate',
    surface_finish_spec: 'Fire-polished non-porous vitreous surface with zero surface micro-roughness',
    tissue_boundary: 'Initial piercing canal, stretching fistulas, long-term healed piercings'
  },
  gold_14k: {
    name: 'Solid 14K Gold',
    governing_standard: 'Hallmark / Assay Standard (58.3% Au Minimum)',
    certified_composition: 'Au: 58.3–58.5%, alloyed with Ag (Silver), Cu (Copper), Zn (Zinc); Ni < 0.01% (Undetectable)',
    melting_process: 'Controlled induction casting in inert atmosphere',
    biocompatibility_standard: 'Biocompatible when verified 100% nickel-free and cadmium-free; noble metal corrosion resistance',
    autoclave_thermal_limit: 'Steam autoclave safe to 134°C',
    traceability_unit: 'Alloy assay certificate & hallmarked karat stamp',
    surface_finish_spec: 'Hand polished to mirror luster (Ra < 0.05 µm)',
    tissue_boundary: 'Initial piercing (if solid and verified nickel-free), healed piercing fistulas'
  },
  acrylic: {
    name: 'Commercial Acrylic (PMMA)',
    governing_standard: 'Non-Standardized Commercial Plastic (ISO 7823)',
    certified_composition: 'Polymethyl methacrylate (PMMA); may contain residual methyl methacrylate monomers and plasticizers',
    melting_process: 'Industrial cast sheet or injection molded pellets',
    biocompatibility_standard: 'NOT certified for surgical implant or open wound contact; micro-porous; leaches monomers',
    autoclave_thermal_limit: 'CANNOT be steam autoclaved (melts and distorts above 90°C–100°C; releases toxic vapors)',
    traceability_unit: 'None in retail body jewelry distribution',
    surface_finish_spec: 'Buffed plastic with microscopic surface porosity that harbors bacteria and exudate',
    tissue_boundary: 'Healed, intact lobes ONLY for short durations; strictly forbidden in fresh wounds'
  }
};

// ═══════════════════════════════════════════════════════════
// 5. COMPANION TOOLS (Cross-Reference Links)
// ═══════════════════════════════════════════════════════════

const COMPANION_TOOLS = [
  {
    id: 'nickel-release-calculator',
    name: 'Nickel Release Calculator',
    url: 'https://poliinternational.com/nickel-release-calculator/',
    domain: 'EN 1811 Migration & Quantitative Release Limits',
    desc: 'For quantitative nickel ion migration calculations (µg/cm²/week) and legal compliance limits under EU REACH Entry 27.',
    action_label: 'Use Nickel Release Tool'
  },
  {
    id: 'reach-svhc-checker',
    name: 'REACH SVHC Candidate List Checker',
    domain: 'Pigment & Ink Chemistry / REACH Candidate List',
    desc: 'For checking tattoo pigments, ink SDS formulations, and cosmetic additives against the ECHA 240+ substance list.',
    url: 'https://poliinternational.com/reach-svhc-checker/',
    action_label: 'Chemical Screening Tool'
  },
  {
    id: 'jewelry-size-visualizer',
    name: 'Jewelry Size Visualizer',
    url: 'https://poliinternational.com/jewelry-size-visualizer/',
    domain: 'Jewelry Gauge, Bar Length & Anatomical Sizing',
    desc: 'For gauge conversions (AWG to mm), wearable post lengths, ball diameters, and anatomical clearance sizing.',
    action_label: 'Use Size Visualizer'
  },
  {
    id: 'allergy-patch-test',
    name: 'Allergy Patch Test Guide',
    url: 'https://poliinternational.com/allergy-patch-test/',
    domain: 'Cutaneous Hypersensitivity & Clinical Patch Tests',
    desc: 'For professional patch test documentation, metal salt panels, and clinical dermatology referral guidelines.',
    action_label: 'Use Patch Test Tool'
  },
  {
    id: 'reaction-triage-wizard',
    name: 'Reaction Triage Wizard',
    url: 'https://poliinternational.com/reaction-triage-wizard/',
    domain: 'Active Reaction Assessment & Client Triage',
    desc: 'For triaging active piercing redness, differentiating mechanical trauma from contact dermatitis or infection.',
    action_label: 'Use Triage Wizard'
  },
  {
    id: 'mri-safety-checker',
    name: 'MRI Safety Screening',
    url: 'https://poliinternational.com/mri-safety-checker/',
    domain: 'Magnetic Resonance Safety (ASTM F2503)',
    desc: 'For radiological screening, magnetic displacement force evaluations, and RF heating conditionality.',
    action_label: 'Use MRI Safety Tool'
  }
];

if (typeof window !== 'undefined') {
  window.CERT_READER_PRESETS = CERT_READER_PRESETS;
  window.SUPPLIER_QUESTIONS_CONFIG = SUPPLIER_QUESTIONS_CONFIG;
  window.CLAIM_MATRIX_DATA = CLAIM_MATRIX_DATA;
  window.CERTIFIED_COMPARISON_DATA = CERTIFIED_COMPARISON_DATA;
  window.COMPANION_TOOLS = COMPANION_TOOLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CERT_READER_PRESETS,
    SUPPLIER_QUESTIONS_CONFIG,
    CLAIM_MATRIX_DATA,
    CERTIFIED_COMPARISON_DATA,
    COMPANION_TOOLS
  };
}
