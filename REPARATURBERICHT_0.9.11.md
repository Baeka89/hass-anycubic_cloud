# Reparaturbericht 0.9.11

9. Oktober 2026. Alle elf belegten Befunde der Prüfungen acht bis zehn wurden repariert. Grundlage ist das unveränderte Paket 0.9.10; dessen historische Berichte und ZIPs bleiben erhalten.

## Reparaturen

| Befund | Reparatur | Nachweis |
| --- | --- | --- |
| I01 | URL-Schwärzung berücksichtigt Apostrophen in gültigen Pfaden. Query, Fragment und Zugangsdaten werden auch in HTTP-Exceptionketten entfernt. | Tatsächlicher HTTP-503-Pfad mit erfundenen Geheimnissen, Log- und Tracebackprüfung. |
| I02 | Der zentrale Versand akzeptiert nur eine nichtleere String-Befehlsbestätigung. Fehlende, leere oder strukturell ungültige Antworten lösen einen kontrollierten API-Fehler aus; Auto-Feed-Zustand wird dabei nicht verändert. | Sieben ungültige Antwortvarianten und erfolgreicher Kontrollfall über Coordinator, Modell und API. |
| I03 | Ein druckereigener reentranter Lock schützt die vollständige REST-ACE-Firmwaretransaktion und MQTT-OTA-Verarbeitung. Objektreferenzen und neuere OTA-Daten bleiben erhalten. | Echter zweiter Thread versucht während der REST-Kopie ein OTA-Update; anschließend bleiben 70 % und das Update-Flag erhalten. Vorhandene Atomaritäts-/Identitätstests bestehen weiterhin. |
| J01 | Trocknungsstart validiert die angeforderte Box statt pauschal die primäre Box. Nicht vorhandene Ziele werden abgewiesen. | Nur Box 1 vorhanden: Auftrag an ID 1; nur Box 0 oder keine Box vorhanden: kein Auftrag an ID 1. Dauerwert bleibt unverändert. |
| J02 | Beide Upload-Druckservices prüfen Konfiguration und Drucker vor dem Verbrauch der temporären Upload-Datei. | Echte HA-Dateiverarbeitung: ungültiges Ziel bewahrt Token und Datei; anschließendes gültiges Lesen funktioniert weiterhin und verbraucht den Token wie zuvor. |
| J03 | MQTT-ACE-Aktualisierungen verwenden dieselbe strenge Integer-ID-Prüfung. IDs eines Batches werden vor den Änderungen gelesen/validiert. | Boolesche und gebrochene IDs werden ohne Zustandsänderung abgewiesen; gültige String-ID 1 aktualisiert weiterhin die sekundäre Box. |
| J04 | Slot-Indizes werden strikt auf 0–3 validiert. Slot-Batches werden vollständig vorbereitet, doppelte IDs abgewiesen und erst danach übernommen. | Negative, zu große, boolesche, gebrochene und doppelte IDs bewahren sämtliche vorhandenen Slots; gültige Teilaktualisierung funktioniert. |
| J05 | Bei Decode-Fehlern wird das MQTT-Topic geschwärzt. Statt roher, nicht dekodierter Payloads wird deren Byteanzahl protokolliert. | Ungültiges JSON und UTF-8 enthalten weder erfundenen Druckerschlüssel noch Payload-Geheimnis im Log. |
| K01 | Slotlisten werden nach explizitem Index normalisiert; Materialmapping sucht anhand der ID und meldet fehlende Slots kontrolliert. | Alle 96 Auswahlen über 24 Permutationen korrekt; zusätzlicher Test einer lückenhaften Slotliste. |
| K02 | Lokale und USB-Dateilisten werden zunächst vollständig in einer temporären Liste verarbeitet und erst bei Erfolg ersetzt. | Sechs tatsächliche MQTT-Router-Fehlerketten bewahren die alte Liste. Bestehende Update-Callbacks veröffentlichen dadurch den unveränderten gültigen Zustand. |
| K03 | Callback-Aufgaben werden threadsicher auf dem HA-Loop angelegt, an die Config Entry gebunden und zusätzlich vom Coordinator verfolgt. Beim Entladen werden sie unmittelbar abgebrochen. Verzögerte Aufgaben und neue Callbacks berücksichtigen Shutdown. | Mit realer HA-Config-Entry: laufende Aufgabe wird beim Coordinator-Shutdown abgebrochen, Entry-Unload funktioniert, spätere Abfragen und neue Aufgaben bleiben aus. |

## Erhalt von Funktion und Design

Die regulären Services, Bedienelemente, Entitätsnamen, Datenformate für gültige Antworten, Optionen und bestehenden Zeitwerte wurden beibehalten. Keine neuen Schalter oder Bedienabläufe wurden eingeführt. Änderungen betreffen die belegten Fehlerfälle, Slot-Zuordnung und sichere Nebenläufigkeit. Fehlerhafte Antworten werden künftig als Fehler gemeldet, statt Erfolg oder einen beschädigten Zustand vorzutäuschen.

Alle 55 geprüften Dateien mit Frontend-Quellen, Layout-/Stildefinitionen und Lokalisierungen sind gegenüber dem ausgelieferten 0.9.10 bytegleich. Beide JavaScript-Bundles wurden aus diesen unveränderten Quellen neu gebaut; Paket- und Manifestversion sind 0.9.11. Der Vergleich umfasst auch die Integration-Übersetzungen; das Changelog bleibt zweisprachig.

## Verifikation

- **103 Backendtests bestanden**, darunter elf neue Regressionstests mit mehreren Eingabevarianten. Tatsächliche Home-Assistant-2026.9.3-Module und Python 3.14 werden verwendet.
- **Mypy strict: 52 Produktquelldateien ohne Fehler.**
- Ruff-Prüfungen `E9,F63,F7,F82`, Flake8 und isort bestanden.
- Beide vollständigen Frontend-Builds bestanden, einschließlich ESLint, TypeScript und Rollup.
- Elf Frontend-Hilfsfunktionsassertionen und die Tests der tatsächlichen Druck-Callbacks bestanden.
- Das finale Paket enthält 168 Dateien. Alle Dateien werden beim Paketabgleich vollständig eingelesen und byteweise verglichen; zusätzlich 60 Python-Dateien per AST und 61 JS-/TS-Dateien mit Parsern sowie JSON/YAML, Bilder und PEM-Strukturen geprüft. Nachweise liegen unter `audit/reparatur-achte-zehnte-pruefung`.

Der Browser-Regressionstest wurde versucht, scheiterte jedoch bereits beim Chromium-Start an einer verweigerten Sandbox-Operation. Er wird nicht als bestanden ausgewiesen. Der Nachweis unveränderten Designs ist deshalb der bytegenaue Quellvergleich, ergänzt um erfolgreiche Builds und Frontend-Logiktests; eine visuelle Browserprüfung war nicht möglich.

Keine Live-Cloud-/Druckerhardware- oder Broker-TLS-Handshake-Prüfung. Zu Licht und S1-Temperatur liegen weiterhin keine neuen Protokolldaten vor. Die ausdrücklich zurückgestellte Einheit der ACE-Trocknungsdauer wurde nicht verändert. Der Bericht bestätigt die Reparatur der elf reproduzierten Befunde, keine mathematische Garantie, dass jeder denkbare Ablauf des gesamten Projekts fehlerfrei ist.
