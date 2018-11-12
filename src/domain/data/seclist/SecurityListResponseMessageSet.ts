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
import { ResponseMessageSet } from "../ResponseMessageSet";
import { SecurityListResponseTransaction } from "./SecurityListResponseTransaction";
import { SecurityList } from "./SecurityList";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @author Jon Perlow
 */
export class SecurityListResponseMessageSet extends ResponseMessageSet {

  private securityListResponse: SecurityListResponseTransaction;
  private securityList: SecurityList;

  public getType(): MessageSetType {
    return MessageSetType.investment_security;
  }

  /**
   * The security list response list transaction.
   *
   * Most OFX files have a single security response.
   *
   * @return The security list response list.
   */
  public getSecurityListResponse(): SecurityListResponseTransaction {
    return this.securityListResponse;
  }

  /**
   * The security list response.
   *
   * @param securityListResponse The security list response.
   */
  public setSecurityListResponse(securityListResponse: SecurityListResponseTransaction) {
    this.securityListResponse = securityListResponse;
  }

  public getSecurityList(): SecurityList {
    return this.securityList;
  }

  public setSecurityList(securityList: SecurityList): void {
    this.securityList = securityList;
  }

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    var ret: Array<ResponseMessage> = new Array<ResponseMessage>();
    ret.push(this.securityListResponse);
    return ret;
  }
}

Aggregate_add( SecurityListResponseMessageSet, "SECLISTMSGSRSV1" );
ChildAggregate_add(SecurityListResponseMessageSet, { order: 0, type: SecurityListResponseTransaction, read: SecurityListResponseMessageSet.prototype.getSecurityListResponse, write: SecurityListResponseMessageSet.prototype.setSecurityListResponse });
ChildAggregate_add(SecurityListResponseMessageSet, { order: 10, type: SecurityList, read: SecurityListResponseMessageSet.prototype.getSecurityList, write: SecurityListResponseMessageSet.prototype.setSecurityList });
