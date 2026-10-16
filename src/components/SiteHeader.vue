<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-theme'])
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

const navigationItems = [
  { label: '首页', name: 'home' },
  { label: '项目', name: 'projects' },
  { label: '文章', name: 'articles' },
  { label: '后台', name: 'admin-profile' },
]

const goToLogin = () => {
  const redirectPath = route.fullPath && route.fullPath !== '/login' ? route.fullPath : '/admin/profile'
  router.push({ name: 'login', query: { redirect: redirectPath } })
}

const logout = () => {
  userStore.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="site-header">
    <div class="brand-block">
      <RouterLink :to="{ name: 'home' }" class="brand-link">
        <span class="brand-mark">V</span>
        <div>
          <p class="brand-label">个人主页</p>
          <small>Vue 3 实验项目</small>
        </div>
      </RouterLink>
    </div>

    <nav class="main-nav" aria-label="主导航">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.name"
        :to="{ name: item.name }"
        custom
        v-slot="{ navigate, isActive, href }"
      >
        <a :href="href" :class="['nav-link', { active: isActive } ]" @click="navigate">
          {{ item.label }}
        </a>
      </RouterLink>
    </nav>

    <div class="header-actions" aria-label="页面操作">
      <button class="btn ghost" type="button" @click="emit('toggle-theme')">
        {{ props.isDark ? '切换到亮色' : '切换到暗色' }}
      </button>
      <button v-if="!isLoggedIn" class="btn" type="button" @click="goToLogin">
        登录后台
      </button>
      <button v-else class="btn" type="button" @click="logout">
        退出登录
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(145, 176, 255, 0.2);
  box-shadow: 0 8px 22px rgba(38, 78, 168, 0.1);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: inherit;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, #62a5ff, #4a7ef0);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 8px 16px rgba(90, 130, 235, 0.25);
}

.brand-label {
  margin: 0 0 2px;
  font-size: 1.05rem;
  font-weight: 700;
}

.brand-block small {
  color: #64748b;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 999px;
  color: var(--text-main);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-link.active {
  background: linear-gradient(135deg, #62a5ff, #4a7ef0);
  color: #fff;
  box-shadow: 0 8px 16px rgba(90, 130, 235, 0.14);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #fff;
  background: linear-gradient(135deg, #62a5ff, #4a7ef0);
  box-shadow: 0 8px 16px rgba(90, 130, 235, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn.ghost {
  background: rgba(98, 165, 255, 0.12);
  color: #1f2937;
  border: 1px solid rgba(98, 165, 255, 0.25);
  box-shadow: none;
}

:global(body.theme-dark) .site-header {
  background: rgba(20, 20, 20, 0.76);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

:global(body.theme-dark) .brand-block small,
:global(body.theme-dark) .brand-label,
:global(body.theme-dark) .nav-link {
  color: #f5f5f5;
}

:global(body.theme-dark) .btn.ghost {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
  color: #f5f5f5;
}
</style>
