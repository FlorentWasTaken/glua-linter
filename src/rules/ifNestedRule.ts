import { config } from '../config'
import { traverseAST } from '../tools'

export function ifNestedRule(ast: any): { line: number, message: string }[] {
    const errors: { line: number, message: string }[] = [];

    function checkNestedIf(node: any, depth: number) {
        if (node.type === 'IfStatement') {
            if (depth > config.maxIfDepth) {
                errors.push({
                    line: node.loc?.start.line || 1,
                    message: `Nested if depth exceeds ${config.maxIfDepth} levels.`,
                });
            }

            node.clauses.forEach((clause: any) => {
                if (clause.body) {
                    clause.body.forEach((childNode: any) => {
                        checkNestedIf(childNode, depth + 1);
                    });
                }
            });
        }
    }
    traverseAST(ast, (node: any) => checkNestedIf(node, 1));
    return errors;
}