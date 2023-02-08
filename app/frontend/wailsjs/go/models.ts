export namespace models {
	
	export class Params {
	    id: string;
	    name: string;
	    value: number;
	
	    static createFrom(source: any = {}) {
	        return new Params(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.value = source["value"];
	    }
	}
	export class CalculateRequest {
	    formula: string;
	    params: Params[];
	
	    static createFrom(source: any = {}) {
	        return new CalculateRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.formula = source["formula"];
	        this.params = this.convertValues(source["params"], Params);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DataValue {
	    id: string;
	    title: string;
	    value: any;
	
	    static createFrom(source: any = {}) {
	        return new DataValue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.value = source["value"];
	    }
	}
	export class Data {
	    title: string;
	    data: DataValue[];
	
	    static createFrom(source: any = {}) {
	        return new Data(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.data = this.convertValues(source["data"], DataValue);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DataLine {
	    id: string;
	    isChanged: boolean;
	    isNew: boolean;
	    data: DataValue[];
	
	    static createFrom(source: any = {}) {
	        return new DataLine(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.isChanged = source["isChanged"];
	        this.isNew = source["isNew"];
	        this.data = this.convertValues(source["data"], DataValue);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Field {
	    id: string;
	    tableId: string;
	    title: string;
	    name: string;
	    typeDb: string;
	    typeApp: string;
	    number: string;
	    isForSearch: boolean;
	    formula: string;
	    isNotNull: boolean;
	    default: string;
	
	    static createFrom(source: any = {}) {
	        return new Field(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.tableId = source["tableId"];
	        this.title = source["title"];
	        this.name = source["name"];
	        this.typeDb = source["typeDb"];
	        this.typeApp = source["typeApp"];
	        this.number = source["number"];
	        this.isForSearch = source["isForSearch"];
	        this.formula = source["formula"];
	        this.isNotNull = source["isNotNull"];
	        this.default = source["default"];
	    }
	}
	export class NewData {
	    title: string;
	    lines: DataLine[];
	
	    static createFrom(source: any = {}) {
	        return new NewData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.lines = this.convertValues(source["lines"], DataLine);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Table {
	    id: string;
	    title: string;
	    titleDb: string;
	    alias: string;
	    color: string;
	    fields: Field[];
	
	    static createFrom(source: any = {}) {
	        return new Table(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.titleDb = source["titleDb"];
	        this.alias = source["alias"];
	        this.color = source["color"];
	        this.fields = this.convertValues(source["fields"], Field);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

