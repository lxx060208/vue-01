import { defineStore } from 'pinia'
import { readProjects, writeProjects } from '../data/portfolio'

const normalizeProject = (project = {}) => ({
  id: project.id || `project-${Date.now()}`,
  title: project.title || '新项目',
  description: project.description || '',
  tech: Array.isArray(project.tech) ? project.tech : String(project.tech || '').split(',').map((item) => item.trim()).filter(Boolean),
  fav: Boolean(project.fav),
  tag: project.tag || '项目',
  intro: project.intro || '',
  summary: project.summary || '',
  features: Array.isArray(project.features) ? project.features : String(project.features || '').split(',').map((item) => item.trim()).filter(Boolean),
  createAt: project.createAt || '2026',
})

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: readProjects(),
  }),

  getters: {
    featuredProjects: (state) => state.projects.filter((project) => project.fav),
    projectCount: (state) => state.projects.length,
    projectMap: (state) => Object.fromEntries(state.projects.map((project) => [project.id, project])),
  },

  actions: {
    hydrate() {
      this.projects = readProjects()
    },

    save() {
      this.projects = this.projects.map((project) => normalizeProject(project))
      writeProjects(this.projects)
    },

    addProject(payload) {
      const nextProject = normalizeProject({
        ...payload,
        id: payload.id || `project-${Date.now()}`,
      })

      this.projects = [nextProject, ...this.projects]
      writeProjects(this.projects)
      return nextProject
    },

    updateProject(id, payload) {
      this.projects = this.projects.map((project) => {
        if (String(project.id) !== String(id)) {
          return project
        }

        return normalizeProject({
          ...project,
          ...payload,
          id,
        })
      })

      writeProjects(this.projects)
      return this.getProjectById(id)
    },

    deleteProject(id) {
      this.projects = this.projects.filter((project) => String(project.id) !== String(id))
      writeProjects(this.projects)
    },

    toggleFavorite(id) {
      this.projects = this.projects.map((project) =>
        String(project.id) === String(id) ? { ...project, fav: !project.fav } : project,
      )
      writeProjects(this.projects)
      return this.getProjectById(id)
    },

    getProjectById(id) {
      return this.projects.find((project) => String(project.id) === String(id)) || null
    },
  },
})
