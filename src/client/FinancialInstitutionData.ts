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
///<reference path='../project.d.ts'/>

module ofx4js.client {

/**
 * Interface for core FI data.  This is the base set of information
 * required in order to initiate a connection to an FI server.
 *
 * @author Ryan Heaton
 */
export interface FinancialInstitutionData {

  /**
   * A unique id for this FI.
   *
   * @return A unique id for this FI.
   */
  getId(): string;

  /**
   * The id of the FI.
   *
   * @return The id of the FI.
   */
  getFinancialInstitutionId(): string;

  /**
   * The name of the FI.
   *
   * @return The name of the FI.
   */
  getName(): string;

  /**
   * The OFX organization name.
   *
   * @return The OFX organization name.
   */
  getOrganization(): string;

  /**
   * The URL to the OFX server for this institution.
   *
   * @return The URL to the OFX server for this institution.
   */
  getOFXURL(): string;

  /**
   * The broker id.
   *
   * @return The broker id.
   */
  getBrokerId(): string;
}

}