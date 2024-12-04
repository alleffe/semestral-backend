import { ItemRepository } from "../repositories/ItemRepository";
import { Item } from "../models/Item";

export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async getItemById(id: number): Promise<Item | null> {
    return this.itemRepository.findById(id);
  }

  // async createItem(data: Partial<Item>): Promise<Item> {
  //   return this.itemRepository.create(data);
  // }

  async createItem(data: Partial<Item>): Promise<Item> {
    return this.itemRepository.create(data);
  }
  
  async updateItem(id: number, data: Partial<Item>): Promise<Item | null> {
    return this.itemRepository.update(id, data);
  }

  async deleteItem(id: number): Promise<boolean> {
    return this.itemRepository.delete(id);
  }
}
