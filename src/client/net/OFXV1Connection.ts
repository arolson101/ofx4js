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
///<reference path='../../domain/data/RequestEnvelope'/>
///<reference path='../../domain/data/ResponseEnvelope'/>
///<reference path='../../io/OFXParseException'/>
///<reference path='../../io/OFXWriter'/>
///<reference path='../../io/AggregateMarshaller'/>
///<reference path='../../io/AggregateUnmarshaller'/>
///<reference path='../../io/v1/OFXV1Writer'/>
///<reference path='../../io/StreamWriter'/>
///<reference path='../../io/StringReader'/>
///<reference path='../../log/Log'/>
///<reference path='OFXConnection'/>
///<reference path='OFXConnectionException'/>


module ofx4js.client.net {

import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
import OFXParseException = ofx4js.io.OFXParseException;
import OFXWriter = ofx4js.io.OFXWriter;
import AggregateMarshaller = ofx4js.io.AggregateMarshaller;
import OFXV1Writer = ofx4js.io.v1.OFXV1Writer;
import AggregateUnmarshaller = ofx4js.io.AggregateUnmarshaller;
import StringReader = ofx4js.io.StringReader;
import OutputBuffer = ofx4js.io.OutputBuffer;
import Log = ofx4js.log.Log;
import LogFactory = ofx4js.log.LogFactory;

// import java.io.*;
// import java.net.HttpURLConnection;
// import java.net.URL;

// import org.apache.commons.logging.Log;
// import org.apache.commons.logging.LogFactory;

var LOG: Log;

/**
 * Base implementation for an OFX connection.
 *
 * @author Ryan Heaton
 */
export class OFXV1Connection implements OFXConnection {

  private async: boolean;
  private marshaller: AggregateMarshaller;
  private unmarshaller: AggregateUnmarshaller<ResponseEnvelope>;

  constructor() {
    this.async = true;
    this.marshaller = new AggregateMarshaller();
    this.unmarshaller = new AggregateUnmarshaller<ResponseEnvelope>(ResponseEnvelope);
  }

  // Inherited.
  public sendRequest(request: RequestEnvelope, url: string): Promise<ResponseEnvelope> {
//    if (!url.protocol().toLowerCase().startsWith("http")) {
//      throw new Error("Invalid URL: " + url + " only http(s) is supported.");
//    }

    //marshal to memory so we can determine the size...
    var outBuffer = new OutputBuffer();
    var ofxWriter: OFXWriter = this.newOFXWriter(outBuffer);
    this.getMarshaller().marshal(request, ofxWriter);
    ofxWriter.close();
    this.logRequest(outBuffer);
    var self = this;
    return self.sendBuffer(url, outBuffer)
    .then(function(in_: string): ResponseEnvelope {
      self.logResponse(in_);
      return self.unmarshal(in_);
    });
  }

  /**
   * Log a request buffer.
   *
   * @param outBuffer The buffer to log.
   */
  protected logRequest(outBuffer: OutputBuffer) /*throws UnsupportedEncodingException*/: void {
    if (LOG.isInfoEnabled()) {
      LOG.info("Marshalling " + outBuffer.size() + " bytes of the OFX request.");
      if (LOG.isDebugEnabled()) {
        LOG.debug(outBuffer.toString("utf-8"));
      }
    }
  }
  
  protected logResponse(inBuffer: string) {
    if (LOG.isInfoEnabled()) {
      if (LOG.isDebugEnabled()) {
        LOG.debug("Received OFX response:", inBuffer);
      }
    }
  }

  /**
   * Send the specified buffer to the specified URL.
   *
   * @param url The URL.
   * @param outBuffer The buffer.
   * @return a promise that resolves with the response.
   */
  protected sendBuffer(url: string, outBuffer: OutputBuffer) /*throws IOException, OFXConnectionException*/: Promise<string> {
    var outText = outBuffer.toString();
    var async: boolean = this.getAsync();
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      var onloadCalled: boolean = false;
      request.open("POST", url, async);
      request.setRequestHeader("Content-Type", "application/x-ofx");
      request.setRequestHeader("Accept", "*/*, application/x-ofx");
      request.onload = function() {
        onloadCalled = true;
        if (request.status >= 200 && request.status < 300) {
          resolve(request.responseText);
        } else if (request.status >= 400 && request.status < 500) {
          reject(new Error("Error " + request.status + " with client request: " + request.responseText));
        } else {
          reject(new Error("Invalid response code from OFX server: " + request.status));
        }
      };
      request.onerror = function() {
        reject(new Error("Network error"));
      };
      
      request.send(outText);
      
      if (!async && !onloadCalled) {
        (<any>request).onload();
      }
    });
  }

  /**
   * Unmarshal the input stream.
   *
   * @param in The input stream.
   * @return The response envelope.
   */
  protected unmarshal(in_: string) /*throws IOException, OFXConnectionException*/: ResponseEnvelope {
    try {
      var reader = new StringReader(in_);
      return this.getUnmarshaller().unmarshal(reader);
    }
    catch (e) {
      throw new OFXConnectionException("Unable to parse the OFX response.", e);
    }
  }

  /**
   * Create a new OFX writer.
   *
   * @param out The output stream for the writer.
   * @return The OFX writer.
   */
  protected newOFXWriter(out: OutputBuffer): OFXWriter {
    return new OFXV1Writer(out);
  }

  /**
   * The marshaller.
   *
   * @return The marshaller.
   */
  public getMarshaller(): AggregateMarshaller {
    return this.marshaller;
  }

  /**
   * The marshaller.
   *
   * @param marshaller The marshaller.
   */
  public setMarshaller(marshaller: AggregateMarshaller): void {
    this.marshaller = marshaller;
  }

  /**
   * The unmarshaller.
   *
   * @return The unmarshaller.
   */
  public getUnmarshaller(): AggregateUnmarshaller<ResponseEnvelope> {
    return this.unmarshaller;
  }

  /**
   * The unmarshaller.
   *
   * @param unmarshaller The unmarshaller.
   */
  public setUnmarshaller(unmarshaller: AggregateUnmarshaller<ResponseEnvelope>): void {
    this.unmarshaller = unmarshaller;
  }

  /**
   * Async mode
   *
   * @return {bool} Whether in async mode.
   */
  public getAsync() {
    return this.async;
  }
  
  
  /**
   * Async mode
   *
   * @param {bool} async async mode.
   */
  public setAsync(async: boolean) {
    this.async = async;
  }
  
}

LOG = LogFactory.getLog(OFXV1Connection);

}
