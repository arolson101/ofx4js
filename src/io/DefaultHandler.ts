import { OFXHandler } from "./OFXHandler";


/**
 * Default (no-op) implementation of an OFX handler.
 */
export class DefaultHandler implements OFXHandler {

  public onHeader(name: string, value: string): void {
  }

  public onElement(name: string, value: string): void {
  }

  public startAggregate(aggregateName: string): void {
  }

  public endAggregate(aggregateName: string): void {
  }

}
