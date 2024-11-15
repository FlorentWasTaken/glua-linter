import * as vscode from 'vscode'
import * as luaparse from 'luaparse'
import { variableNameRule } from './rules/variableNameRule'
import { ifNestedRule } from './rules/ifNestedRule'
import { functionParameterRule } from './rules/functionParameterRule'
import { functionNameRule } from './rules/functionNameRule'
import { loopNestedRule } from './rules/loopNestedRule'

export function lintGLua(code: string) {
    const ast = parseGLua(code)
    const errors = [
        ...applyRule(variableNameRule, ast),
        ...applyRule(ifNestedRule, ast),
        ...applyRule(functionParameterRule, ast),
        ...applyRule(functionNameRule, ast),
        ...applyRule(functionNameRule, ast),
        ...applyRule(loopNestedRule, ast)
    ]
    return errors
}

function parseGLua(code: string) {
    try {
        return luaparse.parse(code)
    } catch (e) {
        return null
    }
}

function applyRule(rule: Function, ast: any) {
    return rule(ast)
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('glua-linter.lintFile', () => {
        const editor = vscode.window.activeTextEditor
        if (editor) {
            const document = editor.document
            const code = document.getText()
            const errors = lintGLua(code)
            const diagnostics: vscode.Diagnostic[] = []

            errors.forEach((error) => {
                const range = new vscode.Range(
                    error.line, 0,
                    error.line, 0
                )
                const diagnostic = new vscode.Diagnostic(
                    range,
                    error.message,
                    vscode.DiagnosticSeverity.Warning
                )
                diagnostics.push(diagnostic)
            })
            const diagnosticCollection = vscode.languages.createDiagnosticCollection('glua-linter')

            diagnosticCollection.set(document.uri, diagnostics)
            vscode.window.showInformationMessage('GLua Linter is done!')
        }
    })
    context.subscriptions.push(disposable)
}

export function deactivate() {}
