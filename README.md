
react 后台管理项目
1. Hooks-Admin ,脚手架vite-react18-redux-ts （https://github.com/HalseySpicy/Hooks-Admin）
2. DLand-Team ,脚手架vite-react18-redux-ts（https://github.com/DLand-Team/moderate-react-admin/tree/master/frontend）
3. paicoding-admin，脚手架 React18、React-Router v6、React-Hooks、TypeScript、Vite3（https://github.com/itwanger/paicoding-admin）

### 默认项目模板 Hooks-Admin 搭建脚手架


### 三、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite2
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具…）
- 🚀 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🚀 使用 redux 做状态管理，集成 immer、react-redux、redux-persist 开发
- 🚀 集成了两套状态管理，master 分支使用的是 redux || redux-toolkit 分支使用的是 redux-toolkit
- 🚀 使用 TypeScript 对 Axios 二次封装 （错误拦截、常用请求封装、全局请求 Loading、取消重复请求…）
- 🚀 支持 Antd 组件大小切换、暗黑 && 灰色 && 色弱模式、i18n 国际化（i18n 暂时没配置所有文件）
- 🚀 使用 自定义高阶组件 进行路由权限拦截（403 页面）、页面按钮权限配置
- 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、面包屑导航
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）

熟练掌握react高阶组件()和高阶函数用法
 
- **Install：**

```text
npm install
cnpm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
npm run dev
npm run serve
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint

# prettier 格式化代码
npm run lint:prettier

# stylelint 格式化样式
lint:stylelint
```

- **commit：**

```text
# 提交代码（会自动执行 lint:lint-staged 命令）
npm run commit
```
 
### 六、文件资源目录 📚

```text
Hooks-Admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 常用 Hooks
│  ├─ language            # 语言国际化
│  ├─ layouts             # 框架布局
│  ├─ routers             # 路由管理
│  ├─ redux               # redux store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```
 