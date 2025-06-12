import { createApp } from 'vue'
import ConfigApp from './ConfigApp.vue'

const main = document.getElementById('main') as HTMLDivElement
createApp(ConfigApp, {}).mount(main)