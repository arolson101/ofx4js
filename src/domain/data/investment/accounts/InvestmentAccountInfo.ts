import { AccountInfo } from "../../common/AccountInfo";
import { InvestmentAccountDetails } from "./InvestmentAccountDetails";
import { AccountDetails } from "../../common/AccountDetails";
import { UnitedStatesAccountType, UnitedStatesAccountType_fromOfx } from "./UnitedStatesAccountType";
import { ActivationStatus, ActivationStatus_fromOfx } from "./ActivationStatus";
import { InvestmentAccountType } from "./AccountType";
import { InvestmentAccountType_fromOfx } from "./AccountType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Aggregate for the info about a brokerage account.
 *
 * @see "OFX Spec, Section 13.6.2"
 */
export class InvestmentAccountInfo implements AccountInfo {

  private investmentAccount: InvestmentAccountDetails;
  private unitedStatesAccountType: string;
  private supportsChecking: boolean;
  private activationStatus: string;
  private investmentAccountType: string;
  private optionLevel: string;

  /**
   * Gets the investment account this information is referencing.
   *
   * @return the investment account this information is referencing
   */
  public getInvestmentAccount(): InvestmentAccountDetails {
    return this.investmentAccount;
  }

  /**
   * Sets the investment account this information is referencing. This is a required field
   * according to the OFX spec.
   *
   * @param investmentAccount the investment account this information is referencing
   */
  public setInvestmentAccount(investmentAccount: InvestmentAccountDetails): void {
    this.investmentAccount = investmentAccount;
  }

  // Inherited.
  public getAccountDetails(): AccountDetails {
    return this.getInvestmentAccount();
  }

  /**
   * Gets the United States account type. This is a required field according to the OFX spec.
   * @see "OFX Spec, Section 13.6.1"
   *
   * @return the United States account type
   */
  public getUnitedStatesAccountType(): string {
    return this.unitedStatesAccountType;
  }

  /**
   * Sets United States account type. This is a required field according to the OFX spec.
   * @see "OFX Spec, Section 13.6.1"
   *
   * @param unitedStatesAccountType the United States account type
   */
  public setUnitedStatesAccountType(unitedStatesAccountType: string): void {
    this.unitedStatesAccountType = unitedStatesAccountType;
  }

  /**
   * Gets the United States account type as one of the well-known types.
   *
   * @return the account type or null if it's not one of the well-known types
   */
  public getUnitedStatesAccountTypeEnum(): UnitedStatesAccountType {
    return UnitedStatesAccountType_fromOfx(this.unitedStatesAccountType);
  }

  /**
   * Gets whether the account supports checking. This is a required field according to the OFX spec.
   * @see "OFX Spec, Section 13.6.1"
   *
   * @return whether the account supports checking
   */
  public getSupportsChecking(): boolean {
    return this.supportsChecking;
  }

  /**
   * Sets whether the account supports checking. This is a required field according to the OFX spec.
   * @see "OFX Spec, Section 13.6.1"
   *
   * @param supportsChecking whether the account supports checking
   */
  public setSupportsChecking(supportsChecking: boolean): void {
    this.supportsChecking = supportsChecking;
  }

  /**
   * Gets the activation status for investment statement download. This is a required field
   * according to the OFX spec.
   *
   * @return the activation status
   */
  public getActivationStatus(): string {
    return this.activationStatus;
  }

  /**
   * Sets the activation status for investment statement download. This is a required field
   * according to the OFX spec.
   *
   * @param activationStatus the activation status
   */
  public setActivationStatus(activationStatus: string): void {
    this.activationStatus = activationStatus;
  }

  /**
   * Gets the activation status as one of the well-known types.
   *
   * @return the activation status or null if it wasn't one of the well known types
   */
  public getActivationStatusEnum(): ActivationStatus {
    return ActivationStatus_fromOfx(this.getActivationStatus());
  }

  /**
   * Gets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
   * This is an optional field according to the OFX spec.
   *
   * @return the type of account
   */
  public getInvestmentAccountType(): string {
    return this.investmentAccountType;
  }

  /**
   * Sets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
   * This is an optional field according to the OFX spec.
   *
   * @param investmentAccountType the type of account
   */
  public setInvestmentAccountType(investmentAccountType: string): void {
    this.investmentAccountType = investmentAccountType;
  }

  /**
   * Gets the type of investment account as one of the well-known types.
   *
   * @return the type of investment account or null if it's not one of the well-known types
   */
  public getInvestmentAccountTypeEnum(): InvestmentAccountType {
    return  InvestmentAccountType_fromOfx(this.getInvestmentAccountType());
  }

  /**
   * Gets the description of option trading privileges. * This is an optional field according to
   * the OFX spec.
   *
   * @return the description of option trading privileges.
   */
  public getOptionLevel(): string {
    return this.optionLevel;
  }

  /**
   * Sets the description of option trading privileges. * This is an optional field according to
   * the OFX spec.
   *
   * @param optionLevel the description of option trading privileges.
   */
  public setOptionLevel(optionLevel: string): void {
    this.optionLevel = optionLevel;
  }
}

Aggregate_add( InvestmentAccountInfo, "INVACCTINFO" );
ChildAggregate_add(InvestmentAccountInfo, { name: "INVACCTFROM", required: true, order: 0, type: InvestmentAccountDetails, read: InvestmentAccountInfo.prototype.getInvestmentAccount, write: InvestmentAccountInfo.prototype.setInvestmentAccount });
Element_add(InvestmentAccountInfo, { name: "USPRODUCTTYPE", required: true, order: 10, type: String, read: InvestmentAccountInfo.prototype.getUnitedStatesAccountType, write: InvestmentAccountInfo.prototype.setUnitedStatesAccountType });
Element_add(InvestmentAccountInfo, { name: "CHECKING", required: true, order: 20, type: Boolean, read: InvestmentAccountInfo.prototype.getSupportsChecking, write: InvestmentAccountInfo.prototype.setSupportsChecking });
Element_add(InvestmentAccountInfo, { name: "SVCSTATUS", required: true, order: 30, type: String, read: InvestmentAccountInfo.prototype.getActivationStatus, write: InvestmentAccountInfo.prototype.setActivationStatus });
Element_add(InvestmentAccountInfo, { name: "INVACCTTYPE", order: 40, type: String, read: InvestmentAccountInfo.prototype.getInvestmentAccountType, write: InvestmentAccountInfo.prototype.setInvestmentAccountType });
Element_add(InvestmentAccountInfo, { name: "OPTIONLEVEL", order: 50, type: String, read: InvestmentAccountInfo.prototype.getOptionLevel, write: InvestmentAccountInfo.prototype.setOptionLevel });
