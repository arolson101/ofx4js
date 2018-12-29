import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";


export class T1099Request extends RequestMessage {
}

Aggregate_add( T1099Request, "STMTRQ" );
