import { CSSResult, LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { animate, Options as motionOptions } from "@lit-labs/motion";

import { localize } from "../../../../localize/localize";

import { HASSDomEvent } from "../../../fire_event";

import { customElementIfUndef } from "../../../internal/register-custom-element";

import {
  getPrinterDryingButtonStateObj,
  getPrinterNumberStateObj,
  getStrictMatchingEntity,
  isPrinterButtonStateAvailable,
} from "../../../helpers";

import {
  AnycubicDryingPresetEntity,
  HassDevice,
  HassEntityInfos,
  HomeAssistant,
  LitTemplateResult,
  ModalEventDrying,
  TextfieldChangeDetail,
} from "../../../types";

import { commonModalStyle } from "../../ui/modal-styles";

import "../../ui/select-dropdown.ts";

const animOptionsCard: motionOptions = {
  keyframeOptions: {
    duration: 250,
    direction: "alternate",
    easing: "ease-in-out",
  },
  properties: ["height", "opacity", "scale"],
};

const PRIMARY_DRYING_PRESET_1 = "drying_start_preset_1";
const PRIMARY_DRYING_PRESET_2 = "drying_start_preset_2";
const PRIMARY_DRYING_PRESET_3 = "drying_start_preset_3";
const PRIMARY_DRYING_PRESET_4 = "drying_start_preset_4";
const PRIMARY_DRYING_PRESET_5 = "drying_start_preset_5";
const PRIMARY_DRYING_STOP = "dry_stop";
const PRIMARY_CUSTOM_DRYING_TEMP = "drying_temperature_input";
const PRIMARY_CUSTOM_DRYING_DURATION = "drying_time_input";
const PRIMARY_CUSTOM_DRYING_START = "dry_start_custom";

const SECONDARY_PREFIX = "secondary_";

const SECONDARY_DRYING_PRESET_1 = SECONDARY_PREFIX + PRIMARY_DRYING_PRESET_1;
const SECONDARY_DRYING_PRESET_2 = SECONDARY_PREFIX + PRIMARY_DRYING_PRESET_2;
const SECONDARY_DRYING_PRESET_3 = SECONDARY_PREFIX + PRIMARY_DRYING_PRESET_3;
const SECONDARY_DRYING_PRESET_4 = SECONDARY_PREFIX + PRIMARY_DRYING_PRESET_4;
const SECONDARY_DRYING_PRESET_5 = SECONDARY_PREFIX + PRIMARY_DRYING_PRESET_5;
// Die Stop-Drying-Entity heißt auf beiden ACE-Boxen gleich (kein
// "Secondary"-Zusatz im Namen), sie liegen aber auf unterschiedlichen
// HA-Geraeten und werden daher trotzdem korrekt getrennt aufgeloest.
const SECONDARY_DRYING_STOP = PRIMARY_DRYING_STOP;
const SECONDARY_CUSTOM_DRYING_TEMP =
  SECONDARY_PREFIX + PRIMARY_CUSTOM_DRYING_TEMP;
const SECONDARY_CUSTOM_DRYING_DURATION =
  SECONDARY_PREFIX + PRIMARY_CUSTOM_DRYING_DURATION;
const SECONDARY_CUSTOM_DRYING_START = PRIMARY_CUSTOM_DRYING_START;

@customElementIfUndef("anycubic-printercard-multicolorbox_modal_drying")
export class AnycubicPrintercardMulticolorboxModalDrying extends LitElement {
  @property()
  public hass!: HomeAssistant;

  @property()
  public language!: string;

  @property({ attribute: "selected-printer-device" })
  public selectedPrinterDevice: HassDevice | undefined;

  @property({ attribute: "printer-entities" })
  public printerEntities: HassEntityInfos;

  @property({ attribute: "printer-entity-id-part" })
  public printerEntityIdPart: string | undefined;

  // Wenn true, wird die Komponente direkt eingebettet (kein Modal-Overlay,
  // immer sichtbar) - genutzt von der ACE-Pro-Karte für die "schnell
  // auswählbare" Trocknung direkt auf der Karte.
  @property({ type: Boolean, reflect: true })
  public inline: boolean = false;

  @property({ type: Number })
  public box_id: number = 0;

  @state()
  private _dryingPresetId1: string = PRIMARY_DRYING_PRESET_1;

  @state()
  private _dryingPresetId2: string = PRIMARY_DRYING_PRESET_2;

  @state()
  private _dryingPresetId3: string = PRIMARY_DRYING_PRESET_3;

  @state()
  private _dryingPresetId4: string = PRIMARY_DRYING_PRESET_4;

  @state()
  private _dryingPresetId5: string = PRIMARY_DRYING_PRESET_5;

  @state()
  private _dryingStopId: string = PRIMARY_DRYING_STOP;

  @state()
  private _customTempId: string = PRIMARY_CUSTOM_DRYING_TEMP;

  @state()
  private _customDurationId: string = PRIMARY_CUSTOM_DRYING_DURATION;

  @state()
  private _customStartId: string = PRIMARY_CUSTOM_DRYING_START;

  @state()
  private _hasDryingPreset1: boolean = false;

  @state()
  private _hasDryingPreset2: boolean = false;

  @state()
  private _hasDryingPreset3: boolean = false;

  @state()
  private _hasDryingPreset4: boolean = false;

  @state()
  private _hasDryingPreset5: boolean = false;

  @state()
  private _hasDryingStop: boolean = false;

  @state()
  private _hasCustomDrying: boolean = false;

  @state()
  private _dryingPresetTemp1: string = "";

  @state()
  private _dryingPresetDur1: string = "";

  @state()
  private _dryingPresetTemp2: string = "";

  @state()
  private _dryingPresetDur2: string = "";

  @state()
  private _dryingPresetTemp3: string = "";

  @state()
  private _dryingPresetDur3: string = "";

  @state()
  private _dryingPresetTemp4: string = "";

  @state()
  private _dryingPresetDur4: string = "";

  @state()
  private _dryingPresetTemp5: string = "";

  @state()
  private _dryingPresetDur5: string = "";

  @state()
  private _customTemp: number = 50;

  @state()
  private _customTempMin: number = 40;

  @state()
  private _customTempMax: number = 70;

  @state()
  private _userEditCustomTemp: boolean = false;

  @state()
  private _customDuration: number = 240;

  @state()
  private _customDurationMin: number = 30;

  @state()
  private _customDurationMax: number = 480;

  @state()
  private _userEditCustomDuration: boolean = false;

  @state()
  private _startingCustomDrying: boolean = false;

  @state()
  private _isOpen: boolean = false;

  @state()
  private _heading: string;

  @state()
  private _buttonTextPreset: string;

  @state()
  private _buttonTextMinutes: string;

  @state()
  private _buttonStopDrying: string;

  @state()
  private _hintNothingAvailable: string;

  @state()
  private _customHeading: string;

  @state()
  private _customLabelTemp: string;

  @state()
  private _customLabelDuration: string;

  @state()
  private _customButtonStart: string;

  // eslint-disable-next-line @typescript-eslint/require-await
  async firstUpdated(): Promise<void> {
    if (!this.inline) {
      this.addEventListener("click", (e) => {
        this._closeModal(e);
      });
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this.inline) {
      this.parentElement?.addEventListener(
        "ac-mcbdry-modal",
        this._handleModalEvent,
      );
    }
  }

  public disconnectedCallback(): void {
    if (!this.inline) {
      this.parentElement?.removeEventListener(
        "ac-mcbdry-modal",
        this._handleModalEvent,
      );
    }
    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has("language")) {
      this._heading = localize("card.drying_settings.heading", this.language);
      this._buttonTextPreset = localize(
        "card.drying_settings.button_preset",
        this.language,
      );
      this._buttonTextMinutes = localize(
        "card.drying_settings.button_minutes",
        this.language,
      );
      this._buttonStopDrying = localize(
        "card.drying_settings.button_stop_drying",
        this.language,
      );
      this._hintNothingAvailable = localize(
        "card.drying_settings.hint_nothing_available",
        this.language,
      );
      this._customHeading = localize(
        "card.drying_settings.custom_heading",
        this.language,
      );
      this._customLabelTemp = localize(
        "card.drying_settings.custom_label_temp",
        this.language,
      );
      this._customLabelDuration = localize(
        "card.drying_settings.custom_label_duration",
        this.language,
      );
      this._customButtonStart = localize(
        "card.drying_settings.custom_button_start",
        this.language,
      );
    }

    if (changedProperties.has("box_id")) {
      if (this.box_id === 1) {
        this._dryingPresetId1 = SECONDARY_DRYING_PRESET_1;
        this._dryingPresetId2 = SECONDARY_DRYING_PRESET_2;
        this._dryingPresetId3 = SECONDARY_DRYING_PRESET_3;
        this._dryingPresetId4 = SECONDARY_DRYING_PRESET_4;
        this._dryingPresetId5 = SECONDARY_DRYING_PRESET_5;
        this._dryingStopId = SECONDARY_DRYING_STOP;
        this._customTempId = SECONDARY_CUSTOM_DRYING_TEMP;
        this._customDurationId = SECONDARY_CUSTOM_DRYING_DURATION;
        this._customStartId = SECONDARY_CUSTOM_DRYING_START;
      } else {
        this._dryingPresetId1 = PRIMARY_DRYING_PRESET_1;
        this._dryingPresetId2 = PRIMARY_DRYING_PRESET_2;
        this._dryingPresetId3 = PRIMARY_DRYING_PRESET_3;
        this._dryingPresetId4 = PRIMARY_DRYING_PRESET_4;
        this._dryingPresetId5 = PRIMARY_DRYING_PRESET_5;
        this._dryingStopId = PRIMARY_DRYING_STOP;
        this._customTempId = PRIMARY_CUSTOM_DRYING_TEMP;
        this._customDurationId = PRIMARY_CUSTOM_DRYING_DURATION;
        this._customStartId = PRIMARY_CUSTOM_DRYING_START;
      }
    }

    if (
      changedProperties.has("hass") ||
      changedProperties.has("selectedPrinterDevice") ||
      changedProperties.has("printerEntities") ||
      changedProperties.has("printerEntityIdPart")
    ) {
      const dryingPresetState1: AnycubicDryingPresetEntity =
        getPrinterDryingButtonStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._dryingPresetId1,
        ) as AnycubicDryingPresetEntity;
      this._hasDryingPreset1 =
        isPrinterButtonStateAvailable(dryingPresetState1);
      this._dryingPresetTemp1 = String(
        dryingPresetState1.attributes.temperature,
      );
      this._dryingPresetDur1 = String(dryingPresetState1.attributes.duration);
      const dryingPresetState2: AnycubicDryingPresetEntity =
        getPrinterDryingButtonStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._dryingPresetId2,
        ) as AnycubicDryingPresetEntity;
      this._hasDryingPreset2 =
        isPrinterButtonStateAvailable(dryingPresetState2);
      this._dryingPresetTemp2 = String(
        dryingPresetState2.attributes.temperature,
      );
      this._dryingPresetDur2 = String(dryingPresetState2.attributes.duration);
      const dryingPresetState3: AnycubicDryingPresetEntity =
        getPrinterDryingButtonStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._dryingPresetId3,
        ) as AnycubicDryingPresetEntity;
      this._hasDryingPreset3 =
        isPrinterButtonStateAvailable(dryingPresetState3);
      this._dryingPresetTemp3 = String(
        dryingPresetState3.attributes.temperature,
      );
      this._dryingPresetDur3 = String(dryingPresetState3.attributes.duration);
      const dryingPresetState4: AnycubicDryingPresetEntity =
        getPrinterDryingButtonStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._dryingPresetId4,
        ) as AnycubicDryingPresetEntity;
      this._hasDryingPreset4 =
        isPrinterButtonStateAvailable(dryingPresetState4);
      this._dryingPresetTemp4 = String(
        dryingPresetState4.attributes.temperature,
      );
      this._dryingPresetDur4 = String(dryingPresetState4.attributes.duration);
      const dryingPresetState5: AnycubicDryingPresetEntity =
        getPrinterDryingButtonStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._dryingPresetId5,
        ) as AnycubicDryingPresetEntity;
      this._hasDryingPreset5 =
        isPrinterButtonStateAvailable(dryingPresetState5);
      this._dryingPresetTemp5 = String(
        dryingPresetState5.attributes.temperature,
      );
      this._dryingPresetDur5 = String(dryingPresetState5.attributes.duration);
      const dryingStopState = getPrinterDryingButtonStateObj(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        this._dryingStopId,
      );
      this._hasDryingStop = isPrinterButtonStateAvailable(dryingStopState);
      const customStartState = getPrinterDryingButtonStateObj(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        this._customStartId,
      );
      this._hasCustomDrying = isPrinterButtonStateAvailable(customStartState);
      if (!this._userEditCustomTemp) {
        const customTempState = getPrinterNumberStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._customTempId,
          50,
          { min: 40, max: 70 },
        );
        this._customTemp = Number(customTempState.state);
        this._customTempMin = Number(customTempState.attributes.min ?? 40);
        this._customTempMax = Number(customTempState.attributes.max ?? 70);
      }
      if (!this._userEditCustomDuration) {
        const customDurationState = getPrinterNumberStateObj(
          this.hass,
          this.printerEntities,
          this.printerEntityIdPart,
          this._customDurationId,
          240,
          { min: 30, max: 480 },
        );
        this._customDuration = Number(customDurationState.state);
        this._customDurationMin = Number(
          customDurationState.attributes.min ?? 30,
        );
        this._customDurationMax = Number(
          customDurationState.attributes.max ?? 480,
        );
      }
    }
  }

  protected update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (this.inline) {
      this.style.display = "block";
    } else if (this._isOpen) {
      this.style.display = "block";
    } else {
      this.style.display = "none";
    }
  }

  render(): LitTemplateResult {
    if (this.inline) {
      return html`<div class="ac-drying-inline">${this._renderCard()}</div>`;
    }

    const stylesMain = {
      height: "auto",
      opacity: 1.0,
      scale: 1.0,
    };

    return html`
      <div
        class="ac-modal-container"
        style=${styleMap(stylesMain)}
        ${animate({ ...animOptionsCard })}
      >
        <span class="ac-modal-close" @click=${this._closeModal}>&times;</span>
        <div class="ac-modal-card" @click=${this._cardClick}>
          ${this._renderCard()}
        </div>
      </div>
    `;
  }

  _renderCard(): LitTemplateResult {
    const nothingAvailable =
      !this._hasDryingPreset1 &&
      !this._hasDryingPreset2 &&
      !this._hasDryingPreset3 &&
      !this._hasDryingPreset4 &&
      !this._hasDryingPreset5 &&
      !this._hasDryingStop &&
      !this._hasCustomDrying;

    return html`
      <div>
        <div class="ac-drying-header">${this._heading}</div>
        ${nothingAvailable
          ? html`<p class="ac-drying-hint">${this._hintNothingAvailable}</p>`
          : nothing}
        <div class="ac-drying-buttonscont">
          ${this._hasDryingPreset1
            ? html`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset1}>
                    ${this._buttonTextPreset} 1<br />
                    ${this._dryingPresetDur1} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp1}°C
                  </ha-control-button>
                </div>
              `
            : nothing}
          ${this._hasDryingPreset2
            ? html`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset2}>
                    ${this._buttonTextPreset} 2<br />
                    ${this._dryingPresetDur2} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp2}°C
                  </ha-control-button>
                </div>
              `
            : nothing}
          ${this._hasDryingPreset3
            ? html`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset3}>
                    ${this._buttonTextPreset} 3<br />
                    ${this._dryingPresetDur3} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp3}°C
                  </ha-control-button>
                </div>
              `
            : nothing}
          ${this._hasDryingPreset4
            ? html`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset4}>
                    ${this._buttonTextPreset} 4<br />
                    ${this._dryingPresetDur4} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp4}°C
                  </ha-control-button>
                </div>
              `
            : nothing}
          ${this._hasDryingPreset5
            ? html`
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingPreset5}>
                    ${this._buttonTextPreset} 5<br />
                    ${this._dryingPresetDur5} ${this._buttonTextMinutes} @
                    ${this._dryingPresetTemp5}°C
                  </ha-control-button>
                </div>
              `
            : nothing}
          ${this._hasDryingStop
            ? html`
                <div class="ac-flex-break"></div>
                <div class="ac-drying-buttoncont">
                  <ha-control-button @click=${this._handleDryingStop}>
                    ${this._buttonStopDrying}
                  </ha-control-button>
                </div>
              `
            : nothing}
        </div>
        ${this._hasCustomDrying ? this._renderCustomDrying() : nothing}
      </div>
    `;
  }

  private _renderCustomDrying(): LitTemplateResult {
    return html`
      <div class="ac-flex-break"></div>
      <div class="ac-custom-drying-header">${this._customHeading}</div>
      <div class="ac-custom-drying-row">
        <div class="ac-input-group">
          <label class="ac-input-label">${this._customLabelTemp}</label>
          <input
            class="ac-number-input"
            type="number"
            min=${this._customTempMin}
            max=${this._customTempMax}
            .value=${String(this._customTemp)}
            placeholder=${this._customTemp}
            @input=${this._handleCustomTempChange}
          />
        </div>
        <div class="ac-input-group">
          <label class="ac-input-label">${this._customLabelDuration}</label>
          <input
            class="ac-number-input"
            type="number"
            min=${this._customDurationMin}
            max=${this._customDurationMax}
            .value=${String(this._customDuration)}
            placeholder=${this._customDuration}
            @input=${this._handleCustomDurationChange}
          />
        </div>
      </div>
      <div class="ac-custom-drying-row">
        <ha-control-button
          .disabled=${this._startingCustomDrying}
          @click=${this._handleStartCustomDrying}
        >
          ${this._customButtonStart}
        </ha-control-button>
      </div>
    `;
  }

  private _pressHassButton(suffix: string): void {
    const ent = getStrictMatchingEntity(
      this.printerEntities,
      this.printerEntityIdPart,
      "button",
      suffix,
    );
    if (ent) {
      this.hass
        .callService("button", "press", {
          entity_id: ent.entity_id,
        })
        .then()
        .catch((_e: unknown) => {
          // Show in error modal
        });
    }
  }

  private _handleDryingPreset1 = (): void => {
    this._pressHassButton(this._dryingPresetId1);
    this._closeModal();
  };

  private _handleDryingPreset2 = (): void => {
    this._pressHassButton(this._dryingPresetId2);
    this._closeModal();
  };

  private _handleDryingPreset3 = (): void => {
    this._pressHassButton(this._dryingPresetId3);
    this._closeModal();
  };

  private _handleDryingPreset4 = (): void => {
    this._pressHassButton(this._dryingPresetId4);
    this._closeModal();
  };

  private _handleDryingPreset5 = (): void => {
    this._pressHassButton(this._dryingPresetId5);
    this._closeModal();
  };

  private _handleDryingStop = (): void => {
    this._pressHassButton(this._dryingStopId);
    this._closeModal();
  };

  private _handleCustomTempChange = (ev: Event): void => {
    const newVal = (
      ev.currentTarget as unknown as TextfieldChangeDetail<number>
    ).value;
    this._customTemp = Number(newVal);
    this._userEditCustomTemp = true;
  };

  private _handleCustomDurationChange = (ev: Event): void => {
    const newVal = (
      ev.currentTarget as unknown as TextfieldChangeDetail<number>
    ).value;
    this._customDuration = Number(newVal);
    this._userEditCustomDuration = true;
  };

  private _handleStartCustomDrying = (): void => {
    const tempEnt = getStrictMatchingEntity(
      this.printerEntities,
      this.printerEntityIdPart,
      "number",
      this._customTempId,
    );
    const durationEnt = getStrictMatchingEntity(
      this.printerEntities,
      this.printerEntityIdPart,
      "number",
      this._customDurationId,
    );
    if (!tempEnt || !durationEnt) {
      return;
    }
    this._startingCustomDrying = true;
    Promise.all([
      this.hass.callService("number", "set_value", {
        entity_id: tempEnt.entity_id,
        value: this._customTemp,
      }),
      this.hass.callService("number", "set_value", {
        entity_id: durationEnt.entity_id,
        value: this._customDuration,
      }),
    ])
      .then(() => {
        this._pressHassButton(this._customStartId);
      })
      .then(() => {
        this._startingCustomDrying = false;
        this._userEditCustomTemp = false;
        this._userEditCustomDuration = false;
      })
      .catch((_e: unknown) => {
        this._startingCustomDrying = false;
      });
    this._closeModal();
  };

  private _handleModalEvent = (evt: Event): void => {
    const e = evt as HASSDomEvent<ModalEventDrying>;
    e.stopPropagation();
    if (e.detail.modalOpen) {
      this._isOpen = true;
      this.box_id = Number(e.detail.box_id);
    }
  };

  private _closeModal = (e?: Event | undefined): void => {
    if (e) {
      e.stopPropagation();
    }
    this._isOpen = false;
    this.box_id = 0;
  };

  private _cardClick = (e: Event): void => {
    e.stopPropagation();
  };

  static get styles(): CSSResult {
    return css`
      ${commonModalStyle}

      :host([inline]) {
        display: block;
        position: static;
        z-index: auto;
        left: auto;
        top: auto;
        width: 100%;
        height: auto;
        overflow: visible;
        background-color: transparent;
        backdrop-filter: none;
      }

      .ac-drying-inline {
        width: 100%;
        box-sizing: border-box;
      }

      .ac-drying-inline .ac-drying-header {
        font-size: 16px;
        margin-bottom: 8px;
      }

      .ac-drying-hint {
        font-size: 13px;
        color: var(--secondary-text-color, #7f7f7f);
        margin: 0px 0px 12px 0px;
      }

      .ac-drying-inline .ac-drying-buttoncont {
        width: 100%;
        padding: 4px 0px;
      }

      .ac-drying-header {
        font-size: 24px;
        text-align: center;
        font-weight: 600;
      }

      ha-control-button {
        min-width: 150px;
        font-size: 14px;
        min-height: 55px;
        width: 100%;
        box-sizing: border-box;
      }

      .ac-flex-break {
        flex-basis: 100%;
        height: 0;
      }

      .ac-drying-buttonscont {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        align-items: center;
        justify-content: center;
      }

      .ac-drying-buttoncont {
        width: 50%;
        margin: 0;
        position: relative;
        box-sizing: border-box;
        padding: 10px;
      }

      .ac-custom-drying-header {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        margin: 20px 0px 10px 0px;
      }

      .ac-custom-drying-row {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-bottom: 10px;
      }

      .ac-custom-drying-row .ac-input-group {
        min-width: 120px;
      }

      .ac-custom-drying-row ha-control-button {
        width: 100%;
      }

      .ac-input-label {
        font-size: 12px;
        color: var(--secondary-text-color, #7f7f7f);
        margin-bottom: 4px;
        display: block;
      }

      .ac-number-input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 0px 12px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #ccc);
        background-color: var(
          --card-background-color,
          var(--primary-background-color, white)
        );
        color: var(--primary-text-color);
      }

      .ac-number-input:focus {
        outline: none;
        border-color: var(--primary-color, #03a9f4);
      }
    `;
  }
}
