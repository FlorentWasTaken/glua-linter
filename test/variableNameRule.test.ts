import { variableNameRule } from '../src/rules/variableNameRule'
import { parse } from 'luaparse'

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
    const code = "local validVariableName = 10"
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
