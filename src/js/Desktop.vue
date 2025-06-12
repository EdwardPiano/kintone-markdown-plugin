<template>
  <div>
    <h3 class="plugin-space-heading">Markdown Editor</h3>
    <EditorPreview :fieldCodes="selectedFields" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import EditorPreview from '../components/EditorPreview.vue'

const selectedFields = ref<string[]>([])

// Logic to fetch selected fields from Kintone configuration can be added here
// For example, you might want to retrieve the selected fields from the plugin's config
</script>

<style>
@import '../css/desktop.css';
</style>