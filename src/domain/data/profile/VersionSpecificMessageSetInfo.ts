import { MessageSetProfile } from "../MessageSetProfile";
import { CoreMessageSetInfo } from "./CoreMessageSetInfo";
import { MessageSetType } from "../MessageSetType";
import { ApplicationSecurity } from "../ApplicationSecurity";
import { SynchronizationCapability } from "./SynchronizationCapability";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * Information specific to a version of a message set.
 *
 * @see "Section 7.2.1, OFX Spec"
 */
export abstract class VersionSpecificMessageSetInfo implements MessageSetProfile {

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
  public abstract getMessageSetType(): MessageSetType;

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
