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
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

export default router;