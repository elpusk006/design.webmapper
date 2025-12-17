import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For https://elpusk006.github.io, base is '/'
  // If the repository name is NOT elpusk006.github.io (e.g. it is 'my-repo'), 
  // then base should be '/my-repo/'
  base: '/', 
  build: {
    outDir: 'dist',
  }
});
