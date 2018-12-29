import { OFXParseException } from "./OFXParseException";

export class OFXSyntaxException extends OFXParseException {

  constructor(message: string) {
    super(message);
  }
}
