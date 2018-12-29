import { OFXException } from "./OFXException";


export class OFXTransactionException extends OFXException {
  public constructor(message: string = null) {
    super(message);
  }
}
