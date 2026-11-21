import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reutiliza el JSON del Sprint 1 sin duplicarlo en public/.
export default defineConfig({
  plugins: [react()],
  publicDir: 'data',
  base: './',
});
