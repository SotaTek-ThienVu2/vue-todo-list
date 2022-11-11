<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <TodoItemVue />
    </el-col>
    <el-col :span="16">
      <TodoList />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import TodoItemVue from '@/components/TodoItem.vue';
import TodoList from '@/components/TodoList.vue'
</script>
