/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines eventController Tests.
 */


import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as eventController from "../src/api/v1/controllers/eventController";
import * as eventService from "../src/api/v1/services/eventService";

jest.mock("../src/api/v1/services/eventService");

describe("Event Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("successful getAllEvents", () => {
    it("Successful retrieval of events.", async () => {
      const mockEvents = [
        { id: "1", name: "Test Event", capacity: 100, date: "2024-12-31" },
      ];
      (eventService.getAllEvents as jest.Mock).mockReturnValue(mockEvents);

      await eventController.getAllEvents(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message: "Events retrieved",
        data: mockEvents,
      });
    });
  });

  describe("successful createEvent", () => {
    it("Successful event creation", async () => {
      const mockEvent = {
        name: "Test Event",
        capacity: 100,
        date: "2024-12-31"
      };
      const createdEvent = {
        id: "1",
        ...mockEvent,
      };

      mockReq.body = mockEvent;
      (eventService.createEvent as jest.Mock).mockReturnValue(createdEvent);

      await eventController.createEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message: "Event created",
        data: createdEvent,
      });
    });

    it("Successful updateEvent", async () => {
        const mockEvent = {
            name: "Updated Event",
            capacity: 150,
            date: "2024-12-31"
        };

        mockReq.params = { id: "Test Event" };
        mockReq.body = mockEvent;
        (eventService.updateEvent as jest.Mock).mockReturnValue({
            id: "Test Event",
            ...mockEvent,
        });

        await eventController.updateEvent(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            message: "Event updated",
            data: {
                id: "Test Event",
                ...mockEvent,
            },
        });
    });

    it("Successful deleteEvent", async () => {
        mockReq.params = { id: "Test Event" };
        (eventService.deleteEvent as jest.Mock).mockReturnValue(undefined);

        await eventController.deleteEvent(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(mockRes.json).toHaveBeenCalledWith({
            data: null,
            status: "success",
            message: "Event deleted",
        });
    });
});
});
