import { LitElement } from "lit";
import { Color } from "modern-color";

/** Public color accessors used by the spool modal's bundled JS component. */
export declare class ColorPicker extends LitElement {
  get color(): Color;
  set color(value: Color | string);
}
