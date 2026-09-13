# Materiaal Certificering Decoder: Technische Architectuur (Nederlands)

## Inhoudsopgave

1. [Architectuuroverzicht](#architectuuroverzicht)
2. [Bestandssysteeminrichting](#bestandssysteeminrichting)
3. [Component-subsystemen](#component-subsystemen)
   - [Certificaatlezer en Tekstanalysator](#1-certificaatlezer-en-tekstanalysator)
   - [Leveranciersvragenlijst-generator](#2-leveranciersvragenlijst-generator)
   - [Claims- en Bewijsmaterialenmatrix](#3-claims--en-bewijsmaterialenmatrix)
   - [Zij-aan-zij Vergelijker voor Gecertificeerde Materialen](#4-zij-aan-zij-vergelijker-voor-gecertificeerde-materialen)
   - [Studio Ontvangst- en Compliance-Kluis](#5-studio-ontvangst--en-compliance-kluis)
   - [Bibliotheek van Wettelijke Normen](#6-bibliotheek-van-wettelijke-normen)
   - [Galvanische en Chemische Compatibiliteitsmenger](#7-galvanische-en-chemische-compatibiliteitsmenger)
   - [Studio Aseptiek- en Sterilisatiereferentie](#8-studio-aseptiek--en-sterilisatiereferentie)
4. [Dataschema's en Gegevensstructuren](#dataschemas-en-gegevensstructuren)
5. [Klinische Biocompatibiliteits-evaluatielogica](#klinische-biocompatibiliteits-evaluatielogica)
6. [Internationaliseringsmotor (I18N)](#internationaliseringsmotor-i18n)
7. [Toegankelijkheid, Responsief Ontwerp en Printmotor](#toegankelijkheid-responsief-ontwerp-en-printmotor)
8. [Geautomatiseerde Verificatie en Kwaliteitsborging](#geautomatiseerde-verificatie-en-kwaliteitsborging)

---

## Architectuuroverzicht

De **Materiaal Certificering Decoder** is ontwikkeld als een statische, afhankelijkheidsvrije client-side webapplicatie met hoge prestaties. Het systeem vereist geen backendservers, geen externe clouddatabases en geen Content Delivery Networks (CDN's). Alle tekstanalyses, klinische evaluatiealgoritmen en schermopbouwen worden direct en lokaal in de webbrowser uitgevoerd.

### Belangrijkste Architectuurprincipes
- **Totale Gegevensprivacy**: Facturen, smeltcertificaten en inspectierapporten worden uitsluitend lokaal opgeslagen in `localStorage`.
- **Nul Externe Afhankelijkheden**: Typografie, stylesheets, scripts en grafische elementen worden ingeladen via relatieve lokale paden.
- **Onmiddellijke Opstarttijd**: Directe initiële weergave zonder vertragende netwerkoproepen naar derden.
- **Volledig Offline Functioneel**: Betrouwbaar inzetbaar in piercestudio's zonder permanente internetverbinding.

### Basistechnologieën
- **HTML5**: Semantische opmaak voorzien van ARIA-landmarks, toegankelijkheidsrollen en toetsenbordfocusbeheer.
- **CSS3**: Strikte design-tokens, adaptieve lay-outs via CSS Grid en Flexbox, en geoptimaliseerde print-stijlen.
- **Modern JavaScript (ES6+)**: Modulaire IIFE-structuren (Immediately Invoked Function Expressions) gekoppeld aan het globale `window`-object.
- **Lokale Gegevensopslag**: JSON-serialisatie via de `localStorage`-API van de browser voor audittrails en inspectielogboeken.

---

## Bestandssysteeminrichting

```
material-certification-checker/
├── index.html                     # Hoofdpagina van de applicatie
├── documentation.html             # Technische documentatie en normenglossarium
├── embed.html                     # Iframe-widgetgenerator
├── css/
│   └── style.css                  # Gecoördineerde stylesheets, lay-out en printregels
├── images/
│   └── Poli-International-Co.webp # Lokaal bedrijfslogo
├── js/
│   ├── i18n.js                    # Centrale I18N-beheerder en Engels basiswoordenboek
│   ├── i18n/                      # Vertaalde woordenboeken (100% sleutelpariteit)
│   │   ├── fr.js                  # Frans
│   │   ├── de.js                  # Duits
│   │   ├── it.js                  # Italiaans
│   │   ├── es.js                  # Spaans
│   │   ├── pt.js                  # Portugees
│   │   └── nl.js                  # Nederlands
│   ├── certification-data.js      # Register van officiële normen (ASTM, ISO, USP, EN)
│   ├── material-data.js           # Fysieke, chemische en biocompatibiliteitsprofielen
│   ├── v2-data.js                 # Testzinnen, vragenlijsten en bewijzenmatrix
│   ├── v2-features.js             # Certificaatlezer, technische vragenlijsten, vergelijker
│   ├── library.js                 # Zoekmotor voor de normencatalogus
│   ├── mixer.js                   # Galvanische corrosie- en compatibiliteitsanalyse
│   ├── reference-studio.js        # Autoclaaf- en sterilisatieprotocollen
│   ├── studio-vault.js            # Lokaal ontvangst- en compliance-register
│   ├── decoder.js                 # Zoek- en glossariumcontrollers
│   └── common.js                  # Themaschakelaar, modale vensters en iframe-berichten
└── docs/                          # Meertalige documentatie in 7 talen
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Component-subsystemen

### 1. Certificaatlezer en Tekstanalysator
**Bestand:** `js/v2-features.js`
Onderzoekt vrije tekst uit handelsfacturen, productlabels en smeltcertificaten (MTC):
- **Patroonherkenning**: Reguliere expressies identificeren normeringen (ASTM F136, ASTM F138, ISO 5832-3, USP Klasse VI), hersmeltprocessen (ELI / Extra Low Interstitial, VAR), chemische elementen en vage marketingtermen.
- **Indeling in Biocompatibiliteitsniveaus**:
  - `tier-compliant`: Geldige medische implantaatnorm aangetoond (bijv. ASTM F136 Titanium, ASTM F138 Staal, biocompatibel BioFlex-polymeer).
  - `tier-caution`: Commerciële kwaliteiten zonder implantaatspecificatie (bijv. standaard 316L zonder vacuüm-hersmelting, G23 zonder uitdrukkelijke ASTM F136-normering, PMMA-acryl).
  - `tier-unverified`: Verkoopclaims zonder controleerbare documentatie ("hypoallergeen", "chirurgisch staal", "zuiver metaal").
- **Snelle Testzinnen**: Klikbare voorbeelden waarmee direct te zien is hoe het systeem reageert op gangbare beweringen.

### 2. Leveranciersvragenlijst-generator
**Bestand:** `js/v2-features.js`
Genereert een gerichte technische controlelijst op basis van het gekozen materiaal en het beoogde lichaamsweefsel:
- **Toepassingscontext**: Maakt onderscheid tussen de initiële piercing (open actieve wond die gecertificeerde, niet-toxische materialen vereist) en genezen piercings of oraal contact.
- **Kritische Acceptatiecriteria**: Formuleert eisen rondom smeltherkomst, oppervlakteruwheid (Ra <= 0,05 µm / spiegelglans) en passiveringscertificaten.
- **Doelgerichte Technische Vragen**: Stelt 4 tot 6 specifieke vragen samen met vermelding van acceptabele antwoorden versus kritieke alarmsignalen.
- **Afdruk- en Exportfunctionaliteit**: Direct gereed voor afdruk op papier met handmatige handtekening- en datumvelden voor het kwaliteitsdossier.

### 3. Claims- en Bewijsmaterialenmatrix
**Bestand:** `js/v2-features.js` en `js/v2-data.js`
Interactieve referentietabel die 12 veelgehoorde verkoopclaims koppelt aan vereiste officiële bewijsstukken:
- **Categorieën**: Metalen, Polymeren en Algemene Kwaliteitsclaims.
- **Vereiste Documenten**: Geeft aan of een smeltcertificaat (MTC), emissiespectrometrie, ISO 10993-5 cytotoxiciteitstest of USP Klasse VI-test vereist is.
- **Risicobeoordeling bij Ontbreken van Bewijs**: Verduidelijkt de klinische risico's wanneer geverifieerde documenten ontbreken.
- **Direct Zoeken en Filteren**: Directe filtering op categorie en zoekfunctionaliteit in alle ondersteunde talen.

### 4. Zij-aan-zij Vergelijker voor Gecertificeerde Materialen
**Bestand:** `js/v2-features.js`
Vergelijkingstool voor het gelijktijdig beoordelen van twee of drie sieraadmaterialen:
- **Vergelijkingscriteria**: Gegarandeerde chemische grenzen, biocompatibiliteitstesten, nikkelafgiftelimieten (EN 1811), autoclaafbestendigheid, oppervlakteafwerking en klinisch oordeel.
- **Categorie-overschrijdende Meldingen**: Brengt microbiologische en mechanische verschillen aan het licht bij het vergelijken van chirurgische metalen met medische polymeren.

### 5. Studio Ontvangst- en Compliance-Kluis
**Bestand:** `js/studio-vault.js`
Lokaal inspectieregister voor ontvangen leveringen van piercingsieraden:
- **Vastgelegde Gegevens**: Naam van de leverancier, batch- of factuurnummer, materiaalsoort, nalevingsoordeel en notities van de piercer.
- **Opslag**: In de browser via `localStorage`, zonder externe gegevensuitwisseling.
- **Functies**: Geschiedenis raadplegen, items verwijderen, samenvattingen afdrukken en back-up exporteren/importeren in JSON.

### 6. Bibliotheek van Wettelijke Normen
**Bestand:** `js/library.js` en `js/certification-data.js`
Doorzoekbaar overzicht met samenvattingen en kernbepalingen van ASTM International, ISO, USP en Europese normen (EN).

### 7. Galvanische en Chemische Compatibiliteitsmenger
**Bestand:** `js/mixer.js`
Beoordeelt de kans op galvanische corrosie tussen gekoppelde sieradenelementen (staafjes, schroefopzetstukken, kogeltjes) in menselijke elektrolyten (speeksel, zweet, wondvocht).

### 8. Studio Aseptiek- en Sterilisatiereferentie
**Bestand:** `js/reference-studio.js`
Klinische protocollen voor stoomsterilisatiecycli (121°C tot 134°C), ultrasone reiniging, desinfectiebaden en materiaalspecifieke thermische grenzen.

---

## Dataschema's en Gegevensstructuren

### Model voor Regelgevende Norm (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Standaardspecificatie voor gesmeed titanium-6aluminium-4vanadium ELI voor chirurgische implantaattoepassingen",
  scope: "Initiële piercing, langdurig menselijk weefselcontact, medische implantaten",
  implant_certified: true,
  nickel_content: "< 0,01% (Niet aantoonbaar)",
  autoclave_compatible: true,
  key_requirements: [
    "ELI-kwaliteit (Extra Low Interstitial)",
    "Treksterkte >= 860 MPa",
    "Aangetoonde biocompatibiliteit na ASTM F86 passivering"
  ]
}
```

### Model voor Materiaalprofiel (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Implantaatkwaliteit Titanium (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5,5-6,5%, V 3,5-4,5%, Fe <= 0,25%, C <= 0,08%, O <= 0,13%",
  biocompatibility: "Uitzonderlijke biocompatibiliteit, osseointegratie, niet-magnetisch",
  nickel_release: "Nul (< 0,01 ug/cm2/week)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Klinische Biocompatibiliteits-evaluatielogica

1. **Criteria voor Initiële Piercing**:
   - Een initiële piercing betreft een actieve, open epitheelwond.
   - Sieraden voor eerste plaatsing moeten biologisch inert, corrosiebestendig, niet-toxisch en herhaaldelijk stoomsteriliseerbaar zijn.
   - Voldoende gecertificeerde materialen zijn Titanium ASTM F136, Implantaatstaal ASTM F138, Titanium ISO 5832-3 en medisch BioFlex-polymeer volgens USP Klasse VI.
   - Niet-gespecificeerd handelsstaal (316L zonder vacuümhersmelting) en industriële titaniumlegeringen (G23 zonder ASTM F136-certificaat) krijgen een waarschuwing wegens potentiële interstitiële zuurstof- en ijzeronzuiverheden.

2. **Beperkingen van Nikkelafgifte**:
   - Krachtens vermelding 27 van bijlage XVII van de Europese REACH-verordening mag de nikkelafgifte van onderdelen die tijdens de epithelisatie in doorboorde lichaamsdelen worden ingebracht maximaal 0,2 µg/cm²/week bedragen.
   - Implantaatnormen (ASTM F138, ISO 5832-1) verplichten vacuüm-hersmeltingsprocessen (VIM-VAR) om nikkel vast te houden in het austenitische kristalrooster.

---

## Internationaliseringsmotor (I18N)

- **Ondersteunde Talen**: Engels (`en`), Frans (`fr`), Duits (`de`), Italiaans (`it`), Spaans (`es`), Portugees (`pt`) en Nederlands (`nl`).
- **Systeemopbouw**:
  - `window.i18n`: Centrale coördinator gedefinieerd in `js/i18n.js`.
  - Zelfstandige taalbestanden in `js/i18n/*.js` die hun woordenboek laden bij initialisatie.
  - Dynamische koppeling met het DOM via `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` en `data-i18n-title`.
  - Gebeurtenisgestuurde update: Het event `languageChanged` triggert onmiddellijk het opnieuw renderen van dynamische componenten.
- **Sleutelovereenstemming**: Het controle-script `audit_i18n.cjs` garandeert 100% gelijke sleutelaantallen (951 unieke sleutels) in alle 7 talen.

---

## Toegankelijkheid, Responsief Ontwerp en Printmotor

- **Toegankelijkheid (WCAG 2.1 AA)**:
  - Contrastwaarden boven 4,5:1 voor gewone tekst in lichte en donkere modus.
  - Minimale aanraakoppervlakken van 44x44px.
  - Volledige bedienbaarheid via het toetsenbord met heldere focusringen.
  - Volledige ARIA-ondersteuning voor tabbladen, dialoogvensters en meldingen.
- **Responsief Ontwerp**:
  - Flexibele combinatie van CSS Grid en Flexbox voor een feilloze werking van schermen vanaf 360px tot 4K-monitoren.
  - Tabellen schakelen op mobiele apparaten over naar gestapelde kaartblokken.
- **Afdrukoptimalisatie**:
  - Doelgerichte `@media print`-regels isoleren het geselecteerde formulier of de vragenlijst.
  - Navigatiebalken, knoppen en invoervelden worden automatisch verborgen.
  - Contrastrijke zwart-wit weergave voor archivering in het studiodossier of verzending aan leveranciers.

---

## Geautomatiseerde Verificatie en Kwaliteitsborging

Het project beschikt over een geautomatiseerde controleprocedure:
- `node audit_i18n.cjs`: Controleert het aantal vertaalsleutels, tijdelijke aanduidingen en typografische tekens.
- `node verify_all_constraints.cjs`: Bewaakt de bestandsgrootte (< 512 KiB per bestand), afwezigheid van externe CDN's, integriteit van lokale afbeeldingen en naleving van vaktermen.
- `npm run lint`: Valideert TypeScript-code zonder foutmeldingen.
- `npm run build`: Garandeert een foutloze productiebundeling.
