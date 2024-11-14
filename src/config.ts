import { readFileSync } from 'fs'
import { resolve } from 'path'

interface LinterConfig {
    maxFunctionLength: number
    maxVariableNameLength: number
}

const configPath = resolve(__dirname, '../config.json')
const rawConfig = readFileSync(configPath, 'utf-8')
const jsonConfig = JSON.parse(rawConfig)

export const config: LinterConfig = {
    maxFunctionLength: jsonConfig.maxFunctionLength || 25,
    maxVariableNameLength: jsonConfig.maxVariableNameLength || 15
}

export function getConfig(): LinterConfig {
    return config
}
