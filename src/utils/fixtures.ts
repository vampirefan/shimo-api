export const routers_data = [
  {
    title: '设计器 Designer',
    path: '/Demo/Designer',
  },
  {
    title: '文件预览 ExcelFileView',
    path: '/Demo/ExcelFileView',
  },
  {
    title: '表单页 Sheet',
    path: '/Demo/Sheet',
  },
]
export const users_data = [
  {
    username: '模拟用户', // 模拟登录用户
    roles: ['admin'], // 模拟角色
    accessToken: 'mocked-access-token', // 模拟访问 token
    maxAge: 60, // 过期时间, 单位: 秒, 默认 1 分钟过期，
    refreshToken: 'mockedRefreshedToken.adminRefresh', // 模拟刷新 token
  },
]
