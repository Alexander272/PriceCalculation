import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ClipboardEvent, FC, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { models } from '@/../wailsjs/go/models'

type Props = {
	headers: models.Field[]
	data: any[]
}

export const VirtualTable: FC<Props> = ({ headers, data }) => {
	const parentRef = useRef<HTMLTableElement | null>(null)
	const rowVirtualizer = useVirtualizer({
		count: data.length ? data.length - 1 : 0,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
	})

	const pasteHandler = (event: ClipboardEvent<HTMLDivElement>) => {
		console.log('paste', event.clipboardData.getData('Text'))
	}

	//TODO похоже надо все таки свою таблицу пилить
	return (
		<TableContainer
			onPaste={pasteHandler}
			overflowX='unset'
			overflowY='unset'
			border='1px solid var(--chakra-colors-gray-100)'
			borderRadius='14px'
			padding='10px'
		>
			<Table variant='simple' ref={parentRef}>
				<Thead position='sticky' top={0} zIndex='docked' backgroundColor='var(--white)'>
					<Tr>
						<Th></Th>
						{headers.map(h => (
							<Th key={h.id}>{h.title}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{rowVirtualizer.getVirtualItems().map(virtualItem => (
						<Tr>
							{headers.map(h => (
								<Td key={h.id}>{data[virtualItem.index][h.name]}</Td>
							))}
						</Tr>
					))}

					<Tr>
						<Td>{data.length + 1}</Td>
						{headers.map(h => (
							<Td key={h.id}></Td>
						))}
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	)
}
