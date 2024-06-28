import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import {viteSingleFile} from "vite-plugin-singlefile";
import viteTsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile(), viteTsconfigPaths()],
  server: {
    host: true,
  }
});
