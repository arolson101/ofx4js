import { StringConversion } from "./StringConversion";
import { DefaultStringConversion } from "./DefaultStringConversion";
import { StringReader } from "./StringReader";
import { OFXReader } from "./OFXReader";
import { BaseOFXReader } from "./BaseOFXReader";
import { AggregateStackContentHandler } from "./AggregateStackContentHandler";


/**
 * Unmarshaller for aggregate objects.
 */
export class AggregateUnmarshaller<A> {

  private clazz: any;
  private conversion: StringConversion;

  constructor(clazz: { new (): A }) {
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
