<script setup lang="ts">
import type { CascaderValue } from 'element-plus'

const route = useRoute()
const router = useRouter()

const demoStore = useDemoStore()
const { code } = storeToRefs(demoStore)
const currentDemo = ref('')

const demoOptions = computed<any[]>(() => {
  return router.options.routes.filter(route => route.path.includes('Demo'))
})

function goToDemo(path: CascaderValue) {
  return navigateTo(path as string)
}

watch(currentDemo, async () => {
  const fileContent: string = await $api('/utils/fetchRawCode', { method: 'post', body: { path: currentDemo.value } })
  code.value = fileContent
})
onMounted(() => {
  currentDemo.value = route.path
})
</script>

<template>
  <main class="h[100dvh] h-screen w-screen of-hidden grid grid-rows-[max-content_1fr]">
    <Navbar />
    <div class="grid grid-cols-2 h-screen border">
      <div>
        <div class="flex mb">
          <el-tag size="large" class="text-lg font-bold" type="info">
            代码示例:
          </el-tag>
          <el-cascader
            v-model="currentDemo"
            class="w[80%]"
            :props="{
              expandTrigger: 'hover',
              emitPath: false,
              label: 'name',
              value: 'path',
            }"
            :options="demoOptions"
            @change="goToDemo"
          />
        </div>

        <CodeBlock :code="code" />
      </div>

      <slot />
    </div>
  </main>
</template>
