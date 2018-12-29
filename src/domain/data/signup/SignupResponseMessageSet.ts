import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ResponseMessageSet } from "../ResponseMessageSet";
import { AccountInfoResponseTransaction } from "./AccountInfoResponseTransaction";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class SignupResponseMessageSet extends ResponseMessageSet {

  private accountInfoResponse: AccountInfoResponseTransaction;

  public getType(): MessageSetType {
    return MessageSetType.signup;
  }

  /**
   * The account info response.
   *
   * @return The account info response.
   */
  public getAccountInfoResponse(): AccountInfoResponseTransaction {
    return this.accountInfoResponse;
  }

  /**
   * The account info response.
   *
   * @param accountInfoResponse The account info response.
   */
  public setAccountInfoResponse(accountInfoResponse: AccountInfoResponseTransaction): void {
    this.accountInfoResponse = accountInfoResponse;
  }

  /**
   * The response messages.
   *
   * @return The response messages.
   */
  public getResponseMessages(): Array<ResponseMessage> {
    var messages: Array<ResponseMessage> = new Array<ResponseMessage>();

    if (this.getAccountInfoResponse() != null) {
      messages.push(this.getAccountInfoResponse());
    }

    return messages;
  }
}

Aggregate_add(SignupResponseMessageSet, "SIGNUPMSGSRSV1");
ChildAggregate_add(SignupResponseMessageSet, { order: 0, type: AccountInfoResponseTransaction, read: SignupResponseMessageSet.prototype.getAccountInfoResponse, write: SignupResponseMessageSet.prototype.setAccountInfoResponse });
