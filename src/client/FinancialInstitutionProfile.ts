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
import { MessageSetType } from "../domain/data/MessageSetType";
import { MessageSetProfile } from "../domain/data/MessageSetProfile";
import { SignonProfile } from "../domain/data/SignonProfile";


/**
 * @author Ryan Heaton
 */
export interface FinancialInstitutionProfile {

  /**
   * When this profile was last updated.
   *
   * @return When this profile was last updated.
   */
  getLastUpdated(): Date;

  /**
   * The name of the financial institution.
   *
   * @return The name of the financial institution.
   */
  getFinancialInstitutionName(): string;

  /**
   * The address of the financial institution.
   *
   * @return The address of the financial institution.
   */
  getAddress1(): string;

  /**
   * The address of the financial institution.
   *
   * @return The address of the financial institution.
   */
  getAddress2(): string;

  /**
   * The address of the financial institution.
   *
   * @return The address of the financial institution.
   */
  getAddress3(): string;

  /**
   * The city of the financial institution.
   *
   * @return The city of the financial institution.
   */
  getCity(): string;

  /**
   * The state of this financial institution.
   *
   * @return The state of this financial institution.
   */
  getState(): string;

  /**
   * The postal code of this financial institution.
   *
   * @return The postal code of this financial institution.
   */
  getZip(): string;

  /**
   * The country code for this financial institution.
   *
   * @return The country code for this financial institution.
   * @see java.util.Locale#getISO3Country()
   */
  getCountry(): string;

  /**
   * The phone number to customer service.
   *
   * @return The phone number to customer service.
   */
  getCustomerServicePhone(): string;

  /**
   * The phone number to tech support.
   *
   * @return The phone number to tech support.
   */
  getTechnicalSupportPhone(): string;

  /**
   * The fax number.
   *
   * @return The fax number.
   */
  getFax(): string;

  /**
   * URL for the financial institution.
   *
   * @return URL for the financial institution.
   */
  getSiteURL(): string;

  /**
   * The email for this FI
   *
   * @return The email for this FI
   */
  getEmail(): string;

  /**
   * Get the message set profile for the specified message set.
   *
   * @param type The message set type for which to retrieve the profile.
   * @return The message set profile information, or null if the FI doesn't support any message sets of the specified type.
   * @throws IllegalStateException If multiple versions of the specified message set exist.
   */
  getMessageSetProfile(type: MessageSetType): MessageSetProfile;

  /**
   * Get the message set profile for the specified message set and the specified version.
   *
   * @param type The message set type for which to retrieve the profile.
   * @param version The version for which to retrieve the profile.
   * @return The message set profile information, or null if the FI doesn't support the specified message set of the specified version.
   */
  getMessageSetProfile(type: MessageSetType, version: string): MessageSetProfile;

  /**
   * Get the signon profile for the specified message set.
   *
   * @param messageSet The message set.
   * @return The signon profile, or null if none was found.
   */
  getSignonProfile(messageSet: MessageSetProfile): SignonProfile;
}
