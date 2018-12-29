import { OFXException } from "./OFXException";


/**
 * Thrown for unsupported OFX security type.
 */
export class UnsupportedOFXSecurityTypeException extends OFXException {
  constructor(message: string) {
    super(message);
  }
}
