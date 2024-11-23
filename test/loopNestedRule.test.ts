import { loopNestedRule } from '../src/rules/loopNestedRule'
import { parse } from 'luaparse'

describe('loopNestedRule', () => {
	it('should return an error if for statement depth > 3', () => {
		const code = `
        for a, b in ipairs() do
            for c, d in ipairs() do
                for e, f in ipairs() do
                    for g, h in ipairs() do end
                end
            end
        end`
		const ast = parse(code)
		const result = loopNestedRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Nested loop depth exceeds 3 levels.",
		},
		])
	})

	it('should not return an error if for statement depth <= 3', () => {
        const code = `
        for a, b in ipairs() do
            for c, d in ipairs() do
                for e, f in ipairs() do end
            end
        end`
		const ast = parse(code)
		const result = loopNestedRule(ast)

		expect(result).toEqual([])
	})

    it('should return an error if while statement depth > 3', () => {
		const code = `
        while (true) do
            for c, d in ipairs() do
                for e, f in ipairs() do
                    for g, h in ipairs() do end
                end
            end
        end`
		const ast = parse(code)
		const result = loopNestedRule(ast)

		expect(result).toEqual([
		{
			line: 1,
			message: "Nested loop depth exceeds 3 levels.",
		},
		])
	})
})
