import { useEffect } from 'react'
import { Spinner, useToast } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchData } from '@/store/groups'
import { Formulas } from './Formulas'
import { CommonData } from './CommonData/CommonData'
import { Column, ColumnTitle, Container } from './group.style'

export default function Group() {
	const loading = useAppSelector(state => state.group.loading)
	const error = useAppSelector(state => state.group.error)
	const dispatch = useAppDispatch()
	const toast = useToast()

	useEffect(() => {
		dispatch(fetchData())
	}, [])

	useEffect(() => {
		if (error) {
			toast({
				title: 'Ошибка.',
				description: error,
				status: 'error',
				duration: 9000,
				isClosable: false,
			})
		}
	}, [error])

	return (
		<Container>
			{loading && <Spinner color='blue.500' />}
			{!loading && (
				<>
					<Column>
						<ColumnTitle>Общие данные</ColumnTitle>
						<CommonData />
					</Column>
					<Column>
						<ColumnTitle>Формулы</ColumnTitle>
						<Formulas />
					</Column>
					<Column>
						{/* //TODO данные специфичные для каждой группы (разбитые по этим группам) */}
						<ColumnTitle></ColumnTitle>
					</Column>
				</>
			)}
		</Container>
	)
}
