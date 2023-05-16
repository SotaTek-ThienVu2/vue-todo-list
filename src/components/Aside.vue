<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="1" @click="collapse">
            <el-icon v-if="isCollapse">
                <DArrowRight />
            </el-icon>
            <div v-else>
                <el-icon>
                    <DArrowLeft />
                </el-icon>
                <span>Collapse</span>
            </div>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon>
                <RouterLink to="/">
                    <icon-menu />
                </RouterLink>
            </el-icon>
            <span>
                <RouterLink to="/">Home</RouterLink>
            </span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
                <RouterLink to="/about">
                    <document />
                </RouterLink>
            </el-icon>
            <span>
                <RouterLink to="/about">About</RouterLink>
            </span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
    Menu as IconMenu,
    DArrowLeft,
    DArrowRight,
    Document
} from '@element-plus/icons-vue'
const isCollapse = ref(true)
const collapse = () => (isCollapse.value = !isCollapse.value);
</script>