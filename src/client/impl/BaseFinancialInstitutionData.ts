import { FinancialInstitutionData } from "../FinancialInstitutionData";


//import java.net.URL;

/**
 * Base bean for FI data.
 */
export class BaseFinancialInstitutionData implements FinancialInstitutionData {

  private id: string;
  private fid: string;
  private name: string;
  private organization: string;
  private ofxUrl: string;
  private brokerId: string;

  public constructor(id?: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getFinancialInstitutionId(): string {
    return this.fid;
  }

  public setFinancialInstitutionId(id: string): void {
    this.fid = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getOrganization(): string {
    return this.organization;
  }

  public setOrganization(organization: string): void {
    this.organization = organization;
  }

  public getOFXURL(): string {
    return this.ofxUrl;
  }

  public setOFXURL(OFXURL: string): void {
    this.ofxUrl = OFXURL;
  }

  public getBrokerId(): string {
    return this.brokerId;
  }

  public setBrokerId(brokerId: string): void {
    this.brokerId = brokerId;
  }
}
