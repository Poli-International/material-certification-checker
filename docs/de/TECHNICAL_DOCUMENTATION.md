# Material-Zertifizierungs-Decoder: Technische Architektur (Deutsch)

## Inhaltsverzeichnis

1. [Architekturübersicht](#architekturübersicht)
2. [Dateisystem-Organisation](#dateisystem-organisation)
3. [Komponenten-Subsysteme](#komponenten-subsysteme)
   - [Zertifikatsleser und Textanalysator](#1-zertifikatsleser-und-textanalysator)
   - [Lieferanten-Fragebogen-Generator](#2-lieferanten-fragebogen-generator)
   - [Behauptungs- und Nachweis-Matrix](#3-behauptungs--und-nachweis-matrix)
   - [Direktvergleich zertifizierter Werkstoffe](#4-direktvergleich-zertifizierter-werkstoffe)
   - [Studio-Wareneingangs- und Compliance-Archiv](#5-studio-wareneingangs--und-compliance-archiv)
   - [Bibliothek regulatorischer Standards](#6-bibliothek-regulatorischer-standards)
   - [Galvanischer und chemischer Kompatibilitätsmischer](#7-galvanischer-und-chemischer-kompatibilitätsmischer)
   - [Studio-Aseptik- und Sterilisationsreferenz](#8-studio-aseptik--und-sterilisationsreferenz)
4. [Datenschemata und Datenstrukturen](#datenschemata-und-datenstrukturen)
5. [Klinische Biokompatibilitäts-Bewertungslogik](#klinische-biokompatibilitäts-bewertungslogik)
6. [Internationalisierungs-Engine (I18N)](#internationalisierungs-engine-i18n)
7. [Barrierefreiheit, responsives Design und Druck-Engine](#barrierefreiheit-responsives-design-und-druck-engine)
8. [Automatisierte Verifikation und Qualitätssicherung](#automatisierte-verifikation-und-qualitätssicherung)

---

## Architekturübersicht

Der **Material-Zertifizierungs-Decoder** ist als statische, abhängigkeitsfreie Hochleistungs-Webanwendung konzipiert, die vollständig clientseitig ausgeführt wird. Das System benötigt weder Backend-Server noch externe Datenbanken oder Content Delivery Networks (CDNs). Sämtliche Textanalysen, klinischen Bewertungsalgorithmen und Darstellungsmechanismen laufen autark im Browser ab.

### Zentrale Architekturprinzipien
- **Vollständiger Datenschutz**: Zertifikate, Rechnungen und Prüfprotokolle verbleiben ausschließlich im lokalen `localStorage` des Anwenders.
- **Keine externen Abhängigkeiten**: Alle Skripte, Stylesheets, Schriftarten und Bilddateien werden über relative lokale Pfade geladen.
- **Sofortige Ladezeit**: Unmittelbare Anzeige ohne blockierende Netzwerkabfragen an Drittserver.
- **Umfassende Offline-Fähigkeit**: Zuverlässige Nutzung im Piercingstudio auch ohne permanente Internetverbindung.

### Basistechnologien
- **HTML5**: Semantisches Markup mit ARIA-Landmarks, barrierefreien Rollen, Statusbereichen und Tastaturfokussteuerung.
- **CSS3**: Einheitliche Design-Tokens, flexible CSS-Grid- und Flexbox-Layouts sowie optimierte Media-Queries für den Druck.
- **Vanilla JavaScript (ES6+)**: Modulare IIFE-Strukturen (Immediately Invoked Function Expressions) am globalen `window`-Objekt.
- **Lokaler Speicher**: JSON-Serialisierung über die Browser-API `localStorage` für Revisions- und Wareneingangsprotokolle.

---

## Dateisystem-Organisation

```
material-certification-checker/
├── index.html                     # Hauptanwendung und primäre Nutzeroberfläche
├── documentation.html             # Dokumentationsansicht und Normen-Glossar
├── embed.html                     # Iframe-Einbindungsgenerator
├── css/
│   └── style.css                  # Einheitliche Design-Tokens, Layouts, Druck-CSS
├── images/
│   └── Poli-International-Co.webp # Lokales Markenlogo
├── js/
│   ├── i18n.js                    # Zentraler I18N-Lader und englisches Basiswörterbuch
│   ├── i18n/                      # Lokalisierte Sprachdateien (100% Schlüsselparität)
│   │   ├── fr.js                  # Französisch
│   │   ├── de.js                  # Deutsch
│   │   ├── it.js                  # Italienisch
│   │   ├── es.js                  # Spanisch
│   │   ├── pt.js                  # Portugiesisch
│   │   └── nl.js                  # Niederländisch
│   ├── certification-data.js      # Regulatorische Normen (ASTM, ISO, USP, EN)
│   ├── material-data.js           # Physikalische, chemische und biokompatible Profile
│   ├── v2-data.js                 # Testphrasen, Fragenkataloge und Nachweismatrix
│   ├── v2-features.js             # Zertifikatsleser, Fragebögen, Materialvergleiche
│   ├── library.js                 # Such-Engine für den Normenkatalog
│   ├── mixer.js                   # Galvanische Korrosions- und Verträglichkeitsanalyse
│   ├── reference-studio.js        # Sterilisations- und Aufbereitungsprotokolle
│   ├── studio-vault.js            # Wareneingangsbuch und lokaler Datenspeicher
│   ├── decoder.js                 # Suchsteuerung und Glossar-Controller
│   └── common.js                  # Farbschema-Umschalter, Modalfenster, Iframe-Messaging
└── docs/                          # Mehrsprachige technische Dokumentation
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Komponenten-Subsysteme

### 1. Zertifikatsleser und Textanalysator
**Datei:** `js/v2-features.js`
Analysiert unstrukturierten Text aus Lieferantenaussagen, Produktverpackungen und Werksabnahmezeugnissen (MTC):
- **Mustererkennung**: Reguläre Ausdrücke identifizieren Spezifikationscodes (ASTM F136, ASTM F138, ISO 5832-3, USP Class VI), Schmelzverfahren (ELI / Extra Low Interstitial, VAR), Elementsymbole und unbestimmte Werbebegriffe.
- **Klassifizierung in Biokompatibilitätsstufen**:
  - `tier-compliant`: Anerkannte chirurgische Implantatnorm nachgewiesen (z. B. ASTM F136 Titan, ASTM F138 Stahl, medizinisch biokompatibles BioFlex-Polymer).
  - `tier-caution`: Standardwerkstoffe ohne Implantatzulassung (z. B. handelsüblicher 316L-Edelstahl ohne Vakuum-Umschmelzen, G23 ohne explizite ASTM F136-Spezifikation, PMMA-Acryl).
  - `tier-unverified`: Reine Werbeaussagen ohne belegbare Normenangaben ("hypoallergen", "Chirurgenstahl", "hochwertige Legierung").
- **Schnelltest-Vorlagen**: Interaktive Mustersätze zur schnellen Veranschaulichung typischer Lieferantenangaben.

### 2. Lieferanten-Fragebogen-Generator
**Datei:** `js/v2-features.js`
Erstellt aus dem gewählten Werkstoff und dem Einsatzbereich einen verbindlichen technischen Prüfbogen:
- **Gewebe- und Anwendungskontext**: Unterscheidet Erstpiercings (offenes Wundgewebe, das zwingend zertifizierte, toxikologisch inerte Werkstoffe erfordert) von verheilten Piercings und Schleimhautkontakten.
- **Kritische Studio-Annahmekriterien**: Listet Schmelznachweise, Grenzwerte für die Oberflächenrauheit (Ra <= 0,05 µm / Hochglanzpolitur) und Passivierungsnachweise auf.
- **Gezielte Fachfragen**: Generiert 4 bis 6 präzise Spezifikationsfragen mit Gegenüberstellung von zufriedenstellenden Nachweisen und kritischen Warnsignalen.
- **Druck- und Exportfunktion**: Erzeugt druckfertige Dokumente mit handschriftlichen Signaturfeldern für das betriebliche Qualitätsmanagement.

### 3. Behauptungs- und Nachweis-Matrix
**Datei:** `js/v2-features.js` und `js/v2-data.js`
Interaktive Referenztabelle, die 12 verbreitete Werbeversprechen den zwingend erforderlichen Prüfdokumenten zuordnet:
- **Kategorien**: Metalle, Polymere und Allgemeine Qualitätsangaben.
- **Erforderliche Nachweise**: Bestimmt den benötigten Beleg (z. B. chargenbezogenes Schmelzzeugnis, optische Emissionsspektrometrie, Zytotoxizitätstest nach ISO 10993-5, USP Class VI-Zertifizierung).
- **Risikobewertung bei Nachweisausfall**: Verdeutlicht die klinischen Gefahren, wenn geforderte Dokumente fehlen.
- **Echtzeit-Suche und Filter**: Sofortige Filterung nach Kategorien und Textbegriffen über alle Sprachversionen hinweg.

### 4. Direktvergleich zertifizierter Werkstoffe
**Datei:** `js/v2-features.js`
Vergleichswerkzeug für die Gegenüberstellung von zwei oder drei Werkstoffen:
- **Vergleichsparameter**: Zertifizierte Zusammensetzungsgrenzen, biologische Reaktionsnormen, Nickellässigkeitsgrenzwerte (EN 1811), Autoklavierbarkeit, Oberflächengüte und klinisches Fazit.
- **Kategorieübergreifende Hinweise**: Hebt materialspezifische Eigenschaften beim Vergleich von Implantatmetallen mit medizinischen Polymeren hervor.

### 5. Studio-Wareneingangs- und Compliance-Archiv
**Datei:** `js/studio-vault.js`
Lokale Datenbank zur Dokumentation und Revisionssicherheit von Schmucklieferungen:
- **Erfasste Daten**: Lieferantenname, Lieferschein- oder Chargennummer, Werkstofftyp, Konformitätsurteil und Prüfernotizen.
- **Speicherung**: Browser-eigener `localStorage` mit Ausfallsicherung und vollständigem Verzicht auf externes Tracking.
- **Funktionen**: Datensatzverwaltung, Filterung, Revisionsausdruck und JSON-Sicherungsexport.

### 6. Bibliothek regulatorischer Standards
**Datei:** `js/library.js` und `js/certification-data.js`
Strukturierter Katalog mit Beschreibungen und Schlüsselanforderungen internationaler Normenwerke von ASTM International, ISO, USP und DIN/EN.

### 7. Galvanischer und chemischer Kompatibilitätsmischer
**Datei:** `js/mixer.js`
Bewertet das Korrosionspotenzial bei Werkstoffkombinationen (z. B. Stifte, Schraubaufsätze, Kugeln) unter Einwirkung menschlicher Körperelektrolyte (Speichel, Schweiß, Wundsekret).

### 8. Studio-Aseptik- und Sterilisationsreferenz
**Datei:** `js/reference-studio.js`
Klinische Richtlinien für Dampfsterilisationszyklen (121°C bis 134°C), Ultraschallreinigungsverfahren, Desinfektionsbäder und werkstoffspezifische Temperaturgrenzen.

---

## Datenschemata und Datenstrukturen

### Normen-Datensatz (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Standardspezifikation für geschmiedetes Titan-6Aluminium-4Vanadium ELI für chirurgische Implantate",
  scope: "Erstpiercing, dauerhafter menschlicher Gewebekontakt, medizinische Implantate",
  implant_certified: true,
  nickel_content: "< 0,01% (Nicht nachweisbar)",
  autoclave_compatible: true,
  key_requirements: [
    "ELI-Güte (Extra Low Interstitial)",
    "Zugfestigkeit >= 860 MPa",
    "Geprüfte Biokompatibilität nach ASTM F86 Passivierung"
  ]
}
```

### Werkstoff-Datensatz (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Implantat-Titan (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5,5-6,5%, V 3,5-4,5%, Fe <= 0,25%, C <= 0,08%, O <= 0,13%",
  biocompatibility: "Hervorragende Biokompatibilität, Osseointegration, unmagnetisch",
  nickel_release: "Null (< 0,01 ug/cm2/Woche)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Klinische Biokompatibilitäts-Bewertungslogik

1. **Anforderungen für Erstpiercings**:
   - Ein Erstpiercing stellt eine offene Gewebewunde dar.
   - Erstschmuck muss absolut biokompatibel, korrosionsfest, nicht-toxisch und dampfsterilisierbar sein, ohne Giftstoffe abzugeben oder seine Oberflächengüte zu verlieren.
   - Vollständig konforme Materialien sind Titan nach ASTM F136, Implantatstahl nach ASTM F138, Titan nach ISO 5832-3 und biokompatibles BioFlex-Polymer nach USP Class VI.
   - Gewerblicher Edelstahl (unspezifiziertes 316L) sowie industrielle Titanlegierungen (G23 ohne ASTM F136-Zeugnis) werden als bedenklich eingestuft, da Verunreinigungen und erhöhte Sauerstoff- bzw. Eisenwerte das Wundgewebe irritieren können.

2. **Grenzwerte für Nickellässigkeit**:
   - Nach REACH-Verordnung Anhang XVII Eintrag 27 darf die Nickelfreisetzung bei Erstschmuckteilen während der Epithelisierung 0,2 µg/cm²/Woche nicht überschreiten.
   - Medizinische Implantatnormen (ASTM F138, ISO 5832-1) schreiben Vakuum-Umschmelzverfahren (VIM-VAR) vor, wodurch Nickel stabil im austenitischen Kristallgitter gebunden bleibt.

---

## Internationalisierungs-Engine (I18N)

- **Unterstützte Sprachen**: Englisch (`en`), Französisch (`fr`), Deutsch (`de`), Italienisch (`it`), Spanisch (`es`), Portugiesisch (`pt`) und Niederländisch (`nl`).
- **Aufbau**:
  - `window.i18n`: Zentrales Sprachmodul in `js/i18n.js`.
  - Sprachdateien in `js/i18n/*.js` registrieren ihre Schlüsselwörterbücher autark beim Laden.
  - Dynamische DOM-Bindung über `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` und `data-i18n-title`.
  - Ereignisgesteuerte Aktualisierung: Das Fenster-Event `languageChanged` löst das sofortige Neurendern dynamischer Inhalte aus.
- **Paritätsprüfung**: `audit_i18n.cjs` sichert eine 100%ige Übereinstimmung aller 951 Übersetzungsschlüssel in sämtlichen Sprachen.

---

## Barrierefreiheit, responsives Design und Druck-Engine

- **Barrierefreiheit (WCAG 2.1 AA)**:
  - Kontrastverhältnisse über 4,5:1 im Hell- und Dunkelmodus für sämtliche Fließtexte.
  - Mindestklickfläche von 44x44px für interaktive Schalter und Menüs.
  - Vollständige Tastaturbedienbarkeit mit klar sichtbaren Fokusringen.
  - Durchgängige ARIA-Auszeichnung für Reiterleisten, Dialogfenster und Statusmeldungen.
- **Responsives Verhalten**:
  - Kombination aus CSS Grid und Flexbox garantiert eine störungsfreie Darstellung von 360px Bildschirmbreite bis zu hochauflösenden 4K-Monitoren.
  - Tabellen wechseln auf Mobilgeräten in eine kompakte, blockbasierte Kacheldarstellung.
- **Druckoptimierung**:
  - Gezielte `@media print`-Definitionen blenden Navigationsleisten, Suchfelder und Schaltflächen aus.
  - Scharfer Schwarzweiß-Kontrast für die physische Ablage im Studio-Ordner und den Postversand an Zulieferer.

---

## Automatisierte Verifikation und Qualitätssicherung

Die Codebasis unterliegt einer lückenlosen automatischen Testüberprüfung:
- `node audit_i18n.cjs`: Validiert Vollständigkeit, Platzhalter-Token und typografische Sonderzeichen.
- `node verify_all_constraints.cjs`: Prüft die Dateigrößenbeschränkung (< 512 KiB je Datei), das Verbot externer CDNs, die Integrität lokaler Bilddateien und fachliche Richtlinien.
- `npm run lint`: Prüft TypeScript-Typen und Code-Konformität.
- `npm run build`: Garantiert die erfolgreiche Erstellung des Produktions-Bundles.
