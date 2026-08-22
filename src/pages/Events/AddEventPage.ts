import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click, type, selectOptionByValue } from "../../utils/actions/ui/elementActions";
import { goBack, navigate } from "../../utils/actions/ui/browserActions";
import { assertText } from "../../utils/assertions/ui/elementAssertions";

export class AddEventPage {

    //=====================Locators=====================
    private readonly page: Page;
    private readonly titleField: Locator;
    private readonly categoryField: Locator;
    private readonly cityField: Locator;
    private readonly venueField: Locator;
    private readonly dateField: Locator;
    private readonly priceField: Locator;
    private readonly totalSeatsField: Locator;
    private readonly addEventButton: Locator;
    private readonly successMessage: Locator;
    private readonly titleErrorMessage: Locator;
    private readonly cityErrorMessage: Locator
    private readonly venueErrorMessage: Locator;
    private readonly dateErrorMessage: Locator;
    private readonly priceErrorMessage: Locator
    private readonly totalSeatsErrorMessage: Locator;

    //=====================Variables====================
    private readonly addEventUrl = '/admin/events';

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.titleField = this.page.getByTestId('event-title-input');
        this.categoryField = this.page.getByTestId('category');
        this.cityField = this.page.getByTestId('city');
        this.venueField = this.page.getByTestId('venue');
        this.dateField = this.page.getByTestId('event-date-&-time');
        this.priceField = this.page.getByTestId('price-($)');
        this.totalSeatsField = this.page.getByTestId('total-seats');
        this.addEventButton = this.page.getByRole('button', { name: '+ Add Event' });
        this.successMessage = this.page.locator('.pointer-events-auto p');
        this.titleErrorMessage = this.page.locator('//input[@id="event-title-input"]//following-sibling::p');
        this.cityErrorMessage = this.page.locator('//input[@id="city"]//following-sibling::p');
        this.venueErrorMessage = this.page.locator('//input[@id="venue"]//following-sibling::p');
        this.dateErrorMessage = this.page.locator('//input[@id="event-date-&-time"]//following-sibling::p');
        this.priceErrorMessage = this.page.locator('//input[@id="price-($)"]//following-sibling::p');
        this.totalSeatsErrorMessage = this.page.locator('//input[@id="total-seats"]//following-sibling::p');
    }

    //=====================Actions======================
    @step('Navigate to Add Event Page')
    async navigate() {
        await navigate(this.page, this.addEventUrl);
    }

    @step('Enter Event Title: {eventTitle}')
    async enterEventTitle(eventTitle: string) {
        await type(this.titleField, eventTitle, 'Event Title Field');
    }

    @step('Select Event Category: {eventCategory}')
    async selectEventCategory(eventCategory: string) {
        await selectOptionByValue(this.categoryField, eventCategory, 'Event Category Field');
    }

    @step('Enter Event City: {eventCity}')
    async enterEventCity(eventCity: string) {
        await type(this.cityField, eventCity, 'Event City Field');
    }

    @step('Enter Event Venue: {eventVenue}')
    async enterEventVenue(eventVenue: string) {
        await type(this.venueField, eventVenue, 'Event Venue Field');
    }

    @step('Enter Event Date: {eventDate}')
    async enterEventDate(eventDate: string) {
        await type(this.dateField, eventDate, 'Event Date & Time Field');
    }

    @step('Enter Event Price: {eventPrice}')
    async enterEventPrice(eventPrice: string) {
        await type(this.priceField, eventPrice, 'Event Price Field');
    }

    @step('Enter Event Total Seats: {eventTotalSeats}')
    async enterEventTotalSeats(eventTotalSeats: string) {
        await type(this.totalSeatsField, eventTotalSeats, 'Event Total Seats Field');
    }

    async enterEventDetails(eventTitle: string, eventCategory: string, eventCity: string, eventVenue: string, eventDate: string, eventPrice: string, eventTotalSeats: string) {
        await this.enterEventTitle(eventTitle);
        await this.selectEventCategory(eventCategory);
        await this.enterEventCity(eventCity);
        await this.enterEventVenue(eventVenue);
        await this.enterEventDate(eventDate);
        await this.enterEventPrice(eventPrice);
        await this.enterEventTotalSeats(eventTotalSeats);
    }

    @step('Click on Add Event Button')
    async clickOnAddEventButton() {
        await click(this.addEventButton, 'Add Event Button');
    }

    @step('Navigate Back to Events Page')
    async navigateBackToEventsPage() {
        await goBack(this.page);
    }

    //=====================Assertions===================
    @step('Assert Event is Added Successfully: {message}')
    async assertEventIsAddedSuccessfully(message: string) {
        await assertText(this.successMessage, message, 'Event Success Message');
    }

    @step('Assert Event Title Error Message Is Correct: {message}')
    async assertEventTitleErrorMessage(message: string) {
        await assertText(this.titleErrorMessage, message, 'Event Title Error Message');
    }

    @step('Assert Event City Error Message Is Correct: {message}')
    async assertEventCityErrorMessage(message: string) {
        await assertText(this.cityErrorMessage, message, 'Event City Error Message');
    }

    @step('Assert Event Venue Error Message Is Correct: {message}')
    async assertEventVenueErrorMessage(message: string) {
        await assertText(this.venueErrorMessage, message, 'Event Venue Error Message');
    }

    @step('Assert Event Date Error Message Is Correct: {message}')
    async assertEventDateErrorMessage(message: string) {
        await assertText(this.dateErrorMessage, message, 'Event Date Error Message');
    }

    @step('Assert Event Price Error Message Is Correct: {message}')
    async assertEventPriceErrorMessage(message: string) {
        await assertText(this.priceErrorMessage, message, 'Event Price Error Message');
    }

    @step('Assert Event Total Seats Error Message Is Correct: {message}')
    async assertEventTotalSeatsErrorMessage(message: string) {
        await assertText(this.totalSeatsErrorMessage, message, 'Event Total Seats Error Message');
    }
}