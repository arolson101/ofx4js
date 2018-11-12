/*
 * Copyright 2008 Web Cohesion
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
import { AbstractMessageSetInfo } from "../AbstractMessageSetInfo";
import { CreditCardV1MessageSetInfo } from "./CreditCardV1MessageSetInfo";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * @author Ryan Heaton
 */
export class CreditCardMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: CreditCardV1MessageSetInfo;

  public getVersion1Info(): CreditCardV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: CreditCardV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( CreditCardMessageSetInfo, "CREDITCARDMSGSET" );
ChildAggregate_add(CreditCardMessageSetInfo, { order: 0, type: CreditCardV1MessageSetInfo, read: CreditCardMessageSetInfo.prototype.getVersion1Info, write: CreditCardMessageSetInfo.prototype.setVersion1Info });
