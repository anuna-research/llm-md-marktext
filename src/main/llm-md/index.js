import { spawn } from 'child_process'
import { getLlmMdPath } from '../utils/binary-paths.js'

export class LlmMdOptions {
  constructor (options = {}) {
    this.output = options.output || null
    this.noAppend = options.noAppend || false
    this.debug = options.debug || false
    this.provider = options.provider || null
    this.model = options.model || null
    this.splice = options.splice || null
  }

  toArgs () {
    const args = []

    if (this.output) args.push('-o', this.output)
    if (this.noAppend) args.push('--no-append')
    if (this.debug) args.push('-d')
    if (this.provider) args.push('--provider', this.provider)
    if (this.model) args.push('--model', this.model)
    if (this.splice) args.push('--splice', this.splice)

    return args
  }
}

export function executeLlmMdCommand (command, file, options = new LlmMdOptions()) {
  return new Promise((resolve, reject) => {
    const llmMdPath = getLlmMdPath()
    const args = [command]

    if (file) args.push(file)
    args.push(...options.toArgs())

    let stdoutData = ''
    let stderrData = ''

    const process = spawn(llmMdPath, args)

    process.stdout.on('data', (data) => {
      stdoutData += data.toString()
    })

    process.stderr.on('data', (data) => {
      stderrData += data.toString()
    })

    process.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: stdoutData })
      } else {
        resolve({ success: false, output: stdoutData, error: stderrData })
      }
    })

    process.on('error', (err) => {
      // Fix: Use resolve with success:false instead of reject
      // This maintains consistent return type and fixes the lint error
      resolve({ success: false, error: err.message })
    })
  })
}

// Convenience methods for specific commands
export function evaluateLlmMdFile (file, options = {}) {
  return executeLlmMdCommand('evaluate', file, new LlmMdOptions(options))
}

export function parseLlmMdFile (file, options = {}) {
  return executeLlmMdCommand('parse', file, new LlmMdOptions(options))
}

export function validateLlmMdFile (file, options = {}) {
  return executeLlmMdCommand('validate', file, new LlmMdOptions(options))
}

export function createLlmMdFile (file, options = {}) {
  return executeLlmMdCommand('create', file, new LlmMdOptions(options))
}
