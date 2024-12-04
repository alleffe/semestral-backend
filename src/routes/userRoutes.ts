import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

userRoutes.get("/", asyncHandler(userController.getAll.bind(userController)));
userRoutes.post("/", asyncHandler(userController.create.bind(userController)));
userRoutes.get("/:id", asyncHandler(userController.getById.bind(userController)));
userRoutes.put("/:id", asyncHandler(userController.update.bind(userController)));
userRoutes.delete("/:id", asyncHandler(userController.delete.bind(userController)));

export default userRoutes;
