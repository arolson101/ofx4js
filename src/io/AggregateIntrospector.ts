import { ok as assert } from "assert";
import { ChildAggregate } from '../meta/ChildAggregate';
import { Header } from '../meta/Header';
import { Element } from '../meta/Element';
import { AggregateInfo } from './AggregateInfo';
import { AnyMap } from '../collections/collections';


/**
 * Introspector for aggregate information.
 */
export class AggregateIntrospector {

  private static AGGREGATE_CLASSES_BY_NAME: AnyMap = {};
  private static placeholderName = "##PLACEHOLDER##";

  /**
   * Get the aggregate meta information for the specified class.
   *
   * @param clazz the aggregate class.
   * @return The aggregate meta information, or null if the class isn't an aggregate.
   */
  public static getAggregateInfo(clazz: any): AggregateInfo {
    var aggregate: AggregateInfo = clazz.Aggregate;
    if(aggregate != null && aggregate.getOwner() === clazz) {
      return aggregate;
    } else {
      return null;
    }
  }

  private static getAncestorAggregateInfo(clazz: Function): AggregateInfo {
    // traverse inheritence hierarchy.  This is janky because of typescript's __extends function, and may break in the future
    for(var proto: Function = clazz.prototype; proto; proto = Object.getPrototypeOf(proto)) {
      if((<any>proto).constructor && (<any>proto).constructor.Aggregate) {
        return (<any>proto).constructor.Aggregate;
      }
    }
    return null;
  }

  /**
   * Find the aggregate class by name.
   *
   * @param aggregateName The name of the aggregate.
   * @return The aggregate class.
   */
  public static findAggregateByName(aggregateName: string): any {
    return AggregateIntrospector.AGGREGATE_CLASSES_BY_NAME[aggregateName];
  }

  public static addAggregate(clazz: any, name: string) {
    AggregateIntrospector.AGGREGATE_CLASSES_BY_NAME[name] = clazz;

    var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
    if(aggregateInfo) {
      assert(aggregateInfo.getName() === AggregateIntrospector.placeholderName);
      aggregateInfo.setName(name);
    } else {
      var parentInfo: AggregateInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
      clazz.Aggregate = new AggregateInfo(name, clazz, parentInfo);
    }
  }

  public static addChildAggregate(clazz: any, childAggregate: ChildAggregate) {
    var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
    if(!aggregateInfo) {
      var parentInfo: AggregateInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
      aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz, parentInfo);
    }
    assert(aggregateInfo != null);
    if(aggregateInfo) {
      aggregateInfo.addChildAggregate(childAggregate);
    }
  }

  public static addElement(clazz: any, element: Element) {
    var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
    if(!aggregateInfo) {
      var parentInfo: AggregateInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
      aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz, parentInfo);
    }
    assert(aggregateInfo != null);
    if(aggregateInfo) {
      aggregateInfo.addElement(element);
    }
  }

  public static addHeader(clazz: any, header: Header) {
    var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
    if(!aggregateInfo) {
      var parentInfo: AggregateInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
      aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz, parentInfo);
    }
    assert(aggregateInfo != null);
    if(aggregateInfo) {
      aggregateInfo.addHeader(header);
    }
  }
}
