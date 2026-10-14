import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  assetsInclude: ["**/*.JPG", "**/*.jpg", "**/*.jpeg", "**/*.png"],
  base: command === "serve" ? "/" : "/plantdiseasedetection/",
}));
