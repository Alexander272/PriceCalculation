export type FormulaPartType = 'numeric' | 'math' | 'field'

export interface IFormulaParts {
	id: number
	type: FormulaPartType
	value: string
}
