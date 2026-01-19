<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getBillPageApi} from "@/api/getBillPageApi";
import { ArrowDown } from '@element-plus/icons-vue'

const keyword = ref('')
const current = ref(1)
const size = ref(5)
const total = ref(0)
const costType = ref('')
const tableData = ref([

])

const getBillPage = async () => {
  const res = await getBillPageApi({
    current : current.value,
    size : size.value,
    costType : costType.value
  })
  tableData.value = res.data.record
  total.value = res.data.total
  size.value = res.data.size
  current.value = res.data.current
}

const selectBillPage = (val:string) => {
  costType.value = val
  current.value = 1 //非常重要，每次查询回到第一页，像以后凡是涉及到点击查询都可以用此模版
  getBillPage()
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
  <div class="el-dropdown">
    <el-dropdown>
    <span class="el-dropdown-link">
      请选择费用类型
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="selectBillPage('水费')">水费</el-dropdown-item>
          <el-dropdown-item @click="selectBillPage('电费')">电费</el-dropdown-item>
          <el-dropdown-item @click="selectBillPage('其他')">其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="table-wrapper">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="80" align="center"/>
      <el-table-column prop="userId" label="用户id" width="80" align="center"/>
      <el-table-column prop="title" label="事项" width="" align="center"/>
      <el-table-column prop="type" label="类型" width="100" align="center">
        <template #default="{ row }">
          <div v-if="row.type === 2">支出</div>
          <div v-else>收入</div>
        </template>
      </el-table-column>

      <el-table-column prop="amount" label="金额" width="100" align="center"/>
      <el-table-column prop="createdTime" label="创建时间" width="" align="center"/>
      <el-table-column prop="updatedTime" label="更新时间" width="" align="center"/>
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
  width: 90%;
  max-width: 1100px;
  margin: 20px auto;
}

/* =========================
   el-table 行高
========================= */
:deep(.el-table__row) {
  height: 57px;
}

/* =========================
   分页
========================= */
.page{
  display: flex;
  justify-content: space-between;
  margin-right: 85px;
  margin-top: 30px;
}

/* =========================
   下拉选择器 - 仅修改下拉菜单项样式
========================= */
.el-dropdown{
  display: flex;
  margin-top: 20px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: #ec4899;
  background: #fdf2f8;
  padding: 6px 12px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  border: 1px solid #fbcfe8;
  transition: all .25s ease;
}

.example-showcase .el-dropdown-link:hover {
  background: #ec4899;
  color: #fff;
}

/* 下拉菜单项样式修改 */
:deep(.el-dropdown-menu) {
  background: #fff !important;
  border-radius: 14px;
  padding: 4px 0;
  border: 1px solid #fbcfe8;
}

:deep(.el-dropdown-menu__item) {
  color: #ec4899 !important;  /* 初始黑字 */
  background: #fff !important;  /* 初始白底 */
  transition: all .25s ease;
  padding: 8px 16px;
}

:deep(.el-dropdown-menu__item:hover),
:deep(.el-dropdown-menu__item:focus) {
  background: #ec4899 !important;  /* hover/active粉色背景 */
  color: #fff !important;  /* hover/active白色文字 */
}

/* =========================
   以下保持原有样式不变
========================= */
button{
  margin-left: 20px;
  width: 80px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #fbcfe8;
  background: #fdf2f8;
  color: #ec4899;
  cursor: pointer;
  font-weight: 500;
  transition: all .25s ease;
  outline: none;
}

button:hover{
  background: #ec4899;
  color: #fff;
}

button:focus,
button:active,
button:focus-visible{
  outline: none !important;
  box-shadow: none !important;
}

span{
  font-size: 16px;
  color: #fff;
  margin-left:85px;
}

:deep(.el-table){
  background: #fdf2f8;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(236,72,153,0.1);
}

:deep(.el-table__header),
:deep(.el-table__body-wrapper){
  background: transparent;
}

:deep(.el-table th){
  background: rgba(236,72,153,0.1);
  color: #ec4899;
  font-weight: 600;
  text-align: center;
}

:deep(.el-table td){
  background: rgba(255,255,255,0.9);
  color: #111;
  text-align: center;
  transition: all .25s ease;
}

:deep(.el-table tr:hover td){
  background: rgba(236,72,153,0.08);
}

:deep(.el-table th),
:deep(.el-table td){
  border-color: #fbcfe8;
}

:deep(.el-input__wrapper){
  background: #f3f4f6;
  box-shadow: none !important;
  border-radius: 14px;
  transition: all .25s ease;
}

:deep(.el-input__wrapper.is-focus){
  background: #fff;
  box-shadow: 0 0 0 4px rgba(236,72,153,.25) !important;
}

:deep(.el-radio__inner){
  border-color: #fbcfe8;
}

:deep(.el-radio__input.is-checked .el-radio__inner){
  background-color: #ec4899;
  border-color: #ec4899;
}

:deep(.el-radio__input.is-checked + .el-radio__label){
  color: #ec4899;
}

:deep(.el-button){
  background: #fdf2f8;
  color: #ec4899;
  border-color: #fbcfe8;
  transition: all .25s ease;
}

:deep(.el-button:hover){
  background: #ec4899;
  color: #fff;
  border-color: #ec4899;
}

:deep(.el-button:focus),
:deep(.el-button:active),
:deep(.el-button:focus-visible){
  outline: none !important;
  box-shadow: none !important;
}

:deep(.el-pagination){
  --el-pagination-bg-color: #fdf2f8;
  --el-pagination-button-color: #ec4899;
  --el-pagination-hover-color: #fff;
}

:deep(.el-pagination .el-pager li){
  background: #fdf2f8 !important;
  color: #ec4899 !important;
  font-size: 14px;
  transition: all .25s ease;
}

:deep(.el-pagination .el-pager li.is-active){
  background: #fdf2f8 !important;
  color: #ec4899 !important;
}

:deep(.el-pagination .el-pager li:hover){
  background: #ec4899 !important;
  color: #fff !important;
  font-size: 22px;
  font-weight: 600;
}

:deep(.el-pagination .el-pager li:hover + li),
:deep(.el-pagination .el-pager li:has(+ li:hover)){
  background: #f472b6 !important;
  color: #fff !important;
  font-size: 18px;
}

:deep(.el-pagination .el-pager li:hover + li + li),
:deep(.el-pagination .el-pager li:has(+ li + li:hover)){
  background: #fbcfe8 !important;
  color: #ec4899 !important;
  font-size: 16px;
}

:deep(.el-pagination button){
  background: #fdf2f8 !important;
  color: #ec4899 !important;
  transition: all .25s ease;
}

:deep(.el-pagination button:hover){
  background: #f472b6 !important;
  color: #fff !important;
}

:deep(.el-pagination__total){
  color: #fff !important;
}

</style>
