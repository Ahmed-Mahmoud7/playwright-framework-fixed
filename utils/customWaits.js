const logger = require('./logger');

class CustomWaits {
    static async waitForSelector(page, selector, timeout = 30000) {
        logger.info(`Waiting for selector: ${selector}`);
        await page.waitForSelector(selector, { timeout });
    }

    static async waitForTimeout(page, timeout = 5000) {
        logger.info(`Waiting for ${timeout} milliseconds`);
        await page.waitForTimeout(timeout);
    }
}

module.exports = CustomWaits;
