import { ShoppingListRepository } from "../repositories/ShoppingListRepository";
import { ShoppingList } from "../models/ShoppingList";

export class ShoppingListService {
  private shoppingListRepository: ShoppingListRepository;

  constructor() {
    this.shoppingListRepository = new ShoppingListRepository();
  }

  async getAllShoppingLists(): Promise<ShoppingList[]> {
    return this.shoppingListRepository.findAll();
  }

  // async getShoppingListById(id: number): Promise<ShoppingList | null> {
  //   return this.shoppingListRepository.findById(id);
  // }

  async getShoppingListById(id: number): Promise<ShoppingList | null> {
    return this.shoppingListRepository.findById(id);
  }
  
  async createShoppingList(data: Partial<ShoppingList>): Promise<ShoppingList> {
    return this.shoppingListRepository.create(data);
  }

  async updateShoppingList(id: number, data: Partial<ShoppingList>): Promise<ShoppingList | null> {
    return this.shoppingListRepository.update(id, data);
  }

  async deleteShoppingList(id: number): Promise<boolean> {
    return this.shoppingListRepository.delete(id);
  }
}
