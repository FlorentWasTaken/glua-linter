import { config } from '../config'
import { traverseAST, isCamelCase, isUpperSnakeCase } from '../tools'

export function variableNameRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []

    traverseAST(ast, (node: any) => {
        if (node.type === 'LocalStatement') {
            node.variables.forEach((variable: any) => {
                manageLocalVariable(variable, errors)
            })
        } else if (node.type === 'AssignmentStatement') {
            node.variables.forEach((variable: any) => {
                manageGlobalVariable(node, variable, errors)
            })
        }
    })

    return errors
}

function manageLocalVariable(variable: any, errors: { line: number, message: string }[]) {
    if (!isCamelCase(variable.name)) {
        errors.push({
            line: 1,
            message: `Variable name '${variable.name}' must be camelCase.`,
        })
    } else if (variable.name.length > config.maxVariableLength) {
        errors.push({
            line: 1,
            message: `Variable name '${variable.name}' is too large (> ${config.maxVariableLength}).`,
        })
    }
}

function manageGlobalVariable(node: any, variable: any, errors: { line: number, message: string }[]) {
    const isGlobal = !node.parent || node.parent.type !== 'LocalStatement'

    if (!isGlobal)
        return
    if (!isUpperSnakeCase(variable.name)) {
        errors.push({
            line: 1,
            message: `Global variable name '${variable.name}' must be UPPERCASE with underscores.`,
        })
    } else if (variable.name.length > config.maxGlobalVariableLength) {
        errors.push({
            line: 1,
            message: `Global variable name '${variable.name}' is too large (> ${config.maxGlobalVariableLength}).`,
        })
    }
}