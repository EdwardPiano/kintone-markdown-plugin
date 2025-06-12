<template>
    <div>
        <h2 class="text-xl font-bold mb-2">編輯器預覽</h2>
        <div v-for="code in fieldCodes" :key="code" class="mb-4">
            <h3 class="text-lg font-semibold mb-1">欄位：{{ code }}</h3>
            <div :id="`editor-${code}`" class="border rounded"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, nextTick } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps<{ fieldCodes: string[] }>()

onMounted(async () => {
    await nextTick()
    props.fieldCodes.forEach(code => {
        new Editor({
            el: document.getElementById(`editor-${code}`)!,
            height: '200px',
            initialEditType: 'markdown',
            previewStyle: 'vertical',
        })
    })
})
</script>