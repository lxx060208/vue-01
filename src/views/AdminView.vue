<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

const handleLogout = () => {
  userStore.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <el-container class="admin-shell">
    <el-header class="admin-header">
      <div>
        <p class="eyebrow">后台管理</p>
        <h1>内容管理中心</h1>
      </div>

      <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
    </el-header>

    <el-main>
      <el-menu :default-active="route.name" class="admin-menu" mode="horizontal" router>
        <el-menu-item index="admin-profile" :route="{ name: 'admin-profile' }">个人资料</el-menu-item>
        <el-menu-item index="admin-projects" :route="{ name: 'admin-projects' }">项目管理</el-menu-item>
        <el-menu-item index="admin-articles" :route="{ name: 'admin-articles' }">文章管理</el-menu-item>
      </el-menu>

      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.admin-shell {
  width: min(980px, calc(100% - 32px));
  margin: 24px auto 0;
  background: var(--bg-card);
  border-radius: 20px;
  box-shadow: 0 18px 35px var(--shadow);
  padding: 18px 0;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 30px;
}

.eyebrow {
  margin: 0 0 6px;
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

.admin-menu {
  margin: 12px 20px 18px;
  border-radius: 12px;
  border: 1px solid var(--border);
}
</style>
