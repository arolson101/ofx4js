import { RequestEnvelope } from "../../domain/data/RequestEnvelope";
import { ResponseEnvelope } from "../../domain/data/ResponseEnvelope";


/**
 * Connection to an OFX interface.
 */
export interface OFXConnection {

  /**
   * Send a request.
   *
   * @param request The request to send.
   * @param url The URL to which to send the request.
   * @return The response.
   */
  sendRequest(request: RequestEnvelope, url: string) /*throws OFXConnectionException*/: Promise<ResponseEnvelope>;

}
