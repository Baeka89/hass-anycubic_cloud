# Reparaturbericht – Anycubic Cloud 0.9.6

Stand: 08.10.2026. Die zwölf bestätigten Befunde D01–D12 der dritten Prüfung sind behoben. Die Reparaturen aus 0.9.4 und 0.9.5 bleiben enthalten. Die Einheit der ACE-Trocknungsdauer bleibt wie vereinbart zurückgestellt; es wurde keine Umrechnung geraten.

## Änderungen

| Befund | Reparatur |
|---|---|
| D01 | HTTP-Status wird vor dem Lesen der Antwort geprüft. Nichtobjektförmige API-JSON-Antworten liefern einen kontrollierten API-Parserfehler. Ein Upload mit HTTP 503 und leerem Körper gilt nicht mehr als akzeptierte Antwort. |
| D02 | ACE-Firmware-Installation und Sammelinstallation wählen die tatsächliche Box-ID. Ein einzelner Firmware-Datensatz für Box 1 löst kein Update von Box 0 aus. |
| D03 | ACE-Accessoren, alle betroffenen MQTT-Aktualisierungen, Boxvalidierung und Auto-Feed verwenden die Box-ID statt der Listenposition. „Alle Trocknungen stoppen“ übergibt die tatsächlichen IDs; doppelte IDs werden als mehrdeutige Daten abgewiesen. |
| D04 | Coordinator-Updates aktualisieren Bild-URL, Cache und Zeitstempel vor dem Schreiben des Entity-Zustands. Die Frontend-Proxy-URL enthält die Bildversion, damit ein neues Bild den Hintergrund aktualisiert. |
| D05 | Der originale HA-Bildladepfad übernimmt bzw. ermittelt den validierten Inhaltstyp. JPEG bleibt JPEG; ungültige Inhaltstypen werden abgewiesen. |
| D06 | Diagnoseexport normalisiert fehlende, leere und nullwertige Projektdaten auf eine leere Liste. |
| D07 | Coordinator und Optionsformular verwenden denselben Standard. Das bisherige Laufzeitverhalten „Nur beim Drucken verbinden“ bleibt für Einträge ohne diese Option erhalten. |
| D08 | Die Debug-Ansicht berücksichtigt auch hass-/Registry-Aktualisierungen bei unveränderter Druckerauswahl. |
| D09 | Die deutsche README beschreibt die tatsächlich angebotenen Funktionen; ACE-Filament-Serviceaufrufe benötigen einen expliziten Slot. |
| D10 | Frontend-Formatierung und Typ-/Lint-Probleme sind mit den Lockfile-Versionen korrigiert. Synchrone Lit-Lifecycle-Hooks liefern void; der asynchrone HA-Service-Control-Ladevorgang behandelt Fehler. Farbpicker-Accessoren sind ausdrücklich typisiert. |
| D11 | Der strikte Mypy-Lauf besteht: vollständiger Rückgabetyp für Geschwindigkeitsattribute und Imports von StaticPathConfig/ColorMode aus den definierenden HA-Modulen. |
| D12 | tslib ist ausdrücklich deklariert und aufgelöst. Das Lockfile enthält keine unaufgelösten Paket-Einträge mehr. Die frische Installation und beide regulären Builds bestehen. |

Beim vollständigen Build wurde außerdem ein nicht aufgelöster `lit-html`-Import aus der Observer-Bibliothek sichtbar. Auch diese benötigte Abhängigkeit wird jetzt ausdrücklich deklariert. Beide Rollup-Konfigurationen brechen bei unaufgelösten Imports oder fehlenden externen Browser-Globals ab, damit solche Probleme künftig nicht als vermeintlich erfolgreicher Build enden.

**Korrektur der früheren Build-Verifikation:** Die erfolgreiche Prüfung von 0.9.5 hatte ältere lokale node_modules verwendet. Version 0.9.6 wurde mit einer frischen `npm ci`-Installation geprüft. Die Abhängigkeiten stimmen mit dem finalen Lockfile überein; beide ausgelieferten Bundles wurden damit tatsächlich neu gebaut. Die regulären Builds durchlaufen ESLint, TypeScript und Rollup ohne die zuvor gemeldeten Fehler oder unaufgelösten Imports.

## Nachweise

- **48 Backend-Regressionstests bestanden**, darunter neun neue Tests mit Teilfällen für HTTP-/JSON-Fehler, spärliche Firmwaredaten, umgeordnete und spärliche ACE-Daten, alle betroffenen MQTT-Aktualisierungen, Bildwechsel, JPEG/PNG, Diagnoseexport und Optionsstandard.
- **Drei Browser-Suiten bestanden**, einschließlich Bildversionswechsel und späterer Registry-Aktualisierung in der Debug-Ansicht. Die bestehenden Suites laufen gegen die neu gebauten Bundles; die frühere URL-Erwartung wurde um den beabsichtigten Versionsparameter ergänzt. Keine Seitenfehler in den abgeschlossenen Browserprüfungen.
- **11 Frontend-Helper-Assertions bestanden.**
- **Ruff, Flake8, Isort und striktes Mypy bestanden**; Mypy prüfte alle 52 Integrationsdateien gegen die echte HA-Version 2026.9.3.
- **npm ci, npm run build und npm run build_card bestanden.** Jede installierte Paketversion wurde mit dem finalen Lockfile abgeglichen; keine abweichende Version und keine fehlende nichtoptionale Abhängigkeit.
- **Alle 155 ausgelieferten Dateien vollständig gelesen und geprüft:** Python-/JS-/TS-Syntax, JSON einschließlich doppelter Schlüssel, YAML, sämtliche Bildframes und Zertifikat-/Schlüsselstruktur. ZIP-Inhalt und Projektdateien wurden byteweise über SHA-256 abgeglichen; ZIP-Integritätsprüfung bestanden.

Die ausführlichen Protokolle, Dateiabdeckung, Änderungspatch und ZIP-Prüfsumme liegen im Arbeitsverzeichnis unter `audit/reparatur-dritte-pruefung/`. Das Installations-/Quellpaket heißt `hass-anycubic_cloud-0.9.6-fixed.zip`; lokale Abhängigkeiten und Caches sind nicht enthalten. Die vorherigen ZIP-Versionen wurden nicht überschrieben.

## Prüfungen selbst ausführen

Frontend-Verzeichnis: `custom_components/anycubic_cloud/frontend_panel`, Node.js 24:

```bash
npm ci
npm run build
npm run build_card
```

Repository-Stamm, Python 3.14 mit den Projektabhängigkeiten und HA 2026.9.3:

```bash
python -B -m unittest discover -s tests -v
node tests/frontend_helpers.cjs
node tests/browser_regressions.cjs
node tests/browser_second_audit.cjs
node tests/browser_third_audit.cjs
```

Für Browser-Tests wird eine separate Playwright-/Chromium-Testumgebung benötigt; `ANYCUBIC_PLAYWRIGHT` kann auf deren Playwright-Modul zeigen. Weitere Hinweise stehen in `DEVELOPMENT.md`.

## Grenzen

Die Prüfung lief offline mit echter HA-Version **2026.9.3 / Python 3.14.4**, simulierten Cloud-/MQTT-Antworten und Chromium. Alle sieben README-Modelle bleiben im Projekt berücksichtigt; physische Drucker und die Live-Anycubic-Cloud wurden nicht getestet. Damit ist keine vollständige Hardware-Kompatibilität oder absolute Fehlerfreiheit behauptet. Die zurückgestellte Trocknungsdauer-Einheit bleibt offen.
