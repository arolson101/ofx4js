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
import {ClientRoutingCapability} from "ClientRoutingCapability";
import {RequestMessage} from "../RequestMessage";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";

/**
 * @author Ryan Heaton
 * @see "Section 7.1.5, OFX Spec"
 */
export class ProfileRequest extends RequestMessage {

  private routingCapability: ClientRoutingCapability;
  private profileLastUpdated: Date;
  
  constructor() {
    super();
    this.routingCapability = ClientRoutingCapability.NONE;
  }

  /**
   * The client routing capability.
   *
   * @return The client routing capability.
   */
  public getRoutingCapability(): ClientRoutingCapability {
    return this.routingCapability;
  }

  /**
   * The client routing capability.
   *
   * @param routingCapability The client routing capability.
   */
  public setRoutingCapability(routingCapability: ClientRoutingCapability): void {
    this.routingCapability = routingCapability;
  }

  /**
   * The date the profile was last updated.
   *
   * @return The date the profile was last updated.
   */
  public getProfileLastUpdated(): Date {
    return this.profileLastUpdated;
  }

  /**
   * The date the profile was last updated.
   *
   * @param profileLastUpdated The date the profile was last updated.
   */
  public setProfileLastUpdated(profileLastUpdated: Date): void {
    this.profileLastUpdated = profileLastUpdated;
  }
}

Aggregate_add( ProfileRequest, "PROFRQ" );
Element_add(ProfileRequest, { name: "CLIENTROUTING", order: 0, type: ClientRoutingCapability, read: ProfileRequest.prototype.getRoutingCapability, write: ProfileRequest.prototype.setRoutingCapability });
Element_add(ProfileRequest, { name: "DTPROFUP", order: 10, type: Date, read: ProfileRequest.prototype.getProfileLastUpdated, write: ProfileRequest.prototype.setProfileLastUpdated });


