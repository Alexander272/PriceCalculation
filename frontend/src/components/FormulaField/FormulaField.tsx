import { FC } from 'react'
import { Field } from './Field'
import { Container } from './field.style'
import { FormulaTitle } from './FormulaTitle'
import { NewField } from './NewField'

type Props = {}

export const FormulaField: FC<Props> = () => {
	return (
		<Container>
			<FormulaTitle />
			{/* <Field /> */}
			<NewField />
		</Container>
	)
}
