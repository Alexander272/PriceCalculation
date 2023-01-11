import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './groups'
import formulaReducer from './formula'

export const store = configureStore({
	reducer: {
		group: groupReducer,
		formula: formulaReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch