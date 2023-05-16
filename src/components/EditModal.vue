<template>
  <el-dialog v-model="props.show" title="Edit" width="30%" center destroy-on-close :show-close="false"
    :fullscreen="isFull">
    <FormVue editMode="edit" :item="props.item" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormVue from "./Form.vue";
import { useLayout } from "@/stores/useLayout";
const layout = useLayout();
const isFull = computed(() => {
  return layout.windowSize < 600 ? true : false;
});

const props = defineProps({
  show: Boolean,
  item: Object,
});
</script>
