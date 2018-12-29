import { BasePosition } from "./BasePosition";
import { ShortOptionSecurity, ShortOptionSecurity_fromOfx } from "./ShortOptionSecurity";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Represents an options position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 */
export class OptionsPosition extends BasePosition {
  private secured: string;

  /**
   * Gets how the options position is secured (for short positions).
   *
   * @return how the options position is secured
   */
  public getSecured(): string {
    return this.secured;
  }

  /**
   * Sets how the options position is secured (for short positions).
   *
   * @param secured how the options position is secured
   */
  public setSecured(secured: string): void {
    this.secured = secured;
  }

  /**
   * Gets how the options position is secured as a well-known type.
   *
   * @return how the option position is secured or null if it's not a well-known type
   */
  getSecuredEnum(): ShortOptionSecurity {
    return ShortOptionSecurity_fromOfx(this.getSecured());
  }
}

Aggregate_add( OptionsPosition, "POSOPT" );
Element_add(OptionsPosition, { name: "SECURED", order: 20, type: String, read: OptionsPosition.prototype.getSecured, write: OptionsPosition.prototype.setSecured });
