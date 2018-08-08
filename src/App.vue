<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
    <el-button>haha</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      checkList: ["选中且禁用", "复选框 A"]
    }
  }
}
</script>

<style>
body {
    width: 500px;
    background-color: red;
}

#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.el-header, .el-footer {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>
