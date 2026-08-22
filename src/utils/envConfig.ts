import { devices } from "@playwright/test";
import baseURL from './urls';

/**
 * Returns a Playwright project configuration based on the selected browser.
 * 
 * Supported browsers:
 * - chrome  → Google Chrome (channel: chrome)
 * - firefox → Mozilla Firefox
 * - edge    → Microsoft Edge (channel: msedge)
 * - safari  → Apple Safari (WebKit)
 *
 * @returns Playwright project configuration object
 */
export function getBrowserProject(browser: string = process.env.BROWSER || "chrome") {
    switch (browser.toLowerCase()) {
        case "chrome":
            return {
                name: "Google Chrome",
                use: { ...devices["Desktop Chrome"], channel: "chrome" },
            };

        case "firefox":
            return {
                name: "Mozilla Firefox",
                use: devices["Desktop Firefox"],
            };

        case "edge":
            return {
                name: "Microsoft Edge",
                use: { ...devices["Desktop Chrome"], channel: "msedge" },
            };

        case "safari":
            return {
                name: "Apple Safari",
                use: devices["Desktop Safari"],
            };

        default:
            return {
                name: "Google Chrome",
                use: devices["Desktop Chrome"],
            };
    }
}

/**
 * Returns the base URL for the UI based on the environment.
 * @returns Base URL as a string
 */
export function getUIBaseUrl() {
    const env = process.env.ENV?.toLowerCase() || "test";
    switch (env) {
        case "test":
            return baseURL.test.ui;
        case "staging":
            return baseURL.staging.ui;
        default:
            return baseURL.test.ui;
    }
}

/**
 * Returns the base URL for the API based on the environment.
 * @returns Base URL as a string
 */
export function getAPIBaseUrl() {
    const env = process.env.ENV?.toLowerCase() || "test";
    switch (env) {
        case "test":
            return baseURL.test.api;
        case "staging":
            return baseURL.staging.api;
        default:
            return baseURL.test.api;
    }
}
