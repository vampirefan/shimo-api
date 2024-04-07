# Shimo Doc

## 简介

石墨 SDK 的接口实现及演示文档。

- **当前版本：** 0.0.1

## 环境框架

- Nuxt 3(集成 `Vue 3`)， **`Node.js` 版本要 `>18.18.0`**
- TypeScript, 拥抱 `any`, 用起来再说。
- pinia, 状态管理
- vueuse, 可复用的函数式组件
- eslint, 使用 `@antfu/eslint-config"` 自动格式化代码，统一代码风格, 不必再安装和配置 `prettier` 插件。
- czg, 交互式提交(commitizen)

## UI 框架

- Element-Plus
- unocss ("@unocss/nuxt")
  - tailwind preset
  - iconify ("@iconify-json")

## 开发

```sh
# 下载源码
clone
# 启用 yarn
npm install -g yarn # 或者尝试使用 corepack enable
# 安装依赖
yarn install
# 启动开发服务
yarn dev
```

## 项目结构

- server/api: 简易后端接口，包含一些工具接口，以及针对石墨 SDK 的回调接口。
  - utils/ 工具接口
    - fetchRawCode: 为实现教程文档的代码展示从 Git 上抓取源代码的代理接口
    - signature.get: 签名字符串的获取接口
  - endpoint/: 给石墨 SDK 的回掉接口
  - sdk/: 访问石墨 SDK 接口 
- src/: frame组件以及演示前端
  - app.vue: 前端主入口
  - utils/: 通用函数
  - public/: 静态文件
  - layouts/: 前端通用布局
  - pages/Frame: frame 组件页面
  - pages/Demo: 演示前端页面

## 如何使用


