import { OFXException, Error } from "../../OFXException";


/**
 * Error with a particular OFX connection.
 */
export class OFXConnectionException extends OFXException {

  public constructor(message: string, e: Error = null) {
    super(message, e);
  }

}
