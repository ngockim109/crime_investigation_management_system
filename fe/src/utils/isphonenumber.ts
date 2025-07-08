/**
 * Check if a phone number matches common US formats
 * Examples: (123) 456-7890, 123-456-7890, 123.456.7890, +1 123 456 7890
 * @param phone - The phone number string to validate
 * @returns True if valid, false otherwise
 */
export function isUSPhoneNumber(phone_number: string) {
    const regex = /^\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phone_number);
}