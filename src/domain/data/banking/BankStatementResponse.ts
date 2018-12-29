import { StatementResponse } from "../common/StatementResponse";
import { BankAccountDetails } from "./BankAccountDetails";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class BankStatementResponse extends StatementResponse {

  private account: BankAccountDetails;

  public getResponseMessageName(): string {
    return "bank statement";
  }

  /**
   * The account for the statement.
   *
   * @return The account for the statement.
   */
  public getAccount(): BankAccountDetails {
    return this.account;
  }

  /**
   * The account for the statement.
   *
   * @param account The account for the statement.
   */
  public setAccount(account: BankAccountDetails): void {
    this.account = account;
  }

}

Aggregate_add( BankStatementResponse, "STMTRS" );
ChildAggregate_add(BankStatementResponse, { name:"BANKACCTFROM", order: 10, type: BankAccountDetails, read: BankStatementResponse.prototype.getAccount, write: BankStatementResponse.prototype.setAccount });
