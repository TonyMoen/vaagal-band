import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Bundled into the build's server renderer instead of loaded from node_modules:
    // its package has no "exports" map, so Node would pick the CommonJS file
    noExternal: ["react-helmet-async"],
  },
})
