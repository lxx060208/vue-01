<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page-card empty-state">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <RouterLink class="primary-btn" :to="{ name: 'home' }">返回首页</RouterLink>
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
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

p {
  color: var(--text-sub);
  margin-bottom: 18px;
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
</style>
