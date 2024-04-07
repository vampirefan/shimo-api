// https://nuxt.com/docs/api/configuration/nuxt-config

const baseUrl = '/'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  srcDir: 'src/',

  /* 模拟后端 */
  serverDir: 'server/',
  nitro: {
    devStorage: {
      db: {
        driver: 'fs',
        base: 'server/db',
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '/api',
      sdkBase: 'http://10.102.81.64',
      sdkAppId: 'sdkAppId',
      sdkSecret: 'sdkSecret',
    },
  },

  app: {
    baseURL: baseUrl,
  },

  /* 禁用载入的 nuxt loading 动画 */
  spaLoadingTemplate: false,

  experimental: {
    /* 加快首次启动速度 */
    watcher: 'chokidar',
    /* 生成静态文件 */
    payloadExtraction: false,
  },

  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/dark/css-vars.css',
    'lxgw-wenkai-webfont/style.css',
    '@/assets/css/main.css',
  ],

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
  ],

})
