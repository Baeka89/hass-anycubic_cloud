import { mdiPlay } from "@mdi/js";
import { CSSResult, LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { commonPrintStyle } from "./styles";
import { localize } from "../../../localize/localize";

import { platform } from "../../const";
import { HASSDomEvent } from "../../fire_event";
import { fireHaptic } from "../../fire_haptic";
import { loadHaServiceControl } from "../../load-ha-elements";
import {
  FormChangeDetail,
  HassDevice,
  HassPanel,
  HassProgressButton,
  HassRoute,
  HassServiceError,
  HomeAssistant,
  LitTemplateResult,
} from "../../types";

export class AnycubicViewPrintBase extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property()
  public language!: string;

  @property({ type: Boolean, reflect: true })
  public narrow!: boolean;

  @property()
  public route!: HassRoute;

  @property()
  public panel!: HassPanel;

  @property({ attribute: "selected-printer-id" })
  public selectedPrinterID: string | undefined;

  @property({ attribute: "selected-printer-device" })
  public selectedPrinterDevice: HassDevice | undefined;

  @state() private _scriptData: {
    action?: string;
    service?: string;
    data?: Record<string, unknown>;
  } = {};

  @state()
  private _error: string | undefined;

  @state()
  protected _serviceName: string = "";

  @state()
  private _buttonPrint: string;

  @state()
  private _buttonProgress: boolean = false;

  firstUpdated(): void {
    void loadHaServiceControl().catch((error: unknown) => {
      this._error = error instanceof Error ? error.message : String(error);
    });
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has("language")) {
      this._buttonPrint = localize("common.actions.print", this.language);
    }

    if (
      changedProperties.has("selectedPrinterDevice") ||
      changedProperties.has("selectedPrinterID")
    ) {
      if (this.selectedPrinterDevice) {
        const srvName = `${platform}.${this._serviceName}`;
        this._scriptData = {
          ...this._scriptData,
          action: srvName,
          service: srvName,
          data: {
            ...(this._scriptData.data || {}),
            config_entry: this.selectedPrinterDevice.primary_config_entry,
            device_id: this.selectedPrinterDevice.id,
          },
        };
      } else {
        const data = { ...(this._scriptData.data || {}) };
        delete data.device_id;
        delete data.printer_id;
        delete data.config_entry;
        this._scriptData = { ...this._scriptData, data };
      }
    }
  }

  render(): LitTemplateResult {
    return html`
      <ac-print-view elevation="2">
        <ha-service-control
          hidePicker
          .hass=${this.hass}
          .value=${this._scriptData}
          .showAdvanced=${true}
          .narrow=${this.narrow}
          @value-changed=${this._scriptDataChanged}
        ></ha-service-control>
        ${
          this._error !== undefined
            ? html`<ha-alert alert-type="error">${this._error}</ha-alert>`
            : nothing
        }
        <ha-progress-button
          class="print-button"
          raised
          @click=${this._runScript}
          .progress=${this._buttonProgress}
          .disabled=${!this.selectedPrinterDevice || this.selectedPrinterDevice.id !== this.selectedPrinterID || this._buttonProgress}
        >
          <ha-svg-icon .path=${mdiPlay}></ha-svg-icon>
          ${this._buttonPrint}
        </ha-progress-button>
      </ac-print-view>
    `;
  }

  private _scriptDataChanged = (ev: HASSDomEvent<FormChangeDetail>): void => {
    const value = { ...this._scriptData, ...ev.detail.value };
    const data: Record<string, unknown> = { ...(value.data || {}) };
    delete data.printer_id;
    const device = this.selectedPrinterDevice;
    if (device && device.id === this.selectedPrinterID) {
      data.device_id = device.id;
      data.config_entry = device.primary_config_entry;
    } else {
      delete data.device_id;
      delete data.config_entry;
    }
    this._scriptData = { ...value, data };
    this._error = undefined;
  };

  private _runScript = (ev: Event): void => {
    const button = ev.currentTarget as unknown as HassProgressButton;
    this._error = undefined;
    ev.stopPropagation();
    const device = this.selectedPrinterDevice;
    if (
      !device ||
      device.id !== this.selectedPrinterID ||
      this._buttonProgress
    ) {
      return;
    }
    const data: Record<string, unknown> = {
      ...(this._scriptData.data || {}),
      device_id: device.id,
      config_entry: device.primary_config_entry,
    };
    delete data.printer_id;
    this._buttonProgress = true;
    fireHaptic();
    this.hass
      .callService(platform, this._serviceName, data)
      .then(() => {
        button.actionSuccess();
        this._buttonProgress = false;
      })
      .catch((e: unknown) => {
        this._error = (e as HassServiceError).message;
        button.actionError();
        this._buttonProgress = false;
      });
  };

  static get styles(): CSSResult {
    return css`
      ${commonPrintStyle}
    `;
  }
}
