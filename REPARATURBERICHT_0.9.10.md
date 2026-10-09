# Reparaturbericht – Anycubic Cloud 0.9.10

Stand: 8. Oktober 2026. Alle sechs reproduzierten Befunde H01–H06 aus der siebten Prüfung von 0.9.9 sind behoben. Frühere Reparaturen bleiben erhalten. Grundlage sind die unveränderte ZIP-Lieferung 0.9.9 und die ausführbaren Nachweise unter `audit/siebte-pruefung/`.

## H01 – Strikte ACE-IDs

Box-IDs werden vor einer Umwandlung geprüft. Zulässig sind Integer und ganzzahlige Zeichenketten; boolesche Werte, Fließkommazahlen, NaN/Unendlich, Container und nicht ganzzahlige Zeichenketten werden abgewiesen. So können `1.9`, `-0.9`, `true` und `false` keine vorhandene Box adressieren. Die Validierung greift sowohl bei Firmwareaktualisierungen als auch beim initialen Laden und bei verbundenen ACE-Geräten. Ganzzahlige IDs außerhalb 0/1 bleiben für Firmwaremetadaten wie in 0.9.9 mit Warnung übersprungen. Der bestehende Legacy-Fallback bei fehlender Firmware-ID bleibt erhalten.

## H02 – Vollständige Validierung vor Zustandsübernahme

Firmwareantworten werden zunächst vollständig in unabhängigen Kopien validiert. Bei Doppel-ID, fehlenden Pflichtfeldern oder ungültigen Werten bleiben sämtliche alten Firmwarewerte unverändert. Erst nach erfolgreicher Prüfung werden die vorbereiteten Werte übernommen. Bestehende Objektidentität und OTA-Zustände bleiben erhalten, damit vorhandene Referenzen und laufende Updates weiter funktionieren. Verbundene ACE-Boxen werden ebenfalls erst nach vollständiger Prüfung übernommen; eine ungültige Folgemeldung zerstört den vorherigen Boxzustand nicht.

## H03 – Bereinigung bei Upload-Abbruch

Das Entsperren läuft als unabhängiger Task mit einer Frist von **15 Sekunden**. Das Warten des Aufrufers cancelt diesen Cleanup-Task nicht. Auch ein wiederholter Abbruch während des Entsperrens beendet die Bereinigung erst nach ihrem Abschluss beziehungsweise der Frist; anschließend wird die Cancellation weitergegeben. Derselbe Schutz gilt im Erfolgs- und Fehlerpfad. Ohne Cancellation bleibt ein ursprünglicher Uploadfehler erhalten, wenn auch das Entsperren fehlschlägt.

Bei Fristüberschreitung wird ein Fehler weitergegeben beziehungsweise die ursprüngliche Cancellation bewahrt; der Cleanup-Task wird beendet und sein Ergebnis abgeholt. Es bleiben keine unbeobachteten Taskfehler oder absichtlich unbegrenzten Hintergrundaufgaben zurück. Das kann keine Entsperrung garantieren, wenn der reale Cloudserver ausfällt oder nicht rechtzeitig reagiert. Der Timeout ist bewusst begrenzt und kein Nachweis realer Broker-/Cloudantwortzeiten.

## H04 – Tokenvalidierung und Login-Retry

Die Loginfunktion prüft `data` und einen nicht leeren Zeichenkettenwert `token` vor Feldzugriffen. Fehlende Daten, null, Listen, fehlende Token, numerische oder leere Token liefern den vorgesehenen Authentifizierungsfehler. Die vorhandene Login-Wiederholung greift dadurch; nach Ausschöpfung folgt ein kontrollierter Fehler statt KeyError oder TypeError. Ein später erfolgreicher Versuch übernimmt das gültige Token.

## H05 – Signierte URLs in Logs und Fehlerketten redigiert

Die zentralen Debug-, Warn- und Fehlerausgaben entfernen URL-Queryparameter, Fragmente und Benutzerinformationen aus URL-Authorities. Host und Pfad bleiben zur Diagnose erhalten. Damit werden auch Upload-Debug-Tracebacks über dieselbe Redigierung geführt.

HTTP-Fehler werden zusätzlich mit bereinigten Requestinformationen, ohne Requestheader oder Redirectgeschichte, als Exceptionursache weitergereicht. HTTP-Fehlertyp und Status bleiben verfügbar; insbesondere funktioniert die vorhandene 401-Token-Erneuerung weiterhin. Andere Ursachen enthalten einen bereinigten Fehlertext mit dem ursprünglichen Typnamen. Nicht leere Upload-Fehlerantworten werden ebenfalls vor der Weitergabe redigiert.

Tests verwenden ausschließlich erfundene Zugangsdaten und prüfen Debug/Warn/Error-Ausgaben, Standardtracebacks, Exceptiondarstellung, erfolgreiche Upload-Logs sowie HTTP- und Nicht-HTTP-Fehler. Die Redigierung schützt die hier behandelten URL-Zugangsdaten; sie ist keine pauschale Garantie für beliebige Geheimnisse in allen Fremdbibliotheken oder frei formulierten Serverantworten.

## H06 – Warnintervall für langsame Antworten

Nach einer Warnung wird der tatsächliche Warnzeitpunkt einschließlich Sekundenbruchteilen gespeichert. Weitere Warnungen innerhalb der vorgesehenen 600 Sekunden werden unterdrückt; später sind sie wieder möglich. Der Zustand `None` wird ausdrücklich geprüft und nicht mit einem gültigen Null-Zeitstempel verwechselt. Erfolgreiche Folgeaufrufe ohne Warnung verschieben den gespeicherten Warnzeitpunkt nicht.

## Versionierung und Dokumentation

Manifest, Frontend-Paket und Lockfile tragen **0.9.10**. Beide Frontend-Bundles sind neu gebaut. CHANGELOG und Versionshistorie wurden ergänzt; das CHANGELOG bleibt für alle Reparaturversionen zweisprachig. Neues Testmodul: `tests/test_seventh_audit_regressions.py`.

## Validierung

- **92 Backendtests bestanden**: die bisherigen 79 plus 13 neue Tests mit weiteren Teilfällen. Reale HA-2026.9.3-Module / Python 3.14.4; Cloudantworten und Geräte sind simuliert.
- Die neuen Tests decken ID-Aliase und Initialisierung, atomare fehlerhafte/gültige Firmwareantworten, Objektidentität/OTA-Erhalt, verbundene Boxzustände, wiederholte Cancellation, Cleanup-Timeout, ursprüngliche Uploadfehler, Token-Retries, URL-Redigierung und Warnintervall einschließlich Bruchteilen ab.
- **Ruff, Flake8, isort und striktes mypy bestanden**; mypy prüft 52 Integrationsdateien.
- **Beide regulären Frontend-Builds bestanden**, einschließlich ESLint, TypeScript und Rollup.
- **Elf Frontend-Helfer-Assertions sowie die tatsächlichen TypeScript-Druckformular-Callbacks in Node bestanden.**
- **Übersetzungsgenerator reproduzierbar**: alle drei generierten HA-Übersetzungsdateien beim erneuten Generieren byte-identisch.
- Der neue Timeout-/Cancellation-Test prüft zusätzlich den Eventloop-Exceptionhandler. Im abschließenden Testlauf erscheinen keine unbehandelten Cleanup-Taskfehler. Ein zuerst beobachteter Python-3.14-shield-Loggingeffekt wurde vor der Auslieferung durch das Warten über asyncio.wait beseitigt.
- **Browserprüfung offen:** Die Druckziel-Browser-Suite wurde für diese Version gestartet und scheitert vor ihren Testfällen an Chromiums Sandbox-Verweigerung bei socket shutdown. Weitere Browser-Suites wurden in diesem Reparaturlauf nicht erneut gestartet; alle fünf waren unmittelbar zuvor im Audit unter derselben Einschränkung blockiert. Es wird kein bestandener Renderingtest für 0.9.10 behauptet.
- Der Backend-Teststarter verwendet weiterhin die dokumentierten periodischen Eventloop-Weckereignisse für die Sandbox, die socketpair.send verweigert. Das ist eine reine Testprozessanpassung.

## Grenzen und zurückgestellte Punkte

Keine neue Live-Cloud-, Broker-, Drucker- oder Firmwareprüfung. Die TLS-Kompatibilität zum Anycubic-Broker bleibt nicht live bestätigt. Die in 0.9.9 eingeführte TLS-Prüfung ist standardmäßig aktiv; Kompatibilitätsmodus nur nach ausdrücklicher Optionswahl, ohne automatischen Rückfall.

Für Licht und das S1-Temperaturproblem liegen weiterhin keine neuen Befunde vor; deren Behebung wird nicht behauptet. Die Einheit der ACE-Trocknungsdauer bleibt gemäß Nutzerentscheidung zurückgestellt und unverändert. Nicht jedes Patchrelease von HA 2026.09.x oder jede Hardwarekonstellation wurde getestet. Absolute Fehlerfreiheit wird nicht behauptet.

## Lieferung und Installation

`hass-anycubic_cloud-0.9.10-fixed.zip` enthält den vollständigen bisherigen Lieferumfang, das neue Regressionstestmodul und diesen Bericht. Alle 166 Paketdateien werden vollständig gelesen, gehasht und byteweise mit dem geprüften Arbeitsstand verglichen; Python, JSON, YAML, JS/TS sowie Bild- und TLS-Ressourcen werden auf Format/Syntax geprüft. ZIP-CRC und Versionsnummer werden geprüft. Frühere ZIPs einschließlich 0.9.9 bleiben unverändert.

Paketnachweis, Dateiinventar, Änderungspatch und Prüfprotokolle stehen außerhalb des Lieferpakets unter `audit/reparatur-siebte-pruefung/`. Das ältere negative Reproduktionsprogramm ist ein historischer Nachweis für 0.9.9; die neuen Regressionstests prüfen das korrigierte Verhalten.

Zur Installation `custom_components/anycubic_cloud` aus dem ZIP in die HA-Konfiguration übernehmen und Home Assistant neu starten. Die Kartenressource im Browser neu laden. Bereits bestehende Einstellungen und der explizite TLS-Modus bleiben erhalten.
