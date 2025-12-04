import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入官方 vue-echarts
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// 按需引入 ECharts 核心模块和图表组件
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components'

// 注册必须的 ECharts 组件
use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
])

// 创建唯一 App 实例
const app = createApp(App)

// 挂载 router（非常重要）
app.use(router)

// 挂载 Element Plus
app.use(ElementPlus)

// 全局注册 ECharts
app.component('v-chart', ECharts)

// 挂载
app.mount('#app')
