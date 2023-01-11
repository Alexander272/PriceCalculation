import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../types/group'

export interface IGroupState {
	loading: boolean
	error: string | null
	groups: IGroup[]
}

const initialState: IGroupState = {
	loading: false,
	error: null,
	groups: [
		{ id: '1', title: 'СНП' },
		{ id: '2', title: 'ПУТГ' },
	],
}

export const groupSlice = createSlice({
	name: 'group',
	initialState,
	reducers: {},
})

export default groupSlice.reducer
