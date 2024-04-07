/**
 * 创建协同文档
 */
export default defineEventHandler(async (event) => {
  const { sdkBase, sdkAppId } = useRuntimeConfig().public
  const signature = await $fetch(
    '/api/utils/signature',
    { query: { noscope: true, exp: '7d' } },
  )

  const body = await readBody(event)

  const type = body.type || 'document'
  const fileId = body.fileId || 'test-file-id'

  const requestUrl = `${sdkBase}/sdk/v2/api/files`
  const res = await $fetch(requestUrl, {
    method: 'post',
    mode: 'cors',
    query: {
      appId: sdkAppId,
      signature,
      token: 'test-token',
    },
    body: {
      type,
      fileId,
    },
    // onRequest({ options }) {
    //   options.headers = {
    //     ...options.headers,
    //     'X-Shimo-Signature': signature,
    //     'X-Shimo-Token': signature,
    //   }
    // },
  })
  return res
})
