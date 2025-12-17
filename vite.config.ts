import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' is '/' for user sites (username.github.io)
  // If this was a project site (username.github.io/repo), it would be '/repo/'
  base: '/', 
});