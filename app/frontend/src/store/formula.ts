import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FormulaPartNumeric, IFormula, IFormulaParts, IPartFormula, ITestFormula } from '../types/formula'

export interface IFormulasState {
	loading: boolean
	error: string | null
	formula: IFormula
	testFormula: ITestFormula
	activeIndex: number
	activeIdx: number
	activeId: string
	breadcrumbs: string
}

// const testParts: IFormulaParts[] = [
// 	{
// 		id: 1673843390002,
// 		type: 'param',
// 		value: 'A',
// 		origValue: 'a',
// 		description: 'Описание',
// 	},
// 	{
// 		id: 1673843390466,
// 		type: 'math',
// 		value: '+',
// 		origValue: '+',
// 	},
// 	{
// 		id: 1673843391514,
// 		type: 'param',
// 		value: 'B',
// 		origValue: 'b',
// 		description: 'Описание',
// 	},
// 	{
// 		id: 1673843391746,
// 		type: 'math',
// 		value: '+',
// 		origValue: '+',
// 	},
// 	{
// 		id: 1673842893682,
// 		type: 'condition',
// 		value: 'Если (',
// 		origValue: 'if (',
// 	},
// 	{
// 		id: 1673843394826,
// 		type: 'param',
// 		value: 'B',
// 		origValue: 'b',
// 		description: 'Описание',
// 	},
// 	{
// 		id: 1673842893683,
// 		type: 'condition',
// 		value: ') {',
// 		origValue: ') {',
// 	},
// 	{
// 		id: 1673842896086,
// 		type: 'numeric',
// 		value: '1',
// 		origValue: '1',
// 	},
// 	{
// 		id: 1673842896542,
// 		type: 'numeric',
// 		value: '5',
// 		origValue: '5',
// 	},
// 	{
// 		id: 1673842893686,
// 		type: 'condition',
// 		value: '} Иначе {',
// 		origValue: '} else {',
// 	},
// 	{
// 		id: 1673842902559,
// 		type: 'param',
// 		value: 'A',
// 		origValue: 'a',
// 		description: 'Описание',
// 	},
// 	{
// 		id: 1673842902750,
// 		type: 'math',
// 		value: '+',
// 		origValue: '+',
// 	},
// 	{
// 		id: 1673842903342,
// 		type: 'numeric',
// 		value: '1',
// 		origValue: '1',
// 	},
// 	{
// 		id: 1673842904158,
// 		type: 'numeric',
// 		value: '2',
// 		origValue: '2',
// 	},
// 	{
// 		id: 1673842893689,
// 		type: 'condition',
// 		value: '}',
// 		origValue: '}',
// 	},
// ]

const testParts: IFormulaParts[] = [
	{
		id: 1673857488303,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673857488477,
		type: 'numeric',
		value: '5',
		origValue: '5',
	},
	{
		id: 1673857489245,
		type: 'math',
		value: '+',
		origValue: '+',
	},
	{
		id: 1673857490085,
		type: 'param',
		value: 'A',
		origValue: 'a',
		description: 'Описание',
	},
	{
		id: 1673857507821,
		type: 'math',
		value: '+',
		origValue: '+',
	},
	{
		id: 1673857508703,
		type: 'func',
		value: 'ОКРВВЕРХ(',
		origValue: 'ceil(',
	},
	{
		id: 1673857510693,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673857510821,
		type: 'numeric',
		value: '4',
		origValue: '4',
	},
	{
		id: 1673857511860,
		type: 'numeric',
		value: '.',
		origValue: '.',
	},
	{
		id: 1673857516300,
		type: 'numeric',
		value: '5',
		origValue: '5',
	},
	{
		id: 1673857531500,
		type: 'numeric',
		value: '4',
		origValue: '4',
	},
	{
		id: 1673857523668,
		type: 'math',
		value: '×',
		origValue: '*',
	},
	{
		id: 1673857524964,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673857525588,
		type: 'numeric',
		value: '0',
		origValue: '0',
	},
	{
		id: 1673857508704,
		type: 'func',
		value: ')',
		origValue: ')',
	},
	{
		id: 1673857537404,
		type: 'math',
		value: '÷',
		origValue: '/',
	},
	{
		id: 1673857539580,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673857539796,
		type: 'numeric',
		value: '0',
		origValue: '0',
	},
	{
		id: 1673857572579,
		type: 'math',
		value: '-',
		origValue: '-',
	},
	{
		id: 1673857577126,
		type: 'func',
		value: 'ОКРУГТ(',
		origValue: 'roundn(',
	},
	{
		id: 1673857579683,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673857579795,
		type: 'numeric',
		value: '2',
		origValue: '2',
	},
	{
		id: 1673857580243,
		type: 'numeric',
		value: '.',
		origValue: '.',
	},
	{
		id: 1673857580539,
		type: 'numeric',
		value: '4',
		origValue: '4',
	},
	{
		id: 1673857581315,
		type: 'numeric',
		value: '5',
		origValue: '5',
	},
	{
		id: 1673857583603,
		type: 'numeric',
		value: '6',
		origValue: '6',
	},
	{
		id: 1673857583763,
		type: 'numeric',
		value: '7',
		origValue: '7',
	},
	{
		id: 1673857584171,
		type: 'math',
		value: ',',
		origValue: ',',
	},
	{
		id: 1673857584995,
		type: 'numeric',
		value: '2',
		origValue: '2',
	},
	{
		id: 1673857577127,
		type: 'func',
		value: ')',
		origValue: ')',
	},
	{
		id: 1673857603602,
		type: 'math',
		value: '×',
		origValue: '*',
	},
	{
		id: 1673857613653,
		type: 'func',
		value: 'ОКРВНИЗ(',
		origValue: 'floor(',
	},
	{
		id: 1673857614676,
		type: 'func',
		value: 'МОД(',
		origValue: 'abs(',
	},
	{
		id: 1673857615746,
		type: 'math',
		value: '-',
		origValue: '-',
	},
	{
		id: 1673857616106,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673857617850,
		type: 'numeric',
		value: '.',
		origValue: '.',
	},
	{
		id: 1673857618378,
		type: 'numeric',
		value: '5',
		origValue: '5',
	},
	{
		id: 1673857614677,
		type: 'func',
		value: ')',
		origValue: ')',
	},
	{
		id: 1673857613654,
		type: 'func',
		value: ')',
		origValue: ')',
	},
	{
		id: 1693857572579,
		type: 'math',
		value: '-',
		origValue: '-',
	},
	{
		id: 1673862890524,
		type: 'condition',
		value: 'Если (',
		origValue: 'if (',
	},
	{
		id: 1673862901848,
		type: 'param',
		value: 'A',
		origValue: 'a',
		description: 'Описание',
	},
	{
		id: 1673862890525,
		type: 'condition',
		value: ') {',
		origValue: ') {',
	},
	{
		id: 1673862903888,
		type: 'numeric',
		value: '5',
		origValue: '5',
	},
	{
		id: 1673862890528,
		type: 'condition',
		value: '} Иначе {',
		origValue: '} else {',
	},
	{
		id: 1673862904760,
		type: 'numeric',
		value: '1',
		origValue: '1',
	},
	{
		id: 1673862904952,
		type: 'numeric',
		value: '0',
		origValue: '0',
	},
	{
		id: 1673862890531,
		type: 'condition',
		value: '}',
		origValue: '}',
	},
]

const test: IPartFormula[] = [
	{
		id: '1',
		type: 'Numeric',
		value: '15',
	},
	{
		id: '2',
		type: 'Math',
		value: '+',
		origValue: '+',
	},
	{
		id: '3',
		type: 'Param',
		value: 'A',
		origValue: 'a',
		description: 'description',
	},
	{
		id: '4',
		type: 'Math',
		value: '+',
		origValue: '+',
	},
	{
		id: '5',
		type: 'Func',
		value: 'ОКРВВЕРХ(',
		origValue: 'ceil(',
		endValue: ')',
		children: [
			{
				id: '6',
				type: 'Numeric',
				value: '14.54',
			},
			{
				id: '7',
				type: 'Math',
				value: '×',
				origValue: '*',
			},
			{
				id: '8',
				type: 'Numeric',
				value: '10',
			},
		],
	},
	{
		id: '9',
		type: 'Math',
		value: '÷',
		origValue: '/',
	},
	{
		id: '10',
		type: 'Numeric',
		value: '10',
	},
	{
		id: '11',
		type: 'Math',
		value: '-',
		origValue: '-',
	},
	{
		id: '12',
		type: 'Func',
		value: 'ОКРУГТ(',
		origValue: 'roundn(',
		endValue: ')',
		children: [
			{
				id: '13',
				type: 'Numeric',
				value: '12.4567',
			},
			{
				id: '14',
				type: 'Math',
				value: ',',
				origValue: ',',
			},
			{
				id: '15',
				type: 'Numeric',
				value: '2',
			},
		],
	},
	{
		id: '16',
		type: 'Math',
		value: '×',
		origValue: '*',
	},
	{
		id: '17',
		type: 'Func',
		value: 'ОКРВНИЗ(',
		origValue: 'floor(',
		endValue: ')',
		children: [
			{
				id: '18',
				type: 'Func',
				value: 'МОД(',
				origValue: 'abs(',
				endValue: ')',
				children: [
					{
						id: '19',
						type: 'Math',
						value: '-',
						origValue: '-',
					},
					{
						id: '20',
						type: 'Numeric',
						value: '1.54',
					},
				],
			},
		],
	},
	{
		id: '21',
		type: 'Math',
		value: '-',
		origValue: '-',
	},
	{
		id: '22',
		type: 'Condition',
		exp: [
			{
				id: '23',
				type: 'Param',
				value: 'B',
				origValue: 'b',
				description: 'Description',
			},
			{
				id: '24',
				type: 'Math',
				value: '>',
				origValue: '>',
			},
			{
				id: '25',
				type: 'Numeric',
				value: '15',
			},
		],
		then: [
			{
				id: '26',
				type: 'Numeric',
				value: '10',
			},
		],
		else: [
			{
				id: '27',
				type: 'Numeric',
				value: '20',
			},
		],
	},
]

const initialState: IFormulasState = {
	loading: false,
	error: null,
	activeIndex: -1,
	activeIdx: 0,
	activeId: 'start',
	breadcrumbs: '',
	formula: {
		id: '',
		groupId: '',
		title: '',
		parts: testParts || [],
	},
	testFormula: {
		id: '',
		groupId: '',
		title: '',
		parts: test,
	},
}

export const formulaSlice = createSlice({
	name: 'formula',
	initialState,
	reducers: {
		changeIndex: (state, action: PayloadAction<number>) => {
			state.activeIndex = action.payload
		},

		changeId: (state, action: PayloadAction<{ id: string; idx: number; bread: string }>) => {
			state.activeId = action.payload.id
			state.activeIdx = action.payload.idx
			state.breadcrumbs = action.payload.bread
		},
		nextId: state => {
			if (state.activeId === 'start') {
				if (state.testFormula.parts.length > 0) state.activeId = state.testFormula.parts[0].id
				return
			}

			let parts = state.testFormula.parts
			if (state.breadcrumbs !== '') {
				const path = state.breadcrumbs.split('/')
				path.forEach(p => {
					let str = p.split('@')
					let find = parts.find(part => part.id === str[0])
					if (find?.type === 'Func') parts = find.children
					if (find?.type === 'Condition') parts = find[str[1] as 'exp']
				})
			}

			const idx = parts.findIndex(p => p.id === state.activeId)
			let part = parts[idx]

			if (part.type === 'Numeric' && (part as FormulaPartNumeric).value.length - 1 > state.activeIdx) {
				state.activeIdx += 1
			} else {
				if (idx === parts.length - 1) return
				// TODO учесть наличие дочерних и родительских элементов
				state.activeId = parts[idx + 1].id
				state.activeIdx = 0
			}
		},
		prevId: state => {
			if (state.activeId === 'start') {
				return
			}

			let parts = state.testFormula.parts
			if (state.breadcrumbs !== '') {
				const path = state.breadcrumbs.split('/')
				path.forEach(p => {
					let str = p.split('@')
					let find = parts.find(part => part.id === str[0])
					if (find?.type === 'Func') parts = find.children
					if (find?.type === 'Condition') parts = find[str[1] as 'exp']
				})
			}

			const idx = parts.findIndex(p => p.id === state.activeId)
			let part = parts[idx]

			if (part.type === 'Numeric' && state.activeIdx > 0) {
				state.activeIdx -= 1
			} else {
				if (idx === 0) return
				// TODO учесть наличие дочерних и родительских элементов
				state.activeId = parts[idx - 1].id
				state.activeIdx = (parts[idx - 1] as FormulaPartNumeric).value.length - 1
			}
		},

		insertParts: (state, action: PayloadAction<IPartFormula[]>) => {
			let parts = state.testFormula.parts
			if (state.breadcrumbs !== '') {
				const path = state.breadcrumbs.split('/')
				path.forEach(p => {
					let str = p.split('@')
					let find = parts.find(part => part.id === str[0])
					if (find?.type === 'Func') parts = find.children
					if (find?.type === 'Condition') parts = find[str[1] as 'exp']
				})
			}

			const idx = parts.findIndex(p => p.id === state.activeId)
			let part = parts[idx]
		},

		insertPart: (state, action: PayloadAction<IFormulaParts>) => {
			state.formula.parts.splice(state.activeIndex > -1 ? state.activeIndex + 1 : 0, 0, action.payload)
			state.activeIndex += 1
		},
		deletePart: (state, action: PayloadAction<number>) => {
			state.formula.parts = state.formula.parts.filter((_, i) => i !== action.payload)
		},
		uniteParts: (state, action: PayloadAction<IFormulaParts>) => {
			state.formula.parts[state.activeIndex].value += action.payload.value
			state.formula.parts[state.activeIndex].origValue += action.payload.origValue
		},
		insertFormula: (state, action: PayloadAction<IFormulaParts[]>) => {
			state.formula.parts.splice(state.activeIndex > -1 ? state.activeIndex + 1 : 0, 0, ...action.payload)
			state.activeIndex += 1
		},
	},
})

export const { changeIndex, changeId, nextId, prevId, insertParts, insertPart, deletePart, uniteParts, insertFormula } =
	formulaSlice.actions

export default formulaSlice.reducer
