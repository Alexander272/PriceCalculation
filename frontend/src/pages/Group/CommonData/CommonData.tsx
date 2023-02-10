import { FC, useEffect } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { AddCommonModal } from '@/components/AddCommonModal/AddCommonModal'
import { fetchData } from '@/store/groups'
import { ListItem, List } from '../group.style'
import { models } from '@/../wailsjs/go/models'
import { setActiveTable } from '@/store/table'
import { useNavigate } from 'react-router-dom'

type Props = {}

export const CommonData: FC<Props> = () => {
	const tables = useAppSelector(state => state.group.tables)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		fetchData()
	}, [])

	const selectHandler = (table: models.Table) => () => {
		dispatch(setActiveTable(table))
		navigate('/table')
	}

	return (
		<>
			<AddCommonModal isOpen={isOpen} onClose={onClose} />
			<Button leftIcon={<>+</>} variant='outline' colorScheme='twitter' onClick={onOpen}>
				Создать таблицу
			</Button>
			<List>
				{tables?.length ? (
					tables.map(t => (
						<ListItem key={t.id} onClick={selectHandler(t)}>
							{t.title}
						</ListItem>
					))
				) : (
					<p>Таблицы не созданы</p>
				)}
			</List>
		</>
	)
}
