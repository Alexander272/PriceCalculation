import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { FormulaPartType, IFormulaParts } from '../../types/formula'
import { Container, Formula, Input, Symbol } from './field.style'

type Props = {}

export const FormulaField: FC<Props> = () => {
	const [formula, setFormula] = useState('')
	const [input, setInput] = useState('')
	const inputRef = useRef<HTMLInputElement | null>(null)

	const [activeIndex, setActiveIndex] = useState(-1)
	const [parts, setParts] = useState<IFormulaParts[]>([])

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const changeFormulaHandler = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value)
	}

	const focusHandler = () => {
		inputRef.current?.focus()
		if (parts.length > 0) setActiveIndex(parts.length - 1)
		else setActiveIndex(-1)
	}
	const clearFocusHandler = () => {
		setActiveIndex(-5)
	}

	const selectActiveHandler = (idx: number) => () => {
		console.log(idx)

		setActiveIndex(idx)
	}

	const changePartsHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		console.log(event.key)

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

		if (new RegExp(/^\d{1,}$/).test(event.key)) {
			insertPart(part)
		}
		if (new RegExp(/^[+-/*^%]$/).test(event.key)) {
			part.type = 'math'
			insertPart(part)
		}
		if (new RegExp(/^[a-zA-Z]$/).test(event.key)) {
			part.type = 'field'
			part.value = event.key.toUpperCase()
			insertPart(part)
		}
	}

	const insertPart = (part: IFormulaParts) => {
		let newParts = [...parts]
		newParts.splice(activeIndex > -1 ? activeIndex + 1 : 0, 0, part)

		setActiveIndex(prev => prev + 1)
		setParts(newParts)
	}

	return (
		<Container onClick={focusHandler}>
			{/* <Formula ref={inputRef} contentEditable> */}
			{/* {formula} */}
			<Input
				ref={inputRef}
				value=''
				onKeyDown={changePartsHandler}
				onBlur={clearFocusHandler}
				onChange={() => {}}
			/>
			{/* </Formula> */}
			<div>
				<Symbol type='math' active={activeIndex === -1}>
					=
				</Symbol>
				{parts.map((p, i) => (
					<Symbol key={p.id} type={p.type} active={activeIndex === i} onClick={selectActiveHandler(i)}>
						{p.value}
					</Symbol>
				))}
			</div>
		</Container>
	)
}
