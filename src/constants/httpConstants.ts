/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines HTTP status codes.
 */

export const HTTP_STATUS = {
    // Success responses
    OK: 200,
    CREATED: 201,

    // Client error responses
    BAD_REQUEST: 400,
    NOT_FOUND: 404,

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
} as const;
