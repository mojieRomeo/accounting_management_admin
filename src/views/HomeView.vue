<template>
  <div class="layout">
    <!-- 顶栏 -->
    <header class="top">
      <h2 class="title">工作室记账系统</h2>
      <h2 class="context">欢迎您，XXX</h2>
      <button @click="logout">退出登录</button>
    </header>

    <!-- 主体区域 -->
    <div class="body">
      <el-scrollbar height="100vh">
        <aside class="sideBar">
          <ul>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
            <li @click="goToEcharts">金额可视图</li>
            <li @click="goToTable">金额管理</li>
          </ul>
        </aside>
      </el-scrollbar>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => router.push('/login')

const goToEcharts = () => router.push('/home/echarts')
const goToTable = () => router.push('/home/table')
</script>

<style scoped>
.layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.top{
  display:flex;
  justify-content: space-between;
  background-color: #f0f0f0;
}
.title{
  padding-left:15px;
}
.context{
  padding-left: 1000px;
  padding-top: 13px;
  font-size: 14px;
  height: 25px;
  width: 100px;
  margin-top:15px;
}
button{
  font-size: 14px;         /* 字体大小 */
  height: 45px;
  width: 75px;
  padding: 0;
  margin-top:15px;
  margin-right: 15px;
  background-color: #fff;
}
button:hover {
  background-color: #666; /* 悬停时背景颜色 */
  color: #fff; /* 悬停时文字颜色 */
}
.sideBar {
  display: flex;
  flex-direction: column;
  width: 200px;
  color: white;
  background-color: #444;
  height: 100%;
  overflow-y: auto; /* 超出滚动 */


}
li{
  padding: 10px 20px;       /* 内边距 */
  font-size: 16px;         /* 字体大小 */
}
.body {
  display: flex;
  flex: 1;       /* 让.body 自动撑满剩余高度 */
  min-height: 0; /* 防止flex子元素无法拉满 */
}
.main{
  flex: 1;       /* 让.main 自动撑满剩余宽度 */
  min-width: 0;  /* 防止flex子元素无法拉满 */
}


</style>
