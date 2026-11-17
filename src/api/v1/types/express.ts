/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines event validation middleware types.
 */

import { Request, Response, NextFunction } from "express";

export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;