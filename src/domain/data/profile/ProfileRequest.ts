import { RequestMessage } from "../RequestMessage";
import { ClientRoutingCapability } from "./ClientRoutingCapability";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * @see "Section 7.1.5, OFX Spec"
 */
export class ProfileRequest extends RequestMessage {

  private routingCapability: ClientRoutingCapability;
  private profileLastUpdated: Date;

  constructor() {
    super();
    this.routingCapability = ClientRoutingCapability.MESSAGE_SET;
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
