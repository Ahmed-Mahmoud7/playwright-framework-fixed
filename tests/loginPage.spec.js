const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const CustomActions = require('../utils/customActions');
const CustomAssertions = require('../utils/customAssertions');
const CustomWaits = require('../utils/customWaits');
const logger = require('../utils/logger');
const data = require(`../data/${process.env.ENV}.json`);  // Load environment-specific data

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        const baseUrl = data.baseUrl;  // Access the base URL from the test data file
        logger.info(`Navigating to ${baseUrl}`);
        await page.goto(baseUrl);  // Navigate to the base URL
    });

    test('should login an existing user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        logger.info('Starting login test for an existing user');
        await loginPage.fillLoginForm(data.login.username, data.login.password);

        await CustomActions.clickButton(page, loginPage.loginButton);
        await CustomWaits.waitForSelector(page, '.inventory_list');

        await CustomAssertions.assertURLContains(page, '/inventory.html');
        logger.info('Login test passed');
    });

    test('should display an error message for invalid login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        logger.info('Starting login test for an invalid user');
        await loginPage.fillLoginForm('invalid_user', 'wrong_password');

        await CustomActions.clickButton(page, loginPage.loginButton);
        await CustomWaits.waitForSelector(page, '[data-test="error"]');

        await CustomAssertions.assertText(page, '[data-test="error"]', 'Epic sadface: Username and password do not match any user in this service');
        logger.info('Invalid login test passed');
    });
});