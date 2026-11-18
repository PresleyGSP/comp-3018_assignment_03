/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines eventService Tests.
 */

import * as eventService from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Event Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an event successfully", async () => {
        // Arrange
        const mockEventData = {
            name: "Test Event",
            capacity: 100,
            date: new Date("2024-12-31")
        };
        const mockDocumentId = "test-event-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result = await eventService.createEvent(mockEventData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "events",
            expect.objectContaining({
                name: mockEventData.name,
                capacity: mockEventData.capacity,
                date: mockEventData.date,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEventData.name);
    });

    it("should update an event successfully", async () => {
        // Arrange
        const mockEventId = "test-event-id";
        const mockUpdateData = {
            name: "Updated Event",
            capacity: 150,
            date: new Date("2024-12-31")
        };

        const mockDoc = {
            id: mockEventId,
            exists: true,
            data: () => ({
                name: "Original Event",
                capacity: 100,
                date: new Date("2024-12-01"),
            }),
        };
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result = await eventService.updateEvent(mockEventId, mockUpdateData);

        // Assert
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "events",
            mockEventId,
            expect.objectContaining({
                name: mockUpdateData.name,
                capacity: mockUpdateData.capacity,
                date: mockUpdateData.date,
                updatedAt: expect.any(Date),
            })
        );
        expect(result.id).toBe(mockEventId);
        expect(result.name).toBe("Original Event");
    });

    it("should delete an event successfully", async () => {
        // Arrange
        const mockEventId = "test-event-id";

        const mockDoc = {
            id: mockEventId,
            exists: true,
            data: () => ({}),
        };
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await eventService.deleteEvent(mockEventId);

        // Assert
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "events",
            mockEventId
        );
    });

    it("should get all events successfully", async () => {
        // Arrange
        const mockDocs = [
            {
                id: "1",
                data: () => ({ name: "Event 1", capacity: 100, date: new Date("2024-12-31") }),
            },
            {
                id: "2",
                data: () => ({ name: "Event 2", capacity: 200, date: new Date("2025-01-15") }),
            },
        ];
        const mockEvents = [
            {
                id: "1",
                name: "Event 1",
                capacity: 100,
                date: new Date("2024-12-31"),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            },
            {
                id: "2",
                name: "Event 2",
                capacity: 200,
                date: new Date("2025-01-15"),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            },
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({ docs: mockDocs });

        // Act
        const result = await eventService.getAllEvents();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("events");
        expect(result).toEqual(mockEvents);
    });

    it("should get an event by ID successfully", async () => {
        // Arrange
        const mockEventId = "test-event-id";
        const mockEvent = {
            id: mockEventId,
            name: "Test Event",
            capacity: 100,
            date: new Date("2024-12-31"),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        };

        const mockDoc = {
            id: mockEventId,
            exists: true,
            data: () => ({
                name: "Test Event",
                capacity: 100,
                date: new Date("2024-12-31"),
            }),
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        // Act
        const result = await eventService.getEventById(mockEventId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "events",
            mockEventId
        );
        expect(result).toEqual(mockEvent);
    });
});