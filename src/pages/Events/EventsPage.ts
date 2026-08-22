import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click, getElementText, selectOptionByValue, type } from "../../utils/actions/ui/elementActions";
import { navigate } from "../../utils/actions/ui/browserActions";
import { assertText, assertTextContains, assertVisible } from "../../utils/assertions/ui/elementAssertions";
import { waitForPageToLoad } from "../../utils/waits/waits";

export class EventsPage {

    //=====================Locators=====================
    private readonly page: Page;
    private readonly addNewEventButton: Locator;
    private readonly categoryFilter: Locator;
    private readonly cityFilter: Locator;
    private readonly firstEventCard: Locator;
    private readonly firstEventTitle: Locator;
    private readonly firstEventVenueAndCity: Locator;
    private readonly firstEventCategory: Locator;
    private readonly clearFiltersButton: Locator;
    private readonly noEventsMessage: Locator;
    private readonly searchBar: Locator;

    //=====================Variables====================
    private readonly eventsUrl = '/events';

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.addNewEventButton = this.page.getByRole('link', { name: 'Add New Event' });
        this.categoryFilter = this.page.locator('//option[text()="All Categories"]//parent::select');
        this.cityFilter = this.page.locator('//option[text()="All Cities"]//parent::select');
        this.firstEventCard = this.page.getByTestId('event-card').first();
        this.firstEventTitle = this.firstEventCard.getByRole('heading').first();
        this.firstEventVenueAndCity = this.firstEventCard.locator('.line-clamp-1').last();
        this.firstEventCategory = this.firstEventCard.locator('span').first();
        this.clearFiltersButton = this.page.getByRole('button', { name: 'Clear filters' });
        this.noEventsMessage = this.page.locator('h3').first();
        this.searchBar = this.page.getByRole('textbox', { name: 'Search events, venues…' });
    }

    //=================Dynamic Locators=================
    private eventCard(eventTitle: string): Locator {
        return this.page.getByTestId('event-card').filter({ hasText: eventTitle });
    }

    private eventCardVenueAndCity(eventTitle: string): Locator {
        return this.eventCard(eventTitle).locator('.line-clamp-1').last();
    }

    private eventCardPrice(eventTitle: string): Locator {
        return this.eventCard(eventTitle).locator('//a[@id="book-now-btn"]//parent::div//p');
    }

    private eventCardTotalSeats(eventTitle: string): Locator {
        return this.eventCard(eventTitle).locator('//a[@id="book-now-btn"]//parent::div//span');
    }

    private eventCardCategory(eventTitle: string): Locator {
        return this.eventCard(eventTitle).locator('span').first();
    }

    private eventBookNowButton(eventTitle: string): Locator {
        return this.eventCard(eventTitle).getByRole('link', { name: 'Book Now' });
    }

    //=====================Actions======================
    @step('Navigate to Events Page')
    async navigate() {
        await navigate(this.page, this.eventsUrl);
    }

    @step('Click on Add New Event Button')
    async clickOnAddNewEventButton() {
        await click(this.addNewEventButton, 'Add New Event Button');
    }

    @step('Click on Book Now Button for Event: {eventTitle}')
    async clickOnBookNowButton(eventTitle: string) {
        await click(this.eventBookNowButton(eventTitle), 'Book Now Button');
    }

    @step('Select Category Filter: {category}')
    async selectCategoryFilter(category: string) {
        await selectOptionByValue(this.categoryFilter, category, 'Category Filter');
        await waitForPageToLoad(this.page);
    }

    @step('Select City Filter: {city}')
    async selectCityFilter(city: string) {
        await selectOptionByValue(this.cityFilter, city, 'City Filter');
        await waitForPageToLoad(this.page);
    }

    @step('Click on Clear Filters Button')
    async clickOnClearFiltersButton() {
        await click(this.clearFiltersButton, 'Clear Filters Button');
        await waitForPageToLoad(this.page);
    }

    @step('Search for Event: {searchKey}')
    async searchForEvent(searchKey: string) {
        await type(this.searchBar, searchKey, 'Search Bar');
        await waitForPageToLoad(this.page);
    }

    @step('Get Available Seats For Event: {eventTitle}')
    async getAvailableSeatsForEvent(eventTitle: string): Promise<number> {
        const availableSeatsText = await getElementText(this.eventCardTotalSeats(eventTitle), 'Available Seats for Event');
        const availableSeats = availableSeatsText?.split(' ')[0].trim();
        return Number.parseInt(availableSeats ?? '0', 10);
    }

    //=====================Assertions===================
    @step('Assert Event is Displayed in Events List: {eventTitle}')
    async assertEventIsDisplayedInEventsList(eventTitle: string) {
        await assertVisible(this.eventCard(eventTitle), 'Event Card');
    }

    @step('Assert Event Venue Is Correct: {eventTitle}, {expectedVenue}')
    async assertEventVenueIsCorrect(eventTitle: string, expectedVenue: string) {
        await assertTextContains(this.eventCardVenueAndCity(eventTitle), expectedVenue, 'Event Venue');
    }

    @step('Assert Event City Is Correct: {eventTitle}, {expectedCity}')
    async assertEventCityIsCorrect(eventTitle: string, expectedCity: string) {
        await assertTextContains(this.eventCardVenueAndCity(eventTitle), expectedCity, 'Event City');
    }

    @step('Assert Event Price Is Correct: {eventTitle}, {expectedPrice}')
    async assertEventPriceIsCorrect(eventTitle: string, expectedPrice: string) {
        await assertText(this.eventCardPrice(eventTitle), `$${expectedPrice}`, 'Event Price');
    }

    @step('Assert Event Total Seats Is Correct: {eventTitle}, {expectedTotalSeats}')
    async assertEventTotalSeatsIsCorrect(eventTitle: string, expectedTotalSeats: string) {
        await assertTextContains(this.eventCardTotalSeats(eventTitle), expectedTotalSeats, 'Event Total Seats');
    }

    @step('Assert Event Category Is Correct: {eventTitle}, {expectedCategory}')
    async assertEventCategoryIsCorrect(eventTitle: string, expectedCategory: string) {
        await assertText(this.eventCardCategory(eventTitle), expectedCategory, 'Event Category');
    }

    @step('Assert First Event Title Is Correct: {expectedTitle}')
    async assertFirstEventTitleIsCorrect(expectedTitle: string) {
        await assertText(this.firstEventTitle, expectedTitle, 'First Event Title');
    }

    @step('Assert First Event Venue Is Correct: {expectedVenue}')
    async assertFirstEventVenueIsCorrect(expectedVenue: string) {
        await assertTextContains(this.firstEventVenueAndCity, expectedVenue, 'First Event Venue');
    }

    @step('Assert First Event City Is Correct: {expectedCity}')
    async assertFirstEventCityIsCorrect(expectedCity: string) {
        await assertTextContains(this.firstEventVenueAndCity, expectedCity, 'First Event City');
    }

    @step('Assert First Event Category Is Correct: {expectedCategory}')
    async assertFirstEventCategoryIsCorrect(expectedCategory: string) {
        await assertText(this.firstEventCategory, expectedCategory, 'First Event Category');
    }

    @step('Assert No Events Message Is Displayed: {expectedMessage}')
    async assertNoEventsMessageIsDisplayed(expectedMessage: string) {
        await assertText(this.noEventsMessage, expectedMessage, 'No Events Message');
    }
}