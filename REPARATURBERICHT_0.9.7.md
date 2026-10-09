# Reparaturbericht 0.9.7 – 08.10.2026

Die fünf im vierten Prüfbericht belegten Fehler V01–V05 sind behoben. Grundlage ist die unveränderte Version 0.9.6; frühere Reparaturen bleiben erhalten. Die Einheit der ACE-Trocknungsdauer bleibt gemäß Nutzerentscheidung zurückgestellt.

## Änderungen

- **V01 – ACE-Services:** Die Zielbox wird über `multi_color_box_for_id(box_id)` auf tatsächliche Existenz geprüft. Eine allein vorhandene ACE-ID 1 ist gültig; eine fehlende ID 0 wird abgewiesen. Die voreingestellte Box-ID bleibt 0 und wird ebenso auf Existenz geprüft.
- **V02 – entladene Konfiguration:** Serviceaufrufe prüfen vorhandene Runtime-Daten und den Coordinator-Schlüssel. Ein vorhandener, aber nicht geladener Eintrag erzeugt eine verständliche `ServiceValidationError`. Ein geladener Eintrag wird weiterhin korrekt aufgelöst.
- **V03 – HTTP 401:** Nur authentifizierte Anycubic-API-Aufrufe übersetzen HTTP 401 in `AnycubicAuthTokensExpired`. Die vorhandene Wiederholungs-/Token-Erneuerungslogik und Home Assistants `ConfigEntryAuthFailed` werden dadurch erreicht. Upload-Zielserver, nicht authentifizierte API-Aufrufe und HTTP 403/429/503 bleiben allgemeine API-Fehler; diese Antworten lösen keine fälschliche Token-Erneuerung aus.
- **V04 – MQTT-Lebenszyklus:** Der Coordinator wartet auf das tatsächliche Ende des Executor-Workers, ohne dessen Future zu canceln. Ein Timeout von zehn Sekunden lässt das laufende Future bestehen und verschiebt den Neustart. Veraltete MQTT-Callbacks werden anhand ihres Clients ignoriert; der Cleanup eines alten Workers darf den Zustand eines anderen Clients nicht löschen.
- **V05 – Druckzeit:** Vergangene Zeit und Restzeit zählen nur bei aktivem, nicht pausiertem Druck weiter. Während Pause, nach Abschluss und bei nicht verfügbarem Aktivitätssensor bleiben die Zahlen stehen. Beim Fortsetzen laufen beide Richtungen wieder. Diese Änderung betrifft Druckzeitstatistiken, nicht die zurückgestellte ACE-Dauereinheit.

Manifest, Frontend-Paket und Paket-Lockfile tragen Version 0.9.7. Beide Frontend-Bundles wurden über die regulären Build-Kommandos neu erstellt. Changelog, Versionshistorie und Testanleitung wurden aktualisiert.

## Validierung

Prüfumgebung: echte Home-Assistant-2026.9.3-Module, Python 3.14.4, Node 24 und die bereits aus dem Projekt-Lockfile installierten Frontend-Abhängigkeiten. Cloud und Drucker wurden nicht kontaktiert.

- **57 Backend-Regressionstests bestanden**: die bisherigen 48 plus neun gezielte neue Tests.
- **Vier Browser-Regressionssuiten bestanden**, einschließlich Pause/Fortsetzen/Abschluss/nicht verfügbarer Sensor und Entfernen der Timer beim Entfernen der Komponente.
- Elf Frontend-Helper-Prüfungen bestanden.
- Ruff, Flake8 mit Projektkonfiguration, isort und striktes Mypy bestanden.
- `npm run build` und `npm run build_card` einschließlich ESLint und TypeScript bestanden.
- Neue Tests decken vorhandene/fehlende ACE-IDs, entladene Einträge, Reauthentifizierung, erfolgreiche Token-Erneuerung, Abgrenzung anderer HTTP-Fehler, veraltete MQTT-Callbacks, Worker-Cleanup, Stoppen und Stop-Timeout ab.
- Zwei bisherige Test-Doubles wurden auf die tatsächliche Client-/Box-ID-Zuordnung angepasst; ihre bisherigen Erwartungen bleiben erhalten.

Nachweise befinden sich außerhalb des Lieferpakets unter `audit/reparatur-vierte-pruefung/`: `checks.json`, einzelne Test-/Build-/Lint-Logs, Quelländerungspatch und Paketprüfung. Das ZIP enthält sämtliche bisherigen Projektdateien sowie die beiden neuen Regressionstestdateien und diesen Bericht. Entwicklungsabhängigkeiten und Audit-Arbeitsdateien werden nicht mitgeliefert.

Aus dem Repository-Stamm reproduzierbar:

```bash
python -B -m unittest discover -s tests -v
node tests/frontend_helpers.cjs
node tests/browser_regressions.cjs
node tests/browser_second_audit.cjs
node tests/browser_third_audit.cjs
node tests/browser_fourth_audit.cjs
```

Browserprüfungen benötigen eine separate Playwright-/Chromium-Umgebung; `ANYCUBIC_PLAYWRIGHT` kann auf deren Playwright-Modul zeigen. Frontend-Builds werden in `custom_components/anycubic_cloud/frontend_panel` ausgeführt.

## Grenzen

Alle fünf bestätigten Befunde dieser Prüfung sind repariert und durch Regressionstests abgesichert. Eine Garantie absoluter Fehlerfreiheit oder physischer Kompatibilität sämtlicher README-Drucker lässt sich aus Offline-Tests nicht ableiten. Konkret geprüft wurde HA 2026.9.3; nicht jedes Patchrelease von 2026.09.x. Die zurückgestellte ACE-Dauereinheit bleibt offen.
