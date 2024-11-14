import { config } from '../config'
import { traverseAST } from '../tools'

export function functionParameterRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []

    traverseAST(ast, (node: any) => {
        if (node.type === 'FunctionDeclaration')
            manageFunction(node, errors)
    })
    return errors
}

function manageFunction(node: any, errors: { line: number, message: string }[]) {
    if (node.parameters.length > config.maxFunctionParameters) {
        errors.push({
            line: 1,
            message: `Too many parameters for '${node.identifier.name}' (> ${config.maxFunctionParameters}).`,
        })
    }
}
