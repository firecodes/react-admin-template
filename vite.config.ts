import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  },
  // 配置开发服务器
  server: {
    host: '0.0.0.0',
    port: 8848,
    cors: true,
    open: process.env.BROWSER,
    proxy: {
      '/api': {
        target: 'http://localhost:8848',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
