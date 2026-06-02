# KBB

基于 **Vite + React 19 + TypeScript** 的前端项目框架（脚手架）。当前仅搭建了目录结构与占位文件，业务代码待填充。

## 技术栈

- 构建工具：Vite 6
- 框架：React 19
- 语言：TypeScript 5
- 路由：React Router v7
- 代码规范：ESLint 9

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器 (默认 http://localhost:5173)
npm run build    # 生产构建
npm run preview  # 本地预览生产构建
npm run lint     # 代码检查
```

## 目录结构

```
kbb/
├── public/                 静态资源（直接拷贝，不经构建）
│   └── favicon.svg
├── src/
│   ├── assets/             图片、字体等需经构建的静态资源
│   ├── components/         组件
│   │   ├── common/         通用/可复用 UI 组件
│   │   └── layout/         布局组件
│   │       ├── AppLayout/  全局布局（Header + Outlet + Footer）
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── Sidebar/
│   ├── pages/              页面级组件（对应路由）
│   │   ├── Home/
│   │   └── NotFound/
│   ├── router/             路由配置
│   ├── hooks/              自定义 Hooks
│   ├── services/           接口请求封装
│   ├── store/              全局状态管理
│   ├── types/              全局类型定义
│   ├── utils/              工具函数
│   ├── constants/          全局常量
│   ├── styles/             全局样式
│   ├── main.tsx            应用入口
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts          含 @ -> src 路径别名
├── tsconfig*.json
├── eslint.config.js
└── package.json
```

## 路径别名

已配置 `@` 指向 `src`，例如：

```ts
import Header from '@/components/layout/Header'
```

## 环境变量

复制 `.env.example` 为 `.env` 并按需修改：

```
VITE_API_BASE_URL=/api
```
