import { RequestMessage } from "./RequestMessage";
import { MessageSetType } from "./MessageSetType";


 /**
 * A message set enclosed in an OFX request envelope.
 */
export abstract class RequestMessageSet /*implements Comparable<RequestMessageSet>*/ {

  private version: string;

  public abstract getType(): MessageSetType;

  constructor() {
    this.version = "1";
  }

  public cast<T extends this>(): T {
    return this as T;
  }

  /**
   * The version of this request message.
   *
   * @return The version of this request message.
   */
  public getVersion(): string {
    return this.version;
  }

  /**
   * The version of this request message.
   *
   * @param version The version of this request message.
   */
  public setVersion(version: string): void {
    this.version = version;
  }

  /**
   * The request messages for this request message set.
   *
   * @return The request messages for this request message set.
   */
  public abstract getRequestMessages(): Array<RequestMessage>;

  // Inherited.
  /*public compareTo(o: RequestMessageSet): number {
    return getType().compareTo(o.getType());
  }*/

  public static contentCompare(left: RequestMessageSet, right: RequestMessageSet): number {
    return left.getType() - right.getType();
  }

}
