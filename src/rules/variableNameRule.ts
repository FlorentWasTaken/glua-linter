import { config } from '../config';

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

function traverseAST(node: any, callback: (node: any) => void) {
    callback(node)
    if (node.body)
        node.body.forEach((childNode: any) => traverseAST(childNode, callback))
    if (node.arguments)
        node.arguments.forEach((childNode: any) => traverseAST(childNode, callback))
}

function isCamelCase(name: string): boolean {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(name)
}

function isUpperCaseWithUnderscores(name: string): boolean {
    return /^[A-Z]+(_[A-Z]+)*$/.test(name)
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

    if (isGlobal && !isUpperCaseWithUnderscores(variable.name)) {
        errors.push({
            line: 1,
            message: `Global variable name '${variable.name}' must be UPPERCASE with underscores.`,
        })
    } else if (isGlobal && variable.name.length > config.maxGlobalVariableLength) {
        errors.push({
            line: 1,
            message: `Global variable name '${variable.name}' is too large (> ${config.maxGlobalVariableLength}).`,
        })
    }
}