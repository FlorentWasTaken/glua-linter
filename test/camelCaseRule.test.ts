import { camelCaseRule } from '../src/rules/camelCaseRule'

describe('camelCaseRule', () => {
  it('should return an error if a variable name is not in camelCase', () => {
    const ast = {
      type: 'VariableDeclaration',
      name: 'Invalid_Variable',
      loc: {
        start: {
          line: 1,
        },
      },
    }
    const result = camelCaseRule(ast)

    expect(result).toEqual([
      {
        line: 1,
        message: "Variable name 'Invalid_Variable' must be in camelCase.",
      },
    ])
  })

  it('should not return an error if a variable name is in camelCase', () => {
    const ast = {
      type: 'VariableDeclaration',
      name: 'validVariableName',
      loc: {
        start: {
          line: 1,
        },
      },
    }
    const result = camelCaseRule(ast)

    expect(result).toEqual([])
  })
})
