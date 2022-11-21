<template>
  <el-row :gutter="20">
    <el-col :lg="8">
      <TodoItemVue />
    </el-col>
    <el-col :lg="16">
      <TodoList />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import TodoItemVue from '@/components/TodoItem.vue';
import TodoList from '@/components/TodoList.vue'
</script>
<style>
.el-col{
  margin-bottom: 15px;
}
</style>