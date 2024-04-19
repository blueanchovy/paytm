import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = import.meta.env;
  return {
    plugins: [react()],
    server: {
      open: true,
    },
    define: {
      PAYTM_URL: JSON.stringify(env.PAYTMAPI_URL),
    },
  };
});
