/*
═══════════════════════════════════════════════════════════════
MATERIAL CERTIFICATION DECODER - CENTRALIZED I18N SYSTEM
Poli International
Language: English (Reference Dictionary)
═══════════════════════════════════════════════════════════════
*/

(function() {
  'use strict';

  const I18N_DICTIONARY = {
    en: {
      "common": {
          "done": "Done", "close": "Close" },
    "app": {
        "header_badge": "Professional Piercing & Studio Tool",
        "title": "Material Certification Checker",
        "subtitle": "Verify body jewelry material certifications, biocompatibility standards, and safety ratings",
        "toggle_theme": "Toggle theme",
        "select_language": "Select Language"
    },
    "nav": {
        "cert_reader": "Certificate Reader",
        "supplier_questions": "Supplier Question Sheet",
        "claim_matrix": "Claim Matrix",
        "quick_lookup": "Quick Lookup",
        "safety_checker": "Safety Checker",
        "compliance": "Compliance",
        "comparison": "Comparison",
        "studio_record": "Studio Records",
        "reference": "Reference",
        "embed_btn": "⚡ Embed",
        "embed_title": "Embed this tool"
    },
    "tabs": {
        "tool": "🧮 Tool",
        "docs": "📖 Documentation",
        "embed": "⚡ Embed Code",
        "docs_iframe_title": "Material Certification Documentation"
    },
    "quick_lookup": {
        "title": "Quick Certification Lookup",
        "subtitle": "Enter a certification code (ASTM F136, ASTM F138, ISO 5832-1, EN 1811, etc.) to see complete technical details",
        "label": "Enter Certification Code or Material",
        "search_label": "Search certification code",
        "placeholder": "Enter certification code (e.g., ASTM F136, ASTM F138)",
        "aria_label": "Search certification code",
        "search_button_text": "Search",
        "button": "Decode Certification",
        "error_title": "❌ Certification Not Found",
        "error_desc": "No certification found for \"{query}\". Try codes like:",
        "error_examples": "ASTM F136, ASTM F138, ISO 5832-1, ISO 10993, EN 1811, REACH",
        "alert_empty": "Please enter a certification code (e.g., ASTM F138, ISO 5832-1)"
    },
    "safety_checker": {
        "title": "Material Safety Checker",
        "subtitle": "Select a material, piercing location, and healing stage to check safety ratings",
        "material_type_label": "Material Type",
        "material_select_default": "Select a material to check...",
        "optgroup_titanium": "Titanium",
        "optgroup_steel": "Steel",
        "optgroup_precious": "Precious Metals & Alternatives",
        "optgroup_biocompatible_polymers": "Biocompatible Polymers & Glass",
        "optgroup_other": "Other Materials (Use with Caution)",
        "opt_titanium_23": "Titanium Grade 23 (Ti-6Al-4V ELI) - ASTM F136",
        "opt_titanium_5": "Titanium Grade 5 (Ti-6Al-4V)",
        "opt_steel_316lvm": "Surgical Steel 316LVM - ASTM F138",
        "opt_steel_316l": "Surgical Steel 316L (Non-implant)",
        "opt_niobium": "Niobium (Pure / Alloyed) - ASTM F2229",
        "opt_gold_14k": "14K Gold",
        "opt_gold_18k": "18K Gold",
        "opt_bioflex": "BioFlex (PP-R Polymer - Medical Grade)",
        "opt_bioplast": "Bioplast (Medical Bioplastic)",
        "opt_ptfe": "PTFE (Polytetrafluoroethylene)",
        "opt_glass": "Borosilicate Glass",
        "opt_stone": "Natural Stone (Healed Only)",
        "opt_wood": "Wood / Organics (Healed Only)",
        "opt_acrylic": "Acrylic / Plastic (NOT Recommended)",
        "location_label": "Piercing Location",
        "location_all": "All locations",
        "location_ear": "Ear (Lobe, Helix, Tragus, etc.)",
        "location_nose": "Nose / Septum",
        "location_lip": "Lip / Oral",
        "location_eyebrow": "Eyebrow",
        "location_navel": "Navel",
        "location_nipple": "Nipple",
        "location_genital": "Genital",
        "location_surface": "Surface / Dermal",
        "healing_label": "Healing Stage",
        "healing_initial": "Initial / Fresh",
        "healing_healed": "Healed",
        "sensitivity_label": "Skin Sensitivity",
        "sensitivity_normal": "Normal",
        "sensitivity_sensitive": "Sensitive / Nickel Allergic",
        "submit_button": "Check Material Safety",
        "alert_select_material": "Please select a material type.",
        "initial_pass_title": "PASS - Approved for Initial Piercings",
        "initial_pass_desc": "Meets established biocompatibility criteria (ASTM/ISO) for direct insertion into fresh unhealed tissue.",
        "initial_fail_title": "FAIL - Not Recommended for Initial Piercings",
        "initial_fail_desc": "Does not meet initial piercing safety standards; suitable only for fully healed tissue or secondary wear with verification.",
        "warning_not_initial": "This material is NOT recommended for initial/fresh piercings.",
        "warning_sensitive": "This material may not be suitable for sensitive skin.",
        "warning_nickel": "This material contains nickel, which can cause allergic reactions in sensitive individuals.",
        "print_result": "Print Result",
        "print_result_title_search": "Print certification report",
        "print_result_title_material": "Print material verification report",
        "copy_report": "Copy Report",
        "copy_report_title": "Copy verification summary to clipboard",
        "copied": "✓ Copied!",
        "export_report": "Export Text Report",
        "export_report_title": "Download text report file",
        "export_pdf": "Export as PDF",
        "export_pdf_title": "Generate and download official PDF verification report",
        "generating_pdf": "Generating PDF...",
        "yes": "✅ Yes",
        "no": "❌ No",
        "contains_nickel": "❌ Contains Nickel",
        "safe_status": "✅ Safe",
        "not_safe_status": "❌ Not Safe",
        "badge_safe": "✅ SAFE",
        "badge_conditional": "⚠️ CONDITIONAL",
        "badge_unsafe": "❌ UNSAFE",
        "warnings_title": "⚠️ Warnings for Your Selection",
        "suitable_for_title": "Suitable For",
        "not_suitable_for_title": "NOT Suitable For",
        "pros_title": "Pros",
        "cons_title": "Cons",
        "red_flags_title": "🚩 Red Flags to Watch For",
        "full_name_title": "Full Name",
        "material_type_title": "Material Type",
        "body_piercing_use_title": "Body Piercing Use",
        "common_uses_title": "Common Uses",
        "important_notes_title": "Important Notes",
        "how_to_verify_title": "How to Verify",
        "related_standards_title": "Related Standards",
        "allergy_risk_title": "Allergy Risk",
        "required_certs_title": "Required Certifications"
    },
    "recent_checks": {
        "title": "Recent Checks",
        "zero_items": "0 items",
        "count_label": "{count} / 5 items",
        "clear_button": "Clear History",
        "clear_button_title": "Clear session history",
        "empty": "No recent checks yet. Queries and material verifications will be tracked here.",
        "badge_initial_pass": "INITIAL PASS",
        "badge_healed_only": "HEALED ONLY",
        "badge_safe": "SAFE",
        "badge_conditional": "CONDITIONAL",
        "badge_unsafe": "UNSAFE",
        "rerun": "Re-run ➔",
        "recent_time": "Recent"
    },
    "compliance": {
        "title": "Compliance Verification Tool",
        "subtitle": "Enter a product claim or supplier description to identify required standards and potential discrepancies",
        "label": "Product Claim",
        "placeholder": "e.g., \"Implant Grade Titanium\", \"Surgical Steel\", \"Hypoallergenic\", \"BioFlex\"",
        "aria_label": "Enter product claim",
        "button": "Verify Claim",
        "alert_empty": "Please enter a product claim to verify.",
        "verifying_title": "Verifying: \"{claim}\"",
        "required_certs": "✅ Required Certifications",
        "not_acceptable": "❌ NOT Acceptable",
        "red_flags": "🚩 Red Flags",
        "verification_steps": "✓ Verification Steps",
        "generic_title": "⚠️ Generic Verification Tips",
        "generic_intro": "We don't have specific verification data for \"{claim}\", but here are general tips:",
        "generic_tip_1_title": "1. Request Documentation:",
        "generic_tip_1_text": "Always ask for mill certifications or test reports.",
        "generic_tip_2_title": "2. Verify Specific Standards:",
        "generic_tip_2_text": "Generic terms like \"surgical grade\" or \"medical grade\" are meaningless without ASTM or ISO numbers.",
        "generic_tip_3_title": "3. Check Material Composition:",
        "generic_tip_3_text": "Ask for exact alloy composition and compare to known standards.",
        "generic_tip_4_title": "4. Watch for Discrepancies:",
        "generic_tip_4_text": "Unusually low prices, missing test reports, vague claims, or evasive suppliers.",
        "generic_tip_5_title": "5. When in Doubt:",
        "generic_tip_5_text": "Rely on verified ASTM F136 titanium or ASTM F138 steel."
    },
    "comparison": {
        "category_locked_desc": "Choices 2 and 3 only list materials of the same kind, so unlike materials are not compared.",
        "category_locked_title": "Category locked:",
        "title": "Material Comparison Tool",
        "subtitle": "Compare 2 to 3 materials side-by-side to review biocompatibility, standards, and recommended applications",
        "select_1_aria": "First material to compare",
        "select_1_default": "Select primary material...",
        "select_2_aria": "Second material to compare",
        "select_2_default": "Select second material (filtered)...",
        "select_3_aria": "Third material to compare",
        "select_3_default": "Select third material (optional)...",
        "select_disabled_prompt": "Select primary material first...",
        "button": "Compare Materials",
        "alert_select_two": "Please select at least two materials to compare.",
        "initial_piercing_label": "Initial Piercing:",
        "cost_label": "Cost:",
        "required_certs_label": "Required Certs:",
        "category_metals": "Metallic Materials & Alloys (ASTM / ISO Standards)",
        "category_polymers_glass": "Biocompatible Polymers & Glass",
        "category_organics_minerals": "Organics, Minerals & Plastics (Healed / Stretched Only)",
        "category_filter_notice": "Category Filter: {category} - Dropdowns restricted to prevent invalid cross-category comparisons.",
        "category_filter_all": "All Categories (Select primary material to filter)"
    },
    "reference": {
        "title": "Certification Quick Reference",
        "show_guide": "Show Guide",
        "hide_guide": "Hide Guide",
        "category_astm": "ASTM Standards",
        "category_iso": "ISO Standards",
        "category_eu": "EU Standards",
        "category_app": "Professional Practice"
    },
    "education": {
        "title": "Understanding Material Certifications",
        "card_mill_title": "🏆 What Are Mill Certifications?",
        "card_mill_text": "Mill test reports certify the chemical composition, tensile strength, and metallurgical properties of raw material lots. They provide documentary proof of compliance with ASTM or ISO standards.",
        "card_verify_title": "📋 How to Verify Materials",
        "card_verify_text": "Always request authentic mill certifications from manufacturers. Verified suppliers provide lot-tracked test certificates detailing chemical analysis and mechanical properties.",
        "card_discrepancies_title": "⚠️ Common Discrepancies",
        "card_discrepancies_text": "Watch for unverified marketing terms like generic \"surgical steel\" without ASTM F138 documentation, or \"hypoallergenic\" claims lacking alloy breakdown.",
        "card_initial_title": "✅ Initial Piercing Materials",
        "card_initial_text": "Established professional practice specifies biocompatible materials for initial piercings: ASTM F136 titanium, ASTM F138 surgical steel, BioFlex® body jewelry (PP-R), niobium, and borosilicate glass.",
        "card_biocompatibility_title": "🔬 Biocompatibility Testing",
        "card_biocompatibility_text": "Biocompatibility is evaluated through cytotoxicity testing (ISO 10993-5), dermal sensitisation (ISO 10993-10) and USP Class VI conformity for medical-grade polymers.",
        "card_sterilization_title": "⚡ Sterilization Protocols",
        "card_sterilization_text": "Initial jewelry must withstand steam autoclave sterilization (121°C to 134°C). Titanium, implant steel, niobium, BioFlex® body jewelry, and borosilicate glass are autoclave-compatible.",
        "card_1_title": "🏆 What Are Mill Certifications?",
        "card_1_text": "Mill test reports certify the chemical composition, tensile strength, and metallurgical properties of raw material lots. They provide documentary proof of compliance with ASTM or ISO standards.",
        "card_2_title": "📋 How to Verify Materials",
        "card_2_text": "Always request authentic mill certifications from manufacturers. Verified suppliers provide lot-tracked test certificates detailing chemical analysis and mechanical properties.",
        "card_3_title": "⚠️ Common Discrepancies",
        "card_3_text": "Watch for unverified marketing terms like generic \"surgical steel\" without ASTM F138 documentation, or \"hypoallergenic\" claims lacking alloy breakdown.",
        "card_4_title": "✅ Initial Piercing Materials",
        "card_4_text": "Established professional practice specifies biocompatible materials for initial piercings: ASTM F136 titanium, ASTM F138 surgical steel, BioFlex® body jewelry (PP-R), niobium, and borosilicate glass.",
        "card_5_title": "🔬 Biocompatibility Testing",
        "card_5_text": "ISO 10993 standards define biological evaluation methods including cytotoxicity, sensitization, and irritation testing for medical devices and implantable materials.",
        "card_6_title": "⚡ Sterilization Protocols",
        "card_6_text": "Initial jewelry must withstand steam autoclave sterilization (121°C to 134°C). Titanium, implant steel, niobium, BioFlex® body jewelry, and borosilicate glass are autoclave-compatible."
    },
    "disclaimer": {
        "title": "⚠️ Important Disclaimer",
        "text": "This tool provides technical and educational reference data regarding body jewelry material specifications and safety standards (ASTM, ISO, EN). Always verify material test reports directly with certified manufacturers. This utility does not constitute medical advice or formal legal certification."
    },
    "footer": {
        "copyright": "© 2026 Poli International - Professional Body Jewelry Standards",
        "legal": "Material certification data provided for educational and studio reference purposes.",
        "powered_by": "POWERED BY POLI INTERNATIONAL"
    },
    "embed": {
        "tab_title": "Embed This Tool",
        "tab_desc": "Copy the snippet below to embed the Material Certification Checker directly on your website:",
        "tab_copy_button": "Copy Code",
        "tab_copied": "✓ Copied!",
        "modal_title": "Use This Tool On Your Website",
        "modal_section_title": "Copy Embed Code",
        "modal_copy_button": "Copy Code",
        "copy_failed_alert": "Failed to copy code. Please select and copy manually."
    },
    "embed_tab": {
        "title": "Embed This Tool",
        "desc": "Copy the snippet below to embed the Material Certification Checker directly on your website:",
        "copy_btn": "Copy Code",
        "copied": "✓ Copied!"
    },
    "embed_modal": {
        "title": "Use This Tool On Your Website",
        "section_title": "Copy Embed Code",
        "copy_btn": "Copy Code"
    },
    "email": {
        "subscribing": "Subscribing...",
        "subscribed": "✅ Subscribed!",
        "notify_me": "Notify Me",
        "subscribe": "Subscribe"
    },
    "report": {
        "header_title": "POLI INTERNATIONAL - MATERIAL VERIFICATION REPORT",
        "generated": "Generated:",
        "nickel_status": "Nickel Status",
        "autoclave_sterilization": "Autoclave Sterilization",
        "division_signature": "Poli International Engineering Standards Division",
        "suitable_prefix": "[+] Suitable:",
        "contraindicated_prefix": "[-] Contraindicated:",
        "standard_ref": "Standard Reference: ASTM / ISO / EN Professional Standards",
        "material": "MATERIAL:",
        "safety_rating": "SAFETY RATING:",
        "initial_status": "INITIAL PIERCING STATUS:",
        "initial_pass": "PASS - Approved for Initial Piercing",
        "initial_fail": "FAIL - Not Recommended for Initial Piercings",
        "section_tech": "TECHNICAL SPECIFICATIONS & METRICS:",
        "biocompatibility": "- Biocompatibility:",
        "nickel_free_yes": "- Nickel-Free: YES (Complies with EU REACH <0.2 µg/cm²/week)",
        "nickel_free_no": "- Nickel-Free: NO (Contains Nickel)",
        "autoclave_yes": "- Autoclave Safe: YES (Steam sterilizable 121°C-134°C)",
        "autoclave_no": "- Autoclave Safe: NO",
        "allergy_risk": "- Allergy Risk:",
        "required_standards": "- Required Standards:",
        "section_selection": "SELECTION PARAMETERS:",
        "piercing_stage": "- Piercing Stage:",
        "skin_sensitivity": "- Skin Sensitivity:",
        "anatomical_placement": "- Anatomical Placement:",
        "section_suitability": "SUITABILITY:",
        "suitable_for": "Suitable For:",
        "not_suitable_for": "Not Suitable For:",
        "section_warnings": "WARNINGS & CAUTIONS:",
        "warnings_none": "  None identified for standard physiological parameters.",
        "red_flags_header": "RED FLAGS TO WATCH FOR:",
        "section_disclaimer": "DISCLAIMER & STUDIO NOTICE:",
        "disclaimer_1": "Material certification reference data provided for professional studio verification.",
        "disclaimer_2": "Always inspect manufacturer mill test reports directly for lot compliance.",
        "disclaimer_3": "Records stay in your local studio database and are never transmitted to external servers."
    },
    "glossary": {
        "modal_title": "Interactive Standards Glossary (A–Z)",
        "modal_subtitle": "Technical Metallurgy & Biocompatibility Reference (ASTM, ISO, REACH & EN 1811)",
        "search_placeholder": "Search ASTM standards, ISO specs, metallurgy terms...",
        "category_all": "All Terms",
        "category_astm": "ASTM Standards",
        "category_iso": "ISO Standards",
        "category_eu": "EU & REACH",
        "category_metallurgy": "Metallurgy",
        "category_polymer": "Polymers & Glass",
        "category_science": "Biocompatibility",
        "footnote": "Standards verified against ASTM International & ISO official technical publications.",
        "count_showing": "Showing {count} of {total} terms & standards",
        "empty_title": "No Matching Standards Found",
        "empty_desc": "Try adjusting your search query, switching category tabs, or selecting \"ALL\" letters.",
        "spec_label": "Specification:",
        "app_label": "Application:",
        "citation_label": "Reference:",
        "Acrylic (PMMA)": "Polymethyl methacrylate; a synthetic thermoplastic polymer that degrades under alcohol and heat; strictly unsuited for healing piercings.",
        "Allergy Risk Profile": "Immunological classification based on alloy composition, nickel release velocity under EN 1811, and cellular reactivity.",
        "ASTM B392": "Standard Specification for Niobium and Niobium Alloy Bar, Rod, and Wire for biomedical and industrial applications.",
        "ASTM F136": "Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications (UNS R56401).",
        "ASTM F138": "Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants (UNS S31673 / 316LVM).",
        "ASTM F67": "Standard Specification for Unalloyed Titanium for Surgical Implant Applications (Commercially Pure Titanium Grades 1–4).",
        "ASTM F754": "Standard Specification for Implantable Polytetrafluoroethylene (PTFE) Polymer Fabricated Forms for Surgical and Medical Applications.",
        "ASTM F1295": "Standard Specification for Wrought Titanium-6Aluminum-7Niobium Alloy for Surgical Implant Applications.",
        "ASTM F1472": "Standard Specification for Wrought Titanium-6Aluminum-4Vanadium Alloy for Surgical Implant Applications (Standard Grade 5).",
        "Autoclave Safe": "Capable of repeated saturated steam sterilization cycles (121°C–134°C) without material degradation, distortion, or toxic leeching.",
        "Biocompatibility": "Ability of a material to reside in contact with living body tissue without causing cytotoxic, toxic, or inflammatory responses (ISO 10993).",
        "BioFlex® body jewelry": "Medical-grade PP-R (polypropylene random copolymer) created by Patrick Poli; injection-moulded biocompatible polymer complying with ISO 10993 and USP Class VI.",
        "Bioplast": "Medical-grade modified synthetic polymer used for flexible body jewelry retainers and piercing jewelry.",
        "Borosilicate Glass": "Thermal- and chemical-resistant glass formulated with silica and boron trioxide, non-porous and body-safe for healed piercings.",
        "Cytotoxicity": "Quality of being toxic to living biological cells; measured in vitro via mammalian cell assays under ISO 10993-5.",
        "ELI": "Extra Low Interstitial: ultra-pure alloy grade with reduced oxygen, nitrogen, and iron for enhanced ductility and fracture toughness (ASTM F136).",
        "EN 1811": "European reference test method for measuring the release of nickel from post assemblies and articles in direct contact with skin (<0.2 µg/cm²/week).",
        "EU REACH Annex XVII": "European chemical regulation restricting nickel release from body piercing posts to <0.2 µg/cm²/week.",
        "ISO 5832-1": "International standard for surgical implants - Metallic materials - Part 1: Wrought stainless steel.",
        "ISO 5832-3": "International standard for surgical implants - Metallic materials - Part 3: Wrought titanium 6-aluminium 4-vanadium alloy.",
        "ISO 10993": "International standard suite defining biological evaluation and biocompatibility testing for medical and implantable devices.",
        "Mill Certification": "Traceable metallurgical test report from the raw material mill documenting chemical composition and mechanical properties by lot.",
        "Nickel-Free": "A marketing claim. Literally it means the alloy contains no nickel. It is often used loosely for alloys that pass the EU nickel release limit, which is a different thing. Ask which is meant, and for the document behind it.",
        "Niobium": "Pure elemental metal (element 41, ASTM B392) with virtually zero biological reactivity and hypoallergenic properties.",
        "Passivation": "Chemical surface treatment (ASTM F86) forming a protective, non-reactive chromium/titanium oxide barrier against corrosion.",
        "PP-R Copolymer": "Polypropylene random copolymer; the monolithic medical polymer composition of genuine BioFlex® body jewelry.",
        "PTFE": "Polytetrafluoroethylene (ASTM F754); synthetic fluoropolymer machined into flexible retainers.",
        "Tensile Strength": "Maximum mechanical stretching stress a material can withstand before necking or catastrophic structural failure.",
        "USP Class VI": "United States Pharmacopeia testing standard evaluating plastics and polymers for systemic toxicity and intracutaneous reactivity.",
        "Vacuum Arc Remelting (VAR)": "Vacuum melting process used in 316LVM to eliminate gas voids and microscopic non-metallic inclusions.",
        "Yield Strength": "The mechanical stress threshold at which a material begins to deform plastically and permanently under load.",
        "Sterilization": "Sterilization",
        "How to Verify": "How to Verify"
    },
    "glossary_overlay": {
        "title": "Interactive Standards Glossary",
        "subtitle": "Comprehensive A-Z reference of ASTM, ISO, and biological evaluation definitions for body jewelry materials",
        "search_placeholder": "Search technical terms, standards (e.g. ASTM F136, ISO 10993, ELI)...",
        "all_tab": "All Terms",
        "filter_all_letters": "All",
        "count_label": "Showing {count} technical definitions",
        "no_results": "No glossary definitions match \"{query}\". Try searching by standard number or material name.",
        "close_button": "Close Glossary",
        "trigger_button": "📖 Open Interactive Standards Glossary",
        "copy_citation": "Copy Citation",
        "citation_copied": "✓ Citation Copied!",
        "category_astm": "ASTM Standard",
        "category_iso": "ISO Standard",
        "category_eu": "European Standard",
        "category_science": "Metallurgy & Science",
        "category_polymer": "Polymer & Glass",
        "category_protocol": "Sterilization & Protocol"
    },
    "allergy_levels": {
        "very_low": "✅ Very Low",
        "low": "✅ Low",
        "low_to_moderate": "⚠️ Low to Moderate",
        "moderate": "⚠️ Moderate",
        "moderate_to_high": "❌ Moderate to High",
        "high": "❌ High",
        "low_if_nickel_free": "✅ Low (if nickel-free)"
    },
    "certs": {
        "ASTM_F136": {
            "code": "ASTM F136",
            "full_name": "Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications",
            "organization": "ASTM International",
            "material_type": "Titanium Grade 23 (Ti-6Al-4V ELI)",
            "body_piercing_use": "Excellent - Recommended for ALL piercings including initial",
            "biocompatibility": "Excellent - ISO 10993 compliant",
            "sterilization": "Autoclave safe (up to 134°C)",
            "important_notes": "This is the GOLD STANDARD for body piercing. Hypoallergenic, nickel-free, and suitable for all piercing types.",
            "verification_method": "Mill certification required showing ASTM F136 compliance",
            "common_uses": [
                "Initial piercings",
                "Body jewelry",
                "Surgical implants",
                "Medical devices"
            ]
        },
        "ASTM_F138": {
            "code": "ASTM F138",
            "full_name": "Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants",
            "organization": "ASTM International",
            "material_type": "Surgical Stainless Steel 316LVM",
            "body_piercing_use": "Good for healed piercings, acceptable for initial with caution",
            "biocompatibility": "Good - Contains nickel (potential allergen)",
            "sterilization": "Autoclave safe",
            "important_notes": "Contains 13-15% nickel - potential allergen for sensitive individuals. \"LVM\" means Low Vacuum Melting (higher purity). NOT the same as regular 316L steel.",
            "verification_method": "Mill certification must specify ASTM F138 (not just \"surgical steel\")",
            "common_uses": [
                "Body jewelry",
                "Surgical implants",
                "Medical instruments"
            ]
        },
        "ASTM_F1295": {
            "code": "ASTM F1295",
            "full_name": "Standard Specification for Wrought Titanium-6Aluminum-7Niobium Alloy for Surgical Implant Applications",
            "organization": "ASTM International",
            "material_type": "Titanium Alloy (Ti-6Al-7Nb)",
            "body_piercing_use": "Good - Less common than F136 but acceptable",
            "biocompatibility": "Excellent - Vanadium-free alternative",
            "sterilization": "Autoclave safe",
            "important_notes": "Alternative to Ti-6Al-4V for those concerned about vanadium. Rarely used in body jewelry due to cost.",
            "verification_method": "Mill certification required",
            "common_uses": [
                "Surgical implants",
                "Body jewelry (rare)",
                "Medical devices"
            ]
        },
        "ASTM_F2229": {
            "code": "ASTM F2229",
            "full_name": "Standard Specification for Wrought, Unalloyed Niobium for Surgical Implant Applications",
            "organization": "ASTM International",
            "material_type": "Niobium Grade 1 (unalloyed)",
            "body_piercing_use": "Excellent - Great for sensitive skin",
            "biocompatibility": "Excellent - Hypoallergenic",
            "sterilization": "Autoclave safe",
            "important_notes": "Pure niobium - naturally hypoallergenic and nickel-free. Can be anodized to various colors. Softer than titanium.",
            "verification_method": "Mill certification required",
            "common_uses": [
                "Body jewelry",
                "Ear weights",
                "Stretching jewelry"
            ]
        },
        "ASTM_F1586": {
            "code": "ASTM F1586",
            "full_name": "Standard Specification for Wrought Niobium Alloy for Surgical Implant Applications",
            "organization": "ASTM International",
            "material_type": "Niobium Alloy (Nb-1Zr)",
            "body_piercing_use": "Good - Slightly stronger than pure niobium",
            "biocompatibility": "Excellent",
            "sterilization": "Autoclave safe",
            "important_notes": "Niobium-zirconium alloy - stronger than pure niobium while maintaining biocompatibility.",
            "verification_method": "Mill certification required",
            "common_uses": [
                "Body jewelry",
                "Surgical implants"
            ]
        },
        "ISO_5832-1": {
            "code": "ISO 5832-1",
            "full_name": "Implants for surgery - Metallic materials - Part 1: Wrought stainless steel",
            "organization": "International Organization for Standardization",
            "material_type": "Surgical Stainless Steel (similar to 316LVM)",
            "body_piercing_use": "Good for healed piercings",
            "biocompatibility": "Good - Contains nickel",
            "sterilization": "Autoclave safe",
            "important_notes": "International equivalent of ASTM F138. Contains nickel.",
            "verification_method": "Mill certification or ISO compliance documentation",
            "common_uses": [
                "Surgical implants",
                "Body jewelry"
            ]
        },
        "ISO_5832-3": {
            "code": "ISO 5832-3",
            "full_name": "Implants for surgery - Metallic materials - Part 3: Wrought titanium 6-aluminum 4-vanadium alloy",
            "organization": "International Organization for Standardization",
            "material_type": "Titanium Grade 5 (Ti-6Al-4V)",
            "body_piercing_use": "Surgical implant specification for Ti-6Al-4V. Most piercing guidance names ASTM F136 (ELI), which has a lower oxygen limit.",
            "biocompatibility": "Specified for surgical implants",
            "sterilization": "Autoclave safe",
            "important_notes": "Grade 5 (ISO 5832-3, ASTM F1472) is not the same specification as Grade 23 (ASTM F136, ELI): its oxygen limit is 0.20% against 0.13%. Both are implant specifications. The common problem is Grade 5 or industrial titanium sold as \"implant grade\" with no certificate at all, so ask which specification the mill certificate names.",
            "verification_method": "Check the certificate names a specification and a heat number. If you require ASTM F136, an ISO 5832-3 certificate does not show it.",
            "common_uses": [
                "Orthopaedic and dental implants"
            ]
        },
        "ISO_5832-11": {
            "code": "ISO 5832-11",
            "full_name": "Implants for surgery - Metallic materials - Part 11: Wrought titanium 6-aluminum 7-niobium alloy",
            "organization": "International Organization for Standardization",
            "material_type": "Titanium Alloy (Ti-6Al-7Nb)",
            "body_piercing_use": "Acceptable but uncommon",
            "biocompatibility": "Excellent - Vanadium-free",
            "sterilization": "Autoclave safe",
            "important_notes": "Alternative to Ti-6Al-4V without vanadium. Rarely used in body jewelry.",
            "verification_method": "Mill certification",
            "common_uses": [
                "Surgical implants"
            ]
        },
        "ISO_10993": {
            "code": "ISO 10993 series",
            "full_name": "Biological evaluation of medical devices",
            "organization": "International Organization for Standardization",
            "material_type": "Testing standard (applies to all materials)",
            "body_piercing_use": "Not a material - Testing methodology",
            "biocompatibility": "Defines biocompatibility testing protocols",
            "sterilization": "N/A - Testing standard",
            "important_notes": "This is a TESTING standard, not a material certification. Materials that pass ISO 10993 testing are considered biocompatible. Look for \"ISO 10993 compliant\" or \"ISO 10993 tested\" on documentation.",
            "verification_method": "Test reports showing ISO 10993 compliance",
            "common_uses": [
                "Biocompatibility testing",
                "Medical device approval",
                "Quality assurance"
            ]
        },
        "ISO_13485": {
            "code": "ISO 13485",
            "full_name": "Medical devices - Quality management systems",
            "organization": "International Organization for Standardization",
            "material_type": "Quality management standard",
            "body_piercing_use": "Not a material - Manufacturing quality standard",
            "biocompatibility": "N/A - Quality system standard",
            "sterilization": "N/A",
            "important_notes": "ISO 13485 certification means the MANUFACTURER has a quality management system - it does NOT certify the material itself. Good to see, but not a substitute for material certifications like ASTM F136.",
            "verification_method": "Manufacturer ISO 13485 certificate",
            "common_uses": [
                "Manufacturer certification",
                "Quality assurance",
                "Regulatory compliance"
            ]
        },
        "EN_1441": {
            "code": "EN 1441",
            "full_name": "Nickel release from post assemblies which are inserted into pierced ears and other pierced parts of the human body",
            "organization": "European Committee for Standardization",
            "material_type": "Nickel release regulation (applies to all materials)",
            "body_piercing_use": "Regulatory requirement in EU",
            "biocompatibility": "Limits nickel exposure to reduce allergic reactions",
            "sterilization": "N/A - Regulatory standard",
            "important_notes": "MANDATORY in European Union. Products must meet nickel release limits. Even \"surgical steel\" containing nickel must pass this test for EU sale.",
            "verification_method": "Test reports showing EN 1441 compliance, EN 1811 test results",
            "common_uses": [
                "EU compliance",
                "Consumer protection",
                "Product testing"
            ]
        },
        "REACH": {
            "code": "REACH Compliance",
            "full_name": "Registration, Evaluation, Authorisation and Restriction of Chemicals",
            "organization": "European Chemicals Agency",
            "material_type": "Chemical safety regulation",
            "body_piercing_use": "Mandatory compliance for EU market",
            "biocompatibility": "Ensures materials are free of hazardous chemicals",
            "sterilization": "N/A",
            "important_notes": "REACH compliance is mandatory for selling body jewelry in the EU. Ensures no toxic chemicals, restricted substances, or excessive heavy metals.",
            "verification_method": "REACH compliance certificate, SVHC (Substance of Very High Concern) declaration",
            "common_uses": [
                "EU regulatory compliance",
                "Product safety"
            ]
        }
    },
    "materials": {
        "titanium_grade_23": {
            "name": "Titanium Grade 23 (Ti-6Al-4V ELI)",
            "biocompatibility": "Excellent - ISO 10993 compliant",
            "composition": "Titanium alloy: Ti-6Al-4V with extra low interstitials",
            "verification_tips": "Always request mill certification showing ASTM F136. Verify it says \"Grade 23\" or \"Ti-6Al-4V ELI\" - NOT \"Grade 5\".",
            "maintenance": "Easy - wash with mild soap and water. Anodized colors are permanent but can fade with friction.",
            "common_names": [
                "Implant Grade Titanium",
                "ASTM F136",
                "Grade 23",
                "Ti-6Al-4V ELI"
            ],
            "suitable_for": [
                "initial piercings",
                "healed piercings",
                "sensitive skin",
                "all body areas",
                "long-term wear"
            ],
            "not_suitable_for": [],
            "color_options": [
                "natural grey",
                "anodized colors (gold, blue, purple, etc.)"
            ],
            "pros": [
                "Hypoallergenic and nickel-free",
                "Lightweight and comfortable",
                "Strong and durable",
                "Can be anodized for color",
                "Excellent biocompatibility",
                "Industry gold standard"
            ],
            "cons": [
                "Cannot be soldered (requires specialized welding)",
                "Limited to certain designs",
                "Slightly higher cost than steel",
                "Anodized colors can fade over time"
            ],
            "red_flags": [
                "Unusually cheap \"implant grade\" titanium",
                "No mill certification provided",
                "Listed as \"Grade 5\" or \"ISO 5832-3\" (a different specification from F136)",
                "Generic \"titanium\" without grade specification",
                "Supplier refuses documentation"
            ],
            "sterilization_methods": [
                "Autoclave",
                "Chemical sterilization"
            ]
        },
        "titanium_grade_5": {
            "name": "Titanium Grade 5 (Ti-6Al-4V)",
            "biocompatibility": "Specified for surgical implants; most piercing guidance names its extra-low-interstitial version, ASTM F136 (Grade 23)",
            "composition": "Titanium alloy: Ti-6Al-4V (higher oxygen content than Grade 23)",
            "verification_tips": "Ask which specification the mill certificate names. ISO 5832-3 and ASTM F1472 are genuine surgical implant specifications for Ti-6Al-4V, but not F136 (Grade 23, ELI), which has the lower oxygen limit most piercing guidance names. ASTM B348 is an industrial bar specification with no implant requirements. \"Implant grade\" with no named specification proves nothing.",
            "maintenance": "Same care as other titanium jewellery: mild soap and water",
            "common_names": [
                "Grade 5",
                "Ti-6Al-4V"
            ],
            "suitable_for": [],
            "not_suitable_for": [
              "jewellery sold as \"implant grade\" when you require ASTM F136"
            ],
            "color_options": [
                "natural grey"
            ],
            "pros": [
                "Stronger than Grade 23",
                "Less expensive",
                "Nickel-free"
            ],
            "cons": [
                "Higher oxygen content (0.20% vs 0.13%)",
                "Often misrepresented as \"implant grade\"",
                "Not the grade most piercing guidance names (ASTM F136)"
            ],
            "red_flags": [
                "Grade 5 marketed as \"implant grade\"",
                "Seller shows ISO 5832-3 instead of ASTM F136",
                "Very cheap \"titanium\" jewelry",
                "Misleading marketing language"
            ],
            "sterilization_methods": [
                "Autoclave"
            ]
        },
        "surgical_steel_316lvm": {
            "name": "Surgical Steel 316LVM",
            "biocompatibility": "Good - Contains nickel (13-15%)",
            "composition": "316L stainless steel with vacuum melting (LVM) for higher purity",
            "verification_tips": "Must be ASTM F138 certified. Regular \"316L\" or generic \"surgical steel\" is NOT sufficient. Request mill certification showing F138 compliance and \"LVM\" designation.",
            "maintenance": "Clean regularly. Can tarnish slightly. Polish with jewelry cloth.",
            "common_names": [
                "ASTM F138",
                "316LVM",
                "Implant Grade Steel",
                "Surgical Stainless Steel"
            ],
            "suitable_for": [
                "healed piercings",
                "short-term wear"
            ],
            "not_suitable_for": [
                "known nickel allergy",
                "very sensitive skin"
            ],
            "color_options": [
                "silver/polished",
                "black (PVD coating)"
            ],
            "pros": [
                "Affordable",
                "Widely available",
                "Strong and durable",
                "High polish achievable",
                "Can be autoclaved"
            ],
            "cons": [
                "Contains 13-15% nickel",
                "Can cause allergic reactions",
                "Heavier than titanium",
                "Not ideal for initial piercings",
                "EU restrictions on nickel release"
            ],
            "red_flags": [
                "Just says \"surgical steel\" without ASTM F138",
                "Listed as \"316L\" (without LVM)",
                "304 stainless steel (completely wrong)",
                "No certification available",
                "Seller cannot explain difference between 316L and 316LVM"
            ],
            "sterilization_methods": [
                "Autoclave",
                "Chemical sterilization"
            ]
        },
        "surgical_steel_316l": {
            "name": "Surgical Steel 316L (Non-implant)",
            "biocompatibility": "Fair - Contains nickel, lower purity than 316LVM",
            "composition": "316L stainless steel (NOT implant grade)",
            "verification_tips": "This is NOT the same as ASTM F138. If seller claims \"surgical steel\" but cannot provide F138 certification, it is likely this lower grade.",
            "maintenance": "Clean regularly. Can tarnish and corrode.",
            "common_names": [
                "316L",
                "Stainless Steel",
                "Surgical Steel"
            ],
            "suitable_for": [
                "healed piercings (non-sensitive)",
                "fashion jewelry"
            ],
            "not_suitable_for": [
                "initial piercings",
                "sensitive skin",
                "nickel allergy",
                "long-term wear"
            ],
            "color_options": [
                "silver"
            ],
            "pros": [
                "Very affordable",
                "Widely available"
            ],
            "cons": [
                "NOT implant grade",
                "Higher impurities than 316LVM",
                "Higher nickel release",
                "Can cause irritation",
                "Not professionally recommended"
            ],
            "red_flags": [
                "Marketed as \"surgical steel\" without ASTM F138",
                "Very cheap pricing",
                "No certification provided",
                "Seller claims \"all surgical steel is the same\""
            ],
            "sterilization_methods": [
                "Autoclave"
            ]
        },
        "niobium": {
            "name": "Niobium (Pure or Alloyed)",
            "biocompatibility": "Excellent - Hypoallergenic",
            "composition": "Pure niobium (99.8%+) or niobium-zirconium alloy",
            "verification_tips": "Request mill certification for ASTM F2229 or F1586. Pure niobium should be 99.8% minimum.",
            "maintenance": "Very low maintenance. Wash with mild soap. Anodized colors are permanent.",
            "common_names": [
                "Niobium",
                "ASTM F2229",
                "Niobium Grade 1"
            ],
            "suitable_for": [
                "initial piercings",
                "healed piercings",
                "sensitive skin",
                "nickel allergies",
                "all body areas"
            ],
            "not_suitable_for": [],
            "color_options": [
                "natural grey",
                "anodized colors (similar to titanium)"
            ],
            "pros": [
                "Hypoallergenic and nickel-free",
                "Softer and more malleable than titanium",
                "Can be anodized to various colors",
                "Excellent for sensitive skin",
                "Naturally tarnish-resistant"
            ],
            "cons": [
                "Softer than titanium (can bend)",
                "More expensive than steel",
                "Limited availability",
                "Fewer design options"
            ],
            "red_flags": [
                "No certification provided",
                "Suspiciously cheap \"niobium\"",
                "Seller cannot provide ASTM documentation",
                "Mixed with unknown alloys"
            ],
            "sterilization_methods": [
                "Autoclave",
                "Chemical sterilization"
            ]
        },
        "gold_14k": {
            "name": "14K Gold",
            "biocompatibility": "Good IF nickel-free",
            "composition": "58.3% gold + alloys (MUST be nickel-free for body piercing)",
            "verification_tips": "CRITICAL: Verify nickel-free certification. White gold commonly contains nickel as whitening agent - avoid unless certified nickel-free. Request alloy composition.",
            "maintenance": "Clean with jewelry cleaner. Polish regularly. Avoid harsh chemicals.",
            "common_names": [
                "14 Karat Gold",
                "14K",
                "585 Gold"
            ],
            "suitable_for": [
                "healed piercings",
                "initial piercings (if nickel-free)",
                "long-term wear"
            ],
            "not_suitable_for": [
                "nickel-containing gold",
                "white gold with nickel"
            ],
            "color_options": [
                "yellow",
                "white (nickel-free only)",
                "rose/pink"
            ],
            "pros": [
                "Luxurious appearance",
                "Does not tarnish",
                "Biocompatible when nickel-free",
                "Long-lasting",
                "Traditional choice"
            ],
            "cons": [
                "Expensive",
                "Must verify nickel-free",
                "White gold often contains nickel",
                "Softer than titanium/steel",
                "Can scratch easily"
            ],
            "red_flags": [
                "White gold without nickel-free certification",
                "Generic \"14K gold\" without composition details",
                "Seller cannot verify alloy content",
                "Suspiciously low price for \"gold\"",
                "Plated gold (NOT solid gold)"
            ],
            "sterilization_methods": [
                "Autoclave",
                "Chemical sterilization"
            ]
        },
        "gold_18k": {
            "name": "18K Gold",
            "biocompatibility": "Excellent IF nickel-free",
            "composition": "75% gold + alloys (MUST be nickel-free)",
            "verification_tips": "Same as 14K - verify nickel-free. 18K is preferred over 14K for initial piercings due to higher purity.",
            "maintenance": "Clean with jewelry cleaner. Very soft - handle carefully.",
            "common_names": [
                "18 Karat Gold",
                "18K",
                "750 Gold"
            ],
            "suitable_for": [
                "initial piercings (if nickel-free)",
                "healed piercings",
                "sensitive skin",
                "long-term wear"
            ],
            "not_suitable_for": [
                "nickel-containing gold"
            ],
            "color_options": [
                "yellow",
                "white (nickel-free only)",
                "rose/pink"
            ],
            "pros": [
                "Higher gold content (75%)",
                "Better biocompatibility than 14K",
                "Luxurious appearance",
                "Does not tarnish",
                "Hypoallergenic when nickel-free"
            ],
            "cons": [
                "Very expensive",
                "Must verify nickel-free",
                "Softer than 14K",
                "Limited design options",
                "Can dent or scratch"
            ],
            "red_flags": [
                "White gold without nickel-free proof",
                "No hallmark or purity stamp",
                "Seller cannot verify composition",
                "Plated or filled (not solid)"
            ],
            "sterilization_methods": [
                "Autoclave",
                "Chemical sterilization"
            ]
        },
        "bioflex": {
            "name": "BioFlex",
            "biocompatibility": "Excellent - ISO 10993 compliant, USP Class VI tested",
            "composition": "Medical-grade PP-R random copolymer with internal lubricant for low surface friction (monolithic injection-moulded)",
            "verification_tips": "Request certification documentation showing ISO 10993 and USP Class VI compliance. Genuine BioFlex(R) body jewelry from Poli International comes with full compliance certificates.",
            "maintenance": "Can be autoclaved. Clean with mild soap and water. Replace if damaged or discolored.",
            "common_names": [
                "BioFlex",
                "Flexible Body Jewelry"
            ],
            "suitable_for": [
                "initial piercings",
                "healed piercings",
                "pregnancy",
                "medical procedures (MRI, X-ray)",
                "sensitive skin",
                "retainers"
            ],
            "not_suitable_for": [],
            "color_options": [
                "clear (high transparency)",
                "various colors"
            ],
            "pros": [
                "ISO 10993 biocompatible",
                "USP Class VI tested",
                "FDA Drug Master File assigned",
                "Can be steam sterilized (autoclave)",
                "Ethylene oxide sterilizable",
                "Flexible and comfortable",
                "MRI/X-ray safe",
                "Excellent chemical resistance",
                "Good for pregnancy",
                "Can be cut to size",
                "High transparency"
            ],
            "cons": [
                "More expensive than generic plastic",
                "Requires genuine BioFlex(R) body jewelry brand for certifications",
                "Not as rigid as metal jewelry"
            ],
            "red_flags": [
                "Generic \"flexible jewelry\" without certifications",
                "Seller cannot provide ISO 10993 documentation",
                "Suspiciously cheap \"BioFlex\" knock-offs",
                "Labeled \"BioFlex-style\" instead of genuine BioFlex"
            ],
            "sterilization_methods": [
                "Autoclave (steam)",
                "Ethylene oxide",
                "Chemical sterilization"
            ]
        },
        "bioplast": {
            "name": "Bioplast",
            "biocompatibility": "Excellent - ISO 10993 compliant, USP Class VI tested",
            "composition": "Medical-grade modified polymer (different grade from BioFlex, same source material)",
            "verification_tips": "Request certification documentation showing ISO 10993 and USP Class VI compliance. Genuine Bioplast comes with full compliance certificates. Note: Bioplast is a different grade than BioFlex (translucent vs high transparency).",
            "maintenance": "Can be autoclaved. Clean with mild soap and water. Replace if damaged or discolored.",
            "common_names": [
                "Bioplast",
                "Bio-plast",
                "Flexible Body Jewelry"
            ],
            "suitable_for": [
                "initial piercings",
                "healed piercings",
                "pregnancy",
                "medical procedures (MRI, X-ray)",
                "sensitive skin",
                "retainers"
            ],
            "not_suitable_for": [],
            "color_options": [
                "translucent",
                "various colors"
            ],
            "pros": [
                "ISO 10993 biocompatible",
                "USP Class VI tested",
                "FDA Drug Master File assigned",
                "Can be steam sterilized (autoclave)",
                "Ethylene oxide sterilizable",
                "Flexible and comfortable",
                "MRI/X-ray safe",
                "Excellent chemical resistance",
                "Good for pregnancy",
                "Can be cut to size"
            ],
            "cons": [
                "Translucent (not as clear as BioFlex)",
                "More expensive than generic plastic",
                "Requires genuine Bioplast brand for certifications",
                "Not as rigid as metal jewelry"
            ],
            "red_flags": [
                "Generic \"flexible jewelry\" without certifications",
                "Seller cannot provide ISO 10993 documentation",
                "Suspiciously cheap \"Bioplast\" knock-offs",
                "Labeled \"Bioplast-style\" instead of genuine Bioplast"
            ],
            "sterilization_methods": [
                "Autoclave (steam)",
                "Ethylene oxide",
                "Chemical sterilization"
            ]
        },
        "ptfe": {
            "name": "PTFE (Polytetrafluoroethylene)",
            "biocompatibility": "Excellent - Biocompatible and inert, widely used in medical implants",
            "composition": "Polytetrafluoroethylene (PTFE) - inert fluoropolymer",
            "verification_tips": "MUST be medical-grade PTFE, not industrial-grade. Medical-grade PTFE is biocompatible and safe for body jewelry. Industrial-grade PTFE is NOT suitable. PTFE has been used in medical implants for decades.",
            "maintenance": "Autoclavable. Clean with mild soap and water. Replace if discolored or damaged. Medical-grade PTFE is very stable.",
            "common_names": [
                "PTFE",
                "Teflon",
                "Medical-Grade PTFE",
                "Flexible Retainer"
            ],
            "suitable_for": [
                "initial piercings",
                "healed piercings",
                "pregnancy",
                "medical procedures (MRI, X-ray)",
                "sensitive skin",
                "retainers",
                "non-load bearing applications"
            ],
            "not_suitable_for": [],
            "color_options": [
                "white/translucent",
                "colored (dyed)"
            ],
            "pros": [
                "Biocompatible and inert",
                "Used in medical implants for non-load bearing joints",
                "Autoclavable (up to 230°C)",
                "Gamma irradiation sterilizable",
                "Ethylene oxide sterilizable",
                "Extremely flexible",
                "MRI/X-ray safe",
                "Non-magnetic",
                "Chemically resistant",
                "Lightweight",
                "Can be cut to size",
                "Affordable"
            ],
            "cons": [
                "Must be medical-grade (not industrial-grade)",
                "Industrial PTFE can harbor bacteria",
                "DuPont disclaims medical use (body jewelry is cosmetic use, widely tolerated)",
                "Not as strong as metal",
                "Can discolor over time"
            ],
            "red_flags": [
                "Industrial-grade PTFE (not medical-grade)",
                "Discolored or degraded PTFE",
                "Extremely cheap \"PTFE\" without specification",
                "Seller cannot confirm medical-grade status"
            ],
            "sterilization_methods": [
                "Autoclave (up to 230°C)",
                "Gamma irradiation",
                "Ethylene oxide"
            ]
        },
        "glass": {
            "name": "Glass (Borosilicate)",
            "biocompatibility": "Excellent",
            "composition": "Borosilicate glass (low thermal expansion)",
            "verification_tips": "Verify lead-free and borosilicate. Avoid soda-lime glass for body jewelry. Check for cracks or chips before use.",
            "maintenance": "Easy to clean. Inspect for damage regularly. Autoclave safe.",
            "common_names": [
                "Pyrex Glass",
                "Borosilicate Glass",
                "Glass Plugs"
            ],
            "suitable_for": [
                "initial piercings",
                "stretched piercings",
                "healed piercings",
                "sensitive skin"
            ],
            "not_suitable_for": [
                "high-impact areas",
                "active lifestyles (can break)"
            ],
            "color_options": [
                "clear",
                "colored",
                "swirled",
                "artistic designs"
            ],
            "pros": [
                "Hypoallergenic",
                "Non-porous and easy to clean",
                "Can be autoclaved",
                "Beautiful aesthetic options",
                "No metal allergies"
            ],
            "cons": [
                "Can break if dropped",
                "Heavy (for large sizes)",
                "Limited threading options",
                "Must be lead-free"
            ],
            "red_flags": [
                "Contains lead (some decorative glass)",
                "Cracked or chipped glass",
                "Soda-lime glass (less durable)",
                "Extremely cheap glass (quality concerns)"
            ],
            "sterilization_methods": [
                "Autoclave",
                "Chemical sterilization"
            ]
        },
        "stone": {
            "name": "Natural Stone",
            "biocompatibility": "Varies by stone type",
            "composition": "Natural mineral stone",
            "verification_tips": "Only for healed piercings. Research specific stone type - some are unsafe (malachite, azurite contain toxins). Must be highly polished.",
            "maintenance": "Clean with mild soap only. Cannot be sterilized. Replace if damaged.",
            "common_names": [
                "Stone Plugs",
                "Semi-precious Stone",
                "Gemstone"
            ],
            "suitable_for": [
                "healed stretched piercings",
                "short-term wear"
            ],
            "not_suitable_for": [
                "initial piercings",
                "unhealed piercings",
                "overnight wear"
            ],
            "color_options": [
                "varies by stone type"
            ],
            "pros": [
                "Natural and beautiful",
                "Unique patterns",
                "Comfortable when polished",
                "Wide variety of types"
            ],
            "cons": [
                "Porous (can harbor bacteria)",
                "Cannot be autoclaved",
                "Some stones are toxic when worn",
                "Can crack or chip",
                "Not for initial piercings"
            ],
            "red_flags": [
                "Porous or rough surface",
                "Toxic stone types (malachite, azurite, etc.)",
                "Used in unhealed piercings",
                "Cracked or damaged stone"
            ],
            "sterilization_methods": [
                "Surface cleaning only"
            ]
        },
        "wood": {
            "name": "Wood / Organic Materials",
            "biocompatibility": "Varies - some woods are toxic",
            "composition": "Natural wood or organic plant material",
            "verification_tips": "ONLY for fully healed, stretched piercings. Avoid toxic woods (rosewood, cocobolo, ebony). Must be sealed and polished. Remove when showering.",
            "maintenance": "Oil regularly with jojoba oil. Never wear in water. Replace every few months.",
            "common_names": [
                "Wood Plugs",
                "Organic Jewelry",
                "Bamboo",
                "Teak"
            ],
            "suitable_for": [
                "healed stretched piercings only",
                "short-term wear"
            ],
            "not_suitable_for": [
                "initial piercings",
                "unhealed piercings",
                "wet environments",
                "overnight wear"
            ],
            "color_options": [
                "natural wood tones",
                "dyed"
            ],
            "pros": [
                "Lightweight",
                "Natural appearance",
                "Comfortable",
                "Affordable"
            ],
            "cons": [
                "Very porous (bacteria risk)",
                "Cannot be sterilized",
                "Swells when wet",
                "Some woods are toxic",
                "Short lifespan",
                "Not for initial piercings"
            ],
            "red_flags": [
                "Unsealed or rough wood",
                "Toxic wood species",
                "Used in unhealed piercings",
                "Swollen or damaged wood",
                "Seller recommends for healing"
            ],
            "sterilization_methods": []
        },
        "acrylic": {
            "name": "Acrylic / Plastic",
            "biocompatibility": "Poor - can leach chemicals",
            "composition": "Polymethyl methacrylate (PMMA) or similar plastics",
            "verification_tips": "DO NOT USE for body piercing. This is fashion jewelry only.",
            "maintenance": "N/A - not for body piercing",
            "common_names": [
                "Acrylic",
                "Plastic",
                "Lucite",
                "Resin"
            ],
            "suitable_for": [],
            "not_suitable_for": [
                "initial piercings",
                "healing piercings",
                "long-term wear",
                "body piercing in general"
            ],
            "color_options": [
                "all colors available"
            ],
            "pros": [
                "Very cheap",
                "Lightweight",
                "Colorful options"
            ],
            "cons": [
                "NOT SAFE for body piercing",
                "Cannot be sterilized",
                "Porous and harbors bacteria",
                "Can leach toxic chemicals",
                "Causes irritation",
                "NOT professionally recommended"
            ],
            "red_flags": [
                "Any acrylic marketed for body piercing",
                "Seller claims \"safe\" or \"hypoallergenic\"",
                "Used in initial piercings (dangerous)",
                "Marketed to young people as \"affordable option\""
            ],
            "sterilization_methods": []
        }
    },
    "product_claims": {
        "implant_grade_titanium": {
            "claim": "Implant Grade Titanium",
            "red_flags": [
                "No mill certification provided",
                "Grade 5 marketed as \"implant grade\"",
                "Suspiciously low price",
                "Generic \"titanium\" without grade specification"
            ],
            "verification_steps": [
                "Request mill certification showing ASTM F136",
                "Verify Grade 23 (Ti-6Al-4V ELI), not Grade 5",
                "Check oxygen content: must be ≤0.13% (not 0.20%)",
                "Confirm \"ELI\" (Extra Low Interstitial) designation"
            ]
        },
        "surgical_steel": {
            "claim": "Surgical Steel",
            "red_flags": [
                "\"Surgical steel\" without ASTM certification",
                "No mention of 316LVM specifically",
                "Generic \"stainless steel\" claims",
                "Very low prices"
            ],
            "verification_steps": [
                "Request mill certification showing ASTM F138",
                "Verify 316LVM (not just 316L)",
                "Check carbon content: must be ≤0.030%",
                "Confirm low nickel release for EU compliance"
            ]
        },
        "hypoallergenic": {
            "claim": "Hypoallergenic",
            "red_flags": [
                "No supporting certification",
                "Contains nickel (check composition)",
                "Plated or coated (coating can wear off)",
                "Acrylic marketed as \"hypoallergenic\""
            ],
            "verification_steps": [
                "Verify material is nickel-free (titanium, niobium, etc.)",
                "Request biocompatibility test results",
                "Check for EN 1441 compliance if nickel present",
                "Avoid plated materials regardless of claims"
            ]
        },
        "medical_grade": {
            "claim": "Medical Grade",
            "red_flags": [
                "No specific standard cited",
                "Vague \"medical grade\" without documentation",
                "Cannot provide mill certification",
                "Supplier evasive about certifications"
            ],
            "verification_steps": [
                "Ask: \"Medical grade according to which standard?\"",
                "Request specific ASTM or ISO certification",
                "Verify biocompatibility testing",
                "Check manufacturer certifications"
            ]
        }
    },
    "next_steps": {
        "section_title": "Related Compliance Tools",
        "section_subtitle": "Further verification and compliance monitoring resources for body jewelry and tattoo studio professionals.",
        "badge_free": "Free",
        "badge_paid": "Paid (from 9.50 € trial)",
        "checker_desc": "Paste an SDS block and check tattoo ink or body jewellery ingredients against the ECHA SVHC Candidate List.",
        "monitor_desc": "Email alerts across four EU regulations: REACH SVHC, Biocides, Cosmetics and Medical Devices, with a searchable ECHA Candidate List.",
        "guard_desc": "Upload an SDS PDF and receive an EU 2020/2081, REACH SVHC and Nickel compliance report.",
        "guard_note": "REACH Guard produces a compliance report on an SDS. It is a screening report, not a certificate: read it with the same care this tool teaches."
    },
    "cert_reader": {
        "trace_mill_cert": "Mill Test Report (MTR) referenced",
        "presets_label": "Quick Test Phrasing Presets:",
        "evidence_hierarchy_title": "The Evidence Hierarchy: Marketing Phrase vs. Mill Certificate",
        "parsed_terminology_title": "🏷️ Parsed Terminology in Phrasing",
        "what_establishes_title": "What This Phrasing Actually Establishes",
        "what_gaps_title": "What This Phrasing Does NOT Establish (The Critical Gap)",
        "substantiating_doc_title": "What Document Substantiates This Claim:",
        "substantiating_doc_note": "Remember: A real Mill Test Report (MTR) comes from the raw metal melt mill, lists exact chemical element percentages, mechanical tensile/yield figures, and specifies the exact Heat Lot Number corresponding to the jewelry packaging.",
        "need_verify_cta": "Need to verify this with your supplier?",
        "btn_generate_questions": "✉️ Generate Supplier Question Sheet for this Claim →",
        "btn_copy_analysis": "📋 Copy Analysis",
        "btn_save_record": "📁 Save to Studio Record",
        "toast_analysis_copied": "Analysis Copied!",
        "tag_standard": "[STANDARD]",
        "tag_alloy": "[ALLOY]",
        "tag_trace": "[TRACE]",
        "tag_market": "[MARKETING]",
        "tag_established": "[ESTABLISHED]",
        "tag_critical_gap": "[CRITICAL GAP]",
        "level_0_title": "LEVEL 0: UNVERIFIED MARKETING CLAIM (ZERO TECHNICAL PROOF)",
        "level_1_title": "LEVEL 1: AMBIGUOUS SPECIFICATION / CATALOG SHORTHAND",
        "level_2_title": "LEVEL 2: STANDARD CITED WITHOUT MELT TRACEABILITY",
        "level_3_title": "LEVEL 3: FULLY DOCUMENTED & TRACEABLE STANDARD",
        "level_0_desc": "Marketing claims, catalog descriptions, and generic buzzwords without specific metallurgical standard or heat lot number.",
        "level_1_desc": "Mentions a recognized alloy or grade shorthand (e.g., Ti-6Al-4V, 316LVM) but omits the governing surgical standard and melt certificate.",
        "level_2_desc": "Formally cites a published implant standard (e.g., ASTM F136, ISO 5832-1) but lacks an individual Mill Test Report (MTR) heat number linking the physical piece to the melt batch.",
        "level_3_desc": "Gold standard: Complete Mill Test Report (EN 10204 3.1) stating exact chemical composition, mechanical properties, and matching heat lot identifier.",
        "diagram_level_prefix": "LEVEL",
        "diagram_level_0_title": "Marketing Claim",
        "diagram_level_0_sub": "No standards, no heat #",
        "diagram_level_1_title": "Catalog Shorthand",
        "diagram_level_1_sub": "Generic grade name",
        "diagram_level_2_title": "Standard Cited",
        "diagram_level_2_sub": "ASTM/ISO, missing heat #",
        "diagram_level_3_title": "Certified MTR",
        "diagram_level_3_sub": "ASTM + Heat # + Chemistry",
        "tier_analyzed_pointer": "ANALYZED PHRASING TIER",
        "market_implant_grade": "Implant Grade (Unregulated marketing phrase)",
        "market_surgical_steel": "Surgical Steel / Surgical Grade (Marketing phrase)",
        "market_hypoallergenic": "Hypoallergenic (Unsubstantiated marketing claim)",
        "market_medical_grade": "Medical Grade (Generic marketing claim)",
        "market_nickel_free": "Nickel-Free (Composition claim)",
        "market_autoclave_safe": "Autoclave Safe (Thermal claim)",
        "market_pure_titanium": "Pure Titanium (Ambiguous grade claim)",
        "trace_heat_number": "Heat / Melt Number cited",
        "trace_batch_lot": "Production Batch / Lot Number cited",
        "establishes_standards": "Formally asserts compliance with published technical standards: {standards}.",
        "establishes_alloys": "Specifies a target material alloy/formulation: {alloys}.",
        "establishes_traceability": "Provides traceability markers: {markers}.",
        "establishes_none": "NONE. The text consists entirely of promotional descriptors and establishes zero technical, chemical, or biological facts.",
        "gap_melt_traceability": "Melt Lot Traceability: No heat number linking this individual piece to a specific melting batch or mill chemical analysis.",
        "gap_implant_spec": "Implant Specification: Terms like \"implant grade\" or \"surgical steel\" have zero legal or metallurgical weight without ASTM/ISO standard citation.",
        "gap_eli_oxygen": "ELI Oxygen Verification: Titanium Grade 5 (0.20% oxygen) is often sold as generic \"titanium\". Only ASTM F136 guarantees the Extra Low Interstitial (ELI) oxygen ceiling (≤ 0.13%).",
        "gap_var_remelt": "Vacuum Arc Remelting (VAR): Commercial 316L is melted in open air and has higher carbon/sulfur and non-metallic inclusions than vacuum-melted ASTM F138 316LVM.",
        "gap_allergen_proof": "Allergen Chemical Proof: \"Hypoallergenic\" does not disclose nickel content, plating thickness, or substrate base metals.",
        "gap_doc_physical_proof": "Documentary Physical Proof: A distributor claim or invoice label is not a Mill Test Report (MTR). True verification requires the melt mill laboratory sheet.",
        "proof_titanium": "Original Mill Test Report (MTR) per EN 10204 3.1 showing ASTM F136 (Ti-6Al-4V ELI), Oxygen ≤ 0.13%, Iron ≤ 0.25%, and matching Heat Number stamped on packet.",
        "proof_steel": "Mill Test Report citing ASTM F138 (Grade 2 Bar/Wire), 316LVM vacuum remelted, Carbon ≤ 0.030%, Sulfur ≤ 0.010%, with lot heat number.",
        "proof_polymer": "USP Class VI biological reactivity testing certificate + ISO 10993-5 cytotoxicity report for medical-grade PP-R resin.",
        "proof_niobium": "Mill Test Certificate showing ASTM F2229 unalloyed niobium (≥ 99.85% Nb) with low interstitials.",
        "proof_generic": "Official raw material Mill Test Report (MTR) from melting mill with chemical analysis, mechanical testing, and heat lot identifier.",
        "copy_summary_title": "MATERIAL CERTIFICATION CHECKER - PHRASING ANALYSIS",
        "copy_summary_date": "Date:",
        "copy_summary_phrasing": "Analyzed Phrasing:",
        "copy_summary_tier": "Evidence Tier:",
        "copy_summary_establishes": "WHAT THIS PHRASING ESTABLISHES:",
        "copy_summary_gaps": "WHAT THIS PHRASING DOES NOT ESTABLISH (THE GAP):",
        "copy_summary_proof": "REQUIRED DOCUMENTARY PROOF:"
    },
    "supplier_questions": {
        "title": "Supplier Question Sheet Generator",
        "subtitle": "Given a material and an intended clinical application, produce the exact technical questions to send a supplier, along with what a satisfactory answer contains and what red flags to avoid. Printable and ready to send.",
        "material_label": "Target Material / Alloy",
        "opt_astm_f136": "ASTM F136 Titanium (Ti-6Al-4V ELI)",
        "opt_astm_f138": "ASTM F138 Stainless Steel (316LVM)",
        "opt_bioflex": "BioFlex® Medical Polymer (USP Class VI)",
        "opt_niobium": "ASTM F2229 Niobium (Unalloyed)",
        "opt_glass": "Borosilicate Glass 3.3",
        "opt_gold": "Solid 14K/18K Gold",
        "opt_commercial_316l": "Commercial 316L / Grade 5 Titanium",
        "application_label": "Intended Clinical Application",
        "app_initial": "Initial Piercing (Fresh Open Wound Canal)",
        "app_healed": "Healed Piercing (Intact Epithelium)",
        "app_sensitive": "Sensitive Skin / Suspected Nickel Allergy",
        "app_oral": "Oral / Mucosal Piercing (Saliva & Enamel Contact)",
        "app_subdermal": "Surface Piercing / Subdermal Dermal Anchor",
        "studio_label": "Your Studio Name",
        "studio_placeholder": "e.g. Black Lotus Body Arts",
        "supplier_label": "Supplier Name",
        "supplier_placeholder": "e.g. Industrial Strength / Anatometal",
        "item_label": "Item / PO Ref",
        "item_placeholder": "e.g. PO-2026-0819 Titanium Posts",
        "sheet_badge": "[STUDIO COMPLIANCE INQUIRY]",
        "sheet_title": "Technical Material Verification Sheet",
        "sheet_subtitle": "Ready to send directly to your supplier before ordering. Printable.",
        "btn_copy": "📋 Copy for Email",
        "btn_print": "🖨️ Print Sheet",
        "btn_download": "💾 Download (.txt)",
        "field_date": "Date:",
        "field_studio": "Studio:",
        "default_studio": "Professional Body Studio",
        "field_supplier": "Supplier:",
        "default_supplier": "Jewelry Supplier / Manufacturer",
        "field_item": "Item / PO Ref:",
        "default_item": "Body Jewelry Inquiry",
        "field_material": "Evaluated Material:",
        "field_use": "Intended Use:",
        "sec_tissue_title": "📍 Tissue Boundary & Clinical Application Context",
        "sec_criteria_title": "Mandatory Studio Receiving Criteria:",
        "sec_questions_title": "❓ Exact Technical Questions to Send Supplier",
        "question_num": "Question {num}",
        "label_satisfactory": "[SATISFACTORY ANSWER]:",
        "label_unsatisfactory": "[UNSATISFACTORY / RED FLAG]:",
        "sig_reviewer": "Authorized Studio Reviewer: ___________________________________",
        "sig_status": "Date & Status: ___________________________ [ ] Approved  [ ] Quarantine",
        "toast_copied": "Question Sheet Copied!",
        "txt_title": "FORMAL SUPPLIER TECHNICAL SPECIFICATION INQUIRY",
        "txt_to": "To:",
        "txt_from": "From:",
        "txt_app": "Intended Application:",
        "txt_rationale": "TISSUE BOUNDARY & CLINICAL RATIONALE:",
        "txt_mandatory": "MANDATORY STUDIO PURCHASE CRITERIA:",
        "txt_questions_heading": "TECHNICAL QUESTIONS REQUIRED FOR PURCHASE APPROVAL:",
        "txt_questions_intro": "Please provide written documentation confirming the following specifications:",
        "txt_closing": "Thank you for your assistance in maintaining client safety and material compliance.",
        "txt_auth_rep": "Authorized Studio Representative:",
        "use_initial_piercing_context": "Parenteral open wound; material sits in direct contact with bleeding tissue, cellular exudate, and developing granulation tissue. High risk of systemic ion absorption and allergic sensitization.",
        "use_initial_piercing_req_0": "Mandatory raw material Mill Test Report with Melt Heat Number",
        "use_initial_piercing_req_1": "Proven biocompatibility (ISO 10993-5 cytotoxicity grade 0)",
        "use_initial_piercing_req_2": "Validated autoclave sterilization tolerance (134°C steam)",
        "use_initial_piercing_req_3": "Internal threading or threadless press-fit only",
        "use_initial_piercing_req_4": "Mirror polish Ra < 0.05 µm with zero tooling ridges",
        "use_healed_piercing_context": "Fully healed tissue canal lined with stratified squamous epithelium. Barrier function is established, but prolonged skin contact still requires non-toxic, non-irritating materials.",
        "use_healed_piercing_req_0": "Corrosion resistance against sweat and sebum",
        "use_healed_piercing_req_1": "Absence of toxic heavy metals (lead, cadmium)",
        "use_healed_piercing_req_2": "Safe mechanical finish without sharp edges",
        "use_healed_piercing_req_3": "Stable inert composition",
        "use_sensitive_client_context": "Client with known hypersensitivity to nickel, chrome, or generic alloy impurities. Requires strict zero-nickel materials to prevent contact dermatitis.",
        "use_sensitive_client_req_0": "Zero nickel content: ASTM F136 Titanium, ASTM F2229 Niobium, or USP Class VI PP-R",
        "use_sensitive_client_req_1": "Avoid all 316L/316LVM steel (which contains 13-15% bound nickel)",
        "use_sensitive_client_req_2": "Avoid white gold unless alloyed exclusively with palladium",
        "use_sensitive_client_req_3": "Verification of clean uncross-contaminated manufacturing tools",
        "use_oral_mucosal_context": "Constant exposure to saliva, fluctuating pH, oral enzymes, and continuous dental contact. Abrasion and erosion risk to tooth enamel.",
        "use_oral_mucosal_req_0": "High corrosion resistance in moist, warm, acidic oral environment",
        "use_oral_mucosal_req_1": "Biocompatible polymer options (BioFlex®) to reduce dental enamel wear",
        "use_oral_mucosal_req_2": "Zero leaching of plasticizers or monomers into oral cavity",
        "use_oral_mucosal_req_3": "Autoclave sterility prior to initial insertion",
        "use_subdermal_surface_context": "Permanent subdermal implant where anchor base resides within subcutaneous tissue. Highest mechanical shear stress and cellular adhesion requirement.",
        "use_subdermal_surface_req_0": "Strict ASTM F136 Ti-6Al-4V ELI titanium only",
        "use_subdermal_surface_req_1": "Full MTR with traceable melt heat lot number mandatory",
        "use_subdermal_surface_req_2": "Perforated anchor base allowing tissue integration",
        "use_subdermal_surface_req_3": "No steel, no plated metals, no unverified polymers",
        "q_astm_f136_0_q": "Can you provide the original Mill Test Report (MTR / Mill Certificate) for the raw bar stock from which this specific production lot was machined?",
        "q_astm_f136_0_sat": "Unedited copy of the raw material test report from an accredited melting mill (e.g., Baoji Titanium, Perryman, Carpenter) displaying ASTM F136 compliance and mechanical test values.",
        "q_astm_f136_0_unsat": "A distributor letter of conformity (CoC), a generic RoHS/REACH declaration, a verbal statement, or a refusal claiming the MTR is proprietary.",
        "q_astm_f136_1_q": "Does the Mill Test Report explicitly state \"ELI\" (Extra Low Interstitial) and verify oxygen content ≤ 0.13% and iron ≤ 0.25%?",
        "q_astm_f136_1_sat": "Chemical breakdown table listing exact weight percentages with Oxygen (O) strictly ≤ 0.13% and Iron (Fe) ≤ 0.25%.",
        "q_astm_f136_1_unsat": "Listing as \"Ti-6Al-4V\" without ELI designation, or oxygen content above 0.13% (which indicates Grade 5 under ISO 5832-3 or ASTM F1472, not ELI Grade 23).",
        "q_astm_f136_2_q": "What is the unique Heat Number / Melt Lot Number on this material, and how does it correlate with the batch label on our shipment?",
        "q_astm_f136_2_sat": "A clear Heat Number (e.g. HT-84920) printed on the packaging or invoice that matches the Heat Number on the attached MTR.",
        "q_astm_f136_2_unsat": "No heat number provided, or an internal SKU number substituted for metallurgical melt lot traceability.",
        "q_astm_f136_3_q": "What surface finishing protocol is applied to tissue-contact surfaces, and has the surface roughness been verified to Ra < 0.05 µm (mirror finish)?",
        "q_astm_f136_3_sat": "Confirmation of passivated mirror mechanical or electropolish with Ra surface roughness inspection report showing no tooling marks or microscopic pits under magnification.",
        "q_astm_f136_3_unsat": "\"Standard tumble polish\" without roughness verification, visible tool ridges, or matte cast finishes on wearable surfaces.",
        "q_astm_f138_0_q": "Can you provide the Mill Test Report (MTR) confirming compliance specifically with ASTM F138 (or ISO 5832-1) for surgical implant bar and wire?",
        "q_astm_f138_0_sat": "Mill certificate citing ASTM F138 Grade 2. Must state vacuum arc remelting (316LVM) and carbon content ≤ 0.030%.",
        "q_astm_f138_0_unsat": "A certificate citing only commercial ASTM A276 or generic \"AISI 316L\". Commercial 316L is air-melted and does not meet ASTM F138 surgical implant standards.",
        "q_astm_f138_1_q": "Does the chemical analysis confirm carbon content ≤ 0.030% and sulfur content ≤ 0.010%?",
        "q_astm_f138_1_sat": "Chemical report showing low carbon (C ≤ 0.030%) to prevent carbide precipitation and ultra-low sulfur (S ≤ 0.010%) to prevent pitting corrosion.",
        "q_astm_f138_1_unsat": "Carbon levels > 0.030% or sulfur levels not tested/exceeding medical thresholds.",
        "q_astm_f138_2_q": "Was the steel vacuum melted (Vacuum Induction Melted + Vacuum Arc Remelted - VIM/VAR)?",
        "q_astm_f138_2_sat": "Specification of electro-slag remelt (ESR) or vacuum arc remelt (VAR) ensuring low inclusion content and high metallurgical purity.",
        "q_astm_f138_2_unsat": "Standard electric-arc air melt without secondary consumable electrode remelting.",
        "q_astm_f138_3_q": "What is the unique Heat Number tying this shipment directly to the mill analysis?",
        "q_astm_f138_3_sat": "Heat number marked on parcel and matching the test certificate exactly.",
        "q_astm_f138_3_unsat": "Generic certificate with heat number erased or omitted.",
        "q_bioflex_polymer_0_q": "Can you provide biological reactivity test reports certifying the raw polymer meets USP Class VI requirements (70°C and 121°C systemic injection, intracutaneous, and implantation tests)?",
        "q_bioflex_polymer_0_sat": "Accredited testing laboratory certificate confirming USP Class VI compliance for the medical polymer formulation (medical-grade PP-R).",
        "q_bioflex_polymer_0_unsat": "Generic \"food grade\" or \"FDA compliant\" statement. Food-contact approval does not substantiate parenteral wound contact.",
        "q_bioflex_polymer_1_q": "Has the material undergone in vitro cytotoxicity testing per ISO 10993-5 and dermal sensitisation testing per ISO 10993-10?",
        "q_bioflex_polymer_1_sat": "Laboratory test summary showing non-cytotoxic score (grade 0/1) and zero dermal sensitization.",
        "q_bioflex_polymer_1_unsat": "No biocompatibility test data; relying solely on marketing names.",
        "q_bioflex_polymer_2_q": "Is the material steam autoclave sterilizable, and what is the maximum temperature/cycle duration validated?",
        "q_bioflex_polymer_2_sat": "Clear validation for steam autoclave cycles (e.g., 121°C / 250°F for 20 minutes) without thermal degradation or toxic volatile release.",
        "q_bioflex_polymer_2_unsat": "\"Do not autoclave\", or plastics that melt/warp at autoclave temperatures (like commercial acrylic or PVC).",
        "q_bioflex_polymer_3_q": "Is the polymer formulated without plasticizers (such as phthalates), bisphenol-A (BPA), and heavy-metal colorants?",
        "q_bioflex_polymer_3_sat": "Material safety formulation sheet confirming 100% absence of phthalates, BPA, and toxic stabilizers.",
        "q_bioflex_polymer_3_unsat": "Flexible vinyl/PVC containing migration plasticizers or unverified colored masterbatch.",
        "q_niobium_0_q": "Can you provide a Mill Test Report confirming unalloyed niobium compliance with ASTM F2229 (or commercially pure Nb ≥ 99.9%)?",
        "q_niobium_0_sat": "MTR showing pure niobium assay (minimum 99.85% to 99.9% Nb) with low interstitials (Ta ≤ 0.3%, O ≤ 0.04%).",
        "q_niobium_0_unsat": "Plated base metals or alloys with unverified composition.",
        "q_niobium_1_q": "Is the item solid niobium throughout, free of surface plating, electro-cladding, or base metal cores?",
        "q_niobium_1_sat": "Verification of 100% solid wrought niobium metal throughout the entire cross-section.",
        "q_niobium_1_unsat": "Niobium-plated brass or steel.",
        "q_niobium_2_q": "If colored, is the color produced exclusively through anodization (controlled surface oxide layer) rather than chemical dyes or lacquers?",
        "q_niobium_2_sat": "Confirmation that coloring is 100% electrolytic interference oxidation with zero pigments, dyes, or polymers added.",
        "q_niobium_2_unsat": "Enamel paint, lacquer coating, or chemical immersion colorants.",
        "q_borosilicate_glass_0_q": "Can you verify that the jewelry is manufactured from solid, lead-free borosilicate glass (Borosilicate 3.3 per ISO 3585)?",
        "q_borosilicate_glass_0_sat": "Manufacturer statement confirming solid borosilicate glass 3.3 composition, 100% free of lead, arsenic, and cadmium fluxes.",
        "q_borosilicate_glass_0_unsat": "Soft soda-lime craft glass, lead crystal, or glass with surface enamel paint.",
        "q_borosilicate_glass_1_q": "Has the finished piece undergone thorough furnace annealing to eliminate internal thermal stress?",
        "q_borosilicate_glass_1_sat": "Inspection confirmation under a polariscope showing zero birefringence/stress fractures from the annealing cycle.",
        "q_borosilicate_glass_1_unsat": "Unannealed flame-worked glass susceptible to spontaneous thermal shock cracking.",
        "q_borosilicate_glass_2_q": "Is the wearable surface fire-polished to a completely smooth, pore-free finish without micro-abrasions?",
        "q_borosilicate_glass_2_sat": "Verification of flawless fire polish on all wearable surfaces.",
        "q_borosilicate_glass_2_unsat": "Cold-ground or unpolished ends.",
        "q_gold_solid_0_q": "Can you provide an alloy assay breakdown proving the gold is solid 14 Karat (58.3% Au) or 18 Karat (75.0% Au), and 100% free of nickel, cadmium, and lead?",
        "q_gold_solid_0_sat": "Assay sheet verifying karat weight with copper, silver, and zinc alloying elements only; nickel content undetectable (< 0.01%).",
        "q_gold_solid_0_unsat": "White gold alloyed with nickel (common in commercial jewelry), rolled gold, gold-filled, or vermeil/plated items.",
        "q_gold_solid_1_q": "Is the jewelry solid gold throughout, with zero electroplating, hollow cavities, or base metal cores?",
        "q_gold_solid_1_sat": "Confirmation of solid cast or wrought gold construction.",
        "q_gold_solid_1_unsat": "Electroplated over brass or silver, hollow-tube construction with porous seams.",
        "q_gold_solid_2_q": "Are solder joints (if any) made exclusively with cadmium-free and nickel-free plumb gold solder?",
        "q_gold_solid_2_sat": "Certification that all solder joins are biocompatible plumb solder matching the karat rating.",
        "q_gold_solid_2_unsat": "Low-karat easy solder containing cadmium or nickel fluxes.",
        "q_commercial_316l_0_q": "Does this material carry surgical implant certification (ASTM F136 or ASTM F138), or is it commercial industrial grade?",
        "q_commercial_316l_0_sat": "Full disclosure of whether the material meets implant ASTM standards or is commercial industrial stock.",
        "q_commercial_316l_0_unsat": "Misrepresenting commercial 316L or Grade 5 as \"implant grade\" without ASTM F136/F138 documentation.",
        "q_commercial_316l_1_q": "If sold for body piercing, does the supplier restrict its recommended use to fully healed fistulas rather than initial piercings?",
        "q_commercial_316l_1_sat": "Clear guideline acknowledging commercial materials are not recommended by professional standards for initial wound channels.",
        "q_commercial_316l_1_unsat": "Recommending commercial-grade metals for fresh open wounds.",
        "q_astm_f136_4_q": "Are all threaded posts designed with internal threading or threadless press-fit construction (no exposed external male threads on the wearable shaft)?",
        "q_astm_f136_4_sat": "Affirmation that no external threads pass through the tissue fistula; all wearable shafts are smooth with internal female tapping or threadless pins.",
        "q_astm_f136_4_unsat": "External threading on the wearable post that lacerates the healing wound canal during insertion."
    },
    "claim_matrix": {
        "title": "Claim-to-Evidence Matrix",
        "subtitle": "For each common marketing claim, understand what document substantiates it, what that document proves, what absence means, and how to verify it.",
        "filter_all": "All Claims",
        "filter_metals": "Metals & Alloys",
        "filter_polymers": "Polymers & Plastics",
        "filter_general": "General & Marketing",
        "search_placeholder": "🔍 Search claims or standards...",
        "th_claim": "Common Product Claim",
        "th_doc": "Required Substantiating Document",
        "th_proves": "What That Document Proves",
        "th_absence": "What Absence Means",
        "th_action": "Verification Action",
        "badge_doc_mandatory": "[DOCUMENT MANDATORY]",
        "badge_evidence_absent": "[EVIDENCE ABSENT]",
        "btn_test_phrasing": "Test Phrasing",
        "cat_metals": "Metals",
        "cat_polymers": "Polymers",
        "cat_general": "General",
        "empty_msg": "No claims match your search filter. Try clearing your search keyword.",
        "item_implant_grade_titanium_claim": "Implant Grade Titanium",
        "item_implant_grade_titanium_doc": "Mill Test Report (MTR / EN 10204 Type 3.1) citing ASTM F136 or ISO 5832-3 ELI",
        "item_implant_grade_titanium_proves": "Substantiates wrought Ti-6Al-4V ELI (Extra Low Interstitial) alloy with maximum 0.13% oxygen, certified mechanical tensile/yield data, and unique melt heat lot identification.",
        "item_implant_grade_titanium_absence": "Absence means the term functions purely as unregulated sales copy. The alloy may be Grade 5 (0.20% oxygen limit), scrap remelt, or commercial titanium with high interstitial impurities. No documentary evidence supports biocompatibility.",
        "item_implant_grade_titanium_action": "Request the mill test report. Confirm \"ASTM F136\", \"ELI\", oxygen ≤ 0.13%, and heat number matching the shipment lot.",
        "item_surgical_steel_claim": "Surgical Steel / Surgical Grade",
        "item_surgical_steel_doc": "Mill Test Report citing ASTM F138 (or ISO 5832-1) for 316LVM bar/wire",
        "item_surgical_steel_proves": "Substantiates vacuum-arc remelted 316LVM steel with carbon ≤ 0.030%, ultra-low sulfur ≤ 0.010%, and certified inclusion cleanliness per ASTM E45.",
        "item_surgical_steel_absence": "Absence means the metal is commercial 316L or 304 architectural stainless steel. Commercial steels are melted in open air, have higher carbon and inclusion contents, and pit under bodily fluids. It is not approved for initial implant tissue canals.",
        "item_surgical_steel_action": "Do not accept generic \"316L\". Demand an MTR specifying ASTM F138 (316LVM) with vacuum melt notation and carbon ≤ 0.030%.",
        "item_hypoallergenic_claim": "Hypoallergenic",
        "item_hypoallergenic_doc": "Alloy chemical breakdown + Biocompatibility testing report (ISO 10993-10 / EN 1811)",
        "item_hypoallergenic_proves": "Substantiates that known contact allergens (nickel, cobalt, chromium) are either completely absent or immobilized below biological sensitization thresholds.",
        "item_hypoallergenic_absence": "Absence means the word has zero legal, medical, or metallurgical meaning. Any supplier can print \"hypoallergenic\" on items containing 20% free nickel or toxic base metals without violating commercial labeling laws in most jurisdictions.",
        "item_hypoallergenic_action": "Discard the word \"hypoallergenic\" entirely. Inspect the specific alloy specification and independent laboratory assay.",
        "item_medical_grade_polymer_claim": "Medical Grade Polymer / BioFlex / Plastic",
        "item_medical_grade_polymer_doc": "USP Class VI biological reactivity certificate + ISO 10993-5 cytotoxicity test",
        "item_medical_grade_polymer_proves": "Substantiates in vivo biocompatibility at 121°C and in vitro zero-cytotoxicity for medical-grade PP-R resin, with zero phthalate plasticizers or heavy metal pigments.",
        "item_medical_grade_polymer_absence": "Absence means the plastic is industrial acrylic (PMMA), commercial PTFE, PVC, or cheap craft resin. These degrade under body warmth, leach monomer residues or plasticizers, and cannot survive steam autoclave cycles.",
        "item_medical_grade_polymer_action": "Require documented USP Class VI conformity and ISO 10993-5 cytotoxicity testing. Check steam autoclave validation.",
        "item_nickel_free_claim": "Nickel-Free",
        "item_nickel_free_doc": "Laboratory spectrometry assay / Chemical composition certified < 0.01% Ni",
        "item_nickel_free_proves": "Substantiates that the raw material contains no nickel additions and no detectable nickel contamination across the alloy batch.",
        "item_nickel_free_absence": "Absence means the item may be electroplated with a thin barrier coating over a nickel-rich brass or commercial steel core. Once the thin plating scratches, high nickel release causes immediate allergic contact dermatitis.",
        "item_nickel_free_action": "Confirm the core material is inherently nickel-free (ASTM F136 titanium, niobium, borosilicate glass, or certified nickel-free gold).",
        "item_autoclave_safe_claim": "Autoclave Safe / 100% Sterilizable",
        "item_autoclave_safe_doc": "Thermal cycling test validation (ISO 17665 steam sterilization validation report)",
        "item_autoclave_safe_proves": "Proves the piece survives saturated steam at 121°C–134°C without warping, melting, decomposing, releasing toxic fumes, or degrading polish.",
        "item_autoclave_safe_absence": "Absence means the item may melt inside an autoclave chamber, destroy the autoclave vacuum pump, or coat other jewelry in toxic polymer melt.",
        "item_autoclave_safe_action": "Verify manufacturer temperature tolerance: 134°C for titanium/steel/glass; 121°C for BioFlex. Never autoclave acrylic or glued stone gems.",
        "item_biocompatible_iso10993_claim": "Biocompatible / ISO 10993 Tested",
        "item_biocompatible_iso10993_doc": "Accredited lab test report specifically citing ISO 10993-5 and ISO 10993-10",
        "item_biocompatible_iso10993_proves": "Confirms that living cell cultures exposed to the material showed no lysis or cell death (cytotoxicity grade 0), and guinea pig/murine assays showed no sensitization.",
        "item_biocompatible_iso10993_absence": "Absence means \"biocompatible\" is used colloquially. ISO 10993 comprises over 20 separate parts; citing \"ISO 10993\" without specifying parts or providing test results proves nothing.",
        "item_biocompatible_iso10993_action": "Request the lab report with accredited test date, lab accreditation (ISO 17025), and specific part numbers (10993-5 cytotoxicity, 10993-10 irritation).",
        "item_astm_certified_claim": "ASTM F136 / ASTM F138 Certified",
        "item_astm_certified_doc": "Raw material Mill Test Report with verifiable mill contact and Heat Number",
        "item_astm_certified_proves": "Proves the raw ingot and bar lot complied with all metallurgical, dimensional, and chemical provisions of the American Society for Testing and Materials implant standard.",
        "item_astm_certified_absence": "Absence means the supplier copied standard numbers onto marketing sheets from a competitor catalog. Without the mill heat number, the citation is meaningless.",
        "item_astm_certified_action": "Check the MTR for a real melting mill name, heat number, lab technician signature, and test values within standard limits.",
        "item_pure_titanium_claim": "Pure Titanium / Solid Titanium",
        "item_pure_titanium_doc": "Mill Test Report citing ASTM F67 (Commercially Pure Titanium Grades 1-4)",
        "item_pure_titanium_proves": "Substantiates unalloyed titanium (98.6%–99.5% pure Ti) per ASTM F67 for surgical applications.",
        "item_pure_titanium_absence": "Often used misleadingly by suppliers who do not know the difference between unalloyed CP titanium (ASTM F67) and alloyed titanium (ASTM F136 Ti-6Al-4V ELI). Pure titanium is softer and rarely used for threaded posts.",
        "item_pure_titanium_action": "Clarify whether the item is ASTM F67 (unalloyed CP titanium) or ASTM F136 (Ti-6Al-4V ELI). Both are body-safe when certified."
    },
    "studio_record": {
        "saved_records": "Saved Studio Records",
        "btn_clear_records": "🗑️ Clear Records",
        "btn_new_inspection": "➕ New Receiving Record",
        "subtitle": "Keep dated material receiving records for your supplier file. Everything stays in this browser: no account, nothing sent.",
        "title": "Studio Records",
        "banner_badge": "[STUDIO RECEIVING RECORD]",
        "sheet_title": "Material Lot Receiving Record",
        "record_id_label": "Record ID:",
        "date_label": "Date:",
        "btn_print": "🖨️ Print for Supplier File",
        "btn_copy": "📋 Copy Summary",
        "btn_download": "💾 Download (.txt)",
        "studio_name_label": "Studio Name:",
        "inspector_label": "Inspector / Piercer:",
        "supplier_label": "Supplier / Manufacturer:",
        "po_label": "PO / Batch / Lot #:",
        "claim_label": "Claim / Label Phrasing Evaluated:",
        "evidence_status_label": "Evidence Status:",
        "checklist_title": "Studio Receiving Inspection Checklist:",
        "check_mtr": "Mill Test Report (MTR) provided by supplier",
        "check_heat": "Heat / Melt Lot Number matches packaging label",
        "check_chem": "Chemical analysis verified (O ≤ 0.13% for Ti, C ≤ 0.030% for Steel)",
        "check_thread": "Internal threading or threadless construction (no external threads)",
        "check_polish": "Surface polish inspected (mirror finish, no tooling ridges)",
        "decision_title": "Final Studio Receiving Decision:",
        "decision_initial": "[APPROVED FOR INITIAL PIERCING] Documented raw material (ASTM F136 / F138) with verified MTR & Heat #.",
        "decision_healed": "[APPROVED FOR HEALED WEAR ONLY] Secondary wear on intact epithelium only.",
        "decision_quarantine": "[QUARANTINE / ON HOLD] Missing MTR or heat number; held until supplier provides proof.",
        "decision_rejected": "[REJECTED / RETURN TO VENDOR] Unsubstantiated claims, commercial scrap, or wrong alloy.",
        "signoff_confirm": "I confirm this material lot has been evaluated against applicable ASTM/ISO implant standards:",
        "signoff_sig": "Inspector Signature: _________________________________________",
        "signoff_date": "Date of Inspection: __________________",
        "signoff_folder": "Studio Physical File Folder: [ ] Material Certs 2026",
        "toast_record_copied": "Record Copied!"
    },
    "companion": {
        "title": "Specialized Body Art Compliance Tools",
        "subtitle": "This tool specializes exclusively in material certification, standards reading, and mill test verification. For specialized quantitative calculations, ink chemistry, and clinical assessments, refer to the dedicated tools below:",
        "tool_nickel_domain": "EN 1811 Migration",
        "tool_nickel_name": "Nickel Release Calculator",
        "tool_nickel_desc": "For calculating quantitative nickel release rates (µg/cm²/week) against EU REACH Entry 27 legal thresholds.",
        "tool_nickel_badge": "Quantitative Calculation Tool",
        "tool_reach_domain": "Pigments & Inks",
        "tool_reach_name": "REACH SVHC Candidate List Checker",
        "tool_reach_desc": "For cross-referencing tattoo pigment chemistry, CAS numbers, and safety data sheets against ECHA SVHC substances.",
        "tool_reach_badge": "Chemical Screening Tool",
        "tool_size_domain": "Anatomical Fit & Sizing",
        "tool_size_name": "Jewelry Size Visualizer",
        "tool_size_desc": "For gauge conversions (AWG to mm), post lengths, disc diameters, and swelling allowance sizing charts.",
        "tool_size_badge": "Anatomical Sizing Tool",
        "tool_allergy_domain": "Dermatological Testing",
        "tool_allergy_name": "Allergy Patch Test Guide",
        "tool_allergy_desc": "For patch test documentation, metal salt panels, and clinical referral protocols for contact dermatitis.",
        "tool_allergy_badge": "Clinical Testing Reference",
        "tool_triage_domain": "Piercing Redness & Irritation",
        "tool_triage_name": "Reaction Triage Wizard",
        "tool_triage_desc": "For differentiating mechanical piercing bumps from allergic reactions or bacterial infection.",
        "tool_triage_badge": "Triage Assessment Guide",
        "tool_mri_domain": "Radiological Safety",
        "tool_mri_name": "MRI Safety Screening (ASTM F2503)",
        "tool_mri_desc": "For MR Safe, MR Conditional, and MR Unsafe screening criteria prior to diagnostic magnetic imaging.",
        "tool_mri_badge": "Radiology Screening Reference"
    },
    "library": {
        "title": "Standards & Certification Library",
        "subtitle": "Technical catalog of implant-grade standards, metallurgy requirements, and testing criteria",
        "search_placeholder": "Search standards (e.g. F136, ISO 5832, EN 1811)...",
        "standards_count": "{count} standards available",
        "standards_count_filtered": "{count} standards matching \"{query}\"",
        "category_all": "All Categories",
        "category_metals": "Metals & Metallurgy",
        "category_polymers": "Biocompatible Polymers",
        "category_biological": "Biological Evaluation & ISO",
        "category_chemical": "Chemical & REACH Restrictions",
        "view_details": "View Specification",
        "no_results": "No certification standards match your query."
    },
    "mixer": {
        "title": "Alloy & Formulation Compatibility Mixer",
        "subtitle": "Evaluate galvanic coupling, elemental composition, and biocompatibility between combined materials",
        "select_primary": "Select Primary Material",
        "select_secondary": "Select Secondary Material",
        "analyze_button": "Analyze Compatibility",
        "galvanic_risk": "Galvanic Corrosion Risk",
        "biocompatibility_score": "Combined Biocompatibility Rating",
        "clinical_summary": "Clinical Piercing Assessment",
        "elemental_analysis": "Elemental Analysis ({count} components detected)",
        "safe_pairing": "Safe Combination for Piercing Wear",
        "caution_pairing": "Caution: Potential Galvanic or Mechanical Wear",
        "unsafe_pairing": "Not Recommended for Direct Prolonged Tissue Contact"
    },
    "reference_studio": {
        "title": "Studio Reference & Sterilization Matrix",
        "subtitle": "Autoclave parameters, ultrasonic cleaning protocols, and processing compatibility for professional piercing studios",
        "select_material": "Select Material Reference",
        "autoclave_tolerance": "Steam Autoclave Compatibility",
        "ultrasonic_clean": "Ultrasonic Bath Suitability",
        "dry_heat": "Dry Heat Sterilization",
        "chemical_disinfection": "High-Level Chemical Disinfection",
        "entries_count": "{count} reference profiles available",
        "studio_handling_note": "Studio Handling & Aseptic Storage Protocol"
    },
    "studio_vault": {
        "title": "Studio Compliance Vault",
        "records_count": "{count} records",
        "records_count_single": "{count} record",
        "record_saved": "Record successfully archived to local vault.",
        "record_deleted": "Record removed from local storage.",
        "empty_vault": "No saved studio compliance records yet. Run a check in the Certificate Reader or create a manual inspection record below.",
        "view_record": "View Record",
        "delete_record": "Delete Record",
        "print_vault": "Print Studio Log ({count} entries)",
        "export_json": "Export Vault Backup",
        "clear_vault": "Clear Vault",
        "audit_ready": "Audit Ready: All records stored locally in browser"
    },
    "cert_compare": {
        "select_hint": "Please select at least 2 materials to compare their certified technical specifications.",
        "banner_badge": "[CERTIFIED STANDARDS COMPARISON]",
        "title": "Side-by-Side Certified Specifications",
        "subtitle": "Compares certified technical parameters under identical test standards. No subjective rankings or best/worst labels.",
        "btn_print": "🖨️ Print Comparison",
        "col_parameter": "Technical Standard Parameter",
        "tag_spec": "[SPECIFICATION]",
        "row_governing_standard": "Governing Implant Standard",
        "row_certified_composition": "Certified Chemical Specification",
        "row_melting_process": "Melting & Processing Method",
        "row_biocompatibility": "Biocompatibility Test Certified",
        "row_autoclave": "Steam Autoclave Thermal Tolerance",
        "row_traceability": "Required Traceability Unit",
        "row_surface_finish": "Surface Finish Specification",
        "row_tissue_boundary": "Validated Tissue Boundary Contact",
        "notice_min_two": "Please select at least 2 materials to compare their certified technical specifications.",
        "badge": "[CERTIFIED STANDARDS COMPARISON]",
        "th_parameter": "Technical Standard Parameter",
        "tag_specification": "[SPECIFICATION]",
        "footer_note": "Methodology Note: Specifications cited reflect current published revisions of ASTM F136, ASTM F138, ASTM F2229, ISO 10993, and USP Class VI. In body art studios, receiving protocols require independent verification of the manufacturer's Mill Test Report (MTR) matching the packaging heat number.",
        "row_biocompatibility_standard": "Biocompatibility Test Certified",
        "row_autoclave_thermal_limit": "Steam Autoclave Thermal Tolerance",
        "row_traceability_unit": "Required Traceability Unit",
        "row_surface_finish_spec": "Surface Finish Specification",
        "mat_titanium_grade_23_biocompatibility_standard": "Meets ISO 10993 cytotoxicity and sensitization; non-immunogenic",
        "mat_titanium_grade_23_tissue_boundary": "Subdermal tissue canal, initial puncture wound, bone/mucosal contact",
        "mat_titanium_grade_5_biocompatibility_standard": "Higher interstitial oxygen causes increased cellular reactivity in fresh wound canals",
        "mat_titanium_grade_5_tissue_boundary": "Industrial & aerospace applications; orthopedic hardware (not fresh piercing fistula)",
        "mat_surgical_steel_316lvm_biocompatibility_standard": "Passes ISO 10993; contains 13-15% metallurgical nickel (potential allergen for nickel-sensitized individuals)",
        "mat_surgical_steel_316lvm_tissue_boundary": "Surgical implant, healed piercing tissue canal, initial piercing (for non-nickel-sensitized individuals)",
        "mat_surgical_steel_316l_biocompatibility_standard": "Higher micro-inclusion content increases susceptibility to localized pitting corrosion in body fluids",
        "mat_surgical_steel_316l_tissue_boundary": "Marine hardware, food equipment, exterior jewelry on intact healed skin",
        "mat_bioflex_biocompatibility_standard": "Certified USP Class VI in vivo reactivity and ISO 10993-5 in vitro cytotoxicity grade 0",
        "mat_bioflex_tissue_boundary": "Initial wound canal, oral piercings, flexible tissue canals, MRI procedures",
        "mat_niobium_biocompatibility_standard": "Passes ISO 10993; highly biocompatible, 100% nickel-free, non-reactive",
        "mat_niobium_tissue_boundary": "Initial piercing fistula, sensitive tissue, subdermal and healed body piercings",
        "mat_glass_biocompatibility_standard": "Chemically completely inert; zero ion elution in physiological solutions",
        "mat_glass_tissue_boundary": "Initial piercing canal, stretching fistulas, long-term healed piercings",
        "mat_gold_14k_biocompatibility_standard": "Biocompatible when verified 100% nickel-free and cadmium-free; noble metal corrosion resistance",
        "mat_gold_14k_tissue_boundary": "Initial piercing (if solid and verified nickel-free), healed piercing fistulas",
        "mat_acrylic_biocompatibility_standard": "NOT certified for surgical implant or open wound contact; micro-porous; leaches monomers",
        "mat_acrylic_tissue_boundary": "Healed, intact lobes ONLY for short durations; strictly forbidden in fresh wounds"
    }
}
  };

  let currentLocale = 'en';
  try {
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('poli_language') || localStorage.getItem('locale') || localStorage.getItem('lang');
      if (savedLang && (savedLang === 'en' || savedLang === 'fr' || savedLang === 'it' || savedLang === 'de' || savedLang === 'es' || savedLang === 'pt' || savedLang === 'nl')) {
        currentLocale = savedLang;
      }
    }
    if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang && currentLocale === 'en') {
      const docLang = document.documentElement.lang.toLowerCase().split('-')[0];
      if (docLang && docLang !== 'en') currentLocale = docLang;
    }
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const qLang = urlParams.get('lang');
      if (qLang) currentLocale = qLang.toLowerCase();
    }
  } catch (e) {}

  /**
   * Primary translate function
   * Looks up a nested key path e.g. "safety_checker.title"
   * Replaces "{param}" tokens with values from params object
   */
  function t(key, params) {
    if (!key) return '';

    const dict = I18N_DICTIONARY[currentLocale] || I18N_DICTIONARY.en;
    const parts = key.split('.');
    let val = dict;

    for (let i = 0; i < parts.length; i++) {
      if (val && typeof val === 'object' && parts[i] in val) {
        val = val[parts[i]];
      } else {
        // Fallback to English if currentLocale failed
        let fallbackVal = I18N_DICTIONARY.en;
        for (let j = 0; j < parts.length; j++) {
          if (fallbackVal && typeof fallbackVal === 'object' && parts[j] in fallbackVal) {
            fallbackVal = fallbackVal[parts[j]];
          } else {
            fallbackVal = null;
            break;
          }
        }
        val = fallbackVal !== null ? fallbackVal : key;
        break;
      }
    }

    if (typeof val !== 'string') {
      return val !== null && val !== undefined ? val : key;
    }

    if (params && typeof params === 'object') {
      return val.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return paramKey in params ? String(params[paramKey]) : match;
      });
    }

    return val;
  }

  /**
   * Translates all elements with data-i18n attributes in the document or container
   */
  function applyI18n(root = document) {
    // 1. textContent translation
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key);
      }
    });

    // 2. HTML translation (preserves semantic formatting like &reg;, &copy;)
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (key) {
        el.innerHTML = t(key);
      }
    });

    // 3. placeholder translation
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', t(key));
      }
    });

    // 4. title translation
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', t(key));
      }
    });

    // 5. aria-label translation
    root.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (key) {
        el.setAttribute('aria-label', t(key));
      }
    });

    // 6. alt translation
    root.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (key) {
        el.setAttribute('alt', t(key));
      }
    });
  }

  const rootScope = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this);

  // Expose to global/window immediately and synchronously
  rootScope.i18n = {
    t: t,
    applyI18n: applyI18n,
    setLocale: function(loc) {
      if (I18N_DICTIONARY[loc]) {
        currentLocale = loc;
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('poli_language', loc);
            localStorage.setItem('locale', loc);
            localStorage.setItem('lang', loc);
          }
          if (typeof document !== 'undefined' && document.documentElement) {
            document.documentElement.lang = loc;
          }
        } catch (e) {}

        // Update all language select elements on the page
        if (typeof document !== 'undefined') {
          document.querySelectorAll('.lang-select, #languageSelect').forEach(function(sel) {
            if (sel.value !== loc) sel.value = loc;
          });
        }

        applyI18n();

        // Dispatch custom events for UI modules to update dynamic renders
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('languageChanged', { detail: { locale: loc } }));
          window.dispatchEvent(new CustomEvent('localeChange', { detail: { locale: loc } }));
        }
      }
    },
    getLocale: function() {
      return currentLocale;
    },
    register: function(loc, dict) {
      if (loc && dict) {
        I18N_DICTIONARY[loc] = dict;
      }
    },
    registerLocale: function(loc, dict) {
      if (loc && dict) {
        I18N_DICTIONARY[loc] = dict;
      }
    },
    getDictionary: function(loc = 'en') {
      return I18N_DICTIONARY[loc] || I18N_DICTIONARY.en;
    }
  };

  rootScope.t = t;
  rootScope.applyI18n = applyI18n;

  // Run automatically when DOM is ready in browser
  if (typeof document !== 'undefined') {
    function initI18nDom() {
      try {
        if (document.documentElement) {
          document.documentElement.lang = currentLocale;
        }
      } catch (e) {}

      applyI18n();

      // Bind all language select dropdowns
      document.querySelectorAll('.lang-select, #languageSelect').forEach(function(sel) {
        sel.value = currentLocale;
        sel.addEventListener('change', function(e) {
          rootScope.i18n.setLocale(e.target.value);
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initI18nDom);
    } else {
      initI18nDom();
    }
  }
})();
