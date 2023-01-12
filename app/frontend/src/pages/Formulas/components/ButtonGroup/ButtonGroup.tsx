import { Button, Tooltip } from '@chakra-ui/react'
import React, { FC, MouseEvent } from 'react'
import { useAppDispatch } from '../../../../hooks/useStore'
import { insertFormula } from '../../../../store/formula'
import { IFormulaParts } from '../../../../types/formula'
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
		id: 'if',
		value: 'Если',
		formula: 'if',
		color: 'linkedin',
		basis: '60%',
	},
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
	},
	{
		id: 'or',
		value: 'Или',
		formula: 'or',
		color: 'orange',
		basis: '25%',
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

	const insertHandler = (part: IInsert) => () => {
		let parts: IFormulaParts[] = [
			{
				id: Date.now(),
				type: 'func',
				value: part.value + '(',
				origValue: part.formula + '(',
			},
			{
				id: Date.now() + 1,
				type: 'func',
				value: ')',
				origValue: ')',
			},
		]

		dispatch(insertFormula(parts))
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
							onClick={insertHandler(f)}
							onMouseDown={saveFocusHandler}
						>
							{f.value}
						</Button>
					</Tooltip>
				))}
			</Column>
			<Column>
				{condition.map(c => (
					<Button
						key={c.id}
						flexBasis={c.basis}
						flexGrow={1}
						colorScheme={c.color}
						// onClick={insertHandler(c)}
					>
						{c.value}
					</Button>
				))}
			</Column>
		</Container>
	)
}
