import {
  mdiCog,
  mdiLightbulbOff,
  mdiLightbulbOn,
  mdiPower,
  mdiRefresh,
} from "@mdi/js";
import { CSSResult, LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { query } from "lit/decorators/query.js";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import { styleMap } from "lit/directives/style-map.js";
import { animate, Options as motionOptions } from "@lit-labs/motion";

import { localize } from "../../../../localize/localize";

import { customElementIfUndef } from "../../../internal/register-custom-element";

import { fireEvent } from "../../../fire_event";

import {
  AnycubicDeviceType,
  DomClickEvent,
  EvtTargPrinterDevId,
  HassDevice,
  HassDeviceList,
  HassEntity,
  HassEntityInfos,
  HassRoute,
  HomeAssistant,
  LitTemplateResult,
  PrinterCardStatType,
  TemperatureUnit,
} from "../../../types";

import {
  getAceEntityIdPart,
  getAnycubicDeviceType,
  getBridgeEntityIdPart,
  getDefaultMonitoredStats,
  getEntityState,
  getEntityStateBinary,
  getLinkedDevices,
  getPrinterBinarySensorState,
  getPrinterButtonStateObj,
  getPrinterEntities,
  getPrinterEntityId,
  getPrinterEntityIdPart,
  getPrinterSensorStateObj,
  getPrinterSwitchStateObj,
  getPrinterUpdateEntityState,
  getStrictMatchingEntity,
  isPrintStatePrinting,
  printStateStatusColor,
  undefinedDefault,
} from "../../../helpers";

import "../camera_view/camera_view.ts";
import "../multicolorbox_view/multicolorbox_view.ts";
import "../printer_view/printer_view.ts";
import "../stats/stats_component.ts";
import "../multicolorbox_view/multicolorbox_modal_drying.ts";
import "../multicolorbox_view/multicolorbox_modal_spool.ts";
import "../multicolorbox_view/multicolorbox_modal_settings.ts";
import "../printsettings/printsettings_modal.ts";
import "../../ui/toggle-switch.ts";

const animOptionsCard: motionOptions = {
  keyframeOptions: {
    duration: 250,
    direction: "normal",
    easing: "ease-in-out",
  },
  properties: ["height", "opacity", "scale"],
};

const defaultMonitoredStats: PrinterCardStatType[] = getDefaultMonitoredStats();

const aceCardMonitoredStats: PrinterCardStatType[] = [
  PrinterCardStatType.DryingStatus,
  PrinterCardStatType.AceTempCurrent,
  PrinterCardStatType.AceTempTarget,
  PrinterCardStatType.DryingTime,
];

@customElementIfUndef("anycubic-printercard-card")
export class AnycubicPrintercardCard extends LitElement {
  @query(".ac-printer-card")
  private _printerCardContainer!: HTMLElement | Window;

  @property()
  public hass!: HomeAssistant;

  @property()
  public language!: string;

  @property({ attribute: "monitored-stats" })
  public monitoredStats?: PrinterCardStatType[] = defaultMonitoredStats;

  @property({ attribute: "selected-printer-id" })
  public selectedPrinterID: string | undefined;

  @property({ attribute: "selected-printer-device" })
  public selectedPrinterDevice: HassDevice | undefined;

  // Alle Anycubic-Geräte (Drucker/ACE/Bridge), damit die Karte verwandte
  // Geräte finden und dorthin verlinken kann. Optional: die eigenständige
  // Lovelace-Dashboard-Karte übergibt das ebenfalls, das Panel sowieso.
  @property()
  public printers?: HassDeviceList;

  // Nur im Panel-Kontext gesetzt (nicht bei der Lovelace-Dashboard-Karte).
  // Wird ausschließlich für die "Zu verknüpftem Gerät wechseln"-Navigation
  // gebraucht.
  @property()
  public route?: HassRoute;

  @property({ type: Boolean })
  public round?: boolean = true;

  @property({ type: Boolean })
  public use_24hr?: boolean;

  @property({ attribute: "show-settings-button", type: Boolean })
  public showSettingsButton?: boolean;

  @property({ attribute: "always-show", type: Boolean })
  public alwaysShow?: boolean;

  @property({ attribute: "temperature-unit", type: String })
  public temperatureUnit: TemperatureUnit = TemperatureUnit.C;

  @property({ attribute: "light-entity-id", type: String })
  public lightEntityId?: string;

  @property({ attribute: "power-entity-id", type: String })
  public powerEntityId?: string;

  @property({ attribute: "camera-entity-id", type: String })
  public cameraEntityId?: string;

  @property({ type: Boolean })
  public vertical?: boolean;

  @property({ attribute: "scale-factor" })
  public scaleFactor?: number;

  @property({ attribute: "slot-colors" })
  public slotColors?: string[];

  @state()
  private _showVideo: boolean = false;

  @state()
  private cameraEntityState: HassEntity | undefined = undefined;

  @state()
  private isHidden: boolean = false;

  @state()
  private isPrinting: boolean = false;

  @state()
  private hiddenOverride: boolean = false;

  @state()
  private lightIsOn: boolean = false;

  @state()
  private statusColor: string = "#ffc107";

  @state()
  private printerEntities: HassEntityInfos;

  @state()
  private printerEntityIdPart: string | undefined;

  @state()
  private progressPercent: number = 0;

  @state()
  private _buttonPrintSettings: string;

  @state()
  private _togglingLight: boolean = false;

  @state()
  private _togglingPower: boolean = false;

  // --- Geraete-Typ-Erkennung (Drucker / ACE Pro / Cloud-Bridge) ---

  @state()
  private deviceType: AnycubicDeviceType = AnycubicDeviceType.PRINTER;

  @state()
  private linkedDevices: HassDevice[] = [];

  @state()
  private _effectiveLightEntityId: string | undefined;

  @state()
  private _fwUpdateAvailable: boolean = false;

  // --- Cloud-Bridge-spezifischer State ---

  @state()
  private _bridgeMqttState: HassEntity | undefined;

  @state()
  private _bridgeRefreshState: HassEntity | undefined;

  @state()
  private _togglingBridgeMqtt: boolean = false;

  @state()
  private _refreshingBridge: boolean = false;

  @state()
  private _labelBridgeMqtt: string;

  @state()
  private _labelBridgeRefresh: string;

  @state()
  private _labelGoToPrinter: string;

  @state()
  private _labelGoToAce: string;

  @state()
  private _labelUpdateAvailable: string;

  @state()
  private _buttonAceSettings: string;

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has("language")) {
      this._buttonPrintSettings = localize(
        "card.buttons.print_settings",
        this.language,
      );
      this._labelBridgeMqtt = localize(
        "card.bridge.mqtt_connection",
        this.language,
      );
      this._labelBridgeRefresh = localize(
        "card.bridge.refresh_connection",
        this.language,
      );
      this._labelGoToPrinter = localize(
        "card.linked_devices.go_to_printer",
        this.language,
      );
      this._labelGoToAce = localize(
        "card.linked_devices.go_to_ace",
        this.language,
      );
      this._labelUpdateAvailable = localize(
        "card.badges.update_available",
        this.language,
      );
      this._buttonAceSettings = localize(
        "card.buttons.ace_settings",
        this.language,
      );
    }

    if (changedProperties.has("monitoredStats")) {
      this.monitoredStats = undefinedDefault(
        this.monitoredStats,
        defaultMonitoredStats,
      ) as PrinterCardStatType[];
    }

    if (
      changedProperties.has("selectedPrinterDevice") ||
      changedProperties.has("selectedPrinterID")
    ) {
      this.deviceType = getAnycubicDeviceType(this.selectedPrinterDevice);
    }

    if (
      changedProperties.has("selectedPrinterID") ||
      changedProperties.has("selectedPrinterDevice")
    ) {
      this.printerEntities = getPrinterEntities(
        this.hass,
        this.selectedPrinterID,
      );

      if (this.deviceType === AnycubicDeviceType.ACE) {
        this.printerEntityIdPart = getAceEntityIdPart(this.printerEntities);
      } else if (this.deviceType === AnycubicDeviceType.BRIDGE) {
        this.printerEntityIdPart = getBridgeEntityIdPart(this.printerEntities);
      } else {
        this.printerEntityIdPart = getPrinterEntityIdPart(this.printerEntities);
      }
    }

    if (
      changedProperties.has("printers") ||
      changedProperties.has("selectedPrinterDevice")
    ) {
      this.linkedDevices = getLinkedDevices(
        this.printers,
        this.selectedPrinterDevice,
      );
    }

    if (
      changedProperties.has("hass") ||
      changedProperties.has("alwaysShow") ||
      changedProperties.has("hiddenOverride") ||
      changedProperties.has("selectedPrinterID") ||
      changedProperties.has("selectedPrinterDevice")
    ) {
      if (this.deviceType === AnycubicDeviceType.BRIDGE) {
        this._willUpdateBridge();
      } else if (this.deviceType === AnycubicDeviceType.ACE) {
        this._willUpdateAce();
      } else {
        this._willUpdatePrinter();
      }
    }
  }

  private _willUpdatePrinter(): void {
    this.progressPercent = this._percentComplete();
    if (this.cameraEntityId) {
      this.cameraEntityState = getEntityState(this.hass, {
        entity_id: this.cameraEntityId,
      });
    }
    const autoLightEntityId = this.printerEntityIdPart
      ? getPrinterEntityId(this.printerEntityIdPart, "light", "printer_light")
      : undefined;
    const autoLightExists =
      !!autoLightEntityId &&
      !!getEntityState(this.hass, { entity_id: autoLightEntityId });
    this._effectiveLightEntityId =
      this.lightEntityId ?? (autoLightExists ? autoLightEntityId : undefined);
    this.lightIsOn = getEntityStateBinary(
      this.hass,
      { entity_id: this._effectiveLightEntityId ?? "" },
      true,
      false,
    ) as boolean;
    const printStateString = getPrinterSensorStateObj(
      this.hass,
      this.printerEntities,
      this.printerEntityIdPart,
      "job_state",
      "unknown",
    ).state.toLowerCase();
    this.isPrinting = isPrintStatePrinting(printStateString);
    // Standardmäßig Bild + Stats immer zeigen, nicht nur während des Drucks -
    // wer die alte platzsparende "nur beim Drucken einblenden"-Logik will,
    // kann das weiterhin per alwaysShow: false in der Panel-Konfiguration.
    const effectiveAlwaysShow = this.alwaysShow ?? true;
    this.isHidden = !effectiveAlwaysShow
      ? !this.hiddenOverride && !this.isPrinting
      : false;
    this.statusColor = printStateStatusColor(printStateString);
    this._fwUpdateAvailable =
      getPrinterUpdateEntityState(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        "printer_firmware",
      ) === "Update Available";
  }

  private _willUpdateAce(): void {
    this.isHidden = false;
    this._fwUpdateAvailable =
      getPrinterUpdateEntityState(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        "ace_firmware",
      ) === "Update Available";
    const isDrying = getPrinterBinarySensorState(
      this.hass,
      this.printerEntities,
      this.printerEntityIdPart,
      "drying_active",
      true,
      false,
      false,
    ) as boolean;
    this.statusColor = isDrying ? "#4caf50" : "#8a8a8a";
  }

  private _willUpdateBridge(): void {
    this.isHidden = false;
    this._bridgeMqttState = getPrinterSwitchStateObj(
      this.hass,
      this.printerEntities,
      this.printerEntityIdPart,
      "manual_mqtt_connection_enabled",
    );
    this._bridgeRefreshState = getPrinterButtonStateObj(
      this.hass,
      this.printerEntities,
      this.printerEntityIdPart,
      "manual_mqtt_connection_refresh",
    );
    this.statusColor =
      this._bridgeMqttState && this._bridgeMqttState.state === "on"
        ? "#4caf50"
        : "#8a8a8a";
  }

  render(): LitTemplateResult {
    switch (this.deviceType) {
      case AnycubicDeviceType.BRIDGE:
        return this._renderBridgeCard();
      case AnycubicDeviceType.ACE:
        return this._renderAceCard();
      default:
        return this._renderPrinterCard();
    }
  }

  private _renderPrinterCard(): LitTemplateResult {
    const classesCam = {
      "ac-hidden": !this._showVideo,
    };

    return html`
      <div class="ac-printer-card">
        <div class="ac-printer-card-mainview">
          ${this._renderHeader()} ${this._renderPrinterContainer()}
          ${this._renderLinkedDevicesRow()}
        </div>
        <anycubic-printercard-camera_view
          class=${classMap(classesCam)}
          .showVideo=${this._showVideo}
          .toggleVideo=${this._toggleVideo}
          .cameraEntity=${this.cameraEntityState}
        ></anycubic-printercard-camera_view>
        <anycubic-printercard-multicolorbox_modal_spool
          .hass=${this.hass}
          .language=${this.language}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .slotColors=${this.slotColors}
        ></anycubic-printercard-multicolorbox_modal_spool>
        <anycubic-printercard-printsettings_modal
          .hass=${this.hass}
          .language=${this.language}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .printerEntities=${this.printerEntities}
          .printerEntityIdPart=${this.printerEntityIdPart}
        ></anycubic-printercard-printsettings_modal>
      </div>
    `;
  }

  private _renderAceCard(): LitTemplateResult {
    const stylesDot = {
      "background-color": this.statusColor,
    };

    return html`
      <div class="ac-printer-card ac-simple-card">
        <div class="ac-printer-card-mainview">
          <div class="ac-printer-card-header ac-h-justifycenter">
            <div
              class="ac-printer-card-header-status-dot"
              style=${styleMap(stylesDot)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${this.selectedPrinterDevice?.name}
            </p>
            ${this._renderFwBadge()}
          </div>
          <div
            class="ac-printer-card-infocontainer"
            ${animate({ ...animOptionsCard })}
          >
            <div
              class="ac-printer-card-info-animcontainer ac-ace-visualcontainer"
            >
              <anycubic-printercard-multicolorbox_modal_drying
                .hass=${this.hass}
                .language=${this.language}
                .selectedPrinterDevice=${this.selectedPrinterDevice}
                .printerEntities=${this.printerEntities}
                .printerEntityIdPart=${this.printerEntityIdPart}
                .box_id=${0}
                .inline=${true}
              ></anycubic-printercard-multicolorbox_modal_drying>
            </div>
            <div class="ac-printer-card-info-statscontainer">
              <anycubic-printercard-stats-component
                .hass=${this.hass}
                .language=${this.language}
                .monitoredStats=${aceCardMonitoredStats}
                .printerEntities=${this.printerEntities}
                .printerEntityIdPart=${this.printerEntityIdPart}
                .showPercent=${false}
                .round=${this.round}
                .use_24hr=${this.use_24hr}
                .temperatureUnit=${this.temperatureUnit}
              ></anycubic-printercard-stats-component>
            </div>
          </div>
          <div class="ac-printer-card-infocontainer">
            <div class="ac-printer-card-settingssection">
              <button
                class="ac-printer-card-button-settings"
                @click=${this._openAceSettingsModal}
              >
                <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                ${this._buttonAceSettings}
              </button>
            </div>
          </div>
          ${this._renderLinkedDevicesRow()}
        </div>
        <anycubic-printercard-multicolorbox_modal_spool
          .hass=${this.hass}
          .language=${this.language}
          .selectedPrinterDevice=${this.selectedPrinterDevice}
          .slotColors=${this.slotColors}
        ></anycubic-printercard-multicolorbox_modal_spool>
        <anycubic-printercard-multicolorbox_modal_settings
          .hass=${this.hass}
          .language=${this.language}
          .printerEntities=${this.printerEntities}
          .printerEntityIdPart=${this.printerEntityIdPart}
          .box_id=${0}
        ></anycubic-printercard-multicolorbox_modal_settings>
      </div>
    `;
  }

  private _renderBridgeCard(): LitTemplateResult {
    const stylesDot = {
      "background-color": this.statusColor,
    };

    return html`
      <div class="ac-printer-card ac-simple-card">
        <div class="ac-printer-card-mainview">
          <div class="ac-printer-card-header ac-h-justifycenter">
            <div
              class="ac-printer-card-header-status-dot"
              style=${styleMap(stylesDot)}
            ></div>
            <p class="ac-printer-card-header-status-text">
              ${this.selectedPrinterDevice?.name}
            </p>
          </div>
          <div class="ac-bridge-card-body">
            <div class="ac-switch-row">
              <span class="ac-switch-row-label">${this._labelBridgeMqtt}</span>
              <anycubic-ui-toggle-switch
                .checked=${this._bridgeMqttState?.state === "on"}
                .disabled=${this._togglingBridgeMqtt ||
                !this._bridgeMqttState ||
                this._bridgeMqttState.state === "unavailable"}
                @ac-toggle-change=${this._toggleBridgeMqtt}
              ></anycubic-ui-toggle-switch>
            </div>
            <ha-control-button
              .disabled=${this._refreshingBridge ||
              !this._bridgeRefreshState ||
              this._bridgeRefreshState.state === "unavailable"}
              @click=${this._pressBridgeRefresh}
            >
              <ha-svg-icon .path=${mdiRefresh}></ha-svg-icon>
              ${this._labelBridgeRefresh}
            </ha-control-button>
          </div>
          ${this._renderLinkedDevicesRow()}
        </div>
      </div>
    `;
  }

  private _renderFwBadge(): LitTemplateResult {
    return this._fwUpdateAvailable
      ? html`<span class="ac-badge-update">${this._labelUpdateAvailable}</span>`
      : nothing;
  }

  private _renderLinkedDevicesRow(): LitTemplateResult {
    if (!this.linkedDevices.length) {
      return nothing;
    }
    const label =
      this.deviceType === AnycubicDeviceType.ACE
        ? this._labelGoToPrinter
        : this._labelGoToAce;
    return html`
      <div class="ac-linked-devices">
        ${map(
          this.linkedDevices,
          (dev) => html`
            <button
              class="ac-linked-chip"
              .disabled=${!this.route}
              .printer_id=${dev.id}
              title=${label}
              @click=${this._handleLinkedDeviceClick}
            >
              ${dev.name}
            </button>
          `,
        )}
      </div>
    `;
  }

  private _renderHeader(): LitTemplateResult {
    const classesHeader = {
      "ac-h-justifycenter": !(
        this.powerEntityId && this._effectiveLightEntityId
      ),
    };

    const stylesDot = {
      "background-color": this.statusColor,
    };

    return html`
      <div class="ac-printer-card-header ${classMap(classesHeader)}">
        ${this.powerEntityId
          ? html`
              <button
                class="ac-printer-card-button-small"
                .disabled=${this._togglingPower}
                @click=${this._togglePowerEntity}
              >
                <ha-svg-icon .path=${mdiPower}></ha-svg-icon>
              </button>
            `
          : nothing}

        <button
          class="ac-printer-card-button-name"
          @click=${this._toggleHiddenOveride}
        >
          <div
            class="ac-printer-card-header-status-dot"
            style=${styleMap(stylesDot)}
          ></div>
          <p class="ac-printer-card-header-status-text">
            ${this.selectedPrinterDevice?.name}
          </p>
          ${this._renderFwBadge()}
        </button>
        ${this._effectiveLightEntityId
          ? html`
              <button
                class="ac-printer-card-button-small"
                .disabled=${this._togglingLight}
                @click=${this._toggleLightEntity}
              >
                <ha-svg-icon
                  .path=${this.lightIsOn ? mdiLightbulbOn : mdiLightbulbOff}
                ></ha-svg-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }

  private _renderPrinterContainer(): LitTemplateResult {
    const classesMain = {
      "ac-card-vertical": !!this.vertical,
    };
    const stylesMain = {
      height: this.isHidden ? "1px" : "auto",
      opacity: this.isHidden ? 0.0 : 1.0,
      scale: this.isHidden ? 0.0 : 1.0,
    };
    const stylesScaledColLeft = {
      width: this.vertical
        ? "100%"
        : this.scaleFactor
          ? String(50 * this.scaleFactor) + "%"
          : "50%",
    };
    const stylesScaledColRight = {
      width: this.vertical
        ? "100%"
        : this.scaleFactor
          ? String(50 / this.scaleFactor) + "%"
          : "50%",
    };

    return html`
      <div
        class="ac-printer-card-infocontainer ${classMap(classesMain)}"
        style=${styleMap(stylesMain)}
        ${animate({ ...animOptionsCard })}
      >
        <div
          class="ac-printer-card-info-animcontainer ${classMap(classesMain)}"
          style=${styleMap(stylesScaledColLeft)}
        >
          <anycubic-printercard-printer_view
            .hass=${this.hass}
            .printerEntities=${this.printerEntities}
            .printerEntityIdPart=${this.printerEntityIdPart}
            .scaleFactor=${this.scaleFactor}
            .toggleVideo=${this._toggleVideo}
          ></anycubic-printercard-printer_view>
          ${this.vertical
            ? html`<p class="ac-printer-card-info-vertprog">
                ${this.round
                  ? Math.round(this.progressPercent)
                  : this.progressPercent}%
              </p>`
            : nothing}
        </div>
        <div
          class="ac-printer-card-info-statscontainer ${classMap(classesMain)}"
          style=${styleMap(stylesScaledColRight)}
        >
          <anycubic-printercard-stats-component
            .hass=${this.hass}
            .language=${this.language}
            .monitoredStats=${this.monitoredStats}
            .printerEntities=${this.printerEntities}
            .printerEntityIdPart=${this.printerEntityIdPart}
            .progressPercent=${this.progressPercent}
            .showPercent=${!this.vertical}
            .round=${this.round}
            .use_24hr=${this.use_24hr}
            .temperatureUnit=${this.temperatureUnit}
          ></anycubic-printercard-stats-component>
        </div>
      </div>
      ${this._renderPrintSettingsContainer()}
    `;
  }

  private _toggleVideo = (): void => {
    this._showVideo = !!(this.cameraEntityState && !this._showVideo);
  };

  private _renderPrintSettingsContainer(): LitTemplateResult {
    const classesMain = {
      "ac-card-vertical": !!this.vertical,
    };
    const stylesMain = {
      height: this.isHidden ? "1px" : "auto",
      opacity: this.isHidden ? 0.0 : 1.0,
      scale: this.isHidden ? 0.0 : 1.0,
    };

    return this.showSettingsButton || this.isPrinting
      ? html`
          <div
            class="ac-printer-card-infocontainer ${classMap(classesMain)}"
            style=${styleMap(stylesMain)}
            ${animate({ ...animOptionsCard })}
          >
            <div
              class="ac-printer-card-settingssection ${classMap(classesMain)}"
            >
              <button
                class="ac-printer-card-button-settings"
                @click=${this._openPrintSettingsModal}
              >
                <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                ${this._buttonPrintSettings}
              </button>
            </div>
          </div>
        `
      : nothing;
  }

  private _openPrintSettingsModal = (): void => {
    fireEvent(this._printerCardContainer, "ac-printset-modal", {
      modalOpen: true,
    });
  };

  private _openAceSettingsModal = (): void => {
    fireEvent(this._printerCardContainer, "ac-mcbsettings-modal", {
      modalOpen: true,
      box_id: 0,
    });
  };

  private _toggleLightEntity = (): void => {
    if (this._effectiveLightEntityId) {
      this._togglingLight = true;
      this.hass
        .callService("homeassistant", "toggle", {
          entity_id: this._effectiveLightEntityId,
        })
        .then(() => {
          this._togglingLight = false;
        })
        .catch((_e: unknown) => {
          this._togglingLight = false;
        });
    }
  };

  private _togglePowerEntity = (): void => {
    if (this.powerEntityId) {
      this._togglingPower = true;
      this.hass
        .callService("homeassistant", "toggle", {
          entity_id: this.powerEntityId,
        })
        .then(() => {
          this._togglingPower = false;
        })
        .catch((_e: unknown) => {
          this._togglingPower = false;
        });
    }
  };

  private _toggleHiddenOveride = (): void => {
    this.hiddenOverride = !this.hiddenOverride;
  };

  private _toggleBridgeMqtt = (): void => {
    const ent = getStrictMatchingEntity(
      this.printerEntities,
      this.printerEntityIdPart,
      "switch",
      "manual_mqtt_connection_enabled",
    );
    if (ent) {
      this._togglingBridgeMqtt = true;
      this.hass
        .callService("switch", "toggle", {
          entity_id: ent.entity_id,
        })
        .then(() => {
          this._togglingBridgeMqtt = false;
        })
        .catch((_e: unknown) => {
          this._togglingBridgeMqtt = false;
        });
    }
  };

  private _pressBridgeRefresh = (): void => {
    const ent = getStrictMatchingEntity(
      this.printerEntities,
      this.printerEntityIdPart,
      "button",
      "manual_mqtt_connection_refresh",
    );
    if (ent) {
      this._refreshingBridge = true;
      this.hass
        .callService("button", "press", {
          entity_id: ent.entity_id,
        })
        .then(() => {
          this._refreshingBridge = false;
        })
        .catch((_e: unknown) => {
          this._refreshingBridge = false;
        });
    }
  };

  private _handleLinkedDeviceClick = (
    ev: DomClickEvent<EvtTargPrinterDevId>,
  ): void => {
    if (!this.route) {
      return;
    }
    const deviceId: string = ev.currentTarget.printer_id;
    const prefix = this.route.prefix;
    history.pushState(null, "", `${prefix}/${deviceId}/main`);
    fireEvent(window, "location-changed", {
      replace: false,
    });
  };

  private _percentComplete(): number {
    return Number(
      getPrinterSensorStateObj(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        "job_progress",
        -1.0,
      ).state,
    );
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }

      .ac-printer-card {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        box-sizing: border-box;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        margin: 0px;
        box-shadow: var(
          --ha-card-box-shadow,
          0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12)
        );
      }

      .ac-simple-card {
        padding-bottom: 16px;
      }

      .ac-printer-card-mainview {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
      }

      .ac-printer-card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        justify-content: space-between;
      }

      .ac-h-justifycenter {
        justify-content: center;
      }

      .ac-printer-card-button-small {
        border: none;
        outline: none;
        background-color: transparent;
        width: 32px;
        height: 32px;
        font-size: 22px;
        line-height: 22px;
        box-sizing: border-box;
        padding: 0px;
        margin-right: 24px;
        margin-left: 24px;
        cursor: pointer;
        color: var(--primary-text-color);
      }

      .ac-printer-card-button-settings {
        border: none;
        border-radius: 6px;
        outline: none;
        background-color: transparent;
        font-size: 18px;
        box-sizing: border-box;
        padding: 4px 12px;
        margin-right: 24px;
        margin-left: 24px;
        cursor: pointer;
        color: var(--primary-text-color);
      }

      .ac-printer-card-button-settings:hover {
        background-color: #7f7f7f36;
      }

      .ac-printer-card-button-settings:active {
        background-color: #7f7f7f5e;
      }

      .ac-printer-card-button-name {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: none;
        outline: none;
        background-color: transparent;
        padding: 24px;
      }
      .ac-printer-card-header-status-dot {
        margin: 0px 10px;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .ac-printer-card-header-status-text {
        font-weight: bold;
        font-size: 22px;
        margin: 0px;
        color: var(--primary-text-color);
      }

      .ac-badge-update {
        margin-left: 12px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        color: white;
        background-color: #ff9800;
        border-radius: 10px;
        padding: 3px 8px;
      }

      .ac-printer-card-infocontainer {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }

      .ac-printer-card-infocontainer.ac-card-vertical {
        flex-direction: column;
      }

      .ac-printer-card-info-animcontainer {
        box-sizing: border-box;
        padding: 0px 8px 32px 8px;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .ac-printer-card-info-animcontainer.ac-card-vertical {
        width: 100%;
        height: auto;
        padding-left: 64px;
        padding-right: 64px;
      }

      anycubic-printercard-printer_view {
        width: 100%;
        flex-grow: 1;
      }

      .ac-printer-card-info-vertprog {
        width: 50%;
        font-size: 36px;
        text-align: center;
        font-weight: bold;
      }

      anycubic-printercard-printer_view.ac-card-vertical {
        width: auto;
      }

      .ac-printer-card-info-statscontainer {
        box-sizing: border-box;
        padding: 0px 16px 32px 8px;
        width: 50%;
        height: 100%;
      }

      .ac-printer-card-info-statscontainer.ac-card-vertical {
        padding-left: 32px;
        padding-right: 32px;
        width: 100%;
        height: auto;
      }

      .ac-ace-visualcontainer {
        min-height: 160px;
        align-items: flex-start;
      }

      .ac-ace-visualcontainer anycubic-printercard-multicolorbox_modal_drying {
        width: 100%;
      }

      .ac-bridge-card-body {
        box-sizing: border-box;
        padding: 8px 24px 16px 24px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 340px;
        margin: 0 auto;
      }

      .ac-switch-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .ac-switch-row-label {
        font-size: 15px;
        color: var(--primary-text-color);
      }

      .ac-bridge-card-body ha-control-button {
        min-height: 48px;
      }

      .ac-linked-devices {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        padding: 0px 16px 20px 16px;
        width: 100%;
        box-sizing: border-box;
      }

      .ac-linked-chip {
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 20px;
        background-color: transparent;
        padding: 6px 16px;
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .ac-linked-chip:disabled {
        cursor: default;
        opacity: 0.7;
      }

      .ac-linked-chip:not(:disabled):hover {
        background-color: #7f7f7f24;
      }

      .ac-hidden {
        display: none;
      }
    `;
  }
}
