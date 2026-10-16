<script setup>
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)
</script>

<template>
  <main class="page-card">
    <div class="header-bar">
      <p class="eyebrow">文章资讯</p>
      <h1>文章列表</h1>
    </div>

    <el-list v-if="articles.length" class="article-list" border>
      <el-list-item v-for="article in articles" :key="article.id">
        <el-row type="flex" justify="space-between" class="article-row" :gutter="20">
          <el-col :xs="24" :lg="18">
            <div class="article-header">
              <el-tag size="small" type="primary">{{ article.category }}</el-tag>
              <h2>{{ article.title }}</h2>
            </div>
            <p class="summary">{{ article.summary }}</p>
            <div class="meta-row">
              <span>{{ article.createdAt }}</span>
              <span>{{ article.readTime }}</span>
            </div>
            <div class="tag-list">
              <el-tag v-for="tag in article.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
            </div>
          </el-col>

          <el-col :xs="24" :lg="6" class="action-col">
            <el-button type="primary" plain round>
              <RouterLink class="read-link" :to="{ name: 'article-detail', params: { id: article.id } }">
                阅读详情
              </RouterLink>
            </el-button>
          </el-col>
        </el-row>
      </el-list-item>
    </el-list>

    <el-empty v-else description="暂无文章" />
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

.article-list {
  --el-list-border-color: var(--border);
}

.article-row {
  width: 100%;
}

.article-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.article-header h2 {
  margin: 0;
  font-size: 1.12rem;
}

.summary {
  margin: 0 0 12px;
  color: var(--text-sub);
  line-height: 1.8;
}

.meta-row,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.action-col {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.read-link {
  color: inherit;
  text-decoration: none;
}
</style>
