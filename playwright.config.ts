import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  use: {
    headless: true,
    baseURL: process.env.PW_BASE_URL || 'http://localhost:3000',
    ignoreHTTPSErrors: true,
    actionTimeout: 0,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
