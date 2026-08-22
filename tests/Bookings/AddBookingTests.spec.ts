import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../src/fixtures/test-fixtures';
import eventData from '../../test-data/eventData.json';
import bookingData from '../../test-data/bookingData.json';
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
    await allure.epic('Bookings');
    await allure.feature('Add Booking');
    await allure.owner('Abdelrahman');
});

test.afterAll(async ({ request, eventsEndpoint }) => {
    await eventsEndpoint.deleteEvent(request, eventID);
});

//============================================Tests===============================================

test.describe('Add Booking Tests', { tag: "@regression" }, () => {

    test('Check that a Ticket Can Be Booked for an Event', { tag: "@smoke" }, async ({ eventsPage, eventDetailsPage, bookingsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a ticket can be successfully booked for an event and a confirmation is received.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertBookingConfirmationMessage(bookingData.messages.bookingCreated);
        // Cleanup
        const bookingRef = await eventDetailsPage.getBookingReference();
        await bookingsEndpoint.deleteBooking(request, bookingRef!);
    });

    test('Check that Multiple Tickets Can Be Booked for an Event', { tag: "@smoke" }, async ({ eventsPage, eventDetailsPage, bookingsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that multiple tickets can be successfully booked for an event and a confirmation is received.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertBookingConfirmationMessage(bookingData.messages.bookingCreated);
        // Cleanup
        const bookingRef = await eventDetailsPage.getBookingReference();
        await bookingsEndpoint.deleteBooking(request, bookingRef!);
    });

    test('Check that the Available Seats Count Decreases After Booking', { tag: "@smoke" }, async ({ eventsPage, eventDetailsPage, bookingsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the available seats count for an event decreases after a booking is made.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        const availableSeatsBeforeBooking = await eventDetailsPage.getAvailableSeatsCount();
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        const bookingRef = await eventDetailsPage.getBookingReference();
        await eventDetailsPage.assertAvailableSeatsCountIsCorrect(availableSeatsBeforeBooking - 1);
        // Cleanup
        await bookingsEndpoint.deleteBooking(request, bookingRef!);
    });

    test('Check that Booking Is Added to My Bookings Page After Confirmation', { tag: "@smoke" }, async ({ eventsPage, eventDetailsPage, myBookingsPage, bookingsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that a booking is added to the My Bookings page after confirmation.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        const bookingRef = await eventDetailsPage.getBookingReference();
        await eventDetailsPage.clickOnViewMyBookingsButton();
        await myBookingsPage.assertBookingCardIsDisplayed(bookingRef!);
        // Cleanup
        await bookingsEndpoint.deleteBooking(request, bookingRef!);
    });

    test('Check that Booking Status Is Confirmed After Booking', async ({ eventsPage, eventDetailsPage, myBookingsPage, bookingsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking status is confirmed after a booking is made.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        const bookingRef = await eventDetailsPage.getBookingReference();
        await eventDetailsPage.clickOnViewMyBookingsButton();
        await myBookingsPage.assertBookingStatusIsCorrect(bookingRef!, bookingData.confirmedStatus);
        // Cleanup
        await bookingsEndpoint.deleteBooking(request, bookingRef!);
    });

    test('Check that Booking Reference Is Displayed in My Bookings Page After Booking', async ({ eventsPage, eventDetailsPage, myBookingsPage, bookingsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the booking reference is displayed in the My Bookings page after a booking is made.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        const bookingRef = await eventDetailsPage.getBookingReference();
        await eventDetailsPage.clickOnViewMyBookingsButton();
        await myBookingsPage.assertBookingReferenceIsDisplayed(bookingRef!);
        // Cleanup
        await bookingsEndpoint.deleteBooking(request, bookingRef!);
    });

    test('Check that Amount of Tickets Is Increased After Clicking Increase Ticket Count Button', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the amount of tickets is increased after clicking the Increase Ticket Count button.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.assertTicketsCountIsCorrect("4");
    });

    test('Check that Amount of Tickets Is Decreased After Clicking Decrease Ticket Count Button', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the amount of tickets is decreased after clicking the Decrease Ticket Count button.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.clickOnDecreaseTicketCountButton();
        await eventDetailsPage.assertTicketsCountIsCorrect("2");
    });

    test('Check that Total Price Is Correct After Selecting Tickets', { tag: "@smoke" }, async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the total price is correct after selecting tickets.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        await eventDetailsPage.clickOnIncreaseTicketCountButton();
        const totalPrice = Number(eventData.eventPrice) * 3;
        await eventDetailsPage.assertTotalPriceIsCorrect(totalPrice.toString());
    });

    test('Check that Tickets Count Cannot Be Decreased Below 1', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the tickets count cannot be decreased below 1.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertDecreaseTicketCountButtonIsDisabled();
    });

    test('Check that Increase Ticket Count Button Is Disabled when Available Seats Are Reached', async ({ eventsPage, eventDetailsPage, eventsEndpoint, request }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the Increase Ticket Count button is disabled when available seats are reached.');
        // Test Steps
        const eventTitle = `${eventData.eventTitle}${getTimestamp()}`;
        const eventID = await eventsEndpoint.createEvent(request, eventTitle, eventData.eventCategory, eventData.eventCity, 1);
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.assertIncreaseTicketCountButtonIsDisabled();
        // Cleanup
        await eventsEndpoint.deleteEvent(request, eventID);
    });

    test('Check that User Cannot Book More than 10 Tickets', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot book more than 10 tickets.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        for (let i = 0; i < 9; i++) {
            await eventDetailsPage.clickOnIncreaseTicketCountButton();
        }
        await eventDetailsPage.assertIncreaseTicketCountButtonIsDisabled();
    });

    test('Check that User Cannot Enter 1 Character in Customer Name Field', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot enter only 1 character in the Customer Name field.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails('A', bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerNameErrorMessage(bookingData.messages.invalidCustomerName);
    });

    test('Check that User Cannot Enter Invalid Email in Customer Email Field', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot enter an invalid email in the Customer Email field.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.invalidEmailFormat, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerEmailErrorMessage(bookingData.messages.invalidCustomerEmail);
    });

    test('Check that User Cannot Enter Phone Number Less than 10 Digits in Customer Phone Field', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot enter a phone number less than 10 digits in the Customer Phone field.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, bookingData.invalidPhoneFormat);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerPhoneErrorMessage(bookingData.messages.invalidCustomerPhone);
    });

    test('Check that User Cannot Book a Ticket with Empty Customer Name', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot book a ticket with an empty Customer Name.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails('', bookingData.customerEmail, bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerNameErrorMessage(bookingData.messages.invalidCustomerName);
    });

    test('Check that User Cannot Book a Ticket with Empty Customer Email', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot book a ticket with an empty Customer Email.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, '', bookingData.customerPhone);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerEmailErrorMessage(bookingData.messages.invalidCustomerEmail);
    });

    test('Check that User Cannot Book a Ticket with Empty Customer Phone', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot book a ticket with an empty Customer Phone.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.enterCustomerDetails(bookingData.customerName, bookingData.customerEmail, '');
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerPhoneErrorMessage(bookingData.messages.invalidCustomerPhone);
    });

    test('Check that User Cannot Book a Ticket with All Empty Customer Details', async ({ eventsPage, eventDetailsPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the user cannot book a ticket with all empty Customer Details.');
        // Test Steps
        await eventsPage.navigate();
        await eventsPage.clickOnBookNowButton(eventTitle);
        await eventDetailsPage.clickOnConfirmBookingButton();
        await eventDetailsPage.assertCustomerNameErrorMessage(bookingData.messages.invalidCustomerName);
        await eventDetailsPage.assertCustomerEmailErrorMessage(bookingData.messages.invalidCustomerEmail);
        await eventDetailsPage.assertCustomerPhoneErrorMessage(bookingData.messages.invalidCustomerPhone);
    });

});