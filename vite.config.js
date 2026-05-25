import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // Serve files from static/ at the URL root so /assets/foo.jpg resolves in dev
  publicDir: "static",
  server: {
    port: 5173,
    open: "/?lang=en",
  },
});
