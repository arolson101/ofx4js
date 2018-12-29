import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * Identifier for a security.
 * @see "Section 13.8.1, OFX Spec"
 */
export class SecurityId {

  private uniqueId: string;
  private uniqueIdType: string;

  /**
   * Gets the unique id for the security. This is a required field according to the OFX spec.
   *
   * @return the unique id
   */
  public getUniqueId(): string {
    return this.uniqueId;
  }

  /**
   * Sets the unique id for the security. This is a required field according to the OFX spec.
   *
   * @param uniqueId the unique id
   */
  public setUniqueId(uniqueId: string): void {
    this.uniqueId = uniqueId;
  }

  /**
   * Gets the type of unique id.
   *
   * @return the type of unique id
   */
  public getUniqueIdType(): string {
    return this.uniqueIdType;
  }

  /**
   * Sets the type of unique id.
   *
   * @param uniqueIdType the type of unique id
   */
  public setUniqueIdType(uniqueIdType: string): void {
    this.uniqueIdType = uniqueIdType;
  }
}

Aggregate_add( SecurityId, "SECID" );
Element_add(SecurityId, { name: "UNIQUEID", required: true, order: 10, type: String, read: SecurityId.prototype.getUniqueId, write: SecurityId.prototype.setUniqueId });
Element_add(SecurityId, { name: "UNIQUEIDTYPE", required: true, order: 20, type: String, read: SecurityId.prototype.getUniqueIdType, write: SecurityId.prototype.setUniqueIdType });
