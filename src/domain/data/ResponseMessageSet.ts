import { ResponseMessage } from "./ResponseMessage";
import { MessageSetType } from "./MessageSetType";


/**
 * A message set enclosed in a response envelope.
 */
export abstract class ResponseMessageSet /*implements Comparable<ResponseMessageSet>*/ {

  private version: string;

  public abstract getType(): MessageSetType

  constructor() {
    this.version = "1";
  }

  public cast<T extends this>(): T {
    return this as T;
  }

  /**
   * The version of this message set.
   *
   * @return The version of this message set.
   */
  public getVersion(): string {
    return this.version;
  }

  /**
   * The version of this message set.
   *
   * @param version The version of this message set.
   */
  public setVersion(version: string): void {
    this.version = version;
  }

  /**
   * The list of response messages.
   *
   * @return The list of response messages.
   */
  public abstract getResponseMessages(): Array<ResponseMessage>;
/*
  // Inherited.
  public compareTo(o: ResponseMessageSet): number {
    return getType().compareTo(o.getType());
  }
*/

  public static contentCompare(left: ResponseMessageSet, right: ResponseMessageSet): number {
    return left.getType() - right.getType();
  }
}
