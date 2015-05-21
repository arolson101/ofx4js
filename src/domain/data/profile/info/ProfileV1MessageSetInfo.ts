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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../profile/VersionSpecificMessageSetInfo'/>

module ofx4js.domain.data.profile.info {

import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import Aggregate_add = ofx4js.meta.Aggregate_add;

/**
 * @author Ryan Heaton
 */
export class ProfileV1MessageSetInfo extends VersionSpecificMessageSetInfo {
  public getMessageSetType(): MessageSetType {
    return MessageSetType.profile;
  }
}

Aggregate_add( ProfileV1MessageSetInfo, "PROFMSGSETV1" );

}
