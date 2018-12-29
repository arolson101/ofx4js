import { OFXException } from "../OFXException";


export class NoOFXResponseException extends OFXException {

  public constructor(message: string = null) {
    super(message);
  }
}
