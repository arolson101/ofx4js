
module ofx4js.collections {
	
export interface CompareFcn<T> {
	(a: T, b: T): number;
}


export class SortedSet<T> {
	private valueArray: Array<T>;
	private compareFcn: CompareFcn<T>;
	private isSorted: boolean;
	
	constructor(compareFcn: CompareFcn<T>) {
		this.valueArray = [];
		this.compareFcn = compareFcn;
	}
	
	values(): Array<T> {
		if(!this.isSorted) {
			this.valueArray.sort(this.compareFcn);
			this.isSorted = true;
		}
		return this.valueArray;
	}
	
	insert(element: T): void {
		var index: number = this.valueArray.indexOf(element);
		if(index == -1) {
			this.isSorted = false;
			this.valueArray.push(element);
		}
	}
	
	push(element: T): void {
		this.insert(element);
	}
	
	remove(element: T): boolean {
		var index: number = this.valueArray.indexOf(element);
		if(index == -1) {
			return false;
		}
		this.valueArray = this.valueArray.splice(index, 1);
	}
	
	count(): number {
		return this.valueArray.length;
	}
}

}