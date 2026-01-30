import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx,js,jsx,vue}'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'cobertura'],
      reportsDirectory: './coverage',
    },
    reporters: [
      'default',
      ['junit', { outputFile: './coverage/junit.xml' }]
    ],
  },
});
