import { Duration as dfnsDuration } from "date-fns";

import { fireEvent } from "./fire_event";
import {
  ANYCUBIC_MODEL_ACE,
  ANYCUBIC_MODEL_BRIDGE,
  AnycubicCardConfig,
  AnycubicDeviceType,
  AnycubicLitNode,
  AnycubicMaterialType,
  AnycubicSpeedMode,
  AnycubicSpeedModeEntity,
  AnycubicSpeedModes,
  CalculatedTimeType,
  HassDevice,
  HassDeviceList,
  HassEmptyEntity,
  HassEntity,
  HassEntityInfo,
  HassEntityInfos,
  HassRoute,
  HomeAssistant,
  PrinterCardStatType,
  TemperatureUnit,
} from "./types";

const stylePxKeys = ["width", "height", "left", "top"];

export function updateElementStyleWithObject(
  el: HTMLElement | undefined,
  updateObj: any, // eslint-disable-line
): void {
  Object.keys(updateObj as object).forEach((key) => {
    // eslint-disable-next-line
    if (stylePxKeys.includes(key) && !isNaN(updateObj[key])) {
      // eslint-disable-next-line
      updateObj[key] = (updateObj[key].toString()) + "px";
    }
  });
  if (el) {
    Object.assign(el.style, updateObj);
  }
}

export function createEmptyEntity(entityParams: HassEmptyEntity): HassEntity {
  return {
    state: entityParams.state,
    attributes: entityParams.attributes,
    entity_id: "invalid_domain.invalid_entity",
    last_changed: "",
    last_updated: "",
    context: {
      id: "",
      parent_id: null,
      user_id: null,
    },
  };
}

export function numberFromString(str: string): number {
  const matches = str.match(/\d+/);
  return Number(matches ? matches[0] : -1);
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function buildImageUrlFromEntity(entityState: HassEntity): string {
  const token: string = entityState.attributes.access_token as string;
  return `${window.location.origin}/api/image_proxy/${entityState.entity_id}?token=${token}&v=${encodeURIComponent(entityState.state)}`;
}

export function buildCameraUrlFromEntity(entityState: HassEntity): string {
  const token: string = entityState.attributes.access_token as string;
  return `${window.location.origin}/api/camera_proxy_stream/${entityState.entity_id}?token=${token}`;
}

export function prettyFilename(str: string): string {
  const splitI = str.indexOf("-0.");
  const splitName =
    splitI > 0 ? [str.slice(0, splitI), str.slice(splitI + 1)] : [str];
  const chunksFirst = splitName[0].match(/.{1,10}/g);
  const joinFirst = chunksFirst ? chunksFirst.join("\n") : splitName[0];
  return splitName.length > 1
    ? joinFirst + "-" + splitName.slice(1)[0]
    : joinFirst;
}

export function getEntityState(
  hass: HomeAssistant,
  entityInfo: HassEntityInfo | undefined,
): HassEntity | undefined {
  return entityInfo ? hass.states[entityInfo.entity_id] : undefined;
}

export function getEntityStateFloat(
  hass: HomeAssistant,
  entityInfo: HassEntityInfo | undefined,
): number {
  const entityState = getEntityState(hass, entityInfo);
  const stateFloat = entityState ? parseFloat(entityState.state) : 0;
  return !isNaN(stateFloat) ? stateFloat : 0;
}

export function getEntityStateString(
  hass: HomeAssistant,
  entityInfo: HassEntityInfo | undefined,
): string {
  const entityState = getEntityState(hass, entityInfo);
  return entityState ? entityState.state : "";
}

export function getEntityStateBinary(
  hass: HomeAssistant,
  entityInfo: HassEntityInfo | undefined,
  onValue: string | boolean,
  offValue: string | boolean,
): string | boolean {
  const entityState = getEntityStateString(hass, entityInfo);
  return entityState === "on" ? onValue : offValue;
}

export function getAnycubicDeviceType(
  device: HassDevice | undefined,
): AnycubicDeviceType {
  if (device && device.model === ANYCUBIC_MODEL_BRIDGE) {
    return AnycubicDeviceType.BRIDGE;
  }
  if (device && device.model === ANYCUBIC_MODEL_ACE) {
    return AnycubicDeviceType.ACE;
  }
  return AnycubicDeviceType.PRINTER;
}

// Gibt, ausgehend vom aktuell gewählten Gerät, die damit verknüpften Geräte
// zurück: für den Drucker seine ACE-Box(en), für eine ACE-Box den zugehörigen
// Drucker, für die Cloud-Bridge alle daran hängenden Drucker.
export function getLinkedDevices(
  devices: HassDeviceList | undefined,
  device: HassDevice | undefined,
): HassDevice[] {
  if (!devices || !device) {
    return [];
  }
  const deviceType = getAnycubicDeviceType(device);
  if (deviceType === AnycubicDeviceType.ACE) {
    const parent = device.via_device_id
      ? devices[device.via_device_id]
      : undefined;
    return parent ? [parent] : [];
  }
  return Object.values(devices).filter(
    (dev) => dev.via_device_id === device.id,
  );
}

export function getPrinterDevices(hass: HomeAssistant): HassDeviceList {
  const printers: HassDeviceList = {};
  for (const key in hass.devices) {
    const dev = hass.devices[key];

    if (dev.manufacturer === "Anycubic") {
      printers[dev.id] = dev;
    }
  }
  return printers;
}

export function getPrinterEntities(
  hass: HomeAssistant,
  deviceID: string | undefined,
): HassEntityInfos {
  const entities: HassEntityInfos = {};
  if (deviceID) {
    for (const key in hass.entities) {
      const ent = hass.entities[key];

      if (ent.device_id === deviceID) {
        entities[ent.entity_id] = ent;
      }
    }
  }
  return entities;
}

export function getAceBoxId(entities: HassEntityInfos): number {
  return Object.values(entities).some((entity) =>
    entity.translation_key?.startsWith("secondary_"),
  )
    ? 1
    : 0;
}

const entityKeyAliases: Record<string, string> = {
  nozzle_temperature: "curr_nozzle_temp",
  hotbed_temperature: "curr_hotbed_temp",
  target_nozzle_temperature: "target_nozzle_temp",
  target_hotbed_temperature: "target_hotbed_temp",
  fan_speed: "fan_speed_pct",
  printer_firmware: "fw_version",
  ace_firmware: "multi_color_box_fw_version",
  ace_run_out_refill: "multi_color_box_runout_refill",
  drying_active: "dry_status_is_drying",
  drying_remaining_time: "dry_status_remaining_time",
  drying_total_duration: "dry_status_total_duration",
  refresh_mqtt_connection: "manual_mqtt_connection_refresh",
  pause_print: "print_pause",
  resume_print: "print_resume",
  stop_print: "print_stop",
};

export function getStrictMatchingEntity(
  entities: HassEntityInfos,
  _printerEntityIdPart: string | undefined,
  match_domain: string,
  match_suffix: string,
): HassEntityInfo | undefined {
  const canonical = entityKeyAliases[match_suffix] ?? match_suffix;
  const keys = [canonical, `secondary_${canonical}`];
  for (const requested of keys) {
    for (const ent of Object.values(entities)) {
      if (
        ent.entity_id.split(".")[0] === match_domain &&
        ent.translation_key === requested
      ) {
        return ent;
      }
    }
  }
  // Legacy suffixes only when no translation key is available.
  for (const requested of [canonical, match_suffix]) {
    for (const ent of Object.values(entities)) {
      if (
        !ent.translation_key &&
        ent.entity_id.split(".")[0] === match_domain &&
        ent.entity_id.split(".")[1].endsWith(`_${requested}`)
      ) {
        return ent;
      }
    }
  }
  return undefined;
}

export function getMatchingEntity(
  entities: HassEntityInfos,
  match_domain: string,
  match_suffix: string,
): HassEntityInfo | undefined {
  return getStrictMatchingEntity(
    entities,
    undefined,
    match_domain,
    match_suffix,
  );
}

export function getPrinterEntityId(
  entities: HassEntityInfos,
  domain: string,
  key: string,
): string | undefined {
  return getStrictMatchingEntity(entities, undefined, domain, key)?.entity_id;
}

// Leitet aus einer Menge von Entities das gemeinsame Geräte-ID-Präfix ab,
// indem nach einer bekannten "Anker"-Entity (domain + suffix) gesucht wird,
// die auf dem jeweiligen Gerätetyp garantiert vorhanden ist.
export function getEntityIdPartBySuffix(
  entities: HassEntityInfos,
  domain: string,
  suffix: string,
): string | undefined {
  for (const key in entities) {
    const splitID = key.split(".");
    const entityDomain: string = splitID[0];
    const entity_id: string = splitID[1];

    if (entityDomain === domain && entity_id.endsWith(suffix)) {
      return entity_id.split(suffix)[0];
    }
  }
  return undefined;
}

// ACE-Boxen haben keinen printer_online-Sensor mehr (der lebt jetzt auf dem
// Drucker-Gerät), daher über eine ACE-eigene Entity verankern.
// Robuster als das Raten einzelner Suffixe: alle Entities eines Geräts
// teilen sich denselben Geräte-Slug als Präfix (z.B.
// "anycubic_kobra_3_combo_ace_pro_1_"). Der längste gemeinsame Präfix über
// die lokalen Teile aller Entity-IDs hinweg liefert dieses Präfix, ganz
// unabhängig davon, wie die einzelnen Entity-Namen übersetzt/slugifiziert
// wurden.
export function getCommonEntityIdPart(
  entities: HassEntityInfos,
): string | undefined {
  const localParts: string[] = [];
  for (const key in entities) {
    const splitID = key.split(".");
    if (splitID.length === 2 && splitID[1]) {
      localParts.push(splitID[1]);
    }
  }
  if (localParts.length === 0) {
    return undefined;
  }
  let prefix = localParts[0];
  for (let i = 1; i < localParts.length; i++) {
    const part = localParts[i];
    while (prefix.length > 0 && !part.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
    if (prefix.length === 0) {
      return undefined;
    }
  }
  // Nur ein sinnvolles Präfix zurückgeben, wenn es tatsächlich an einer
  // Wortgrenze (Unterstrich) endet - sonst könnte es zufällig mitten in
  // einem Wort abgeschnitten sein.
  const lastUnderscore = prefix.lastIndexOf("_");
  if (lastUnderscore === -1) {
    return undefined;
  }
  return prefix.slice(0, lastUnderscore + 1);
}

export function getPrinterEntityIdPart(
  entities: HassEntityInfos,
): string | undefined {
  return (
    getCommonEntityIdPart(entities) ??
    getEntityIdPartBySuffix(entities, "binary_sensor", "printer_online")
  );
}

export function getAceEntityIdPart(
  entities: HassEntityInfos,
): string | undefined {
  return (
    getCommonEntityIdPart(entities) ??
    getEntityIdPartBySuffix(entities, "sensor", "ace_current_temperature") ??
    getEntityIdPartBySuffix(entities, "update", "ace_firmware") ??
    getEntityIdPartBySuffix(entities, "switch", "ace_run_out_refill")
  );
}

// Die Cloud-Bridge hat insgesamt nur 2 Entities in der ganzen Integration.
export function getBridgeEntityIdPart(
  entities: HassEntityInfos,
): string | undefined {
  return (
    getCommonEntityIdPart(entities) ??
    getEntityIdPartBySuffix(
      entities,
      "switch",
      "manual_mqtt_connection_enabled",
    ) ??
    getEntityIdPartBySuffix(entities, "button", "refresh_mqtt_connection")
  );
}

export function getPrinterSwitchStateObj(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
): HassEntity | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "switch",
    suffix,
  );
  const stateObj = getEntityState(hass, entInfo);
  return stateObj;
}

export function getPrinterSwitchState(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
  onValue: string | boolean = true,
  offValue: string | boolean = false,
): string | boolean | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "switch",
    suffix,
  );
  return entInfo
    ? getEntityStateBinary(hass, entInfo, onValue, offValue)
    : undefined;
}

export function getPrinterButtonStateObj(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
  defaultState: string | number = "unavailable",
  defaultAttributes: object = {},
): HassEntity {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "button",
    suffix,
  );
  const stateObj = getEntityState(hass, entInfo);
  return (
    stateObj ||
    createEmptyEntity({
      state: String(defaultState),
      attributes: defaultAttributes,
    })
  );
}

export function getPrinterDryingButtonStateObj(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
): HassEntity {
  return getPrinterButtonStateObj(
    hass,
    entities,
    printerEntityIdPart,
    suffix,
    "unavailable",
    { duration: 0, temperature: 0 },
  );
}

export function isPrinterButtonStateAvailable(stateObj: HassEntity): boolean {
  return !["unavailable"].includes(stateObj.state);
}

export function getPrinterImageStateUrl(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
): string | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "image",
    suffix,
  );
  const stateObj = getEntityState(hass, entInfo);
  return stateObj ? buildImageUrlFromEntity(stateObj) : undefined;
}

export function getPrinterSensorStateObj(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
  defaultState: string | number = "unavailable",
  defaultAttributes: object = {},
): HassEntity {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "sensor",
    suffix,
  );
  const stateObj = getEntityState(hass, entInfo);
  return (
    stateObj ||
    createEmptyEntity({
      state: String(defaultState),
      attributes: defaultAttributes,
    })
  );
}

export function getPrinterSensorStateString(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
  titleCase: boolean = false,
): string | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "sensor",
    suffix,
  );
  if (entInfo) {
    const str = getEntityStateString(hass, entInfo);
    if (titleCase) {
      return toTitleCase(str);
    } else {
      return str;
    }
  } else {
    return undefined;
  }
}

export function getPrinterSensorStateFloat(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
): number | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "sensor",
    suffix,
  );
  return entInfo ? getEntityStateFloat(hass, entInfo) : undefined;
}

export function getPrinterBinarySensorState(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
  onValue: string | boolean,
  offValue: string | boolean,
  undefValue?: string | boolean,
): string | boolean | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "binary_sensor",
    suffix,
  );
  return entInfo
    ? getEntityStateBinary(hass, entInfo, onValue, offValue)
    : undefValue;
}

export function getPrinterNumberStateObj(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
  defaultState: string | number = 0,
  defaultAttributes: object = {},
): HassEntity {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "number",
    suffix,
  );
  const stateObj = getEntityState(hass, entInfo);
  return (
    stateObj ||
    createEmptyEntity({
      state: String(defaultState),
      attributes: defaultAttributes,
    })
  );
}

export function getPrinterUpdateEntityState(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
  suffix: string,
): string | undefined {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "update",
    suffix,
  );
  if (entInfo) {
    return getEntityStateBinary(
      hass,
      entInfo,
      "Update Available",
      "Up To Date",
    ) as string;
  } else {
    return undefined;
  }
}

export function getPrinterSupportsMQTT(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
): boolean {
  const entInfo = getStrictMatchingEntity(
    entities,
    printerEntityIdPart,
    "binary_sensor",
    "mqtt_connection_active",
  );
  const stateObj = getEntityState(hass, entInfo);
  return stateObj ? !!stateObj.attributes.supports_mqtt_login : false;
}

export function isFDMPrinter(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
): boolean {
  return (
    getPrinterSensorStateObj(
      hass,
      entities,
      printerEntityIdPart,
      "current_status",
    ).attributes.material_type === "Filament"
  );
}

export function isLCDPrinter(
  hass: HomeAssistant,
  entities: HassEntityInfos,
  printerEntityIdPart: string | undefined,
): boolean {
  return (
    getPrinterSensorStateObj(
      hass,
      entities,
      printerEntityIdPart,
      "current_status",
    ).attributes.material_type === "Resin"
  );
}

export function getFileListLocalFilesEntity(
  entities: HassEntityInfos,
): HassEntityInfo | undefined {
  return getMatchingEntity(entities, "sensor", "file_list_local");
}

export function getFileListLocalRefreshEntity(
  entities: HassEntityInfos,
): HassEntityInfo | undefined {
  return getMatchingEntity(entities, "button", "request_file_list_local");
}

export function getFileListUdiskFilesEntity(
  entities: HassEntityInfos,
): HassEntityInfo | undefined {
  return getMatchingEntity(entities, "sensor", "file_list_udisk");
}

export function getFileListUdiskRefreshEntity(
  entities: HassEntityInfos,
): HassEntityInfo | undefined {
  return getMatchingEntity(entities, "button", "request_file_list_udisk");
}

export function getFileListCloudFilesEntity(
  entities: HassEntityInfos,
): HassEntityInfo | undefined {
  return getMatchingEntity(entities, "sensor", "file_list_cloud");
}

export function getFileListCloudRefreshEntity(
  entities: HassEntityInfos,
): HassEntityInfo | undefined {
  return getMatchingEntity(entities, "button", "request_file_list_cloud");
}

export function getPrinterDevID(route: HassRoute): string | undefined {
  const pathParts = route.path.split("/");
  return pathParts.length > 1 ? pathParts[1] : undefined;
}

export function getSelectedPrinter(
  deviceList: HassDeviceList | undefined,
  deviceID: string | undefined,
): HassDevice | undefined {
  return deviceList && deviceID ? deviceList[deviceID] : undefined;
}

export function getPrinterMAC(printer: HassDevice | undefined): string | null {
  return printer &&
    printer.connections.length > 0 &&
    printer.connections[0].length > 1
    ? printer.connections[0][1]
    : null;
}

export function getPrinterID(
  printer: HassDevice | undefined,
): string | undefined {
  return printer ? printer.serial_number : undefined;
}

export function getPage(route: HassRoute): string {
  const pathParts = route.path.split("/");
  return pathParts.length > 2 ? pathParts[2] : "main";
}

export function isPrintStatePrinting(printStateString: string): boolean {
  return [
    "printing",
    "preheating",
    "paused",
    "downloading",
    "checking",
  ].includes(printStateString);
}

export function printStateStatusColor(printStateString: string): string {
  if (printStateString === "preheating") {
    return "#ffc107";
  } else if (isPrintStatePrinting(printStateString)) {
    return "#4caf50";
  } else if (printStateString === "unknown") {
    return "#f44336";
  } else if (
    printStateString === "operational" ||
    printStateString === "finished"
  ) {
    return "#00bcd4";
  } else {
    return "#f44336";
  }
}

export const navigateToPrinter = (
  node: AnycubicLitNode,
  printerID: string,
  replace: boolean = false,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const prefix: string = node.route.prefix;
  const endpoint = printerID ? `${printerID}/main` : "";
  const url = `${prefix}/${endpoint}`;
  if (replace) {
    history.replaceState(null, "", url);
  } else {
    history.pushState(null, "", url);
  }
  fireEvent(window, "location-changed", {
    replace,
  });
};

export const navigateToPage = (
  node: AnycubicLitNode,
  path: string,
  replace: boolean = false,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const prefix: string = node.route.prefix;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const printerID = getPrinterDevID(node.route);
  const endpoint = printerID ? `${printerID}/${path}` : "";
  const url = `${prefix}/${endpoint}`;
  if (replace) {
    history.replaceState(null, "", url);
  } else {
    history.pushState(null, "", url);
  }
  fireEvent(window, "location-changed", {
    replace,
  });
};

export function milliSecondsToDuration(milliSeconds: number): dfnsDuration {
  const totalSeconds = Math.max(0, Math.floor(milliSeconds / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function secondsToDuration(seconds: number): dfnsDuration {
  return milliSecondsToDuration(seconds * 1e3);
}

export const formatDuration = (
  time: number | string | undefined,
  round: boolean,
): string => {
  if (time !== 0 && (!time || isNaN(time as number))) {
    return "invalid duration";
  }
  const dur: dfnsDuration = secondsToDuration(
    round ? Math.ceil(Number(time) / 60) * 60 : Number(time),
  );

  const days: string = dur.days && dur.days > 0 ? `${dur.days}d` : "";
  const hours: string = dur.hours && dur.hours > 0 ? `${dur.hours}h` : "";
  const minutes: string =
    dur.minutes && dur.minutes > 0 ? `${dur.minutes}m` : "";
  const seconds: string =
    dur.seconds && dur.seconds > 0 ? `${dur.seconds}s` : round ? "" : "0s";

  return `${days}${hours}${minutes}${seconds}`;
};

export const formatFutureTime = (
  futureSeconds: number | string | undefined,
  round: boolean,
  use_24hr: boolean,
  timeZone?: string,
): string => {
  if (
    futureSeconds !== 0 &&
    (!futureSeconds || isNaN(futureSeconds as number))
  ) {
    return "invalid time";
  }
  const newDate = new Date(Date.now() + Number(futureSeconds) * 1000);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...(round ? {} : { second: "2-digit" }),
    hourCycle: use_24hr ? "h23" : "h12",
  }).format(newDate);
};

export const calculateTimeStat = (
  time: number | string | undefined,
  timeType: CalculatedTimeType,
  round: boolean = false,
  use_24hr: boolean = false,
  timeZone?: string,
): string => {
  switch (timeType) {
    case CalculatedTimeType.Remaining:
      return formatDuration(time, round);
    case CalculatedTimeType.ETA:
      return formatFutureTime(time, round, use_24hr, timeZone);
    case CalculatedTimeType.Elapsed:
      return formatDuration(time, round);
    default:
      return "<unknown>";
  }
};

export function getEntityTotalSeconds(
  timeEntity: HassEntity,
  isSeconds: boolean = false,
): number {
  let result: number;
  if (timeEntity.state) {
    if (timeEntity.state.includes(", ")) {
      const [days_string, time_string] = timeEntity.state.split(", ");
      const [hours, minutes, seconds] = time_string.split(":");
      const day_match = days_string.match(/\d+/);
      const days = day_match ? day_match[0] : 0;
      result =
        +days * 60 * 60 * 24 + +hours * 60 * 60 + +minutes * 60 + +seconds;
    } else if (timeEntity.state.includes(":")) {
      const [hours, minutes, seconds] = timeEntity.state.split(":");
      result = +hours * 60 * 60 + +minutes * 60 + +seconds;
    } else if (isSeconds) {
      const seconds = timeEntity.state;
      result = +seconds;
    } else {
      const minutes = timeEntity.state;
      result = +minutes * 60;
    }
  } else {
    result = 0;
  }
  return result;
}

export const temperatureUnitFromEntity = (
  entity: HassEntity,
): TemperatureUnit => {
  switch (entity.attributes.unit_of_measurement) {
    case "°C":
      return TemperatureUnit.C;
    case "°F":
      return TemperatureUnit.F;
    default:
      return TemperatureUnit.C;
  }
};

const temperatureMap = {
  [TemperatureUnit.C]: {
    [TemperatureUnit.C]: (t: number): number => t,
    [TemperatureUnit.F]: (t: number): number => (t * 9.0) / 5.0 + 32.0,
  },
  [TemperatureUnit.F]: {
    [TemperatureUnit.C]: (t: number): number => ((t - 32.0) * 5.0) / 9.0,
    [TemperatureUnit.F]: (t: number): number => t,
  },
};

export const convertTemperature = (
  temperature: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
): number => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!temperatureMap[from] || !temperatureMap[from][to]) {
    return -1;
  }

  return temperatureMap[from][to](temperature);
};

export const getEntityTemperature = (
  temperatureEntity: HassEntity,
  temperatureUnit: TemperatureUnit | undefined,
  round: boolean = false,
): string => {
  const t: number = parseFloat(temperatureEntity.state);
  if (Number.isNaN(t)) {
    return "—";
  }
  const u: TemperatureUnit = temperatureUnitFromEntity(temperatureEntity);
  const tc: number = convertTemperature(t, u, temperatureUnit || u);

  return `${round ? Math.round(tc) : tc.toFixed(2)}°${temperatureUnit || u}`;
};

export function getDefaultMonitoredStats(): PrinterCardStatType[] {
  return [
    PrinterCardStatType.Status,
    PrinterCardStatType.ETA,
    PrinterCardStatType.Elapsed,
    PrinterCardStatType.Remaining,
  ];
}

export function getDefaultFDMMonitoredStats(): PrinterCardStatType[] {
  return [
    ...getDefaultMonitoredStats(),
    PrinterCardStatType.HotendCurrent,
    PrinterCardStatType.BedCurrent,
    PrinterCardStatType.HotendTarget,
    PrinterCardStatType.BedTarget,
    PrinterCardStatType.SpeedMode,
    PrinterCardStatType.FanSpeed,
  ];
}

export function getPanelBasicMonitoredStats(): PrinterCardStatType[] {
  return [
    ...getDefaultMonitoredStats(),
    PrinterCardStatType.PrinterOnline,
    PrinterCardStatType.Availability,
    PrinterCardStatType.ProjectName,
    PrinterCardStatType.CurrentLayer,
  ];
}

export function getPanelFDMMonitoredStats(): PrinterCardStatType[] {
  return [
    ...getDefaultFDMMonitoredStats(),
    PrinterCardStatType.PrinterOnline,
    PrinterCardStatType.Availability,
    PrinterCardStatType.ProjectName,
    PrinterCardStatType.CurrentLayer,
  ];
}

export function getPanelACEMonitoredStats(): PrinterCardStatType[] {
  return [
    ...getPanelFDMMonitoredStats(),
    PrinterCardStatType.DryingStatus,
    PrinterCardStatType.DryingTime,
  ];
}

export function getDefaultCardConfig(): AnycubicCardConfig {
  return {
    vertical: false,
    round: false,
    use_24hr: true,
    temperatureUnit: TemperatureUnit.C,
    monitoredStats: getDefaultMonitoredStats(),
    scaleFactor: 1,
    slotColors: [],
    showSettingsButton: false,
    alwaysShow: false,
  };
}

// eslint-disable-next-line
export function undefinedDefault(value: any, defaultValue: any): any {
  return typeof value === "undefined" ? defaultValue : value;
}

export function speedModesFromStateObj(
  speedModeState: AnycubicSpeedModeEntity,
): AnycubicSpeedModes {
  const speedModeAttr: AnycubicSpeedMode[] =
    speedModeState.attributes.available_modes ?? [];
  return speedModeAttr.reduce(
    (modes, mode) => ({ ...modes, [mode.mode]: mode.description }),
    {},
  );
}

export function materialTypeFromString(
  material_type?: string,
): AnycubicMaterialType | undefined {
  return Object.values(AnycubicMaterialType).find(
    (materialType) => materialType === material_type,
  );
}
