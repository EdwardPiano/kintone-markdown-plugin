<template>
    <div>
        <h2 class="text-xl font-bold mb-2">Select the multiple-line text fields to apply the Markdown function.</h2>
        <div v-if="fields.length === 0">Loading fields...</div>
        <div v-else>
            <n-space vertical>
                <n-switch v-model:value="allSelected" @update:value="toggleAll">
                    <template #checked>Select All</template>
                    <template #unchecked>Cancel</template>
                </n-switch>

                <n-checkbox-group v-model:value="selectedFields">
                    <n-space vertical>
                        <n-checkbox v-for="field in fields" :key="field.code" :value="field.code">
                            {{ field.label }}
                        </n-checkbox>
                    </n-space>
                </n-checkbox-group>
            </n-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, defineEmits, defineProps } from 'vue'
import { NCheckbox, NCheckboxGroup, NSpace, NSwitch } from 'naive-ui'
import { useVModel } from '@vueuse/core'
import { getMultiLineTextFields } from '../common/kintoneFieldUtils'
interface Field {
    code: string
    label: string
}

const props = defineProps<{
    modelValue: string[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void
}>()

const fields = ref<Field[]>([])
const selectedFields = useVModel(props, 'modelValue', emit)


// ✔️ 計算是否全選
const allSelected = computed({
    get: () => selectedFields.value.length === fields.value.length,
    set: (value: boolean) => {
        selectedFields.value = value ? fields.value.map(f => f.code) : []
    }
})

// ✅ 或用這個來切換（附加 console）
const toggleAll = (value: boolean) => {
    if (value) {
        selectedFields.value = fields.value.map(f => f.code)
    } else {
        selectedFields.value = []
    }
}

onMounted(async () => {
    const pluginId = kintone.$PLUGIN_ID;
    const kintoneFields = kintone.plugin.app.getConfig(pluginId)
    selectedFields.value = kintoneFields.selectedFields ? JSON.parse(kintoneFields.selectedFields) : []
    console.log('kintoneFields:', kintoneFields)
    try {
        const appId = kintone.app.getId();
        fields.value = await getMultiLineTextFields(appId)
        console.log('多行文字欄位:', JSON.stringify(fields.value, null, 2));

    } catch (err) {
        console.error('欄位取得失敗', err);
    }
})


</script>
