import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Layout/Main/Main'
import Formulas from './pages/Formulas/Formulas'

export const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Main />}>
				<Route index element={<Formulas />} />
			</Route>
		</Routes>
	</BrowserRouter>
)
