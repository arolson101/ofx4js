
/**
 * Type of action for closing a stock option.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum CloseOptionAction {
  EXERCISE,
  ASSIGN,
  EXPIRE
}

export function CloseOptionAction_fromOfx(ofxVal: string): CloseOptionAction {
  if ("EXERCISE" === ofxVal) {
    return CloseOptionAction.EXERCISE;
  } else if ("ASSIGN" === ofxVal) {
    return CloseOptionAction.ASSIGN;
  } else if ("EXPIRE" === ofxVal) {
    return CloseOptionAction.EXPIRE;
  } else {
    return null;
  }
}
