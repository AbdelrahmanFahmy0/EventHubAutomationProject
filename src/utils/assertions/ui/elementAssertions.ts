import { type Locator, expect } from '@playwright/test';
import { logger } from '../../logger/logger';
import { waitForPageToLoad } from '../../waits/waits';

////////////////////////////////////State Assertions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
 * Asserts that an element is visible in the viewport.
 * Throws an error if the element is hidden, detached, or outside the viewport.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is not visible
 * @example
 * await assertVisible(page.locator('#successMessage'), 'Success message');
 */
export async function assertVisible(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is visible`);
    await expect(locator).toBeVisible();
}

/**
 * Asserts that an element is hidden from view.
 * An element is considered hidden if it's not visible, detached, or has display:none.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is visible
 * @example
 * await assertHidden(page.locator('#errorModal'), 'Error modal');
 */
export async function assertHidden(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is hidden`);
    await waitForPageToLoad(locator.page());
    await expect(locator).toBeHidden();
}

/**
 * Asserts that a form element (button, input, select, etc.) is enabled and interactive.
 * Useful for verifying that form controls are ready for user interaction.
 * @param {Locator} locator - The locator pointing to the form element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is disabled
 * @example
 * await assertEnabled(page.locator('#submitButton'), 'Submit button');
 */
export async function assertEnabled(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is enabled`);
    await expect(locator).toBeEnabled();
}

/**
 * Asserts that a form element is disabled and not interactive.
 * Useful for verifying that form controls are in a disabled/read-only state.
 * @param {Locator} locator - The locator pointing to the form element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is enabled
 * @example
 * await assertDisabled(page.locator('#submitButton'), 'Submit button');
 */
export async function assertDisabled(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is disabled`);
    await expect(locator).toBeDisabled();
}

/**
 * Asserts that a checkbox or radio button element is checked/selected.
 * @param {Locator} locator - The locator pointing to the checkbox or radio button
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is not checked
 * @example
 * await assertChecked(page.locator('#termsCheckbox'), 'Terms and conditions checkbox');
 */
export async function assertChecked(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is checked`);
    await expect(locator).toBeChecked();
}

/**
 * Asserts that a checkbox or radio button element is not checked/selected.
 * @param {Locator} locator - The locator pointing to the checkbox or radio button
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is checked
 * @example
 * await assertNotChecked(page.locator('#newsletterCheckbox'), 'Newsletter subscription checkbox');
 */
export async function assertNotChecked(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is not checked`);
    await expect(locator).not.toBeChecked();
}

/**
 * Asserts that an input element is editable and can accept user input.
 * Checks that the element is enabled and not read-only.
 * @param {Locator} locator - The locator pointing to the input element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is not editable (disabled or read-only)
 * @example
 * await assertEditable(page.locator('#emailInput'), 'Email input field');
 */
export async function assertEditable(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is editable`);
    await expect(locator).toBeEditable();
}

/**
 * Asserts that an input element is not editable and cannot accept user input.
 * Verifies that the element is either disabled or read-only.
 * @param {Locator} locator - The locator pointing to the input element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element is editable
 * @example
 * await assertNotEditable(page.locator('#readOnlyField'), 'Read-only field');
 */
export async function assertNotEditable(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" is not editable`);
    await expect(locator).not.toBeEditable();
}

/////////////////////////////////////Content Assertions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
 * Asserts that an element has exactly the specified text content.
 * Performs an exact match on the element's text, trimming whitespace.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} expectedText - The exact text expected in the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element's text does not match exactly
 * @example
 * await assertText(page.locator('.header'), 'Welcome to Dashboard', 'Page header');
 */
export async function assertText(locator: Locator, expectedText: string, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" has the expected text: "${expectedText}"`);
    await expect(locator).toHaveText(expectedText);
}

/**
 * Asserts that an element's text contains the specified substring.
 * Performs a partial match, allowing for other text before or after the substring.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} expectedSubstring - The substring expected to be found in the element's text
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the element's text does not contain the substring
 * @example
 * await assertTextContains(page.locator('.message'), 'Success', 'Status message');
 */
export async function assertTextContains(locator: Locator, expectedSubstring: string, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" contains the expected substring: "${expectedSubstring}"`);
    await expect(locator).toContainText(expectedSubstring);
}

/**
 * Asserts that an input element (text, textarea, select) has the specified value.
 * Checks the element's current value attribute or input value.
 * @param {Locator} locator - The locator pointing to the input element
 * @param {string} expectedValue - The expected value of the input element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the input value does not match the expected value
 * @example
 * await assertInputValue(page.locator('#emailInput'), 'user@example.com', 'Email input');
 */
export async function assertInputValue(locator: Locator, expectedValue: string, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" has the expected input value: "${expectedValue}"`);
    await expect(locator).toHaveValue(expectedValue);
}

/**
 * Asserts that an element has a specific attribute with an exact value.
 * Useful for verifying element properties like href, src, data-* attributes, etc.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} attributeName - The name of the attribute to check (e.g., 'href', 'class', 'data-id')
 * @param {string} expectedValue - The exact expected value of the attribute
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the attribute value does not match or attribute doesn't exist
 * @example
 * await assertAttribute(page.locator('a.link'), 'href', 'https://example.com', 'Navigation link');
 */
export async function assertAttribute(locator: Locator, attributeName: string, expectedValue: string, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" has the attribute: "${attributeName}" with the expected value: "${expectedValue}"`);
    await expect(locator).toHaveAttribute(attributeName, expectedValue);
}

/**
 * Asserts that an element's attribute contains a specified substring.
 * Uses regex matching for partial attribute value verification.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} attributeName - The name of the attribute to check
 * @param {string} expectedSubstring - The substring expected to be found in the attribute value
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the attribute value does not contain the substring
 * @example
 * await assertAttributeContains(page.locator('img'), 'src', 'example.com', 'Product image');
 */
export async function assertAttributeContains(locator: Locator, attributeName: string, expectedSubstring: string, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" has the attribute: "${attributeName}" containing the expected substring: "${expectedSubstring}"`);
    await expect(locator).toHaveAttribute(attributeName, new RegExp(expectedSubstring));
}

/**
 * Asserts that a locator matches exactly the specified number of elements.
 * Useful for verifying the number of items in lists, tables, or repeated elements.
 * @param {Locator} locator - The locator pointing to the elements to count
 * @param {number} expectedCount - The expected number of elements to match
 * @param {string} elementName - Descriptive name of the elements for logging purposes
 * @returns {Promise<void>}
 * @throws {Error} If the actual count does not match the expected count
 * @example
 * await assertCount(page.locator('table tbody tr'), 5, 'Table rows');
 */
export async function assertCount(locator: Locator, expectedCount: number, elementName: string): Promise<void> {
    logger.info(`Asserting that the element: "${elementName}" has the expected count: "${expectedCount}"`);
    await expect(locator).toHaveCount(expectedCount);
}