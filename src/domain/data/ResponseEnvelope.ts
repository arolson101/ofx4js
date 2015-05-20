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
import {ApplicationSecurity} from "ApplicationSecurity";
import {MessageSetType} from "MessageSetType";
import {ResponseMessageSet} from "ResponseMessageSet";
import {SortedSet} from "../../collections/SortedSet";
import {Aggregate_add} from "../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../meta/ChildAggregate_add";
import {Header_add} from "../../meta/Header_add";
import {SignonResponseMessageSet} from "signon/SignonResponseMessageSet";
import {SignonResponse} from "signon/SignonResponse";

//import java.util.SortedSet;

/**
 * Envelope for enclosing an OFX response.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.3, OFX Spec"
 */
export class ResponseEnvelope {

  //headers
  private security: ApplicationSecurity;
  private UID: string;

  //content
  private messageSets: SortedSet<ResponseMessageSet>;

  /**
   * The security of this envelope.
   *
   * @return The security of this envelope.
   * @see "Section 2.2, OFX spec"
   */
  public getSecurity(): ApplicationSecurity {
    return this.security;
  }

  /**
   * The security of this envelope.
   *
   * @param security The security of this envelope.
   * @see "Section 2.2, OFX spec"
   */
  public setSecurity(security: ApplicationSecurity): void {
    this.security = security;
  }

  /**
   * The UID for the envelope.
   *
   * @return The UID for the envelope.
   * @see "Section 2.2, OFX spec"
   */
  public getUID(): string {
    return this.UID;
  }

  /**
   * The UID for the envelope.
   *
   * @param UID The UID for the envelope.
   * @see "Section 2.2, OFX spec"
   */
  public setUID(UID: string): void {
    this.UID = UID;
  }

  /**
   * The message sets that make up the content of this response.
   *
   * @return The message sets that make up the content of this response.
   * @see "Section 2.4.5, OFX Spec"
   */
  public getMessageSets(): SortedSet<ResponseMessageSet> {
    return this.messageSets;
  }

  /**
   * The message sets that make up the content of this response.
   *
   * @param messageSets The message sets that make up the content of this response.
   * @see "Section 2.4.5, OFX Spec"
   */
  public setMessageSets(messageSets: SortedSet<ResponseMessageSet>): void {
    this.messageSets = messageSets;
  }

  /**
   * Helper method for looking up the signon response.
   *
   * @return The signon response, or null if none found.
   */
  public getSignonResponse(): SignonResponse {
    var type: MessageSetType = MessageSetType.signon;
    var message: ResponseMessageSet = this.getMessageSet(type);

    if (message != null) {
      return (<SignonResponseMessageSet> message).getSignonResponse();
    }
    else {
      return null;
    }
  }

  /**
   * Get the message set of the specified type.
   *
   * @param type The type.
   * @return The message set, or null.
   */
  public getMessageSet(type: MessageSetType): ResponseMessageSet {
    var message: ResponseMessageSet = null;
    if (this.messageSets != null) {
      for (var i in this.messageSets.values()) {
        var messageSet: ResponseMessageSet = this.messageSets.values()[i];
        if (messageSet.getType() == type) {
          message = messageSet;
          break;
        }
      }
    }
    return message;
  }
}

Aggregate_add( ResponseEnvelope, "OFX" );
Header_add(ResponseEnvelope, { name: "SECURITY", type: ApplicationSecurity, read: ResponseEnvelope.prototype.getSecurity, write: ResponseEnvelope.prototype.setSecurity });
Header_add(ResponseEnvelope, { name: "NEWFILEUID", type: String, read: ResponseEnvelope.prototype.getUID, write: ResponseEnvelope.prototype.setUID });
ChildAggregate_add(ResponseEnvelope, { order: 1, type: SortedSet, collectionEntryType: ResponseMessageSet, read: ResponseEnvelope.prototype.getMessageSets, write: ResponseEnvelope.prototype.setMessageSets });


