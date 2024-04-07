/**
 * 获取用户列表和席位状态
 */
export default defineEventHandler(async (event) => {
  const { sdkBase } = useRuntimeConfig().public
  const signature = await $fetch('/api/utils/signature')
  const query = getQuery(event)

  const requestUrl = `${sdkBase}/sdk/v2/api/license/users`
  const res = await $fetch(requestUrl, {
    params: {
      page: query.page || 1,
      size: query.size || 30,
    },
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        'X-Shimo-Signature': signature,
      }
    },
  })
  return res
})
