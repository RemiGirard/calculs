import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react-swc";
import {viteSingleFile} from "vite-plugin-singlefile";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteSingleFile(), viteTsconfigPaths()],
  server: {
    host: true,
  },
  esbuild: {
    drop: ['console'],
  },
  test: {
    environment: 'jsdom',
  },
});
