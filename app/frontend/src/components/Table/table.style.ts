import styled from 'styled-components'

export const TableContainer = styled.div`
	position: relative;
	border-radius: 14px;
	border: 1px solid var(--chakra-colors-gray-100);
	/* padding: 10px 20px; */

	max-height: 750px;
	width: 100%;
	overflow-x: auto;
	overflow-y: auto;
	z-index: 5;
`

export type ActiveCeilProps = {
	top: number
	left: number
	width: number
	height: number
}
export const ActiveCeil = styled.div<ActiveCeilProps>`
	position: absolute;
	display: ${props => (props.height > 0 ? 'block' : 'none')};
	top: ${props => props.top + 'px'};
	left: ${props => props.left + 'px'};
	width: ${props => props.width + 'px'};
	height: ${props => props.height + 'px'};
	border: 2px solid var(--primary-color);
	border-radius: 8px;
	pointer-events: none;
`

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	min-width: fit-content;
`

export const Thead = styled.thead`
	position: sticky;
	left: 0;
	top: 0px;
	z-index: 10;
	/* background-color: var(--white); */
`

export const Tbody = styled.tbody``

export const Tr = styled.tr`
	/* border-bottom: 1px solid var(--chakra-colors-gray-100); */
`

type DisabledProps = {
	disabled?: boolean
}

export const Th = styled.th<DisabledProps>`
	font-weight: var(--chakra-fontWeights-bold);
	text-transform: uppercase;
	letter-spacing: var(--chakra-letterSpacings-wider);
	text-align: center;
	padding-inline-start: var(--chakra-space-6);
	padding-inline-end: var(--chakra-space-6);
	padding-top: var(--chakra-space-3);
	padding-bottom: var(--chakra-space-3);
	line-height: var(--chakra-lineHeights-4);
	font-size: var(--chakra-fontSizes-xs);
	cursor: default;
	/* color: var(--chakra-colors-gray-600); */

	/* position: sticky; */
	border: 1px solid var(--chakra-colors-gray-200);
	/* top: 0px; */
	/* z-index: 11; */
	background-color: var(--secondary-color);
`

export const Td = styled.td<DisabledProps>`
	padding-inline-start: var(--chakra-space-5);
	padding-inline-end: var(--chakra-space-5);
	padding-top: var(--chakra-space-3);
	padding-bottom: var(--chakra-space-3);
	line-height: var(--chakra-lineHeights-5);
	/* border-bottom: var(--chakra-borders-1px); */
	border-color: var(--chakra-colors-gray-100);
	text-align: center;
	border: 1px solid var(--chakra-colors-gray-200);
	background-color: ${props => props.disabled && 'var(--secondary-color)'};
	cursor: ${props => (props.disabled ? 'default' : 'cell')};
	outline: none;
	position: relative;
`

export const Input = styled.input`
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	outline: none;
	background-color: transparent;
	border: 2px solid transparent;
	border-radius: 8px;
	text-align: center;

	:focus {
		/* border: 2px solid var(--primary-color); */
		border-color: var(--primary-color);
	}
`
