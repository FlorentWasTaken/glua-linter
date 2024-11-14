import { config } from '../config'
import { traverseAST, isLowercase, isPascalCase, isUpperSnakeCase } from '../tools'

export function functionNameRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []

    traverseAST(ast, (node: any) => {
        if (node.type === 'FunctionDeclaration')
            manageFunction(node, errors)
    })
    return errors
}

function manageFunction(node: any, errors: { line: number, message: string }[]) {
    const name = node.identifier.name

    if (!node.isLocal)
        return manageGlobalFunction(name, errors)

    if (!isLowercase(name) && !isPascalCase(name)) {
        errors.push({
            line: 1,
            message: `Function name '${name}' must be pascal or lower case.`,
        })
    } else if (name.length > config.maxFunctionLength) {
        errors.push({
            line: 1,
            message: `Function name '${name}' is too large (> ${config.maxFunctionLength}).`,
        })
    }
}

function manageGlobalFunction(name: string, errors: { line: number, message: string }[]) {
    if (!isUpperSnakeCase(name)) {
        errors.push({
            line: 1,
            message: `Global function name '${name}' must be UPPERCASE with underscores.`,
        })
    } else if (name.length > config.maxGlobalFunctionLength) {
        errors.push({
            line: 1,
            message: `Global function name '${name}' is too large (> ${config.maxGlobalFunctionLength}).`,
        })
    }
}