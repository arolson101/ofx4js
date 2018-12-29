import { ok as assert } from "assert";
import { ElementParams, Element } from "./Element";
import { AggregateIntrospector } from "../io/AggregateIntrospector";


export function Element_add<Type>(clazz: any, params: ElementParams<Type>): void {
  assert(params.type != null);
  AggregateIntrospector.addElement(clazz, new Element(params));
}
