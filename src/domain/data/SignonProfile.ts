import { CharacterType } from "./profile/CharacterType";


export interface SignonProfile {
  /**
   * The name of the sign-on realm.
   *
   * @return The name of the sign-on realm.
   */
  getRealm(): string;

  /**
   * The minimum number of password characters.
   *
   * @return The minimum number of password characters.
   */
  getMinPasswordCharacters(): number;

  /**
   * The maximum number of password characters.
   *
   * @return The maximum number of password characters.
   */
  getMaxPasswordCharacters(): number;

  /**
   * The type of password characters supported.
   *
   * @return The type of password characters supported.
   */
  getPasswordCharacterType(): CharacterType;

  /**
   * Whether the password is case-sensitive.
   *
   * @return Whether the password is case-sensitive.
   */
  getPasswordCaseSensitive(): boolean;

  /**
   * Whether special characters are allowed in the password.
   *
   * @return Whether special characters are allowed in the password.
   */
  getPasswordSpecialCharsAllowed(): boolean;

  /**
   * Whether spaces are allowed in the password.
   *
   * @return Whether spaces are allowed in the password.
   */
  getPasswordSpacesAllowed(): boolean;

  /**
   * Whether the server can process a password change request for this realm.
   *
   * @return Whether the server can process a password change request for this realm.
   */
  getChangePasswordSupported(): boolean;

  /**
   * Whether the server requires the user to change their password as part of their first signon.
   *
   * @return Whether the server requires the user to change their password as part of their first signon.
   */
  getChangePasswordFirstRequired(): boolean;

  /**
   * Label for a set of additional credentials that the user must supply.
   *
   * @return Label for a set of additional credentials that the user must supply.
   */
  getAdditionalCredientialsLabel1(): string;

  /**
   * Label for a set of additional credentials that the user must supply.
   *
   * @return Label for a set of additional credentials that the user must supply.
   */
  getAdditionalCredientialsLabel2(): string;

  /**
   * Whether a client UID is required for teh sign-on.
   *
   * @return Whether a client UID is required for teh sign-on.
   */
  getClientUIDRequired(): boolean;

  /**
   * Whether an auth token is required for the sign-on.
   *
   * @return Whether an auth token is required for the sign-on.
   */
  getAuthTokenRequiredForFirstSignon(): boolean;

  /**
   * The label of the auth token.
   *
   * @return The label of the auth token.
   */
  getAuthTokenLabel(): string;

  /**
   * The URL for the auth token information.
   *
   * @return The URL for the auth token information.
   */
  getAuthTokenInfoURL(): string;

  /**
   * Whether MFA is supported.
   *
   * @return Whether MFA is supported.
   */
  getMfaSupported(): boolean;

  /**
   * Whether an MFA challenge request is required for the first sign-on into this realm.
   *
   * @return Whether an MFA challenge request is required for the first sign-on into this realm.
   */
  getMfaChallengeRequiredForFirstSignon(): boolean;
}
