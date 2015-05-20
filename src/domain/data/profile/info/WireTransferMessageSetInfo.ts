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
import {WireTransferV1MessageSetInfo} from "WireTransferV1MessageSetInfo";
import {AbstractMessageSetInfo} from "../AbstractMessageSetInfo";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";

/**
 * @author Ryan Heaton
 */
export class WireTransferMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: WireTransferV1MessageSetInfo;

  public getVersion1Info(): WireTransferV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: WireTransferV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( WireTransferMessageSetInfo, "WIREXFERMSGSET" );
ChildAggregate_add(WireTransferMessageSetInfo, { order: 0, type: WireTransferV1MessageSetInfo, read: WireTransferMessageSetInfo.prototype.getVersion1Info, write: WireTransferMessageSetInfo.prototype.setVersion1Info });


