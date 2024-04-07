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
      sdkBase: 'https://office.shimoapi.com',
      sdkAppId: '6c2f90468a254d6bb1dfefce6e9a91ee', //APP ID: 6c2f90468a254d6bb1dfefce6e9a91ee
      sdkSecret: 'b1378591a5274f7db6e743e99fffb525', //APP Secret: b1378591a5274f7db6e743e99fffb525 
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
