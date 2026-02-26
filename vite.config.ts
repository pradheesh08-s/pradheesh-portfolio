import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [],
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
