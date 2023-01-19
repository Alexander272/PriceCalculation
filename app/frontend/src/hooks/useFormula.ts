import { IPartFormula } from '../types/formula'

export const useFormula = () => {
	const getFormula = (parts: IPartFormula[]) => {
		let formula = ''
		parts.forEach(p => {
			switch (p.type) {
				case 'Numeric':
					formula += p.value
					break
				case 'Math':
					formula += p.origValue
					break
				case 'Param':
					formula += p.origValue
					break
				case 'Func':
					formula += p.origValue
					formula += getFormula(p.children)
					formula += p.endValue
					break
				case 'Condition':
					formula += 'if ('
					formula += getFormula(p.exp)
					formula += ') {'
					formula += getFormula(p.then)
					formula += '} else {'
					formula += getFormula(p.else)
					formula += '}'
					break
				default:
					break
			}
		})

		return formula
	}

	return {
		getFormula,
	}
}
