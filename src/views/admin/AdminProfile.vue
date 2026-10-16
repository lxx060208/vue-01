<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import ProfileEditor from '../../components/ProfileEditor.vue'
import { readProfile, writeProfile } from '../../data/portfolio'

const profile = ref({ ...readProfile() })
const timelineItems = [
  { time: '2024', content: '加入前端开发学习路线', type: 'primary' },
  { time: '2025', content: '完成 Vue 3 与组件化项目实践', type: 'success' },
  { time: '2026', content: '持续完善个人主页与作品集展示', type: 'warning' },
]

const saveProfile = () => {
  writeProfile(profile.value)
  ElMessage.success('个人资料已更新')
}

const resetProfile = () => {
  profile.value = { ...readProfile() }
}
</script>

<template>
  <section class="admin-section">
    <h2>编辑公开资料</h2>

    <el-row :gutter="20">
      <el-col :xs="24" :lg="16">
        <ProfileEditor v-model="profile" @save="saveProfile" @cancel="resetProfile" />
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card shadow="never" class="timeline-card">
          <template #header>
            <div class="card-header">
              <span>成长时间线</span>
            </div>
          </template>

          <el-timeline>
            <el-timeline-item
              v-for="item in timelineItems"
              :key="item.time"
              :timestamp="item.time"
              :type="item.type"
            >
              {{ item.content }}
            </el-timeline-item>
          </el-timeline>

          <el-divider />

          <div class="tag-group">
            <el-tag type="primary">Vue 3</el-tag>
            <el-tag type="success">Pinia</el-tag>
            <el-tag type="warning">Router</el-tag>
            <el-tag type="info">Element Plus</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.admin-section {
  margin-top: 8px;
}

h2 {
  margin: 0 0 14px;
}

.card-header {
  font-weight: 700;
  color: var(--text-strong);
}

.timeline-card {
  border-radius: 16px;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
