// types/nuxt.d.ts
import type { AxiosInstance } from 'axios'

export {}

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}

declare module 'nuxt/schema' {
  interface RuntimeNuxtApp {
    $axios: AxiosInstance
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}
