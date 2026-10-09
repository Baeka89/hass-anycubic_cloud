# Changelog

All notable changes to this project are documented here. / Alle wesentlichen Projektänderungen sind hier dokumentiert.

## [0.9.31]

### English 🇺🇸

- Fix the eleven confirmed findings from audits eight through ten without changing the frontend design or normal workflows.
- Validate command acknowledgements, ACE box/slot IDs and drying targets; preserve valid state when a batch fails.
- Keep signed URL parameters and undecodable MQTT payloads out of error logs; synchronize REST and MQTT firmware updates.
- Validate the print target before consuming uploaded files; use slot IDs for material mappings and retain valid local/USB file lists on parsing errors.
- Cancel account background callbacks during unload and prevent delayed queries from running afterward.
- Preserve drying-duration values and existing TLS options. Add eleven offline regression tests.

### Deutsch 🇩🇪

- Elf bestätigte Befunde aus den Prüfungen acht bis zehn behoben, ohne Frontend-Design oder reguläre Bedienabläufe zu ändern.
- Befehlsbestätigungen, ACE-Box-/Slot-IDs und Trocknungsziele validieren; gültigen Zustand bei fehlerhaften Antworten erhalten.
- Signierte URL-Parameter und nicht dekodierbare MQTT-Payloads aus Fehlerlogs entfernen; REST- und MQTT-Firmwareänderungen synchronisieren.
- Druckziel vor Verbrauch der Upload-Datei prüfen; Materialmapping nach Slot-ID zuordnen und gültige lokale/USB-Dateilisten bei Parsingfehlern erhalten.
- Hintergrundaufgaben beim Entladen des Kontos abbrechen und nachträgliche Abfragen verhindern.
- Trocknungsdauerwerte und bestehende TLS-Optionen unverändert lassen. Elf Offline-Regressionstests ergänzen.

## [0.9.10]

### English 🇺🇸

- Fix all six confirmed seventh-audit findings.
- Reject nonintegral/boolean ACE firmware IDs and apply firmware batches only after full validation, preserving existing references and OTA state.
- Complete bounded upload cleanup despite cancellation, including cancellation during successful-upload unlock.
- Validate token responses so missing/invalid token data follows login retries.
- Redact URL queries, fragments and user credentials in logs and HTTP exception chains, preserving HTTP status for reauthentication.
- Update the slow-response warning timestamp to enforce the configured interval.

### Deutsch 🇩🇪

- Alle sechs bestätigten Befunde der siebten Prüfung behoben.
- Nicht ganzzahlige/boolesche ACE-Firmware-IDs abweisen; Firmwareantworten erst nach vollständiger Validierung übernehmen und bestehende Referenzen sowie OTA-Zustand erhalten.
- Begrenzte Upload-Bereinigung auch bei Abbruch abschließen, einschließlich Abbruch während des Entsperrens nach erfolgreichem Upload.
- Tokenantworten validieren, damit fehlende/ungültige Tokendaten die Login-Wiederholungen durchlaufen.
- URL-Query, Fragment und Benutzerinformationen in Logs und HTTP-Exceptionketten redigieren; HTTP-Status für Reauthentifizierung erhalten.
- Warnzeitstempel für langsame Antworten fortschreiben und das konfigurierte Intervall einhalten.

## [0.9.9]

### English 🇺🇸

- Add an explicit MQTT TLS verification option, enabled by default. Disabling it selects compatibility mode with no server-identity verification and a broader cipher selection; there is no automatic fallback.
- Ignore firmware metadata for unsupported ACE box IDs without rejecting known boxes. Duplicate known IDs and malformed metadata remain errors.
- Restore English and German entries for 0.9.4–0.9.9 beneath the changelog title.
- Light and S1 temperature behavior are unchanged; the ACE drying-duration unit remains unresolved.

### Deutsch 🇩🇪

- Explizite Option zur MQTT-TLS-Prüfung ergänzt, standardmäßig aktiv. Deaktivieren wählt den Kompatibilitätsmodus ohne Prüfung der Serveridentität und mit breiterer Cipher-Auswahl; kein automatischer Rückfall.
- Firmwaremetadaten unbekannter ACE-Box-IDs werden ignoriert, bekannte Boxen bleiben auswertbar. Doppelte bekannte IDs und fehlerhafte Metadaten bleiben Fehler.
- Englische und deutsche Einträge für 0.9.4–0.9.9 unter dem CHANGELOG-Titel wiederhergestellt.
- Licht- und S1-Temperaturverhalten bleiben unverändert; die Einheit der ACE-Trocknungsdauer bleibt ungeklärt.

## [0.9.8]

### English 🇺🇸

- Fix the eight confirmed findings from the fifth and sixth audits: ACE devices/entities/mappings use actual box IDs; successful uploads are not rejected by global quota changes and are followed by their own file IDs.
- Persist authentication snapshots only after successful storage, serialize writes and validate user responses before field access.
- Serialize auto-feed actions per printer/box, update replaced box objects after acknowledgements and report rejected firmware actions.
- Prevent stale or invalid printer targets and duplicate submissions in the print panel.

### Deutsch 🇩🇪

- Acht bestätigte Befunde der fünften und sechsten Prüfung behoben: ACE-Geräte, Entitäten und Zuordnungen nutzen tatsächliche Box-IDs; bestätigte Uploads werden nicht durch globale Quotenänderungen abgelehnt und über ihre eigenen Datei-IDs verfolgt.
- Authentifizierungsstände erst nach erfolgreicher Speicherung quittieren, Schreibvorgänge serialisieren und Benutzerantworten vor Feldzugriffen validieren.
- Auto-Feed-Aktionen pro Drucker und Box serialisieren, ersetzte Boxobjekte nach Bestätigung aktualisieren und abgelehnte Firmwareaktionen melden.
- Veraltete oder ungültige Druckziele und doppelte Aufträge im Druckpanel verhindern.

## [0.9.7]

### English 🇺🇸

- Validate ACE services by actual box ID and report unloaded config entries clearly.
- Route authenticated API HTTP 401 responses through token refresh and HA reauthentication.
- Await MQTT workers before restart and ignore stale client callbacks and cleanup.
- Freeze elapsed and remaining print statistics while paused or inactive.

### Deutsch 🇩🇪

- ACE-Serviceziele anhand tatsächlicher Box-ID prüfen und entladene Konfigurationen verständlich melden.
- HTTP 401 authentifizierter API-Aufrufe an Token-Erneuerung und HA-Reauthentifizierung weitergeben.
- Vor MQTT-Neustart das Worker-Ende abwarten; veraltete Clientcallbacks und Cleanup ignorieren.
- Vergangene und verbleibende Druckzeit bei Pause oder inaktivem Druck anhalten.

## [0.9.6]

### English 🇺🇸

- Validate HTTP status and API response structure. Resolve ACE firmware, MQTT updates and auto-feed targets by explicit box ID.
- Refresh images on coordinator updates, version frontend image URLs and retain validated content types; handle empty diagnostics and consistent MQTT defaults.
- Refresh debug registries, correct German documentation, frontend lint/types and strict HA 2026.9 imports.
- Declare tslib and lit-html, complete the lockfile and reject unresolved browser imports. Correct the insufficient 0.9.5 build verification using fresh npm ci and rebuild both bundles.
- Add backend/browser regressions; ACE drying-duration unit verification remains deferred.

### Deutsch 🇩🇪

- HTTP-Status und API-Antwortstruktur validieren. ACE-Firmware, MQTT-Aktualisierungen und Auto-Feed anhand expliziter Box-ID zuordnen.
- Bilder bei Coordinator-Updates erneuern, Frontend-Bild-URLs versionieren und validierte Inhaltstypen erhalten; leere Diagnosen und einheitliche MQTT-Standards behandeln.
- Debug-Registries aktualisieren, deutsche Dokumentation, Frontend-Lint/Typen und strikte HA-2026.9-Imports korrigieren.
- Tslib und lit-html deklarieren, Lockfile vervollständigen und unaufgelöste Browser-Imports ablehnen. Unzureichenden Buildnachweis für 0.9.5 durch frisches npm ci und Neubau beider Bundles korrigieren.
- Backend-/Browser-Regressionstests ergänzen; Prüfung der ACE-Trocknungsdauer-Einheit bleibt zurückgestellt.

## [0.9.5]

### English 🇺🇸

- Fix all 20 second-audit findings: MQTT readiness/subscription failures, ACE firmware/state/service validation, G-code parsing and firmware progress.
- Use stable account-scoped entity IDs, migrate registry entries in place and disable redundant bridge controls without deleting entries.
- Refresh delayed registries, restore previews and bridge selection; correct ACE configuration, box switching, duration formatting and later capabilities.
- Add backend/browser coverage and rebuild both bundles; ACE drying-duration unit remains deferred.

### Deutsch 🇩🇪

- Alle 20 Befunde der zweiten Prüfung behoben: MQTT-Bereitschaft und Subscription-Fehler, ACE-Firmware/Zustand/Servicevalidierung, G-Code-Parsing und Firmwarefortschritt.
- Stabile kontobezogene Entity-IDs verwenden, bestehende Registry-Einträge migrieren und redundante Bridge-Steuerungen ohne Löschen deaktivieren.
- Spätere Registries berücksichtigen, Vorschaubilder und Bridge-Auswahl wiederherstellen; ACE-Konfiguration, Boxwechsel, Dauerformatierung und nachträgliche Fähigkeiten korrigieren.
- Backend-/Browser-Tests ergänzen und beide Bundles neu bauen; ACE-Trocknungsdauer-Einheit bleibt zurückgestellt.

## [0.9.4]

### English 🇺🇸

- Correct ACE target IDs, entity controls, print failure propagation and upload cleanup.
- Repair MQTT threading/reconnect/options and enable server CA/hostname verification.
- Resolve entities through the HA registry, handle missing spools/delayed registries and use the HA timezone for ETA.
- Register cloud-file printing and service selectors, paginate file lists and fix account/panel/device state.
- Update tooling, translations and generated assets for HA 2026.9; add offline regressions.
- Remove unsupported buttons and a credential-bearing screenshot; ACE feed/retract services require explicit slots. No guessed drying-duration conversion.

### Deutsch 🇩🇪

- ACE-Ziel-IDs, Entity-Steuerungen, Druckfehlermeldungen und Upload-Cleanup korrigieren.
- MQTT-Threading, Reconnect und Optionen reparieren; Server-CA und Hostname prüfen.
- Entities über die HA-Registry zuordnen, fehlende Spulen und spätere Registries behandeln; ETA in HA-Zeitzone berechnen.
- Cloud-Dateidruck und Service-Selektoren registrieren, Dateilisten paginieren und Konto-/Panel-/Gerätezustand korrigieren.
- Werkzeuge, Übersetzungen und generierte Dateien für HA 2026.9 aktualisieren; Offline-Regressionstests ergänzen.
- Nicht unterstützte Buttons und Screenshot mit Zugangsdaten entfernen; ACE-Feed/Retract-Services benötigen explizite Slots. Keine geratene Trocknungsdauer-Umrechnung.

## [0.9.3]

### English 🇺🇸

#### Fixed

- **Backend:** fixed a crash during initial setup (`TypeError: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'`) on printers without an attached external-shelf accessory. Those printers report `external_shelves` as a dict with `"id": null` instead of omitting the field entirely, and the integration was calling `int(id)` on that unconditionally. `id: null` is now treated the same as "no external shelves present" instead of crashing - same class of defensive-parsing fix as the ACE `feed_status` issue in 0.9.1.

### Deutsch 🇩🇪

#### Behoben

- **Backend:** Absturz beim initialen Setup behoben (`TypeError: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'`), der bei Druckern ohne angeschlossenes externes Regal-Zubehör auftrat. Diese Drucker melden `external_shelves` als Dict mit `"id": null`, statt das Feld ganz wegzulassen, und die Integration hat darauf bedingungslos `int(id)` aufgerufen. `id: null` wird jetzt genauso behandelt wie "kein externes Regal vorhanden", statt abzustürzen - dieselbe Art von defensivem Parsing-Fix wie beim ACE-`feed_status`-Problem in 0.9.1.

## [0.9.2]

### English 🇺🇸

#### Added

- **Kobra S1 support: chamber temperature sensors.** The printer's current and target chamber temperature (when reported by the cloud API) are now exposed as their own sensor entities, following the same pattern as the existing nozzle/hotbed temperature sensors. On printers that don't report chamber data (e.g. the Kobra 3), the entities exist but simply show "unavailable" - no behavior change for existing setups.
- **Diagnostic sensors for `features` and `unknown_type_function_ids`.** Two new diagnostic-category sensors summarize which cloud-reported feature flags are currently enabled and list any printer capability IDs the integration doesn't recognize yet, to make future troubleshooting/support easier without needing debug logs.
- **Second light entity for the room/box light.** Printers that report a `BOX_LIGHT` capability (like the Kobra S1) now get their own "Room Light" entity, separate from the head/extruder light. **Note:** the light command value used for this entity is a best-guess based on the Cloud API's parameter pattern and has not yet been confirmed against real hardware behavior; please report back if it doesn't control the light you expect.
- **Configurable retry/backoff for cloud update cycles.** A single slow or transiently failing update cycle no longer immediately counts as a failure. The integration now retries the full update cycle with exponential backoff (1s, 2s, 4s, ...) before giving up. The number of retries (0-5, default 2) can be adjusted in the integration's options.
- **Home Assistant repair notice for a persistently degraded cloud connection.** If update cycles keep failing across two or more consecutive cooldown periods (even after the retries above), a low-severity Repair notice now appears under Settings → Repairs, explaining that this usually points to a temporary Anycubic Cloud outage rather than a printer problem. It clears itself automatically once updates succeed again - no action required.

#### Fixed

- **Backend:** the printer's head/extruder light command was previously sent with a hardcoded light type regardless of which light capability the entity actually represented, which the Kobra S1 rejected with cloud error code `10349` because it has no extruder light. The head-light entity is now correctly gated to printers reporting a video/head light capability, and light commands use the light type appropriate for the entity being controlled (see the new Room Light entity above).
- **Backend:** the cloud API's `info`/`hardwareProfile` MQTT message types were previously entirely unhandled, logging as a generic "Unknown mqtt update" on every occurrence (frequent on the Kobra S1). Both message types are now parsed properly.
- **Backend:** internal API errors were previously swallowed in some cases without logging the underlying cause, making certain connection issues hard to diagnose; the real exception is now logged and chained through.

### Deutsch 🇩🇪

#### Hinzugefügt

- **Kobra-S1-Unterstützung: Kammertemperatur-Sensoren.** Die aktuelle und die Ziel-Kammertemperatur des Druckers (sofern von der Cloud-API gemeldet) werden jetzt als eigene Sensor-Entities bereitgestellt, nach demselben Muster wie die bestehenden Düsen-/Heizbett-Temperatursensoren. Auf Druckern ohne Kammerdaten (z. B. Kobra 3) existieren die Entities zwar, zeigen aber schlicht "nicht verfügbar" - keine Verhaltensänderung für bestehende Setups.
- **Diagnose-Sensoren für `features` und `unknown_type_function_ids`.** Zwei neue Sensoren der Kategorie "Diagnose" fassen zusammen, welche von der Cloud gemeldeten Feature-Flags aktuell aktiviert sind, und listen etwaige Drucker-Funktions-IDs auf, die die Integration noch nicht kennt - erleichtert künftige Fehlersuche/Support ohne Debug-Logs.
- **Zweite Licht-Entity fürs Raum-/Boxlicht.** Drucker, die eine `BOX_LIGHT`-Fähigkeit melden (wie der Kobra S1), bekommen jetzt eine eigene "Raumlicht"-Entity, getrennt vom Kopf-/Extruderlicht. **Hinweis:** Der für diese Entity verwendete Lichtbefehls-Wert ist eine fundierte Vermutung basierend auf dem Parameter-Muster der Cloud-API und wurde noch nicht an echter Hardware bestätigt - bitte Rückmeldung geben, falls damit nicht das erwartete Licht gesteuert wird.
- **Konfigurierbares Retry/Backoff für Cloud-Update-Zyklen.** Ein einzelner langsamer oder vorübergehend fehlschlagender Update-Zyklus zählt nicht mehr sofort als Fehlschlag. Die Integration wiederholt den kompletten Update-Zyklus jetzt mit exponentiellem Backoff (1s, 2s, 4s, ...), bevor sie aufgibt. Die Anzahl der Wiederholungen (0-5, Standard 2) lässt sich in den Optionen der Integration einstellen.
- **Home-Assistant-Reparaturhinweis bei anhaltend gestörter Cloud-Verbindung.** Schlagen Update-Zyklen über zwei oder mehr aufeinanderfolgende Cooldown-Perioden hinweg wiederholt fehl (selbst nach den oben genannten Wiederholungsversuchen), erscheint jetzt unter Einstellungen → Reparaturen ein Hinweis niedriger Dringlichkeit, der erklärt, dass dies meist auf eine vorübergehende Störung der Anycubic Cloud hindeutet und nicht auf ein Druckerproblem. Er verschwindet automatisch, sobald Updates wieder erfolgreich sind - keine Aktion nötig.

#### Behoben

- **Backend:** Der Lichtbefehl fürs Kopf-/Extruderlicht wurde bisher unabhängig von der tatsächlich angesprochenen Lichtfähigkeit mit einem festen Lichttyp gesendet, was der Kobra S1 mit Cloud-Fehlercode `10349` ablehnte, da er kein Extruderlicht besitzt. Die Kopflicht-Entity ist jetzt korrekt auf Drucker mit Video-/Kopflicht-Fähigkeit beschränkt, und Lichtbefehle verwenden den zur jeweiligen Entity passenden Lichttyp (siehe neue Raumlicht-Entity oben).
- **Backend:** Die MQTT-Nachrichtentypen `info`/`hardwareProfile` der Cloud-API wurden bisher überhaupt nicht behandelt und erschienen bei jedem Auftreten (häufig beim Kobra S1) nur als generisches "Unknown mqtt update" im Log. Beide Nachrichtentypen werden jetzt korrekt verarbeitet.
- **Backend:** Interne API-Fehler wurden in manchen Fällen bisher verschluckt, ohne die eigentliche Ursache zu loggen, was bestimmte Verbindungsprobleme schwer diagnostizierbar machte; die echte Exception wird jetzt geloggt und durchgereicht.

## [0.9.1]

### English 🇺🇸

#### Fixed

- **Backend:** fixed a crash where the ACE Pro Box's `feed_status` field being absent from the cloud API response (observed after a printer firmware update) caused a `KeyError`, which the coordinator then misreported as an authentication failure ("Coordinator authentication failed with unknown Error. Check credentials 'feed_status'") even though the login itself was working fine. `feed_status` is now read defensively and simply treated as "unknown" if the API omits it, instead of crashing.
- **Backend:** fixed the coordinator's initial-connection setup incorrectly classifying *any* unexpected error as an authentication failure, which could send users into a pointless reauthentication flow even when their credentials were completely valid. Unexpected setup errors now raise a generic setup error instead, matching how unexpected errors are already handled elsewhere in the integration (e.g. during regular data updates).

### Deutsch 🇩🇪

#### Behoben

- **Backend:** Absturz behoben, bei dem ein nach einem Drucker-Firmware-Update fehlendes `feed_status`-Feld der ACE-Pro-Box in der Cloud-API-Antwort einen `KeyError` auslöste, den der Coordinator fälschlich als Authentifizierungsfehler gemeldet hat ("Coordinator authentication failed with unknown Error. Check credentials 'feed_status'") – obwohl der Login selbst einwandfrei funktionierte. `feed_status` wird jetzt defensiv gelesen und bei Fehlen einfach als "unbekannt" behandelt, statt abzustürzen.
- **Backend:** behoben, dass der Coordinator beim initialen Verbindungsaufbau *jeden* unerwarteten Fehler als Authentifizierungsfehler eingestuft hat, was Nutzer unnötig in einen Reauth-Dialog schicken konnte, obwohl die Zugangsdaten völlig in Ordnung waren. Unerwartete Setup-Fehler lösen jetzt stattdessen einen generischen Setup-Fehler aus, passend zu der Art, wie unerwartete Fehler an anderer Stelle in der Integration (z. B. bei regulären Datenaktualisierungen) bereits behandelt werden.

## [0.9.0]

### English 🇺🇸

#### Fixed

- **Entity ID resolution rewritten to use `translation_key` instead of guessed IDs (root-cause fix for ACE Pro Box issues).** The integration has been restructured multiple times (splitting one device into three), and Home Assistant locks in an entity's ID the first time it's created — even after the owning device is renamed, the old entity ID sticks. As a result, some ACE Pro Box entities have no device prefix in their entity ID at all (e.g. `sensor.ace_spools`, `sensor.ace_current_temperature`) while others do, and entity IDs are derived from the *localized* display name rather than the English translation text (so on a German system the real ID is `button.ace_trocknung_stoppen`, not something like `stop_drying`). The panel/card previously tried to reconstruct entity IDs by concatenating a device name with a guessed suffix, which broke under these conditions. All entity lookups now match on `translation_key` first — the one identifier that is stable across renames and languages — and fall back to the old suffix-matching only as a legacy safety net. Just as importantly, every *write* action (button presses, `number.set_value`, `switch.toggle`) now uses the actual matched entity's real `entity_id` for the service call, instead of a guessed/concatenated one.
- **Panel/Card:** fixed a CSS bug where the inline drying view on the ACE Pro card behaved like a full-screen modal, because it inherited fixed-position styles from a shared base modal stylesheet.
- **Panel/Card:** fixed a z-index stacking issue where the "ACE Settings" and "Edit Spool" modals, if both open at once, could render in the wrong visual order.
- **Panel/Card:** fixed the dropdown and color-picker components getting permanently "stuck" on the first-selected value when the same component instance was reused for a different spool slot, because they only synced their value once on first render instead of on every update.
- **Panel/Card:** fixed saving a spool's material failing on the very first click for placeholder slots that start with an empty material type, by falling back to `PLA`.
- **Backend:** fixed a crash (`AttributeError: coordinator has no attribute 'get_manual_drying_input'`) when pressing the Custom Drying button, caused by a missing coordinator method for reading/writing manual drying input values.
- **Backend:** fixed `services.yaml` containing invalid content (a stray copy of Python source instead of YAML), which broke Home Assistant's config parser on every startup. Service descriptions already live in `strings.json`, so the file is now intentionally left as an empty `{}`.
- **Backend:** fixed authentication instability where a single failed `get_user_info()` call immediately discarded the access token and triggered a full re-login with no tolerance for transient errors — this could cascade into hitting Anycubic's server-side rate limiting. The token-validity check now waits briefly and retries once before treating a token as expired, and the login retry count/interval were increased for extra headroom.

### Deutsch 🇩🇪

#### Behoben

- **Entity-ID-Auflösung komplett auf `translation_key` umgestellt statt geratener IDs (Grundursachen-Fix für ACE-Pro-Box-Probleme).** Die Integration wurde mehrfach umstrukturiert (Aufteilung eines Geräts in drei), und Home Assistant sperrt die Entity-ID eines Entities beim Erstanlegen dauerhaft in der Registry – selbst nach Umbenennung des zugehörigen Geräts bleibt die alte Entity-ID bestehen. Dadurch haben manche ACE-Pro-Box-Entities gar kein Geräte-Präfix in der Entity-ID (z. B. `sensor.ace_spools`, `sensor.ace_current_temperature`), andere schon – und Entity-IDs entstehen aus dem *lokalisierten* Anzeigenamen, nicht aus dem englischen Übersetzungstext (auf einem deutschen System lautet die echte ID also z. B. `button.ace_trocknung_stoppen`, nicht etwa `stop_drying`). Das Panel/die Karte hat bisher versucht, Entity-IDs durch Aneinanderhängen von Gerätename und geratenem Suffix zu rekonstruieren – das ist unter diesen Bedingungen fehlgeschlagen. Alle Entity-Suchen matchen jetzt zuerst über `translation_key` – den einzigen Bezeichner, der über Umbenennungen und Sprachen hinweg stabil bleibt – und fallen nur noch als Legacy-Absicherung auf das alte Suffix-Matching zurück. Ebenso wichtig: Jede *schreibende* Aktion (Button-Druck, `number.set_value`, `switch.toggle`) nutzt jetzt die echte `entity_id` des gefundenen Entities für den Service-Aufruf, statt einer geratenen/zusammengesetzten.
- **Panel/Karte:** CSS-Bug behoben, bei dem die eingebettete Trocknungs-Ansicht auf der ACE-Pro-Karte sich wie ein Vollbild-Modal verhalten hat, weil sie feste Positionierungs-Styles von einem gemeinsamen Basis-Modal-Stylesheet geerbt hat.
- **Panel/Karte:** z-index-Stacking-Problem behoben, bei dem "ACE-Einstellungen"- und "Slot bearbeiten"-Modal bei gleichzeitigem Öffnen in der falschen visuellen Reihenfolge lagen.
- **Panel/Karte:** Dropdown- und Farbwähler-Komponenten blieben dauerhaft auf dem ersten gewählten Wert "eingefroren", wenn dieselbe Komponenten-Instanz für einen anderen Spulen-Slot wiederverwendet wurde, weil der Wert nur einmal beim ersten Rendern synchronisiert wurde statt bei jeder Aktualisierung – behoben.
- **Panel/Karte:** Speichern des Materials einer Spule scheiterte beim ersten Klick bei Platzhalter-Slots mit leerem Materialtyp – jetzt Fallback auf `PLA`.
- **Backend:** Absturz (`AttributeError: coordinator has no attribute 'get_manual_drying_input'`) beim Drücken des Custom-Drying-Buttons behoben, verursacht durch eine fehlende Coordinator-Methode zum Lesen/Schreiben der manuellen Trocknungs-Eingabewerte.
- **Backend:** `services.yaml` enthielt ungültigen Inhalt (versehentlich kompletter Python-Quellcode statt YAML), was den Config-Parser von Home Assistant bei jedem Start zum Absturz brachte. Die Service-Beschreibungen stehen bereits in `strings.json`, daher bleibt die Datei jetzt bewusst als leeres `{}` bestehen.
- **Backend:** Authentifizierungs-Instabilität behoben – ein einzelner fehlgeschlagener `get_user_info()`-Aufruf hat bisher sofort das Token verworfen und einen kompletten Neu-Login ausgelöst, ganz ohne Fehlertoleranz. Das konnte kaskadierend Anycubics serverseitiges Rate-Limiting auslösen. Die Token-Gültigkeitsprüfung wartet jetzt kurz und versucht es einmal erneut, bevor ein Token als abgelaufen gilt; Login-Retry-Anzahl und -Intervall wurden zusätzlich erhöht.

## [0.7.0]

### Fixed

- **Backend:** ACE Pro device IDs were never mapped in the internal printer lookup table, so any service call issued with an ACE device ID (e.g. setting a spool color) silently failed. Both the primary and secondary ACE box are now mapped correctly.
- **Panel/Card:** the "Cancel Print" button pressed a non-existent entity (`cancel_print` instead of `stop_print`) and had no effect.
- **Panel/Card:** the "Stop Drying" button had the same problem (`drying_stop` instead of `stop_drying`).
- **Panel/Card:** Speed Mode and Fan Speed were fully supported by the stats display component but were never added to the default monitored-stats list, so they never appeared on the printer card.
- **Panel/Card:** the sidebar panel and the "Anycubic Printer Card" dashboard card always rendered the printer layout for every device, including the ACE Pro box and the Cloud Bridge connection device - both showed empty/"Unavailable" fields and an irrelevant "Print Settings" menu.

### Added

- **Device-aware panel/card:** the sidebar panel and dashboard card now detect the selected device's type (printer / ACE Pro box) and render a dedicated layout for each, instead of one generic printer view.
  - Printer card: added a light on/off toggle (auto-detected, no manual entity configuration needed), Retract/Extrude Filament buttons, a "Clear Completed Job" button, and a firmware-update badge.
  - ACE Pro card: a dedicated view with spool/color info, live drying status (current/target temperature, remaining time), all 5 drying presets, and a new free-form "Custom Drying" section (settable temperature + duration).
  - Related devices (e.g. an ACE box's parent printer) are shown as clickable chips at the bottom of each card.
- **Drying presets:** preset 5 was defined in the backend but never shown in the panel - added.
- **Custom drying:** the backend already exposed temperature/duration number entities and a start button for custom drying cycles; the panel now has a UI for it.
- The file/print tabs at the top of the panel now only appear when a printer device is selected.
- Small device-type label (Printer / ACE Pro Box) shown under each entry on the printer-selection screen.

### Changed

- The Cloud Bridge ("connection") device is no longer offered as a selectable device in the sidebar panel or dashboard-card picker, since it has no printer-relevant state to show. Its two entities (MQTT connection switch, reconnect button) remain fully available as normal Home Assistant entities under Settings → Devices & Services.

## [0.6.0] - Previous release

- Baseline used as the starting point for this changelog. See git history for details prior to this file's introduction.
