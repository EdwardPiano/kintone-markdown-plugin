<template>
  <n-message-provider>
    <form class="js-submit-settings" @submit.prevent="handleSubmit">
      <h2 class="settings-heading">Plugin Configuration</h2>
      <FieldSelector v-model="selectedFields" />
      <p>
        <n-button class="kintoneplugin-row" strong secondary round type="success" @click="handleSubmit">
          Save
        </n-button>
        <n-button strong secondary round type="error" @click="handleCancel">
          Cancel
        </n-button>
      </p>
    </form>
  </n-message-provider>
</template>

<script lang="ts" setup>
import { useMessage, NButton, NIcon } from 'naive-ui'
import { Cash as CashIcon } from '@vicons/ionicons5'
import { ref } from 'vue'
import EditorPreview from '../components/EditorPreview.vue'
import FieldSelector from '../components/FieldSelector.vue'

const selectedFields = ref<string[]>([])

const message = useMessage()

const handleSubmit = () => {
  kintone.plugin.app.setConfig(
    {
      selectedFields: JSON.stringify(selectedFields.value) // 記得轉成字串
    },
    () => {
      message.success('The setting has been saved successfully.')

      // 1 秒後跳轉，讓使用者看到訊息
      setTimeout(() => {
        const appId = kintone.app.getId()
        window.location.href = `../../${appId}/plugin/?message=CONFIG_SAVED#/`
      }, 1000)
    }
  )
}

const handleCancel = () => {
  window.location.href = `../../${kintone.app.getId()}/plugin/`
}
</script>


<style>
@import '../css/config.css';
</style>