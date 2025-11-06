const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 120 * 1000,
  
  // Test execution settings
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for page.goto('/')
    baseURL: 'https://chatbotai.com/',
    
    // Collect trace on failure
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: 60000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1280, height: 720 }
      },
    },
  ],

  // Output folder for test artifacts
  outputDir: 'test-results/',
});
