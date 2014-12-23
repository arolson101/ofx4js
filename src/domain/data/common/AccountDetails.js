/*
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

"use strict";

var inherit = require("../inherit");

/**
 * Common details about an account.
 *
 * @author Ryan Heaton
 */
function AccountDetails() {
}

/**
 * The account number.
 *
 * @return {String} The account number.
 */
AccountDetails.prototype.getAccountNumber = function() { throw new Error("not implemented"); };

/**
 * The account key.
 *
 * @return {String} The account key.
 */
AccountDetails.prototype.getAccountKey = function() { throw new Error("not implemented"); };


module.exports = AccountDetails;
