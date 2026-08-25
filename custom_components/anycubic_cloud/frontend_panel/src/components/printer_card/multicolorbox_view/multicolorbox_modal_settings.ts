import { CSSResult, LitElement, PropertyValues, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { styleMap } from "lit/directives/style-map.js";
import { animate, Options as motionOptions } from "@lit-labs/motion";

import { localize } from "../../../../localize/localize";

import { customElementIfUndef } from "../../../internal/register-custom-element";

import { HASSDomEvent, fireEvent } from "../../../fire_event";

import "../../ui/toggle-switch.ts";

import {
  getPrinterSensorStateObj,
  getPrinterSwitchStateObj,
  getStrictMatchingEntity,
} from "../../../helpers";
import {
  AnycubicSpoolInfo,
  AnycubicSpoolInfoEntity,
  DomClickEvent,
  EvtTargSpoolEdit,
  HassEntity,
  HassEntityInfos,
  HomeAssistant,
  LitTemplateResult,
  ModalEventAceSettings,
} from "../../../types";

import { commonModalStyle } from "../../ui/modal-styles";

const animOptionsCard: motionOptions = {
  keyframeOptions: {
    duration: 250,
    direction: "alternate",
    easing: "ease-in-out",
  },
  properties: ["height", "opacity", "scale"],
};

const PRIMARY_ENTITY_ID_RUNOUT_REFILL = "multi_color_box_runout_refill";
const PRIMARY_ENTITY_ID_SPOOLS = "ace_spools";

@customElementIfUndef("anycubic-printercard-multicolorbox_modal_settings")
export class AnycubicPrintercardMulticolorboxModalSettings extends LitElement {
  @property()
  public hass!: HomeAssistant;

  @property()
  public language!: string;

  @property({ attribute: "printer-entities" })
  public printerEntities: HassEntityInfos;

  @property({ attribute: "printer-entity-id-part" })
  public printerEntityIdPart: string | undefined;

  @property()
  public box_id: number = 0;

  @state()
  private spoolList: AnycubicSpoolInfo[] = [];

  @state()
  private _spoolsUnavailable: boolean = false;

  @state()
  private _runoutRefillState: HassEntity | undefined;

  @state()
  private _changingRunout: boolean = false;

  @state()
  private _isOpen: boolean = false;

  @state()
  private _heading: string;

  @state()
  private _labelRunoutRefill: string;

  @state()
  private _labelSpools: string;

  @state()
  private _hintSpoolsUnavailable: string;

  // eslint-disable-next-line @typescript-eslint/require-await
  async firstUpdated(): Promise<void> {
    this.addEventListener("click", (e) => {
      this._closeModal(e);
    });
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.parentElement?.addEventListener(
      "ac-mcbsettings-modal",
      this._handleModalEvent,
    );
  }

  public disconnectedCallback(): void {
    this.parentElement?.removeEventListener(
      "ac-mcbsettings-modal",
      this._handleModalEvent,
    );
    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has("language")) {
      this._heading = localize("card.ace_settings.heading", this.language);
      this._labelRunoutRefill = localize(
        "card.buttons.runout_refill",
        this.language,
      );
      this._labelSpools = localize(
        "card.ace_settings.label_spools",
        this.language,
      );
      this._hintSpoolsUnavailable = localize(
        "card.ace_settings.hint_spools_unavailable",
        this.language,
      );
    }

    if (
      changedProperties.has("hass") ||
      changedProperties.has("printerEntities") ||
      changedProperties.has("printerEntityIdPart")
    ) {
      const spoolsEntity = getPrinterSensorStateObj(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        PRIMARY_ENTITY_ID_SPOOLS,
        "not loaded",
        { spool_info: [] },
      ) as AnycubicSpoolInfoEntity;
      this.spoolList = spoolsEntity.attributes.spool_info;
      this._spoolsUnavailable = this.spoolList.length === 0;
      this._runoutRefillState = getPrinterSwitchStateObj(
        this.hass,
        this.printerEntities,
        this.printerEntityIdPart,
        PRIMARY_ENTITY_ID_RUNOUT_REFILL,
      );
    }
  }

  protected update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (this._isOpen) {
      this.style.display = "block";
    } else {
      this.style.display = "none";
    }
  }

  render(): LitTemplateResult {
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
          ${this._isOpen ? this._renderCard() : nothing}
        </div>
      </div>
    `;
  }

  private _renderCard(): LitTemplateResult {
    return html`
      <div class="ac-slot-title">${this._heading}</div>
      <div class="ac-settings-switch-row">
        <span>${this._labelRunoutRefill}</span>
        <anycubic-ui-toggle-switch
          .checked=${this._runoutRefillState?.state === "on"}
          .disabled=${this._changingRunout ||
          !this._runoutRefillState ||
          this._runoutRefillState.state === "unavailable"}
          @ac-toggle-change=${this._handleRunoutRefillChanged}
        ></anycubic-ui-toggle-switch>
      </div>
      <p class="ac-modal-label">${this._labelSpools}</p>
      ${this._spoolsUnavailable
        ? html`<p class="ac-settings-hint">${this._hintSpoolsUnavailable}</p>`
        : nothing}
      <div class="ac-settings-spool-list">
        ${map(
          this._displaySpoolList(),
          (spool: AnycubicSpoolInfo, index: number): LitTemplateResult => {
            const ringStyle = {
              "background-color": spool.spool_loaded
                ? `rgb(${spool.color[0]}, ${spool.color[1]}, ${spool.color[2]})`
                : "#aaa",
            };
            return html`
              <button
                class="ac-settings-spool-row"
                .index=${index}
                .material_type=${spool.material_type}
                .color=${spool.color}
                @click=${this._editSpool}
              >
                <span
                  class="ac-settings-spool-ring"
                  style=${styleMap(ringStyle)}
                  >${index + 1}</span
                >
                <span class="ac-settings-spool-material">
                  ${spool.spool_loaded ? spool.material_type : "---"}
                </span>
              </button>
            `;
          },
        )}
      </div>
    `;
  }

  // Falls der ace_spools-Sensor (noch) keine Daten liefert (z.B. weil MQTT
  // gerade nicht verbunden ist), trotzdem 4 leere, klickbare Slots anbieten -
  // Material/Farbe setzen ist ein reiner Schreibvorgang und funktioniert
  // unabhängig vom aktuellen Sensor-Zustand.
  private _displaySpoolList(): AnycubicSpoolInfo[] {
    if (this.spoolList.length > 0) {
      return this.spoolList;
    }
    return [0, 1, 2, 3].map(() => ({
      material_type: "PLA",
      color: [170, 170, 170],
      status: 0,
      spool_loaded: false,
    }));
  }

  private _handleRunoutRefillChanged = (_ev: Event): void => {
    if (this._changingRunout) {
      return;
    }
    const ent = getStrictMatchingEntity(
      this.printerEntities,
      this.printerEntityIdPart,
      "switch",
      PRIMARY_ENTITY_ID_RUNOUT_REFILL,
    );
    if (!ent) {
      return;
    }
    this._changingRunout = true;
    this.hass
      .callService("switch", "toggle", {
        entity_id: ent.entity_id,
      })
      .then(() => {
        this._changingRunout = false;
      })
      .catch((_e: unknown) => {
        this._changingRunout = false;
      });
  };

  private _editSpool = (ev: DomClickEvent<EvtTargSpoolEdit>): void => {
    const index: number = ev.currentTarget.index;
    const material_type: string = ev.currentTarget.material_type;
    const color: number[] = ev.currentTarget.color;
    // Erst uns selbst schließen, sonst liegen zwei Modal-Overlays mit
    // gleichem z-index übereinander und das Spulen-Modal verschwindet
    // dahinter.
    this._isOpen = false;
    fireEvent(this, "ac-mcb-modal", {
      modalOpen: true,
      box_id: this.box_id,
      spool_index: index,
      material_type: material_type,
      color: color,
    });
  };

  private _handleModalEvent = (evt: Event): void => {
    const e = evt as HASSDomEvent<ModalEventAceSettings>;
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
  };

  private _cardClick = (e: Event): void => {
    e.stopPropagation();
  };

  static get styles(): CSSResult {
    return css`
      ${commonModalStyle}

      .ac-slot-title {
        font-size: 22px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 16px;
      }

      .ac-settings-switch-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color, #ccc3);
        margin-bottom: 12px;
      }

      .ac-settings-spool-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .ac-settings-hint {
        font-size: 13px;
        color: var(--secondary-text-color, #7f7f7f);
        margin: 0px 0px 10px 0px;
      }

      .ac-settings-spool-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--divider-color, #ccc3);
        border-radius: 10px;
        background: transparent;
        padding: 10px 14px;
        cursor: pointer;
        font-size: 15px;
        color: var(--primary-text-color);
      }

      .ac-settings-spool-row:hover {
        background-color: #7f7f7f24;
      }

      .ac-settings-spool-ring {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
        color: white;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
      }

      .ac-settings-spool-material {
        text-align: left;
      }
    `;
  }
}
