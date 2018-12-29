
/**
 * The application context.
 */
export interface OFXApplicationContext {

  /**
   * The current application id.
   *
   * @return The current application id.
   */
  getAppId(): string;

  /**
   * The application version.
   *
   * @return The application version.
   */
  getAppVersion(): string;
}
