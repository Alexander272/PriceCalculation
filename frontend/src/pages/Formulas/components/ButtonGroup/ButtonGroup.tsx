import { Button, Tooltip } from '@chakra-ui/react'
import { FC, MouseEvent } from 'react'
import { useAppDispatch } from '@/hooks/useStore'
import { insertCondition, insertFormula, insertMath } from '@/store/formula'
import { FormulaPartCondition, FormulaPartMath, IPartFormula } from '@/types/formula'
import { Column, Container } from './group.style'

const functions = [
	{
		id: 'radic',
		value: '√',
		formula: 'sqrt',
		description: '√(x)',
		color: 'messenger',
	},
	// {
	// 	id: 'radicn',
	// 	value: (
	// 		<>
	// 			<sup>n</sup>&radic;
	// 		</>
	// 	),
	// 	formula: 'root',
	// 	description: 'Корень n степени',
	// 	color: 'messenger',
	// },
	{
		id: 'min',
		value: 'МИН',
		formula: 'min',
		description: 'МИН(x,y,z)',
		color: 'messenger',
	},
	{
		id: 'max',
		value: 'МАКС',
		formula: 'max',
		description: 'МАКС(x,y,z)',
		color: 'messenger',
	},
	{
		id: 'avg',
		value: 'СРЗНАЧ',
		formula: 'avg',
		description: 'Среднее значение. СРЗНАЧ(x,y,z)',
		color: 'messenger',
	},
	{
		id: 'abs',
		value: 'МОД',
		formula: 'abs',
		description: 'Абсолютное значение. МОД(x)',
		color: 'messenger',
	},
	{
		id: 'floor',
		value: 'ОКРВНИЗ',
		formula: 'floor',
		description: 'Наибольшее целое число, меньшее или равное x. ОКРВНИЗ(x)',
		color: 'messenger',
	},
	{
		id: 'ceil',
		value: 'ОКРВВЕРХ',
		formula: 'ceil',
		description: 'Наименьшее целое число, большее или равное x. ОКРВВЕРХ(x)',
		color: 'messenger',
	},
	{
		id: 'round',
		value: 'ОКРУГ',
		formula: 'round',
		description: 'Округлить до ближайшего целого числа. ОКРУГ(x)',
		color: 'messenger',
	},
	{
		id: 'roundn',
		value: 'ОКРУГТ',
		formula: 'roundn',
		description: 'Округлить до n знаков после запятой. ОКРУГТ(x, n)',
		color: 'messenger',
	},
]
const condition = [
	{
		id: 'pi',
		value: 'Пи',
		formula: 'pi',
		color: 'messenger',
		basis: '25%',
	},
	{
		id: 'and',
		value: 'И',
		formula: 'and',
		color: 'orange',
		basis: '25%',
		description: 'x И y',
	},
	{
		id: 'or',
		value: 'Или',
		formula: 'or',
		color: 'orange',
		basis: '25%',
		description: 'x Или y',
	},
	{
		id: 'not equal',
		value: '≠',
		formula: '!=',
		color: 'teal',
		basis: '25%',
	},
]

interface IInsert {
	id: string
	value: string
	formula: string
}

type Props = {}

export const ButtonGroup: FC<Props> = () => {
	const dispatch = useAppDispatch()

	const insertFormulaHandler = (part: IInsert) => () => {
		// let parts: IFormulaParts[] = [
		// 	{
		// 		id: Date.now(),
		// 		type: 'func',
		// 		value: part.value + '(',
		// 		origValue: part.formula + '(',
		// 	},
		// 	{
		// 		id: Date.now() + 1,
		// 		type: 'func',
		// 		value: ')',
		// 		origValue: ')',
		// 	},
		// ]
		// dispatch(insertFormula(parts))

		const newPart: IPartFormula = {
			id: Date.now().toString(),
			type: 'Func',
			value: part.value + '(',
			origValue: part.formula + '(',
			endValue: ')',
			children: [
				{
					id: Date.now().toString() + 's',
					type: 'Start',
				},
			],
		}
		dispatch(insertFormula(newPart))
	}

	const insertConditionHandler = () => {
		// let parts: IFormulaParts[] = [
		// 	// { id: Date.now(), type: 'condStart', value: '', origValue: '' },
		// 	{ id: Date.now() + 1, type: 'condition', value: 'Если (', origValue: 'if (' },
		// 	{ id: Date.now() + 2, type: 'condition', value: ') {', origValue: ') {' },
		// 	// { id: Date.now() + 3, type: 'condLine', value: '', origValue: '' },
		// 	// { id: Date.now() + 4, type: 'condition', value: '}', origValue: '}' },
		// 	{ id: Date.now() + 5, type: 'condition', value: '} Иначе {', origValue: '} else {' },
		// 	// { id: Date.now() + 6, type: 'condition', value: '{', origValue: '{' },
		// 	// { id: Date.now() + 7, type: 'condLine', value: '', origValue: '' },
		// 	{ id: Date.now() + 8, type: 'condition', value: '}', origValue: '}' },
		// 	// { id: Date.now() + 9, type: 'condLine', value: '', origValue: '' },
		// 	// { id: Date.now() + 10, type: 'condEnd', value: '', origValue: '' },
		// ]
		// dispatch(insertFormula(parts))

		const newPart: FormulaPartCondition = {
			id: Date.now().toString(),
			type: 'Condition',
			exp: [
				{
					id: Date.now().toString() + 'exp',
					type: 'Start',
				},
			],
			then: [{ id: Date.now().toString() + 'then', type: 'Start' }],
			else: [{ id: Date.now().toString() + 'else', type: 'Start' }],
		}
		dispatch(insertCondition(newPart))
	}

	const insertMathHandler = (part: IInsert) => () => {
		const newPart: FormulaPartMath = {
			id: Date.now().toString(),
			type: 'Math',
			value: part.value,
			origValue: part.formula,
		}
		dispatch(insertMath(newPart))
	}

	const saveFocusHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		return false
	}

	return (
		<Container>
			<Column>
				{functions.map(f => (
					<Tooltip key={f.id} hasArrow label={f.description}>
						<Button
							minWidth={'15%'}
							flexGrow={1}
							colorScheme={f.color}
							onClick={insertFormulaHandler(f)}
							onMouseDown={saveFocusHandler}
						>
							{f.value}
						</Button>
					</Tooltip>
				))}
			</Column>
			<Column>
				<Button
					flexBasis={'60%'}
					flexGrow={1}
					colorScheme='linkedin'
					onMouseDown={saveFocusHandler}
					onClick={insertConditionHandler}
				>
					Если
				</Button>
				{condition.map(c => (
					<Tooltip key={c.id} hasArrow label={c.description}>
						<Button
							key={c.id}
							flexBasis={c.basis}
							flexGrow={1}
							colorScheme={c.color}
							onMouseDown={saveFocusHandler}
							onClick={insertMathHandler(c)}
						>
							{c.value}
						</Button>
					</Tooltip>
				))}
			</Column>
		</Container>
	)
}
