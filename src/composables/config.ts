import { useTitle } from '@vueuse/core'
import { type Action, ElMessageBox } from 'element-plus'
import { defineStore, skipHydrate } from 'pinia'

export const colorOptions = [
  { title: '庄重蓝', label: 'decent-blue', colorList: ['#f3f8fc', '#e5eef9', '#c5dcf2', '#92bde7', '#589cd8', '#327fc5', '#2364a6', '#1d5087', '#1c4570', '#1c3b5e', '#13263e'] },
  { title: '若依灰', label: 'ruo-yi-grey', colorList: ['#f5f7fa', '#eaeef4', '#d1dae6', '#a9b9d0', '#7b95b5', '#5b789c', '#476082', '#3a4d6a', '#324157', '#2e3a4c', '#1f2532'] },
  { title: '丛林绿', label: 'jungle-green', colorList: ['#f4f7fb', '#e8eff6', '#ccddeb', '#9fc2da', '#6ca1c4', '#4985ae', '#386c93', '#2e5776', '#294a63', '#273f53', '#1a2837'] },
]

export const useConfigStore = defineStore('config', () => {
  const appConfig = useAppConfig()
  const config = ref(useLocalStorage('app-config', appConfig))

  function initConfig() {
    setTitle(config.value.title ?? appConfig.title)
    setVersion(appConfig.version)
    setColorTheme(config.value.colorTheme ?? appConfig.colorTheme)
    setNavBreadcrumb(config.value.navBreadcrumb ?? appConfig.navBreadcrumb)
  }
  function resetConfig() {
    config.value = { ...appConfig }
    initConfig()
  }

  function setTitle(title: string) {
    useTitle().value = title
    config.value.title = title
  }

  function setVersion(version: string) {
    /* 版本号更新判断可以通过比对config.value.version(缓存中的版本号) 和 app.config.version(应用部署的版本号) 来实现 */
    if (config.value.version !== version) {
      ElMessageBox.alert(`当前版本：${config.value.version}，发现新版本：${version}，请点击确定进行更新！`, '网站更新', {
        callback: (action: Action) => {
          if (action === 'confirm') {
            config.value.version = version
            location.reload()
          }
        },
      })
    }
  }

  function setColorTheme(themeLabel: string) {
    const theme = colorOptions.find(doc => doc.label === themeLabel) || colorOptions[0]
    config.value.colorTheme = theme.label
    for (let i = 0; i < 11; i++) {
      const cssVar = `--admin-color-${i === 0 ? '50' : i === 10 ? '950' : `${i}00`}`
      useCssVar(cssVar).value = theme.colorList[i]
    }
    if (config.value.colorTheme === 'jungle-green') {
      useCssVar('--admin-sidebar-bg-color').value = 'var(--admin-color-600)'
      useCssVar('--admin-navbar-bg-color').value = 'var(--admin-color-700)'
    }
    else {
      useCssVar('--admin-sidebar-bg-color').value = 'var(--admin-color-800)'
      useCssVar('--admin-navbar-bg-color').value = 'var(--admin-color-900)'
    }
  }

  function setNavBreadcrumb(navBreadcrumb: boolean) {
    config.value.navBreadcrumb = navBreadcrumb
  }

  return {
    config: skipHydrate(config),
    initConfig,
    resetConfig,
    setTitle,
    setVersion,
    setColorTheme,
    setNavBreadcrumb,
  }
})
