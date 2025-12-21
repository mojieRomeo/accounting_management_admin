<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getBillPageApi} from "@/api/getBillPageApi";
const keyword = ref('')
const current = ref(1)
const size = ref(10)
const total = ref(0)
const tableData = ref([

])

const getBillPage = async () => {
  const res = await getBillPageApi({
    current : current.value,
    size : size.value
  })
  tableData.value = res.data.record
  total.value = res.data.total
  size.value = res.data.size
  current.value = res.data.current
}

const pageChange = (val:any) => {
  current.value = val
  getBillPage()
}

onMounted(() => {
  getBillPage()
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
      <el-table-column prop="id" label="id" width="80" />
      <el-table-column prop="userId" label="用户id" width="80" />
      <el-table-column prop="title" label="事项" width="" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column prop="amount" label="金额" width="100" />
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
