
export class Log {
	private infoEnabled: boolean;
	private debugEnabled: boolean;
	
	constructor() {
		this.infoEnabled = false;
		this.debugEnabled = false;
	}

	public setInfoEnabled(value: boolean): void {
		this.infoEnabled = value;
	}

	public isInfoEnabled(): boolean {
		return this.infoEnabled;
	}
	
	public info(...texts: Array<string>): void {
		if(this.isInfoEnabled()) {
			console.log(texts);
		}
	}

	public setDebugEnabled(value: boolean): void {
		this.debugEnabled = value;
	}

	public isDebugEnabled(): boolean {
		return this.debugEnabled;
	}
	
	public debug(...texts: Array<string>): void {
		if(this.isDebugEnabled()) {
			console.log(texts);
		}
	}
	
	public warning(...texts: Array<string>): void {
		console.log(texts);
	}
	
	public error(...texts: Array<string>): void {
		console.log(texts);
	}
}


export class LogFactory {
	
	static getLog(clazz: any) {
		if(!clazz.Log) {
			clazz.Log = new Log();
		}
		
		return clazz.Log;
	}
}

