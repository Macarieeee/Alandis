import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "i18n.spec.ts",
  use: { baseURL: "http://127.0.0.1:4175", channel: process.env.PLAYWRIGHT_CHANNEL },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4175 --strictPort",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: !process.env.CI,
  },
});
