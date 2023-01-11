import styled from 'styled-components'

export const ErrorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	border: 3px solid var(--danger-color);
	border-radius: 12px;
	padding: 6px;
`

export const Icon = styled.p`
	/* flex-basis: 20%; */
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	background-color: var(--danger-color);
	color: var(--white);
	font-size: 1.6em;
`

export const Message = styled.p`
	font-weight: bold;
	font-size: 1.2em;
`

export const MoreContainer = styled.div`
	flex-basis: 100%;
`

export const More = styled.p`
	transition: all 0.3s ease-in-out;
	cursor: pointer;
	margin-top: 6px;
	padding: 0 6px;
	flex-basis: 100%;
	text-align: center;
	color: var(--gray);
`

type DescriptionProps = {
	open?: boolean
}

export const Description = styled.p<DescriptionProps>`
	transition: all 0.3s ease-in-out;
	overflow: hidden;
	height: ${props => (props.open ? 'fit-content' : '0px')};
	padding: ${props => (props.open ? '6px 8px' : '0 8px')};
`
