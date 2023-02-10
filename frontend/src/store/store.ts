import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './groups'
import formulaReducer from './formula'
import tableReducer from './table'

export const store = configureStore({
	reducer: {
		group: groupReducer,
		formula: formulaReducer,
		table: tableReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
