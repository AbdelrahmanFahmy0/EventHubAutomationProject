/**
 * Returns a 7-character suffix based on time plus random characters.
 * This keeps the values short while avoiding collisions between parallel calls.
 * Example: f47ac1c
 * @returns {string} A 7-character unique string.
 */
export function getTimestamp(): string {
    const time = Date.now().toString(36);
    const randomPart = Math.random().toString(36).slice(2, 8);
    return `${time}${randomPart}`.slice(-7).toLowerCase();
}

/**
 * Generates a future date in ISO 8601 format by adding the specified number of days to today.
 * @param days - Number of days to add to today's date.
 * @returns The calculated date in ISO 8601 format.
 */
export function getDateAfterDays(days: number): string {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString();
}