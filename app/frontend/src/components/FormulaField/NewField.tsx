import { FC, KeyboardEvent, MouseEvent, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { changeId, insertParts, nextId, prevId } from '../../store/formula'
import { IPartFormula } from '../../types/formula'
import { FormulaContainer, Input, NewMath } from './field.style'
import { Formula } from './Formula'

type Props = {}

export const NewField: FC<Props> = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const activeId = useAppSelector(state => state.formula.activeId)
	const parts = useAppSelector(state => state.formula.testFormula.parts)

	const dispatch = useAppDispatch()

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const clearFocusHandler = () => dispatch(changeId({ id: '', idx: 0, bread: '' }))

	const selectActiveHandler = (event: MouseEvent<HTMLDivElement>) => {
		inputRef.current?.focus()
		console.log((event.target as HTMLDivElement).dataset)

		dispatch(
			changeId({
				id: (event.target as HTMLDivElement).dataset.id || 'start',
				idx: +((event.target as HTMLDivElement).dataset.index || 0),
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
		console.log(event.key)

		if (event.key === 'Enter') {
			// let formula = ''
			// let params: any[] = []
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

		const part: IPartFormula = {
			id: Date.now().toString(),
			type: 'Numeric',
			value: event.key,
		}

		if (new RegExp(/[.]/).test(event.key)) {
			dispatch(insertParts([part]))
			return
		}
		// if (new RegExp(/[0-9]/).test(event.key)) {
		// 	if (activeIndex >= 0 && parts[activeIndex].type === 'param') {
		// 		dispatch(uniteParts(part))
		// 	} else dispatch(insertPart(part))
		// 	return
		// }
		// if (new RegExp(/^[+-/%*^(),]$/).test(event.key)) {
		// 	part.type = 'Math'
		// 	if (event.key === '/') part.value = '÷'
		// 	if (event.key === '*') part.value = '\u00d7'

		// 	dispatch(insertPart(part))
		// 	return
		// }
		// if (new RegExp(/^[a-zA-Z]$/).test(event.key)) {
		// 	part.type = 'param'
		// 	part.value = event.key.toUpperCase()
		// 	// TODO дописать получение описания
		// 	part.description = 'Описание'
		// 	if (activeIndex >= 0 && parts[activeIndex].type === 'param') {
		// 		// let newParts = [...parts]
		// 		// newParts[activeIndex].value += part.value
		// 		// newParts[activeIndex].origValue += part.origValue
		// 		// setParts(newParts)
		// 		dispatch(uniteParts(part))
		// 	} else dispatch(insertPart(part))
		// 	return
		// }
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
				<NewMath data-id='start' active={activeId === 'start'}>
					=
				</NewMath>
				<Formula parts={parts} level={1} breadcrumbs='' />
			</FormulaContainer>
		</>
	)
}
