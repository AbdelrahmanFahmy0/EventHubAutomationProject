import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click, type, getElementText } from "../../utils/actions/ui/elementActions";
import { assertDisabled, assertText, assertTextContains, assertVisible } from "../../utils/assertions/ui/elementAssertions";
import { refresh } from "../../utils/actions/ui/browserActions";

export class EventDetailsPage {

    //=====================Locators=====================
    private readonly page: Page;
    private readonly eventCategory: Locator;
    private readonly eventVenue: Locator;
    private readonly eventCity: Locator;
    private readonly eventTotalSeats: Locator;
    private readonly eventPrice: Locator;
    private readonly ticketPrice: Locator;
    private readonly customerNameField: Locator;
    private readonly customerEmailField: Locator;
    private readonly customerPhoneField: Locator;
    private readonly confirmBookingButton: Locator;
    private readonly availableSeatsCount: Locator;
    private readonly ticketsCount: Locator;
    private readonly increaseTicketCountButton: Locator;
    private readonly decreaseTicketCountButton: Locator;
    private readonly totalPrice: Locator;
    private readonly bookingConfirmationMessage: Locator;
    private readonly bookingReference: Locator;
    private readonly viewMyBookingsButton: Locator;
    private readonly customerNameErrorMessage: Locator;
    private readonly customerEmailErrorMessage: Locator;
    private readonly customerPhoneErrorMessage: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.eventCategory = this.page.locator('//h1/preceding-sibling::div/span[1]');
        this.eventVenue = this.page.locator('//p[text()="Venue"]/following-sibling::p');
        this.eventCity = this.page.locator('//p[text()="City"]/following-sibling::p');
        this.eventTotalSeats = this.page.locator('//p[text()="Available"]/following-sibling::p/span');
        this.eventPrice = this.page.locator('//p[text()="Price per ticket"]/following-sibling::p');
        this.ticketPrice = this.page.locator('//h2[text()="Book Tickets"]/following-sibling::span');
        this.customerNameField = this.page.getByTestId('customerName');
        this.customerEmailField = this.page.getByTestId('customer-email');
        this.customerPhoneField = this.page.getByTestId('phone');
        this.confirmBookingButton = this.page.getByTestId('confirm-booking');
        this.availableSeatsCount = this.page.locator('//p[text()="Available"]/following-sibling::p/span');
        this.ticketsCount = this.page.getByTestId('ticket-count');
        this.increaseTicketCountButton = this.page.getByRole('button', { name: '+' });
        this.decreaseTicketCountButton = this.page.getByRole('button', { name: '−' });
        this.totalPrice = this.page.locator('//span[text()="Total"]/following-sibling::span');
        this.bookingConfirmationMessage = this.page.locator('h3').first();
        this.bookingReference = this.page.locator('//span[text()="Booking Ref"]/following-sibling::span/span');
        this.viewMyBookingsButton = this.page.getByRole('button', { name: 'View My Bookings' });
        this.customerNameErrorMessage = this.page.locator('//input[@id="customerName"]/parent::div/p');
        this.customerEmailErrorMessage = this.page.locator('//input[@id="customer-email"]/parent::div/p');
        this.customerPhoneErrorMessage = this.page.locator('//input[@id="phone"]/parent::div/p');
    }


    //=====================Actions======================
    @step('Enter Customer Name: {customerName}')
    async enterCustomerName(customerName: string) {
        await type(this.customerNameField, customerName, 'Customer Name Field');
    }

    @step('Enter Customer Email: {customerEmail}')
    async enterCustomerEmail(customerEmail: string) {
        await type(this.customerEmailField, customerEmail, 'Customer Email Field');
    }

    @step('Enter Customer Phone: {customerPhone}')
    async enterCustomerPhone(customerPhone: string) {
        await type(this.customerPhoneField, customerPhone, 'Customer Phone Field');
    }

    async enterCustomerDetails(customerName: string, customerEmail: string, customerPhone: string) {
        await this.enterCustomerName(customerName);
        await this.enterCustomerEmail(customerEmail);
        await this.enterCustomerPhone(customerPhone);
    }

    @step('Click on Increase Ticket Count Button')
    async clickOnIncreaseTicketCountButton() {
        await click(this.increaseTicketCountButton, 'Increase Ticket Count Button');
    }

    @step('Click on Decrease Ticket Count Button')
    async clickOnDecreaseTicketCountButton() {
        await click(this.decreaseTicketCountButton, 'Decrease Ticket Count Button');
    }

    @step('Click on Confirm Booking Button')
    async clickOnConfirmBookingButton() {
        await click(this.confirmBookingButton, 'Confirm Booking Button');
    }

    @step('Click on View My Bookings Button')
    async clickOnViewMyBookingsButton() {
        await click(this.viewMyBookingsButton, 'View My Bookings Button');
    }

    @step('Get Booking Reference')
    async getBookingReference(): Promise<string | null> {
        return await getElementText(this.bookingReference, 'Booking Reference');
    }

    @step('Get Available Seats Count')
    async getAvailableSeatsCount(): Promise<number> {
        const availableSeatsText = await getElementText(this.availableSeatsCount, 'Available Seats Count');
        const availableSeats = availableSeatsText?.split('/')[0].trim();
        return Number.parseInt(availableSeats ?? '0', 10);
    }

    //=====================Assertions===================
    @step('Assert Event Category Is Correct: {expectedCategory}')
    async assertEventCategoryIsCorrect(expectedCategory: string) {
        await assertText(this.eventCategory, expectedCategory, 'Event Category');
    }

    @step('Assert Event Venue Is Correct: {expectedVenue}')
    async assertEventVenueIsCorrect(expectedVenue: string) {
        await assertText(this.eventVenue, expectedVenue, 'Event Venue');
    }

    @step('Assert Event City Is Correct: {expectedCity}')
    async assertEventCityIsCorrect(expectedCity: string) {
        await assertText(this.eventCity, expectedCity, 'Event City');
    }

    @step('Assert Event Total Seats Is Correct: {expectedTotalSeats}')
    async assertEventTotalSeatsIsCorrect(expectedTotalSeats: string) {
        await assertTextContains(this.eventTotalSeats, expectedTotalSeats, 'Event Total Seats');
    }

    @step('Assert Event Price Is Correct: {expectedPrice}')
    async assertEventPriceIsCorrect(expectedPrice: string) {
        await assertText(this.eventPrice, `$${expectedPrice}`, 'Event Price');
    }

    @step('Assert Ticket Price Is Correct: {expectedTicketPrice}')
    async assertTicketPriceIsCorrect(expectedTicketPrice: string) {
        await assertText(this.ticketPrice, `$${expectedTicketPrice}`, 'Ticket Price');
    }

    @step('Assert Available Seats Count Is Correct: {expectedAvailableSeats}')
    async assertAvailableSeatsCountIsCorrect(expectedAvailableSeats: number) {
        await refresh(this.page);
        await assertTextContains(this.availableSeatsCount, expectedAvailableSeats.toString(), 'Available Seats Count');
    }

    @step('Assert Tickets Count Is Correct: {expectedTicketsCount}')
    async assertTicketsCountIsCorrect(expectedTicketsCount: string) {
        await assertText(this.ticketsCount, expectedTicketsCount, 'Tickets Count');
    }

    @step('Assert Total Price Is Correct: {expectedTotalPrice}')
    async assertTotalPriceIsCorrect(expectedTotalPrice: string) {
        await assertText(this.totalPrice, `$${expectedTotalPrice}`, 'Total Price');
    }

    @step('Assert Booking Confirmation Message Is Correct: {expectedMessage}')
    async assertBookingConfirmationMessage(expectedMessage: string) {
        await assertText(this.bookingConfirmationMessage, expectedMessage, 'Booking Confirmation Message');
    }

    @step('Assert Increase Ticket Count Button Is Disabled')
    async assertIncreaseTicketCountButtonIsDisabled() {
        await assertDisabled(this.increaseTicketCountButton, 'Increase Ticket Count Button');
    }

    @step('Assert Decrease Ticket Count Button Is Disabled')
    async assertDecreaseTicketCountButtonIsDisabled() {
        await assertDisabled(this.decreaseTicketCountButton, 'Decrease Ticket Count Button');
    }

    @step('Assert Customer Name Error Message Is Correct: {message}')
    async assertCustomerNameErrorMessage(message: string) {
        await assertText(this.customerNameErrorMessage, message, 'Customer Name Error Message');
    }

    @step('Assert Customer Email Error Message Is Correct: {message}')
    async assertCustomerEmailErrorMessage(message: string) {
        await assertText(this.customerEmailErrorMessage, message, 'Customer Email Error Message');
    }

    @step('Assert Customer Phone Error Message Is Correct: {message}')
    async assertCustomerPhoneErrorMessage(message: string) {
        await assertText(this.customerPhoneErrorMessage, message, 'Customer Phone Error Message');
    }
}