<script setup>
import { computed } from 'vue'

const keyword = defineModel({ type: String, default: '' })

const props = defineProps({
  skills: {
    type: Array,
    required: true,
  },
})

const filteredSkills = computed(() => {
  const key = keyword.value.trim().toLowerCase()

  if (!key) {
    return props.skills
  }

  return props.skills.filter((item) => {
    return item.name.toLowerCase().includes(key) || item.category.toLowerCase().includes(key)
  })
})
</script>

<template>
  <div class="section">
    <h3>技能 / 兴趣</h3>

    <div class="search-box">
      <input v-model="keyword" type="text" placeholder="请输入关键词搜索技能..." />
    </div>

    <ul v-if="filteredSkills.length" class="skills">
      <li v-for="(item, index) in filteredSkills" :key="item.name + '-' + index">
        {{ item.name }} · {{ item.category }}
      </li>
    </ul>
    <div v-else class="empty">暂无匹配结果，请尝试其他关键词。</div>
  </div>
</template>

<style scoped>
.section {
  margin-top: 28px;
}

.section h3 {
  margin: 0 0 16px;
  color: var(--text-strong);
  font-size: 1.4rem;
}

.search-box {
  margin-bottom: 18px;
}

.search-box input {
  width: min(420px, 100%);
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: var(--bg-card);
  color: var(--text-main);
  transition: border-color 0.2s ease;
}

.search-box input:focus {
  border-color: #5d9cf5;
  box-shadow: 0 0 0 3px rgba(93, 156, 245, 0.12);
}

.skills {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skills li {
  background: var(--bg-tag);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 0.96rem;
}

.empty {
  margin-top: 10px;
  color: var(--text-muted);
}
</style>
