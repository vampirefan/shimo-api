/**
 * 获取文件元信息 - 协同文档
 */
export default defineEventHandler(async () => {
  return {
    id: 'test-user',
    name: '测试用户',
    avatar: 'http://10.102.81.50/gitlab/uploads/-/system/user/avatar/10/avatar.png',
    email: 'user@test.com',
    teamGuid: 'test-team',
  }
})
