// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sitedowner.com', // 设置网站URL // Set website URL
  base: '/',
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: true, // 代码压缩 // Code minification
    },
    optimizeDeps: {
      include: ['tailwindcss'],
    },
  },
  // 配置全局页面元数据
  // Configure global page metadata
  integrations: [sitemap()],
  // 配置Markdown选项
  // Configure Markdown options
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});