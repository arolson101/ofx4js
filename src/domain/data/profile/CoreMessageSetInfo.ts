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
///<reference path='../ApplicationSecurity'/>
///<reference path='SynchronizationCapability'/>

module ofx4js.domain.data.profile {

import ApplicationSecurity = ofx4js.domain.data.ApplicationSecurity;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Core information about a specific version of a specific message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
export class CoreMessageSetInfo {

  private version: string;
  private serviceProviderName: string;
  private url: string;
  private security: ApplicationSecurity;
  private sslRequired: boolean;
  private realm: string;
  private language: string;
  private syncCapability: SynchronizationCapability;
  private fileBasedErrorRecoverySupport: boolean;
  private timeout: number;
  
  constructor() {
    this.version = "1";
    this.language = "ENG"; //Locale.US.getISO3Language();
  }

  /**
   * Version of the message set.
   *
   * @return The version of the message set.
   */
  public getVersion(): string {
    return this.version;
  }

  /**
   * The version of the message set.
   *
   * @param version The version of the message set.
   */
  public setVersion(version: string): void {
    this.version = version;
  }

  /**
   * The name of the service provider (sometimes the message set processing is outsourced).
   *
   * @return The name of the service provider (sometimes the message set processing is outsourced).
   */
  public getServiceProviderName(): string {
    return this.serviceProviderName;
  }

  /**
   * The name of the service provider (sometimes the message set processing is outsourced).
   *
   * @param serviceProviderName The name of the service provider (sometimes the message set processing is outsourced).
   */
  public setServiceProviderName(serviceProviderName: string): void {
    this.serviceProviderName = serviceProviderName;
  }

  /**
   * The URL at which the message set is processed.
   *
   * @return The URL at which the message set is processed.
   */
  public getUrl(): string {
    return this.url;
  }

  /**
   * The URL at which the message set is processed.
   *
   * @param url The URL at which the message set is processed.
   */
  public setUrl(url: string): void {
    this.url = url;
  }

  /**
   * The application-level security required for this message set.
   *
   * @return The application-level security required for this message set.
   */
  public getSecurity(): ApplicationSecurity {
    return this.security;
  }

  /**
   * The application-level security required for this message set.
   *
   * @param security The application-level security required for this message set.
   */
  public setSecurity(security: ApplicationSecurity): void {
    this.security = security;
  }

  /**
   * Whether transport-level security is required for this message set.
   *
   * @return Whether transport-level security is required for this message set.
   */
  public getSslRequired(): boolean {
    return this.sslRequired;
  }

  /**
   * Whether transport-level security is required for this message set.
   *
   * @param sslRequired Whether transport-level security is required for this message set.
   */
  public setSslRequired(sslRequired: boolean): void {
    this.sslRequired = sslRequired;
  }

  /**
   * The sign-on realm.
   *
   * @return The sign-on realm.
   */
  public getRealm(): string {
    return this.realm;
  }

  /**
   * The sign-on realm.
   *
   * @param realm The sign-on realm.
   */
  public setRealm(realm: string): void {
    this.realm = realm;
  }

  /**
   * The language.
   *
   * @return The language.
   * @see java.util.Locale#getISO3Language()
   */
  public getLanguage(): string {
    return this.language;
  }

  /**
   * The language.
   *
   * @param language The language.
   */
  public setLanguage(language: string): void {
    this.language = language;
  }

  /**
   * The synchronization capability for this message set.
   *
   * @return The synchronization capability for this message set.
   */
  public getSyncCapability(): SynchronizationCapability {
    return this.syncCapability;
  }

  /**
   * The synchronization capability for this message set.
   *
   * @param syncCapability The synchronization capability for this message set.
   */
  public setSyncCapability(syncCapability: SynchronizationCapability): void {
    this.syncCapability = syncCapability;
  }

  /**
   * Whether there exists support for resposne-file based error recovery.
   *
   * @return Whether there exists support for resposne-file based error recovery.
   */
  public getFileBasedErrorRecoverySupport(): boolean {
    return this.fileBasedErrorRecoverySupport;
  }

  /**
   * Whether there exists support for resposne-file based error recovery.
   *
   * @param fileBasedErrorRecoverySupport Whether there exists support for resposne-file based error recovery.
   */
  public setFileBasedErrorRecoverySupport(fileBasedErrorRecoverySupport: boolean): void {
    this.fileBasedErrorRecoverySupport = fileBasedErrorRecoverySupport;
  }

  /**
   * Gets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
   * it. It likely is some type of timeout in seconds.
   *
   * @return the "INTU.TIMEOUT" property
   */
  public getIntuTimeout(): number {
    return this.timeout;
  }

  /**
   * Sets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
   * it. It likely is some type of timeout in seconds.
   *
   * @param timeout the "INTU.TIMEOUT" property
   */
  public setIntuTimeout(timeout: number): void {
    this.timeout = timeout;
  }
}

Aggregate_add( CoreMessageSetInfo, "MSGSETCORE" );
Element_add(CoreMessageSetInfo, { name: "VER", required: true, order: 0, type: String, read: CoreMessageSetInfo.prototype.getVersion, write: CoreMessageSetInfo.prototype.setVersion });
Element_add(CoreMessageSetInfo, { name: "SPNAME", order: 10, type: String, read: CoreMessageSetInfo.prototype.getServiceProviderName, write: CoreMessageSetInfo.prototype.setServiceProviderName });
Element_add(CoreMessageSetInfo, { name: "URL", required: true, order: 20, type: String, read: CoreMessageSetInfo.prototype.getUrl, write: CoreMessageSetInfo.prototype.setUrl });
Element_add(CoreMessageSetInfo, { name: "OFXSEC", required: true, order: 30, type: ApplicationSecurity, read: CoreMessageSetInfo.prototype.getSecurity, write: CoreMessageSetInfo.prototype.setSecurity });
Element_add(CoreMessageSetInfo, { name: "TRANSPSEC", required: true, order: 40, type: Boolean, read: CoreMessageSetInfo.prototype.getSslRequired, write: CoreMessageSetInfo.prototype.setSslRequired });
Element_add(CoreMessageSetInfo, { name: "SIGNONREALM", required: true, order: 50, type: String, read: CoreMessageSetInfo.prototype.getRealm, write: CoreMessageSetInfo.prototype.setRealm });
Element_add(CoreMessageSetInfo, { name: "LANGUAGE", required: true, order: 60, type: String, read: CoreMessageSetInfo.prototype.getLanguage, write: CoreMessageSetInfo.prototype.setLanguage });
Element_add(CoreMessageSetInfo, { name: "SYNCMODE", required: true, order: 70, type: SynchronizationCapability, read: CoreMessageSetInfo.prototype.getSyncCapability, write: CoreMessageSetInfo.prototype.setSyncCapability });
Element_add(CoreMessageSetInfo, { name: "RESPFILEER", required: true, order: 80, type: Boolean, read: CoreMessageSetInfo.prototype.getFileBasedErrorRecoverySupport, write: CoreMessageSetInfo.prototype.setFileBasedErrorRecoverySupport });
Element_add(CoreMessageSetInfo, { name: "INTU.TIMEOUT", order: 90, type: Number, read: CoreMessageSetInfo.prototype.getIntuTimeout, write: CoreMessageSetInfo.prototype.setIntuTimeout });

}
