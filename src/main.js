import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router'
import pinia from './stores'
import App from './App.vue'

createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')
