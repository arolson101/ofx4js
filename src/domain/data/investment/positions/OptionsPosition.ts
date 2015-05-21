/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='BasePosition'/>
///<reference path='ShortOptionSecurity'/>

module ofx4js.domain.data.investment.positions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Represents an options position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
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

}
