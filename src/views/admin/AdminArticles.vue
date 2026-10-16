<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/article'

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)
const isEditMode = ref(false)
const formError = ref('')
const successMessage = ref('')
const dialogVisible = ref(false)
const draft = ref({
  id: '',
  title: '',
  summary: '',
  content: '',
  category: '',
  tags: '',
  readTime: '',
})

const resetDraft = () => {
  isEditMode.value = false
  formError.value = ''
  dialogVisible.value = false
  draft.value = {
    id: '',
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: '',
    readTime: '',
  }
}

const triggerSuccess = (message) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 2200)
}

const validateDraft = () => {
  if (!draft.value.title.trim()) {
    formError.value = '文章标题不能为空。'
    return false
  }

  if (!draft.value.summary.trim()) {
    formError.value = '文章简介不能为空。'
    return false
  }

  if (!draft.value.content.trim()) {
    formError.value = '文章正文不能为空。'
    return false
  }

  formError.value = ''
  return true
}

const submitArticle = () => {
  if (!validateDraft()) {
    return
  }

  const payload = {
    id: draft.value.id || `article-${Date.now()}`,
    title: draft.value.title.trim(),
    summary: draft.value.summary.trim(),
    content: draft.value.content.trim(),
    category: draft.value.category.trim() || '综合',
    tags: draft.value.tags
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    readTime: draft.value.readTime.trim() || '4 分钟',
    createdAt: new Date().toISOString().slice(0, 10),
  }

  if (isEditMode.value) {
    articleStore.updateArticle(draft.value.id, payload)
    triggerSuccess('文章已更新')
  } else {
    articleStore.addArticle(payload)
    triggerSuccess('文章已新增')
  }

  resetDraft()
}

const fillEditForm = (article) => {
  isEditMode.value = true
  formError.value = ''
  dialogVisible.value = true
  draft.value = {
    id: article.id,
    title: article.title,
    summary: article.summary,
    content: article.content,
    category: article.category,
    tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
    readTime: article.readTime,
  }
}

const openCreateDialog = () => {
  resetDraft()
  dialogVisible.value = true
}

const deleteArticle = (id) => {
  const target = articles.value.find((item) => item.id === id)
  if (!target) {
    return
  }

  const confirmed = window.confirm(`确认删除文章“${target.title}”？`)
  if (!confirmed) {
    return
  }

  articleStore.deleteArticle(id)
  if (isEditMode.value && draft.value.id === id) {
    resetDraft()
  }
}
</script>

<template>
  <section class="admin-section">
    <h2>文章列表维护</h2>

    <div v-if="successMessage" class="status-banner success">{{ successMessage }}</div>
    <div v-if="formError" class="status-banner error">{{ formError }}</div>

    <div class="toolbar">
      <el-button type="primary" @click="openCreateDialog">新增文章</el-button>
    </div>

    <el-dialog v-model="dialogVisible" :title="isEditMode ? '编辑文章' : '新增文章'" width="760px">
      <el-form :model="draft" label-width="110px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="文章标题">
              <el-input v-model="draft.title" placeholder="请输入文章标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章分类">
              <el-input v-model="draft.category" placeholder="前端开发" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="阅读时长">
              <el-input v-model="draft.readTime" placeholder="5 分钟" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签（逗号）">
              <el-input v-model="draft.tags" placeholder="Vue, Pinia, 状态管理" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文章简介">
              <el-input v-model="draft.summary" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文章正文">
              <el-input v-model="draft.content" type="textarea" :rows="6" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetDraft">取消</el-button>
          <el-button type="primary" @click="submitArticle">{{ isEditMode ? '保存修改' : '新增文章' }}</el-button>
        </span>
      </template>
    </el-dialog>

    <div class="article-list">
      <div v-for="item in articles" :key="item.id" class="article-item">
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <small>{{ item.category }} · {{ item.readTime }}</small>
        </div>

        <div class="item-actions">
          <button type="button" class="edit-btn" @click="fillEditForm(item)">编辑</button>
          <button type="button" class="remove-btn" @click="deleteArticle(item.id)">删除</button>
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
  font-weight: 600;
  color: var(--text-sub);
}

.field-group input,
.field-group textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  background: var(--bg-card);
  color: var(--text-main);
  resize: vertical;
}

.actions-row {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.primary-btn,
.ghost-btn,
.edit-btn,
.remove-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
}

.primary-btn {
  background: linear-gradient(135deg, var(--button-start), var(--button-end));
  color: var(--button-text);
}

.ghost-btn {
  background: rgba(148, 163, 184, 0.14);
  color: var(--text-main);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-soft);
}

.article-item h3 {
  margin: 0 0 8px;
  font-size: 1.05rem;
}

.article-item p {
  margin: 0 0 8px;
  color: var(--text-sub);
}

.article-item small {
  color: var(--text-muted);
}

.item-actions {
  display: flex;
  gap: 8px;
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
