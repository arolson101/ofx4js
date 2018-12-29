
import { OFXRuntimeException } from '../OFXRuntimeException'

/**
 * Thrown when a required attribute of an aggregate is null or empty.
 */
export class RequiredAttributeException extends OFXRuntimeException {

  constructor(message: string) {
    super(message);
  }
}
