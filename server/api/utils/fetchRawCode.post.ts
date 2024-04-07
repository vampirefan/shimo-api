/**
 * 从 Gitlab 上抓取代码的 Raw 文件
 */
export default defineEventHandler(async (event) => {
  const gitFileUrl = 'https://raw.githubusercontent.com/vampirefan/shimo-api/main/src/pages'
  const body = await readBody(event)
  const fileUrl = `${gitFileUrl + body.path}.vue`
  const fileContent = await $fetch(fileUrl)
  return fileContent
})
