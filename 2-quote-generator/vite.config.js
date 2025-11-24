import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
        // proxy requests starting with /api/stoic to https://stoic.tekloon.net
        '/api/stoic': {
            target: 'https://stoic.tekloon.net',
            changeOrigin: true,
            secure: true,
            followRedirects: true,
            rewrite: (path) => path.replace(/^\/api\/stoic/, '')
        },
        // proxy requests starting with /api/zenquotes to https://zenquotes.io
        '/api/zenquotes': {
            target: 'https://zenquotes.io',
            changeOrigin: true,
            secure: true,
            // followRedirects: let the dev proxy follow remote redirects so the browser
            // doesn't receive a Location header pointing at the remote host (which
            // would cause the browser to follow the redirect cross-origin and hit CORS)
            followRedirects: true,
            rewrite: (path) => path.replace(/^\/api\/zenquotes/, '')
        }
        }
    }
})
