import { CSSResult, LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

import { customElementIfUndef } from "../../internal/register-custom-element";

import { fireEvent } from "../../fire_event";
import { LitTemplateResult } from "../../types";

// Eigenständiger, selbst gestylter Toggle-Switch. Verwendet absichtlich
// keine HA-interne Komponente (z.B. ha-entity-toggle) - die wird in einem
// eigenständigen Custom-Panel manchmal nicht geladen und bleibt dann
// unsichtbar bzw. nicht klickbar.
@customElementIfUndef("anycubic-ui-toggle-switch")
export class AnycubicUIToggleSwitch extends LitElement {
  @property({ type: Boolean })
  public checked: boolean = false;

  @property({ type: Boolean })
  public disabled: boolean = false;

  render(): LitTemplateResult {
    return html`
      <button
        class="ac-toggle ${this.checked ? "ac-toggle-on" : ""}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="ac-toggle-knob"></span>
      </button>
    `;
  }

  private _handleClick = (): void => {
    if (this.disabled) {
      return;
    }
    fireEvent(this, "ac-toggle-change", { checked: !this.checked });
  };

  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
      }

      .ac-toggle {
        box-sizing: border-box;
        width: 42px;
        height: 24px;
        border-radius: 12px;
        border: none;
        padding: 2px;
        background-color: var(--switch-unchecked-color, #939393);
        cursor: pointer;
        position: relative;
        transition: background-color 180ms ease-in-out;
      }

      .ac-toggle:disabled {
        opacity: 0.5;
        cursor: default;
      }

      .ac-toggle.ac-toggle-on {
        background-color: var(
          --switch-checked-color,
          var(--primary-color, #03a9f4)
        );
      }

      .ac-toggle-knob {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: white;
        transition: transform 180ms ease-in-out;
        transform: translateX(0);
      }

      .ac-toggle.ac-toggle-on .ac-toggle-knob {
        transform: translateX(18px);
      }
    `;
  }
}
