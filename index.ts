import type { Plugin, HtmlTagDescriptor } from 'vite'
import { fileURLToPath } from 'url';
import path ,{ dirname } from "path";
import fs from 'fs'
interface options {
  projectName?: string
}

export default function vitePluginEnvInfo(options: options): Plugin {
  // 流水线环境变量
  const env = process.env
  const __filename = fileURLToPath(import.meta.url);
  // 获取目录路径
  const __dirname = dirname(__filename);
  // 当前项目包信息
  const pkg: any = fs.readFileSync(process.cwd() + '/package.json', 'utf-8')
  // 输出的js
  const extStr: string = fs.readFileSync(path.join(__dirname, '../external.js'), 'utf-8')
  const { name, version } = JSON.parse(pkg)
  // 项目名称、包版本、打包时间等
  const __APP_INFO__ = {
    projectName: options.projectName || name,
    pkg: { name, version },
    lastBuildTime: new Date().toLocaleString()
  }
  // 拼接输出的js字符串 最后查到script标签里
  const HtmlStr: string = `const __GLOBAL_ENV_ = ${JSON.stringify(env)};
    const __APP_INFO__ = ${JSON.stringify(__APP_INFO__)};
    \n ${extStr}`

  return {
    name: 'vite-plugin-env-info',
    apply: 'build',
    config: () => ({
      define: {
          __APP_INFO__: JSON.stringify(__APP_INFO__),
          __GLOBAL_ENV_: env,
      },
    }),
    transformIndexHtml(): HtmlTagDescriptor[] {
      // 将htmlStr插到body里
      return [
        {
          tag: 'script',
          attrs: { defer: true },
          children: HtmlStr,
          injectTo: 'body'
        }
      ]
    }
  }
}
