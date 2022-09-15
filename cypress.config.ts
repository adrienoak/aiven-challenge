import { defineConfig } from "cypress";
import { API_URL } from "./src/api/service";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      URL: API_URL,
    },
  },
});
