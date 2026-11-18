/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines the event model.
 */

/**
 * Represents an event in the system
 */
export interface Event {
    id: string;
    name: string;
    capacity: number;
    date: Date;
    registrationCount?: number;
    status?: string;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
}