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
///<reference path='StringConversion'/>
///<reference path='DefaultStringConversion'/>
///<reference path='AggregateStackContentHandler'/>
///<reference path='OFXReader'/>
///<reference path='BaseOFXReader'/>

module ofx4js.io {

/**
 * Unmarshaller for aggregate objects.
 * 
 * @author Ryan Heaton
 */
export class AggregateUnmarshaller<A> {

  private clazz: any;
  private conversion: StringConversion;

  constructor(clazz: any) {
    this.clazz = clazz;
    this.conversion = new DefaultStringConversion();
  }

  public unmarshal(arg: StringReader | string): A {
    var stream: StringReader = (<any>arg instanceof StringReader) ? <StringReader>arg : new StringReader(<string>arg);
    var aggregate: A = new this.clazz();
    var reader: OFXReader = this.newReader();
    reader.setContentHandler(new AggregateStackContentHandler<A>(aggregate, this.getConversion()));
    reader.parse(stream);
    return aggregate;
  }

  /**
   * New OFX reader.
   *
   * @return new OFX reader.
   */
  protected newReader(): OFXReader {
    return new BaseOFXReader();
  }

  /**
   * The conversion.
   *
   * @return The conversion.
   */
  public getConversion(): StringConversion {
    return this.conversion;
  }

  /**
   * The conversion.
   *
   * @param conversion The conversion.
   */
  public setConversion(conversion: StringConversion): void {
    this.conversion = conversion;
  }
}

}
