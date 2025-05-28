import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import axios from "axios"
export const getOnlineRestaurants = async (_req: Request, res: Response) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            where: {
                isOnline: true,
            },
            include: {
                menu: true,
            },
        });

        return res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching online restaurants:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createRestaurant = async (req: Request, res: Response) => {
    const { name, menu } = req.body;
    try {
        const restaurant = await prisma.restaurant.create({
            data: { name, menu, isOnline: false },
        });
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).json({ error: "Failed to create restaurant" });
    }
};

export const updateMenu = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { menu } = req.body;
    try {
        const restaurant = await prisma.restaurant.update({
            where: { id },
            data: { menu },
        });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: "Failed to update menu" });
    }
};

export const toggleStatus = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { isOnline } = req.body;
    try {
        const restaurant = await prisma.restaurant.update({
            where: { id },
            data: { isOnline },
        });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
};

export const handleOrderStatus = async (req: Request, res: Response) => {
    const { id, oid } = req.params;
    const { status } = req.body; // accepted or rejected

    try {
        const order = await prisma.order.update({
            where: { id: parseInt(oid) },
            data: { status },
        });

        // If order is rejected, free the assigned delivery agent
        if (status === "rejected" && order.deliveryAgentId) {
            await axios.post("http://localhost:3002/api/delivery/available", {
                agentId: order.deliveryAgentId,
            });
        }

        res.json(order);
    } catch (err) {
        console.error("Failed to update order status:", err);
        res.status(500).json({ error: "Failed to update order status" });
    }
};
// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: { menu: true },
        });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch restaurants" });
    }
};

// Get restaurant by ID
export const getRestaurantById = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const id = parseInt(req.params.id);
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            include: { menu: true },
        });

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        return res.status(200).json(restaurant);
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return res.status(500).json({ error: "Failed to fetch restaurant" });
    }
};


// Add new menu item
export const addMenuItem = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    const { name, price } = req.body;

    try {
        const item = await prisma.menuItem.create({
            data: {
                name,
                price,
                restaurantId
            }
        });
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to add menu item" });
    }
};

