import { Request, Response } from "express";
import { ShoppingListService } from "../services/ShoppingListService";
import { UserService } from "../services/UserService";

export class ShoppingListController {
  private shoppingListService: ShoppingListService;
  private userService: UserService;

  constructor() {
    this.shoppingListService = new ShoppingListService();
    this.userService = new UserService();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const lists = await this.shoppingListService.getAllShoppingLists();
      return res.json(lists);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const list = await this.shoppingListService.getShoppingListById(parseInt(req.params.id, 10));
      if (!list) return res.status(404).json({ message: "Shopping list not found" });
      return res.json(list);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, userId } = req.body;

      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const list = await this.shoppingListService.createShoppingList({ title, user });
      return res.status(201).json(list);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, userId } = req.body;

      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const list = await this.shoppingListService.updateShoppingList(parseInt(id, 10), { title, user });
      if (!list) return res.status(404).json({ message: "Shopping list not found" });
      return res.json(list);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.shoppingListService.deleteShoppingList(parseInt(req.params.id, 10));
      if (!deleted) return res.status(404).json({ message: "Shopping list not found" });
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}
