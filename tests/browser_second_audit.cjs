const assert = require("node:assert/strict"),
  path = require("node:path");
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
      const add = (tag, props) => {
        const e = document.createElement(tag);
        Object.assign(e, props);
        document.querySelector("main").append(e);
        return e;
      };
      const tick = async (e) => {
        await e.updateComplete;
        await e.updateComplete;
      };
      const card = add("anycubic-card", {
        hass: h,
        config: { printer_id: "late" },
      });
      await tick(card);
      const panel = add("anycubic-cloud-panel", {
        hass: h,
        route: { path: "/late/main", prefix: "/anycubic_cloud" },
        panel: { config: {} },
      });
      await tick(panel);
      const d = {
        id: "late",
        name: "Printer",
        manufacturer: "Anycubic",
        model: "Kobra 3",
        connections: [],
        serial_number: "7",
        primary_config_entry: "offline",
      };
      const hh = { ...h, devices: { late: d } };
      card.hass = hh;
      panel.hass = hh;
      await tick(card);
      await tick(panel);
      const main = add("anycubic-view-main", {
        hass: h,
        language: "de",
        selectedPrinterID: "late",
        selectedPrinterDevice: d,
        panel: { config: {} },
        route: { path: "/late/main" },
      });
      await tick(main);
      main.hass = {
        ...hh,
        entities: {
          "sensor.job": {
            entity_id: "sensor.job",
            device_id: "late",
            translation_key: "job_state",
          },
        },
        states: { "sensor.job": { state: "printing", attributes: {} } },
      };
      await tick(main);
      const image = "image.preview";
      const ents = {
        [image]: {
          entity_id: image,
          translation_key: "job_image_url",
          device_id: "late",
        },
      };
      const anim = add("anycubic-printercard-animated_printer", {
        hass: {
          ...hh,
          entities: ents,
          states: {
            [image]: {
              state: "2026-10-07",
              entity_id: image,
              attributes: { access_token: "offline" },
            },
          },
        },
        printerEntities: ents,
        language: "de",
        printerConfig: {},
      });
      await tick(anim);
      const timer = add("anycubic-printercard-stat-time", {
        timeEntity: { state: "60", attributes: {} },
        timeType: "duration",
        isSeconds: true,
        direction: 0,
      });
      await tick(timer);
      const aceid = "sensor.ace";
      const ah = {
        ...hh,
        entities: {
          [aceid]: {
            entity_id: aceid,
            device_id: "late",
            translation_key: "ace_spools",
          },
        },
        states: {
          [aceid]: { state: "loaded", attributes: { spool_info: [] } },
        },
      };
      const conf = add("anycubic-printercard-configure", {
        hass: ah,
        language: "de",
        printers: hh.devices,
        cardConfig: { printer_id: "late", monitoredStats: [] },
      });
      await tick(conf);
      const bid = "button.dry";
      const dh = {
        ...hh,
        entities: {
          [bid]: { entity_id: bid, translation_key: "drying_start_preset_1" },
        },
        states: {
          [bid]: {
            state: "unknown",
            attributes: { temperature: 45, duration: 4 },
          },
        },
      };
      const dry = add("anycubic-printercard-multicolorbox_modal_drying", {
        hass: dh,
        language: "de",
        printerEntities: dh.entities,
        box_id: 0,
      });
      await tick(dry);
      const before = dry._hasDryingPreset1;
      dry.box_id = 1;
      await tick(dry);
      return {
        Z17: { spools_state: "loaded", hasColorbox: conf.hasColorbox },
        Z18: {
          before,
          after: dry._hasDryingPreset1,
          new_key: dry._dryingPresetId1,
        },
        Z11: {
          card_device: card.selectedPrinterDevice?.id ?? null,
          panel_device: panel.selectedPrinterDevice?.id ?? null,
          panel_printer_count: Object.keys(panel.printers ?? {}).length,
        },
        Z12: { imagePreviewUrl: anim.imagePreviewUrl ?? null },
        main_tag_registered: !!customElements.get("anycubic-view-main"),
        main_registry_count: Object.keys(main.printerEntities ?? {}).length,
        Z13: { seconds_input: 60, currentTime: timer.currentTime },
      };
    });
    console.log(JSON.stringify(result, null, 2));
    assert.deepEqual(result.Z11, {
      card_device: "late",
      panel_device: "late",
      panel_printer_count: 1,
    });
    assert.equal(
      result.Z12.imagePreviewUrl.endsWith(
        "/api/image_proxy/image.preview?token=offline&v=2026-10-07",
      ),
      true,
    );
    assert.equal(result.main_registry_count, 1);
    assert.equal(result.Z13.currentTime, 60);
    assert.equal(result.Z17.hasColorbox, true);
    assert.equal(result.Z18.before, true);
    assert.equal(result.Z18.after, false);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
