import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IData, ITable } from '@/types/tables'
import { models } from '@/../wailsjs/go/models'
import { GetAllTableData } from '@/../wailsjs/go/root/App'

export interface ITableState {
	loading: boolean
	error: string | null
	activeTable: models.Table | null
	activeCeil: { index: number; name: string } | null
	editCeil: { index: number; name: string } | null
	oldData: IData[][]
	data: any[]
}

const initialState: ITableState = {
	loading: false,
	error: null,
	activeTable: null,
	data: [
		{
			id: '1',
			shirina: 2.3,
			rashod: 1.3,
			stal: '304',
			cena: 500,
			tolscina: 0.2,
			plotnost: 8,
			kod_stali: '1',
		},
		{
			id: '2',
			shirina: 2.5,
			rashod: 1.3,
			stal: '304',
			cena: 500,
			tolscina: 0.2,
			plotnost: 8,
			kod_stali: '1',
		},
		{
			id: '3',
			shirina: 2.8,
			rashod: 1.3,
			stal: '304',
			cena: 500,
			tolscina: 0.2,
			plotnost: 8,
			kod_stali: '1',
		},
	],
	oldData: [],
	activeCeil: null,
	editCeil: null,
}

export const fetchTableData = createAsyncThunk('table/fetchData', async (table: models.Table) => {
	const tables = await GetAllTableData(table)

	return { tables }
})

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		// setTables: (state, action: PayloadAction<models.Table[]>) => {
		// 	state.tables = action.payload
		// },
		setActiveTable: (state, action: PayloadAction<models.Table>) => {
			state.activeTable = action.payload
			// const newData = action.payload.fields.map(() => ({
			// 	value: '',
			// }))
			// if (state.data.length) state.data[state.data.length - 1] = newData
			// else state.data.push(newData)
		},
		setActiveCeil: (state, action: PayloadAction<{ index: number; name: string } | null>) => {
			state.activeCeil = action.payload
		},
		setEditCeil: (state, action: PayloadAction<{ index: number; name: string } | null>) => {
			state.editCeil = action.payload
		},
		setEditData: (state, action: PayloadAction<{ value: string; isNew?: boolean }>) => {
			if (action.payload.isNew) {
				// state.data.push()
			} else {
				state.data[state.editCeil!.index][state.editCeil!.name] = action.payload.value
			}
			state.editCeil = null
		},
		pasteData: (state, action: PayloadAction<string[][]>) => {
			const currentField = state.activeTable!.fields.findIndex(k => k.name === state.activeCeil?.name)

			let start = state.activeCeil!.index
			console.log('paste', start, currentField)
			let end = start + action.payload.length
			for (let i = start; i < end; i++) {
				let lastField = currentField + action.payload[0].length
				console.log(lastField)

				for (let j = currentField; j < lastField; j++) {
					console.log(state.activeTable!.fields[j], j)

					state.data[i][state.activeTable!.fields[j].name] = action.payload[i - start][j - currentField]
					console.log(action.payload[i - start][j - currentField])
				}
			}
		},
	},

	extraReducers: builder => {
		// builder.addCase(fetchData.pending, state => {
		// 	state.loading = true
		// })
		// builder.addCase(fetchData.rejected, (state, action) => {
		// 	state.error = action.error.message || null
		// 	state.loading = false
		// })
		// builder.addCase(fetchData.fulfilled, (state, action) => {
		// 	state.tables = action.payload.tables || []
		// 	state.loading = false
		// })
	},
})

export const { setActiveTable, setActiveCeil, setEditCeil, setEditData, pasteData } = tableSlice.actions

export default tableSlice.reducer
