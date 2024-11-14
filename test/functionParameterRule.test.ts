import { functionParameterRule } from '../src/rules/functionParameterRule'
import { parse } from 'luaparse'

describe('functionParameterRule', () => {
	it('should return an error if function parameters is > 4', () => {
		const code = "local function NotValidFunction(first, second, third, fourth, fifth) end"
		const ast = parse(code)
		const result = functionParameterRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Too many parameters for 'NotValidFunction' (> 4).",
		},
		])
	})

	it('should not return an error if function parameters <= 4', () => {
		const code = "local function ValidFunction(first, second, third, fourth) end"
		const ast = parse(code)
		const result = functionParameterRule(ast)

		expect(result).toEqual([])
	})
})
