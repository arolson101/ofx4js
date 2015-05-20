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
import {CoreMessageSetInfo} from "CoreMessageSetInfo";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";
import {MessageSetProfile} from "../MessageSetProfile";
import {ApplicationSecurity} from "../ApplicationSecurity";
import {MessageSetType} from "../MessageSetType";
import {SynchronizationCapability} from "SynchronizationCapability";

/**
 * Information specific to a version of a message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
export /*abstract*/ class VersionSpecificMessageSetInfo implements MessageSetProfile {

  private core: CoreMessageSetInfo;

  /**
   * The information core.
   *
   * @return The information core.
   */
  public getCore(): CoreMessageSetInfo {
    return this.core;
  }

  /**
   * The information core.
   *
   * @param core The information core.
   */
  public setCore(core: CoreMessageSetInfo): void {
    this.core = core;
  }

  /**
   * The message set type.
   *
   * @return The message set type.
   */
  public /*abstract*/ getMessageSetType(): MessageSetType { throw new Error("abstract"); }

  public getVersion(): string {
    return this.core != null ? this.core.getVersion() : null;
  }

  public getServiceProviderName(): string {
    return this.core != null ? this.core.getServiceProviderName() : null;
  }

  public getUrl(): string {
    return this.core != null ? this.core.getUrl() : null;
  }

  public getSecurity(): ApplicationSecurity {
    return this.core != null ? this.core.getSecurity() : null;
  }

  public isSslRequired(): boolean {
    return this.core != null && this.core.getSslRequired() != null ? this.core.getSslRequired() : true;
  }

  public getRealm(): string {
    return this.core != null ? this.core.getRealm() : null;
  }

  public getLanguage(): string {
    return this.core != null ? this.core.getLanguage() : null;
  }

  public getSyncCapability(): SynchronizationCapability {
    return this.core != null ? this.core.getSyncCapability() : null;
  }

  public hasFileBasedErrorRecoverySupport(): boolean {
    return this.core != null && this.core.getFileBasedErrorRecoverySupport() != null ? this.core.getFileBasedErrorRecoverySupport() : false;
  }
}

ChildAggregate_add(VersionSpecificMessageSetInfo, { order: 0, type: CoreMessageSetInfo, read: VersionSpecificMessageSetInfo.prototype.getCore, write: VersionSpecificMessageSetInfo.prototype.setCore });

