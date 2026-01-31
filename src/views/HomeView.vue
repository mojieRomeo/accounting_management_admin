<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {UserFilled} from "@element-plus/icons-vue";

const router = useRouter()
const userStore = useUserStore()
const currentRole = ref(Number(localStorage.getItem('role') || ''))

/* ========================
   用了pinia的logout三件套
======================== */
const logout = () => {
  // 清除本地存储
  localStorage.clear()
  // 清除pinia内存态（关键）
  userStore.username = ''
  userStore.avatar = ''
  //跳转
  router.push('/login')
}

const goToCenter = () => router.push('/home/center')
const goToEcharts = () => router.push('/home/echarts')
const goToBillTable = () => router.push('/home/billTable')
const goToUserTable = () => router.push('/home/userTable')

/* ========================
   侧边栏 3D
======================== */
const sideStyle = ref({})

const handleSideMove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const rx = ((e.clientY - r.top) / r.height - 0.5) * -8
  const ry = ((e.clientX - r.left) / r.width - 0.5) * 8
  sideStyle.value = { transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }
}

const resetSide = () => {
  sideStyle.value = { transform: 'rotateX(0) rotateY(0)' }
}

</script>

<template>
  <div class="layout">
    <header class="top">
      <h2 class="title cute-title">WORK STUDIO</h2>

      <!-- ⭐ 这里自动响应 username -->
      <h2 class="context" @click="goToCenter">
        Welcome&nbsp;Home,&nbsp;{{ userStore.username }}
      </h2>
      <el-avatar
          :src="userStore.avatar"
          :icon="!userStore.avatar ? UserFilled : undefined"
          size="large"
          shape="square"
      />

      <button class="logout-btn" @click="logout">退出</button>
    </header>

    <div class="body">
      <el-scrollbar class="sideScroll">
        <aside
            class="sideBar floating"
            :style="sideStyle"
            @mousemove="handleSideMove"
            @mouseleave="resetSide"
        >
          <ul>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
            <li @click="goToEcharts">可视分析</li>
            <li @click="goToBillTable">账目管理</li>
            <li v-show="currentRole === 1 || currentRole === 2"
                @click="goToUserTable">
              用户中心
            </li>
          </ul>
        </aside>
      </el-scrollbar>

      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>


<style scoped>
/* =========================
   页面背景
========================= */
.layout {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background:
      linear-gradient(rgba(255,255,255,.28), rgba(255,255,255,.28)),
      url('@/assets/images/muse_dush_login.png') center / cover no-repeat;
}

/* =========================
   顶栏（方形可爱，紧贴浏览器左边）
========================= */
.top {
  height: 110px;
  width: 100%; /* 顶格浏览器宽度 */
  display: flex;
  align-items: center;
  gap: 24px;

  background: rgba(255,255,255,.85);
  border-radius: 10px 10px 0 0; /* 顶部圆角 */
  box-shadow: 0 8px 20px rgba(0,0,0,.12);
}

/* 标题（可爱干净） */
.cute-title {
  font-size: 22px;
  margin-left: 24px;
  font-weight: 500;
  letter-spacing: 6px;
  color: #222;
}

/* Welcome 文案 */
.context {
  margin-left: auto;
  font-size: 14px;
  letter-spacing: 1px;
  color: #666;
  cursor: pointer;
}

.context:hover {
  opacity: .7;
}

/* 退出按钮（活泼 hover） */
.logout-btn {
  padding: 8px 20px;
  margin-right: 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg,#f472b6,#ec4899);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all .3s ease;
}

.logout-btn:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 6px 20px rgba(236,72,153,.35);
}

/* =========================
   主体
========================= */
.body {
  height: calc(100% - 110px);
  display: flex;
}

/* =========================
   侧边栏（撑满高度，滚动在白框内）
========================= */
.sideScroll {
  width: 200px; /* 和侧边栏宽度一致 */
  height: 100%; /* 撑满主体高度 */
}

.sideBar {
  width: 100%;
  height: 100%; /* 白框撑满滚动区域 */
  padding: 12px 0;
  background: rgba(255,255,255,.72);
  backdrop-filter: blur(18px);
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0,0,0,.15);
  transform-style: preserve-3d;
  overflow: hidden;
}

.sideBar ul {
  margin: 0;
  padding: 0 12px;
  list-style: none;
  overflow-y: auto; /* 内部滚动 */
  height: 100%;      /* 高度撑满侧边栏 */
}

.sideBar li {
  margin: 6px 0;
  padding: 10px 14px;
  font-size: 14px;
  color: #444;
  border-radius: 8px;
  cursor: pointer;
  transition: all .25s ease;
}

.sideBar li:hover {
  background: rgba(236,72,153,.16);
  color: #ec4899;
  transform: translateX(4px);
}

/* =========================
   主内容
========================= */
.main {
  flex: 1;
  margin: 16px 16px 16px 0;
  border-radius: 8px;
  overflow: hidden;
}

/* =========================
   爱心动画
========================= */
.heart {
  position: fixed;
  font-size: 16px;
  color: #ec4899;
  pointer-events: none;
  animation: heartFloat 1.2s ease-out forwards;
}

@keyframes heartFloat {
  0% {
    opacity: 0;
    transform: translateY(0) scale(.6);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform:
        translateY(-80px)
        rotate(20deg)
        scale(1.2);
  }
}

/* =========================
   🔥 灭蓝框
========================= */
:deep(*:focus-visible),
button,
li {
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}

button::-moz-focus-inner {
  border: 0;
}
</style>
