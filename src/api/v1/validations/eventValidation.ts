/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines event validation schema.
 */

import Joi, { ObjectSchema } from "joi";

// Event operation schemas organized by request part
export const eventSchemas = {
    // POST /events - Create new event
    create: {
        body: Joi.object({
            name: Joi.string().required().min(3).messages({
                "any.required": "Validation error: \"name\" is required",
                "string.min": "Validation error: \"name\" length must be at least 3 characters long",
            }),
            date: Joi.date().required().messages({
                "any.required": "Validation error: \"date\" is required",
                "date.base": "Validation error: \"date\" must be greater than \"now\"",
            }),
            capacity: Joi.number().required().min(5).messages({
                "number.min": "Validation error: \"capacity\" must be greater than or equal to 5",
                "number.integer": "Validation error: \"capacity\" must be an integer",
            }),
            registrationCount: Joi.number().optional().max(Joi.ref("capacity")).messages({
                "number.max": "Validation error: \"registrationCount\" must be less than or equal to ref:capacity",
            }),
            status: Joi.string().valid("active", "cancelled", "completed").optional().messages({
                "any.only": "Validation error: \"status\" must be one of ['active', 'cancelled', or 'completed']",
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional().messages({
                "any.only": "Validation error: \"category\" must be one of ['conference', 'workshop', 'meetup', 'seminar', 'general']",
            }),
        }),
    },

    // GET /events/:id - Get single event
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },

     // PUT /events/:id - Update event
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
          name: Joi.string().optional().min(3).messages({
                "any.required": "Validation error: \"name\" is required",
                "string.min": "Validation error: \"name\" length must be at least 3 characters long",
            }),
            date: Joi.date().optional().messages({
                "date.base": "Validation error: \"date\" must be greater than \"now\"",
            }),
            capacity: Joi.number().optional().min(5).messages({
                "number.min": "Validation error: \"capacity\" must be greater than or equal to 5",
                "number.integer": "Validation error: \"capacity\" must be an integer",
            }),
            registrationCount: Joi.number().optional().max(Joi.ref("capacity")).messages({
                "number.max": "Validation error: \"registrationCount\" must be less than or equal to ref:capacity",
            }),
            status: Joi.string().optional().valid("active", "cancelled", "completed").messages({
                "any.only": "Validation error: \"status\" must be one of ['active', 'cancelled', or 'completed']",
            }),
            category: Joi.string().optional().valid("conference", "workshop", "meetup", "seminar", "general").messages({
                "any.only": "Validation error: \"category\" must be one of ['conference', 'workshop', 'meetup', 'seminar', 'general']",
            }),
        }),
    },

    // DELETE /events/:id - Delete event
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },
};