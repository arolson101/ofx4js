import { BasePosition } from "./BasePosition";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";


/**
 * Represents other types of positions.
 * @see "Section 13.9.2.6.1, OFX Spec"
 */
export class OtherPosition extends BasePosition {
}

Aggregate_add( OtherPosition, "POSOTHER" );
