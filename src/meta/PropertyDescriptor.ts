/**
 * convenience function to supply a default value if the given value is not specified
 */
export function _default<T>(value: T, defaultValue: T): T {
  return (typeof value !== 'undefined') ? value : defaultValue;
}


export function isAssignableFrom(entryType: any, assignableTo: any) {
  return (assignableTo === entryType) ||
    ((typeof entryType === "function") && (assignableTo.prototype instanceof entryType));
};


/**
 * a function called on an object instance that will return the desired property value
 */
export interface ReadMethod<Type> {
	(): Type;
}


/**
 * a function called on an object instance that will set the desired property value
 */
export interface WriteMethod<Type> {
	(value: Type): void;
}


/**
 * parameters used to create a PropertyDescriptor
 */
export interface PropertyDescriptorParams<T> {
	type: any;
	read: ReadMethod<T>;
	write: WriteMethod<T>;
}


/**
 * an interface to read and write a value into an object 
 */
export /*abstract*/ class PropertyDescriptor {
	private propertyType: any;
	private readMethod: ReadMethod<any>;
	private writeMethod: WriteMethod<any>;
	
	constructor(params: PropertyDescriptorParams<any>) {
		this.propertyType = params.type;
		this.readMethod = params.read;
		this.writeMethod = params.write;
	}
	
	public getPropertyType(): any {
		return this.propertyType;
	}
	
	public getReadMethod(): ReadMethod<any> {
		return this.readMethod;
	}
	
	public getWriteMethod(): WriteMethod<any> {
		return this.writeMethod;
	}
}


