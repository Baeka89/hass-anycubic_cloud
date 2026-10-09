# Reparatur- und Releasebericht 0.9.9

Stand: 8. Oktober 2026. Grundlage ist die im Chat gelieferte Version 0.9.8. Alle früheren Reparaturen bleiben enthalten. Diese Version ergänzt die ausdrücklich gewünschte MQTT-Kompatibilitätsoption, korrigiert das CHANGELOG und entschärft die Behandlung unbekannter ACE-Firmware-IDs. Für Licht und das S1-Temperaturproblem gibt es keine neuen Befunde; dafür wird keine Reparatur behauptet.

## Änderungen

### MQTT-TLS-Option

Im HA-Optionsschritt „MQTT-Verbindung & Trocknungspresets“ gibt es die neue Option **MQTT-Serverzertifikat und Hostnamen prüfen** (`mqtt_verify_tls`). Sie ist für neue und bestehende Konfigurationen ohne gespeicherte Option standardmäßig **aktiv**.

- Aktiv: Server-CA- und Hostnamenprüfung bleiben eingeschaltet. Der bestehende Cipher-Filter `ECDHE+AESGCM:!aNULL:!eNULL:@SECLEVEL=0` bleibt bestehen.
- Bewusst deaktiviert: Ein verschlüsselter Kompatibilitätsmodus ohne Prüfung der Serveridentität wird verwendet. Cipher-Auswahl: `DEFAULT:!aNULL:!eNULL:@SECLEVEL=0`. Clientzertifikat und Schlüssel werden weiterhin geladen; Mindestversion bleibt TLS 1.2. Die fehlende Identitätsprüfung ermöglicht Angriffe durch einen vorgetäuschten Server und ist in den deutschen/englischen Optionserklärungen beschrieben. Der Client schreibt eine Warnung.
- Ein Verbindungs- oder Zertifikatsfehler schaltet die Prüfung **niemals automatisch ab**. Die Option wird durch alle drei Optionsschritte erhalten und beim Neuaufbau des API-Clients übernommen. Die vorhandene HA-Optionsänderungsbehandlung lädt die Integration nach Speichern neu.

Der Kompatibilitätsmodus ist bewusst keine vollständige Wiederherstellung jedes alten TLS-Parameters: TLS 1.2 und der Ausschluss anonymer/unverschlüsselter Cipher bleiben erhalten. Der SHA-1-Clientzertifikatskette wegen bleibt die bereits dokumentierte OpenSSL-Ausnahme SECLEVEL=0 erforderlich.

### ACE-Firmware-Metadaten

Firmwareeinträge mit Box-IDs außerhalb der aktuell unterstützten IDs 0 und 1 werden mit einer Warnung übersprungen, statt die gesamte Antwort abzulehnen. Bekannte Boxdaten werden weiter verarbeitet und ihrer tatsächlichen ID zugeordnet. Doppelte bekannte Box-IDs und strukturell ungültige Daten bleiben Fehler. Das erweitert nicht die Steuerungsunterstützung auf weitere ACE-IDs; Geräte-, Slot- und Steuerungsprüfungen bleiben erhalten.

### CHANGELOG und Dokumentation

Der CHANGELOG-Titel steht wieder am Anfang. Die Einträge 0.9.4 bis 0.9.9 besitzen jeweils englische und deutsche Abschnitte; ältere Einträge bleiben erhalten. Die README beschreibt die TLS-Option zweisprachig. Manifest, Frontend-Paket, Lockfile und Versionshistorie tragen 0.9.9; beide Frontend-Bundles wurden über die regulären Kommandos neu gebaut.

## Bewertung der übrigen Rückmeldung

- **Paketpins:** Im real installierten HA 2026.9.3 sind paho-mqtt 2.1.0 und aiofiles 25.1.0 installiert. Die HA-MQTT-Integration und package_constraints.txt verlangen ebenfalls paho-mqtt==2.1.0; die HA-Integrationen Matrix und Slack verlangen aiofiles==25.1.0. Für diese geprüfte HA-Version ist der vermutete Pin-Konflikt nicht belegt. Die Pins bleiben unverändert. Der persönliche HA-Container des Nutzers wurde nicht untersucht; kein pauschaler Nachweis für andere HA-Patchstände oder alle zusätzlichen Custom-Integrationen.
- **Unique-ID-Migration:** Das Verhalten aus 0.9.5 bleibt erhalten. Die Migration erhält bestehende Entity-IDs, Namen und Registry-Einstellungen; redundante Bridge-Entities werden deaktiviert, nicht gelöscht. Backup und Kontrolle betroffener Automationen/Dashboards sind im Übergang zu diesen Versionen sinnvoll. Zwei physische Drucker des Nutzers wurden hier nicht geprüft.
- **Cooldown:** Der vorhandene Zustand „nicht verfügbar“ nach wiederholten Cloudfehlern bleibt erhalten. Version 0.9.9 führt daran keine neue Verhaltensänderung ein.
- **Licht und S1:** Kein neuer Licht-Fix und keine belegte Temperaturkorrektur enthalten. Die Versionsnummer ist kein Nachweis, dass diese beiden Anliegen gelöst sind.
- **Befund 31:** Einheit der ACE-Trocknungsdauer bleibt gemäß Nutzerentscheidung ungeklärt und unverändert; keine geratene Umrechnung.

## Validierung

Prüfumgebung: reale HA-2026.9.3-Module, Python 3.14.4 und Node 24; vorhandene Frontend-Abhängigkeiten aus dem bereits geprüften Projekt-Lockfile, dessen Abhängigkeitsstände unverändert bleiben.

- **79 Backendtests bestanden:** bisherige 73 plus sechs neue Tests mit Teilfällen für TLS-Standard/Kompatibilität, fehlenden automatischen Rückfall, Optionspersistenz über alle Schritte, Weitergabe an den Client, unbekannte/duplizierte ACE-IDs sowie Übersetzungen und CHANGELOG-Struktur.
- **Ruff, Flake8, isort und striktes mypy bestanden.** Mypy prüft 52 Integrationsdateien.
- **Beide regulären Frontend-Builds bestanden**, einschließlich ESLint, TypeScript und Rollup.
- **Elf Frontend-Helfer-Assertions und die tatsächlichen TypeScript-Druckformular-Callbacks in Node bestanden.**
- **Übersetzungsgenerator reproduzierbar:** erneutes Generieren ergibt byte-identische strings.json sowie de.json/en.json.
- **Browserprüfung offen:** Die Suite browser_deep_audit.cjs wurde erneut gestartet. Chromium beendet sich vor dem Test mit einer Sandbox-Verweigerung bei socket shutdown. Die Browserprüfung gilt ausdrücklich nicht als bestanden; weitere Starts derselben blockierten Umgebung wurden nicht wiederholt. Die übrigen Browser-Suites wurden für 0.9.9 nicht erneut ausgeführt. Die separat bestandenen Node-Callbacks ersetzen keinen Renderingtest.
- **Live-TLS-Prüfung offen:** Der Versuch, Broker-Zertifikat und Hostname über OpenSSL mit der vorhandenen CA zu prüfen, scheitert vor dem Handshake an der DNS-Auflösung von mqtt-universe.anycubic.com. Weder Zertifikatskompatibilität noch tatsächlich unterstützte Broker-Cipher sind dadurch bestätigt. Ein anfänglicher Prüfaufruf enthielt einen falschen lokalen CA-Pfad; der korrigierte Aufruf und sein DNS-Fehler sind separat protokolliert.
- Der Backend-Teststarter verwendet weiterhin die dokumentierten periodischen Eventloop-Weckereignisse, weil die Sandbox socketpair.send verweigert. Das ist eine reine Testprozessanpassung; Produktcode wird dafür nicht verändert.

Keine Live-Anmeldung, Druckausführung oder physische Modellprüfung. Keine Garantie absoluter Fehlerfreiheit und keine pauschale Kompatibilitätsbehauptung für alle HA-2026.09-Patchversionen.

## Lieferung

`hass-anycubic_cloud-0.9.9-fixed.zip` enthält den bisherigen vollständigen Projektlieferumfang, den neuen Regressionstest und diesen Bericht. Das bisherige 0.9.8-ZIP bleibt unverändert. Alle Paketdateien werden vollständig gelesen und mit SHA-256 erfasst; Python und JSON werden beim Packen geparst, CRC und bytegenaue Übereinstimmung mit dem Arbeitsstand geprüft. Paketnachweis, Änderungspatch, Dateiinventar und Logs stehen außerhalb des ZIPs unter `audit/reparatur-0.9.9/`.

Zur Installation `custom_components/anycubic_cloud` aus dem ZIP in die Home-Assistant-Konfiguration übernehmen und HA neu starten. Die TLS-Prüfung bleibt beim Upgrade ohne neue Optionsänderung aktiv. Nach dem Versionswechsel die Kartenressource im Browser neu laden.
