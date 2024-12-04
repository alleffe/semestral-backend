import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

const itemRoutes = Router();
const itemController = new ItemController();

// Middleware para lidar com funções assíncronas
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rota para buscar todos os itens
itemRoutes.get("/", asyncHandler(itemController.getAll.bind(itemController)));

// Rota para criar um item
itemRoutes.post("/", asyncHandler(itemController.create.bind(itemController)));

// Rota para atualizar um item
itemRoutes.put("/:id", asyncHandler(itemController.update.bind(itemController)));

// Rota para deletar um item
itemRoutes.delete("/:id", asyncHandler(itemController.delete.bind(itemController)));

export default itemRoutes;
