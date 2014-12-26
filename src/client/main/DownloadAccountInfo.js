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

var FinancialInstitution = require("client/FinancialInstitution");
var FinancialInstitutionData = require("client/FinancialInstitutionData");
var FinancialInstitutionDataStore = require("client/FinancialInstitutionDataStore");
var FinancialInstitutionImpl = require("client/impl/FinancialInstitutionImpl");
var LocalResourceFIDataStore = require("client/impl/LocalResourceFIDataStore");
var OFXV1Connection = require("client/net/OFXV1Connection");
var AccountInfoResponse = require("domain/data/signup/AccountInfoResponse");
var AccountProfile = require("domain/data/signup/AccountProfile");
var AggregateMarshaller = require("io/AggregateMarshaller");
var OFXWriter = require("io/OFXWriter");
var OFXV1Writer = require("io/v1/OFXV1Writer");
var OFXV2Writer = require("io/v2/OFXV2Writer");
//import org.kohsuke.args4j.CmdLineException;
//import org.kohsuke.args4j.CmdLineParser;
//import org.kohsuke.args4j.ExampleMode;
//import org.kohsuke.args4j.Option;

//import java.io.ByteArrayOutputStream;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.util.Collection;

/**
 * Downloads account information.
 *
 * @author Ryan Heaton
 */
