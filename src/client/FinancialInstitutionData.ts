
/**
 * Interface for core FI data.  This is the base set of information
 * required in order to initiate a connection to an FI server.
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
