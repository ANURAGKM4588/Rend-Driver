import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackBuildConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: process.env.NODE_ENV === "production" ? "/Rend-Driver/" : "/",
});
