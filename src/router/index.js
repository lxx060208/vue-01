import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'
import ProjectListView from '../views/ProjectListView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ArticleListView from '../views/ArticleListView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import AdminProfile from '../views/admin/AdminProfile.vue'
import AdminProjects from '../views/admin/AdminProjects.vue'
import AdminArticles from '../views/admin/AdminArticles.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectListView,
      meta: { title: '项目展示' },
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleListView,
      meta: { title: '文章列表' },
    },
    {
      path: '/article/:id',
      name: 'article-detail',
      component: ArticleDetailView,
      props: true,
      meta: { title: '文章详情' },
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailView,
      props: true,
      meta: { title: '项目详情' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: '登录后台' },
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: { name: 'admin-profile' },
      component: AdminView,
      meta: { title: '后台管理', requiresAuth: true },
      children: [
        {
          path: 'profile',
          name: 'admin-profile',
          component: AdminProfile,
          meta: { title: '资料编辑' },
        },
        {
          path: 'projects',
          name: 'admin-projects',
          component: AdminProjects,
          meta: { title: '项目管理' },
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: AdminArticles,
          meta: { title: '文章管理' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '页面不存在' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.name === 'login' && userStore.isAuthenticated) {
    next({ name: 'admin-profile' })
    return
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
    return
  }

  next()
})

router.afterEach((to) => {
  const pageTitle = to.meta.title ? `${to.meta.title} | 个人主页` : '个人主页'
  document.title = pageTitle
})

export default router
