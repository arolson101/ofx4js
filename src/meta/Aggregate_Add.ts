import { AggregateIntrospector } from "../io/AggregateIntrospector";

export function Aggregate_add(clazz: Object, value: string = "#NOT_SET#"): void {
  AggregateIntrospector.addAggregate(clazz, value);
}
