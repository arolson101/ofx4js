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

/**
 * The message set type, used to define message set order in the envelope.
 *
 * @enum
 * @see "Section 2.4.5.2, OFX spec"
 */
var MessageSetType = {

  signon: 0,

  signup: 1,

  banking: 2,

  creditcard: 3,

  investment: 4,

  interbank_transfer: 5,

  wire_transfer: 6,

  payments: 7,

  email: 8,

  investment_security: 9,

  profile: 10,

  tax1099: 11

};


module.exports = MessageSetType;
