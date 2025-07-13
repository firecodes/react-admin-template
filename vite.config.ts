// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { type ConfigEnv, defineConfig, loadEnv, type UserConfig } from "vite";

// import { wrapperEnv } from "./src/utils/getEnv";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd());
  // const viteEnv = wrapperEnv(env);
  return {
    plugins: [
      react(),
      // createHtmlPlugin({
      // 	inject: {
      // 		data: {
      // 			title: viteEnv.VITE_GLOB_APP_TITLE
      // 		}
      // 	}
      // }),
      // // * 使用 svg 图标
      // createSvgIconsPlugin({
      // 	iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      // 	symbolId: "icon-[dir]-[name]"
      // }),
      // // createStyleImportPlugin({
      // // 	libs: [
      // // 		{
      // // 			libraryName: "antd",
      // // 			esModule: true,
      // // 			resolveStyle: (name: any) => {
      // // 				return `antd/es/${name}/style/index`;
      // // 			}
      // // 		}
      // // 	]
      // // }),
      // // * EsLint 报错信息显示在浏览器界面上
      // eslintPlugin(),
      // // * 是否生成包预览
      // // viteEnv.VITE_REPORT && visualizer(),
      // // * gzip compress
      // viteEnv.VITE_BUILD_GZIP &&
      // viteCompression({
      // 	verbose: true,
      // 	disable: false,
      // 	threshold: 10240,
      // 	algorithm: "gzip",
      // 	ext: ".gz"
      // })
    ],
    // esbuild: {
    //   pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    // },
    // 配置@符号的路径指向
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    // 全局样式配置
    css: {
      preprocessorOptions: {
        less: {
          // 定制主题色
          // modifyVars: {
          // 	"primary-color": "#1DA57A",
          // },
          // additionalData: `@import "@/styles/var.less";`,
          javascriptEnabled: true
        }
      }
    },
    // 配置开发服务器
    server: {
      host: '0.0.0.0',
      port: 5173,
      cors: true,
      open: process.env.BROWSER,
      proxy: {
        // "/admin": {
        // 	target: "http://127.0.0.1:8080/",
        // 	changeOrigin: true,
        // 	rewrite: path => path.replace(/^\/api/, "")
        // },
        // "/api/admin": {
        // 	target: "https://paicoding.com/api/admin",
        // 	changeOrigin: true
        // }
        // "/smart-admin-api": {
        // 	target: "https://preview.smartadmin.vip/smart-admin-api/",
        // 	changeOrigin: true,
        // 	rewrite: (path) => path.replace(/^\/smart-admin-api/, ""),
        // },
        // "/api": {
        // 	target: "https://paicoding.com/api/",
        // 	changeOrigin: true,
        // 	rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        '/api': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 打包配置
    build: {
      //打包模式，terser去除console.log()和debugger,但速度更慢。默认为esbuild
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 配置打包后放置的文件名
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
          //   //超过500kb的文件单独打包
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // }
        }
      }
    }
  }
})
