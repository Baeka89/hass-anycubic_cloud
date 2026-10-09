import { CSSResult, LitElement, PropertyValues, css, html } from "lit";
import { property, state } from "lit/decorators.js";

import { customElementIfUndef } from "../../../internal/register-custom-element";

import { calculateTimeStat, getEntityTotalSeconds } from "../../../helpers";
import {
  CalculatedTimeType,
  HassEntity,
  LitTemplateResult,
} from "../../../types";

import "./stat_line";

@customElementIfUndef("anycubic-printercard-stat-time")
export class AnycubicPrintercardStatTime extends LitElement {
  @property({ attribute: "time-entity" })
  public timeEntity: HassEntity;

  @property({ attribute: "time-type" })
  public timeType: CalculatedTimeType;

  @property({ type: String })
  public name: string;

  @property({ type: Number })
  public direction: number;

  @property({ type: Boolean })
  public round?: boolean;

  @property({ type: Boolean })
  public use_24hr?: boolean;

  @property({ attribute: "time-zone" })
  public timeZone?: string;

  @property({ attribute: "is-seconds", type: Boolean })
  public isSeconds?: boolean;

  @state()
  private currentTime: number | string | undefined = 0;

  @state()
  private lastIntervalId: number = -1;

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (
      !changedProperties.has("timeEntity") &&
      !changedProperties.has("isSeconds")
    ) {
      return;
    }

    if (this.lastIntervalId !== -1) {
      clearInterval(this.lastIntervalId);
    }

    this.currentTime = getEntityTotalSeconds(this.timeEntity, this.isSeconds);

    this.lastIntervalId = setInterval(() => {
      this._incTime();
    }, 1000);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.lastIntervalId === -1) {
      this.lastIntervalId = setInterval(() => {
        this._incTime();
      }, 1000);
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.lastIntervalId !== -1) {
      clearInterval(this.lastIntervalId);
      this.lastIntervalId = -1;
    }
  }

  render(): LitTemplateResult {
    return html`<anycubic-printercard-stat-line
      .name=${this.name}
      .value=${calculateTimeStat(
        this.currentTime,
        this.timeType,
        this.round,
        this.use_24hr,
        this.timeZone,
      )}
    ></anycubic-printercard-stat-line>`;
  }

  private _incTime(): void {
    if (
      this.currentTime === 0 ||
      (this.currentTime && !isNaN(this.currentTime as number))
    ) {
      this.currentTime = Math.max(0, Number(this.currentTime) + this.direction);
    }
  }

  static get styles(): CSSResult {
    return css`
      :host {
        box-sizing: border-box;
        width: 100%;
      }
    `;
  }
}
