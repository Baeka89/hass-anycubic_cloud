# Anycubic Cloud Integration for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![Maintainer](https://img.shields.io/badge/Maintainer-Baeka89-blue.svg)](https://github.com/Baeka89)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/misomazo)

[Deutsch](#deutsch) | [English](#english)

---

<a name="deutsch"></a>

## Deutsch 🇩🇪

### Über dieses Projekt

Diese Custom Integration ermöglicht die Anbindung von **Anycubic 3D-Druckern** an Home Assistant. Da Anycubic den lokalen MQTT-Zugriff zunehmend einschränkt, nutzt diese Integration die Cloud-Schnittstelle, um Statuswerte, Temperaturen und Druckfortschritte bereitzustellen.

Dieser Fork ist optimiert für aktuelle Home Assistant Versionen (2026.x, mindestens **2026.5.0**) und passt sich automatisch an deine Systemsprache an (Deutsch & Englisch vollständig übersetzt - Entities, Einrichtungs- und Options-Dialoge).

### Unterstützte Modelle

Die Integration funktioniert erfolgreich mit:

* **Kobra 3 Combo**
* **Kobra S1**
* **Kobra 2**
* **Kobra 2 Pro**
* **Kobra 2 Max**
* **Photon Mono M5s** (Basis-Support)
* **M7 Pro** (Basis-Support)

### Features

* **Sensoren:** Temperaturen (Düse/Bett), Lüfter, Druckgeschwindigkeit, Firmware-Status.
* **Job-Überwachung:** Fortschritt (%), Restlaufzeit, Dateiname und Vorschaubilder.
* **Steuerung:** Start/Pause/Fortsetzen/Abbrechen von Drucken, Zieltemperaturen, Lüfter- und Geschwindigkeitsmodus, Filament Rückzug/Vorschub, Druckauftrag abschließen.
* **Drucken ohne erneuten Upload:** Service, um eine bereits in der Cloud gespeicherte Datei direkt zu drucken.
* **Drucker-Licht (experimentell):** Ein-/Ausschalten des Kamera-/Boxlichts, sofern der Drucker das meldet - wird von der Panel-Karte jetzt automatisch erkannt.
* **ACE Pro Management:** Steuerung der Trocknung (5 konfigurierbare Presets + freie Custom-Trocknung mit eigener Temperatur/Dauer), Filament-Spulen und Farben, primäre & sekundäre ACE-Einheit, Restfüllstand-Nachfüllung.
* **Eigene Geräte pro Baugruppe:** Drucker, ACE Pro Box(en) und Cloud-Bridge (Anbindung) werden als **drei getrennte Home-Assistant-Geräte** registriert, statt alles auf ein Gerät zu bündeln.
* **Dateimanager:** Integriertes, optional abschaltbares Panel zur Dateiverwaltung auf dem Drucker.
* **Erneute Authentifizierung:** Läuft ein Token ab, kann er direkt über Home Assistant erneuert werden - ohne die Integration neu einzurichten (siehe unten).

### Seitenleisten-Panel: eigene Karte pro Gerät 🆕

Das Panel und die Dashboard-Karte ("Anycubic Printer Card") erkennen jetzt automatisch, welche Art von Gerät gerade ausgewählt ist, und zeigen die passende Ansicht:

* **Drucker** - die gewohnte Karte mit Temperaturen, Jobfortschritt, Geschwindigkeits-/Lüftermodus, plus neu: Licht-Toggle, Filament Rückzug/Vorschub, "Druckauftrag abschließen" und ein Firmware-Update-Hinweis.
* **ACE Pro Box** - eine eigene Karte mit Spulen/Farben, Trocknungsstatus (aktuelle/Soll-Temperatur, Restzeit), allen 5 Trocknungs-Presets sowie einer neuen Custom-Trocknung (frei wählbare Temperatur + Dauer).
* **Cloud-Bridge (Anbindung)** - eine schlanke Karte nur mit dem, was es dafür tatsächlich gibt: MQTT-Verbindungs-Schalter und Reconnect-Button.

Jede Karte zeigt außerdem kleine Verknüpfungs-Chips zu zusammengehörigen Geräten (z. B. von der ACE-Box direkt zurück zum Drucker), und die Datei-/Druck-Tabs oben im Panel erscheinen nur noch, wenn tatsächlich ein Drucker ausgewählt ist.

### Unterstützung

Wenn dir diese Integration hilft, freue ich mich über eine kleine Unterstützung für die Weiterentwicklung:

👉 **[Spende via PayPal](https://paypal.me/misomazo)**

---

<a name="english"></a>

## English 🇺🇸

### About this Project

This custom integration connects **Anycubic 3D Printers** to Home Assistant using the Anycubic Cloud API. It provides real-time telemetry and control even as local MQTT access becomes more restricted.

This fork requires Home Assistant **2026.5.0** or newer and automatically adapts to your system language (German & English are fully translated - entities, setup, and options dialogs).

### Supported Models

Confirmed working with:

* **Kobra 3 Combo**
* **Kobra S1**
* **Kobra 2**
* **Kobra 2 Pro**
* **Kobra 2 Max**
* **Photon Mono M5s** (Basic support)
* **M7 Pro** (Basic support)

### Features

* **Printer Sensors:** Temperature (Nozzle/Bed), fan speed, print speed, firmware status.
* **Job Sensors:** Progress, remaining time, file name, and image previews.
* **Controls:** Start, Pause, Resume, Cancel print jobs, target temperatures, fan and speed mode, filament retract/extrude, clear completed job.
* **Print without re-uploading:** service to print a file that's already stored in your cloud storage.
* **Printer Light (experimental):** turn the camera/box light on or off, if your printer reports support for it - now auto-detected by the panel card.
* **ACE Pro Features:** Drying management (5 configurable presets plus a free-form custom drying option), spool colors, primary & secondary ACE unit support, runout refill.
* **Dedicated devices:** the printer, ACE Pro box(es), and the Cloud Bridge (connection) are registered as **three separate Home Assistant devices** instead of one combined device.
* **Sidebar Panel:** Integrated, optionally hideable file manager and printer dashboard.
* **Re-authentication:** If your token expires, renew it directly from Home Assistant - no need to remove and re-add the integration (see below).

### Sidebar Panel: a dedicated card per device 🆕

The panel and the dashboard card ("Anycubic Printer Card") now detect which kind of device is selected and render the matching view instead of one generic card:

* **Printer** - the familiar card with temperatures, job progress, speed/fan mode, plus new: a light toggle, filament retract/extrude, "clear completed job", and a firmware-update badge.
* **ACE Pro box** - its own card with spool/color info, drying status (current/target temperature, remaining time), all 5 drying presets, and a new custom-drying option (freely settable temperature + duration).
* **Cloud Bridge (connection)** - a minimal card with only what actually exists for it: an MQTT connection switch and a reconnect button.

Each card also shows small chips linking to related devices (e.g. from the ACE box straight back to its printer), and the file/print tabs at the top of the panel only appear when a printer is actually selected.

### Support

If you find this integration useful, please consider supporting its development:

👉 **[Donate via PayPal](https://paypal.me/misomazo)**

---

## How to Install / Installation

1. **Add Repository:** Add this URL to **HACS** as a "Custom Repository" (Category: Integration).
2. **Install:** Search for "Anycubic Cloud" in HACS and install it.
3. **Restart:** Restart Home Assistant.
4. **Setup:** Go to Settings > Devices & Services > Add Integration > **Anycubic Cloud**.

---

## Authentication Methods / Authentifizierungsmethoden

The setup wizard asks you to pick one of three methods. All three end up validated against the Anycubic Cloud API and, if successful, continue to printer selection.

### 1. Web Authentication (Recommended / Empfohlen)

1. Log in to [Anycubic Cloud Web](https://cloud-universe.anycubic.com/file).
2. Open Browser Dev Tools (F12) → Console.
3. Type `window.localStorage["XX-Token"]` and copy the result (without the surrounding quotes).
4. Paste it into the **"Web Interface Token"** step of the config flow.

> ⚠️ **Known limitation:** Anycubic currently blocks MQTT (real-time push updates) for web tokens on the server side. Web-authenticated entries still work, but printer data refreshes via Cloud polling (roughly every 60 seconds) instead of instantly.

### 2. Anycubic Slicer Next

Since Slicer Next 1.4.1.2, the token is no longer stored as plain text in `AnycubicSlicerNext.conf`. Instead, extract it from the debug log:

1. Log in to Anycubic Slicer Next once, then close it.
2. **Windows (PowerShell):** find the newest `debug_*.log` under `%AppData%\AnycubicSlicerNext\log\`, then copy the value after the **last** `accessToken = ` entry in that file. One-liner that copies it straight to your clipboard:

   ```powershell
   $log = Get-ChildItem "$env:AppData\AnycubicSlicerNext\log" -Filter "debug_*.log" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
   $token = Select-String -Path $log.FullName -Pattern 'accessToken = ([^,\s]+)' | Select-Object -Last 1
   $token.Matches.Groups[1].Value | Set-Clipboard
   ```

3. **macOS / older Windows versions (pre-1.4.1.2):** the token can still be read directly as plain text from `AnycubicSlicerNext.conf`:
   - macOS: `~/Library/Application Support/AnycubicSlicerNext/AnycubicSlicerNext.conf`
   - Windows: `%AppData%\AnycubicSlicerNext\AnycubicSlicerNext.conf`

   Copy the `access_token` value directly.
4. Paste the token into the **"Anycubic Slicer Next Token"** step of the config flow. The token is now a JWT (three dot-separated parts) - this is normal.
5. Home Assistant exchanges this value against Anycubic's servers for a session token automatically; you don't need to do anything else.

### 3. Android App Credentials

1. Retrieve your account's `access_token` and `device_id` from the Anycubic Android app (e.g. via a rooted device / traffic inspection tool - not covered here).
2. Paste both values into the **"Android App Credentials"** step of the config flow (`Slicer Access Token` field takes the `access_token`, plus a separate `Device ID` field).

---

## Re-Authenticating / Erneut authentifizieren

If your token expires or is replaced (e.g. you logged out elsewhere, or Slicer Next issued a new one), Home Assistant will mark the integration as needing attention instead of silently failing:

1. **Settings → Devices & Services** → the Anycubic Cloud card will show a **"Re-authenticate"** button.
2. Click it, confirm, then repeat whichever authentication method (Web / Slicer Next / Android) you used originally, with your **new** token.
3. Your printers, MQTT mode, drying presets, and panel configuration are all kept - only the credentials are updated.

*(Deutsch: Läuft dein Token ab, zeigt Home Assistant unter Einstellungen → Geräte & Dienste einen "Erneut authentifizieren"-Button. Einfach anklicken und den neuen Token nach der gleichen Methode wie beim Ersteinrichten eingeben - Drucker, MQTT-Modus, Trocknungs-Presets und Panel-Konfiguration bleiben dabei erhalten.)*

---

## Configuration Options / Konfigurationsoptionen

After setup, click **"Configure"** on the integration to open the options flow. It walks through three pages, all saved together at the end:

1. **MQTT connection mode / MQTT-Verbindungsmodus** - controls when the integration opens a live MQTT connection to the printer (versus relying on Cloud polling only):

   | Option (German label shown in UI) | Behaviour |
   |---|---|
   | Nur beim Drucken verbinden | Connect only while a print job is active |
   | Beim Drucken & Trocknen verbinden | Connect while printing *or* drying (ACE) |
   | Verbinden wenn Drucker Online | Connect whenever the printer is online |
   | Immer verbunden bleiben | Always stay connected |
   | Niemals über MQTT verbinden | Never use MQTT, Cloud polling only |

   Plus up to **5 drying presets** (duration in hours + target temperature in °C each), used by the "Start custom drying" button/number entities. Full descriptions and what each value does are shown directly in this step of the UI.

2. **Card / Panel configuration**:
   - A toggle to show/hide the sidebar panel link entirely - turn it off if you don't use it.
   - An optional YAML object to customize the sidebar panel card's layout (units, which stats to show, linking an existing light/outlet/camera entity to the card, custom ACE slot colors, etc.). Leaving it empty is fine - defaults apply. The options-flow step itself lists every available key, its default, and several copy-paste examples.
   - *Tip:* for a dashboard card (not the sidebar panel), add "Anycubic Printer Card" via the normal **Edit Dashboard → Add Card** picker instead - that gives you a full visual settings editor rather than hand-written YAML.

3. **Debug logging** - toggle verbose logging of API calls and/or MQTT messages, useful when reporting an issue.

---

## Services

Besides the entities above, these are available under **Developer Tools → Actions** (search for "Anycubic Cloud"):

* **`print_existing_cloud_file`** - start printing a file that's already stored in your Anycubic cloud storage (look up its `gcode_id` in the `file_list_cloud` sensor's `file_info` attribute) without uploading it again. Optional `slot_number` list for ACE color mapping.
* **`print_and_upload_save_in_cloud`** / **`print_and_upload_no_cloud_save`** - upload a new `.gcode` file and start printing it, with or without keeping a copy in your cloud storage.
* **`multi_color_box_set_slot_<material>`** (one per material: `pla`, `petg`, `abs`, `pacf`, `pc`, `asa`, `hips`, `pa`, `pla_se`) - assign a material + RGB color to a specific ACE slot (1-4) on the primary or secondary ACE unit (`box_id` 0/1).
* **`multi_color_box_filament_extrude`** / **`multi_color_box_filament_retract`** - manually feed or retract filament on the ACE unit.
* **`delete_file_local`** / **`delete_file_udisk`** / **`delete_file_cloud`** - remove a file from the printer's local storage, USB stick, or your cloud storage.

---

### Technical Components / Technische Komponenten

* `manifest.json`: Metadata, 2026.x compatibility (`min_ha_version`), and dependencies.
* `config_flow.py`: Setup, re-authentication, and options flow.
* `coordinator.py`: Central polling/update logic, MQTT connection management, and device registration (printer / ACE Pro box(es) / Cloud Bridge as separate devices, linked via `via_device`).
* `sensor.py` / `binary_sensor.py` / `number.py` / `select.py` / `button.py` / `switch.py` / `image.py` / `update.py` / `light.py`: Entity platforms.
* `anycubic_cloud_api/`: Standalone Anycubic Cloud API client (REST + MQTT).
* `panel.py` + `frontend_panel/`: Sidebar file manager and printer dashboard panel, with dedicated card layouts for the printer, ACE Pro box, and Cloud Bridge devices.

See [CHANGELOG.md](CHANGELOG.md) for release notes.

### Thanks / Danke

Special thanks to **@WaresWichall** for the original cloud integration and **@dangreco** for the initial foundation. This fork is maintained by **@Baeka89** to ensure compatibility with modern Home Assistant versions.
