# Changelog

All notable changes to this project are documented in this file.

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
