import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { setTitle } from '@/store/formula'
import { Title } from './field.style'

type Props = {}

export const FormulaTitle: FC<Props> = () => {
	const title = useAppSelector(state => state.formula.formula.title)
	const dispatch = useAppDispatch()

	const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setTitle(event.target.value))
	}

	return <Title value={title} placeholder='Название формулы' onChange={changeTitleHandler} />
}
