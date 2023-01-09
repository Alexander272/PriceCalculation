import React from 'react'
import { Outlet } from 'react-router-dom'
import { Wrapper } from './main.style'

export default function Main() {
	return (
		<Wrapper>
			<Outlet />
		</Wrapper>
	)
}
