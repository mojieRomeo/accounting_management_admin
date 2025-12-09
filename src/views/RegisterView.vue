<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {registerApi} from "@/api/registerApi";

const username = ref('')
const password = ref('')
const router = useRouter()
const radio = ref()
const props = { value: 'id', label: 'role', disabled: 'unable' }

const options = [
  {
    id: 0,
    role: '用户',
  },
  {
    id: 1,
    role: '管理员',
  },
  {
    id: 2,
    role: '超级管理员',
  }
]

const register = async () => {
  if(username.value === '' || password.value === '') {
    alert('请输入用户名和密码')
    return
  }
  if(radio.value === undefined){
    alert('请选择角色')
    return
}

  const res = await registerApi({
    username: username.value,
    password: password.value,
    role: radio.value
  })
  if(res.status === 200){
    router.push('/login')
  }else{
    alert(res.msg)
  }
}

const goToLogin = () => {
  router.push('/login')
}


</script>

<template>
<div class="register">
  <h2>注册</h2>
  <input v-model="username" placeholder="用户名">
  <input v-model="password" placeholder="密码">
  <el-radio-group v-model="radio" :options="options" :props="props" />
  <button @click="register">注册</button>
  <p @click="goToLogin">已有账号，去登录</p>
</div>
</template>

<style scoped>
.register {
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

.register input,
.register button,
.register p {
  display: block;          /* 保证每个元素独占一行 */
}

button:hover {
  background-color: #666; /* 悬停时背景颜色 */
  color: #fff; /* 悬停时文字颜色 */
}

.register input {
  width: 200px;
  height: 25px;
  border: 1px solid #ccc;  /* 边框 */
  border-radius: 4px;      /* 圆角 */
  padding: 5px 10px;       /* 内边距 */
  font-size: 14px;         /* 字体大小 */

}
</style>