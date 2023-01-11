import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { Error } from '../../components/Error/Error'
import { IFormulaTitle } from '../../types/formula'
import { IGroup } from '../../types/group'
import { LinkItem } from './group.style'

type Props = {
	isOpen: boolean
	group: IGroup | null
	onClose: () => void
}

export const FormulasList: FC<Props> = ({ isOpen, onClose, group }) => {
	const [list, setList] = useState<IFormulaTitle[]>([{ id: '1', title: 'test' }])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// TODO написать запрос на получение списка формул
		// if (group)
	}, [group])

	if (error) return <Error message='Не удалось загрузить данные' description={error} />
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{group?.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{list.map(l => (
						<LinkItem key={l.id} href={`/formulas/${l.id}`}>
							{l.title}
						</LinkItem>
					))}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
