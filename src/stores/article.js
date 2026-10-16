import { defineStore } from 'pinia'
import { readArticles, writeArticles } from '../data/portfolio'

const normalizeArticle = (article = {}) => ({
  id: article.id || `article-${Date.now()}`,
  title: article.title || '新文章',
  summary: article.summary || '',
  content: article.content || '',
  category: article.category || '综合',
  tags: Array.isArray(article.tags) ? article.tags : String(article.tags || '').split(',').map((item) => item.trim()).filter(Boolean),
  createdAt: article.createdAt || new Date().toISOString().slice(0, 10),
  readTime: article.readTime || '4 分钟',
})

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: readArticles(),
  }),

  getters: {
    articleCount: (state) => state.articles.length,
    articleMap: (state) => Object.fromEntries(state.articles.map((article) => [article.id, article])),
  },

  actions: {
    hydrate() {
      this.articles = readArticles()
    },

    save() {
      this.articles = this.articles.map((article) => normalizeArticle(article))
      writeArticles(this.articles)
    },

    addArticle(payload) {
      const nextArticle = normalizeArticle({
        ...payload,
        id: payload.id || `article-${Date.now()}`,
      })

      this.articles = [nextArticle, ...this.articles]
      writeArticles(this.articles)
      return nextArticle
    },

    updateArticle(id, payload) {
      this.articles = this.articles.map((article) => {
        if (String(article.id) !== String(id)) {
          return article
        }

        return normalizeArticle({
          ...article,
          ...payload,
          id,
        })
      })

      writeArticles(this.articles)
      return this.getArticleById(id)
    },

    deleteArticle(id) {
      this.articles = this.articles.filter((article) => String(article.id) !== String(id))
      writeArticles(this.articles)
    },

    getArticleById(id) {
      return this.articles.find((article) => String(article.id) === String(id)) || null
    },
  },
})
