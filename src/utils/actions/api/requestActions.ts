import type { APIRequestContext, APIResponse } from '@playwright/test';
import { logger } from '../../logger/logger';

/**
 * Sends an HTTP GET request to the specified URL.
 * Used to retrieve data from an API endpoint without sending a body.
 * @param {APIRequestContext} request - The Playwright API request context
 * @param {string} url - The URL endpoint to send the GET request to
 * @param {Object} options - Optional configuration object
 * @param {Record<string, string>} [options.requestParams] - Query parameters to append to the URL
 * @param {Record<string, string>} [options.requestHeaders] - Custom headers to include in the request
 * @returns {Promise<APIResponse>} The API response object containing status, body, headers, etc.
 * @example
 * const response = await get(request, 'https://api.example.com/users');
 * const response = await get(request, 'https://api.example.com/users', {
 *   requestParams: { id: '123', role: 'admin' },
 *   requestHeaders: { 'Authorization': 'Bearer token123' }
 * });
 */
export async function get(request: APIRequestContext, url: string,
    options?: {
        requestParams?: Record<string, string>,
        requestHeaders?: Record<string, string>
    }
): Promise<APIResponse> {
    logger.info(`Sending GET request to "${url}"`);
    const response = await request.get(url, { params: options?.requestParams, headers: options?.requestHeaders });
    return response;
}

/**
 * Sends an HTTP POST request to the specified URL.
 * Used to create new resources on the API endpoint with a request body.
 * @param {APIRequestContext} request - The Playwright API request context
 * @param {string} url - The URL endpoint to send the POST request to
 * @param {Object} options - Optional configuration object
 * @param {any} [options.requestBody] - The request body data (JSON object, string, etc.)
 * @param {Record<string, string>} [options.requestParams] - Query parameters to append to the URL
 * @param {Record<string, string>} [options.requestHeaders] - Custom headers to include in the request
 * @returns {Promise<APIResponse>} The API response object containing status, body, headers, etc.
 * @example
 * const response = await post(request, 'https://api.example.com/users', {
 *   requestBody: { name: 'John Doe', email: 'john@example.com' },
 *   requestHeaders: { 'Content-Type': 'application/json' }
 * });
 */
export async function post(request: APIRequestContext, url: string,
    options?: {
        requestBody?: any,
        requestParams?: Record<string, string>,
        requestHeaders?: Record<string, string>
    }
): Promise<APIResponse> {
    logger.info(`Sending POST request to "${url}"`);
    const response = await request.post(url, { params: options?.requestParams, headers: options?.requestHeaders, data: options?.requestBody });
    return response;
}

/**
 * Sends an HTTP PUT request to the specified URL.
 * Used to update or replace entire resources on the API endpoint with a request body.
 * @param {APIRequestContext} request - The Playwright API request context
 * @param {string} url - The URL endpoint to send the PUT request to (typically includes resource ID)
 * @param {Object} options - Optional configuration object
 * @param {any} [options.requestBody] - The request body data containing the resource to update (JSON object, string, etc.)
 * @param {Record<string, string>} [options.requestParams] - Query parameters to append to the URL
 * @param {Record<string, string>} [options.requestHeaders] - Custom headers to include in the request
 * @returns {Promise<APIResponse>} The API response object containing status, body, headers, etc.
 * @example
 * const response = await put(request, 'https://api.example.com/users/123', {
 *   requestBody: { name: 'Jane Doe', email: 'jane@example.com', role: 'admin' },
 *   requestHeaders: { 'Authorization': 'Bearer token123' }
 * });
 */
export async function put(request: APIRequestContext, url: string,
    options?: {
        requestBody?: any,
        requestParams?: Record<string, string>,
        requestHeaders?: Record<string, string>
    }
): Promise<APIResponse> {
    logger.info(`Sending PUT request to "${url}"`);
    const response = await request.put(url, { params: options?.requestParams, headers: options?.requestHeaders, data: options?.requestBody });
    return response;
}


/**
 * Sends an HTTP PATCH request to the specified URL.
 * Used to partially update resources on the API endpoint with a request body.
 * Unlike PUT, PATCH only updates the fields specified in the request body.
 * @param {APIRequestContext} request - The Playwright API request context
 * @param {string} url - The URL endpoint to send the PATCH request to (typically includes resource ID)
 * @param {Object} options - Optional configuration object
 * @param {any} [options.requestBody] - The request body data containing only the fields to update (JSON object, string, etc.)
 * @param {Record<string, string>} [options.requestParams] - Query parameters to append to the URL
 * @param {Record<string, string>} [options.requestHeaders] - Custom headers to include in the request
 * @returns {Promise<APIResponse>} The API response object containing status, body, headers, etc.
 * @example
 * const response = await patch(request, 'https://api.example.com/users/123', {
 *   requestBody: { role: 'moderator' },
 *   requestHeaders: { 'Authorization': 'Bearer token123' }
 * });
 */
export async function patch(request: APIRequestContext, url: string,
    options?: {
        requestBody?: any,
        requestParams?: Record<string, string>,
        requestHeaders?: Record<string, string>
    }
): Promise<APIResponse> {
    logger.info(`Sending PATCH request to "${url}"`);
    const response = await request.patch(url, { params: options?.requestParams, headers: options?.requestHeaders, data: options?.requestBody });
    return response;
}

/**
 * Sends an HTTP DELETE request to the specified URL.
 * Used to delete resources from the API endpoint.
 * @param {APIRequestContext} request - The Playwright API request context
 * @param {string} url - The URL endpoint to send the DELETE request to (typically includes resource ID)
 * @param {Object} options - Optional configuration object
 * @param {Record<string, string>} [options.requestParams] - Query parameters to append to the URL
 * @param {Record<string, string>} [options.requestHeaders] - Custom headers to include in the request
 * @returns {Promise<APIResponse>} The API response object containing status, body, headers, etc.
 * @example
 * const response = await remove(request, 'https://api.example.com/users/123');
 * const response = await remove(request, 'https://api.example.com/users/123', {
 *   requestHeaders: { 'Authorization': 'Bearer token123' }
 * });
 */
export async function remove(request: APIRequestContext, url: string,
    options?: {
        requestParams?: Record<string, string>,
        requestHeaders?: Record<string, string>
    }
): Promise<APIResponse> {
    logger.info(`Sending DELETE request to "${url}"`);
    const response = await request.delete(url, { params: options?.requestParams, headers: options?.requestHeaders });
    return response;
}