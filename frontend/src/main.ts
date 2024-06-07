import { createApp } from 'vue'
// import './style.css'
import '@/assets/font/font.css'
import App from './App.vue'

import router from '@/router/index.ts'
import pinia from './store';
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue';
import 'element-plus/dist/index.css'
import * as elIcons from '@element-plus/icons-vue'
const app = createApp(App)

//统一注册el-icon图标
for (let icon in elIcons) {
    app.component(`ElIcon${icon}`, elIcons[icon])
}

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(Antd)

app.mount('#app')

