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
    eventTitle = `${eventData.eventTitle}${getTimestamp()}`;
    eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
});

test.beforeEach(async () => {
    await allure.epic('Events');
    await allure.feature('View Event');
    await allure.owner('Abdelrahman');
});

test.afterAll(async ({ request, eventsEndpoint }) => {
    await eventsEndpoint.deleteEvent(request, eventID);
});

//============================================Tests===============================================

test.describe('View Event Tests', { tag: ["@regression", "@smoke"] }, () => {

    test('Check Event Venue Is Displayed Correctly on the Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event card displays the correct venue in the events list.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.assertEventVenueIsCorrect(eventTitle, eventData.eventVenue);
    });

    test('Check Event City Is Displayed Correctly on the Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event card displays the correct city in the events list.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.assertEventCityIsCorrect(eventTitle, eventData.eventCity);
    });

    test('Check Event Price Is Displayed Correctly on the Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event card displays the correct price in the events list.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.assertEventPriceIsCorrect(eventTitle, eventData.eventPrice);
    });

    test('Check Event Total Seats Is Displayed Correctly on the Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event card displays the correct total seats in the events list.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.assertEventTotalSeatsIsCorrect(eventTitle, eventData.eventTotalSeats);
    });

    test('Check Event Category Is Displayed Correctly on the Event Card', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event card displays the correct category in the events list.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.assertEventCategoryIsCorrect(eventTitle, eventData.eventCategory);
    });

    test('Check Event Category Is Displayed Correctly on the Event Details Page', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event details page displays the correct category for the event.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertEventCategoryIsCorrect(eventData.eventCategory);
    });

    test('Check Event Venue Is Displayed Correctly on the Event Details Page', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event details page displays the correct venue for the event.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertEventVenueIsCorrect(eventData.eventVenue);
    });

    test('Check Event City Is Displayed Correctly on the Event Details Page', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event details page displays the correct city for the event.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertEventCityIsCorrect(eventData.eventCity);
    });

    test('Check Event Total Seats Is Displayed Correctly on the Event Details Page', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event details page displays the correct total seats for the event.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertEventTotalSeatsIsCorrect(eventData.eventTotalSeats);
    });

    test('Check Event Price Is Displayed Correctly on the Event Details Page', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event details page displays the correct price for the event.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertEventPriceIsCorrect(eventData.eventPrice);
    });

    test('Check Ticket Price Is Displayed Correctly on the Event Details Page', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the event details page displays the correct ticket price for the event.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertTicketPriceIsCorrect(eventData.eventPrice);
    });

});