import { type APIResponse, expect } from '@playwright/test';
import Ajv from 'ajv';
import { logger } from '../../logger/logger';

/**
 * Asserts that the HTTP response status code matches the expected value.
 * Useful for verifying successful or expected error responses from API endpoints.
 * @param {APIResponse} response - The API response object returned from a request
 * @param {number} expectedStatusCode - The expected HTTP status code (e.g., 200, 201, 400, 404, 500)
 * @returns {void}
 * @throws {Error} If the response status code does not match the expected value
 * @example
 * assertStatusCode(response, 200); // Assert successful response
 * assertStatusCode(response, 201); // Assert created resource
 * assertStatusCode(response, 404); // Assert not found error
 */
export function assertStatusCode(response: APIResponse, expectedStatusCode: number): void {
    logger.info(`Asserting that the response status code is: ${expectedStatusCode}`);
    expect(response.status()).toBe(expectedStatusCode);
}

/**
 * Asserts that the API response completes within the specified maximum duration.
 * Useful for performance testing and ensuring endpoints meet SLA requirements.
 * Measures time from request start to response end in milliseconds.
 * @param {APIResponse} response - The API response object with timing information
 * @param {number} maxResponseTime - The maximum acceptable response time in milliseconds
 * @returns {void}
 * @throws {Error} If the response time exceeds the maximum duration
 * @example
 * assertResponseTime(response, 1000); // Assert response completes within 1 second
 * assertResponseTime(response, 5000); // Assert response completes within 5 seconds
 * assertResponseTime(response, 500);  // Assert fast response for critical endpoints
 */
export function assertResponseTime(response: APIResponse, maxResponseTime: number): void {
    const timing = response.timing();
    const responseTime = timing.responseEnd - timing.requestStart;
    logger.info(`Asserting that the response time is less than or equal to: ${maxResponseTime} ms`);
    expect(responseTime).toBeLessThanOrEqual(maxResponseTime);
}

/**
 * Asserts that a specific HTTP response header has the expected value.
 * Useful for verifying content-type, authorization, caching headers, and other metadata.
 * Header names are case-insensitive (automatically converted to lowercase for comparison).
 * @param {APIResponse} response - The API response object
 * @param {string} headerName - The name of the response header to check (e.g., 'content-type', 'cache-control', 'authorization')
 * @param {string} expectedHeaderValue - The expected value of the header
 * @returns {void}
 * @throws {Error} If the header value does not match or header is missing
 * @example
 * assertResponseHeader(response, 'content-type', 'application/json');
 * assertResponseHeader(response, 'cache-control', 'no-cache');
 * assertResponseHeader(response, 'authorization', 'Bearer token123');
 */
export function assertResponseHeader(response: APIResponse, headerName: string, expectedHeaderValue: string): void {
    const actualHeaderValue = response.headers()[headerName.toLowerCase()];
    logger.info(`Asserting that the response header "${headerName}" is: ${expectedHeaderValue}`);
    expect(actualHeaderValue).toBe(expectedHeaderValue);
}

/**
 * Asserts that the response body (as text) contains the specified substring.
 * Useful for verifying specific text content, error messages, or patterns in API responses.
 * Converts the response to text, so it works with JSON, XML, HTML, or plain text responses.
 * @param {APIResponse} response - The API response object
 * @param {string} expectedContent - The substring expected to be found in the response body
 * @returns {Promise<void>}
 * @throws {Error} If the response body does not contain the expected content
 * @example
 * await assertResponseBodyContains(response, 'success');
 * await assertResponseBodyContains(response, 'error');
 * await assertResponseBodyContains(response, '"status":"completed"');
 * await assertResponseBodyContains(response, 'User created successfully');
 */
export async function assertResponseBodyContains(response: APIResponse, expectedContent: string): Promise<void> {
    const responseBody = await response.text();
    logger.info(`Asserting that the response body contains: ${expectedContent}`);
    expect(responseBody).toContain(expectedContent);
}

/**
 * Asserts that a specific property in the response JSON body has the expected value.
 * Supports nested properties using dot notation (e.g., 'user.profile.name').
 * Safely handles missing or null intermediate properties using optional chaining.
 * @param {APIResponse} response - The API response object
 * @param {string} jsonPath - The property path in dot notation (e.g., 'status', 'user.id', 'data.items.0.name')
 * @param {unknown} expectedValue - The expected value of the property
 * @returns {Promise<void>}
 * @throws {Error} If the property value does not match or property doesn't exist
 * @example
 * await assertResponseValue(response, 'status', 'success');
 * await assertResponseValue(response, 'data[2].message', 'Operation completed');
 * await assertResponseValue(response, 'user.profile.address.city', 'New York');
 */
export async function assertResponseValue(response: APIResponse, jsonPath: string, expectedValue: unknown): Promise<void> {
    const responseBody = await response.json();
    const normalizedJsonPath = jsonPath.replace(/\[(\d+)\]/g, '.$1');
    const actualValue = normalizedJsonPath.split('.').filter(Boolean).reduce((value, key) => value?.[key], responseBody);
    logger.info(`Asserting that the value at JSON path "${jsonPath}" is: ${expectedValue}`);
    expect(actualValue).toBe(expectedValue);
}

/**
 * Asserts that the response JSON body matches the provided JSON Schema.
 * Uses AJV (Another JSON Schema Validator) for comprehensive schema validation.
 * Useful for validating complex response structures against a predefined schema.
 * Provides detailed error messages if validation fails.
 * @param {APIResponse} response - The API response object
 * @param {object} schema - The JSON Schema to validate against (JSON Schema draft 7 or earlier)
 * @returns {Promise<void>}
 * @throws {Error} If the response body does not match the schema with detailed error information
 * @example
 * import productSchema from './test-data/schemas/product-schema.json';
 * await assertResponseSchema(response, productSchema);
 */
export async function assertResponseSchema(response: APIResponse, schema: object): Promise<void> {
    const responseBody = await response.json();
    logger.info(`Asserting that the response body matches the expected schema`);
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isMatching = validate(responseBody);
    if (!isMatching) {
        logger.error(`JSON schema validation failed: ${JSON.stringify(validate.errors)}`);
    }
    expect(isMatching).toBe(true);
}