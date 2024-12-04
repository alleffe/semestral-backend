import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";
import { ShoppingListService } from "../services/ShoppingListService";

export class ItemController {
  private itemService: ItemService;
  private shoppingListService: ShoppingListService;

  constructor() {
    this.itemService = new ItemService();
    this.shoppingListService = new ShoppingListService();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const items = await this.itemService.getAllItems();
      return res.json(items);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const item = await this.itemService.getItemById(parseInt(req.params.id, 10));
      if (!item) return res.status(404).json({ message: "Item not found" });
      return res.json(item);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  // async create(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { name, quantity, shoppingListId } = req.body;

  //     const shoppingList = await this.shoppingListService.getShoppingListById(shoppingListId);
  //     if (!shoppingList) {
  //       return res.status(404).json({ message: "Shopping list not found" });
  //     }

  //     const item = await this.itemService.createItem({ name, quantity, shoppingList });
  //     return res.status(201).json(item);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return res.status(500).json({ message: error.message });
  //     }
  //     return res.status(500).json({ message: "Unknown error occurred" });
  //   }
  // }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, quantity, shoppingListId } = req.body;
  
      // Verifique se a lista de compras existe
      const shoppingList = await this.shoppingListService.getShoppingListById(shoppingListId);
      if (!shoppingList) {
        return res.status(400).json({ message: "Shopping list does not exist" });
      }
  
      const item = await this.itemService.createItem({ name, quantity, shoppingList });
      return res.status(201).json(item);
    } catch (error) {
      console.error("Error creating item:", error);
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
  
  
  

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, quantity, shoppingListId } = req.body;

      const shoppingList = await this.shoppingListService.getShoppingListById(shoppingListId);
      if (!shoppingList) {
        return res.status(404).json({ message: "Shopping list not found" });
      }

      const item = await this.itemService.updateItem(parseInt(id, 10), { name, quantity, shoppingList });
      if (!item) return res.status(404).json({ message: "Item not found" });
      return res.json(item);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.itemService.deleteItem(parseInt(req.params.id, 10));
      if (!deleted) return res.status(404).json({ message: "Item not found" });
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}
