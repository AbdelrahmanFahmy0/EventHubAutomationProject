import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click } from "../../utils/actions/ui/elementActions";
import { assertText, assertVisible } from "../../utils/assertions/ui/elementAssertions";
import { CancelBookingDialog } from "./CancelBookingDialog";

export class BookingDetailsPage extends CancelBookingDialog {

    //=====================Locators=====================
    private readonly cancelBookingButton: Locator;
    private readonly bookingReference: Locator;
    private readonly bookingStatus: Locator;
    private readonly bookingEventTitle: Locator;
    private readonly bookingEventCategory: Locator;
    private readonly bookingEventVenue: Locator;
    private readonly bookingEventCity: Locator;
    private readonly customerName: Locator;
    private readonly customerEmail: Locator;
    private readonly customerPhone: Locator;
    private readonly bookingTickets: Locator;
    private readonly pricePerTicket: Locator;
    private readonly bookingTotalPrice: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        super(page);
        this.cancelBookingButton = this.page.locator('//button[text()="Cancel Booking"]');
        this.bookingReference = this.page.locator('//button[text()="Cancel Booking"]/preceding-sibling::div//span[1]');
        this.bookingStatus = this.page.locator('//button[text()="Cancel Booking"]/preceding-sibling::div//span[2]');
        this.bookingEventTitle = this.page.locator('//button[text()="Cancel Booking"]/preceding-sibling::div/h1');
        this.bookingEventCategory = this.page.locator('//span[text()="Category"]/following-sibling::span');
        this.bookingEventVenue = this.page.locator('//span[text()="Venue"]/following-sibling::span');
        this.bookingEventCity = this.page.locator('//span[text()="City"]/following-sibling::span');
        this.customerName = this.page.locator('//span[text()="Name"]/following-sibling::span');
        this.customerEmail = this.page.locator('//span[text()="Email"]/following-sibling::span');
        this.customerPhone = this.page.locator('//span[text()="Phone"]/following-sibling::span');
        this.bookingTickets = this.page.locator('//span[text()="Tickets"]/following-sibling::span');
        this.pricePerTicket = this.page.locator('//span[text()="Price per ticket"]/following-sibling::span');
        this.bookingTotalPrice = this.page.locator('//span[text()="Total Paid"]/following-sibling::span');
    }

    //=====================Actions======================
    @step('Click on Cancel Booking Button')
    async clickOnCancelBookingButton() {
        await click(this.cancelBookingButton, 'Cancel Booking Button');
    }

    //=====================Assertions===================
    @step('Assert Booking Reference Is Displayed')
    async assertBookingReferenceIsDisplayed() {
        await assertVisible(this.bookingReference, 'Booking Reference');
    }

    @step('Assert Booking Status Is Correct: {expectedStatus}')
    async assertBookingStatusIsCorrect(expectedStatus: string) {
        await assertText(this.bookingStatus, expectedStatus, 'Booking Status');
    }

    @step('Assert Booking Event Title Is Correct: {expectedTitle}')
    async assertBookingEventTitleIsCorrect(expectedTitle: string) {
        await assertText(this.bookingEventTitle, expectedTitle, 'Booking Event Title');
    }

    @step('Assert Booking Event Category Is Correct: {expectedCategory}')
    async assertBookingEventCategoryIsCorrect(expectedCategory: string) {
        await assertText(this.bookingEventCategory, expectedCategory, 'Booking Event Category');
    }

    @step('Assert Booking Event Venue Is Correct: {expectedVenue}')
    async assertBookingEventVenueIsCorrect(expectedVenue: string) {
        await assertText(this.bookingEventVenue, expectedVenue, 'Booking Event Venue');
    }

    @step('Assert Booking Event City Is Correct: {expectedCity}')
    async assertBookingEventCityIsCorrect(expectedCity: string) {
        await assertText(this.bookingEventCity, expectedCity, 'Booking Event City');
    }

    @step('Assert Customer Name Is Correct: {expectedName}')
    async assertCustomerNameIsCorrect(expectedName: string) {
        await assertText(this.customerName, expectedName, 'Customer Name');
    }

    @step('Assert Customer Email Is Correct: {expectedEmail}')
    async assertCustomerEmailIsCorrect(expectedEmail: string) {
        await assertText(this.customerEmail, expectedEmail, 'Customer Email');
    }

    @step('Assert Customer Phone Is Correct: {expectedPhone}')
    async assertCustomerPhoneIsCorrect(expectedPhone: string) {
        await assertText(this.customerPhone, expectedPhone, 'Customer Phone');
    }

    @step('Assert Booking Tickets Count Is Correct: {expectedTicketsCount}')
    async assertBookingTicketsCountIsCorrect(expectedTicketsCount: string) {
        await assertText(this.bookingTickets, expectedTicketsCount, 'Booking Tickets Count');
    }

    @step('Assert Price Per Ticket Is Correct: {expectedPricePerTicket}')
    async assertPricePerTicketIsCorrect(expectedPricePerTicket: string) {
        await assertText(this.pricePerTicket, `$${expectedPricePerTicket}`, 'Price Per Ticket');
    }

    @step('Assert Booking Total Price Is Correct: {expectedTotalPrice}')
    async assertBookingTotalPriceIsCorrect(expectedTotalPrice: string) {
        await assertText(this.bookingTotalPrice, `$${expectedTotalPrice}`, 'Booking Total Price');
    }
}