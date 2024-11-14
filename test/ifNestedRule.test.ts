import { ifNestedRule } from '../src/rules/ifNestedRule'
import { parse } from 'luaparse'

describe('ifNestedRule', () => {
	it('should return an error if if statement depth > 3', () => {
		const code = `
        if true then
            if true then
                if true then
                    if true then end
                end
            end
        end`
		const ast = parse(code)
		const result = ifNestedRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Nested if depth exceeds 3 levels.",
		},
		])
	})

	it('should not return an error if if statement depth <= 3', () => {
		const code = "if true then if true then if true then end end end"
		const ast = parse(code)
		const result = ifNestedRule(ast)

		expect(result).toEqual([])
	})
})
