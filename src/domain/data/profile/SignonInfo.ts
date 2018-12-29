import { SignonProfile } from "../SignonProfile";
import { CharacterType } from "./CharacterType";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * Sign-on information
 *
 * @see "Section 7.2.2, OFX Spec"
 */
export class SignonInfo implements SignonProfile {

  private realm: string;
  private minPasswordCharacters: number;
  private maxPasswordCharacters: number;
  private passwordCharacterType: CharacterType;
  private passwordCaseSensitive: boolean;
  private passwordSpecialCharsAllowed: boolean;
  private passwordSpacesAllowed: boolean;
  private changePasswordSupported: boolean;
  private changePasswordFirstRequired: boolean;
  private additionalCredientialsLabel1: string;
  private additionalCredientialsLabel2: string;
  private clientUIDRequired: boolean;
  private authTokenRequiredForFirstSignon: boolean;
  private authTokenLabel: string;
  private authTokenInfoURL: string;
  private mfaSupported: boolean;
  private mfaChallengeRequiredForFirstSignon: boolean;

  constructor() {
    this.passwordCaseSensitive = true;
    this.passwordSpecialCharsAllowed = true;
    this.passwordSpacesAllowed = true;
  }

  /**
   * The name of the sign-on realm.
   *
   * @return The name of the sign-on realm.
   */
  public getRealm(): string {
    return this.realm;
  }

  /**
   * The name of the sign-on realm.
   *
   * @param realm The name of the sign-on realm.
   */
  public setRealm(realm: string): void {
    this.realm = realm;
  }

  /**
   * The minimum number of password characters.
   *
   * @return The minimum number of password characters.
   */
  public getMinPasswordCharacters(): number {
    return this.minPasswordCharacters;
  }

  /**
   * The minimum number of password characters.
   *
   * @param minPasswordCharacters The minimum number of password characters.
   */
  public setMinPasswordCharacters(minPasswordCharacters: number): void {
    this.minPasswordCharacters = minPasswordCharacters;
  }

  /**
   * The maximum number of password characters.
   *
   * @return The maximum number of password characters.
   */
  public getMaxPasswordCharacters(): number {
    return this.maxPasswordCharacters;
  }

  /**
   * The maximum number of password characters.
   *
   * @param maxPasswordCharacters The maximum number of password characters.
   */
  public setMaxPasswordCharacters(maxPasswordCharacters: number): void {
    this.maxPasswordCharacters = maxPasswordCharacters;
  }

  /**
   * The type of password characters supported.
   *
   * @return The type of password characters supported.
   */
  public getPasswordCharacterType(): CharacterType {
    return this.passwordCharacterType;
  }

  /**
   * The type of password characters supported.
   *
   * @param passwordCharacterType The type of password characters supported.
   */
  public setPasswordCharacterType(passwordCharacterType: CharacterType): void {
    this.passwordCharacterType = passwordCharacterType;
  }

  /**
   * Whether the password is case-sensitive.
   *
   * @return Whether the password is case-sensitive.
   */
  public getPasswordCaseSensitive(): boolean {
    return this.passwordCaseSensitive;
  }

  /**
   * Whether the password is case-sensitive.
   *
   * @param passwordCaseSensitive Whether the password is case-sensitive.
   */
  public setPasswordCaseSensitive(passwordCaseSensitive: boolean): void {
    this.passwordCaseSensitive = passwordCaseSensitive;
  }

  /**
   * Whether special characters are allowed in the password.
   *
   * @return Whether special characters are allowed in the password.
   */
  public getPasswordSpecialCharsAllowed(): boolean {
    return this.passwordSpecialCharsAllowed;
  }

  /**
   * Whether special characters are allowed in the password.
   *
   * @param passwordSpecialCharsAllowed Whether special characters are allowed in the password.
   */
  public setPasswordSpecialCharsAllowed(passwordSpecialCharsAllowed: boolean): void {
    this.passwordSpecialCharsAllowed = passwordSpecialCharsAllowed;
  }

  /**
   * Whether spaces are allowed in the password.
   *
   * @return Whether spaces are allowed in the password.
   */
  public getPasswordSpacesAllowed(): boolean {
    return this.passwordSpacesAllowed;
  }

  /**
   * Whether spaces are allowed in the password.
   *
   * @param passwordSpacesAllowed Whether spaces are allowed in the password.
   */
  public setPasswordSpacesAllowed(passwordSpacesAllowed: boolean): void {
    this.passwordSpacesAllowed = passwordSpacesAllowed;
  }

  /**
   * Whether the server can process a password change request for this realm.
   *
   * @return Whether the server can process a password change request for this realm.
   */
  public getChangePasswordSupported(): boolean {
    return this.changePasswordSupported;
  }

  /**
   * Whether the server can process a password change request for this realm.
   *
   * @param changePasswordSupported Whether the server can process a password change request for this realm.
   */
  public setChangePasswordSupported(changePasswordSupported: boolean): void {
    this.changePasswordSupported = changePasswordSupported;
  }

  /**
   * Whether the server requires the user to change their password as part of their first signon.
   *
   * @return Whether the server requires the user to change their password as part of their first signon.
   */
  public getChangePasswordFirstRequired(): boolean {
    return this.changePasswordFirstRequired;
  }

  /**
   * Whether the server requires the user to change their password as part of their first signon.
   *
   * @param changePasswordFirstRequired Whether the server requires the user to change their password as part of their first signon.
   */
  public setChangePasswordFirstRequired(changePasswordFirstRequired: boolean): void {
    this.changePasswordFirstRequired = changePasswordFirstRequired;
  }

  /**
   * Label for a set of additional credentials that the user must supply.
   *
   * @return Label for a set of additional credentials that the user must supply.
   */
  public getAdditionalCredientialsLabel1(): string {
    return this.additionalCredientialsLabel1;
  }

  /**
   * Label for a set of additional credentials that the user must supply.
   *
   * @param additionalCredientialsLabel1 Label for a set of additional credentials that the user must supply.
   */
  public setAdditionalCredientialsLabel1(additionalCredientialsLabel1: string): void {
    this.additionalCredientialsLabel1 = additionalCredientialsLabel1;
  }

  /**
   * Label for a set of additional credentials that the user must supply.
   *
   * @return Label for a set of additional credentials that the user must supply.
   */
  public getAdditionalCredientialsLabel2(): string {
    return this.additionalCredientialsLabel2;
  }

  /**
   * Label for a set of additional credentials that the user must supply.
   *
   * @param additionalCredientialsLabel2 Label for a set of additional credentials that the user must supply.
   */
  public setAdditionalCredientialsLabel2(additionalCredientialsLabel2: string): void {
    this.additionalCredientialsLabel2 = additionalCredientialsLabel2;
  }

  /**
   * Whether a client UID is required for teh sign-on.
   *
   * @return Whether a client UID is required for teh sign-on.
   */
  public getClientUIDRequired(): boolean {
    return this.clientUIDRequired;
  }

  /**
   * Whether a client UID is required for teh sign-on.
   *
   * @param clientUIDRequired Whether a client UID is required for teh sign-on.
   */
  public setClientUIDRequired(clientUIDRequired: boolean): void {
    this.clientUIDRequired = clientUIDRequired;
  }

  /**
   * Whether an auth token is required for the sign-on.
   *
   * @return Whether an auth token is required for the sign-on.
   */
  public getAuthTokenRequiredForFirstSignon(): boolean {
    return this.authTokenRequiredForFirstSignon;
  }

  /**
   * Whether an auth token is required for the sign-on.
   *
   * @param authTokenRequiredForFirstSignon
   *         Whether an auth token is required for the sign-on.
   */
  public setAuthTokenRequiredForFirstSignon(authTokenRequiredForFirstSignon: boolean): void {
    this.authTokenRequiredForFirstSignon = authTokenRequiredForFirstSignon;
  }

  /**
   * The label of the auth token.
   *
   * @return The label of the auth token.
   */
  public getAuthTokenLabel(): string {
    return this.authTokenLabel;
  }

  /**
   * The label of the auth token.
   *
   * @param authTokenLabel The label of the auth token.
   */
  public setAuthTokenLabel(authTokenLabel: string): void {
    this.authTokenLabel = authTokenLabel;
  }

  /**
   * The URL for the auth token information.
   *
   * @return The URL for the auth token information.
   */
  public getAuthTokenInfoURL(): string {
    return this.authTokenInfoURL;
  }

  /**
   * The URL for the auth token information.
   *
   * @param authTokenInfoURL The URL for the auth token information.
   */
  public setAuthTokenInfoURL(authTokenInfoURL: string): void {
    this.authTokenInfoURL = authTokenInfoURL;
  }

  /**
   * Whether MFA is supported.
   *
   * @return Whether MFA is supported.
   */
  public getMfaSupported(): boolean {
    return this.mfaSupported;
  }

  /**
   * Whether MFA is supported.
   *
   * @param mfaSupported Whether MFA is supported.
   */
  public setMfaSupported(mfaSupported: boolean): void {
    this.mfaSupported = mfaSupported;
  }

  /**
   * Whether an MFA challenge request is required for the first sign-on into this realm.
   *
   * @return Whether an MFA challenge request is required for the first sign-on into this realm.
   */
  public getMfaChallengeRequiredForFirstSignon(): boolean {
    return this.mfaChallengeRequiredForFirstSignon;
  }

  /**
   * Whether an MFA challenge request is required for the first sign-on into this realm.
   *
   * @param mfaChallengeRequiredForFirstSignon
   *         Whether an MFA challenge request is required for the first sign-on into this realm.
   */
  public setMfaChallengeRequiredForFirstSignon(mfaChallengeRequiredForFirstSignon: boolean): void {
    this.mfaChallengeRequiredForFirstSignon = mfaChallengeRequiredForFirstSignon;
  }
}

Aggregate_add( SignonInfo, "SIGNONINFO" );
Element_add(SignonInfo, { name: "SIGNONREALM", required: true, order: 0, type: String, read: SignonInfo.prototype.getRealm, write: SignonInfo.prototype.setRealm });
Element_add(SignonInfo, { name: "MIN", required: true, order: 10, type: Number, read: SignonInfo.prototype.getMinPasswordCharacters, write: SignonInfo.prototype.setMinPasswordCharacters });
Element_add(SignonInfo, { name: "MAX", required: true, order: 20, type: Number, read: SignonInfo.prototype.getMaxPasswordCharacters, write: SignonInfo.prototype.setMaxPasswordCharacters });
Element_add(SignonInfo, { name: "CHARTYPE", required: true, order: 30, type: CharacterType, read: SignonInfo.prototype.getPasswordCharacterType, write: SignonInfo.prototype.setPasswordCharacterType });
Element_add(SignonInfo, { name: "CASESEN", required: true, order: 40, type: Boolean, read: SignonInfo.prototype.getPasswordCaseSensitive, write: SignonInfo.prototype.setPasswordCaseSensitive });
Element_add(SignonInfo, { name: "SPECIAL", required: true, order: 50, type: Boolean, read: SignonInfo.prototype.getPasswordSpecialCharsAllowed, write: SignonInfo.prototype.setPasswordSpecialCharsAllowed });
Element_add(SignonInfo, { name: "SPACES", required: true, order: 60, type: Boolean, read: SignonInfo.prototype.getPasswordSpacesAllowed, write: SignonInfo.prototype.setPasswordSpacesAllowed });
Element_add(SignonInfo, { name: "PINCH", required: true, order: 70, type: Boolean, read: SignonInfo.prototype.getChangePasswordSupported, write: SignonInfo.prototype.setChangePasswordSupported });
Element_add(SignonInfo, { name: "CHGPINFIRST", required: true, order: 80, type: Boolean, read: SignonInfo.prototype.getChangePasswordFirstRequired, write: SignonInfo.prototype.setChangePasswordFirstRequired });
Element_add(SignonInfo, { name: "USERCRED1LABEL", order: 90, type: String, read: SignonInfo.prototype.getAdditionalCredientialsLabel1, write: SignonInfo.prototype.setAdditionalCredientialsLabel1 });
Element_add(SignonInfo, { name: "USERCRED2LABEL", order: 100, type: String, read: SignonInfo.prototype.getAdditionalCredientialsLabel2, write: SignonInfo.prototype.setAdditionalCredientialsLabel2 });
Element_add(SignonInfo, { name: "CLIENTUIDREQ", order: 110, type: Boolean, read: SignonInfo.prototype.getClientUIDRequired, write: SignonInfo.prototype.setClientUIDRequired });
Element_add(SignonInfo, { name: "AUTHTOKENFIRST", order: 120, type: Boolean, read: SignonInfo.prototype.getAuthTokenRequiredForFirstSignon, write: SignonInfo.prototype.setAuthTokenRequiredForFirstSignon });
Element_add(SignonInfo, { name: "AUTHTOKENLABEL", order: 130, type: String, read: SignonInfo.prototype.getAuthTokenLabel, write: SignonInfo.prototype.setAuthTokenLabel });
Element_add(SignonInfo, { name: "AUTHTOKENINFOURL", order: 140, type: String, read: SignonInfo.prototype.getAuthTokenInfoURL, write: SignonInfo.prototype.setAuthTokenInfoURL });
Element_add(SignonInfo, { name: "MFACHALLENGESUPT", order: 150, type: Boolean, read: SignonInfo.prototype.getMfaSupported, write: SignonInfo.prototype.setMfaSupported });
Element_add(SignonInfo, { name: "MFACHALLENGEFIRST", order: 160, type: Boolean, read: SignonInfo.prototype.getMfaChallengeRequiredForFirstSignon, write: SignonInfo.prototype.setMfaChallengeRequiredForFirstSignon });
