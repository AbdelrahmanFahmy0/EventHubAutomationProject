import type { Page, Locator, Frame } from '@playwright/test';
import { logger } from '../../logger/logger';
import { getUIBaseUrl } from '../../envConfig';

/**
 * Navigates to a specified URL in the current page.
 * Waits for the page to load completely before returning.
 * @param {Page} page - The Playwright page object
 * @param {string} url - The URL to navigate to (e.g., 'https://example.com')
 * @returns {Promise<void>}
 * @example
 * await navigate(page, 'https://example.com/login');
 */
export async function navigate(page: Page, url: string): Promise<void> {
    logger.info(`Navigating to URL: ${getUIBaseUrl()}${url}`);
    await page.goto(url);
}

/**
 * Refreshes the current page by reloading it.
 * Equivalent to pressing F5 or clicking the refresh button.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<void>}
 * @example
 * await refresh(page);
 */
export async function refresh(page: Page): Promise<void> {
    logger.info('Refreshing the page');
    await page.reload();
}

/**
 * Navigates back to the previous page in the browser history.
 * Equivalent to clicking the back button in the browser.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<void>}
 * @example
 * await goBack(page);
 */
export async function goBack(page: Page): Promise<void> {
    logger.info('Navigating back to the previous page');
    await page.goBack();
}

/**
 * Navigates forward to the next page in the browser history.
 * Equivalent to clicking the forward button in the browser.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<void>}
 * @example
 * await goForward(page);
 */
export async function goForward(page: Page): Promise<void> {
    logger.info('Navigating forward to the next page');
    await page.goForward();
}

/**
 * Handles and accepts JavaScript alert dialogs.
 * Optionally provides text input for prompt dialogs before accepting.
 * @param {Page} page - The Playwright page object
 * @param {string} [text] - Optional text to input in prompt dialogs
 * @returns {Promise<void>}
 * @example
 * await acceptAlert(page);
 * await acceptAlert(page, 'User input text'); // For prompt dialogs
 */
export async function acceptAlert(page: Page, text?: string): Promise<void> {
    logger.info('Accepting the alert dialog');
    page.on('dialog', dialog => dialog.accept(text));
}

/**
 * Dismisses JavaScript alert dialogs by clicking the cancel or close button.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<void>}
 * @example
 * await dismissAlert(page);
 */
export async function dismissAlert(page: Page): Promise<void> {
    logger.info('Dismissing the alert dialog');
    page.on('dialog', dialog => dialog.dismiss());
}

/**
 * Retrieves the message text from a JavaScript alert dialog.
 * Automatically dismisses the dialog after capturing the message.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<string>} The message text from the alert dialog
 * @example
 * const alertMessage = await getAlertMessage(page);
 * console.log(alertMessage); // "Are you sure?"
 */
export async function getAlertMessage(page: Page): Promise<string> {
    return new Promise<string>((resolve) => {
        page.on('dialog', async (dialog) => {
            const message = dialog.message();
            logger.info(`Retrieved alert dialog message: ${message}`);
            await dialog.dismiss();
            resolve(message);
        });
    });
}

/**
 * Retrieves the current URL of the page.
 * Useful for verifying page navigation and URL structure in tests.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<string>} The current URL
 * @example
 * const currentUrl = await getUrl(page);
 * console.log(currentUrl); // "https://example.com/dashboard"
 */
export async function getUrl(page: Page): Promise<string> {
    const currentUrl = page.url();
    logger.info(`Current URL: ${currentUrl}`);
    return currentUrl;
}

/**
 * Retrieves the title of the current page from the <title> tag.
 * Useful for verifying page load and title validation in tests.
 * @param {Page} page - The Playwright page object
 * @returns {Promise<string>} The page title
 * @example
 * const pageTitle = await getTitle(page);
 * console.log(pageTitle); // "Welcome to Example"
 */
export async function getTitle(page: Page): Promise<string> {
    const title = await page.title();
    logger.info(`Current page title: ${title}`);
    return title;
}

/**
 * Clicks an element that opens a new tab/window and switches to it.
 * Waits for the new page to open, brings it to front, and returns it.
 * @param {Page} page - The Playwright page object (current page)
 * @param {Locator} locator - The locator of the element that opens the new tab (e.g., a link with target="_blank")
 * @returns {Promise<Page>} The new page/tab object
 * @example
 * const newTab = await switchToNewTab(page, page.locator('a[target="_blank"]'));
 * // Now you can interact with newTab
 */
export async function switchToNewTab(page: Page, locator: Locator): Promise<Page> {
    const pagePromise = page.context().waitForEvent('page');
    await locator.click();
    const newPage = await pagePromise;
    await newPage.bringToFront();
    logger.info(`Switched to new tab: "${await getTitle(newPage)}"`);
    return newPage;
}

/**
 * Switches focus to a specific page/tab in multi-tab scenarios.
 * Brings the page to the foreground for interaction.
 * @param {Page} page - The Playwright page object to switch to
 * @returns {Promise<Page>} The same page object (now focused)
 * @example
 * await switchToPage(secondTab);
 * // Now secondTab is in focus and ready for interaction
 */
export async function switchToPage(page: Page): Promise<Page> {
    await page.bringToFront();
    logger.info(`Switched to page: "${await getTitle(page)}"`);
    return page;
}

/**
 * Closes a page/tab.
 * Useful for cleaning up multiple tabs or switching back to main window.
 * @param {Page} page - The Playwright page object to close
 * @returns {Promise<void>}
 * @example
 * await closePage(newTab);
 */
export async function closePage(page: Page): Promise<void> {
    logger.info(`Closing page: "${await getTitle(page)}"`);
    await page.close();
}

/**
 * Switches to an iframe by its name attribute.
 * Returns the frame object for further interactions within the iframe.
 * @param {Page} page - The Playwright page object
 * @param {string} frameName - The name attribute of the iframe to switch to
 * @returns {Promise<Frame | null>} The Frame object if found, null otherwise
 * @example
 * const frame = await switchToFrame(page, 'payment-iframe');
 * if (frame) {
 *   const submitBtn = frame.locator('#submitButton');
 *   await submitBtn.click();
 * }
 */
export async function switchToFrame(page: Page, frameName: string): Promise<Frame | null> {
    const frame = page.frame({ name: frameName });
    if (!frame) {
        logger.error(`Frame not found: ${frameName}`);
    }
    logger.info(`Switched to frame: "${frame?.name()}"`);
    return frame;
}

/**
 * Captures a full-page screenshot and saves it to the specified file path.
 * Useful for visual verification and debugging test failures.
 * @param {Page} page - The Playwright page object
 * @param {string} path - The file path where the screenshot should be saved (e.g., './screenshots/home.png')
 * @returns {Promise<void>}
 * @example
 * await takeScreenshot(page, './test-output/screenshots/login-page.png');
 */
export async function takeScreenshot(page: Page, path: string): Promise<void> {
    await page.screenshot({ path: path, fullPage: true });
    logger.info(`Screenshot taken and saved to: ${path}`);
}

/**
 * Logs in using a stored authentication token by injecting it into browser localStorage.
 * Stores the token in localStorage with the specified key, then refreshes the page to apply the token.
 * Useful for programmatically authenticating test sessions without going through the login UI.
 * @param {Page} page - The Playwright page object
 * @param {string} token - The authentication token (e.g., JWT or session token from a previous login)
 * @param {string} storageKey - The localStorage key where the token should be stored (e.g., 'authToken', 'token', 'jwt')
 * @returns {Promise<void>}
 * @example
 * // Using a token obtained from a login response
 * const loginResponse = await createAccount(request, 'user@example.com', 'password');
 * const tokenData = await loginResponse.json();
 * await loginWithToken(page, tokenData.token, 'authToken');
 * 
 * @example
 * // Directly using a known token for session restoration
 * await loginWithToken(page, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 'token');
 * // Page refreshes and server recognizes the authenticated session
 */
export async function loginWithToken(page: Page, token: string, storageKey: string): Promise<void> {
    logger.info(`Logging in using authentication token with storage key: ${storageKey}`);
    await page.evaluate(({ token, storageKey }) => { localStorage.setItem(storageKey, token); }, { token, storageKey });
    await refresh(page);
}