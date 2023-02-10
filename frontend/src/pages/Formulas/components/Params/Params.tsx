import { FC } from 'react'
import { Container, Row, Title } from './params.style'

type Props = {}

export const Params: FC<Props> = () => {
	return (
		<Container>
			<Title>Общие переменные</Title>
			<Row></Row>
			<Title>Вводимые переменные</Title>
			<Row></Row>
			<Title>Дополнительные переменные</Title>
			<Row></Row>
			{/* <Title> переменные</Title>
			<Row></Row> */}
		</Container>
	)
}
