import { OFXV1Connection } from "./OFXV1Connection";
import { OFXWriter } from "../../io/OFXWriter";
import { OFXV2Writer } from "../../io/v2/OFXV2Writer";
import { OutputBuffer } from "../../io/StreamWriter";

export class OFXV2Connection extends OFXV1Connection {

  //@Override
  protected newOFXWriter(out: OutputBuffer): OFXWriter {
    return new OFXV2Writer(out);
  }
}
