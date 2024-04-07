import { ElMessage } from 'element-plus'
import type { SearchParameters } from 'ofetch'

interface ApiOptions {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  body?: RequestInit['body'] | Record<string, any>
  params?: SearchParameters
  query?: SearchParameters
  headers?: any[]
}

export function $api<responseType>(url: string, opts?: ApiOptions) {
  const { apiBase } = useRuntimeConfig().public
  const target = `${apiBase}${url}`

  return $fetch<responseType>(target, {
    ...opts,
    // async onRequest({ options }) {
    //   if (userStore.authToken) {
    //     options.headers = {
    //       ...options.headers,
    //       token: userStore.authToken,
    //     }
    //   }
    // },
    async onRequestError({ error }) {
      if (error)
        ElMessage.error(`请求出错: ${error}`)
    },
    async onResponse({ response }) {
      const { success, code, msg, data } = response._data
      if (success || code === 200) {
        /* 将 返回数据中的 data 作为返回值 */
        response._data = data
      }
      else if (msg) {
        ElMessage.error(msg)
      }
    },
    async onResponseError({ error }) {
      if (error)
        ElMessage.error(`返回出错: ${error}`)
    },
  })
}
