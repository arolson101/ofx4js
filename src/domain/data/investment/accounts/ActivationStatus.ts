
/**
 * Activation status of an account.
 * @see "Section 13.6.2, OFX Spec"
 */
export enum ActivationStatus {
  ACTIVE,
  PENDING,
  AVAILABLE
}

export function ActivationStatus_fromOfx(ofxVal: string): ActivationStatus {
  if ("ACTIVE" === ofxVal) {
    return ActivationStatus.ACTIVE;
  } else if ("PEND" === ofxVal) {
    return ActivationStatus.PENDING;
  } else if ("AVAIL" === ofxVal) {
    return ActivationStatus.AVAILABLE;
  } else {
    return null;
  }
}
