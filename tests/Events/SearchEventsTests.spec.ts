import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../src/fixtures/test-fixtures';
import eventData from '../../test-data/eventData.json';
import { getTimestamp } from '../../src/utils/timeUtils';

//==========================================Variables=============================================

let eventTitle: string;
let eventID: number;

//============================================Hooks===============================================

test.beforeAll(async ({ request, eventsEndpoint }) => {
    eventTitle = `${eventData.futureEventTitle}${getTimestamp()}`;
    eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
});

test.beforeEach(async () => {
    await allure.epic('Events');
    await allure.feature('Search Events');
    await allure.owner('Abdelrahman');
});

test.afterAll(async ({ request, eventsEndpoint }) => {
    await eventsEndpoint.deleteEvent(request, eventID);
});

//============================================Tests===============================================

test.describe('Search Events Tests', { tag: "@regression" }, () => {

    test('Check Searching by the Exact Event Title Displays the Matching Event Card', { tag: "@smoke" }, async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that searching by the exact event title displays the matching event card on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent(eventTitle);
        await eventsPage.assertFirstEventTitleIsCorrect(eventTitle);
    });

    test('Check Searching by a Partial Event Title Displays the Matching Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that searching by part of an event title displays the matching event card on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent(eventTitle.slice(-12));
        await eventsPage.assertFirstEventTitleIsCorrect(eventTitle);
    });

    test('Check Searching by a Nonexistent Event Title Displays the No Events Message', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that searching by an event title with no matching results displays the no events message on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent('Nonexistent Event Title');
        await eventsPage.assertNoEventsMessageIsDisplayed(eventData.messages.noEventsMessage);
    });

    test('Check Searching by the Exact Event Venue Displays the Matching Event Card', { tag: "@smoke" }, async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that searching by the exact event venue displays the matching event card on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent(eventData.eventVenue);
        await eventsPage.assertFirstEventVenueIsCorrect(eventData.eventVenue);
    });

    test('Check Searching by a Partial Event Venue Displays the Matching Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that searching by part of an event venue displays the matching event card on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent(eventData.eventVenue.substring(0, 7));
        await eventsPage.assertFirstEventVenueIsCorrect(eventData.eventVenue);
    });

    test('Check Searching by a Nonexistent Event Venue Displays the No Events Message', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that searching by an event venue with no matching results displays the no events message on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent('Nonexistent Venue');
        await eventsPage.assertNoEventsMessageIsDisplayed(eventData.messages.noEventsMessage);
    });

    test('Check that Clearing the Search Results Shows All Events', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that clearing the search results shows all events on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.searchForEvent('Nonexistent Event Title');
        await eventsPage.clickOnClearFiltersButton();
        await eventsPage.assertEventIsDisplayedInEventsList(eventTitle);
    });

});