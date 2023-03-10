import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Wrapper } from './main.style'

export default function Main() {
	return (
		<>
			<Header />
			<Wrapper>
				<Outlet />
			</Wrapper>
		</>
	)
}
