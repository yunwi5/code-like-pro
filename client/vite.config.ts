import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        // Currently there is an issue with proxy.
        proxy: {
            '/api': 'http://localhost:8080/',
        },
    },
    plugins: [react()],
});
