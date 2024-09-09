const { devices } = require('@playwright/test');

module.exports = {
    testDir: './tests', // Directory where tests are located
    projects: [
        {
            name: 'Desktop Chrome',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Desktop Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'Desktop Safari',
            use: { browserName: 'webkit' }
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] }
        }
    ],
    workers: 4, // Allows parallel execution
    use: {
        headless: false, // Enable headless mode for all browsers
        screenshot: 'on', // Capture screenshots on both pass and fail
        video: 'on-first-retry' // Record video on the first retry of a failed test
    },
    reporter: [
        ['dot'], // Basic dot reporter
        ['json', { outputFile: 'test-results.json' }], // JSON reporter
        ['html', { open: 'never' }] // HTML reporter, without auto-opening the browser
    ]
};