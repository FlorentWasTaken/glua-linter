import { config } from '../config'
import { traverseAST } from '../tools'

const loopTypes = ['ForStatement', 'ForInStatement', 'WhileStatement', 'ForGenericStatement']

export function loopNestedRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = []

    function checkNestedLoop(node: any, depth: number) {
        if (loopTypes.includes(node.type)) {
            if (depth > config.maxForDepth) {
                errors.push({
                    line: node.loc?.start.line || 1,
                    message: `Nested loop depth exceeds ${config.maxForDepth} levels.`,
                })
            }

            if (node.body) {
                node.body.forEach((childNode: any) => {
                    checkNestedLoop(childNode, depth + 1)
                })
            }
        }
    }

    traverseAST(ast, (node: any) => checkNestedLoop(node, 1))
    return errors
}
