export const useDemoStore = defineStore('demo', () => {
  const code = ref('')

  return {
    code,
  }
})
