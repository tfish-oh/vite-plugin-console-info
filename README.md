# 开发指南
以下指南将帮助你在本地机器上安装和运行该项目，进行开发和自测。

## 安装要求
- ` node 18 `
- ` npm 9 `

## 安装步骤
yarn add -D vite-plugin-env-info
# OR npm install -D vite-plugin-env-info

## 使用指南
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vitePluginEnvInfo from 'vite-plugin-env-info'

export default defineConfig({
  plugins: [
    vitePluginEnvInfo({
      projectName: 'xxx'
    })
  ],
})
```
# 贡献者
- 790028773@qq.com