# Decodificatore di Certificazione dei Materiali: Architettura Tecnica (Italiano)

## Indice dei Contenuti

1. [Panoramica dell'Architettura](#panoramica-dellarchitettura)
2. [Organizzazione del File System](#organizzazione-del-file-system)
3. [Sottosistemi e Componenti](#sottosistemi-e-componenti)
   - [Lettore di Certificati e Analizzatore di Testo](#1-lettore-di-certificati-e-analizzatore-di-testo)
   - [Generatore di Schede di Domande Tecniche per Fornitori](#2-generatore-di-schede-di-domande-tecniche-per-fornitori)
   - [Matrice Dichiarazioni / Prove Documentali](#3-matrice-dichiarazioni--prove-documentali)
   - [Comparatore Fianco a Fianco di Materiali Certificati](#4-comparatore-fianco-a-fianco-di-materiali-certificati)
   - [Registro di Conformità e Ricezione dello Studio](#5-registro-di-conformità-e-ricezione-dello-studio)
   - [Libreria degli Standard Normativi](#6-libreria-degli-standard-normativi)
   - [Miscelatore di Compatibilità Galvanica e Chimica](#7-miscelatore-di-compatibilità-galvanica-e-chimica)
   - [Manuale di Asepsi e Sterilizzazione dello Studio](#8-manuale-di-asepsi-e-sterilizzazione-dello-studio)
4. [Schemi e Strutture Dati](#schemi-e-strutture-dati)
5. [Logica Clinica di Valutazione della Biocompatibilità](#logica-clinica-di-valutazione-della-biocompatibilità)
6. [Motore di Internazionalizzazione (I18N)](#motore-di-internazionalizzazione-i18n)
7. [Accessibilità, Design Responsivo e Motore di Stampa](#accessibilità-design-responsivo-e-motore-di-stampa)
8. [Verifica Automatizzata e Controllo Qualità](#verifica-automatizzata-e-controllo-qualità)

---

## Panoramica dell'Architettura

Il **Decodificatore di Certificazione dei Materiali** è progettato come un'applicazione web statica ad alte prestazioni, priva di dipendenze esterne ed eseguita interamente sul lato client. Non richiede server di backend, database remoti né reti di distribuzione dei contenuti (CDN). Tutte le analisi sintattiche, le valutazioni cliniche e i rendering dell'interfaccia si svolgono all'interno del browser dell'utente.

### Principi Architetturali Chiave
- **Riservatezza Assoluta dei Dati**: Fatture, certificati di colata e registri di controllo qualità rimangono salvati esclusivamente in locale tramite `localStorage`.
- **Zero Dipendenze Remote**: File di stile, caratteri tipografici, script ed elementi grafici vengono caricati mediante percorsi relativi locali.
- **Caricamento Istantaneo**: Rendering immediato senza blocchi di rete asincroni verso server terzi.
- **Funzionamento Completo Offline**: Piena operatività negli studi di piercing anche in assenza di connessione internet.

### Tecnologie Principali
- **HTML5**: Markup semantico corredato di punti di riferimento ARIA, ruoli di accessibilità e gestione completa del focus da tastiera.
- **CSS3**: Token di design personalizzati, griglie responsive CSS Grid e Flexbox, e fogli di stile dedicati per la stampa cartacea.
- **JavaScript Moderno (ES6+)**: Moduli IIFE (Immediately Invoked Function Expressions) isolati e registrati sull'oggetto globale `window`.
- **Archiviazione Locale**: Serializzazione JSON basata sulle API `localStorage` del browser per i verbali di controllo e di audit.

---

## Organizzazione del File System

```
material-certification-checker/
├── index.html                     # Pagina principale dell'applicazione
├── documentation.html             # Documentazione e glossario interattivo delle norme
├── embed.html                     # Generatore per integrazione iframe
├── css/
│   └── style.css                  # Token di stile, layout responsive, regole di stampa
├── images/
│   └── Poli-International-Co.webp # Logo aziendale locale
├── js/
│   ├── i18n.js                    # Modulo centrale I18N e dizionario inglese di base
│   ├── i18n/                      # Dizionari localizzati (100% parità delle chiavi)
│   │   ├── fr.js                  # Francese
│   │   ├── de.js                  # Tedesco
│   │   ├── it.js                  # Italiano
│   │   ├── es.js                  # Spagnolo
│   │   ├── pt.js                  # Portoghese
│   │   └── nl.js                  # Olandese
│   ├── certification-data.js      # Normative tecniche (ASTM, ISO, USP, EN)
│   ├── material-data.js           # Schede fisiche, chimiche e di biocompatibilità
│   ├── v2-data.js                 # Frasi di prova, questionari e matrice delle prove
│   ├── v2-features.js             # Lettore certificati, questionari, comparatore
│   ├── library.js                 # Motore di consultazione del catalogo norme
│   ├── mixer.js                   # Analisi di corrosione galvanica e affinità
│   ├── reference-studio.js        # Procedure di sterilizzazione in autoclave e asepsi
│   ├── studio-vault.js            # Registro locale dei controlli di accettazione
│   ├── decoder.js                 # Gestori di ricerca e visualizzazione glossario
│   └── common.js                  # Selettore tema, finestre modali, messaggi iframe
└── docs/                          # Documentazione tecnica multilingue
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Sottosistemi e Componenti

### 1. Lettore di Certificati e Analizzatore di Testo
**File:** `js/v2-features.js`
Esamina il testo libero estratto da fatture commerciali, descrizioni di vendita e certificati di prova dei materiali (MTC):
- **Riconoscimento dei Pattern**: Individuazione tramite espressioni regolari dei riferimenti agli standard (ASTM F136, ASTM F138, ISO 5832-3, USP Classe VI), dei processi di fusione (ELI / Extra Low Interstitial, VAR), dei simboli chimici e degli slogan commerciali ambigui.
- **Classificazione per Livello di Biocompatibilità**:
  - `tier-compliant`: Certificazione accreditata per impianti chirurgici (es. Titanio ASTM F136, Acciaio ASTM F138, polimero medicale biocompatibile BioFlex).
  - `tier-caution`: Gradi metallurgici commerciali o non adatti a impianti (es. 316L generico senza rifusione sotto vuoto, G23 senza riferimento alla norma ASTM F136, acrilico PMMA).
  - `tier-unverified`: Espressioni pubblicitarie prive di riscontri tecnici ("ipoallergenico", "acciaio chirurgico", "lega pura").
- **Frasi Predefinite di Esempio**: Modelli testuali cliccabili per mostrare istantaneamente la risposta del sistema a formule commerciali comuni.

### 2. Generatore di Schede di Domande Tecniche per Fornitori
**File:** `js/v2-features.js`
Elabora un modulo formale di richiesta tecnica in base al materiale e al tipo di tessuto ricevente:
- **Contesto Applicativo Tessutale**: Distingue il foro iniziale (ferita aperta che richiede materiali totalmente inerti e privi di rilascio di sostanze nocive) dai fori completamente guariti o a contatto con mucose.
- **Requisiti Critici di Accettazione**: Tracciabilità di colata, finitura superficiale a specchio (Ra <= 0,05 µm) e certificati di passivazione.
- **Domande Specifiche**: Compila da 4 a 6 domande mirate affiancando la risposta soddisfacente attesa e i campanelli d'allarme critici.
- **Stampa e Archiviazione**: Layout ottimizzato per la stampa cartacea con campi per la firma e la datazione del responsabile qualità dello studio.

### 3. Matrice Dichiarazioni / Prove Documentali
**File:** `js/v2-features.js` e `js/v2-data.js`
Tabella interattiva che associa 12 comuni affermazioni commerciali ai documenti di prova ufficiali necessari:
- **Categorie**: Metalli, Polimeri e Garanzie Generali di qualità.
- **Documentazione Richiesta**: Certificato di colata, spettrometria di massa, saggio di citotossicità ISO 10993-5 o test USP Classe VI.
- **Valutazione del Rischio in Assenza di Prove**: Illustra i rischi clinici e infiammatori derivanti dalla mancata fornitura dei documenti.
- **Filtri e Ricerca Istantanea**: Selezione per categoria e ricerca testuale dinamica su tutte le lingue supportate.

### 4. Comparatore Fianco a Fianco di Materiali Certificati
**File:** `js/v2-features.js`
Strumento tecnico per il confronto simultaneo tra due o tre materiali da gioielleria:
- **Parametri Comparativi**: Composizione chimica garantita, standard di risposta tissutale, limiti di rilascio del nichel (EN 1811), tenuta in autoclave, rugosità superficiale e giudizio clinico.
- **Avvisi sulle Differenze di Categoria**: Evidenzia le peculiarità fisiche ed igieniche quando si confrontano metalli da impianto e polimeri biocompatibili.

### 5. Registro di Conformità e Ricezione dello Studio
**File:** `js/studio-vault.js`
Sistema di registrazione locale delle verifiche sui lotti di gioielleria in entrata:
- **Campi Registrati**: Fornitore, codice lotto, tipologia di materiale, esito della verifica e note del piercer.
- **Salvataggio**: Memoria `localStorage` del browser, con gestione degli errori e assenza di tracciamento esterno.
- **Funzionalità**: Consultazione storico, rimozione record, stampa riepilogativa ed esportazione/importazione JSON.

### 6. Libreria degli Standard Normativi
**File:** `js/library.js` e `js/certification-data.js`
Catalogo interrogabile con sintesi dettagliate e requisiti specifici di norme ASTM International, ISO, USP e standard europei (EN).

### 7. Miscelatore di Compatibilità Galvanica e Chimica
**File:** `js/mixer.js`
Valuta i potenziali di corrosione galvanica tra componenti a contatto (barrette, inserti filettati, sfere) in presenza di fluidi biologici (saliva, sudore, siero).

### 8. Manuale di Asepsi e Sterilizzazione dello Studio
**File:** `js/reference-studio.js`
Linee guida tecniche per cicli di sterilizzazione a vapore (121°C a 134°C), trattamenti a ultrasuoni, disinfezione e tolleranze termiche dei diversi materiali.

---

## Schemi e Strutture Dati

### Modello di Norma Tecnica (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Specifiche standard per titanio-6alluminio-4vanadio ELI deformato per applicazioni in impianti chirurgici",
  scope: "Piercing iniziale, contatto tissutale prolungato, dispositivi medici impiantabili",
  implant_certified: true,
  nickel_content: "< 0,01% (Non rilevabile)",
  autoclave_compatible: true,
  key_requirements: [
    "Grado ELI (Extra Low Interstitial)",
    "Resistenza a trazione >= 860 MPa",
    "Biocompatibilità certificata dopo passivazione ASTM F86"
  ]
}
```

### Modello del Materiale (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Titanio di grado implantare (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5,5-6,5%, V 3,5-4,5%, Fe <= 0,25%, C <= 0,08%, O <= 0,13%",
  biocompatibility: "Biocompatibilità eccezionale, osteointegrazione, amagnetico",
  nickel_release: "Nullo (< 0,01 ug/cm2/settimana)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Logica Clinica di Valutazione della Biocompatibilità

1. **Requisiti per il Foro Iniziale**:
   - Il piercing iniziale è assimilabile a una lesione epiteliale attiva.
   - Il gioiello da prima applicazione deve risultare chimicamente inerte, resistente alla corrosione, atossico e compatibile con i cicli di sterilizzazione in autoclave.
   - Tra i materiali pienamente idonei figurano il Titanio ASTM F136, l'Acciaio da impianto ASTM F138, il Titanio ISO 5832-3 e il polimero BioFlex certificato USP Classe VI.
   - L'acciaio commerciale non tracciato (316L generico) e le leghe di titanio industriali (Ti-64 o G23 senza certificato ASTM F136) sono contrassegnati con avviso di cautela a causa di possibili impurità interstiziali di ferro e ossigeno.

2. **Limiti di Rilascio del Nichel**:
   - In conformità alla voce 27 dell'allegato XVII del regolamento europeo REACH, il rilascio di nichel per gli oggetti inseriti in parti perforate del corpo durante la cicatrizzazione deve essere inferiore a 0,2 µg/cm²/settimana.
   - Le normative per impianti chirurgici (ASTM F138, ISO 5832-1) impongono processi di rifusione sotto vuoto (VIM-VAR) per intrappolare il nichel nella struttura austenitica.

---

## Motore di Internazionalizzazione (I18N)

- **Lingue Supportate**: Inglese (`en`), Francese (`fr`), Tedesco (`de`), Italiano (`it`), Spagnolo (`es`), Portoghese (`pt`) e Olandese (`nl`).
- **Architettura**:
  - `window.i18n`: Gestore globale inizializzato in `js/i18n.js`.
  - File dedicati in `js/i18n/*.js` che registrano i rispettivi dizionari al caricamento.
  - Collegamento diretto al DOM tramite `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` e `data-i18n-title`.
  - Reattività al cambio lingua: L'evento `languageChanged` attiva il ri-rendering immediato delle sezioni generate via JavaScript.
- **Garanzia di Parità**: Lo script `audit_i18n.cjs` convalida la presenza del 100% delle chiavi (951 chiavi totali) in tutte le lingue.

---

## Accessibilità, Design Responsivo e Motore di Stampa

- **Accessibilità (WCAG 2.1 AA)**:
  - Rapporti di contrasto superiori a 4,5:1 per il testo nei temi Chiaro e Scuro.
  - Bersagli tattili con dimensioni minime di 44x44px.
  - Navigazione completa tramite tastiera con indicatori visivi di focus.
  - Attributi ARIA su schede, modali e messaggi di notifica.
- **Design Responsivo**:
  - Combinazione fluida di CSS Grid e Flexbox per garantire un'esperienza ottimale da 360px fino a schermi 4K.
  - Tabelle riconfigurate come blocchi informativi compatti su smartphone.
- **Ottimizzazione di Stampa**:
  - Regole `@media print` che isolano la scheda di verifica o il questionario tecnico.
  - Rimozione di barre di navigazione, pulsanti d'azione e campi di input.
  - Contrasto bianco e nero nitido per l'archiviazione cartacea e la trasmissione ai fornitori.

---

## Verifica Automatizzata e Controllo Qualità

La stabilità e la conformità del progetto sono garantite da test automatizzati:
- `node audit_i18n.cjs`: Controlla il numero delle chiavi, l'interpolazione dei segnaposto e l'assenza di trattini impropri.
- `node verify_all_constraints.cjs`: Verifica il limite di peso (< 512 KiB per file), l'assenza di CDN remote, la corretta integrità delle immagini locali e le regole terminologiche.
- `npm run lint`: Controllo TypeScript senza errori di tipo o di sintassi.
- `npm run build`: Verifica del processo di compilazione e generazione dei file finali.
