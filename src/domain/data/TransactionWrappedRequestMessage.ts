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
import UUID from 'uuid';
import { RequestMessage } from './RequestMessage';
import { Element_add } from '../../meta/Element_add';

/**
 * A request message wrapped in a transaction.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.6, OFX Spec"
 */
export abstract class TransactionWrappedRequestMessage<M extends RequestMessage> extends RequestMessage {

  private UID: string;
  private clientCookie: string;
  private transactionAuthorizationNumber: string;

  constructor(UID: string = UUID.v1()) {
    super();
    this.UID = UID;
  }

  /**
   * UID of this transaction.
   *
   * @return UID of this transaction.
   */
  public getUID(): string {
    return this.UID;
  }

  /**
   * UID of this transaction.
   *
   * @param UID UID of this transaction.
   */
  public setUID(UID: string): void {
    this.UID = UID;
  }

  /**
   * Client cookie (echoed back by the response).
   *
   * @return Client cookie (echoed back by the response).
   */
  public getClientCookie(): string {
    return this.clientCookie;
  }

  /**
   * Client cookie (echoed back by the response).
   *
   * @param clientCookie Client cookie (echoed back by the response).
   */
  public setClientCookie(clientCookie: string): void {
    this.clientCookie = clientCookie;
  }

  /**
   * The transaction authorization number.
   *
   * @return The transaction authorization number.
   */
  public getTransactionAuthorizationNumber(): string {
    return this.transactionAuthorizationNumber;
  }

  /**
   * The transaction authorization number.
   *
   * @param transactionAuthorizationNumber The transaction authorization number.
   */
  public setTransactionAuthorizationNumber(transactionAuthorizationNumber: string): void {
    this.transactionAuthorizationNumber = transactionAuthorizationNumber;
  }

  /**
   * Set the wrapped message.
   *
   * @param message The wrapped message.
   */
  public abstract setWrappedMessage(message: M): void;

}

Element_add(TransactionWrappedRequestMessage, { name: "TRNUID", required: true, order: 0, type: String, read: TransactionWrappedRequestMessage.prototype.getUID, write: TransactionWrappedRequestMessage.prototype.setUID });
Element_add(TransactionWrappedRequestMessage, { name: "CLTCOOKIE", order: 10, type: String, read: TransactionWrappedRequestMessage.prototype.getClientCookie, write: TransactionWrappedRequestMessage.prototype.setClientCookie });
Element_add(TransactionWrappedRequestMessage, { name: "TAN", order: 20, type: String, read: TransactionWrappedRequestMessage.prototype.getTransactionAuthorizationNumber, write: TransactionWrappedRequestMessage.prototype.setTransactionAuthorizationNumber });
