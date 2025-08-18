// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: 'static'
  },
  modules: ['@pinia/nuxt'],
  vite: {
    server: {
      allowedHosts: true // or specify your ngrok domain
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  // Tell Nuxt to pre-render known routes
  routeRules: {
    '/**': { prerender: true }
  },
  app: {
    baseURL: '/app', // change if deploying to subfolder, e.g. '/myapp/'
    head: {
      title: 'Cratobyte | Sign in to your Cratobyte wallet', // default fallback title
      meta: [
        {
          name: "description",
          content:
            "Cratobyte is the safest next-generation crypto wallet — secure, simple, and built for everyone. Save, swap, and trade 1000+ cryptocurrencies and tokens with ultra-high security, password protection, and encrypted backups. Manage your digital assets easily from your phone or card, anywhere in the world.",
        },
        {
          name: "keywords",
          content:
            "Cratobyte, crypto wallet, secure crypto wallet, best crypto wallet, crypto trading, swap crypto, digital assets, cryptocurrency storage, password protection, encrypted backup, next generation wallet",
        },
        { name: "author", content: "Cratobyte" },
        { property: "og:title", content: "Cratobyte | The Safest Next-Generation Crypto Wallet" },
        {
          property: "og:description",
          content:
            "Experience the safest crypto wallet for everyone. Save, swap, and trade over 1000+ cryptocurrencies with Cratobyte — simple, secure, and built for the future.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://cratobyte.com" }, // replace with your domain
        { property: "og:image", content: "https://images.cratobyte.com/logo-light.png" }, // add your OG image
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://images.cratobyte.com/icon.png' },
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
