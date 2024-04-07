/**
 * 从 Gitlab 上抓取代码的 Raw 文件
 */
export default defineEventHandler(async (event) => {
  const gitlabFileUrl = 'http://10.102.81.50/gitlab/admin3/shimo-api/-/raw/main/src/pages'
  const body = await readBody(event)
  const fileUrl = `${gitlabFileUrl + body.path}.vue`
  const fileContent = await $fetch(fileUrl)
  return fileContent
})
