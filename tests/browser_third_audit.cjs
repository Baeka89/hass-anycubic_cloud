const path = require("node:path"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.ANYCUBIC_PLAYWRIGHT || "playwright");
const root = path.resolve(
  __dirname,
  "../custom_components/anycubic_cloud/frontend_panel",
);
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setContent("<main></main>");
    await page.addScriptTag({ path: path.join(root, "dist/anycubic-card.js") });
    await page.addScriptTag({
      path: path.join(root, "dist/anycubic-cloud-panel.js"),
    });
    const result = await page.evaluate(async () => {
      const h = {
        language: "de",
        config: { time_zone: "UTC" },
        entities: {},
        states: {},
        devices: {},
        services: {},
        callService: async () => {},
        localize: (k) => k,
      };
      const add = (tag, p) => {
        const e = document.createElement(tag);
        Object.assign(e, p);
        document.querySelector("main").append(e);
        return e;
      };
      const tick = async (e) => {
        await e.updateComplete;
        await e.updateComplete;
      };
      const eid = "image.preview",
        ents = {
          [eid]: {
            entity_id: eid,
            translation_key: "job_image_url",
            device_id: "printer",
          },
        };
      const state = (time) => ({
        state: time,
        entity_id: eid,
        attributes: { access_token: "offline" },
      });
      const anim = add("anycubic-printercard-animated_printer", {
        hass: {
          ...h,
          entities: ents,
          states: { [eid]: state("2026-10-08T01:00:00Z") },
        },
        printerEntities: ents,
        language: "de",
        printerConfig: {},
      });
      await tick(anim);
      const first = anim.imagePreviewBgUrl;
      anim.hass = {
        ...anim.hass,
        states: { [eid]: state("2026-10-08T02:00:00Z") },
      };
      await tick(anim);
      const card = add("anycubic-card", { hass: h });
      card.setConfig({ type: "custom:anycubic-card" });
      await tick(card);
      const modal = add("anycubic-printercard-multicolorbox_modal_spool", {
        hass: h,
        language: "de",
        slotColors: card.config.slotColors,
        selectedPrinterDevice: {
          id: "printer",
          primary_config_entry: "offline",
        },
      });
      await tick(modal);
      modal._handleModalEvent({
        stopPropagation() {},
        detail: {
          modalOpen: true,
          box_id: 0,
          spool_index: 0,
          material_type: "PLA",
          color: [255, 0, 0],
        },
      });
      await tick(modal);
      const presets = modal.shadowRoot.querySelectorAll(
        ".ac-mcb-preset-color",
      ).length;
      const debug = add("anycubic-view-debug", {
        hass: h,
        language: "de",
        selectedPrinterID: "printer",
        panel: { config: {} },
        route: { path: "/printer/debug" },
      });
      await tick(debug);
      debug.hass = {
        ...h,
        entities: {
          "sensor.late": {
            entity_id: "sensor.late",
            device_id: "printer",
            translation_key: "job_state",
          },
        },
        states: { "sensor.late": { state: "printing", attributes: {} } },
      };
      await tick(debug);
      return {
        D04_frontend: {
          first_background: first,
          new_background: anim.imagePreviewBgUrl,
          same: first === anim.imagePreviewBgUrl,
        },
        excluded_color_presets: {
          slotColors: card.config.slotColors,
          preset_count: presets,
        },
        D08: {
          hass_entities: Object.keys(debug.hass.entities).length,
          debug_entities: Object.keys(debug.printerEntities).length,
        },
      };
    });
    assert.equal(result.D04_frontend.same, false);
    assert.equal(result.excluded_color_presets.preset_count, 12);
    assert.deepEqual(result.D08, { hass_entities: 1, debug_entities: 1 });
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ ...result, pageErrors: errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
