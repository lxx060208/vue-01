import { createPinia } from 'pinia'

const getStorageKey = (storeId) => `pinia-${storeId}`

const pinia = createPinia()

pinia.use(({ store }) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    const savedState = localStorage.getItem(getStorageKey(store.$id))
    if (savedState) {
      const parsed = JSON.parse(savedState)
      if (parsed && typeof parsed === 'object') {
        store.$patch(parsed)
      }
    }
  } catch (error) {
    console.warn(`Pinia state restore failed for ${store.$id}:`, error)
  }

  store.$subscribe(
    (_mutation, state) => {
      localStorage.setItem(getStorageKey(store.$id), JSON.stringify(state))
    },
    { detached: true },
  )
})

export default pinia
