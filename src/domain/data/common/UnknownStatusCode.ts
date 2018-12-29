import { Severity, StatusCode } from "./StatusCode";

/**
 * Holder for an unknown status code.
 */
export class UnknownStatusCode extends StatusCode {

  private code: number;
  private message: string;
  private defaultSeverity: /*Status.*/Severity;

  constructor(code: number, message: string, defaultSeverity: /*Status.*/Severity) {
    super();
    this.code = code;
    this.message = message;
    this.defaultSeverity = defaultSeverity;
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public getDefaultSeverity(): /*Status.*/Severity {
    return this.defaultSeverity;
  }

  //@Override
  public toString(): string {
    return this.code.toString();
  }
}
