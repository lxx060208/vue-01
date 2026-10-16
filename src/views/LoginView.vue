<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const form = ref({
  username: 'admin',
  password: '123456',
})
const error = ref('')

const handleLogin = () => {
  const loginSucceeded = userStore.login(form.value)

  if (loginSucceeded) {
    const redirectPath = route.query.redirect && route.query.redirect !== '/home' && route.query.redirect !== '/projects'
      ? route.query.redirect
      : { name: 'admin-profile' }

    router.replace(redirectPath)
    return
  }

  error.value = '账号或密码不正确，演示账号：admin / 123456'
}
</script>

<template>
  <main class="page-card auth-page">
    <div class="auth-card">
      <p class="eyebrow">身份认证</p>
      <h1>后台管理登录</h1>

      <div class="form-group">
        <label>用户名</label>
        <input v-model="form.username" type="text" placeholder="请输入用户名" />
      </div>

      <div class="form-group">
        <label>密码</label>
        <input v-model="form.password" type="password" placeholder="请输入密码" />
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>

      <button type="button" class="primary-btn" @click="handleLogin">登录</button>
      <RouterLink class="secondary-btn" :to="{ name: 'home' }">返回首页</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.page-card {
  width: min(980px, calc(100% - 32px));
  margin: 24px auto 0;
  display: flex;
  justify-content: center;
}

.auth-card {
  width: min(480px, 100%);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 18px 35px var(--shadow);
  padding: 30px 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #4a7ef0;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 22px;
  font-size: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}

.form-group label {
  color: var(--text-sub);
  font-weight: 600;
}

.form-group input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
  background: var(--bg-soft);
  color: var(--text-main);
  outline: none;
}

.form-group input:focus {
  border-color: #5d9cf5;
  box-shadow: 0 0 0 3px rgba(93, 156, 245, 0.12);
}

.error-message {
  margin: 0 0 16px;
  color: #dc2626;
  font-size: 0.92rem;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  padding: 12px 14px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}

.primary-btn {
  background: linear-gradient(135deg, var(--button-start), var(--button-end));
  color: var(--button-text);
}

.secondary-btn {
  background: rgba(148, 163, 184, 0.18);
  color: var(--text-main);
}
</style>
