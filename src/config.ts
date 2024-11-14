import { readFileSync } from 'fs'
import { resolve } from 'path'

interface LinterConfig {
    maxFunctionLength: number
    maxGlobalFunctionLength: number
    maxVariableLength: number
    maxGlobalVariableLength: number
}

const configPath = resolve(__dirname, '../config.json')
const rawConfig = readFileSync(configPath, 'utf-8')
const jsonConfig = JSON.parse(rawConfig)

export const config: LinterConfig = {
    maxFunctionLength: jsonConfig.maxFunctionLength || 15,
    maxGlobalFunctionLength: jsonConfig.maxGlobalFunctionLength || 20,
    maxVariableLength: jsonConfig.maxVariableLength || 15,
    maxGlobalVariableLength: jsonConfig.maxGlobalVariableLength || 20
}

export function getConfig(): LinterConfig {
    return config
}
