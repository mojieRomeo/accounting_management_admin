<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerApi } from "@/api/registerApi";

const username = ref('')
const password = ref('')
const router = useRouter()
const radio = ref()

/* ===== 卡片磁吸 ===== */
const cardStyle = ref({
  transform: 'rotateX(0deg) rotateY(0deg)'
})

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = ((y - centerY) / centerY) * -6
  const rotateY = ((x - centerX) / centerX) * 6

  cardStyle.value = {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
}

const resetCard = () => {
  cardStyle.value = {
    transform: 'rotateX(0deg) rotateY(0deg)'
  }
}

/* ===== 原有逻辑 ===== */
const props = { value: 'id', label: 'role', disabled: 'unable' }

const options = [
  { id: 0, role: '用户' },
  { id: 1, role: '管理员' },
  { id: 2, role: '超级管理员' }
]

const register = async () => {
  if (!username.value || !password.value) {
    alert('请输入用户名和密码')
    return
  }
  if (radio.value === undefined) {
    alert('请选择角色')
    return
  }

  const res = await registerApi({
    username: username.value,
    password: password.value,
    role: radio.value
  })

  if (res.status === 200) {
    router.push('/login')
  } else {
    alert(res.msg)
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="login-page">

    <!-- 顶部文案（默认显示） -->
    <div class="welcome-text">
      Create&nbsp;an&nbsp;Account
    </div>

    <!-- 注册卡片（hover 才出现 + 磁吸） -->
    <div
        class="login-card"
        :style="cardStyle"
        @mousemove="handleMouseMove"
        @mouseleave="resetCard"
    >
      <h2>Join Us ♡</h2>

      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />

      <el-radio-group
          v-model="radio"
          :options="options"
          :props="props"
          class="theme-radio"
      />

      <button @click="register">注册</button>
      <p @click="goToLogin">已有账号？去登录 →</p>

      <span class="heart">❤</span>
    </div>
  </div>
</template>

<style scoped>
/* =========================
   页面背景（与登录页一致）
========================= */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background:
      linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)),
      url('@/assets/images/muse_dush_login.png') center / cover no-repeat;

  position: relative;
  overflow: hidden;
  perspective: 1200px;
}

/* 朦胧层 */
.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(6px);
  z-index: 1;
}

/* =========================
   漫画网点黑洞
========================= */
.login-page::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;

  background:
      radial-gradient(circle, rgba(0,0,0,0.7) 1.2px, transparent 2.4px);
  background-size: 6px 6px;

  mask-image: radial-gradient(
      circle at center,
      rgba(0,0,0,0.08) 0%,
      rgba(0,0,0,0.15) 18%,
      rgba(0,0,0,0.45) 40%,
      rgba(0,0,0,0.75) 65%,
      black 100%
  );

  opacity: 0.35;

  animation:
      dotsAttract 38s linear infinite,
      dotsBreath 6s ease-in-out infinite;
}

@keyframes dotsAttract {
  0% { background-position: 0 0; }
  50% { background-position: -140px -100px; }
  100% { background-position: 0 0; }
}

@keyframes dotsBreath {
  0%,100% { filter: contrast(1); }
  50% { filter: contrast(1.3); }
}

/* =========================
   顶部文案
========================= */
.welcome-text {
  position: absolute;
  z-index: 3;
  font-size: 42px;
  letter-spacing: 4px;
  font-weight: 600;

  color: rgba(255,255,255,0.92);

  text-shadow:
      0 0 12px rgba(236,72,153,0.35),
      0 0 24px rgba(236,72,153,0.25);

  animation: welcomeBreath 3s ease-in-out infinite;
  transition: all 0.6s ease;
}

@keyframes welcomeBreath {
  0%,100% { opacity: .75; letter-spacing: 4px; }
  50% { opacity: 1; letter-spacing: 6px; }
}

.login-page:hover .welcome-text {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(6px);
}

/* =========================
   注册卡片（默认隐藏）
========================= */
.login-card {
  width: 340px;
  padding: 36px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(20px);

  border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.18);

  opacity: 0;
  pointer-events: none;
  transform: translateY(40px) scale(.85);

  transition:
      opacity .5s ease,
      transform .6s cubic-bezier(.34,1.56,.64,1);

  transform-style: preserve-3d;
  z-index: 4;
}

.login-page:hover .login-card {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

/* =========================
   卡片内容
========================= */
.login-card h2 {
  font-size: 22px;
  font-weight: 600;
  color: #111;
}

.login-card input {
  width: 240px;
  height: 38px;
  border-radius: 14px;
  border: none;
  background: #f3f4f6;
  padding: 0 14px;
}

.login-card input:focus {
  background: #fff;
  box-shadow: 0 0 0 4px rgba(236,72,153,0.25);
}

.login-card button {
  width: 240px;
  height: 42px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg,#ec4899,#f472b6);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.login-card p {
  font-size: 13px;
  color: #555;
  cursor: pointer;
}

.login-card p:hover {
  color: #ec4899;
  text-decoration: underline;
}

/* =========================
   🔥 单选框主题色覆盖（去蓝）
========================= */
.theme-radio :deep(.el-radio__inner) {
  border-color: #ec4899;
}

.theme-radio :deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: #ec4899;
  border-color: #ec4899;
}

.theme-radio :deep(.el-radio__label) {
  color: #555;
}

.theme-radio :deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #ec4899;
}

/* ========================= */
.heart {
  position: absolute;
  top: 16px;
  right: 18px;
  color: #ec4899;
}
</style>
