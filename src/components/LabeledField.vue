<script setup>
const modelValue = defineModel({ type: String, default: '' })

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  rows: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input v-if="type === 'text'" v-model="modelValue" type="text" />
    <textarea v-else v-model="modelValue" :rows="rows" />
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--text-sub);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
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

.form-group input:focus,
.form-group textarea:focus {
  border-color: #5d9cf5;
  box-shadow: 0 0 0 3px rgba(93, 156, 245, 0.12);
}

.form-group textarea {
  min-height: 90px;
  resize: vertical;
}
</style>
