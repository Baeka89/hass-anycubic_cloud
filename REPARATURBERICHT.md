# Reparaturbericht – Anycubic Cloud 0.9.4

Stand: 7. Oktober 2026. Ziel: Home Assistant 2026.09.x und sämtliche sieben im README genannten Druckermodelle.

## Ergebnis

Von den 35 nummerierten Befunden des ursprünglichen Prüfberichts plus dem separaten HA-Metadatenbefund sind **35 von 36 bearbeitet und behoben**. **Befund 31 bleibt offen**, weil die tatsächlich erwartete Cloud-Einheit der Trocknungsdauer nicht belegt ist. Die Umrechnung wurde nicht geraten. Das Paket enthält die bisherigen Dauerwerte unverändert; die widersprüchlichen Bedienpfade sind damit ausdrücklich noch nicht bereinigt.

Die ursprünglichen 145 Dateien wurden vollständig inventarisiert und geprüft. Das Originalarchiv bleibt unverändert. Dateiweiser Vergleich mit SHA-256 steht in `audit/aenderungen.csv` neben dem ausgelieferten ZIP; dort sind auch zusätzliche und entfernte Dateien erfasst. Die ursprünglichen Prüfprotokolle beziehen sich auf das Original und sind historische Nachweise.

## Korrekturen

| Befund | Umsetzung |
|---|---|
| 1 | ACE-Stop übernimmt die gewählte Box-ID; Stop-all adressiert beide Boxen. |
| 2 | ACE-Karte und Einstellungsdialog lesen und steuern die passende primäre/sekundäre Box. |
| 3 | Temperatur- und Lüfterregler verwenden vorhandene Druckermethoden über den Coordinator. |
| 4 | Geschwindigkeitsauswahl nutzt die gemeldeten verfügbaren Modi und einen implementierten Setter. |
| 5 | Pause, Fortsetzen, Stoppen und MQTT-Refresh korrekt verdrahtet. Die drei nicht implementierten Buttons für Job-Löschen und slotloses Filament-Extrudieren/-Retract wurden entfernt; Feed/Retract mit explizitem Slot bleiben Services. |
| 6 | Felder und HA-Selektoren für alle 27 registrierten Services beschrieben. |
| 7 | MQTT-Optionswert am Eingang in das Integer-Enum umgewandelt. |
| 8 | Fehlgeschlagener MQTT-Connect gibt den Client frei; beendete Worker können neu gestartet werden. |
| 9 | MQTT-Events werden über den zuständigen asyncio-Loop thread-sicher signalisiert. |
| 10 | Server-CA und Hostname werden geprüft, TLS mindestens 1.2; Zertifikatsgrenze siehe unten. |
| 11 | Erschöpfte Druckstart-Wiederholungen werfen einen Fehler statt einer scheinbaren Erfolgs-ID. |
| 12 | Frontend-Zustände über stabile Registry-Schlüssel einschließlich Schlüsselaliasen aufgelöst. |
| 13 | Schreibzugriffe verwenden tatsächliche Entity-IDs aus der Registry und berücksichtigen Umbenennungen. |
| 14 | Fehlende/null Spulendaten zu einer geprüften leeren Liste normalisiert. |
| 15 | Entity-Zuordnung bei späteren HA-/Registry-Änderungen neu aufgebaut. |
| 16 | False, 0, leere Listen und ganzzahlige Skalierung bleiben gültige Konfigurationswerte. |
| 17 | MQTT-Feature-Wrapper als Mapping unterstützt; konsumierende Mapping-Iteration berücksichtigt. |
| 18 | Lüfter-/Geschwindigkeitsmeldungen aktualisieren die ausgewerteten Projektwerte. |
| 19 | Upload-Sperre auch bei Fehler und Task-Abbruch freigegeben; ursprünglicher Fehler bleibt erhalten. |
| 20 | Dateilisten-Refresh-Buttons und dokumentierter Cloud-Datei-Druckservice registriert. |
| 21 | Cloud-Dateiliste vollständig paginiert; wiederholte Seiten werden erkannt. |
| 22 | Erfolgreich geladene leere Dateilisten bleiben [] statt None. |
| 23 | Zeitstempel erst nach Erfolg gesetzt; fehlgeschlagene Updates/Availability bleiben als Fehler sichtbar. |
| 24 | Authentifizierungs-Store pro Config-Entry geladen und an Token/Auth-Modus/Gerätekennung gebunden. |
| 25 | Reauthentifizierung prüft die API-Konto-ID gegen die vorhandene Unique-ID. |
| 26 | Globales Panel über alle geladenen Konten koordiniert und bei Konfigurationswechsel erneuert. |
| 27 | Geräte-/ACE-Mapping laufend aktualisiert; MAC und Seriennummer erhalten. HA-2026.9-Gerätebeziehungen verwenden via_device_id. |
| 28 | Unbekannte Firmwareversion bleibt None statt einer Versionszeichenfolge None/error. |
| 29 | Übersetzungsquellen vervollständigt, Generator reproduzierbar, beide Bundles mit Version 0.9.4 neu gebaut. |
| 30 | Abhängigkeiten und Lockfile aktualisiert, ungenutzte Babel-Stufe entfernt; npm audit meldet 0. |
| 32 | Projektwerte mit vorherigem Wert 0 werden aktualisiert. |
| 33 | RGB-Kanäle erlauben 0 und prüfen den Bereich 0 bis 255. |
| 34 | ETA verwendet die konfigurierte HA-Zeitzone einschließlich Sommerzeit. |
| 35 | Service-Requestzustand lokal geführt; Device-ID wird nicht zwischen Aufrufen übertragen. |
| 36 | HA-/HACS-/Entwicklungsmetadaten auf 2026.9 abgestimmt; ungültiges Manifestfeld entfernt und iot_class ergänzt. |

## Offener Befund 31: Trocknungsdauer

Der Optionsdialog beschreibt Stunden (Standard 4), Number-Entitäten und Karten Minuten (Standard 240). Beide reichen den Wert an dieselbe Cloud-Funktion weiter. Für eine belastbare Korrektur fehlt der Wert von `drying_status.duration` bei einer am Drucker eingestellten Dauer von exakt einer Stunde, einschließlich des zugehörigen API-Kontexts. Diese Information wurde angefragt; eine Antwort liegt noch nicht vor. Bis zur Klärung kann eine Dauer über einen der Pfade falsch interpretiert werden.

## Verifikation

- 24 Backend-Regressionstests bestanden mit echtem installiertem **Home Assistant 2026.9.3 / Python 3.14.4**; Cloud-/Geräteantworten sind Testdaten und Mocks.
- Mypy: alle **52 Python-Quelldateien** ohne Typfehler.
- Flake8 und isort für den Integrationsquellcode bestanden; installierte Fremdpakete werden ausgenommen.
- Beide Frontend-Builds einschließlich ESLint und TypeScript bestanden ohne Warnungen; gebaute Panel- und Karten-Dateien sind im Paket enthalten.
- Acht Frontend-Helfertests bestanden, darunter HA-Zeitzone und umbenannte Entitäten.
- Playwright mit den tatsächlichen ausgelieferten Bundles: Temperaturen, null-Spulen, zweite ACE-Box, später eintreffende Registry und umbenannter Pause-Button geprüft; **keine JavaScript-Laufzeitfehler**.
- Übersetzungsgenerator erzeugt byte-identische Ausgaben bei erneutem Lauf; Projekt-JSON-Dateien gültig.
- `npm audit`: **0 bekannte gemeldete Sicherheitslücken** zum Prüfzeitpunkt. Das ist keine allgemeine Sicherheitsgarantie.

Reproduzierbare Testprogramme stehen in `tests/`. Protokolle neben dem ZIP unter `audit/tests-fixed.txt`, `audit/mypy-fixed.txt`, `audit/browser-fixed.json` und `audit/npm-audit-fixed.json`.

## Grenzen und sichtbare Änderungen

Die mitgelieferte Anycubic-Clientzertifikatskette verwendet SHA-1. Unter dem OpenSSL der HA-Testumgebung lässt sie sich nur mit `SECLEVEL=0` laden. Der neue Kontext erzwingt weiterhin TLS 1.2 oder höher, eine eingeschränkte moderne Cipherliste, Server-CA-Prüfung und Hostnamenprüfung. Diese Kompatibilitätsausnahme bleibt erforderlich, bis die Clientzertifikate erneuert werden. Ein echter MQTT-TLS-Handshake zum Cloudserver wurde nicht ausgeführt.

Die drei funktionslosen Buttons wurden entfernt, weil die dafür nötigen API-Operationen beziehungsweise Slotangaben fehlen. Es wurden keine nicht belegten Steuerbefehle erfunden. Ein Screenshot mit Zugangsdaten wurde aus dem reparierten Paket und der README entfernt.

Geprüfte gemeinsame Codepfade: Kobra 3 Combo, Kobra S1, Kobra 2, Kobra 2 Pro, Kobra 2 Max, Photon Mono M5s und M7 Pro. FDM-Regler und ACE-Funktionen gelten nur bei entsprechender Ausstattung. Resin-Unterstützung bleibt wie dokumentiert grundlegend. Es gab keine reale Anmeldung, keine Druckausführung und keinen physischen Test pro Modell. Ein vollständiger Hassfest-Lauf wurde nicht ausgeführt; die Metadatenkorrektur und die HA-Typprüfung ersetzen diesen nicht. Fehlerfreiheit des gesamten Projekts oder vollständige Hardwarekompatibilität wird nicht behauptet.

## Installation

Aus dem ZIP `custom_components/anycubic_cloud` in die gleichnamige Home-Assistant-Konfiguration übernehmen und HA neu starten. Bereits eingebundene Kartenressourcen gegebenenfalls im Browser neu laden. Das Original-ZIP zur Rückkehr auf den vorherigen Stand aufbewahren.
