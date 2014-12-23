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

var ResponseMessage = require("domain/data/ResponseMessage");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");
var AccountStatement = require("client/AccountStatement");

//import java.util.Locale;

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
function T1099Response () {
}

inherit(T1099Response, "extends", ResponseMessage);






module.exports = T1099Response;
