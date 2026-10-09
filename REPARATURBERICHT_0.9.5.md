# Reparaturbericht – Anycubic Cloud 0.9.5

Stand: 8. Oktober 2026. Alle 20 bestätigten Befunde der zweiten Prüfung wurden behoben. Die Reparaturen aus Version 0.9.4 bleiben enthalten.

## Änderungen

| Befund | Reparatur |
|---|---|
| Z01 | MQTT-Bereitschaft wird bei Verbindungsabbruch gelöscht. |
| Z02 | ACE-Firmware wird anhand der Box-ID ergänzt und aktualisiert; OTA-Zustand bleibt erhalten. |
| Z03 | Fehlerzähler wird erst nach vollständig erfolgreichem Update zurückgesetzt. |
| Z04 | Auto-Feed-Zustand wird erst nach bestätigtem Erfolg übernommen; Wiederholung bleibt möglich. |
| Z05 | Service und API prüfen Slotgrenzen sowie tatsächlich vorhandene ACE-Boxen. |
| Z06 | Skalare Filamentwerte werden normalisiert; ungültige Metadaten liefern einen Parserfehler. |
| Z07 | Ein fehlender Pausewert gilt nicht als pausiert. |
| Z08 | Firmwarefortschritt wird über update_percentage an HA übergeben. |
| Z09 | Account- und Drucker-ID ersetzen veränderliche MAC-basierte Entity-IDs; Registry-Migration erhält Einstellungen. |
| Z10 | Services akzeptieren printer_id mit config_entry sowie Geräteziele. |
| Z11 | Ansichten übernehmen nachgeladene Geräte- und Entity-Registries. |
| Z12 | Druckvorschau verwendet job_image_url. |
| Z13 | Zeitkomponente berücksichtigt isSeconds und spätere Optionsänderungen. |
| Z14 | Cloud-Bridge bleibt in der Geräteauswahl sichtbar. |
| Z15 | Dauern über Monate und Jahre behalten alle Tage. |
| Z16 | Später erkannte Druckerfähigkeiten erzeugen die zugehörigen Entities. |
| Z17 | Editor erkennt geladene ACEs über ihre Slot-Entities. |
| Z18 | Boxwechsel aktualisiert Werte und Verfügbarkeit der ausgewählten Box. |
| Z19 | Globale Bridge-Steuerungen werden einmal pro Account erzeugt. |
| Z20 | MQTT wird erst nach allen erfolgreichen SUBACKs bereit; Ablehnung und Publish-Fehler werden erkannt. |

## Verifikation

- 39 Backendtests bestanden mit Python 3.14.4 und dem real installierten Home Assistant 2026.9.3. Davon 15 neue Regressionstests für die zweite Prüfung.
- 11 Frontend-Helper-Assertions und beide Browser-Regressionssuiten bestanden.
- Beide Frontend-Bundles neu gebaut; ESLint und TypeScript-Prüfungen bestanden.
- Mypy: keine Fehler in 52 Integrationsdateien; Ruff, Flake8 und Isort bestanden.
- Erneute Übersetzungsgenerierung lässt alle drei generierten Dateien unverändert.
- Auslieferungsdateien vollständig byteweise gelesen, SHA-256 erfasst und ZIP-Inhalt gegen die Quelldateien verglichen. ZIP-CRC-Prüfung bestanden. Details stehen im externen Auslieferungsinventar.

## Migration und Grenzen

Die Entity-Migration erhält Entity-Namen, Entity-IDs und Registry-Einstellungen. Bereits vorhandene redundante Bridge-Entities werden deaktiviert und nicht gelöscht. Automationen, die solche redundanten Entities verwenden, benötigen gegebenenfalls die aktive Bridge-Entity.

Ziel ist HA 2026.09.x; ausgeführt wurden die Prüfungen mit 2026.9.3. Die sieben README-Modelle wurden über ihre Codepfade berücksichtigt. Es gab keine Live-Cloud- oder Hardwaretests; modellabhängiges Firmwareverhalten ist damit nicht physisch bestätigt. Eine vollständige Dateiabdeckung beweist keine Freiheit von allen denkbaren Laufzeitfehlern.

Die Einheit der ACE-Trocknungsdauer bleibt wie vereinbart ungeklärt und wurde nicht geraten oder verändert.

## Installation

Aus dem ZIP den Ordner custom_components/anycubic_cloud in die Home-Assistant-Konfiguration übernehmen und Home Assistant neu starten. Das Archiv enthält außerdem alle Projektquellen, Tests und Dokumentation.
