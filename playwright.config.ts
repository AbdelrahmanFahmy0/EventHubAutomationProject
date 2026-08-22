import { defineConfig } from '@playwright/test';
import os from 'node:os';
import { getBrowserProject, getUIBaseUrl } from "./src/utils/envConfig";

/* dotenv config */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Directory for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-output/reports/test-results',
  /* Directory where the test files are located. */
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Number of workers */
  workers: process.env.CI ? undefined : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ["html", { open: 'never', outputFolder: 'test-output/reports/playwright-report' }],
    ["allure-playwright",
      {
        resultsDir: 'test-output/reports/allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          OS_Platform: os.platform(),
          OS_Release: os.release(),
          Node_Version: process.version,
          Environment: process.env.ENV?.toUpperCase(),
          URL: getUIBaseUrl()
        }
      }]
  ],
  /* Global setup to perform actions before all tests */
  globalSetup: require.resolve('./src/utils/setup/global-setup.ts'),
  /* The timeout for each test */
  timeout: parseInt(process.env.TEST_TIMEOUT_MS || '60000'),
  /* The timeout for each expect assertion */
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT_MS || '10000')
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like await page.goto('/'). */
    baseURL: getUIBaseUrl(),
    /* Collect trace when test fails. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    /* always take screenshot */
    screenshot: 'on',
    /* record video only when test fails */
    video: 'retain-on-failure',
    /* run tests in headed mode */
    headless: process.env.HEADLESS?.toLowerCase() === 'true' ? true : false,
    /* set test ID attribute */
    testIdAttribute: 'id',
    /* Ignore HTTPS errors for environments without valid certificates */
    ignoreHTTPSErrors: true,
    /* storage state path to use for saving all cookies, local storage, session storage */
    storageState: 'storage-state.json'
  },

  /* Configure projects for major browsers */
  projects: [
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    // },
    getBrowserProject()
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});