import { Aggregate_add } from "../../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../../meta/Element_add";


/**
 * Client Enrollment option, contains indicator as to whether the account number is required as part of enrollment
 * @see "Section 8.8 OFX Spec"
 */
export class ClientEnrollment {

  private accountRequired: boolean;

  /**
   * Y if account number is required as part of enrollment
   * @return Boolean
   */
  public getAccountRequired(): boolean {
    return this.accountRequired;
  }

  public setAccountRequired(accountRequired: boolean): void {
    this.accountRequired = accountRequired;
  }

}

Aggregate_add( ClientEnrollment, "CLIENTENROLL" );
Element_add(ClientEnrollment, { name: "ACCTREQUIRED", required: true, order: 0, type: Boolean, read: ClientEnrollment.prototype.getAccountRequired, write: ClientEnrollment.prototype.setAccountRequired });
