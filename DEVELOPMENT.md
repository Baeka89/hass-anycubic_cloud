# Frontend

Currently building using Node.js 24 and Python 3.14 (Home Assistant 2026.9.x)

Open a terminal inside the `custom_components/anycubic_cloud/frontend_panel` directory.

Run:
```bash
npm ci
```

Build both the panel and the card using the command:
```bash
npm run build && npm run build_card
```

To build just the panel:
```bash
npm run build
```

To build just the card:
```bash
npm run build_card
```


# Translations

## Component

Edit source translation files in `custom_components/anycubic_cloud/translations/input_translation_files/`

Build output json files with:

```bash
python custom_components/anycubic_cloud/scripts/build_translations.py
```

All service strings are built from the `common` section.

## Frontend

Edit source translation files in `custom_components/anycubic_cloud/frontend_panel/localize/languages`

Add new languages to `custom_components/anycubic_cloud/frontend_panel/localize/localize.ts` following the below edits, using German as an example:


```ts
import * as en from './languages/en.json';
import * as de from './languages/de.json';
````

```ts
var languages: any = {
  en: en,
  de: de,
};
````

Rebuild the frontend.

## Offline regression tests

With Python 3.14 and the dependencies in the root `requirements.txt`, run from the repository root:

```bash
python -m unittest discover -s tests -v
node tests/frontend_helpers.cjs
```

Build both frontend bundles before running the browser suites. Install Playwright and its Chromium browser in a separate test environment, then point `ANYCUBIC_PLAYWRIGHT` at that environment's Playwright module:

```bash
node tests/browser_regressions.cjs
node tests/browser_second_audit.cjs
node tests/browser_third_audit.cjs
node tests/browser_fourth_audit.cjs
node tests/browser_deep_audit.cjs
```

These tests simulate API/MQTT failures and Home Assistant registries locally. They do not connect to Anycubic Cloud or send commands to physical printers.

For an additional browser-independent check of the actual TypeScript print callbacks, run `node tests/frontend_print_target.cjs`. This supplements the browser suites; it does not verify rendering.

The seventh-audit regressions are included in unittest discovery (`tests/test_seventh_audit_regressions.py`); they use synthetic credentials and simulate repeated cancellation and bounded cleanup, including exception-handler checks.
