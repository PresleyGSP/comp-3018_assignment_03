import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { eventSchemas } from "../src/api/v1/validations/eventValidation";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid event data", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Event",
            capacity: 100,
            date: "2024-12-31",
            category: "workshop",
            status: "active",
            registrationCount: 5,
        };
        const middleware = validateRequest(eventSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation for invalid name", () => {
        // Arrange
        mockReq.body = {
            name: "Va", // Invalid: too short
            capacity: 5, // Valid: meets minimum
            date: "2024-12-31" // Valid date format
        };
        const middleware = validateRequest(eventSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext); 

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should fail validation for invalid capacity", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Event",
            capacity: 3, // Invalid: less than 5
            date: "2024-12-31" // Valid date format

        };
        const middleware = validateRequest(eventSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should fail validation for invalid date", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Event",
            capacity: 10,
            date: "invalid-date", // Invalid date format
        };
        const middleware = validateRequest(eventSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext); 

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should fail validation for invalid registration count", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Event",
            capacity: 10,
            date: "2024-12-31",
            registrationCount: 15, // Invalid: greater than capacity
        };
        const middleware = validateRequest(eventSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should fail validation for invalid status", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Event",
            capacity: 10,
            date: "2024-12-31",
            status: "invalid-status", // Invalid: not one of the allowed values
        };
        const middleware = validateRequest(eventSchemas.create);
        
        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);
        
        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });
    
    it("should fail validation for invalid category", () => {
        // Arrange
        mockReq.body = {
            name: "Valid Event",
            capacity: 10,
            date: "2024-12-31",
            category: "invalid-category", // Invalid: not one of the allowed values
        };
        const middleware = validateRequest(eventSchemas.create);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should get event by ID", () => {
        // Arrange
        mockReq.params = { id: "event123" };

        const middleware = validateRequest(eventSchemas.getById);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext); 

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();  

    });

    it("should fail validation for missing event ID", () => {
        // Arrange
        mockReq.params = {}; // Missing ID
        const middleware = validateRequest(eventSchemas.getById);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should update event by ID", () => {
        // Arrange
        mockReq.params = { id: "event123" };
        mockReq.body = {
            name: "Updated Event",
            capacity: 50,
            date: "2024-11-30",
            category: "conference",
            status: "active",
            registrationCount: 10,
        };
        const middleware = validateRequest(eventSchemas.update);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();  
    });

    it("should fail validation for missing event ID on update", () => {
        // Arrange
        mockReq.params = {}; // Missing ID
        mockReq.body = {
            name: "Updated Event",
            capacity: 50,
            date: "2024-11-30",
            category: "conference",
            status: "active",
            registrationCount: 10,
        };
        const middleware = validateRequest(eventSchemas.update);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });

    it("should delete event by ID", () => {
        // Arrange
        mockReq.params = { id: "event123" };
        const middleware = validateRequest(eventSchemas.delete);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();  
    });

    it("should fail validation for missing event ID on delete", () => {
        // Arrange
        mockReq.params = {}; // Missing ID
        const middleware = validateRequest(eventSchemas.delete);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
    });
})
