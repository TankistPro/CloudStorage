import * as path from "path";
import react from '@vitejs/plugin-react';

import { defineConfig, splitVendorChunkPlugin } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
      build: {
        outDir: 'build'
      },
    resolve:{
        alias: {
            "@components": path.resolve(__dirname, 'src/components'),
            "@pages": path.resolve(__dirname, 'src/pages'),
            "@layouts": path.resolve(__dirname, 'src/layouts'),
            "@hooks": path.resolve(__dirname, 'src/hooks'),
            "@helpers": path.resolve(__dirname, 'src/helpers'),
            "@enums": path.resolve(__dirname, 'src/enums'),
            "@scss": path.resolve(__dirname, 'src/scss'),
            "@services": path.resolve(__dirname, 'src/services'),
            "@store": path.resolve(__dirname, 'src/store'),
            "@api": path.resolve(__dirname, 'src/api'),
            "@HomeComponents": path.resolve(__dirname, 'src/components/HomeComponents'),
            "@SettingComponents": path.resolve(__dirname, 'src/components/SettingComponents'),
            "@SharedComponents": path.resolve(__dirname, 'src/components/SharedComponents'),
            "@images": path.resolve(__dirname, 'src/images'),
            "@UI": path.resolve(__dirname, 'src/components/UI'),
            "@context": path.resolve(__dirname, 'src/context')
        }
    },
    plugins: [
        react(),
        splitVendorChunkPlugin()
    ],
})
