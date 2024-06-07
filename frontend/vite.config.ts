import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),

        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false,
                }),
            ],
        }),],
    resolve: {
        alias: {
            '~': resolve('./'),
            '@': resolve('./src')
        }
    },
    base: './', // 打包路径
    server: {
        host: "0.0.0.0",
        port: 5173, // 服务端口号
        open: true, // 服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
        // 是否开启 https
        // https: false,
    }
})