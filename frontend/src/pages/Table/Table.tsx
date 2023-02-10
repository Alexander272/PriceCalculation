import { useDisclosure } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { AddCommonModal } from '@/components/AddCommonModal/AddCommonModal'
import { VirtualTable } from '@/components/Table/Table'
import SettingSVG from '@/assets/images/setting.svg'
import { Container, Header, Setting, Title } from './table.style'
import { EditDataTable } from '@/components/Table/EditDataTable'
import { useEffect } from 'react'
import { fetchTableData } from '@/store/table'

export default function DataTable() {
	const table = useAppSelector(state => state.table.activeTable)
	const data = useAppSelector(state => state.table.data)
	const rows = useAppSelector(state => state.table.rows)

	const { isOpen, onOpen, onClose } = useDisclosure()

	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log('fetch')
		if (table) dispatch(fetchTableData(table))
	}, [])

	if (!table) return null
	return (
		<Container>
			<AddCommonModal isOpen={isOpen} onClose={onClose} isUpdate table={table} />
			<Header>
				<Title>{table.title}</Title>
				<Setting onClick={onOpen}>
					<img src={SettingSVG} alt='setting' />
				</Setting>
			</Header>

			{/* <Box maxHeight={'400px'} overflow='auto'> */}
			<EditDataTable headers={table.fields} data={data} rows={rows} />
			{/* <VirtualTable headers={table.fields} data={testData} /> */}
			{/* </Box> */}

			{/* //TODO может стоит попробовать написать свою реализацию (и добавить в нее виртуализацию) */}
		</Container>
	)
}
