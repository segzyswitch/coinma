import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = axios.create({
    // baseURL: config.public.apiUrl.replace(/\/$/, ''), // clean trailing slash
  })

  nuxtApp.provide('axios', api)
})
