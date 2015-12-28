module ofx4js.collections {
	export interface StringSet {
		[key: string]: boolean;
	}

	export interface StringMap {
		[key: string]: string;
	}

	export interface AnyMap {
		[key: string]: any;
	}
}
