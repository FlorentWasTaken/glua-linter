import { trailingSpaceRule } from '../src/rules/trailingSpaceRule'

describe('trailingSpaceRule', () => {
    it('should return an error if there is trailing space', () => {
        const code = "local var = 10\n    "
        const result = trailingSpaceRule(code)

        expect(result).toEqual([
        {
            line: 1,
            message: "Trailing spaces found at the end of line 1.",
        },
        ])
    })
})
