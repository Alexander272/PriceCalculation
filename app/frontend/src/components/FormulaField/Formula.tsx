import { Tooltip } from '@chakra-ui/react'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/useStore'
import { IPartFormula } from '../../types/formula'
import {
	FuncBlock,
	Math,
	Numeric,
	Param,
	Func,
	ConditionBlock,
	ConditionLine,
	Condition,
	Symbol,
	Start,
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
		return parts.map(p => {
			switch (p.type) {
				case 'Start':
					return (
						<Start
							key={p.id}
							data-id={p.id}
							data-bread={breadcrumbs}
							active={activeId === p.id}
							isAlone={parts.length <= 1}
							condition={breadcrumbs.endsWith('@then/') || breadcrumbs.endsWith('@else/')}
						/>
					)
				case 'Math':
					return (
						<Math key={p.id} data-id={p.id} data-bread={breadcrumbs} active={activeId === p.id}>
							{p.value}
						</Math>
					)
				case 'Numeric':
					return (
						<Numeric key={p.id}>
							{p.value.split('').map((n, i) => (
								<Symbol
									key={i}
									data-id={p.id}
									data-index={i}
									data-bread={breadcrumbs}
									active={activeId === p.id && activeIdx === i}
								>
									{n}
								</Symbol>
							))}
						</Numeric>
					)
				case 'Param':
					return (
						<Tooltip key={p.id} hasArrow label={p.description} isDisabled={!p.description}>
							<Param data-id={p.id} data-bread={breadcrumbs} active={activeId === p.id}>
								{p.value}
							</Param>
						</Tooltip>
					)
				case 'Func':
					return (
						<FuncBlock
							data-id={p.id}
							data-bread={breadcrumbs}
							key={p.id}
							level={level}
							active={activeId === p.id}
						>
							<span data-id={p.id} data-bread={breadcrumbs}>
								{p.value}
							</span>
							<Func>
								<Formula parts={p.children} level={level + 1} breadcrumbs={breadcrumbs + p.id + '/'} />
							</Func>
							<span data-id={p.id} data-bread={breadcrumbs}>
								{p.endValue}
							</span>
						</FuncBlock>
					)
				case 'Condition':
					return (
						<ConditionBlock key={p.id} data-id={p.id}>
							<Condition data-id={p.id} data-bread={breadcrumbs} bgColor={colors[(level % 3) as 1]}>
								<span data-id={p.id} data-bread={breadcrumbs}>
									Если (
								</span>
								<Func>
									<Formula
										parts={p.exp}
										level={level + 1}
										breadcrumbs={breadcrumbs + p.id + '@exp/'}
									/>
								</Func>
								<span data-id={p.id} data-bread={breadcrumbs}>
									) то {'{'}
								</span>
							</Condition>
							<ConditionLine data-id={p.id} data-bread={breadcrumbs} bgColor={colors[(level % 3) as 1]}>
								<Formula parts={p.then} level={level + 1} breadcrumbs={breadcrumbs + p.id + '@then/'} />
							</ConditionLine>
							<Condition data-id={p.id} data-bread={breadcrumbs} bgColor={colors[(level % 3) as 1]}>
								<span data-id={p.id} data-bread={breadcrumbs}>
									{'}'} Иначе {'{'}
								</span>
							</Condition>
							<ConditionLine data-id={p.id} data-bread={breadcrumbs} bgColor={colors[(level % 3) as 1]}>
								<Formula parts={p.else} level={level + 1} breadcrumbs={breadcrumbs + p.id + '@else/'} />
							</ConditionLine>
							<Condition
								data-id={p.id}
								data-bread={breadcrumbs}
								bgColor={colors[(level % 3) as 1]}
								active={activeId === p.id}
							>
								<span data-id={p.id} data-bread={breadcrumbs}>
									{'}'}
								</span>
							</Condition>
						</ConditionBlock>
					)
				default:
					return
			}
		})
	}

	return <>{renderFormula()}</>
}
