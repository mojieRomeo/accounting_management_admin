<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {adminPageApi} from "@/api/adminPageApi";
import {addUserApi} from "@/api/addUserApi";
import {updateUserApi} from "@/api/updateUserApi";
import {deleteUserApi} from "@/api/deleteUserApi";

const tableData = ref([

])
const keyword = ref('')
const current = ref(1)
const size = ref(10)
const total = ref(0)
const dialogFormVisible = ref(false)
const form = ref({
  id: null as number | null,
  username: '',
  password: '',
})
const radio = ref()
const props = { value: 'id', label: 'role', disabled: 'unable' }
const options = [
  {
    id:0,
    role:'用户',
  },
  {
    id:1,
    role:'管理员',
  }
]


const currentRole = Number(localStorage.getItem('role'))
const adminPage = async () => {
  const res = await adminPageApi({
        current: current.value,
        size: size.value,
        keyword: keyword.value
    })
    tableData.value = res.data.record
    total.value = res.data.total
}

const openDialog = () => {
  dialogFormVisible.value = true
  resetForm()
}

const resetForm = () => {
  form.value.id = null
  form.value.username = ''
  form.value.password = ''
  radio.value = ''
}

const updateUser = (row: any) => {
  dialogFormVisible.value = true
  form.value.id = row.id
  form.value.username = row.username
  form.value.password = ''//前段不回显密码
  radio.value = row.role
}

const deleteUser = async (row: any) => {
  const res = await deleteUserApi(row.id)
  if (res.status === 200) {
    alert('删除成功')
  }else {
    alert('删除失败')
  }
  adminPage()
}

const changeUser = async () => {
  if(form.value.id === null){
    const res = await addUserApi({
      username:form.value.username,
      password:form.value.password,
      role:radio.value
    })
    if (res.status === 200) {
      alert('添加成功')
    }else {
      alert('添加失败')
    }
  }else{
    const res = await updateUserApi({
      id:form.value.id,
      username:form.value.username,
      password:form.value.password,
      role:radio.value
    })
    if (res.status === 200) {
      alert('更新成功')
    }else {
      alert('更新失败')
    }
  }
  dialogFormVisible.value = false
  adminPage()
}

//翻页
const pageChange = (val: number) => {
  current.value = val
  adminPage()
}

//钩子方法，等所有组件全部挂载完毕后执行
onMounted(() => {
  adminPage()
})

</script>

<template>
  <div class="input">
    <el-input
        v-model="keyword"
        style="width: 240px"
        placeholder="请输入关键字"
        clearable
    />
    <button @click="adminPage">
      查找
    </button>
    <button @click="openDialog">
      新增
    </button>
  </div>
  <div class="table-wrapper">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100" align="center"/>
      <el-table-column prop="username" label="用户名" width="150" align="center"/>
      <el-table-column prop="role" label="角色" width="100" align="center">
        <template #default="{ row }">
            <div v-if="row.role === 0">用户</div>
            <div v-else>管理员</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <div v-if="row.status === 0">禁用</div>
          <div v-else>启用</div>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="200" align="center"/>
      <el-table-column prop="updatedTime" label="更新时间" width="200" align="center"/>
      <el-table-column label="操作" width="" align="center">
        <template #default="{ row }">
          <el-button  @click="updateUser(row)">编辑</el-button>
          <el-button  @click="deleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  <div class="page">
    <span>
      当前{{current}}页，共{{total}}条
    </span>
    <el-pagination background layout="prev, pager, next"
                   :total="total"
                   :page-size="size"
                   :current-page="current"
                   @current-change="pageChange"/>
  </div>
  <el-dialog v-model="dialogFormVisible" width="500">
    <div class="dialog">
      <el-form :model="form" label-width="80" class="form">
        <el-form-item label="用户名：">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码：">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="currentRole === 2" label="角色：">
          <el-radio-group v-model="radio" :options="options" :props="props"/>
        </el-form-item>
      </el-form>
    </div>

    <div class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button @click="changeUser">
        确定
      </el-button>
    </div>
  </el-dialog>


</template>

<style scoped>
.table-wrapper {
  width: 90%;            /* 表格宽度 */
  max-width: 1100px;     /* 最大宽度（防止太宽） */
  margin: 20px auto;     /* 自动水平居中 + 上下留空 */
}
.page{
  display: flex;
  justify-content: space-between;
  margin-right: 85px;
  margin-top: 30px;
}
.input{
  display: flex;
  margin-left: 85px;
  margin-top: 20px;
}
button{
  margin-left: 20px;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

button:hover {
  background-color: #666; /* 悬停时背景颜色 */
  color: #fff; /* 悬停时文字颜色 */
}
span{
  font-size: 16px;
  color: #666;
  margin-left:85px;
}
.dialog{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form{
  width: 300px; /* 表单宽度固定，让内容居中更稳定 */
  margin: 0 auto;
}

.dialog-footer{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px; /* 按钮之间的间距 */
}
el-button{
  display: flex;
}

</style>