import { createApp } from 'vue'
import App from './App.vue'
import { QingNiaoLogger } from '../../dist/qingniao.esm-bundler.js'
new QingNiaoLogger({
  accessKey: 'xxx',
})
createApp(App).mount('#app')
