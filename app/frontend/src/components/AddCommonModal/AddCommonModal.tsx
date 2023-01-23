import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { models } from '@/../wailsjs/go/models'
import { CreateTable } from '@/../wailsjs/go/root/App'
import { Field, FieldsContainer, Icon, Number, Title } from './common.style'
import { FieldsModal } from './FieldsModal'

type Props = {
	isUpdate?: boolean
	isOpen: boolean
	onClose: () => void
	table?: models.Table
}

export const AddCommonModal: FC<Props> = ({ isUpdate, isOpen, onClose, table }) => {
	const { isOpen: isOpenField, onOpen: onOpenField, onClose: onCloseField } = useDisclosure()
	const { register, handleSubmit } = useForm<models.Table>({ defaultValues: table })

	const [fields, setFields] = useState(table?.fields || [])
	const [field, setField] = useState<models.Field | undefined>(undefined)

	useEffect(() => {}, [table])

	const addFieldHandler = (field: models.Field) => {
		field.id = Date.now().toString()
		field.typeDb = 'text'
		setFields(prev => [...prev, field])

		onCloseField()
	}

	const saveTableHandler = async (table: models.Table) => {
		console.log(table)
		table.fields = fields
		const err = await CreateTable(table)
		console.log(err)

		onClose()
	}

	return (
		<>
			<FieldsModal isOpen={isOpenField} onClose={onCloseField} onSave={addFieldHandler} field={field} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isUpdate ? 'Обновить' : 'Добавить'} таблицу</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<FormControl>
							<FormLabel>Название</FormLabel>
							<Input {...register('title')} />
						</FormControl>
						{/* <FormControl>
							<FormLabel>Название базы (на английском)</FormLabel>
							<Input {...register('titleDb')} />
						</FormControl> */}
						<FormControl>
							<FormLabel>Сокращение</FormLabel>
							<Input {...register('alias')} textTransform='uppercase' />
						</FormControl>

						<FieldsContainer>
							<h5>Список полей:</h5>
							{fields.length === 0 && <p>Полей нет</p>}
							{fields.map(f => (
								<Field key={f.id}>
									<Title>
										<Number>{f.number}.</Number>
										{f.title}
									</Title>
									<Icon>⋮</Icon>
								</Field>
							))}

							<Button variant='outline' colorScheme='messenger' width={'100%'} onClick={onOpenField}>
								Добавить поле
							</Button>
						</FieldsContainer>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleSubmit(saveTableHandler)}>
							Сохранить
						</Button>
						<Button onClick={onClose}>Отмена</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
