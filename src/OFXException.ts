
export declare class Error {
    public name: string;
    public message: string;
    public stack: string;
    constructor(message?: string);
}


/**
 * Base exception class.
 */
export class OFXException extends Error {
  private innerError: Error;

  constructor(message: string = null, e: Error = null) {
    super(message);
    this.message = message;
    this.innerError = e;
  }
}
