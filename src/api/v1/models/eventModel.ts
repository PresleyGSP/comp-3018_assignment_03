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