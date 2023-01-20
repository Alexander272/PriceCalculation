export namespace models {
	
	
	
	
	export class Table {
	    id: number[];
	    title: string;
	    alias: string;
	
	    static createFrom(source: any = {}) {
	        return new Table(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.alias = source["alias"];
	    }
	}

}

