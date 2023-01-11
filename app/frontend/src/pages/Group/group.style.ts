import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
`

export const Column = styled.div`
	flex-basis: 32%;
`

export const ColumnTitle = styled.p`
	font-size: 1.2em;
	font-weight: bold;
`

export const GroupItem = styled.p`
	/* border-radius: 8px; */
	/* background-color: var(--secondary-color); */
	/* color: var(--white); */
	border-bottom: 2px solid var(--primary-color);
	padding: 6px 14px;
	transition: all 0.3s ease-in-out;
	/* margin-bottom: 6px; */
	cursor: pointer;

	&:hover {
		/* box-shadow: inset; */
	}
`

export const LinkItem = styled.a``
