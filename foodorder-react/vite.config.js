import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Specify the port number here
  },
});
