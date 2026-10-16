<script setup>
import { onMounted, ref, watch } from 'vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'

const isDark = ref(false)

const syncBodyTheme = () => {
  document.body.classList.toggle('theme-dark', isDark.value)
  document.body.classList.toggle('theme-light', !isDark.value)
}

watch(isDark, () => {
  syncBodyTheme()
}, { immediate: true })

onMounted(() => {
  syncBodyTheme()
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <div id="app-shell" :class="isDark ? 'theme-dark' : 'theme-light'">
    <SiteHeader :is-dark="isDark" @toggle-theme="toggleTheme" />
    <RouterView />
    <SiteFooter />
  </div>
</template>

<style scoped>
#app-shell {
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  color: var(--text-main);
  background: var(--bg-main);
  transition: background-color 0.25s ease, color 0.25s ease;
}
</style>
