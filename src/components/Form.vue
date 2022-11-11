<template>
    <el-form ref="ruleFormRef" label-position="right" :model="ruleForm" :rules="rules" label-width="120px"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="Title" prop="title" required>
            <el-input v-model="ruleForm.title" placeholder="Insert your title" />
        </el-form-item>
        <el-form-item label="Priority" prop="priority" required>
            <el-select v-model="ruleForm.priority">
                <el-option v-for="pr in PriorityOptions" :key="pr.key" :label="pr.value" :value='pr.value'
                    placeholder="Priority" />
            </el-select>
        </el-form-item>
        <el-form-item label="Due Date" required>
            <el-col :span="11">
                <el-form-item prop="dueDate">
                    <el-date-picker v-model="ruleForm.dueDate" type="date" label="Pick a date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="Description" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">{{ props.editMode === 'add' ? 'Create' : 'Save'
            }}
            </el-button>
            <el-button @click="resetForm(ruleFormRef)" v-if="props.editMode === 'add'">Reset</el-button>
            <el-button @click="emit('change1', false)" v-if="props.editMode === 'edit'">Close</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { PriorityOptions, type TodoItem } from '@/types/todo';
import { useTodoStore } from '@/stores/useTodoList';
import { v4 as uuidv4 } from 'uuid';
const props = defineProps({
    editMode: String,
    item: Object,
})
const store = useTodoStore();
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    id: uuidv4(),
    title: '',
    priority: undefined,
    dueDate: new Date,
    description: '',
})
if (!!props.item?.id) {
    ruleForm.id = props.item.id;
    ruleForm.title = props.item.title;
    ruleForm.priority = props.item.priority;
    ruleForm.dueDate = props.item.dueDate;
    ruleForm.description = props.item.description;

}

const rules = reactive<FormRules>({
    title: [
        { required: true, message: 'Please input title of your task', trigger: 'blur' },
    ],
    priority: [
        {
            required: true,
            message: 'Please select priority',
            trigger: 'change',
        },
    ],
    dueDate: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (props.editMode == 'add') {
        await formEl.validate((valid, fields) => {
            if (valid) {
                const item: TodoItem = {
                    ...ruleForm
                }
                store.addTodo(item)
                formEl.resetFields()
            } else {
                console.log('error submit!', fields)
            }
        })
    } else if (props.editMode == 'edit') {
        await formEl.validate((valid, fields) => {
            if (valid) {
                const item: TodoItem = {
                    ...ruleForm
                }
                store.updateItem(item)
                formEl.resetFields()
            } else {
                console.log('error submit!', fields)
            }
        })
        emit('change1', false)
    }
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const emit = defineEmits<{
    (e: 'change1', action: boolean): void
}>()
</script>
  