import { OFXException } from '../OFXException'

export class OFXParseException extends OFXException {

  constructor(message: string) {
    super(message);
  }
}
