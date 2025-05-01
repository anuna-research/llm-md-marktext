<!-- src/renderer/components/preference/llm-md.vue -->
<template>
  <section>
    <div class="pref-section">
      <h4>LLM-MD Settings</h4>

      <div class="form-item">
        <label for="defaultProvider">Default Provider</label>
        <select id="defaultProvider" v-model="defaultProvider">
          <option value="anthropic">Anthropic</option>
          <option value="openai">OpenAI</option>
          <option value="google">Google</option>
          <option value="mistral">Mistral</option>
        </select>
        <small class="tip">Default LLM provider to use when evaluating documents.</small>
      </div>

      <div class="form-item">
        <label for="defaultModel">Default Model</label>
        <input
          type="text"
          id="defaultModel"
          v-model="defaultModel"
          placeholder="Leave empty to use provider's default"
        />
        <small class="tip">Default model to use. Leave empty to use provider's default.</small>
      </div>

      <div class="form-item checkbox">
        <input
          type="checkbox"
          id="autoAppend"
          v-model="autoAppend"
        />
        <label for="autoAppend">Auto-append responses to document</label>
        <small class="tip">When enabled, LLM responses will be automatically appended to the document.</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      defaultProvider: 'anthropic',
      defaultModel: '',
      autoAppend: true
    }
  },

  created () {
    // Get initial values from preferences
    this.defaultProvider = this.$parent.getPreferenceValue('llmMd.defaultProvider')
    this.defaultModel = this.$parent.getPreferenceValue('llmMd.defaultModel')
    this.autoAppend = this.$parent.getPreferenceValue('llmMd.autoAppend')
  },

  watch: {
    defaultProvider (value) {
      this.$parent.setPreference('llmMd.defaultProvider', value)
    },
    defaultModel (value) {
      this.$parent.setPreference('llmMd.defaultModel', value)
    },
    autoAppend (value) {
      this.$parent.setPreference('llmMd.autoAppend', value)
    }
  }
}
</script>

<style scoped>
.form-item {
  margin-bottom: 1rem;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input {
  margin-right: 0.5rem;
}

.tip {
  font-size: 0.8rem;
  color: #888;
}
</style>
