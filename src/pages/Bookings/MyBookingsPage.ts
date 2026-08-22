import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click } from "../../utils/actions/ui/elementActions";
import { navigate } from "../../utils/actions/ui/browserActions";
import { assertHidden, assertText, assertTextContains, assertVisible } from "../../utils/assertions/ui/elementAssertions";
import { CancelBookingDialog } from "./CancelBookingDialog";
import { waitForPageToLoad } from "../../utils/waits/waits";

export class MyBookingsPage extends CancelBookingDialog {

    //=====================Locators=====================

    //=====================Variables====================
    private readonly myBookingsUrl = '/bookings';

    //=====================Constructor==================
    constructor(page: Page) {
        super(page);
    }

    //=================Dynamic Locators=================
    private bookingCard(bookingRef: string): Locator {
        return this.page.getByTestId('booking-card').filter({ hasText: bookingRef });
    }

    private bookingReference(bookingRef: string): Locator {
        return this.page.locator('//span[@id="booking-id"]/parent::div/span[1]').filter({ hasText: bookingRef });
    }

    private bookingStatus(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).locator('//span[@id="booking-id"]/parent::div/span[2]');
    }

    private viewBookingDetailsButton(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).getByRole('button', { name: 'View Details' });
    }

    private cancelBookingButton(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).getByRole('button', { name: 'Cancel Booking' });
    }

    private bookingEventTitle(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).locator('h3');
    }

    private bookingTickets(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).locator("//span[contains(., 'ticket')]");
    }

    private bookingEventCity(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).locator('//span[contains(text(),"📍")]');
    }

    private bookingTotalPrice(bookingRef: string): Locator {
        return this.bookingCard(bookingRef).locator('//p[text()="total"]/parent::div/p[1]');
    }

    //=====================Actions======================
    @step('Navigate to My Bookings Page')
    async navigate() {
        await navigate(this.page, this.myBookingsUrl);
    }

    @step('Click on View Details Button for Booking: {bookingRef}')
    async clickOnViewDetailsButton(bookingRef: string) {
        await click(this.viewBookingDetailsButton(bookingRef), 'View Details Button');
        await waitForPageToLoad(this.page);
    }

    @step('Click on Cancel Booking Button for Booking: {bookingRef}')
    async clickOnCancelBookingButton(bookingRef: string) {
        await click(this.cancelBookingButton(bookingRef), 'Cancel Booking Button');
    }

    //=====================Assertions===================
    @step('Assert Booking Card Is Displayed: {bookingRef}')
    async assertBookingCardIsDisplayed(bookingRef: string) {
        await assertVisible(this.bookingCard(bookingRef), 'Booking Card');
    }

    @step('Assert Booking Reference Is Displayed: {bookingRef}')
    async assertBookingReferenceIsDisplayed(bookingRef: string) {
        await assertVisible(this.bookingReference(bookingRef), 'Booking Reference');
    }

    @step('Assert Booking Status Is Correct: {bookingRef}, {expectedStatus}')
    async assertBookingStatusIsCorrect(bookingRef: string, expectedStatus: string) {
        await assertText(this.bookingStatus(bookingRef), expectedStatus, 'Booking Status');
    }

    @step('Assert Booking Event Title Is Correct: {bookingRef}, {expectedTitle}')
    async assertBookingEventTitleIsCorrect(bookingRef: string, expectedTitle: string) {
        await assertText(this.bookingEventTitle(bookingRef), expectedTitle, 'Booking Event Title');
    }

    @step('Assert Booking Tickets Count Is Correct: {bookingRef}, {expectedTicketsCount}')
    async assertBookingTicketsCountIsCorrect(bookingRef: string, expectedTicketsCount: string) {
        await assertTextContains(this.bookingTickets(bookingRef), expectedTicketsCount, 'Booking Tickets Count');
    }

    @step('Assert Booking Event City Is Correct: {bookingRef}, {expectedCity}')
    async assertBookingEventCityIsCorrect(bookingRef: string, expectedCity: string) {
        await assertTextContains(this.bookingEventCity(bookingRef), expectedCity, 'Booking Event City');
    }

    @step('Assert Booking Total Price Is Correct: {bookingRef}, {expectedTotalPrice}')
    async assertBookingTotalPriceIsCorrect(bookingRef: string, expectedTotalPrice: string) {
        await assertText(this.bookingTotalPrice(bookingRef), `$${expectedTotalPrice}`, 'Booking Total Price');
    }

    @step('Assert Booking Card Is Not Displayed: {bookingRef}')
    async assertBookingCardIsNotDisplayed(bookingRef: string) {
        await assertHidden(this.bookingCard(bookingRef), 'Booking Card');
    }
}