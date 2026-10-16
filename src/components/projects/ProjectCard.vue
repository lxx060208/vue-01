<script setup>
import { RouterLink } from 'vue-router'
import TagList from './TagList.vue'

const props = defineProps({
  project: { type: Object, required: true },
})

const emit = defineEmits(['view', 'toggle-fav'])
</script>

<template>
  <article class="project-card">
    <header>
      <h4>{{ project.title }}</h4>
      <button class="fav" @click="emit('toggle-fav', project.id)">
        {{ project.fav ? '★' : '☆' }}
      </button>
    </header>

    <p class="desc">{{ project.description }}</p>

    <footer>
      <slot name="meta">
        <TagList :tags="project.tech" />
      </slot>
      <div class="actions">
        <RouterLink
          class="ghost"
          :to="{ name: 'project-detail', params: { id: project.id } }"
          @click="emit('view', project.id)"
        >
          查看详情
        </RouterLink>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.project-card {
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 14px;
  background: linear-gradient(180deg, var(--bg-card), rgba(255, 255, 255, 0.03));
  box-shadow: 0 8px 18px var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px var(--shadow);
}

.project-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-card h4 {
  margin: 0;
  font-size: 1.08rem;
}

.project-card .fav {
  background: rgba(255, 193, 7, 0.12);
  border: 1px solid rgba(255, 193, 7, 0.4);
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  padding: 6px 8px;
  line-height: 1;
  transition: transform 0.2s ease;
}

.project-card .fav:hover {
  transform: scale(1.05);
}

.project-card .desc {
  margin: 12px 0 14px;
  color: var(--text-sub);
  line-height: 1.6;
}

.project-card footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.project-card .actions {
  display: flex;
  justify-content: flex-end;
}

.project-card .ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  color: #fff;
  padding: 8px 14px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(99, 102, 241, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.project-card .ghost:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.28);
}
</style>
