import { FC, KeyboardEvent, MouseEvent, useEffect, useRef } from 'react'
import { useFormula } from '../../hooks/useFormula'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { changeId, deletePart, insertMath, insertNumeric, insertParam, nextId, prevId } from '../../store/formula'
import { Calculate } from '../../../wailsjs/go/main/App'
import { FormulaPartNumeric, IPartFormula } from '../../types/formula'
import { FormulaContainer, Input, Math, Start } from './field.style'
import { Formula } from './Formula'

type Props = {}

export const NewField: FC<Props> = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const activeId = useAppSelector(state => state.formula.activeId)
	const parts = useAppSelector(state => state.formula.formula.parts)

	const dispatch = useAppDispatch()

	const { getFormula } = useFormula()

	useEffect(() => {
		inputRef.current?.focus()
		let newId = {
			id: parts.length > 0 ? parts[parts.length - 1].id : 'start',
			idx:
				parts.length > 0 && parts[parts.length - 1].type === 'Numeric'
					? (parts[parts.length - 1] as FormulaPartNumeric).value?.length - 1
					: 0,
			bread: '',
		}
		dispatch(changeId(newId))
	}, [])

	const clearFocusHandler = () => dispatch(changeId({ id: '', idx: 0, bread: '' }))

	const selectActiveHandler = (event: MouseEvent<HTMLDivElement>) => {
		inputRef.current?.focus()

		let newId = parts.length > 0 ? parts[parts.length - 1].id : 'start'
		let newIdx =
			parts.length > 0 && parts[parts.length - 1].type === 'Numeric'
				? (parts[parts.length - 1] as FormulaPartNumeric).value?.length - 1
				: 0

		dispatch(
			changeId({
				id: (event.target as HTMLDivElement).dataset.id || newId,
				idx: +((event.target as HTMLDivElement).dataset.index || newIdx),
				bread: (event.target as HTMLDivElement).dataset.bread || '',
			})
		)
	}
	const saveFocusHandler = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		return false
	}

	const changePartsHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			// let formula = ''
			let params: any[] = []
			// parts.forEach(p => {
			// 	formula += p.origValue
			// 	if (p.type === 'param') {
			// 		params.push({
			// 			Id: p.id.toString(),
			// 			Name: p.origValue,
			// 		})
			// 	}
			// })

			// const result = await Calculate({ Formula: formula, Params: params })
			// console.log(result)
			const formula = getFormula(parts)
			console.log(formula)
			const result = await Calculate({ Formula: formula, Params: params })
			console.log(result)
			return
		}

		if (event.key === 'ArrowLeft') {
			dispatch(prevId())
			return
		}
		if (event.key === 'ArrowRight') {
			dispatch(nextId())
			return
		}

		if (event.key === 'Backspace' || event.key === 'Delete') {
			dispatch(deletePart(event.key === 'Delete'))
			return
		}

		if (new RegExp(/^[0-9.]$/).test(event.key)) {
			const part: IPartFormula = { id: Date.now().toString(), type: 'Numeric', value: event.key }
			dispatch(insertNumeric(part))
			return
		}
		if (new RegExp(/^[+-/%*^(),><=]$/).test(event.key)) {
			const part: IPartFormula = {
				id: Date.now().toString(),
				type: 'Math',
				value: event.key,
				origValue: event.key,
			}
			if (event.key === '/') part.value = '÷'
			if (event.key === '*') part.value = '\u00d7'

			dispatch(insertMath(part))
			return
		}
		if (new RegExp(/^[a-zA-Z]$/).test(event.key)) {
			// TODO дописать получение описания
			const part: IPartFormula = {
				id: Date.now().toString(),
				type: 'Param',
				value: event.key.toUpperCase(),
				origValue: event.key,
				description: 'Описание',
			}
			dispatch(insertParam(part))
			return
		}
	}

	return (
		<>
			<Input
				ref={inputRef}
				value=''
				onKeyDown={changePartsHandler}
				// onFocus={focusHandler}
				onBlur={clearFocusHandler}
				onChange={() => {}}
			/>

			<FormulaContainer onClick={selectActiveHandler} onMouseDown={saveFocusHandler}>
				<Math data-id='start'>=</Math>
				<Start data-id='start' active={activeId === 'start'} />
				<Formula parts={parts} level={1} breadcrumbs='' />
			</FormulaContainer>
		</>
	)
}
