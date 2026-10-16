<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/project'

const route = useRoute()
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const project = computed(() =>
  projects.value.find((item) => String(item.id) === String(route.params.id)) || null,
)
</script>

<template>
  <main v-if="project" class="page-card detail-page">
    <div class="crumbs">
      <RouterLink :to="{ name: 'projects' }">项目列表</RouterLink>
      <span>/</span>
      <span>{{ project.title }}</span>
    </div>

    <h1>{{ project.title }}</h1>

    <div class="meta-row">
      <span class="tag">{{ project.tag }}</span>
      <span class="date">创建于 {{ project.createAt }}</span>
    </div>

    <p class="intro">{{ project.intro }}</p>

    <ul class="feature-list">
      <li v-for="item in project.features" :key="item">{{ item }}</li>
    </ul>

    <p class="summary">{{ project.summary }}</p>

    <div class="actions">
      <RouterLink class="primary-btn" :to="{ name: 'projects' }">返回项目列表</RouterLink>
    </div>
  </main>

  <main v-else class="page-card empty-state">
    <h1>项目不存在</h1>
    <p>暂无该项目详情，您可以返回项目列表继续浏览。</p>
    <RouterLink class="primary-btn" :to="{ name: 'projects' }">返回项目列表</RouterLink>
  </main>
</template>

<style scoped>
.page-card {
  width: min(980px, calc(100% - 32px));
  margin: 24px auto 0;
  background: var(--bg-card);
  border-radius: 20px;
  box-shadow: 0 18px 35px var(--shadow);
  padding: 30px;
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.crumbs a {
  color: #4a7ef0;
  text-decoration: none;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.tag,
.date {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.12);
  color: #4a7ef0;
  font-size: 0.8rem;
  font-weight: 700;
}

.date {
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
}

.intro,
.summary {
  margin-top: 18px;
  color: var(--text-sub);
  line-height: 1.8;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
}

.feature-list li {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
}

.actions {
  margin-top: 22px;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--button-start), var(--button-end));
  color: var(--button-text);
  border-radius: 10px;
  padding: 10px 18px;
  text-decoration: none;
}

.empty-state {
  text-align: center;
}
</style>
