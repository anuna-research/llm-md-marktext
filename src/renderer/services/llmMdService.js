import { ipcRenderer } from 'electron'
import bus from '../bus'
import store from '../store'

export const llmMdService = {
  name: 'llmMd',

  llmMd: {
    // Initialize event listeners
    init () {
      // Listen for events from menu
      bus.$on('llm-md-evaluate', () => this.evaluate())
      bus.$on('llm-md-parse', () => this.parse())
      bus.$on('llm-md-validate', () => this.validate())
      bus.$on('llm-md-create-new', () => this.createNew())

      // Check if llm-md binary is available
      ipcRenderer.invoke('llm-md:check-availability')
        .then(available => {
          this.isAvailable = available
        })
        .catch(error => {
          console.error('Error checking LLM-MD availability:', error)
          this.isAvailable = false
        })
    },

    isAvailable: false,

    async evaluate (options = {}) {
      if (!this.isAvailable) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'LLM-MD binary is not available.'
        })
        return { success: false, error: 'LLM-MD binary is not available.' }
      }

      const currentFile = store.state.editor.currentFile
      if (!currentFile?.pathname) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'Please save the file before evaluating with LLM-MD.'
        })
        return { success: false, error: 'Please save the file before evaluating.' }
      }

      // Show loading notification
      store.dispatch('notification/showNotification', {
        type: 'info',
        title: 'LLM-MD',
        message: 'Evaluating document with LLM-MD...',
        time: 0 // Don't auto-hide
      })

      try {
        const prefs = store.state.preferences
        const result = await ipcRenderer.invoke('llm-md:evaluate', currentFile.pathname, {
          provider: options.provider || prefs.llmMd?.defaultProvider || 'anthropic',
          model: options.model || prefs.llmMd?.defaultModel || '',
          noAppend: options.noAppend !== undefined ? options.noAppend : !(prefs.llmMd?.autoAppend)
        })

        // Remove loading notification
        store.dispatch('notification/removeNotification')

        if (result.success) {
          store.dispatch('notification/showNotification', {
            type: 'success',
            title: 'LLM-MD',
            message: 'Document evaluated successfully'
          })

          // Reload file if auto-append is enabled
          if (prefs.llmMd?.autoAppend && !options.noAppend) {
            store.dispatch('editor/loadFile', currentFile.pathname)
          }
        } else {
          store.dispatch('notification/showNotification', {
            type: 'error',
            title: 'LLM-MD Error',
            message: result.error || 'Failed to evaluate document'
          })
        }

        return result
      } catch (error) {
        store.dispatch('notification/removeNotification')
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: error.message || 'An unknown error occurred'
        })
        return { success: false, error: error.message || 'An unknown error occurred' }
      }
    },

    async parse () {
      if (!this.isAvailable) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'LLM-MD binary is not available.'
        })
        return { success: false, error: 'LLM-MD binary is not available.' }
      }

      const currentFile = store.state.editor.currentFile
      if (!currentFile?.pathname) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'Please save the file before parsing with LLM-MD.'
        })
        return { success: false, error: 'Please save the file before parsing.' }
      }

      // Show loading notification
      store.dispatch('notification/showNotification', {
        type: 'info',
        title: 'LLM-MD',
        message: 'Parsing document with LLM-MD...',
        time: 0
      })

      try {
        const result = await ipcRenderer.invoke('llm-md:parse', currentFile.pathname)

        // Remove loading notification
        store.dispatch('notification/removeNotification')

        if (result.success) {
          // Create a new tab with parsed output
          await store.dispatch('editor/createUntitledTab', {
            markdown: false,
            content: result.output,
            filename: `${currentFile.filename || 'untitled'}.ast.json`
          })

          store.dispatch('notification/showNotification', {
            type: 'success',
            title: 'LLM-MD',
            message: 'Document parsed successfully'
          })
        } else {
          store.dispatch('notification/showNotification', {
            type: 'error',
            title: 'LLM-MD Error',
            message: result.error || 'Failed to parse document'
          })
        }

        return result
      } catch (error) {
        store.dispatch('notification/removeNotification')
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: error.message || 'An unknown error occurred'
        })
        return { success: false, error: error.message || 'An unknown error occurred' }
      }
    },

    async validate () {
      if (!this.isAvailable) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'LLM-MD binary is not available.'
        })
        return { success: false, error: 'LLM-MD binary is not available.' }
      }

      const currentFile = store.state.editor.currentFile
      if (!currentFile?.pathname) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'Please save the file before validating with LLM-MD.'
        })
        return { success: false, error: 'Please save the file before validating.' }
      }

      // Show loading notification
      store.dispatch('notification/showNotification', {
        type: 'info',
        title: 'LLM-MD',
        message: 'Validating document with LLM-MD...',
        time: 0
      })

      try {
        const result = await ipcRenderer.invoke('llm-md:validate', currentFile.pathname)

        // Remove loading notification
        store.dispatch('notification/removeNotification')

        if (result.success) {
          store.dispatch('notification/showNotification', {
            type: 'success',
            title: 'LLM-MD',
            message: 'Document is valid'
          })
        } else {
          store.dispatch('notification/showNotification', {
            type: 'error',
            title: 'LLM-MD Error',
            message: result.error || 'Document contains syntax errors'
          })
        }

        return result
      } catch (error) {
        store.dispatch('notification/removeNotification')
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: error.message || 'An unknown error occurred'
        })
        return { success: false, error: error.message || 'An unknown error occurred' }
      }
    },

    async createNew () {
      if (!this.isAvailable) {
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: 'LLM-MD binary is not available.'
        })
        return { success: false, error: 'LLM-MD binary is not available.' }
      }

      try {
        // Ask for template
        const templateResult = await ipcRenderer.invoke('llm-md:select-template')
        if (templateResult.canceled) {
          return { success: false, canceled: true }
        }

        // Ask for file path
        const { filePath, canceled } = await store.dispatch('editor/showSaveDialog', {
          defaultPath: 'untitled.md',
          filters: [{ name: 'Markdown', extensions: ['md'] }]
        })

        if (canceled || !filePath) {
          return { success: false, canceled: true }
        }

        // Show loading notification
        store.dispatch('notification/showNotification', {
          type: 'info',
          title: 'LLM-MD',
          message: 'Creating new LLM-MD document...',
          time: 0
        })

        const result = await ipcRenderer.invoke('llm-md:create', filePath, {
          template: templateResult.template
        })

        // Remove loading notification
        store.dispatch('notification/removeNotification')

        if (result.success) {
          // Open the newly created file
          store.dispatch('editor/openFile', filePath)

          store.dispatch('notification/showNotification', {
            type: 'success',
            title: 'LLM-MD',
            message: 'Document created successfully'
          })
        } else {
          store.dispatch('notification/showNotification', {
            type: 'error',
            title: 'LLM-MD Error',
            message: result.error || 'Failed to create document'
          })
        }

        return result
      } catch (error) {
        store.dispatch('notification/removeNotification')
        store.dispatch('notification/showNotification', {
          type: 'error',
          title: 'LLM-MD Error',
          message: error.message || 'An unknown error occurred'
        })
        return { success: false, error: error.message || 'An unknown error occurred' }
      }
    }
  }
}
