import { ok as assert } from "assert";
import { AggregateIntrospector } from "../io/AggregateIntrospector";
import { ChildAggregate, ChildAggregateParams } from "./ChildAggregate";

export function ChildAggregate_add<Type>(clazz: any, params: ChildAggregateParams<Type>): void {
  assert(params.type != null);
  AggregateIntrospector.addChildAggregate(clazz, new ChildAggregate(params));
}
