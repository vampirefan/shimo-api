/**
 * 获取文件元信息 - 协同文档
 */
export default defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, 'id')
  return {
    id: fileId,
    name: '示例文档',
    permission: {
      commentable: true,
      editable: true,
      readable: true,
      copyable: true,
      exportable: true,
      manageable: true,
    },
    views: 100,
    creatorId: 'test-user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teamGuid: 'test-team',
  }
})
