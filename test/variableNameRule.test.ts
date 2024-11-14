import { variableNameRule } from '../src/rules/variableNameRule'
import { parse } from 'luaparse'
import { config } from '../src/config'

describe('variableNameRule', () => {
	it('should return an error if a variable name is not in camelCase', () => {
		const code = "local Invalid_Variable = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Variable name 'Invalid_Variable' must be camelCase.",
		},
		])
	})

	it('should not return an error if a variable name is camelCase', () => {
		const code = "local validVarName = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error if a variable name size is > 15', () => {
		const code = "local thisVariableIsTooLarge = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Variable name 'thisVariableIsTooLarge' is too large (> 15).",
		},
		])
	})

	it('should not return an error if a variable name size is > 15', () => {
		const code = "local validVarName = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error if a global variable name size is > 20', () => {
		const code = "THIS_IS_NOT_A_VALID_VARIABLE = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Global variable name 'THIS_IS_NOT_A_VALID_VARIABLE' is too large (> 20).",
		},
		])
	})

	it('should not return an error if a global variable name size is > 20', () => {
		const code = "VALID_VAR = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error for a global variable not uppercase with underscores', () => {
		const code = "myGlobalVar = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Global variable name 'myGlobalVar' must be UPPERCASE with underscores.",
		}
		])
	})

	it('should not return an error if a variable name is UPPERCASE with underscores', () => {
		const code = "VALID_VARIABLE_NAME = 10"
		const ast = parse(code)
		const result = variableNameRule(ast)

		expect(result).toEqual([])
	})
})
