import { readFileSync } from 'fs'
import { resolve } from 'path'

interface LinterConfig {
    maxFunctionLength: number
    maxGlobalFunctionLength: number
    maxVariableLength: number
    maxGlobalVariableLength: number
    maxFunctionParameters: number
    maxIfDepth: number
    maxForDepth: number
    forbiddenFunctions: string[]
}

const configPath = resolve(__dirname, '../config.json')
const rawConfig = readFileSync(configPath, 'utf-8')
const jsonConfig = JSON.parse(rawConfig)

export const config: LinterConfig = {
    maxFunctionLength: jsonConfig.maxFunctionLength || 15,
    maxGlobalFunctionLength: jsonConfig.maxGlobalFunctionLength || 20,
    maxVariableLength: jsonConfig.maxVariableLength || 15,
    maxGlobalVariableLength: jsonConfig.maxGlobalVariableLength || 20,
    maxFunctionParameters: jsonConfig.maxFunctionParameters || 20,
    maxIfDepth: jsonConfig.maxIfDepth || 3,
    maxForDepth: jsonConfig.maxForDepth || 3,
    forbiddenFunctions: jsonConfig.forbiddenFunctions || []
}

export function getConfig(): LinterConfig {
    return config
}
