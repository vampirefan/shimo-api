/**
 * 获取文件元信息 - 协同文档
 */
export default defineEventHandler(async () => {
  return {
    id: 'test-user',
    name: '测试用户',
    avatar: 'https://avatars.githubusercontent.com/u/1901345?v=4',
    email: 'user@test.com',
    teamGuid: 'test-team',
  }
})
