import { Box, useDisclosure } from '@chakra-ui/react'
import { useAppSelector } from '@/hooks/useStore'
import { AddCommonModal } from '@/components/AddCommonModal/AddCommonModal'
import { VirtualTable } from '@/components/Table/Table'
import SettingSVG from '@/assets/images/setting.svg'
import { Container, Header, Setting, Title } from './table.style'
import { MyTable } from '@/components/Table/MyTable'

export default function DataTable() {
	const table = useAppSelector(state => state.table.activeTable)
	const data = useAppSelector(state => state.table.data)

	const { isOpen, onOpen, onClose } = useDisclosure()

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
			<MyTable headers={table.fields} data={data} />
			{/* <VirtualTable headers={table.fields} data={testData} /> */}
			{/* </Box> */}

			{/* //TODO может стоит попробовать написать свою реализацию (и добавить в нее виртуализацию) */}
		</Container>
	)
}
