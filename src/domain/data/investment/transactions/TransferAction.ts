
/**
 * Type of transfer.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export enum TransferAction {
  IN,
  OUT
}

export function TransferAction_fromOfx(ofxVal: string): TransferAction {
  if ("IN" === ofxVal) {
    return TransferAction.IN;
  } else if ("OUT" === ofxVal) {
    return TransferAction.OUT;
  } else {
    return null;
  }
}
