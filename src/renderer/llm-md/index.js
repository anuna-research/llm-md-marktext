import { ipcRenderer } from 'electron'

export const initLlmMdHandlers = store => {
  // Check if llm-md is available
  let llmMdAvailable = false
  ipcRenderer.invoke('llm-md:check-availability').then(available => {
    llmMdAvailable = available
  })

  return {
    async evaluateDocument (options = {}) {
      if (!llmMdAvailable) {
        throw new Error('LLM-MD binary is not available.')
      }

      const { currentFile } = store.state.editor
      if (!currentFile?.pathname) {
        throw new Error('Please save the file before evaluating with LLM-MD.')
      }

      // Get preferences
      const { llmMd } = store.state.preferences

      const result = await ipcRenderer.invoke('llm-md:evaluate', currentFile.pathname, {
        provider: options.provider || llmMd.defaultProvider,
        model: options.model || llmMd.defaultModel,
        noAppend: options.noAppend !== undefined ? options.noAppend : !llmMd.autoAppend
      })

      if (result.success) {
        // Reload file if auto-append is enabled and not disabled by options
        if (llmMd.autoAppend && !options.noAppend) {
          await store.dispatch('editor/loadFile', currentFile.pathname)
        }
      }

      return result
    },

    async parseDocument (options = {}) {
      if (!llmMdAvailable) {
        throw new Error('LLM-MD binary is not available.')
      }

      const { currentFile } = store.state.editor
      if (!currentFile?.pathname) {
        throw new Error('Please save the file before parsing with LLM-MD.')
      }

      return ipcRenderer.invoke('llm-md:parse', currentFile.pathname, options)
    },

    async validateDocument (options = {}) {
      if (!llmMdAvailable) {
        throw new Error('LLM-MD binary is not available.')
      }

      const { currentFile } = store.state.editor
      if (!currentFile?.pathname) {
        throw new Error('Please save the file before validating with LLM-MD.')
      }

      return ipcRenderer.invoke('llm-md:validate', currentFile.pathname, options)
    },

    async createDocument (options = {}) {
      if (!llmMdAvailable) {
        throw new Error('LLM-MD binary is not available.')
      }

      // Ask for template
      const templateResult = await ipcRenderer.invoke('llm-md:select-template')
      if (templateResult.canceled) {
        return { success: false, canceled: true }
      }

      // Get file path through dialog
      const { filePath, canceled } = await store.dispatch('editor/showSaveDialog', {
        defaultPath: 'untitled.md',
        filters: [{ name: 'Markdown', extensions: ['md'] }]
      })

      if (canceled || !filePath) {
        return { success: false, canceled: true }
      }

      // Create the document
      const result = await ipcRenderer.invoke('llm-md:create', filePath, {
        template: templateResult.template,
        ...options
      })

      if (result.success) {
        // Open the newly created file
        await store.dispatch('editor/openFile', filePath)
      }

      return result
    }
  }
}
