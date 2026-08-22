import { APIRequestContext, APIResponse } from '@playwright/test';
import { post } from '../../utils/actions/api/requestActions';
import { getAPIBaseUrl } from '../../utils/envConfig';
import { assertStatusCode } from '../../utils/assertions/api/responseAssertions';
import { logger } from '../../utils/logger/logger';
import { step } from '../../utils/stepDecorator';

export class RegisterEndpoint {

    //============================================Request Objects=================================================

    private readonly endpoint = '/auth/register';
    private requestBody(email: string, password: string) {
        return {
            email: email,
            password: password
        };
    }

    //=============================================Request Functions===============================================

    /**
     * Creates a new user account via the authentication registration endpoint.
     * Sends a POST request with user email and password to register a new account.
     * Automatically asserts that the response status is 201 (Created) before returning.
     * Used for user onboarding and account creation workflows in API tests.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {string} email - The email address for the new user account
     * @param {string} password - The password for the new user account
     * @returns {Promise<APIResponse>} The API response object from the registration endpoint with status 201
     * @throws {Error} If the response status is not 201 (assertion failure during account creation)
     * @example
     * const response = await new RegisterEndpoint().registerUser(request, 'newuser@example.com', 'Password123!');
     */
    @step('Register User via API: {email}')
    async registerUser(request: APIRequestContext, email: string, password: string): Promise<APIResponse> {
        const response = await post(request, `${getAPIBaseUrl()}${this.endpoint}`,
            { requestBody: this.requestBody(email, password) });
        assertStatusCode(response, 201);
        logger.info(`Created account for "${email}" successfully via API`);
        return response;
    }
}