import { Router, Request, Response } from "express";
import {
    createRestaurant,
    updateMenu,
    toggleStatus,
    handleOrderStatus,
    getAllRestaurants,
    getRestaurantById,
    addMenuItem,
    getOnlineRestaurants
} from "../controllers/restaurantController";

const router = Router();

// ✅ define this before `/:id`
router.get("/online", (req: Request, res: Response) => {
    getOnlineRestaurants(req, res);
});

router.post("/", (req, res) => createRestaurant(req, res));
router.get("/", (req, res) => getAllRestaurants(req, res));

// ❌ this is invalid: you cannot have two router.post("/") — remove this
// router.post("/", (req: Request, res: Response) => {
//     getRestaurantById(req, res);
// });

router.get("/:id", (req: Request, res: Response) => {
    getRestaurantById(req, res);
});
router.put("/:id/menu", (req, res) => updateMenu(req, res));
router.post("/:id/menu", (req, res) => addMenuItem(req, res));
router.put("/:id/status", (req, res) => toggleStatus(req, res));
router.put("/:id/order/:oid", (req, res) => handleOrderStatus(req, res));

export default router;

