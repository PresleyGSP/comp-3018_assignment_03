import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validations/eventValidation";
import * as itemController from "../controllers/itemController";

const router: Router = express.Router();

router.get("/events", eventController.getAllEvents);
router.post(
    "/events",
    validateRequest(eventSchemas.create),
    eventController.createEvent
);
router.get(
    "/events/:id",
    validateRequest(eventSchemas.getById),
    eventController.getEventById
);
router.put("/events/:id", validateRequest(eventSchemas.update), eventController.updateEvent);
router.delete("/events/:id", validateRequest(eventSchemas.delete), eventController.deleteEvent);

export default router;