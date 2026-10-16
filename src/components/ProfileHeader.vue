<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  showDetail: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-detail'])
</script>

<template>
  <div>
    <div class="profile">
      <img :src="profile.avatar" alt="个人头像" class="avatar" />
      <div class="profile-copy">
        <h1 class="name">{{ profile.name }}</h1>
        <div class="meta">
          <div>专业班级：{{ profile.majorClass }}</div>
          <div>学院：{{ profile.college }}</div>
          <div>兴趣方向：{{ profile.direction }}</div>
        </div>
      </div>
    </div>

    <div class="intro">
      {{ profile.introduction }}
    </div>

    <div class="toggle-wrap">
      <button type="button" class="btn" @click="emit('toggle-detail')">
        {{ showDetail ? '收起详情' : '展开详情' }}
      </button>
      <span v-show="showDetail" class="hint">详情已展开</span>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(145, 176, 255, 0.2);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(93, 156, 245, 0.16);
  box-shadow: 0 8px 18px rgba(76, 122, 200, 0.18);
}

.profile-copy {
  min-width: 0;
}

.name {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  color: var(--text-strong);
}

.meta {
  margin-top: 10px;
  line-height: 1.9;
  color: var(--text-sub);
  font-size: 1rem;
}

.intro {
  margin-top: 24px;
  background: var(--bg-soft);
  border-left: 5px solid #5d9cf5;
  border-radius: 12px;
  padding: 18px 20px;
  color: var(--text-main);
  line-height: 1.8;
}

.toggle-wrap {
  margin-top: 22px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  background: linear-gradient(135deg, var(--button-start), var(--button-end));
  color: var(--button-text);
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 16px rgba(90, 130, 235, 0.18);
}

.btn:hover {
  transform: translateY(-1px);
}

.hint {
  display: inline-block;
  background: var(--hint-bg);
  color: var(--hint-text);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.82rem;
}

@media (max-width: 640px) {
  .profile {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
