import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-flow-renderer': 'react-flow-renderer/dist/esm/index.js',
    },
  },
});