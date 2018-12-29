import * as assert from "assert";
import { HeaderParams, Header } from "./Header";
import { AggregateIntrospector } from "../io/AggregateIntrospector";


export function Header_add<Type>(clazz: any, params: HeaderParams<Type>): void {
  assert.ok(params.type != null);
  AggregateIntrospector.addHeader(clazz, new Header(params));
}
