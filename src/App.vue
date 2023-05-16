<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="windowSize > 1024">
          <Aside />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
import { onUnmounted, ref, onMounted } from "vue";
import { useLayout } from "./stores/useLayout";
const layout = useLayout();
const windowSize = ref(window.innerWidth);
onMounted(() => {
  window.addEventListener("resize", () => {
    windowSize.value = window.innerWidth;
  });
  layout.changeWindowSize(windowSize.value);
});
onUnmounted(() => {
  window.removeEventListener("resize", () => {
    windowSize.value = window.innerWidth;
  });
  layout.changeWindowSize(windowSize.value);
});
</script>
