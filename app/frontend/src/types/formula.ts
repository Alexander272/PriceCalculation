export type FormulaPartType = 'numeric' | 'math' | 'field' | 'func'

export interface IFormulaParts {
	id: number
	type: FormulaPartType
	value: string
	origValue: string
	description?: string
}

export interface IFormula extends IFormulaTitle {
	groupId: string
	parts: IFormulaParts[]
}

export interface IFormulaTitle {
	id: string
	title: string
}
