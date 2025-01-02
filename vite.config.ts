import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/react-19-todo-list/',
  plugins: [react(), tsconfigPaths()],
})
