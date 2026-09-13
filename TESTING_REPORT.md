# Material Certification Checker V2: Testing Report

**Tested:** 2026-09-13, before release to https://poliinternational.com/material-certification-checker/

This report lists only what was actually run. It replaces a 2025 report for the
old V1 that claimed Firefox, Safari and mobile Safari passes no one had performed.

## What was tested, and how

Headless Chromium 141, serving the tool at its real site path
`/tools/material-certification-checker/` under the site's `script-src 'self'` policy.

| Check | Result |
|---|---|
| Page loads with no JavaScript errors and no failed requests | Pass |
| No external script or network call | Pass (0 found) |
| French and German interface: no English in the static page | Pass |
| Spanish, Dutch and Portuguese are not German | Pass: 0 German stopwords (the previous export had 253 of 904 values copied from German) |
| Certificate Reader, run in French and Spanish on "Implant grade titanium, nickel-free, hypoallergenic, ASTM F136 certified" | Runs; output mostly translated (see Known gaps) |
| Supplier question sheet and material comparison generate | Pass |
| Gold is not presented as nickel-free | Pass: named "14K Gold" / "18K Gold", nickel status "Depends on the alloy" |
| Companion tool links resolve to live site pages | Pass, 6 of 6 |

## Fixed before release

1. Links to `reachmonitor.poli-international.com` and `guard.reachmonitor.poli-international.com`,
   which do not resolve, now point to https://poliinternational.com/reach-monitor/ and /reach-monitor/pro/.
2. REACH Guard was described as producing a "compliance certificate". It produces a
   compliance report; corrected in all 7 languages.
3. The Embed tab offered `<iframe src="./index.html">`, which breaks on any other website.
   Now an absolute URL.

## Known gaps

- About 13 lines of generated result text stay in English in other languages
  (level headlines such as "LEVEL 2: STANDARD CITED WITHOUT MELT TRACEABILITY",
  claim tags, MTR requirement lines, some comparison cells, the methodology note).
- About 20 material description strings are English in de, es, nl and pt.
- Five `certs.*.common_uses` keys are missing in es, nl and pt, so those show English.

## Not tested

- Firefox, Safari, Edge and mobile browsers.
- Screen readers and a full WCAG audit.
