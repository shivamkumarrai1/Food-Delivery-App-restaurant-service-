// src/controllers/orderController.ts
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import axios from "axios";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { restaurantId, items, totalPrice } = req.body;

        // 🔍 Check if restaurant exists and is accepting orders
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });

        if (!restaurant || !restaurant.isOnline) {
            return res.status(400).json({ message: "Restaurant is not accepting orders" });
        }

        // 🛵 Call delivery service to assign a delivery agent
        const response = await axios.post("http://localhost:3002/api/assign");
        const deliveryAgent = response.data;

        if (!deliveryAgent || !deliveryAgent.id) {
            return res.status(400).json({ message: "No free agents available" });
        }

        // 📦 Create order with assigned agent
        const order = await prisma.order.create({
            data: {
                restaurantId,
                items,
                totalPrice,
                status: "ASSIGNED",
                deliveryAgentId: deliveryAgent.id,
            },
        });

        return res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



