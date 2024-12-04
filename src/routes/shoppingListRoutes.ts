import { Router } from "express";
import { ShoppingListController } from "../controllers/ShoppingListController";

const shoppingListRoutes = Router();
const shoppingListController = new ShoppingListController();

// Middleware para lidar com métodos assíncronos
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

shoppingListRoutes.get("/", asyncHandler(shoppingListController.getAll.bind(shoppingListController)));
shoppingListRoutes.post("/", asyncHandler(shoppingListController.create.bind(shoppingListController)));
shoppingListRoutes.get("/:id", asyncHandler(shoppingListController.getById.bind(shoppingListController)));
shoppingListRoutes.put("/:id", asyncHandler(shoppingListController.update.bind(shoppingListController)));
shoppingListRoutes.delete("/:id", asyncHandler(shoppingListController.delete.bind(shoppingListController)));

export default shoppingListRoutes;
