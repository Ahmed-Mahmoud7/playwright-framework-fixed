const {test, expect} = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const CustomActions = require('../utils/customActions');
const CustomAssertions = require('../utils/customAssertions');
const CustomWaits = require('../utils/customWaits');
const logger = require('../utils/logger');
const data = require(`../data/${process.env.ENV}.json`);  // Load environment-specific data

test.describe('Login Page Tests', () => {

    // Navigate to the base URL before each test
    test.beforeEach(async ({page}) => {
        const baseUrl = data.baseUrl;  // Access the base URL from the test data file
        logger.info(`Navigating to ${baseUrl}`);
        await page.goto(baseUrl);  // Navigate to the base URL
    });

    // Test case: successful login
    test('should login an existing user', async ({page}) => {
        const loginPage = new LoginPage(page);
        logger.info('Starting login test for an existing user');
        await loginPage.fillLoginForm(data.login.username, data.login.password);
        await CustomActions.clickButton(page, loginPage.loginButton);
        await CustomWaits.waitForSelector(page, '.inventory_list');
        await CustomAssertions.assertURLContains(page, '/inventory.html');
        const currentUrl = await page.url();
        expect(currentUrl).toContain('/inventory.html');
        logger.info(`Page URL after login: ${currentUrl}`);
        const inventoryItems = await page.$$('.inventory_item');
        expect(inventoryItems.length).toBeGreaterThan(0);
        logger.info(`Number of items in the inventory: ${inventoryItems.length}`);
        const sessionCookie = await page.context().cookies();
        expect(sessionCookie.length).toBeGreaterThan(0);
        logger.info('User session is active with cookies.');
    });

    // Test case: invalid login error message
    test('should display an error message for invalid login', async ({page}) => {
        const loginPage = new LoginPage(page);
        logger.info('Starting login test for an invalid user');
        await loginPage.fillLoginForm('invalid_user', 'wrong_password');
        await CustomActions.clickButton(page, loginPage.loginButton);
        await CustomWaits.waitForSelector(page, '[data-test="error"]');
        const errorMessage = await page.textContent('[data-test="error"]');
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
        logger.info(`Error message displayed: ${errorMessage}`);
        const loginButtonVisible = await page.isVisible(loginPage.loginButton);
        expect(loginButtonVisible).toBe(true);
        logger.info('Login button is still visible after invalid login attempt.');
    });
});
