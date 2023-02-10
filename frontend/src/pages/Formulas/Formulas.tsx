import { Button } from '@chakra-ui/react'
import React from 'react'
import { FormulaField } from '../../components/FormulaField/FormulaField'
import { ButtonGroup } from './components/ButtonGroup/ButtonGroup'
import { Params } from './components/Params/Params'
import { Aside, Container } from './formulas.style'

export default function Formulas() {
	// TODO написать запрос на получение формулы по id (из params)

	return (
		<Container>
			<Aside>
				{/* <Button
					variant='outline'
					rightIcon={<>+</>}
					mb='2'
					width={'100%'}
					colorScheme='blue'
					borderRadius='12px'
				>
					Добавить формулу
				</Button> */}
				<FormulaField />
				<ButtonGroup />
			</Aside>
			<Params />
		</Container>
	)
}
