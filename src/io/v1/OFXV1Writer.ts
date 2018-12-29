import { OFXWriter } from "../OFXWriter";
import { StreamWriter, OutputBuffer } from "../StreamWriter";
import { OFXException } from "../../OFXException";
import { StringMap } from "../../collections/collections";


//import Map = java.util.Map;

/**
 * OFX writer to SGML, suitable for OFX versions < 2.0.
 */
export class OFXV1Writer implements OFXWriter {

  private LINE_SEPARATOR: string;
  protected headersWritten: boolean;
  protected writer: StreamWriter;
  private writeAttributesOnNewLine: boolean;

  constructor(out: OutputBuffer | StreamWriter) {
    this.LINE_SEPARATOR = "\r\n";
    this.headersWritten = false;
    this.writeAttributesOnNewLine = false;

    if(out instanceof StreamWriter) {
      this.writer = out;
    } else if(out instanceof OutputBuffer) {
      this.writer = this.newWriter(out);
    } else {
      throw new OFXException("invalid parameter type");
    }
  }

  protected newWriter(out: OutputBuffer): StreamWriter {
    return new StreamWriter(out, "ISO-8859-1");
  }

  public writeHeaders(headers: StringMap) /*throws IOException*/: void {
    if (this.headersWritten) {
      throw new OFXException("Headers have already been written!");
    }

    //write out the 1.0 headers
    this.println("OFXHEADER:100");
    this.println("DATA:OFXSGML");
    this.println("VERSION:102");

    this.print("SECURITY:");
    var security: string = headers["SECURITY"];
    if (security == null) {
      security = "NONE";
    }
    this.println(security);
    this.println("ENCODING:USASCII"); //too many ofx v1 servers don't read unicode...
    this.println("CHARSET:1252"); //windows-compatible.
    this.println("COMPRESSION:NONE");
    this.print("OLDFILEUID:");
    var olduid: string = headers["OLDFILEUID"];
    if (olduid == null) {
      olduid = "NONE";
    }
    this.println(olduid);
    this.print("NEWFILEUID:");
    var uid: string = headers["NEWFILEUID"];
    if (uid == null) {
      uid = "NONE";
    }
    this.println(uid);
    this.println();

    this.headersWritten = true;
  }

  public writeStartAggregate(aggregateName: string) /*throws IOException*/: void {
    this.print('<');
    this.print(aggregateName);
    this.print('>');
    if (this.isWriteAttributesOnNewLine()) {
      this.println();
    }
  }

  public writeElement(name: string, value: string) /*throws IOException*/: void {
    if ((value == null) || ("" === value)) {
      throw new OFXException("Illegal element value for element '" + name + "' (value must not be null or empty).");
    }

    //todo: optimize performance of the character escaping
    if (value.indexOf('&') >= 0) {
      value = value.replace(/\\&/g, "&amp;");
    }

    if (value.indexOf('<') >= 0) {
      value = value.replace(/</g, "&lt;");
    }

    if (value.indexOf('>') >= 0) {
      value = value.replace(/>/g, "&gt;");
    }

    this.print('<');
    this.print(name);
    this.print('>');
    this.print(value);
    if (this.isWriteAttributesOnNewLine()) {
      this.println();
    }
  }

  public writeEndAggregate(aggregateName: string) /*throws IOException*/:void {
    this.print("</");
    this.print(aggregateName);
    this.print('>');
    if (this.isWriteAttributesOnNewLine()) {
      this.println();
    }
  }

  public isWriteAttributesOnNewLine(): boolean {
    return this.writeAttributesOnNewLine;
  }

  public setWriteAttributesOnNewLine(writeAttributesOnNewLine: boolean): void {
    this.writeAttributesOnNewLine = writeAttributesOnNewLine;
  }

  public close() /*throws IOException*/: void {
    this.flush();
    this.writer.close();
  }

  public flush() /*throws IOException*/: void {
    this.writer.flush();
  }

  /*protected*/ println(line: string = null) /*throws IOException*/: void {
    if(line != null) {
      this.print(line);
    }
    this.writer.write(this.LINE_SEPARATOR);
  }

  /*protected*/ print(line: string) /*throws IOException*/: void {
    this.writer.write(line == null ? "null" : line);
  }
}
