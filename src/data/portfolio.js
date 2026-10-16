import avatarImg from '../assets/images/头像.jpg'

export const defaultProfile = {
  avatar: avatarImg,
  name: '李星鑫',
  majorClass: '计算机科学与技术 2024 级 1 班',
  college: '人工智能与计算机学院',
  direction: '前端开发 / 用户体验设计',
  introduction:
    '我热爱学习新技术，喜欢在实践中提升自己，并希望通过代码与设计创造更好的用户体验。',
  hobbies: '摄影、阅读、羽毛球、探索前沿技术',
  goal: '希望在大学期间不断积累项目经验，提升自己的前端开发与产品设计能力。',
  style: '热情、认真、善于沟通，喜欢在协作中不断成长。',
}

export const defaultSkills = [
  { name: 'Vue 3', category: '前端' },
  { name: 'HTML5', category: '前端' },
  { name: 'CSS3', category: '前端' },
  { name: 'JavaScript', category: '编程' },
  { name: '摄影', category: '兴趣' },
  { name: '阅读', category: '兴趣' },
  { name: '羽毛球', category: '运动' },
  { name: '团队协作', category: '软技能' },
]

export const defaultProjects = [
  {
    id: 'portfolio-home',
    title: '个人博客',
    description: '当前的个人项目',
    tech: ['Java'],
    fav: false,
    tag: '图书管理系统',
    intro: '主要展示自我介绍、技能和项目经验。',
    summary:
      '我是一名计算机科学与技术专业的学生，热爱前端开发和用户体验设计。这个项目是使用Java技术开发的一个图书管理系统。',
    features: ['个人介绍', '技能展示', '项目经历'],
    createAt: '2025.12',
  },
  {
    id: 'task-board',
    title: '个人博客',
    description: '页面项目',
    tech: ['Vue', 'Sortable'],
    fav: true,
    tag: '线上课程学习系统',
    intro: '一个用于管理和展示课程学习进度的系统。',
    summary: '该项目是一个线上课程学习系统，允许用户创建、编辑和管理课程学习任务，并通过拖拽功能调整任务顺序。',
    features: ['任务管理', '拖拽排序', '进度追踪'],
    createAt: '2026.06',
  },
]

export const defaultArticles = [
  {
    id: 'pinia-state',
    title: 'Vue 3 + Pinia 状态管理实战',
    category: '前端开发',
    summary: '如何通过 Pinia 组织全局状态，并让跨组件、跨页面的数据共享保持响应式。',
    content:
      'Pinia 是 Vue 3 官方推荐的状态管理库，适合管理用户状态、项目数据和文章列表。通过 state 声明共享数据，通过 getters 计算过滤后的数据，通过 actions 组织修改逻辑，可以让组件之间的状态同步更清晰。',
    tags: ['Vue', 'Pinia', '状态管理'],
    createdAt: '2026-10-10',
    readTime: '5 分钟',
  },
  {
    id: 'route-guard',
    title: '路由守卫与后台访问控制',
    category: '前端工程',
    summary: '结合登录状态和路由守卫实现后台页面的访问控制，未登录时自动跳转到登录页。',
    content:
      '前端路由守卫可以在进入后台页面前判断当前用户是否已登录。若未登录，则将用户重定向到登录页，同时保留原始访问地址，登录成功后再回到原页面，提升用户体验。',
    tags: ['Vue Router', '权限控制'],
    createdAt: '2026-10-11',
    readTime: '4 分钟',
  },
  {
    id: 'local-storage',
    title: '本地持久化存储的实践',
    category: '工程实践',
    summary: '使用 localStorage 持久化状态，可以让用户刷新页面后仍保留已编辑的数据与登录状态。',
    content:
      '在前端应用中，状态持久化通常用于保存用户偏好、登录状态，以及管理员编辑过的项目/文章内容。借助 localStorage 可以在页面刷新后恢复状态，减少重复操作。',
    tags: ['localStorage', '持久化'],
    createdAt: '2026-10-12',
    readTime: '6 分钟',
  },
]

export const STORAGE_KEYS = {
  profile: 'portfolio-profile',
  projects: 'portfolio-projects',
  articles: 'portfolio-articles',
  auth: 'portfolio-auth',
}

const readStorage = (key, fallback) => {
  if (typeof localStorage === 'undefined') {
    return fallback
  }

  try {
    const rawValue = localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch (error) {
    return fallback
  }
}

export const readProfile = () => readStorage(STORAGE_KEYS.profile, defaultProfile)

export const readProjects = () => readStorage(STORAGE_KEYS.projects, defaultProjects)

export const readArticles = () => readStorage(STORAGE_KEYS.articles, defaultArticles)

export const writeProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile))
  return profile
}

export const writeProjects = (projects) => {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects))
  return projects
}

export const writeArticles = (articles) => {
  localStorage.setItem(STORAGE_KEYS.articles, JSON.stringify(articles))
  return articles
}

export const isAuthenticated = () => {
  if (typeof localStorage === 'undefined') {
    return false
  }

  return localStorage.getItem(STORAGE_KEYS.auth) === 'true'
}

export const setAuthenticated = (value) => {
  if (typeof localStorage === 'undefined') {
    return false
  }

  localStorage.setItem(STORAGE_KEYS.auth, String(Boolean(value)))
  return value
}

export const getProjectById = (id) => {
  const projects = readProjects()
  return projects.find((project) => String(project.id) === String(id)) || null
}

export const getArticleById = (id) => {
  const articles = readArticles()
  return articles.find((article) => String(article.id) === String(id)) || null
}
