<script setup lang="ts">
import {ref} from 'vue'
import {loginApi} from '@/api/loginApi'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const res = await loginApi({
    "username": username.value,
    "password": password.value
  })
  if(res.status === 200){
    //postman里返回的resp就是responseEntity，也就是loginApi的返回的res.data（又被封装成了res），所以获取是res.data.username
    localStorage.setItem('tokenName', res.data.tokenName)
    localStorage.setItem('tokenValue', res.data.tokenValue)
    localStorage.setItem('role', res.data.role)
    localStorage.setItem('username', res.data.username)
    localStorage.setItem('id',res.data.id)
    router.push("/home")
  }else{
    alert(res.msg)
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login">
    <h2>登录</h2>
    <input v-model="username"  placeholder="用户名" />
    <input v-model="password"  placeholder="密码" />
    <button @click="login">登录</button>
    <p @click="goToRegister">没有账号，去注册</p>

  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 10px;              /* 元素之间间距 */

  background-color: #fff;   /* 卡片白色背景 */
  padding: 20px;            /* 内边距 */
  border-radius: 8px;       /* 圆角 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* 阴影 */
  width: 300px;             /* 卡片宽度 */
  margin: 160px auto;        /* 水平居中 + 顶部距离 */
  align-items: center;

}

.login input,
.login button,
.login p {
  display: block;          /* 保证每个元素独占一行 */
}

button:hover {
  background-color: #666; /* 悬停时背景颜色 */
  color: #fff; /* 悬停时文字颜色 */
}

.login input {
  width: 200px;
  height: 25px;
  border: 1px solid #ccc;  /* 边框 */
  border-radius: 4px;      /* 圆角 */
  padding: 5px 10px;       /* 内边距 */
  font-size: 14px;         /* 字体大小 */

}
</style>
