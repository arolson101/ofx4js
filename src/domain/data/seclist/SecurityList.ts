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
///<reference path='BaseSecurityInfo'/>

module ofx4js.domain.data.seclist {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * Aggregate for a list of securities.
 * @see "Section 13.8.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityList {
  private securityInfos: Array<BaseSecurityInfo>;

  public getSecurityInfos(): Array<BaseSecurityInfo> {
    return this.securityInfos;
  }

  public setSecurityInfos(securityInfos: Array<BaseSecurityInfo>): void {
    this.securityInfos = securityInfos;
  }
}

Aggregate_add( SecurityList, "SECLIST" );
ChildAggregate_add(SecurityList, { order: 10, type: Array, collectionEntryType: BaseSecurityInfo, read: SecurityList.prototype.getSecurityInfos, write: SecurityList.prototype.setSecurityInfos });

}
