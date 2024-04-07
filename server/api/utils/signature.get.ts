import * as jose from 'jose'

/**
 * 获取 App 签名 Signature
 */
export default defineEventHandler((event) => {
  const { sdkAppId, sdkSecret } = useRuntimeConfig().public
  const query = getQuery(event)
  const noscope = query.noscope || false
  const exp = query.exp?.toString() || '4min'
  const signature = new jose
    .SignJWT(noscope ? {} : { scope: 'license' })
    .setProtectedHeader({ alg: 'HS256', kid: sdkAppId })
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(sdkSecret))
  return signature
})
