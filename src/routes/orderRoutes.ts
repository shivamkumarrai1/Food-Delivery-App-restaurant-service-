// src/routes/orderRoutes.ts
import express, { Request, Response } from "express";
import { createOrder } from "../controllers/orderController";
console.log(typeof createOrder); // Should print 'function'


const router = express.Router();
console.log("Type of createOrder:", typeof createOrder); // should be "function"


router.post("/", (req: Request, res: Response) => {
    createOrder(req, res);
});

export default router;

