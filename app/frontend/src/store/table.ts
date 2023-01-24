import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IData, ITable } from '@/types/tables'
import { models } from '@/../wailsjs/go/models'
import { GetAllTableData } from '@/../wailsjs/go/root/App'

export interface ITableState {
	loading: boolean
	error: string | null
	activeTable: models.Table | null
	data: IData[][]
}

const initialState: ITableState = {
	loading: false,
	error: null,
	activeTable: null,
	data: [],
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
			const newData = action.payload.fields.map(() => ({
				value: '',
			}))
			if (state.data.length) state.data[state.data.length - 1] = newData
			else state.data.push(newData)
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

export const { setActiveTable } = tableSlice.actions

export default tableSlice.reducer
