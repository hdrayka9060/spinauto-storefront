import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Storefront dev server runs on 5175 to avoid clashing with the CDMS admin app.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { port: 5175, host: true },
});
