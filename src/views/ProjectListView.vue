<script setup>
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const toggleFav = (id) => {
  projectStore.toggleFavorite(id)
}
</script>

<template>
  <main class="page-card">
    <div class="header-bar">
      <p class="eyebrow">项目展示</p>
      <h1>全部项目</h1>
    </div>

    <el-row :gutter="20">
      <el-col v-for="project in projects" :key="project.id" :xs="24" :sm="12" :lg="8">
        <el-card shadow="hover" class="project-card">
          <template #header>
            <div class="card-header">
              <span>{{ project.title }}</span>
              <el-button :type="project.fav ? 'warning' : 'default'" circle @click="toggleFav(project.id)">
                {{ project.fav ? '★' : '☆' }}
              </el-button>
            </div>
          </template>

          <p class="desc">{{ project.description }}</p>

          <div class="meta-row">
            <el-tag v-for="tech in project.tech" :key="tech" size="small" type="primary" effect="plain">
              {{ tech }}
            </el-tag>
          </div>

          <div class="footer-actions">
            <small>创建于 {{ project.createAt }}</small>
            <el-button type="primary" size="small" round>
              <RouterLink class="detail-link" :to="{ name: 'project-detail', params: { id: project.id } }">
                查看详情
              </RouterLink>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
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

.header-bar {
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #4a7ef0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.3rem);
}

.project-card {
  margin-bottom: 20px;
  border-radius: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 700;
}

.desc {
  color: var(--text-sub);
  line-height: 1.7;
  margin: 0 0 12px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted);
}

.detail-link {
  color: inherit;
  text-decoration: none;
}
</style>
