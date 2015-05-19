module ofx4js.collections {


export class Stack<T> {
	private values: Array<T>;
	
	constructor() {
		this.values = [];
	}
	
	
	public push(...values: Array<T>): void {
	  return Array.prototype.push.apply(this.values, arguments);
	}
	
	
	public pop(): T {
	  return Array.prototype.pop.call(this.values);
	}
	
	
	public peek(): T {
	  if(this.values.length === 0) {
	    return null;
	  } else {
	    return this.values[this.values.length - 1];
	  }
	}
	
	
	public isEmpty(): boolean {
	  return this.values.length === 0;
	}
}

}
