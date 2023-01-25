export interface ITable {
	id: string
	title: string
	titleDb: string
	alias: string
	color?: string
	fields: IField[]
}

export interface IField {
	id: string
	tableId: string
	title: string
	titleDb: string
	typeDb: string
	typeApp: string
	number: string
	isForSearch: boolean
	formula: string
	isNotNull: boolean
	default: string
}

export interface IData {
	value: any
}
