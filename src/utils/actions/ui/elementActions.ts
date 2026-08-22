import type { Locator } from '@playwright/test';
import { logger } from '../../logger/logger';

/**
 * Types text into an element by first clearing it and then filling it with the provided value.
 * Useful for input fields, text areas, and search boxes.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} value - The text value to type into the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @param {Object} options - Optional configuration object
 * @param {boolean} [options.sensitive=false] - If true, hides the value in logs for sensitive data (passwords, tokens, etc.)
 * @returns {Promise<void>}
 * @example
 * await type(page.locator('#username'), 'john_doe', 'Username input');
 * await type(page.locator('#password'), 'secret123', 'Password input', { sensitive: true });
 */
export async function type(locator: Locator, value: string, elementName: string, options: { sensitive?: boolean } = {}): Promise<void> {
  await clear(locator, elementName);
  logger.info(`Filling element: "${elementName}"${options.sensitive ? ` (length: ${value.length})` : ` with value: "${value}"`}`);
  await locator.fill(value);
}

/**
 * Performs a single click action on the specified element.
 * Waits for the element to be clickable before clicking.
 * @param {Locator} locator - The locator pointing to the element to click
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await click(page.locator('#submitButton'), 'Submit button');
 */
export async function click(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Clicking on element: "${elementName}"`);
  await locator.click();
}

/**
 * Clears all text content from an input element or text area.
 * Removes any existing value without typing new content.
 * @param {Locator} locator - The locator pointing to the element to clear
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await clear(page.locator('#searchInput'), 'Search input field');
 */
export async function clear(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Clearing element: "${elementName}"`);
  await locator.clear();
}

/**
 * Presses a specific keyboard key on the focused element.
 * Useful for keyboard navigation, submitting forms, and triggering keyboard events.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} key - The key to press (e.g., 'Enter', 'Escape', 'Tab', 'ArrowDown')
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await pressKey(page.locator('#searchInput'), 'Enter', 'Search input');
 * await pressKey(page.locator('#modal'), 'Escape', 'Modal dialog');
 */
export async function pressKey(locator: Locator, key: string, elementName: string): Promise<void> {
  logger.info(`Pressing key "${key}" on element: "${elementName}"`);
  await locator.press(key);
}

/**
 * Performs a double-click action on the specified element.
 * Useful for selecting text, opening edit modes, or triggering double-click handlers.
 * @param {Locator} locator - The locator pointing to the element to double-click
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await doubleClick(page.locator('.editable-cell'), 'Table cell');
 */
export async function doubleClick(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Double clicking on element: "${elementName}"`);
  await locator.dblclick();
}

/**
 * Performs a right-click (context menu) action on the specified element.
 * Useful for testing context menus and right-click behavior.
 * @param {Locator} locator - The locator pointing to the element to right-click
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await rightClick(page.locator('.menuItem'), 'Menu item');
 */
export async function rightClick(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Right clicking on element: "${elementName}"`);
  await locator.click({ button: 'right' });
}

/**
 * Drags an element and drops it onto a target element.
 * Simulates a complete drag-and-drop interaction across the DOM.
 * @param {Locator} sourceLocator - The locator pointing to the element to drag
 * @param {Locator} targetLocator - The locator pointing to the target drop location
 * @param {string} sourceElementName - Descriptive name of the source element for logging purposes
 * @param {string} targetElementName - Descriptive name of the target element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await dragAndDrop(
 *   page.locator('.draggable-item'),
 *   page.locator('.drop-zone'),
 *   'Draggable item',
 *   'Drop zone'
 * );
 */
export async function dragAndDrop(sourceLocator: Locator, targetLocator: Locator, sourceElementName: string, targetElementName: string): Promise<void> {
  logger.info(`Dragging element: "${sourceElementName}" to element: "${targetElementName}"`);
  await sourceLocator.dragTo(targetLocator);
}

/**
 * Checks a checkbox or radio button element.
 * Ensures the element is checked/selected without errors if already checked.
 * @param {Locator} locator - The locator pointing to the checkbox or radio button
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await check(page.locator('#termsCheckbox'), 'Terms and conditions checkbox');
 * await check(page.locator('input[name="agreement"]'), 'Agreement radio button');
 */
export async function check(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Checking element: "${elementName}"`);
  await locator.check();
}

/**
 * Unchecks a checkbox or deselects a radio button element.
 * Ensures the element is unchecked without errors if already unchecked.
 * @param {Locator} locator - The locator pointing to the checkbox or radio button
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await uncheck(page.locator('#termsCheckbox'), 'Terms and conditions checkbox');
 * await uncheck(page.locator('input[name="newsletter"]'), 'Newsletter subscription');
 */
export async function uncheck(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Unchecking element: "${elementName}"`);
  await locator.uncheck();
}

/**
 * Hovers the mouse cursor over an element.
 * Triggers hover states and tooltip displays without clicking.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await hover(page.locator('.tooltip-trigger'), 'Tooltip trigger element');
 * await hover(page.locator('.dropdown-menu'), 'Dropdown menu');
 */
export async function hover(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Hovering over element: "${elementName}"`);
  await locator.hover();
}

/**
 * Sets focus on an element.
 * Useful for triggering focus events and testing keyboard navigation.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await focus(page.locator('#emailInput'), 'Email input field');
 */
export async function focus(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Focusing on element: "${elementName}"`);
  await locator.focus();
}

/**
 * Selects an option from a dropdown/select element by its value attribute.
 * Useful for testing select elements and dropdown menus.
 * @param {Locator} locator - The locator pointing to the select element
 * @param {string} value - The value attribute of the option to select
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await selectOptionByValue(page.locator('#countryDropdown'), 'US', 'Country dropdown');
 */
export async function selectOptionByValue(locator: Locator, value: string, elementName: string): Promise<void> {
  logger.info(`Selecting option "${value}" in element: "${elementName}"`);
  await locator.selectOption({ value: value });
}

/**
 * Selects an option from a dropdown/select element by its visible label text.
 * More user-friendly than selecting by value as it matches visible text.
 * @param {Locator} locator - The locator pointing to the select element
 * @param {string} label - The visible text label of the option to select
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await selectOptionByLabel(page.locator('#countryDropdown'), 'United States', 'Country dropdown');
 */
export async function selectOptionByLabel(locator: Locator, label: string, elementName: string): Promise<void> {
  logger.info(`Selecting option with label "${label}" in element: "${elementName}"`);
  await locator.selectOption({ label: label });
}

/**
 * Selects an option from a dropdown/select element by its index position.
 * Index starts at 0 for the first option.
 * @param {Locator} locator - The locator pointing to the select element
 * @param {number} index - The zero-based index of the option to select
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await selectOptionByIndex(page.locator('#typeDropdown'), 0, 'Type dropdown');
 */
export async function selectOptionByIndex(locator: Locator, index: number, elementName: string): Promise<void> {
  logger.info(`Selecting option at index "${index}" in element: "${elementName}"`);
  await locator.selectOption({ index: index });
}

/**
 * Uploads a file to a file input element.
 * Sets the file path without triggering native file picker dialogs.
 * @param {Locator} locator - The locator pointing to the file input element
 * @param {string} filePath - The absolute or relative path to the file to upload
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await uploadFile(page.locator('#fileInput'), './test-data/document.pdf', 'File upload input');
 */
export async function uploadFile(locator: Locator, filePath: string, elementName: string): Promise<void> {
  logger.info(`Uploading file "${filePath}" to element: "${elementName}"`);
  await locator.setInputFiles(filePath);
}

/**
 * Sets the value of an input element directly by setting the value property on the DOM element.
 * Useful for datetime-local, date, time, and other specialized input types where fill() doesn't work properly.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} value - The value to set into the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<void>}
 * @example
 * await setValue(page.locator('#dateTimeInput'), '2024-01-15T14:30', 'Date-Time input field');
 * await setValue(page.locator('#dateInput'), '2024-01-15', 'Date input');
 */
export async function setValue(locator: Locator, value: string, elementName: string): Promise<void> {
  logger.info(`Setting value in element: "${elementName}" with value: "${value}"`);
  await locator.evaluate((element: any, val: string) => { element.value = val; }, value);
}

////////////////////////////////////Read Actions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/**
 * Retrieves the text content of an element.
 * Returns the complete text including whitespace and nested content.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<string | null>} The text content of the element, or null if element has no text
 * @example
 * const buttonText = await getElementText(page.locator('#submitBtn'), 'Submit button');
 * console.log(buttonText); // "Submit"
 */
export async function getElementText(locator: Locator, elementName: string): Promise<string | null> {
  const text = await locator.textContent();
  logger.info(`Retrieved text from element: "${elementName}" - Text: "${text}"`);
  return text;
}

/**
 * Retrieves the value of an input element.
 * Works with text inputs, textareas, selects, and other form elements.
 * @param {Locator} locator - The locator pointing to the input element
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<string | null>} The current value of the input element, or null if not applicable
 * @example
 * const emailValue = await getElementValue(page.locator('#emailInput'), 'Email input');
 * console.log(emailValue); // "user@example.com"
 */
export async function getElementValue(locator: Locator, elementName: string): Promise<string | null> {
  const value = await locator.inputValue();
  logger.info(`Retrieved value from element: "${elementName}" - Value: "${value}"`);
  return value;
}

/**
 * Retrieves the value of a specific HTML attribute from an element.
 * Useful for verifying element properties like href, src, class, data-* attributes, etc.
 * @param {Locator} locator - The locator pointing to the element
 * @param {string} attributeName - The name of the attribute to retrieve (e.g., 'href', 'class', 'data-id')
 * @param {string} elementName - Descriptive name of the element for logging purposes
 * @returns {Promise<string | null>} The attribute value, or null if the attribute doesn't exist
 * @example
 * const href = await getElementAttribute(page.locator('a.link'), 'href', 'Navigation link');
 * console.log(href); // "https://example.com"
 * const dataId = await getElementAttribute(page.locator('.item'), 'data-id', 'List item');
 * console.log(dataId); // "12345"
 */
export async function getElementAttribute(locator: Locator, attributeName: string, elementName: string): Promise<string | null> {
  const attributeValue = await locator.getAttribute(attributeName);
  logger.info(`Retrieved attribute "${attributeName}" from element: "${elementName}" - Value: "${attributeValue}"`);
  return attributeValue;
}


/**
 * Captures a screenshot of a specific element and saves it to the test output directory.
 * Useful for visual verification and debugging element appearance in tests.
 * Automatically converts element name to a valid filename by replacing spaces with underscores.
 * @param {Locator} locator - The Playwright locator pointing to the element to screenshot
 * @param {string} elementName - Descriptive name of the element (used to generate the filename)
 * @returns {Promise<void>}
 * @example
 * await takeScreenshot(page.locator('#userProfile'), 'User Profile Card');\n * // Saves to: ./test-output/screenshots/User_Profile_Card.png
 */
export async function takeScreenshot(locator: Locator, elementName: string): Promise<void> {
  logger.info(`Taking screenshot of element: "${elementName}"`);
  await locator.screenshot({ path: `./test-output/screenshots/${elementName.replace(/\s+/g, '_')}.png` });
}