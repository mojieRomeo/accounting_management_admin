<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import LoginView from "@/views/LoginView.vue";
</script>

<template>

    <router-view></router-view>


</template>

<style>
/* ========================================
   全局覆盖 el-dialog 关闭叉叉为粉色
   默认浅粉，hover 深粉，灭掉蓝圈
======================================== */

/* 按钮本体 */
.el-dialog__close {
  color: #fbcfe8 !important;   /* 默认浅粉 */
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  transition: color .2s ease, transform .15s ease !important;
}

/* SVG 图标 */
.el-dialog__close svg,
.el-dialog__close svg path {
  fill: currentColor !important;
  stroke: currentColor !important;
}

/* hover / focus */
.el-dialog__close:hover,
.el-dialog__close:focus {
  color: #ec4899 !important;   /* 深粉 */
  transform: scale(1.08);
}

/* 防止 focus 蓝圈 */
.el-dialog__close:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

</style>
