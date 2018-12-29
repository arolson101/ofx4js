import { OFXApplicationContext } from "./OFXApplicationContext";


/**
 * Default application context.
 */
export class DefaultApplicationContext implements OFXApplicationContext {

  private appId: string;
  private appVersion: string;

  constructor(appId: string, appVersion: string) {
    this.appId = appId;
    this.appVersion = appVersion;
  }

  public getAppId(): string {
    return this.appId;
  }

  public getAppVersion(): string {
    return this.appVersion;
  }
}
