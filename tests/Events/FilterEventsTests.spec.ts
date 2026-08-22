import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../src/fixtures/test-fixtures';
import eventData from '../../test-data/eventData.json';
import { getTimestamp } from '../../src/utils/timeUtils';

//==========================================Variables=============================================

let eventTitle: string;

//============================================Hooks===============================================

test.beforeEach(async () => {
    await allure.epic('Events');
    await allure.feature('Filter Events');
    await allure.owner('Abdelrahman');
    eventTitle = `${eventData.eventTitle}${getTimestamp()}`;
});

//============================================Tests===============================================

test.describe('Filter Events Tests', { tag: "@regression" }, () => {

    test('Check Event Filtering by City Works Correctly', { tag: "@smoke" }, async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies events can be filtered by city on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCityFilter(eventData.indianCity);
        await eventsPage.assertFirstEventCityIsCorrect(eventData.indianCity);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check Changing the City Filter Updates the Events List', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that changing the city filter updates the events list on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.indianCity2);
        await eventsPage.navigate();
        await eventsPage.selectCityFilter(eventData.indianCity);
        await eventsPage.selectCityFilter(eventData.indianCity2);
        await eventsPage.assertFirstEventCityIsCorrect(eventData.indianCity2);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Clearing the City Filter Shows All Events', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that clearing the city filter shows all events on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCityFilter(eventData.indianCity);
        await eventsPage.clickOnClearFiltersButton();
        await eventsPage.assertEventIsDisplayedInEventsList(eventTitle);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Filtering by a City with No Events Shows the Correct Message', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that filtering by a city with no events shows the correct message on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.selectCityFilter(eventData.cityWithNoEvents);
        await eventsPage.assertNoEventsMessageIsDisplayed(eventData.messages.noEventsMessage);
    });

    test('Check Filtering by Category Works Correctly', { tag: "@smoke" }, async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that filtering by category works correctly on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.eventCategory);
        await eventsPage.assertFirstEventCategoryIsCorrect(eventData.eventCategory);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Filtering with Conference Category Works Correctly', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that filtering with conference category works correctly on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.conferenceCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.conferenceCategory);
        await eventsPage.assertFirstEventCategoryIsCorrect(eventData.conferenceCategory);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Filtering with Concert Category Works Correctly', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that filtering with concert category works correctly on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.concertCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.concertCategory);
        await eventsPage.assertFirstEventCategoryIsCorrect(eventData.concertCategory);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Filtering with Festival Category Works Correctly', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that filtering with festival category works correctly on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.festivalCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.festivalCategory);
        await eventsPage.assertFirstEventCategoryIsCorrect(eventData.festivalCategory);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check Changing the Category Filter Updates the Events List', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that changing the category filter updates the events list on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.conferenceCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.concertCategory);
        await eventsPage.selectCategoryFilter(eventData.conferenceCategory);
        await eventsPage.assertFirstEventCategoryIsCorrect(eventData.conferenceCategory);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Clearing the Category Filter Shows All Events', async ({ eventsPage, request, eventsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that clearing the category filter shows all events on the Events page.');
        // Test Steps
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.festivalCategory, eventData.eventCity);
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.eventCategory);
        await eventsPage.clickOnClearFiltersButton();
        await eventsPage.assertEventIsDisplayedInEventsList(eventTitle);
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Filtering by a Category with No Events Shows the Correct Message', async ({ eventsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that filtering by a category with no events shows the correct message on the Events page.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.selectCategoryFilter(eventData.workshopCategory);
        await eventsPage.assertNoEventsMessageIsDisplayed(eventData.messages.noEventsMessage);
    });

});