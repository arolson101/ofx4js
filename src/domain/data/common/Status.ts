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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/Element_add'/>
///<reference path='StatusCode'/>

module ofx4js.domain.data.common {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Severity of the status.
 */
export enum Severity {
  INFO,
  WARN,
  ERROR
}


/**
 * Known status codes.
 */
export class KnownCode extends StatusCode {
  public static SUCCESS: KnownCode = new KnownCode(0, "Success", Severity.INFO);
  public static CLIENT_UP_TO_DATE: KnownCode = new KnownCode(1, "Client is up-to-date", Severity.INFO);
  public static GENERAL_ERROR: KnownCode = new KnownCode(2000, "General error.", Severity.ERROR);
  public static GENERAL_ACCOUNT_ERROR: KnownCode = new KnownCode(2002, "General account error.", Severity.ERROR);
  public static ACCOUNT_NOT_FOUND: KnownCode = new KnownCode(2003, "Account not found.", Severity.ERROR);
  public static ACCOUNT_CLOSED: KnownCode = new KnownCode(2004, "Account closed.", Severity.ERROR);
  public static ACCOUNT_NOT_AUTHORIZED: KnownCode = new KnownCode(2005, "Account not authorized.", Severity.ERROR);
  public static DATE_TOO_SOON: KnownCode = new KnownCode(2014, "Date too soon", Severity.ERROR);
  public static DUPLICATE_REQUEST: KnownCode = new KnownCode(2019, "Duplicate request.", Severity.ERROR);
  public static UNSUPPORTED_VERSION: KnownCode = new KnownCode(2021, "Unsupported version", Severity.ERROR);
  public static INVALID_TAN: KnownCode = new KnownCode(2022, "Invalid transaction authorization number.", Severity.ERROR);
  public static MFA_CHALLENGE_REQUIRED: KnownCode = new KnownCode(3000, "Further authentication required.", Severity.ERROR);
  public static MFA_CHALLENGE_FAILED: KnownCode = new KnownCode(3001, "MFA failed.", Severity.ERROR);
  public static PASSWORD_CHANGE_REQUIRED: KnownCode = new KnownCode(15000, "Password change required.", Severity.INFO);
  public static SIGNON_INVALID: KnownCode = new KnownCode(15500, "Invalid signon", Severity.ERROR);
  public static CUSTOMER_ACCOUNT_IN_USE: KnownCode = new KnownCode(15501, "Customer account in use.", Severity.ERROR);
  public static PASSWORD_LOCKED: KnownCode = new KnownCode(15502, "Password locked.", Severity.ERROR);
  public static INVALID_CLIENT_UID: KnownCode = new KnownCode(15510, "Invalid client UID.", Severity.ERROR);
  public static CONTACT_FI: KnownCode = new KnownCode(15511, "User must contact FI.", Severity.ERROR);
  public static AUTHTOKEN_REQUIRED: KnownCode = new KnownCode(15512, "Auth token required.", Severity.ERROR);
  public static INVALID_AUTHTOKEN: KnownCode = new KnownCode(15513, "Invalid auth token.", Severity.ERROR);
  public static NO_DATA: KnownCode = new KnownCode(14701, "No Tax Data for Account.", Severity.ERROR);
  public static DB_EXCEPTION: KnownCode = new KnownCode(14702,"Database error has occured.",Severity.ERROR);
  public static NO_TAXSUPPORT: KnownCode = new KnownCode(14703,"This Tax Year is not supported.",Severity.ERROR);
  
  static KnownCodes: KnownCode[] = [
    KnownCode.SUCCESS,
    KnownCode.CLIENT_UP_TO_DATE,
    KnownCode.GENERAL_ERROR,
    KnownCode.GENERAL_ACCOUNT_ERROR,
    KnownCode.ACCOUNT_NOT_FOUND,
    KnownCode.ACCOUNT_CLOSED,
    KnownCode.ACCOUNT_NOT_AUTHORIZED,
    KnownCode.DATE_TOO_SOON,
    KnownCode.DUPLICATE_REQUEST,
    KnownCode.UNSUPPORTED_VERSION,
    KnownCode.INVALID_TAN,
    KnownCode.MFA_CHALLENGE_REQUIRED,
    KnownCode.MFA_CHALLENGE_FAILED,
    KnownCode.PASSWORD_CHANGE_REQUIRED,
    KnownCode.SIGNON_INVALID,
    KnownCode.CUSTOMER_ACCOUNT_IN_USE,
    KnownCode.PASSWORD_LOCKED,
    KnownCode.INVALID_CLIENT_UID,
    KnownCode.CONTACT_FI,
    KnownCode.AUTHTOKEN_REQUIRED,
    KnownCode.INVALID_AUTHTOKEN,
    KnownCode.NO_DATA,
    KnownCode.DB_EXCEPTION,
    KnownCode.NO_TAXSUPPORT,
  ];

  private code: number;
  private message: string;
  private defaultSeverity: Severity;

  constructor(code: number, message: string, defaultSeverity: Severity) {
    super();
    this.code = code;
    this.message = message;
    this.defaultSeverity = defaultSeverity;
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public getDefaultSeverity(): Severity {
    return this.defaultSeverity;
  }

  public static fromCode(code: number): KnownCode {
    for (var i in KnownCode.KnownCodes) {
      var value: KnownCode = KnownCode.KnownCodes[i];
      if (value.getCode() == code) {
        return value;
      }
    }
    return null;
  }


  //@Override
  public toString(): string {
    return this.code.toString();
  }
}


/**
 * Transaction status element.
 *
 * @author Ryan Heaton
 * @see "Section 3.1.4, OFX Spec"
 */
export class Status {

  private code: StatusCode;
  private severity: Severity;
  private message: string;

  constructor() {
    this.code = KnownCode.SUCCESS;
    this.severity = undefined;
  }

  /**
   * Status code.
   *
   * @return The status code.
   */
  public getCode(): StatusCode {
    return this.code;
  }

  /**
   * Status code.
   *
   * @param code Status code.
   */
  public setCode(code: StatusCode): void {
    this.code = code;
    if (typeof this.severity === 'undefined') {
      this.severity = code.getDefaultSeverity();
    }
  }

  /**
   * The severity.
   *
   * @return The severity.
   */
  public getSeverity(): Severity {
    return this.severity;
  }

  /**
   * The severity.
   *
   * @param severity The severity.
   */
  public setSeverity(severity: Severity): void {
    this.severity = severity;
  }

  /**
   * Server-supplied message.
   *
   * @return Server-supplied message.
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Server-supplied message.
   *
   * @param message Server-supplied message.
   */
  public setMessage(message: string): void {
    this.message = message;
  }
}

Aggregate_add( Status, "STATUS" );
Element_add(Status, { name: "CODE", required: true, order: 0, type: StatusCode, read: Status.prototype.getCode, write: Status.prototype.setCode });
Element_add(Status, { name: "SEVERITY", required: true, order: 10, type: Severity, read: Status.prototype.getSeverity, write: Status.prototype.setSeverity });
Element_add(Status, { name: "MESSAGE", order: 20, type: String, read: Status.prototype.getMessage, write: Status.prototype.setMessage });

}
