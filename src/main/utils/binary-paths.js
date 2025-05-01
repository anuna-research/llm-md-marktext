import path from 'path'
import { app } from 'electron'
import process from 'process'
import { fs } from 'fs'

export function getLlmMdPath () {
  const binaryName = process.platform === 'win32' ? 'llm-md.exe' : 'llm-md'

  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'bin', binaryName)
  } else {
    return path.join(app.getAppPath(), 'resources', process.platform, binaryName)
  }
}

export function isLlmMdAvailable () {
  try {
    const llmMdPath = getLlmMdPath()
    return fs.existsSync(llmMdPath)
  } catch (error) {
    console.error('Error checking llm-md availability:', error)
    return false
  }
}
