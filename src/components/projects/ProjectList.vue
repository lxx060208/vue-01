<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useProjectStore } from '../../stores/project'
import ProjectCard from './ProjectCard.vue'

const router = useRouter()
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const viewDetail = (id) => {
  router.push({ name: 'project-detail', params: { id } })
}

const toggleFav = (id) => {
  projectStore.toggleFavorite(id)
}
</script>

<template>
  <section class="projects">
    <h2>项目展示</h2>

    <div class="grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @view="viewDetail"
        @toggle-fav="toggleFav"
      >
        <template #meta>
          <small>创建于 {{ project.createAt }} · {{ project.tech.join(' / ') }}</small>
        </template>
      </ProjectCard>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
</style>
