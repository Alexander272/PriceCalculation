import { Tooltip } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/useStore'
import { IPartFormula } from '../../types/formula'
import {
	FuncBlock,
	NewMath,
	NewNumeric,
	NewParam,
	NewFunc,
	ConditionBlock,
	NewConditionLine,
	NewCondition,
	NewSymbol,
} from './field.style'

type Props = {
	parts: IPartFormula[]
	level: number
	breadcrumbs: string
}

const colors = {
	1: 'var(--chakra-colors-orange-500)',
	2: 'var(--chakra-colors-green-500)',
	0: 'var(--chakra-colors-yellow-400)',
}

export const Formula: FC<Props> = ({ parts, level, breadcrumbs }) => {
	const activeId = useAppSelector(state => state.formula.activeId)
	const activeIdx = useAppSelector(state => state.formula.activeIdx)

	const renderFormula = () => {
		return parts.map((p, i) => {
			switch (p.type) {
				case 'Math':
					return (
						<NewMath key={p.id} data-id={p.id} data-bread={breadcrumbs} active={activeId === p.id}>
							{p.value}
						</NewMath>
					)
				case 'Numeric':
					return (
						<NewNumeric key={p.id}>
							{p.value.split('').map((n, i) => (
								<NewSymbol
									key={i}
									data-id={p.id}
									data-index={i}
									data-bread={breadcrumbs}
									active={activeId === p.id && activeIdx === i}
								>
									{n}
								</NewSymbol>
							))}
						</NewNumeric>
					)
				case 'Param':
					return (
						<Tooltip key={p.id} hasArrow label={p.description} isDisabled={!p.description}>
							<NewParam data-id={p.id} data-bread={breadcrumbs} active={activeId === p.id}>
								{p.value}
							</NewParam>
						</Tooltip>
					)
				case 'Func':
					return (
						<FuncBlock key={p.id} level={level} active={activeId === p.id}>
							<span data-id={p.id} data-bread={breadcrumbs}>
								{p.value}
							</span>
							<NewFunc>
								<Formula parts={p.children} level={level + 1} breadcrumbs={breadcrumbs + p.id + '/'} />
							</NewFunc>
							<span data-id={p.id} data-bread={breadcrumbs}>
								{p.endValue}
							</span>
						</FuncBlock>
					)
				case 'Condition':
					return (
						<ConditionBlock key={p.id} data-id={p.id}>
							<NewCondition bgColor={colors[(level % 3) as 1]}>
								<span data-id={p.id} data-bread={breadcrumbs}>
									Если (
								</span>
								<NewFunc>
									<Formula
										parts={p.exp}
										level={level + 1}
										breadcrumbs={breadcrumbs + p.id + '@exp/'}
									/>
								</NewFunc>
								<span data-id={p.id} data-bread={breadcrumbs}>
									) то {'{'}
								</span>
							</NewCondition>
							<NewConditionLine bgColor={colors[(level % 3) as 1]}>
								<Formula parts={p.then} level={level + 1} breadcrumbs={breadcrumbs + p.id + '@then/'} />
							</NewConditionLine>
							<NewCondition bgColor={colors[(level % 3) as 1]}>
								<span data-id={p.id} data-bread={breadcrumbs}>
									{'}'} Иначе {'{'}
								</span>
							</NewCondition>
							<NewConditionLine bgColor={colors[(level % 3) as 1]}>
								<Formula parts={p.else} level={level + 1} breadcrumbs={breadcrumbs + p.id + '@else/'} />
							</NewConditionLine>
							<NewCondition bgColor={colors[(level % 3) as 1]} active={activeId === p.id}>
								<span data-id={p.id} data-bread={breadcrumbs}>
									{'}'}
								</span>
							</NewCondition>
						</ConditionBlock>
					)
				default:
					return
			}
		})
	}

	return <>{renderFormula()}</>
}
