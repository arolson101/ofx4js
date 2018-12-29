import { StatementRequest } from "../common/StatementRequest";
import { CreditCardAccountDetails } from "./CreditCardAccountDetails";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class CreditCardStatementRequest extends StatementRequest {

  private account: CreditCardAccountDetails;

  /**
   * The account details.
   *
   * @return The account details.
   */
  public getAccount(): CreditCardAccountDetails {
    return this.account;
  }

  /**
   * The account details.
   *
   * @param account The account details.
   */
  public setAccount(account: CreditCardAccountDetails): void {
    this.account = account;
  }
}

Aggregate_add( CreditCardStatementRequest, "CCSTMTRQ" );
ChildAggregate_add(CreditCardStatementRequest, { name: "CCACCTFROM", required: true, order: 0, type: CreditCardAccountDetails, read: CreditCardStatementRequest.prototype.getAccount, write: CreditCardStatementRequest.prototype.setAccount });
