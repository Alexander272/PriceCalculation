import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Layout/Main/Main'
import Formulas from './pages/Formulas/Formulas'
import Group from './pages/Group/Group'

export const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Main />}>
				<Route index element={<Group />} />
				<Route path='/formulas/:id' element={<Formulas />} />
			</Route>
		</Routes>
	</BrowserRouter>
)
