<script setup lang="ts">
import { ref } from 'vue'
import { loginApi } from '@/api/loginApi'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

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

const login = async () => {
  const res = await loginApi({
    username: username.value,
    password: password.value
  })

  if (res.status === 200) {
    localStorage.setItem('tokenName', res.data.tokenName)
    localStorage.setItem('tokenValue', res.data.tokenValue)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('id', res.data.id)
    router.push('/home')
  } else {
    alert(res.msg)
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-page">
    <div class="welcome-text">Welcome&nbsp;Home</div>

    <div
        class="login-card"
        :style="cardStyle"
        @mousemove="handleMouseMove"
        @mouseleave="resetCard"
    >
      <h2>Welcome Back ♡</h2>

      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />

      <button @click="login">登录</button>
      <p @click="goToRegister">没有账号？去注册 →</p>

      <span class="heart">❤</span>
    </div>
  </div>
</template>

<style scoped>
/* =========================
   页面背景
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

.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(6px);
  z-index: 1;
}

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
   登录卡片
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
  font-size: 14px;
  outline: none;
  box-shadow: none;
  transition: all .25s ease;
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

.heart {
  position: absolute;
  top: 16px;
  right: 18px;
  color: #ec4899;
}

/* =========================
   🔥 灭蓝框 CSS
========================= */
:deep(*:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
}

.login-card input,
.login-card button,
.login-card p {
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}

.login-card button:focus,
.login-card button:active,
.login-card button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

.login-card button::-moz-focus-inner {
  border: 0;
}
</style>
