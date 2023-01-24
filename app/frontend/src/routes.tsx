import { HashRouter, Route, Routes } from 'react-router-dom'
import Main from './Layout/Main/Main'
import Formulas from './pages/Formulas/Formulas'
import Group from './pages/Group/Group'
import Table from './pages/Table/Table'

export const AppRoutes = () => (
	<HashRouter basename={'/'}>
		<Routes>
			<Route path='/' element={<Main />}>
				<Route index element={<Group />} />
				<Route path='/formulas/:id' element={<Formulas />} />
				<Route path='/table' element={<Table />} />
			</Route>
		</Routes>
	</HashRouter>
)
