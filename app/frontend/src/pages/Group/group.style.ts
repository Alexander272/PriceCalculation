import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
`

export const Column = styled.div`
	flex-basis: 32%;
	display: flex;
	flex-direction: column;
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

export const LinkItem = styled(Link)``

type ListProps = {
	bgColor?: string
	color?: string
}

export const List = styled.ul`
	margin: 12px 4px;
`
export const ListItem = styled.li<ListProps>`
	padding: 10px 14px;
	padding-left: 2.3em;
	font-weight: bold;
	box-shadow: 0.25rem 0.25rem 0.6rem rgba(0, 0, 0, 0.05), 0 0.5rem 1.125rem rgba(75, 0, 0, 0.05);
	border-radius: 12px;
	position: relative;
	margin-top: 1.2rem;
	margin-left: 1.1rem;
	transition: all 0.4s ease-in-out;
	cursor: pointer;
	counter-increment: myCounter;

	:hover {
		box-shadow: 0.25rem 0.25rem 0.4rem rgba(0, 0, 0, 0.09), 0 0.2rem 1.125rem rgba(75, 0, 0, 0.09);
	}

	:before {
		content: counter(myCounter);
		position: absolute;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		color: ${props => (props.color ? props.color : 'var(--white)')};
		background-color: ${props => (props.bgColor ? props.bgColor : 'var(--primary-color)')};
		font-size: 1.3em;
		height: 2.6rem;
		width: 2.6rem;
		/* padding: 1rem 1rem 1rem 3rem; */
		padding: 0.125em 0.25em;
		border-radius: 1rem 1rem 0 1rem;
		font-weight: bold;
		top: -0.9rem;
		left: -1rem;
	}
`
