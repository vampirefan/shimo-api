<script setup lang="ts">
import * as monaco from 'monaco-editor'

const props = defineProps(['code'])
const color = useColorMode()

const editorRef = ref<HTMLDivElement>()
const { width } = useWindowSize()

watch(
  () => editorRef.value,
  async (element) => {
    if (!element)
      return

    const editor = monaco.editor.create(element, {
      value: props.code,
      language: 'vue',
      theme: `github-${color.value}`,
      fontFamily: `Consolas, 'LXGW WenKai'`,
      readOnly: true,
      wordWrap: 'on',
      renderWhitespace: 'boundary',
      stickyScroll: { enabled: true },
      cursorBlinking: 'smooth',
      fontSize: 18,
    })

    watch(
      () => props.code,
      () => {
        editor.setValue(props.code)
        editor.revealLine(1)
      },
    )

    watch(color, () => monaco.editor.setTheme(`github-${color.value}`))
    watch(width, () => editor.layout())
  },
)
</script>

<template>
  <div ref="editorRef" class="h-full" />
</template>
