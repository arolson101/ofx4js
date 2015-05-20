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
import {SecurityId} from "SecurityId";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";

/**
 * Security request aggregate.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityRequest {

  private securityId: SecurityId;
  private tickerSymbol: string;
  private fiId: string;

  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
    this.tickerSymbol = null;
    this.fiId = null;
  }

  public getTickerSymbol(): string {
    return this.tickerSymbol;
  }

  public setTickerSymbol(tickerSymbol: string): void {
    this.tickerSymbol = tickerSymbol;
    this.securityId = null;
    this.fiId = null;
  }

  public getFiId(): string {
    return this.fiId;
  }

  public setFiId(fiId: string): void {
    this.fiId = fiId;
    this.securityId = null;
    this.tickerSymbol = null;
  }
}

Aggregate_add(SecurityRequest, "SECRQ");
Element_add(SecurityRequest, { name: "SECID", order: 10, type: SecurityId, read: SecurityRequest.prototype.getSecurityId, write: SecurityRequest.prototype.setSecurityId });
Element_add(SecurityRequest, { name: "TICKER", order: 20, type: String, read: SecurityRequest.prototype.getTickerSymbol, write: SecurityRequest.prototype.setTickerSymbol });
Element_add(SecurityRequest, { name: "FIID", order: 30, type: String, read: SecurityRequest.prototype.getFiId, write: SecurityRequest.prototype.setFiId });


