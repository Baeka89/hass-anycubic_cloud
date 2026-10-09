# Reparaturbericht 0.9.8

Die acht belegten Fehler aus der fünften und sechsten Prüfung wurden behoben. Grundlage sind die reproduzierbaren Fehlerszenarien der Version 0.9.7; dieser Bericht behauptet keine absolute Fehlerfreiheit.

## Behobene Fehler

- F01: ACE-Geräte, Entitäten und Bedienfunktionen verwenden die tatsächlich verbundenen Box-IDs. Eine allein verbundene Box 1 wird korrekt registriert und bedient; die Filamentzuordnung prüft vorhandene Boxen.
- F02: Ein bestätigter Upload mit zugewiesener Datei-ID wird nicht mehr durch einen nachgelagerten, möglicherweise veralteten Speichervergleich als fehlgeschlagen gemeldet.
- F03: Geänderte Zugangstokens werden erst nach erfolgreicher Speicherung als gespeichert markiert. Fehlgeschlagene oder abgebrochene Speicherung bleibt wiederholbar; konkurrierende Speicherungen werden serialisiert.
- F04: Benutzerantworten werden vor Feldzugriffen validiert. API-Fehler und ungültige Nutzdaten erzeugen die vorgesehenen Fehler statt KeyError oder TypeError.
- G01: Hochgeladene Druckdateien werden anhand ihrer eigenen Datei-ID gesucht, einschließlich weiterer Ergebnisseiten. Parallele Uploads können dadurch nicht die jeweils neueste fremde Datei verwenden.
- G02: ACE-Auto-Feed-Befehle werden pro Drucker und Box serialisiert. Explizite Zustellbefehle werden auch bei gleichem Cachezustand gesendet. Bestätigungen aktualisieren das aktuelle Boxobjekt, falls eine Statusmeldung es während des Befehls ersetzt hat. Abbruch gibt die Sperre frei; andere Boxen bleiben unabhängig.
- G03: Nicht bestätigte Firmwareinstallation wird bis zur Home-Assistant-Update-Entität als Fehler weitergegeben.
- G04: Ungültige Druckziele löschen alte Geräte- und Kontodaten. Verspätete Formularereignisse können das alte Ziel nicht wiederherstellen; gültige Wechsel verwenden das aktuelle Ziel. Doppelklicks erzeugen keinen zweiten Auftrag.

## Validierung

- Home Assistant 2026.9.3 / Python 3.14.4: 73 Backendtests bestanden.
- Frontend-Helfer: 11 Assertions bestanden; tatsächliche TypeScript-Druckformular-Callbacks separat in Node geprüft und bestanden.
- Beide regulären Frontend-Builds bestanden, einschließlich TypeScript, ESLint und Rollup.
- Ruff, Flake8, isort und striktes mypy bestanden; mypy prüfte 52 Quelldateien.
- Alle fünf vollständigen Browser-Suites wurden gestartet, konnten aber wegen einer Sandbox-Verweigerung bei Chromiums socket shutdown nicht bis zu ihren Tests gelangen. Sie gelten ausdrücklich nicht als bestanden. Der Node-Callbacktest ersetzt keine Prüfung des Browser-Renderings.
- Die Sandbox verweigert außerdem socketpair.send. Der Backend-Teststarter ergänzt deshalb ausschließlich im Testprozess periodische Eventloop-Weckereignisse. Der Produktcode wurde dafür nicht angepasst.
- Werkzeuge wurden aus vorhandenen lokalen Paketcaches bereitgestellt. Die zunächst fehlenden Typ-Stubs wurden ergänzt und die Typprüfung anschließend erfolgreich wiederholt.

Es gab keine Liveprüfung mit Anycubic-Konto oder den sieben in der README genannten Druckermodellen. Die zurückgestellte Einheit der ACE-Trocknungsdauer wurde nicht geraten und bleibt ungeändert. Die Prüfung belegt die reparierten Szenarien und die aufgeführten Tests, nicht jede mögliche Hardware- oder Cloudkonstellation.

## Lieferung

Das ZIP enthält den vollständigen bisherigen Lieferumfang, die neuen Regressionstests und diesen Bericht. Alle enthaltenen Python- und JSON-Dateien werden beim Packen geparst. ZIP-CRC, Versionsnummer und bytegenaue Übereinstimmung sämtlicher Dateien mit dem geprüften Arbeitsstand werden kontrolliert; Dateiinventar, SHA-256 und Änderungspatch liegen im Audit-Verzeichnis. Frühere ZIPs bleiben erhalten.
