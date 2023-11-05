// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as vitest from "vitest";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
  },
});
