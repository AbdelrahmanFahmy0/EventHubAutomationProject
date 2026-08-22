import { APIRequestContext, APIResponse } from '@playwright/test';
import { post, get, remove } from '../../utils/actions/api/requestActions';
import { getAPIBaseUrl } from '../../utils/envConfig';
import { assertStatusCode } from '../../utils/assertions/api/responseAssertions';
import { logger } from '../../utils/logger/logger';
import { step } from '../../utils/stepDecorator';
import storage from '../../../storage-state.json';
import bookingData from '../../../test-data/bookingData.json';

export class BookingsEndpoint {

    //============================================Request Objects=================================================

    private readonly endpoint = '/bookings';
    private readonly requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storage.origins[0].localStorage[0].value}`
    };

    private requestBody(eventID: number, quantity: number) {
        return {
            eventId: eventID,
            customerName: bookingData.customerName,
            customerEmail: bookingData.customerEmail,
            customerPhone: bookingData.customerPhone,
            quantity: quantity
        };
    }

    //=============================================Request Functions===============================================

    /**
     * Creates a new booking for an event via the Bookings API endpoint.
     * Sends a POST request with the event ID, customer details, and quantity of seats to book.
     * Automatically asserts that the response status is 201 (Created) before returning.
     * Used for booking creation workflows in API tests.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {number} eventID - The ID of the event to book
     * @param {number} quantity - The number of seats to book
     * @returns {Promise<string>} The booking reference of the newly created booking
     * @throws {Error} If the response status is not 201 (assertion failure during booking creation)
     * @example
     * const bookingRef = await new BookingsEndpoint().createBooking(request, 12, 2);
     */
    @step('Create Booking via API for Event ID: {eventID}')
    async createBooking(request: APIRequestContext, eventID: number, quantity: number): Promise<string> {
        const response = await post(request, `${getAPIBaseUrl()}${this.endpoint}`,
            { requestBody: this.requestBody(eventID, quantity), requestHeaders: this.requestHeaders });
        assertStatusCode(response, 201);
        logger.info(`Created booking for event ID "${eventID}" successfully using API`);
        const responseBody = await response.json();
        return responseBody.data.bookingRef;
    }

    /**
     * Cancels (deletes) an existing booking via the Bookings API endpoint.
     * First resolves the booking ID from its reference code, then sends a DELETE request for that ID.
     * Automatically asserts that the response status is 200 before returning.
     * Used for booking cleanup and cancellation workflows in API tests.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {string} bookingRef - The reference code of the booking to cancel
     * @returns {Promise<APIResponse>} The API response object confirming booking cancellation with status 200
     * @throws {Error} If the response status is not 200 or if cancellation fails
     * @example
     * const response = await new BookingsEndpoint().deleteBooking(request, 'BK-12345');
     */
    @step('Delete Booking via API for Reference: {bookingRef}')
    async deleteBooking(request: APIRequestContext, bookingRef: string): Promise<APIResponse> {
        const bookingID = await this.getBookingID(request, bookingRef);
        const response = await remove(request, `${getAPIBaseUrl()}${this.endpoint}/${bookingID}`,
            { requestHeaders: this.requestHeaders });
        assertStatusCode(response, 200);
        logger.info(`Deleted booking with reference "${bookingRef}" successfully using API`);
        return response;
    }

    /**
     * Retrieves the booking ID by looking up a booking with its reference code.
     * Sends a GET request to the booking lookup-by-reference endpoint.
     * Automatically asserts that the response status is 200 before processing.
     * Used when the booking ID is not available directly and only the reference is known.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {string} bookingRef - The reference code of the booking to look up
     * @returns {Promise<number>} The ID of the booking with the matching reference code
     * @throws {Error} If the response status is not 200 (assertion failure during lookup)
     * @example
     * const bookingID = await new BookingsEndpoint().getBookingID(request, 'BK-12345');
     */
    @step('Get Booking ID via API for Reference: {bookingRef}')
    async getBookingID(request: APIRequestContext, bookingRef: string): Promise<number> {
        const response = await get(request, `${getAPIBaseUrl()}${this.endpoint}/ref/${bookingRef}`,
            { requestHeaders: this.requestHeaders });
        assertStatusCode(response, 200);
        const responseBody = await response.json();
        logger.info(`Found booking with reference "${bookingRef}" and ID ${responseBody.data.id}`);
        return responseBody.data.id;
    }
}