/**
 * 获取 App 详情
 */
export default defineEventHandler(async () => {
  const { sdkBase, sdkAppId } = useRuntimeConfig().public
  const signature = await $fetch('/api/utils/signature')

  const requestUrl = `${sdkBase}/sdk/v2/api/license/apps/${sdkAppId}`
  const res = await $fetch(requestUrl, {
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        'X-Shimo-Signature': signature,
      }
    },
  })
  return res
})
