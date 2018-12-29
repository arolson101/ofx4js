

import { OFXException } from "../../../OFXException";

/**
 * Severity of the status.
 */
export enum Severity {
  INFO,
  WARN,
  ERROR
}

export abstract class StatusCode {

  getCode(): number { throw new OFXException("abstract"); }

  getMessage(): string { throw new OFXException("abstract"); }

  getDefaultSeverity(): /*Status.*/Severity { throw new OFXException("abstract"); }
}
