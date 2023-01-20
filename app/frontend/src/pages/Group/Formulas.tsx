import { Spinner, useDisclosure } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { Error } from '@/components/Error/Error'
import { useAppSelector } from '@/hooks/useStore'
import { IGroup } from '@/types/group'
import { FormulasList } from './FormulasList'
import { GroupItem } from './group.style'

type Props = {}

export const Formulas: FC<Props> = () => {
	const groups = useAppSelector(state => state.group.groups)
	const loading = useAppSelector(state => state.group.loading)
	const error = useAppSelector(state => state.group.error)

	const [group, setGroup] = useState<IGroup | null>(null)

	const { isOpen, onOpen, onClose } = useDisclosure()

	const openHandler = (group: IGroup) => () => {
		setGroup(group)
		onOpen()
	}

	if (error) return <Error message='Не удалось загрузить данные' description={error} />
	return (
		<>
			<FormulasList isOpen={isOpen} onClose={onClose} group={group} />

			{loading && !groups ? (
				<Spinner color='blue.500' />
			) : (
				groups.map(g => (
					<GroupItem key={g.id} onClick={openHandler(g)}>
						{g.title}
					</GroupItem>
				))
			)}
		</>
	)
}
