import styled, { keyframes } from 'styled-components'
import { ConditionType, FormulaPartType } from '../../types/formula'

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

export const Formula = styled.div`
	margin-top: 6px;
	padding: 0 8px;
	word-break: break-all;
`

export const FormulaContainer = styled.div`
	margin-top: 6px;
	padding: 0 8px;
	/* word-break: break-all; */
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	align-content: center;
	gap: 3px;
	min-height: 30px;
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
	// type: FormulaPartType | ConditionType
}

export const Symbol = styled.span<SymbolProps>`
	font-size: 1em;
	font-weight: 500;
	position: relative;
	border-radius: 3px;
	text-align: center;
	color: #000;

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

export const Math = styled(Symbol)`
	margin: 0 4px;
	padding: 0 4px;
`

export const Numeric = styled(Symbol)``

export const Param = styled(Symbol)`
	padding: 3px 5px;
	background-color: #9dc4ff;
`

export const Func = styled(Symbol)`
	margin: 0 3px;
	padding: 3px 5px;
	background-color: var(--chakra-colors-messenger-500);
	color: var(--white);
`

export const NewSymbol = styled.span<SymbolProps>`
	position: relative;
	/* padding: 1px; */

	:first-child {
		padding-left: 3px;
	}
	:last-child {
		padding-right: 3px;
	}

	&:after {
		content: '';
		position: absolute;
		right: 0px;
		top: 0;
		width: 1px;
		height: 100%;
		background: #152736;
		display: ${props => (props.active ? 'block' : 'none')};
		z-index: 50;
		animation: ${blink} 1.6s infinite;
	}
`

export const Block = styled.div<SymbolProps>`
	font-size: 1em;
	font-weight: 500;
	position: relative;
	border-radius: 3px;
	color: #000;

	&:before {
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

export const Start = styled(Block)<{ isAlone?: boolean; condition?: boolean }>`
	margin: ${props => (props.isAlone ? '0 1px' : '0')};
	padding: ${props => (props.isAlone ? '0 3px' : '0')};
	width: ${props => (props.isAlone ? '12px' : '0')};
	height: 20px;
	background-color: ${props => (props.condition ? 'var(--border-color)' : 'var(--white)')};
`

export const NewMath = styled(Block)`
	margin: 0 1px;
	padding: 0 3px;
`

export const NewNumeric = styled(Block)`
	margin: 1px 2px;
`

export const NewParam = styled(Block)`
	margin: 1px 4px;
	padding: 0px 5px;
	background-color: #9dc4ff;
`

export const NewFunc = styled.div`
	margin: 0 5px;
	/* padding: 0px 3px; */
	background-color: var(--white);
	border-radius: 3px;
	display: flex;
	align-items: center;
`

export const FuncBlock = styled.div<{ level: number; active?: boolean }>`
	margin: ${props => (props.level === 1 ? '0px 3px' : '0px')};
	padding: ${props => (props.level === 1 ? '3px 8px' : '0px')};
	background-color: var(--chakra-colors-messenger-500);
	color: var(--white);
	display: flex;
	align-items: center;
	position: relative;
	border-radius: ${props => (props.level === 1 ? '3px' : '0px')};

	&:before {
		content: '';
		position: absolute;
		right: -2px;
		top: 0;
		width: 1px;
		height: 100%;
		background: #152736;
		display: ${props => (props.active ? 'block' : 'none')};
		z-index: 50;
		animation: ${blink} 1.6s infinite;
	}
`

export const ConditionBlock = styled.div`
	flex-basis: 100%;
`

export type ConditionProps = {
	bgColor?: string
}

export const NewCondition = styled.div<ConditionProps & { active?: boolean }>`
	background-color: ${props => props.bgColor || 'var(--chakra-colors-orange-500)'};
	color: ${props => (props.bgColor != 'var(--chakra-colors-yellow-400)' ? 'var(--white)' : 'inherit')};
	padding: 4px 10px;
	width: fit-content;
	border-radius: 4px;
	display: flex;
	align-items: center;
	position: relative;

	&:before {
		content: '';
		position: absolute;
		right: -2px;
		top: 0;
		width: 1px;
		height: 100%;
		background: #152736;
		display: ${props => (props.active ? 'block' : 'none')};
		z-index: 50;
		animation: ${blink} 1.6s infinite;
	}
`

export const NewConditionLine = styled.div<ConditionProps>`
	padding: 3px 5px 3px 10px;
	margin-left: 4px;
	min-height: 32px;
	background-color: var(--white);
	border-radius: 3px;
	position: relative;
	display: flex;
	align-items: center;

	&:after {
		content: '';
		background-color: ${props => props.bgColor || 'var(--chakra-colors-orange-500)'};
		height: calc(100% + 4px);
		width: 6px;
		position: absolute;
		left: -4px;
		top: -2px;
	}
`

export const ConditionLine = styled.div<ConditionProps>`
	border-left: 5px solid ${props => props.bgColor || 'var(--chakra-colors-orange-500)'};
	padding-left: 6px;
	margin: 0 3px;
`

export const Condition = styled(Symbol)<ConditionProps>`
	margin: 0 3px;
	padding: 3px 5px;
	background-color: ${props => props.bgColor || 'var(--chakra-colors-orange-500)'};
	color: ${props => (props.bgColor != 'var(--chakra-colors-yellow-400)' ? 'var(--white)' : 'inherit')};
`
