import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      username: 'admin',
      displayName: '管理员',
    },
    isLoggedIn: typeof localStorage !== 'undefined' && localStorage.getItem('portfolio-auth') === 'true',
  }),

  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    username: (state) => state.profile.username,
  },

  actions: {
    hydrate() {
      if (typeof localStorage === 'undefined') {
        this.isLoggedIn = false
        return
      }

      this.isLoggedIn = localStorage.getItem('portfolio-auth') === 'true'
    },

    login(credentials = {}) {
      const username = String(credentials.username || '').trim()
      const password = String(credentials.password || '').trim()

      const valid = username === 'admin' && password === '123456'
      if (!valid) {
        return false
      }

      this.profile = {
        username,
        displayName: '管理员',
      }
      this.isLoggedIn = true

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('portfolio-auth', 'true')
      }
      return true
    },

    logout() {
      this.isLoggedIn = false
      this.profile = {
        username: 'admin',
        displayName: '管理员',
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('portfolio-auth', 'false')
      }
    },
  },
})
