<script setup lang="ts">
import { codeToHtml } from 'shiki'

const apiBase = '/api'
const endPointUrl = ref('http://10.102.14.77:8081/api/endpoint')

const apiList = ref<any[]>([
  {
    title: '获取签名 signature',
    path: '/utils/signature',
    method: 'get',
  },
  {
    title: '获取 App 详情',
    path: '/sdk/app/detail',
    method: 'get',
  },
  {
    title: '更新 App 回调地址',
    path: '/sdk/app/endpoint',
    method: 'put',
    body: {
      url: endPointUrl.value,
    },
  },
  {
    title: '获取用于列表和席位状态',
    path: `/sdk/app/users`,
    method: 'get',
    params: {
      page: 1,
      size: 30,
    },
  },
])

const apiSelectedPath = ref(apiList.value[0].path)
const apiSelected = ref(apiList.value[0])
const apiRequestCodeHtml = ref('')
const apiResponseCodeHtml = ref('')

async function generateCode() {
  apiRequestCodeHtml.value = await codeToHtml(
    JSON.stringify(apiSelected.value, null, 2),
    { theme: 'min-light', lang: 'json' },
  )
  apiResponseCodeHtml.value = ''
}

async function doTest() {
  const testApi = apiSelected.value
  await $fetch(apiBase + testApi.path, {
    method: testApi.method,
    ...(testApi.params ? { params: testApi.params } : {}),
    ...(testApi.body ? { body: testApi.body } : {}),
    async onResponse({ response }) {
      apiResponseCodeHtml.value = await codeToHtml(
        JSON.stringify(response._data, null, 2),
        { theme: 'min-light', lang: 'json' },
      )
    },
  })
}

function doSelectApi() {
  apiSelected.value = apiList.value.find(api => api.path === apiSelectedPath.value)
  generateCode()
}
function doChangeEndPointUrl() {
  apiSelected.value.body = {
    url: endPointUrl.value,
  }
  generateCode()
}

generateCode()
</script>

<template>
  <div>
    <span>SDK 接口：</span>
    <el-select v-model="apiSelectedPath" class="w[250px]" @change="doSelectApi">
      <el-option v-for="item in apiList" :key="item.title" :label="item.title" :value="item.path">
        {{ item.title }}
      </el-option>
    </el-select>
    <el-input
      v-if="apiSelectedPath === '/sdk/app/endpoint'" v-model="endPointUrl" class="w[350px] mx"
      @change="doChangeEndPointUrl"
    >
      <template #prepend>
        App 回调地址
      </template>
    </el-input>
    <el-button class="ml" plain type="primary" @click="doTest">
      发送请求
    </el-button>
    <el-card class="mt">
      <h3>请求参数</h3>
      <div v-html="apiRequestCodeHtml" />
      <el-divider />
      <h3>返回值</h3>
      <div v-html="apiResponseCodeHtml" />
    </el-card>
  </div>
</template>

<style scoped>
:deep(.shiki) {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
