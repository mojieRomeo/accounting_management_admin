<script setup lang="ts">
import {computed, ref} from "vue"
import { UserFilled } from '@element-plus/icons-vue'
import { updateUserInfoApi } from "@/api/updateUserInfoApi"
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const form = ref({
  username: userStore.username, // 初始值来自 pinia
  password: ''
})

const tempAvatarUrl = ref('')
const avatarFile = ref<File | null>(null)
const avatarUrl = ref('')

const handleAvatarUpload = (file: any) => {
  // file.raw 就是上传的文件，avatarFile是Multpartfile类型
  avatarFile.value = file.raw
  tempAvatarUrl.value = URL.createObjectURL(file.raw)
}

  // 必须有computed，否则头像不会依据tempAvatarUrl和userStore.avatar的变化响应式更新
const displayAvatar = computed(() => {
  return tempAvatarUrl.value || userStore.avatar
})

const onSubmit = async () => {
  //FormData是专门用来装Multpartfile数据类型的，为了方便传参因此把username，password一起append进去
  const formData = new FormData()
  formData.append('username', form.value.username)
  formData.append('password', form.value.password)
  if(avatarFile.value){
    formData.append('avatar', avatarFile.value)
  }
  const res = await updateUserInfoApi(formData)
  avatarUrl.value = res.msg

  if (res.status === 200) {
    alert('更新成功')

    // 核心：只改这一行
    userStore.setUsername(form.value.username)
    userStore.setAvatar(avatarUrl.value)
  } else {
    alert('更新失败')
  }
}

const goBack = () => {
  window.history.back()
}
</script>


<template>
  <div class="form">
    <div class="form-card">
      <h1 class="title">用户中心</h1>

      <!-- 头像上传 -->
      <div class="avatar-row">
        <span class="avatar-label">头像</span>
        <!--:auto-upload="false" :show-file-list="false"是防止选取头像后立刻 POST 当前页面地址http://localhost:5173/home/center-->
        <el-upload :auto-upload="false" :show-file-list="false" :on-change="handleAvatarUpload">
          <el-avatar
              :src="displayAvatar"
              :icon="!displayAvatar ? UserFilled : undefined"
              size="large"
              shape="square"
          />
        </el-upload>
      </div>

      <!-- 表单 -->
      <el-form :model="form" label-width="auto" style="max-width: 300px">
        <div class="form-item">
          <el-form-item label="姓名">
            <!-- v-model 绑定 computed username -->
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" />
          </el-form-item>
        </div>
        <el-form-item class="form-button">
          <el-button @click="onSubmit" size="large">确定</el-button>
          <el-button size="large" @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.form {
  width: 90%;
  margin-left: 85px;
  margin-top: 20px;
}

/* 卡片 */
.form-card {
  width: 420px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题 */
.title {
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

/* 头像行 */
.avatar-row {
  display: flex;
  align-items: center;
  width: 300px;
  margin-bottom: 24px;
}

.avatar-label {
  width: 80px;
  color: #606266;
}

/* 表单项区域 */
.form-item {
  width: 300px;
}

/* ===== 关键：按钮间距真正生效的地方 ===== */
.form-button :deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
  gap: 20px;   /* 改这里，按钮间距一定生效 */
}

button:hover {
  background-color: #666; /* 悬停时背景颜色 */
  color: #fff; /* 悬停时文字颜色 */
}
</style>
