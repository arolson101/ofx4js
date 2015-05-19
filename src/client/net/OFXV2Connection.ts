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
///<reference path='../../io/OFXWriter'/>
///<reference path='../../io/v2/OFXV2Writer'/>
///<reference path='OFXV1Connection'/>

module ofx4js.client.net {

import OFXWriter = ofx4js.io.OFXWriter;
import OFXV2Writer = ofx4js.io.v2.OFXV2Writer;
import OutputBuffer = ofx4js.io.OutputBuffer;

/**
 * @author Ryan Heaton
 */
export class OFXV2Connection extends OFXV1Connection {

  //@Override
  protected newOFXWriter(out: OutputBuffer): OFXWriter {
    return new OFXV2Writer(out);
  }
}

}
