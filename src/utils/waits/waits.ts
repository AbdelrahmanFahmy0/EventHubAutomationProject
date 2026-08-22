import type { Page } from '@playwright/test';
import { logger } from '../logger/logger';

/**
 * Waits for a page to fully load by checking multiple load states.
 * Ensures the DOM is rendered, all network requests are complete, and the page is fully ready.
 * Waits for three states in sequence: 'domcontentloaded', 'networkidle', and 'load'.
 * @param {Page} page - The Playwright page object to wait for
 * @returns {Promise<void>}
 * @example
 * await waitForPageToLoad(page);\n * // Page is now fully loaded and ready for interaction
 */
export async function waitForPageToLoad(page: Page): Promise<void> {
    logger.info('Waiting for page to load');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('load');
}