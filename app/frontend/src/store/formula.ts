import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
	FormulaPartMath,
	FormulaPartNumeric,
	FormulaPartParam,
	INewFormula,
	IFormulaParts,
	IPartFormula,
	FormulaPartFunc,
	FormulaPartCondition,
} from '../types/formula'

export interface IFormulasState {
	loading: boolean
	error: string | null
	// formula: IFormula
	formula: INewFormula
	activeIndex: number
	activeIdx: number
	activeId: string
	deleteCount: number
	breadcrumbs: string
}

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
			{ id: '6', type: 'Start' },
			{
				id: '7',
				type: 'Numeric',
				value: '14.54',
			},
			{
				id: '8',
				type: 'Math',
				value: '×',
				origValue: '*',
			},
			{
				id: '9',
				type: 'Numeric',
				value: '10',
			},
		],
	},
	{
		id: '10',
		type: 'Math',
		value: '÷',
		origValue: '/',
	},
	{
		id: '11',
		type: 'Numeric',
		value: '10',
	},
	{
		id: '12',
		type: 'Math',
		value: '-',
		origValue: '-',
	},
	{
		id: '13',
		type: 'Func',
		value: 'ОКРУГТ(',
		origValue: 'roundn(',
		endValue: ')',
		children: [
			{ id: '14', type: 'Start' },
			{
				id: '15',
				type: 'Numeric',
				value: '12.4567',
			},
			{
				id: '16',
				type: 'Math',
				value: ',',
				origValue: ',',
			},
			{
				id: '17',
				type: 'Numeric',
				value: '2',
			},
		],
	},
	{
		id: '18',
		type: 'Math',
		value: '×',
		origValue: '*',
	},
	{
		id: '19',
		type: 'Func',
		value: 'ОКРВНИЗ(',
		origValue: 'floor(',
		endValue: ')',
		children: [
			{ id: '20', type: 'Start' },
			{
				id: '21',
				type: 'Func',
				value: 'МОД(',
				origValue: 'abs(',
				endValue: ')',
				children: [
					{ id: '22', type: 'Start' },
					{
						id: '23',
						type: 'Math',
						value: '-',
						origValue: '-',
					},
					{
						id: '24',
						type: 'Numeric',
						value: '1.54',
					},
				],
			},
		],
	},
	{
		id: '25',
		type: 'Math',
		value: '-',
		origValue: '-',
	},
	{
		id: '26',
		type: 'Condition',
		exp: [
			{
				id: '27',
				type: 'Start',
			},
			{
				id: '28',
				type: 'Param',
				value: 'B',
				origValue: 'b',
				description: 'Description',
			},
			{
				id: '29',
				type: 'Math',
				value: '>',
				origValue: '>',
			},
			{
				id: '30',
				type: 'Numeric',
				value: '15',
			},
		],
		then: [
			{ id: '31', type: 'Start' },
			{
				id: '32',
				type: 'Numeric',
				value: '10',
			},
		],
		else: [
			{ id: '33', type: 'Start' },
			{
				id: '34',
				type: 'Numeric',
				value: '20',
			},
		],
	},
	{
		id: '34',
		type: 'Math',
		value: '-',
		origValue: '-',
	},
	{
		id: '35',
		type: 'Numeric',
		value: '1.54',
	},
]

const initialState: IFormulasState = {
	loading: false,
	error: null,
	activeIndex: -1,
	activeIdx: 0,
	activeId: 'start',
	breadcrumbs: '',
	deleteCount: 0,
	// formula: {
	// 	id: '',
	// 	groupId: '',
	// 	title: '',
	// 	parts: [],
	// },
	formula: {
		id: '',
		groupId: '',
		title: '',
		parts: [],
	},
}

export const formulaSlice = createSlice({
	name: 'formula',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.formula.title = action.payload
		},

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
				if (state.formula.parts.length > 0) {
					let part = state.formula.parts[0]
					if (part.type === 'Func') {
						state.activeId = part.children[0].id
						state.breadcrumbs += `${part.id}/`
					} else if (part.type === 'Condition') {
						state.activeId = part.exp[0].id
						state.breadcrumbs += `${part.id}@exp/`
					} else state.activeId = part.id
				}
				return
			}

			let parts = state.formula.parts
			const { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts
			let part = parts[idx]

			if (part.type === 'Numeric' && (part as FormulaPartNumeric).value.length - 1 > state.activeIdx) {
				state.activeIdx += 1
			} else {
				if (idx === parts.length - 1) {
					if (state.breadcrumbs != '') {
						const parts = state.breadcrumbs.split('/')
						state.activeId = parts[parts.length - 2].split('@')[0]
						state.activeIdx = 0
						parts.splice(parts.length - 2, 1)
						state.breadcrumbs = parts.join('/')
					}
					return
				}
				// TODO учесть наличие дочерних и родительских элементов
				part = parts[idx + 1]
				if (part.type === 'Func') {
					state.activeId = part.children[0].id
					state.breadcrumbs += `${part.id}/`
				} else if (part.type === 'Condition') {
					state.activeId = part.exp[0].id
					state.breadcrumbs += `${part.id}@exp/`
				} else state.activeId = parts[idx + 1].id
				state.activeIdx = 0
			}
		},
		prevId: state => {
			if (state.activeId === 'start') {
				return
			}

			let parts = state.formula.parts
			const { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			let part = parts[idx]

			if (part.type === 'Numeric' && state.activeIdx > 0) {
				state.activeIdx -= 1
			} else {
				if (idx === 0) {
					if (state.breadcrumbs != '') {
						const parts = state.breadcrumbs.split('/')
						state.activeId = parts[parts.length - 2].split('@')[0]
						parts.splice(parts.length - 2, 1)
						state.breadcrumbs = parts.join('/')
					} else state.activeId = 'start'
					state.activeIdx = 0
					return
				}
				state.activeId = parts[idx - 1].id
				state.activeIdx = (parts[idx - 1] as FormulaPartNumeric).value?.length - 1 || 0
			}
		},

		insertNumeric: (state, action: PayloadAction<FormulaPartNumeric>) => {
			let parts = state.formula.parts
			const { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			if (idx === -1) {
				parts.splice(0, 0, action.payload)
				state.activeId = action.payload.id
				return
			}

			if (parts[idx].type === 'Param' || parts[idx].type === 'Numeric') {
				if ((action.payload as FormulaPartNumeric).value === '.' && parts[idx].type === 'Param') {
					return
				}

				let tmp = (parts[idx] as FormulaPartNumeric).value.split('')
				tmp.splice(state.activeIdx + 1, 0, action.payload.value)
				;(parts[idx] as FormulaPartNumeric).value = tmp.join('')

				if (parts[idx].type === 'Param') {
					;(parts[idx] as FormulaPartParam).origValue += action.payload.value
				}
				state.activeIdx += 1
			} else {
				parts.splice(idx + 1, 0, action.payload)
				state.activeId = action.payload.id
			}
		},
		insertMath: (state, action: PayloadAction<FormulaPartMath>) => {
			let parts = state.formula.parts
			const { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			parts.splice(idx > -1 ? idx + 1 : 0, 0, action.payload)
			state.activeId = action.payload.id
			state.activeIdx = 0
		},
		insertParam: (state, action: PayloadAction<FormulaPartParam>) => {
			let parts = state.formula.parts
			const { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			if (idx === -1) {
				parts.splice(0, 0, action.payload)
				state.activeId = action.payload.id
				return
			}

			if (parts[idx].type === 'Numeric') return

			if (parts[idx].type === 'Param') {
				;(parts[idx] as FormulaPartParam).value = action.payload.value

				if (parts[idx].type === 'Param') {
					;(parts[idx] as FormulaPartParam).origValue += action.payload.origValue
				}
				state.activeIdx += 1
			} else {
				parts.splice(idx > -1 ? idx + 1 : 0, 0, action.payload)
				state.activeId = action.payload.id
			}
		},
		insertFormula: (state, action: PayloadAction<FormulaPartFunc>) => {
			let parts = state.formula.parts
			let { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			parts.splice(idx > -1 ? idx + 1 : 0, 0, action.payload)
			state.activeId = action.payload.children[0].id
			state.breadcrumbs += `${action.payload.id}/`
			state.activeIdx = 0
		},
		insertCondition: (state, action: PayloadAction<FormulaPartCondition>) => {
			let parts = state.formula.parts
			let { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			parts.splice(idx > -1 ? idx + 1 : 0, 0, action.payload)
			state.activeId = action.payload.exp[0].id
			state.breadcrumbs += `${action.payload.id}@exp/`
			state.activeIdx = 0
		},
		deletePart: (state, action: PayloadAction<boolean>) => {
			state.deleteCount += 1
			let parts = state.formula.parts
			let { parts: newParts, idx } = getParts(parts, state.breadcrumbs, state.activeId)
			parts = newParts

			if (idx === -1 || idx > parts.length - 1) return

			let newId = 'start'
			let newIndex = 0

			if (!action.payload) {
				newId = parts[idx > parts.length - 1 ? parts.length - 2 : idx - 1]?.id || 'start'
				newIndex = (parts[idx - 1 >= 0 ? idx - 1 : 0] as FormulaPartNumeric)?.value?.length - 1 || 0
			} else {
				newId = parts[idx > parts.length - 1 ? parts.length - 1 : idx]?.id || 'start'
				newIndex = (parts[idx >= 0 ? idx : 0] as FormulaPartNumeric)?.value?.length - 1 || 0
				if (idx < parts.length - 1) idx += 1
			}

			if (parts[idx].type === 'Numeric') {
				let tmp = (parts[idx] as FormulaPartNumeric).value.split('')
				tmp.splice(state.activeIdx, 1)
				;(parts[idx] as FormulaPartNumeric).value = tmp.join('')

				if (!action.payload) state.activeIdx -= 1

				if (state.activeIdx == -1 || (parts[idx] as FormulaPartNumeric).value == '') {
					parts.splice(idx, 1)
					state.activeId = newId
					state.activeIdx = newIndex
				}
				state.deleteCount = 0
			} else if (parts[idx].type === 'Condition' || parts[idx].type === 'Func') {
				if (state.deleteCount < 2) return
				parts.splice(idx, 1)
				state.activeId = newId
				state.activeIdx = newIndex
				state.deleteCount = 0
			} else if (parts[idx].type != 'Start') {
				parts.splice(idx, 1)
				state.activeId = newId
				state.activeIdx = newIndex
				state.deleteCount = 0
			}
		},

		// insertPart: (state, action: PayloadAction<IFormulaParts>) => {
		// 	state.formula.parts.splice(state.activeIndex > -1 ? state.activeIndex + 1 : 0, 0, action.payload)
		// 	state.activeIndex += 1
		// },
		// deletePart: (state, action: PayloadAction<number>) => {
		// 	state.formula.parts = state.formula.parts.filter((_, i) => i !== action.payload)
		// },
		// uniteParts: (state, action: PayloadAction<IFormulaParts>) => {
		// 	state.formula.parts[state.activeIndex].value += action.payload.value
		// 	state.formula.parts[state.activeIndex].origValue += action.payload.origValue
		// },
		// insertFormula: (state, action: PayloadAction<IFormulaParts[]>) => {
		// 	state.formula.parts.splice(state.activeIndex > -1 ? state.activeIndex + 1 : 0, 0, ...action.payload)
		// 	state.activeIndex += 1
		// },
	},
})

function getParts(parts: any[], breadcrumbs: string, activeId: string) {
	if (breadcrumbs !== '') {
		const path = breadcrumbs.split('/')
		path.forEach(p => {
			let str = p.split('@')
			let find = parts.find(part => part.id === str[0])
			if (find?.type === 'Func') parts = find.children
			if (find?.type === 'Condition') parts = find[str[1] as 'exp']
		})
	}
	const idx = parts.findIndex(p => p.id === activeId)

	return { parts, idx }
}

export const {
	setTitle,

	changeIndex,
	changeId,
	nextId,
	prevId,
	insertNumeric,
	insertMath,
	insertParam,
	insertFormula,
	insertCondition,
	deletePart,

	// insertPart,
	// deletePart,
	// uniteParts,
	// insertFormula,
} = formulaSlice.actions

export default formulaSlice.reducer
