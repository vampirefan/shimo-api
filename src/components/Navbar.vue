<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <el-menu class="w-full px4 py3 flex gap-3 items-center">
    <AdminIcon name="svg-shimo" class="text-4xl mx" />
    <span>
      <span class="text-3xl font-bold">Shimo API</span>
      <el-tag class="mx vertical-top bg-gray-1">
        {{ appConfig.version }}
      </el-tag>
      <span class="text-lg ml">{ 针对石墨 SDK 回调接口的封装 }</span>
    </span>
    <div class="flex-auto" />

    <button title="返回首页" class="cursor-pointer border-none rounded p-2 hover:bg-active" @click="navigateTo('/')">
      <div class="i-ph-house text-2xl" />
    </button>

    <ColorSchemeToggle title="切换主题" />

    <button title="查看源码" class="cursor-pointer border-none rounded p-2 hover:bg-active" @click="openUrl('http://10.102.81.50/gitlab/admin3/shimo-api')">
      <div class="i-ph-gitlab-logo-duotone text-2xl" />
    </button>
  </el-menu>
</template>
