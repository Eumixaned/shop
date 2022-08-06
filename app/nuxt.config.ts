import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
  },
  modules: ['@pinia/nuxt'],
  vite: {
    server: {
      hmr: true,
      watch: {
        usePolling: true
      }
    },
  }
})
