import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ClipboardEvent, FC, MouseEvent, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { models } from '@/../wailsjs/go/models'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { setActiveCeil } from '@/store/table'

type Props = {
	headers: models.Field[]
	data: any[]
}

export const VirtualTable: FC<Props> = ({ headers, data }) => {
	const parentRef = useRef<HTMLTableElement | null>(null)
	const rowVirtualizer = useVirtualizer({
		count: data.length ? data.length : 0,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 20,
	})

	const activeCeil = useAppSelector(state => state.table.activeCeil)
	const dispatch = useAppDispatch()

	const pasteHandler = (event: ClipboardEvent<HTMLDivElement>) => {
		console.log('paste', event.clipboardData.getData('Text'))
	}

	const onSelectHandler = (event: MouseEvent<HTMLTableElement>) => {
		const dataset = (event.target as HTMLTableElement).dataset
		const index = dataset.index
		const name = dataset.name

		const ceil = index && name ? { index: +index, name } : null
		dispatch(setActiveCeil(ceil))
	}

	//TODO похоже надо все таки свою таблицу пилить
	return (
		<TableContainer
			onPaste={pasteHandler}
			// overflowX='unset'
			// overflowY='unset'
			border='1px solid var(--chakra-colors-gray-100)'
			borderRadius='14px'
			padding='10px'
		>
			<Table variant='simple' ref={parentRef} onClick={onSelectHandler}>
				<Thead position='sticky' top={0} zIndex='docked' backgroundColor='var(--white)'>
					<Tr>
						<Th>№</Th>
						{headers.map(h => (
							<Th key={h.id}>{h.title}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{rowVirtualizer.getVirtualItems().map(virtualItem => (
						<Tr key={virtualItem.key}>
							<Td textAlign='center'>{virtualItem.index + 1}</Td>
							{headers.map(h => (
								<Td key={h.id} textAlign='center' data-index={virtualItem.index} data-name={h.name}>
									{data[virtualItem.index][h.name]}
								</Td>
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
