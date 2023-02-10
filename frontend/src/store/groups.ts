import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '@/types/group'
import { ITable } from '@/types/tables'
import { models } from '@/../wailsjs/go/models'
import { GetAllTables } from '@/../wailsjs/go/root/App'

export interface IGroupState {
	loading: boolean
	error: string | null
	groups: IGroup[]
	tables: models.Table[]
}

const initialState: IGroupState = {
	loading: false,
	error: null,
	groups: [
		{ id: '1', title: 'СНП' },
		{ id: '2', title: 'ПУТГ' },
	],
	tables: [],
}

export const fetchData = createAsyncThunk('groups/fetchData', async () => {
	const tables = await GetAllTables()

	return { tables }
})

export const groupSlice = createSlice({
	name: 'group',
	initialState,
	reducers: {
		setTables: (state, action: PayloadAction<models.Table[]>) => {
			state.tables = action.payload
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchData.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchData.rejected, (state, action) => {
			state.error = action.error.message || null
			state.loading = false
		})
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.tables = action.payload.tables || []
			state.loading = false
		})
	},
})

export const { setTables } = groupSlice.actions

export default groupSlice.reducer
