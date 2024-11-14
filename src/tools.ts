export function isCamelCase(name: string): boolean {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(name)
}

export function isUpperSnakeCase(name: string): boolean {
    return /^[A-Z]+(_[A-Z]+)*$/.test(name)
}

export function isLowercase(name: string): boolean {
    return /^[a-z]+$/.test(name);
}

export function isPascalCase(name: string): boolean {
    return /^[A-Z][a-z]*([A-Z][a-z]*)*$/.test(name);
}

export function traverseAST(node: any, callback: (node: any) => void) {
    callback(node)
    if (node.body)
        node.body.forEach((childNode: any) => traverseAST(childNode, callback))
    if (node.arguments)
        node.arguments.forEach((childNode: any) => traverseAST(childNode, callback))
}