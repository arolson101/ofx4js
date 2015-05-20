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
///<reference path="../../../project.d.ts"/>
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";

/**
 * @author Ryan Heaton
 */
export class FinancialInstitution {

  private id: string;
  private organization: string;

  /**
   * Financial institution id.
   *
   * @return Financial institution id.
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Financial institution id.
   *
   * @param id Financial institution id.
   */
  public setId(id: string): void {
    this.id = id;
  }

  /**
   * The organization.
   *
   * @return The organization.
   */
  public getOrganization(): string {
    return this.organization;
  }

  /**
   * The organization.
   *
   * @param organization The organization.
   */
  public setOrganization(organization: string): void {
    this.organization = organization;
  }
}

Aggregate_add( FinancialInstitution, "FI" );
Element_add(FinancialInstitution, { name: "FID", order: 10, type: String, read: FinancialInstitution.prototype.getId, write: FinancialInstitution.prototype.setId });
Element_add(FinancialInstitution, { name: "ORG", required: true, order: 0, type: String, read: FinancialInstitution.prototype.getOrganization, write: FinancialInstitution.prototype.setOrganization });


