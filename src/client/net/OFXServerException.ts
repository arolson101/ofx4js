import { OFXConnectionException } from "./OFXConnectionException";


export class OFXServerException extends OFXConnectionException {

  private httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);
    this.httpCode = httpCode;
  }

  public getHttpCode(): number {
    return this.httpCode;
  }
}
