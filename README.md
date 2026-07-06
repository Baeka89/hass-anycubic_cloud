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

Dieser Fork ist optimiert für aktuelle Home Assistant Versionen (2026.x).

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
* **Steuerung:** Start/Pause/Fortsetzen/Abbrechen von Drucken.
* **ACE Pro Management:** Steuerung der Trocknung, Filament-Spulen und Farben.
* **Dateimanager:** Integriertes Panel zur Dateiverwaltung auf dem Drucker.

### Unterstützung
Wenn dir diese Integration hilft, freue ich mich über eine kleine Unterstützung für die Weiterentwicklung:
👉 **[Spende via PayPal](https://paypal.me/misomazo)**

---

<a name="english"></a>
## English 🇺🇸

### About this Project
This custom integration connects **Anycubic 3D Printers** to Home Assistant using the Anycubic Cloud API. It provides real-time telemetry and control even as local MQTT access becomes more restricted.

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
- **Printer Sensors:** Temperature (Nozzle/Bed), fan speed, print speed, etc.
- **Job Sensors:** Progress, remaining time, file name, and image previews.
- **Controls:** Start, Pause, Resume, and Cancel print jobs.
- **ACE Pro Features:** Drying management, spool colors, and settings.
- **Sidebar Panel:** Integrated file manager and printer dashboard.

### Support
If you find this integration useful, please consider supporting its development:
👉 **[Donate via PayPal](https://paypal.me/misomazo)**

---

## How to Install / Installation

1. **Add Repository:** Add this URL to **HACS** as a "Custom Repository" (Category: Integration).
2. **Install:** Search for "Anycubic Cloud" in HACS and install it.
3. **Restart:** Restart Home Assistant.
4. **Setup:** Go to Settings > Devices & Services > Add Integration > **Anycubic Cloud**.

### Authentication Methods

#### 1. Web Authentication (Recommended)
1. Log in to [Anycubic Cloud Web](https://cloud-universe.anycubic.com/file).
2. Open Browser Dev Tools (F12) -> Console.
3. Type `window.localStorage["XX-Token"]` and copy the result.

#### 2. Slicer Next (currently broken)
1. Open `%AppData%\AnycubicSlicerNext\AnycubicSlicerNext.conf` (Windows) or `~/Library/Application Support/AnycubicSlicerNext/AnycubicSlicerNext.conf` (macOS).
2. Copy the long `access_token` string.
3. Paste it into the Home Assistant config flow.

---

### Technical Components / Technische Komponenten
* `manifest.json`: Metadata, 2026 compatibility, and dependencies.
* `sensor.py`: Core logic for creating and updating entities.
* `api.py`: Communication with Anycubic's Cloud Universe.
* `panel.js`: Frontend logic for the sidebar file manager.

### Thanks / Danke
Special thanks to **@WaresWichall** for the original cloud integration and **@dangreco** for the initial foundation. This fork is maintained by **@Baeka89** to ensure compatibility with modern Home Assistant versions.