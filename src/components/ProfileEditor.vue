<script setup>
const profile = defineModel({
  type: Object,
  required: true,
})

const emit = defineEmits(['save', 'cancel'])
</script>

<template>
  <el-card shadow="never" class="editor-card">
    <template #header>
      <div class="card-header">
        <span>编辑个人信息</span>
      </div>
    </template>

    <el-form :model="profile" label-width="100px" class="editor-form">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="12">
          <el-form-item label="姓名">
            <el-input v-model="profile.name" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item label="专业班级">
            <el-input v-model="profile.majorClass" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item label="学院">
            <el-input v-model="profile.college" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item label="兴趣方向">
            <el-input v-model="profile.direction" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="个人简介">
            <el-input v-model="profile.introduction" type="textarea" :rows="3" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="爱好">
            <el-input v-model="profile.hobbies" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="目标">
            <el-input v-model="profile.goal" type="textarea" :rows="3" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="个人风格">
            <el-input v-model="profile.style" type="textarea" :rows="3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="editor-actions">
      <el-button type="primary" @click="emit('save')">保存修改</el-button>
      <el-button @click="emit('cancel')">取消</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.editor-card {
  margin-top: 20px;
  border-radius: 16px;
}

.card-header {
  font-weight: 700;
  color: var(--text-strong);
}

.editor-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}
</style>
