import styled, { keyframes } from 'styled-components'
import { FormulaPartType } from '../../types/formula'

export const Container = styled.div`
	padding: 8px 8px;
	border: 2px solid var(--secondary-color);
	border-radius: 16px;
	flex-grow: 1;
	width: 100%;
	/* max-width: 700px; */
	/* min-height: 200px; */
	cursor: text;
	position: relative;
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
	opacity: 0;
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
	padding: ${props => (props.type === 'numeric' ? 0 : props.type === 'field' ? '0 5px' : '0 8px')};
	background-color: ${props => (props.type === 'field' ? '#9dc4ff' : 'inherit')};
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
