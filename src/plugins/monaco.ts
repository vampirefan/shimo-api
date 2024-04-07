/* eslint-disable no-restricted-globals */
/* eslint-disable new-cap */
import * as monaco from 'monaco-editor'
import { getHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

export default defineNuxtPlugin(async () => {
  // 使用 shiki 为 monaco editor 注册 'vue' 语言
  const highlighter = await getHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['vue'],
  })
  monaco.languages.register({ id: 'vue' })
  shikiToMonaco(highlighter, monaco)

  // monaco editor 需要为全局环境注册语言解析的 worker
  self.MonacoEnvironment = {
    async getWorker(_: any, label: string) {
      switch (label) {
        case 'vue':
          return new htmlWorker()
        default:
          return new editorWorker()
      }
    },
  }
})
