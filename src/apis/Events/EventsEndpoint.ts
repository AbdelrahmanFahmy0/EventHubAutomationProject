import { APIRequestContext, APIResponse } from '@playwright/test';
import { post, get, remove } from '../../utils/actions/api/requestActions';
import { getAPIBaseUrl } from '../../utils/envConfig';
import { assertStatusCode } from '../../utils/assertions/api/responseAssertions';
import { getDateAfterDays } from '../../utils/timeUtils';
import { logger } from '../../utils/logger/logger';
import { step } from '../../utils/stepDecorator';
import storage from '../../../storage-state.json';
import eventData from '../../../test-data/eventData.json';

export class EventsEndpoint {

    //============================================Request Objects=================================================

    private readonly endpoint = '/events';
    private readonly requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storage.origins[0].localStorage[0].value}`
    };

    private requestBody(eventTitle: string, eventCategory: string, eventCity: string, eventTotalSeats?: number) {
        return {
            title: eventTitle,
            category: eventCategory,
            venue: eventData.eventVenue,
            city: eventCity,
            eventDate: getDateAfterDays(30),
            price: eventData.eventPrice,
            totalSeats: eventTotalSeats ?? eventData.eventTotalSeats
        };
    }

    //=============================================Request Functions===============================================

    /**
     * Creates a new event via the Events API endpoint.
     * Sends a POST request with event details including title, category, venue, date, price, and seat information.
     * Automatically asserts that the response status is 201 (Created) before returning.
     * Used for event creation workflows in API tests.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {string} eventTitle - The title of the event to create
     * @param {string} eventCategory - The category of the event to create
     * @param {string} eventCity - The city where the event will take place
     * @returns {Promise<number>} The ID of the newly created event
     * @throws {Error} If the response status is not 201 (assertion failure during event creation)
     * @example
     * const eventID = await new EventsEndpoint().createEvent(request, 'Tech Conference 2026', 'Technology', 'Cairo');
     */
    @step('Create Event via API: {eventTitle}')
    async createEvent(request: APIRequestContext, eventTitle: string, eventCategory: string, eventCity: string, eventTotalSeats?: number): Promise<number> {
        const response = await post(request, `${getAPIBaseUrl()}${this.endpoint}`,
            { requestBody: this.requestBody(eventTitle, eventCategory, eventCity, eventTotalSeats), requestHeaders: this.requestHeaders });
        assertStatusCode(response, 201);
        logger.info(`Created event "${eventTitle}" successfully using API`);
        const responseBody = await response.json();
        return responseBody.data.id;
    }

    /**
     * Deletes an existing event via the Events API endpoint.
     * Sends a DELETE request for the specified event ID.
     * Automatically asserts that the response status is 200 before returning.
     * Used for event cleanup and removal workflows in API tests.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {number} eventID - The ID of the event to delete
     * @returns {Promise<APIResponse>} The API response object confirming event deletion with status 200
     * @throws {Error} If the response status is not 200 or if deletion fails
     * @example
     * const response = await new EventsEndpoint().deleteEvent(request, 12);
     */
    @step('Delete Event via API: {eventID}')
    async deleteEvent(request: APIRequestContext, eventID: number): Promise<APIResponse> {
        const response = await remove(request, `${getAPIBaseUrl()}${this.endpoint}/${eventID}`,
            { requestHeaders: this.requestHeaders });
        assertStatusCode(response, 200);
        logger.info(`Deleted event with ID "${eventID}" successfully using API`);
        return response;
    }

    /**
     * Retrieves the event ID by searching for an event with the matching title.
     * Sends a GET request to fetch all events and finds the one with the specified title.
     * Automatically asserts that the response status is 200 before processing.
     * Used when the event ID is not available directly after event creation.
     * @param {APIRequestContext} request - The Playwright API request context for making HTTP calls
     * @param {string} eventTitle - The title of the event to find
     * @returns {Promise<number>} The ID of the event with the matching title
     * @throws {Error} If the response status is not 200 or if the event with the specified title is not found
     * @example
     * const eventId = await new EventsEndpoint().getEventID(request, 'Tech Conference 2026');
     */
    @step('Get Event ID via API: {eventTitle}')
    async getEventID(request: APIRequestContext, eventTitle: string): Promise<number> {
        const response = await get(request, `${getAPIBaseUrl()}${this.endpoint}`, { requestHeaders: this.requestHeaders });
        assertStatusCode(response, 200);
        const responseBody = await response.json();
        const event = responseBody.data.find((event: { id: number; title: string }) => event.title === eventTitle);
        if (!event) {
            logger.error(`Event with title "${eventTitle}" was not found in the response`);
        }
        logger.info(`Found event "${eventTitle}" with ID ${event.id}`);
        return event.id;
    }
}