/* eslint-disable no-undef */
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  // process.cwd() is the root directory
  const env = loadEnv(mode, process.cwd(), '')

  const target = env.VITE_BACKEND_URL || "http://127.0.0.1:8000"

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: target,
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: "localhost", // Rewrite cookie domain for local dev
          headers: {
            Accept: "application/json",
          },
        },
        "/sanctum": {
          target: target,
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: "localhost",
          headers: {
            Accept: "application/json",
          },
        },
        "/storage": {
          target: target,
          changeOrigin: true,
        },
      },
    },
  }
})
