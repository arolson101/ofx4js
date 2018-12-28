import { v1 } from 'uuid';
import { parser } from 'sax';

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base exception class.
 *
 * @author Ryan Heaton
 */
class OFXException extends Error {
    constructor(message = null, e = null) {
        super(message);
        this.message = message;
        this.innerError = e;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class OFXRuntimeException extends OFXException {
    constructor(message = null) {
        super(message);
    }
}

/**
 * Exception based on a StatusCode response
 *
 * @author Michael Mosseri
 */
class OFXStatusException extends OFXException {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class OFXTransactionException extends OFXException {
    constructor(message = null) {
        super(message);
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Thrown for unsupported OFX security type.
 *
 * @author Ryan Heaton
 */
class UnsupportedOFXSecurityTypeException extends OFXException {
    constructor(message) {
        super(message);
    }
}

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @author Ryan Heaton
 */
class NoOFXResponseException extends OFXException {
    constructor(message = null) {
        super(message);
    }
}

/**
 * Default application context.
 *
 * @author Ryan Heaton
 */
class DefaultApplicationContext {
    constructor(appId, appVersion) {
        this.appId = appId;
        this.appVersion = appVersion;
    }
    getAppId() {
        return this.appId;
    }
    getAppVersion() {
        return this.appVersion;
    }
}

/**
 * @author Ryan Heaton
 */
class OFXApplicationContextHolder {
    /**
     * Get the current (thread-safe) context.
     *
     * @return The thread-safe context.
     */
    static getCurrentContext() {
        //todo: implement a strategy (perhaps for thread-local access or something)?
        return this.CURRENT_CONTEXT;
    }
    /**
     * Set the current context.
     *
     * @param context The context.
     */
    static setCurrentContext(context) {
        this.CURRENT_CONTEXT = context;
    }
}
OFXApplicationContextHolder.CURRENT_CONTEXT = new DefaultApplicationContext("Money", "1600"); //some apps fail unless you're Quicken or Money...

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The message set type, used to define message set order in the envelope.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.5.2, OFX spec"
 */
var MessageSetType;
(function (MessageSetType) {
    MessageSetType[MessageSetType["signon"] = 0] = "signon";
    MessageSetType[MessageSetType["signup"] = 1] = "signup";
    MessageSetType[MessageSetType["banking"] = 2] = "banking";
    MessageSetType[MessageSetType["creditcard"] = 3] = "creditcard";
    MessageSetType[MessageSetType["investment"] = 4] = "investment";
    MessageSetType[MessageSetType["interbank_transfer"] = 5] = "interbank_transfer";
    MessageSetType[MessageSetType["wire_transfer"] = 6] = "wire_transfer";
    MessageSetType[MessageSetType["payments"] = 7] = "payments";
    MessageSetType[MessageSetType["email"] = 8] = "email";
    MessageSetType[MessageSetType["investment_security"] = 9] = "investment_security";
    MessageSetType[MessageSetType["profile"] = 10] = "profile";
    MessageSetType[MessageSetType["tax1099"] = 11] = "tax1099";
})(MessageSetType || (MessageSetType = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 *
 * @see "OFX Spec, Section 11.3.1.1"
 */
var AccountType;
(function (AccountType) {
    AccountType[AccountType["CHECKING"] = 0] = "CHECKING";
    AccountType[AccountType["SAVINGS"] = 1] = "SAVINGS";
    AccountType[AccountType["MONEYMRKT"] = 2] = "MONEYMRKT";
    AccountType[AccountType["CREDITLINE"] = 3] = "CREDITLINE";
})(AccountType || (AccountType = {}));

class Log {
    constructor() {
        this.infoEnabled = false;
        this.debugEnabled = false;
    }
    setInfoEnabled(value) {
        this.infoEnabled = value;
    }
    isInfoEnabled() {
        return this.infoEnabled;
    }
    info(...texts) {
        if (this.isInfoEnabled()) {
            console.log(texts);
        }
    }
    setDebugEnabled(value) {
        this.debugEnabled = value;
    }
    isDebugEnabled() {
        return this.debugEnabled;
    }
    debug(...texts) {
        if (this.isDebugEnabled()) {
            console.log(texts);
        }
    }
    warning(...texts) {
        console.log(texts);
    }
    error(...texts) {
        console.log(texts);
    }
}
class LogFactory {
    static getLog(clazz) {
        if (!clazz.Log) {
            clazz.Log = new Log();
        }
        return clazz.Log;
    }
}

class SortedSet {
    constructor(compareFcn) {
        this.valueArray = [];
        this.compareFcn = compareFcn;
    }
    values() {
        if (!this.isSorted) {
            console.assert(!!this.compareFcn);
            this.valueArray.sort(this.compareFcn);
            this.isSorted = true;
        }
        return this.valueArray;
    }
    insert(element) {
        var index = this.valueArray.indexOf(element);
        if (index == -1) {
            this.isSorted = false;
            this.valueArray.push(element);
        }
    }
    push(element) {
        this.insert(element);
    }
    remove(element) {
        var index = this.valueArray.indexOf(element);
        if (index == -1) {
            return false;
        }
        this.valueArray = this.valueArray.splice(index, 1);
    }
    count() {
        return this.valueArray.length;
    }
}

/**
 * convenience function to supply a default value if the given value is not specified
 */
function _default(value, defaultValue) {
    return (typeof value !== 'undefined') ? value : defaultValue;
}
function isAssignableFrom(entryType, assignableTo) {
    return (assignableTo === entryType) ||
        ((typeof entryType === "function") && (assignableTo.prototype instanceof entryType));
}
/**
 * an interface to read and write a value into an object
 */
class PropertyDescriptor {
    constructor(params) {
        this.propertyType = params.type;
        this.readMethod = params.read;
        this.writeMethod = params.write;
    }
    getPropertyType() {
        return this.propertyType;
    }
    getReadMethod() {
        return this.readMethod;
    }
    getWriteMethod() {
        return this.writeMethod;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Marks a method as providing a child aggregate (or set of them to a top-level aggregate).
 *
 * @author Ryan Heaton
 */
class ChildAggregate extends PropertyDescriptor {
    constructor(params) {
        super(params);
        this._order = params.order;
        this._name = _default(params.name, "##not_specified##");
        this._required = _default(params.required, false);
        this._collectionEntryType = _default(params.collectionEntryType, null);
    }
    /**
     * Used to specify the name of the aggregate in its context as a child aggregate.
     *
     * @return Used to specify the name of the aggregate in its context as a child aggregate.
     */
    name() {
        return this._name;
    }
    /**
     * Whether this aggregate is required.
     *
     * @return Whether this aggregate is required.
     */
    required() {
        return this._required;
    }
    /**
     * The order this child aggregate comes in its parent aggregate.
     *
     * @return The order this child aggregate comes in its parent aggregate.
     */
    order() {
        return this._order;
    }
    /**
     * If the type is a collection, return the type of the elements of the collection (otherwise null)
     */
    collectionEntryType() {
        return this._collectionEntryType;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An OFX element, applied to a javabean property.
 *
 * @author Ryan Heaton
 */
class Element extends PropertyDescriptor {
    constructor(params) {
        super(params);
        this._name = params.name;
        this._required = _default(params.required, false);
        this._order = params.order;
        this._collectionEntryType = _default(params.collectionEntryType, null);
    }
    /**
     * The name of the element.
     *
     * @return The name of the element.
     */
    name() {
        return this._name;
    }
    /**
     * Whether this element is required.
     *
     * @return Whether this element is required.
     */
    required() {
        return this._required;
    }
    /**
     * The order this element comes in its parent aggregate.
     *
     * @return The order this element comes in its parent aggregate.
     */
    order() {
        return this._order;
    }
    /**
     * If the type is a collection, return the type of the elements of the collection (otherwise null)
     */
    collectionEntryType() {
        return this._collectionEntryType;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import Log = org.apache.commons.logging.Log;
//import LogFactory = org.apache.commons.logging.LogFactory;
var AggregateAttributeType;
(function (AggregateAttributeType) {
    AggregateAttributeType[AggregateAttributeType["CHILD_AGGREGATE"] = 0] = "CHILD_AGGREGATE";
    AggregateAttributeType[AggregateAttributeType["ELEMENT"] = 1] = "ELEMENT";
})(AggregateAttributeType || (AggregateAttributeType = {}));
/**
 * A generic descriptor for an attribute of an OFX aggregate.
 *
 * @author Ryan Heaton
 */
class AggregateAttribute {
    constructor(arg) {
        if (arg instanceof Element) {
            this.AggregateAttributeFromElement(arg);
        }
        else if (arg instanceof ChildAggregate) {
            this.AggregateAttributeFromChildAggregate(arg);
        }
        else {
            throw new OFXException("invalid type");
        }
    }
    AggregateAttributeFromElement(elementInfo) {
        this.readMethod = elementInfo.getReadMethod();
        this.writeMethod = elementInfo.getWriteMethod();
        if (this.readMethod == null) {
            throw new OFXException("Illegal property for aggregate: no read method.");
        }
        else if (this.writeMethod == null) {
            throw new OFXException("Illegal property for aggregate: no write method.");
        }
        this.attributeType = elementInfo.getPropertyType();
        this.collectionEntryType = null;
        this.name = elementInfo.name();
        this.order = elementInfo.order();
        this.required = elementInfo.required();
        this.type = AggregateAttributeType.ELEMENT;
        this.toString_ = "Element '" + this.name + "'";
        this.collection = false;
        //todo: validate known/supported element types here?
    }
    AggregateAttributeFromChildAggregate(childAggregate) {
        this.readMethod = childAggregate.getReadMethod();
        this.writeMethod = childAggregate.getWriteMethod();
        if (this.readMethod == null) {
            throw new OFXException("Illegal property for aggregate: no read method.");
        }
        else if (this.writeMethod == null) {
            throw new OFXException("Illegal property for aggregate: no write method.");
        }
        this.attributeType = childAggregate.getPropertyType();
        this.collection = false;
        if (childAggregate.collectionEntryType()) {
            this.collection = true;
            this.name = null;
            this.collectionEntryType = childAggregate.collectionEntryType();
        }
        else if ("##not_specified##" === childAggregate.name()) {
            var aggregateInfo = AggregateIntrospector.getAggregateInfo(this.attributeType);
            if (aggregateInfo == null) {
                throw new OFXException("Illegal child aggregate type '" + childAggregate.getPropertyType() + "': no aggregate information available.");
            }
            this.name = aggregateInfo.getName();
            if ("##not_specified##" === this.name) {
                throw new OFXException("Illegal child aggregate type '" + childAggregate.getPropertyType() + "': a child aggregate name must be specified.");
            }
            this.collectionEntryType = null;
        }
        else {
            this.name = childAggregate.name();
            this.collectionEntryType = null;
        }
        this.order = childAggregate.order();
        this.required = childAggregate.required();
        this.type = AggregateAttributeType.CHILD_AGGREGATE;
        this.toString_ = "ChildAggregate '" + this.name + "'";
    }
    get(instance) {
        let val = this.readMethod.call(instance);
        if (this.attributeType && val in this.attributeType) {
            val = this.attributeType[val];
        }
        return val;
    }
    set(value, instance) {
        if (this.collection) {
            var collection = this.get(instance);
            if (collection == null) {
                if (this.attributeType === SortedSet) {
                    console.assert("contentCompare" in this.collectionEntryType);
                    collection = new SortedSet(this.collectionEntryType.contentCompare);
                }
                else {
                    collection = new this.attributeType();
                }
            }
            collection.push(value);
            value = collection;
        }
        this.writeMethod.call(instance, value);
    }
    getAttributeType() {
        return this.attributeType;
    }
    getArrayEntryType() {
        return this.collectionEntryType;
    }
    getName() {
        return this.name;
    }
    isRequired() {
        return this.required;
    }
    getOrder() {
        return this.order;
    }
    getType() {
        return this.type;
    }
    static contentCompare(left, right) {
        return left.order - right.order;
    }
    //  public int compareTo(other: AggregateAttribute) {
    //    return this.order - other.order;
    //  }
    isArray() {
        return this.collection;
    }
    //@Override
    toString() {
        return this.toString_;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Holder for meta information about an aggregate class.
 *
 * @author Ryan Heaton
 */
class AggregateInfo {
    constructor(name, owner, parentInfo) {
        this.name = name;
        this.owner = owner;
        this.headers = {};
        this.attributes = new SortedSet(AggregateAttribute.contentCompare);
        if (parentInfo) {
            for (var header in parentInfo.headers) {
                this.headers[header] = parentInfo.headers[header];
            }
            var parentAttributes = parentInfo.attributes.values();
            for (var i in parentAttributes) {
                var attribute = parentAttributes[i];
                this.attributes.insert(attribute);
            }
        }
    }
    /**
     * The name of the aggregate.
     *
     * @return The name of the aggregate.
     */
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getOwner() {
        return this.owner;
    }
    /**
     * The attributes.
     *
     * @return The attributes.
     */
    getAttributes() {
        return this.attributes;
    }
    /**
     * Get the attribute by the specified name.
     *
     * @param name The name of the attribute.
     * @param orderHint The order at which the attribute should come after in case there are more than one candidates.
     * @param assignableTo The class this attribute must be assignable to
     * @return The attribute by the specified name,
     * or if there are more than one by that name,
     * the first one after the specified order,
     * or if there are none then the first collection that
     * comes after the order hint, or the latest if there
     * are none that come after the order hint, or null.
     */
    getAttribute(name, orderHint, assignableTo = null) {
        var candidates = new Array();
        var collectionBucket = null;
        for (var i in this.attributes.values()) {
            var attribute = this.attributes.values()[i];
            if (name === attribute.getName()) {
                candidates.push(attribute);
            }
            else if (attribute.isArray()) {
                if (assignableTo != null) {
                    // Verify it's the right generic type.
                    var entryType = attribute.getArrayEntryType();
                    if (entryType != null && !isAssignableFrom(entryType, assignableTo)) {
                        // Array is of wrong type.
                        continue;
                    }
                }
                if (collectionBucket == null || collectionBucket.getOrder() < orderHint) {
                    //the default is the first collection that comes after the order hint, or the latest if there are none that come after the order hint.
                    collectionBucket = attribute;
                }
            }
        }
        if (candidates.length != 0) {
            if (candidates.length == 1) {
                return candidates[0];
            }
            else {
                for (var candidate of candidates) {
                    if (candidate.getOrder() >= orderHint) {
                        return candidate;
                    }
                }
            }
        }
        return collectionBucket;
    }
    /**
     * Whether this aggregate has headers.
     *
     * @return Whether this aggregate has headers.
     */
    hasHeaders() {
        return Object.keys(this.headers).length != 0;
    }
    /**
     * Get the headers defined by the specific aggregate instance.
     *
     * @param instance The aggregate instance.
     * @return The headers.
     */
    getHeaders(instance) {
        var headers = {};
        for (var headerKey in this.headers) {
            var header = this.headers[headerKey];
            var headerValue = header.getReadMethod().call(instance);
            headers[header.name()] = headerValue;
        }
        return headers;
    }
    /**
     * The type of the specified header.
     *
     * @param name The header name.
     * @return The header type, or null if no header by the specified name exists.
     */
    getHeaderType(name) {
        return (name in this.headers) ? this.headers[name].getPropertyType() : null;
    }
    /**
     * Set the header value for the specified instance.
     *
     * @param instance The instance.
     * @param name     The name of the header.
     * @param value    the value of the header.
     */
    setHeader(instance, name, value) {
        if (name in this.headers) {
            this.headers[name].getWriteMethod().call(instance, value);
        }
    }
    addChildAggregate(childAggregate) {
        var attribute = new AggregateAttribute(childAggregate);
        this.attributes.insert(attribute);
    }
    addElement(element) {
        var attribute = new AggregateAttribute(element);
        this.attributes.insert(attribute);
    }
    addHeader(header) {
        console.assert(header.name());
        this.headers[header.name()] = header;
    }
}

//import Log = org.apache.commons.logging.Log;
//import LogFactory = org.apache.commons.logging.LogFactory;
var LOG;
/**
 * Introspector for aggregate information.
 *
 * @author Ryan Heaton
 */
class AggregateIntrospector {
    /**
     * Get the aggregate meta information for the specified class.
     *
     * @param clazz the aggregate class.
     * @return The aggregate meta information, or null if the class isn't an aggregate.
     */
    static getAggregateInfo(clazz) {
        var aggregate = clazz.Aggregate;
        if (aggregate != null && aggregate.getOwner() === clazz) {
            return aggregate;
        }
        else {
            return null;
        }
    }
    static getAncestorAggregateInfo(clazz) {
        // traverse inheritence hierarchy.  This is janky because of typescript's __extends function, and may break in the future
        for (var proto = clazz.prototype; proto; proto = Object.getPrototypeOf(proto)) {
            if (proto.constructor && proto.constructor.Aggregate) {
                return proto.constructor.Aggregate;
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
    static findAggregateByName(aggregateName) {
        return AggregateIntrospector.AGGREGATE_CLASSES_BY_NAME[aggregateName];
    }
    static addAggregate(clazz, name) {
        AggregateIntrospector.AGGREGATE_CLASSES_BY_NAME[name] = clazz;
        var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
        if (aggregateInfo) {
            console.assert(aggregateInfo.getName() === AggregateIntrospector.placeholderName);
            aggregateInfo.setName(name);
        }
        else {
            var parentInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
            clazz.Aggregate = new AggregateInfo(name, clazz, parentInfo);
        }
    }
    static addChildAggregate(clazz, childAggregate) {
        var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
        if (!aggregateInfo) {
            var parentInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
            aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz, parentInfo);
        }
        console.assert(aggregateInfo != null);
        if (aggregateInfo) {
            aggregateInfo.addChildAggregate(childAggregate);
        }
    }
    static addElement(clazz, element) {
        var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
        if (!aggregateInfo) {
            var parentInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
            aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz, parentInfo);
        }
        console.assert(aggregateInfo != null);
        if (aggregateInfo) {
            aggregateInfo.addElement(element);
        }
    }
    static addHeader(clazz, header) {
        var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
        if (!aggregateInfo) {
            var parentInfo = AggregateIntrospector.getAncestorAggregateInfo(clazz);
            aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz, parentInfo);
        }
        console.assert(aggregateInfo != null);
        if (aggregateInfo) {
            aggregateInfo.addHeader(header);
        }
    }
}
AggregateIntrospector.AGGREGATE_CLASSES_BY_NAME = {};
AggregateIntrospector.placeholderName = "##PLACEHOLDER##";
LOG = LogFactory.getLog(AggregateIntrospector);

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Aggregate_add(clazz, value = "#NOT_SET#") {
    AggregateIntrospector.addAggregate(clazz, value);
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Element_add(clazz, params) {
    console.assert(params.type != null);
    AggregateIntrospector.addElement(clazz, new Element(params));
}

/**
 * Base bank account details.
 *
 * @author Ryan Heaton
 * @see "OFX Spec, Section 11.3.1"
 */
class BankAccountDetails {
    /**
     * The routing and transit number.
     *
     * @return The routing and transit number.
     */
    getBankId() {
        return this.bankId;
    }
    /**
     * The routing and transit number.
     *
     * @param bankId The routing and transit number.
     */
    setBankId(bankId) {
        this.bankId = bankId;
    }
    /**
     * The routing and transit number.
     *
     * @return The routing and transit number.
     */
    getRoutingNumber() {
        return this.getBankId();
    }
    /**
     * The routing and transit number.
     *
     * @param routingNumber The routing and transit number.
     */
    setRoutingNumber(routingNumber) {
        this.setBankId(routingNumber);
    }
    /**
     * The branch id.
     *
     * @return The branch id.
     */
    getBranchId() {
        return this.branchId;
    }
    /**
     * The branch id.
     *
     * @param branchId The branch id.
     */
    setBranchId(branchId) {
        this.branchId = branchId;
    }
    /**
     * The account number.
     *
     * @return The account number.
     */
    getAccountNumber() {
        return this.accountNumber;
    }
    /**
     * The account number.
     *
     * @param accountNumber The account number.
     */
    setAccountNumber(accountNumber) {
        this.accountNumber = accountNumber;
    }
    /**
     * The account type.
     *
     * @return The account type.
     */
    getAccountType() {
        return this.accountType;
    }
    /**
     * The account type.
     *
     * @param accountType The account type.
     */
    setAccountType(accountType) {
        this.accountType = accountType;
    }
    /**
     * The account key.
     *
     * @return The account key.
     */
    getAccountKey() {
        return this.accountKey;
    }
    /**
     * The account key.
     *
     * @param accountKey The account key.
     */
    setAccountKey(accountKey) {
        this.accountKey = accountKey;
    }
}
Aggregate_add(BankAccountDetails);
Element_add(BankAccountDetails, { name: "BANKID", required: true, order: 0, type: String, read: BankAccountDetails.prototype.getBankId, write: BankAccountDetails.prototype.setBankId });
Element_add(BankAccountDetails, { name: "BRANCHID", order: 10, type: String, read: BankAccountDetails.prototype.getBranchId, write: BankAccountDetails.prototype.setBranchId });
Element_add(BankAccountDetails, { name: "ACCTID", required: true, order: 20, type: String, read: BankAccountDetails.prototype.getAccountNumber, write: BankAccountDetails.prototype.setAccountNumber });
Element_add(BankAccountDetails, { name: "ACCTTYPE", required: true, order: 30, type: AccountType, read: BankAccountDetails.prototype.getAccountType, write: BankAccountDetails.prototype.setAccountType });
Element_add(BankAccountDetails, { name: "ACCTKEY", order: 40, type: String, read: BankAccountDetails.prototype.getAccountKey, write: BankAccountDetails.prototype.setAccountKey });

/**
 * @author Ryan Heaton
 *
 * @see "OFX Spec, Section 11.3.2"
 */
class CreditCardAccountDetails {
    /**
     * The account number.
     *
     * @return The account number.
     */
    getAccountNumber() {
        return this.accountNumber;
    }
    /**
     * The account number.
     *
     * @param accountNumber The account number.
     */
    setAccountNumber(accountNumber) {
        this.accountNumber = accountNumber;
    }
    /**
     * The account key.
     *
     * @return The account key.
     */
    getAccountKey() {
        return this.accountKey;
    }
    /**
     * The account key.
     *
     * @param accountKey The account key.
     */
    setAccountKey(accountKey) {
        this.accountKey = accountKey;
    }
}
Aggregate_add(CreditCardAccountDetails);
Element_add(CreditCardAccountDetails, { name: "ACCTID", required: true, order: 0, type: String, read: CreditCardAccountDetails.prototype.getAccountNumber, write: CreditCardAccountDetails.prototype.setAccountNumber });
Element_add(CreditCardAccountDetails, { name: "ACCTKEY", order: 10, type: String, read: CreditCardAccountDetails.prototype.getAccountKey, write: CreditCardAccountDetails.prototype.setAccountKey });

/**
 * Aggregate for the details that identifity a brokerage account.
 *
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.1"
 */
class InvestmentAccountDetails {
    /**
     * Gets the broker id.
     *
     * @return the id of the broker
     */
    getBrokerId() {
        return this.brokerId;
    }
    /**
     * Sets the broker id.
     *
     * @param brokerId the id of the broker
     */
    setBrokerId(brokerId) {
        this.brokerId = brokerId;
    }
    /**
     * Gets the account number.
     *
     * @return the account number
     */
    getAccountNumber() {
        return this.accountNumber;
    }
    /**
     * Sets the account number.
     *
     * @param accountNumber the account number
     */
    setAccountNumber(accountNumber) {
        this.accountNumber = accountNumber;
    }
    /**
     * Gets the account key.
     *
     * @return the account key
     */
    getAccountKey() {
        return this.accountKey;
    }
    /**
     * Sets the account key.
     *
     * @param accountKey the account key
     */
    setAccountKey(accountKey) {
        this.accountKey = accountKey;
    }
}
Aggregate_add(InvestmentAccountDetails);
Element_add(InvestmentAccountDetails, { name: "BROKERID", required: true, order: 0, type: String, read: InvestmentAccountDetails.prototype.getBrokerId, write: InvestmentAccountDetails.prototype.setBrokerId });
Element_add(InvestmentAccountDetails, { name: "ACCTID", required: true, order: 20, type: String, read: InvestmentAccountDetails.prototype.getAccountNumber, write: InvestmentAccountDetails.prototype.setAccountNumber });
Element_add(InvestmentAccountDetails, { name: "ACCTKEY", order: 40, type: String, read: InvestmentAccountDetails.prototype.getAccountKey, write: InvestmentAccountDetails.prototype.setAccountKey });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class StatementRange {
    constructor() {
        this.includeTransactions = true;
    }
    /**
     * The start of the statement range.
     *
     * @return The start of the statement range.
     */
    getStart() {
        return this.start;
    }
    /**
     * The start of the statement range.
     *
     * @param start The start of the statement range.
     */
    setStart(start) {
        this.start = start;
    }
    /**
     * The end of the statement range.
     *
     * @return The end of the statement range.
     */
    getEnd() {
        return this.end;
    }
    /**
     * The end of the statement range.
     *
     * @param end The end of the statement range.
     */
    setEnd(end) {
        this.end = end;
    }
    /**
     * Whether to include transactions.
     *
     * @return Whether to include transactions.
     */
    getIncludeTransactions() {
        return this.includeTransactions;
    }
    /**
     * Whether to include transactions.
     *
     * @param includeTransactions Whether to include transactions.
     */
    setIncludeTransactions(includeTransactions) {
        this.includeTransactions = includeTransactions;
    }
}
Aggregate_add(StatementRange, "INCTRAN");
Element_add(StatementRange, { name: "DTSTART", order: 0, type: Date, read: StatementRange.prototype.getStart, write: StatementRange.prototype.setStart });
Element_add(StatementRange, { name: "DTEND", order: 10, type: Date, read: StatementRange.prototype.getEnd, write: StatementRange.prototype.setEnd });
Element_add(StatementRange, { name: "INCLUDE", required: true, order: 20, type: Boolean, read: StatementRange.prototype.getIncludeTransactions, write: StatementRange.prototype.setIncludeTransactions });

/**
 * Base account implementation. Supports banking and credit card accounts.
 *
 * @author Ryan Heaton
 */
class BaseAccountImpl {
    constructor(details, username, password, institution) {
        this.details = details;
        this.username = username;
        this.password = password;
        this.institution = institution;
        this.messageType = this.getMessageSetType(details);
    }
    /**
     * Get the message set type of the specified details.
     *
     * @param details The details.
     * @return The message set type.
     */
    getMessageSetType(details) {
        var messageType;
        if (details instanceof BankAccountDetails) {
            messageType = MessageSetType.banking;
        }
        else if (this.getDetails() instanceof CreditCardAccountDetails) {
            messageType = MessageSetType.creditcard;
        }
        else if (this.getDetails() instanceof InvestmentAccountDetails) {
            messageType = MessageSetType.investment;
        }
        else {
            throw new OFXException("Illegal details");
        }
        return messageType;
    }
    readStatement(start, end) {
        var range = new StatementRange();
        range.setIncludeTransactions(true);
        range.setStart(start);
        range.setEnd(end);
        var request = this.institution.createAuthenticatedRequest(this.username, this.password);
        var requestTransaction = this.createTransaction();
        requestTransaction.setWrappedMessage(this.createStatementRequest(this.getDetails(), range));
        request.getMessageSets().insert(this.createRequestMessageSet(requestTransaction));
        return this.institution.sendRequest(request)
            .then((response) => {
            this.institution.doGeneralValidationChecks(request, response);
            return this.unwrapStatementResponse(response);
        });
    }
    /**
     * The details of this account.
     *
     * @return The details of this account.
     */
    getDetails() {
        return this.details;
    }
    /**
     * The message set type.
     *
     * @return The message set type.
     */
    getMessageType() {
        return this.messageType;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
* A message set enclosed in an OFX request envelope.
*
* @author Ryan Heaton
*/
class RequestMessageSet /*implements Comparable<RequestMessageSet>*/ {
    constructor() {
        this.version = "1";
    }
    /**
     * The version of this request message.
     *
     * @return The version of this request message.
     */
    getVersion() {
        return this.version;
    }
    /**
     * The version of this request message.
     *
     * @param version The version of this request message.
     */
    setVersion(version) {
        this.version = version;
    }
    // Inherited.
    /*public compareTo(o: RequestMessageSet): number {
      return getType().compareTo(o.getType());
    }*/
    static contentCompare(left, right) {
        return left.getType() - right.getType();
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A message applicable to a request message set.
 *
 * @author Ryan Heaton
 */
class RequestMessage {
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A request message wrapped in a transaction.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.6, OFX Spec"
 */
class TransactionWrappedRequestMessage extends RequestMessage {
    constructor(UID = v1()) {
        super();
        this.UID = UID;
    }
    /**
     * UID of this transaction.
     *
     * @return UID of this transaction.
     */
    getUID() {
        return this.UID;
    }
    /**
     * UID of this transaction.
     *
     * @param UID UID of this transaction.
     */
    setUID(UID) {
        this.UID = UID;
    }
    /**
     * Client cookie (echoed back by the response).
     *
     * @return Client cookie (echoed back by the response).
     */
    getClientCookie() {
        return this.clientCookie;
    }
    /**
     * Client cookie (echoed back by the response).
     *
     * @param clientCookie Client cookie (echoed back by the response).
     */
    setClientCookie(clientCookie) {
        this.clientCookie = clientCookie;
    }
    /**
     * The transaction authorization number.
     *
     * @return The transaction authorization number.
     */
    getTransactionAuthorizationNumber() {
        return this.transactionAuthorizationNumber;
    }
    /**
     * The transaction authorization number.
     *
     * @param transactionAuthorizationNumber The transaction authorization number.
     */
    setTransactionAuthorizationNumber(transactionAuthorizationNumber) {
        this.transactionAuthorizationNumber = transactionAuthorizationNumber;
    }
}
Element_add(TransactionWrappedRequestMessage, { name: "TRNUID", required: true, order: 0, type: String, read: TransactionWrappedRequestMessage.prototype.getUID, write: TransactionWrappedRequestMessage.prototype.setUID });
Element_add(TransactionWrappedRequestMessage, { name: "CLTCOOKIE", order: 10, type: String, read: TransactionWrappedRequestMessage.prototype.getClientCookie, write: TransactionWrappedRequestMessage.prototype.setClientCookie });
Element_add(TransactionWrappedRequestMessage, { name: "TAN", order: 20, type: String, read: TransactionWrappedRequestMessage.prototype.getTransactionAuthorizationNumber, write: TransactionWrappedRequestMessage.prototype.setTransactionAuthorizationNumber });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ChildAggregate_add(clazz, params) {
    console.assert(params.type != null);
    AggregateIntrospector.addChildAggregate(clazz, new ChildAggregate(params));
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class StatementRequest extends RequestMessage {
    /**
     * The statement range.
     *
     * @return The statement range.
     */
    getStatementRange() {
        return this.statementRange;
    }
    /**
     * The statement range.
     *
     * @param statementRange The statement range.
     */
    setStatementRange(statementRange) {
        this.statementRange = statementRange;
    }
}
Aggregate_add(StatementRequest, "STMTRQ");
ChildAggregate_add(StatementRequest, { name: "INCTRAN", required: false, order: 10, type: StatementRange, read: StatementRequest.prototype.getStatementRange, write: StatementRequest.prototype.setStatementRange });

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @author Ryan Heaton
 */
class BankStatementRequest extends StatementRequest {
    /**
     * The account details.
     *
     * @return The account details.
     */
    getAccount() {
        return this.account;
    }
    /**
     * The account details.
     *
     * @param account The account details.
     */
    setAccount(account) {
        this.account = account;
    }
}
Aggregate_add(BankStatementRequest, "STMTRQ");
ChildAggregate_add(BankStatementRequest, { name: "BANKACCTFROM", required: true, order: 0, type: BankAccountDetails, read: BankStatementRequest.prototype.getAccount, write: BankStatementRequest.prototype.setAccount });

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class BankStatementRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     *
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(BankStatementRequestTransaction, "STMTTRNRQ");
ChildAggregate_add(BankStatementRequestTransaction, { required: true, order: 30, type: BankStatementRequest, read: BankStatementRequestTransaction.prototype.getMessage, write: BankStatementRequestTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class BankingRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.banking;
    }
    /**
     * The statement request.
     *
     * @return The statement request.
     */
    getStatementRequest() {
        return this.statementRequest;
    }
    /**
     * The statement request.
     *
     * @param statementRequest The statement request.
     */
    setStatementRequest(statementRequest) {
        this.statementRequest = statementRequest;
    }
    // Inherited.
    getRequestMessages() {
        var requestMessages = [];
        if (this.getStatementRequest() != null) {
            requestMessages.push(this.getStatementRequest());
        }
        return requestMessages;
    }
}
Aggregate_add(BankingRequestMessageSet, "BANKMSGSRQV1");
ChildAggregate_add(BankingRequestMessageSet, { order: 0, type: BankStatementRequestTransaction, read: BankingRequestMessageSet.prototype.getStatementRequest, write: BankingRequestMessageSet.prototype.setStatementRequest });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class BankingAccountImpl extends BaseAccountImpl {
    constructor(details, username, password, institution) {
        super(details, username, password, institution);
    }
    unwrapStatementResponse(response) {
        var bankingSet = response.getMessageSet(MessageSetType.banking);
        if (bankingSet == null) {
            throw new OFXException("No banking response message set.");
        }
        var statementTransactionResponse = bankingSet.getStatementResponse();
        if (statementTransactionResponse == null) {
            throw new OFXException("No banking statement response transaction.");
        }
        var statement = statementTransactionResponse.getMessage();
        if (statement == null) {
            throw new OFXException("No banking statement in the transaction.");
        }
        return statement;
    }
    createRequestMessageSet(transaction) {
        var bankingRequest = new BankingRequestMessageSet();
        bankingRequest.setStatementRequest(transaction);
        return bankingRequest;
    }
    createTransaction() {
        return new BankStatementRequestTransaction();
    }
    createStatementRequest(details, range) {
        var bankRequest = new BankStatementRequest();
        bankRequest.setAccount(details);
        bankRequest.setStatementRange(range);
        return bankRequest;
    }
}

//import java.net.URL;
/**
 * Base bean for FI data.
 *
 * @author Ryan Heaton
 */
class BaseFinancialInstitutionData {
    constructor(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getFinancialInstitutionId() {
        return this.fid;
    }
    setFinancialInstitutionId(id) {
        this.fid = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getOrganization() {
        return this.organization;
    }
    setOrganization(organization) {
        this.organization = organization;
    }
    getOFXURL() {
        return this.ofxUrl;
    }
    setOFXURL(OFXURL) {
        this.ofxUrl = OFXURL;
    }
    getBrokerId() {
        return this.brokerId;
    }
    setBrokerId(brokerId) {
        this.brokerId = brokerId;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardStatementRequest extends StatementRequest {
    /**
     * The account details.
     *
     * @return The account details.
     */
    getAccount() {
        return this.account;
    }
    /**
     * The account details.
     *
     * @param account The account details.
     */
    setAccount(account) {
        this.account = account;
    }
}
Aggregate_add(CreditCardStatementRequest, "CCSTMTRQ");
ChildAggregate_add(CreditCardStatementRequest, { name: "CCACCTFROM", required: true, order: 0, type: CreditCardAccountDetails, read: CreditCardStatementRequest.prototype.getAccount, write: CreditCardStatementRequest.prototype.setAccount });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardStatementRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     *
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(CreditCardStatementRequestTransaction, "CCSTMTTRNRQ");
ChildAggregate_add(CreditCardStatementRequestTransaction, { required: true, order: 30, type: CreditCardStatementRequest, read: CreditCardStatementRequestTransaction.prototype.getMessage, write: CreditCardStatementRequestTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.util.List;
//import java.util.ArrayList;
/**
 * @author Ryan Heaton
 */
class CreditCardRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.creditcard;
    }
    /**
     * The request.
     *
     * @return The request.
     */
    getStatementRequest() {
        return this.statementRequest;
    }
    /**
     * The request.
     *
     * @param statementRequest The request.
     */
    setStatementRequest(statementRequest) {
        this.statementRequest = statementRequest;
    }
    // Inherited.
    getRequestMessages() {
        var requestMessages = [];
        if (this.getStatementRequest() != null) {
            requestMessages.push(this.getStatementRequest());
        }
        return requestMessages;
    }
}
Aggregate_add(CreditCardRequestMessageSet, "CREDITCARDMSGSRQV1");
ChildAggregate_add(CreditCardRequestMessageSet, { order: 0, type: CreditCardStatementRequestTransaction, read: CreditCardRequestMessageSet.prototype.getStatementRequest, write: CreditCardRequestMessageSet.prototype.setStatementRequest });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardAccountImpl extends BaseAccountImpl {
    constructor(details, username, password, institution) {
        super(details, username, password, institution);
    }
    unwrapStatementResponse(response) {
        var creditCardSet = response.getMessageSet(MessageSetType.creditcard);
        if (creditCardSet == null) {
            throw new OFXException("No credit card response message set.");
        }
        var statementTransactionResponse = creditCardSet.getStatementResponse();
        if (statementTransactionResponse == null) {
            throw new OFXException("No credit card statement response transaction.");
        }
        var statement = statementTransactionResponse.getMessage();
        if (statement == null) {
            throw new OFXException("No credit card statement in the transaction.");
        }
        return statement;
    }
    createRequestMessageSet(transaction) {
        var creditCardRequest = new CreditCardRequestMessageSet();
        creditCardRequest.setStatementRequest(transaction);
        return creditCardRequest;
    }
    createTransaction() {
        return new CreditCardStatementRequestTransaction();
    }
    createStatementRequest(details, range) {
        var bankRequest = new CreditCardStatementRequest();
        bankRequest.setAccount(details);
        bankRequest.setStatementRange(range);
        return bankRequest;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Aggregate_add$1(clazz, value = "#NOT_SET#") {
    AggregateIntrospector.addAggregate(clazz, value);
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An OFX element, applied to a javabean property.
 *
 * @author Ryan Heaton
 */
class Header extends PropertyDescriptor {
    constructor(params) {
        super(params);
        this._name = params.name;
    }
    /**
     * The name of the element.
     *
     * @return The name of the element.
     */
    name() {
        return this._name;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Header_add(clazz, params) {
    console.assert(params.type != null);
    AggregateIntrospector.addHeader(clazz, new Header(params));
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 4, OFX spec"
 */
var ApplicationSecurity;
(function (ApplicationSecurity) {
    ApplicationSecurity[ApplicationSecurity["NONE"] = 0] = "NONE";
    ApplicationSecurity[ApplicationSecurity["TYPE1"] = 1] = "TYPE1";
})(ApplicationSecurity || (ApplicationSecurity = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// import java.util.SortedSet;
// import java.util.UUID;
/**
 * Envelope for enclosing an OFX request.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.3, OFX Spec"
 */
class RequestEnvelope {
    constructor(UID = v1()) {
        this.security = ApplicationSecurity.NONE;
        this.UID = UID;
    }
    /**
     * The security of this envelope.
     *
     * @return The security of this envelope.
     * @see "Section 2.2, OFX spec"
     */
    getSecurity() {
        return this.security;
    }
    /**
     * The security of this envelope.
     *
     * @param security The security of this envelope.
     * @see "Section 2.2, OFX spec"
     */
    setSecurity(security) {
        this.security = security;
    }
    /**
     * The UID for the envelope.
     *
     * @return The UID for the envelope.
     * @see "Section 2.2, OFX spec"
     */
    getUID() {
        return this.UID;
    }
    /**
     * The UID for the envelope.
     *
     * @param UID The UID for the envelope.
     * @see "Section 2.2, OFX spec"
     */
    setUID(UID) {
        this.UID = UID;
    }
    /**
     * The UID of the last-processed request/response (used for file-based error recovery).
     *
     * @return The UID of the last-processed request/response (used for file-based error recovery).
     * @see "Section 2.2, OFX spec"
     */
    getLastProcessedUID() {
        return this.lastProcessedUID;
    }
    /**
     * The UID of the last-processed request/response (used for file-based error recovery).
     *
     * @param lastProcessedUID The UID of the last-processed request/response (used for file-based error recovery).
     * @see "Section 2.2, OFX spec"
     */
    setLastProcessedUID(lastProcessedUID) {
        this.lastProcessedUID = lastProcessedUID;
    }
    /**
     * The message sets that make up the content of this request.
     *
     * @return The message sets that make up the content of this request.
     * @see "Section 2.4.5, OFX Spec"
     */
    getMessageSets() {
        return this.messageSets;
    }
    /**
     * The message sets that make up the content of this request.
     *
     * @param messageSets The message sets that make up the content of this request.
     * @see "Section 2.4.5, OFX Spec"
     */
    setMessageSets(messageSets) {
        this.messageSets = messageSets;
    }
}
Aggregate_add$1(RequestEnvelope, "OFX");
Header_add(RequestEnvelope, { name: "SECURITY", type: ApplicationSecurity, read: RequestEnvelope.prototype.getSecurity, write: RequestEnvelope.prototype.setSecurity });
Header_add(RequestEnvelope, { name: "NEWFILEUID", type: String, read: RequestEnvelope.prototype.getUID, write: RequestEnvelope.prototype.setUID });
Header_add(RequestEnvelope, { name: "OLDFILEUID", type: String, read: RequestEnvelope.prototype.getLastProcessedUID, write: RequestEnvelope.prototype.setLastProcessedUID });
ChildAggregate_add(RequestEnvelope, { order: 1, type: SortedSet, collectionEntryType: RequestMessageSet, read: RequestEnvelope.prototype.getMessageSets, write: RequestEnvelope.prototype.setMessageSets });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class FinancialInstitutionInfo {
    /**
     * Financial institution id.
     *
     * @return Financial institution id.
     */
    getId() {
        return this.id;
    }
    /**
     * Financial institution id.
     *
     * @param id Financial institution id.
     */
    setId(id) {
        this.id = id;
    }
    /**
     * The organization.
     *
     * @return The organization.
     */
    getOrganization() {
        return this.organization;
    }
    /**
     * The organization.
     *
     * @param organization The organization.
     */
    setOrganization(organization) {
        this.organization = organization;
    }
}
Aggregate_add(FinancialInstitutionInfo, "FI");
Element_add(FinancialInstitutionInfo, { name: "FID", order: 10, type: String, read: FinancialInstitutionInfo.prototype.getId, write: FinancialInstitutionInfo.prototype.setId });
Element_add(FinancialInstitutionInfo, { name: "ORG", required: true, order: 0, type: String, read: FinancialInstitutionInfo.prototype.getOrganization, write: FinancialInstitutionInfo.prototype.setOrganization });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sign-on request
 *
 * @author Ryan Heaton
 * @see "Section 2.5.1.2, OFX Spec."
 */
class SignonRequest extends RequestMessage {
    constructor() {
        super();
        this.language = "ENG"; //Locale.US.getISO3Language().toUpperCase();
        this.applicationId = "Money"; //many institutions just won't work with an unrecognized app id...
        this.applicationVersion = "1600"; //many institutions just won't work with an unrecognized app id...
    }
    /**
     * The date and time of the request.
     *
     * @return The date and time of the request.
     */
    getTimestamp() {
        return this.timestamp;
    }
    /**
     * The date and time of the request.
     *
     * @param timestamp The date and time of the request.
     */
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }
    /**
     * The user id.
     *
     * @return The user id.
     */
    getUserId() {
        return this.userId;
    }
    /**
     * The user id.
     *
     * @param userId The user id.
     */
    setUserId(userId) {
        this.userId = userId;
    }
    /**
     * The password.
     *
     * @return The password.
     */
    getPassword() {
        return this.password;
    }
    /**
     * The password.
     *
     * @param password The password.
     */
    setPassword(password) {
        this.password = password;
    }
    /**
     * The user key provided by the server so as not to require further username/password authentication.
     *
     * @return The user key provided by the server so as not to require further username/password authentication.
     */
    getUserKey() {
        return this.userKey;
    }
    /**
     * The user key provided by the server so as not to require further username/password authentication.
     *
     * @param userKey The user key provided by the server so as not to require further username/password authentication.
     */
    setUserKey(userKey) {
        this.userKey = userKey;
    }
    /**
     * Whether to request the server to generate a user key.
     *
     * @return Whether to request the server to generate a user key.
     */
    getGenerateUserKey() {
        return this.generateUserKey;
    }
    /**
     * Whether to request the server to generate a user key.
     *
     * @param generateUserKey Whether to request the server to generate a user key.
     */
    setGenerateUserKey(generateUserKey) {
        this.generateUserKey = generateUserKey;
    }
    /**
     * The three-letter langauge code.
     *
     * @return The three-letter langauge code.
     * @see java.util.Locale#getISO3Language()
     */
    getLanguage() {
        return this.language;
    }
    /**
     * The three-letter langauge code.
     *
     * @param language The three-letter langauge code.
     */
    setLanguage(language) {
        this.language = language;
    }
    /**
     * The financial institution.
     *
     * @return The financial institution.
     */
    getFinancialInstitution() {
        return this.financialInstitution;
    }
    /**
     * The financial institution.
     *
     * @param financialInstitution The financial institution.
     */
    setFinancialInstitution(financialInstitution) {
        this.financialInstitution = financialInstitution;
    }
    /**
     * The server-supplied session id.
     *
     * @return The server-supplied session id.
     */
    getSessionId() {
        return this.sessionId;
    }
    /**
     * The server-supplied session id.
     *
     * @param sessionId The server-supplied session id.
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    /**
     * The application id.
     *
     * @return The application id.
     */
    getApplicationId() {
        return this.applicationId;
    }
    /**
     * The application id.
     *
     * @param applicationId The application id.
     */
    setApplicationId(applicationId) {
        this.applicationId = applicationId;
    }
    /**
     * The application version.
     *
     * @return The application version.
     */
    getApplicationVersion() {
        return this.applicationVersion;
    }
    /**
     * The application version.
     *
     * @param applicationVersion The application version.
     */
    setApplicationVersion(applicationVersion) {
        this.applicationVersion = applicationVersion;
    }
    /**
     * The client-supplied UID.
     *
     * @return The client-supplied UID.
     */
    getClientUID() {
        return this.clientUID;
    }
    /**
     * The client-supplied UID.
     *
     * @param clientUID The client-supplied UID.
     */
    setClientUID(clientUID) {
        this.clientUID = clientUID;
    }
    /**
     * Any additional credentials.
     *
     * @return Any additional credentials.
     */
    getAdditionalCredentials1() {
        return this.additionalCredentials1;
    }
    /**
     * Any additional credentials.
     *
     * @param additionalCredentials1 Any additional credentials.
     */
    setAdditionalCredentials1(additionalCredentials1) {
        this.additionalCredentials1 = additionalCredentials1;
    }
    /**
     * Any additional credentials.
     *
     * @return Any additional credentials.
     */
    getAdditionalCredentials2() {
        return this.additionalCredentials2;
    }
    /**
     * Any additional credentials.
     *
     * @param additionalCredentials2 Any additional credentials.
     */
    setAdditionalCredentials2(additionalCredentials2) {
        this.additionalCredentials2 = additionalCredentials2;
    }
    /**
     * The authentication token.
     *
     * @return The authentication token.
     */
    getAuthToken() {
        return this.authToken;
    }
    /**
     * The authentication token.
     *
     * @param authToken The authentication token.
     */
    setAuthToken(authToken) {
        this.authToken = authToken;
    }
    /**
     * The access key.
     *
     * @return The access key.
     */
    getAccessKey() {
        return this.accessKey;
    }
    /**
     * The access key.
     *
     * @param accessKey The access key.
     */
    setAccessKey(accessKey) {
        this.accessKey = accessKey;
    }
}
/**
 * @see "Section 2.5.1"
 */
SignonRequest.ANONYMOUS_USER = "anonymous00000000000000000000000";
Aggregate_add(SignonRequest, "SONRQ");
Element_add(SignonRequest, { name: "DTCLIENT", required: true, order: 0, type: Date, read: SignonRequest.prototype.getTimestamp, write: SignonRequest.prototype.setTimestamp });
Element_add(SignonRequest, { name: "USERID", order: 10, type: String, read: SignonRequest.prototype.getUserId, write: SignonRequest.prototype.setUserId });
Element_add(SignonRequest, { name: "USERPASS", order: 20, type: String, read: SignonRequest.prototype.getPassword, write: SignonRequest.prototype.setPassword });
Element_add(SignonRequest, { name: "USERKEY", order: 30, type: String, read: SignonRequest.prototype.getUserKey, write: SignonRequest.prototype.setUserKey });
Element_add(SignonRequest, { name: "GENUSERKEY", order: 40, type: Boolean, read: SignonRequest.prototype.getGenerateUserKey, write: SignonRequest.prototype.setGenerateUserKey });
Element_add(SignonRequest, { name: "LANGUAGE", required: true, order: 50, type: String, read: SignonRequest.prototype.getLanguage, write: SignonRequest.prototype.setLanguage });
ChildAggregate_add(SignonRequest, { order: 60, type: FinancialInstitutionInfo, read: SignonRequest.prototype.getFinancialInstitution, write: SignonRequest.prototype.setFinancialInstitution });
Element_add(SignonRequest, { name: "SESSCOOKIE", order: 70, type: String, read: SignonRequest.prototype.getSessionId, write: SignonRequest.prototype.setSessionId });
Element_add(SignonRequest, { name: "APPID", required: true, order: 80, type: String, read: SignonRequest.prototype.getApplicationId, write: SignonRequest.prototype.setApplicationId });
Element_add(SignonRequest, { name: "APPVER", required: true, order: 90, type: String, read: SignonRequest.prototype.getApplicationVersion, write: SignonRequest.prototype.setApplicationVersion });
Element_add(SignonRequest, { name: "CLIENTUID", order: 100, type: String, read: SignonRequest.prototype.getClientUID, write: SignonRequest.prototype.setClientUID });
Element_add(SignonRequest, { name: "USERCRED1", order: 110, type: String, read: SignonRequest.prototype.getAdditionalCredentials1, write: SignonRequest.prototype.setAdditionalCredentials1 });
Element_add(SignonRequest, { name: "USERCRED2", order: 120, type: String, read: SignonRequest.prototype.getAdditionalCredentials2, write: SignonRequest.prototype.setAdditionalCredentials2 });
Element_add(SignonRequest, { name: "AUTHTOKEN", order: 130, type: String, read: SignonRequest.prototype.getAuthToken, write: SignonRequest.prototype.setAuthToken });
Element_add(SignonRequest, { name: "ACCESSKEY", order: 140, type: String, read: SignonRequest.prototype.getAccessKey, write: SignonRequest.prototype.setAccessKey });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7.1.5, OFX Spec"
 */
var ClientRoutingCapability;
(function (ClientRoutingCapability) {
    ClientRoutingCapability[ClientRoutingCapability["NONE"] = 0] = "NONE";
    ClientRoutingCapability[ClientRoutingCapability["SERVICE"] = 1] = "SERVICE";
    ClientRoutingCapability[ClientRoutingCapability["MESSAGE_SET"] = 2] = "MESSAGE_SET";
})(ClientRoutingCapability || (ClientRoutingCapability = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7.1.5, OFX Spec"
 */
class ProfileRequest extends RequestMessage {
    constructor() {
        super();
        this.routingCapability = ClientRoutingCapability.MESSAGE_SET;
    }
    /**
     * The client routing capability.
     *
     * @return The client routing capability.
     */
    getRoutingCapability() {
        return this.routingCapability;
    }
    /**
     * The client routing capability.
     *
     * @param routingCapability The client routing capability.
     */
    setRoutingCapability(routingCapability) {
        this.routingCapability = routingCapability;
    }
    /**
     * The date the profile was last updated.
     *
     * @return The date the profile was last updated.
     */
    getProfileLastUpdated() {
        return this.profileLastUpdated;
    }
    /**
     * The date the profile was last updated.
     *
     * @param profileLastUpdated The date the profile was last updated.
     */
    setProfileLastUpdated(profileLastUpdated) {
        this.profileLastUpdated = profileLastUpdated;
    }
}
Aggregate_add(ProfileRequest, "PROFRQ");
Element_add(ProfileRequest, { name: "CLIENTROUTING", order: 0, type: ClientRoutingCapability, read: ProfileRequest.prototype.getRoutingCapability, write: ProfileRequest.prototype.setRoutingCapability });
Element_add(ProfileRequest, { name: "DTPROFUP", order: 10, type: Date, read: ProfileRequest.prototype.getProfileLastUpdated, write: ProfileRequest.prototype.setProfileLastUpdated });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class ProfileRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The wrapped message.
     *
     * @return The wrapped message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The wrapped message.
     *
     * @param message The wrapped message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(ProfileRequestTransaction, "PROFTRNRQ");
ChildAggregate_add(ProfileRequestTransaction, { required: true, order: 30, type: ProfileRequest, read: ProfileRequestTransaction.prototype.getMessage, write: ProfileRequestTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7 OFX Spec"
 */
class ProfileRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.profile;
    }
    /**
     * The profile request.
     *
     * @return The profile request.
     */
    getProfileRequest() {
        return this.profileRequest;
    }
    /**
     * The profile request.
     *
     * @param profileRequest The profile request.
     */
    setProfileRequest(profileRequest) {
        this.profileRequest = profileRequest;
    }
    // Inherited.
    getRequestMessages() {
        var requestMessages = new Array();
        if (this.getProfileRequest() != null) {
            requestMessages.push(this.getProfileRequest());
        }
        return requestMessages;
    }
}
Aggregate_add(ProfileRequestMessageSet, "PROFMSGSRQV1");
ChildAggregate_add(ProfileRequestMessageSet, { required: true, order: 0, type: ProfileRequestTransaction, read: ProfileRequestMessageSet.prototype.getProfileRequest, write: ProfileRequestMessageSet.prototype.setProfileRequest });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class AccountInfoRequest extends RequestMessage {
    constructor() {
        super();
        this.lastUpdated = new Date(0); //default is never updated.
    }
    /**
     * When the account info was last updated.
     *
     * @return When the account info was last updated.
     */
    getLastUpdated() {
        return this.lastUpdated;
    }
    /**
     * When the account info was last updated.
     *
     * @param lastUpdated When the account info was last updated.
     */
    setLastUpdated(lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
Aggregate_add(AccountInfoRequest, "ACCTINFORQ");
Element_add(AccountInfoRequest, { name: "DTACCTUP", required: true, order: 0, type: Date, read: AccountInfoRequest.prototype.getLastUpdated, write: AccountInfoRequest.prototype.setLastUpdated });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class AccountInfoRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The wrapped message.
     *
     * @return The wrapped message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The wrapped message.
     *
     * @param message The wrapped message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(AccountInfoRequestTransaction, "ACCTINFOTRNRQ");
ChildAggregate_add(AccountInfoRequestTransaction, { required: true, order: 30, type: AccountInfoRequest, read: AccountInfoRequestTransaction.prototype.getMessage, write: AccountInfoRequestTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class SignupRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.signup;
    }
    /**
     * The account info request.
     *
     * @return The account info request.
     */
    getAccountInfoRequest() {
        return this.accountInfoRequest;
    }
    /**
     * The account info request.
     *
     * @param accountInfoRequest The account info request.
     */
    setAccountInfoRequest(accountInfoRequest) {
        this.accountInfoRequest = accountInfoRequest;
    }
    /**
     * The request messages.
     *
     * @return The request messages.
     */
    getRequestMessages() {
        var messages = new Array();
        if (this.getAccountInfoRequest() != null) {
            messages.push(this.getAccountInfoRequest());
        }
        return messages;
    }
}
Aggregate_add(SignupRequestMessageSet, "SIGNUPMSGSRQV1");
ChildAggregate_add(SignupRequestMessageSet, { order: 0, type: AccountInfoRequestTransaction, read: SignupRequestMessageSet.prototype.getAccountInfoRequest, write: SignupRequestMessageSet.prototype.setAccountInfoRequest });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggreate to indicate whether position information is requested as part of the statement
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class IncludePosition {
    constructor() {
        this.includePositions = true;
    }
    /**
     * Gets the date that the position should be sent down for. This is an optional field according
     * to the OFX spec.
     *
     * @return the date for the position
     */
    getDateSentDown() {
        return this.sentDownDate;
    }
    /**
     * Sets the date that the position should be sent down for. This is an optional field according
     * to the OFX spec.
     *
     * @param sentDownDate the date for the position
     */
    setDateSentDown(sentDownDate) {
        this.sentDownDate = sentDownDate;
    }
    /**
     * Gets whether to include positions in the statement download.
     *
     * @return whether to include positions in the statement download
     */
    getIncludePositions() {
        return this.includePositions;
    }
    /**
     * Sets whether to include positions in the statement download.
     *
     * @param includePositions whether to include positions in the statement download
     */
    setIncludePositions(includePositions) {
        this.includePositions = includePositions;
    }
}
Aggregate_add(IncludePosition, "INCPOS");
Element_add(IncludePosition, { name: "DTASOF", order: 0, type: Date, read: IncludePosition.prototype.getDateSentDown, write: IncludePosition.prototype.setDateSentDown });
Element_add(IncludePosition, { name: "INCLUDE", order: 10, type: Boolean, read: IncludePosition.prototype.getIncludePositions, write: IncludePosition.prototype.setIncludePositions });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggregate for the investment statement download request.
 * @see "Section 13.9.1.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentStatementRequest extends StatementRequest {
    constructor() {
        super();
        this.includeOpenOrders = false;
        this.includeBalance = true;
    }
    /**
     * The account details.
     *
     * @return The account details.
     */
    getAccount() {
        return this.account;
    }
    /**
     * The account details.
     *
     * @param account The account details.
     */
    setAccount(account) {
        this.account = account;
    }
    /**
     * Gets whether to include open orders. This is an optional field according to the OFX spec.
     * <br>
     * Note, open orders are not yet implemented.
     *
     * @return whether to include open orders
     */
    getIncludeOpenOrders() {
        return this.includeOpenOrders;
    }
    /**
     * Sets whether to include open orders. This is an optional field according to the OFX spec.
     * <br>
     * Note, open orders are not yet implemented.
     *
     * @param includeOpenOrders whether to include open orders
     */
    setIncludeOpenOrders(includeOpenOrders) {
        this.includeOpenOrders = includeOpenOrders;
    }
    /**
     * Gets the include position child aggregate. This is a required field according to the OFX spec.
     *
     * @return the include position child aggregate
     */
    getIncludePosition() {
        return this.includePosition;
    }
    /**
     * Gets the include position child aggregate. This is a required field according to the OFX spec.
     *
     * @param includePosition the include position child aggregate
     */
    setIncludePosition(includePosition) {
        this.includePosition = includePosition;
    }
    /**
     * Gets whether to include balance info in the response. This is a required field according to
     * the OFX spec.
     *
     * @return whether to include balance info in the response
     */
    getIncludeBalance() {
        return this.includeBalance;
    }
    /**
     * Sets whether to include balance info in the response. This is a required field according to
     * the OFX spec.
     *
     * @param includeBalance whether to include balance info in the response
     */
    setIncludeBalance(includeBalance) {
        this.includeBalance = includeBalance;
    }
}
Aggregate_add(InvestmentStatementRequest, "INVSTMTRQ");
ChildAggregate_add(InvestmentStatementRequest, { name: "INVACCTFROM", required: true, order: 0, type: InvestmentAccountDetails, read: InvestmentStatementRequest.prototype.getAccount, write: InvestmentStatementRequest.prototype.setAccount });
Element_add(InvestmentStatementRequest, { name: "INCOO", order: 20, type: Boolean, read: InvestmentStatementRequest.prototype.getIncludeOpenOrders, write: InvestmentStatementRequest.prototype.setIncludeOpenOrders });
ChildAggregate_add(InvestmentStatementRequest, { name: "INCPOS", required: true, order: 30, type: IncludePosition, read: InvestmentStatementRequest.prototype.getIncludePosition, write: InvestmentStatementRequest.prototype.setIncludePosition });
Element_add(InvestmentStatementRequest, { name: "INCBAL", required: true, order: 40, type: Boolean, read: InvestmentStatementRequest.prototype.getIncludeBalance, write: InvestmentStatementRequest.prototype.setIncludeBalance });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Investment statement transaction request.
 * @see "Section 13.9.1.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentStatementRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * Gets the the statement request message.
     *
     * @return the statement request message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * Sets the the statement request message.
     *
     * @param message the statement request message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(InvestmentStatementRequestTransaction, "INVSTMTTRNRQ");
ChildAggregate_add(InvestmentStatementRequestTransaction, { required: true, order: 30, type: InvestmentStatementRequest, read: InvestmentStatementRequestTransaction.prototype.getMessage, write: InvestmentStatementRequestTransaction.prototype.setMessage });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Identifier for a security.
 * @see "Section 13.8.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityId {
    /**
     * Gets the unique id for the security. This is a required field according to the OFX spec.
     *
     * @return the unique id
     */
    getUniqueId() {
        return this.uniqueId;
    }
    /**
     * Sets the unique id for the security. This is a required field according to the OFX spec.
     *
     * @param uniqueId the unique id
     */
    setUniqueId(uniqueId) {
        this.uniqueId = uniqueId;
    }
    /**
     * Gets the type of unique id.
     *
     * @return the type of unique id
     */
    getUniqueIdType() {
        return this.uniqueIdType;
    }
    /**
     * Sets the type of unique id.
     *
     * @param uniqueIdType the type of unique id
     */
    setUniqueIdType(uniqueIdType) {
        this.uniqueIdType = uniqueIdType;
    }
}
Aggregate_add(SecurityId, "SECID");
Element_add(SecurityId, { name: "UNIQUEID", required: true, order: 10, type: String, read: SecurityId.prototype.getUniqueId, write: SecurityId.prototype.setUniqueId });
Element_add(SecurityId, { name: "UNIQUEIDTYPE", required: true, order: 20, type: String, read: SecurityId.prototype.getUniqueIdType, write: SecurityId.prototype.setUniqueIdType });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Security request aggregate.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityRequest {
    getSecurityId() {
        return this.securityId;
    }
    setSecurityId(securityId) {
        this.securityId = securityId;
        this.tickerSymbol = null;
        this.fiId = null;
    }
    getTickerSymbol() {
        return this.tickerSymbol;
    }
    setTickerSymbol(tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
        this.securityId = null;
        this.fiId = null;
    }
    getFiId() {
        return this.fiId;
    }
    setFiId(fiId) {
        this.fiId = fiId;
        this.securityId = null;
        this.tickerSymbol = null;
    }
}
Aggregate_add(SecurityRequest, "SECRQ");
Element_add(SecurityRequest, { name: "SECID", order: 10, type: SecurityId, read: SecurityRequest.prototype.getSecurityId, write: SecurityRequest.prototype.setSecurityId });
Element_add(SecurityRequest, { name: "TICKER", order: 20, type: String, read: SecurityRequest.prototype.getTickerSymbol, write: SecurityRequest.prototype.setTickerSymbol });
Element_add(SecurityRequest, { name: "FIID", order: 30, type: String, read: SecurityRequest.prototype.getFiId, write: SecurityRequest.prototype.setFiId });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Request aggregate for the security list.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityListRequest extends RequestMessage {
    getSecurityRequests() {
        return this.securityRequests;
    }
    setSecurityRequests(securityRequests) {
        this.securityRequests = securityRequests;
    }
}
Aggregate_add(SecurityListRequest, "SECLISTRQ");
ChildAggregate_add(SecurityListRequest, { required: true, order: 10, type: Array, collectionEntryType: SecurityRequest, read: SecurityListRequest.prototype.getSecurityRequests, write: SecurityListRequest.prototype.setSecurityRequests });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Security list transaction request.
 * @see "Section 13.8.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityListRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     *
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(SecurityListRequestTransaction, "SECLISTTRNRQ");
ChildAggregate_add(SecurityListRequestTransaction, { required: true, order: 30, type: SecurityListRequest, read: SecurityListRequestTransaction.prototype.getMessage, write: SecurityListRequestTransaction.prototype.setMessage });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Investment statement request message set.
 * @see "Section 13.7.1.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentStatementRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.investment;
    }
    /**
     * Gets the statement request.
     *
     * @return the request
     */
    getStatementRequest() {
        return this.statementRequest;
    }
    /**
     * Sets the statement request.
     *
     * @param statementRequest the request
     */
    setStatementRequest(statementRequest) {
        this.statementRequest = statementRequest;
    }
    // Inherited.
    getRequestMessages() {
        var requestMessages = new Array();
        if (this.getStatementRequest() != null) {
            requestMessages.push(this.getStatementRequest());
        }
        return requestMessages;
    }
}
Aggregate_add(InvestmentStatementRequestMessageSet, "INVSTMTMSGSRQV1");
ChildAggregate_add(InvestmentStatementRequestMessageSet, { order: 0, type: InvestmentStatementRequestTransaction, read: InvestmentStatementRequestMessageSet.prototype.getStatementRequest, write: InvestmentStatementRequestMessageSet.prototype.setStatementRequest });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Security list request message set.
 * @see "Section 13.7.2.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityListRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.investment;
    }
    /**
     * Gets the security list request.
     *
     * @return the request
     */
    getSecurityListRequest() {
        return this.securityListRequest;
    }
    /**
     * Sets the security list request.
     *
     * @param statementRequest the request
     */
    setSecurityListRequest(statementRequest) {
        this.securityListRequest = statementRequest;
    }
    // Inherited.
    getRequestMessages() {
        var requestMessages = new Array();
        if (this.getSecurityListRequest() != null) {
            requestMessages.push(this.getSecurityListRequest());
        }
        return requestMessages;
    }
}
Aggregate_add(SecurityListRequestMessageSet, "SECLISTMSGSRQV1");
ChildAggregate_add(SecurityListRequestMessageSet, { order: 0, type: SecurityListRequestTransaction, read: SecurityListRequestMessageSet.prototype.getSecurityListRequest, write: SecurityListRequestMessageSet.prototype.setSecurityListRequest });

/**
 * @author Jon Perlow
 */
class InvestmentAccountImpl {
    constructor(details, username, password, institution) {
        this.details = details;
        this.username = username;
        this.password = password;
        this.institution = institution;
    }
    readStatement(start, end) {
        var range = new StatementRange();
        range.setIncludeTransactions(true);
        range.setStart(start);
        range.setEnd(end);
        var request = this.institution.createAuthenticatedRequest(this.username, this.password);
        var requestTransaction = new InvestmentStatementRequestTransaction();
        requestTransaction.setWrappedMessage(this.createStatementRequest(this.getDetails(), range));
        request.getMessageSets().insert(this.createStatementRequestMessageSet(requestTransaction));
        return this.institution.sendRequest(request)
            .then((response) => {
            this.institution.doGeneralValidationChecks(request, response);
            return this.unwrapStatementResponse(response);
        });
    }
    readSecurityList(securities) {
        var request = this.institution.createAuthenticatedRequest(this.username, this.password);
        var requestTransaction = new SecurityListRequestTransaction();
        requestTransaction.setWrappedMessage(this.createSecurityListRequest(securities));
        request.getMessageSets().insert(this.createSecurityListRequestMessageSet(requestTransaction));
        return this.institution.sendRequest(request)
            .then((response) => {
            this.institution.doGeneralValidationChecks(request, response);
            return this.unwrapSecurityList(response);
        });
    }
    /**
     * The details of this account.
     *
     * @return The details of this account.
     */
    getDetails() {
        return this.details;
    }
    unwrapStatementResponse(response) {
        var investmentStatementSet = response.getMessageSet(MessageSetType.investment);
        if (investmentStatementSet == null) {
            throw new OFXException("No investment response message set.");
        }
        var statementTransactionResponse = investmentStatementSet.getStatementResponse();
        if (statementTransactionResponse == null) {
            throw new OFXException("No investment statement response transaction.");
        }
        var statement = statementTransactionResponse.getMessage();
        if (statement == null) {
            throw new OFXException("No investment statement in the transaction.");
        }
        // See if there's a security list -- often sent back with an account statement by servers.
        var securityListMessageSet = response.getMessageSet(MessageSetType.investment_security);
        if (securityListMessageSet != null) {
            statement.setSecurityList(securityListMessageSet.getSecurityList());
        }
        return statement;
    }
    createStatementRequestMessageSet(transaction) {
        var investmentStatementRequest = new InvestmentStatementRequestMessageSet();
        investmentStatementRequest.setStatementRequest(transaction);
        return investmentStatementRequest;
    }
    createStatementRequest(details, range) {
        var investRequest = new InvestmentStatementRequest();
        investRequest.setAccount(details);
        investRequest.setStatementRange(range);
        investRequest.setIncludePosition(new IncludePosition());
        return investRequest;
    }
    createSecurityListRequestMessageSet(transaction) {
        var securityListRequest = new SecurityListRequestMessageSet();
        securityListRequest.setSecurityListRequest(transaction);
        return securityListRequest;
    }
    createSecurityListRequest(securities) {
        var securityListRequest = new SecurityListRequest();
        securityListRequest.setSecurityRequests(securities);
        return securityListRequest;
    }
    unwrapSecurityList(response) {
        var securityListSet = response.getMessageSet(MessageSetType.investment_security);
        if (securityListSet == null) {
            throw new OFXException("No security list response message set.");
        }
        var securityList = securityListSet.getSecurityList();
        if (securityList == null) {
            throw new OFXException("No security list response transaction.");
        }
        return securityList;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Request to change a user password.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.2.1, OFX Spec."
 */
class PasswordChangeRequest extends RequestMessage {
    /**
     * The id of the user changing password.
     *
     * @return The id of the user changing password.
     */
    getUserId() {
        return this.userId;
    }
    /**
     * The id of the user changing password.
     *
     * @param userId The id of the user changing password.
     */
    setUserId(userId) {
        this.userId = userId;
    }
    /**
     * The new password.
     *
     * @return The new password.
     */
    getNewPassword() {
        return this.newPassword;
    }
    /**
     * The new password.
     *
     * @param newPassword The new password.
     */
    setNewPassword(newPassword) {
        this.newPassword = newPassword;
    }
}
Aggregate_add(PasswordChangeRequest, "PINCHRQ");
Element_add(PasswordChangeRequest, { name: "USERID", required: true, order: 0, type: String, read: PasswordChangeRequest.prototype.getUserId, write: PasswordChangeRequest.prototype.setUserId });
Element_add(PasswordChangeRequest, { name: "NEWUSERPASS", required: true, order: 10, type: String, read: PasswordChangeRequest.prototype.getNewPassword, write: PasswordChangeRequest.prototype.setNewPassword });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class PasswordChangeRequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The wrapped message.
     *
     * @return The wrapped message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The wrapped message.
     *
     * @param message The wrapped message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    setWrappedMessage(message) {
        this.setMessage(message);
    }
}
Aggregate_add(PasswordChangeRequestTransaction, "PINCHTRNRQ");
ChildAggregate_add(PasswordChangeRequestTransaction, { required: true, order: 30, type: PasswordChangeRequest, read: PasswordChangeRequestTransaction.prototype.getMessage, write: PasswordChangeRequestTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The sign-on request message set.
 *
 * @author Ryan Heaton
 * @see "Section 2.5, OFX Spec."
 */
class SignonRequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.signon;
    }
    /**
     * The message for this message set.
     *
     * @return The message for this message set.
     */
    getSignonRequest() {
        return this.signonRequest;
    }
    /**
     * The message for this message set.
     *
     * @param signonRequest The message for this message set.
     */
    setSignonRequest(signonRequest) {
        this.signonRequest = signonRequest;
    }
    /**
     * The password change request.
     *
     * @return The password change request.
     */
    getPasswordChangeRequest() {
        return this.passwordChangeRequest;
    }
    /**
     * The password change request.
     *
     * @param passwordChangeRequest The password change request.
     */
    setPasswordChangeRequest(passwordChangeRequest) {
        this.passwordChangeRequest = passwordChangeRequest;
    }
    //todo: challenge request/response
    // Inherited.
    getRequestMessages() {
        var requestMessages = new Array();
        if (this.getSignonRequest() != null) {
            requestMessages.push(this.getSignonRequest());
        }
        if (this.getPasswordChangeRequest() != null) {
            requestMessages.push(this.getPasswordChangeRequest());
        }
        return requestMessages;
    }
}
Aggregate_add(SignonRequestMessageSet, "SIGNONMSGSRQV1");
ChildAggregate_add(SignonRequestMessageSet, { required: true, order: 0, type: SignonRequest, read: SignonRequestMessageSet.prototype.getSignonRequest, write: SignonRequestMessageSet.prototype.setSignonRequest });
ChildAggregate_add(SignonRequestMessageSet, { order: 10, type: PasswordChangeRequestTransaction, read: SignonRequestMessageSet.prototype.getPasswordChangeRequest, write: SignonRequestMessageSet.prototype.setPasswordChangeRequest });

function instanceof_StatusHolder(obj) {
    return (obj instanceof Object
        && (typeof obj.getStatusHolderName === 'function')
        && (typeof obj.getStatus === 'function'));
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A message applicable to a response message set.
 *
 * @author Ryan Heaton
 */
class ResponseMessage {
}

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * Severity of the status.
 */
var Severity;
(function (Severity) {
    Severity[Severity["INFO"] = 0] = "INFO";
    Severity[Severity["WARN"] = 1] = "WARN";
    Severity[Severity["ERROR"] = 2] = "ERROR";
})(Severity || (Severity = {}));
/**
 * @author Ryan Heaton
 */
class StatusCode {
    getCode() { throw new OFXException("abstract"); }
    getMessage() { throw new OFXException("abstract"); }
    getDefaultSeverity() { throw new OFXException("abstract"); }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Known status codes.
 */
class KnownCode extends StatusCode {
    constructor(code, message, defaultSeverity) {
        super();
        this.code = code;
        this.message = message;
        this.defaultSeverity = defaultSeverity;
    }
    getCode() {
        return this.code;
    }
    getMessage() {
        return this.message;
    }
    getDefaultSeverity() {
        return this.defaultSeverity;
    }
    static fromCode(code) {
        for (var i in KnownCode.KnownCodes) {
            var value = KnownCode.KnownCodes[i];
            if (value.getCode() == code) {
                return value;
            }
        }
        return null;
    }
    //@Override
    toString() {
        return this.code.toString();
    }
}
KnownCode.SUCCESS = new KnownCode(0, "Success", Severity.INFO);
KnownCode.CLIENT_UP_TO_DATE = new KnownCode(1, "Client is up-to-date", Severity.INFO);
KnownCode.GENERAL_ERROR = new KnownCode(2000, "General error.", Severity.ERROR);
KnownCode.GENERAL_ACCOUNT_ERROR = new KnownCode(2002, "General account error.", Severity.ERROR);
KnownCode.ACCOUNT_NOT_FOUND = new KnownCode(2003, "Account not found.", Severity.ERROR);
KnownCode.ACCOUNT_CLOSED = new KnownCode(2004, "Account closed.", Severity.ERROR);
KnownCode.ACCOUNT_NOT_AUTHORIZED = new KnownCode(2005, "Account not authorized.", Severity.ERROR);
KnownCode.DATE_TOO_SOON = new KnownCode(2014, "Date too soon", Severity.ERROR);
KnownCode.DUPLICATE_REQUEST = new KnownCode(2019, "Duplicate request.", Severity.ERROR);
KnownCode.UNSUPPORTED_VERSION = new KnownCode(2021, "Unsupported version", Severity.ERROR);
KnownCode.INVALID_TAN = new KnownCode(2022, "Invalid transaction authorization number.", Severity.ERROR);
KnownCode.MFA_CHALLENGE_REQUIRED = new KnownCode(3000, "Further authentication required.", Severity.ERROR);
KnownCode.MFA_CHALLENGE_FAILED = new KnownCode(3001, "MFA failed.", Severity.ERROR);
KnownCode.PASSWORD_CHANGE_REQUIRED = new KnownCode(15000, "Password change required.", Severity.INFO);
KnownCode.SIGNON_INVALID = new KnownCode(15500, "Invalid signon", Severity.ERROR);
KnownCode.CUSTOMER_ACCOUNT_IN_USE = new KnownCode(15501, "Customer account in use.", Severity.ERROR);
KnownCode.PASSWORD_LOCKED = new KnownCode(15502, "Password locked.", Severity.ERROR);
KnownCode.INVALID_CLIENT_UID = new KnownCode(15510, "Invalid client UID.", Severity.ERROR);
KnownCode.CONTACT_FI = new KnownCode(15511, "User must contact FI.", Severity.ERROR);
KnownCode.AUTHTOKEN_REQUIRED = new KnownCode(15512, "Auth token required.", Severity.ERROR);
KnownCode.INVALID_AUTHTOKEN = new KnownCode(15513, "Invalid auth token.", Severity.ERROR);
KnownCode.NO_DATA = new KnownCode(14701, "No Tax Data for Account.", Severity.ERROR);
KnownCode.DB_EXCEPTION = new KnownCode(14702, "Database error has occured.", Severity.ERROR);
KnownCode.NO_TAXSUPPORT = new KnownCode(14703, "This Tax Year is not supported.", Severity.ERROR);
KnownCode.KnownCodes = [
    KnownCode.SUCCESS,
    KnownCode.CLIENT_UP_TO_DATE,
    KnownCode.GENERAL_ERROR,
    KnownCode.GENERAL_ACCOUNT_ERROR,
    KnownCode.ACCOUNT_NOT_FOUND,
    KnownCode.ACCOUNT_CLOSED,
    KnownCode.ACCOUNT_NOT_AUTHORIZED,
    KnownCode.DATE_TOO_SOON,
    KnownCode.DUPLICATE_REQUEST,
    KnownCode.UNSUPPORTED_VERSION,
    KnownCode.INVALID_TAN,
    KnownCode.MFA_CHALLENGE_REQUIRED,
    KnownCode.MFA_CHALLENGE_FAILED,
    KnownCode.PASSWORD_CHANGE_REQUIRED,
    KnownCode.SIGNON_INVALID,
    KnownCode.CUSTOMER_ACCOUNT_IN_USE,
    KnownCode.PASSWORD_LOCKED,
    KnownCode.INVALID_CLIENT_UID,
    KnownCode.CONTACT_FI,
    KnownCode.AUTHTOKEN_REQUIRED,
    KnownCode.INVALID_AUTHTOKEN,
    KnownCode.NO_DATA,
    KnownCode.DB_EXCEPTION,
    KnownCode.NO_TAXSUPPORT,
];
/**
 * Transaction status element.
 *
 * @author Ryan Heaton
 * @see "Section 3.1.4, OFX Spec"
 */
class Status {
    constructor() {
        this.code = KnownCode.SUCCESS;
        this.severity = undefined;
    }
    /**
     * Status code.
     *
     * @return The status code.
     */
    getCode() {
        return this.code;
    }
    /**
     * Status code.
     *
     * @param code Status code.
     */
    setCode(code) {
        this.code = code;
        if (typeof this.severity === 'undefined') {
            this.severity = code.getDefaultSeverity();
        }
    }
    /**
     * The severity.
     *
     * @return The severity.
     */
    getSeverity() {
        return this.severity;
    }
    /**
     * The severity.
     *
     * @param severity The severity.
     */
    setSeverity(severity) {
        this.severity = severity;
    }
    /**
     * Server-supplied message.
     *
     * @return Server-supplied message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * Server-supplied message.
     *
     * @param message Server-supplied message.
     */
    setMessage(message) {
        this.message = message;
    }
}
Aggregate_add$1(Status, "STATUS");
Element_add(Status, { name: "CODE", required: true, order: 0, type: StatusCode, read: Status.prototype.getCode, write: Status.prototype.setCode });
Element_add(Status, { name: "SEVERITY", required: true, order: 10, type: Severity, read: Status.prototype.getSeverity, write: Status.prototype.setSeverity });
Element_add(Status, { name: "MESSAGE", order: 20, type: String, read: Status.prototype.getMessage, write: Status.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A response message wrapped in a transaction.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.6, OFX Spec"
 */
class TransactionWrappedResponseMessage extends ResponseMessage {
    /**
     * UID of this transaction.
     *
     * @return UID of this transaction.
     */
    getUID() {
        return this.UID;
    }
    /**
     * UID of this transaction.
     *
     * @param UID UID of this transaction.
     */
    setUID(UID) {
        this.UID = UID;
    }
    /**
     * Client cookie (echoed back by the response).
     *
     * @return Client cookie (echoed back by the response).
     */
    getClientCookie() {
        return this.clientCookie;
    }
    /**
     * Client cookie (echoed back by the response).
     *
     * @param clientCookie Client cookie (echoed back by the response).
     */
    setClientCookie(clientCookie) {
        this.clientCookie = clientCookie;
    }
    // Inherited.
    getStatusHolderName() {
        return this.getResponseMessageName();
    }
    // Inherited.
    getResponseMessageName() {
        var name = "transaction response";
        if (this.getWrappedMessage() != null) {
            name = this.getWrappedMessage().getResponseMessageName() + " transaction";
        }
        //    else if ((<any>(<Object>this).constructor).Aggregate) {
        //      // TODO- does this work?
        //      var aggregate: AggregateInfo = (<any>(<Object>this).constructor).Aggregate;
        //      name = aggregate.getName() + " transaction";
        //    }
        return name;
    }
    /**
     * Status of the transaction.
     *
     * @return Status of the transaction.
     */
    getStatus() {
        return this.status;
    }
    /**
     * Status of the transaction.
     *
     * @param status Status of the transaction.
     */
    setStatus(status) {
        this.status = status;
    }
}
Element_add(TransactionWrappedResponseMessage, { name: "TRNUID", required: true, order: 0, type: String, read: TransactionWrappedResponseMessage.prototype.getUID, write: TransactionWrappedResponseMessage.prototype.setUID });
Element_add(TransactionWrappedResponseMessage, { name: "CLTCOOKIE", order: 20, type: String, read: TransactionWrappedResponseMessage.prototype.getClientCookie, write: TransactionWrappedResponseMessage.prototype.setClientCookie });
ChildAggregate_add(TransactionWrappedResponseMessage, { required: true, order: 10, type: Status, read: TransactionWrappedResponseMessage.prototype.getStatus, write: TransactionWrappedResponseMessage.prototype.setStatus });

//import java.net.URL;
/**
 * Base implementation for the financial institution.
 *
 * @author Ryan Heaton
 */
class FinancialInstitutionImpl extends FinancialInstitutionInfo {
    constructor(data, connection) {
        super();
        if (data == null) {
            throw new OFXException("Data cannot be null");
        }
        if (connection == null) {
            throw new OFXException("An OFX connection must be supplied");
        }
        this.data = data;
        this.connection = connection;
    }
    // Inherited.
    readProfile() {
        var request = this.createAuthenticatedRequest(SignonRequest.ANONYMOUS_USER, SignonRequest.ANONYMOUS_USER);
        var profileRequest = new ProfileRequestMessageSet();
        profileRequest.setProfileRequest(this.createProfileTransaction());
        request.getMessageSets().insert(profileRequest);
        return this.sendRequest(request, this.getData().getOFXURL())
            .then((response) => {
            this.doGeneralValidationChecks(request, response);
            return this.getProfile(response);
        });
    }
    // Inherited.
    readAccountProfiles(username, password) {
        var request = this.createAuthenticatedRequest(username, password);
        var signupRequest = new SignupRequestMessageSet();
        signupRequest.setAccountInfoRequest(this.createAccountInfoTransaction());
        request.getMessageSets().insert(signupRequest);
        return this.sendRequest(request, this.getData().getOFXURL())
            .then((response) => {
            this.doGeneralValidationChecks(request, response);
            return this.getAccountProfiles(response);
        });
    }
    // Inherited.
    loadBankAccount(details, username, password) {
        return new BankingAccountImpl(details, username, password, this);
    }
    // Inherited.
    loadCreditCardAccount(details, username, password) {
        return new CreditCardAccountImpl(details, username, password, this);
    }
    // Inherited
    loadInvestmentAccount(details, username, password) {
        return new InvestmentAccountImpl(details, username, password, this);
    }
    /**
     * Create an authenticated request envelope.
     *
     * @param username The username.
     * @param password The password.
     * @return The request envelope.
     */
    createAuthenticatedRequest(username, password) {
        var request = new RequestEnvelope();
        var messageSets = new SortedSet(RequestMessageSet.contentCompare);
        var signonRequest = new SignonRequestMessageSet();
        signonRequest.setSignonRequest(this.createSignonRequest(username, password));
        messageSets.insert(signonRequest);
        request.setMessageSets(messageSets);
        return request;
    }
    //  /**
    //   * Send a request.
    //   *
    //   * @param request The request.
    //   * @return The request.
    //   */
    //  protected sendRequest(request: RequestEnvelope) /*throws OFXConnectionException*/: ResponseEnvelope {
    //    return this.getConnection().sendRequest(request, getData().getOFXURL());
    //  }
    /**
     * Send a request to a specific URL.
     *
     * @param request The request.
     * @param url The url.
     * @return The request.
     */
    sendRequest(request, url = this.getData().getOFXURL()) {
        return this.getConnection().sendRequest(request, url);
    }
    /**
     * Open the specified response envelope and look for the profile.
     *
     * @param response The response envelope.
     * @return The profile.
     */
    getProfile(response) {
        var profileSet = response.getMessageSet(MessageSetType.profile);
        if (profileSet == null) {
            throw new OFXException("No profile response set.");
        }
        var transactionResponse = profileSet.getProfileResponse();
        if (transactionResponse == null) {
            throw new OFXException("No profile transaction wrapper.");
        }
        var message = transactionResponse.getMessage();
        if (message == null) {
            throw new OFXException("No profile message.");
        }
        return message;
    }
    /**
     * General validation checks on the specified response.
     *
     * @param request The request.
     * @param response Their response.
     * @throws OFXException Upon invalid response.
     */
    doGeneralValidationChecks(request, response) {
        if (response.getSecurity() != ApplicationSecurity.NONE) {
            throw new UnsupportedOFXSecurityTypeException("Unable to participate in " + response.getSecurity() + " security.");
        }
        if (request.getUID() !== response.getUID()) {
            throw new OFXException("Invalid transaction ID '" + response.getUID() + "' in response.  Expected: " + request);
        }
        for (var requestSet of request.getMessageSets().values()) {
            var responseSet = response.getMessageSet(requestSet.getType());
            if (responseSet == null) {
                throw new NoOFXResponseException("No response for the " + requestSet.getType() + " request.");
            }
            if (responseSet.getType() == MessageSetType.signon) {
                var signonResponse = responseSet.getSignonResponse();
                if (signonResponse == null) {
                    throw new NoOFXResponseException("No signon response.");
                }
            }
            var transactionIds = {};
            for (var requestMessage of requestSet.getRequestMessages()) {
                if (requestMessage instanceof TransactionWrappedRequestMessage) {
                    transactionIds[requestMessage.getUID()] = true;
                }
            }
            for (var responseMessage of responseSet.getResponseMessages()) {
                if (instanceof_StatusHolder(responseMessage)) {
                    this.validateStatus(responseMessage);
                }
                if (responseMessage instanceof TransactionWrappedResponseMessage) {
                    var uid = responseMessage.getUID();
                    if (uid == null) {
                        throw new OFXTransactionException("Invalid response transaction: no UID.");
                    }
                    else if (!(uid in transactionIds)) {
                        throw new OFXTransactionException("Response to an unknown transaction: " + uid + ".");
                    }
                    else {
                        delete transactionIds[uid];
                    }
                }
            }
            if (Object.keys(transactionIds).length != 0) {
                throw new OFXTransactionException("No response to the following transactions: " + transactionIds);
            }
        }
    }
    /**
     * Validate the status of the given status holder.
     *
     * @param statusHolder The status holder.
     */
    validateStatus(statusHolder) {
        var status = statusHolder.getStatus();
        if (status == null) {
            throw new OFXException("Invalid OFX response: no status returned in the " + statusHolder.getStatusHolderName() + " response.");
        }
        if (KnownCode.SUCCESS != status.getCode()) {
            var message = status.getMessage();
            if (message == null) {
                message = "No response status code.";
                if (status.getCode() != null) {
                    message = status.getCode().getMessage();
                }
            }
            throw new OFXStatusException(status, "Invalid " + statusHolder.getStatusHolderName() + ": " + message);
        }
    }
    /**
     * Create a transaction message for a profile request.
     *
     * @return The transaction message.
     */
    createProfileTransaction() {
        var profileTx = new ProfileRequestTransaction();
        profileTx.setMessage(this.createProfileRequest());
        return profileTx;
    }
    /**
     * Create a profile request.
     *
     * @return The profile request.
     */
    createProfileRequest() {
        var profileRequest = new ProfileRequest();
        profileRequest.setProfileLastUpdated(new Date(0));
        return profileRequest;
    }
    /**
     * Create a sign-on request for the specified user.
     *
     * @param username The username.
     * @param password The password.
     * @return The signon request.
     */
    createSignonRequest(username, password) {
        var signonRequest = new SignonRequest();
        signonRequest.setTimestamp(new Date());
        var fi = new FinancialInstitutionInfo();
        fi.setId(this.getData().getFinancialInstitutionId());
        fi.setOrganization(this.getData().getOrganization());
        signonRequest.setFinancialInstitution(fi);
        signonRequest.setUserId(username);
        signonRequest.setPassword(password);
        signonRequest.setApplicationId(OFXApplicationContextHolder.getCurrentContext().getAppId());
        signonRequest.setApplicationVersion(OFXApplicationContextHolder.getCurrentContext().getAppVersion());
        return signonRequest;
    }
    /**
     * Create a transaction for an account info request.
     *
     * @return The transaction.
     */
    createAccountInfoTransaction() {
        var transaction = new AccountInfoRequestTransaction();
        transaction.setMessage(this.createAccountInfoRequest());
        return transaction;
    }
    /**
     * Create an account info request.
     *
     * @return The account info request.
     */
    createAccountInfoRequest() {
        return new AccountInfoRequest();
    }
    /**
     * Get the account profiles for the specified response envelope.
     *
     * @param response The response envelope.
     * @return The account profiles.
     */
    getAccountProfiles(response) {
        var messageSet = response.getMessageSet(MessageSetType.signup);
        if (messageSet == null) {
            throw new OFXException("No signup response message set.");
        }
        var transaction = messageSet.getAccountInfoResponse();
        if (transaction == null) {
            throw new OFXException("No account info transaction in the signup response.");
        }
        var infoResponse = transaction.getMessage();
        if (infoResponse == null) {
            throw new OFXException("No account info response in the transaction.");
        }
        return infoResponse.getAccounts();
    }
    /**
     * The connection used by this implementation.
     *
     * @return The connection used by this implementation.
     */
    getConnection() {
        return this.connection;
    }
    /**
     * The financial institution data.
     *
     * @return The financial institution data.
     */
    getData() {
        return this.data;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Error with a particular OFX connection.
 *
 * @author Ryan Heaton
 */
class OFXConnectionException extends OFXException {
    constructor(message, e = null) {
        super(message, e);
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class OFXServerException extends OFXConnectionException {
    constructor(message, httpCode) {
        super(message);
        this.httpCode = httpCode;
    }
    getHttpCode() {
        return this.httpCode;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Holder for an unknown status code.
 *
 * @author Ryan Heaton
 */
class UnknownStatusCode extends StatusCode {
    constructor(code, message, defaultSeverity) {
        super();
        this.code = code;
        this.message = message;
        this.defaultSeverity = defaultSeverity;
    }
    getCode() {
        return this.code;
    }
    getMessage() {
        return this.message;
    }
    getDefaultSeverity() {
        return this.defaultSeverity;
    }
    //@Override
    toString() {
        return this.code.toString();
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Utility class for conversion to/from OFX strings.
 *
 * @author Ryan Heaton
 */
class DefaultStringConversion {
    toString(value) {
        if (!value) {
            return null;
        }
        else if (typeof value === "boolean") {
            return value ? "Y" : "N";
        }
        else if (value instanceof Date) {
            return this.formatDate(value);
        }
        else if (typeof value === "number") {
            return value + "";
        }
        else {
            return value.toString();
        }
    }
    fromString(clazz, value) {
        if (!value) {
            return null;
        }
        else if (clazz === StatusCode) {
            var code = value;
            var statusCode = KnownCode.fromCode(code);
            if (!statusCode) {
                statusCode = new UnknownStatusCode(code, "Unknown status code.", Severity.ERROR);
            }
            return statusCode;
        }
        else if (isAssignableFrom(Number, clazz)) {
            return parseFloat(value);
        }
        else if (isAssignableFrom(Boolean, clazz)) {
            return ("Y" === value.toUpperCase());
        }
        else if (isAssignableFrom(Date, clazz)) {
            return this.parseDate(value);
        }
        // this goes last because a lot of things are objects
        else if (typeof clazz === "object") {
            // enum
            console.assert(value in clazz);
            if (value in clazz) {
                return clazz[value];
            }
        }
        return value;
    }
    /**
     * Parses a date according to OFX.
     *
     * @param value The value of the date.
     * @return The date value.
     */
    parseDate(value) {
        var year = parseInt(value.substr(0, 4));
        var month = parseInt(value.substr(4, 2)) - 1; // javascript month numbers are zero-based
        var day = parseInt(value.substr(6, 2));
        var hour = parseInt(value.substr(8, 2));
        var minute = parseInt(value.substr(10, 2));
        var second = parseInt(value.substr(12, 2)) || 0;
        var milli = parseInt(value.substr(15, 3)) || 0;
        // add timezone offset
        var bracket = value.indexOf("[");
        if (bracket != -1) {
            var close = value.indexOf(":");
            if (close === -1) {
                close = value.indexOf("]");
            }
            var gmtOffset = value.substring(bracket + 1, close);
            hour -= 1.0 * gmtOffset;
        }
        // create date as UTC
        return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
    }
    /**
     * Format the date according to the OFX spec.
     *
     * @param date The date.
     * @return The date format.
     */
    formatDate(date) {
        var gmt = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
        return this.pad(gmt.getFullYear(), 4) +
            this.pad(gmt.getMonth() + 1, 2) +
            this.pad(gmt.getDate(), 2) +
            this.pad(gmt.getHours(), 2) +
            this.pad(gmt.getMinutes(), 2) +
            this.pad(gmt.getSeconds(), 2) +
            "." +
            this.dpad(gmt.getMilliseconds(), 3);
    }
    /**
     * Pad a number with leading zeroes until it is of <tt>size</tt> length
     *
     * @param num number
     * @param size number of digits in final number
     * @return padded number
     */
    pad(num, size) {
        var s = num + "";
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }
    /**
     * Pad a number with trailing zeroes until it is of <tt>size</tt> length.
     * Intended for numbers after a decimal point to get a fixed number of decimals
     *
     * @param num number
     * @param size number of digits in final number
     * @return padded number
     */
    dpad(num, size) {
        var s = num + "";
        while (s.length < size) {
            s = s + "0";
        }
        return s;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LOG$1;
/**
 * Marshaller for aggregate objects.
 *
 * @author Ryan Heaton
 */
class AggregateMarshaller {
    constructor() {
        this.conversion = new DefaultStringConversion();
    }
    /**
     * Marshal the specified aggregate object.
     *
     * @param aggregate The aggregate to marshal.
     * @param writer    The writer.
     */
    marshal(aggregate, writer) {
        var aggregateInfo = AggregateIntrospector.getAggregateInfo(aggregate.constructor);
        if (aggregateInfo == null) {
            throw new OFXException("Unable to marshal object (no aggregate metadata found).");
        }
        if (aggregateInfo.hasHeaders()) {
            var headerValues = aggregateInfo.getHeaders(aggregate);
            var convertedValues = {};
            for (var header in headerValues) {
                convertedValues[header] = this.getConversion().toString(headerValues[header]);
            }
            writer.writeHeaders(convertedValues);
        }
        writer.writeStartAggregate(aggregateInfo.getName());
        var AggregateAttributes = aggregateInfo.getAttributes();
        this.writeAggregateAttributes(aggregate, writer, AggregateAttributes);
        writer.writeEndAggregate(aggregateInfo.getName());
    }
    /**
     * Write the aggregate attributes for the specified aggregate.
     *
     * @param aggregate           The aggregate.
     * @param writer              The writer.
     * @param aggregateAttributes The aggregate attributes.
     */
    writeAggregateAttributes(aggregate, writer, aggregateAttributes) {
        for (var i in aggregateAttributes.values()) {
            var aggregateAttribute = aggregateAttributes.values()[i];
            var childValue = null;
            try {
                childValue = aggregateAttribute.get(aggregate);
            }
            catch (e) {
                LOG$1.error("Unable to get " + aggregateAttribute.toString(), e);
            }
            if (childValue != null) {
                switch (aggregateAttribute.getType()) {
                    case AggregateAttributeType.CHILD_AGGREGATE:
                        var childValues;
                        if (childValue instanceof Array) {
                            childValues = childValue;
                        }
                        else if (childValue instanceof SortedSet) {
                            childValues = childValue.values();
                        }
                        else {
                            childValues = [childValue];
                        }
                        for (var objValue of childValues) {
                            var aggregateInfo = AggregateIntrospector.getAggregateInfo(objValue.constructor);
                            if (aggregateInfo == null) {
                                throw new OFXException("Unable to marshal object of type " + objValue.constructor.name + " (no aggregate metadata found).");
                            }
                            var attributeName = aggregateAttribute.getName();
                            if (aggregateAttribute.isArray()) {
                                attributeName = aggregateInfo.getName();
                            }
                            writer.writeStartAggregate(attributeName);
                            this.writeAggregateAttributes(objValue, writer, aggregateInfo.getAttributes());
                            writer.writeEndAggregate(attributeName);
                        }
                        break;
                    case AggregateAttributeType.ELEMENT:
                        var strValue = this.getConversion().toString(childValue);
                        if ((strValue != null) && ("" !== strValue.trim())) {
                            writer.writeElement(aggregateAttribute.getName(), strValue);
                        }
                        break;
                    default:
                        throw new OFXException("Unknown aggregate attribute type: " + aggregateAttribute.getType());
                }
            }
            else if (aggregateAttribute.isRequired()) {
                throw new OFXException("Required " + aggregateAttribute.toString() + " is null or empty.");
            }
        }
    }
    /**
     * The conversion.
     *
     * @return The conversion.
     */
    getConversion() {
        return this.conversion;
    }
    /**
     * The conversion.
     *
     * @param conversion The conversion.
     */
    setConversion(conversion) {
        this.conversion = conversion;
    }
}
LOG$1 = LogFactory.getLog(AggregateMarshaller);

class StringReader {
    constructor(text) {
        this._text = text;
        this._cursor = 0;
        this._mark = 0;
    }
    read(cbuf, offset, length) {
        if (this._cursor >= this._text.length) {
            return -1;
        }
        else {
            if (arguments.length === 0) {
                return this.readChar();
            }
            else {
                offset = offset || 0;
                length = length || cbuf.length;
                length = Math.min(length, this._text.length - this._cursor);
                for (var i = 0; i < length; i++) {
                    cbuf[offset + i] = this.readChar();
                }
                return length;
            }
        }
    }
    readChar() {
        console.assert(this._cursor < this._text.length);
        var ch = this._text[this._cursor];
        this._cursor++;
        return ch;
    }
    close() {
        this._text = null;
        this._cursor = null;
        this._mark = null;
    }
    mark( /*readLimit*/) {
        this._mark = this._cursor;
    }
    reset() {
        this._cursor = this._mark;
    }
    remainder() {
        return this._text.substring(this._cursor);
    }
}

/**
 * Default (no-op) implementation of an OFX handler.
 *
 * @author Ryan Heaton
 */
class DefaultHandler {
    onHeader(name, value) {
    }
    onElement(name, value) {
    }
    startAggregate(aggregateName) {
    }
    endAggregate(aggregateName) {
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class OFXParseException extends OFXException {
    constructor(message) {
        super(message);
    }
}

class Stack {
    constructor() {
        this.values = [];
    }
    push(...values) {
        return Array.prototype.push.apply(this.values, arguments);
    }
    pop() {
        return Array.prototype.pop.call(this.values);
    }
    peek() {
        if (this.values.length === 0) {
            return null;
        }
        else {
            return this.values[this.values.length - 1];
        }
    }
    isEmpty() {
        return this.values.length === 0;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OFXParseEventType;
(function (OFXParseEventType) {
    OFXParseEventType[OFXParseEventType["CHARACTERS"] = 0] = "CHARACTERS";
    OFXParseEventType[OFXParseEventType["ELEMENT"] = 1] = "ELEMENT";
})(OFXParseEventType || (OFXParseEventType = {}));
/**
 * An event during OFX parsing.
 *
 * @author Ryan Heaton
 */
class OFXParseEvent {
    constructor(eventType, eventValue) {
        this.eventType = eventType;
        this.eventValue = eventValue;
    }
    getEventType() {
        return this.eventType;
    }
    getEventValue() {
        return this.eventValue;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LOG$2;
/**
 * @author Ryan Heaton
 */
class OFXV2ContentHandler {
    constructor(ofxHandler) {
        this.eventStack = new Stack();
        this.startedEvents = new Array();
        if (ofxHandler == null) {
            throw new OFXException("An OFX handler must be supplied.");
        }
        this.ofxHandler = ofxHandler;
    }
    install(parser$$1) {
        parser$$1.ontext = this.ontext.bind(this);
        parser$$1.onopentag = this.onopentag.bind(this);
        parser$$1.onclosetag = this.onclosetag.bind(this);
    }
    onopentag(node) {
        var qName = node.name;
        if (LOG$2.isDebugEnabled()) {
            LOG$2.debug("START ELEMENT: " + qName);
        }
        if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEventType.ELEMENT) && (!this.isAlreadyStarted(this.eventStack.peek()))) {
            var eventValue = this.eventStack.peek().getEventValue();
            if (LOG$2.isDebugEnabled()) {
                LOG$2.debug("Element " + qName + " is starting aggregate " + eventValue);
            }
            //the last element started was not ended; we are assuming we've started a new aggregate.
            this.ofxHandler.startAggregate(eventValue);
            this.startedEvents.push(this.eventStack.peek());
        }
        this.eventStack.push(new OFXParseEvent(OFXParseEventType.ELEMENT, qName));
    }
    /**
     * Whether the specified element aggregate has already been started.
     *
     * @param event The event containing the start.
     * @return Whether the specified element aggregate has already been started.
     */
    isAlreadyStarted(event) {
        return this.startedEvents.indexOf(event) != -1;
    }
    onclosetag(qName) {
        if (LOG$2.isDebugEnabled()) {
            LOG$2.debug("END ELEMENT: " + qName);
        }
        var eventToFinish = this.eventStack.pop();
        if (eventToFinish.getEventType() == OFXParseEventType.CHARACTERS) {
            var chars = eventToFinish.getEventValue().trim();
            if (this.eventStack.isEmpty()) {
                throw new OFXException("Illegal character data outside main OFX root element: \"" + chars + "\".");
            }
            else {
                var elementEvent = this.eventStack.pop();
                if (elementEvent.getEventType() != OFXParseEventType.ELEMENT) {
                    throw new OFXException("Illegal OFX event before characters \"" + chars + "\" (" + elementEvent.getEventType() + ")!");
                }
                else {
                    var value = elementEvent.getEventValue();
                    if (LOG$2.isDebugEnabled()) {
                        LOG$2.debug("Element " + value + " processed with value " + chars);
                    }
                    this.ofxHandler.onElement(value, chars);
                }
            }
        }
        else if (eventToFinish.getEventType() == OFXParseEventType.ELEMENT) {
            //we're ending an aggregate (no character data on the stack).
            if (qName === eventToFinish.getEventValue()) {
                //the last element on the stack is ours; we're ending an OFX aggregate.
                var value = eventToFinish.getEventValue();
                if (LOG$2.isDebugEnabled()) {
                    LOG$2.debug("Ending aggregate " + value);
                }
                this.ofxHandler.endAggregate(value);
                var i = this.startedEvents.indexOf(eventToFinish);
                console.assert(i !== -1);
                if (i > -1) {
                    this.startedEvents.splice(i, 1);
                }
            }
            else {
                throw new OFXException("Unexpected end tag: " + eventToFinish.getEventValue());
            }
        }
        else {
            throw new OFXException("Illegal OFX event: " + eventToFinish.getEventType());
        }
    }
    ontext(value) {
        if (value.trim().length > 0) {
            var event;
            if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEventType.CHARACTERS)) {
                //append the characters...
                event = new OFXParseEvent(OFXParseEventType.CHARACTERS, this.eventStack.pop().getEventValue() + value);
            }
            else {
                event = new OFXParseEvent(OFXParseEventType.CHARACTERS, value);
            }
            this.eventStack.push(event);
        }
    }
}
LOG$2 = LogFactory.getLog(OFXV2ContentHandler);

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LOG$3;
function arraysEqual(a1, a2) {
    if (a1.length !== a2.length) {
        return false;
    }
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Base class for an OFX reader.  Parses the headers and determines whether we're parsing an
 * OFX v2 or OFX v1 element.  For OFX v2, uses a standard SAX library.
 *
 * @author Ryan Heaton
 */
class BaseOFXReader {
    constructor() {
        this.contentHandler = new DefaultHandler();
    }
    /**
     * The content handler.
     *
     * @return The content handler.
     */
    getContentHandler() {
        return this.contentHandler;
    }
    /**
     * The content handler.
     *
     * @param handler The content handler.
     */
    setContentHandler(handler) {
        this.contentHandler = handler;
    }
    /**
     * Parse the reader, including the headers.
     *
     * @param reader The reader.
     */
    parse(reader) {
        var header = "";
        var firstElementStart = this.getFirstElementStart();
        var buffer = new Array(firstElementStart.length);
        reader.mark( /*firstElementStart.length*/);
        var ch = reader.read(buffer);
        while ((ch != -1) && (!arraysEqual(buffer, firstElementStart))) {
            if (!this.contains(buffer, '<')) {
                //if the buffer contains a '<', then we might already have marked the beginning.
                reader.mark( /*firstElementStart.length*/);
            }
            ch = reader.read();
            var shifted = this.shiftAndAppend(buffer, ch);
            header += shifted;
        }
        if (ch == -1) {
            throw new OFXParseException("Invalid OFX: no root <OFX> element!");
        }
        else {
            var matches = BaseOFXReader.OFX_2_PROCESSING_INSTRUCTION_PATTERN.exec(header);
            if (matches) {
                if (LOG$3.isInfoEnabled()) {
                    LOG$3.info("Processing OFX 2 header...");
                }
                this.processOFXv2Headers(matches[1]);
                reader.reset();
                this.parseV2FromFirstElement(reader.remainder());
            }
            else {
                LOG$3.info("Processing OFX 1 headers...");
                this.processOFXv1Headers(header);
                reader.reset();
                this.parseV1FromFirstElement(reader.remainder());
            }
        }
    }
    /**
     * The first characters of the first OFX element, '<', 'O', 'F', 'X'
     *
     * @return The first characters of the OFX element.
     */
    getFirstElementStart() {
        return ['<', 'O', 'F', 'X'];
    }
    /**
     * Whether the specified buffer contains the specified character.
     *
     * @param buffer The buffer.
     * @param c The character to search for.
     * @return Whether the specified buffer contains the specified character.
     */
    contains(buffer, c) {
        for (var i = 0; i < buffer.length; i++) {
            var ch = buffer[i];
            if (ch === c) {
                return true;
            }
        }
        return false;
    }
    shiftAndAppend(buffer, c) {
        var shifted = buffer[0];
        for (var i = 0; i + 1 < buffer.length; i++) {
            buffer[i] = buffer[i + 1];
        }
        buffer[buffer.length - 1] = c;
        return shifted;
    }
    /**
     * Parse an OFX version 1 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
     *
     * @param text The text.
     */
    parseV1FromFirstElement(text) {
        var strict = false;
        var parser$$1 = parser(strict, {});
        var handler = new OFXV2ContentHandler(this.getContentHandler());
        handler.install(parser$$1);
        parser$$1.write(text);
    }
    /**
     * Parse an OFX version 2 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
     *
     * @param text The text.
     */
    parseV2FromFirstElement(text) {
        var strict = true;
        var parser$$1 = parser(strict, {});
        var handler = new OFXV2ContentHandler(this.getContentHandler());
        handler.install(parser$$1);
        parser$$1.write(text);
    }
    /**
     * Process the given characters as OFX version 1 headers.
     *
     * @param chars The characters to process.
     */
    processOFXv1Headers(chars) {
        var lines = chars.split(/(\n|\r\n)/);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var colonIndex = line.indexOf(':');
            if (colonIndex >= 0) {
                var name = line.substring(0, colonIndex);
                var value = line.length > colonIndex ? line.substring(colonIndex + 1) : "";
                this.contentHandler.onHeader(name, value);
            }
        }
    }
    /**
     * Process the given characters as OFX version 2 headers.
     *
     * @param chars The characters to process.
     */
    processOFXv2Headers(chars) {
        var nameValuePairs = chars.split("\\s+");
        for (var nameValuePair of nameValuePairs) {
            var equalsIndex = nameValuePair.indexOf('=');
            if (equalsIndex >= 0) {
                var name = nameValuePair.substring(0, equalsIndex);
                var value = nameValuePair.length > equalsIndex ? nameValuePair.substring(equalsIndex + 1) : "";
                value = value.replace('"', ' ');
                value = value.replace('\'', ' ');
                value = value.trim();
                this.contentHandler.onHeader(name, value);
            }
        }
    }
}
BaseOFXReader.OFX_2_PROCESSING_INSTRUCTION_PATTERN = /<\\?OFX ([^\\?]+)\\?>/;
LOG$3 = LogFactory.getLog(BaseOFXReader);

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class OFXSyntaxException extends OFXParseException {
    constructor(message) {
        super(message);
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LOG$4;
class AggregateInfoHolder {
    constructor(arg1, arg2, arg3) {
        this.currentAttributeIndex = 0;
        switch (arguments.length) {
            case 1:
                this.AggregateInfoHolder1.apply(this, arguments);
                break;
            case 3:
                this.AggregateInfoHolder3.apply(this, arguments);
                break;
            default:
                throw new OFXException("invalid number of arguments");
        }
    }
    AggregateInfoHolder1(ignoredAggregateName) {
        this.aggregate = null;
        this.info = null;
        this.aggregateName = ignoredAggregateName;
    }
    AggregateInfoHolder3(aggregate, info, aggregateName) {
        this.aggregateName = aggregateName;
        this.aggregate = aggregate;
        this.info = info;
    }
    isBeingSkipped() {
        return this.aggregate == null || this.info == null;
    }
    isSkipping(aggregateName) {
        return this.isBeingSkipped() && aggregateName === this.aggregateName;
    }
}
/**
 * Content handler that manages the aggregate using a stack-based implementation.
 *
 * @author Ryan Heaton
 */
class AggregateStackContentHandler {
    constructor(root, conversion) {
        this.stack = new Stack();
        this.parsingRoot = false;
        this.stack = new Stack();
        this.parsingRoot = false;
        var aggregateInfo = AggregateIntrospector.getAggregateInfo(root.constructor);
        if (aggregateInfo == null) {
            throw new OFXException("Unable to marshal object of type '" + root.constructor.name + "' (no aggregate metadata found).");
        }
        this.stack.push(new AggregateInfoHolder(root, aggregateInfo, aggregateInfo.getName()));
        this.conversion = conversion;
    }
    onHeader(name, value) {
        var headerType = this.stack.peek().info.getHeaderType(name);
        if (headerType != null) {
            this.stack.peek().info.setHeader(this.stack.peek().aggregate, name, this.conversion.fromString(headerType, value));
        }
    }
    onElement(name, value) {
        if (!this.stack.peek().isBeingSkipped()) {
            var attribute = this.stack.peek().info.getAttribute(name, this.stack.peek().currentAttributeIndex);
            if (attribute != null && attribute.getType() == AggregateAttributeType.ELEMENT) {
                try {
                    attribute.set(this.conversion.fromString(attribute.getAttributeType(), value), this.stack.peek().aggregate);
                }
                catch (e) {
                    LOG$4.error("Unable to set " + attribute.toString(), e);
                }
                this.stack.peek().currentAttributeIndex = attribute.getOrder();
            }
            else if (LOG$4.isInfoEnabled()) {
                LOG$4.info("Element " + name + " is not supported on aggregate " + this.stack.peek().info.getName() + " at index " + this.stack.peek().currentAttributeIndex);
            }
        }
    }
    startAggregate(aggregateName) {
        if (this.stack.peek().isBeingSkipped()) {
            this.stack.push(new AggregateInfoHolder(aggregateName));
        }
        else if (!this.parsingRoot) {
            if (aggregateName !== this.stack.peek().info.getName()) {
                throw new OFXException("Unexpected root element: " + aggregateName);
            }
            this.parsingRoot = true;
        }
        else {
            var infoHolder;
            var attribute = this.stack.peek().info.getAttribute(aggregateName, this.stack.peek().currentAttributeIndex);
            if (attribute != null) {
                if (attribute.getType() == AggregateAttributeType.CHILD_AGGREGATE) {
                    var aggregateType;
                    if (attribute.isArray()) {
                        aggregateType = AggregateIntrospector.findAggregateByName(aggregateName);
                    }
                    else {
                        aggregateType = attribute.getAttributeType();
                    }
                    if (aggregateType != null) {
                        var aggregateInfo = AggregateIntrospector.getAggregateInfo(aggregateType);
                        if (aggregateInfo == null) {
                            throw new OFXException("Unable to locate aggregate info for type " + aggregateType.getName());
                        }
                        var aggregate = aggregate = new aggregateType();
                        infoHolder = new AggregateInfoHolder(aggregate, aggregateInfo, aggregateName);
                    }
                    else {
                        if (LOG$4.isInfoEnabled()) {
                            LOG$4.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": name not assigned a type.");
                        }
                        //element not supported.  push a skipping aggregate on the stack.
                        infoHolder = new AggregateInfoHolder(aggregateName);
                    }
                    this.stack.peek().currentAttributeIndex = attribute.getOrder();
                }
                else {
                    if (LOG$4.isInfoEnabled()) {
                        LOG$4.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no child aggregate, but there does exist an element by that name.");
                    }
                    //child aggregate not supported.  push a skipping aggregate on the stack.
                    infoHolder = new AggregateInfoHolder(aggregateName);
                }
            }
            else {
                if (LOG$4.isInfoEnabled()) {
                    LOG$4.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no attributes found by that name after index " + this.stack.peek().currentAttributeIndex);
                }
                //child aggregate not supported.  push a skipping aggregate on the stack.
                infoHolder = new AggregateInfoHolder(aggregateName);
            }
            this.stack.push(infoHolder);
        }
    }
    endAggregate(aggregateName) {
        var infoHolder = this.stack.pop();
        if (aggregateName !== infoHolder.aggregateName) {
            throw new OFXSyntaxException("Unexpected end aggregate " + aggregateName + ". (Perhaps " +
                infoHolder.aggregateName + " is an element with an empty value, making it impossible to parse.)");
        }
        if (!this.stack.isEmpty()) {
            if (!infoHolder.isSkipping(aggregateName)) {
                //we're not skipping the top aggregate, so process it.
                var attribute = this.stack.peek().info.getAttribute(aggregateName, this.stack.peek().currentAttributeIndex, infoHolder.aggregate.constructor);
                try {
                    if (attribute != null) {
                        attribute.set(infoHolder.aggregate, this.stack.peek().aggregate);
                    }
                    else {
                        if (LOG$4.isInfoEnabled()) {
                            LOG$4.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no attributes found by that name after index " + this.stack.peek().currentAttributeIndex);
                        }
                    }
                }
                catch (e) {
                    LOG$4.error("Unable to set " + attribute.toString(), e);
                }
                if (attribute != null) {
                    this.stack.peek().currentAttributeIndex = attribute.getOrder();
                }
            }
        }
    }
}
LOG$4 = LogFactory.getLog(AggregateStackContentHandler);

/**
 * Unmarshaller for aggregate objects.
 *
 * @author Ryan Heaton
 */
class AggregateUnmarshaller {
    constructor(clazz) {
        this.clazz = clazz;
        this.conversion = new DefaultStringConversion();
    }
    unmarshal(arg) {
        var stream = (arg instanceof StringReader) ? arg : new StringReader(arg);
        var aggregate = new this.clazz();
        var reader = this.newReader();
        reader.setContentHandler(new AggregateStackContentHandler(aggregate, this.getConversion()));
        reader.parse(stream);
        return aggregate;
    }
    /**
     * New OFX reader.
     *
     * @return new OFX reader.
     */
    newReader() {
        return new BaseOFXReader();
    }
    /**
     * The conversion.
     *
     * @return The conversion.
     */
    getConversion() {
        return this.conversion;
    }
    /**
     * The conversion.
     *
     * @param conversion The conversion.
     */
    setConversion(conversion) {
        this.conversion = conversion;
    }
}

/**
 * A message set enclosed in a response envelope.
 *
 * @author Ryan Heaton
 */
class ResponseMessageSet /*implements Comparable<ResponseMessageSet>*/ {
    constructor() {
        this.version = "1";
    }
    /**
     * The version of this message set.
     *
     * @return The version of this message set.
     */
    getVersion() {
        return this.version;
    }
    /**
     * The version of this message set.
     *
     * @param version The version of this message set.
     */
    setVersion(version) {
        this.version = version;
    }
    /*
      // Inherited.
      public compareTo(o: ResponseMessageSet): number {
        return getType().compareTo(o.getType());
      }
    */
    static contentCompare(left, right) {
        return left.getType() - right.getType();
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.util.SortedSet;
/**
 * Envelope for enclosing an OFX response.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.3, OFX Spec"
 */
class ResponseEnvelope {
    /**
     * The security of this envelope.
     *
     * @return The security of this envelope.
     * @see "Section 2.2, OFX spec"
     */
    getSecurity() {
        return this.security;
    }
    /**
     * The security of this envelope.
     *
     * @param security The security of this envelope.
     * @see "Section 2.2, OFX spec"
     */
    setSecurity(security) {
        this.security = security;
    }
    /**
     * The UID for the envelope.
     *
     * @return The UID for the envelope.
     * @see "Section 2.2, OFX spec"
     */
    getUID() {
        return this.UID;
    }
    /**
     * The UID for the envelope.
     *
     * @param UID The UID for the envelope.
     * @see "Section 2.2, OFX spec"
     */
    setUID(UID) {
        this.UID = UID;
    }
    /**
     * The message sets that make up the content of this response.
     *
     * @return The message sets that make up the content of this response.
     * @see "Section 2.4.5, OFX Spec"
     */
    getMessageSets() {
        return this.messageSets;
    }
    /**
     * The message sets that make up the content of this response.
     *
     * @param messageSets The message sets that make up the content of this response.
     * @see "Section 2.4.5, OFX Spec"
     */
    setMessageSets(messageSets) {
        this.messageSets = messageSets;
    }
    /**
     * Helper method for looking up the signon response.
     *
     * @return The signon response, or null if none found.
     */
    getSignonResponse() {
        var type = MessageSetType.signon;
        var message = this.getMessageSet(type);
        if (message != null) {
            return message.getSignonResponse();
        }
        else {
            return null;
        }
    }
    /**
     * Get the message set of the specified type.
     *
     * @param type The type.
     * @return The message set, or null.
     */
    getMessageSet(type) {
        var message = null;
        if (this.messageSets != null) {
            for (var i in this.messageSets.values()) {
                var messageSet = this.messageSets.values()[i];
                if (messageSet.getType() == type) {
                    message = messageSet;
                    break;
                }
            }
        }
        return message;
    }
}
Aggregate_add(ResponseEnvelope, "OFX");
Header_add(ResponseEnvelope, { name: "SECURITY", type: ApplicationSecurity, read: ResponseEnvelope.prototype.getSecurity, write: ResponseEnvelope.prototype.setSecurity });
Header_add(ResponseEnvelope, { name: "NEWFILEUID", type: String, read: ResponseEnvelope.prototype.getUID, write: ResponseEnvelope.prototype.setUID });
ChildAggregate_add(ResponseEnvelope, { order: 1, type: SortedSet, collectionEntryType: ResponseMessageSet, read: ResponseEnvelope.prototype.getMessageSets, write: ResponseEnvelope.prototype.setMessageSets });

class OutputBuffer {
    constructor() {
        this.data = [];
    }
    toString(encoding) {
        return this.data.join('');
    }
    append(data) {
        this.data.push(data);
    }
    size() {
        return this.data.reduce(function (previousValue, currentValue) {
            return currentValue.length;
        }, 0);
    }
}
class StreamWriter {
    constructor(out, encoding) {
        this.out = out;
        this.encoding = encoding;
    }
    flush() {
    }
    close() {
    }
    write(data) {
        this.out.append(data);
        //TODO
        //Array.prototype.push.apply(this.out, data.split(''));
    }
}

//import Map = java.util.Map;
/**
 * OFX writer to SGML, suitable for OFX versions < 2.0.
 *
 * @author Ryan Heaton
 */
class OFXV1Writer {
    constructor(out) {
        this.LINE_SEPARATOR = "\r\n";
        this.headersWritten = false;
        this.writeAttributesOnNewLine = false;
        if (out instanceof StreamWriter) {
            this.writer = out;
        }
        else if (out instanceof OutputBuffer) {
            this.writer = this.newWriter(out);
        }
        else {
            throw new OFXException("invalid parameter type");
        }
    }
    newWriter(out) {
        return new StreamWriter(out, "ISO-8859-1");
    }
    writeHeaders(headers) {
        if (this.headersWritten) {
            throw new OFXException("Headers have already been written!");
        }
        //write out the 1.0 headers
        this.println("OFXHEADER:100");
        this.println("DATA:OFXSGML");
        this.println("VERSION:102");
        this.print("SECURITY:");
        var security = headers["SECURITY"];
        if (security == null) {
            security = "NONE";
        }
        this.println(security);
        this.println("ENCODING:USASCII"); //too many ofx v1 servers don't read unicode...
        this.println("CHARSET:1252"); //windows-compatible.
        this.println("COMPRESSION:NONE");
        this.print("OLDFILEUID:");
        var olduid = headers["OLDFILEUID"];
        if (olduid == null) {
            olduid = "NONE";
        }
        this.println(olduid);
        this.print("NEWFILEUID:");
        var uid = headers["NEWFILEUID"];
        if (uid == null) {
            uid = "NONE";
        }
        this.println(uid);
        this.println();
        this.headersWritten = true;
    }
    writeStartAggregate(aggregateName) {
        this.print('<');
        this.print(aggregateName);
        this.print('>');
        if (this.isWriteAttributesOnNewLine()) {
            this.println();
        }
    }
    writeElement(name, value) {
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
    writeEndAggregate(aggregateName) {
        this.print("</");
        this.print(aggregateName);
        this.print('>');
        if (this.isWriteAttributesOnNewLine()) {
            this.println();
        }
    }
    isWriteAttributesOnNewLine() {
        return this.writeAttributesOnNewLine;
    }
    setWriteAttributesOnNewLine(writeAttributesOnNewLine) {
        this.writeAttributesOnNewLine = writeAttributesOnNewLine;
    }
    close() {
        this.flush();
        this.writer.close();
    }
    flush() {
        this.writer.flush();
    }
    /*protected*/ println(line = null) {
        if (line != null) {
            this.print(line);
        }
        this.writer.write(this.LINE_SEPARATOR);
    }
    /*protected*/ print(line) {
        this.writer.write(line == null ? "null" : line);
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// import java.io.*;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import org.apache.commons.logging.Log;
// import org.apache.commons.logging.LogFactory;
var LOG$5;
function DefaultAjaxHandler(url, verb, headers, data, async) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var onloadCalled = false;
        request.open("POST", url, async);
        for (var header in headers) {
            request.setRequestHeader(header, headers[header]);
        }
        request.onload = function () {
            onloadCalled = true;
            if (request.status >= 200 && request.status < 300) {
                resolve(request.responseText);
            }
            else if (request.status >= 400 && request.status < 500) {
                reject(new OFXException("Error " + request.status + " with client request: " + request.responseText));
            }
            else {
                reject(new OFXException("Invalid response code from OFX server: " + request.status));
            }
        };
        request.onerror = function () {
            reject(new OFXException("Network error"));
        };
        request.send(data);
        if (!async && !onloadCalled) {
            request.onload();
        }
    });
}
/**
 * Base implementation for an OFX connection.
 *
 * @author Ryan Heaton
 */
class OFXV1Connection {
    constructor() {
        this.async = true;
        this.marshaller = new AggregateMarshaller();
        this.unmarshaller = new AggregateUnmarshaller(ResponseEnvelope);
        this.ajax = DefaultAjaxHandler;
    }
    // Inherited.
    sendRequest(request, url) {
        //    if (!url.protocol().toLowerCase().startsWith("http")) {
        //      throw new OFXException("Invalid URL: " + url + " only http(s) is supported.");
        //    }
        //marshal to memory so we can determine the size...
        var outBuffer = new OutputBuffer();
        var ofxWriter = this.newOFXWriter(outBuffer);
        this.getMarshaller().marshal(request, ofxWriter);
        ofxWriter.close();
        this.logRequest(outBuffer);
        return this.sendBuffer(url, outBuffer)
            .then((in_) => {
            this.logResponse(in_);
            return this.unmarshal(in_);
        });
    }
    /**
     * Log a request buffer.
     *
     * @param outBuffer The buffer to log.
     */
    logRequest(outBuffer) {
        if (LOG$5.isInfoEnabled()) {
            LOG$5.info("Marshalling " + outBuffer.size() + " bytes of the OFX request.");
            if (LOG$5.isDebugEnabled()) {
                LOG$5.debug(outBuffer.toString("utf-8"));
            }
        }
    }
    logResponse(inBuffer) {
        if (LOG$5.isInfoEnabled()) {
            if (LOG$5.isDebugEnabled()) {
                LOG$5.debug("Received OFX response:", inBuffer);
            }
        }
    }
    /**
     * Send the specified buffer to the specified URL.
     *
     * @param url The URL.
     * @param outBuffer The buffer.
     * @return a promise that resolves with the response.
     */
    sendBuffer(url, outBuffer) {
        var outText = outBuffer.toString();
        var async = this.getAsync();
        var headers = {
            "Content-Type": "application/x-ofx",
            "Accept": "*/*, application/x-ofx"
        };
        return this.ajax(url, "POST", headers, outText, async);
    }
    /**
     * Unmarshal the input stream.
     *
     * @param in The input stream.
     * @return The response envelope.
     */
    unmarshal(in_) {
        try {
            var reader = new StringReader(in_);
            return this.getUnmarshaller().unmarshal(reader);
        }
        catch (e) {
            throw new OFXConnectionException("Unable to parse the OFX response.", e);
        }
    }
    /**
     * Create a new OFX writer.
     *
     * @param out The output stream for the writer.
     * @return The OFX writer.
     */
    newOFXWriter(out) {
        return new OFXV1Writer(out);
    }
    /**
     * The marshaller.
     *
     * @return The marshaller.
     */
    getMarshaller() {
        return this.marshaller;
    }
    /**
     * The marshaller.
     *
     * @param marshaller The marshaller.
     */
    setMarshaller(marshaller) {
        this.marshaller = marshaller;
    }
    /**
     * The unmarshaller.
     *
     * @return The unmarshaller.
     */
    getUnmarshaller() {
        return this.unmarshaller;
    }
    /**
     * The unmarshaller.
     *
     * @param unmarshaller The unmarshaller.
     */
    setUnmarshaller(unmarshaller) {
        this.unmarshaller = unmarshaller;
    }
    /**
     * Async mode
     *
     * @return {bool} Whether in async mode.
     */
    getAsync() {
        return this.async;
    }
    /**
     * Async mode
     *
     * @param {bool} async async mode.
     */
    setAsync(async) {
        this.async = async;
    }
    /**
     * Async mode
     *
     * @return {bool} Whether in async mode.
     */
    getAjax() {
        return this.ajax;
    }
    /**
     * Async mode
     *
     * @param {bool} async async mode.
     */
    setAjax(ajax) {
        this.ajax = ajax;
    }
}
LOG$5 = LogFactory.getLog(OFXV1Connection);

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * OFX writer to XML, suitable for OFX version 2.0.
 *
 * @author Ryan Heaton
 */
class OFXV2Writer extends OFXV1Writer {
    constructor(out) {
        super(out);
    }
    //@Override
    newWriter(out) {
        return new StreamWriter(out, "UTF-8");
    }
    writeHeaders(headers) {
        if (this.headersWritten) {
            throw new OFXException("Headers have already been written!");
        }
        //write out the XML PI
        this.print("<?xml version=\"1.0\" encoding=\"utf-8\" ?>");
        var security = headers["SECURITY"];
        if (security == null) {
            security = "NONE";
        }
        var olduid = headers["OLDFILEUID"];
        if (olduid == null) {
            olduid = "NONE";
        }
        // println(olduid);
        var uid = headers["NEWFILEUID"];
        if (uid == null) {
            uid = "NONE";
        }
        this.print("<?OFX OFXHEADER=\"200\" VERSION=\"202\" SECURITY=\"" + security + "\" OLDFILEUID=\"" + olduid + "\" NEWFILEUID=\"" + uid + "\"?>");
        this.headersWritten = true;
    }
    writeElement(name, value) {
        super.writeElement(name, value);
        this.print("</");
        this.print(name);
        this.print('>');
    }
    //@Override
    isWriteAttributesOnNewLine() {
        return false;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class OFXV2Connection extends OFXV1Connection {
    //@Override
    newOFXWriter(out) {
        return new OFXV2Writer(out);
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
var AccountStatus;
(function (AccountStatus) {
    /**
     * Available, but not yet requested.
     */
    AccountStatus[AccountStatus["AVAIL"] = 0] = "AVAIL";
    /**
     * Requested, but not yet available.
     */
    AccountStatus[AccountStatus["PEND"] = 1] = "PEND";
    /**
     * Active.
     */
    AccountStatus[AccountStatus["ACTIVE"] = 2] = "ACTIVE";
})(AccountStatus || (AccountStatus = {}));

/**
 * @author Ryan Heaton
 */
class BankAccountInfo {
    /**
     * The bank account this information is referencing.
     *
     * @return The bank account this information is referencing.
     */
    getBankAccount() {
        return this.bankAccount;
    }
    /**
     * The bank account this information is referencing.
     *
     * @param bankAccount The bank account this information is referencing.
     */
    setBankAccount(bankAccount) {
        this.bankAccount = bankAccount;
    }
    // Inherited.
    getAccountDetails() {
        return this.getBankAccount();
    }
    /**
     * Whether this account supports download of transaction details.
     *
     * @return Whether this account supports download of transaction details.
     */
    getSupportsTransactionDetailOperations() {
        return this.supportsTransactionDetailOperations;
    }
    /**
     * Whether this account supports download of transaction details.
     *
     * @param supportsTransactionDetailOperations Whether this account supports download of transaction details.
     */
    setSupportsTransactionDetailOperations(supportsTransactionDetailOperations) {
        this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
    }
    /**
     * Whether this account supports transfer operations to other accounts.
     *
     * @return Whether this account supports transfer operations to other accounts.
     */
    getSupportsTransferToOtherAccountOperations() {
        return this.supportsTransferToOtherAccountOperations;
    }
    /**
     * Whether this account supports transfer operations to other accounts.
     *
     * @param supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
     */
    setSupportsTransferToOtherAccountOperations(supportsTransferToOtherAccountOperations) {
        this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
    }
    /**
     * Whether this account supports transfer operations from other accounts.
     *
     * @return Whether this account supports transfer operations from other accounts.
     */
    getSupportsTransferFromOtherAccountOperations() {
        return this.supportsTransferFromOtherAccountOperations;
    }
    /**
     * Whether this account supports transfer operations from other accounts.
     *
     * @param supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
     */
    setSupportsTransferFromOtherAccountOperations(supportsTransferFromOtherAccountOperations) {
        this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
    }
    /**
     * The account status.
     *
     * @return The account status.
     */
    getStatus() {
        return this.status;
    }
    /**
     * The account status.
     *
     * @param status The account status.
     */
    setStatus(status) {
        this.status = status;
    }
}
Aggregate_add(BankAccountInfo, "BANKACCTINFO");
ChildAggregate_add(BankAccountInfo, { name: "BANKACCTFROM", required: true, order: 0, type: BankAccountDetails, read: BankAccountInfo.prototype.getBankAccount, write: BankAccountInfo.prototype.setBankAccount });
Element_add(BankAccountInfo, { name: "SUPTXDL", required: true, order: 10, type: Boolean, read: BankAccountInfo.prototype.getSupportsTransactionDetailOperations, write: BankAccountInfo.prototype.setSupportsTransactionDetailOperations });
Element_add(BankAccountInfo, { name: "XFERSRC", required: true, order: 20, type: Boolean, read: BankAccountInfo.prototype.getSupportsTransferToOtherAccountOperations, write: BankAccountInfo.prototype.setSupportsTransferToOtherAccountOperations });
Element_add(BankAccountInfo, { name: "XFERDEST", required: true, order: 30, type: Boolean, read: BankAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations, write: BankAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations });
Element_add(BankAccountInfo, { name: "SVCSTATUS", required: true, order: 40, type: AccountStatus, read: BankAccountInfo.prototype.getStatus, write: BankAccountInfo.prototype.setStatus });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of investment transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var InvestmentTransactionType;
(function (InvestmentTransactionType) {
    InvestmentTransactionType[InvestmentTransactionType["BUY_DEBT"] = 0] = "BUY_DEBT";
    InvestmentTransactionType[InvestmentTransactionType["BUY_MUTUAL_FUND"] = 1] = "BUY_MUTUAL_FUND";
    InvestmentTransactionType[InvestmentTransactionType["BUY_OPTION"] = 2] = "BUY_OPTION";
    InvestmentTransactionType[InvestmentTransactionType["BUY_OTHER"] = 3] = "BUY_OTHER";
    InvestmentTransactionType[InvestmentTransactionType["BUY_STOCK"] = 4] = "BUY_STOCK";
    InvestmentTransactionType[InvestmentTransactionType["CLOSE_OPTION"] = 5] = "CLOSE_OPTION";
    InvestmentTransactionType[InvestmentTransactionType["INCOME"] = 6] = "INCOME";
    InvestmentTransactionType[InvestmentTransactionType["INVESTMENT_EXPENSE"] = 7] = "INVESTMENT_EXPENSE";
    InvestmentTransactionType[InvestmentTransactionType["JOURNAL_FUND"] = 8] = "JOURNAL_FUND";
    InvestmentTransactionType[InvestmentTransactionType["JOURNAL_SECURITY"] = 9] = "JOURNAL_SECURITY";
    InvestmentTransactionType[InvestmentTransactionType["MARGIN_INTEREST"] = 10] = "MARGIN_INTEREST";
    InvestmentTransactionType[InvestmentTransactionType["REINVEST_INCOME"] = 11] = "REINVEST_INCOME";
    InvestmentTransactionType[InvestmentTransactionType["RETURN_OF_CAPITAL"] = 12] = "RETURN_OF_CAPITAL";
    InvestmentTransactionType[InvestmentTransactionType["SELL_DEBT"] = 13] = "SELL_DEBT";
    InvestmentTransactionType[InvestmentTransactionType["SELL_MUTUAL_FUND"] = 14] = "SELL_MUTUAL_FUND";
    InvestmentTransactionType[InvestmentTransactionType["SELL_OPTION"] = 15] = "SELL_OPTION";
    InvestmentTransactionType[InvestmentTransactionType["SELL_OTHER"] = 16] = "SELL_OTHER";
    InvestmentTransactionType[InvestmentTransactionType["SELL_STOCK"] = 17] = "SELL_STOCK";
    InvestmentTransactionType[InvestmentTransactionType["SPLIT"] = 18] = "SPLIT";
    InvestmentTransactionType[InvestmentTransactionType["TRANSFER"] = 19] = "TRANSFER";
})(InvestmentTransactionType || (InvestmentTransactionType = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
var CorrectionAction;
(function (CorrectionAction) {
    CorrectionAction[CorrectionAction["REPLACE"] = 0] = "REPLACE";
    CorrectionAction[CorrectionAction["DELETE"] = 1] = "DELETE";
})(CorrectionAction || (CorrectionAction = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class Payee {
    /**
     * The name of the payee.
     *
     * @return The name of the payee.
     */
    getName() {
        return this.name;
    }
    /**
     * The name of the payee.
     *
     * @param name The name of the payee.
     */
    setName(name) {
        this.name = name;
    }
    /**
     * The address of the payee.
     *
     * @return The address of the payee.
     */
    getAddress1() {
        return this.address1;
    }
    /**
     * The address of the payee.
     *
     * @param address1 The address of the payee.
     */
    setAddress1(address1) {
        this.address1 = address1;
    }
    /**
     * The address of the payee.
     *
     * @return The address of the payee.
     */
    getAddress2() {
        return this.address2;
    }
    /**
     * The address of the payee.
     *
     * @param address2 The address of the payee.
     */
    setAddress2(address2) {
        this.address2 = address2;
    }
    /**
     * The address of the payee.
     *
     * @return The address of the payee.
     */
    getAddress3() {
        return this.address3;
    }
    /**
     * The address of the payee.
     *
     * @param address3 The address of the payee.
     */
    setAddress3(address3) {
        this.address3 = address3;
    }
    /**
     * The city of the payee.
     *
     * @return The city of the payee.
     */
    getCity() {
        return this.city;
    }
    /**
     * The city of the payee.
     *
     * @param city The city of the payee.
     */
    setCity(city) {
        this.city = city;
    }
    /**
     * The state of this payee.
     *
     * @return The state of this payee.
     */
    getState() {
        return this.state;
    }
    /**
     * The state of this payee.
     *
     * @param state The state of this payee.
     */
    setState(state) {
        this.state = state;
    }
    /**
     * The postal code of this payee.
     *
     * @return The postal code of this payee.
     */
    getZip() {
        return this.zip;
    }
    /**
     * The postal code of this payee.
     *
     * @param zip The postal code of this payee.
     */
    setZip(zip) {
        this.zip = zip;
    }
    /**
     * The country code for this payee.
     *
     * @return The country code for this payee.
     * @see java.util.Locale#getISO3Country()
     */
    getCountry() {
        return this.country;
    }
    /**
     * The country code for this payee.
     *
     * @param country The country code for this payee.
     */
    setCountry(country) {
        this.country = country;
    }
    /**
     * The phone number.
     *
     * @return The phone number.
     */
    getPhone() {
        return this.phone;
    }
    /**
     * The phone number.
     *
     * @param phone The phone number.
     */
    setPhone(phone) {
        this.phone = phone;
    }
}
Aggregate_add(Payee, "PAYEE");
Element_add(Payee, { name: "NAME", order: 30, type: String, read: Payee.prototype.getName, write: Payee.prototype.setName });
Element_add(Payee, { name: "ADDR1", required: true, order: 40, type: String, read: Payee.prototype.getAddress1, write: Payee.prototype.setAddress1 });
Element_add(Payee, { name: "ADDR2", order: 50, type: String, read: Payee.prototype.getAddress2, write: Payee.prototype.setAddress2 });
Element_add(Payee, { name: "ADDR3", order: 60, type: String, read: Payee.prototype.getAddress3, write: Payee.prototype.setAddress3 });
Element_add(Payee, { name: "CITY", required: true, order: 70, type: String, read: Payee.prototype.getCity, write: Payee.prototype.setCity });
Element_add(Payee, { name: "STATE", required: true, order: 80, type: String, read: Payee.prototype.getState, write: Payee.prototype.setState });
Element_add(Payee, { name: "POSTALCODE", required: true, order: 90, type: String, read: Payee.prototype.getZip, write: Payee.prototype.setZip });
Element_add(Payee, { name: "COUNTRY", required: true, order: 100, type: String, read: Payee.prototype.getCountry, write: Payee.prototype.setCountry });
Element_add(Payee, { name: "PHONE", order: 110, type: String, read: Payee.prototype.getPhone, write: Payee.prototype.setPhone });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 5.2, OFX Spec"
 */
class Currency {
    constructor() {
        this.code = "USD"; //java.util.Currency.getInstance(Locale.US).getCurrencyCode().toUpperCase();
    }
    /**
     * The currency code.
     *
     * @return The currency code.
     * @see java.util.Currency#getCurrencyCode()
     */
    getCode() {
        return this.code;
    }
    /**
     * The currency code
     *
     * @param code The currency code
     */
    setCode(code) {
        this.code = code;
    }
    /**
     * The exchange rate.
     *
     * @return The exchange rate.
     */
    getExchangeRate() {
        return this.exchangeRate;
    }
    /**
     * The exchange rate.
     *
     * @param exchangeRate The exchange rate.
     */
    setExchangeRate(exchangeRate) {
        this.exchangeRate = exchangeRate;
    }
}
Aggregate_add(Currency, "CURRENCY");
Element_add(Currency, { name: "CURSYM", required: true, order: 0, type: String, read: Currency.prototype.getCode, write: Currency.prototype.setCode });
Element_add(Currency, { name: "CURRATE", required: true, order: 10, type: Number, read: Currency.prototype.getExchangeRate, write: Currency.prototype.setExchangeRate });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class Transaction {
    /**
     * The transaction type.
     *
     * @return The transaction type.
     */
    getTransactionType() {
        return this.transactionType;
    }
    /**
     * The transaction type.
     *
     * @param transactionType The transaction type.
     */
    setTransactionType(transactionType) {
        this.transactionType = transactionType;
    }
    /**
     * The date the transaction was posted.
     *
     * @return The date the transaction was posted.
     */
    getDatePosted() {
        return this.datePosted;
    }
    /**
     * The date the transaction was posted.
     *
     * @param datePosted The date the transaction was posted.
     */
    setDatePosted(datePosted) {
        this.datePosted = datePosted;
    }
    /**
     * The date the transaction was initiated.
     *
     * @return The date the transaction was initiated.
     */
    getDateInitiated() {
        return this.dateInitiated;
    }
    /**
     * The date the transaction was initiated.
     *
     * @param dateInitiated The date the transaction was initiated.
     */
    setDateInitiated(dateInitiated) {
        this.dateInitiated = dateInitiated;
    }
    /**
     * The date the funds are available.
     *
     * @return The date the funds are available.
     */
    getDateAvailable() {
        return this.dateAvailable;
    }
    /**
     * The date the funds are available.
     *
     * @param dateAvailable The date the funds are available.
     */
    setDateAvailable(dateAvailable) {
        this.dateAvailable = dateAvailable;
    }
    /**
     * The transaction amount.
     *
     * @return The transaction amount.
     */
    getAmount() {
        return this.amount;
    }
    /**
     * The transaction amount.
     *
     * @param amount The transaction amount.
     */
    setAmount(amount) {
        this.amount = amount;
    }
    /**
     * The transaction amount.
     *
     * @return The transaction amount.
     */
    getBigDecimalAmount() {
        return this.amount;
    }
    /**
     * The transaction amount.
     *
     * @param amount The transaction amount.
     */
    setBigDecimalAmount(amount) {
        this.amount = amount;
    }
    /**
     * The transaction id (server-assigned).
     *
     * @return The transaction id (server-assigned).
     */
    getId() {
        return this.id;
    }
    /**
     * The transaction id (server-assigned).
     *
     * @param id The transaction id (server-assigned).
     */
    setId(id) {
        this.id = id;
    }
    /**
     * The id of the transaction that this is correcting.
     *
     * @return The id of the transaction that this is correcting.
     */
    getCorrectionId() {
        return this.correctionId;
    }
    /**
     * The id of the transaction that this is correcting.
     *
     * @param correctionId The id of the transaction that this is correcting.
     */
    setCorrectionId(correctionId) {
        this.correctionId = correctionId;
    }
    /**
     * The action to take on the {@link #getCorrectionId() corrected transaction}.
     *
     * @return The action to take on the {@link #getCorrectionId() corrected transaction}.
     */
    getCorrectionAction() {
        return this.correctionAction;
    }
    /**
     * The action to take on the {@link #getCorrectionId() corrected transaction}.
     *
     * @param correctionAction The action to take on the {@link #getCorrectionId() corrected transaction}.
     */
    setCorrectionAction(correctionAction) {
        this.correctionAction = correctionAction;
    }
    /**
     * The server-assigned temporary id for client-initiated transactions.
     *
     * @return The server-assigned temporary id for client-initiated transactions.
     */
    getTempId() {
        return this.tempId;
    }
    /**
     * The server-assigned temporary id for client-initiated transactions.
     *
     * @param tempId The server-assigned temporary id for client-initiated transactions.
     */
    setTempId(tempId) {
        this.tempId = tempId;
    }
    /**
     * The check number.
     *
     * @return The check number.
     */
    getCheckNumber() {
        return this.checkNumber;
    }
    /**
     * The check number.
     *
     * @param checkNumber The check number.
     */
    setCheckNumber(checkNumber) {
        this.checkNumber = checkNumber;
    }
    /**
     * The reference number.
     *
     * @return The reference number.
     */
    getReferenceNumber() {
        return this.referenceNumber;
    }
    /**
     * The reference number.
     *
     * @param referenceNumber The reference number.
     */
    setReferenceNumber(referenceNumber) {
        this.referenceNumber = referenceNumber;
    }
    /**
     * The standard industrial code.
     *
     * @return The standard industrial code.
     */
    getStandardIndustrialCode() {
        return this.standardIndustrialCode;
    }
    /**
     * The standard industrial code.
     *
     * @param standardIndustrialCode The standard industrial code.
     */
    setStandardIndustrialCode(standardIndustrialCode) {
        this.standardIndustrialCode = standardIndustrialCode;
    }
    /**
     * The payee id.
     *
     * @return The payee id.
     */
    getPayeeId() {
        return this.payeeId;
    }
    /**
     * The payee id.
     *
     * @param payeeId The payee id.
     */
    setPayeeId(payeeId) {
        this.payeeId = payeeId;
    }
    /**
     * The name (description) or the transaction.
     *
     * @return The name (description) or the transaction.
     */
    getName() {
        return this.name;
    }
    /**
     * The name (description) or the transaction.
     *
     * @param name The name (description) or the transaction.
     */
    setName(name) {
        this.name = name;
    }
    /**
     * The payee.
     *
     * @return The payee.
     */
    getPayee() {
        return this.payee;
    }
    /**
     * The payee.
     *
     * @param payee The payee.
     */
    setPayee(payee) {
        this.payee = payee;
    }
    /**
     * The bank account the transfer was to.
     *
     * @return The bank account the transfer was to.
     */
    getBankAccountTo() {
        return this.bankAccountTo;
    }
    /**
     * The bank account the transfer was to.
     *
     * @param bankAccountTo The bank account the transfer was to.
     */
    setBankAccountTo(bankAccountTo) {
        this.bankAccountTo = bankAccountTo;
    }
    /**
     * The credit-card account the transfer was to.
     *
     * @return The credit-card account the transfer was to.
     */
    getCreditCardAccountTo() {
        return this.creditCardAccountTo;
    }
    /**
     * The credit-card account the transfer was to.
     *
     * @param creditCardAccountTo The credit-card account the transfer was to.
     */
    setCreditCardAccountTo(creditCardAccountTo) {
        this.creditCardAccountTo = creditCardAccountTo;
    }
    /**
     * Notes.
     *
     * @return Notes.
     */
    getMemo() {
        return this.memo;
    }
    /**
     * Notes.
     *
     * @param memo Notes.
     */
    setMemo(memo) {
        this.memo = memo;
    }
    /**
     * The currency.
     *
     * @return The currency.
     */
    getCurrency() {
        return this.currency;
    }
    /**
     * The currency.
     *
     * @param currency The currency.
     */
    setCurrency(currency) {
        this.currency = currency;
    }
    /**
     * The original currency.
     *
     * @return The original currency.
     */
    getOriginalCurrency() {
        return this.originalCurrency;
    }
    /**
     * The original currency.
     *
     * @param originalCurrency The original currency.
     */
    setOriginalCurrency(originalCurrency) {
        this.originalCurrency = originalCurrency;
    }
}
Aggregate_add(Transaction, "STMTTRN");
Element_add(Transaction, { name: "TRNTYPE", required: true, order: 0, type: InvestmentTransactionType, read: Transaction.prototype.getTransactionType, write: Transaction.prototype.setTransactionType });
Element_add(Transaction, { name: "DTPOSTED", required: true, order: 10, type: Date, read: Transaction.prototype.getDatePosted, write: Transaction.prototype.setDatePosted });
Element_add(Transaction, { name: "DTUSER", order: 20, type: Date, read: Transaction.prototype.getDateInitiated, write: Transaction.prototype.setDateInitiated });
Element_add(Transaction, { name: "DTAVAIL", order: 30, type: Date, read: Transaction.prototype.getDateAvailable, write: Transaction.prototype.setDateAvailable });
Element_add(Transaction, { name: "TRNAMT", required: true, order: 40, type: Number, read: Transaction.prototype.getBigDecimalAmount, write: Transaction.prototype.setBigDecimalAmount });
Element_add(Transaction, { name: "FITID", required: true, order: 50, type: String, read: Transaction.prototype.getId, write: Transaction.prototype.setId });
Element_add(Transaction, { name: "CORRECTFITID", order: 60, type: String, read: Transaction.prototype.getCorrectionId, write: Transaction.prototype.setCorrectionId });
Element_add(Transaction, { name: "CORRECTACTION", order: 70, type: CorrectionAction, read: Transaction.prototype.getCorrectionAction, write: Transaction.prototype.setCorrectionAction });
Element_add(Transaction, { name: "SRVRTID", order: 80, type: String, read: Transaction.prototype.getTempId, write: Transaction.prototype.setTempId });
Element_add(Transaction, { name: "CHECKNUM", order: 90, type: String, read: Transaction.prototype.getCheckNumber, write: Transaction.prototype.setCheckNumber });
Element_add(Transaction, { name: "REFNUM", order: 100, type: String, read: Transaction.prototype.getReferenceNumber, write: Transaction.prototype.setReferenceNumber });
Element_add(Transaction, { name: "SIC", order: 110, type: String, read: Transaction.prototype.getStandardIndustrialCode, write: Transaction.prototype.setStandardIndustrialCode });
Element_add(Transaction, { name: "PAYEEID", order: 120, type: String, read: Transaction.prototype.getPayeeId, write: Transaction.prototype.setPayeeId });
Element_add(Transaction, { name: "NAME", order: 130, type: String, read: Transaction.prototype.getName, write: Transaction.prototype.setName });
ChildAggregate_add(Transaction, { order: 140, type: Payee, read: Transaction.prototype.getPayee, write: Transaction.prototype.setPayee });
ChildAggregate_add(Transaction, { name: "BANKACCTTO", order: 150, type: BankAccountDetails, read: Transaction.prototype.getBankAccountTo, write: Transaction.prototype.setBankAccountTo });
ChildAggregate_add(Transaction, { name: "CCACCTTO", order: 160, type: CreditCardAccountDetails, read: Transaction.prototype.getCreditCardAccountTo, write: Transaction.prototype.setCreditCardAccountTo });
Element_add(Transaction, { name: "MEMO", order: 170, type: String, read: Transaction.prototype.getMemo, write: Transaction.prototype.setMemo });
ChildAggregate_add(Transaction, { order: 180, type: Currency, read: Transaction.prototype.getCurrency, write: Transaction.prototype.setCurrency });
ChildAggregate_add(Transaction, { name: "ORIGCURRENCY", order: 190, type: Currency, read: Transaction.prototype.getOriginalCurrency, write: Transaction.prototype.setOriginalCurrency });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.util.Date;
//import java.util.List;
/**
 * @author Ryan Heaton
 */
class TransactionList {
    /**
     * The start date.
     *
     * @return The start date.
     */
    getStart() {
        return this.start;
    }
    /**
     * The start date.
     *
     * @param start The start date.
     */
    setStart(start) {
        this.start = start;
    }
    /**
     * The end date.
     *
     * @return The end date.
     */
    getEnd() {
        return this.end;
    }
    /**
     * The end date.
     *
     * @param end The end date.
     */
    setEnd(end) {
        this.end = end;
    }
    /**
     * The transaction list.
     *
     * @return The transaction list.
     */
    getTransactions() {
        return this.transactions;
    }
    /**
     * The transaction list.
     *
     * @param transactions The transaction list.
     */
    setTransactions(transactions) {
        this.transactions = transactions;
    }
}
Aggregate_add(TransactionList, "BANKTRANLIST");
Element_add(TransactionList, { name: "DTSTART", required: true, order: 0, type: Date, read: TransactionList.prototype.getStart, write: TransactionList.prototype.setStart });
Element_add(TransactionList, { name: "DTEND", required: true, order: 10, type: Date, read: TransactionList.prototype.getEnd, write: TransactionList.prototype.setEnd });
ChildAggregate_add(TransactionList, { order: 20, type: Array, collectionEntryType: Transaction, read: TransactionList.prototype.getTransactions, write: TransactionList.prototype.setTransactions });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class BalanceInfo {
    /**
     * The amount.
     *
     * @return The amount.
     */
    getAmount() {
        return this.amount;
    }
    /**
     * The amount.
     *
     * @param amount The amount.
     */
    setAmount(amount) {
        this.amount = amount;
    }
    /**
     * The as-of date.
     *
     * @return The as-of date.
     */
    getAsOfDate() {
        return this.asOfDate;
    }
    /**
     * The as-of date.
     *
     * @param asOfDate The as-of date.
     */
    setAsOfDate(asOfDate) {
        this.asOfDate = asOfDate;
    }
}
Aggregate_add(BalanceInfo);
Element_add(BalanceInfo, { name: "BALAMT", required: true, order: 0, type: Number, read: BalanceInfo.prototype.getAmount, write: BalanceInfo.prototype.setAmount });
Element_add(BalanceInfo, { name: "DTASOF", required: true, order: 10, type: Date, read: BalanceInfo.prototype.getAsOfDate, write: BalanceInfo.prototype.setAsOfDate });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.util.Locale;
/**
 * @author Ryan Heaton
 */
class StatementResponse extends ResponseMessage {
    constructor() {
        super();
        this.currencyCode = "USD"; //java.util.Currency.getInstance(Locale.US).getCurrencyCode().toUpperCase();
    }
    /**
     * The currency code.
     *
     * @return The currency code.
     * @see java.util.Currency#getCurrencyCode()
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * The currency code.
     *
     * @param currencyCode The currency code.
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
    }
    /**
     * The transaction list.
     *
     * @return The transaction list.
     */
    getTransactionList() {
        return this.transactionList;
    }
    /**
     * The transaction list.
     *
     * @param transactionList The transaction list.
     */
    setTransactionList(transactionList) {
        this.transactionList = transactionList;
    }
    /**
     * The ledger balance.
     *
     * @return The ledger balance.
     */
    getLedgerBalance() {
        return this.ledgerBalance;
    }
    /**
     * The ledger balance.
     *
     * @param ledgerBalance The ledger balance.
     */
    setLedgerBalance(ledgerBalance) {
        this.ledgerBalance = ledgerBalance;
    }
    /**
     * The available balance.
     *
     * @return The available balance.
     */
    getAvailableBalance() {
        return this.availableBalance;
    }
    /**
     * The available balance.
     *
     * @param availableBalance The available balance.
     */
    setAvailableBalance(availableBalance) {
        this.availableBalance = availableBalance;
    }
    /**
     * Marketing information. (?)
     *
     * @return Marketing information.
     */
    getMarketingInfo() {
        return this.marketingInfo;
    }
    /**
     * Marketing information. (?)
     *
     * @param marketingInfo Marketing information.
     */
    setMarketingInfo(marketingInfo) {
        this.marketingInfo = marketingInfo;
    }
}
Element_add(StatementResponse, { name: "CURDEF", required: true, order: 0, type: String, read: StatementResponse.prototype.getCurrencyCode, write: StatementResponse.prototype.setCurrencyCode });
ChildAggregate_add(StatementResponse, { order: 20, type: TransactionList, read: StatementResponse.prototype.getTransactionList, write: StatementResponse.prototype.setTransactionList });
ChildAggregate_add(StatementResponse, { name: "LEDGERBAL", order: 30, type: BalanceInfo, read: StatementResponse.prototype.getLedgerBalance, write: StatementResponse.prototype.setLedgerBalance });
ChildAggregate_add(StatementResponse, { name: "AVAILBAL", order: 40, type: BalanceInfo, read: StatementResponse.prototype.getAvailableBalance, write: StatementResponse.prototype.setAvailableBalance });
Element_add(StatementResponse, { name: "MKTGINFO", order: 50, type: String, read: StatementResponse.prototype.getMarketingInfo, write: StatementResponse.prototype.setMarketingInfo });

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @author Ryan Heaton
 */
class BankStatementResponse extends StatementResponse {
    getResponseMessageName() {
        return "bank statement";
    }
    /**
     * The account for the statement.
     *
     * @return The account for the statement.
     */
    getAccount() {
        return this.account;
    }
    /**
     * The account for the statement.
     *
     * @param account The account for the statement.
     */
    setAccount(account) {
        this.account = account;
    }
}
Aggregate_add(BankStatementResponse, "STMTRS");
ChildAggregate_add(BankStatementResponse, { name: "BANKACCTFROM", order: 10, type: BankAccountDetails, read: BankStatementResponse.prototype.getAccount, write: BankStatementResponse.prototype.setAccount });

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @author Ryan Heaton
 */
class BankStatementResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(BankStatementResponseTransaction, "STMTTRNRS");
ChildAggregate_add(BankStatementResponseTransaction, { required: true, order: 30, type: BankStatementResponse, read: BankStatementResponseTransaction.prototype.getMessage, write: BankStatementResponseTransaction.prototype.setMessage });

/*
* Copyright 2008 Web Cohesion
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @author Ryan Heaton
 */
class BankingResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.banking;
    }
    /**
     * The statement response list.
     *
     * Most OFX files have a single statement response, except MT2OFX
     * which outputs OFX with multiple statement responses
     * in a single banking response message set.
     *
     * @return The statement response list.
     */
    getStatementResponses() {
        return this.statementResponses;
    }
    /**
     * The statement response.
     *
     * @param statementResponses The statement responses.
     */
    setStatementResponses(statementResponses) {
        this.statementResponses = statementResponses;
    }
    // Inherited.
    getResponseMessages() {
        return this.statementResponses;
    }
    /**
     * The first statement response.
     *
     * @return the first bank statement response.
     * @deprecated Use getStatementResponses() because sometimes there are multiple responses
     */
    getStatementResponse() {
        return this.statementResponses == null || this.statementResponses.length == 0 ? null : this.statementResponses[0];
    }
    setStatementResponse(statementResponse) {
        this.statementResponses = [statementResponse];
    }
}
Aggregate_add(BankingResponseMessageSet, "BANKMSGSRSV1");
ChildAggregate_add(BankingResponseMessageSet, { order: 0, type: Array, collectionEntryType: BankStatementResponseTransaction, read: BankingResponseMessageSet.prototype.getStatementResponses, write: BankingResponseMessageSet.prototype.setStatementResponses });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var BalanceRecordType;
(function (BalanceRecordType) {
    BalanceRecordType[BalanceRecordType["DOLLAR"] = 0] = "DOLLAR";
    BalanceRecordType[BalanceRecordType["PERCENT"] = 1] = "PERCENT";
    BalanceRecordType[BalanceRecordType["NUMBER"] = 2] = "NUMBER";
})(BalanceRecordType || (BalanceRecordType = {}));
/**
 * @author Ryan Heaton
 * @see "Section 3.1.3, OFX Spec"
 */
class BalanceRecord {
    /**
     * Name of the balance.
     *
     * @return Name of the balance.
     */
    getName() {
        return this.name;
    }
    /**
     * Name of the balance.
     *
     * @param name Name of the balance.
     */
    setName(name) {
        this.name = name;
    }
    /**
     * Description of the balance.
     *
     * @return Description of the balance.
     */
    getDescription() {
        return this.description;
    }
    /**
     * Description of the balance.
     *
     * @param description Description of the balance.
     */
    setDescription(description) {
        this.description = description;
    }
    /**
     * Type of the balance.
     *
     * @return Type of the balance.
     */
    getType() {
        return this.type;
    }
    /**
     * Type of the balance.
     *
     * @param type Type of the balance.
     */
    setType(type) {
        this.type = type;
    }
    /**
     * The value of the balance.
     *
     * @return The value of the balance.
     */
    getValue() {
        return this.value;
    }
    /**
     * The value of the balance.
     *
     * @param value The value of the balance.
     */
    setValue(value) {
        this.value = value;
    }
    /**
     * Timestamp of the balance.
     *
     * @return Timestamp of the balance.
     */
    getTimestamp() {
        return this.timestamp;
    }
    /**
     * Timestamp of the balance.
     *
     * @param timestamp Timestamp of the balance.
     */
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }
    /**
     * Currency.
     *
     * @return Currency.
     */
    getCurrency() {
        return this.currency;
    }
    /**
     * Currency.
     *
     * @param currency Currency.
     */
    setCurrency(currency) {
        this.currency = currency;
    }
}
Aggregate_add(BalanceRecord, "BAL");
Element_add(BalanceRecord, { name: "NAME", required: true, order: 0, type: String, read: BalanceRecord.prototype.getName, write: BalanceRecord.prototype.setName });
Element_add(BalanceRecord, { name: "DESC", required: true, order: 10, type: String, read: BalanceRecord.prototype.getDescription, write: BalanceRecord.prototype.setDescription });
Element_add(BalanceRecord, { name: "BALTYPE", required: true, order: 20, type: BalanceRecordType, read: BalanceRecord.prototype.getType, write: BalanceRecord.prototype.setType });
Element_add(BalanceRecord, { name: "VALUE", required: true, order: 30, type: String, read: BalanceRecord.prototype.getValue, write: BalanceRecord.prototype.setValue });
Element_add(BalanceRecord, { name: "DTASOF", order: 40, type: Date, read: BalanceRecord.prototype.getTimestamp, write: BalanceRecord.prototype.setTimestamp });
ChildAggregate_add(BalanceRecord, { order: 50, type: Currency, read: BalanceRecord.prototype.getCurrency, write: BalanceRecord.prototype.setCurrency });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Day of week used in "PROCDAYSOFF" lists.
 *
 * @author Scott Priddy
 * @see "OFX Spec, Section 13.6.2"
 */
var ProcessorDayOff;
(function (ProcessorDayOff) {
    ProcessorDayOff[ProcessorDayOff["MONDAY"] = 0] = "MONDAY";
    ProcessorDayOff[ProcessorDayOff["TUESDAY"] = 1] = "TUESDAY";
    ProcessorDayOff[ProcessorDayOff["WEDNESDAY"] = 2] = "WEDNESDAY";
    ProcessorDayOff[ProcessorDayOff["THURSDAY"] = 3] = "THURSDAY";
    ProcessorDayOff[ProcessorDayOff["FRIDAY"] = 4] = "FRIDAY";
    ProcessorDayOff[ProcessorDayOff["SATURDAY"] = 5] = "SATURDAY";
    ProcessorDayOff[ProcessorDayOff["SUNDAY"] = 6] = "SUNDAY";
})(ProcessorDayOff || (ProcessorDayOff = {}));
function ProcessorDayOff_fromOfx(ofxVal) {
    if ("MONDAY" === ofxVal) {
        return ProcessorDayOff.MONDAY;
    }
    else if ("TUESDAY" === ofxVal) {
        return ProcessorDayOff.TUESDAY;
    }
    else if ("WEDNESDAY" === ofxVal) {
        return ProcessorDayOff.WEDNESDAY;
    }
    else if ("THURSDAY" === ofxVal) {
        return ProcessorDayOff.THURSDAY;
    }
    else if ("FRIDAY" === ofxVal) {
        return ProcessorDayOff.FRIDAY;
    }
    else if ("SATURDAY" === ofxVal) {
        return ProcessorDayOff.SATURDAY;
    }
    else if ("SUNDAY" === ofxVal) {
        return ProcessorDayOff.SUNDAY;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class T1099Request extends RequestMessage {
}
Aggregate_add(T1099Request, "STMTRQ");

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.util.Locale;
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class T1099Response extends ResponseMessage {
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
var TransactionType;
(function (TransactionType) {
    /**
     * generic credit.
     */
    TransactionType[TransactionType["CREDIT"] = 0] = "CREDIT";
    /**
     * genertic debit.
     */
    TransactionType[TransactionType["DEBIT"] = 1] = "DEBIT";
    /**
     * interest earned.
     */
    TransactionType[TransactionType["INT"] = 2] = "INT";
    /**
     * dividend.
     */
    TransactionType[TransactionType["DIV"] = 3] = "DIV";
    /**
     * bank fee.
     */
    TransactionType[TransactionType["FEE"] = 4] = "FEE";
    /**
     * service charge.
     */
    TransactionType[TransactionType["SRVCHG"] = 5] = "SRVCHG";
    /**
     * deposit.
     */
    TransactionType[TransactionType["DEP"] = 6] = "DEP";
    /**
     * ATM transaction.
     */
    TransactionType[TransactionType["ATM"] = 7] = "ATM";
    /**
     * point of sale
     */
    TransactionType[TransactionType["POS"] = 8] = "POS";
    /**
     * transfer
     */
    TransactionType[TransactionType["XFER"] = 9] = "XFER";
    /**
     * check
     */
    TransactionType[TransactionType["CHECK"] = 10] = "CHECK";
    /**
     * electronic payment
     */
    TransactionType[TransactionType["PAYMENT"] = 11] = "PAYMENT";
    /**
     * cash.
     */
    TransactionType[TransactionType["CASH"] = 12] = "CASH";
    /**
     * direct deposit.
     */
    TransactionType[TransactionType["DIRECTDEP"] = 13] = "DIRECTDEP";
    /**
     * merchant-initiated debit
     */
    TransactionType[TransactionType["DIRECTDEBIT"] = 14] = "DIRECTDEBIT";
    /**
     * repeating payment.
     */
    TransactionType[TransactionType["REPEATPMT"] = 15] = "REPEATPMT";
    /**
     * other
     */
    TransactionType[TransactionType["OTHER"] = 16] = "OTHER";
})(TransactionType || (TransactionType = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class TransferInfo {
    /**
     * The bank account to transfer from.
     *
     * @return The bank account to transfer from.
     */
    getBankAccountFrom() {
        return this.bankAccountFrom;
    }
    /**
     * The bank account to transfer from.
     *
     * @param bankAccountFrom The bank account to transfer from.
     */
    setBankAccountFrom(bankAccountFrom) {
        this.creditCardAccountFrom = null;
        this.bankAccountFrom = bankAccountFrom;
    }
    /**
     * The account to transfer from.
     *
     * @param acct The account to transfer from.
     */
    setAccountFrom(acct) {
        if (acct instanceof BankAccountDetails) {
            this.setBankAccountFrom(acct);
        }
        else {
            this.setCreditCardAccountFrom(acct);
        }
    }
    /**
     * The credit card to transfer from.
     *
     * @return The credit card to transfer from.
     */
    getCreditCardAccountFrom() {
        return this.creditCardAccountFrom;
    }
    /**
     * The credit card to transfer from.
     *
     * @param creditCardAccountFrom The credit card to transfer from.
     */
    setCreditCardAccountFrom(creditCardAccountFrom) {
        this.bankAccountFrom = null;
        this.creditCardAccountFrom = creditCardAccountFrom;
    }
    /**
     * The bank account to transfer to.
     *
     * @return The bank account to transfer to.
     */
    getBankAccountTo() {
        return this.bankAccountTo;
    }
    /**
     * The bank account to transfer to.
     *
     * @param bankAccountTo The bank account to transfer to.
     */
    setBankAccountTo(bankAccountTo) {
        this.creditCardAccountTo = null;
        this.bankAccountTo = bankAccountTo;
    }
    /**
     * The bank or credit card account to transfer to.
     *
     * @param accountTo The account to transfer to.
     */
    setAccountTo(accountTo) {
        if (accountTo instanceof BankAccountDetails)
            this.setBankAccountTo(accountTo);
        else if (accountTo instanceof CreditCardAccountDetails)
            this.setCreditCardAccountTo(accountTo);
        else
            throw new OFXException("invalid type");
    }
    /**
     * The credit card account to transfer to.
     *
     * @return The credit card account to transfer to.
     */
    getCreditCardAccountTo() {
        return this.creditCardAccountTo;
    }
    /**
     * The credit card account to transfer to.
     *
     * @param creditCardAccountTo The credit card account to transfer to.
     */
    setCreditCardAccountTo(creditCardAccountTo) {
        this.bankAccountTo = null;
        this.creditCardAccountTo = creditCardAccountTo;
    }
    /**
     * The amount.
     *
     * @return The amount.
     */
    getAmount() {
        return this.amount;
    }
    /**
     * The amount.
     *
     * @param amount The amount.
     */
    setAmount(amount) {
        this.amount = amount;
    }
    /**
     * The due date.
     *
     * @return The due date.
     */
    getDue() {
        return this.due;
    }
    /**
     * The due date.
     *
     * @param due The due date.
     */
    setDue(due) {
        this.due = due;
    }
}
Aggregate_add(TransferInfo, "XFERINFO");
ChildAggregate_add(TransferInfo, { name: "BANKACCTFROM", order: 0, type: BankAccountDetails, read: TransferInfo.prototype.getBankAccountFrom, write: TransferInfo.prototype.setBankAccountFrom });
ChildAggregate_add(TransferInfo, { name: "CCACCTFROM", order: 10, type: CreditCardAccountDetails, read: TransferInfo.prototype.getCreditCardAccountFrom, write: TransferInfo.prototype.setCreditCardAccountFrom });
ChildAggregate_add(TransferInfo, { name: "BANKACCTTO", order: 20, type: BankAccountDetails, read: TransferInfo.prototype.getBankAccountTo, write: TransferInfo.prototype.setBankAccountTo });
ChildAggregate_add(TransferInfo, { name: "CCACCTTO", order: 30, type: CreditCardAccountDetails, read: TransferInfo.prototype.getCreditCardAccountTo, write: TransferInfo.prototype.setCreditCardAccountTo });
Element_add(TransferInfo, { name: "TRNAMT", required: true, order: 40, type: Number, read: TransferInfo.prototype.getAmount, write: TransferInfo.prototype.setAmount });
Element_add(TransferInfo, { name: "DTDUE", order: 50, type: Date, read: TransferInfo.prototype.getDue, write: TransferInfo.prototype.setDue });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
var TransferStatusEvent;
(function (TransferStatusEvent) {
    TransferStatusEvent[TransferStatusEvent["WILLPROCESSON"] = 0] = "WILLPROCESSON";
    TransferStatusEvent[TransferStatusEvent["POSTEDON"] = 1] = "POSTEDON";
    TransferStatusEvent[TransferStatusEvent["NOFUNDSON"] = 2] = "NOFUNDSON";
    TransferStatusEvent[TransferStatusEvent["CANCELEDON"] = 3] = "CANCELEDON";
    TransferStatusEvent[TransferStatusEvent["FAILEDON"] = 4] = "FAILEDON";
})(TransferStatusEvent || (TransferStatusEvent = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class TransferStatus {
    /**
     * The event.
     *
     * @return The event.
     */
    getEvent() {
        return this.event;
    }
    /**
     * The event.
     *
     * @param event The event.
     */
    setEvent(event) {
        this.event = event;
    }
    /**
     * The date of the event.
     *
     * @return The date of the event.
     */
    getDate() {
        return this.date;
    }
    /**
     * The date of the event.
     *
     * @param date The date of the event.
     */
    setDate(date) {
        this.date = date;
    }
}
Aggregate_add(TransferStatus, "XFERPRCSTS");
Element_add(TransferStatus, { name: "XFERPRCCODE", required: true, order: 0, type: TransferStatusEvent, read: TransferStatus.prototype.getEvent, write: TransferStatus.prototype.setEvent });
Element_add(TransferStatus, { name: "DTXFERPRC", required: true, order: 10, type: Date, read: TransferStatus.prototype.getDate, write: TransferStatus.prototype.setDate });

/**
 * @author Ryan Heaton
 */
class CreditCardAccountInfo {
    /**
     * The credit card account this information is referencing.
     *
     * @return The credit card account this information is referencing.
     */
    getCreditCardAccount() {
        return this.creditCardAccount;
    }
    /**
     * The credit card account this information is referencing.
     *
     * @param creditCardAccount The credit card account this information is referencing.
     */
    setCreditCardAccount(creditCardAccount) {
        this.creditCardAccount = creditCardAccount;
    }
    // Inherited.
    getAccountDetails() {
        return this.getCreditCardAccount();
    }
    /**
     * Whether this account supports download of transaction details.
     *
     * @return Whether this account supports download of transaction details.
     */
    getSupportsTransactionDetailOperations() {
        return this.supportsTransactionDetailOperations;
    }
    /**
     * Whether this account supports download of transaction details.
     *
     * @param supportsTransactionDetailOperations Whether this account supports download of transaction details.
     */
    setSupportsTransactionDetailOperations(supportsTransactionDetailOperations) {
        this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
    }
    /**
     * Whether this account supports transfer operations to other accounts.
     *
     * @return Whether this account supports transfer operations to other accounts.
     */
    getSupportsTransferToOtherAccountOperations() {
        return this.supportsTransferToOtherAccountOperations;
    }
    /**
     * Whether this account supports transfer operations to other accounts.
     *
     * @param supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
     */
    setSupportsTransferToOtherAccountOperations(supportsTransferToOtherAccountOperations) {
        this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
    }
    /**
     * Whether this account supports transfer operations from other accounts.
     *
     * @return Whether this account supports transfer operations from other accounts.
     */
    getSupportsTransferFromOtherAccountOperations() {
        return this.supportsTransferFromOtherAccountOperations;
    }
    /**
     * Whether this account supports transfer operations from other accounts.
     *
     * @param supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
     */
    setSupportsTransferFromOtherAccountOperations(supportsTransferFromOtherAccountOperations) {
        this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
    }
    /**
     * The account status.
     *
     * @return The account status.
     */
    getStatus() {
        return this.status;
    }
    /**
     * The account status.
     *
     * @param status The account status.
     */
    setStatus(status) {
        this.status = status;
    }
}
Aggregate_add(CreditCardAccountInfo, "CCACCTINFO");
ChildAggregate_add(CreditCardAccountInfo, { name: "CCACCTFROM", required: true, order: 0, type: CreditCardAccountDetails, read: CreditCardAccountInfo.prototype.getCreditCardAccount, write: CreditCardAccountInfo.prototype.setCreditCardAccount });
Element_add(CreditCardAccountInfo, { name: "SUPTXDL", required: true, order: 10, type: Boolean, read: CreditCardAccountInfo.prototype.getSupportsTransactionDetailOperations, write: CreditCardAccountInfo.prototype.setSupportsTransactionDetailOperations });
Element_add(CreditCardAccountInfo, { name: "XFERSRC", required: true, order: 20, type: Boolean, read: CreditCardAccountInfo.prototype.getSupportsTransferToOtherAccountOperations, write: CreditCardAccountInfo.prototype.setSupportsTransferToOtherAccountOperations });
Element_add(CreditCardAccountInfo, { name: "XFERDEST", required: true, order: 30, type: Boolean, read: CreditCardAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations, write: CreditCardAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations });
Element_add(CreditCardAccountInfo, { name: "SVCSTATUS", required: true, order: 40, type: AccountStatus, read: CreditCardAccountInfo.prototype.getStatus, write: CreditCardAccountInfo.prototype.setStatus });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardStatementResponse extends StatementResponse {
    getResponseMessageName() {
        return "credit card statement";
    }
    /**
     * The account for the statement.
     *
     * @return The account for the statement.
     */
    getAccount() {
        return this.account;
    }
    /**
     * The account for the statement.
     *
     * @param account The account for the statement.
     */
    setAccount(account) {
        this.account = account;
    }
}
Aggregate_add(CreditCardStatementResponse, "CCSTMTRS");
ChildAggregate_add(CreditCardStatementResponse, { name: "CCACCTFROM", order: 10, type: CreditCardAccountDetails, read: CreditCardStatementResponse.prototype.getAccount, write: CreditCardStatementResponse.prototype.setAccount });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardStatementResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(CreditCardStatementResponseTransaction, "CCSTMTTRNRS");
ChildAggregate_add(CreditCardStatementResponseTransaction, { required: true, order: 30, type: CreditCardStatementResponse, read: CreditCardStatementResponseTransaction.prototype.getMessage, write: CreditCardStatementResponseTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.creditcard;
    }
    /**
     * The statement response list.
     *
     * Most OFX files have a single statement response, except MT2OFX
     * which outputs OFX with multiple statement responses
     * in a single banking response message set.
     *
     * @return The statement response list.
     */
    getStatementResponses() {
        return this.statementResponses;
    }
    /**
     * The statement reponse list.
     *
     * @param statementResponses The statement response list.
     */
    setStatementResponses(statementResponses) {
        this.statementResponses = statementResponses;
    }
    /**
     * The first statement response.
     *
     * @return the first bank statement response.
     * @deprecated Use getStatementResponses() because sometimes there are multiple responses
     */
    getStatementResponse() {
        return this.statementResponses == null || this.statementResponses.length == 0 ? null : this.statementResponses[0];
    }
    /**
     * The statement response.
     *
     * @param statementResponse The statement response.
     */
    setStatementResponse(statementResponse) {
        this.statementResponses = [statementResponse];
    }
    // Inherited.
    getResponseMessages() {
        return this.statementResponses;
    }
}
Aggregate_add(CreditCardResponseMessageSet, "CREDITCARDMSGSRSV1");
ChildAggregate_add(CreditCardResponseMessageSet, { order: 0, type: Array, collectionEntryType: CreditCardStatementResponseTransaction, read: CreditCardResponseMessageSet.prototype.getStatementResponses, write: CreditCardResponseMessageSet.prototype.setStatementResponses });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of investment account.
 *
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.2"
 */
var InvestmentAccountType;
(function (InvestmentAccountType) {
    InvestmentAccountType[InvestmentAccountType["INDIVIDUAL"] = 0] = "INDIVIDUAL";
    InvestmentAccountType[InvestmentAccountType["JOINT"] = 1] = "JOINT";
    InvestmentAccountType[InvestmentAccountType["TRUST"] = 2] = "TRUST";
    InvestmentAccountType[InvestmentAccountType["CORPORATE"] = 3] = "CORPORATE";
})(InvestmentAccountType || (InvestmentAccountType = {}));
function InvestmentAccountType_fromOfx(ofxVal) {
    if ("INDIVIDUAL" === ofxVal) {
        return InvestmentAccountType.INDIVIDUAL;
    }
    else if ("JOINT" === ofxVal) {
        return InvestmentAccountType.JOINT;
    }
    else if ("CORPORATE" === ofxVal) {
        return InvestmentAccountType.CORPORATE;
    }
    else if ("CORPORATE" === ofxVal) {
        return InvestmentAccountType.CORPORATE;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Activation status of an account.
 * @see "Section 13.6.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var ActivationStatus;
(function (ActivationStatus) {
    ActivationStatus[ActivationStatus["ACTIVE"] = 0] = "ACTIVE";
    ActivationStatus[ActivationStatus["PENDING"] = 1] = "PENDING";
    ActivationStatus[ActivationStatus["AVAILABLE"] = 2] = "AVAILABLE";
})(ActivationStatus || (ActivationStatus = {}));
function ActivationStatus_fromOfx(ofxVal) {
    if ("ACTIVE" === ofxVal) {
        return ActivationStatus.ACTIVE;
    }
    else if ("PEND" === ofxVal) {
        return ActivationStatus.PENDING;
    }
    else if ("AVAIL" === ofxVal) {
        return ActivationStatus.AVAILABLE;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.util.HashMap;
//import java.util.Map;
/**
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.2.1"
 */
var UnitedStatesAccountType;
(function (UnitedStatesAccountType) {
    /** A 401(k) retirement account */
    UnitedStatesAccountType[UnitedStatesAccountType["R401K"] = 0] = "R401K";
    /** A 403(B) retirement account */
    UnitedStatesAccountType[UnitedStatesAccountType["R403B"] = 1] = "R403B";
    /** An IRA retirement account */
    UnitedStatesAccountType[UnitedStatesAccountType["IRA"] = 2] = "IRA";
    /** Keough (money purchase/profit sharing) account */
    UnitedStatesAccountType[UnitedStatesAccountType["KEOUGH"] = 3] = "KEOUGH";
    /** Other account type */
    UnitedStatesAccountType[UnitedStatesAccountType["OTHER"] = 4] = "OTHER";
    /** Salary Reduction Employer Pension Plan */
    UnitedStatesAccountType[UnitedStatesAccountType["SARSEP"] = 5] = "SARSEP";
    /** Savings Incentive Match Plan for Employees*/
    UnitedStatesAccountType[UnitedStatesAccountType["SIMPLE"] = 6] = "SIMPLE";
    /** Regular investment account */
    UnitedStatesAccountType[UnitedStatesAccountType["NORMAL"] = 7] = "NORMAL";
    /** Tax Deferred Annuity */
    UnitedStatesAccountType[UnitedStatesAccountType["TDA"] = 8] = "TDA";
    /** Trust (including UTMA) */
    UnitedStatesAccountType[UnitedStatesAccountType["TRUST"] = 9] = "TRUST";
    /** Custodial account */
    UnitedStatesAccountType[UnitedStatesAccountType["UGMA"] = 10] = "UGMA";
})(UnitedStatesAccountType || (UnitedStatesAccountType = {}));
var ofxMapping = {
    "401K": UnitedStatesAccountType.R401K,
    "403B": UnitedStatesAccountType.R403B,
    "IRA": UnitedStatesAccountType.IRA,
    "KEOUGH": UnitedStatesAccountType.KEOUGH,
    "OTHER": UnitedStatesAccountType.OTHER,
    "SARSEP": UnitedStatesAccountType.SARSEP,
    "SIMPLE": UnitedStatesAccountType.SIMPLE,
    "NORMAL": UnitedStatesAccountType.NORMAL,
    "TDA": UnitedStatesAccountType.TDA,
    "TRUST": UnitedStatesAccountType.TRUST,
    "UGMA": UnitedStatesAccountType.UGMA,
};
function UnitedStatesAccountType_fromOfx(ofxVal) {
    return ofxVal == null ? null : ofxMapping[ofxVal];
}

/**
 * Aggregate for the info about a brokerage account.
 *
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.2"
 */
class InvestmentAccountInfo {
    /**
     * Gets the investment account this information is referencing.
     *
     * @return the investment account this information is referencing
     */
    getInvestmentAccount() {
        return this.investmentAccount;
    }
    /**
     * Sets the investment account this information is referencing. This is a required field
     * according to the OFX spec.
     *
     * @param investmentAccount the investment account this information is referencing
     */
    setInvestmentAccount(investmentAccount) {
        this.investmentAccount = investmentAccount;
    }
    // Inherited.
    getAccountDetails() {
        return this.getInvestmentAccount();
    }
    /**
     * Gets the United States account type. This is a required field according to the OFX spec.
     * @see "OFX Spec, Section 13.6.1"
     *
     * @return the United States account type
     */
    getUnitedStatesAccountType() {
        return this.unitedStatesAccountType;
    }
    /**
     * Sets United States account type. This is a required field according to the OFX spec.
     * @see "OFX Spec, Section 13.6.1"
     *
     * @param unitedStatesAccountType the United States account type
     */
    setUnitedStatesAccountType(unitedStatesAccountType) {
        this.unitedStatesAccountType = unitedStatesAccountType;
    }
    /**
     * Gets the United States account type as one of the well-known types.
     *
     * @return the account type or null if it's not one of the well-known types
     */
    getUnitedStatesAccountTypeEnum() {
        return UnitedStatesAccountType_fromOfx(this.unitedStatesAccountType);
    }
    /**
     * Gets whether the account supports checking. This is a required field according to the OFX spec.
     * @see "OFX Spec, Section 13.6.1"
     *
     * @return whether the account supports checking
     */
    getSupportsChecking() {
        return this.supportsChecking;
    }
    /**
     * Sets whether the account supports checking. This is a required field according to the OFX spec.
     * @see "OFX Spec, Section 13.6.1"
     *
     * @param supportsChecking whether the account supports checking
     */
    setSupportsChecking(supportsChecking) {
        this.supportsChecking = supportsChecking;
    }
    /**
     * Gets the activation status for investment statement download. This is a required field
     * according to the OFX spec.
     *
     * @return the activation status
     */
    getActivationStatus() {
        return this.activationStatus;
    }
    /**
     * Sets the activation status for investment statement download. This is a required field
     * according to the OFX spec.
     *
     * @param activationStatus the activation status
     */
    setActivationStatus(activationStatus) {
        this.activationStatus = activationStatus;
    }
    /**
     * Gets the activation status as one of the well-known types.
     *
     * @return the activation status or null if it wasn't one of the well known types
     */
    getActivationStatusEnum() {
        return ActivationStatus_fromOfx(this.getActivationStatus());
    }
    /**
     * Gets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
     * This is an optional field according to the OFX spec.
     *
     * @return the type of account
     */
    getInvestmentAccountType() {
        return this.investmentAccountType;
    }
    /**
     * Sets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
     * This is an optional field according to the OFX spec.
     *
     * @param investmentAccountType the type of account
     */
    setInvestmentAccountType(investmentAccountType) {
        this.investmentAccountType = investmentAccountType;
    }
    /**
     * Gets the type of investment account as one of the well-known types.
     *
     * @return the type of investment account or null if it's not one of the well-known types
     */
    getInvestmentAccountTypeEnum() {
        return InvestmentAccountType_fromOfx(this.getInvestmentAccountType());
    }
    /**
     * Gets the description of option trading privileges. * This is an optional field according to
     * the OFX spec.
     *
     * @return the description of option trading privileges.
     */
    getOptionLevel() {
        return this.optionLevel;
    }
    /**
     * Sets the description of option trading privileges. * This is an optional field according to
     * the OFX spec.
     *
     * @param optionLevel the description of option trading privileges.
     */
    setOptionLevel(optionLevel) {
        this.optionLevel = optionLevel;
    }
}
Aggregate_add(InvestmentAccountInfo, "INVACCTINFO");
ChildAggregate_add(InvestmentAccountInfo, { name: "INVACCTFROM", required: true, order: 0, type: InvestmentAccountDetails, read: InvestmentAccountInfo.prototype.getInvestmentAccount, write: InvestmentAccountInfo.prototype.setInvestmentAccount });
Element_add(InvestmentAccountInfo, { name: "USPRODUCTTYPE", required: true, order: 10, type: String, read: InvestmentAccountInfo.prototype.getUnitedStatesAccountType, write: InvestmentAccountInfo.prototype.setUnitedStatesAccountType });
Element_add(InvestmentAccountInfo, { name: "CHECKING", required: true, order: 20, type: Boolean, read: InvestmentAccountInfo.prototype.getSupportsChecking, write: InvestmentAccountInfo.prototype.setSupportsChecking });
Element_add(InvestmentAccountInfo, { name: "SVCSTATUS", required: true, order: 30, type: String, read: InvestmentAccountInfo.prototype.getActivationStatus, write: InvestmentAccountInfo.prototype.setActivationStatus });
Element_add(InvestmentAccountInfo, { name: "INVACCTTYPE", order: 40, type: String, read: InvestmentAccountInfo.prototype.getInvestmentAccountType, write: InvestmentAccountInfo.prototype.setInvestmentAccountType });
Element_add(InvestmentAccountInfo, { name: "OPTIONLEVEL", order: 50, type: String, read: InvestmentAccountInfo.prototype.getOptionLevel, write: InvestmentAccountInfo.prototype.setOptionLevel });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Types of well-known sub-accounts.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var SubAccountType;
(function (SubAccountType) {
    SubAccountType[SubAccountType["CASH"] = 0] = "CASH";
    SubAccountType[SubAccountType["MARGIN"] = 1] = "MARGIN";
    SubAccountType[SubAccountType["SHORT"] = 2] = "SHORT";
    SubAccountType[SubAccountType["OTHER"] = 3] = "OTHER";
})(SubAccountType || (SubAccountType = {}));
function SubAccountType_fromOfx(ofxVal) {
    if ("CASH" === ofxVal) {
        return SubAccountType.CASH;
    }
    else if ("MARGIN" === ofxVal) {
        return SubAccountType.MARGIN;
    }
    else if ("SHORT" === ofxVal) {
        return SubAccountType.SHORT;
    }
    else if ("OTHER" === ofxVal) {
        return SubAccountType.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of position.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var PositionType;
(function (PositionType) {
    PositionType[PositionType["LONG"] = 0] = "LONG";
    PositionType[PositionType["SHORT"] = 1] = "SHORT";
})(PositionType || (PositionType = {}));
function PositionType_fromOfx(ofxVal) {
    if ("LONG" === ofxVal) {
        return PositionType.LONG;
    }
    else if ("SHORT" === ofxVal) {
        return PositionType.SHORT;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Types of 401(k) sources.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var Inv401KSource;
(function (Inv401KSource) {
    Inv401KSource[Inv401KSource["PRETAX"] = 0] = "PRETAX";
    Inv401KSource[Inv401KSource["AFTER_TAX"] = 1] = "AFTER_TAX";
    Inv401KSource[Inv401KSource["MATCH"] = 2] = "MATCH";
    Inv401KSource[Inv401KSource["PROFIT_SHARING"] = 3] = "PROFIT_SHARING";
    Inv401KSource[Inv401KSource["ROLLOVER"] = 4] = "ROLLOVER";
    Inv401KSource[Inv401KSource["OTHER_VEST"] = 5] = "OTHER_VEST";
    Inv401KSource[Inv401KSource["OTHER_NONVEST"] = 6] = "OTHER_NONVEST";
})(Inv401KSource || (Inv401KSource = {}));
var ofxMapping$1 = {
    "PRETAX": Inv401KSource.PRETAX,
    "AFTERTAX": Inv401KSource.AFTER_TAX,
    "MATCH": Inv401KSource.MATCH,
    "PROFITSHARING": Inv401KSource.PROFIT_SHARING,
    "ROLLOVER": Inv401KSource.ROLLOVER,
    "OTHERVEST": Inv401KSource.OTHER_VEST,
    "OTHERNONVEST": Inv401KSource.OTHER_NONVEST,
};
function Inv401KSource_fromOfx(ofxVal) {
    return ofxVal == null ? null : ofxMapping$1[ofxVal];
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Class for the investment position aggregate.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentPosition {
    /**
     * Gets the security id for the position. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the security id for the position
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the security id for the position. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param securityId the security id for the position
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the sub-account type
     */
    getHeldInAccount() {
        return this.heldInAccount;
    }
    /**
     * Sets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param heldInAccount the sub-account type
     */
    setHeldInAccount(heldInAccount) {
        this.heldInAccount = heldInAccount;
    }
    /**
     * Gets the sub-account type as one of the well-known types.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the sub-account type or null if it's not one of the well-known types
     */
    getHeldInAccountEnum() {
        return SubAccountType_fromOfx(this.getHeldInAccount());
    }
    /**
     * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the position type
     */
    getPositionType() {
        return this.positionType;
    }
    /**
     * Sets the position type. One of SHORT or LONG. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param positionType the position type
     */
    setPositionType(positionType) {
        this.positionType = positionType;
    }
    /**
     * Gets the position type as one of the well-known types.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the position type or null if it's not one of the well-known types
     */
    getPositionTypeEnum() {
        return PositionType_fromOfx(this.getPositionType());
    }
    /**
     * Gets the number of units in the position. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the number of units in the position
     */
    getUnits() {
        return this.units;
    }
    /**
     * Sets the number of units in the position. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param units the number of units in the position
     */
    setUnits(units) {
        this.units = units;
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.unitPrice;
    }
    /**
     * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param unitPrice the per unit price
     */
    setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * Gets the market value of this position. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the market value of the position
     */
    getMarketValue() {
        return this.marketValue;
    }
    /**
     * Sets the market value of this position. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param marketValue the market value of the position
     */
    setMarketValue(marketValue) {
        this.marketValue = marketValue;
    }
    /**
     * Gets the date and time of the unit price and market value. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the market value date
     */
    getMarketValueDate() {
        return this.marketValueDate;
    }
    /**
     * Sets the date and time of the unit price and market value. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param marketValueDate the market value date
     */
    setMarketValueDate(marketValueDate) {
        this.marketValueDate = marketValueDate;
    }
    /**
     * Gets the currency code of the position. This is an optional field according to the OFX spec.
     * If not present, it's the default currency of the account.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the currency code of the position or null for the default currency
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the currency code of the position. This is an optional field according to the OFX spec.
     * If not present, it's the default currency of the account.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param currencyCode the currency code of the position or null for the default currency
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
    }
    /**
     * Gets the memo associated with the position. This is an optional field according to the OFX
     * spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the memo
     */
    getMemo() {
        return this.memo;
    }
    /**
     * Sets the memo associated with the position. This is an optional field according to the OFX
     * spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @param memo the memo
     */
    setMemo(memo) {
        this.memo = memo;
    }
    /**
     * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the 401k source
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the 401k source
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401k source as one of the well-known types.
     *
     * @return the 401k source or null if it's not one of the well-known types
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(InvestmentPosition, "INVPOS");
ChildAggregate_add(InvestmentPosition, { required: true, order: 10, type: SecurityId, read: InvestmentPosition.prototype.getSecurityId, write: InvestmentPosition.prototype.setSecurityId });
Element_add(InvestmentPosition, { name: "HELDINACCT", required: true, order: 20, type: String, read: InvestmentPosition.prototype.getHeldInAccount, write: InvestmentPosition.prototype.setHeldInAccount });
Element_add(InvestmentPosition, { name: "POSTYPE", required: true, order: 30, type: String, read: InvestmentPosition.prototype.getPositionType, write: InvestmentPosition.prototype.setPositionType });
Element_add(InvestmentPosition, { name: "UNITS", required: true, order: 40, type: Number, read: InvestmentPosition.prototype.getUnits, write: InvestmentPosition.prototype.setUnits });
Element_add(InvestmentPosition, { name: "UNITPRICE", required: true, order: 50, type: Number, read: InvestmentPosition.prototype.getUnitPrice, write: InvestmentPosition.prototype.setUnitPrice });
Element_add(InvestmentPosition, { name: "MKTVAL", required: true, order: 60, type: Number, read: InvestmentPosition.prototype.getMarketValue, write: InvestmentPosition.prototype.setMarketValue });
Element_add(InvestmentPosition, { name: "DTPRICEASOF", required: true, order: 70, type: Date, read: InvestmentPosition.prototype.getMarketValueDate, write: InvestmentPosition.prototype.setMarketValueDate });
Element_add(InvestmentPosition, { name: "CURRENCY", order: 80, type: String, read: InvestmentPosition.prototype.getCurrencyCode, write: InvestmentPosition.prototype.setCurrencyCode });
Element_add(InvestmentPosition, { name: "MEMO", order: 90, type: String, read: InvestmentPosition.prototype.getMemo, write: InvestmentPosition.prototype.setMemo });
Element_add(InvestmentPosition, { name: "INV401KSOURCE", order: 100, type: String, read: InvestmentPosition.prototype.get401kSource, write: InvestmentPosition.prototype.set401kSource });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base class for the various types of positions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all positions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
class BasePosition {
    /**
     * Gets the investment position child aggregate.
     *
     * @return the investment position child aggregate
     */
    getInvestmentPosition() {
        return this.investmentPosition;
    }
    /**
     * Sets the investment position child aggregate.
     *
     * @param investmentPosition the investment position child aggregate
     */
    setInvestmentPosition(investmentPosition) {
        this.investmentPosition = investmentPosition;
    }
    /**
     * Gets the security id for the position. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the security id for the position
     */
    getSecurityId() {
        return this.getInvestmentPosition().getSecurityId();
    }
    /**
     * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the sub-account type
     */
    getHeldInAccount() {
        return this.getInvestmentPosition().getHeldInAccount();
    }
    /**
     * Gets the sub-account type as one of the well-known types.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the sub-account type or null if it's not one of the well-known types
     */
    getHeldInAccountEnum() {
        return SubAccountType_fromOfx(this.getHeldInAccount());
    }
    /**
     * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the position type
     */
    getPositionType() {
        return this.getInvestmentPosition().getPositionType();
    }
    /**
     * Gets the position type as one of the well-known types.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the position type or null if it's not one of the well-known types
     */
    getPositionTypeEnum() {
        return PositionType_fromOfx(this.getPositionType());
    }
    /**
     * Gets the number of units in the position. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the number of units in the position
     */
    getUnits() {
        return this.getInvestmentPosition().getUnits();
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.getInvestmentPosition().getUnitPrice();
    }
    /**
     * Gets the market value of this position. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the market value of the position
     */
    getMarketValue() {
        return this.getInvestmentPosition().getMarketValue();
    }
    /**
     * Gets the date and time of the unit price and market value. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the market value date
     */
    getMarketValueDate() {
        return this.getInvestmentPosition().getMarketValueDate();
    }
    /**
     * Gets the currency code of the position. This is an optional field according to the OFX spec.
     * If not present, it's the default currency of the account.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the currency code of the position or null for the default currency
     */
    getCurrencyCode() {
        return this.getInvestmentPosition().getCurrencyCode();
    }
    /**
     * Gets the memo associated with the position. This is an optional field according to the OFX
     * spec.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @return the memo
     */
    getMemo() {
        return this.getInvestmentPosition().getMemo();
    }
    /**
     * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the 401k source
     */
    get401kSource() {
        return this.getInvestmentPosition().get401kSource();
    }
    /**
     * Gets the 401k source as one of the well-known types.
     *
     * @return the 401k source or null if it's not one of the well-known types
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
ChildAggregate_add(BasePosition, { required: true, order: 10, type: InvestmentPosition, read: BasePosition.prototype.getInvestmentPosition, write: BasePosition.prototype.setInvestmentPosition });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a debt position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class DebtPosition extends BasePosition {
}
Aggregate_add(DebtPosition, "POSDEBT");

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggregate for a list of invesment positions.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentPositionList {
    /**
     * Gets the list of positions
     *
     * @return the list of positions
     */
    getPositions() {
        return this.positions;
    }
    /**
     * Sets the list of positions.
     *
     * @param positions the list of positions
     */
    setPositions(positions) {
        this.positions = positions;
    }
}
Aggregate_add(InvestmentPositionList, "INVPOSLIST");
ChildAggregate_add(InvestmentPositionList, { order: 10, type: Array, collectionEntryType: BasePosition, read: InvestmentPositionList.prototype.getPositions, write: InvestmentPositionList.prototype.setPositions });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a mutual fund position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class MutualFundPosition extends BasePosition {
    /**
     * Gets the number of units in the financial insititution's street name.
     *
     * @return the number of units in the financial insititution's street name.
     */
    getUnitsStreet() {
        return this.unitsStreet;
    }
    /**
     * Sets the number of units in the financial insititution's street name.
     *
     * @param unitsStreet the number of units in the financial insititution's street name.
     */
    setUnitsStreet(unitsStreet) {
        this.unitsStreet = unitsStreet;
    }
    /**
     * Gets the number of units in the user's name.
     *
     * @return the number of units in the user's name.
     */
    getUnitsUser() {
        return this.unitsUser;
    }
    /**
     * Sets the number of units in the user's name.
     *
     * @param unitsUser the number of units in the user's name.
     */
    setUnitsUser(unitsUser) {
        this.unitsUser = unitsUser;
    }
    /**
     * Gets whether dividends are automatically reinvested.
     *
     * @return whether dividends are automatically reinvested
     */
    getReinvestDividends() {
        return this.reinvestDividends;
    }
    /**
     * Sets whether dividends are automatically reinvested.
     *
     * @param reinvestDividends whether dividends are automatically reinvested
     */
    setReinvestDividends(reinvestDividends) {
        this.reinvestDividends = reinvestDividends;
    }
    /**
     * Gets whether capital gains are automatically reinvested.
     *
     * @return whether capital gains are automatically reinvested
     */
    getReinvestCapitalGains() {
        return this.reinvestCapitalGains;
    }
    /**
     * Sets whether capital gains are automatically reinvested.
     *
     * @param reinvestCapitalGains whether capital gains are automatically reinvested
     */
    setReinvestCapitalGains(reinvestCapitalGains) {
        this.reinvestCapitalGains = reinvestCapitalGains;
    }
}
Aggregate_add(MutualFundPosition, "POSMF");
Element_add(MutualFundPosition, { name: "UNITSSTREET", order: 20, type: Number, read: MutualFundPosition.prototype.getUnitsStreet, write: MutualFundPosition.prototype.setUnitsStreet });
Element_add(MutualFundPosition, { name: "UNITSUSER", order: 30, type: Number, read: MutualFundPosition.prototype.getUnitsUser, write: MutualFundPosition.prototype.setUnitsUser });
Element_add(MutualFundPosition, { name: "REINVDIV", order: 50, type: Boolean, read: MutualFundPosition.prototype.getReinvestDividends, write: MutualFundPosition.prototype.setReinvestDividends });
Element_add(MutualFundPosition, { name: "REINVCG", order: 60, type: Boolean, read: MutualFundPosition.prototype.getReinvestCapitalGains, write: MutualFundPosition.prototype.setReinvestCapitalGains });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * How a short option is secured.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var ShortOptionSecurity;
(function (ShortOptionSecurity) {
    ShortOptionSecurity[ShortOptionSecurity["NAKED"] = 0] = "NAKED";
    ShortOptionSecurity[ShortOptionSecurity["COVERED"] = 1] = "COVERED";
})(ShortOptionSecurity || (ShortOptionSecurity = {}));
function ShortOptionSecurity_fromOfx(ofxVal) {
    if ("NAKED" === ofxVal) {
        return ShortOptionSecurity.NAKED;
    }
    else if ("COVERED" === ofxVal) {
        return ShortOptionSecurity.COVERED;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents an options position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class OptionsPosition extends BasePosition {
    /**
     * Gets how the options position is secured (for short positions).
     *
     * @return how the options position is secured
     */
    getSecured() {
        return this.secured;
    }
    /**
     * Sets how the options position is secured (for short positions).
     *
     * @param secured how the options position is secured
     */
    setSecured(secured) {
        this.secured = secured;
    }
    /**
     * Gets how the options position is secured as a well-known type.
     *
     * @return how the option position is secured or null if it's not a well-known type
     */
    getSecuredEnum() {
        return ShortOptionSecurity_fromOfx(this.getSecured());
    }
}
Aggregate_add(OptionsPosition, "POSOPT");
Element_add(OptionsPosition, { name: "SECURED", order: 20, type: String, read: OptionsPosition.prototype.getSecured, write: OptionsPosition.prototype.setSecured });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents other types of positions.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class OtherPosition extends BasePosition {
}
Aggregate_add(OtherPosition, "POSOTHER");

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a stock position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class StockPosition extends BasePosition {
    /**
     * Gets the number of units in the financial insititution's street name.
     *
     * @return the number of units in the financial insititution's street name.
     */
    getUnitsStreet() {
        return this.unitsStreet;
    }
    /**
     * Sets the number of units in the financial insititution's street name.
     *
     * @param unitsStreet the number of units in the financial insititution's street name.
     */
    setUnitsStreet(unitsStreet) {
        this.unitsStreet = unitsStreet;
    }
    /**
     * Gets the number of units in the user's name.
     *
     * @return the number of units in the user's name.
     */
    getUnitsUser() {
        return this.unitsUser;
    }
    /**
     * Sets the number of units in the user's name.
     *
     * @param unitsUser the number of units in the user's name.
     */
    setUnitsUser(unitsUser) {
        this.unitsUser = unitsUser;
    }
    /**
     * Gets whether dividends are automatically reinvested.
     *
     * @return whether dividends are automatically reinvested
     */
    getReinvestDividends() {
        return this.reinvestDividends;
    }
    /**
     * Sets whether dividends are automatically reinvested.
     *
     * @param reinvestDividends whether dividends are automatically reinvested
     */
    setReinvestDividends(reinvestDividends) {
        this.reinvestDividends = reinvestDividends;
    }
}
Aggregate_add(StockPosition, "POSSTOCK");
Element_add(StockPosition, { name: "UNITSSTREET", order: 20, type: Number, read: StockPosition.prototype.getUnitsStreet, write: StockPosition.prototype.setUnitsStreet });
Element_add(StockPosition, { name: "UNITSUSER", order: 30, type: Number, read: StockPosition.prototype.getUnitsUser, write: StockPosition.prototype.setUnitsUser });
Element_add(StockPosition, { name: "REINVDIV", order: 40, type: Boolean, read: StockPosition.prototype.getReinvestDividends, write: StockPosition.prototype.setReinvestDividends });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggregate for the investment balance list.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @author Jon Perlow
 */
class BalanceList {
    /**
     * Gets the list of balance records.
     *
     * @return the list of balance records.
     */
    getBalanceRecords() {
        return this.balanceRecords;
    }
    /**
     * Sets the list of balance records.
     *
     * @param balanceRecords the list of balance records.
     */
    setBalanceRecords(balanceRecords) {
        this.balanceRecords = balanceRecords;
    }
}
Aggregate_add(BalanceList, "BALLIST");
ChildAggregate_add(BalanceList, { order: 10, type: Array, collectionEntryType: BalanceRecord, read: BalanceList.prototype.getBalanceRecords, write: BalanceList.prototype.setBalanceRecords });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggregate for the investment balance.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentBalance {
    /**
     * Gets the available cash balance across all sub-accounts, including sweep funds. This is
     * required field according to the OFX spec.
     *
     * @return the available cash balance
     */
    getAvailableCash() {
        return this.availableCash;
    }
    /**
     * Sets the available cash balance across all sub-accounts, including sweep funds. This is
     * required field according to the OFX spec.
     *
     * @param availableCash the available cash balance
     */
    setAvailableCash(availableCash) {
        this.availableCash = availableCash;
    }
    /**
     * Gets the margin account balance. A positive balance indicates a positive cash balance, while
     * a negative balance indicates the customer borrowed funds. This is a required field according
     * to the OFX spec.
     *
     * @return the margin account balance
     */
    getMarginBalance() {
        return this.marginBalance;
    }
    /**
     * Sets the margin account balance. A positive balance indicates a positive cash balance, while
     * a negative balance indicates the customer borrowed funds. This is a required field according
     * to the OFX spec.
     *
     * @param marginBalance the margin account balance
     */
    setMarginBalance(marginBalance) {
        this.marginBalance = marginBalance;
    }
    /**
     * Gets the market value of all short positions. This is a positive balance. This is a required
     * field according to the OFX spec.
     *
     * @return the market value of all short positions
     */
    getShortBalance() {
        return this.shortBalance;
    }
    /**
     * Sets the market value of all short positions. This is a positive balance. This is a required
     * field according to the OFX spec.
     *
     * @param shortBalance the market value of all short positions
     */
    setShortBalance(shortBalance) {
        this.shortBalance = shortBalance;
    }
    /**
     * Gets the buying power amount. This is an optional field according to the OFX spec.
     *
     * @return the buying power
     */
    getBuyingPower() {
        return this.buyingPower;
    }
    /**
     * Sets the buying power amount. This is an optional field according to the OFX spec.
     *
     * @param buyingPower the buying power
     */
    setBuyingPower(buyingPower) {
        this.buyingPower = buyingPower;
    }
    /**
     * Gets the investment balance list. This is an optional field according to the OFX spec.
     *
     * @return the investment balance list
     */
    getBalanceList() {
        return this.balanceList;
    }
    /**
     * Sets the investment balance list. This is an optional field according to the OFX spec.
     *
     * @param balanceList the investment balance list
     */
    setBalanceList(balanceList) {
        this.balanceList = balanceList;
    }
}
Aggregate_add(InvestmentBalance, "INVBAL");
Element_add(InvestmentBalance, { name: "AVAILCASH", required: true, order: 10, type: Number, read: InvestmentBalance.prototype.getAvailableCash, write: InvestmentBalance.prototype.setAvailableCash });
Element_add(InvestmentBalance, { name: "MARGINBALANCE", required: true, order: 20, type: Number, read: InvestmentBalance.prototype.getMarginBalance, write: InvestmentBalance.prototype.setMarginBalance });
Element_add(InvestmentBalance, { name: "SHORTBALANCE", required: true, order: 30, type: Number, read: InvestmentBalance.prototype.getShortBalance, write: InvestmentBalance.prototype.setShortBalance });
Element_add(InvestmentBalance, { name: "BUYPOWER", order: 40, type: Number, read: InvestmentBalance.prototype.getBuyingPower, write: InvestmentBalance.prototype.setBuyingPower });
ChildAggregate_add(InvestmentBalance, { order: 50, type: BalanceList, read: InvestmentBalance.prototype.getBalanceList, write: InvestmentBalance.prototype.setBalanceList });

/**
 * Base class for all investment transactions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
class BaseInvestmentTransaction {
    constructor(transactionType) {
        this.transactionType = transactionType;
    }
    /**
     * Gets the type of transaction.
     *
     * @return the type of transaction
     */
    getTransactionType() {
        return this.transactionType;
    }
    /**
     * Gets the unique financial institution assigned transaction id. This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the financial institution asssigned transaction id
     */
    getTransactionId() {
        return this.getInvestmentTransaction().getTransactionId();
    }
    /**
     * Gets the server assigned transaction id. This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the server assigned transaction id
     */
    getServerId() {
        return this.getInvestmentTransaction().getServerId();
    }
    /**
     * Gets the trade date of the transaction. For stock splits, this is the
     * day of record. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the trade date
     */
    getTradeDate() {
        return this.getInvestmentTransaction().getTradeDate();
    }
    /**
     * Gets the settlement date of the transaction. For stock splits, this is the
     * day of of execution. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the trade date
     */
    getSettlementDate() {
        return this.getInvestmentTransaction().getSettlementDate();
    }
    /**
     * For a reveral transaction, gets the financial institution assigned
     * transaction id for the transaction being revesed.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the transaction id of the transaction being reversed
     */
    getReversalTransactionId() {
        return this.getInvestmentTransaction().getReversalTransactionId();
    }
    /**
     * Gets the memo associated with the transaction. This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the memo
     */
    getMemo() {
        return this.getInvestmentTransaction().getMemo();
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Bank transactions that are part of an investment account statement. Wraps a {@link Transaction}.
 * @see "Section 13.9.2.3, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentBankTransaction {
    /**
     * Gets the wrapped transaction aggregate.
     * @return the wrapped transaction
     */
    getTransaction() {
        return this.transaction;
    }
    /**
     * Sets the wrapped transaction aggregate.
     * @param transaction the wrapped transaction
     */
    setTransaction(transaction) {
        this.transaction = transaction;
    }
    /**
     * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @return the sub account fund for the transaction
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @param subAccountFund the sub account fund for the transaction
     */
    setSubAccountFund(subAccountFund) {
        this.subAccountFund = subAccountFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
}
Aggregate_add(InvestmentBankTransaction, "INVBANKTRAN");
ChildAggregate_add(InvestmentBankTransaction, { order: 10, type: Transaction, read: InvestmentBankTransaction.prototype.getTransaction, write: InvestmentBankTransaction.prototype.setTransaction });
Element_add(InvestmentBankTransaction, { name: "SUBACCTFUND", required: true, order: 20, type: String, read: InvestmentBankTransaction.prototype.getSubAccountFund, write: InvestmentBankTransaction.prototype.setSubAccountFund });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The transaction list aggregate.
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentTransactionList {
    /**
     * Gets the start date. This is a required field according to the OFX spec.
     *
     * @return The start date
     */
    getStart() {
        return this.start;
    }
    /**
     * Sets the start date. This is a required field according to the OFX spec.
     *
     * @param start The start date
     */
    setStart(start) {
        this.start = start;
    }
    /**
     * Gets the end date. This is a required field according to the OFX spec.
     *
     * @return he end date
     */
    getEnd() {
        return this.end;
    }
    /**
     * Sets the end date. This is a required field according to the OFX spec.
     *
     * @param end the end date
     */
    setEnd(end) {
        this.end = end;
    }
    /**
     * Gets the investment transaction list. This is a heterogenous list of different types of
     * transactions returned in the order the brokerage provides them.
     *
     * @return the investment transaction list
     */
    getInvestmentTransactions() {
        return this.transactions;
    }
    /**
     * Sets the investment transaction list. This is a heterogenous list of different types of
     * transactions returned in the order the brokerage provides them.
     *
     * @param transactions the investment transaction list
     */
    setInvestmentTransactions(transactions) {
        this.transactions = transactions;
    }
    /**
     * Gets the bank transaction list.
     *
     * @return the bank transaction list
     */
    getBankTransactions() {
        return this.bankTransactions;
    }
    /**
     * Sets the bank transaction list.
     *
     * @param bankTransactions the bank transaction list
     */
    setBankTransactions(bankTransactions) {
        this.bankTransactions = bankTransactions;
    }
}
Aggregate_add(InvestmentTransactionList, "INVTRANLIST");
Element_add(InvestmentTransactionList, { name: "DTSTART", required: true, order: 0, type: Date, read: InvestmentTransactionList.prototype.getStart, write: InvestmentTransactionList.prototype.setStart });
Element_add(InvestmentTransactionList, { name: "DTEND", required: true, order: 10, type: Date, read: InvestmentTransactionList.prototype.getEnd, write: InvestmentTransactionList.prototype.setEnd });
ChildAggregate_add(InvestmentTransactionList, { order: 20, type: Array, collectionEntryType: BaseInvestmentTransaction, read: InvestmentTransactionList.prototype.getInvestmentTransactions, write: InvestmentTransactionList.prototype.setInvestmentTransactions });
ChildAggregate_add(InvestmentTransactionList, { order: 30, type: Array, collectionEntryType: InvestmentBankTransaction, read: InvestmentTransactionList.prototype.getBankTransactions, write: InvestmentTransactionList.prototype.setBankTransactions });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggregate for the investment statement download response.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentStatementResponse extends StatementResponse {
    /**
     * Gets the name of the response message.
     *
     * @return the name of the response message
     */
    //@Override
    getResponseMessageName() {
        return "investment statement";
    }
    /**
     * Gets the date and time for the statement download. This is a required field according to the
     * OFX spec.
     *
     * @return the date and time for the statement download
     */
    getDateOfStatement() {
        return this.dateOfStatement;
    }
    /**
     * Sets the date and time for the statement download. This is a required field according to the
     * OFX spec.
     *
     * @param dateOfStatement the date and time for the statement download
     */
    setDateOfStatement(dateOfStatement) {
        this.dateOfStatement = dateOfStatement;
    }
    /**
     * Gets the account for the statement. This is a required field according to the OFX spec.
     *
     * @return the account for the statement
     */
    getAccount() {
        return this.account;
    }
    /**
     * Sets the account for the statement. This is a required field according to the OFX spec.
     *
     * @param account the account for the statement
     */
    setAccount(account) {
        this.account = account;
    }
    /**
     * Gets the transaction list aggregate. This is an optional field according to the OFX spec.
     *
     * @return the transaction list aggregate
     */
    getInvestmentTransactionList() {
        return this.investmentTransactionList;
    }
    /**
     * Sets the transaction list aggregate. This is an optional field according to the OFX spec.
     *
     * @param transactionList the transaction list aggregate
     */
    setInvestmentTransactionList(transactionList) {
        this.investmentTransactionList = transactionList;
    }
    /**
     * Gets the position list aggreate. This is an optional field according to the OFX spec.
     *
     * @return the position list aggregate
     */
    getPositionList() {
        return this.positionList;
    }
    /**
     * Sets the position list aggreate. This is an optional field according to the OFX spec.
     *
     * @param positionList the position list aggregate
     */
    setPositionList(positionList) {
        this.positionList = positionList;
    }
    /**
     * Gets the account balance. This is an optional field according to the OFX spec.
     *
     * @return the account balance
     */
    getAccountBalance() {
        return this.accountBalance;
    }
    /**
     * Sets the account balance. This is an optional field according to the OFX spec.
     *
     * @param accountBalance the account balance
     */
    setAccountBalance(accountBalance) {
        this.accountBalance = accountBalance;
    }
    /**
     * Gets the security list aggregate.
     * <br>
     * This is not actually technically part of the investment statement responsr aggregate, but
     * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
     * we provide it here for convenience.
     *
     * @return the security list aggregate
     */
    getSecurityList() {
        return this.securityList;
    }
    /**
     * Sets the security list aggregate.
     * <br>
     * This is not actually technically part of the investment statement responsr aggregate, but
     * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
     * we provide it here for convenience.
     *
     * @param securityList the security list aggregate
     */
    setSecurityList(securityList) {
        this.securityList = securityList;
    }
}
Aggregate_add(InvestmentStatementResponse, "INVSTMTRS");
Element_add(InvestmentStatementResponse, { name: "DTASOF", required: true, order: 60, type: Date, read: InvestmentStatementResponse.prototype.getDateOfStatement, write: InvestmentStatementResponse.prototype.setDateOfStatement });
ChildAggregate_add(InvestmentStatementResponse, { name: "INVACCTFROM", required: true, order: 10, type: InvestmentAccountDetails, read: InvestmentStatementResponse.prototype.getAccount, write: InvestmentStatementResponse.prototype.setAccount });
ChildAggregate_add(InvestmentStatementResponse, { order: 70, type: InvestmentTransactionList, read: InvestmentStatementResponse.prototype.getInvestmentTransactionList, write: InvestmentStatementResponse.prototype.setInvestmentTransactionList });
ChildAggregate_add(InvestmentStatementResponse, { order: 80, type: InvestmentPositionList, read: InvestmentStatementResponse.prototype.getPositionList, write: InvestmentStatementResponse.prototype.setPositionList });
ChildAggregate_add(InvestmentStatementResponse, { order: 90, type: InvestmentBalance, read: InvestmentStatementResponse.prototype.getAccountBalance, write: InvestmentStatementResponse.prototype.setAccountBalance });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Investment statement transaction response.
 * @see "Section 13.9.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentStatementResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * Gets the the statement response message.
     *
     * @return the statement response message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * Sets the the statement response message.
     *
     * @param message the statement response message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(InvestmentStatementResponseTransaction, "INVSTMTTRNRS");
ChildAggregate_add(InvestmentStatementResponseTransaction, { required: true, order: 30, type: InvestmentStatementResponse, read: InvestmentStatementResponseTransaction.prototype.getMessage, write: InvestmentStatementResponseTransaction.prototype.setMessage });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Investment statement response message set.
 * @see "Section 13.7.1.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentStatementResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.investment;
    }
    /**
     * Gets the statement response list. Most OFX files have a single statement response.
     *
     * @return the statement response list
     */
    getStatementResponses() {
        return this.statementResponses;
    }
    /**
     * Sets the statement reponse list. Most OFX files have a single statement response.
     *
     * @param statementResponses the statement response list
     */
    setStatementResponses(statementResponses) {
        this.statementResponses = statementResponses;
    }
    /**
     * Gets the first statement response. Use getStatementResponses() if you are expecting multiple
     * responses.
     *
     * @return the first investment statement response.
     */
    getStatementResponse() {
        return this.statementResponses == null || this.statementResponses.length == 0 ? null : this.statementResponses[0];
    }
    /**
     * Sets the statement response if there is a single response.
     *
     * @param statementResponse The statement response.
     */
    setStatementResponse(statementResponse) {
        this.statementResponses = [statementResponse];
    }
    // Inherited.
    getResponseMessages() {
        return this.statementResponses;
    }
}
Aggregate_add(InvestmentStatementResponseMessageSet, "INVSTMTMSGSRSV1");
ChildAggregate_add(InvestmentStatementResponseMessageSet, { order: 0, type: Array, collectionEntryType: InvestmentStatementResponseTransaction, read: InvestmentStatementResponseMessageSet.prototype.getStatementResponses, write: InvestmentStatementResponseMessageSet.prototype.setStatementResponses });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Investment transaction aggregate ("INVTRAN").
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentTransaction {
    /**
     * Gets the unique financial institution assigned transaction id. This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the financial institution asssigned transaction id
     */
    getTransactionId() {
        return this.transactionId;
    }
    /**
     * Sets the unique financial institution assigned transaction id. This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @param transactionId the financial institution asssigned transaction id
     */
    setTransactionId(transactionId) {
        this.transactionId = transactionId;
    }
    /**
     * Gets the server assigned transaction id. This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the server assigned transaction id
     */
    getServerId() {
        return this.serverId;
    }
    /**
     * Sets the server assigned transaction id. This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @param serverId the server assigned transaction id
     */
    setServerId(serverId) {
        this.serverId = serverId;
    }
    /**
     * Gets the trade date of the transaction. For stock splits, this is the
     * day of record. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the trade date
     */
    getTradeDate() {
        return this.tradeDate;
    }
    /**
     * Sets the trade date of the transaction. For stock splits, this is the
     * day of record. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @param tradeDate the trade date
     */
    setTradeDate(tradeDate) {
        this.tradeDate = tradeDate;
    }
    /**
     * Gets the settlement date of the transaction. For stock splits, this is the
     * day of of execution. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the trade date
     */
    getSettlementDate() {
        return this.settlementDate;
    }
    /**
     * Sets the settlement date of the transaction. For stock splits, this is the
     * day of of execution. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @param settlementDate the trade date
     */
    setSettlementDate(settlementDate) {
        this.settlementDate = settlementDate;
    }
    /**
     * For a reveral transaction, gets the financial institution assigned
     * transaction id for the transaction being revesed.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the transaction id of the transaction being reversed
     */
    getReversalTransactionId() {
        return this.reversalTransactionId;
    }
    /**
     * For a reveral transaction, gets the financial institution assigned
     * transaction id for the transaction being revesed.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @param reversalTransactionId the transaction id of the transaction being reversed
     */
    setReversalTransactionId(reversalTransactionId) {
        this.reversalTransactionId = reversalTransactionId;
    }
    /**
     * Gets the memo associated with the transaction. This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @return the memo
     */
    getMemo() {
        return this.memo;
    }
    /**
     * Sets the memo associated with the transaction. This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @param memo the memo
     */
    setMemo(memo) {
        this.memo = memo;
    }
}
Aggregate_add(InvestmentTransaction, "INVTRAN");
Element_add(InvestmentTransaction, { name: "FITID", required: true, order: 0, type: String, read: InvestmentTransaction.prototype.getTransactionId, write: InvestmentTransaction.prototype.setTransactionId });
Element_add(InvestmentTransaction, { name: "SRVRTID", order: 10, type: String, read: InvestmentTransaction.prototype.getServerId, write: InvestmentTransaction.prototype.setServerId });
Element_add(InvestmentTransaction, { name: "DTTRADE", required: true, order: 20, type: Date, read: InvestmentTransaction.prototype.getTradeDate, write: InvestmentTransaction.prototype.setTradeDate });
Element_add(InvestmentTransaction, { name: "DTSETTLE", order: 30, type: Date, read: InvestmentTransaction.prototype.getSettlementDate, write: InvestmentTransaction.prototype.setSettlementDate });
Element_add(InvestmentTransaction, { name: "REVERSALFITID", order: 40, type: String, read: InvestmentTransaction.prototype.getReversalTransactionId, write: InvestmentTransaction.prototype.setReversalTransactionId });
Element_add(InvestmentTransaction, { name: "MEMO", order: 50, type: String, read: InvestmentTransaction.prototype.getMemo, write: InvestmentTransaction.prototype.setMemo });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Original currency aggregate ("ORIGCURRENCY"). For investment transactions in other currencies,
 * the financial institution can report the transaction as converted into the default currency
 * and then include this child aggregate to report what the original currency was and what the
 * rate of conversion was.
 * @see "Section 5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class OriginalCurrency {
    /**
     * Gets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
     * the transaction response) to "CURSYM" (the original currency code below).
     *
     * @return the currency rate
     */
    getCurrencyRate() {
        return this.currencyRate;
    }
    /**
     * Sets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
     * the transaction response) to "CURSYM" (the original currency code below).
     *
     * @param currencyRate the currency rate
     */
    setCurrencyRate(currencyRate) {
        this.currencyRate = currencyRate;
    }
    /**
     * Gets the ISO-4217 3-letter currency identifier of the original currency.
     * @see java.util.Currency#getCurrencyCode()
     *
     * @return the currency code
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the ISO-4217 3-letter currency identifier of the original currency.
     * @see java.util.Currency#getCurrencyCode()
     *
     * @param currencyCode the currency code
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
    }
}
Aggregate_add(OriginalCurrency, "ORIGCURRENCY");
Element_add(OriginalCurrency, { name: "CURRATE", required: true, order: 10, type: Number, read: OriginalCurrency.prototype.getCurrencyRate, write: OriginalCurrency.prototype.setCurrencyRate });
Element_add(OriginalCurrency, { name: "CURSYM", required: true, order: 20, type: String, read: OriginalCurrency.prototype.getCurrencyCode, write: OriginalCurrency.prototype.setCurrencyCode });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Buy investment transaction aggregate ("INVBUY").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @author Jon Perlow
 */
class BuyInvestmentTransaction {
    /**
     * Gets the investment transaction child aggregate.
     *
     * @return the investment transaction child aggregate
     */
    getInvestmentTransaction() {
        return this.investmentTransaction;
    }
    /**
     * Sets the investment transaction child aggregate.
     *
     * @param investmentTransaction the investment transaction child aggregate
     */
    setInvestmentTransaction(investmentTransaction) {
        this.investmentTransaction = investmentTransaction;
    }
    /**
     * Gets the id of the security that was bought. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was bought
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that was bought. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security that was bought
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the number of units of the security that was bought. For security-based actions other
     * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the number of units purchased.
     */
    getUnits() {
        return this.units;
    }
    /**
     * Sets the number of units of the security that was bought. For security-based actions other
     * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param units the number of units purchased.
     */
    setUnits(units) {
        this.units = units;
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.unitPrice;
    }
    /**
     * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param unitPrice the per unit price
     */
    setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * Gets the portion of the unit price that is attributed to the dealer markup. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit markeup price
     */
    getMarkup() {
        return this.markup;
    }
    /**
     * Sets the portion of the unit price that is attributed to the dealer markup. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param markup the per unit markeup price
     */
    setMarkup(markup) {
        this.markup = markup;
    }
    /**
     * Gets the transaction commission for the purchase. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction commision
     */
    getCommission() {
        return this.commission;
    }
    /**
     * Sets the transaction commission for the purchase. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param commission the transaction commision
     */
    setCommission(commission) {
        this.commission = commission;
    }
    /**
     * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction taxes
     */
    getTaxes() {
        return this.taxes;
    }
    /**
     * Sets the taxes for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param taxes the transaction taxes
     */
    setTaxes(taxes) {
        this.taxes = taxes;
    }
    /**
     * Gets the fees for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction fees
     */
    getFees() {
        return this.fees;
    }
    /**
     * Sets the fees for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param fees the transaction fees
     */
    setFees(fees) {
        this.fees = fees;
    }
    /**
     * Gets the load for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the load
     */
    getLoad() {
        return this.load;
    }
    /**
     * Sets the load for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param load the load
     */
    setLoad(load) {
        this.load = load;
    }
    /**
     * Gets the total for the purchase. Should be equal to
     * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
     * spec. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total for the purchase. Should be equal to
     * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
     * spec. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction.
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the currency code for the transaction. Only one of currency code or original currency
     * info may be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction.
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrencyInfo the original currency info for the transaction
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
      * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
      * @see "Section 13.9.2.4.3, OFX Spec"
      *
      * @return the sub account type
      */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
      * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
      * @see "Section 13.9.2.4.3, OFX Spec"
      *
      * @param subAccountSecurity the sub account type
      */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAcctFund the sub account fund
     */
    setSubAccountFund(subAcctFund) {
        this.subAccountFund = subAcctFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type or null if it wasn't one of the well known types.
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
}
Aggregate_add(BuyInvestmentTransaction, "INVBUY");
ChildAggregate_add(BuyInvestmentTransaction, { order: 10, type: InvestmentTransaction, read: BuyInvestmentTransaction.prototype.getInvestmentTransaction, write: BuyInvestmentTransaction.prototype.setInvestmentTransaction });
ChildAggregate_add(BuyInvestmentTransaction, { required: true, order: 20, type: SecurityId, read: BuyInvestmentTransaction.prototype.getSecurityId, write: BuyInvestmentTransaction.prototype.setSecurityId });
Element_add(BuyInvestmentTransaction, { name: "UNITS", required: true, order: 30, type: Number, read: BuyInvestmentTransaction.prototype.getUnits, write: BuyInvestmentTransaction.prototype.setUnits });
Element_add(BuyInvestmentTransaction, { name: "UNITPRICE", required: true, order: 40, type: Number, read: BuyInvestmentTransaction.prototype.getUnitPrice, write: BuyInvestmentTransaction.prototype.setUnitPrice });
Element_add(BuyInvestmentTransaction, { name: "MARKUP", order: 50, type: Number, read: BuyInvestmentTransaction.prototype.getMarkup, write: BuyInvestmentTransaction.prototype.setMarkup });
Element_add(BuyInvestmentTransaction, { name: "COMMISSION", order: 60, type: Number, read: BuyInvestmentTransaction.prototype.getCommission, write: BuyInvestmentTransaction.prototype.setCommission });
Element_add(BuyInvestmentTransaction, { name: "TAXES", order: 70, type: Number, read: BuyInvestmentTransaction.prototype.getTaxes, write: BuyInvestmentTransaction.prototype.setTaxes });
Element_add(BuyInvestmentTransaction, { name: "FEES", order: 80, type: Number, read: BuyInvestmentTransaction.prototype.getFees, write: BuyInvestmentTransaction.prototype.setFees });
Element_add(BuyInvestmentTransaction, { name: "LOAD", order: 90, type: Number, read: BuyInvestmentTransaction.prototype.getLoad, write: BuyInvestmentTransaction.prototype.setLoad });
Element_add(BuyInvestmentTransaction, { name: "TOTAL", required: true, order: 100, type: Number, read: BuyInvestmentTransaction.prototype.getTotal, write: BuyInvestmentTransaction.prototype.setTotal });
Element_add(BuyInvestmentTransaction, { name: "CURRENCY", order: 110, type: String, read: BuyInvestmentTransaction.prototype.getCurrencyCode, write: BuyInvestmentTransaction.prototype.setCurrencyCode });
ChildAggregate_add(BuyInvestmentTransaction, { order: 120, type: OriginalCurrency, read: BuyInvestmentTransaction.prototype.getOriginalCurrencyInfo, write: BuyInvestmentTransaction.prototype.setOriginalCurrencyInfo });
Element_add(BuyInvestmentTransaction, { name: "SUBACCTSEC", order: 130, type: String, read: BuyInvestmentTransaction.prototype.getSubAccountSecurity, write: BuyInvestmentTransaction.prototype.setSubAccountSecurity });
Element_add(BuyInvestmentTransaction, { name: "SUBACCTFUND", order: 140, type: String, read: BuyInvestmentTransaction.prototype.getSubAccountFund, write: BuyInvestmentTransaction.prototype.setSubAccountFund });

/**
 * Base class for all investment transactions for buying securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all buy investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
class BaseBuyInvestmentTransaction extends BaseInvestmentTransaction {
    constructor(transactionType) {
        super(transactionType);
    }
    /**
     * Gets the buy investment transaction child aggregate.
     *
     * @return the buy investment transaction child aggregate
     */
    getBuyInvestment() {
        return this.buyInvestment;
    }
    /**
     * Sets the buy investment transaction child aggregate.
     *
     * @param buyInvestment the buy investment transaction child aggregate
     */
    setBuyInvestment(buyInvestment) {
        this.buyInvestment = buyInvestment;
    }
    /**
     * Gets the investment transaction aggregate.
     *
     * @return the investment transaction aggregate
     */
    // @Overridden
    getInvestmentTransaction() {
        return this.getBuyInvestment().getInvestmentTransaction();
    }
    /**
     * Gets the id of the security that was bought. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was bought
     */
    getSecurityId() {
        return this.getBuyInvestment().getSecurityId();
    }
    /**
     * Gets the number of units of the security that was bought. For security-based actions other
     * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the number of units purchased.
     */
    getUnits() {
        return this.getBuyInvestment().getUnits();
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.getBuyInvestment().getUnitPrice();
    }
    /**
     * Gets the portion of the unit price that is attributed to the dealer markup. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit markeup price
     */
    getMarkup() {
        return this.getBuyInvestment().getMarkup();
    }
    /**
     * Gets the transaction commission for the purchase. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction commision
     */
    getCommission() {
        return this.getBuyInvestment().getCommission();
    }
    /**
     * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction taxes
     */
    getTaxes() {
        return this.getBuyInvestment().getTaxes();
    }
    /**
     * Gets the fees for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction fees
     */
    getFees() {
        return this.getBuyInvestment().getFees();
    }
    /**
     * Gets the load for the purchase. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the load
     */
    getLoad() {
        return this.getBuyInvestment().getLoad();
    }
    /**
     * Gets the total for the purchase. Should be equal to
     * (units * (unitPrice + markup)) + (commision + fees + load + taxes) according to the OFX
     * spec. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.getBuyInvestment().getTotal();
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.getBuyInvestment().getCurrencyCode();
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction
     */
    getOriginalCurrencyInfo() {
        return this.getBuyInvestment().getOriginalCurrencyInfo();
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.getBuyInvestment().getSubAccountSecurity();
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.getBuyInvestment().getSubAccountFund();
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type or null if it wasn't one of the well known types.
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
}
ChildAggregate_add(BaseBuyInvestmentTransaction, { order: 10, type: BuyInvestmentTransaction, read: BaseBuyInvestmentTransaction.prototype.getBuyInvestment, write: BaseBuyInvestmentTransaction.prototype.setBuyInvestment });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base class for investment transactions that aren't buys or sales..
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
class BaseOtherInvestmentTransaction extends BaseInvestmentTransaction {
    constructor(transactionType) {
        super(transactionType);
    }
    /**
     * Gets the {@link InvestmentTransaction} aggregate.
     *
     * @return the {@link InvestmentTransaction} aggregate
     */
    // @Override
    getInvestmentTransaction() {
        return this.investmentTransaction;
    }
    /**
     * Sets the {@link InvestmentTransaction} aggregate.
     *
     * @param investmentTransaction the {@link InvestmentTransaction} aggregate
     */
    setInvestmentTransaction(investmentTransaction) {
        this.investmentTransaction = investmentTransaction;
    }
}
ChildAggregate_add(BaseOtherInvestmentTransaction, { order: 10, type: InvestmentTransaction, read: BaseOtherInvestmentTransaction.prototype.getInvestmentTransaction, write: BaseOtherInvestmentTransaction.prototype.setInvestmentTransaction });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sell investment transaction aggregate ("INVSELL").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @author Jon Perlow
 */
class SellInvestmentTransaction {
    /**
     * Gets the investment transaction child aggregate.
     *
     * @return the investment transaction child aggregate
     */
    getInvestmentTransaction() {
        return this.investmentTransaction;
    }
    /**
     * Sets the investment transaction child aggregate.
     *
     * @param investmentTransaction the investment transaction child aggregate
     */
    setInvestmentTransaction(investmentTransaction) {
        this.investmentTransaction = investmentTransaction;
    }
    /**
     * Gets the id of the security that was sold. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was sold
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that was sold. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security that was sold
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the number of units of the security that was sold. For security-based actions other
     * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the number of units sold
     */
    getUnits() {
        return this.units;
    }
    /**
     * Sets the number of units of the security that was sold. For security-based actions other
     * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param units the number of units sold
     */
    setUnits(units) {
        this.units = units;
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.unitPrice;
    }
    /**
     * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param unitPrice the per unit price
     */
    setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit markedown price
     */
    getMarkdown() {
        return this.markdown;
    }
    /**
     * Sets the portion of the unit price that is attributed to the dealer markdown. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param markdown the per unit markedown price
     */
    setMarkdown(markdown) {
        this.markdown = markdown;
    }
    /**
     * Gets the transaction commission for the sale. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction commision
     */
    getCommission() {
        return this.commission;
    }
    /**
     * Sets the transaction commission for the sale. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param commission the transaction commision
     */
    setCommission(commission) {
        this.commission = commission;
    }
    /**
     * Gets the taxes for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction taxes
     */
    getTaxes() {
        return this.taxes;
    }
    /**
     * Sets the taxes for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param taxes the transaction taxes
     */
    setTaxes(taxes) {
        this.taxes = taxes;
    }
    /**
     * Gets the fees for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction fees
     */
    getFees() {
        return this.fees;
    }
    /**
     * Sets the fees for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param fees the transaction fees
     */
    setFees(fees) {
        this.fees = fees;
    }
    /**
     * Gets the load for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the load
     */
    getLoad() {
        return this.load;
    }
    /**
     * Sets the load for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param load the load
     */
    setLoad(load) {
        this.load = load;
    }
    /**
     * Gets the withholding for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the withholding
     */
    getWithholding() {
        return this.withholding;
    }
    /**
     * Sets the withholding for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param withholding the withholding
     */
    setWithholding(withholding) {
        this.withholding = withholding;
    }
    /**
     * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return whether the transaction was tax exempt
     */
    getTaxExempt() {
        return this.taxExempt;
    }
    /**
     * Sets whether the sale was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param taxExempt whether the transaction was tax exempt
     */
    setTaxExempt(taxExempt) {
        this.taxExempt = taxExempt;
    }
    /**
     * Gets the total for the sale. Should be equal to
     * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
     * statewithholding) according to the OFX spec. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total for the sale. Should be equal to
     * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
     * statewithholding) according to the OFX spec. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the gain sale. This is aan optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the gain for the sale
     */
    getGain() {
        return this.gain;
    }
    /**
     * Sets the gain sale. This is aan optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param gain the gain for the sale
     */
    setGain(gain) {
        this.gain = gain;
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * code should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * sets the currency code for the transaction. Only one of currency code or original currency
     * code should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrencyInfo the original currency info for the transaction
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountSecurity the sub account type
     */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type that the security is being transfered from
     * (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type that the security is being transfered from
     * (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountFund the sub account fund
     */
    setSubAccountFund(subAccountFund) {
        this.subAccountFund = subAccountFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
    /**
     * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the loan id
     */
    getLoanId() {
        return this.loanId;
    }
    /**
     * Sets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param loanId the loan id
     */
    setLoanId(loanId) {
        this.loanId = loanId;
    }
    /**
     * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    getStateWithholding() {
        return this.stateWithholding;
    }
    /**
     * Sets the state withholding for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param stateWithholding the state withholding
     */
    setStateWithholding(stateWithholding) {
        this.stateWithholding = stateWithholding;
    }
    /**
     * Gets the penalty for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    getPenalty() {
        return this.penalty;
    }
    /**
     * Sets the penalty for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param penalty the state withholding
     */
    setPenalty(penalty) {
        this.penalty = penalty;
    }
    /**
     * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the 401k source
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the 401k source
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401k source as one of the well-known types.
     *
     * @return the 401k source or null if its not one of the well-known types
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(SellInvestmentTransaction, "INVSELL");
ChildAggregate_add(SellInvestmentTransaction, { order: 10, type: InvestmentTransaction, read: SellInvestmentTransaction.prototype.getInvestmentTransaction, write: SellInvestmentTransaction.prototype.setInvestmentTransaction });
ChildAggregate_add(SellInvestmentTransaction, { required: true, order: 20, type: SecurityId, read: SellInvestmentTransaction.prototype.getSecurityId, write: SellInvestmentTransaction.prototype.setSecurityId });
Element_add(SellInvestmentTransaction, { name: "UNITS", required: true, order: 30, type: Number, read: SellInvestmentTransaction.prototype.getUnits, write: SellInvestmentTransaction.prototype.setUnits });
Element_add(SellInvestmentTransaction, { name: "UNITPRICE", required: true, order: 40, type: Number, read: SellInvestmentTransaction.prototype.getUnitPrice, write: SellInvestmentTransaction.prototype.setUnitPrice });
Element_add(SellInvestmentTransaction, { name: "MARKDOWN", order: 50, type: Number, read: SellInvestmentTransaction.prototype.getMarkdown, write: SellInvestmentTransaction.prototype.setMarkdown });
Element_add(SellInvestmentTransaction, { name: "COMMISSION", order: 60, type: Number, read: SellInvestmentTransaction.prototype.getCommission, write: SellInvestmentTransaction.prototype.setCommission });
Element_add(SellInvestmentTransaction, { name: "TAXES", order: 70, type: Number, read: SellInvestmentTransaction.prototype.getTaxes, write: SellInvestmentTransaction.prototype.setTaxes });
Element_add(SellInvestmentTransaction, { name: "FEES", order: 80, type: Number, read: SellInvestmentTransaction.prototype.getFees, write: SellInvestmentTransaction.prototype.setFees });
Element_add(SellInvestmentTransaction, { name: "LOAD", order: 90, type: Number, read: SellInvestmentTransaction.prototype.getLoad, write: SellInvestmentTransaction.prototype.setLoad });
Element_add(SellInvestmentTransaction, { name: "WITHHOLDING", order: 93, type: Number, read: SellInvestmentTransaction.prototype.getWithholding, write: SellInvestmentTransaction.prototype.setWithholding });
Element_add(SellInvestmentTransaction, { name: "TAXEXEMPT", order: 97, type: Boolean, read: SellInvestmentTransaction.prototype.getTaxExempt, write: SellInvestmentTransaction.prototype.setTaxExempt });
Element_add(SellInvestmentTransaction, { name: "TOTAL", required: true, order: 100, type: Number, read: SellInvestmentTransaction.prototype.getTotal, write: SellInvestmentTransaction.prototype.setTotal });
Element_add(SellInvestmentTransaction, { name: "GAIN", order: 105, type: Number, read: SellInvestmentTransaction.prototype.getGain, write: SellInvestmentTransaction.prototype.setGain });
Element_add(SellInvestmentTransaction, { name: "CURRENCY", order: 110, type: String, read: SellInvestmentTransaction.prototype.getCurrencyCode, write: SellInvestmentTransaction.prototype.setCurrencyCode });
Element_add(SellInvestmentTransaction, { name: "ORIGCURRENCY", order: 120, type: OriginalCurrency, read: SellInvestmentTransaction.prototype.getOriginalCurrencyInfo, write: SellInvestmentTransaction.prototype.setOriginalCurrencyInfo });
Element_add(SellInvestmentTransaction, { name: "SUBACCTSEC", order: 130, type: String, read: SellInvestmentTransaction.prototype.getSubAccountSecurity, write: SellInvestmentTransaction.prototype.setSubAccountSecurity });
Element_add(SellInvestmentTransaction, { name: "SUBACCTFUND", order: 140, type: String, read: SellInvestmentTransaction.prototype.getSubAccountFund, write: SellInvestmentTransaction.prototype.setSubAccountFund });
Element_add(SellInvestmentTransaction, { name: "LOANID", order: 150, type: String, read: SellInvestmentTransaction.prototype.getLoanId, write: SellInvestmentTransaction.prototype.setLoanId });
Element_add(SellInvestmentTransaction, { name: "STATEWITHHOLDING", order: 160, type: Number, read: SellInvestmentTransaction.prototype.getStateWithholding, write: SellInvestmentTransaction.prototype.setStateWithholding });
Element_add(SellInvestmentTransaction, { name: "PENALTY", order: 170, type: Number, read: SellInvestmentTransaction.prototype.getPenalty, write: SellInvestmentTransaction.prototype.setPenalty });
Element_add(SellInvestmentTransaction, { name: "INV401KSOURCE", order: 180, type: String, read: SellInvestmentTransaction.prototype.get401kSource, write: SellInvestmentTransaction.prototype.set401kSource });

/**
 * Base class for all investment transactions for selling securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all sell investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
class BaseSellInvestmentTransaction extends BaseInvestmentTransaction {
    constructor(transactionType) {
        super(transactionType);
    }
    /**
     * Gets the sell investment transaction child aggregate.
     *
     * @return the sell investment transaction child aggregate
     */
    // @Override
    getSellInvestment() {
        return this.sellInvestment;
    }
    /**
     * Sets the sell investment transaction child aggregate.
     *
     * @param sellInvestment the sell investment transaction child aggregate
     */
    setSellInvestment(sellInvestment) {
        this.sellInvestment = sellInvestment;
    }
    /**
     * Gets the investment transaction aggregate.
     *
     * @return the investment transaction aggregate
     */
    // @Overridden
    getInvestmentTransaction() {
        return this.getSellInvestment().getInvestmentTransaction();
    }
    /**
     * Gets the id of the security that was sold. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was bought
     */
    getSecurityId() {
        return this.getSellInvestment().getSecurityId();
    }
    /**
     * Gets the number of units of the security that was sold. For security-based actions other
     * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the number of units purchased.
     */
    getUnits() {
        return this.getSellInvestment().getUnits();
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.getSellInvestment().getUnitPrice();
    }
    /**
     * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit markedown price
     */
    getMarkdown() {
        return this.getSellInvestment().getMarkdown();
    }
    /**
     * Gets the transaction commission for the sale. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction commision
     */
    getCommission() {
        return this.getSellInvestment().getCommission();
    }
    /**
     * Gets the taxes for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction taxes
     */
    getTaxes() {
        return this.getSellInvestment().getTaxes();
    }
    /**
     * Gets the fees for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction fees
     */
    getFees() {
        return this.getSellInvestment().getFees();
    }
    /**
     * Gets the load for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the load
     */
    getLoad() {
        return this.getSellInvestment().getLoad();
    }
    /**
     * Gets the withholding for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the withholding
     */
    getWithholding() {
        return this.getSellInvestment().getWithholding();
    }
    /**
     * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return whether the transaction was tax exempt
     */
    getTaxExempt() {
        return this.getSellInvestment().getTaxExempt();
    }
    /**
     * Gets the total for the sale. Should be equal to
     * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
     * statewithholding) according to the OFX spec. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.getSellInvestment().getTotal();
    }
    /**
     * Gets the gain sale. This is aan optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the gain for the sale
     */
    getGain() {
        return this.getSellInvestment().getGain();
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction.
     */
    getCurrencyCode() {
        return this.getSellInvestment().getCurrencyCode();
    }
    /**
     * Gets the origianl currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency info for the transaction.
     */
    getOriginalCurrencyInfo() {
        return this.getSellInvestment().getOriginalCurrencyInfo();
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.getSellInvestment().getSubAccountSecurity();
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type that the money went to  (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.getSellInvestment().getSubAccountFund();
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
    /**
     * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
     * optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the loan id
     */
    getLoadId() {
        return this.getSellInvestment().getLoanId();
    }
    /**
     * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    getStateWithholding() {
        return this.getSellInvestment().getStateWithholding();
    }
    /**
     * Gets the penalty for the sale. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    getPenalty() {
        return this.getSellInvestment().getPenalty();
    }
    /**
     * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the 401k source
     */
    get401kSource() {
        return this.getSellInvestment().get401kSource();
    }
    /**
     * Gets the 401k source as one of the well-known types.
     *
     * @return the 401k source or null if its not one of the well-known types
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
ChildAggregate_add(BaseSellInvestmentTransaction, { order: 10, type: SellInvestmentTransaction, read: BaseSellInvestmentTransaction.prototype.getSellInvestment, write: BaseSellInvestmentTransaction.prototype.setSellInvestment });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for buying debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class BuyDebtTransaction extends BaseBuyInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.BUY_DEBT);
    }
    /**
     * Gets the amount of accrued interest on the debt. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the amount of accrued interest
     */
    getAccruedInterest() {
        return this.accruedInterest;
    }
    /**
     * Sets the amount of accrued interest on the debt. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param accruedInterest the amount of accrued interest
     */
    setAccruedInterest(accruedInterest) {
        this.accruedInterest = accruedInterest;
    }
}
Aggregate_add(BuyDebtTransaction, "BUYDEBT");
Element_add(BuyDebtTransaction, { name: "ACCRDINT", order: 20, type: Number, read: BuyDebtTransaction.prototype.getAccruedInterest, write: BuyDebtTransaction.prototype.setAccruedInterest });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of purchase for stocks and mutual funds.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var BuyType;
(function (BuyType) {
    BuyType[BuyType["BUY"] = 0] = "BUY";
    BuyType[BuyType["BUY_TO_COVER"] = 1] = "BUY_TO_COVER";
})(BuyType || (BuyType = {}));
function BuyType_fromOfx(ofxVal) {
    if ("BUY" === ofxVal) {
        return BuyType.BUY;
    }
    else if ("BUYTOCOVER" === ofxVal) {
        return BuyType.BUY_TO_COVER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for buying mutual funds.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class BuyMutualFundTransaction extends BaseBuyInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.BUY_MUTUAL_FUND);
    }
    /**
     * Gets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
     * the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the buy type
     */
    getBuyType() {
        return this.buyType;
    }
    /**
     * Sets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
     * the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param buyType the buy type
     */
    setBuyType(buyType) {
        this.buyType = buyType;
    }
    /**
     * Gets the buy type as one of the well-known types.
     *
     * @return the type of purchase or null if it's not known
     */
    getBuyTypeEnum() {
        return BuyType_fromOfx(this.buyType);
    }
    /**
     * Gets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
     * This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the related transaction id
     */
    getRelatedTransactionId() {
        return this.relatedTransactionId;
    }
    /**
     * Sets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
     * This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param relatedTransactionId the related transaction id
     */
    setRelatedTransactionId(relatedTransactionId) {
        this.relatedTransactionId = relatedTransactionId;
    }
}
Aggregate_add(BuyMutualFundTransaction, "BUYMF");
Element_add(BuyMutualFundTransaction, { name: "BUYTYPE", required: true, order: 20, type: String, read: BuyMutualFundTransaction.prototype.getBuyType, write: BuyMutualFundTransaction.prototype.setBuyType });
Element_add(BuyMutualFundTransaction, { name: "RELFITID", order: 30, type: String, read: BuyMutualFundTransaction.prototype.getRelatedTransactionId, write: BuyMutualFundTransaction.prototype.setRelatedTransactionId });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of purchase for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var OptionBuyType;
(function (OptionBuyType) {
    OptionBuyType[OptionBuyType["BUY_TO_OPEN"] = 0] = "BUY_TO_OPEN";
    OptionBuyType[OptionBuyType["BUY_TO_CLOSE"] = 1] = "BUY_TO_CLOSE";
})(OptionBuyType || (OptionBuyType = {}));
function OptionBuyType_fromOfx(ofxVal) {
    if ("BUYTOOPEN" === ofxVal) {
        return OptionBuyType.BUY_TO_OPEN;
    }
    else if ("BUYTOCLOSE" === ofxVal) {
        return OptionBuyType.BUY_TO_CLOSE;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for buying options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class BuyOptionTransaction extends BaseBuyInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.BUY_OPTION);
    }
    /**
     * Gets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the option buy type
     */
    getOptionBuyType() {
        return this.optionBuyType;
    }
    /**
     * Sets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param optionBuyType the option buy type
     */
    setOptionBuyType(optionBuyType) {
        this.optionBuyType = optionBuyType;
    }
    /**
     * Gets the option buy type as one of the well-known types.
     *
     * @return the type of purchase or null if it's not known
     */
    getOptionBuyTypeEnum() {
        return OptionBuyType_fromOfx(this.optionBuyType);
    }
    /**
     * Gets the number of shares per contact. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the number of shares per contact
     */
    getSharesPerContract() {
        return this.sharesPerContact;
    }
    /**
     * Sets the number of shares per contact. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param sharesPerContact the number of shares per contact
     */
    setSharesPerContract(sharesPerContact) {
        this.sharesPerContact = sharesPerContact;
    }
}
Aggregate_add(BuyOptionTransaction, "BUYOPT");
Element_add(BuyOptionTransaction, { name: "OPTBUYTYPE", required: true, order: 20, type: String, read: BuyOptionTransaction.prototype.getOptionBuyType, write: BuyOptionTransaction.prototype.setOptionBuyType });
Element_add(BuyOptionTransaction, { name: "SHPERCTRCT", required: true, order: 30, type: Number, read: BuyOptionTransaction.prototype.getSharesPerContract, write: BuyOptionTransaction.prototype.setSharesPerContract });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for buying other types of securities.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class BuyOtherTransaction extends BaseBuyInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.BUY_OTHER);
    }
}
Aggregate_add(BuyOtherTransaction, "BUYOTHER");

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for buying stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class BuyStockTransaction extends BaseBuyInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.BUY_STOCK);
    }
    /**
     * Gets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the buy type
     */
    getBuyType() {
        return this.buyType;
    }
    /**
     * Sets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param buyType the buy type
     */
    setBuyType(buyType) {
        this.buyType = buyType;
    }
    /**
     * Gets the buy type as one of the well-known types.
     *
     * @return the type of purchase or null if it's not well known
     */
    getBuyTypeEnum() {
        return BuyType_fromOfx(this.buyType);
    }
}
Aggregate_add(BuyStockTransaction, "BUYSTOCK");
Element_add(BuyStockTransaction, { name: "BUYTYPE", required: true, order: 20, type: String, read: BuyStockTransaction.prototype.getBuyType, write: BuyStockTransaction.prototype.setBuyType });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of action for closing a stock option.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var CloseOptionAction;
(function (CloseOptionAction) {
    CloseOptionAction[CloseOptionAction["EXERCISE"] = 0] = "EXERCISE";
    CloseOptionAction[CloseOptionAction["ASSIGN"] = 1] = "ASSIGN";
    CloseOptionAction[CloseOptionAction["EXPIRE"] = 2] = "EXPIRE";
})(CloseOptionAction || (CloseOptionAction = {}));
function CloseOptionAction_fromOfx(ofxVal) {
    if ("EXERCISE" === ofxVal) {
        return CloseOptionAction.EXERCISE;
    }
    else if ("ASSIGN" === ofxVal) {
        return CloseOptionAction.ASSIGN;
    }
    else if ("EXPIRE" === ofxVal) {
        return CloseOptionAction.EXPIRE;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for closing an option position due to expiration, exercise, or assignment.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class CloseOptionTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.CLOSE_OPTION);
    }
    /**
     * Gets the security id of the option.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the security id of the option
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the security id of the option.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param securityId the security id of the option
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the option action
     */
    getOptionAction() {
        return this.optionAction;
    }
    /**
     * Sets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param optionAction the option action
     */
    setOptionAction(optionAction) {
        this.optionAction = optionAction;
    }
    /**
     * Gets the action as one of the well-known types.
     *
     * @return the type of close or null if it's not a well-known type
     */
    getOptionActionEnum() {
        return CloseOptionAction_fromOfx(this.getOptionAction());
    }
    /**
     * Gets the number of units of the option that were closed. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the number of units closed
     */
    getUnits() {
        return this.units;
    }
    /**
     * Sets the number of units of the option that were closed. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param units the number of units closed
     */
    setUnits(units) {
        this.units = units;
    }
    /**
     * Gets the number of shares per contact. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the number of shares per contact
     */
    getSharesPerContact() {
        return this.sharesPerContact;
    }
    /**
     * Sets the number of shares per contact. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param sharesPerContact the number of shares per contact
     */
    setSharesPerContact(sharesPerContact) {
        this.sharesPerContact = sharesPerContact;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param subAccountSecurity the sub account type
     */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the related transaction id for the related buy or sell corresponding to the
     * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
     * action or EXERCISE or ASSIGN.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the related transaction id
     */
    getRelatedTransactionId() {
        return this.relatedTransactionId;
    }
    /**
     * Sets the related transaction id for the related buy or sell corresponding to the
     * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
     * action or EXERCISE or ASSIGN.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param relatedTransactionId the related transaction id
     */
    setRelatedTransactionId(relatedTransactionId) {
        this.relatedTransactionId = relatedTransactionId;
    }
    /**
     * Gets the gain related to the transaction. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the gain related to the transaction
     */
    getGain() {
        return this.gain;
    }
    /**
     * Sets the gain related to the transaction. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param gain the gain related to the transaction
     */
    setGain(gain) {
        this.gain = gain;
    }
}
Aggregate_add(CloseOptionTransaction, "CLOSUREOPT");
ChildAggregate_add(CloseOptionTransaction, { order: 20, type: SecurityId, read: CloseOptionTransaction.prototype.getSecurityId, write: CloseOptionTransaction.prototype.setSecurityId });
Element_add(CloseOptionTransaction, { name: "OPTACTION", required: true, order: 30, type: String, read: CloseOptionTransaction.prototype.getOptionAction, write: CloseOptionTransaction.prototype.setOptionAction });
Element_add(CloseOptionTransaction, { name: "UNITS", required: true, order: 40, type: Number, read: CloseOptionTransaction.prototype.getUnits, write: CloseOptionTransaction.prototype.setUnits });
Element_add(CloseOptionTransaction, { name: "SHPERCTRCT", required: true, order: 50, type: Number, read: CloseOptionTransaction.prototype.getSharesPerContact, write: CloseOptionTransaction.prototype.setSharesPerContact });
Element_add(CloseOptionTransaction, { name: "SUBACCTSEC", required: true, order: 60, type: String, read: CloseOptionTransaction.prototype.getSubAccountSecurity, write: CloseOptionTransaction.prototype.setSubAccountSecurity });
Element_add(CloseOptionTransaction, { name: "RELFITID", order: 70, type: String, read: CloseOptionTransaction.prototype.getRelatedTransactionId, write: CloseOptionTransaction.prototype.setRelatedTransactionId });
Element_add(CloseOptionTransaction, { name: "GAIN", order: 80, type: Number, read: CloseOptionTransaction.prototype.getGain, write: CloseOptionTransaction.prototype.setGain });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of income.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var IncomeType;
(function (IncomeType) {
    IncomeType[IncomeType["LONG_TERM_CAP_GAINS"] = 0] = "LONG_TERM_CAP_GAINS";
    IncomeType[IncomeType["SHORT_TERM_CAP_GAINS"] = 1] = "SHORT_TERM_CAP_GAINS";
    IncomeType[IncomeType["DIVIDEND"] = 2] = "DIVIDEND";
    IncomeType[IncomeType["INTEREST"] = 3] = "INTEREST";
    IncomeType[IncomeType["MISC"] = 4] = "MISC";
})(IncomeType || (IncomeType = {}));
function IncomeType_fromOfx(ofxVal) {
    if ("CGLONG" === ofxVal) {
        return IncomeType.LONG_TERM_CAP_GAINS;
    }
    else if ("CGSHORT" === ofxVal) {
        return IncomeType.SHORT_TERM_CAP_GAINS;
    }
    else if ("DIV" === ofxVal) {
        return IncomeType.DIVIDEND;
    }
    else if ("INTEREST" === ofxVal) {
        return IncomeType.INTEREST;
    }
    else if ("MISC" === ofxVal) {
        return IncomeType.MISC;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for investment income that is realized as cash into the investment account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class IncomeTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.INCOME);
    }
    /**
     * Gets the id of the security that the income was for. This is a required field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the security id of the security that the income was for
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that the income was for. This is a required field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param securityId the security id of the security that the income was for
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
     * capital gains), "DIV" (dividend), INTEREST, or MISC>
     * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
     *
     * @return the type of income
     */
    getIncomeType() {
        return this.incomeType;
    }
    /**
     * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
     * capital gains), "DIV" (dividend), INTEREST, or MISC>
     * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
     *
     * @param incomeType the type of income
     */
    setIncomeType(incomeType) {
        this.incomeType = incomeType;
    }
    /**
     * Gets the income type as one of the well-known types.
     *
     * @return the income type or null if it's not well known
     */
    getIncomeTypeEnum() {
        return IncomeType_fromOfx(this.getIncomeType());
    }
    /**
     * Gets the total income received.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total income received.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAcctSec the sub account type
     */
    setSubAccountSecurity(subAcctSec) {
        this.subAccountSecurity = subAcctSec;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund for the transaction
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAcctFund the sub account fund for the transaction
     */
    setSubAccountFund(subAcctFund) {
        this.subAccountFund = subAcctFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
    /**
     * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return whether the transaction was tax exempt
     */
    getTaxExempt() {
        return this.taxExempt;
    }
    /**
     * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param taxExempt whether the transaction was tax exempt
     */
    setTaxExempt(taxExempt) {
        this.taxExempt = taxExempt;
    }
    /**
     * Gets the withholding for the income. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the withholding
     */
    getWithholding() {
        return this.withholding;
    }
    /**
     * Sets the withholding for the income. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param withholding the withholding
     */
    setWithholding(withholding) {
        this.withholding = withholding;
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency info for the transaction
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrencyInfo the currency info for the transaction
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
     * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the state withholding
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401(k) source as one of the well-known types.
     *
     * @return the type of close or null if it's not well known.
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(IncomeTransaction, "INCOME");
ChildAggregate_add(IncomeTransaction, { required: true, order: 20, type: SecurityId, read: IncomeTransaction.prototype.getSecurityId, write: IncomeTransaction.prototype.setSecurityId });
Element_add(IncomeTransaction, { name: "INCOMETYPE", required: true, order: 30, type: String, read: IncomeTransaction.prototype.getIncomeType, write: IncomeTransaction.prototype.setIncomeType });
Element_add(IncomeTransaction, { name: "TOTAL", required: true, order: 40, type: Number, read: IncomeTransaction.prototype.getTotal, write: IncomeTransaction.prototype.setTotal });
Element_add(IncomeTransaction, { name: "SUBACCTSEC", order: 50, type: String, read: IncomeTransaction.prototype.getSubAccountSecurity, write: IncomeTransaction.prototype.setSubAccountSecurity });
Element_add(IncomeTransaction, { name: "SUBACCTFUND", order: 60, type: String, read: IncomeTransaction.prototype.getSubAccountFund, write: IncomeTransaction.prototype.setSubAccountFund });
Element_add(IncomeTransaction, { name: "TAXEXEMPT", order: 70, type: Boolean, read: IncomeTransaction.prototype.getTaxExempt, write: IncomeTransaction.prototype.setTaxExempt });
Element_add(IncomeTransaction, { name: "WITHHOLDING", order: 80, type: Number, read: IncomeTransaction.prototype.getWithholding, write: IncomeTransaction.prototype.setWithholding });
Element_add(IncomeTransaction, { name: "CURRENCY", order: 90, type: String, read: IncomeTransaction.prototype.getCurrencyCode, write: IncomeTransaction.prototype.setCurrencyCode });
ChildAggregate_add(IncomeTransaction, { order: 120, type: OriginalCurrency, read: IncomeTransaction.prototype.getOriginalCurrencyInfo, write: IncomeTransaction.prototype.setOriginalCurrencyInfo });
Element_add(IncomeTransaction, { name: "INV401KSOURCE", order: 110, type: String, read: IncomeTransaction.prototype.get401kSource, write: IncomeTransaction.prototype.set401kSource });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for an investment expense
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class InvestmentExpenseTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.INVESTMENT_EXPENSE);
    }
    /**
     * Gets the id of the security for the expense. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security for the expsense
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security for the expense. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security for the expsense
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the total for the expense.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total for the expense.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountSecurity the sub account type
     */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountFund the sub account fund
     */
    setSubAccountFund(subAccountFund) {
        this.subAccountFund = subAccountFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * code should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * sets the currency code for the transaction. Only one of currency code or original currency
     * code should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrencyInfo the original currency info for the transaction
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
     * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the 401k source
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the 401k source
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401k source as one of the well-known types.
     *
     * @return the 401k source or null if its not one of the well-known types
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(InvestmentExpenseTransaction, "INVEXPENSE");
ChildAggregate_add(InvestmentExpenseTransaction, { required: true, order: 20, type: SecurityId, read: InvestmentExpenseTransaction.prototype.getSecurityId, write: InvestmentExpenseTransaction.prototype.setSecurityId });
Element_add(InvestmentExpenseTransaction, { name: "TOTAL", required: true, order: 30, type: Number, read: InvestmentExpenseTransaction.prototype.getTotal, write: InvestmentExpenseTransaction.prototype.setTotal });
Element_add(InvestmentExpenseTransaction, { name: "SUBACCTSEC", order: 40, type: String, read: InvestmentExpenseTransaction.prototype.getSubAccountSecurity, write: InvestmentExpenseTransaction.prototype.setSubAccountSecurity });
Element_add(InvestmentExpenseTransaction, { name: "SUBACCTFUND", order: 50, type: String, read: InvestmentExpenseTransaction.prototype.getSubAccountFund, write: InvestmentExpenseTransaction.prototype.setSubAccountFund });
Element_add(InvestmentExpenseTransaction, { name: "CURRENCY", order: 60, type: String, read: InvestmentExpenseTransaction.prototype.getCurrencyCode, write: InvestmentExpenseTransaction.prototype.setCurrencyCode });
Element_add(InvestmentExpenseTransaction, { name: "ORIGCURRENCY", order: 70, type: OriginalCurrency, read: InvestmentExpenseTransaction.prototype.getOriginalCurrencyInfo, write: InvestmentExpenseTransaction.prototype.setOriginalCurrencyInfo });
Element_add(InvestmentExpenseTransaction, { name: "INV401KSOURCE", order: 180, type: String, read: InvestmentExpenseTransaction.prototype.get401kSource, write: InvestmentExpenseTransaction.prototype.set401kSource });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for journal fund transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class JournalFundTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.JOURNAL_FUND);
    }
    /**
     * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sub account type
     */
    getFromSubAccountFund() {
        return this.subAccountFrom;
    }
    /**
     * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param subAccountFrom the sub account type
     */
    setFromSubAccountFund(subAccountFrom) {
        this.subAccountFrom = subAccountFrom;
    }
    /**
     * Gets the result of getFromSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getFromSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getFromSubAccountFund());
    }
    /**
     * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sub account fund
     */
    getToSubAccountFund() {
        return this.subAccountTo;
    }
    /**
     * Sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param subAccountTo the sub account fund
     */
    setToSubAccountFund(subAccountTo) {
        this.subAccountTo = subAccountTo;
    }
    /**
     * Gets the result of getToSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getToSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getToSubAccountFund());
    }
    /**
     * Gets the total for the transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total for the transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
}
Aggregate_add(JournalFundTransaction, "JRNLFUND");
Element_add(JournalFundTransaction, { name: "SUBACCTFROM", order: 20, type: String, read: JournalFundTransaction.prototype.getFromSubAccountFund, write: JournalFundTransaction.prototype.setFromSubAccountFund });
Element_add(JournalFundTransaction, { name: "SUBACCTTO", order: 30, type: String, read: JournalFundTransaction.prototype.getToSubAccountFund, write: JournalFundTransaction.prototype.setToSubAccountFund });
Element_add(JournalFundTransaction, { name: "TOTAL", order: 40, type: Number, read: JournalFundTransaction.prototype.getTotal, write: JournalFundTransaction.prototype.setTotal });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class JournalSecurityTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.JOURNAL_SECURITY);
    }
    /**
     * Gets the id of the security that was transferred. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was bought
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that was transferred. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security that was bought
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sub account type
     */
    getFromSubAccountFund() {
        return this.subAccountFrom;
    }
    /**
     * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param subAccountFrom the sub account type
     */
    setFromSubAccountFund(subAccountFrom) {
        this.subAccountFrom = subAccountFrom;
    }
    /**
     * Gets the result of getFromSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getFromSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getFromSubAccountFund());
    }
    /**
     * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sub account fund
     */
    getToSubAccountFund() {
        return this.subAccountTo;
    }
    /**
     * sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param subAccountTo the sub account fund
     */
    setToSubAccountFund(subAccountTo) {
        this.subAccountTo = subAccountTo;
    }
    /**
     * Gets the result of getToSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getToSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getToSubAccountFund());
    }
    /**
     * Gets the total for the transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total for the transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
}
Aggregate_add(JournalSecurityTransaction, "JRNLSEC");
ChildAggregate_add(JournalSecurityTransaction, { required: true, order: 20, type: SecurityId, read: JournalSecurityTransaction.prototype.getSecurityId, write: JournalSecurityTransaction.prototype.setSecurityId });
Element_add(JournalSecurityTransaction, { name: "SUBACCTFROM", order: 30, type: String, read: JournalSecurityTransaction.prototype.getFromSubAccountFund, write: JournalSecurityTransaction.prototype.setFromSubAccountFund });
Element_add(JournalSecurityTransaction, { name: "SUBACCTTO", order: 40, type: String, read: JournalSecurityTransaction.prototype.getToSubAccountFund, write: JournalSecurityTransaction.prototype.setToSubAccountFund });
Element_add(JournalSecurityTransaction, { name: "TOTAL", order: 50, type: Number, read: JournalSecurityTransaction.prototype.getTotal, write: JournalSecurityTransaction.prototype.setTotal });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class MarginInterestTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.MARGIN_INTEREST);
    }
    /**
     * Gets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param subAccountFund the sub account type
     */
    setSubAccountFund(subAccountFund) {
        this.subAccountFund = subAccountFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountFundEnum() {
        var type = this.getSubAccountFund();
        return type != null ? SubAccountType[type] : null;
    }
    /**
     * Gets the total for the transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total for the transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction.
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction.
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction.
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrency the original currency info for the transaction.
     */
    setOriginalCurrencyInfo(originalCurrency) {
        this.originalCurrencyInfo = originalCurrency;
        this.currencyCode = null;
    }
}
Aggregate_add(MarginInterestTransaction, "MARGININTEREST");
Element_add(MarginInterestTransaction, { name: "SUBACCTFUND", order: 30, type: String, read: MarginInterestTransaction.prototype.getSubAccountFund, write: MarginInterestTransaction.prototype.setSubAccountFund });
Element_add(MarginInterestTransaction, { name: "TOTAL", order: 40, type: Number, read: MarginInterestTransaction.prototype.getTotal, write: MarginInterestTransaction.prototype.setTotal });
Element_add(MarginInterestTransaction, { name: "CURRENCY", order: 110, type: String, read: MarginInterestTransaction.prototype.getCurrencyCode, write: MarginInterestTransaction.prototype.setCurrencyCode });
Element_add(MarginInterestTransaction, { name: "ORIGCURRENCY", order: 120, type: OriginalCurrency, read: MarginInterestTransaction.prototype.getOriginalCurrencyInfo, write: MarginInterestTransaction.prototype.setOriginalCurrencyInfo });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of sale for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var OptionSellType;
(function (OptionSellType) {
    OptionSellType[OptionSellType["SELL_TO_CLOSE"] = 0] = "SELL_TO_CLOSE";
    OptionSellType[OptionSellType["SELL_TO_OPEN"] = 1] = "SELL_TO_OPEN";
})(OptionSellType || (OptionSellType = {}));
function OptionSellType_fromOfx(ofxVal) {
    if ("SELLTOOPEN" === ofxVal) {
        return OptionSellType.SELL_TO_OPEN;
    }
    else if ("SELLTOCLOSE" === ofxVal) {
        return OptionSellType.SELL_TO_CLOSE;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for reinvestment transactions.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class ReinvestIncomeTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.REINVEST_INCOME);
    }
    /**
     * Gets the id of the security that was reinvested in. This is a required field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was reinvested in
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that was reinvested in. This is a required field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security that was reinvested in
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
     * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
     *
     * @return the type of income
     */
    getIncomeType() {
        return this.incomeType;
    }
    /**
     * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
     * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
     *
     * @param incomeType the type of income
     */
    setIncomeType(incomeType) {
        this.incomeType = incomeType;
    }
    /**
     * Gets the type of income as one of the well-known types.
     *
     * @return the income type or null if it's not one of the well-known types
     */
    getIncomeTypeEnum() {
        return IncomeType_fromOfx(this.getIncomeType());
    }
    /**
     * Gets the total income received. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total income received. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountSecurity the sub account type
     */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the number of units of the security that was reinvested in. This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the number of units purchased
     */
    getUnits() {
        return this.units;
    }
    /**
     * Sets the number of units of the security that was reinvested in. This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param units the number of units purchased
     */
    setUnits(units) {
        this.units = units;
    }
    /**
     * Gets the price per commonly-quoted unit. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.unitPrice;
    }
    /**
     * Sets the price per commonly-quoted unit. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param unitPrice the per unit price
     */
    setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * Gets the transaction commission for the reinvestment. This is an optional field according to
     * the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction commision
     */
    getCommission() {
        return this.commission;
    }
    /**
     * Sets the transaction commission for the reinvestment. This is an optional field according to
     * the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param commission the transaction commision
     */
    setCommission(commission) {
        this.commission = commission;
    }
    /**
     * Gets the taxes for the reinvestment. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction taxes
     */
    getTaxes() {
        return this.taxes;
    }
    /**
     * Sets the taxes for the reinvestment. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param taxes the transaction taxes
     */
    setTaxes(taxes) {
        this.taxes = taxes;
    }
    /**
     * Gets the fees for the reinvestment. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the transaction fees
     */
    getFees() {
        return this.fees;
    }
    /**
     * Sets the fees for the reinvestment. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param fees the transaction fees
     */
    setFees(fees) {
        this.fees = fees;
    }
    /**
     * Gets the load for the reinvestment. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the load
     */
    getLoad() {
        return this.load;
    }
    /**
     * Sets the load for the reinvestment. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param load the load
     */
    setLoad(load) {
        this.load = load;
    }
    /**
     * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return whether the transaction was tax exempt
     */
    getTaxExempt() {
        return this.taxExempt;
    }
    /**
     * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param taxExempt whether the transaction was tax exempt
     */
    setTaxExempt(taxExempt) {
        this.taxExempt = taxExempt;
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction.
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrencyInfo the original currency info for the transaction.
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
     * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the state withholding
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401(k) source as one of the well-known types.
     *
     * @return the type of close or null if it's not well known
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(ReinvestIncomeTransaction, "REINVEST");
ChildAggregate_add(ReinvestIncomeTransaction, { required: true, order: 20, type: SecurityId, read: ReinvestIncomeTransaction.prototype.getSecurityId, write: ReinvestIncomeTransaction.prototype.setSecurityId });
Element_add(ReinvestIncomeTransaction, { name: "INCOMETYPE", required: true, order: 30, type: String, read: ReinvestIncomeTransaction.prototype.getIncomeType, write: ReinvestIncomeTransaction.prototype.setIncomeType });
Element_add(ReinvestIncomeTransaction, { name: "TOTAL", required: true, order: 40, type: Number, read: ReinvestIncomeTransaction.prototype.getTotal, write: ReinvestIncomeTransaction.prototype.setTotal });
Element_add(ReinvestIncomeTransaction, { name: "SUBACCTSEC", order: 50, type: String, read: ReinvestIncomeTransaction.prototype.getSubAccountSecurity, write: ReinvestIncomeTransaction.prototype.setSubAccountSecurity });
Element_add(ReinvestIncomeTransaction, { name: "UNITS", required: true, order: 60, type: Number, read: ReinvestIncomeTransaction.prototype.getUnits, write: ReinvestIncomeTransaction.prototype.setUnits });
Element_add(ReinvestIncomeTransaction, { name: "UNITPRICE", required: true, order: 70, type: Number, read: ReinvestIncomeTransaction.prototype.getUnitPrice, write: ReinvestIncomeTransaction.prototype.setUnitPrice });
Element_add(ReinvestIncomeTransaction, { name: "COMMISSION", order: 80, type: Number, read: ReinvestIncomeTransaction.prototype.getCommission, write: ReinvestIncomeTransaction.prototype.setCommission });
Element_add(ReinvestIncomeTransaction, { name: "TAXES", order: 90, type: Number, read: ReinvestIncomeTransaction.prototype.getTaxes, write: ReinvestIncomeTransaction.prototype.setTaxes });
Element_add(ReinvestIncomeTransaction, { name: "FEES", order: 100, type: Number, read: ReinvestIncomeTransaction.prototype.getFees, write: ReinvestIncomeTransaction.prototype.setFees });
Element_add(ReinvestIncomeTransaction, { name: "LOAD", order: 110, type: Number, read: ReinvestIncomeTransaction.prototype.getLoad, write: ReinvestIncomeTransaction.prototype.setLoad });
Element_add(ReinvestIncomeTransaction, { name: "TAXEXEMPT", order: 120, type: Boolean, read: ReinvestIncomeTransaction.prototype.getTaxExempt, write: ReinvestIncomeTransaction.prototype.setTaxExempt });
Element_add(ReinvestIncomeTransaction, { name: "CURRENCY", order: 130, type: String, read: ReinvestIncomeTransaction.prototype.getCurrencyCode, write: ReinvestIncomeTransaction.prototype.setCurrencyCode });
Element_add(ReinvestIncomeTransaction, { name: "ORIGCURRENCY", order: 140, type: OriginalCurrency, read: ReinvestIncomeTransaction.prototype.getOriginalCurrencyInfo, write: ReinvestIncomeTransaction.prototype.setOriginalCurrencyInfo });
Element_add(ReinvestIncomeTransaction, { name: "INV401KSOURCE", order: 150, type: String, read: ReinvestIncomeTransaction.prototype.get401kSource, write: ReinvestIncomeTransaction.prototype.set401kSource });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
* Related option transaction type.
* @see "Section 13.9.2.4.4, OFX Spec"
*
* @author Jon Perlow
*/
var RelatedOptionType;
(function (RelatedOptionType) {
    RelatedOptionType[RelatedOptionType["SPREAD"] = 0] = "SPREAD";
    RelatedOptionType[RelatedOptionType["STRADDLE"] = 1] = "STRADDLE";
    RelatedOptionType[RelatedOptionType["NONE"] = 2] = "NONE";
    RelatedOptionType[RelatedOptionType["OTHER"] = 3] = "OTHER";
})(RelatedOptionType || (RelatedOptionType = {}));
function RelatedOptionType_fromOfx(ofxVal) {
    if ("SPREAD" === ofxVal) {
        return RelatedOptionType.SPREAD;
    }
    else if ("STRADDLE" === ofxVal) {
        return RelatedOptionType.STRADDLE;
    }
    else if ("NONE" === ofxVal) {
        return RelatedOptionType.NONE;
    }
    else if ("OTHER" === ofxVal) {
        return RelatedOptionType.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for return of capital transactions.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class ReturnOfCapitalTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.RETURN_OF_CAPITAL);
    }
    /**
     * Gets the id of the security that capital was returned from. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that capital was returned from
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that capital was returned from. This is a required field according
     * to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security that capital was returned from
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the total amount of capital returned. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the total
     */
    getTotal() {
        return this.total;
    }
    /**
     * Sets the total amount of capital returned. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param total the total
     */
    setTotal(total) {
        this.total = total;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountSecurity the sub account type
     */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the sub account type that the transaction affects.
     * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type that the transaction affects.
     * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountFund the sub account fund
     */
    setSubAccountFund(subAccountFund) {
        this.subAccountFund = subAccountFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the currency code for the transaction. Only one of currency code or original currency
     * info should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param currencyCode the currency code for the transaction
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction.
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param originalCurrencyInfo the currency code for the transaction.
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
     * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the state withholding
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401(k) source as one of the well-known types.
     *
     * @return the type of close or null if it's not well known.
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(ReturnOfCapitalTransaction, "RETOFCAP");
ChildAggregate_add(ReturnOfCapitalTransaction, { required: true, order: 20, type: SecurityId, read: ReturnOfCapitalTransaction.prototype.getSecurityId, write: ReturnOfCapitalTransaction.prototype.setSecurityId });
Element_add(ReturnOfCapitalTransaction, { name: "TOTAL", required: true, order: 40, type: Number, read: ReturnOfCapitalTransaction.prototype.getTotal, write: ReturnOfCapitalTransaction.prototype.setTotal });
Element_add(ReturnOfCapitalTransaction, { name: "SUBACCTSEC", order: 50, type: String, read: ReturnOfCapitalTransaction.prototype.getSubAccountSecurity, write: ReturnOfCapitalTransaction.prototype.setSubAccountSecurity });
Element_add(ReturnOfCapitalTransaction, { name: "SUBACCTFUND", order: 140, type: String, read: ReturnOfCapitalTransaction.prototype.getSubAccountFund, write: ReturnOfCapitalTransaction.prototype.setSubAccountFund });
Element_add(ReturnOfCapitalTransaction, { name: "CURRENCY", order: 110, type: String, read: ReturnOfCapitalTransaction.prototype.getCurrencyCode, write: ReturnOfCapitalTransaction.prototype.setCurrencyCode });
Element_add(ReturnOfCapitalTransaction, { name: "ORIGCURRENCY", order: 120, type: OriginalCurrency, read: ReturnOfCapitalTransaction.prototype.getOriginalCurrencyInfo, write: ReturnOfCapitalTransaction.prototype.setOriginalCurrencyInfo });
Element_add(ReturnOfCapitalTransaction, { name: "INV401KSOURCE", order: 180, type: String, read: ReturnOfCapitalTransaction.prototype.get401kSource, write: ReturnOfCapitalTransaction.prototype.set401kSource });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Reason debt was sold.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var SellDebtReason;
(function (SellDebtReason) {
    SellDebtReason[SellDebtReason["CALL"] = 0] = "CALL";
    SellDebtReason[SellDebtReason["SELL"] = 1] = "SELL";
    SellDebtReason[SellDebtReason["MATURITY"] = 2] = "MATURITY";
})(SellDebtReason || (SellDebtReason = {}));
function SellDebtReason_fromOfx(ofxVal) {
    if ("CALL" === ofxVal) {
        return SellDebtReason.CALL;
    }
    else if ("SELL" === ofxVal) {
        return SellDebtReason.SELL;
    }
    else if ("MATURITY" === ofxVal) {
        return SellDebtReason.MATURITY;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for selling debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SellDebtTransaction extends BaseSellInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.SELL_DEBT);
    }
    /**
     * Gets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
     * "MATURITY" (the debt reached maturity).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return The reason for the sale
     */
    getSellReason() {
        return this.sellReason;
    }
    /**
     * Sets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
     * "MATURITY" (the debt reached maturity).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param sellReason The reason for the sale
     */
    setSellReason(sellReason) {
        this.sellReason = sellReason;
    }
    /**
     * Gets the sell reason as one of the well-known types.
     *
     * @return the sell reason or null if it's not well known
     */
    getSellReasonEnum() {
        return SellDebtReason_fromOfx(this.getSellReason());
    }
    /**
     * Gets the amount of accrued interest on the debt. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the amount of accrued interest
     */
    getAccruedInterest() {
        return this.accruedInterest;
    }
    /**
     * Sets the amount of accrued interest on the debt. This is an optional field according to the
     * OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param accruedInterest the amount of accrued interest
     */
    setAccruedInterest(accruedInterest) {
        this.accruedInterest = accruedInterest;
    }
}
Aggregate_add(SellDebtTransaction, "SELLDEBT");
Element_add(SellDebtTransaction, { name: "SELLREASON", order: 30, type: String, read: SellDebtTransaction.prototype.getSellReason, write: SellDebtTransaction.prototype.setSellReason });
Element_add(SellDebtTransaction, { name: "ACCRDINT", order: 40, type: Number, read: SellDebtTransaction.prototype.getAccruedInterest, write: SellDebtTransaction.prototype.setAccruedInterest });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of sale for stocks and mutual funds.
 *
 * @author Jon Perlow
 */
var SellType;
(function (SellType) {
    SellType[SellType["SELL"] = 0] = "SELL";
    SellType[SellType["SELL_SHORT"] = 1] = "SELL_SHORT";
})(SellType || (SellType = {}));
function SellType_fromOfx(ofxVal) {
    if ("SELL" === ofxVal) {
        return SellType.SELL;
    }
    else if ("SELLSHORT" === ofxVal) {
        return SellType.SELL_SHORT;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for selling mutual fund.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SellMutualFundTransaction extends BaseSellInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.SELL_MUTUAL_FUND);
    }
    /**
     * Gets the type of sale. One of "SELL" or "SELLSHORT".
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return The type of sale
     */
    getSellType() {
        return this.sellType;
    }
    /**
     * Sets the type of sale. One of "SELL" or "SELLSHORT".
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param sellType The type of sale
     */
    setSellType(sellType) {
        this.sellType = sellType;
    }
    /**
     * Gets the sell type as one of the well-known types.
     *
     * @return the type of sale or null if it's not known.
     */
    getSellTypeEnum() {
        return SellType_fromOfx(this.sellType);
    }
    /**
     * Gets the average cost basis of the sale.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return The average cost basis of the sale
     */
    getAverageCostBasis() {
        return this.averageCostBasis;
    }
    /**
     * Sets the average cost basis of the sale.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param averageCostBasis The average cost basis of the sale
     */
    setAverageCostBasis(averageCostBasis) {
        this.averageCostBasis = averageCostBasis;
    }
    /**
     * Gets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
     * This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the related transaction id
     */
    getRelatedTransactionId() {
        return this.relatedTransactionId;
    }
    /**
     * Sets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
     * This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param relatedTransactionId the related transaction id
     */
    setRelatedTransactionId(relatedTransactionId) {
        this.relatedTransactionId = relatedTransactionId;
    }
}
Aggregate_add(SellMutualFundTransaction, "SELLMF");
Element_add(SellMutualFundTransaction, { name: "SELLTYPE", order: 20, type: String, read: SellMutualFundTransaction.prototype.getSellType, write: SellMutualFundTransaction.prototype.setSellType });
Element_add(SellMutualFundTransaction, { name: "AVGCOSTBASIS", order: 30, type: Number, read: SellMutualFundTransaction.prototype.getAverageCostBasis, write: SellMutualFundTransaction.prototype.setAverageCostBasis });
Element_add(SellMutualFundTransaction, { name: "RELFITID", order: 40, type: String, read: SellMutualFundTransaction.prototype.getRelatedTransactionId, write: SellMutualFundTransaction.prototype.setRelatedTransactionId });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for selling options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SellOptionTransaction extends BaseSellInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.SELL_OPTION);
    }
    /**
     * Gets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the option sell type
     */
    getOptionSellType() {
        return this.optionSellType;
    }
    /**
     * Sets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param optionSellType the option sell type
     */
    setOptionSellType(optionSellType) {
        this.optionSellType = optionSellType;
    }
    /**
     * Gets the option sell type as one of the well-known types.
     *
     * @return the type of sale or null if it's not known.
     */
    getOptionSellTypeEnum() {
        return OptionSellType_fromOfx(this.optionSellType);
    }
    /**
     * Gets the number of shares per contact. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the number of shares per contact
     */
    getSharesPerContact() {
        return this.sharesPerContact;
    }
    /**
     * Sets the number of shares per contact. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param sharesPerContact the number of shares per contact
     */
    setSharesPerContact(sharesPerContact) {
        this.sharesPerContact = sharesPerContact;
    }
    /**
     * Gets a related transaction for the option sale for complex option transactions. This
     * is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return The related transaction id
     */
    getRelatedTransactionId() {
        return this.relatedTransactionId;
    }
    /**
     * Sets a related transaction for the option sale for complex option transactions. This
     * is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param relatedTransactionId The related transaction id
     */
    setRelatedTransactionId(relatedTransactionId) {
        this.relatedTransactionId = relatedTransactionId;
    }
    /**
     * Gets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
     * is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return The related tansaction type
     */
    getRelatedType() {
        return this.relatedType;
    }
    /**
     * Sets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
     * is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param relatedType The related tansaction type
     */
    setRelatedType(relatedType) {
        this.relatedType = relatedType;
    }
    /**
     * Gets the related transaction as one of the well-known types.
     *
     * @return the related tansaction type or null if it's not well known
     */
    getRelatedTypeEnum() {
        return RelatedOptionType_fromOfx(this.getRelatedType());
    }
    /**
     * Gets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return how the option sale is secured
     */
    getSecured() {
        return this.secured;
    }
    /**
     * Sets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param secured how the option sale is secured
     */
    setSecured(secured) {
        this.secured = secured;
    }
    /**
     * Gets how the option sale is secured as one of the well-known types.
     *
     * @return the type indicating how the option is secured or null if it's not well known.
     */
    getSecuredEnum() {
        return ShortOptionSecurity_fromOfx(this.getSecured());
    }
}
Aggregate_add(SellOptionTransaction, "SELLOPT");
Element_add(SellOptionTransaction, { name: "OPTSELLTYPE", required: true, order: 20, type: String, read: SellOptionTransaction.prototype.getOptionSellType, write: SellOptionTransaction.prototype.setOptionSellType });
Element_add(SellOptionTransaction, { name: "SHPERCTRCT", required: true, order: 30, type: Number, read: SellOptionTransaction.prototype.getSharesPerContact, write: SellOptionTransaction.prototype.setSharesPerContact });
Element_add(SellOptionTransaction, { name: "RELFITID", order: 40, type: String, read: SellOptionTransaction.prototype.getRelatedTransactionId, write: SellOptionTransaction.prototype.setRelatedTransactionId });
Element_add(SellOptionTransaction, { name: "RELTYPE", order: 50, type: String, read: SellOptionTransaction.prototype.getRelatedType, write: SellOptionTransaction.prototype.setRelatedType });
Element_add(SellOptionTransaction, { name: "SECURED", order: 60, type: String, read: SellOptionTransaction.prototype.getSecured, write: SellOptionTransaction.prototype.setSecured });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for buying other types of securities.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SellOtherTransaction extends BaseSellInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.SELL_OTHER);
    }
}
Aggregate_add(SellOtherTransaction, "SELLOTHER");

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for selling stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SellStockTransaction extends BaseSellInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.SELL_STOCK);
    }
    /**
     * Gets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @return the sell type
     */
    getSellType() {
        return this.sellType;
    }
    /**
     * Sets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @param sellType the sell type
     */
    setSellType(sellType) {
        this.sellType = sellType;
    }
    /**
     * Gets the sell type as one of the well-known types.
     *
     * @return the type of sale or null if it's not known
     */
    getSellTypeEnum() {
        return SellType_fromOfx(this.sellType);
    }
}
Aggregate_add(SellStockTransaction, "SELLSTOCK");
Element_add(SellStockTransaction, { name: "SELLTYPE", required: true, order: 20, type: String, read: SellStockTransaction.prototype.getSellType, write: SellStockTransaction.prototype.setSellType });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for a stock split.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SplitTransaction extends BaseOtherInvestmentTransaction {
    constructor() {
        super(InvestmentTransactionType.SPLIT);
    }
    /**
     * Gets the id of the security for the split. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security for the expsense
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security for the split. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security for the expsense
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account type
     */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
     * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
     * required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountSecurity the sub account type
     */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the old number of units for the split. This is a required field according to the OFX
     * spec.
     *
     * @return the old number of units.
     */
    getOldUnits() {
        return this.oldUnits;
    }
    /**
     * Sets the old number of units for the split. This is a  equired field according to the OFX
     * spec.
     *
     * @param oldUnits the old number of units.
     */
    setOldUnits(oldUnits) {
        this.oldUnits = oldUnits;
    }
    /**
     * Gets the new number of units for the split. This is a required field according to the OFX
     * spec.
     *
     * @return the new number of units.
     */
    getNewUnits() {
        return this.newUnits;
    }
    /**
     * Sets the new number of units for the split. This is a required field according to the OFX
     * spec.
     *
     * @param newUnits the new number of units.
     */
    setNewUnits(newUnits) {
        this.newUnits = newUnits;
    }
    /**
     * Gets the numerator for the split ratio. This is a required field according to the OFX spec.
     *
     * @return the numerator for the split ratio
     */
    getNumerator() {
        return this.numerator;
    }
    /**
     * Sets the numerator for the split ratio. This is a required field according to the OFX spec.
     *
     * @param numerator the numerator for the split ratio
     */
    setNumerator(numerator) {
        this.numerator = numerator;
    }
    /**
     * Gets the denominator for the split ratio. This is a required field according to the OFX spec.
     *
     * @return the numerator for the split ratio
     */
    getDenominator() {
        return this.denominator;
    }
    /**
     * Sets the denominator for the split ratio. This is a required field according to the OFX spec.
     *
     * @param denominator the numerator for the split ratio
     */
    setDenominator(denominator) {
        this.denominator = denominator;
    }
    /**
     * Gets the currency code for the transaction. Only one of currency code or original currency
     * code should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * sets the currency code for the transaction. Only one of currency code or original currency
     * code should be set according to the OFX spec. If neither are set, means the default currency.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the currency code for the transaction
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
        this.originalCurrencyInfo = null;
    }
    /**
     * Gets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction
     */
    getOriginalCurrencyInfo() {
        return this.originalCurrencyInfo;
    }
    /**
     * Sets the original currency info for the transaction.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the original currency info for the transaction
     */
    setOriginalCurrencyInfo(originalCurrencyInfo) {
        this.originalCurrencyInfo = originalCurrencyInfo;
        this.currencyCode = null;
    }
    /**
     * Gets the cash for fractional units.
     *
     * @return the cash for fractional units
     */
    getCashForFractionalUnits() {
        return this.cashForFractionalUnits;
    }
    /**
     * Sets the cash for fractional units.
     *
     * @param cashForFractionalUnits the cash for fractional units
     */
    setCashForFractionalUnits(cashForFractionalUnits) {
        this.cashForFractionalUnits = cashForFractionalUnits;
    }
    /**
     * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the sub account fund
     */
    getSubAccountFund() {
        return this.subAccountFund;
    }
    /**
     * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param subAccountFund the sub account fund
     */
    setSubAccountFund(subAccountFund) {
        this.subAccountFund = subAccountFund;
    }
    /**
     * Gets the result of getSubAccountFund as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types
     */
    getSubAccountFundEnum() {
        return SubAccountType_fromOfx(this.getSubAccountFund());
    }
    /**
     * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the 401k source
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the 401k source
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401k source as one of the well-known types.
     *
     * @return the 401k source or null if its not one of the well-known types
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(SplitTransaction, "SPLIT");
ChildAggregate_add(SplitTransaction, { required: true, order: 20, type: SecurityId, read: SplitTransaction.prototype.getSecurityId, write: SplitTransaction.prototype.setSecurityId });
Element_add(SplitTransaction, { name: "SUBACCTSEC", order: 30, type: String, read: SplitTransaction.prototype.getSubAccountSecurity, write: SplitTransaction.prototype.setSubAccountSecurity });
Element_add(SplitTransaction, { name: "OLDUNITS", order: 40, type: Number, read: SplitTransaction.prototype.getOldUnits, write: SplitTransaction.prototype.setOldUnits });
Element_add(SplitTransaction, { name: "NEWUNITS", order: 50, type: Number, read: SplitTransaction.prototype.getNewUnits, write: SplitTransaction.prototype.setNewUnits });
Element_add(SplitTransaction, { name: "NUMERATOR", order: 60, type: Number, read: SplitTransaction.prototype.getNumerator, write: SplitTransaction.prototype.setNumerator });
Element_add(SplitTransaction, { name: "DENOMINATOR", order: 70, type: Number, read: SplitTransaction.prototype.getDenominator, write: SplitTransaction.prototype.setDenominator });
Element_add(SplitTransaction, { name: "CURRENCY", order: 80, type: String, read: SplitTransaction.prototype.getCurrencyCode, write: SplitTransaction.prototype.setCurrencyCode });
Element_add(SplitTransaction, { name: "ORIGCURRENCY", order: 90, type: OriginalCurrency, read: SplitTransaction.prototype.getOriginalCurrencyInfo, write: SplitTransaction.prototype.setOriginalCurrencyInfo });
Element_add(SplitTransaction, { name: "FRACCASH", order: 100, type: Number, read: SplitTransaction.prototype.getCashForFractionalUnits, write: SplitTransaction.prototype.setCashForFractionalUnits });
Element_add(SplitTransaction, { name: "SUBACCTFUND", order: 110, type: String, read: SplitTransaction.prototype.getSubAccountFund, write: SplitTransaction.prototype.setSubAccountFund });
Element_add(SplitTransaction, { name: "INV401KSOURCE", order: 120, type: String, read: SplitTransaction.prototype.get401kSource, write: SplitTransaction.prototype.set401kSource });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of transfer.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var TransferAction;
(function (TransferAction) {
    TransferAction[TransferAction["IN"] = 0] = "IN";
    TransferAction[TransferAction["OUT"] = 1] = "OUT";
})(TransferAction || (TransferAction = {}));
function TransferAction_fromOfx(ofxVal) {
    if ("IN" === ofxVal) {
        return TransferAction.IN;
    }
    else if ("OUT" === ofxVal) {
        return TransferAction.OUT;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Transaction for transfers.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class TransferInvestmentTransaction extends BaseOtherInvestmentTransaction {
    // TODO (jonp) -- INVACCTFROM
    constructor() {
        super(InvestmentTransactionType.TRANSFER);
    }
    /**
     * Gets the id of the security that was transferred. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the security id of the security that was transferred
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the id of the security that was transferred. This is a required field according to the OFX
     * spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param securityId the security id of the security that was transferred
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
      * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
      * @see "Section 13.9.2.4.3, OFX Spec"
      *
      * @return the sub account type
      */
    getSubAccountSecurity() {
        return this.subAccountSecurity;
    }
    /**
      * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
      * @see "Section 13.9.2.4.3, OFX Spec"
      *
      * @param subAccountSecurity the sub account type
      */
    setSubAccountSecurity(subAccountSecurity) {
        this.subAccountSecurity = subAccountSecurity;
    }
    /**
     * Gets the result of getSubAccountSecurity as one of the well-known types.
     *
     * @return the type of null if it wasn't one of the well known types.
     */
    getSubAccountSecurityEnum() {
        return SubAccountType_fromOfx(this.getSubAccountSecurity());
    }
    /**
     * Gets the number of units of the security that was transferred. For security-based actions other
     * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the number of units transferred
     */
    getUnits() {
        return this.units;
    }
    /**
     * Sets the number of units of the security that was transferred. For security-based actions other
     * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
     * is the number of shares. For bonds, this is the face value. For options, this is the number of
     * contacts. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param units the number of units transferred
     */
    setUnits(units) {
        this.units = units;
    }
    /**
     * Gets the type of transfer. One of "IN" or "OUT". This is a required field according to the
     * OFX spec.
     *
     * @return the type of transfer
     */
    getTransferAction() {
        return this.transferAction;
    }
    /**
     * Sets the type of transfer. One of "IN" or "OUT". This is a required field according to the
     * OFX spec.
     *
     * @param transferAction the type of transfer
     */
    setTransferAction(transferAction) {
        this.transferAction = transferAction;
    }
    /**
     * Gets the transfer action as one of the well-known types.
     *
     * @return the type of transfer or null if it's not well known
     */
    getTransferActionEnum() {
        return TransferAction_fromOfx(this.getTransferAction());
    }
    /**
     * Gets the type of position. One of "LONG" or "SHORT". This is a required field according to the
     * OFX spec.
     *
     * @return the position type
     */
    getPositionType() {
        return this.positionType;
    }
    /**
     * Sets the type of position. One of "LONG" or "SHORT". This is a required field according to the
     * OFX spec.
     *
     * @param positionType the position type
     */
    setPositionType(positionType) {
        this.positionType = positionType;
    }
    /**
     * Gets the position type as one of the well-known types.
     *
     * @return the position type or null if it's not well known
     */
    getPositionTypeEnum() {
        return PositionType_fromOfx(this.getPositionType());
    }
    /**
     * Gets the average cost basis for the securities being transfered. This is an optional field
     * according to the ofx spec.
     *
     * @return the average cost basis
     */
    getAverageCostBasis() {
        return this.averageCostBasis;
    }
    /**
     * Sets the average cost basis for the securities being transfered. This is an optional field
     * according to the ofx spec.
     *
     * @param averageCostBasis the average cost basis
     */
    setAverageCostBasis(averageCostBasis) {
        this.averageCostBasis = averageCostBasis;
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.unitPrice;
    }
    /**
     * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a required field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param unitPrice the per unit price
     */
    setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * Gets the original date of purchase for the securities. This is an optional field according to
     * the ofx spec.
     *
     * @return the original date of purchase
     */
    getPurchaseDate() {
        return this.purchaseDate;
    }
    /**
     * Sets the original date of purchase for the securities. This is an optional field according to
     * the ofx spec.
     *
     * @param purchaseDate the original date of purchase
     */
    setPurchaseDate(purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
    /**
     * Gets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the state withholding
     */
    get401kSource() {
        return this.inv401kSource;
    }
    /**
     * Sets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
     * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
     * according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param inv401kSource the state withholding
     */
    set401kSource(inv401kSource) {
        this.inv401kSource = inv401kSource;
    }
    /**
     * Gets the 401(k) source as one of the well-known types.
     *
     * @return the type of close or null if it's not well known.
     */
    get401kSourceEnum() {
        return Inv401KSource_fromOfx(this.get401kSource());
    }
}
Aggregate_add(TransferInvestmentTransaction, "TRANSFER");
ChildAggregate_add(TransferInvestmentTransaction, { required: true, order: 20, type: SecurityId, read: TransferInvestmentTransaction.prototype.getSecurityId, write: TransferInvestmentTransaction.prototype.setSecurityId });
Element_add(TransferInvestmentTransaction, { name: "SUBACCTSEC", order: 30, type: String, read: TransferInvestmentTransaction.prototype.getSubAccountSecurity, write: TransferInvestmentTransaction.prototype.setSubAccountSecurity });
Element_add(TransferInvestmentTransaction, { name: "UNITS", required: true, order: 40, type: Number, read: TransferInvestmentTransaction.prototype.getUnits, write: TransferInvestmentTransaction.prototype.setUnits });
Element_add(TransferInvestmentTransaction, { name: "TFERACTION", required: true, order: 50, type: String, read: TransferInvestmentTransaction.prototype.getTransferAction, write: TransferInvestmentTransaction.prototype.setTransferAction });
Element_add(TransferInvestmentTransaction, { name: "POSTYPE", required: true, order: 60, type: String, read: TransferInvestmentTransaction.prototype.getPositionType, write: TransferInvestmentTransaction.prototype.setPositionType });
Element_add(TransferInvestmentTransaction, { name: "AVGCOSTBASIS", order: 70, type: Number, read: TransferInvestmentTransaction.prototype.getAverageCostBasis, write: TransferInvestmentTransaction.prototype.setAverageCostBasis });
Element_add(TransferInvestmentTransaction, { name: "UNITPRICE", required: true, order: 80, type: Number, read: TransferInvestmentTransaction.prototype.getUnitPrice, write: TransferInvestmentTransaction.prototype.setUnitPrice });
Element_add(TransferInvestmentTransaction, { name: "DTPURCHASE", order: 90, type: Date, read: TransferInvestmentTransaction.prototype.getPurchaseDate, write: TransferInvestmentTransaction.prototype.setPurchaseDate });
Element_add(TransferInvestmentTransaction, { name: "INV401KSOURCE", order: 100, type: String, read: TransferInvestmentTransaction.prototype.get401kSource, write: TransferInvestmentTransaction.prototype.set401kSource });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
var SynchronizationCapability;
(function (SynchronizationCapability) {
    SynchronizationCapability[SynchronizationCapability["FULL"] = 0] = "FULL";
    SynchronizationCapability[SynchronizationCapability["LITE"] = 1] = "LITE";
})(SynchronizationCapability || (SynchronizationCapability = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Core information about a specific version of a specific message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
class CoreMessageSetInfo {
    constructor() {
        this.version = "1";
        this.language = "ENG"; //Locale.US.getISO3Language();
    }
    /**
     * Version of the message set.
     *
     * @return The version of the message set.
     */
    getVersion() {
        return this.version;
    }
    /**
     * The version of the message set.
     *
     * @param version The version of the message set.
     */
    setVersion(version) {
        this.version = version;
    }
    /**
     * The name of the service provider (sometimes the message set processing is outsourced).
     *
     * @return The name of the service provider (sometimes the message set processing is outsourced).
     */
    getServiceProviderName() {
        return this.serviceProviderName;
    }
    /**
     * The name of the service provider (sometimes the message set processing is outsourced).
     *
     * @param serviceProviderName The name of the service provider (sometimes the message set processing is outsourced).
     */
    setServiceProviderName(serviceProviderName) {
        this.serviceProviderName = serviceProviderName;
    }
    /**
     * The URL at which the message set is processed.
     *
     * @return The URL at which the message set is processed.
     */
    getUrl() {
        return this.url;
    }
    /**
     * The URL at which the message set is processed.
     *
     * @param url The URL at which the message set is processed.
     */
    setUrl(url) {
        this.url = url;
    }
    /**
     * The application-level security required for this message set.
     *
     * @return The application-level security required for this message set.
     */
    getSecurity() {
        return this.security;
    }
    /**
     * The application-level security required for this message set.
     *
     * @param security The application-level security required for this message set.
     */
    setSecurity(security) {
        this.security = security;
    }
    /**
     * Whether transport-level security is required for this message set.
     *
     * @return Whether transport-level security is required for this message set.
     */
    getSslRequired() {
        return this.sslRequired;
    }
    /**
     * Whether transport-level security is required for this message set.
     *
     * @param sslRequired Whether transport-level security is required for this message set.
     */
    setSslRequired(sslRequired) {
        this.sslRequired = sslRequired;
    }
    /**
     * The sign-on realm.
     *
     * @return The sign-on realm.
     */
    getRealm() {
        return this.realm;
    }
    /**
     * The sign-on realm.
     *
     * @param realm The sign-on realm.
     */
    setRealm(realm) {
        this.realm = realm;
    }
    /**
     * The language.
     *
     * @return The language.
     * @see java.util.Locale#getISO3Language()
     */
    getLanguage() {
        return this.language;
    }
    /**
     * The language.
     *
     * @param language The language.
     */
    setLanguage(language) {
        this.language = language;
    }
    /**
     * The synchronization capability for this message set.
     *
     * @return The synchronization capability for this message set.
     */
    getSyncCapability() {
        return this.syncCapability;
    }
    /**
     * The synchronization capability for this message set.
     *
     * @param syncCapability The synchronization capability for this message set.
     */
    setSyncCapability(syncCapability) {
        this.syncCapability = syncCapability;
    }
    /**
     * Whether there exists support for resposne-file based error recovery.
     *
     * @return Whether there exists support for resposne-file based error recovery.
     */
    getFileBasedErrorRecoverySupport() {
        return this.fileBasedErrorRecoverySupport;
    }
    /**
     * Whether there exists support for resposne-file based error recovery.
     *
     * @param fileBasedErrorRecoverySupport Whether there exists support for resposne-file based error recovery.
     */
    setFileBasedErrorRecoverySupport(fileBasedErrorRecoverySupport) {
        this.fileBasedErrorRecoverySupport = fileBasedErrorRecoverySupport;
    }
    /**
     * Gets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
     * it. It likely is some type of timeout in seconds.
     *
     * @return the "INTU.TIMEOUT" property
     */
    getIntuTimeout() {
        return this.timeout;
    }
    /**
     * Sets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
     * it. It likely is some type of timeout in seconds.
     *
     * @param timeout the "INTU.TIMEOUT" property
     */
    setIntuTimeout(timeout) {
        this.timeout = timeout;
    }
}
Aggregate_add(CoreMessageSetInfo, "MSGSETCORE");
Element_add(CoreMessageSetInfo, { name: "VER", required: true, order: 0, type: String, read: CoreMessageSetInfo.prototype.getVersion, write: CoreMessageSetInfo.prototype.setVersion });
Element_add(CoreMessageSetInfo, { name: "SPNAME", order: 10, type: String, read: CoreMessageSetInfo.prototype.getServiceProviderName, write: CoreMessageSetInfo.prototype.setServiceProviderName });
Element_add(CoreMessageSetInfo, { name: "URL", required: true, order: 20, type: String, read: CoreMessageSetInfo.prototype.getUrl, write: CoreMessageSetInfo.prototype.setUrl });
Element_add(CoreMessageSetInfo, { name: "OFXSEC", required: true, order: 30, type: ApplicationSecurity, read: CoreMessageSetInfo.prototype.getSecurity, write: CoreMessageSetInfo.prototype.setSecurity });
Element_add(CoreMessageSetInfo, { name: "TRANSPSEC", required: true, order: 40, type: Boolean, read: CoreMessageSetInfo.prototype.getSslRequired, write: CoreMessageSetInfo.prototype.setSslRequired });
Element_add(CoreMessageSetInfo, { name: "SIGNONREALM", required: true, order: 50, type: String, read: CoreMessageSetInfo.prototype.getRealm, write: CoreMessageSetInfo.prototype.setRealm });
Element_add(CoreMessageSetInfo, { name: "LANGUAGE", required: true, order: 60, type: String, read: CoreMessageSetInfo.prototype.getLanguage, write: CoreMessageSetInfo.prototype.setLanguage });
Element_add(CoreMessageSetInfo, { name: "SYNCMODE", required: true, order: 70, type: SynchronizationCapability, read: CoreMessageSetInfo.prototype.getSyncCapability, write: CoreMessageSetInfo.prototype.setSyncCapability });
Element_add(CoreMessageSetInfo, { name: "RESPFILEER", required: true, order: 80, type: Boolean, read: CoreMessageSetInfo.prototype.getFileBasedErrorRecoverySupport, write: CoreMessageSetInfo.prototype.setFileBasedErrorRecoverySupport });
Element_add(CoreMessageSetInfo, { name: "INTU.TIMEOUT", order: 90, type: Number, read: CoreMessageSetInfo.prototype.getIntuTimeout, write: CoreMessageSetInfo.prototype.setIntuTimeout });

/**
 * Information specific to a version of a message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
class VersionSpecificMessageSetInfo {
    /**
     * The information core.
     *
     * @return The information core.
     */
    getCore() {
        return this.core;
    }
    /**
     * The information core.
     *
     * @param core The information core.
     */
    setCore(core) {
        this.core = core;
    }
    getVersion() {
        return this.core != null ? this.core.getVersion() : null;
    }
    getServiceProviderName() {
        return this.core != null ? this.core.getServiceProviderName() : null;
    }
    getUrl() {
        return this.core != null ? this.core.getUrl() : null;
    }
    getSecurity() {
        return this.core != null ? this.core.getSecurity() : null;
    }
    isSslRequired() {
        return this.core != null && this.core.getSslRequired() != null ? this.core.getSslRequired() : true;
    }
    getRealm() {
        return this.core != null ? this.core.getRealm() : null;
    }
    getLanguage() {
        return this.core != null ? this.core.getLanguage() : null;
    }
    getSyncCapability() {
        return this.core != null ? this.core.getSyncCapability() : null;
    }
    hasFileBasedErrorRecoverySupport() {
        return this.core != null && this.core.getFileBasedErrorRecoverySupport() != null ? this.core.getFileBasedErrorRecoverySupport() : false;
    }
}
ChildAggregate_add(VersionSpecificMessageSetInfo, { order: 0, type: CoreMessageSetInfo, read: VersionSpecificMessageSetInfo.prototype.getCore, write: VersionSpecificMessageSetInfo.prototype.setCore });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Information about a message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
class AbstractMessageSetInfo {
    /**
     * List of information about a message set for each version supported.
     *
     * @return List of information about a message set for each version supported.
     */
    getVersionSpecificInformationList() {
        return this.versionSpecificInformationList;
    }
    /**
     * List of information about a message set for each version supported.
     *
     * @param versionSpecificInformationList List of information about a message set for each version supported.
     */
    setVersionSpecificInformationList(versionSpecificInformationList) {
        this.versionSpecificInformationList = versionSpecificInformationList;
    }
}
ChildAggregate_add(AbstractMessageSetInfo, { order: 0, type: Array, collectionEntryType: VersionSpecificMessageSetInfo, read: AbstractMessageSetInfo.prototype.getVersionSpecificInformationList, write: AbstractMessageSetInfo.prototype.setVersionSpecificInformationList });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7.2.2, OFX Spec"
 */
var CharacterType;
(function (CharacterType) {
    CharacterType[CharacterType["ALPHAONLY"] = 0] = "ALPHAONLY";
    CharacterType[CharacterType["NUMERICONLY"] = 1] = "NUMERICONLY";
    CharacterType[CharacterType["ALPHAORNUMERIC"] = 2] = "ALPHAORNUMERIC";
    CharacterType[CharacterType["ALPHAANDNUMERIC"] = 3] = "ALPHAANDNUMERIC";
})(CharacterType || (CharacterType = {}));

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7.2, OFX Spec"
 */
class MessageSetInfoList {
    /**
     * The list of information for each message set.
     *
     * @return The list of information for each message set.
     */
    getInformationList() {
        return this.informationList;
    }
    /**
     * The list of information for each message set.
     *
     * @param informationList The list of information for each message set.
     */
    setInformationList(informationList) {
        this.informationList = informationList;
    }
}
Aggregate_add(MessageSetInfoList, "MSGSETLIST");
ChildAggregate_add(MessageSetInfoList, { order: 0, type: Array, collectionEntryType: AbstractMessageSetInfo, read: MessageSetInfoList.prototype.getInformationList, write: MessageSetInfoList.prototype.setInformationList });

/**
 * Sign-on information
 *
 * @author Ryan Heaton
 * @see "Section 7.2.2, OFX Spec"
 */
class SignonInfo {
    constructor() {
        this.passwordCaseSensitive = true;
        this.passwordSpecialCharsAllowed = true;
        this.passwordSpacesAllowed = true;
    }
    /**
     * The name of the sign-on realm.
     *
     * @return The name of the sign-on realm.
     */
    getRealm() {
        return this.realm;
    }
    /**
     * The name of the sign-on realm.
     *
     * @param realm The name of the sign-on realm.
     */
    setRealm(realm) {
        this.realm = realm;
    }
    /**
     * The minimum number of password characters.
     *
     * @return The minimum number of password characters.
     */
    getMinPasswordCharacters() {
        return this.minPasswordCharacters;
    }
    /**
     * The minimum number of password characters.
     *
     * @param minPasswordCharacters The minimum number of password characters.
     */
    setMinPasswordCharacters(minPasswordCharacters) {
        this.minPasswordCharacters = minPasswordCharacters;
    }
    /**
     * The maximum number of password characters.
     *
     * @return The maximum number of password characters.
     */
    getMaxPasswordCharacters() {
        return this.maxPasswordCharacters;
    }
    /**
     * The maximum number of password characters.
     *
     * @param maxPasswordCharacters The maximum number of password characters.
     */
    setMaxPasswordCharacters(maxPasswordCharacters) {
        this.maxPasswordCharacters = maxPasswordCharacters;
    }
    /**
     * The type of password characters supported.
     *
     * @return The type of password characters supported.
     */
    getPasswordCharacterType() {
        return this.passwordCharacterType;
    }
    /**
     * The type of password characters supported.
     *
     * @param passwordCharacterType The type of password characters supported.
     */
    setPasswordCharacterType(passwordCharacterType) {
        this.passwordCharacterType = passwordCharacterType;
    }
    /**
     * Whether the password is case-sensitive.
     *
     * @return Whether the password is case-sensitive.
     */
    getPasswordCaseSensitive() {
        return this.passwordCaseSensitive;
    }
    /**
     * Whether the password is case-sensitive.
     *
     * @param passwordCaseSensitive Whether the password is case-sensitive.
     */
    setPasswordCaseSensitive(passwordCaseSensitive) {
        this.passwordCaseSensitive = passwordCaseSensitive;
    }
    /**
     * Whether special characters are allowed in the password.
     *
     * @return Whether special characters are allowed in the password.
     */
    getPasswordSpecialCharsAllowed() {
        return this.passwordSpecialCharsAllowed;
    }
    /**
     * Whether special characters are allowed in the password.
     *
     * @param passwordSpecialCharsAllowed Whether special characters are allowed in the password.
     */
    setPasswordSpecialCharsAllowed(passwordSpecialCharsAllowed) {
        this.passwordSpecialCharsAllowed = passwordSpecialCharsAllowed;
    }
    /**
     * Whether spaces are allowed in the password.
     *
     * @return Whether spaces are allowed in the password.
     */
    getPasswordSpacesAllowed() {
        return this.passwordSpacesAllowed;
    }
    /**
     * Whether spaces are allowed in the password.
     *
     * @param passwordSpacesAllowed Whether spaces are allowed in the password.
     */
    setPasswordSpacesAllowed(passwordSpacesAllowed) {
        this.passwordSpacesAllowed = passwordSpacesAllowed;
    }
    /**
     * Whether the server can process a password change request for this realm.
     *
     * @return Whether the server can process a password change request for this realm.
     */
    getChangePasswordSupported() {
        return this.changePasswordSupported;
    }
    /**
     * Whether the server can process a password change request for this realm.
     *
     * @param changePasswordSupported Whether the server can process a password change request for this realm.
     */
    setChangePasswordSupported(changePasswordSupported) {
        this.changePasswordSupported = changePasswordSupported;
    }
    /**
     * Whether the server requires the user to change their password as part of their first signon.
     *
     * @return Whether the server requires the user to change their password as part of their first signon.
     */
    getChangePasswordFirstRequired() {
        return this.changePasswordFirstRequired;
    }
    /**
     * Whether the server requires the user to change their password as part of their first signon.
     *
     * @param changePasswordFirstRequired Whether the server requires the user to change their password as part of their first signon.
     */
    setChangePasswordFirstRequired(changePasswordFirstRequired) {
        this.changePasswordFirstRequired = changePasswordFirstRequired;
    }
    /**
     * Label for a set of additional credentials that the user must supply.
     *
     * @return Label for a set of additional credentials that the user must supply.
     */
    getAdditionalCredientialsLabel1() {
        return this.additionalCredientialsLabel1;
    }
    /**
     * Label for a set of additional credentials that the user must supply.
     *
     * @param additionalCredientialsLabel1 Label for a set of additional credentials that the user must supply.
     */
    setAdditionalCredientialsLabel1(additionalCredientialsLabel1) {
        this.additionalCredientialsLabel1 = additionalCredientialsLabel1;
    }
    /**
     * Label for a set of additional credentials that the user must supply.
     *
     * @return Label for a set of additional credentials that the user must supply.
     */
    getAdditionalCredientialsLabel2() {
        return this.additionalCredientialsLabel2;
    }
    /**
     * Label for a set of additional credentials that the user must supply.
     *
     * @param additionalCredientialsLabel2 Label for a set of additional credentials that the user must supply.
     */
    setAdditionalCredientialsLabel2(additionalCredientialsLabel2) {
        this.additionalCredientialsLabel2 = additionalCredientialsLabel2;
    }
    /**
     * Whether a client UID is required for teh sign-on.
     *
     * @return Whether a client UID is required for teh sign-on.
     */
    getClientUIDRequired() {
        return this.clientUIDRequired;
    }
    /**
     * Whether a client UID is required for teh sign-on.
     *
     * @param clientUIDRequired Whether a client UID is required for teh sign-on.
     */
    setClientUIDRequired(clientUIDRequired) {
        this.clientUIDRequired = clientUIDRequired;
    }
    /**
     * Whether an auth token is required for the sign-on.
     *
     * @return Whether an auth token is required for the sign-on.
     */
    getAuthTokenRequiredForFirstSignon() {
        return this.authTokenRequiredForFirstSignon;
    }
    /**
     * Whether an auth token is required for the sign-on.
     *
     * @param authTokenRequiredForFirstSignon
     *         Whether an auth token is required for the sign-on.
     */
    setAuthTokenRequiredForFirstSignon(authTokenRequiredForFirstSignon) {
        this.authTokenRequiredForFirstSignon = authTokenRequiredForFirstSignon;
    }
    /**
     * The label of the auth token.
     *
     * @return The label of the auth token.
     */
    getAuthTokenLabel() {
        return this.authTokenLabel;
    }
    /**
     * The label of the auth token.
     *
     * @param authTokenLabel The label of the auth token.
     */
    setAuthTokenLabel(authTokenLabel) {
        this.authTokenLabel = authTokenLabel;
    }
    /**
     * The URL for the auth token information.
     *
     * @return The URL for the auth token information.
     */
    getAuthTokenInfoURL() {
        return this.authTokenInfoURL;
    }
    /**
     * The URL for the auth token information.
     *
     * @param authTokenInfoURL The URL for the auth token information.
     */
    setAuthTokenInfoURL(authTokenInfoURL) {
        this.authTokenInfoURL = authTokenInfoURL;
    }
    /**
     * Whether MFA is supported.
     *
     * @return Whether MFA is supported.
     */
    getMfaSupported() {
        return this.mfaSupported;
    }
    /**
     * Whether MFA is supported.
     *
     * @param mfaSupported Whether MFA is supported.
     */
    setMfaSupported(mfaSupported) {
        this.mfaSupported = mfaSupported;
    }
    /**
     * Whether an MFA challenge request is required for the first sign-on into this realm.
     *
     * @return Whether an MFA challenge request is required for the first sign-on into this realm.
     */
    getMfaChallengeRequiredForFirstSignon() {
        return this.mfaChallengeRequiredForFirstSignon;
    }
    /**
     * Whether an MFA challenge request is required for the first sign-on into this realm.
     *
     * @param mfaChallengeRequiredForFirstSignon
     *         Whether an MFA challenge request is required for the first sign-on into this realm.
     */
    setMfaChallengeRequiredForFirstSignon(mfaChallengeRequiredForFirstSignon) {
        this.mfaChallengeRequiredForFirstSignon = mfaChallengeRequiredForFirstSignon;
    }
}
Aggregate_add(SignonInfo, "SIGNONINFO");
Element_add(SignonInfo, { name: "SIGNONREALM", required: true, order: 0, type: String, read: SignonInfo.prototype.getRealm, write: SignonInfo.prototype.setRealm });
Element_add(SignonInfo, { name: "MIN", required: true, order: 10, type: Number, read: SignonInfo.prototype.getMinPasswordCharacters, write: SignonInfo.prototype.setMinPasswordCharacters });
Element_add(SignonInfo, { name: "MAX", required: true, order: 20, type: Number, read: SignonInfo.prototype.getMaxPasswordCharacters, write: SignonInfo.prototype.setMaxPasswordCharacters });
Element_add(SignonInfo, { name: "CHARTYPE", required: true, order: 30, type: CharacterType, read: SignonInfo.prototype.getPasswordCharacterType, write: SignonInfo.prototype.setPasswordCharacterType });
Element_add(SignonInfo, { name: "CASESEN", required: true, order: 40, type: Boolean, read: SignonInfo.prototype.getPasswordCaseSensitive, write: SignonInfo.prototype.setPasswordCaseSensitive });
Element_add(SignonInfo, { name: "SPECIAL", required: true, order: 50, type: Boolean, read: SignonInfo.prototype.getPasswordSpecialCharsAllowed, write: SignonInfo.prototype.setPasswordSpecialCharsAllowed });
Element_add(SignonInfo, { name: "SPACES", required: true, order: 60, type: Boolean, read: SignonInfo.prototype.getPasswordSpacesAllowed, write: SignonInfo.prototype.setPasswordSpacesAllowed });
Element_add(SignonInfo, { name: "PINCH", required: true, order: 70, type: Boolean, read: SignonInfo.prototype.getChangePasswordSupported, write: SignonInfo.prototype.setChangePasswordSupported });
Element_add(SignonInfo, { name: "CHGPINFIRST", required: true, order: 80, type: Boolean, read: SignonInfo.prototype.getChangePasswordFirstRequired, write: SignonInfo.prototype.setChangePasswordFirstRequired });
Element_add(SignonInfo, { name: "USERCRED1LABEL", order: 90, type: String, read: SignonInfo.prototype.getAdditionalCredientialsLabel1, write: SignonInfo.prototype.setAdditionalCredientialsLabel1 });
Element_add(SignonInfo, { name: "USERCRED2LABEL", order: 100, type: String, read: SignonInfo.prototype.getAdditionalCredientialsLabel2, write: SignonInfo.prototype.setAdditionalCredientialsLabel2 });
Element_add(SignonInfo, { name: "CLIENTUIDREQ", order: 110, type: Boolean, read: SignonInfo.prototype.getClientUIDRequired, write: SignonInfo.prototype.setClientUIDRequired });
Element_add(SignonInfo, { name: "AUTHTOKENFIRST", order: 120, type: Boolean, read: SignonInfo.prototype.getAuthTokenRequiredForFirstSignon, write: SignonInfo.prototype.setAuthTokenRequiredForFirstSignon });
Element_add(SignonInfo, { name: "AUTHTOKENLABEL", order: 130, type: String, read: SignonInfo.prototype.getAuthTokenLabel, write: SignonInfo.prototype.setAuthTokenLabel });
Element_add(SignonInfo, { name: "AUTHTOKENINFOURL", order: 140, type: String, read: SignonInfo.prototype.getAuthTokenInfoURL, write: SignonInfo.prototype.setAuthTokenInfoURL });
Element_add(SignonInfo, { name: "MFACHALLENGESUPT", order: 150, type: Boolean, read: SignonInfo.prototype.getMfaSupported, write: SignonInfo.prototype.setMfaSupported });
Element_add(SignonInfo, { name: "MFACHALLENGEFIRST", order: 160, type: Boolean, read: SignonInfo.prototype.getMfaChallengeRequiredForFirstSignon, write: SignonInfo.prototype.setMfaChallengeRequiredForFirstSignon });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * List of signon information.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.2, OFX Spec"
 */
class SignonInfoList {
    /**
     * List of sign-on information.
     *
     * @return List of sign-on information.
     */
    getInfoList() {
        return this.infoList;
    }
    /**
     * List of sign-on information.
     *
     * @param infoList List of sign-on information.
     */
    setInfoList(infoList) {
        this.infoList = infoList;
    }
}
Aggregate_add(SignonInfoList, "SIGNONINFOLIST");
ChildAggregate_add(SignonInfoList, { order: 0, type: Array, collectionEntryType: SignonInfo, read: SignonInfoList.prototype.getInfoList, write: SignonInfoList.prototype.setInfoList });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import java.net.URL;
/**
 * @author Ryan Heaton
 * @see "Section 7.2 OFX Spec"
 */
class ProfileResponse extends ResponseMessage {
    /**
     * List of message set information.
     * @return List of message set information.
     */
    getMessageSetList() {
        return this.messageSetList;
    }
    /**
     * List of message set information.
     *
     * @param messageSetList List of message set information.
     */
    setMessageSetList(messageSetList) {
        this.messageSetList = messageSetList;
    }
    /**
     * List of signon information.
     *
     * @return List of signon information.
     */
    getSignonInfoList() {
        return this.signonInfoList;
    }
    /**
     * List of signon information.
     *
     * @param signonInfoList List of signon information.
     */
    setSignonInfoList(signonInfoList) {
        this.signonInfoList = signonInfoList;
    }
    // Inherited.
    getResponseMessageName() {
        return "profile";
    }
    // Inherited.
    getLastUpdated() {
        return this.getTimestamp();
    }
    /**
     * The timestamp of this profile update.
     *
     * @return The timestamp of this profile update.
     */
    getTimestamp() {
        return this.timestamp;
    }
    /**
     * The timestamp of this profile update.
     *
     * @param timestamp The timestamp of this profile update.
     */
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }
    /**
     * The name of the financial institution.
     *
     * @return The name of the financial institution.
     */
    getFinancialInstitutionName() {
        return this.financialInstitutionName;
    }
    /**
     * The name of the financial institution.
     *
     * @param financialInstitutionName The name of the financial institution.
     */
    setFinancialInstitutionName(financialInstitutionName) {
        this.financialInstitutionName = financialInstitutionName;
    }
    /**
     * The address of the financial institution.
     *
     * @return The address of the financial institution.
     */
    getAddress1() {
        return this.address1;
    }
    /**
     * The address of the financial institution.
     *
     * @param address1 The address of the financial institution.
     */
    setAddress1(address1) {
        this.address1 = address1;
    }
    /**
     * The address of the financial institution.
     *
     * @return The address of the financial institution.
     */
    getAddress2() {
        return this.address2;
    }
    /**
     * The address of the financial institution.
     *
     * @param address2 The address of the financial institution.
     */
    setAddress2(address2) {
        this.address2 = address2;
    }
    /**
     * The address of the financial institution.
     *
     * @return The address of the financial institution.
     */
    getAddress3() {
        return this.address3;
    }
    /**
     * The address of the financial institution.
     *
     * @param address3 The address of the financial institution.
     */
    setAddress3(address3) {
        this.address3 = address3;
    }
    /**
     * The city of the financial institution.
     *
     * @return The city of the financial institution.
     */
    getCity() {
        return this.city;
    }
    /**
     * The city of the financial institution.
     *
     * @param city The city of the financial institution.
     */
    setCity(city) {
        this.city = city;
    }
    /**
     * The state of this financial institution.
     *
     * @return The state of this financial institution.
     */
    getState() {
        return this.state;
    }
    /**
     * The state of this financial institution.
     *
     * @param state The state of this financial institution.
     */
    setState(state) {
        this.state = state;
    }
    /**
     * The postal code of this financial institution.
     *
     * @return The postal code of this financial institution.
     */
    getZip() {
        return this.zip;
    }
    /**
     * The postal code of this financial institution.
     *
     * @param zip The postal code of this financial institution.
     */
    setZip(zip) {
        this.zip = zip;
    }
    /**
     * The country code for this financial institution.
     *
     * @return The country code for this financial institution.
     * @see java.util.Locale#getISO3Country()
     */
    getCountry() {
        return this.country;
    }
    /**
     * The country code for this financial institution.
     *
     * @param country The country code for this financial institution.
     */
    setCountry(country) {
        this.country = country;
    }
    /**
     * The phone number to customer service.
     *
     * @return The phone number to customer service.
     */
    getCustomerServicePhone() {
        return this.customerServicePhone;
    }
    /**
     * The phone number to customer service.
     *
     * @param customerServicePhone The phone number to customer service.
     */
    setCustomerServicePhone(customerServicePhone) {
        this.customerServicePhone = customerServicePhone;
    }
    /**
     * The phone number to tech support.
     *
     * @return The phone number to tech support.
     */
    getTechnicalSupportPhone() {
        return this.technicalSupportPhone;
    }
    /**
     * The phone number to tech support.
     *
     * @param technicalSupportPhone The phone number to tech support.
     */
    setTechnicalSupportPhone(technicalSupportPhone) {
        this.technicalSupportPhone = technicalSupportPhone;
    }
    /**
     * The fax number.
     *
     * @return The fax number.
     */
    getFax() {
        return this.fax;
    }
    /**
     * The fax number.
     *
     * @param fax The fax number.
     */
    setFax(fax) {
        this.fax = fax;
    }
    /**
     * URL for the financial institution.
     *
     * @return URL for the financial institution.
     */
    getSiteURL() {
        return this.siteURL;
    }
    /**
     * URL for the financial institution.
     *
     * @param siteURL URL for the financial institution.
     */
    setSiteURL(siteURL) {
        this.siteURL = siteURL;
    }
    /**
     * The email for this FI
     *
     * @return The email for this FI
     */
    getEmail() {
        return this.email;
    }
    /**
     * The email for this FI
     *
     * @param email The email for this FI
     */
    setEmail(email) {
        this.email = email;
    }
    getMessageSetProfile(type, version = null) {
        return (version === null) ?
            this.getMessageSetProfile_noversion(type) :
            this.getMessageSetProfile_version(type, version);
    }
    getMessageSetProfile_noversion(type) {
        var profiles = this.getProfiles(type);
        if (profiles.length > 1) {
            throw new OFXException("More than one profile of type " + type);
        }
        else if (profiles.length == 0) {
            return null;
        }
        else {
            return profiles[0];
        }
    }
    /**
     * Get all the profiles of the specified type.
     *
     * @param type The type.
     * @return The profiles.
     */
    getProfiles(type) {
        var profiles = new Array();
        if (this.getMessageSetList() != null && this.getMessageSetList().getInformationList() != null) {
            for (var info of this.getMessageSetList().getInformationList()) {
                if (info.getVersionSpecificInformationList() != null) {
                    for (var versionSpecificInfo of info.getVersionSpecificInformationList()) {
                        if (versionSpecificInfo.getMessageSetType() == type) {
                            profiles.push(versionSpecificInfo);
                        }
                    }
                }
            }
        }
        return profiles;
    }
    getMessageSetProfile_version(type, version) {
        for (var profile of this.getProfiles(type)) {
            if (version == null) {
                if (profile.getVersion() == null) {
                    return profile;
                }
            }
            else if (version === profile.getVersion()) {
                return profile;
            }
        }
        return null;
    }
    getSignonProfile(messageSet) {
        if (this.getSignonInfoList() != null && this.getSignonInfoList().getInfoList() != null) {
            for (var signonInfo of this.getSignonInfoList().getInfoList()) {
                if (messageSet.getRealm() == null) {
                    if (signonInfo.getRealm() == null) {
                        return signonInfo;
                    }
                }
                else if (messageSet.getRealm() === signonInfo.getRealm()) {
                    return signonInfo;
                }
            }
        }
        return null;
    }
}
Aggregate_add(ProfileResponse, "PROFRS");
ChildAggregate_add(ProfileResponse, { order: 0, type: MessageSetInfoList, read: ProfileResponse.prototype.getMessageSetList, write: ProfileResponse.prototype.setMessageSetList });
ChildAggregate_add(ProfileResponse, { order: 10, type: SignonInfoList, read: ProfileResponse.prototype.getSignonInfoList, write: ProfileResponse.prototype.setSignonInfoList });
Element_add(ProfileResponse, { name: "DTPROFUP", order: 20, type: Date, read: ProfileResponse.prototype.getTimestamp, write: ProfileResponse.prototype.setTimestamp });
Element_add(ProfileResponse, { name: "FINAME", order: 30, type: String, read: ProfileResponse.prototype.getFinancialInstitutionName, write: ProfileResponse.prototype.setFinancialInstitutionName });
Element_add(ProfileResponse, { name: "ADDR1", required: true, order: 40, type: String, read: ProfileResponse.prototype.getAddress1, write: ProfileResponse.prototype.setAddress1 });
Element_add(ProfileResponse, { name: "ADDR2", order: 50, type: String, read: ProfileResponse.prototype.getAddress2, write: ProfileResponse.prototype.setAddress2 });
Element_add(ProfileResponse, { name: "ADDR3", order: 60, type: String, read: ProfileResponse.prototype.getAddress3, write: ProfileResponse.prototype.setAddress3 });
Element_add(ProfileResponse, { name: "CITY", required: true, order: 70, type: String, read: ProfileResponse.prototype.getCity, write: ProfileResponse.prototype.setCity });
Element_add(ProfileResponse, { name: "STATE", required: true, order: 80, type: String, read: ProfileResponse.prototype.getState, write: ProfileResponse.prototype.setState });
Element_add(ProfileResponse, { name: "POSTALCODE", required: true, order: 90, type: String, read: ProfileResponse.prototype.getZip, write: ProfileResponse.prototype.setZip });
Element_add(ProfileResponse, { name: "COUNTRY", required: true, order: 100, type: String, read: ProfileResponse.prototype.getCountry, write: ProfileResponse.prototype.setCountry });
Element_add(ProfileResponse, { name: "CSPHONE", order: 110, type: String, read: ProfileResponse.prototype.getCustomerServicePhone, write: ProfileResponse.prototype.setCustomerServicePhone });
Element_add(ProfileResponse, { name: "TSPHONE", order: 120, type: String, read: ProfileResponse.prototype.getTechnicalSupportPhone, write: ProfileResponse.prototype.setTechnicalSupportPhone });
Element_add(ProfileResponse, { name: "FAXPHONE", order: 130, type: String, read: ProfileResponse.prototype.getFax, write: ProfileResponse.prototype.setFax });
Element_add(ProfileResponse, { name: "URL", order: 140, type: String, read: ProfileResponse.prototype.getSiteURL, write: ProfileResponse.prototype.setSiteURL });
Element_add(ProfileResponse, { name: "EMAIL", order: 150, type: String, read: ProfileResponse.prototype.getEmail, write: ProfileResponse.prototype.setEmail });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class ProfileResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(ProfileResponseTransaction, "PROFTRNRS");
ChildAggregate_add(ProfileResponseTransaction, { required: true, order: 30, type: ProfileResponse, read: ProfileResponseTransaction.prototype.getMessage, write: ProfileResponseTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 * @see "Section 7 OFX Spec"
 */
class ProfileResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.profile;
    }
    /**
     * The profile response.
     *
     * @return The profile response.
     */
    getProfileResponse() {
        return this.profileResponse;
    }
    /**
     * The profile response.
     *
     * @param profileResponse The profile response.
     */
    setProfileResponse(profileResponse) {
        this.profileResponse = profileResponse;
    }
    // Inherited.
    getResponseMessages() {
        var messages = new Array();
        if (this.getProfileResponse() != null) {
            messages.push(this.getProfileResponse());
        }
        return messages;
    }
}
Aggregate_add(ProfileResponseMessageSet, "PROFMSGSRSV1");
ChildAggregate_add(ProfileResponseMessageSet, { required: true, order: 0, type: ProfileResponseTransaction, read: ProfileResponseMessageSet.prototype.getProfileResponse, write: ProfileResponseMessageSet.prototype.setProfileResponse });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Funds Transfer Profile
 * @author Scott Priddy
 * @see "Section 11.13.2.2 OFX Spec"
 */
class TransferProfile {
    /**
     * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
     * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
     * @return List of days during the week that no processing occurs.
     */
    getProcessorDaysOff() {
        return this.processorDaysOff;
    }
    setProcessorDaysOff(processorDaysOff) {
        this.processorDaysOff = processorDaysOff;
    }
    /**
     * Gets time of day that day's processing ends.
     *
     * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
     * the milliseconds and time zone are still optional, and default to GMT.
     * @see "Section 3.2.8.3 OFX Spec"
     * @return Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
     */
    getProcessEndTime() {
        return this.processEndTime;
    }
    /**
     * Sets the time of day that day's processing ends.
     *
     * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
     * the milliseconds and time zone are still optional, and default to GMT.
  
     * @see "Section 3.2.8.3 OFX Spec"
     * @param processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
     */
    setProcessEndTime(processEndTime) {
        this.processEndTime = processEndTime;
    }
    getSupportsScheduledTransfers() {
        return this.supportsScheduledTransfers;
    }
    setSupportsScheduledTransfers(supportsScheduledTransfers) {
        this.supportsScheduledTransfers = supportsScheduledTransfers;
    }
    /**
     * Requires <CANSCHED>
     * @return Boolean whether supports recurring transfers
     */
    getSupportsRecurringTransfers() {
        return this.supportsRecurringTransfers;
    }
    setSupportsRecurringTransfers(supportsRecurringTransfers) {
        this.supportsRecurringTransfers = supportsRecurringTransfers;
    }
    /**
     * <CANLOAN>Y must be present for transfers to involve loans
     * @return Boolean whether supports loan transfers
     */
    getSupportsLoanTransfers() {
        return this.supportsLoanTransfers;
    }
    setSupportsLoanTransfers(supportsLoanTransfers) {
        this.supportsLoanTransfers = supportsLoanTransfers;
    }
    getSupportsScheduledLoanTransfers() {
        return this.supportsScheduledLoanTransfers;
    }
    setSupportsScheduledLoanTransfers(supportsScheduledLoanTransfers) {
        this.supportsScheduledLoanTransfers = supportsScheduledLoanTransfers;
    }
    getSupportsRecurringLoanTransfers() {
        return this.supportsRecurringLoanTransfers;
    }
    setSupportsRecurringLoanTransfers(supportsRecurringLoanTransfers) {
        this.supportsRecurringLoanTransfers = supportsRecurringLoanTransfers;
    }
    getSupportsTransferModification() {
        return this.supportsTransferModification;
    }
    setSupportsTransferModification(supportsTransferModification) {
        this.supportsTransferModification = supportsTransferModification;
    }
    getSupportsModelModification() {
        return this.supportsModelModification;
    }
    setSupportsModelModification(supportsModelModification) {
        this.supportsModelModification = supportsModelModification;
    }
    /**
     * Model window
     * the number of days before a recurring transaction is scheduled to be processed that it is
     * instantiated on the system
     * @return Number number of days before a recurring transaction is scheduled to be processed that it is instantiated on the system
     */
    getModelWindow() {
        return this.modelWindow;
    }
    setModelWindow(modelWindow) {
        this.modelWindow = modelWindow;
    }
    /**
     * Number of days before processing date that funds are withdrawn
     * @return Number number of days before processing date that funds are withdrawn
     */
    getWithdrawnDays() {
        return this.withdrawnDays;
    }
    setWithdrawnDays(withdrawnDays) {
        this.withdrawnDays = withdrawnDays;
    }
    /**
     * Default number of days to pay
     * @return Number Default number of days to pay
     */
    getDefaultDaysToPay() {
        return this.defaultDaysToPay;
    }
    setDefaultDaysToPay(defaultDaysToPay) {
        this.defaultDaysToPay = defaultDaysToPay;
    }
}
Aggregate_add(TransferProfile, "XFERPROF");
Element_add(TransferProfile, { name: "PROCDAYSOFF", order: 0, type: Array, collectionEntryType: ProcessorDayOff, read: TransferProfile.prototype.getProcessorDaysOff, write: TransferProfile.prototype.setProcessorDaysOff });
Element_add(TransferProfile, { name: "PROCENDTM", required: true, order: 10, type: String, read: TransferProfile.prototype.getProcessEndTime, write: TransferProfile.prototype.setProcessEndTime });
Element_add(TransferProfile, { name: "CANSCHED", required: true, order: 20, type: Boolean, read: TransferProfile.prototype.getSupportsScheduledTransfers, write: TransferProfile.prototype.setSupportsScheduledTransfers });
Element_add(TransferProfile, { name: "CANRECUR", required: true, order: 30, type: Boolean, read: TransferProfile.prototype.getSupportsRecurringTransfers, write: TransferProfile.prototype.setSupportsRecurringTransfers });
Element_add(TransferProfile, { name: "CANLOAN", order: 40, type: Boolean, read: TransferProfile.prototype.getSupportsLoanTransfers, write: TransferProfile.prototype.setSupportsLoanTransfers });
Element_add(TransferProfile, { name: "CANSCHEDLOAN", order: 50, type: Boolean, read: TransferProfile.prototype.getSupportsScheduledLoanTransfers, write: TransferProfile.prototype.setSupportsScheduledLoanTransfers });
Element_add(TransferProfile, { name: "CANRECURLOAN", order: 60, type: Boolean, read: TransferProfile.prototype.getSupportsRecurringLoanTransfers, write: TransferProfile.prototype.setSupportsRecurringLoanTransfers });
Element_add(TransferProfile, { name: "CANMODXFERS", required: true, order: 70, type: Boolean, read: TransferProfile.prototype.getSupportsTransferModification, write: TransferProfile.prototype.setSupportsTransferModification });
Element_add(TransferProfile, { name: "CANMODMDLS", required: true, order: 80, type: Boolean, read: TransferProfile.prototype.getSupportsModelModification, write: TransferProfile.prototype.setSupportsModelModification });
Element_add(TransferProfile, { name: "MODELWND", required: true, order: 90, type: Number, read: TransferProfile.prototype.getModelWindow, write: TransferProfile.prototype.setModelWindow });
Element_add(TransferProfile, { name: "DAYSWITH", required: true, order: 100, type: Number, read: TransferProfile.prototype.getWithdrawnDays, write: TransferProfile.prototype.setWithdrawnDays });
Element_add(TransferProfile, { name: "DFLTDAYSTOPAY", required: true, order: 110, type: Number, read: TransferProfile.prototype.getDefaultDaysToPay, write: TransferProfile.prototype.setDefaultDaysToPay });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Stop Check Profile
 * @author Scott Priddy
 * @see "Section 11.13.2.3 OFX Spec"
 */
class StopCheckProfile {
    /**
     * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
     * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
     * @return List of days during the week that no processing occurs.
     */
    getProcessorDaysOff() {
        return this.processorDaysOff;
    }
    setProcessorDaysOff(processorDaysOff) {
        this.processorDaysOff = processorDaysOff;
    }
    /**
     * Gets time of day that day's processing ends.
     *
     * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
     * the milliseconds and time zone are still optional, and default to GMT.
     * @see "Section 3.2.8.3 OFX Spec"
     * @return Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
     */
    getProcessEndTime() {
        return this.processEndTime;
    }
    /**
     * Sets the time of day that day's processing ends.
     *
     * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
     * the milliseconds and time zone are still optional, and default to GMT.
  
     * @see "Section 3.2.8.3 OFX Spec"
     * @param processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
     */
    setProcessEndTime(processEndTime) {
        this.processEndTime = processEndTime;
    }
    getCanUseRange() {
        return this.canUseRange;
    }
    setCanUseRange(canUseRange) {
        this.canUseRange = canUseRange;
    }
    getCanUseDescription() {
        return this.canUseDescription;
    }
    setCanUseDescription(canUseDescription) {
        this.canUseDescription = canUseDescription;
    }
    getStopCheckFee() {
        return this.stopCheckFee;
    }
    setStopCheckFee(stopCheckFee) {
        this.stopCheckFee = stopCheckFee;
    }
}
Aggregate_add(StopCheckProfile, "STPCHKPROF");
Element_add(StopCheckProfile, { name: "PROCDAYSOFF", order: 0, type: Array, collectionEntryType: ProcessorDayOff, read: StopCheckProfile.prototype.getProcessorDaysOff, write: StopCheckProfile.prototype.setProcessorDaysOff });
Element_add(StopCheckProfile, { name: "PROCENDTM", required: true, order: 10, type: String, read: StopCheckProfile.prototype.getProcessEndTime, write: StopCheckProfile.prototype.setProcessEndTime });
Element_add(StopCheckProfile, { name: "CANUSERANGE", required: true, order: 20, type: Boolean, read: StopCheckProfile.prototype.getCanUseRange, write: StopCheckProfile.prototype.setCanUseRange });
Element_add(StopCheckProfile, { name: "CANUSEDESC", required: true, order: 30, type: Boolean, read: StopCheckProfile.prototype.getCanUseDescription, write: StopCheckProfile.prototype.setCanUseDescription });
Element_add(StopCheckProfile, { name: "STPCHKFEE", required: true, order: 40, type: Number, read: StopCheckProfile.prototype.getStopCheckFee, write: StopCheckProfile.prototype.setStopCheckFee });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Email Profile
 * @author Scott Priddy
 * @see "Section 11.13.2.3 OFX Spec"
 */
class EmailProfile {
    getCanEmail() {
        return this.canEmail;
    }
    setCanEmail(canEmail) {
        this.canEmail = canEmail;
    }
    getCanNotify() {
        return this.canNotify;
    }
    setCanNotify(canNotify) {
        this.canNotify = canNotify;
    }
}
Aggregate_add(EmailProfile, "EMAILPROF");
Element_add(EmailProfile, { name: "CANEMAIL", required: true, order: 10, type: Boolean, read: EmailProfile.prototype.getCanEmail, write: EmailProfile.prototype.setCanEmail });
Element_add(EmailProfile, { name: "CANNOTIFY", required: true, order: 20, type: Boolean, read: EmailProfile.prototype.getCanNotify, write: EmailProfile.prototype.setCanNotify });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Image Profile
 * @author Scott Priddy
 * @see "Section 3.1.6.2 OFX Spec"
 */
class ImageProfile {
    getClosingImageAvailable() {
        return this.closingImageAvailable;
    }
    setClosingImageAvailable(closingImageAvailable) {
        this.closingImageAvailable = closingImageAvailable;
    }
    getTransactionImageAvailable() {
        return this.transactionImageAvailable;
    }
    setTransactionImageAvailable(transactionImageAvailable) {
        this.transactionImageAvailable = transactionImageAvailable;
    }
}
Aggregate_add(ImageProfile, "IMAGEPROF");
Element_add(ImageProfile, { name: "CLOSINGIMGAVAIL", required: true, order: 10, type: Boolean, read: ImageProfile.prototype.getClosingImageAvailable, write: ImageProfile.prototype.setClosingImageAvailable });
Element_add(ImageProfile, { name: "TRANIMGAVAIL", required: true, order: 20, type: Boolean, read: ImageProfile.prototype.getTransactionImageAvailable, write: ImageProfile.prototype.setTransactionImageAvailable });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Banking Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.2.1 OFX Spec"
 */
class BankingV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.banking;
    }
    /**
     * The invalidAccountTypes list.
     *
     * @return The invalidAccountTypes list.
     */
    getInvalidAccountTypes() {
        return this.invalidAccountTypes;
    }
    /**
     * The invalidAccountTypes list.
     *
     * @param invalidAccountTypes The invalidAccountTypes list.
     */
    setInvalidAccountTypes(invalidAccountTypes) {
        this.invalidAccountTypes = invalidAccountTypes;
    }
    /**
     * Gets whether closing statement information is available
     *
     * @return whether closing statement information is available
     */
    getClosingAvail() {
        return this.closingAvail;
    }
    /**
     * Sets whether closing statement information is available
     *
     * @param closingAvail whether closing statement information is available
     */
    setClosingAvail(closingAvail) {
        this.closingAvail = closingAvail;
    }
    getTransferProfile() {
        return this.transferProfile;
    }
    setTransferProfile(transferProfile) {
        this.transferProfile = transferProfile;
    }
    getStopCheckProfile() {
        return this.stopCheckProfile;
    }
    setStopCheckProfile(stopCheckProfile) {
        this.stopCheckProfile = stopCheckProfile;
    }
    getEmailProfile() {
        return this.emailProfile;
    }
    setEmailProfile(emailProfile) {
        this.emailProfile = emailProfile;
    }
    getImageProfile() {
        return this.imageProfile;
    }
    setImageProfile(imageProfile) {
        this.imageProfile = imageProfile;
    }
}
Aggregate_add(BankingV1MessageSetInfo, "BANKMSGSETV1");
ChildAggregate_add(BankingV1MessageSetInfo, { order: 10, type: Array, collectionEntryType: AccountType, read: BankingV1MessageSetInfo.prototype.getInvalidAccountTypes, write: BankingV1MessageSetInfo.prototype.setInvalidAccountTypes });
Element_add(BankingV1MessageSetInfo, { name: "CLOSINGAVAIL", required: true, order: 20, type: Boolean, read: BankingV1MessageSetInfo.prototype.getClosingAvail, write: BankingV1MessageSetInfo.prototype.setClosingAvail });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "XFERPROF", order: 30, type: TransferProfile, read: BankingV1MessageSetInfo.prototype.getTransferProfile, write: BankingV1MessageSetInfo.prototype.setTransferProfile });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "STPCKPROF", order: 40, type: StopCheckProfile, read: BankingV1MessageSetInfo.prototype.getStopCheckProfile, write: BankingV1MessageSetInfo.prototype.setStopCheckProfile });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "EMAILPROF", required: true, order: 50, type: EmailProfile, read: BankingV1MessageSetInfo.prototype.getEmailProfile, write: BankingV1MessageSetInfo.prototype.setEmailProfile });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "IMAGEPROF", order: 60, type: ImageProfile, read: BankingV1MessageSetInfo.prototype.getImageProfile, write: BankingV1MessageSetInfo.prototype.setImageProfile });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class BankingMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(BankingMessageSetInfo, "BANKMSGSET");
ChildAggregate_add(BankingMessageSetInfo, { order: 0, type: BankingV1MessageSetInfo, read: BankingMessageSetInfo.prototype.getVersion1Info, write: BankingMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * BillPay Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 12.11.2 OFX Spec"
 */
class BillpayV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.payments;
    }
    getDaysWith() {
        return this.daysWith;
    }
    setDaysWith(daysWith) {
        this.daysWith = daysWith;
    }
    getDefaultDaysToPay() {
        return this.defaultDaysToPay;
    }
    setDefaultDaysToPay(defaultDaysToPay) {
        this.defaultDaysToPay = defaultDaysToPay;
    }
    getTransferDaysWith() {
        return this.transferDaysWith;
    }
    setTransferDaysWith(transferDaysWith) {
        this.transferDaysWith = transferDaysWith;
    }
    getTransferDefaultDaysToPay() {
        return this.transferDefaultDaysToPay;
    }
    setTransferDefaultDaysToPay(transferDefaultDaysToPay) {
        this.transferDefaultDaysToPay = transferDefaultDaysToPay;
    }
    getProcessorDaysOff() {
        return this.processorDaysOff;
    }
    setProcessorDaysOff(processorDaysOff) {
        this.processorDaysOff = processorDaysOff;
    }
    getProcessorEndTime() {
        return this.processorEndTime;
    }
    setProcessorEndTime(processorEndTime) {
        this.processorEndTime = processorEndTime;
    }
    getModelWindow() {
        return this.modelWindow;
    }
    setModelWindow(modelWindow) {
        this.modelWindow = modelWindow;
    }
    getPostProcessorWindow() {
        return this.postProcessorWindow;
    }
    setPostProcessorWindow(postProcessorWindow) {
        this.postProcessorWindow = postProcessorWindow;
    }
    getSupportsStatusUpdateViaPaymentModificationResponse() {
        return this.supportsStatusUpdateViaPaymentModificationResponse;
    }
    setSupportsStatusUpdateViaPaymentModificationResponse(supportsStatusUpdateViaPaymentModificationResponse) {
        this.supportsStatusUpdateViaPaymentModificationResponse = supportsStatusUpdateViaPaymentModificationResponse;
    }
    getSupportsPaymentByAddress() {
        return this.supportsPaymentByAddress;
    }
    setSupportsPaymentByAddress(supportsPaymentByAddress) {
        this.supportsPaymentByAddress = supportsPaymentByAddress;
    }
    getSupportsPaymentByTransfer() {
        return this.supportsPaymentByTransfer;
    }
    setSupportsPaymentByTransfer(supportsPaymentByTransfer) {
        this.supportsPaymentByTransfer = supportsPaymentByTransfer;
    }
    getSupportsPaymentByPayeeId() {
        return this.supportsPaymentByPayeeId;
    }
    setSupportsPaymentByPayeeId(supportsPaymentByPayeeId) {
        this.supportsPaymentByPayeeId = supportsPaymentByPayeeId;
    }
    getUserCanAddPayee() {
        return this.userCanAddPayee;
    }
    setUserCanAddPayee(userCanAddPayee) {
        this.userCanAddPayee = userCanAddPayee;
    }
    getSupportsExtendedPayment() {
        return this.supportsExtendedPayment;
    }
    setSupportsExtendedPayment(supportsExtendedPayment) {
        this.supportsExtendedPayment = supportsExtendedPayment;
    }
    getCanModifyPayments() {
        return this.canModifyPayments;
    }
    setCanModifyPayments(canModifyPayments) {
        this.canModifyPayments = canModifyPayments;
    }
    getCanModifyModels() {
        return this.canModifyModels;
    }
    setCanModifyModels(canModifyModels) {
        this.canModifyModels = canModifyModels;
    }
    getSupportsDifferentFirstPayment() {
        return this.supportsDifferentFirstPayment;
    }
    setSupportsDifferentFirstPayment(supportsDifferentFirstPayment) {
        this.supportsDifferentFirstPayment = supportsDifferentFirstPayment;
    }
    getSupportsDifferentLastPayment() {
        return this.supportsDifferentLastPayment;
    }
    setSupportsDifferentLastPayment(supportsDifferentLastPayment) {
        this.supportsDifferentLastPayment = supportsDifferentLastPayment;
    }
    getSupportsBillPresentmentContext() {
        return this.supportsBillPresentmentContext;
    }
    setSupportsBillPresentmentContext(supportsBillPresentmentContext) {
        this.supportsBillPresentmentContext = supportsBillPresentmentContext;
    }
}
Aggregate_add(BillpayV1MessageSetInfo, "BILLPAYMSGSETV1");
Element_add(BillpayV1MessageSetInfo, { name: "DAYSWITH", required: true, order: 10, type: Number, read: BillpayV1MessageSetInfo.prototype.getDaysWith, write: BillpayV1MessageSetInfo.prototype.setDaysWith });
Element_add(BillpayV1MessageSetInfo, { name: "DFLTDAYSTOPAY", required: true, order: 20, type: Number, read: BillpayV1MessageSetInfo.prototype.getDefaultDaysToPay, write: BillpayV1MessageSetInfo.prototype.setDefaultDaysToPay });
Element_add(BillpayV1MessageSetInfo, { name: "XFERDAYSWITH", required: true, order: 30, type: Number, read: BillpayV1MessageSetInfo.prototype.getTransferDaysWith, write: BillpayV1MessageSetInfo.prototype.setTransferDaysWith });
Element_add(BillpayV1MessageSetInfo, { name: "XFERDFLTDAYSTOPAY", required: true, order: 40, type: Number, read: BillpayV1MessageSetInfo.prototype.getTransferDefaultDaysToPay, write: BillpayV1MessageSetInfo.prototype.setTransferDefaultDaysToPay });
Element_add(BillpayV1MessageSetInfo, { name: "PROCDAYSOFF", order: 50, type: Array, /*collectionEntryType: ProcessorDayOff,*/ read: BillpayV1MessageSetInfo.prototype.getProcessorDaysOff, write: BillpayV1MessageSetInfo.prototype.setProcessorDaysOff });
Element_add(BillpayV1MessageSetInfo, { name: "PROCENDTM", required: true, order: 60, type: String, read: BillpayV1MessageSetInfo.prototype.getProcessorEndTime, write: BillpayV1MessageSetInfo.prototype.setProcessorEndTime });
Element_add(BillpayV1MessageSetInfo, { name: "MODELWND", required: true, order: 70, type: Number, read: BillpayV1MessageSetInfo.prototype.getModelWindow, write: BillpayV1MessageSetInfo.prototype.setModelWindow });
Element_add(BillpayV1MessageSetInfo, { name: "POSTPROCWND", required: true, order: 80, type: Number, read: BillpayV1MessageSetInfo.prototype.getPostProcessorWindow, write: BillpayV1MessageSetInfo.prototype.setPostProcessorWindow });
Element_add(BillpayV1MessageSetInfo, { name: "STSVIAMODS", required: true, order: 90, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsStatusUpdateViaPaymentModificationResponse, write: BillpayV1MessageSetInfo.prototype.setSupportsStatusUpdateViaPaymentModificationResponse });
Element_add(BillpayV1MessageSetInfo, { name: "PMTBYADDR", required: true, order: 100, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsPaymentByAddress, write: BillpayV1MessageSetInfo.prototype.setSupportsPaymentByAddress });
Element_add(BillpayV1MessageSetInfo, { name: "PMTBYXFER", required: true, order: 110, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsPaymentByTransfer, write: BillpayV1MessageSetInfo.prototype.setSupportsPaymentByTransfer });
Element_add(BillpayV1MessageSetInfo, { name: "PMTBYPAYEEID", required: true, order: 120, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsPaymentByPayeeId, write: BillpayV1MessageSetInfo.prototype.setSupportsPaymentByPayeeId });
Element_add(BillpayV1MessageSetInfo, { name: "CANADDPAYEE", required: true, order: 130, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getUserCanAddPayee, write: BillpayV1MessageSetInfo.prototype.setUserCanAddPayee });
Element_add(BillpayV1MessageSetInfo, { name: "HASEXTDPMT", required: true, order: 140, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsExtendedPayment, write: BillpayV1MessageSetInfo.prototype.setSupportsExtendedPayment });
Element_add(BillpayV1MessageSetInfo, { name: "CANMODPMTS", required: true, order: 150, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getCanModifyPayments, write: BillpayV1MessageSetInfo.prototype.setCanModifyPayments });
Element_add(BillpayV1MessageSetInfo, { name: "CANMODMDLS", required: true, order: 160, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getCanModifyModels, write: BillpayV1MessageSetInfo.prototype.setCanModifyModels });
Element_add(BillpayV1MessageSetInfo, { name: "DIFFFIRSTPMT", required: true, order: 170, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsDifferentFirstPayment, write: BillpayV1MessageSetInfo.prototype.setSupportsDifferentFirstPayment });
Element_add(BillpayV1MessageSetInfo, { name: "DIFFLASTPMT", required: true, order: 180, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsDifferentLastPayment, write: BillpayV1MessageSetInfo.prototype.setSupportsDifferentLastPayment });
Element_add(BillpayV1MessageSetInfo, { name: "BILLPUBCONTEXT", order: 190, type: Boolean, read: BillpayV1MessageSetInfo.prototype.getSupportsBillPresentmentContext, write: BillpayV1MessageSetInfo.prototype.setSupportsBillPresentmentContext });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class BillpayMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(BillpayMessageSetInfo, "BILLPAYMSGSET");
ChildAggregate_add(BillpayMessageSetInfo, { order: 0, type: BillpayV1MessageSetInfo, read: BillpayMessageSetInfo.prototype.getVersion1Info, write: BillpayMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Credit Card Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.3 OFX Spec"
 */
class CreditCardV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.creditcard;
    }
    /**
     * Closing statement information available
     * @return Boolean
     */
    getClosingAvail() {
        return this.closingAvail;
    }
    setClosingAvail(closingAvail) {
        this.closingAvail = closingAvail;
    }
    /**
     * Image profile (if supported)
     * @return ImageProfile
     */
    getImageProfile() {
        return this.imageProfile;
    }
    setImageProfile(imageProfile) {
        this.imageProfile = imageProfile;
    }
}
Aggregate_add(CreditCardV1MessageSetInfo, "CREDITCARDMSGSETV1");
Element_add(CreditCardV1MessageSetInfo, { name: "CLOSINGAVAIL", required: true, order: 20, type: Boolean, read: CreditCardV1MessageSetInfo.prototype.getClosingAvail, write: CreditCardV1MessageSetInfo.prototype.setClosingAvail });
ChildAggregate_add(CreditCardV1MessageSetInfo, { name: "IMAGEPROF", order: 10, type: ImageProfile, read: CreditCardV1MessageSetInfo.prototype.getImageProfile, write: CreditCardV1MessageSetInfo.prototype.setImageProfile });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class CreditCardMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(CreditCardMessageSetInfo, "CREDITCARDMSGSET");
ChildAggregate_add(CreditCardMessageSetInfo, { order: 0, type: CreditCardV1MessageSetInfo, read: CreditCardMessageSetInfo.prototype.getVersion1Info, write: CreditCardMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Email Message Set Profile Information
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 9.4.2 OFX Spec"
 */
class EmailV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.email;
    }
    /**
     * Y if server supports <MAILRQ> request.
     * N if server supports only the <MAILSYNCRQ> request.
     * @return Boolean
     */
    getSupportsMail() {
        return this.supportsMail;
    }
    setSupportsMail(supportsMail) {
        this.supportsMail = supportsMail;
    }
    /**
     * Y if server supports get MIME message
     * @return Boolean
     */
    getSupportsMimeType() {
        return this.supportsMimeType;
    }
    setSupportsMimeType(supportsMimeType) {
        this.supportsMimeType = supportsMimeType;
    }
}
Aggregate_add(EmailV1MessageSetInfo, "EMAILMSGSETV1");
Element_add(EmailV1MessageSetInfo, { name: "MAILSUP", required: true, order: 10, type: Boolean, read: EmailV1MessageSetInfo.prototype.getSupportsMail, write: EmailV1MessageSetInfo.prototype.setSupportsMail });
Element_add(EmailV1MessageSetInfo, { name: "GETMIMESUP", required: true, order: 20, type: Boolean, read: EmailV1MessageSetInfo.prototype.getSupportsMimeType, write: EmailV1MessageSetInfo.prototype.setSupportsMimeType });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class EmailMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(EmailMessageSetInfo, "EMAILMSGSET");
ChildAggregate_add(EmailMessageSetInfo, { order: 0, type: EmailV1MessageSetInfo, read: EmailMessageSetInfo.prototype.getVersion1Info, write: EmailMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interbank Funds Transfer Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.4 OFX Spec"
 */
class InterbankTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.interbank_transfer;
    }
    getTransferProfile() {
        return this.transferProfile;
    }
    setTransferProfile(transferProfile) {
        this.transferProfile = transferProfile;
    }
    getSupportsBillPay() {
        return this.supportsBillPay;
    }
    setSupportsBillPay(supportsBillPay) {
        this.supportsBillPay = supportsBillPay;
    }
    getCancelWindow() {
        return this.cancelWindow;
    }
    setCancelWindow(cancelWindow) {
        this.cancelWindow = cancelWindow;
    }
    getDomesticInterbankTransferFee() {
        return this.domesticInterbankTransferFee;
    }
    setDomesticInterbankTransferFee(domesticInterbankTransferFee) {
        this.domesticInterbankTransferFee = domesticInterbankTransferFee;
    }
    getInternationalInterbankTransferFee() {
        return this.internationalInterbankTransferFee;
    }
    setInternationalInterbankTransferFee(internationalInterbankTransferFee) {
        this.internationalInterbankTransferFee = internationalInterbankTransferFee;
    }
}
Aggregate_add(InterbankTransferV1MessageSetInfo, "INTERXFERMSGSETV1");
ChildAggregate_add(InterbankTransferV1MessageSetInfo, { name: "XFERPROF", required: true, order: 10, type: TransferProfile, read: InterbankTransferV1MessageSetInfo.prototype.getTransferProfile, write: InterbankTransferV1MessageSetInfo.prototype.setTransferProfile });
Element_add(InterbankTransferV1MessageSetInfo, { name: "CANBILLPAY", required: true, order: 20, type: Boolean, read: InterbankTransferV1MessageSetInfo.prototype.getSupportsBillPay, write: InterbankTransferV1MessageSetInfo.prototype.setSupportsBillPay });
Element_add(InterbankTransferV1MessageSetInfo, { name: "CANCELWND", required: true, order: 30, type: Number, read: InterbankTransferV1MessageSetInfo.prototype.getCancelWindow, write: InterbankTransferV1MessageSetInfo.prototype.setCancelWindow });
Element_add(InterbankTransferV1MessageSetInfo, { name: "DOMXFERFEE", required: true, order: 40, type: Number, read: InterbankTransferV1MessageSetInfo.prototype.getDomesticInterbankTransferFee, write: InterbankTransferV1MessageSetInfo.prototype.setDomesticInterbankTransferFee });
Element_add(InterbankTransferV1MessageSetInfo, { name: "INTLXFERFEE", required: true, order: 50, type: Number, read: InterbankTransferV1MessageSetInfo.prototype.getInternationalInterbankTransferFee, write: InterbankTransferV1MessageSetInfo.prototype.setInternationalInterbankTransferFee });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class InterbankTransferMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(InterbankTransferMessageSetInfo, "INTERXFERMSGSET");
ChildAggregate_add(InterbankTransferMessageSetInfo, { order: 0, type: InterbankTransferV1MessageSetInfo, read: InterbankTransferMessageSetInfo.prototype.getVersion1Info, write: InterbankTransferMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @see "Section 13.7.1.1, OFX Spec"
 *
 * @author Jon Perlow
 * @author Ryan Heaton
 */
class InvestmentV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.investment;
    }
    getSupportsStatementsDownload() {
        return this.supportsStatementsDownload;
    }
    setSupportsStatementsDownload(supportsStatementsDownload) {
        this.supportsStatementsDownload = supportsStatementsDownload;
    }
    getSupportsOpenOrdersDownload() {
        return this.supportsOpenOrdersDownload;
    }
    setSupportsOpenOrdersDownload(supportsOpenOrdersDownload) {
        this.supportsOpenOrdersDownload = supportsOpenOrdersDownload;
    }
    getSupportsPositionsDownload() {
        return this.supportsPositionsDownload;
    }
    setSupportsPositionsDownload(supportsPositionsDownload) {
        this.supportsPositionsDownload = supportsPositionsDownload;
    }
    getSupportsBalanceDownload() {
        return this.supportsBalanceDownload;
    }
    setSupportsBalanceDownload(supportsBalanceDownload) {
        this.supportsBalanceDownload = supportsBalanceDownload;
    }
    getSupportsEmail() {
        return this.supportsEmail;
    }
    setSupportsEmail(supportsEmail) {
        this.supportsEmail = supportsEmail;
    }
    getSupports401kInformation() {
        return this.supports401kInformation;
    }
    setSupports401kInformation(supports401kInformation) {
        this.supports401kInformation = supports401kInformation;
    }
    getSupportsClosingStatements() {
        return this.supportsClosingStatements;
    }
    setSupportsClosingStatements(supportsClosingStatements) {
        this.supportsClosingStatements = supportsClosingStatements;
    }
}
Aggregate_add(InvestmentV1MessageSetInfo, "INVSTMTMSGSETV1");
Element_add(InvestmentV1MessageSetInfo, { name: "TRANDNLD", required: true, order: 10, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsStatementsDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsStatementsDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "OODNLD", required: true, order: 20, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsOpenOrdersDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsOpenOrdersDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "POSDNLD", required: true, order: 30, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsPositionsDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsPositionsDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "BALDNLD", required: true, order: 40, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsBalanceDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsBalanceDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "CANEMAIL", required: true, order: 50, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsEmail, write: InvestmentV1MessageSetInfo.prototype.setSupportsEmail });
Element_add(InvestmentV1MessageSetInfo, { name: "INV401KDNLD", order: 60, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupports401kInformation, write: InvestmentV1MessageSetInfo.prototype.setSupports401kInformation });
Element_add(InvestmentV1MessageSetInfo, { name: "CLOSINGAVAIL", order: 70, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsClosingStatements, write: InvestmentV1MessageSetInfo.prototype.setSupportsClosingStatements });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class InvestmentMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(InvestmentMessageSetInfo, "INVSTMTMSGSET");
ChildAggregate_add(InvestmentMessageSetInfo, { order: 0, type: InvestmentV1MessageSetInfo, read: InvestmentMessageSetInfo.prototype.getVersion1Info, write: InvestmentMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class ProfileV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.profile;
    }
}
Aggregate_add(ProfileV1MessageSetInfo, "PROFMSGSETV1");

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class ProfileMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(ProfileMessageSetInfo, "PROFMSGSET");
ChildAggregate_add(ProfileMessageSetInfo, { order: 0, type: ProfileV1MessageSetInfo, read: ProfileMessageSetInfo.prototype.getVersion1Info, write: ProfileMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @see "Section 13.7.2.1, OFX Spec"
 *
 * @author Jon Perlow
 * @author Ryan Heaton
 */
class SecurityListV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.investment_security;
    }
    getSupportsSecurityListDownload() {
        return this.supportsSecurityListDownload;
    }
    setSupportsSecurityListDownload(supportsSecurityListDownload) {
        this.supportsSecurityListDownload = supportsSecurityListDownload;
    }
}
Aggregate_add(SecurityListV1MessageSetInfo, "SECLISTMSGSETV1");
Element_add(SecurityListV1MessageSetInfo, { name: "SECLISTRQDNLD", required: true, order: 10, type: Boolean, read: SecurityListV1MessageSetInfo.prototype.getSupportsSecurityListDownload, write: SecurityListV1MessageSetInfo.prototype.setSupportsSecurityListDownload });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class SecurityListMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(SecurityListMessageSetInfo, "SECLISTMSGSET");
ChildAggregate_add(SecurityListMessageSetInfo, { order: 0, type: SecurityListV1MessageSetInfo, read: SecurityListMessageSetInfo.prototype.getVersion1Info, write: SecurityListMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Jon Perlow
 */
class SignOnV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.signon;
    }
}
Aggregate_add(SignOnV1MessageSetInfo, "SIGNONMSGSETV1");

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Jon Perlow
 */
class SignOnMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(SignOnMessageSetInfo, "SIGNONMSGSET");
ChildAggregate_add(SignOnMessageSetInfo, { order: 0, type: SignOnV1MessageSetInfo, read: SignOnMessageSetInfo.prototype.getVersion1Info, write: SignOnMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Client Enrollment option, contains indicator as to whether the account number is required as part of enrollment
 * @author Scott Priddy
 * @see "Section 8.8 OFX Spec"
 */
class ClientEnrollment {
    /**
     * Y if account number is required as part of enrollment
     * @return Boolean
     */
    getAccountRequired() {
        return this.accountRequired;
    }
    setAccountRequired(accountRequired) {
        this.accountRequired = accountRequired;
    }
}
Aggregate_add(ClientEnrollment, "CLIENTENROLL");
Element_add(ClientEnrollment, { name: "ACCTREQUIRED", required: true, order: 0, type: Boolean, read: ClientEnrollment.prototype.getAccountRequired, write: ClientEnrollment.prototype.setAccountRequired });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Web Enrollment option containing URL to direct user for web based enrollment, if supported.
 * @author Scott Priddy
 * @see "Section 8.8 OFX Spec"
 */
class WebEnrollment {
    /**
     * URL to start enrollment process
     * @return String
     */
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
}
Aggregate_add(WebEnrollment, "WEBENROLL");
Element_add(WebEnrollment, { name: "URL", required: true, order: 0, type: String, read: WebEnrollment.prototype.getUrl, write: WebEnrollment.prototype.setUrl });

/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Other Enrollment option containing a text message directing users to some other method (such as a phone call)
 * @author Scott Priddy
 * @see "Section 8.8 OFX Spec"
 */
class OtherEnrollment {
    /**
     * Message to consumer about what to do next (for example, a phone number),
     * @return String
     */
    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
    }
}
Aggregate_add(OtherEnrollment, "OTHERENROLL");
Element_add(OtherEnrollment, { name: "MESSAGE", required: true, order: 0, type: String, read: OtherEnrollment.prototype.getMessage, write: OtherEnrollment.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Servers use the Signup Message Set Profile Information to define how enrollment should proceed.
 *
 * This aggregate should contain 1 Enrollment option among <CLIENTENROLL>, <WEBENROLL>, or <OTHERENROLL>.
 * todo: review how best to enforce this constraint
 *
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 8.8 OFX Spec"
 */
class SignupV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.signup;
    }
    getClientEnrollment() {
        return this.clientEnrollment;
    }
    setClientEnrollment(clientEnrollment) {
        this.clientEnrollment = clientEnrollment;
    }
    getWebEnrollment() {
        return this.webEnrollment;
    }
    setWebEnrollment(webEnrollment) {
        this.webEnrollment = webEnrollment;
    }
    getOtherEnrollment() {
        return this.otherEnrollment;
    }
    setOtherEnrollment(otherEnrollment) {
        this.otherEnrollment = otherEnrollment;
    }
    /**
     * Y if server supports client-based user information changes,
     * @return Boolean
     */
    getSupportsClientUserInfoChanges() {
        return this.supportsClientUserInfoChanges;
    }
    setSupportsClientUserInfoChanges(supportsClientUserInfoChanges) {
        this.supportsClientUserInfoChanges = supportsClientUserInfoChanges;
    }
    /**
     * Y if server can provide information on accounts with SVCSTATUS available,
     * N means client should expect to ask user for specific account information
     * @return Boolean
     */
    getSupportsAvailableAccounts() {
        return this.supportsAvailableAccounts;
    }
    setSupportsAvailableAccounts(supportsAvailableAccounts) {
        this.supportsAvailableAccounts = supportsAvailableAccounts;
    }
    /**
     * Y if server allows clients to make service activation requests (<ACCTRQ>),
     * N if server will only advise clients via synchronization of service additions,
     * changes, or deletions.
     * @return Boolean
     */
    getSupportsClientServiceActivationRequests() {
        return this.supportsClientServiceActivationRequests;
    }
    setSupportsClientServiceActivationRequests(supportsClientServiceActivationRequests) {
        this.supportsClientServiceActivationRequests = supportsClientServiceActivationRequests;
    }
}
Aggregate_add(SignupV1MessageSetInfo, "SIGNUPMSGSETV1");
ChildAggregate_add(SignupV1MessageSetInfo, { name: "CLIENTENROLL", order: 10, type: ClientEnrollment, read: SignupV1MessageSetInfo.prototype.getClientEnrollment, write: SignupV1MessageSetInfo.prototype.setClientEnrollment });
ChildAggregate_add(SignupV1MessageSetInfo, { name: "WEBENROLL", order: 20, type: WebEnrollment, read: SignupV1MessageSetInfo.prototype.getWebEnrollment, write: SignupV1MessageSetInfo.prototype.setWebEnrollment });
ChildAggregate_add(SignupV1MessageSetInfo, { name: "OTHERENROLL", order: 30, type: OtherEnrollment, read: SignupV1MessageSetInfo.prototype.getOtherEnrollment, write: SignupV1MessageSetInfo.prototype.setOtherEnrollment });
Element_add(SignupV1MessageSetInfo, { name: "CHGUSERINFO", required: true, order: 40, type: Boolean, read: SignupV1MessageSetInfo.prototype.getSupportsClientUserInfoChanges, write: SignupV1MessageSetInfo.prototype.setSupportsClientUserInfoChanges });
Element_add(SignupV1MessageSetInfo, { name: "AVAILACCTS", required: true, order: 50, type: Boolean, read: SignupV1MessageSetInfo.prototype.getSupportsAvailableAccounts, write: SignupV1MessageSetInfo.prototype.setSupportsAvailableAccounts });
Element_add(SignupV1MessageSetInfo, { name: "CLIENTACTREQ", required: true, order: 60, type: Boolean, read: SignupV1MessageSetInfo.prototype.getSupportsClientServiceActivationRequests, write: SignupV1MessageSetInfo.prototype.setSupportsClientServiceActivationRequests });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class SignupMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(SignupMessageSetInfo, "SIGNUPMSGSET");
ChildAggregate_add(SignupMessageSetInfo, { order: 0, type: SignupV1MessageSetInfo, read: SignupMessageSetInfo.prototype.getVersion1Info, write: SignupMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Wire Transfer Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.5 OFX Spec"
 */
class WireTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {
    getMessageSetType() {
        return MessageSetType.wire_transfer;
    }
    getProcessorDaysOff() {
        return this.processorDaysOff;
    }
    setProcessorDaysOff(processorDaysOff) {
        this.processorDaysOff = processorDaysOff;
    }
    getProcessEndTime() {
        return this.processEndTime;
    }
    setProcessEndTime(processEndTime) {
        this.processEndTime = processEndTime;
    }
    getSupportsScheduledTransfers() {
        return this.supportsScheduledTransfers;
    }
    setSupportsScheduledTransfers(supportsScheduledTransfers) {
        this.supportsScheduledTransfers = supportsScheduledTransfers;
    }
    getDomesticWireTransferFee() {
        return this.domesticWireTransferFee;
    }
    setDomesticWireTransferFee(domesticWireTransferFee) {
        this.domesticWireTransferFee = domesticWireTransferFee;
    }
    getInternationalWireTransferFee() {
        return this.internationalWireTransferFee;
    }
    setInternationalWireTransferFee(internationalWireTransferFee) {
        this.internationalWireTransferFee = internationalWireTransferFee;
    }
}
Aggregate_add(WireTransferV1MessageSetInfo, "WIREXFERMSGSETV1");
Element_add(WireTransferV1MessageSetInfo, { name: "PROCDAYSOFF", order: 10, type: Array, collectionEntryType: ProcessorDayOff, read: WireTransferV1MessageSetInfo.prototype.getProcessorDaysOff, write: WireTransferV1MessageSetInfo.prototype.setProcessorDaysOff });
Element_add(WireTransferV1MessageSetInfo, { name: "PROCENDTM", required: true, order: 20, type: String, read: WireTransferV1MessageSetInfo.prototype.getProcessEndTime, write: WireTransferV1MessageSetInfo.prototype.setProcessEndTime });
Element_add(WireTransferV1MessageSetInfo, { name: "CANSCHED", required: true, order: 30, type: Boolean, read: WireTransferV1MessageSetInfo.prototype.getSupportsScheduledTransfers, write: WireTransferV1MessageSetInfo.prototype.setSupportsScheduledTransfers });
Element_add(WireTransferV1MessageSetInfo, { name: "DOMXFERFEE", required: true, order: 40, type: Number, read: WireTransferV1MessageSetInfo.prototype.getDomesticWireTransferFee, write: WireTransferV1MessageSetInfo.prototype.setDomesticWireTransferFee });
Element_add(WireTransferV1MessageSetInfo, { name: "INTLXFERFEE", required: true, order: 50, type: Number, read: WireTransferV1MessageSetInfo.prototype.getInternationalWireTransferFee, write: WireTransferV1MessageSetInfo.prototype.setInternationalWireTransferFee });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class WireTransferMessageSetInfo extends AbstractMessageSetInfo {
    getVersion1Info() {
        return this.version1Info;
    }
    setVersion1Info(version1Info) {
        this.version1Info = version1Info;
    }
}
Aggregate_add(WireTransferMessageSetInfo, "WIREXFERMSGSET");
ChildAggregate_add(WireTransferMessageSetInfo, { order: 0, type: WireTransferV1MessageSetInfo, read: WireTransferMessageSetInfo.prototype.getVersion1Info, write: WireTransferMessageSetInfo.prototype.setVersion1Info });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
* Asset class for debt.
* @see "Section 13.8.5.7, OFX Spec"
*
* @author Jon Perlow
*/
var AssetClass;
(function (AssetClass) {
    /**
     * Government or corporate bonds issued in the United States.
     */
    AssetClass[AssetClass["DOMESTIC_BOND"] = 0] = "DOMESTIC_BOND";
    /**
     * Government or corporate bonds issued in foreign countries or the United States.
     */
    AssetClass[AssetClass["INTL_BOND"] = 1] = "INTL_BOND";
    /**
     * Stocks for US companies with market caps of $2B or more.
     */
    AssetClass[AssetClass["LARGE_STOCK"] = 2] = "LARGE_STOCK";
    /**
     * Stocks for US companies with market caps of ~$100M to $2B.
     */
    AssetClass[AssetClass["SMALL_STOCK"] = 3] = "SMALL_STOCK";
    /**
     * Publicallt traded stocks for companies based in foreign countries.
     */
    AssetClass[AssetClass["INTL_STOCK"] = 4] = "INTL_STOCK";
    /**
     * Stable, short-term investments which provide income that rises and falls with short-term
     * interest rates.
     */
    AssetClass[AssetClass["MONEY_MARKET"] = 5] = "MONEY_MARKET";
    /**
     * Investments which do not fit into any of the other types.
     */
    AssetClass[AssetClass["OTHER"] = 6] = "OTHER";
})(AssetClass || (AssetClass = {}));
function AssetClass_fromOfx(ofxVal) {
    if ("DOMESTICBOND" === ofxVal) {
        return AssetClass.DOMESTIC_BOND;
    }
    else if ("INTLBOND" === ofxVal) {
        return AssetClass.INTL_BOND;
    }
    else if ("LARGESTOCK" === ofxVal) {
        return AssetClass.LARGE_STOCK;
    }
    else if ("SMALLSTOCK" === ofxVal) {
        return AssetClass.SMALL_STOCK;
    }
    else if ("INTLSTOCK" === ofxVal) {
        return AssetClass.INTL_STOCK;
    }
    else if ("MONEYMARKET" === ofxVal) {
        return AssetClass.MONEY_MARKET;
    }
    else if ("OTHER" === ofxVal) {
        return AssetClass.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Info about a security.
 * @see "Section 13.8.5.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityInfo {
    /**
     * Gets the unique security id for the security. This is a required field according to the OFX
     * spec.
     *
     * @return the security id
     */
    getSecurityId() {
        return this.securityId;
    }
    /**
     * Sets the unique security id for the security. This is a required field according to the OFX
     * spec.
     *
     * @param securityId the security id
     */
    setSecurityId(securityId) {
        this.securityId = securityId;
    }
    /**
     * Gets the full name of the security. This is a required field according to the OFX spec.
     *
     * @return the full name of the security
     */
    getSecurityName() {
        return this.securityName;
    }
    /**
     * Sets the full name of the security. This is a required field according to the OFX spec.
     *
     * @param securityName the full name of the security
     */
    setSecurityName(securityName) {
        this.securityName = securityName;
    }
    /**
     * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
     *
     * @return the ticket symbol or null if there's no ticker symbol
     */
    getTickerSymbol() {
        return this.tickerSymbol;
    }
    /**
     * Sets the ticker symbol for the security. This is an optional field according to the OFX spec.
     *
     * @param tickerSymbol the ticket symbol or null if there's no ticker symbol
     */
    setTickerSymbol(tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }
    /**
     * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
     *
     * @return the FI ID number for the security
     */
    getFiId() {
        return this.fiId;
    }
    /**
     * Sets the FI ID number for the security. This is an optional field according to the OFX spec.
     *
     * @param fiId the FI ID number for the security
     */
    setFiId(fiId) {
        this.fiId = fiId;
    }
    /**
     * Gets the rating of the security. This is an optional field according to the OFX spec.
     *
     * @return the rating
     */
    getRating() {
        return this.rating;
    }
    /**
     * Sets the rating of the security. This is an optional field according to the OFX spec.
     *
     * @param rating the rating
     */
    setRating(rating) {
        this.rating = rating;
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a noptional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.unitPrice;
    }
    /**
     * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is an optional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @param unitPrice the per unit price
     */
    setUnitPrice(unitPrice) {
        this.unitPrice = unitPrice;
    }
    /**
     * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
     *
     * @return the date as-of for the unit price
     */
    getUnitPriceAsOfDate() {
        return this.marketValueDate;
    }
    /**
     * Sets the date as-of for the unit price. This is an optional field according to the OFX spec.
     *
     * param marketValueDate the date as-of for the unit price
     */
    setUnitPriceAsOfDate(marketValueDate) {
        this.marketValueDate = marketValueDate;
    }
    /**
     * Gets the overriding currency code for the security. If not set, implies the default currency.
     * This is an optional field according to the OFX spec.
     *
     * @return the overriding currency code or null to mean the default currency
     */
    getCurrencyCode() {
        return this.currencyCode;
    }
    /**
     * Sets the overriding currency code for the security. If not set, implies the default currency.
     * This is an optional field according to the OFX spec.
     *
     * @param currencyCode the overriding currency code or null to mean the default currency
     */
    setCurrencyCode(currencyCode) {
        this.currencyCode = currencyCode;
    }
    /**
     * Gets any memo associated with the security. This is an optional field according to the OFX
     * spec.
     *
     * @return the memo
     */
    getMemo() {
        return this.memo;
    }
    /**
     * Sets any memo associated with the security. This is an optional field according to the OFX
     * spec.
     *
     * @param memo the memo
     */
    setMemo(memo) {
        this.memo = memo;
    }
}
Aggregate_add(SecurityInfo, "SECINFO");
ChildAggregate_add(SecurityInfo, { required: true, order: 10, type: SecurityId, read: SecurityInfo.prototype.getSecurityId, write: SecurityInfo.prototype.setSecurityId });
Element_add(SecurityInfo, { name: "SECNAME", required: true, order: 20, type: String, read: SecurityInfo.prototype.getSecurityName, write: SecurityInfo.prototype.setSecurityName });
Element_add(SecurityInfo, { name: "TICKER", order: 30, type: String, read: SecurityInfo.prototype.getTickerSymbol, write: SecurityInfo.prototype.setTickerSymbol });
Element_add(SecurityInfo, { name: "FIID", order: 40, type: String, read: SecurityInfo.prototype.getFiId, write: SecurityInfo.prototype.setFiId });
Element_add(SecurityInfo, { name: "RATING", order: 50, type: String, read: SecurityInfo.prototype.getRating, write: SecurityInfo.prototype.setRating });
Element_add(SecurityInfo, { name: "UNITPRICE", order: 60, type: Number, read: SecurityInfo.prototype.getUnitPrice, write: SecurityInfo.prototype.setUnitPrice });
Element_add(SecurityInfo, { name: "DTASOF", order: 70, type: Date, read: SecurityInfo.prototype.getUnitPriceAsOfDate, write: SecurityInfo.prototype.setUnitPriceAsOfDate });
Element_add(SecurityInfo, { name: "CURRENCY", order: 80, type: String, read: SecurityInfo.prototype.getCurrencyCode, write: SecurityInfo.prototype.setCurrencyCode });
Element_add(SecurityInfo, { name: "MEMO", order: 90, type: String, read: SecurityInfo.prototype.getMemo, write: SecurityInfo.prototype.setMemo });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base class for info about the various types of securities.
 * @see "Section 13.8.5.1, OFX Spec"
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all security info as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
class BaseSecurityInfo {
    /**
     * Gets the security info aggregate.
     *
     * @return the security info aggregate.
     */
    getSecurityInfo() {
        return this.securityInfo;
    }
    /**
     * Sets the security info aggregate.
     *
     * @param securityInfo the security info aggregate.
     */
    setSecurityInfo(securityInfo) {
        this.securityInfo = securityInfo;
    }
    /**
     * Gets the unique security id for the security. This is a required field according to the OFX
     * spec.
     *
     * @return the security id
     */
    getSecurityId() {
        return this.getSecurityInfo().getSecurityId();
    }
    /**
     * Gets the full name of the security. This is a required field according to the OFX spec.
     *
     * @return the full name of the security.
     */
    getSecurityName() {
        return this.getSecurityInfo().getSecurityName();
    }
    /**
     * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
     *
     * @return the ticket symbol or null if there's no ticker symbol
     */
    getTickerSymbol() {
        return this.getSecurityInfo().getTickerSymbol();
    }
    /**
     * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
     *
     * @return the FI ID number for the security
     */
    getFiId() {
        return this.getSecurityInfo().getFiId();
    }
    /**
     * Gets the rating of the security. This is an optional field according to the OFX spec.
     *
     * @return the rating
     */
    getRating() {
        return this.getSecurityInfo().getRating();
    }
    /**
     * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
     * share price. For bonds, this is the percentage of par. For options, this is the per share (not
     * per contact) price. This is a noptional field according to the OFX spec.
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @return the per unit price
     */
    getUnitPrice() {
        return this.getSecurityInfo().getUnitPrice();
    }
    /**
     * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
     *
     * @return the date as-of for the unit price
     */
    getUnitPriceAsOfDate() {
        return this.getSecurityInfo().getUnitPriceAsOfDate();
    }
    /**
     * Gets the overriding currency code for the security. If not set, implies the default currency.
     * This is an optional field according to the OFX spec.
     *
     * @return the overriding currency code or null to mean the default currency
     */
    getCurrencyCode() {
        return this.getSecurityInfo().getCurrencyCode();
    }
    /**
     * Gets any memo associated with the security. This is an optional field according to the OFX
     * spec.
     *
     * @return the memo
     */
    getMemo() {
        return this.getSecurityInfo().getMemo();
    }
}
ChildAggregate_add(BaseSecurityInfo, { required: true, order: 10, type: SecurityInfo, read: BaseSecurityInfo.prototype.getSecurityInfo, write: BaseSecurityInfo.prototype.setSecurityInfo });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Call type for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var CallType;
(function (CallType) {
    CallType[CallType["CALL"] = 0] = "CALL";
    CallType[CallType["PUT"] = 1] = "PUT";
    CallType[CallType["PREFUND"] = 2] = "PREFUND";
    CallType[CallType["MATURITY"] = 3] = "MATURITY";
})(CallType || (CallType = {}));
function CallType_fromOfx(ofxVal) {
    if ("CALL" === ofxVal) {
        return CallType.CALL;
    }
    else if ("PUT" === ofxVal) {
        return CallType.PUT;
    }
    else if ("PREFUND" === ofxVal) {
        return CallType.PREFUND;
    }
    else if ("MATURITY" === ofxVal) {
        return CallType.MATURITY;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Coupon freqency for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var CouponFrequency;
(function (CouponFrequency) {
    CouponFrequency[CouponFrequency["MONTHLY"] = 0] = "MONTHLY";
    CouponFrequency[CouponFrequency["QUARTERLY"] = 1] = "QUARTERLY";
    CouponFrequency[CouponFrequency["SEMIANNUAL"] = 2] = "SEMIANNUAL";
    CouponFrequency[CouponFrequency["ANNUAL"] = 3] = "ANNUAL";
    CouponFrequency[CouponFrequency["OTHER"] = 4] = "OTHER";
})(CouponFrequency || (CouponFrequency = {}));
function CouponFrequency_fromOfx(ofxVal) {
    if ("MONTHLY" === ofxVal) {
        return CouponFrequency.MONTHLY;
    }
    else if ("QUARTERLY" === ofxVal) {
        return CouponFrequency.QUARTERLY;
    }
    else if ("SEMIANNUAL" === ofxVal) {
        return CouponFrequency.SEMIANNUAL;
    }
    else if ("ANNUAL" === ofxVal) {
        return CouponFrequency.ANNUAL;
    }
    else if ("OTHER" === ofxVal) {
        return CouponFrequency.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The class of debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var DebtClass;
(function (DebtClass) {
    DebtClass[DebtClass["TREASURY"] = 0] = "TREASURY";
    DebtClass[DebtClass["MUNICIPAL"] = 1] = "MUNICIPAL";
    DebtClass[DebtClass["CORPORATE"] = 2] = "CORPORATE";
    DebtClass[DebtClass["OTHER"] = 3] = "OTHER";
})(DebtClass || (DebtClass = {}));
function DebtClass_fromOfx(ofxVal) {
    if ("TREASURY" === ofxVal) {
        return DebtClass.TREASURY;
    }
    else if ("MUNICIPAL" === ofxVal) {
        return DebtClass.MUNICIPAL;
    }
    else if ("CORPORATE" === ofxVal) {
        return DebtClass.CORPORATE;
    }
    else if ("OTHER" === ofxVal) {
        return DebtClass.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The type of debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var DebtType;
(function (DebtType) {
    DebtType[DebtType["COUPON"] = 0] = "COUPON";
    DebtType[DebtType["ZERO"] = 1] = "ZERO";
})(DebtType || (DebtType = {}));
function DebtType_fromOfx(ofxVal) {
    if ("COUPON" === ofxVal) {
        return DebtType.COUPON;
    }
    else if ("ZERO" === ofxVal) {
        return DebtType.ZERO;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Info about a debt security.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
class DebtSecurityInfo extends BaseSecurityInfo {
    /**
     * Gets the par value of the debt. This is a required field according to the OFX spec.
     *
     * @return the par value of the debt
     */
    getParValue() {
        return this.parValue;
    }
    /**
     * Sets the par value of the debt. This is a required field according to the OFX spec.
     *
     * @param parValue the par value of the debt
     */
    setParValue(parValue) {
        this.parValue = parValue;
    }
    /**
     * Gets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
     * OFX spec.
     *
     * @return the type of debt
     */
    getDebtType() {
        return this.debtType;
    }
    /**
     * Sets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
     * OFX spec.
     *
     * @param debtType the type of debt
     */
    setDebtType(debtType) {
        this.debtType = debtType;
    }
    /**
     * Gets the type of debt as one of the well-known types.
     *
     * @return the type of debt or null if it's not one of the well-known types
     */
    getDebtTypeEnum() {
        return DebtType_fromOfx(this.getDebtType());
    }
    /**
     * Gets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
     * This is an optional field according to the OFX spec.
     *
     * @return the class of debt
     */
    getDebtClass() {
        return this.debtClass;
    }
    /**
     * Sets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
     * This is an optional field according to the OFX spec.
     *
     * @param debtClass the class of debt
     */
    setDebtClass(debtClass) {
        this.debtClass = debtClass;
    }
    /**
     * Gets the class of debt as one of the well-known types.
     *
     * @return the class of debt or null if it's not one of the well-known types
     */
    getDebtClassEnum() {
        return DebtClass_fromOfx(this.debtClass);
    }
    /**
     * Gets the coupon rate of the debt for the next closest call date.
     * This is an optional field according to the OFX spec.
     *
     * @return the coupon rate
     */
    getCouponRate() {
        return this.couponRate;
    }
    /**
     * Sets the coupon rate of the debt for the next closest call date.
     * This is an optional field according to the OFX spec.
     *
     * @param couponRate the coupon rate
     */
    setCouponRate(couponRate) {
        this.couponRate = couponRate;
    }
    /**
     * Gets the next maturity date for the next coupon.
     * This is an optional field according to the OFX spec.
     *
     * @return the maturity date for the next coupon
     */
    getNextMaturityDate() {
        return this.nextMaturityDate;
    }
    /**
     * Sets the next maturity date for the next coupon.
     * This is an optional field according to the OFX spec.
     *
     * @param nextMaturityDate the maturity date for the next coupon.
     */
    setNextMaturityDate(nextMaturityDate) {
        this.nextMaturityDate = nextMaturityDate;
    }
    /**
     * Gets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
     * This is an optional field according to the OFX spec.
     *
     * @return the coupon frequency
     */
    getCouponFrequency() {
        return this.couponFrequency;
    }
    /**
     * Sets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
     * This is an optional field according to the OFX spec.
     *
     * @param couponFrequency the coupon frequency
     */
    setCouponFrequency(couponFrequency) {
        this.couponFrequency = couponFrequency;
    }
    /**
     * Gets the coupon frequency as one of the well-known types.
     *
     * @return the coupon frequency or null if it's not one of the well-known types
     */
    getCouponFrequencyEnum() {
        return CouponFrequency_fromOfx(this.getCouponFrequency());
    }
    /**
     * Gets the bond price. This is an optional field according to the OFX spec.
     *
     * @return the bond price
     */
    getCallPrice() {
        return this.callPrice;
    }
    /**
     * Sets the bond price. This is an optional field according to the OFX spec.
     *
     * @param callPrice the bond price
     */
    setCallPrice(callPrice) {
        this.callPrice = callPrice;
    }
    /**
     * Gets the yield to call as a rate. This is an optional field according to the OFX spec.
     *
     * @return the yield to call rate
     */
    getYieldToCall() {
        return this.yieldToCall;
    }
    /**
     * Sets the yield to call as a rate. This is an optional field according to the OFX spec.
     *
     * @param yieldToCall the yield to call rate
     */
    setYieldToCall(yieldToCall) {
        this.yieldToCall = yieldToCall;
    }
    /**
     * Gets the next call date. This is an optional field according to the OFX spec.
     *
     * @return the next call date.
     */
    getNextCallDate() {
        return this.nextCallDate;
    }
    /**
     * Sets the next call date. This is an optional field according to the OFX spec.
     *
     * @param nextCallDate the next call date.
     */
    setNextCallDate(nextCallDate) {
        this.nextCallDate = nextCallDate;
    }
    /**
     * Gets the type of call.
     *
     * @return the type of call
     */
    getCallType() {
        return this.callType;
    }
    /**
     * Sets the type of call.
     *
     * @param callType the type of call
     */
    setCallType(callType) {
        this.callType = callType;
    }
    /**
     * Gets the type of call as one of the well-known types.
     *
     * @return the type of call or null if it's not one of the well-known types
     */
    getCallTypeEnum() {
        return CallType_fromOfx(this.getCallType());
    }
    /**
     * Gets the yield to maturity as a rate. This is an optional field according to the OFX spec.
     *
     * @return the yield to call rate
     */
    getYieldToMaturity() {
        return this.yieldToMaturity;
    }
    /**
     * Sets the yield to maturity as a rate. This is an optional field according to the OFX spec.
     *
     * @param yieldToMaturity the yield to call rate
     */
    setYieldToMaturity(yieldToMaturity) {
        this.yieldToMaturity = yieldToMaturity;
    }
    /**
     * Gets the date when the debt matures. This is an optional field according to the OFX spec.
     *
     * @return the date when the debt matures
     */
    getDebtMaturityDate() {
        return this.debtMaturityDate;
    }
    /**
     * Sets the date when the debt matures. This is an optional field according to the OFX spec.
     *
     * @param debtMaturityDate the date when the debt matures
     */
    setDebtMaturityDate(debtMaturityDate) {
        this.debtMaturityDate = debtMaturityDate;
    }
    /**
     * Gets the asset class of the debt. This is an optional field according to the OFX spec.
     *
     * @return the asset class of the debt
     */
    getAssetClass() {
        return this.assetClass;
    }
    /**
     * Sets the asset class of the debt. This is an optional field according to the OFX spec.
     *
     * @param assetClass the asset class of the debt
     */
    setAssetClass(assetClass) {
        this.assetClass = assetClass;
    }
    /**
     * Gets the assert class as one of the well-known types.
     *
     * @return the asset class or null if it's not one of the well-known types
     */
    getAssetClassEnum() {
        return AssetClass_fromOfx(this.getAssetClass());
    }
    /**
     * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
     * spec.
     *
     * @return the FI-defined asset class of the debt
     */
    getFiAssetClass() {
        return this.fiAssetClass;
    }
    /**
     * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
     * spec.
     *
     * @param fiAssetClass the FI-defined asset class of the debt
     */
    setFiAssetClass(fiAssetClass) {
        this.fiAssetClass = fiAssetClass;
    }
}
Aggregate_add(DebtSecurityInfo, "DEBTINFO");
Element_add(DebtSecurityInfo, { name: "PARVALUE", required: true, order: 20, type: Number, read: DebtSecurityInfo.prototype.getParValue, write: DebtSecurityInfo.prototype.setParValue });
Element_add(DebtSecurityInfo, { name: "DEBTTYPE", required: true, order: 30, type: String, read: DebtSecurityInfo.prototype.getDebtType, write: DebtSecurityInfo.prototype.setDebtType });
Element_add(DebtSecurityInfo, { name: "DEBTCLASS", order: 40, type: String, read: DebtSecurityInfo.prototype.getDebtClass, write: DebtSecurityInfo.prototype.setDebtClass });
Element_add(DebtSecurityInfo, { name: "COUPONRT", order: 50, type: Number, read: DebtSecurityInfo.prototype.getCouponRate, write: DebtSecurityInfo.prototype.setCouponRate });
Element_add(DebtSecurityInfo, { name: "DTCOUPON", order: 60, type: Date, read: DebtSecurityInfo.prototype.getNextMaturityDate, write: DebtSecurityInfo.prototype.setNextMaturityDate });
Element_add(DebtSecurityInfo, { name: "COUPONFREQ", order: 70, type: String, read: DebtSecurityInfo.prototype.getCouponFrequency, write: DebtSecurityInfo.prototype.setCouponFrequency });
Element_add(DebtSecurityInfo, { name: "CALLPRICE", order: 80, type: Number, read: DebtSecurityInfo.prototype.getCallPrice, write: DebtSecurityInfo.prototype.setCallPrice });
Element_add(DebtSecurityInfo, { name: "YIELDTOCALL", order: 90, type: Number, read: DebtSecurityInfo.prototype.getYieldToCall, write: DebtSecurityInfo.prototype.setYieldToCall });
Element_add(DebtSecurityInfo, { name: "DTCALL", order: 100, type: Date, read: DebtSecurityInfo.prototype.getNextCallDate, write: DebtSecurityInfo.prototype.setNextCallDate });
Element_add(DebtSecurityInfo, { name: "CALLTYPE", order: 110, type: String, read: DebtSecurityInfo.prototype.getCallType, write: DebtSecurityInfo.prototype.setCallType });
Element_add(DebtSecurityInfo, { name: "YIELDTOMAT", order: 120, type: Number, read: DebtSecurityInfo.prototype.getYieldToMaturity, write: DebtSecurityInfo.prototype.setYieldToMaturity });
Element_add(DebtSecurityInfo, { name: "DTMAT", order: 130, type: Date, read: DebtSecurityInfo.prototype.getDebtMaturityDate, write: DebtSecurityInfo.prototype.setDebtMaturityDate });
Element_add(DebtSecurityInfo, { name: "ASSETCLASS", order: 140, type: String, read: DebtSecurityInfo.prototype.getAssetClass, write: DebtSecurityInfo.prototype.setAssetClass });
Element_add(DebtSecurityInfo, { name: "FIASSETCLASS", order: 150, type: String, read: DebtSecurityInfo.prototype.getFiAssetClass, write: DebtSecurityInfo.prototype.setFiAssetClass });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The type of mutual fund.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var MutualFundType;
(function (MutualFundType) {
    MutualFundType[MutualFundType["OPEN_END"] = 0] = "OPEN_END";
    MutualFundType[MutualFundType["CLOSE_END"] = 1] = "CLOSE_END";
    MutualFundType[MutualFundType["OTHER"] = 2] = "OTHER";
})(MutualFundType || (MutualFundType = {}));
function MutualFundType_fromOfx(ofxVal) {
    if ("OPENEND" === ofxVal) {
        return MutualFundType.OPEN_END;
    }
    else if ("CLOSEEND" === ofxVal) {
        return MutualFundType.CLOSE_END;
    }
    else if ("OTHER" === ofxVal) {
        return MutualFundType.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Info about a mutual fund security.
 * @see "Section 13.8.5.3, OFX Spec"
 *
 * @author Jon Perlow
 */
class MutualFundSecurityInfo extends BaseSecurityInfo {
    /**
     * Gets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
     * according to the OFX spec.
     *
     * @return the mutual fund type
     */
    getType() {
        return this.mfType;
    }
    /**
     * Sets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
     * according to the OFX spec.
     *
     * @param mfType the mutual fund type
     */
    setType(mfType) {
        this.mfType = mfType;
    }
    /**
     * Gets the mutual fund type as one of the well-known types.
     *
     * @return the mutual fund type or null if it's not one of the well-known types
     */
    getTypeEnum() {
        return MutualFundType_fromOfx(this.getType());
    }
    /**
     * Gets the yield as a rate. This is an optional field according to the OFX spec.
     *
     * @return the yield as a rate
     */
    getYield() {
        return this.yield;
    }
    /**
     * Sets the yield as a rate. This is an optional field according to the OFX spec.
     *
     * @param yield the yield as a rate
     */
    setYield(yield_) {
        this.yield = yield_;
    }
    /**
     * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
     *
     * @return the as-of date for the yield
     */
    getDateYieldAsOf() {
        return this.dateYieldAsOf;
    }
    /**
     * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
     *
     * @param dateYieldAsOf the as-of date for the yield
     */
    setDateYieldAsOf(dateYieldAsOf) {
        this.dateYieldAsOf = dateYieldAsOf;
    }
}
Aggregate_add(MutualFundSecurityInfo, "MFINFO");
Element_add(MutualFundSecurityInfo, { name: "MFTYPE", order: 20, type: String, read: MutualFundSecurityInfo.prototype.getType, write: MutualFundSecurityInfo.prototype.setType });
Element_add(MutualFundSecurityInfo, { name: "YIELD", order: 30, type: Number, read: MutualFundSecurityInfo.prototype.getYield, write: MutualFundSecurityInfo.prototype.setYield });
Element_add(MutualFundSecurityInfo, { name: "DTYIELDASOF", order: 40, type: Date, read: MutualFundSecurityInfo.prototype.getDateYieldAsOf, write: MutualFundSecurityInfo.prototype.setDateYieldAsOf });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type of option.
 * @see "Section 13.8.5.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var OptionType;
(function (OptionType) {
    OptionType[OptionType["PUT"] = 0] = "PUT";
    OptionType[OptionType["CALL"] = 1] = "CALL";
})(OptionType || (OptionType = {}));
function OptionType_fromOfx(ofxVal) {
    if ("PUT" === ofxVal) {
        return OptionType.PUT;
    }
    else if ("CALL" === ofxVal) {
        return OptionType.CALL;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Info about an option security.
 * @see "Section 13.8.5.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class OptionSecurityInfo extends BaseSecurityInfo {
    /**
     * Gets the type of option. One of "PUT" or "CALL". This is a required field according to the
     * OFX spec.
     *
     * @return the option type
     */
    getOptionType() {
        return this.optionType;
    }
    /**
     * Sets the type of option. One of "PUT" or "CALL". This is a required field according to the
     * OFX spec.
     *
     * @param optionType the option type
     */
    setOptionType(optionType) {
        this.optionType = optionType;
    }
    /**
     * Gets the option type as a well-known enum value.
     *
     * @return the option type or null if it's not one of the well-known types
     */
    getOptionTypeEnum() {
        return OptionType_fromOfx(this.getOptionType());
    }
    /**
     * Gets the strike price of the option. This is a required field according to the OFX spec.
     *
     * @return the option strike price
     */
    getStrikePrice() {
        return this.strikePrice;
    }
    /**
     * Sets the strike price of the option. This is a required field according to the OFX spec.
     *
     * @param strikePrice the option strike price
     */
    setStrikePrice(strikePrice) {
        this.strikePrice = strikePrice;
    }
    /**
     * Gets the expiration date of the option. This is a required field according to the OFX spec.
     *
     * @return the expiration date of the option
     */
    getExpirationDate() {
        return this.expirationDate;
    }
    /**
     * Sets the expiration date of the option. This is a required field according to the OFX spec.
     *
     * @param expirationDate the expiration date of the option
     */
    setExpirationDate(expirationDate) {
        this.expirationDate = expirationDate;
    }
    /**
     * Gets the number of shares per option contact. This is a required field according to the OFX
     * spec.
     *
     * @return the number of shares per option contact
     */
    getSharesPerContact() {
        return this.sharesPerContact;
    }
    /**
     * Sets the number of shares per option contact. This is a required field according to the OFX
     * spec.
     *
     * @param sharesPerContact the number of shares per option contact
     */
    setSharesPerContact(sharesPerContact) {
        this.sharesPerContact = sharesPerContact;
    }
    /**
     * Gets the security id of the underling security. This is an optional field according to the OFX
     * spec.
     *
     * @return the security id of the underlying security
     */
    getUnderlyingSecurity() {
        return this.underlyingSecurity;
    }
    /**
     * Sets the security id of the underling security. This is an optional field according to the OFX
     * spec.
     *
     * @param underlyingSecurity the security id of the underlying security
     */
    setUnderlyingSecurity(underlyingSecurity) {
        this.underlyingSecurity = underlyingSecurity;
    }
    /**
     * Gets the asset class of the option. This is an optional field according to the OFX spec.
     *
     * @return the asset class of the option
     */
    getAssetClass() {
        return this.assetClass;
    }
    /**
     * Sets the asset class of the option. This is an optional field according to the OFX spec.
     *
     * @param assetClass the asset class of the option
     */
    setAssetClass(assetClass) {
        this.assetClass = assetClass;
    }
    /**
     * Gets the assert class as one of the well-known types.
     *
     * @return the asset class or null if it's not one of the well-known types
     */
    getAssetClassEnum() {
        return AssetClass_fromOfx(this.getAssetClass());
    }
    /**
     * Gets the FI-defined asset class of the option. This is an optional field according to the OFX
     * spec.
     *
     * @return the FI-defined asset class of the option
     */
    getFiAssetClass() {
        return this.fiAssetClass;
    }
    /**
     * Sets the FI-defined asset class of the option. This is an optional field according to the OFX
     * spec.
     *
     * @param fiAssetClass the FI-defined asset class of the option
     */
    setFiAssetClass(fiAssetClass) {
        this.fiAssetClass = fiAssetClass;
    }
}
Aggregate_add(OptionSecurityInfo, "OPTINFO");
Element_add(OptionSecurityInfo, { name: "OPTTYPE", order: 20, type: String, read: OptionSecurityInfo.prototype.getOptionType, write: OptionSecurityInfo.prototype.setOptionType });
Element_add(OptionSecurityInfo, { name: "STRIKEPRICE", order: 30, type: Number, read: OptionSecurityInfo.prototype.getStrikePrice, write: OptionSecurityInfo.prototype.setStrikePrice });
Element_add(OptionSecurityInfo, { name: "DTEXPIRE", order: 40, type: Date, read: OptionSecurityInfo.prototype.getExpirationDate, write: OptionSecurityInfo.prototype.setExpirationDate });
Element_add(OptionSecurityInfo, { name: "SHPERCTRCT", order: 50, type: Number, read: OptionSecurityInfo.prototype.getSharesPerContact, write: OptionSecurityInfo.prototype.setSharesPerContact });
Element_add(OptionSecurityInfo, { name: "SECID", order: 60, type: SecurityId, read: OptionSecurityInfo.prototype.getUnderlyingSecurity, write: OptionSecurityInfo.prototype.setUnderlyingSecurity });
Element_add(OptionSecurityInfo, { name: "ASSETCLASS", order: 70, type: String, read: OptionSecurityInfo.prototype.getAssetClass, write: OptionSecurityInfo.prototype.setAssetClass });
Element_add(OptionSecurityInfo, { name: "FIASSETCLASS", order: 80, type: String, read: OptionSecurityInfo.prototype.getFiAssetClass, write: OptionSecurityInfo.prototype.setFiAssetClass });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Info about any other type of security.
 * @see "Section 13.8.5.5, OFX Spec"
 *
 * @author Jon Perlow
 */
class OtherSecurityInfo extends BaseSecurityInfo {
    /**
     * Gets a description of the type of security. This is an optional field according to the OFX
     * spec.
     *
     * @return the description of the security
     */
    getTypeDesc() {
        return this.typeDesc;
    }
    /**
     * Sets a description of the type of security. This is an optional field according to the OFX
     * spec.
     *
     * @param typeDesc the description of the security
     */
    setTypeDesc(typeDesc) {
        this.typeDesc = typeDesc;
    }
    /**
     * Gets the asset class of the option. This is an optional field according to the OFX spec.
     *
     * @return the asset class of the debt
     */
    getAssetClass() {
        return this.assetClass;
    }
    /**
     * Sets the asset class of the debt. This is an optional field according to the OFX spec.
     *
     * @param assetClass the asset class of the debt
     */
    setAssetClass(assetClass) {
        this.assetClass = assetClass;
    }
    /**
     * Gets the assert class as one of the well-known types.
     *
     * @return the asset class or null if it's not one of the well-known types
     */
    getAssetClassEnum() {
        return AssetClass_fromOfx(this.getAssetClass());
    }
    /**
     * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
     * spec.
     *
     * @return the FI-defined asset class of the debt
     */
    getFiAssetClass() {
        return this.fiAssetClass;
    }
    /**
     * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
     * spec.
     *
     * @param fiAssetClass the FI-defined asset class of the debt
     */
    setFiAssetClass(fiAssetClass) {
        this.fiAssetClass = fiAssetClass;
    }
}
Aggregate_add(OtherSecurityInfo, "OTHERINFO");
Element_add(OtherSecurityInfo, { name: "TYPEDESC", order: 20, type: String, read: OtherSecurityInfo.prototype.getTypeDesc, write: OtherSecurityInfo.prototype.setTypeDesc });
Element_add(OtherSecurityInfo, { name: "ASSETCLASS", order: 30, type: String, read: OtherSecurityInfo.prototype.getAssetClass, write: OtherSecurityInfo.prototype.setAssetClass });
Element_add(OtherSecurityInfo, { name: "FIASSETCLASS", order: 40, type: String, read: OtherSecurityInfo.prototype.getFiAssetClass, write: OtherSecurityInfo.prototype.setFiAssetClass });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Aggregate for a list of securities.
 * @see "Section 13.8.4, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityList {
    getSecurityInfos() {
        return this.securityInfos;
    }
    setSecurityInfos(securityInfos) {
        this.securityInfos = securityInfos;
    }
}
Aggregate_add(SecurityList, "SECLIST");
ChildAggregate_add(SecurityList, { order: 10, type: Array, collectionEntryType: BaseSecurityInfo, read: SecurityList.prototype.getSecurityInfos, write: SecurityList.prototype.setSecurityInfos });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Security list response. This is an empty aggregate. The actual security information is included
 * in the "SECLIST" aggregate.
 * @see "Section 13.8.3, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityListResponse extends ResponseMessage {
    getResponseMessageName() {
        return "security list";
    }
}
Aggregate_add(SecurityListResponse, "SECLISTRS");

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Security list transaction response.
 * @see "Section 13.8.3.1, OFX Spec"
 *
 * @author Jon Perlow
 */
class SecurityListResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(SecurityListResponseTransaction, "SECLISTTRNRS");
ChildAggregate_add(SecurityListResponseTransaction, { required: true, order: 30, type: SecurityListResponse, read: SecurityListResponseTransaction.prototype.getMessage, write: SecurityListResponseTransaction.prototype.setMessage });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Jon Perlow
 */
class SecurityListResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.investment_security;
    }
    /**
     * The security list response list transaction.
     *
     * Most OFX files have a single security response.
     *
     * @return The security list response list.
     */
    getSecurityListResponse() {
        return this.securityListResponse;
    }
    /**
     * The security list response.
     *
     * @param securityListResponse The security list response.
     */
    setSecurityListResponse(securityListResponse) {
        this.securityListResponse = securityListResponse;
    }
    getSecurityList() {
        return this.securityList;
    }
    setSecurityList(securityList) {
        this.securityList = securityList;
    }
    // Inherited.
    getResponseMessages() {
        var ret = new Array();
        ret.push(this.securityListResponse);
        return ret;
    }
}
Aggregate_add(SecurityListResponseMessageSet, "SECLISTMSGSRSV1");
ChildAggregate_add(SecurityListResponseMessageSet, { order: 0, type: SecurityListResponseTransaction, read: SecurityListResponseMessageSet.prototype.getSecurityListResponse, write: SecurityListResponseMessageSet.prototype.setSecurityListResponse });
ChildAggregate_add(SecurityListResponseMessageSet, { order: 10, type: SecurityList, read: SecurityListResponseMessageSet.prototype.getSecurityList, write: SecurityListResponseMessageSet.prototype.setSecurityList });

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The type of debt.
 * @see "Section 13.8.5.6, OFX Spec"
 *
 * @author Jon Perlow
 */
var StockType;
(function (StockType) {
    StockType[StockType["COMMON"] = 0] = "COMMON";
    StockType[StockType["PREFERRED"] = 1] = "PREFERRED";
    StockType[StockType["CONVERTIBLE"] = 2] = "CONVERTIBLE";
    StockType[StockType["OTHER"] = 3] = "OTHER";
})(StockType || (StockType = {}));
function StockType_fromOfx(ofxVal) {
    if ("COMMON" === ofxVal) {
        return StockType.COMMON;
    }
    else if ("PREFERRED" === ofxVal) {
        return StockType.PREFERRED;
    }
    else if ("CONVERTIBLE" === ofxVal) {
        return StockType.CONVERTIBLE;
    }
    else if ("OTHER" === ofxVal) {
        return StockType.OTHER;
    }
    else {
        return null;
    }
}

/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Info about a stock security.
 * @see "Section 13.8.5.6, OFX Spec"
 *
 * @author Jon Perlow
 */
class StockSecurityInfo extends BaseSecurityInfo {
    /**
     * Gets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
     * optional field according to the OFX spec.
     *
     * @return the type of stock
     */
    getType() {
        return this.stockType;
    }
    /**
     * Sets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
     * optional field according to the OFX spec.
     *
     * @param stockType the type of stock
     */
    setType(stockType) {
        this.stockType = stockType;
    }
    /**
     * Gets the type of stock as one of the well-known types.
     *
     * @return the type of stock or null if it's not one of the well-known types
     */
    getTypeEnum() {
        return StockType_fromOfx(this.getType());
    }
    /**
     * Gets the current yield reported as the dividend expressed as a portion of the current stock
     * price, a rate. This is an optional field according to the OFX spec.
     *
     * @return the dividend yield
     */
    getYield() {
        return this.yield;
    }
    /**
     * Sets the current yield reported as the dividend expressed as a portion of the current stock
     * price, a rate. This is an optional field according to the OFX spec.
     *
     * @param yield the dividend yield
     */
    setYield(yield_) {
        this.yield = yield_;
    }
    /**
     * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
     *
     * @return the as-of date for the yield
     */
    getDateYieldAsOf() {
        return this.dateYieldAsOf;
    }
    /**
     * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
     *
     * @param dateYieldAsOf the as-of date for the yield
     */
    setDateYieldAsOf(dateYieldAsOf) {
        this.dateYieldAsOf = dateYieldAsOf;
    }
    /**
     * Gets the asset class of the stock. This is an optional field according to the OFX spec.
     *
     * @return the asset class of the stock
     */
    getAssetClass() {
        return this.assetClass;
    }
    /**
     * Sets the asset class of the stock. This is an optional field according to the OFX spec.
     *
     * @param assetClass the asset class of the stock
     */
    setAssetClass(assetClass) {
        this.assetClass = assetClass;
    }
    /**
     * Gets the assert class as one of the well-known types.
     *
     * @return the asset class or null if it's not one of the well-known types
     */
    getAssetClassEnum() {
        return AssetClass_fromOfx(this.getAssetClass());
    }
    /**
     * Gets the FI-defined asset class of the stock. This is an optional field according to the OFX
     * spec.
     *
     * @return the FI-defined asset class of the stock
     */
    getFiAssetClass() {
        return this.fiAssetClass;
    }
    /**
     * Sets the FI-defined asset class of the stock. This is an optional field according to the OFX
     * spec.
     *
     * @param fiAssetClass the FI-defined asset class of the stock
     */
    setFiAssetClass(fiAssetClass) {
        this.fiAssetClass = fiAssetClass;
    }
}
Aggregate_add(StockSecurityInfo, "STOCKINFO");
Element_add(StockSecurityInfo, { name: "STOCKTYPE", order: 20, type: String, read: StockSecurityInfo.prototype.getType, write: StockSecurityInfo.prototype.setType });
Element_add(StockSecurityInfo, { name: "YIELD", order: 30, type: Number, read: StockSecurityInfo.prototype.getYield, write: StockSecurityInfo.prototype.setYield });
Element_add(StockSecurityInfo, { name: "DTYIELDASOF", order: 40, type: Date, read: StockSecurityInfo.prototype.getDateYieldAsOf, write: StockSecurityInfo.prototype.setDateYieldAsOf });
Element_add(StockSecurityInfo, { name: "ASSETCLASS", order: 50, type: String, read: StockSecurityInfo.prototype.getAssetClass, write: StockSecurityInfo.prototype.setAssetClass });
Element_add(StockSecurityInfo, { name: "FIASSETCLASS", order: 60, type: String, read: StockSecurityInfo.prototype.getFiAssetClass, write: StockSecurityInfo.prototype.setFiAssetClass });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Response to a change a user password request.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.2.2, OFX Spec."
 */
class PasswordChangeResponse extends ResponseMessage {
    /**
     * The id of the user changing password.
     *
     * @return The id of the user changing password.
     */
    getUserId() {
        return this.userId;
    }
    // Inherited.
    getResponseMessageName() {
        return "password change";
    }
    /**
     * The id of the user changing password.
     *
     * @param userId The id of the user changing password.
     */
    setUserId(userId) {
        this.userId = userId;
    }
    /**
     * The timestamp of the password change.
     *
     * @return The timestamp of the password change.
     */
    getChangeTimestamp() {
        return this.changeTimestamp;
    }
    /**
     * The timestamp of the password change.
     *
     * @param changeTimestamp The timestamp of the password change.
     */
    setChangeTimestamp(changeTimestamp) {
        this.changeTimestamp = changeTimestamp;
    }
}
Aggregate_add(PasswordChangeResponse, "PINCHRQ");
Element_add(PasswordChangeResponse, { name: "USERID", required: true, order: 0, type: String, read: PasswordChangeResponse.prototype.getUserId, write: PasswordChangeResponse.prototype.setUserId });
Element_add(PasswordChangeResponse, { name: "DTCHANGED", order: 10, type: Date, read: PasswordChangeResponse.prototype.getChangeTimestamp, write: PasswordChangeResponse.prototype.setChangeTimestamp });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class PasswordChangeResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The message.
     *
     * @return The message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The message.
     *
     * @param message The message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(PasswordChangeResponseTransaction, "PINCHTRNRS");
ChildAggregate_add(PasswordChangeResponseTransaction, { required: true, order: 30, type: PasswordChangeResponse, read: PasswordChangeResponseTransaction.prototype.getMessage, write: PasswordChangeResponseTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The signon response message.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.1.2, OFX Spec."
 */
class SignonResponse extends ResponseMessage {
    constructor() {
        super();
        this.language = "ENG"; //Locale.US.getISO3Language();
    }
    getResponseMessageName() {
        return "signon";
    }
    getStatusHolderName() {
        return this.getResponseMessageName();
    }
    /**
     * The signon response status.
     *
     * @return The signon response status.
     */
    getStatus() {
        return this.status;
    }
    /**
     * The signon response status.
     *
     * @param status The signon response status.
     */
    setStatus(status) {
        this.status = status;
    }
    /**
     * The timestamp of this response.
     *
     * @return The timestamp of this response.
     */
    getTimestamp() {
        return this.timestamp;
    }
    /**
     * The timestamp of this response.
     *
     * @param timestamp The timestamp of this response.
     */
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }
    /**
     * The userkey that can be used instead of the username/password.
     *
     * @return The userkey that can be used instead of the username/password.
     */
    getUserKey() {
        return this.userKey;
    }
    /**
     * The userkey that can be used instead of the username/password.
     *
     * @param userKey The userkey that can be used instead of the username/password.
     */
    setUserKey(userKey) {
        this.userKey = userKey;
    }
    /**
     * The date/time of the expiration of the user key.
     *
     * @return The date/time of the expiration of the user key.
     */
    getUserKeyExpiration() {
        return this.userKeyExpiration;
    }
    /**
     * The date/time of the expiration of the user key.
     *
     * @param userKeyExpiration The date/time of the expiration of the user key.
     */
    setUserKeyExpiration(userKeyExpiration) {
        this.userKeyExpiration = userKeyExpiration;
    }
    /**
     * The three-letter langauge code.
     *
     * @return The three-letter langauge code.
     * @see java.util.Locale#getISO3Language()
     */
    getLanguage() {
        return this.language;
    }
    /**
     * The three-letter langauge code.
     *
     * @param language The three-letter langauge code.
     */
    setLanguage(language) {
        this.language = language;
    }
    /**
     * The date/time that the FI profile was last updated.
     *
     * @return The date/time that the FI profile was last updated.
     */
    getProfileLastUpdated() {
        return this.profileLastUpdated;
    }
    /**
     * The date/time that the FI profile was last updated.
     *
     * @param profileLastUpdated The date/time that the FI profile was last updated.
     */
    setProfileLastUpdated(profileLastUpdated) {
        this.profileLastUpdated = profileLastUpdated;
    }
    /**
     * The date/time that the user's account information was updated.
     *
     * @return The date/time that the user's account information was updated.
     */
    getAccountLastUpdated() {
        return this.accountLastUpdated;
    }
    /**
     * The date/time that the user's account information was updated.
     *
     * @param accountLastUpdated The date/time that the user's account information was updated.
     */
    setAccountLastUpdated(accountLastUpdated) {
        this.accountLastUpdated = accountLastUpdated;
    }
    /**
     * The financial instutution identity information.
     *
     * @return The financial instutution identity information.
     */
    getFinancialInstitution() {
        return this.financialInstitution;
    }
    /**
     * The financial instutution identity information.
     *
     * @param financialInstitution The financial instutution identity information.
     */
    setFinancialInstitution(financialInstitution) {
        this.financialInstitution = financialInstitution;
    }
    /**
     * The session id for the client.
     *
     * @return The session id for the client.
     */
    getSessionId() {
        return this.sessionId;
    }
    /**
     * The session id for the client.
     *
     * @param sessionId The session id for the client.
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    /**
     * The access key that the client should return in the next sign-on requuest.
     *
     * @return The access key that the client should return in the next sign-on requuest.
     */
    getAccessKey() {
        return this.accessKey;
    }
    /**
     * The access key that the client should return in the next sign-on requuest.
     *
     * @param accessKey The access key that the client should return in the next sign-on requuest.
     */
    setAccessKey(accessKey) {
        this.accessKey = accessKey;
    }
}
Aggregate_add(SignonResponse, "SONRS");
ChildAggregate_add(SignonResponse, { required: true, order: 0, type: Status, read: SignonResponse.prototype.getStatus, write: SignonResponse.prototype.setStatus });
Element_add(SignonResponse, { name: "DTSERVER", required: true, order: 10, type: Date, read: SignonResponse.prototype.getTimestamp, write: SignonResponse.prototype.setTimestamp });
Element_add(SignonResponse, { name: "USERKEY", order: 20, type: String, read: SignonResponse.prototype.getUserKey, write: SignonResponse.prototype.setUserKey });
Element_add(SignonResponse, { name: "TSKEYEXPIRE", order: 30, type: Date, read: SignonResponse.prototype.getUserKeyExpiration, write: SignonResponse.prototype.setUserKeyExpiration });
Element_add(SignonResponse, { name: "LANGUAGE", required: true, order: 40, type: String, read: SignonResponse.prototype.getLanguage, write: SignonResponse.prototype.setLanguage });
Element_add(SignonResponse, { name: "DTPROFUP", order: 50, type: Date, read: SignonResponse.prototype.getProfileLastUpdated, write: SignonResponse.prototype.setProfileLastUpdated });
Element_add(SignonResponse, { name: "DTACCTUP", order: 60, type: Date, read: SignonResponse.prototype.getAccountLastUpdated, write: SignonResponse.prototype.setAccountLastUpdated });
ChildAggregate_add(SignonResponse, { order: 70, type: FinancialInstitutionInfo, read: SignonResponse.prototype.getFinancialInstitution, write: SignonResponse.prototype.setFinancialInstitution });
Element_add(SignonResponse, { name: "SESSCOOKIE", order: 80, type: String, read: SignonResponse.prototype.getSessionId, write: SignonResponse.prototype.setSessionId });
Element_add(SignonResponse, { name: "ACCESSKEY", order: 90, type: String, read: SignonResponse.prototype.getAccessKey, write: SignonResponse.prototype.setAccessKey });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The sign-on response message set.
 *
 * @author Ryan Heaton
 * @see "Section 2.5, OFX Spec."
 */
class SignonResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.signon;
    }
    /**
     * The message for this message set.
     *
     * @return The message for this message set.
     */
    getSignonResponse() {
        return this.signonResponse;
    }
    /**
     * The message for this message set.
     *
     * @param signonResponse The message for this message set.
     */
    setSignonResponse(signonResponse) {
        this.signonResponse = signonResponse;
    }
    /**
     * The password change response.
     *
     * @return The password change response.
     */
    getPasswordChangeResponse() {
        return this.passwordChangeResponse;
    }
    /**
     * The password change response.
     *
     * @param passwordChangeResponse The password change response.
     */
    setPasswordChangeResponse(passwordChangeResponse) {
        this.passwordChangeResponse = passwordChangeResponse;
    }
    //todo: challenge request/response
    // Inherited.
    getResponseMessages() {
        var messages = new Array();
        if (this.getSignonResponse() != null) {
            messages.push(this.getSignonResponse());
        }
        return messages;
    }
}
Aggregate_add(SignonResponseMessageSet, "SIGNONMSGSRSV1");
ChildAggregate_add(SignonResponseMessageSet, { order: 0, type: SignonResponse, read: SignonResponseMessageSet.prototype.getSignonResponse, write: SignonResponseMessageSet.prototype.setSignonResponse });
ChildAggregate_add(SignonResponseMessageSet, { order: 10, type: PasswordChangeResponseTransaction, read: SignonResponseMessageSet.prototype.getPasswordChangeResponse, write: SignonResponseMessageSet.prototype.setPasswordChangeResponse });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class AccountProfile {
    /**
     * Description of the account.
     *
     * @return The description of the account.
     */
    getDescription() {
        return this.description;
    }
    /**
     * The description of the account.
     *
     * @param description The description of the account.
     */
    setDescription(description) {
        this.description = description;
    }
    /**
     * Phone number for the account.
     *
     * @return Phone number for the account.
     */
    getPhone() {
        return this.phone;
    }
    /**
     * Phone number for the account.
     *
     * @param phone Phone number for the account.
     */
    setPhone(phone) {
        this.phone = phone;
    }
    /**
     * Account specifics.
     *
     * @return Account specifics.
     */
    getSpecifics() {
        if (this.getBankSpecifics() != null && this.getCreditCardSpecifics() != null) {
            throw new OFXException("Only one account specifics aggregate can be set at a time.");
        }
        else if (this.getBankSpecifics() != null) {
            return this.getBankSpecifics();
        }
        else if (this.getInvestmentSpecifics() != null) {
            return this.getInvestmentSpecifics();
        }
        else {
            return this.getCreditCardSpecifics();
        }
    }
    /**
     * Account specifics.
     *
     * @param specifics Account specifics.
     */
    setSpecifics(specifics) {
        if (specifics instanceof BankAccountInfo) {
            this.setBankSpecifics(specifics);
        }
        else if (specifics instanceof CreditCardAccountInfo) {
            this.setCreditCardSpecifics(specifics);
        }
        else if (specifics instanceof InvestmentAccountInfo) {
            this.setInvestmentSpecifics(specifics);
        }
        else {
            throw new OFXException("Unknown specifics type: " + specifics);
        }
    }
    /**
     * Bank-specific info.
     *
     * @return Bank-specific info.
     */
    getBankSpecifics() {
        return this.bankSpecifics;
    }
    /**
     * Bank-specific info.
     *
     * @param bankSpecifics Bank-specific info.
     */
    setBankSpecifics(bankSpecifics) {
        this.creditCardSpecifics = null;
        this.investSpecifics = null;
        this.bankSpecifics = bankSpecifics;
    }
    /**
     * Credit-card account info.
     *
     * @return Credit-card account info.
     */
    getCreditCardSpecifics() {
        return this.creditCardSpecifics;
    }
    /**
     * Credit-card account info.
     *
     * @param creditCardSpecifics Credit-card account info.
     */
    setCreditCardSpecifics(creditCardSpecifics) {
        this.bankSpecifics = null;
        this.investSpecifics = null;
        this.creditCardSpecifics = creditCardSpecifics;
    }
    /**
     * Investment account info.
     *
     * @return Investment account info.
     */
    getInvestmentSpecifics() {
        return this.investSpecifics;
    }
    /**
     * Investment account info.
     *
     * @param investSpecifics Investment account info.
     */
    setInvestmentSpecifics(investSpecifics) {
        this.bankSpecifics = null;
        this.creditCardSpecifics = null;
        this.investSpecifics = investSpecifics;
    }
}
Aggregate_add(AccountProfile, "ACCTINFO");
Element_add(AccountProfile, { name: "DESC", order: 0, type: String, read: AccountProfile.prototype.getDescription, write: AccountProfile.prototype.setDescription });
Element_add(AccountProfile, { name: "PHONE", order: 10, type: String, read: AccountProfile.prototype.getPhone, write: AccountProfile.prototype.setPhone });
ChildAggregate_add(AccountProfile, { order: 20, type: BankAccountInfo, read: AccountProfile.prototype.getBankSpecifics, write: AccountProfile.prototype.setBankSpecifics });
ChildAggregate_add(AccountProfile, { order: 30, type: CreditCardAccountInfo, read: AccountProfile.prototype.getCreditCardSpecifics, write: AccountProfile.prototype.setCreditCardSpecifics });
ChildAggregate_add(AccountProfile, { order: 40, type: InvestmentAccountInfo, read: AccountProfile.prototype.getInvestmentSpecifics, write: AccountProfile.prototype.setInvestmentSpecifics });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class AccountInfoResponse extends ResponseMessage {
    constructor() {
        super();
        this.lastUpdated = new Date(0); //default is never updated.
    }
    getResponseMessageName() {
        return "account info";
    }
    /**
     * When the account info was last updated.
     *
     * @return When the account info was last updated.
     */
    getLastUpdated() {
        return this.lastUpdated;
    }
    /**
     * When the account info was last updated.
     *
     * @param lastUpdated When the account info was last updated.
     */
    setLastUpdated(lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
    /**
     * The accounts.
     *
     * @return The accounts.
     */
    getAccounts() {
        return this.accounts;
    }
    /**
     * The accounts.
     *
     * @param accounts The accounts.
     */
    setAccounts(accounts) {
        this.accounts = accounts;
    }
}
Aggregate_add(AccountInfoResponse, "ACCTINFORS");
Element_add(AccountInfoResponse, { name: "DTACCTUP", required: true, order: 0, type: Date, read: AccountInfoResponse.prototype.getLastUpdated, write: AccountInfoResponse.prototype.setLastUpdated });
ChildAggregate_add(AccountInfoResponse, { order: 10, type: Array, collectionEntryType: AccountProfile, read: AccountInfoResponse.prototype.getAccounts, write: AccountInfoResponse.prototype.setAccounts });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class AccountInfoResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The wrapped message.
     *
     * @return The wrapped message.
     */
    getMessage() {
        return this.message;
    }
    /**
     * The wrapped message.
     *
     * @param message The wrapped message.
     */
    setMessage(message) {
        this.message = message;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getMessage();
    }
}
Aggregate_add(AccountInfoResponseTransaction, "ACCTINFOTRNRS");
ChildAggregate_add(AccountInfoResponseTransaction, { required: true, order: 30, type: AccountInfoResponse, read: AccountInfoResponseTransaction.prototype.getMessage, write: AccountInfoResponseTransaction.prototype.setMessage });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Ryan Heaton
 */
class SignupResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.signup;
    }
    /**
     * The account info response.
     *
     * @return The account info response.
     */
    getAccountInfoResponse() {
        return this.accountInfoResponse;
    }
    /**
     * The account info response.
     *
     * @param accountInfoResponse The account info response.
     */
    setAccountInfoResponse(accountInfoResponse) {
        this.accountInfoResponse = accountInfoResponse;
    }
    /**
     * The response messages.
     *
     * @return The response messages.
     */
    getResponseMessages() {
        var messages = new Array();
        if (this.getAccountInfoResponse() != null) {
            messages.push(this.getAccountInfoResponse());
        }
        return messages;
    }
}
Aggregate_add(SignupResponseMessageSet, "SIGNUPMSGSRSV1");
ChildAggregate_add(SignupResponseMessageSet, { order: 0, type: AccountInfoResponseTransaction, read: SignupResponseMessageSet.prototype.getAccountInfoResponse, write: SignupResponseMessageSet.prototype.setAccountInfoResponse });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class ProcDet {
    /**
     * @return the dtAqd
     */
    getDtAqd() {
        return this.dtAqd;
    }
    /**
     * @param dtAqd the dtAqd to set
     */
    setDtAqd(dtAqd) {
        this.dtAqd = dtAqd;
    }
    /**
     * @return the dtSale
     */
    getDtSale() {
        return this.dtSale;
    }
    /**
     * @param dtSale the dtSale to set
     */
    setDtSale(dtSale) {
        this.dtSale = dtSale;
    }
    /**
     * @return the secName
     */
    getSecName() {
        return this.secName;
    }
    /**
     * @param secName the secName to set
     */
    setSecName(secName) {
        this.secName = secName;
    }
    /**
     * @return the costBasis
     */
    getCostBasis() {
        return this.costBasis;
    }
    /**
     * @param costBasis the costBasis to set
     */
    setCostBasis(costBasis) {
        this.costBasis = costBasis;
    }
    /**
     * @return the saleSpr
     */
    getSaleSpr() {
        return this.saleSpr;
    }
    /**
     * @param saleSpr the saleSpr to set
     */
    setSaleSpr(saleSpr) {
        this.saleSpr = saleSpr;
    }
    /**
     * @return the longShort
     */
    getLongShort() {
        return this.longShort;
    }
    /**
     * @param longShort the longShort to set
     */
    setLongShort(longShort) {
        this.longShort = longShort;
    }
    /**
     * @return the wasDisAllowed
     */
    getWasDisAllowed() {
        return this.wasDisAllowed;
    }
    /**
     * @param wasDisAllowed the wasDisAllowed to set
     */
    setWasDisAllowed(wasDisAllowed) {
        this.wasDisAllowed = wasDisAllowed;
    }
    /**
     * @return the noncoveredSec
     */
    getNoncoveredSec() {
        return this.noncoveredSec;
    }
    /**
     * @param noncoveredSec the noncoveredSec to set
     */
    setNoncoveredSec(noncoveredSec) {
        this.noncoveredSec = noncoveredSec;
    }
    /**
     * @return the basisNotshown
     */
    getBasisNotshown() {
        return this.basisNotshown;
    }
    /**
     * @param basisNotshown the basisNotshown to set
     */
    setBasisNotshown(basisNotshown) {
        this.basisNotshown = basisNotshown;
    }
}
Aggregate_add(ProcDet, "PROCDET_V100");
Element_add(ProcDet, { name: "DTAQD", required: false, order: 0, type: String, read: ProcDet.prototype.getDtAqd, write: ProcDet.prototype.setDtAqd });
Element_add(ProcDet, { name: "DTSALE", required: false, order: 2, type: String, read: ProcDet.prototype.getDtSale, write: ProcDet.prototype.setDtSale });
Element_add(ProcDet, { name: "SECNAME", required: false, order: 3, type: String, read: ProcDet.prototype.getSecName, write: ProcDet.prototype.setSecName });
Element_add(ProcDet, { name: "COSTBASIS", required: false, order: 4, type: String, read: ProcDet.prototype.getCostBasis, write: ProcDet.prototype.setCostBasis });
Element_add(ProcDet, { name: "SALESPR", required: false, order: 5, type: String, read: ProcDet.prototype.getSaleSpr, write: ProcDet.prototype.setSaleSpr });
Element_add(ProcDet, { name: "LONGSHORT", required: false, order: 6, type: String, read: ProcDet.prototype.getLongShort, write: ProcDet.prototype.setLongShort });
Element_add(ProcDet, { name: "WASHSALELOSSDISALLOWED", required: false, order: 7, type: String, read: ProcDet.prototype.getWasDisAllowed, write: ProcDet.prototype.setWasDisAllowed });
Element_add(ProcDet, { name: "NONCOVEREDSECURITY", required: false, order: 8, type: String, read: ProcDet.prototype.getNoncoveredSec, write: ProcDet.prototype.setNoncoveredSec });
Element_add(ProcDet, { name: "BASISNOTSHOWN", required: false, order: 9, type: String, read: ProcDet.prototype.getBasisNotshown, write: ProcDet.prototype.setBasisNotshown });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class ExtDBInfo {
    /**
     * @return the procDet
     */
    getProcDet() {
        return this.procDet;
    }
    /**
     * @param procDet the procDet to set
     */
    setProcDet(procDet) {
        this.procDet = procDet;
    }
    /**
     * @return the teInterest
     */
    getTeInterest() {
        return this.teInterest;
    }
    /**
     * @param teInterest the teInterest to set
     */
    setTeInterest(teInterest) {
        this.teInterest = teInterest;
    }
    /**
     * @return the pabInterest
     */
    getPabInterest() {
        return this.pabInterest;
    }
    /**
     * @param pabInterest the pabInterest to set
     */
    setPabInterest(pabInterest) {
        this.pabInterest = pabInterest;
    }
    /**
     * @return the teIntDividend
     */
    getTeIntDividend() {
        return this.teIntDividend;
    }
    /**
     * @param teIntDividend the teIntDividend to set
     */
    setTeIntDividend(teIntDividend) {
        this.teIntDividend = teIntDividend;
    }
    /**
     * @return the pabDividend
     */
    getPabDividend() {
        return this.pabDividend;
    }
    /**
     * @param pabDividend the pabDividend to set
     */
    setPabDividend(pabDividend) {
        this.pabDividend = pabDividend;
    }
}
Aggregate_add(ExtDBInfo, "EXTDBINFO_V100");
ChildAggregate_add(ExtDBInfo, { required: false, order: 0, type: Array, collectionEntryType: ProcDet, read: ExtDBInfo.prototype.getProcDet, write: ExtDBInfo.prototype.setProcDet });
Element_add(ExtDBInfo, { name: "TEINTEREST", required: false, order: 1, type: String, read: ExtDBInfo.prototype.getTeInterest, write: ExtDBInfo.prototype.setTeInterest });
Element_add(ExtDBInfo, { name: "PABINTEREST", required: false, order: 2, type: String, read: ExtDBInfo.prototype.getPabInterest, write: ExtDBInfo.prototype.setPabInterest });
Element_add(ExtDBInfo, { name: "TEINTDIVIDEND", required: false, order: 3, type: String, read: ExtDBInfo.prototype.getTeIntDividend, write: ExtDBInfo.prototype.setTeIntDividend });
Element_add(ExtDBInfo, { name: "PABDIVIDEND", required: false, order: 4, type: String, read: ExtDBInfo.prototype.getPabDividend, write: ExtDBInfo.prototype.setPabDividend });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class PayerAddress {
    /**
     * @return the payerName1
     */
    getPayerName1() {
        return this.payerName1;
    }
    /**
     * @param payerName1 the payerName1 to set
     */
    setPayerName1(payerName1) {
        this.payerName1 = payerName1;
    }
    /**
     * @return the payerName2
     */
    getPayerName2() {
        return this.payerName2;
    }
    /**
     * @param payerName2 the payerName2 to set
     */
    setPayerName2(payerName2) {
        this.payerName2 = payerName2;
    }
    /**
     * @return the address1
     */
    getAddress1() {
        return this.address1;
    }
    /**
     * @param address1 the address1 to set
     */
    setAddress1(address1) {
        this.address1 = address1;
    }
    /**
     * @return the address2
     */
    getAddress2() {
        return this.address2;
    }
    /**
     * @param address2 the address2 to set
     */
    setAddress2(address2) {
        this.address2 = address2;
    }
    /**
     * @return the city
     */
    getCity() {
        return this.city;
    }
    /**
     * @param city the city to set
     */
    setCity(city) {
        this.city = city;
    }
    /**
     * @return the state
     */
    getState() {
        return this.state;
    }
    /**
     * @param state the state to set
     */
    setState(state) {
        this.state = state;
    }
    /**
     * @return the postalCode
     */
    getPostalCode() {
        return this.postalCode;
    }
    /**
     * @param postalCode the postalCode to set
     */
    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    }
    /**
     * @return the phone
     */
    getPhone() {
        return this.phone;
    }
    /**
     * @param phone the phone to set
     */
    setPhone(phone) {
        this.phone = phone;
    }
}
Aggregate_add(PayerAddress, "PAYERADDR");
Element_add(PayerAddress, { name: "PAYERNAME1", required: true, order: 0, type: String, read: PayerAddress.prototype.getPayerName1, write: PayerAddress.prototype.setPayerName1 });
Element_add(PayerAddress, { name: "PAYERNAME2", required: false, order: 1, type: String, read: PayerAddress.prototype.getPayerName2, write: PayerAddress.prototype.setPayerName2 });
Element_add(PayerAddress, { name: "ADDR1", required: true, order: 2, type: String, read: PayerAddress.prototype.getAddress1, write: PayerAddress.prototype.setAddress1 });
Element_add(PayerAddress, { name: "ADDR2", required: true, order: 3, type: String, read: PayerAddress.prototype.getAddress2, write: PayerAddress.prototype.setAddress2 });
Element_add(PayerAddress, { name: "CITY", required: true, order: 4, type: String, read: PayerAddress.prototype.getCity, write: PayerAddress.prototype.setCity });
Element_add(PayerAddress, { name: "STATE", required: true, order: 5, type: String, read: PayerAddress.prototype.getState, write: PayerAddress.prototype.setState });
Element_add(PayerAddress, { name: "POSTALCODE", required: true, order: 6, type: String, read: PayerAddress.prototype.getPostalCode, write: PayerAddress.prototype.setPostalCode });
Element_add(PayerAddress, { name: "PHONE", required: false, order: 7, type: String, read: PayerAddress.prototype.getPhone, write: PayerAddress.prototype.setPhone });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class RecAddress {
    /**
     * @return the recName1
     */
    getRecName1() {
        return this.recName1;
    }
    /**
     * @param recName1 the recName1 to set
     */
    setRecName1(recName1) {
        this.recName1 = recName1;
    }
    /**
     * @return the recName2
     */
    getRecName2() {
        return this.recName2;
    }
    /**
     * @param recName2 the recName2 to set
     */
    setRecName2(recName2) {
        this.recName2 = recName2;
    }
    /**
     * @return the address1
     */
    getAddress1() {
        return this.address1;
    }
    /**
     * @param address1 the address1 to set
     */
    setAddress1(address1) {
        this.address1 = address1;
    }
    /**
     * @return the address2
     */
    getAddress2() {
        return this.address2;
    }
    /**
     * @param address2 the address2 to set
     */
    setAddress2(address2) {
        this.address2 = address2;
    }
    /**
     * @return the city
     */
    getCity() {
        return this.city;
    }
    /**
     * @param city the city to set
     */
    setCity(city) {
        this.city = city;
    }
    /**
     * @return the state
     */
    getState() {
        return this.state;
    }
    /**
     * @param state the state to set
     */
    setState(state) {
        this.state = state;
    }
    /**
     * @return the postalCode
     */
    getPostalCode() {
        return this.postalCode;
    }
    /**
     * @param postalCode the postalCode to set
     */
    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    }
    /**
     * @return the phone
     */
    getPhone() {
        return this.phone;
    }
    /**
     * @param phone the phone to set
     */
    setPhone(phone) {
        this.phone = phone;
    }
}
Aggregate_add(RecAddress, "RECADDR");
Element_add(RecAddress, { name: "RECNAME1", required: true, order: 0, type: String, read: RecAddress.prototype.getRecName1, write: RecAddress.prototype.setRecName1 });
Element_add(RecAddress, { name: "RECNAME2", required: false, order: 1, type: String, read: RecAddress.prototype.getRecName2, write: RecAddress.prototype.setRecName2 });
Element_add(RecAddress, { name: "ADDR1", required: true, order: 2, type: String, read: RecAddress.prototype.getAddress1, write: RecAddress.prototype.setAddress1 });
Element_add(RecAddress, { name: "ADDR2", required: true, order: 3, type: String, read: RecAddress.prototype.getAddress2, write: RecAddress.prototype.setAddress2 });
Element_add(RecAddress, { name: "CITY", required: true, order: 4, type: String, read: RecAddress.prototype.getCity, write: RecAddress.prototype.setCity });
Element_add(RecAddress, { name: "STATE", required: true, order: 5, type: String, read: RecAddress.prototype.getState, write: RecAddress.prototype.setState });
Element_add(RecAddress, { name: "POSTALCODE", required: true, order: 6, type: String, read: RecAddress.prototype.getPostalCode, write: RecAddress.prototype.setPostalCode });
Element_add(RecAddress, { name: "PHONE", required: false, order: 7, type: String, read: RecAddress.prototype.getPhone, write: RecAddress.prototype.setPhone });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099B {
    getSrvrtId() {
        return this.srvrtId;
    }
    setSrvrtId(srvrtId) {
        this.srvrtId = srvrtId;
    }
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
    /**
     * @return the extDBInfo
     */
    getExtDBInfo() {
        return this.extDBInfo;
    }
    /**
     * @param extDBInfo the extDBInfo to set
     */
    setExtDBInfo(extDBInfo) {
        this.extDBInfo = extDBInfo;
    }
    /**
     * @return the payerAddress
     */
    getPayerAddress() {
        return this.payerAddress;
    }
    /**
     * @param payerAddress the payerAddress to set
     */
    setPayerAddress(payerAddress) {
        this.payerAddress = payerAddress;
    }
    /**
     * @return the payerId
     */
    getPayerId() {
        return this.payerId;
    }
    /**
     * @param payerId the payerId to set
     */
    setPayerId(payerId) {
        this.payerId = payerId;
    }
    /**
     * @return the recAddress
     */
    getRecAddress() {
        return this.recAddress;
    }
    /**
     * @param recAddress the recAddress to set
     */
    setRecAddress(recAddress) {
        this.recAddress = recAddress;
    }
    /**
     * @return the recId
     */
    getRecId() {
        return this.recId;
    }
    /**
     * @param recId the recId to set
     */
    setRecId(recId) {
        this.recId = recId;
    }
    /**
     * @return the recAcct
     */
    getRecAcct() {
        return this.recAcct;
    }
    /**
     * @param recAcct the recAcct to set
     */
    setRecAcct(recAcct) {
        this.recAcct = recAcct;
    }
}
Aggregate_add(Tax1099B, "TAX1099B_V100");
Element_add(Tax1099B, { name: "SRVRTID", required: true, order: 0, type: String, read: Tax1099B.prototype.getSrvrtId, write: Tax1099B.prototype.setSrvrtId });
Element_add(Tax1099B, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099B.prototype.getTaxYear, write: Tax1099B.prototype.setTaxYear });
ChildAggregate_add(Tax1099B, { required: true, order: 2, type: ExtDBInfo, read: Tax1099B.prototype.getExtDBInfo, write: Tax1099B.prototype.setExtDBInfo });
ChildAggregate_add(Tax1099B, { required: true, order: 3, type: PayerAddress, read: Tax1099B.prototype.getPayerAddress, write: Tax1099B.prototype.setPayerAddress });
Element_add(Tax1099B, { name: "PAYERID", required: true, order: 4, type: String, read: Tax1099B.prototype.getPayerId, write: Tax1099B.prototype.setPayerId });
ChildAggregate_add(Tax1099B, { required: true, order: 5, type: RecAddress, read: Tax1099B.prototype.getRecAddress, write: Tax1099B.prototype.setRecAddress });
Element_add(Tax1099B, { name: "RECID", required: true, order: 6, type: String, read: Tax1099B.prototype.getRecId, write: Tax1099B.prototype.setRecId });
Element_add(Tax1099B, { name: "RECACCT", required: true, order: 7, type: String, read: Tax1099B.prototype.getRecAcct, write: Tax1099B.prototype.setRecAcct });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099DIV {
    getSrvrtId() {
        return this.srvrtId;
    }
    setSrvrtId(srvrtId) {
        this.srvrtId = srvrtId;
    }
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
    /**
     * @return the ordDiv
     */
    getOrdDiv() {
        return this.ordDiv;
    }
    /**
     * @param ordDiv the ordDiv to set
     */
    setOrdDiv(ordDiv) {
        this.ordDiv = ordDiv;
    }
    /**
     * @return the qualifiedDiv
     */
    getQualifiedDiv() {
        return this.qualifiedDiv;
    }
    /**
     * @param qualifiedDiv the qualifiedDiv to set
     */
    setQualifiedDiv(qualifiedDiv) {
        this.qualifiedDiv = qualifiedDiv;
    }
    /**
     * @return the totCapGain
     */
    getTotCapGain() {
        return this.totCapGain;
    }
    /**
     * @param totCapGain the totCapGain to set
     */
    setTotCapGain(totCapGain) {
        this.totCapGain = totCapGain;
    }
    /**
     * @return the p28Gain
     */
    getP28Gain() {
        return this.p28Gain;
    }
    /**
     * @param p28Gain the p28Gain to set
     */
    setP28Gain(p28Gain) {
        this.p28Gain = p28Gain;
    }
    /**
     * @return the unrecSec1250
     */
    getUnrecSec1250() {
        return this.unrecSec1250;
    }
    /**
     * @param unrecSec1250 the unrecSec1250 to set
     */
    setUnrecSec1250(unrecSec1250) {
        this.unrecSec1250 = unrecSec1250;
    }
    /**
     * @return the sec1202
     */
    getSec1202() {
        return this.sec1202;
    }
    /**
     * @param sec1202 the sec1202 to set
     */
    setSec1202(sec1202) {
        this.sec1202 = sec1202;
    }
    /**
     * @return the nonTaxDist
     */
    getNonTaxDist() {
        return this.nonTaxDist;
    }
    /**
     * @param nonTaxDist the nonTaxDist to set
     */
    setNonTaxDist(nonTaxDist) {
        this.nonTaxDist = nonTaxDist;
    }
    /**
     * @return the fedTaxWh
     */
    getFedTaxWh() {
        return this.fedTaxWh;
    }
    /**
     * @param fedTaxWh the fedTaxWh to set
     */
    setFedTaxWh(fedTaxWh) {
        this.fedTaxWh = fedTaxWh;
    }
    /**
     * @return the investExp
     */
    getInvestExp() {
        return this.investExp;
    }
    /**
     * @param investExp the investExp to set
     */
    setInvestExp(investExp) {
        this.investExp = investExp;
    }
    /**
     * @return the forTaxPd
     */
    getForTaxPd() {
        return this.forTaxPd;
    }
    /**
     * @param forTaxPd the forTaxPd to set
     */
    setForTaxPd(forTaxPd) {
        this.forTaxPd = forTaxPd;
    }
    /**
     * @return the cashLiq
     */
    getCashLiq() {
        return this.cashLiq;
    }
    /**
     * @param cashLiq the cashLiq to set
     */
    setCashLiq(cashLiq) {
        this.cashLiq = cashLiq;
    }
    /**
     * @return the nonCashLiq
     */
    getNonCashLiq() {
        return this.nonCashLiq;
    }
    /**
     * @param nonCashLiq the nonCashLiq to set
     */
    setNonCashLiq(nonCashLiq) {
        this.nonCashLiq = nonCashLiq;
    }
    /**
     * @return the payerAddress
     */
    getPayerAddress() {
        return this.payerAddress;
    }
    /**
     * @param payerAddress the payerAddress to set
     */
    setPayerAddress(payerAddress) {
        this.payerAddress = payerAddress;
    }
    /**
     * @return the payerId
     */
    getPayerId() {
        return this.payerId;
    }
    /**
     * @param payerId the payerId to set
     */
    setPayerId(payerId) {
        this.payerId = payerId;
    }
    /**
     * @return the recAddress
     */
    getRecAddress() {
        return this.recAddress;
    }
    /**
     * @param recAddress the recAddress to set
     */
    setRecAddress(recAddress) {
        this.recAddress = recAddress;
    }
    /**
     * @return the recId
     */
    getRecId() {
        return this.recId;
    }
    /**
     * @param recId the recId to set
     */
    setRecId(recId) {
        this.recId = recId;
    }
    /**
     * @return the recAcct
     */
    getRecAcct() {
        return this.recAcct;
    }
    /**
     * @param recAcct the recAcct to set
     */
    setRecAcct(recAcct) {
        this.recAcct = recAcct;
    }
}
Aggregate_add(Tax1099DIV, "TAX1099DIV_V100");
Element_add(Tax1099DIV, { name: "SRVRTID", required: false, order: 0, type: String, read: Tax1099DIV.prototype.getSrvrtId, write: Tax1099DIV.prototype.setSrvrtId });
Element_add(Tax1099DIV, { name: "TAXYEAR", required: false, order: 1, type: String, read: Tax1099DIV.prototype.getTaxYear, write: Tax1099DIV.prototype.setTaxYear });
Element_add(Tax1099DIV, { name: "ORDDIV", required: false, order: 2, type: String, read: Tax1099DIV.prototype.getOrdDiv, write: Tax1099DIV.prototype.setOrdDiv });
Element_add(Tax1099DIV, { name: "QUALIFIEDDIV", required: false, order: 3, type: String, read: Tax1099DIV.prototype.getQualifiedDiv, write: Tax1099DIV.prototype.setQualifiedDiv });
Element_add(Tax1099DIV, { name: "TOTCAPGAIN", required: false, order: 4, type: String, read: Tax1099DIV.prototype.getTotCapGain, write: Tax1099DIV.prototype.setTotCapGain });
Element_add(Tax1099DIV, { name: "P28GAIN", required: false, order: 5, type: String, read: Tax1099DIV.prototype.getP28Gain, write: Tax1099DIV.prototype.setP28Gain });
Element_add(Tax1099DIV, { name: "UNRECSEC1250", required: false, order: 6, type: String, read: Tax1099DIV.prototype.getUnrecSec1250, write: Tax1099DIV.prototype.setUnrecSec1250 });
Element_add(Tax1099DIV, { name: "SEC1202", required: false, order: 7, type: String, read: Tax1099DIV.prototype.getSec1202, write: Tax1099DIV.prototype.setSec1202 });
Element_add(Tax1099DIV, { name: "NONTAXDIST", required: false, order: 8, type: String, read: Tax1099DIV.prototype.getNonTaxDist, write: Tax1099DIV.prototype.setNonTaxDist });
Element_add(Tax1099DIV, { name: "FEDTAXWH", required: false, order: 9, type: String, read: Tax1099DIV.prototype.getFedTaxWh, write: Tax1099DIV.prototype.setFedTaxWh });
Element_add(Tax1099DIV, { name: "INVESTEXP", required: false, order: 10, type: String, read: Tax1099DIV.prototype.getInvestExp, write: Tax1099DIV.prototype.setInvestExp });
Element_add(Tax1099DIV, { name: "FORTAXPD", required: false, order: 11, type: String, read: Tax1099DIV.prototype.getForTaxPd, write: Tax1099DIV.prototype.setForTaxPd });
Element_add(Tax1099DIV, { name: "CASHLIQ", required: false, order: 12, type: String, read: Tax1099DIV.prototype.getCashLiq, write: Tax1099DIV.prototype.setCashLiq });
Element_add(Tax1099DIV, { name: "NONCASHLIQ", required: false, order: 13, type: String, read: Tax1099DIV.prototype.getNonCashLiq, write: Tax1099DIV.prototype.setNonCashLiq });
ChildAggregate_add(Tax1099DIV, { required: true, order: 14, type: PayerAddress, read: Tax1099DIV.prototype.getPayerAddress, write: Tax1099DIV.prototype.setPayerAddress });
Element_add(Tax1099DIV, { name: "PAYERID", required: true, order: 15, type: String, read: Tax1099DIV.prototype.getPayerId, write: Tax1099DIV.prototype.setPayerId });
ChildAggregate_add(Tax1099DIV, { required: true, order: 16, type: RecAddress, read: Tax1099DIV.prototype.getRecAddress, write: Tax1099DIV.prototype.setRecAddress });
Element_add(Tax1099DIV, { name: "RECID", required: true, order: 17, type: String, read: Tax1099DIV.prototype.getRecId, write: Tax1099DIV.prototype.setRecId });
Element_add(Tax1099DIV, { name: "RECACCT", required: true, order: 18, type: String, read: Tax1099DIV.prototype.getRecAcct, write: Tax1099DIV.prototype.setRecAcct });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099INT {
    getSrvrtId() {
        return this.srvrtId;
    }
    setSrvrtId(srvrtId) {
        this.srvrtId = srvrtId;
    }
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
    /**
     * @return the intIncome
     */
    getIntIncome() {
        return this.intIncome;
    }
    /**
     * @param intIncome the intIncome to set
     */
    setIntIncome(intIncome) {
        this.intIncome = intIncome;
    }
    /**
     * @return the erlWithPen
     */
    getErlWithPen() {
        return this.erlWithPen;
    }
    /**
     * @param erlWithPen the erlWithPen to set
     */
    setErlWithPen(erlWithPen) {
        this.erlWithPen = erlWithPen;
    }
    /**
     * @return the intUsbndtrs
     */
    getIntUsbndtrs() {
        return this.intUsbndtrs;
    }
    /**
     * @param intUsbndtrs the intUsbndtrs to set
     */
    setIntUsbndtrs(intUsbndtrs) {
        this.intUsbndtrs = intUsbndtrs;
    }
    /**
     * @return the fedTaxWh
     */
    getFedTaxWh() {
        return this.fedTaxWh;
    }
    /**
     * @param fedTaxWh the fedTaxWh to set
     */
    setFedTaxWh(fedTaxWh) {
        this.fedTaxWh = fedTaxWh;
    }
    /**
     * @return the investExp
     */
    getInvestExp() {
        return this.investExp;
    }
    /**
     * @param investExp the investExp to set
     */
    setInvestExp(investExp) {
        this.investExp = investExp;
    }
    /**
     * @return the forTaxPd
     */
    getForTaxPd() {
        return this.forTaxPd;
    }
    /**
     * @param forTaxPd the forTaxPd to set
     */
    setForTaxPd(forTaxPd) {
        this.forTaxPd = forTaxPd;
    }
    /**
     * @return the payerAddress
     */
    getPayerAddress() {
        return this.payerAddress;
    }
    /**
     * @param payerAddress the payerAddress to set
     */
    setPayerAddress(payerAddress) {
        this.payerAddress = payerAddress;
    }
    /**
     * @return the payerId
     */
    getPayerId() {
        return this.payerId;
    }
    /**
     * @param payerId the payerId to set
     */
    setPayerId(payerId) {
        this.payerId = payerId;
    }
    /**
     * @return the recAddress
     */
    getRecAddress() {
        return this.recAddress;
    }
    /**
     * @param recAddress the recAddress to set
     */
    setRecAddress(recAddress) {
        this.recAddress = recAddress;
    }
    /**
     * @return the recId
     */
    getRecId() {
        return this.recId;
    }
    /**
     * @param recId the recId to set
     */
    setRecId(recId) {
        this.recId = recId;
    }
    /**
     * @return the recAcct
     */
    getRecAcct() {
        return this.recAcct;
    }
    /**
     * @param recAcct the recAcct to set
     */
    setRecAcct(recAcct) {
        this.recAcct = recAcct;
    }
    /**
     * @return the taxExemptInt
     */
    getTaxExemptInt() {
        return this.taxExemptInt;
    }
    /**
     * @param taxExemptInt the taxExemptInt to set
     */
    setTaxExemptInt(taxExemptInt) {
        this.taxExemptInt = taxExemptInt;
    }
    /**
     * @return the specifiedPabInt
     */
    getSpecifiedPabInt() {
        return this.specifiedPabInt;
    }
    /**
     * @param specifiedPabInt the specifiedPabInt to set
     */
    setSpecifiedPabInt(specifiedPabInt) {
        this.specifiedPabInt = specifiedPabInt;
    }
}
Aggregate_add(Tax1099INT, "TAX1099INT_V100");
Element_add(Tax1099INT, { name: "SRVRTID", required: true, order: 0, type: String, read: Tax1099INT.prototype.getSrvrtId, write: Tax1099INT.prototype.setSrvrtId });
Element_add(Tax1099INT, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099INT.prototype.getTaxYear, write: Tax1099INT.prototype.setTaxYear });
Element_add(Tax1099INT, { name: "INTINCOME", required: false, order: 2, type: String, read: Tax1099INT.prototype.getIntIncome, write: Tax1099INT.prototype.setIntIncome });
Element_add(Tax1099INT, { name: "ERLWITHPEN", required: false, order: 3, type: String, read: Tax1099INT.prototype.getErlWithPen, write: Tax1099INT.prototype.setErlWithPen });
Element_add(Tax1099INT, { name: "INTUSBNDTRS", required: false, order: 4, type: String, read: Tax1099INT.prototype.getIntUsbndtrs, write: Tax1099INT.prototype.setIntUsbndtrs });
Element_add(Tax1099INT, { name: "FEDTAXWH", required: false, order: 5, type: String, read: Tax1099INT.prototype.getFedTaxWh, write: Tax1099INT.prototype.setFedTaxWh });
Element_add(Tax1099INT, { name: "INVESTEXP", required: false, order: 6, type: String, read: Tax1099INT.prototype.getInvestExp, write: Tax1099INT.prototype.setInvestExp });
Element_add(Tax1099INT, { name: "FORTAXPD", required: false, order: 7, type: String, read: Tax1099INT.prototype.getForTaxPd, write: Tax1099INT.prototype.setForTaxPd });
ChildAggregate_add(Tax1099INT, { required: true, order: 8, type: PayerAddress, read: Tax1099INT.prototype.getPayerAddress, write: Tax1099INT.prototype.setPayerAddress });
Element_add(Tax1099INT, { name: "PAYERID", required: true, order: 9, type: String, read: Tax1099INT.prototype.getPayerId, write: Tax1099INT.prototype.setPayerId });
ChildAggregate_add(Tax1099INT, { required: true, order: 10, type: RecAddress, read: Tax1099INT.prototype.getRecAddress, write: Tax1099INT.prototype.setRecAddress });
Element_add(Tax1099INT, { name: "RECID", required: true, order: 11, type: String, read: Tax1099INT.prototype.getRecId, write: Tax1099INT.prototype.setRecId });
Element_add(Tax1099INT, { name: "RECACCT", required: true, order: 12, type: String, read: Tax1099INT.prototype.getRecAcct, write: Tax1099INT.prototype.setRecAcct });
Element_add(Tax1099INT, { name: "TAXEXEMPTINT", required: false, order: 13, type: String, read: Tax1099INT.prototype.getTaxExemptInt, write: Tax1099INT.prototype.setTaxExemptInt });
Element_add(Tax1099INT, { name: "SPECIFIEDPABINT", required: false, order: 14, type: String, read: Tax1099INT.prototype.getSpecifiedPabInt, write: Tax1099INT.prototype.setSpecifiedPabInt });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099MISC {
    getSrvrtId() {
        return this.srvrtId;
    }
    setSrvrtId(srvrtId) {
        this.srvrtId = srvrtId;
    }
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
    /**
     * @return the royalties
     */
    getRoyalties() {
        return this.royalties;
    }
    /**
     * @param royalties the royalties to set
     */
    setRoyalties(royalties) {
        this.royalties = royalties;
    }
    /**
     * @return the otherIncome
     */
    getOtherIncome() {
        return this.otherIncome;
    }
    /**
     * @param otherIncome the otherIncome to set
     */
    setOtherIncome(otherIncome) {
        this.otherIncome = otherIncome;
    }
    /**
     * @return the fedTaxWh
     */
    getFedTaxWh() {
        return this.fedTaxWh;
    }
    /**
     * @param fedTaxWh the fedTaxWh to set
     */
    setFedTaxWh(fedTaxWh) {
        this.fedTaxWh = fedTaxWh;
    }
    /**
     * @return the subPmts
     */
    getSubPmts() {
        return this.subPmts;
    }
    /**
     * @param subPmts the subPmts to set
     */
    setSubPmts(subPmts) {
        this.subPmts = subPmts;
    }
    /**
     * @return the payerAddress
     */
    getPayerAddress() {
        return this.payerAddress;
    }
    /**
     * @param payerAddress the payerAddress to set
     */
    setPayerAddress(payerAddress) {
        this.payerAddress = payerAddress;
    }
    /**
     * @return the payerId
     */
    getPayerId() {
        return this.payerId;
    }
    /**
     * @param payerId the payerId to set
     */
    setPayerId(payerId) {
        this.payerId = payerId;
    }
    /**
     * @return the recAddress
     */
    getRecAddress() {
        return this.recAddress;
    }
    /**
     * @param recAddress the recAddress to set
     */
    setRecAddress(recAddress) {
        this.recAddress = recAddress;
    }
    /**
     * @return the recId
     */
    getRecId() {
        return this.recId;
    }
    /**
     * @param recId the recId to set
     */
    setRecId(recId) {
        this.recId = recId;
    }
    /**
     * @return the recAcct
     */
    getRecAcct() {
        return this.recAcct;
    }
    /**
     * @param recAcct the recAcct to set
     */
    setRecAcct(recAcct) {
        this.recAcct = recAcct;
    }
}
Aggregate_add(Tax1099MISC, "TAX1099MISC_V100");
Element_add(Tax1099MISC, { name: "SRVRTID", required: true, order: 0, type: String, read: Tax1099MISC.prototype.getSrvrtId, write: Tax1099MISC.prototype.setSrvrtId });
Element_add(Tax1099MISC, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099MISC.prototype.getTaxYear, write: Tax1099MISC.prototype.setTaxYear });
Element_add(Tax1099MISC, { name: "ROYALTIES", required: false, order: 2, type: String, read: Tax1099MISC.prototype.getRoyalties, write: Tax1099MISC.prototype.setRoyalties });
Element_add(Tax1099MISC, { name: "OTHERINCOME", required: false, order: 3, type: String, read: Tax1099MISC.prototype.getOtherIncome, write: Tax1099MISC.prototype.setOtherIncome });
Element_add(Tax1099MISC, { name: "FEDTAXWH", required: false, order: 4, type: String, read: Tax1099MISC.prototype.getFedTaxWh, write: Tax1099MISC.prototype.setFedTaxWh });
Element_add(Tax1099MISC, { name: "SUBPMTS", required: false, order: 5, type: String, read: Tax1099MISC.prototype.getSubPmts, write: Tax1099MISC.prototype.setSubPmts });
ChildAggregate_add(Tax1099MISC, { required: true, order: 6, type: PayerAddress, read: Tax1099MISC.prototype.getPayerAddress, write: Tax1099MISC.prototype.setPayerAddress });
Element_add(Tax1099MISC, { name: "PAYERID", required: true, order: 7, type: String, read: Tax1099MISC.prototype.getPayerId, write: Tax1099MISC.prototype.setPayerId });
ChildAggregate_add(Tax1099MISC, { required: true, order: 8, type: RecAddress, read: Tax1099MISC.prototype.getRecAddress, write: Tax1099MISC.prototype.setRecAddress });
Element_add(Tax1099MISC, { name: "RECID", required: true, order: 9, type: String, read: Tax1099MISC.prototype.getRecId, write: Tax1099MISC.prototype.setRecId });
Element_add(Tax1099MISC, { name: "RECACCT", required: true, order: 10, type: String, read: Tax1099MISC.prototype.getRecAcct, write: Tax1099MISC.prototype.setRecAcct });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099OID {
    getSrvrtId() {
        return this.srvrtId;
    }
    setSrvrtId(srvrtId) {
        this.srvrtId = srvrtId;
    }
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
    /**
     * @return the originalDisc
     */
    getOriginalDisc() {
        return this.originalDisc;
    }
    /**
     * @param originalDisc the originalDisc to set
     */
    setOriginalDisc(originalDisc) {
        this.originalDisc = originalDisc;
    }
    /**
     * @return the otherPerInt
     */
    getOtherPerInt() {
        return this.otherPerInt;
    }
    /**
     * @param otherPerInt the otherPerInt to set
     */
    setOtherPerInt(otherPerInt) {
        this.otherPerInt = otherPerInt;
    }
    /**
     * @return the erlWithPen
     */
    getErlWithPen() {
        return this.erlWithPen;
    }
    /**
     * @param erlWithPen the erlWithPen to set
     */
    setErlWithPen(erlWithPen) {
        this.erlWithPen = erlWithPen;
    }
    /**
     * @return the fedTaxWh
     */
    getFedTaxWh() {
        return this.fedTaxWh;
    }
    /**
     * @param fedTaxWh the fedTaxWh to set
     */
    setFedTaxWh(fedTaxWh) {
        this.fedTaxWh = fedTaxWh;
    }
    /**
     * @return the desc
     */
    getDesc() {
        return this.desc;
    }
    /**
     * @param desc the desc to set
     */
    setDesc(desc) {
        this.desc = desc;
    }
    /**
     * @return the oidOnUstres
     */
    getOidOnUstres() {
        return this.oidOnUstres;
    }
    /**
     * @param oidOnUstres the oidOnUstres to set
     */
    setOidOnUstres(oidOnUstres) {
        this.oidOnUstres = oidOnUstres;
    }
    /**
     * @return the investExp
     */
    getInvestExp() {
        return this.investExp;
    }
    /**
     * @param investExp the investExp to set
     */
    setInvestExp(investExp) {
        this.investExp = investExp;
    }
    /**
     * @return the payerAddress
     */
    getPayerAddress() {
        return this.payerAddress;
    }
    /**
     * @param payerAddress the payerAddress to set
     */
    setPayerAddress(payerAddress) {
        this.payerAddress = payerAddress;
    }
    /**
     * @return the payerId
     */
    getPayerId() {
        return this.payerId;
    }
    /**
     * @param payerId the payerId to set
     */
    setPayerId(payerId) {
        this.payerId = payerId;
    }
    /**
     * @return the recAddress
     */
    getRecAddress() {
        return this.recAddress;
    }
    /**
     * @param recAddress the recAddress to set
     */
    setRecAddress(recAddress) {
        this.recAddress = recAddress;
    }
    /**
     * @return the recId
     */
    getRecId() {
        return this.recId;
    }
    /**
     * @param recId the recId to set
     */
    setRecId(recId) {
        this.recId = recId;
    }
    /**
     * @return the recAcct
     */
    getRecAcct() {
        return this.recAcct;
    }
    /**
     * @param recAcct the recAcct to set
     */
    setRecAcct(recAcct) {
        this.recAcct = recAcct;
    }
}
Aggregate_add(Tax1099OID, "TAX1099OID_V100");
Element_add(Tax1099OID, { name: "SRVRTID", required: true, order: 0, type: String, read: Tax1099OID.prototype.getSrvrtId, write: Tax1099OID.prototype.setSrvrtId });
Element_add(Tax1099OID, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099OID.prototype.getTaxYear, write: Tax1099OID.prototype.setTaxYear });
Element_add(Tax1099OID, { name: "ORIGISDISC", required: false, order: 2, type: String, read: Tax1099OID.prototype.getOriginalDisc, write: Tax1099OID.prototype.setOriginalDisc });
Element_add(Tax1099OID, { name: "OTHERPERINT", required: false, order: 3, type: String, read: Tax1099OID.prototype.getOtherPerInt, write: Tax1099OID.prototype.setOtherPerInt });
Element_add(Tax1099OID, { name: "ERLWITHPEN", required: false, order: 4, type: String, read: Tax1099OID.prototype.getErlWithPen, write: Tax1099OID.prototype.setErlWithPen });
Element_add(Tax1099OID, { name: "FEDTAXWH", required: false, order: 5, type: String, read: Tax1099OID.prototype.getFedTaxWh, write: Tax1099OID.prototype.setFedTaxWh });
Element_add(Tax1099OID, { name: "DESCRIPTION", required: true, order: 6, type: String, read: Tax1099OID.prototype.getDesc, write: Tax1099OID.prototype.setDesc });
Element_add(Tax1099OID, { name: "OIDONUSTRES", required: false, order: 7, type: String, read: Tax1099OID.prototype.getOidOnUstres, write: Tax1099OID.prototype.setOidOnUstres });
Element_add(Tax1099OID, { name: "INVESTEXP", required: false, order: 8, type: String, read: Tax1099OID.prototype.getInvestExp, write: Tax1099OID.prototype.setInvestExp });
ChildAggregate_add(Tax1099OID, { required: true, order: 9, type: PayerAddress, read: Tax1099OID.prototype.getPayerAddress, write: Tax1099OID.prototype.setPayerAddress });
Element_add(Tax1099OID, { name: "PAYERID", required: true, order: 10, type: String, read: Tax1099OID.prototype.getPayerId, write: Tax1099OID.prototype.setPayerId });
ChildAggregate_add(Tax1099OID, { required: true, order: 11, type: RecAddress, read: Tax1099OID.prototype.getRecAddress, write: Tax1099OID.prototype.setRecAddress });
Element_add(Tax1099OID, { name: "RECID", required: true, order: 12, type: String, read: Tax1099OID.prototype.getRecId, write: Tax1099OID.prototype.setRecId });
Element_add(Tax1099OID, { name: "RECACCT", required: true, order: 13, type: String, read: Tax1099OID.prototype.getRecAcct, write: Tax1099OID.prototype.setRecAcct });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099R {
    getSrvrtId() {
        return this.srvrtId;
    }
    setSrvrtId(srvrtId) {
        this.srvrtId = srvrtId;
    }
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
    /**
       * @return the grossDist
       */
    getGrossDist() {
        return this.grossDist;
    }
    /**
     * @param grossDist the grossDist to set
     */
    setGrossDist(grossDist) {
        this.grossDist = grossDist;
    }
    /**
     * @return the taxAmt
     */
    getTaxAmt() {
        return this.taxAmt;
    }
    /**
     * @param taxAmt the taxAmt to set
     */
    setTaxAmt(taxAmt) {
        this.taxAmt = taxAmt;
    }
    /**
     * @return the taxAmtNd
     */
    getTaxAmtNd() {
        return this.taxAmtNd;
    }
    /**
     * @param taxAmtNd the taxAmtNd to set
     */
    setTaxAmtNd(taxAmtNd) {
        this.taxAmtNd = taxAmtNd;
    }
    /**
     * @return the capGain
     */
    getCapGain() {
        return this.capGain;
    }
    /**
     * @param capGain the capGain to set
     */
    setCapGain(capGain) {
        this.capGain = capGain;
    }
    /**
     * @return the fedTaxWh
     */
    getFedTaxWh() {
        return this.fedTaxWh;
    }
    /**
     * @param fedTaxWh the fedTaxWh to set
     */
    setFedTaxWh(fedTaxWh) {
        this.fedTaxWh = fedTaxWh;
    }
    /**
     * @return the empContins
     */
    getEmpContins() {
        return this.empContins;
    }
    /**
     * @param empContins the empContins to set
     */
    setEmpContins(empContins) {
        this.empContins = empContins;
    }
    /**
     * @return the netUnapEmp
     */
    getNetUnapEmp() {
        return this.netUnapEmp;
    }
    /**
     * @param netUnapEmp the netUnapEmp to set
     */
    setNetUnapEmp(netUnapEmp) {
        this.netUnapEmp = netUnapEmp;
    }
    /**
     * @return the distCode
     */
    getDistCode() {
        return this.distCode;
    }
    /**
     * @param distCode the distCode to set
     */
    setDistCode(distCode) {
        this.distCode = distCode;
    }
    /**
     * @return the iraSepSimp
     */
    getIraSepSimp() {
        return this.iraSepSimp;
    }
    /**
     * @param iraSepSimp the iraSepSimp to set
     */
    setIraSepSimp(iraSepSimp) {
        this.iraSepSimp = iraSepSimp;
    }
    /**
     * @return the annCtrctDist
     */
    getAnnCtrctDist() {
        return this.annCtrctDist;
    }
    /**
     * @param annCtrctDist the annCtrctDist to set
     */
    setAnnCtrctDist(annCtrctDist) {
        this.annCtrctDist = annCtrctDist;
    }
    /**
     * @return the totEmpCount
     */
    getTotEmpCount() {
        return this.totEmpCount;
    }
    /**
     * @param totEmpCount the totEmpCount to set
     */
    setTotEmpCount(totEmpCount) {
        this.totEmpCount = totEmpCount;
    }
    /**
     * @return the payerAddress
     */
    getPayerAddress() {
        return this.payerAddress;
    }
    /**
     * @param payerAddress the payerAddress to set
     */
    setPayerAddress(payerAddress) {
        this.payerAddress = payerAddress;
    }
    /**
     * @return the payerId
     */
    getPayerId() {
        return this.payerId;
    }
    /**
     * @param payerId the payerId to set
     */
    setPayerId(payerId) {
        this.payerId = payerId;
    }
    /**
     * @return the recAddress
     */
    getRecAddress() {
        return this.recAddress;
    }
    /**
     * @param recAddress the recAddress to set
     */
    setRecAddress(recAddress) {
        this.recAddress = recAddress;
    }
    /**
     * @return the recId
     */
    getRecId() {
        return this.recId;
    }
    /**
     * @param recId the recId to set
     */
    setRecId(recId) {
        this.recId = recId;
    }
    /**
     * @return the recAcct
     */
    getRecAcct() {
        return this.recAcct;
    }
    /**
     * @param recAcct the recAcct to set
     */
    setRecAcct(recAcct) {
        this.recAcct = recAcct;
    }
}
Aggregate_add(Tax1099R, "TAX1099R_V100");
Element_add(Tax1099R, { name: "SRVRTID", required: true, order: 0, type: String, read: Tax1099R.prototype.getSrvrtId, write: Tax1099R.prototype.setSrvrtId });
Element_add(Tax1099R, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099R.prototype.getTaxYear, write: Tax1099R.prototype.setTaxYear });
Element_add(Tax1099R, { name: "GROSSDIST", required: true, order: 2, type: String, read: Tax1099R.prototype.getGrossDist, write: Tax1099R.prototype.setGrossDist });
Element_add(Tax1099R, { name: "TAXAMT", required: false, order: 3, type: String, read: Tax1099R.prototype.getTaxAmt, write: Tax1099R.prototype.setTaxAmt });
Element_add(Tax1099R, { name: "TAXAMTND", required: false, order: 4, type: String, read: Tax1099R.prototype.getTaxAmtNd, write: Tax1099R.prototype.setTaxAmtNd });
Element_add(Tax1099R, { name: "CAPGAIN", required: false, order: 5, type: String, read: Tax1099R.prototype.getCapGain, write: Tax1099R.prototype.setCapGain });
Element_add(Tax1099R, { name: "FEDTAXWH", required: false, order: 6, type: String, read: Tax1099R.prototype.getFedTaxWh, write: Tax1099R.prototype.setFedTaxWh });
Element_add(Tax1099R, { name: "EMPCONTINS", required: false, order: 7, type: String, read: Tax1099R.prototype.getEmpContins, write: Tax1099R.prototype.setEmpContins });
Element_add(Tax1099R, { name: "NETUNAPEMP", required: false, order: 8, type: String, read: Tax1099R.prototype.getNetUnapEmp, write: Tax1099R.prototype.setNetUnapEmp });
Element_add(Tax1099R, { name: "DISTCODE", required: true, order: 9, type: String, read: Tax1099R.prototype.getDistCode, write: Tax1099R.prototype.setDistCode });
Element_add(Tax1099R, { name: "IRASEPSIMP", required: true, order: 10, type: String, read: Tax1099R.prototype.getIraSepSimp, write: Tax1099R.prototype.setIraSepSimp });
Element_add(Tax1099R, { name: "ANNCTRCTDIST", required: false, order: 11, type: String, read: Tax1099R.prototype.getAnnCtrctDist, write: Tax1099R.prototype.setAnnCtrctDist });
Element_add(Tax1099R, { name: "TOTEMPCONT", required: false, order: 12, type: String, read: Tax1099R.prototype.getTotEmpCount, write: Tax1099R.prototype.setTotEmpCount });
ChildAggregate_add(Tax1099R, { required: true, order: 13, type: PayerAddress, read: Tax1099R.prototype.getPayerAddress, write: Tax1099R.prototype.setPayerAddress });
Element_add(Tax1099R, { name: "PAYERID", required: true, order: 14, type: String, read: Tax1099R.prototype.getPayerId, write: Tax1099R.prototype.setPayerId });
ChildAggregate_add(Tax1099R, { required: true, order: 15, type: RecAddress, read: Tax1099R.prototype.getRecAddress, write: Tax1099R.prototype.setRecAddress });
Element_add(Tax1099R, { name: "RECID", required: true, order: 16, type: String, read: Tax1099R.prototype.getRecId, write: Tax1099R.prototype.setRecId });
Element_add(Tax1099R, { name: "RECACCT", required: true, order: 17, type: String, read: Tax1099R.prototype.getRecAcct, write: Tax1099R.prototype.setRecAcct });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099Request extends T1099Request {
    getTaxYear() {
        return this.taxYear;
    }
    setTaxYear(taxYear) {
        this.taxYear = taxYear;
    }
}
Aggregate_add(Tax1099Request, "TAX1099RQ");
Element_add(Tax1099Request, { name: "TAXYEAR", required: true, order: 0, type: String, read: Tax1099Request.prototype.getTaxYear, write: Tax1099Request.prototype.setTaxYear });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099RequestTransaction extends TransactionWrappedRequestMessage {
    /**
     * The tax1099Request.
     *
     * @return The tax1099Request.
     */
    getTax1099Request() {
        return this.tax1099Request;
    }
    /**
     * The tax1099Request.
     *
     * @param tax1099Request The message.
     *
     */
    setTax1099Request(tax1099Request) {
        this.tax1099Request = tax1099Request;
    }
    // Inherited.
    setWrappedMessage(tax1099Request) {
        this.setTax1099Request(tax1099Request);
    }
}
Aggregate_add(Tax1099RequestTransaction, "TAX1099TRNRQ");
ChildAggregate_add(Tax1099RequestTransaction, { required: true, order: 30, type: Tax1099Request, read: Tax1099RequestTransaction.prototype.getTax1099Request, write: Tax1099RequestTransaction.prototype.setTax1099Request });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author aparna.gawali
 * aparna.gawali@sungard.com
 *
 */
class Tax1099RequestMessageSet extends RequestMessageSet {
    getType() {
        return MessageSetType.tax1099;
    }
    /**
     * The statement request.
     *
     * @return The statement request.
     */
    getTaxRequestTransaction() {
        return this.taxRequestTransaction;
    }
    /**
     * The statement request.
     *
     * @param taxRequestTransaction The statement request.
     */
    setTaxRequestTransaction(taxRequestTransaction) {
        this.taxRequestTransaction = taxRequestTransaction;
    }
    // Inherited.
    getRequestMessages() {
        var requestMessages = new Array();
        if (this.getTaxRequestTransaction() != null) {
            requestMessages.push(this.getTaxRequestTransaction());
        }
        return requestMessages;
    }
}
Aggregate_add(Tax1099RequestMessageSet, "TAX1099MSGSRQV1");
ChildAggregate_add(Tax1099RequestMessageSet, { order: 0, type: Tax1099RequestTransaction, read: Tax1099RequestMessageSet.prototype.getTaxRequestTransaction, write: Tax1099RequestMessageSet.prototype.setTaxRequestTransaction });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099Response extends T1099Response {
    /**
     * @return the lstTax1099DIV
     */
    getLstTax1099DIV() {
        return this.lstTax1099DIV;
    }
    /**
     * @param lstTax1099DIV
     *            the lstTax1099DIV to set
     */
    setLstTax1099DIV(lstTax1099DIV) {
        this.lstTax1099DIV = lstTax1099DIV;
    }
    getResponseMessageName() {
        return "1099 Tax details";
    }
    /**
     * @return the lstTax1099INT
     */
    getLstTax1099INT() {
        return this.lstTax1099INT;
    }
    /**
     * @param lstTax1099INT the lstTax1099INT to set
     */
    setLstTax1099INT(lstTax1099INT) {
        this.lstTax1099INT = lstTax1099INT;
    }
    /**
     * @return the lstTax1099R
     */
    getLstTax1099R() {
        return this.lstTax1099R;
    }
    /**
     * @param lstTax1099R the lstTax1099R to set
     */
    setLstTax1099R(lstTax1099R) {
        this.lstTax1099R = lstTax1099R;
    }
    /**
     * @return the lstTax1099B
     */
    getLstTax1099B() {
        return this.lstTax1099B;
    }
    /**
     * @param lstTax1099B the lstTax1099B to set
     */
    setLstTax1099B(lstTax1099B) {
        this.lstTax1099B = lstTax1099B;
    }
    /**
     * @return the lstTax1099MISC
     */
    getLstTax1099MISC() {
        return this.lstTax1099MISC;
    }
    /**
     * @param lstTax1099MISC the lstTax1099MISC to set
     */
    setLstTax1099MISC(lstTax1099MISC) {
        this.lstTax1099MISC = lstTax1099MISC;
    }
    /**
     * @return the lstTax1099OID
     */
    getLstTax1099OID() {
        return this.lstTax1099OID;
    }
    /**
     * @param lstTax1099OID the lstTax1099OID to set
     */
    setLstTax1099OID(lstTax1099OID) {
        this.lstTax1099OID = lstTax1099OID;
    }
}
Aggregate_add(Tax1099Response, "TAX1099RS");
ChildAggregate_add(Tax1099Response, { required: false, order: 0, type: Array, collectionEntryType: Tax1099DIV, read: Tax1099Response.prototype.getLstTax1099DIV, write: Tax1099Response.prototype.setLstTax1099DIV });
ChildAggregate_add(Tax1099Response, { required: false, order: 1, type: Array, collectionEntryType: Tax1099INT, read: Tax1099Response.prototype.getLstTax1099INT, write: Tax1099Response.prototype.setLstTax1099INT });
ChildAggregate_add(Tax1099Response, { required: false, order: 2, type: Array, collectionEntryType: Tax1099R, read: Tax1099Response.prototype.getLstTax1099R, write: Tax1099Response.prototype.setLstTax1099R });
ChildAggregate_add(Tax1099Response, { required: false, order: 3, type: Array, collectionEntryType: Tax1099B, read: Tax1099Response.prototype.getLstTax1099B, write: Tax1099Response.prototype.setLstTax1099B });
ChildAggregate_add(Tax1099Response, { required: false, order: 4, type: Array, collectionEntryType: Tax1099MISC, read: Tax1099Response.prototype.getLstTax1099MISC, write: Tax1099Response.prototype.setLstTax1099MISC });
ChildAggregate_add(Tax1099Response, { required: false, order: 5, type: Array, collectionEntryType: Tax1099OID, read: Tax1099Response.prototype.getLstTax1099OID, write: Tax1099Response.prototype.setLstTax1099OID });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099ResponseTransaction extends TransactionWrappedResponseMessage {
    /**
     * The tax1099Response.
     *
     * @return The tax1099Response.
     */
    getTax1099Response() {
        return this.tax1099Response;
    }
    /**
     * The tax1099Response.
     *
     * @param tax1099Response The message.
     */
    setTax1099Response(tax1099Response) {
        this.tax1099Response = tax1099Response;
    }
    // Inherited.
    getWrappedMessage() {
        return this.getTax1099Response();
    }
}
Aggregate_add(Tax1099ResponseTransaction, "TAX1099TRNRS");
ChildAggregate_add(Tax1099ResponseTransaction, { required: false, order: 2, type: Tax1099Response, read: Tax1099ResponseTransaction.prototype.getTax1099Response, write: Tax1099ResponseTransaction.prototype.setTax1099Response });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
class Tax1099ResponseMessageSet extends ResponseMessageSet {
    getType() {
        return MessageSetType.tax1099;
    }
    /**
     * The taxResponseTransaction list.
     *
     * Most OFX files have a single statement response, except MT2OFX
     * which outputs OFX with multiple statement responses
     * in a single banking response message set.
     *
     * @return The taxResponseTransaction list.
     */
    getTaxResponseTransaction() {
        return this.taxResponseTransaction;
    }
    /**
     * The taxResponseTransaction.
     *
     * @param taxResponseTransaction The statement responses.
     */
    setTaxResponseTransaction(taxResponseTransaction) {
        if (taxResponseTransaction instanceof Array) {
            this.taxResponseTransaction = taxResponseTransaction;
        }
        else if (taxResponseTransaction instanceof Tax1099ResponseTransaction) {
            this.taxResponseTransaction = [taxResponseTransaction];
        }
        else {
            throw new OFXException("invalid type");
        }
    }
    // Inherited.
    getResponseMessages() {
        return this.taxResponseTransaction;
    }
    /**
     * The first statement response.
     *
     * @return the first bank statement response.
     * @deprecated Use getStatementResponses() because sometimes there are multiple responses
     */
    getStatementResponse() {
        return this.taxResponseTransaction == null || this.taxResponseTransaction.length == 0 ? null : this.taxResponseTransaction[0];
    }
}
Aggregate_add(Tax1099ResponseMessageSet, "TAX1099MSGSRSV1");
ChildAggregate_add(Tax1099ResponseMessageSet, { order: 0, type: Array, collectionEntryType: Tax1099ResponseTransaction, read: Tax1099ResponseMessageSet.prototype.getTaxResponseTransaction, write: Tax1099ResponseMessageSet.prototype.setTaxResponseTransaction });

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Thrown when a required attribute of an aggregate is null or empty.
 *
 * @author Ryan Heaton
 */
class RequiredAttributeException extends OFXRuntimeException {
    constructor(message) {
        super(message);
    }
}

/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Annotation for a method that returns an OFX aggregate.
 *
 * @author Ryan Heaton
 */
class Aggregate {
    constructor(value) {
        this._value = value;
    }
    /**
     * The name of the aggregate.
     *
     * @return The name of the aggregate.
     */
    value() {
        return this._value;
    }
}

export { OFXException, OFXRuntimeException, OFXStatusException, OFXTransactionException, UnsupportedOFXSecurityTypeException, NoOFXResponseException, DefaultApplicationContext, OFXApplicationContextHolder, BankingAccountImpl, BaseAccountImpl, BaseFinancialInstitutionData, CreditCardAccountImpl, FinancialInstitutionImpl, InvestmentAccountImpl, OFXConnectionException, OFXServerException, OFXV1Connection, OFXV2Connection, SortedSet, Stack, ApplicationSecurity, MessageSetType, RequestEnvelope, RequestMessage, RequestMessageSet, ResponseEnvelope, ResponseMessage, ResponseMessageSet, TransactionWrappedRequestMessage, TransactionWrappedResponseMessage, AccountType, BankAccountDetails, BankAccountInfo, BankStatementRequest, BankStatementRequestTransaction, BankStatementResponse, BankStatementResponseTransaction, BankingRequestMessageSet, BankingResponseMessageSet, AccountStatus, BalanceInfo, BalanceRecordType, BalanceRecord, CorrectionAction, Currency, Payee, ProcessorDayOff, ProcessorDayOff_fromOfx, StatementRange, StatementRequest, StatementResponse, KnownCode, Status, Severity, StatusCode, instanceof_StatusHolder, T1099Request, T1099Response, Transaction, TransactionList, TransactionType, TransferInfo, TransferStatus, TransferStatusEvent, UnknownStatusCode, CreditCardAccountDetails, CreditCardAccountInfo, CreditCardRequestMessageSet, CreditCardResponseMessageSet, CreditCardStatementRequest, CreditCardStatementRequestTransaction, CreditCardStatementResponse, CreditCardStatementResponseTransaction, InvestmentAccountType, InvestmentAccountType_fromOfx, ActivationStatus, ActivationStatus_fromOfx, InvestmentAccountDetails, InvestmentAccountInfo, SubAccountType, SubAccountType_fromOfx, UnitedStatesAccountType, UnitedStatesAccountType_fromOfx, BasePosition, DebtPosition, Inv401KSource, Inv401KSource_fromOfx, InvestmentPosition, InvestmentPositionList, MutualFundPosition, OptionsPosition, OtherPosition, PositionType, PositionType_fromOfx, ShortOptionSecurity, ShortOptionSecurity_fromOfx, StockPosition, BalanceList, IncludePosition, InvestmentBalance, InvestmentStatementRequest, InvestmentStatementRequestMessageSet, InvestmentStatementRequestTransaction, InvestmentStatementResponse, InvestmentStatementResponseMessageSet, InvestmentStatementResponseTransaction, BaseBuyInvestmentTransaction, BaseInvestmentTransaction, BaseOtherInvestmentTransaction, BaseSellInvestmentTransaction, BuyDebtTransaction, BuyInvestmentTransaction, BuyMutualFundTransaction, BuyOptionTransaction, BuyOtherTransaction, BuyStockTransaction, BuyType, BuyType_fromOfx, CloseOptionAction, CloseOptionAction_fromOfx, CloseOptionTransaction, IncomeTransaction, IncomeType, IncomeType_fromOfx, InvestmentBankTransaction, InvestmentExpenseTransaction, InvestmentTransaction, InvestmentTransactionList, JournalFundTransaction, JournalSecurityTransaction, MarginInterestTransaction, OptionBuyType, OptionBuyType_fromOfx, OptionSellType, OptionSellType_fromOfx, OriginalCurrency, ReinvestIncomeTransaction, RelatedOptionType, RelatedOptionType_fromOfx, ReturnOfCapitalTransaction, SellDebtReason, SellDebtReason_fromOfx, SellDebtTransaction, SellInvestmentTransaction, SellMutualFundTransaction, SellOptionTransaction, SellOtherTransaction, SellStockTransaction, SellType, SellType_fromOfx, SplitTransaction, InvestmentTransactionType, TransferAction, TransferAction_fromOfx, TransferInvestmentTransaction, AbstractMessageSetInfo, CharacterType, ClientRoutingCapability, CoreMessageSetInfo, MessageSetInfoList, ProfileRequest, ProfileRequestMessageSet, ProfileRequestTransaction, ProfileResponse, ProfileResponseMessageSet, ProfileResponseTransaction, SignonInfo, SignonInfoList, SynchronizationCapability, VersionSpecificMessageSetInfo, BankingMessageSetInfo, BankingV1MessageSetInfo, BillpayMessageSetInfo, BillpayV1MessageSetInfo, CreditCardMessageSetInfo, CreditCardV1MessageSetInfo, EmailMessageSetInfo, EmailV1MessageSetInfo, InterbankTransferMessageSetInfo, InterbankTransferV1MessageSetInfo, InvestmentMessageSetInfo, InvestmentV1MessageSetInfo, ProfileMessageSetInfo, ProfileV1MessageSetInfo, SecurityListMessageSetInfo, SecurityListV1MessageSetInfo, SignOnMessageSetInfo, SignOnV1MessageSetInfo, SignupMessageSetInfo, SignupV1MessageSetInfo, WireTransferMessageSetInfo, WireTransferV1MessageSetInfo, EmailProfile, StopCheckProfile, ImageProfile, TransferProfile, ClientEnrollment, OtherEnrollment, WebEnrollment, AssetClass, AssetClass_fromOfx, BaseSecurityInfo, CallType, CallType_fromOfx, CouponFrequency, CouponFrequency_fromOfx, DebtClass, DebtClass_fromOfx, DebtSecurityInfo, DebtType, DebtType_fromOfx, MutualFundSecurityInfo, MutualFundType, MutualFundType_fromOfx, OptionSecurityInfo, OptionType, OptionType_fromOfx, OtherSecurityInfo, SecurityId, SecurityInfo, SecurityList, SecurityListRequest, SecurityListRequestMessageSet, SecurityListRequestTransaction, SecurityListResponse, SecurityListResponseMessageSet, SecurityListResponseTransaction, SecurityRequest, StockSecurityInfo, StockType, StockType_fromOfx, FinancialInstitutionInfo, PasswordChangeRequest, PasswordChangeRequestTransaction, PasswordChangeResponse, PasswordChangeResponseTransaction, SignonRequest, SignonRequestMessageSet, SignonResponse, SignonResponseMessageSet, AccountInfoRequest, AccountInfoRequestTransaction, AccountInfoResponse, AccountInfoResponseTransaction, AccountProfile, SignupRequestMessageSet, SignupResponseMessageSet, ExtDBInfo, PayerAddress, ProcDet, RecAddress, Tax1099B, Tax1099DIV, Tax1099INT, Tax1099MISC, Tax1099OID, Tax1099R, Tax1099Request, Tax1099RequestMessageSet, Tax1099RequestTransaction, Tax1099Response, Tax1099ResponseMessageSet, Tax1099ResponseTransaction, AggregateAttributeType, AggregateAttribute, AggregateInfo, AggregateIntrospector, AggregateMarshaller, AggregateStackContentHandler, AggregateUnmarshaller, BaseOFXReader, DefaultHandler, DefaultStringConversion, OFXParseEventType, OFXParseEvent, OFXParseException, OFXSyntaxException, OFXV2ContentHandler, RequiredAttributeException, OutputBuffer, StreamWriter, StringReader, OFXV1Writer, OFXV2Writer, Log, LogFactory, Aggregate, Aggregate_add, ChildAggregate, ChildAggregate_add, Element, Element_add, Header, Header_add, _default, isAssignableFrom, PropertyDescriptor };
//# sourceMappingURL=ofx4js.js.map
