<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'

const route = useRoute()
const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const article = computed(() =>
  articles.value.find((item) => String(item.id) === String(route.params.id)) || null,
)
</script>

<template>
  <main v-if="article" class="page-card detail-page">
    <div class="crumbs">
      <RouterLink :to="{ name: 'articles' }">文章列表</RouterLink>
      <span>/</span>
      <span>{{ article.title }}</span>
    </div>

    <div class="meta-row">
      <span class="tag">{{ article.category }}</span>
      <span class="date">{{ article.createdAt }}</span>
      <span class="date">{{ article.readTime }}</span>
    </div>

    <h1>{{ article.title }}</h1>

    <p class="summary">{{ article.summary }}</p>

    <div class="tag-list">
      <span v-for="tag in article.tags" :key="tag" class="pill">{{ tag }}</span>
    </div>

    <article class="content-box">
      {{ article.content }}
    </article>

    <div class="actions">
      <RouterLink class="primary-btn" :to="{ name: 'articles' }">返回文章列表</RouterLink>
    </div>
  </main>

  <main v-else class="page-card empty-state">
    <h1>文章不存在</h1>
    <p>当前文章没有找到，您可以返回文章列表继续浏览。</p>
    <RouterLink class="primary-btn" :to="{ name: 'articles' }">返回文章列表</RouterLink>
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

.meta-row,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.tag,
.date,
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.summary {
  margin-top: 18px;
  color: var(--text-sub);
  line-height: 1.8;
}

.content-box {
  margin-top: 24px;
  padding: 20px;
  border-radius: 16px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-main);
  line-height: 2;
  white-space: pre-line;
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
