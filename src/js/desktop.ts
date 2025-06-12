import { createApp } from 'vue'
import Desktop from './Desktop.vue'

const pid = kintone.$PLUGIN_ID

kintone.events.on('app.record.index.show', (event: KintoneEvent) => {
  const config = kintone.plugin.app.getConfig(pid)
  const spaceElement = kintone.app.getHeaderSpaceElement() as HTMLElement
  const app = createApp(Desktop, { selectedFields: config.selectedFields })
  app.mount(spaceElement)
  return event
})