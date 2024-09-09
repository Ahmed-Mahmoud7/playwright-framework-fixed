const logger = require('./logger');

class CustomAssertions {
    static async assertText(page, selector, expectedText) {
        const element = await page.locator(selector);
        const text = await element.innerText();
        logger.info(`Asserting text for selector ${selector}`);
        if (text !== expectedText) {
            logger.error(`Assertion failed: Expected text '${expectedText}' but found '${text}'`);
            throw new Error(`Expected text '${expectedText}' but found '${text}'`);
        }
        logger.info(`Assertion passed: Text is '${expectedText}'`);
    }

    static async assertURLContains(page, expectedURLPart) {
        const url = page.url();
        logger.info(`Asserting URL contains: ${expectedURLPart}`);
        if (!url.includes(expectedURLPart)) {
            logger.error(`Assertion failed: Expected URL to contain '${expectedURLPart}' but found '${url}'`);
            throw new Error(`Expected URL to contain '${expectedURLPart}' but found '${url}'`);
        }
        logger.info(`Assertion passed: URL contains '${expectedURLPart}'`);
    }
}

module.exports = CustomAssertions;
