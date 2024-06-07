// vite.config.ts
import { defineConfig } from "file:///C:/Users/25375/Desktop/SE/Peoject/Academic_Asistant/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/25375/Desktop/SE/Peoject/Academic_Asistant/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import Components from "file:///C:/Users/25375/Desktop/SE/Peoject/Academic_Asistant/frontend/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///C:/Users/25375/Desktop/SE/Peoject/Academic_Asistant/frontend/node_modules/unplugin-vue-components/dist/resolvers.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "~": resolve("./"),
      "@": resolve("./src")
    }
  },
  base: "./",
  // 打包路径
  server: {
    host: "0.0.0.0",
    port: 5173,
    // 服务端口号
    open: true,
    // 服务启动时是否自动打开浏览器
    cors: true
    // 允许跨域
    // 是否开启 https
    // https: false,
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyNTM3NVxcXFxEZXNrdG9wXFxcXFNFXFxcXFBlb2plY3RcXFxcQWNhZGVtaWNfQXNpc3RhbnRcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI1Mzc1XFxcXERlc2t0b3BcXFxcU0VcXFxcUGVvamVjdFxcXFxBY2FkZW1pY19Bc2lzdGFudFxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMjUzNzUvRGVza3RvcC9TRS9QZW9qZWN0L0FjYWRlbWljX0FzaXN0YW50L2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcclxuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksXHJcblxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBpbXBvcnRTdHlsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9KSxdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICd+JzogcmVzb2x2ZSgnLi8nKSxcclxuICAgICAgICAgICAgJ0AnOiByZXNvbHZlKCcuL3NyYycpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJhc2U6ICcuLycsIC8vIFx1NjI1M1x1NTMwNVx1OERFRlx1NUY4NFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICAgICAgcG9ydDogNTE3MywgLy8gXHU2NzBEXHU1MkExXHU3QUVGXHU1M0UzXHU1M0Y3XHJcbiAgICAgICAgb3BlbjogdHJ1ZSwgLy8gXHU2NzBEXHU1MkExXHU1NDJGXHU1MkE4XHU2NUY2XHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XHJcbiAgICAgICAgY29yczogdHJ1ZSwgLy8gXHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGXHJcbiAgICAgICAgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGIGh0dHBzXHJcbiAgICAgICAgLy8gaHR0cHM6IGZhbHNlLFxyXG4gICAgfVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1gsU0FBUyxvQkFBb0I7QUFDblosT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUlyQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFFSixXQUFXO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDUCxxQkFBcUI7QUFBQSxVQUNqQixhQUFhO0FBQUEsUUFDakIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUFFO0FBQUEsRUFDUCxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLFFBQVEsSUFBSTtBQUFBLE1BQ2pCLEtBQUssUUFBUSxPQUFPO0FBQUEsSUFDeEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxNQUFNO0FBQUE7QUFBQSxFQUNOLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFHVjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
