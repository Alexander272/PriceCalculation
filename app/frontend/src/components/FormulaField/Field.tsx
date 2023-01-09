import { FC, Fragment, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { IFormulaParts } from '../../types/formula'
import { Formula, Input, Symbol } from './field.style'

type Props = {
	initParts: IFormulaParts[]
}

export const Field: FC<Props> = ({ initParts = [] }) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(-1)
	const [parts, setParts] = useState<IFormulaParts[]>(initParts)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const clearFocusHandler = () => {
		setActiveIndex(-5)
	}

	const selectActiveHandler = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		inputRef.current?.focus()

		setActiveIndex(+((event.target as HTMLDivElement).dataset?.index || parts.length - 1))
	}

	const changePartsHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowLeft') {
			setActiveIndex(prev => (prev > -1 ? prev - 1 : -1))
			return
		}
		if (event.key === 'ArrowRight') {
			setActiveIndex(prev => (prev < parts.length - 1 ? prev + 1 : prev))
			return
		}

		if (event.key === 'Backspace') {
			setParts(prev => prev.filter((_, i) => i !== activeIndex))
			setActiveIndex(prev => (prev > -1 ? prev - 1 : -1))
			return
		}
		if (event.key === 'Delete') {
			setParts(prev => prev.filter((_, i) => i !== activeIndex + 1))
			setActiveIndex(prev => (prev >= parts.length - 1 ? prev + 1 : prev))
			return
		}

		const part: IFormulaParts = {
			id: Date.now(),
			type: 'numeric',
			value: event.key,
		}

		if (new RegExp(/[0-9%]/).test(event.key)) {
			insertPart(part)
		}
		if (new RegExp(/^[+-/*^]$/).test(event.key)) {
			part.type = 'math'
			if (event.key === '/') part.value = '÷'
			if (event.key === '*') part.value = '\u00d7'

			insertPart(part)
		}
		if (new RegExp(/^[a-zA-Z]$/).test(event.key)) {
			part.type = 'field'
			part.value = event.key.toUpperCase()
			part.description = 'Описание'
			if (activeIndex >= 0 && parts[activeIndex].type === 'field') {
				let newParts = [...parts]
				newParts[activeIndex].value += part.value
				setParts(newParts)
			} else insertPart(part)
		}
	}

	const insertPart = (part: IFormulaParts) => {
		let newParts = [...parts]
		newParts.splice(activeIndex > -1 ? activeIndex + 1 : 0, 0, part)

		setActiveIndex(prev => prev + 1)
		setParts(newParts)
	}

	return (
		<>
			<Input
				ref={inputRef}
				value=''
				onKeyDown={changePartsHandler}
				onBlur={clearFocusHandler}
				onChange={() => {}}
			/>

			<Formula onClick={selectActiveHandler}>
				<Symbol type='math' data-index='-1' active={activeIndex === -1}>
					=
				</Symbol>
				{parts.map((p, i) => (
					<Symbol
						key={p.id}
						data-index={i}
						type={p.type}
						active={activeIndex === i}
						// aria-label={p.description}
						// data-balloon-pos='up'
					>
						{p.description ? (
							<b aria-label={p.description} data-balloon-pos='up' data-index={i}>
								{p.value}
							</b>
						) : (
							p.value
						)}
						{/* {p.value} */}
					</Symbol>
				))}
			</Formula>
		</>
	)
}
