export function camelCaseRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []

    traverseAST(ast, (node: any) => {
        if (node.type === 'VariableDeclaration') {
            if (!isCamelCase(node.name)) {
                errors.push({
                    line: node.loc.start.line,
                    message: `Variable name '${node.name}' must be in camelCase.`,
                })
            }
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
