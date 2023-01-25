import { useVirtualizer } from '@tanstack/react-virtual'
import { ChangeEvent, ClipboardEvent, FC, FocusEvent, KeyboardEvent, MouseEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { pasteData, setActiveCeil, setEditCeil, setEditData } from '@/store/table'
import { models } from '@/../wailsjs/go/models'
import { ActiveCeil, ActiveCeilProps, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from './table.style'

type Props = {
	headers: models.Field[]
	data: any[]
}

export const MyTable: FC<Props> = ({ headers, data }) => {
	const [ceil, setCeil] = useState<ActiveCeilProps | null>(null)
	const parentRef = useRef<HTMLTableElement | null>(null)
	const rowVirtualizer = useVirtualizer({
		count: data.length ? data.length : 0,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
	})

	const [value, setValue] = useState('')

	const editCeil = useAppSelector(state => state.table.editCeil)
	const dispatch = useAppDispatch()

	const pasteHandler = (event: ClipboardEvent<HTMLDivElement>) => {
		// console.log('paste', event.clipboardData.getData('text'))
		let tmp = event.clipboardData.getData('text').split('\r\n')

		const newData = []
		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i] == '') continue
			newData.push(tmp[i].split('\t'))
		}
		console.log('data', newData)

		dispatch(pasteData(newData))
	}

	const onSelectHandler = (event: MouseEvent<HTMLTableElement>) => {
		if ((event.target as HTMLTableElement).attributes.getNamedItem('disabled') != null) return

		const dataset = (event.target as HTMLTableElement).dataset
		const index = dataset.index
		const name = dataset.name

		const c: ActiveCeilProps = {
			left: (event.target as HTMLTableElement).offsetLeft,
			top: (event.target as HTMLTableElement).offsetTop,
			width: (event.target as HTMLTableElement).offsetWidth,
			height: (event.target as HTMLTableElement).offsetHeight,
		}
		setCeil(c)

		const ceil = index && name ? { index: +index, name } : null
		dispatch(setActiveCeil(ceil))
	}

	const clearHandler = () => {
		setCeil({ left: 0, top: 0, width: 0, height: 0 })
		dispatch(setActiveCeil(null))
	}

	const focusHandler = (event: FocusEvent<HTMLTableElement>) => {
		const dataset = (event.target as HTMLTableElement).dataset
		const index = dataset.index
		const name = dataset.name
		if (!index || !name) return

		const c: ActiveCeilProps = {
			left: (event.target as HTMLTableElement).offsetLeft,
			top: (event.target as HTMLTableElement).offsetTop,
			width: (event.target as HTMLTableElement).offsetWidth,
			height: (event.target as HTMLTableElement).offsetHeight,
		}
		setCeil(c)

		const ceil = index && name ? { index: +index, name } : null
		dispatch(setActiveCeil(ceil))
	}

	const keyHandler = (event: KeyboardEvent<HTMLTableElement>) => {
		if (event.ctrlKey || event.key === 'Tab') return

		console.log(event.key)

		if (event.key === 'ArrowRight') {
			return
		}
		if (event.key === 'ArrowLeft') {
			return
		}
		if (event.key === 'ArrowDown') {
			return
		}
		if (event.key === 'ArrowUp') {
			return
		}

		console.log('key')

		const dataset = (event.target as HTMLTableElement).dataset
		const index = dataset.index
		const name = dataset.name

		if (!index || !name) return

		const ceil = index && name ? { index: +index, name } : null
		dispatch(setEditCeil(ceil))
		if (index && name) setValue(data[+index][name])
	}

	const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation()
		event.preventDefault()

		console.log('set value')

		setValue(event.target.value)
	}
	const saveValueHandler = (isNew?: boolean) => () => {
		dispatch(setEditData({ value, isNew }))
	}

	return (
		<TableContainer>
			<ActiveCeil
				top={ceil?.top || 0}
				left={ceil?.left || 0}
				width={ceil?.width || 0}
				height={ceil?.height || 0}
			/>
			<Table
				ref={parentRef}
				// onClick={onSelectHandler}
				onKeyDown={keyHandler}
				onPaste={pasteHandler}
				onBlur={clearHandler}
				onFocus={focusHandler}
			>
				<Thead>
					<Tr>
						<Th disabled></Th>
						{headers.map(h => (
							<Th disabled key={h.id}>
								{h.title}
							</Th>
						))}
					</Tr>
					<Tr>
						<Th disabled>№</Th>
						{headers.map(h => (
							<Th disabled key={h.id}>
								{h.number}
							</Th>
						))}
					</Tr>
				</Thead>

				<Tbody>
					{rowVirtualizer.getVirtualItems().map(virtualItem => (
						<Tr key={virtualItem.key}>
							<Td disabled>{virtualItem.index + 1}</Td>
							{headers.map(h => (
								<Td key={h.id} data-index={virtualItem.index} data-name={h.name} tabIndex={0}>
									{editCeil?.index == virtualItem.index && editCeil.name == h.name ? (
										<Input
											value={value}
											onChange={setValueHandler}
											onBlur={saveValueHandler()}
											autoFocus
										/>
									) : (
										data[virtualItem.index][h.name]
									)}
									{/* {data[virtualItem.index][h.name]} */}
								</Td>
							))}
						</Tr>
					))}

					<Tr>
						<Td disabled>{data.length + 1}</Td>
						{headers.map(h => (
							<Td key={h.id} data-index={data.length} data-name={h.name} tabIndex={0} />
						))}
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	)
}
