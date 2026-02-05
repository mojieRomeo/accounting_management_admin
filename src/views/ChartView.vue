<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { getBillTrendApi } from '@/api/billTrendApi'

// 1️⃣ 对应 document.getElementById('main')
const chartDom = ref<HTMLDivElement | null>(null)

// 2️⃣ 对应 var myChart, 这里let是因为myChart可变，其生命周期在onMounted内
let myChart: echarts.ECharts | null = null

onMounted(async () => {
  // 等 DOM 挂载完成, 如果 DOM 还没准备好直接退出这个函数，不往下执行
  if (!chartDom.value) return

  // ========== 等价于 ==========
  // var chartDom = document.getElementById('main')
  // var myChart = echarts.init(chartDom)
  // ============================
  myChart = echarts.init(chartDom.value)

  // 3️⃣ 拉后端数据，放进 onMounted 或单独函数loadData()，再在onMounted里调用loadData()
  const data = await getBillTrendApi()

  // 4️⃣ option，和你 demo 几乎一样
  const option: echarts.EChartsOption = {
    title: {
      text: '最近7天收支趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '收入',
        type: 'line',
        data: data.data.income,
        smooth: true
      },
      {
        name: '支出',
        type: 'line',
        data: data.data.expense,
        smooth: true
      }
    ]
  }

  // 5️⃣ 等价于 option && myChart.setOption(option)
  myChart.setOption(option)

  // 自适应,浏览器尺寸变了，就让图表跟着自适应
  window.addEventListener('resize', () => {
    myChart?.resize()
  })
})
</script>

<template>
  <!-- 等价于 <div id="main"></div> -->
  <div ref="chartDom" style="width: 100%; height: 400px;"></div>
</template>
