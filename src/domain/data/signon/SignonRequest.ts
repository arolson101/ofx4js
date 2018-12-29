import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { RequestMessage } from "../RequestMessage";
import { Element_add } from "../../../meta/Element_add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";
import { FinancialInstitutionInfo } from "./FinancialInstitution";


/**
 * Sign-on request
 *
 * @see "Section 2.5.1.2, OFX Spec."
 */
export class SignonRequest extends RequestMessage {

  /**
   * @see "Section 2.5.1"
   */
  public static ANONYMOUS_USER: string = "anonymous00000000000000000000000";

  private timestamp: Date;
  private userId: string;
  private password: string;
  private userKey: string;
  private generateUserKey: boolean;
  private language: string;
  private financialInstitution: FinancialInstitutionInfo;
  private sessionId: string;
  private applicationId: string;
  private applicationVersion: string;
  private clientUID: string;
  private additionalCredentials1: string;
  private additionalCredentials2: string;
  private authToken: string;
  private accessKey: string;

  constructor() {
    super();
    this.language = "ENG"; //Locale.US.getISO3Language().toUpperCase();
    this.applicationId = "Money"; //many institutions just won't work with an unrecognized app id...
    this.applicationVersion = "1600"; //many institutions just won't work with an unrecognized app id...
  }

  /**
   * The date and time of the request.
   *
   * @return The date and time of the request.
   */
  public getTimestamp(): Date {
    return this.timestamp;
  }

  /**
   * The date and time of the request.
   *
   * @param timestamp The date and time of the request.
   */
  public setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }

  /**
   * The user id.
   *
   * @return The user id.
   */
  public getUserId(): string {
    return this.userId;
  }

  /**
   * The user id.
   *
   * @param userId The user id.
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * The password.
   *
   * @return The password.
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   * The password.
   *
   * @param password The password.
   */
  public setPassword(password: string): void {
    this.password = password;
  }

  /**
   * The user key provided by the server so as not to require further username/password authentication.
   *
   * @return The user key provided by the server so as not to require further username/password authentication.
   */
  public getUserKey(): string {
    return this.userKey;
  }

  /**
   * The user key provided by the server so as not to require further username/password authentication.
   *
   * @param userKey The user key provided by the server so as not to require further username/password authentication.
   */
  public setUserKey(userKey: string): void {
    this.userKey = userKey;
  }

  /**
   * Whether to request the server to generate a user key.
   *
   * @return Whether to request the server to generate a user key.
   */
  public getGenerateUserKey(): boolean {
    return this.generateUserKey;
  }

  /**
   * Whether to request the server to generate a user key.
   *
   * @param generateUserKey Whether to request the server to generate a user key.
   */
  public setGenerateUserKey(generateUserKey: boolean): void {
    this.generateUserKey = generateUserKey;
  }

  /**
   * The three-letter langauge code.
   *
   * @return The three-letter langauge code.
   * @see java.util.Locale#getISO3Language()
   */
  public getLanguage(): string {
    return this.language;
  }

  /**
   * The three-letter langauge code.
   *
   * @param language The three-letter langauge code.
   */
  public setLanguage(language: string): void {
    this.language = language;
  }

  /**
   * The financial institution.
   *
   * @return The financial institution.
   */
  public getFinancialInstitution(): FinancialInstitutionInfo {
    return this.financialInstitution;
  }

  /**
   * The financial institution.
   *
   * @param financialInstitution The financial institution.
   */
  public setFinancialInstitution(financialInstitution: FinancialInstitutionInfo): void {
    this.financialInstitution = financialInstitution;
  }

  /**
   * The server-supplied session id.
   *
   * @return The server-supplied session id.
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * The server-supplied session id.
   *
   * @param sessionId The server-supplied session id.
   */
  public setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  /**
   * The application id.
   *
   * @return The application id.
   */
  public getApplicationId(): string {
    return this.applicationId;
  }

  /**
   * The application id.
   *
   * @param applicationId The application id.
   */
  public setApplicationId(applicationId: string): void {
    this.applicationId = applicationId;
  }

  /**
   * The application version.
   *
   * @return The application version.
   */
  public getApplicationVersion(): string {
    return this.applicationVersion;
  }

  /**
   * The application version.
   *
   * @param applicationVersion The application version.
   */
  public setApplicationVersion(applicationVersion: string): void {
    this.applicationVersion = applicationVersion;
  }

  /**
   * The client-supplied UID.
   *
   * @return The client-supplied UID.
   */
  public getClientUID(): string {
    return this.clientUID;
  }

  /**
   * The client-supplied UID.
   *
   * @param clientUID The client-supplied UID.
   */
  public setClientUID(clientUID: string): void {
    this.clientUID = clientUID;
  }

  /**
   * Any additional credentials.
   *
   * @return Any additional credentials.
   */
  public getAdditionalCredentials1(): string {
    return this.additionalCredentials1;
  }

  /**
   * Any additional credentials.
   *
   * @param additionalCredentials1 Any additional credentials.
   */
  public setAdditionalCredentials1(additionalCredentials1: string): void {
    this.additionalCredentials1 = additionalCredentials1;
  }

  /**
   * Any additional credentials.
   *
   * @return Any additional credentials.
   */
  public getAdditionalCredentials2(): string {
    return this.additionalCredentials2;
  }

  /**
   * Any additional credentials.
   *
   * @param additionalCredentials2 Any additional credentials.
   */
  public setAdditionalCredentials2(additionalCredentials2: string): void {
    this.additionalCredentials2 = additionalCredentials2;
  }

  /**
   * The authentication token.
   *
   * @return The authentication token.
   */
  public getAuthToken(): string {
    return this.authToken;
  }

  /**
   * The authentication token.
   *
   * @param authToken The authentication token.
   */
  public setAuthToken(authToken: string): void {
    this.authToken = authToken;
  }

  /**
   * The access key.
   *
   * @return The access key.
   */
  public getAccessKey(): string {
    return this.accessKey;
  }

  /**
   * The access key.
   *
   * @param accessKey The access key.
   */
  public setAccessKey(accessKey: string): void {
    this.accessKey = accessKey;
  }

  //todo: MFA challenge stuff.
}

Aggregate_add( SignonRequest, "SONRQ" );
Element_add(SignonRequest, { name: "DTCLIENT", required: true, order: 0, type: Date, read: SignonRequest.prototype.getTimestamp, write: SignonRequest.prototype.setTimestamp });
Element_add(SignonRequest, { name: "USERID", order: 10, type: String, read: SignonRequest.prototype.getUserId, write: SignonRequest.prototype.setUserId });
Element_add(SignonRequest, { name: "USERPASS", order: 20, type: String, read: SignonRequest.prototype.getPassword, write: SignonRequest.prototype.setPassword });
Element_add(SignonRequest, { name: "USERKEY", order: 30, type: String, read: SignonRequest.prototype.getUserKey, write: SignonRequest.prototype.setUserKey });
Element_add(SignonRequest, { name: "GENUSERKEY", order: 40, type: Boolean, read: SignonRequest.prototype.getGenerateUserKey, write: SignonRequest.prototype.setGenerateUserKey });
Element_add(SignonRequest, { name: "LANGUAGE", required: true, order: 50, type: String, read: SignonRequest.prototype.getLanguage, write: SignonRequest.prototype.setLanguage });
ChildAggregate_add(SignonRequest, { order: 60, type: FinancialInstitutionInfo, read: SignonRequest.prototype.getFinancialInstitution, write: SignonRequest.prototype.setFinancialInstitution });
Element_add(SignonRequest, { name: "SESSCOOKIE", order: 70, type: String, read: SignonRequest.prototype.getSessionId, write: SignonRequest.prototype.setSessionId });
Element_add(SignonRequest, { name: "APPID", required: true, order: 80, type: String, read: SignonRequest.prototype.getApplicationId, write: SignonRequest.prototype.setApplicationId });
Element_add(SignonRequest, { name: "APPVER", required: true, order: 90, type: String, read: SignonRequest.prototype.getApplicationVersion, write: SignonRequest.prototype.setApplicationVersion });
Element_add(SignonRequest, { name: "CLIENTUID", order: 100, type: String, read: SignonRequest.prototype.getClientUID, write: SignonRequest.prototype.setClientUID });
Element_add(SignonRequest, { name: "USERCRED1", order: 110, type: String, read: SignonRequest.prototype.getAdditionalCredentials1, write: SignonRequest.prototype.setAdditionalCredentials1 });
Element_add(SignonRequest, { name: "USERCRED2", order: 120, type: String, read: SignonRequest.prototype.getAdditionalCredentials2, write: SignonRequest.prototype.setAdditionalCredentials2 });
Element_add(SignonRequest, { name: "AUTHTOKEN", order: 130, type: String, read: SignonRequest.prototype.getAuthToken, write: SignonRequest.prototype.setAuthToken });
Element_add(SignonRequest, { name: "ACCESSKEY", order: 140, type: String, read: SignonRequest.prototype.getAccessKey, write: SignonRequest.prototype.setAccessKey });
