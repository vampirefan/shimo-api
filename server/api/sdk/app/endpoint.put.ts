/**
 * 更新 App 回调地址
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const endpoint = body.url || 'http://10.102.14.77:8081/api/endpoint'

  const { sdkBase, sdkAppId } = useRuntimeConfig().public
  const signature = await $fetch('/api/utils/signature')

  const requestUrl = `${sdkBase}/sdk/v2/api/license/apps/${sdkAppId}/endpoint-url`
  const res = await $fetch(requestUrl, {
    method: 'put',
    mode: 'cors',
    body: {
      url: endpoint,
    },
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        'X-Shimo-Signature': signature,
        'X-Shimo-Token': signature,
      }
    },
    async onResponse({ response }) {
      if (response.status === 204)
        response._data = endpoint
    },
  })
  return res
})
