import styled, { keyframes } from 'styled-components'
import { FormulaPartType } from '../../types/formula'

export const Container = styled.div`
	padding: 8px 8px;
	border: 2px solid var(--secondary-color);
	border-radius: 12px;
	flex-grow: 1;
	width: 100%;
	/* max-width: 700px; */
	/* min-height: 200px; */
	cursor: text;
	position: relative;
	background-color: var(--white);
`

export const Title = styled.input`
	border: none;
	outline: none;
	font-size: 1em;
	width: 100%;
	padding: 0 8px 6px;
	border-bottom: 1px solid var(--secondary-color);
`

export const Formula = styled.p`
	margin-top: 6px;
	padding: 0 8px;
	word-break: break-all;
`

export const Input = styled.input`
	position: absolute;
	left: 0;
	opacity: 0;
	pointer-events: none;
`

const blink = keyframes`
	0%,100% {
		opacity:1
	}
	50%{
		opacity:0
	}
`

type SymbolProps = {
	active?: boolean
	type: FormulaPartType
}

export const Symbol = styled.span<SymbolProps>`
	font-size: 1em;
	font-weight: 500;
	position: relative;
	/* color: #fff; */
	margin: ${props =>
		props.type === 'numeric' || props.type === 'field' ? 0 : props.type === 'func' ? '0 3px' : '0 8px'};
	padding: ${props => (props.type === 'field' || props.type === 'func' ? '3px 5px' : '0')};
	background-color: ${props =>
		props.type === 'field' ? '#9dc4ff' : props.type === 'func' ? 'var(--chakra-colors-messenger-500)' : 'inherit'};
	border-radius: 3px;
	text-align: center;

	&:after {
		content: '';
		position: absolute;
		right: -3px;
		top: 0;
		width: 1px;
		height: 100%;
		background: #152736;
		display: ${props => (props.active ? 'block' : 'none')};
		z-index: 50;
		animation: ${blink} 1.6s infinite;
	}
`
