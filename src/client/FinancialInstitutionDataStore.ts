import { FinancialInstitutionData } from "./FinancialInstitutionData";


export interface FinancialInstitutionDataStore {

  /**
   * Get the data for the financial institution of the specified id.
   *
   * @param fid The id of the financial institution.
   * @return The financial institution data, or null if none exists for the specified id.
   */
  getInstitutionData(fid: string): FinancialInstitutionData;

  /**
   * Get the whole list of financial institution data.
   *
   * @return The whole list of financial institution data.
   */
  getInstitutionDataList(): Array<FinancialInstitutionData>;
}
