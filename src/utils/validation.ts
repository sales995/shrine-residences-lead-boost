/**
 * Shared validation constants and utilities
 * Used across both client-side forms and server-side edge functions
 */

/**
 * Indian mobile number validation regex
 * Matches 10-digit numbers starting with 6, 7, 8, or 9
 */
export const INDIAN_PHONE_REGEX = /^[6-9][0-9]{9}$/;

/**
 * Standardized error message for invalid phone numbers
 */
export const PHONE_ERROR_MESSAGE = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
