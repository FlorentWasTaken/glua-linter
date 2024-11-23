import { traverseAST } from '../tools'
import { config } from '../config'

export function functionForbiddenRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []
    const forbiddenFunctions = config.forbiddenFunctions

    traverseAST(ast, (node: any) => {
        if (node.type === 'CallStatement') {
            const functionName = extractFunctionName(node)

            if (isForbidden(functionName, forbiddenFunctions)) {
                errors.push({
                    line: node.loc?.start.line || 1,
                    message: `Function '${functionName}' is forbidden.`,
                })
            }
        }
    })

    return errors
}

function extractFunctionName(node: any): string {
    const base = node.expression.base

    if (base.type === 'MemberExpression') {
        const table = base.base.name || ''
        const method = base.identifier.name || ''
        const separator = base.indexer

        return separator === ':' ? `:${method}` : `${table}.${method}`
    } else if (base.type === 'Identifier')
        return base.name
    return ''
}

function isForbidden(functionName: string, forbiddenFunctions: string[]): boolean {
    return forbiddenFunctions.some((forbidden) => {
        if (forbidden.endsWith('.*')) {
            const table = forbidden.replace('.*', '')

            return functionName.startsWith(`${table}.`)
        }
        return functionName === forbidden || functionName === forbidden.split('.').pop()
    })
}
