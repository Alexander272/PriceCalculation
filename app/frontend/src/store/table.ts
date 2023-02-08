import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IData, ITable } from '@/types/tables'
import { models } from '@/../wailsjs/go/models'
import { GetAllTableData, GetAllTableDataNew } from '@/../wailsjs/go/root/App'

export interface ITableState {
	loading: boolean
	error: string | null
	activeTable: models.Table | null
	activeCeil: { index: number; name: string } | null
	activeCeilNew: { row: number; column: number } | null
	editCeil: { index: number; name: string } | null
	editCeilNew: { row: number; column: number } | null
	rows: models.DataLine[]
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
	rows: [],
	activeCeil: null,
	activeCeilNew: null,
	editCeil: null,
	editCeilNew: null,
}

export const fetchTableData = createAsyncThunk('table/fetchData', async (table: models.Table) => {
	const data = await GetAllTableDataNew(table)

	return { data }
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

			// if (!state.data[state.data.length - 1]?.isLast) {
			// const newData: any = {
			// 	id: Date.now().toString(),
			// 	isNew: true,
			// }
			// action.payload.fields.forEach(f => {
			// 	newData[f.name] = ''
			// })
			// state.data.push(newData)
			// }
			// const newData = action.payload.fields.map(() => ({
			// 	value: '',
			// }))
			// if (state.data.length) state.data[state.data.length - 1] = newData
			// else state.data.push(newData)
		},
		setActiveCeil: (state, action: PayloadAction<{ index: number; name: string } | null>) => {
			state.activeCeil = action.payload
		},
		setActiveCeilNew: (state, action: PayloadAction<{ row: number; column: number } | null>) => {
			state.activeCeilNew = action.payload
		},
		setEditCeil: (state, action: PayloadAction<{ index: number; name: string } | null>) => {
			state.editCeil = action.payload
		},
		setEditCeilNew: (state, action: PayloadAction<{ row: number; column: number } | null>) => {
			state.editCeilNew = action.payload
		},
		setEditData: (state, action: PayloadAction<string>) => {
			const field = state.activeTable!.fields.find(f => f.name === state.editCeil!.name)

			if (field?.typeApp === 'float64') {
				state.data[state.editCeil!.index][state.editCeil!.name] = action.payload.replace(',', '.')
			} else state.data[state.editCeil!.index][state.editCeil!.name] = action.payload
			state.data[state.editCeil!.index].isChanged = true

			if (state.editCeil!.index === state.data.length - 1) {
				state.data[state.editCeil!.index].isNew = false

				const newData: any = {
					id: Date.now().toString(),
					isNew: true,
				}
				state.activeTable!.fields.forEach(f => {
					newData[f.name] = ''
				})

				state.data.push(newData)
			}

			state.editCeil = null
		},
		setEditDataNew: (state, action: PayloadAction<string>) => {
			const field = state.activeTable!.fields[state.editCeilNew!.column]

			let newValue = action.payload
			if (field?.typeApp === 'float64') {
				newValue = action.payload.replace(',', '.')
			}
			state.rows[state.editCeilNew!.row].data[state.editCeilNew!.column].value = newValue
			state.rows[state.editCeilNew!.row].isChanged = true

			if (state.editCeilNew!.row === state.rows.length - 1) {
				// state.rows[state.editCeilNew!.row].isLast = false
				//TODO ошибка A non-serializable value
				// const newData = models.DataLine.createFrom({
				// 	id: Date.now().toString(),
				// 	isChanged: false,
				// 	isNew: true,
				// 	isLast: true,
				// 	data:
				// 		state.activeTable?.fields.map(f =>
				// 			models.DataValue.createFrom({
				// 				id: Date.now().toString() + '-' + f.name,
				// 				title: f.name,
				// 				value: '',
				// 			})
				// 		) || [],
				// })
				// state.rows.push(newData)
			}

			state.editCeilNew = null
		},
		pasteData: (state, action: PayloadAction<string[][]>) => {
			const currentField = state.activeTable!.fields.findIndex(k => k.name === state.activeCeil?.name)

			//TODO учесть вариант когда вставляется больше строк, чем есть
			let start = state.activeCeil!.index
			let isFull = false
			console.log('paste', start, currentField)
			// let end = start + action.payload.length
			// for (let i = start; i < end; i++) {
			// 	let lastField = currentField + action.payload[0].length
			// 	console.log(lastField)

			// 	for (let j = currentField; j < lastField; j++) {
			// 		console.log(state.activeTable!.fields[j], j)

			// 		state.data[i][state.activeTable!.fields[j].name] = action.payload[i - start][j - currentField]
			// 		console.log(action.payload[i - start][j - currentField])
			// 	}
			// }

			for (let i = 0; i < action.payload.length; i++) {
				const element = action.payload[i]
				for (let j = 0; j < element.length; j++) {
					if (start + i < state.data.length) {
						if (currentField + j >= state.activeTable!.fields.length) break

						if (state.activeTable!.fields[currentField + j].typeApp === 'float64') {
							state.data[start + i][state.activeTable!.fields[currentField + j].name] = action.payload[i][
								j
							].replace(',', '.')
						} else {
							state.data[start + i][state.activeTable!.fields[currentField + j].name] =
								action.payload[i][j]
						}
						state.data[start + i].isNew = false
					} else {
						isFull = true

						const newData: any = {
							id: (Date.now() + j).toString(),
							isChanged: true,
						}
						state.activeTable!.fields.forEach((f, idx) => {
							if (idx === currentField + j) {
								if (state.activeTable!.fields[currentField + j].typeApp === 'float64') {
									newData[f.name] = action.payload[i][j].replace(',', '.')
								} else {
									newData[f.name] = action.payload[i][j]
								}
							} else newData[f.name] = ''
						})
						state.data.push(newData)
					}
				}
			}

			if (isFull) {
				const newData: any = {
					id: Date.now().toString(),
					isNew: true,
				}
				state.activeTable!.fields.forEach(f => {
					newData[f.name] = ''
				})

				state.data.push(newData)
			}
		},
		pasteDataNew: (state, action: PayloadAction<string[][]>) => {
			let row = state.activeCeilNew!.row
			let column = state.activeCeilNew!.column
			let isFull = false
			console.log('paste', row, column)

			for (let i = 0; i < action.payload.length; i++) {
				const element = action.payload[i]
				for (let j = 0; j < element.length; j++) {
					if (row + i < state.rows.length) {
						if (column + j >= state.activeTable!.fields.length) break

						if (state.activeTable!.fields[column + j].typeApp === 'float64') {
							state.rows[row + i].data[column + j].value = action.payload[i][j].replace(',', '.')
						} else {
							state.rows[row + i].data[column + j].value = action.payload[i][j]
						}
					} else {
						isFull = true

						const newData = models.DataLine.createFrom({
							id: Date.now().toString(),
							isChanged: true,
							isNew: true,
							data: [],
						})
						state.activeTable!.fields.forEach((f, idx) => {
							let newValue = ''
							if (idx === column + j) {
								if (state.activeTable!.fields[column + j].typeApp === 'float64') {
									newValue = action.payload[i][j].replace(',', '.')
								} else {
									newValue = action.payload[i][j]
								}
							}
							newData.data[idx] = {
								id: (Date.now() + j).toString(),
								title: state.activeTable!.fields[column + j].name,
								value: newValue,
							}
						})

						state.rows.push(newData)
					}
				}
			}

			if (isFull) {
				const newData = models.DataLine.createFrom({
					id: Date.now().toString(),
					isChanged: false,
					isNew: true,
					isLast: true,
					data: state.activeTable?.fields.map(f =>
						models.DataValue.createFrom({
							id: Date.now().toString() + '-' + f.name,
							title: f.name,
							value: '',
						})
					),
				})
				state.rows.push(newData)
			}
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchTableData.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchTableData.rejected, (state, action) => {
			state.error = action.error.message || null
			state.loading = false
		})
		builder.addCase(fetchTableData.fulfilled, (state, action) => {
			state.rows = action.payload.data || []
			state.loading = false

			//TODO ошибка A non-serializable value
			// const newData = models.DataLine.createFrom({
			// 	id: Date.now().toString(),
			// 	isChanged: false,
			// 	isNew: true,
			// 	isLast: true,
			// 	data:
			// 		state.activeTable?.fields.map(f =>
			// 			models.DataValue.createFrom({
			// 				id: Date.now().toString() + '-' + f.name,
			// 				title: f.name,
			// 				value: '',
			// 			})
			// 		) || [],
			// })

			// state.rows.push(newData)
		})
	},
})

export const {
	setActiveTable,
	setActiveCeil,
	setActiveCeilNew,
	setEditCeil,
	setEditCeilNew,
	setEditData,
	setEditDataNew,
	pasteData,
} = tableSlice.actions

export default tableSlice.reducer
