<script setup lang="ts">
import {computed, ref} from "vue"
import { UserFilled } from '@element-plus/icons-vue'
import { updateUserInfoApi } from "@/api/updateUserInfoApi"
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const form = ref({
  username: userStore.username,
  password: ''
})

const tempAvatarUrl = ref('')
const avatarFile = ref<File | null>(null)
const avatarUrl = ref('')

const handleAvatarUpload = (file: any) => {
  avatarFile.value = file.raw
  tempAvatarUrl.value = URL.createObjectURL(file.raw)
}

const displayAvatar = computed(() => {
  return tempAvatarUrl.value || userStore.avatar
})

const onSubmit = async () => {
  const formData = new FormData()
  formData.append('username', form.value.username)
  formData.append('password', form.value.password)
  if (avatarFile.value) {
    formData.append('avatar', avatarFile.value)
  }
  const res = await updateUserInfoApi(formData)
  avatarUrl.value = res.msg

  if (res.status === 200) {
    alert('更新成功')
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

      <div class="avatar-row">
        <span class="avatar-label">头像</span>
        <el-upload :auto-upload="false" :show-file-list="false" :on-change="handleAvatarUpload">
          <el-avatar
              :src="displayAvatar"
              :icon="!displayAvatar ? UserFilled : undefined"
              size="large"
              shape="square"
          />
        </el-upload>
      </div>

      <el-form :model="form" label-width="auto" style="max-width: 300px">
        <div class="form-item">
          <el-form-item label="姓名">
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

  <!-- ✅ 新增：人物装饰（不影响任何布局） -->
  <img
      src="@/assets/images/downloaded-image-2.jpg"
      alt="character"
      class="character"
      style="width: 30%"
  />
</template>

<style scoped>
.form {
  width: 90%;
  max-width: 420px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.title {
  margin-bottom: 72px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #f472b6;
}

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

.form-item {
  width: 300px;
}

.form-button :deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* 输入框 */
:deep(.el-input__wrapper) {
  background: #f3f4f6;
  border-radius: 14px;
  border: none;
  box-shadow: none !important;
  transition: all 0.25s ease;
}

:deep(.el-input__wrapper.is-focus) {
  background: #fff;
  box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.25) !important;
}

:deep(.el-input__inner),
:deep(.el-input__inner:focus) {
  outline: none !important;
  box-shadow: none !important;
}

/* 按钮 */
button,
:deep(.el-button) {
  background: #fdf2f8;
  color: #ec4899;
  border: 1px solid #fbcfe8;
  border-radius: 999px;
  padding: 10px 24px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.25s ease;
  outline: none;
  box-shadow: none !important;
}

button:hover,
:deep(.el-button:hover) {
  background: #ec4899;
  color: #fff;
  border-color: #ec4899;
}

/* =========================
   ✅ 人物 PNG 装饰
   不影响布局，仅视觉填充
========================= */
.character {
  position: fixed;
  right: 8%;
  bottom: 6%;
  width: 320px;
  pointer-events: none; /* 不影响点击 */
  user-select: none;
  opacity: 0.95;
}
.character {
  position: absolute;        /* 跟随页面滚动，不突兀 */
  right: -14vw;
  bottom: -10vh;

  width: 25vw;               /* ≈ 屏幕 1/4 */
  max-width: 960px;
  min-width: 620px;

  transform: scaleX(-1);     /* 朝向翻转：右 → 左 */
  opacity: 1;                /* 人物不透明度 */

  pointer-events: none;
  user-select: none;
}
</style>
