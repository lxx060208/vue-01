<script setup>
import { computed, ref } from 'vue'
import { defaultSkills, readProfile } from '../data/portfolio'
import ProfileHeader from '../components/ProfileHeader.vue'
import SkillPanel from '../components/SkillPanel.vue'
import ProjectList from '../components/projects/ProjectList.vue'

const profile = ref(readProfile())
const keyword = ref('')
const showDetail = ref(false)

const detailEntries = computed(() => [
  { label: '爱好', value: profile.value.hobbies },
  { label: '目标', value: profile.value.goal },
  { label: '个人风格', value: profile.value.style },
])
</script>

<template>
  <main class="page-card">
    <ProfileHeader
      :profile="profile"
      :show-detail="showDetail"
      @toggle-detail="showDetail = !showDetail"
    />

    <SkillPanel v-model="keyword" :skills="defaultSkills" />

    <ProjectList />

    <div v-if="showDetail" class="detail-box">
      <div v-for="item in detailEntries" :key="item.label" class="detail-item">
        <strong>{{ item.label }}：</strong>{{ item.value }}
      </div>
    </div>
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
  transition: all 0.3s ease;
}

.detail-box {
  margin-top: 18px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px 20px;
  color: var(--text-main);
  line-height: 1.9;
}

.detail-item + .detail-item {
  margin-top: 8px;
}
</style>
