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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/Element_add'/>

module ofx4js.domain.data.seclist {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Identifier for a security.
 * @see "Section 13.8.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityId {

  private uniqueId: string;
  private uniqueIdType: string;

  /**
   * Gets the unique id for the security. This is a required field according to the OFX spec.
   *
   * @return the unique id
   */
  public getUniqueId(): string {
    return this.uniqueId;
  }

  /**
   * Sets the unique id for the security. This is a required field according to the OFX spec.
   *
   * @param uniqueId the unique id
   */
  public setUniqueId(uniqueId: string): void {
    this.uniqueId = uniqueId;
  }

  /**
   * Gets the type of unique id.
   *
   * @return the type of unique id
   */
  public getUniqueIdType(): string {
    return this.uniqueIdType;
  }

  /**
   * Sets the type of unique id.
   *
   * @param uniqueIdType the type of unique id
   */
  public setUniqueIdType(uniqueIdType: string): void {
    this.uniqueIdType = uniqueIdType;
  }
}

Aggregate_add( SecurityId, "SECID" );
Element_add(SecurityId, { name: "UNIQUEID", required: true, order: 10, type: String, read: SecurityId.prototype.getUniqueId, write: SecurityId.prototype.setUniqueId });
Element_add(SecurityId, { name: "UNIQUEIDTYPE", required: true, order: 20, type: String, read: SecurityId.prototype.getUniqueIdType, write: SecurityId.prototype.setUniqueIdType });

}
