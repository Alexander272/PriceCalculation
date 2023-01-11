import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IFormula, IFormulaParts } from '../types/formula'

export interface IFormulasState {
	loading: boolean
	error: string | null
	formula: IFormula
	activeIndex: number
}

const initialState: IFormulasState = {
	loading: false,
	error: null,
	activeIndex: -1,
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
		changeIndex: (state, action: PayloadAction<number>) => {
			state.activeIndex = action.payload
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
	},
})

export const { changeIndex, insertPart, deletePart, uniteParts } = formulaSlice.actions

export default formulaSlice.reducer
