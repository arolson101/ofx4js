
/**
 * The message set type, used to define message set order in the envelope.
 *
 * @see "Section 2.4.5.2, OFX spec"
 */
export enum MessageSetType {

  signon,

  signup,

  banking,

  creditcard,

  investment,

  interbank_transfer,

  wire_transfer,

  payments,

  email,

  investment_security,

  profile,

  tax1099

}
