<script setup lang="ts">
import { ref } from "vue"
import { UserFilled } from '@element-plus/icons-vue'
import { updateUserInfoApi } from "@/api/updateUserInfoApi"
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const form = ref({
  username: userStore.username, // ⭐ 初始值来自 pinia
  password: ''
})

const avatarUrl = ref('')

const handleAvatarUpload = (file: any) => {
  avatarUrl.value = URL.createObjectURL(file.raw)
}

const onSubmit = async () => {
  const res = await updateUserInfoApi({
    username: form.value.username,
    password: form.value.password,
    avatarUrl: avatarUrl.value
  })

  if (res.status === 200) {
    alert('更新成功')

    // ⭐ 核心：只改这一行
    userStore.setUsername(form.value.username)
  } else {
    alert('更新失败')
  }
}
</script>


<template>
  <div class="form">
    <div class="form-card">
      <h1 class="title">用户中心</h1>

      <!-- 头像上传 -->
      <div class="avatar-row">
        <span class="avatar-label">头像</span>
        <el-upload :on-change="handleAvatarUpload">
          <el-avatar
              :src="avatarUrl"
              :icon="!avatarUrl ? UserFilled : undefined"
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
          <el-button size="large">取消</el-button>
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
