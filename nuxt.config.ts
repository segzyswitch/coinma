// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@pinia/nuxt'],
  vite: {
    server: {
      allowedHosts: true // or specify your ngrok domain
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    head: {
      title: 'Nuxt', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', defer: true }
      ]
    }
  },
  runtimeConfig: {
    // Private (only available on server side)
    secretKey: process.env.SECRET_KEY,

    // Public (available in client & server)
    public: {
      apiUrl: process.env.API_URL,
    }
  }
})
