import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'

// GitHub Pages 处理：
// 1) 生成 404.html 作为 SPA fallback，解决子路由直接刷新 404 的问题
// 2) 生成 .nojekyll，避免 GitHub 用 Jekyll 忽略下划线开头的资源
function githubPagesPlugin(): Plugin {
  return {
    name: 'github-pages',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'docs')
      const indexPath = path.join(outDir, 'index.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, path.join(outDir, '404.html'))
      }
      fs.writeFileSync(path.join(outDir, '.nojekyll'), '')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目仓库部署在子路径下，需与仓库名一致
  base: '/xykbb/',
  plugins: [react(), githubPagesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
})
