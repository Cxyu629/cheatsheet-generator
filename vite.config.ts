import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  assetsInclude: ["**/*.md"],
  plugins: [solid()],
})
