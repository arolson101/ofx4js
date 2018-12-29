import { SecurityId } from "./SecurityId";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * Security request aggregate.
 * @see "Section 13.8.2.2, OFX Spec"
 */
export class SecurityRequest {

  private securityId: SecurityId;
  private tickerSymbol: string;
  private fiId: string;

  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
    this.tickerSymbol = null;
    this.fiId = null;
  }

  public getTickerSymbol(): string {
    return this.tickerSymbol;
  }

  public setTickerSymbol(tickerSymbol: string): void {
    this.tickerSymbol = tickerSymbol;
    this.securityId = null;
    this.fiId = null;
  }

  public getFiId(): string {
    return this.fiId;
  }

  public setFiId(fiId: string): void {
    this.fiId = fiId;
    this.securityId = null;
    this.tickerSymbol = null;
  }
}

Aggregate_add(SecurityRequest, "SECRQ");
Element_add(SecurityRequest, { name: "SECID", order: 10, type: SecurityId, read: SecurityRequest.prototype.getSecurityId, write: SecurityRequest.prototype.setSecurityId });
Element_add(SecurityRequest, { name: "TICKER", order: 20, type: String, read: SecurityRequest.prototype.getTickerSymbol, write: SecurityRequest.prototype.setTickerSymbol });
Element_add(SecurityRequest, { name: "FIID", order: 30, type: String, read: SecurityRequest.prototype.getFiId, write: SecurityRequest.prototype.setFiId });
