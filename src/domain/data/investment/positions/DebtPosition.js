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

var Aggregate = require("meta/Aggregate");

/**
 * Represents a debt position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
function DebtPosition () {
}

inherit(DebtPosition, "extends", BasePosition);


Aggregate.add("POSDEBT", DebtPosition);




module.exports = DebtPosition;
