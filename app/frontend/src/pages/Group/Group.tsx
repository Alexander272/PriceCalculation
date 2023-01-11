import { CommonData } from './CommonData'
import { Formulas } from './Formulas'
import { Column, ColumnTitle, Container } from './group.style'

export default function Group() {
	return (
		<Container>
			<Column>
				<ColumnTitle>Общие данные</ColumnTitle>
				<CommonData />
			</Column>
			<Column>
				<ColumnTitle>Формулы</ColumnTitle>
				<Formulas />
			</Column>
			<Column>
				<ColumnTitle></ColumnTitle>
			</Column>
		</Container>
	)
}
