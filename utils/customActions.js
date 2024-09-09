const logger = require('./logger');

class CustomActions {
    static async clickButton(page, selector) {
        logger.info(`Clicking button with selector: ${selector}`);
        await page.click(selector);
    }

    static async typeData(page, selector, data) {
        logger.info(`Typing data into field with selector: ${selector}`);
        await page.fill(selector, data);
    }
}

module.exports = CustomActions;
