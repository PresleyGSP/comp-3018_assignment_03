import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as itemService from "../services/eventService";
import type { Event } from "../models/eventModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all events
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: Event[] = await itemService.getAllEvents();
        res.status(HTTP_STATUS.OK).json(
            successResponse(events, "Events retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single event by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const event: Event = await itemService.getEventById(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(event, "Event retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new event 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract validated data from request body
        const { name, capacity, date, registrationCount, status, category } = req.body;
        const eventData = { name, capacity, date, registrationCount, status, category };

        const newEvent: Event = await itemService.createEvent(eventData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEvent, "Event created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing event
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, capacity, date, registrationCount, status, category } = req.body;

        // Create update data object with only the fields that can be updated
        const updateData = { name, capacity, date, registrationCount, status, category };

        const updatedEvent: Event = await itemService.updateEvent(id, updateData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEvent, "Event updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes an event
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const event: Event = await itemService.deleteEvent(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(event, "Event deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};