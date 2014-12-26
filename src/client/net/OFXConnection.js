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
 * Connection to an OFX interface.
 *
 * @author Ryan Heaton
 */
function OFXConnection() {
}

/**
 * Send a request.
 *
 * @param {RequestEnvelope} request The request to send.
 * @param {URL} url The URL to which to send the request.
 * @return {ResponseEnvelope} The response.
 */
OFXConnection.prototype.sendRequest = function(/*request, url*/) { throw new Error("not implemented"); };


module.exports = OFXConnection;
