/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines event Routes Tests.
 */

import request from "supertest";
import app from "../src/app";
import * as eventController from "../src/api/v1/controllers/eventController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/eventController", () => ({
    getAllEvents: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEvent: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEvent: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEvent: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEventById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Event Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/events/", () => {
        it("should call getAllEvents controller", async () => {
            await request(app).get("/api/v1/events/");
            expect(eventController.getAllEvents).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/events/", () => {
        it("should call createEvent controller with valid data", async () => {
            const mockEvent = {
                name: "Test event",
                capacity: 100,
                date: "2024-12-31",
            }; 

            await request(app).post("/api/v1/events/").send(mockEvent);
            expect(eventController.createEvent).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/events/:id", () => {
        it("should call updateEvent controller with valid data", async () => {
            const mockEvent = {
                name: "Updated Event",
                capacity: 150,
                date: "2024-12-31",
            }; 

            await request(app).put("/api/v1/events/testId").send(mockEvent);
            expect(eventController.updateEvent).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/events/:id", () => {
        it("should call deleteEvent controller with valid data", async () => {
            await request(app).delete("/api/v1/events/testId");
            expect(eventController.deleteEvent).toHaveBeenCalled();
        });
    });
})