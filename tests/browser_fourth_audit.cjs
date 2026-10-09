const path = require("node:path"), assert = require("node:assert/strict");
const { chromium } = require(process.env.ANYCUBIC_PLAYWRIGHT || "playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.setContent("<main></main>");
    await page.addScriptTag({ path: path.resolve(__dirname, "../custom_components/anycubic_cloud/frontend_panel/dist/anycubic-card.js") });
    const result = await page.evaluate(async () => {
      const callbacks = new Map(); let nextId = 0;
      const realSetInterval = window.setInterval, realClearInterval = window.clearInterval;
      window.setInterval = fn => { callbacks.set(++nextId, fn); return nextId; };
      window.clearInterval = id => callbacks.delete(id);
      const entities = {}, states = {};
      const put = (key, value) => {
        const id = `${key === "job_is_paused" || key === "job_in_progress" ? "binary_sensor" : "sensor"}.offline_${key}`;
        entities[id] = { entity_id: id, translation_key: key, device_id: "printer" };
        states[id] = { entity_id: id, state: value, attributes: { unit_of_measurement: "min" } };
      };
      for (const [key, value] of Object.entries({ job_time_elapsed: "10", job_time_remaining: "20", job_state: "paused", job_is_paused: "on", job_in_progress: "on" })) put(key, value);
      const hass = () => ({ language: "en", config: { time_zone: "UTC" }, entities, states: { ...states }, localize: k => k });
      const component = document.createElement("anycubic-printercard-stats-component");
      Object.assign(component, { hass: hass(), language: "en", printerEntities: entities, printerEntityIdPart: "offline", monitoredStats: ["Status", "Elapsed", "Remaining"], round: false });
      document.querySelector("main").append(component);
      const settle = async () => {
        await component.updateComplete; await component.updateComplete;
        const timers = [...component.shadowRoot.querySelectorAll("anycubic-printercard-stat-time")];
        for (const timer of timers) await timer.updateComplete;
        return timers;
      };
      const tick = async () => {
        for (const fn of [...callbacks.values()]) fn();
        const timers = await settle(); return timers.map(x => x.currentTime);
      };
      await settle();
      const paused = await tick();
      put("job_is_paused", "off"); put("job_state", "printing"); component.hass = hass(); await settle();
      const resumed = await tick();
      put("job_in_progress", "off"); put("job_state", "finished"); component.hass = hass(); await settle();
      const completedBefore = (await settle()).map(x => x.currentTime);
      const completed = await tick();
      put("job_in_progress", "unavailable"); component.hass = hass(); await settle();
      const unavailableBefore = (await settle()).map(x => x.currentTime);
      const unavailable = await tick();
      component.remove();
      const intervalsAfterRemoval = callbacks.size;
      window.setInterval = realSetInterval; window.clearInterval = realClearInterval;
      return { paused, resumed, completedBefore, completed, unavailableBefore, unavailable, intervalsAfterRemoval };
    });
    assert.deepEqual(result.paused, [600, 1200]);
    assert.deepEqual(result.resumed, [601, 1199]);
    assert.deepEqual(result.completed, result.completedBefore);
    assert.deepEqual(result.unavailable, result.unavailableBefore);
    assert.equal(result.intervalsAfterRemoval, 0);
    assert.deepEqual(errors, []);
    console.log("Fourth audit browser: pause, resume, completion, unavailability and interval cleanup passed");
    console.log(JSON.stringify(result));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
