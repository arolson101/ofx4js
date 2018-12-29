import { Status } from "./Status";


/**
 * A status holder (usually applied to a response).
 */
export interface StatusHolder {

  /**
   * The name of this status holder (for error reporting).
   *
   * @return The name of this status holder (for error reporting).
   */
  getStatusHolderName(): string;

  /**
   * Get the status.
   *
   * @return The status.
   */
  getStatus(): Status;
}


export function instanceof_StatusHolder(obj: any) : boolean {
   return (obj instanceof Object
       && (typeof obj.getStatusHolderName === 'function')
       && (typeof obj.getStatus === 'function'));
}
