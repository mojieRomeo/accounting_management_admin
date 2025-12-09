<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {adminPageApi} from "@/api/adminPageApi";

const tableData = ref([

])
const current = ref(1)
const size = ref(10)
const total = ref(0)

const adminPage = async () => {
  const res = await adminPageApi({
        current: current.value,
        size: size.value,
    })
    tableData.value = res.data.record
    total.value = res.data.total
    current.value = res.data.current
    size.value = res.data.size
}

const pageChange = (val: number) => {
  current.value = val
  adminPage()
}

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
    <button>
      查找
    </button></div>
  <div class="table-wrapper">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100" />
      <el-table-column prop="username" label="用户名" width="150" />
      <el-table-column prop="role" label="角色" width="100" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="createdTime" label="创建时间" width="" />
      <el-table-column prop="updatedTime" label="更新时间" width="" />
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
  margin-top: 45px;
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
</style>