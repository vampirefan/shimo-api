<script setup lang="ts">
// import { codeToHtml } from 'shiki'

const { height: windowHeight } = useWindowSize()

const router = useRouter()
const DemoList = computed(() => {
  return router.options.routes.filter(route => route.path.includes('Demo'))
})
</script>

<template>
  <div>
    <Navbar class="border-b-dashed border-1" />
    <el-scrollbar :height="windowHeight - 80">
      <div class="mt[50px] m-auto w[1000px] text-lg text-justify">
        <div class="w-full mt-10 border-b-dotted border-1">
          <h2 class="mb">
            <i class="el-icon mr-2 i-twemoji-blue-book" />
            介绍
          </h2>
        </div>

        <p>
          该项目是针对`石墨 SDK` 功能进行的封装，并给其提供需要的回调接口。
        </p>

        <div class="w-full mt-10 border-b-dotted border-1">
          <h2 class="mb">
            <i class="el-icon mr-2 i-twemoji-skateboard" />
            示例代码
          </h2>
        </div>
        <ul>
          <li v-for="demo in DemoList" :key="demo.path">
            <a
              class="color-green-6 hover:underline"
              :href="demo.path"
            >
              {{ demo.path }}
            </a>
          </li>
        </ul>

        <div class="w-full mt-10 border-b-dotted border-1">
          <h2 class="mb">
            <i class="el-icon i-twemoji-rocket" />
            组件版本号
          </h2>
        </div>
        <ul>
          <li>shimo-js-sdk: 1.2.1</li>
          <li>element-plus: 2.5.6</li>
          <li>vueuse: 10.7.2</li>
          <li>unocss: 0.58.4</li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.shiki) {
  /* font-size: 16pt; */
  margin: 2rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
