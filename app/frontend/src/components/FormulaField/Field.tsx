import { FC, Fragment, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { IFormulaParts } from '../../types/formula'
import { Formula, Input, Symbol } from './field.style'
import { changeIndex, deletePart, insertPart, uniteParts } from '../../store/formula'
import { Calculate } from '../../../wailsjs/go/main/App'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { Tooltip } from '@chakra-ui/react'

type Props = {
	// initParts: IFormulaParts[]
}

export const Field: FC<Props> = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	// const [activeIndex, setActiveIndex] = useState(-1)
	// const [parts, setParts] = useState<IFormulaParts[]>(initParts)

	const activeIndex = useAppSelector(state => state.formula.activeIndex)
	const parts = useAppSelector(state => state.formula.formula.parts)

	const dispatch = useAppDispatch()

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	// const clearFocusHandler = () => setActiveIndex(-5)
	// const focusHandler = () => setActiveIndex(-1)
	const clearFocusHandler = () => dispatch(changeIndex(-5))
	// const focusHandler = () => dispatch(changeIndex(-1))
	// const focusHandler = () => dispatch(changeIndex(activeIndex))

	const selectActiveHandler = (event: MouseEvent<HTMLDivElement>) => {
		// event.stopPropagation()
		inputRef.current?.focus()

		// setActiveIndex(+((event.target as HTMLDivElement).dataset?.index || parts.length - 1))
		dispatch(changeIndex(+((event.target as HTMLDivElement).dataset?.index || parts.length - 1)))
	}
	const saveFocusHandler = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		return false
	}

	const changePartsHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			let formula = ''
			let params: any[] = []
			parts.forEach(p => {
				formula += p.origValue
				if (p.type === 'field') {
					params.push({
						Id: p.id.toString(),
						Name: p.origValue,
					})
				}
			})

			const result = await Calculate({ Formula: formula, Params: params })
			console.log(result)
			return
		}

		if (event.key === 'ArrowLeft') {
			// setActiveIndex(prev => (prev > -1 ? prev - 1 : -1))
			dispatch(changeIndex(activeIndex > -1 ? activeIndex - 1 : -1))
			return
		}
		if (event.key === 'ArrowRight') {
			// setActiveIndex(prev => (prev < parts.length - 1 ? prev + 1 : prev))
			dispatch(changeIndex(activeIndex < parts.length - 1 ? activeIndex + 1 : activeIndex))
			return
		}

		if (event.key === 'Backspace') {
			// setParts(prev => prev.filter((_, i) => i !== activeIndex))
			// setActiveIndex(prev => (prev > -1 ? prev - 1 : -1))
			dispatch(deletePart(activeIndex))
			dispatch(changeIndex(activeIndex > -1 ? activeIndex - 1 : -1))
			return
		}
		if (event.key === 'Delete') {
			// setParts(prev => prev.filter((_, i) => i !== activeIndex + 1))
			// setActiveIndex(prev => (prev >= parts.length - 1 ? prev + 1 : prev))
			dispatch(deletePart(activeIndex + 1))
			return
		}

		const part: IFormulaParts = {
			id: Date.now(),
			type: 'numeric',
			value: event.key,
			origValue: event.key,
		}

		if (new RegExp(/[.]/).test(event.key)) {
			dispatch(insertPart(part))
			return
		}
		if (new RegExp(/[0-9]/).test(event.key)) {
			if (activeIndex >= 0 && parts[activeIndex].type === 'field') {
				dispatch(uniteParts(part))
			} else dispatch(insertPart(part))
			return
		}
		if (new RegExp(/^[+-/%*^(),]$/).test(event.key)) {
			part.type = 'math'
			if (event.key === '/') part.value = '÷'
			if (event.key === '*') part.value = '\u00d7'

			dispatch(insertPart(part))
			return
		}
		if (new RegExp(/^[a-zA-Z]$/).test(event.key)) {
			part.type = 'field'
			part.value = event.key.toUpperCase()
			// TODO дописать получение описания
			part.description = 'Описание'
			if (activeIndex >= 0 && parts[activeIndex].type === 'field') {
				// let newParts = [...parts]
				// newParts[activeIndex].value += part.value
				// newParts[activeIndex].origValue += part.origValue
				// setParts(newParts)
				dispatch(uniteParts(part))
			} else dispatch(insertPart(part))
			return
		}
	}

	// const insertPart = (part: IFormulaParts) => {
	// 	let newParts = [...parts]
	// 	newParts.splice(activeIndex > -1 ? activeIndex + 1 : 0, 0, part)

	// 	setActiveIndex(prev => prev + 1)
	// 	setParts(newParts)
	// }

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

			<Formula onClick={selectActiveHandler} onMouseDown={saveFocusHandler}>
				<Symbol type='math' data-index='-1' active={activeIndex === -1}>
					=
				</Symbol>
				{parts.map((p, i) => (
					<Tooltip key={p.id} hasArrow label={p.description} isDisabled={!p.description}>
						<Symbol data-index={i} type={p.type} active={activeIndex === i}>
							{p.value}
						</Symbol>
					</Tooltip>
				))}
			</Formula>
		</>
	)
}
