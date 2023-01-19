import React, { FC, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { IFormulaParts } from '../../types/formula'
import {
	Condition,
	ConditionBlock,
	ConditionLine,
	Formula,
	Func,
	Input,
	Math,
	Numeric,
	Param,
	Symbol,
} from './field.style'
// import { changeIndex, deletePart, insertPart, uniteParts } from '../../store/formula'
import { Calculate } from '../../../wailsjs/go/main/App'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { Tooltip } from '@chakra-ui/react'

type Props = {
	// initParts: IFormulaParts[]
}

const colors = {
	1: '--chakra-colors-green-500',
	2: '--chakra-colors-yellow-400',
}

export const Field: FC<Props> = () => {
	// const inputRef = useRef<HTMLInputElement | null>(null)
	// // const [activeIndex, setActiveIndex] = useState(-1)
	// // const [parts, setParts] = useState<IFormulaParts[]>(initParts)
	// const activeIndex = useAppSelector(state => state.formula.activeIndex)
	// const parts = useAppSelector(state => state.formula.formula.parts)
	// const dispatch = useAppDispatch()
	// useEffect(() => {
	// 	inputRef.current?.focus()
	// }, [])
	// // const clearFocusHandler = () => setActiveIndex(-5)
	// // const focusHandler = () => setActiveIndex(-1)
	// const clearFocusHandler = () => dispatch(changeIndex(-5))
	// // const focusHandler = () => dispatch(changeIndex(-1))
	// // const focusHandler = () => dispatch(changeIndex(activeIndex))
	// const selectActiveHandler = (event: MouseEvent<HTMLDivElement>) => {
	// 	// event.stopPropagation()
	// 	inputRef.current?.focus()
	// 	// setActiveIndex(+((event.target as HTMLDivElement).dataset?.index || parts.length - 1))
	// 	dispatch(changeIndex(+((event.target as HTMLDivElement).dataset?.index || parts.length - 1)))
	// }
	// const saveFocusHandler = (event: MouseEvent<HTMLDivElement>) => {
	// 	event.preventDefault()
	// 	event.stopPropagation()
	// 	return false
	// }
	// const changePartsHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
	// 	if (event.key === 'Enter') {
	// 		let formula = ''
	// 		let params: any[] = []
	// 		parts.forEach(p => {
	// 			formula += p.origValue
	// 			if (p.type === 'param') {
	// 				params.push({
	// 					Id: p.id.toString(),
	// 					Name: p.origValue,
	// 				})
	// 			}
	// 		})
	// 		const result = await Calculate({ Formula: formula, Params: params })
	// 		console.log(result)
	// 		return
	// 	}
	// 	if (event.key === 'ArrowLeft') {
	// 		// setActiveIndex(prev => (prev > -1 ? prev - 1 : -1))
	// 		dispatch(changeIndex(activeIndex > -1 ? activeIndex - 1 : -1))
	// 		return
	// 	}
	// 	if (event.key === 'ArrowRight') {
	// 		// setActiveIndex(prev => (prev < parts.length - 1 ? prev + 1 : prev))
	// 		dispatch(changeIndex(activeIndex < parts.length - 1 ? activeIndex + 1 : activeIndex))
	// 		return
	// 	}
	// 	if (event.key === 'Backspace') {
	// 		// setParts(prev => prev.filter((_, i) => i !== activeIndex))
	// 		// setActiveIndex(prev => (prev > -1 ? prev - 1 : -1))
	// 		dispatch(deletePart(activeIndex))
	// 		dispatch(changeIndex(activeIndex > -1 ? activeIndex - 1 : -1))
	// 		return
	// 	}
	// 	if (event.key === 'Delete') {
	// 		// setParts(prev => prev.filter((_, i) => i !== activeIndex + 1))
	// 		// setActiveIndex(prev => (prev >= parts.length - 1 ? prev + 1 : prev))
	// 		dispatch(deletePart(activeIndex + 1))
	// 		return
	// 	}
	// 	const part: IFormulaParts = {
	// 		id: Date.now(),
	// 		type: 'numeric',
	// 		value: event.key,
	// 		origValue: event.key,
	// 	}
	// 	if (new RegExp(/[.]/).test(event.key)) {
	// 		dispatch(insertPart(part))
	// 		return
	// 	}
	// 	if (new RegExp(/[0-9]/).test(event.key)) {
	// 		if (activeIndex >= 0 && parts[activeIndex].type === 'param') {
	// 			dispatch(uniteParts(part))
	// 		} else dispatch(insertPart(part))
	// 		return
	// 	}
	// 	if (new RegExp(/^[+-/%*^(),]$/).test(event.key)) {
	// 		part.type = 'math'
	// 		if (event.key === '/') part.value = '÷'
	// 		if (event.key === '*') part.value = '\u00d7'
	// 		dispatch(insertPart(part))
	// 		return
	// 	}
	// 	if (new RegExp(/^[a-zA-Z]$/).test(event.key)) {
	// 		part.type = 'param'
	// 		part.value = event.key.toUpperCase()
	// 		// TODO дописать получение описания
	// 		part.description = 'Описание'
	// 		if (activeIndex >= 0 && parts[activeIndex].type === 'param') {
	// 			// let newParts = [...parts]
	// 			// newParts[activeIndex].value += part.value
	// 			// newParts[activeIndex].origValue += part.origValue
	// 			// setParts(newParts)
	// 			dispatch(uniteParts(part))
	// 		} else dispatch(insertPart(part))
	// 		return
	// 	}
	// }
	// // const insertPart = (part: IFormulaParts) => {
	// // 	let newParts = [...parts]
	// // 	newParts.splice(activeIndex > -1 ? activeIndex + 1 : 0, 0, part)
	// // 	setActiveIndex(prev => prev + 1)
	// // 	setParts(newParts)
	// // }
	// const renderFormula = () => {
	// 	let level = 1
	// 	const result: JSX.Element[] = []
	// 	// let condition: JSX.Element[] = []
	// 	// for (let i = 0; i < parts.length; i++) {
	// 	// 	const p = parts[i]
	// 	// 	if (p.type === 'condition') {
	// 	// 		const res = renderCondition(i)
	// 	// 		i = res.idx
	// 	// 		result.push(<ConditionBlock key={p.id}>{res?.condition}</ConditionBlock>)
	// 	// 	}
	// 	// 	if (i < parts.length) result.push(addComponent(i))
	// 	// }
	// 	// return result
	// 	return parts.map((p, i) => {
	// 		let Component = Numeric
	// 		switch (p.type) {
	// 			case 'math':
	// 				Component = Math
	// 				break
	// 			case 'func':
	// 				Component = Func
	// 				break
	// 			case 'numeric':
	// 				Component = Numeric
	// 				break
	// 			case 'param':
	// 				Component = Param
	// 				break
	// 			case 'condition':
	// 				Component = Condition
	// 				break
	// 			default:
	// 				break
	// 		}
	// 		return (
	// 			<Tooltip key={p.id} hasArrow label={p.description} isDisabled={!p.description}>
	// 				<Component data-index={i} active={activeIndex === i}>
	// 					{p.value}
	// 				</Component>
	// 			</Tooltip>
	// 		)
	// 	})
	// }
	// const renderCondition = (idx: number) => {
	// 	const p = parts[idx]
	// 	let condition: JSX.Element[] = []
	// 	if (p.type === 'condition' && p.origValue === 'if (') {
	// 		condition.push(
	// 			<Condition key={p.id} data-index={idx} active={activeIndex === idx}>
	// 				{p.value}
	// 			</Condition>
	// 		)
	// 		idx++
	// 		while (parts[idx].origValue != ') {') {
	// 			condition.push(addComponent(idx))
	// 			idx++
	// 		}
	// 		condition.push(
	// 			<Condition key={parts[idx].id} data-index={idx} active={activeIndex === idx}>
	// 				{parts[idx].value}
	// 			</Condition>
	// 		)
	// 		idx++
	// 		let line: JSX.Element[] = []
	// 		if (parts[idx].type === 'condition') {
	// 			//TODO дописать получение элементов из функции
	// 			renderCondition(idx)
	// 		} else {
	// 			while (parts[idx].origValue != '} else {') {
	// 				line.push(addComponent(idx))
	// 				idx++
	// 			}
	// 		}
	// 		condition.push(
	// 			<React.Fragment key={parts[idx].id}>
	// 				<ConditionLine>{line}</ConditionLine>
	// 				<Condition key={parts[idx].id} data-index={idx} active={activeIndex === idx}>
	// 					{parts[idx].value}
	// 				</Condition>
	// 			</React.Fragment>
	// 		)
	// 		idx++
	// 		line = []
	// 		if (parts[idx].type === 'condition') {
	// 			//TODO дописать получение элементов из функции
	// 			renderCondition(idx)
	// 		} else {
	// 			while (parts[idx].origValue != '}') {
	// 				line.push(addComponent(idx))
	// 				idx++
	// 			}
	// 		}
	// 		condition.push(
	// 			<React.Fragment key={parts[idx].id}>
	// 				<ConditionLine>{line}</ConditionLine>
	// 				<Condition key={parts[idx].id} data-index={idx} active={activeIndex === idx}>
	// 					{parts[idx].value}
	// 				</Condition>
	// 			</React.Fragment>
	// 		)
	// 		idx++
	// 	}
	// 	return { condition, idx }
	// }
	// const addComponent = (idx: number) => {
	// 	const p = parts[idx]
	// 	let Component = Numeric
	// 	switch (p.type) {
	// 		case 'math':
	// 			Component = Math
	// 			break
	// 		case 'func':
	// 			Component = Func
	// 			break
	// 		case 'numeric':
	// 			Component = Numeric
	// 			break
	// 		case 'param':
	// 			Component = Param
	// 			break
	// 		case 'condition':
	// 			Component = Condition
	// 			break
	// 		default:
	// 			break
	// 	}
	// 	return (
	// 		<Tooltip key={p.id} hasArrow label={p.description} isDisabled={!p.description}>
	// 			<Component data-index={idx} active={activeIndex === idx}>
	// 				{p.value}
	// 			</Component>
	// 		</Tooltip>
	// 	)
	// }
	// return (
	// 	<>
	// 		<Input
	// 			ref={inputRef}
	// 			value=''
	// 			onKeyDown={changePartsHandler}
	// 			// onFocus={focusHandler}
	// 			onBlur={clearFocusHandler}
	// 			onChange={() => {}}
	// 		/>
	// 		{/* <Formula onClick={selectActiveHandler} onMouseDown={saveFocusHandler}>
	// 			<Symbol type='math' data-index='-1' active={activeIndex === -1}>
	// 				=
	// 			</Symbol>
	// 			{parts.map((p, i) => (
	// 				<Tooltip key={p.id} hasArrow label={p.description} isDisabled={!p.description}>
	// 					<Symbol data-index={i} type={p.type} active={activeIndex === i}>
	// 						{p.value}
	// 					</Symbol>
	// 				</Tooltip>
	// 			))}
	// 		</Formula> */}
	// 		<Formula onClick={selectActiveHandler} onMouseDown={saveFocusHandler}>
	// 			<Math data-index='-1' active={activeIndex === -1}>
	// 				=
	// 			</Math>
	// 			{renderFormula()}
	// 		</Formula>
	// 	</>
	// )
	return <></>
}
