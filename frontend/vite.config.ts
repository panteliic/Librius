import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr"; // Dodato za SVG podršku

export default defineConfig({
  plugins: [react(), svgr()], // Dodali smo svgr plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
});
