import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../src/fixtures/test-fixtures';
import eventData from '../../test-data/eventData.json';
import bookingData from '../../test-data/bookingData.json';
import { getTimestamp } from '../../src/utils/timeUtils';

//==========================================Variables=============================================

let eventTitle: string;
let eventID: number;
let bookingReference: string;

//============================================Hooks===============================================

test.beforeAll(async ({ request, eventsEndpoint, bookingsEndpoint }) => {
    eventTitle = `${eventData.eventTitle}${getTimestamp()}`;
    eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
    bookingReference = await bookingsEndpoint.createBooking(request, eventID, bookingData.bookingQuantity);
});

test.beforeEach(async () => {
    await allure.epic('Bookings');
    await allure.feature('Cancel Booking');
    await allure.owner('Abdelrahman');
});

test.afterAll(async ({ request, eventsEndpoint }) => {
    await eventsEndpoint.deleteEvent(request, eventID);
});

//============================================Tests===============================================

test.describe('Cancel Booking Tests', { tag: "@regression" }, () => {

    test('Check that Cancel Booking Confirmation Dialog Is Displayed in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the cancel booking confirmation dialog is displayed when the user clicks the Cancel Booking button.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnCancelBookingButton(bookingReference);
        const cancelConfirmationText = bookingData.messages.cancelConfirmation
            .replace('{bookingReference}', bookingReference)
            .replace('{bookingQuantity}', bookingData.bookingQuantity.toString());
        await myBookingsPage.assertCancelBookingConfirmationTextIsCorrect(cancelConfirmationText);
    });

    test('Check that Cancel Booking Confirmation Dialog Can Be Dismissed in My Bookings Page', async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the cancel booking confirmation dialog can be dismissed without cancelling the booking.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnCancelBookingButton(bookingReference);
        await myBookingsPage.clickOnDismissCancelBookingButton();
        await myBookingsPage.assertBookingCardIsDisplayed(bookingReference);
    });

    test('Check that Booking Can Be Cancelled Successfully from My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage, request, bookingsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a booking can be cancelled successfully and that the correct success message is displayed.');
        // Test Steps
        const bookingReference = await bookingsEndpoint.createBooking(request, eventID, bookingData.bookingQuantity);
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnCancelBookingButton(bookingReference);
        await myBookingsPage.clickOnConfirmCancelBookingButton();
        await myBookingsPage.assertCancelBookingSuccessMessageIsCorrect(bookingData.messages.bookingCancelled);
    });

    test('Check that Booking Card Is Not Displayed After Canceling a Booking', { tag: "@smoke" }, async ({ myBookingsPage, request, bookingsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking card is no longer displayed after a booking is cancelled.');
        // Test Steps
        const bookingReference = await bookingsEndpoint.createBooking(request, eventID, bookingData.bookingQuantity);
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnCancelBookingButton(bookingReference);
        await myBookingsPage.clickOnConfirmCancelBookingButton();
        await myBookingsPage.assertBookingCardIsNotDisplayed(bookingReference);
    });

    test('Check that Available Seats Count Is Increased After Canceling a Booking', { tag: "@smoke" }, async ({ eventsPage, myBookingsPage, request, eventsEndpoint, bookingsEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the available seats count increases after a booking is cancelled.');
        // Setup
        const eventTitle = `${eventData.eventTitle}${getTimestamp()}`;
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity);
        const bookingReference = await bookingsEndpoint.createBooking(request, eventID, bookingData.bookingQuantity);
        // Test Steps
        await eventsPage.navigate();
        const availableSeatsBeforeCancellation = await eventsPage.getAvailableSeatsForEvent(eventTitle);
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnCancelBookingButton(bookingReference);
        await myBookingsPage.clickOnConfirmCancelBookingButton();
        await eventsPage.navigate();
        await eventsPage.assertEventTotalSeatsIsCorrect(eventTitle, (availableSeatsBeforeCancellation + bookingData.bookingQuantity).toString());
        // Cleanup
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that Cancel Booking Confirmation Dialog Is Displayed in Booking Details Page', { tag: "@smoke" }, async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the cancel booking confirmation dialog is displayed when the user clicks the Cancel Booking button in the Booking Details page.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.clickOnCancelBookingButton();
        const cancelConfirmationText = bookingData.messages.cancelConfirmationMSG
            .replace('{bookingReference}', bookingReference)
            .replace('{bookingQuantity}', bookingData.bookingQuantity.toString());
        await bookingDetailsPage.assertCancelBookingConfirmationTextIsCorrect(cancelConfirmationText);
    });

    test('Check that Cancel Booking Confirmation Dialog Can Be Dismissed in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the cancel booking confirmation dialog can be dismissed without cancelling the booking in the Booking Details page.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.clickOnCancelBookingButton();
        await bookingDetailsPage.clickOnDismissCancelBookingButton();
        await bookingDetailsPage.assertBookingReferenceIsDisplayed();
    });

    test('Check that Booking Can Be Cancelled Successfully from Booking Details Page', { tag: "@smoke" }, async ({ myBookingsPage, bookingDetailsPage, request, bookingsEndpoint, page }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a booking can be cancelled successfully from the Booking Details page and that the correct success message is displayed.');
        // Test Steps
        const bookingReference = await bookingsEndpoint.createBooking(request, eventID, bookingData.bookingQuantity);
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.clickOnCancelBookingButton();
        await bookingDetailsPage.clickOnConfirmCancelBookingButton();
        await bookingDetailsPage.assertCancelBookingSuccessMessageIsCorrect(bookingData.messages.bookingCancelled);
    });

});