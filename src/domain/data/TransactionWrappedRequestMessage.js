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

var Element = require("meta/Element");

//import java.util.UUID;

/**
 * A request message wrapped in a transaction.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.6, OFX Spec"
 */
public abstract class TransactionWrappedRequestMessage<M extends RequestMessage> extends RequestMessage {
