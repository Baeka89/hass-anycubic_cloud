# Changelog

All notable changes to this project are documented in this file.

## [0.7.0] - Unreleased

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
