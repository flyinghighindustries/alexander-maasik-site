import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Two modes:
//   - `vite` (dev)   → plain Vite + main.tsx + localData/   (no Yext account needed)
//   - `vite build`   → loads @yext/pages plugin, generates per-entity per-locale HTML
//                      using the stream config in src/templates/location.tsx
export default defineConfig(async ({ command }) => {
  const plugins = [react()];

  if (command === "build") {
    const yextPlugin = (await import("@yext/pages/vite-plugin")).default;
    plugins.push(yextPlugin());
  }

  return {
    plugins,
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    publicDir: "static",
    server: {
      port: 5173,
      open: "/?lang=en",
    },
  };
});
