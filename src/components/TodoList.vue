<template>
    <el-card class="box-card">
        <el-table ref="multipleTableRef" :data="data" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="title" label="Title" width="180" />
            <el-table-column label="Due Date" width="180" v-if="windowSize > 600" >
                <template #default="scope">{{
                    moment(scope.row.dueDate).format("MMM Do YY")
                }}</template>
            </el-table-column>
            <el-table-column prop="priority" label="Priority" width="90" v-if="windowSize > 600">
                <template #default="scope">
                    <el-tag class="ml-2" :type="mappingPriorityToColor(scope.row.priority)">{{ scope.row.priority }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="Description" v-if="windowSize > 1024" />
            <el-table-column align="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="onClickEdit(scope.row)">Edit
                    </el-button>
                    <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">Remove
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Transition>
            <div class="delete-all" v-if="showDeleteMany">
                <el-button type="danger" :icon="Delete" circle @click="deleteListItem" />
            </div>
        </Transition>
    </el-card>
    <div v-if="Object.keys(currentItem).length !== 0">
        <EditModalVue :show="isOpenModal" :item="currentItem" />
    </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/useTodoList';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import moment from 'moment'
import type { ElTable } from 'element-plus';
import {
    Delete
} from '@element-plus/icons-vue'
import { TodoPriority, type TodoItem } from '@/types/todo';
import { readTodo } from '@/utils/localStorage';
import EditModalVue from './EditModal.vue';
import { useForm } from '@/stores/useForm';
function mappingPriorityToColor(p: TodoPriority) {
    switch (p) {
        case TodoPriority.low:
            return "warning";
        case TodoPriority.medium:
            return "success";
        case TodoPriority.high:
            return "danger";
        default:
            return "info";
    }
};
const store = useTodoStore();
const modalStore = useForm();

const tempData = readTodo();
if (!!tempData) {
    store.saveListItem(tempData);
}
const data = computed(() => { return store.getListItem })
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<TodoItem[]>([])
const isOpenModal = computed(() => { return !!modalStore.getIsOpen ? true : false })
const showDeleteMany = computed(() => { return !!multipleSelection.value.length })
const handleSelectionChange = (val: TodoItem[]) => {
    multipleSelection.value = val
}
function handleClick(id: string) {
    const arrayId: string[] = [id]
    store.deleteItem(arrayId)
}
function showDetailModal(action: boolean) {
    modalStore.changeOpen(action)
}
const currentItem = ref({})
function onClickEdit(item: TodoItem) {
    currentItem.value = item;
    showDetailModal(true);
}
const deleteListItem = () => {
    const listId = multipleSelection.value.map(x => x.id)
    store.deleteItem(listId);
}
const windowSize = ref(window.innerWidth)
onMounted(() => {
    window.addEventListener('resize', () => { windowSize.value = window.innerWidth })
})
onUnmounted(() => {
    window.removeEventListener('resize', () => { windowSize.value = window.innerWidth })
})
</script>
<style>
.delete-all {
    display: flex;
    align-items: center;
    margin-top: 15px;
    justify-content: center;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

@media screen and (max-width: 400px) {
    .el-card {
        height: max-content;
        max-height: 396px;
        overflow: auto;
    }
}
</style>
