<script setup>
const props = defineProps({
  tags: { type: Array, default: () => [] },
})
</script>

<template>
  <ul class="tags">
    <li v-for="(t, i) in props.tags" :key="t + '-' + i">{{ t }}</li>
  </ul>
</template>

<style scoped>
.tags{display:flex;gap:8px;flex-wrap:wrap;margin:0;padding:0;list-style:none}
.tags li{background:var(--bg-tag);padding:6px 10px;border-radius:999px;border:1px solid var(--border);font-size:0.9rem}
</style>
