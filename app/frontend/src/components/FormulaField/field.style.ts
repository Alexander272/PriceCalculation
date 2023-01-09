import styled, { keyframes } from 'styled-components'
import { FormulaPartType } from '../../types/formula'

export const Container = styled.div`
	padding: 8px 16px;
	border: 2px solid var(--secondary-color);
	border-radius: 16px;
	flex-grow: 1;
	width: 700px;
	min-height: 200px;
	cursor: text;
`

export const Formula = styled.p`
	display: flex;
	align-items: center;
	display: inline-block;
	word-break: break-all;
	outline: none;
`

export const Input = styled.input`
	border: none;
	outline: none;
	display: inline-block;
	background-color: transparent;
	width: 10px;
	/* width: 1px; */
	/* overflow: hidden; */
	/* color: transparent; */
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
	font-size: 18px;
	font-weight: 500;
	position: relative;
	/* color: #fff; */
	padding: ${props => (props.type === 'numeric' ? 0 : props.type === 'field' ? '0 3px' : '0 8px 0 5px')};
	margin-right: ${props => (props.type === 'field' ? '3px' : 0)};
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
