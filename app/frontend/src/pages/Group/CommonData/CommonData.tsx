import { FC, useEffect } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useAppSelector } from '@/hooks/useStore'
import { AddCommonModal } from '@/components/AddCommonModal/AddCommonModal'
import { fetchData } from '@/store/groups'
import { ListItem, List } from '../group.style'

type Props = {}

export const CommonData: FC<Props> = () => {
	const tables = useAppSelector(state => state.group.tables)

	useEffect(() => {
		fetchData()
	})

	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<AddCommonModal isOpen={isOpen} onClose={onClose} />
			<Button leftIcon={<>+</>} variant='outline' colorScheme='twitter' onClick={onOpen}>
				Создать таблицу
			</Button>
			<List>
				{tables?.length ? (
					tables.map(t => <ListItem key={t.id}>{t.title}</ListItem>)
				) : (
					<p>Таблицы не созданы</p>
				)}
			</List>
		</>
	)
}
