export type FormulaPartType = 'numeric' | 'math' | 'param' | 'func'
export type ConditionType = 'condStart' | 'condEnd' | 'condition' | 'condLine'

export interface IFormulaParts {
	id: number
	type: FormulaPartType | ConditionType
	value: string
	origValue: string
	description?: string
}

export interface IFormula extends IFormulaTitle {
	groupId: string
	parts: IFormulaParts[]
}

export interface ITestFormula extends IFormulaTitle {
	groupId: string
	parts: IPartFormula[]
}

export interface IFormulaTitle {
	id: string
	title: string
}

export type NumericType = 'Numeric'
export type MathType = 'Math'
export type ParamType = 'Param'
export type FuncType = 'Func'
export type ConditionTypeNew = 'Condition'

export type FormulaPartBase<Type, ExtraProps> = {
	id: string
	type: Type
} & ExtraProps

export type FormulaPartNumeric = FormulaPartBase<
	NumericType,
	{
		value: string
	}
>

export type FormulaPartMath = FormulaPartBase<
	MathType,
	{
		value: string
		origValue: string
	}
>

export type FormulaPartParam = FormulaPartBase<
	ParamType,
	{
		value: string
		origValue: string
		description?: string
	}
>

export type FormulaPartFunc = FormulaPartBase<
	FuncType,
	{
		value: string
		origValue: string
		endValue: string
		children: IPartFormula[]
	}
>

export type FormulaPartCondition = FormulaPartBase<
	ConditionTypeNew,
	{
		exp: IExpFormula[]
		then: IPartFormula[]
		else: IPartFormula[]
	}
>

export type IExpFormula = FormulaPartNumeric | FormulaPartMath | FormulaPartParam | FormulaPartFunc
export type IPartFormula =
	| FormulaPartNumeric
	| FormulaPartMath
	| FormulaPartParam
	| FormulaPartFunc
	| FormulaPartCondition
