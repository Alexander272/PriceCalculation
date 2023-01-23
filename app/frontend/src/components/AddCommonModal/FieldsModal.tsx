import {
	Button,
	Checkbox,
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
	Select,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { models } from '@/../wailsjs/go/models'
import { useForm } from 'react-hook-form'

type Props = {
	isUpdate?: boolean
	isOpen: boolean
	onClose: () => void
	onSave: (field: models.Field) => void
	field?: models.Field
}

export const FieldsModal: FC<Props> = ({ isUpdate, isOpen, onClose, onSave, field }) => {
	const { register, handleSubmit } = useForm<models.Field>({ defaultValues: field })

	return (
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
					<FormControl>
						<FormLabel>Номер</FormLabel>
						<Input {...register('number')} />
					</FormControl>
					<FormControl>
						<FormLabel>Тип поля</FormLabel>
						<Select {...register('typeApp')} placeholder='Тип поля'>
							<option value='float64'>Число</option>
							<option value='string'>Строка</option>
							<option value='bool'>Булево</option>
						</Select>
					</FormControl>
					<FormControl>
						<Checkbox {...register('isForSearch')}>Для поиска</Checkbox>
					</FormControl>
					<FormControl>
						<Checkbox {...register('isNotNull')}>Использовать значение по умолчанию</Checkbox>
					</FormControl>
					<FormControl>
						<FormLabel>Значение по умолчанию</FormLabel>
						<Input {...register('default')} />
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' onClick={handleSubmit(onSave)} mr={3}>
						{isUpdate ? 'Обновить' : 'Добавить'}
					</Button>
					<Button onClick={onClose}>Отмена</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
