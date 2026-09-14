# Changelog

All notable changes to this project are documented in this file.

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
