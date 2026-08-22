import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../src/fixtures/test-fixtures';
import eventData from '../../test-data/eventData.json';
import { getTimestamp, getDateAfterDays } from '../../src/utils/timeUtils';

//==========================================Variables=============================================

let eventTitle: string;
let eventDate = getDateAfterDays(30).slice(0, 16);

//============================================Hooks===============================================

test.beforeEach(async () => {
    await allure.epic('Events');
    await allure.feature('Add Event');
    await allure.owner('Abdelrahman');
    eventTitle = `${eventData.eventTitle}${getTimestamp()}`;
});

//============================================Tests===============================================

test.describe('Add Event Tests', { tag: "@regression" }, () => {

    test('Check Adding New Event with Valid Data', { tag: "@smoke" }, async ({ landingPage, eventsPage, addEventPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a user can successfully add a new event with valid data.');
        // Test Steps
        await landingPage.navigate();
        await landingPage.clickOnBrowseEventsButton();
        await eventsPage.clickOnAddNewEventButton();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventIsAddedSuccessfully(eventData.messages.eventCreated);
        // Cleanup: Delete the created event via API
        const eventID = await eventsEndpoint.getEventID(request, eventTitle);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check New Event Is Displayed in Events List', { tag: "@smoke" }, async ({ eventsPage, addEventPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a newly added event is displayed in the events list.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventIsAddedSuccessfully(eventData.messages.eventCreated);
        await eventsPage.navigate();
        await eventsPage.assertEventIsDisplayedInEventsList(eventTitle);
        // Cleanup: Delete the created event via API
        const eventID = await eventsEndpoint.getEventID(request, eventTitle);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check Adding New Event with Free Price', async ({ addEventPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that a new event can be added with a free price.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, '0', eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventIsAddedSuccessfully(eventData.messages.eventCreated);
        // Cleanup: Delete the created event via API
        const eventID = await eventsEndpoint.getEventID(request, eventTitle);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check Adding New Event with Decimal Price', async ({ addEventPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that a new event can be added with a decimal price.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.decimalPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventIsAddedSuccessfully(eventData.messages.eventCreated);
        // Cleanup: Delete the created event via API
        const eventID = await eventsEndpoint.getEventID(request, eventTitle);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check Adding New Event with Empty Title Field', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with an empty title field.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails('', eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventTitleErrorMessage(eventData.messages.eventTitleRequired);
    });

    test('Check Adding New Event with Empty City Field', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with an empty city field.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, '',
            eventData.eventVenue, eventDate, eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventCityErrorMessage(eventData.messages.eventCityRequired);
    });

    test('Check Adding New Event with Empty Venue Field', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with an empty venue field.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            '', eventDate, eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventVenueErrorMessage(eventData.messages.eventVenueRequired);
    });

    test('Check Adding New Event with Empty Date Field', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with an empty date field.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, '', eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventDateErrorMessage(eventData.messages.eventDateRequired);
    });

    test('Check Adding New Event with Empty Price Field', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with an empty price field.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, '', eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventPriceErrorMessage(eventData.messages.invalidEventPrice);
    });

    test('Check Adding New Event with Empty Total Seats Field', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with an empty total seats field.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.eventPrice, '');
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventTotalSeatsErrorMessage(eventData.messages.invalidEventTotalSeats);
    });

    test('Check Adding New Event with Empty Fields', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the application displays error messages when trying to add a new event with empty fields.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails('', eventData.eventCategory, '',
            '', '', '', '');
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventTitleErrorMessage(eventData.messages.eventTitleRequired);
        await addEventPage.assertEventCityErrorMessage(eventData.messages.eventCityRequired);
        await addEventPage.assertEventVenueErrorMessage(eventData.messages.eventVenueRequired);
        await addEventPage.assertEventDateErrorMessage(eventData.messages.eventDateRequired);
        await addEventPage.assertEventPriceErrorMessage(eventData.messages.invalidEventPrice);
        await addEventPage.assertEventTotalSeatsErrorMessage(eventData.messages.invalidEventTotalSeats);
    });

    test('Check Adding New Event with Past Date', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with a past date.');
        // Test Steps
        const pastDate = getDateAfterDays(-1).slice(0, 16);
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, pastDate, eventData.eventPrice, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventDateErrorMessage(eventData.messages.eventDateInPast);
    });

    test('Check Adding New Event with Negative Price', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with a negative price.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.negativeNumber, eventData.eventTotalSeats);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventPriceErrorMessage(eventData.messages.invalidEventPrice);
    });

    test('Check Adding New Event with Negative Total Seats', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with a negative total seats value.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.eventPrice, eventData.negativeNumber);
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventTotalSeatsErrorMessage(eventData.messages.invalidEventTotalSeats);
    });

    test('Check Adding New Event with 0 Total Seats', async ({ addEventPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the application displays an error message when trying to add a new event with a total seats value of 0.');
        // Test Steps
        await addEventPage.navigate();
        await addEventPage.enterEventDetails(eventTitle, eventData.eventCategory, eventData.eventCity,
            eventData.eventVenue, eventDate, eventData.eventPrice, '0');
        await addEventPage.clickOnAddEventButton();
        await addEventPage.assertEventTotalSeatsErrorMessage(eventData.messages.invalidEventTotalSeats);
    });

});