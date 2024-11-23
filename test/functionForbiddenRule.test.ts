import { functionForbiddenRule } from '../src/rules/functionForbiddenRule'
import { parse } from 'luaparse'

describe('functionForbiddenRule', () => {
	it('should return an error if a forbidden function is used', () => {
		const code = "ply:Distance()"
		const ast = parse(code)
		const result = functionForbiddenRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function ':Distance' is forbidden.",
		},
		])
	})

	it('should return an error if a forbidden function is used', () => {
		const code = "net.WriteTable()"
		const ast = parse(code)
		const result = functionForbiddenRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function 'net.WriteTable' is forbidden.",
		},
		])
	})

    it('should return an error if a forbidden function is used', () => {
		const code = "usermessage.GetTable()"
		const ast = parse(code)
		const result = functionForbiddenRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function 'usermessage.GetTable' is forbidden.",
		},
		])
	})

    it('should return an error if a forbidden function is used', () => {
		const code = "SendUserMessage()"
		const ast = parse(code)
		const result = functionForbiddenRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Function 'SendUserMessage' is forbidden.",
		},
		])
	})
})
