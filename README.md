# Anycubic Cloud Integration

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/default/pull/11723)

[Deutsch](#deutsch) | [English](#english)

<a id="deutsch"></a>

## Deutsch

### 1. Anycubic Cloud

Anycubic-Cloud-Integration für Home Assistant.

### 2. Projektzweck und Funktionsumfang

Die Integration verbindet Anycubic-Cloud-Konten mit Home Assistant. Sie stellt Druckerstatus, Temperaturen, Druckfortschritt, Dateiverwaltung und geräteabhängige Steuerung bereit. Drucker, ACE-Boxen und Cloud-Anbindung erhalten getrennte Geräteansichten. Das vorhandene Seitenleisten-Panel und die Dashboard-Karte bleiben erhalten.

### 3. Unterstützte Systeme, Geräte und Voraussetzungen

Home Assistant ab **2026.9.0**, HACS oder manuelle Installation, ein Anycubic-Konto und Internetzugang sind erforderlich. Im bisherigen Projekt aufgeführt: Kobra 3 Combo, Kobra S1, Kobra 2, Kobra 2 Pro, Kobra 2 Max sowie Photon Mono M5s und M7 Pro mit Basisunterstützung. Diese Veröffentlichung enthält keine erneuten Hardwaretests; verfügbare Entitäten und Steuerungen hängen von Modell, Firmware und Cloud-Antworten ab.

### 4. Installation

1. In HACS dieses Repository als benutzerdefiniertes Repository der Kategorie **Integration** hinzufügen: https://github.com/Baeka89/hass-anycubic_cloud. Die offizielle Katalogaufnahme ist beantragt, aber noch nicht bestätigt.
2. **Anycubic Cloud** installieren und Home Assistant neu starten.
3. Unter **Einstellungen → Geräte & Dienste → Integration hinzufügen** nach **Anycubic Cloud** suchen.

Alternativ den vollständigen Ordner `custom_components/anycubic_cloud` aus dem Release nach `/config/custom_components/anycubic_cloud` kopieren und Home Assistant neu starten. `/config` bezeichnet das Home-Assistant-Konfigurationsverzeichnis; dessen Hostpfad hängt von der Installation ab.

### 5. Einrichtung und Authentifizierung

Die Einrichtung bietet Web-Token, Slicer-Token und Android-App-Zugangsdaten an; anschließend werden die Drucker ausgewählt.

**Web:** Bei https://cloud-universe.anycubic.com/file anmelden, in den Browser-Entwicklerwerkzeugen unter Local Storage den Wert `XX-Token` kopieren und ohne umschließende Anführungszeichen eingeben. Web-Token verwenden Cloud-Polling, da MQTT damit serverseitig eingeschränkt ist.

**Slicer:** Den eigenen Zugriffstoken aus den lokalen Slicer-Dateien beziehungsweise Debug-Logs entnehmen. Bisher dokumentierte Windows-Pfade: `%AppData%\AnycubicSlicerNext\log\debug_*.log` (letzter Eintrag `accessToken = `) und bei älteren Versionen `%AppData%\AnycubicSlicerNext\AnycubicSlicerNext.conf` (`access_token`). macOS: `~/Library/Application Support/AnycubicSlicerNext/AnycubicSlicerNext.conf`. Speicherformat und Pfade können mit Slicer-Versionen wechseln; diese Veröffentlichung prüft sie nicht live.

**Android:** Die eigenen Werte `access_token` und `device_id` sind erforderlich; ihre Extraktion ist nicht Bestandteil dieser Anleitung. Zugangsdaten nicht in Issues oder Logs veröffentlichen.

Bei abgelaufenen Zugangsdaten die von Home Assistant angebotene erneute Authentifizierung verwenden; die vorhandene Konfiguration bleibt dabei erhalten.

### 6. Konfiguration und Optionen

Unter **Konfigurieren** stehen MQTT-Verbindungsmodus, TLS-Prüfung, Wiederholungen, fünf Trocknungspresets, Panel-Einstellungen und Debug-Logging zur Verfügung. MQTT kann nur beim Drucken, beim Drucken/Trocknen, bei Online-Druckern, dauerhaft oder niemals verbunden werden. Beispiel: Web-Authentifizierung und „Niemals über MQTT verbinden“ verwenden Cloud-Polling. Das Panel kann ausgeblendet werden; eine leere Kartenkonfiguration verwendet die vorhandenen Standardwerte.

Die Prüfung des MQTT-Serverzertifikats und Hostnamens ist standardmäßig aktiv. Nur bei diagnostizierten Kompatibilitätsproblemen bewusst ausschalten: TLS bleibt verschlüsselt, die Serveridentität wird dann aber nicht geprüft. Es gibt keinen automatischen Rückfall. Das Speichern der Optionen lädt die Integration neu. Die Einheit der an die Cloud gesendeten ACE-Trocknungsdauer bleibt ungeklärt; diese Veröffentlichung ändert ihre Werte nicht.

### 7. Verwendung

Die Druckeransicht bietet modellabhängige Statuswerte, Druckfortschritt, Temperaturen, Lüfter-/Geschwindigkeitssteuerung und experimentelle Lichtsteuerung. ACE-Ansichten enthalten Spulen, Farben und Trocknung; die Cloud-Ansicht enthält MQTT-Steuerung und erneute Verbindung.

Unter **Entwicklerwerkzeuge → Aktionen** stehen unter anderem `anycubic_cloud.print_existing_cloud_file`, `print_and_upload_save_in_cloud`, `print_and_upload_no_cloud_save`, `delete_file_local`, `delete_file_udisk`, `delete_file_cloud`, `multi_color_box_filament_extrude`, `multi_color_box_filament_retract` sowie materialabhängige `multi_color_box_set_slot_<material>`-Aktionen bereit. Den jeweils vollständigen Namen mit Domäne und die angebotenen Felder im Aktionsdialog verwenden. Keine Entitäts-IDs anhand des Anzeigenamens erraten. Die Dashboard-Karte heißt **Anycubic Printer Card**.

### 8. Aktualisierung

Vor dem Update eine Home-Assistant-Sicherung erstellen. In HACS v0.9.32 installieren oder bei manueller Installation den vollständigen Integrationsordner ersetzen; anschließend Home Assistant neu starten. Gegenüber v0.9.31 sind keine Entitätsmigrationen oder geänderten Steuerungsabläufe vorgesehen. Die vorhandenen Symbole werden lokal mitgeliefert.

### 9. Bekannte Einschränkungen und Fehlerbehebung

Cloud- und MQTT-Verbindungen hängen von Anycubic und der Netzverbindung ab. Bei Web-Token erfolgt die Aktualisierung per Polling. Lichtsteuerung bleibt experimentell; es gibt keine neue Lösung für S1-Temperaturverhalten oder die ungeklärte ACE-Trocknungsdauer-Einheit. Hardware, Cloud-Zugriff und Broker-TLS werden durch diese Brand-Veröffentlichung nicht live geprüft. Bei Problemen den fehlgeschlagenen Prüf- oder Home-Assistant-Logabschnitt mit geschwärzten Zugangsdaten melden. Lokale Brand-Dateien vermeiden für die HACS-Brand-Prüfung den bisherigen Rückgriff auf den externen Brands-Dienst; andere Prüfungen können weiterhin Netzwerkzugriff benötigen.

### 10. Entwicklung und Tests

Entwicklungsanleitung: [DEVELOPMENT.md](DEVELOPMENT.md). Die GitHub-Workflows prüfen Python, Regressionstests, Übersetzungsgenerierung, TypeScript, Frontend-Builds, Hassfest und HACS. Der Veröffentlichungsablauf prüft zusätzlich PNG-Struktur, Abmessungen, Originaldatei-Prüfsummen, Versionskonsistenz und unveränderte Laufzeitquellen. Der tatsächlich abgeschlossene Prüfungsumfang steht im Release und Changelog.

### 11. Versionshistorie

[CHANGELOG.md](CHANGELOG.md) · [GitHub-Releases](https://github.com/Baeka89/hass-anycubic_cloud/releases). Historische Zwischenstände werden in dieser Änderung nicht umnummeriert oder entfernt.

### 12. Unterstützung, Mitwirkung, Danksagung und Lizenz

Fehler und Beiträge: [Issues](https://github.com/Baeka89/hass-anycubic_cloud/issues) und Pull Requests. Betreuer: [Baeka89](https://github.com/Baeka89). Danke an WaresWichall und dangreco für die ursprüngliche Arbeit. [Unterstützung via PayPal](https://paypal.me/misomazo). Integrationscode: [GNU GPL v3](LICENSE); vorhandene Marken und Symbole bleiben ihren jeweiligen Rechteinhabern zugeordnet. Die Herkunft der unverändert übernommenen Brand-Dateien ist in `brand/SOURCE.md` dokumentiert.

<a id="english"></a>

## English

### 1. Anycubic Cloud

Anycubic Cloud integration for Home Assistant.

### 2. Purpose and features

The integration connects Anycubic Cloud accounts to Home Assistant. It provides printer status, temperatures, print progress, file management and device-dependent controls. Printers, ACE boxes and the cloud connection have separate device views. The existing sidebar panel and dashboard card are retained.

### 3. Supported systems, devices and requirements

Home Assistant **2026.9.0** or newer, HACS or manual installation, an Anycubic account and internet access are required. Previously listed models: Kobra 3 Combo, Kobra S1, Kobra 2, Kobra 2 Pro, Kobra 2 Max, plus Photon Mono M5s and M7 Pro with basic support. This release includes no new hardware testing; available entities and controls depend on model, firmware and cloud responses.

### 4. Installation

1. In HACS, add https://github.com/Baeka89/hass-anycubic_cloud as a custom repository with category **Integration**. Default-catalog inclusion has been requested but is not confirmed.
2. Install **Anycubic Cloud** and restart Home Assistant.
3. Under **Settings → Devices & services → Add integration**, search for **Anycubic Cloud**.

Alternatively, copy the complete `custom_components/anycubic_cloud` directory from the release to `/config/custom_components/anycubic_cloud` and restart Home Assistant. `/config` denotes the Home Assistant configuration directory; its host path depends on your installation.

### 5. Setup and authentication

Setup offers web tokens, slicer tokens and Android app credentials, followed by printer selection.

**Web:** Sign in at https://cloud-universe.anycubic.com/file, copy `XX-Token` from Local Storage in the browser developer tools and enter it without surrounding quotes. Web tokens use cloud polling because MQTT is restricted server-side.

**Slicer:** Obtain your access token from local slicer files or debug logs. Previously documented Windows locations: `%AppData%\AnycubicSlicerNext\log\debug_*.log` (last `accessToken = ` entry), or `%AppData%\AnycubicSlicerNext\AnycubicSlicerNext.conf` (`access_token`) for older versions. macOS: `~/Library/Application Support/AnycubicSlicerNext/AnycubicSlicerNext.conf`. Storage formats and paths may change with slicer versions; this release does not verify them live.

**Android:** Your own `access_token` and `device_id` are required; extraction is outside this guide. Do not publish credentials in issues or logs.

When credentials expire, use the reauthentication offered by Home Assistant; existing configuration is retained.

### 6. Configuration and options

**Configure** provides MQTT connection mode, TLS verification, retries, five drying presets, panel settings and debug logging. MQTT can connect while printing, while printing/drying, while printers are online, always or never. Example: web authentication with “Never connect MQTT” uses cloud polling. The panel can be hidden; an empty card configuration uses existing defaults.

MQTT server-certificate and hostname verification is enabled by default. Explicitly disable it only for diagnosed compatibility problems: TLS remains encrypted, but server identity is no longer verified. There is no automatic fallback. Saving options reloads the integration. The unit of ACE drying-duration values sent to the cloud remains unresolved; this release does not change those values.

### 7. Usage

The printer view provides model-dependent status, print progress, temperatures, fan/speed controls and experimental light control. ACE views contain spools, colours and drying; the cloud view contains MQTT controls and reconnect.

**Developer tools → Actions** includes `anycubic_cloud.print_existing_cloud_file`, `print_and_upload_save_in_cloud`, `print_and_upload_no_cloud_save`, `delete_file_local`, `delete_file_udisk`, `delete_file_cloud`, `multi_color_box_filament_extrude`, `multi_color_box_filament_retract` and material-specific `multi_color_box_set_slot_<material>` actions. Use each complete domain-qualified name and the fields shown in the action dialog. Do not guess entity IDs from display names. The dashboard card is named **Anycubic Printer Card**.

### 8. Updating

Create a Home Assistant backup before updating. Install v0.9.32 in HACS, or replace the complete integration directory for manual installations; then restart Home Assistant. Compared with v0.9.31, no entity migrations or changed control workflows are intended. Existing icons are bundled locally.

### 9. Known limitations and troubleshooting

Cloud and MQTT connections depend on Anycubic and network connectivity. Web tokens use polling. Light control remains experimental; there is no new solution for S1 temperature behaviour or the unresolved ACE drying-duration unit. Hardware, cloud access and broker TLS are not tested live by this brand release. Report the failing validation or Home Assistant log section with credentials redacted. Local brand files avoid the previous fallback to the external brands service during HACS brand validation; other checks may still require network access.

### 10. Development and tests

Development guide: [DEVELOPMENT.md](DEVELOPMENT.md). GitHub workflows check Python, regressions, translation generation, TypeScript, frontend builds, Hassfest and HACS. The publication process additionally checks PNG structure, dimensions, original-file checksums, version consistency and unchanged runtime sources. Completed validation scope is recorded in the release and changelog.

### 11. Version history

[CHANGELOG.md](CHANGELOG.md) · [GitHub releases](https://github.com/Baeka89/hass-anycubic_cloud/releases). Historical intermediate records are not renumbered or removed by this change.

### 12. Support, contributions, acknowledgements and licence

Report bugs and contribute through [issues](https://github.com/Baeka89/hass-anycubic_cloud/issues) and pull requests. Maintainer: [Baeka89](https://github.com/Baeka89). Thanks to WaresWichall and dangreco for the original work. [Support via PayPal](https://paypal.me/misomazo). Integration code: [GNU GPL v3](LICENSE); existing trademarks and icons remain associated with their respective rights holders. The origin of unchanged brand files is documented in `brand/SOURCE.md`.
