import { ipcMain, dialog } from 'electron'
import { isLlmMdAvailable } from '../utils/binary-paths.js'
import { evaluateLlmMdFile, parseLlmMdFile, validateLlmMdFile, createLlmMdFile } from './index.js'

export function setupLlmMdIpcHandlers () {
  // Handler for evaluating a file
  ipcMain.handle('llm-md:evaluate', async (event, file, options = {}) => {
    try {
      return await evaluateLlmMdFile(file, options)
    } catch (error) {
      return { success: false, error: error.message || 'An unknown error occurred' }
    }
  })

  // Similar handlers for parse, validate, and create commands
  ipcMain.handle('llm-md:parse', async (event, file, options = {}) => {
    try {
      return await parseLlmMdFile(file, options)
    } catch (error) {
      return { success: false, error: error.message || 'An unknown error occurred' }
    }
  })

  ipcMain.handle('llm-md:validate', async (event, file, options = {}) => {
    try {
      return await validateLlmMdFile(file, options)
    } catch (error) {
      return { success: false, error: error.message || 'An unknown error occurred' }
    }
  })

  ipcMain.handle('llm-md:create', async (event, file, options = {}) => {
    try {
      return await createLlmMdFile(file, options)
    } catch (error) {
      return { success: false, error: error.message || 'An unknown error occurred' }
    }
  })

  // Add handler for checking binary availability
  ipcMain.handle('llm-md:check-availability', async () => {
    return isLlmMdAvailable()
  })

  // Template selection dialog
  ipcMain.handle('llm-md:select-template', async (event) => {
    const window = event.sender.getOwnerBrowserWindow()

    const result = await dialog.showMessageBox(window, {
      type: 'question',
      title: 'Select Template',
      message: 'Choose a template for the new llm-md file:',
      buttons: ['Basic', 'Chat', 'Coding', 'Creative', 'Cancel'],
      defaultId: 0,
      cancelId: 4
    })

    if (result.response === 4) {
      return { canceled: true }
    }

    const templates = ['basic', 'chat', 'coding', 'creative']
    return { canceled: false, template: templates[result.response] }
  })
}
