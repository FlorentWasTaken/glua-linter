import { functionNameRule } from '../src/rules/functionNameRule'
import { parse } from 'luaparse'

describe('functionNameRule', () => {
	it('should return an error if a function name is not in lower case or pascal case', () => {
		const code = "local function not_valid_function() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function name 'not_valid_function' must be pascal or lower case.",
		},
		])
	})

	it('should not return an error if a function name is pascal or lower case', () => {
		const code = "local function ValidFunction() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error if a function length is > 15', () => {
		const code = "local function ThisFunctionIsTooLarge() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function name 'ThisFunctionIsTooLarge' is too large (> 15).",
		},
		])
	})

	it('should not return an error if a function name length is > 15', () => {
		const code = "local function ValidFunc() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error if a global function name length is > 20', () => {
		const code = "function THIS_IS_NOT_A_VALID_FUNCTION() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Global function name 'THIS_IS_NOT_A_VALID_FUNCTION' is too large (> 20).",
		},
		])
	})

	it('should not return an error if a global function name size is > 20', () => {
		const code = "function VALID_FUNC() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error for a global function not uppercase with underscores', () => {
		const code = "function NotValidFunc() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Global function name 'NotValidFunc' must be UPPERCASE with underscores.",
		}
		])
	})

	it('should not return an error if a global function name is UPPERCASE with underscores', () => {
		const code = "function VALID_FUNCTION() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([])
	})

	it('should return an error for a global function name contains digit', () => {
		const code = "function NOT_VALID_FUNC123() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Global function name 'NOT_VALID_FUNC123' must be UPPERCASE with underscores.",
		}
		])
	})

	it('should return an error if a function name contains digit', () => {
		const code = "local function notValidFunc12() end"
		const ast = parse(code)
		const result = functionNameRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function name 'notValidFunc12' must be pascal or lower case.",
		}
		])
	})
})
