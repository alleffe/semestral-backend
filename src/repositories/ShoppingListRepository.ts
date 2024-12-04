import { AppDataSource } from "../database/data-source";
import { ShoppingList } from "../models/ShoppingList";

export class ShoppingListRepository {
  private repository = AppDataSource.getRepository(ShoppingList);

  async findAll(): Promise<ShoppingList[]> {
    return this.repository.find({
      relations: ["user", "items"], // Inclui relações se necessário
    });
  }

  async findById(id: number): Promise<ShoppingList | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["user", "items"],
    });
  }

  async create(data: Partial<ShoppingList>): Promise<ShoppingList> {
    const shoppingList = this.repository.create(data);
    return this.repository.save(shoppingList);
  }

  async update(id: number, data: Partial<ShoppingList>): Promise<ShoppingList | null> {
    const shoppingList = await this.findById(id);
    if (!shoppingList) return null;

    Object.assign(shoppingList, data);
    return this.repository.save(shoppingList);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
