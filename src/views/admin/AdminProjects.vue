<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../../stores/project'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
const isEditMode = ref(false)
const formError = ref('')
const successMessage = ref('')
const dialogVisible = ref(false)
const draft = ref({
  id: '',
  title: '',
  description: '',
  tech: '',
  tag: '',
  intro: '',
  summary: '',
  features: '',
})

const resetDraft = () => {
  isEditMode.value = false
  formError.value = ''
  dialogVisible.value = false
  draft.value = {
    id: '',
    title: '',
    description: '',
    tech: '',
    tag: '',
    intro: '',
    summary: '',
    features: '',
  }
}

const triggerSuccess = (message) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 2200)
}

const saveProjects = () => {
  projectStore.save()
  triggerSuccess('项目列表已保存')
}

const validateDraft = () => {
  const title = draft.value.title.trim()
  const description = draft.value.description.trim()
  const intro = draft.value.intro.trim()
  const summary = draft.value.summary.trim()

  if (!title) {
    formError.value = '项目名称不能为空。'
    return false
  }

  if (!description) {
    formError.value = '项目描述不能为空。'
    return false
  }

  if (!intro) {
    formError.value = '项目简介不能为空。'
    return false
  }

  if (!summary) {
    formError.value = '详细说明不能为空。'
    return false
  }

  formError.value = ''
  return true
}

const submitProject = () => {
  if (!validateDraft()) return

  const projectPayload = {
    id: draft.value.id || `project-${Date.now()}`,
    title: draft.value.title.trim(),
    description: draft.value.description.trim(),
    tech: draft.value.tech
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    fav: false,
    tag: draft.value.tag.trim() || '项目',
    intro: draft.value.intro.trim(),
    summary: draft.value.summary.trim(),
    features: draft.value.features
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    createAt: '2026',
  }

  if (isEditMode.value) {
    projectStore.updateProject(draft.value.id, projectPayload)
    triggerSuccess('项目已更新')
  } else {
    projectStore.addProject(projectPayload)
    triggerSuccess('项目已新增')
  }

  resetDraft()
}

const fillEditForm = (project) => {
  isEditMode.value = true
  formError.value = ''
  dialogVisible.value = true
  draft.value = {
    id: project.id,
    title: project.title,
    description: project.description,
    tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
    tag: project.tag || '',
    intro: project.intro || '',
    summary: project.summary || '',
    features: Array.isArray(project.features) ? project.features.join(', ') : '',
  }
}

const openCreateDialog = () => {
  resetDraft()
  dialogVisible.value = true
}

const deleteProject = (id) => {
  const target = projects.value.find((item) => item.id === id)
  if (!target) return

  const confirmed = window.confirm(`确认删除项目“${target.title}”？`)
  if (!confirmed) return

  projectStore.deleteProject(id)

  if (isEditMode.value && draft.value.id === id) {
    resetDraft()
  }
}
</script>

<template>
  <section class="admin-section">
    <h2>项目列表维护</h2>

    <div v-if="successMessage" class="status-banner success">{{ successMessage }}</div>
    <div v-if="formError" class="status-banner error">{{ formError }}</div>

    <div class="toolbar">
      <el-button type="primary" @click="openCreateDialog">新增项目</el-button>
      <el-button @click="saveProjects">保存列表</el-button>
    </div>

    <el-dialog v-model="dialogVisible" :title="isEditMode ? '编辑项目' : '新增项目'" width="760px">
      <el-form :model="draft" label-width="110px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input v-model="draft.title" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目描述">
              <el-input v-model="draft.description" placeholder="一句话介绍" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签（逗号分隔）">
              <el-input v-model="draft.tech" placeholder="Vue, Vite" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类别">
              <el-input v-model="draft.tag" placeholder="个人博客" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="项目简介">
              <el-input v-model="draft.intro" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细说明">
              <el-input v-model="draft.summary" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="功能列表">
              <el-input v-model="draft.features" type="textarea" :rows="3" placeholder="作品集, 数据展示, 交互设计" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetDraft">取消</el-button>
          <el-button type="primary" @click="submitProject">{{ isEditMode ? '保存修改' : '新增项目' }}</el-button>
        </span>
      </template>
    </el-dialog>

    <div class="project-list">
      <div v-for="item in projects" :key="item.id" class="project-item">
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <small>{{ item.tech.join(' / ') }}</small>
        </div>

        <div class="item-actions">
          <button type="button" class="edit-btn" @click="fillEditForm(item)">编辑</button>
          <button type="button" class="remove-btn" @click="deleteProject(item.id)">删除</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
}

.status-banner {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 600;
}

.status-banner.success {
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-banner.error {
  background: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.form-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group.full {
  grid-column: 1 / -1;
}

.field-group label {
  color: var(--text-sub);
  font-weight: 600;
}

.field-group input,
.field-group textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  background: var(--bg-card);
  color: var(--text-main);
}

.field-group input:focus,
.field-group textarea:focus {
  outline: none;
  border-color: #5d9cf5;
  box-shadow: 0 0 0 3px rgba(93, 156, 245, 0.12);
}

.actions-row {
  grid-column: 1 / -1;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn,
.ghost-btn,
.edit-btn,
.remove-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
}

.primary-btn {
  background: linear-gradient(135deg, var(--button-start), var(--button-end));
  color: var(--button-text);
}

.secondary-btn {
  background: rgba(148, 163, 184, 0.18);
  color: var(--text-main);
}

.ghost-btn {
  background: rgba(99, 102, 241, 0.08);
  color: #4f46e5;
}

.project-list {
  display: grid;
  gap: 12px;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
}

.project-item h3 {
  margin: 0 0 6px;
}

.project-item p,
.project-item small {
  margin: 0;
  color: var(--text-sub);
}

.item-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.edit-btn {
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.remove-btn {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
}
</style>
