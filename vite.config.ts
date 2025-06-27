// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800, // Naikkan limit peringatan menjadi 800 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Pisahkan vendor besar
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          reactVendor: ["react", "react-dom"]
        }
      }
    }
  }
});
