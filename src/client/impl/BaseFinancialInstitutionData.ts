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
///<reference path='../../client/FinancialInstitutionData'/>

module ofx4js.client.impl {

import FinancialInstitutionData = ofx4js.client.FinancialInstitutionData;

//import java.net.URL;

/**
 * Base bean for FI data.
 *
 * @author Ryan Heaton
 */
export class BaseFinancialInstitutionData implements FinancialInstitutionData {

  private id: string;
  private fid: string;
  private name: string;
  private organization: string;
  private ofxUrl: string;
  private brokerId: string;

  public constructor(id?: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getFinancialInstitutionId(): string {
    return this.fid;
  }

  public setFinancialInstitutionId(id: string): void {
    this.fid = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getOrganization(): string {
    return this.organization;
  }

  public setOrganization(organization: string): void {
    this.organization = organization;
  }

  public getOFXURL(): string {
    return this.ofxUrl;
  }

  public setOFXURL(OFXURL: string): void {
    this.ofxUrl = OFXURL;
  }

  public getBrokerId(): string {
    return this.brokerId;
  }

  public setBrokerId(brokerId: string): void {
    this.brokerId = brokerId;
  }
}

}
