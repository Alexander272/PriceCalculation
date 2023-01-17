import { ChangeEvent, FC, useState } from 'react'
import { Field } from './Field'
import { Container, Title } from './field.style'
import { NewField } from './NewField'

type Props = {}

export const FormulaField: FC<Props> = () => {
	const [title, setTitle] = useState('')

	const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	return (
		<Container>
			<Title value={title} placeholder='Название формулы' onChange={changeTitleHandler} />
			<Field />
			<NewField />
		</Container>
	)
}
