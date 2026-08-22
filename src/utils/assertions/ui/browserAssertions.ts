import { type Page, expect } from '@playwright/test';
import { logger } from '../../logger/logger';

/**
 * Asserts that the current page URL matches exactly the expected URL.
 * Performs an exact URL match including protocol and path.
 * @param {Page} page - The Playwright page object
 * @param {string} expectedUrl - The exact URL expected (e.g., 'https://example.com/login')
 * @returns {Promise<void>}
 * @throws {Error} If the current URL does not match the expected URL exactly
 * @example
 * await assertUrl(page, 'https://example.com/dashboard');
 */
export async function assertUrl(page: Page, expectedUrl: string): Promise<void> {
    logger.info(`Asserting that the URL is: ${expectedUrl}`);
    await expect(page).toHaveURL(expectedUrl);
}

/**
 * Asserts that the current page URL contains the specified substring.
 * Uses regex matching for partial URL verification.
 * Useful for checking URL patterns without requiring exact matches.
 * @param {Page} page - The Playwright page object
 * @param {string} expectedUrlPart - A substring or pattern to find in the URL (e.g., 'example.com')
 * @returns {Promise<void>}
 * @throws {Error} If the current URL does not contain the expected substring
 * @example
 * await assertUrlContains(page, 'example.com/dashboard');
 * await assertUrlContains(page, '/user/profile'); // Matches any URL containing this path
 */
export async function assertUrlContains(page: Page, expectedUrlPart: string): Promise<void> {
    logger.info(`Asserting that the URL contains: ${expectedUrlPart}`);
    await expect(page).toHaveURL(new RegExp(expectedUrlPart));
}

/**
 * Asserts that the page title matches exactly the expected title.
 * Checks the text content of the <title> tag in the page head.
 * @param {Page} page - The Playwright page object
 * @param {string} expectedTitle - The exact page title expected
 * @returns {Promise<void>}
 * @throws {Error} If the page title does not match exactly
 * @example
 * await assertTitle(page, 'Welcome to Dashboard');
 */
export async function assertTitle(page: Page, expectedTitle: string): Promise<void> {
    logger.info(`Asserting that the page title is: ${expectedTitle}`);
    await expect(page).toHaveTitle(expectedTitle);
}

/**
 * Asserts that the page title contains the specified substring.
 * Uses regex matching for partial title verification.
 * Useful for checking title patterns without requiring exact matches.
 * @param {Page} page - The Playwright page object
 * @param {string} expectedTitlePart - A substring or pattern to find in the page title
 * @returns {Promise<void>}
 * @throws {Error} If the page title does not contain the expected substring
 * @example
 * await assertTitleContains(page, 'Dashboard');
 * await assertTitleContains(page, 'Welcome'); // Matches any title containing 'Welcome'
 */
export async function assertTitleContains(page: Page, expectedTitlePart: string): Promise<void> {
    logger.info(`Asserting that the page title contains: ${expectedTitlePart}`);
    await expect(page).toHaveTitle(new RegExp(expectedTitlePart));
}

/**
 * Asserts that the page body contains the specified text.
 * Searches the entire page content (visible and hidden) for the text.
 * @param {Page} page - The Playwright page object
 * @param {string} expectedText - The text expected to be found on the page
 * @returns {Promise<void>}
 * @throws {Error} If the page does not contain the expected text
 * @example
 * await assertPageContainsText(page, 'Your order has been confirmed');
 */
export async function assertPageContainsText(page: Page, expectedText: string): Promise<void> {
    logger.info(`Asserting that the page contains text: ${expectedText}`);
    await expect(page.locator('body')).toContainText(expectedText);
}

/**
 * Asserts that the page body does not contain the specified text.
 * Verifies that the text is absent from the entire page content.
 * @param {Page} page - The Playwright page object
 * @param {string} unexpectedText - The text expected to be absent from the page
 * @returns {Promise<void>}
 * @throws {Error} If the page contains the unexpected text
 * @example
 * await assertPageDoesNotContainText(page, 'Error occurred');
 */
export async function assertPageDoesNotContainText(page: Page, unexpectedText: string): Promise<void> {
    logger.info(`Asserting that the page does not contain text: ${unexpectedText}`);
    await expect(page.locator('body')).not.toContainText(unexpectedText);
}