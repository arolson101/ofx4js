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

package net.sf.ofx4j.domain.data.creditcard;

import net.sf.ofx4j.domain.data.common.StatementRequest;
import net.sf.ofx4j.meta.Aggregate;
import net.sf.ofx4j.meta.ChildAggregate;

/**
 * @author Ryan Heaton
 */
@Aggregate("CCSTMTRQ")
public class CreditCardStatementRequest extends StatementRequest {

  private CreditCardAccountDetails account;

  /**
   * The account details.
   *
   * @return The account details.
   */
  @ChildAggregate ( name = "CCACCTFROM", required = true, order = 0 )
  public CreditCardAccountDetails getAccount() {
    return account;
  }

  /**
   * The account details.
   *
   * @param account The account details.
   */
  public void setAccount(CreditCardAccountDetails account) {
    this.account = account;
  }

}