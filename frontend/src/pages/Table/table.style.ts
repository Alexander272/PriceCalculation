import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const Header = styled.div`
	display: flex;
	flex-grow: 1;
	width: 100%;
	max-width: 1200px;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding: 0 20px;
`

export const Title = styled.h5`
	color: var(--primary-color);
	font-size: 1.6em;
	font-weight: bold;
`

export const Setting = styled.div`
	width: 30px;
	cursor: pointer;
`
