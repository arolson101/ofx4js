/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {OFXApplicationContext} from "OFXApplicationContext";
/**
 * Default application context.
 *
 * @author Ryan Heaton
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


