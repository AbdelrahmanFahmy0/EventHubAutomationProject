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
    await allure.feature('View Booking');
    await allure.owner('Abdelrahman');
});

test.afterAll(async ({ request, eventsEndpoint, bookingsEndpoint }) => {
    await bookingsEndpoint.deleteBooking(request, bookingReference);
    await eventsEndpoint.deleteEvent(request, eventID);
});

//============================================Tests===============================================

test.describe('View Booking Tests', { tag: "@regression" }, () => {

    test('Check that Booking Reference Is Displayed in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking reference is displayed in the My Bookings page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.assertBookingReferenceIsDisplayed(bookingReference);
    });

    test('Check that Booking Status Is Correct in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking status is correct in the My Bookings page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.assertBookingStatusIsCorrect(bookingReference, bookingData.confirmedStatus);
    });

    test('Check that Booking Event Title Is Correct in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking event title is correct in the My Bookings page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.assertBookingEventTitleIsCorrect(bookingReference, eventTitle);
    });

    test('Check that Booking Tickets Count Is Correct in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the booking tickets count is correct in the My Bookings page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.assertBookingTicketsCountIsCorrect(bookingReference, bookingData.bookingQuantity.toString());
    });

    test('Check that Booking Event City Is Correct in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the booking event city is correct in the My Bookings page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.assertBookingEventCityIsCorrect(bookingReference, eventData.eventCity);
    });

    test('Check that Booking Total Price Is Correct in My Bookings Page', { tag: "@smoke" }, async ({ myBookingsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking total price is correct in the My Bookings page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        const expectedTotalPrice = bookingData.bookingQuantity * Number(eventData.eventPrice);
        await myBookingsPage.assertBookingTotalPriceIsCorrect(bookingReference, expectedTotalPrice.toString());
    });

    test('Check that View Details Button Navigates to Booking Details Page', { tag: "@smoke" }, async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that clicking the View Details button navigates to the Booking Details page for the correct booking.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingReferenceIsDisplayed();
    });

    test('Check that Booking Status Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking status is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingStatusIsCorrect(bookingData.confirmedStatus);
    });

    test('Check that Booking Event Title Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking event title is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingEventTitleIsCorrect(eventTitle);
    });

    test('Check that Booking Event Category Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the booking event category is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingEventCategoryIsCorrect(eventData.eventCategory);
    });

    test('Check that Booking Event Venue Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the booking event venue is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingEventVenueIsCorrect(eventData.eventVenue);
    });

    test('Check that Booking Event City Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the booking event city is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingEventCityIsCorrect(eventData.eventCity);
    });

    test('Check that Customer Name Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the customer name is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertCustomerNameIsCorrect(bookingData.customerName);
    });

    test('Check that Customer Email Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the customer email is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertCustomerEmailIsCorrect(bookingData.customerEmail);
    });

    test('Check that Customer Phone Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the customer phone is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertCustomerPhoneIsCorrect(bookingData.customerPhone);
    });

    test('Check that Booking Tickets Count Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the booking tickets count is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertBookingTicketsCountIsCorrect(bookingData.bookingQuantity.toString());
    });

    test('Check that Price Per Ticket Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the price per ticket is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        await bookingDetailsPage.assertPricePerTicketIsCorrect(eventData.eventPrice);
    });

    test('Check that Booking Total Price Is Correct in Booking Details Page', async ({ myBookingsPage, bookingDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking total price is correct in the Booking Details page after a booking is made.');
        // Test Steps
        await myBookingsPage.navigate();
        await myBookingsPage.clickOnViewDetailsButton(bookingReference);
        const expectedTotalPrice = bookingData.bookingQuantity * Number(eventData.eventPrice);
        await bookingDetailsPage.assertBookingTotalPriceIsCorrect(expectedTotalPrice.toString());
    });

});