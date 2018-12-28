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
import { ResponseMessage } from "../ResponseMessage";
import { StatusHolder } from "../common/StatusHolder";
import { Status } from "../common/Status";
import { FinancialInstitutionInfo } from "./FinancialInstitution";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";
import { Element_add } from "../../../meta/Element_add";

/**
 * The signon response message.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.1.2, OFX Spec."
 */
export class SignonResponse extends ResponseMessage implements StatusHolder {

  private status: Status;
  private timestamp: Date;
  private userKey: string;
  private userKeyExpiration: Date;
  private language: string;
  private profileLastUpdated: Date;
  private accountLastUpdated: Date;
  private financialInstitution: FinancialInstitutionInfo;
  private sessionId: string;
  private accessKey: string;

  constructor() {
    super();
    this.language = "ENG"; //Locale.US.getISO3Language();
  }

  public getResponseMessageName(): string {
    return "signon";
  }

  public getStatusHolderName(): string {
    return this.getResponseMessageName();
  }

  /**
   * The signon response status.
   *
   * @return The signon response status.
   */
  public getStatus(): Status {
    return this.status;
  }

  /**
   * The signon response status.
   *
   * @param status The signon response status.
   */
  public setStatus(status: Status): void {
    this.status = status;
  }

  /**
   * The timestamp of this response.
   *
   * @return The timestamp of this response.
   */
  public getTimestamp(): Date {
    return this.timestamp;
  }

  /**
   * The timestamp of this response.
   *
   * @param timestamp The timestamp of this response.
   */
  public setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }

  /**
   * The userkey that can be used instead of the username/password.
   *
   * @return The userkey that can be used instead of the username/password.
   */
  public getUserKey(): string {
    return this.userKey;
  }

  /**
   * The userkey that can be used instead of the username/password.
   *
   * @param userKey The userkey that can be used instead of the username/password.
   */
  public setUserKey(userKey: string): void {
    this.userKey = userKey;
  }

  /**
   * The date/time of the expiration of the user key.
   *
   * @return The date/time of the expiration of the user key.
   */
  public getUserKeyExpiration(): Date {
    return this.userKeyExpiration;
  }

  /**
   * The date/time of the expiration of the user key.
   *
   * @param userKeyExpiration The date/time of the expiration of the user key.
   */
  public setUserKeyExpiration(userKeyExpiration: Date): void {
    this.userKeyExpiration = userKeyExpiration;
  }

  /**
   * The three-letter langauge code.
   *
   * @return The three-letter langauge code.
   * @see java.util.Locale#getISO3Language()
   */
  public getLanguage(): string {
    return this.language;
  }

  /**
   * The three-letter langauge code.
   *
   * @param language The three-letter langauge code.
   */
  public setLanguage(language: string): void {
    this.language = language;
  }

  /**
   * The date/time that the FI profile was last updated.
   *
   * @return The date/time that the FI profile was last updated.
   */
  public getProfileLastUpdated(): Date {
    return this.profileLastUpdated;
  }

  /**
   * The date/time that the FI profile was last updated.
   *
   * @param profileLastUpdated The date/time that the FI profile was last updated.
   */
  public setProfileLastUpdated(profileLastUpdated: Date): void {
    this.profileLastUpdated = profileLastUpdated;
  }

  /**
   * The date/time that the user's account information was updated.
   *
   * @return The date/time that the user's account information was updated.
   */
  public getAccountLastUpdated(): Date {
    return this.accountLastUpdated;
  }

  /**
   * The date/time that the user's account information was updated.
   *
   * @param accountLastUpdated The date/time that the user's account information was updated.
   */
  public setAccountLastUpdated(accountLastUpdated: Date): void {
    this.accountLastUpdated = accountLastUpdated;
  }

  /**
   * The financial instutution identity information.
   *
   * @return The financial instutution identity information.
   */
  public getFinancialInstitution(): FinancialInstitutionInfo {
    return this.financialInstitution;
  }

  /**
   * The financial instutution identity information.
   *
   * @param financialInstitution The financial instutution identity information.
   */
  public setFinancialInstitution(financialInstitution: FinancialInstitutionInfo): void {
    this.financialInstitution = financialInstitution;
  }

  /**
   * The session id for the client.
   *
   * @return The session id for the client.
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * The session id for the client.
   *
   * @param sessionId The session id for the client.
   */
  public setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  /**
   * The access key that the client should return in the next sign-on requuest.
   *
   * @return The access key that the client should return in the next sign-on requuest.
   */
  public getAccessKey(): string {
    return this.accessKey;
  }

  /**
   * The access key that the client should return in the next sign-on requuest.
   *
   * @param accessKey The access key that the client should return in the next sign-on requuest.
   */
  public setAccessKey(accessKey: string): void {
    this.accessKey = accessKey;
  }
}

Aggregate_add( SignonResponse, "SONRS" );
ChildAggregate_add(SignonResponse, { required: true, order: 0, type: Status, read: SignonResponse.prototype.getStatus, write: SignonResponse.prototype.setStatus });
Element_add(SignonResponse, { name: "DTSERVER", required: true, order: 10, type: Date, read: SignonResponse.prototype.getTimestamp, write: SignonResponse.prototype.setTimestamp });
Element_add(SignonResponse, { name: "USERKEY", order: 20, type: String, read: SignonResponse.prototype.getUserKey, write: SignonResponse.prototype.setUserKey });
Element_add(SignonResponse, { name: "TSKEYEXPIRE", order: 30, type: Date, read: SignonResponse.prototype.getUserKeyExpiration, write: SignonResponse.prototype.setUserKeyExpiration });
Element_add(SignonResponse, { name: "LANGUAGE", required: true, order: 40, type: String, read: SignonResponse.prototype.getLanguage, write: SignonResponse.prototype.setLanguage });
Element_add(SignonResponse, { name: "DTPROFUP", order: 50, type: Date, read: SignonResponse.prototype.getProfileLastUpdated, write: SignonResponse.prototype.setProfileLastUpdated });
Element_add(SignonResponse, { name: "DTACCTUP", order: 60, type: Date, read: SignonResponse.prototype.getAccountLastUpdated, write: SignonResponse.prototype.setAccountLastUpdated });
ChildAggregate_add(SignonResponse, { order: 70, type: FinancialInstitutionInfo, read: SignonResponse.prototype.getFinancialInstitution, write: SignonResponse.prototype.setFinancialInstitution });
Element_add(SignonResponse, { name: "SESSCOOKIE", order: 80, type: String, read: SignonResponse.prototype.getSessionId, write: SignonResponse.prototype.setSessionId });
Element_add(SignonResponse, { name: "ACCESSKEY", order: 90, type: String, read: SignonResponse.prototype.getAccessKey, write: SignonResponse.prototype.setAccessKey });
