import { FC } from 'react'
import { Error } from '../../components/Error/Error'
import { Loader } from '../../components/Loader/Loader'
import { useAppSelector } from '../../hooks/useStore'
import { GroupItem } from './group.style'

type Props = {}

export const Formulas: FC<Props> = () => {
	const groups = useAppSelector(state => state.group.groups)
	const loading = useAppSelector(state => state.group.loading)
	const error = useAppSelector(state => state.group.error)

	if (error) return <Error message='Не удалось загрузить данные' description={error} />

	return <>{loading && !groups ? <Loader /> : groups.map(g => <GroupItem>{g.title}</GroupItem>)}</>
}
