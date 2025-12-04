<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
const tableData = [{
  "id":1,
  "事项": '吃饭',
  "金额": 100,
  "入账出账时间": '2023-01-01',
},{
  "id":2,
  "事项": '购物',
  "金额": 200,
  "入账出账时间": '2023-01-02',
},{
  "id":3,
  "事项": '出行',
  "金额": 300,
  "入账出账时间": '2023-01-03',
},{
  "id":4,
  "事项": '娱乐',
  "金额": 400,
  "入账出账时间": '2023-01-04',
},{
  "id":5,
  "事项": '其他',
  "金额": 500,
  "入账出账时间": '2023-01-05',
},{
  "id":6,
  "事项": '吃饭',
  "金额": 100,
  "入账出账时间": '2023-01-01',
},{
  "id":7,
  "事项": '购物',
  "金额": 200,
  "入账出账时间": '2023-01-02',
},{
  "id":8,
  "事项": '出行',
  "金额": 300,
  "入账出账时间": '2023-01-03',
}]
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
      <el-table-column prop="事项" label="事项" width="" />
      <el-table-column prop="金额" label="金额" width="" />
      <el-table-column prop="入账出账时间" label="入账出账时间" width="" />
    </el-table>
  </div>
  <div class="page">
    <span>
      共{{}}页
    </span>
    <el-pagination background layout="prev, pager, next" :total="1000" />
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
